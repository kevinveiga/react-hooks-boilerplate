import React, { Component } from 'react';

import { P } from '../../style/text';

export class ErrorBoundary extends Component {
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    // You can also log the error to an error reporting service
    // componentDidCatch(error, info) {
    //     logErrorToMyService(error, info);
    // }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            // You can render any custom fallback UI
            return <P>Erro no carregamento...</P>;
        }

        return children;
    }
}
