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
    componentDidCatch(error, info) {
        console.error('Error: ', error);
        console.info('Info: ', info);
    }

    render() {
        const { hasError } = this.state;
        const { children, text } = this.props;

        if (hasError) {
            // You can render any custom fallback UI
            return <P>{text || 'Erro de conexão.'}</P>;
        }

        return children;
    }
}
