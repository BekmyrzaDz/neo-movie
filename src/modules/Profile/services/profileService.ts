import axios from '../../../api/axios'

interface ProfileResponse {
	id: number
	username: string
	email: string
}

const token = localStorage.getItem('access_token')

// Get User
const getUser = async (): Promise<ProfileResponse> => {
	const response = await axios.get(`/users/me/`, {
		headers: { Authorization: `Bearer ${token}` },
	})

	return response.data
}

const profileService = {
	getUser,
}

export default profileService
