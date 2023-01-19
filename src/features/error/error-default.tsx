import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    console.log(error);
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  //   componentDidCatch(error, errorInfo) {
  // You can also log the error to an error reporting service
  // logErrorToMyService(error, errorInfo);
  //   }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong in the application.</h1>
          <h2>(Generalization)</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Ok, retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
