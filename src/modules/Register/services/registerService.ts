import axios from '../../../api/axios'

interface IUser {
	id?: number
	username: string
	email: string
	password: string
}

interface RegisterResponse {
	id: number
	username: string
	email: string
	password: string
}

// Create User
const createUser = async (userData: IUser): Promise<RegisterResponse> => {
	const response = await axios.post(`/users/register/`, userData)

	return response.data
}

const registerService = {
	createUser,
}

export default registerService
