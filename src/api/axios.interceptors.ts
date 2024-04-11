import axios from './axios'

let refresh = false

const token = localStorage.getItem('access_token')

axios.interceptors.response.use(
	res => res,
	async error => {
		if (error.response.status === 401 && !refresh) {
			refresh = true

			const refreshToken = localStorage.getItem('refresh_token')
			const response = await axios.post('/users/login/refresh/', {
				refresh: refreshToken,
			})

			if (response.status === 200) {
				localStorage.setItem('access_token', response.data['access'])

				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

				return axios(error.config)
			}
		}
		refresh = false
		return error
	}
)
