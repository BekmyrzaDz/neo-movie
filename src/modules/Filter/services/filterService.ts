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

interface IMoviesByTypeParams {
	category: string | undefined
	genre: string[] | undefined
	country: string[] | undefined
	year: string | undefined
}

// Get Movies By Type
const getMoviesByType = async ({
	category,
	year,
	country,
	genre,
}: IMoviesByTypeParams): Promise<IMovieListData> => {
	const response = await axios.get(
		`/movie/list/?media_type_name=${category}&release_year=${year}&country_of_origin=${country}&genres=${genre}`
	)

	return response.data
}

const filterService = {
	getMoviesByType,
}

export default filterService
