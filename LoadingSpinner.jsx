import { useI18n } from '../contexts/I18nContext';

function LoadingSpinner({ size = 'medium', message, overlay = false }) {
  const { t } = useI18n();

  const sizeClasses = {
    small: 'spinner-sm',
    medium: 'spinner-md',
    large: 'spinner-lg'
  };

  const spinnerClass = sizeClasses[size] || sizeClasses.medium;

  const spinner = (
    <div className={`loading-spinner ${spinnerClass}`}>
      <div className="spinner-luxury">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      {message && (
        <p className="loading-message mt-3">
          {message}
        </p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="loading-overlay">
        <div className="loading-backdrop"></div>
        <div className="loading-content">
          {spinner}
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      {spinner}
    </div>
  );
}

export default LoadingSpinner;