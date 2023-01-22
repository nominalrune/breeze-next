import React from 'react';
export class ErrorBoundary extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false, error:undefined, errorInfo:undefined };
    }
    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }
    componentDidCatch(error: any, errorInfo: any) {
        // You can also log the error to an error reporting service
        this.setState({error,errorInfo})
    }
    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return<div className='fixed rounded-md border-red-800 bg-red-300'><h1>Error</h1><p>{this.state.error}</p><p>{this.state.errorInfo}</p></div>;
        }
        return this.props.children;
    }
}
