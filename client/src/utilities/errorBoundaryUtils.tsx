export const ErrorFallback: React.FC = ({ error, resetErrorBoundary }: any) => {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    )
}
export const myErrorHandler = (error: Error, info: { componentStack: string }) => {
    console.log(error)
}