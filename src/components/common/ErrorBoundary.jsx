import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="p-6 border-2 border-dashed border-red-200 rounded-xl bg-red-50 text-center">
          <h2 className="text-lg font-bold text-red-700">Something went wrong.</h2>
          <p className="text-red-500 text-sm">Failed to load this component.</p>
          <button 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-xs"
            onClick={() => window.location.reload()}
          >
            Try Refreshing
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;