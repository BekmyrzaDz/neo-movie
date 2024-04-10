import axios from '../../../api/axios'

interface IChangeProfilePassword {
	current_password: string
	new_password: string
	password_confirm: string
}

interface ProfilePasswordResponse {
	current_password: string
	new_password: string
	password_confirm: string
}

const token = localStorage.getItem('access_token')

// Change Profile Password
const changeProfilePassword = async (
	passwordData: IChangeProfilePassword
): Promise<ProfilePasswordResponse> => {
	const response = await axios.put(
		`/users/profile/change-password/`,
		passwordData,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	)

	return response.data
}

const changeProfileService = {
	changeProfilePassword,
}

export default changeProfileService
