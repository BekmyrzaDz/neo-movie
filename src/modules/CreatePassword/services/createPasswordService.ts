import axios from '../../../api/axios'

interface ICreatePassword {
	new_password: string
	password_confirm: string
}

interface CreatePasswordResponse {
	new_password: string
	password_confirm: string
}

const token = localStorage.getItem('access_token')

// Create New Password
const changePassword = async (
	createPasswordData: ICreatePassword
): Promise<CreatePasswordResponse> => {
	const response = await axios.put(
		`/users/change-password/`,
		createPasswordData,
		{ headers: { Authorization: `Bearer ${token}` } }
	)

	return response.data
}

const createPasswordService = {
	changePassword,
}

export default createPasswordService
