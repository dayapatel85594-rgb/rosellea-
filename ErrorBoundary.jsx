import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null
    };
  }

  static getDerivedStateFromError(error) {
    return { 
      hasError: true,
      errorId: Date.now().toString(36) + Math.random().toString(36).substr(2)
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // In production, you might want to send this to an error reporting service
    // Example: logErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null
    });
  };

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback } = this.props;
      
      if (Fallback) {
        return (
          <Fallback 
            error={this.state.error}
            errorInfo={this.state.errorInfo}
            onRetry={this.handleRetry}
          />
        );
      }

      return (
        <div className="error-boundary">
          <div className="container py-5">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <div className="card border-0 shadow-lg">
                  <div className="card-body text-center p-5">
                    <div className="mb-4">
                      <i className="fas fa-exclamation-triangle text-warning" style={{ fontSize: '4rem' }}></i>
                    </div>
                    
                    <h2 className="h3 mb-3">Something went wrong</h2>
                    <p className="text-muted mb-4">
                      We apologize for the inconvenience. An unexpected error has occurred.
                    </p>
                    
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                      <div className="alert alert-danger text-start mb-4">
                        <h6>Error Details:</h6>
                        <pre className="mb-0" style={{ fontSize: '0.8rem', whiteSpace: 'pre-wrap' }}>
                          {this.state.error.toString()}
                        </pre>
                        {this.state.errorInfo && (
                          <details className="mt-2">
                            <summary>Stack Trace</summary>
                            <pre style={{ fontSize: '0.7rem', whiteSpace: 'pre-wrap' }}>
                              {this.state.errorInfo.componentStack}
                            </pre>
                          </details>
                        )}
                      </div>
                    )}
                    
                    <div className="d-flex gap-3 justify-content-center">
                      <button 
                        className="btn btn-luxury"
                        onClick={this.handleRetry}
                      >
                        Try Again
                      </button>
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => window.location.href = '/'}
                      >
                        Go Home
                      </button>
                    </div>
                    
                    {this.state.errorId && (
                      <p className="text-muted mt-3" style={{ fontSize: '0.8rem' }}>
                        Error ID: {this.state.errorId}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for functional components
export const withErrorBoundary = (Component, fallback) => {
  return function WithErrorBoundaryComponent(props) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
};

// Hook for error handling in functional components
export const useErrorHandler = () => {
  const handleError = (error, errorInfo) => {
    // In a real app, you might want to send this to an error reporting service
    console.error('Error caught by useErrorHandler:', error, errorInfo);
  };

  return handleError;
};

export default ErrorBoundary;