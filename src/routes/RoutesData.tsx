import { createBrowserRouter } from 'react-router-dom'
import {
	AnimePage,
	CartoonPage,
	CollectionPage,
	DetailCardPage,
	FilterPage,
	HomePage,
	MoviePage,
	Page404,
	SerialPage,
} from '../pages'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/:id',
		element: <DetailCardPage />,
	},
	{
		path: '/movies',
		element: <MoviePage />,
	},
	{
		path: '/movies/:id',
		element: <DetailCardPage />,
	},
	{
		path: '/cartoons',
		element: <CartoonPage />,
	},
	{
		path: '/cartoons/:id',
		element: <DetailCardPage />,
	},
	{
		path: '/serials',
		element: <SerialPage />,
	},
	{
		path: '/serials/:id',
		element: <DetailCardPage />,
	},
	{
		path: '/anime',
		element: <AnimePage />,
	},
	{
		path: '/anime/:id',
		element: <DetailCardPage />,
	},
	{
		path: '/collections',
		element: <CollectionPage />,
	},
	{
		path: '/collections/:id',
		element: <DetailCardPage />,
	},
	{
		path: '/filter',
		element: <FilterPage />,
	},
	{
		path: '/filter/:id',
		element: <DetailCardPage />,
	},
	{
		path: '*',
		element: <Page404 />,
	},
])
