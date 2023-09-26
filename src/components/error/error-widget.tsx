'use client';

import Error from './interface';

interface ErrorMessageProps {
  error: Error;
  onClose: () => void;
  index: number;
}

export default function ErrorWidget(props: ErrorMessageProps) {
  const { error, onClose, index } = props;

  return (
    <div
      onClick={onClose}
    >
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          boxSizing: 'border-box',
          bottom: `${index * 265 + 16}px`,
          width: '400px',
          maxWidth: '90vw',
          minHeight: '250px',
          padding: '20px',
        }}
      >
        <h1>Error</h1>
        {Object.keys(error).map((fieldName) => (
          <div
            key={fieldName}
            data-field={fieldName}
            style={{ marginTop: 1, whiteSpace: 'pre-wrap' }}
          >
            <strong>{fieldName}:</strong> <span>{JSON.stringify(error[fieldName as keyof typeof error])}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
