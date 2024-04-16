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
	count: number
	next: string
	previous: string | null
	results: IMovie[]
}

// Get Movies By Type Did Mount
const getMoviesByTypeDidMount = async ({
	type,
	limit,
}: {
	type: string
	limit: number
}): Promise<IMovieListData> => {
	const response = await axios.get(
		`/movie/list/?media_type_name=${type}&limit=${limit}`
	)

	return response.data
}

// Get Movies By Type
const getMoviesByType = async ({
	type,
	limit,
	page,
}: {
	type: string
	limit: number
	page?: number
}): Promise<IMovieListData> => {
	const response = await axios.get(
		`/movie/list/?limit=${limit}&media_type_name=${type}&page=${page}`
	)

	return response.data
}
const cartoonService = {
	getMoviesByType,
	getMoviesByTypeDidMount,
}

export default cartoonService
