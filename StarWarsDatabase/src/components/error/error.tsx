import React from 'react'
import Props from './type'
import './error.css'
export default class ErrorBoundary extends React.Component<
    Props,
    { hasError: boolean }
> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        // Update state so the next render will show the fallback UI.
        return { hasError: true }
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <>
                    <div className="errorDiv">
                        <h1>Something went wrong.</h1>;
                    </div>
                </>
            )
        }
        return this.props.children
    }
}
