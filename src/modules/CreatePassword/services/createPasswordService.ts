import axios from '../../../api/axios'

interface ICreatePassword {
	new_password: string
	password_confirm: string
}

interface CreatePasswordResponse {
	new_password: string
	password_confirm: string
}

// Create New Password
const changePassword = async (
	createPasswordData: ICreatePassword
): Promise<CreatePasswordResponse> => {
	const response = await axios.patch(
		`/users/change-password/`,
		createPasswordData
	)

	return response.data
}

const createPasswordService = {
	changePassword,
}

export default createPasswordService
