import axios from './axios'

axios.interceptors.response.use(
	res => res,
	async error => {
		if (error.response.status === 401) {
			const refreshToken = localStorage.getItem('refresh_token')
			const response = await axios.post('/users/login/refresh/', {
				refresh: refreshToken,
			})

			if (response.status === 200) {
				axios.defaults.headers.common[
					'Authorization'
				] = `Bearer ${response.data['access']}`

				localStorage.setItem('access_token', response.data['access'])

				return axios(error.config)
			}
		}
		return error
	}
)
