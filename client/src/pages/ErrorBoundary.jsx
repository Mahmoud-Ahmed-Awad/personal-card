import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Production Error:", error, info);
  }

  render() {
    return this.state.hasError ? (
      <h1>Something went wrong</h1>
    ) : (
      this.props.children
    );
  }
}
export default ErrorBoundary;
// Wrap your app with it
{
  /* <ErrorBoundary>
  <App />
</ErrorBoundary>; */
}
