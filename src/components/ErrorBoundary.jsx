import { Component } from "react";
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            color: "red",
            fontSize: "2rem",
            textAlign: "center",
          }}
        >
          {this.props.fallback}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
