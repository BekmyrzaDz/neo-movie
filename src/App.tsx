import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { router } from './routes/RoutesData'

function App() {
	return (
		<>
			<RouterProvider router={router} />
			<ToastContainer autoClose={2000} />
		</>
	)
}

export default App
