import { createBrowserRouter } from 'react-router-dom'
import { HomePage, Page404 } from '../pages'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '*',
		element: <Page404 />,
	},
])
