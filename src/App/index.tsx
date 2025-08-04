import { CircularProgress, Container, Typography } from '@mui/material';
import debounce from 'lodash/debounce';
import { useEffect, useMemo, useState } from 'react';

import ChartContainer from '@/charts/MetricCharts';
import ExperimentSelector from '@/components/ExperimentSelector';
import FileUploader from '@/components/FileUploader';
import { Row } from '@/types';

const App = () => {
  const [data, setData] = useState<Row[]>([]);
  const [selectedExperiments, setSelectedExperiments] = useState<string[]>([]);
  const [debouncedExperiments, setDebouncedExperiments] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const experiments = useMemo(
    () => Array.from(new Set(data.map((row) => row.experiment_id))),
    [data]
  );

  const groupedData = useMemo(() => {
    const map = new Map<string, Row[]>();
    for (const row of data) {
      const key = `${row.metric_name}:${row.experiment_id}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(row);
    }
    return map;
  }, [data]);

  const debouncedUpdate = useMemo(
    () =>
      debounce((experiments: string[]) => {
        setDebouncedExperiments(experiments);
        setLoading(false);
      }, 300),
    []
  );

  useEffect(() => {
    if (data.length > 0) {
      setLoading(true);
      debouncedUpdate(selectedExperiments);
    }
  }, [selectedExperiments, debouncedUpdate, data]);

  const handleFileLoad = (parsedData: Row[]) => {
    setData(parsedData);
    setSelectedExperiments([]);
    setDebouncedExperiments([]);
    setLoading(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Experiment Tracker
      </Typography>

      <FileUploader onFileLoaded={handleFileLoad} onLoadingChange={setLoading} />

      {experiments.length > 0 && (
        <>
          <ExperimentSelector
            experiments={experiments}
            selected={selectedExperiments}
            onSelect={(value) => {
              setLoading(true);
              setSelectedExperiments(value);
            }}
          />

          {loading ? (
            <div className="flex justify-center mt-10">
              <CircularProgress />
            </div>
          ) : (
            <ChartContainer groupedData={groupedData} selectedExperiments={debouncedExperiments} />
          )}
        </>
      )}
    </Container>
  );
};

export default App;
