import axios from '../../../api/axios'

interface IUser {
	username: string
	password: string
}

interface LoginResponse {
	access: string
	refresh: string
}

// Login User
const createLoginUser = async (userData: IUser): Promise<LoginResponse> => {
	const response = await axios.post(`/users/login/`, userData)

	return response.data
}

const authService = {
	createLoginUser,
}

export default authService
