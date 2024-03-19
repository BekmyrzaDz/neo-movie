import { createBrowserRouter } from 'react-router-dom'
import {
	AnimePage,
	CartoonPage,
	HomePage,
	MoviePage,
	Page404,
	SerialPage,
} from '../pages'
import CollectionPage from '../pages/CollectionPage/CollectionPage'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/movies',
		element: <MoviePage />,
	},
	{
		path: '/cartoons',
		element: <CartoonPage />,
	},
	{
		path: '/serials',
		element: <SerialPage />,
	},
	{
		path: '/anime',
		element: <AnimePage />,
	},
	{
		path: '/collections',
		element: <CollectionPage />,
	},
	{
		path: '*',
		element: <Page404 />,
	},
])
