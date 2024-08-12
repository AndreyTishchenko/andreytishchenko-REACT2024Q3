import { createBrowserRouter, RouteObject } from 'react-router-dom'
import MainPage from './pages/MainPage'
import ErrorPage from './pages/errorPage'
import DetailsPage from './pages/DetailsPage'
const routes: RouteObject[] = [
    {
        path: '/',
        element: <MainPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/details/',
        element: <DetailsPage />,
        errorElement: <ErrorPage />,
    },
]

const browserRouter = createBrowserRouter(routes, {
    basename: '/rs-react/',
})

export { browserRouter, routes }
