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
        return { hasError: true }
    }

    render() {
        if (this.state.hasError) {
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
