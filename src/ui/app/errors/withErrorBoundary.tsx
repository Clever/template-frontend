import * as React from "react";

/**
 * A higher-order component that wraps the provided component in a React error boundary.
 *
 * export const SafeComponent = withErrorBoundary(FlakyComponent);
 * export const SafeComponent = withErrorBoundary(FlakyComponent, FallbackComponent);
 * export const SafeComponent = withErrorBoundary(
 *   connect(mapStateToProps, mapDispatchToProps)(FlakyComponent),
 * );
 *
 * The FallbackComponent, if specified, will be provided all of the props passed to the primary
 * Component plus the error. The FallbackComponent can choose whether or not to use these props.
 */
export function withErrorBoundary<Props extends Omit<FallbackProps, "error">, FallbackProps>(
  Component: React.ComponentType<Props>,
  FallbackComponent?: React.ComponentType<FallbackProps>,
): React.ComponentType<Props> {
  return class ComponentWithErrorBoundary extends React.PureComponent<Props> {
    state = {
      error: null,
    };

    componentDidCatch(error: any) {
      // TODO: Log this error to an error-reporting service
    }

    static getDerivedStateFromError(error: any) {
      return { error };
    }

    render() {
      const { error } = this.state;

      if (error) {
        if (FallbackComponent) {
          return <FallbackComponent {...(this.props as any)} error={error} />;
        }
        return null;
      }
      return <Component {...this.props} />;
    }
  };
}
