
import { Outlet } from 'react-router-dom';
import Breadcrumbs from './components/Breadcrumbs'
import Footer from './components/Footer'
import Header from './components/Header'
import SearchModel from './components/SearchModel'
import { ErrorBoundary, withErrorBoundary } from 'react-error-boundary'



const Layout = () => {
    const ErrorFallback = () => {
        return <>
            <div role="alert">
                <p>Something went wrong:</p>
            </div>
        </>
    }

    const HeaderWithErrorBoundary = withErrorBoundary(Header, {
        FallbackComponent: ErrorFallback,
        onError(error, info) {
            console.log({ error, info })
        },
    })

    return (
        <>
            <HeaderWithErrorBoundary />
            <Breadcrumbs />
            {/* <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Header />
            </ErrorBoundary>

            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Breadcrumbs />
            </ErrorBoundary> */}
            <Outlet />
            <Footer />
            <SearchModel />
        </>
    )
}

export default Layout
