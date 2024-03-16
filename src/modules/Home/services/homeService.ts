import axios from '../../../api/axios'

interface IMovie {
	id: number
	title: string
	image: string
	country_of_origin?: string
	rating?: number
	collection?: {
		name?: string
	}
}

interface IMovieListData {
	page: number
	count1: number
	next: string
	previous: string | null
	results: IMovie[]
}

// Get Movie List
const getMoviesByType = async ({
	type,
	limit,
}: {
	type: string
	limit: number
}): Promise<IMovieListData> => {
	const response = await axios.get(
		`/movie/list/?media_type_name=${type}&limit=${limit}`
	)
	console.log(response)

	return response.data
}

const getMoviesList = async (): Promise<IMovieListData> => {
	const response = await axios.get('/movie/list/')

	return response.data
}

const homeService = {
	getMoviesList,
	getMoviesByType,
}

export default homeService
