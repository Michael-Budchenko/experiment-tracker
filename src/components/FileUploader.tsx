import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import React, { useState } from 'react';

interface Props {
  onFileLoaded: (data: any[]) => void;
  onLoadingChange: (loading: boolean) => void;
}

const FileUploader: React.FC<Props> = ({ onFileLoaded, onLoadingChange }) => {
  const [progress, setProgress] = useState<number>(0);
  const [parsing, setParsing] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onLoadingChange(true);
    setProgress(0);
    setParsing(true);

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      import('papaparse').then(({ default: Papa }) => {
        const results: any[] = [];
        let totalRows = 0;

        totalRows = text.split('\n').length;

        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          step: (row) => {
            results.push(row.data);
            const percent = Math.min((results.length / totalRows) * 100, 100);
            setProgress(percent);
          },
          complete: () => {
            onFileLoaded(results);
            onLoadingChange(false);
            setParsing(false);
            setProgress(0);
          },
        });
      });
    };

    reader.readAsText(file);
  };

  return (
    <Box mb={2}>
      <input
        type="file"
        accept=".csv"
        className="hidden"
        id="file-input"
        onChange={handleFileChange}
      />
      <label htmlFor="file-input">
        <Button variant="contained" component="span" startIcon={<UploadFileIcon />}>
          Upload CSV
        </Button>
      </label>

      {parsing && (
        <Box mt={2}>
          <Typography variant="body2" gutterBottom>
            Parsing file...
          </Typography>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      )}
    </Box>
  );
};

export default FileUploader;
