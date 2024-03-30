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

// Get Movies By Name
const getMoviesByName = async (text: string): Promise<IMovieListData> => {
	const response = await axios.get(`/movie/list/?search=${text}`)
	console.log(response)

	return response.data
}

const movieService = {
	getMoviesByName,
}

export default movieService
