import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import 'reset-css'
import App from './App.tsx'
import './api/axios.interceptors.ts'
import './index.css'
import { setupStore } from './store/store'

const store = setupStore()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<App />
	</Provider>
)
