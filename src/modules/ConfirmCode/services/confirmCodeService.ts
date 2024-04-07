import axios from '../../../api/axios'

interface IConfirm {
	code: string
}

interface ConfirmCodeResponse {
	code: string
}

interface IResendConfirm {
	email: string
}

interface ResendConfirmResponse {
	email: string
}

// Create Confirm Code
const createConfirmCode = async (
	confirmData: IConfirm
): Promise<ConfirmCodeResponse> => {
	const response = await axios.post(`/users/confirm-code/`, confirmData)

	return response.data
}

// Create Resend Confirm Code
const createResendConfirmCode = async (
	email: IResendConfirm
): Promise<ResendConfirmResponse> => {
	const response = await axios.post(`/users/resend-confirmation/`, email)

	return response.data
}

const confirmCodeService = {
	createConfirmCode,
	createResendConfirmCode,
}

export default confirmCodeService
