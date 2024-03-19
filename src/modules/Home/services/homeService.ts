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

interface ICollection {
	id: number
	name: string
	image: string
}

interface IMovieListData {
	page: number
	count1: number
	next: string
	previous: string | null
	results: IMovie[]
}

// Get Movies By Type
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

// Get Movie List
const getMoviesList = async (): Promise<IMovieListData> => {
	const response = await axios.get('/movie/list/')

	return response.data
}

// Get Collection List
const getCollectionList = async (): Promise<ICollection[]> => {
	const response = await axios.get('/movie/collection/list/')

	return response.data
}

const homeService = {
	getMoviesList,
	getMoviesByType,
	getCollectionList,
}

export default homeService
