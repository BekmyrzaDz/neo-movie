import axios from '../../../api/axios'

interface ISaved {
	id: number
	title: string
	image: string
	country_of_origin?: string
	rating?: number
	collection?: {
		name?: string
	}
}

interface ISavedListData {
	page: number
	count1: number
	next: string
	previous: string | null
	results: ISaved[]
}

// Get Saved Movies By Type
const getSavedByType = async ({
	page,
	limit,
}: {
	page: number
	limit: number
}): Promise<ISavedListData> => {
	const token = localStorage.getItem('access_token')

	const response = await axios.get(
		`/movie/favorite/list/?page=${page}&limit=${limit}`,
		{ headers: { Authorization: `Bearer ${token}` } }
	)

	return response.data
}

const savedService = {
	getSavedByType,
}

export default savedService
