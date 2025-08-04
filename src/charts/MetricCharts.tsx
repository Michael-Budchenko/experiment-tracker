import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Row } from '../types';
import { downsample } from '../utils/downsample';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip, Title);

interface Props {
  groupedData: Map<string, Row[]>;
  selectedExperiments: string[];
}

const ChartContainer: React.FC<Props> = ({ groupedData, selectedExperiments }) => {
  const datasets = useMemo(() => {
    let colorStep = 0;

    return Array.from(groupedData.entries())
      .filter(([key]) => {
        const [, expId] = key.split(':');
        return selectedExperiments.includes(expId);
      })
      .map(([key, values]) => {
        const [metric, expId] = key.split(':');
        const simplified = downsample(values, 5);
        const color = `hsl(${(colorStep++ * 47) % 360}, 70%, 50%)`;

        return {
          label: `${metric} (${expId})`,
          data: simplified.map((v) => ({
            x: Number(v.step),
            y: Number(v.value),
          })),
          borderColor: color,
          backgroundColor: color,
          fill: false,
          tension: 0.2,
          pointRadius: 0,
        };
      });
  }, [groupedData, selectedExperiments]);

  if (!datasets.length) return <p className="mt-4">No data to display.</p>;

  return (
    <div className="mt-8">
      <Line
        key={selectedExperiments.join(',')}
        data={{ datasets }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Experiment Metrics' },
          },
          scales: {
            x: {
              type: 'linear',
              title: { display: true, text: 'Step' },
            },
            y: {
              title: { display: true, text: 'Value' },
            },
          },
        }}
        height={500}
      />
    </div>
  );
};

export default ChartContainer;
