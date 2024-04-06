import { toast } from 'react-toastify'
import axios from './axios'

const refreshToken = localStorage.getItem('refresh_token')

axios.interceptors.response.use(
	res => res,
	async error => {
		if (error.response.status === 401) {
			const response = await axios.post('/users/login/refresh/', {
				token: refreshToken,
			})

			if (response.status === 201) {
				axios.defaults.headers.common[
					'Authorization'
				] = `Bearer ${response.data['access']}`

				return axios(error.config)
			}
		}

		toast.error(error.message)
		return error
	}
)
