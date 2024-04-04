import axios from '../../../api/axios'

interface IUser {
	email: string
}

interface ForgotPasswordResponse {
	email: string
}

// Create Forgot Password
const createForgotPassword = async (
	userData: IUser
): Promise<ForgotPasswordResponse> => {
	const response = await axios.post(`/users/forgot-password/`, userData)

	return response.data
}

const forgotPasswordService = {
	createForgotPassword,
}

export default forgotPasswordService
