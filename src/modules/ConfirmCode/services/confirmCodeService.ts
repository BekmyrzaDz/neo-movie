import axios from '../../../api/axios'

interface IConfirm {
	code: string
}

interface ConfirmCodeResponse {
	code: string
}

// Create Confirm Code
const createConfirmCode = async (
	confirmData: IConfirm
): Promise<ConfirmCodeResponse> => {
	const response = await axios.post(`/users/confirm-code/`, confirmData)

	return response.data
}

const confirmCodeService = {
	createConfirmCode,
}

export default confirmCodeService
