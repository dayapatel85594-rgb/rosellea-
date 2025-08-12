import { useEffect } from 'react';

function Toast({ message, type = 'success', show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const getToastClass = () => {
    switch (type) {
      case 'success': return 'bg-success';
      case 'error': return 'bg-danger';
      case 'warning': return 'bg-warning';
      default: return 'bg-info';
    }
  };

  return (
    <div
      className={`toast show position-fixed ${getToastClass()}`}
      style={{
        top: '100px',
        right: '20px',
        zIndex: 9999,
        minWidth: '300px'
      }}
    >
      <div className="toast-body text-white d-flex justify-content-between align-items-center">
        <span>{message}</span>
        <button
          type="button"
          className="btn-close btn-close-white"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default Toast;