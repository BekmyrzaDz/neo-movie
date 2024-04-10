import axios from '../../../api/axios'

interface IUser {
	id?: number
	username: string
	email: string
}

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

// Change User
const changeUser = async (userData: IUser): Promise<ProfileResponse> => {
	const response = await axios.put(`/users/user-profile/`, userData, {
		headers: { Authorization: `Bearer ${token}` },
	})

	return response.data
}

const changeProfileService = {
	getUser,
	changeUser,
}

export default changeProfileService
