import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../layout';
import Error404 from '../pages/Error404';
import Home from '../pages/Home';
import About from '../pages/About';
import Accomodation from '../pages/Accomodation';

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/logement/:id",
                element: <Accomodation />,
            },
            {
                path: "*",
                element: <Error404 />,
            },
        ]
    }
])

const Root = () => {
    return (
        <RouterProvider router={router} />
    );
}
export default Root;