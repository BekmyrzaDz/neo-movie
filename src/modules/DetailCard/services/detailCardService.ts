import axios from '../../../api/axios'

interface IMovie {
	id: number
	title: string
	description: string
	image: string
	country_of_origin: string
	age_limit: number
	rating: number
	film_duration: string
	release_year: number
	genres: Genre[]
	detail_images: Detailimage[]
	reviews: any[]
	collection: Genre
	is_favorite: boolean
}
interface Detailimage {
	image: string
}
interface Genre {
	name: string
}

// Get Movie By Id
const getMovieById = async ({ id }: { id: number }): Promise<IMovie> => {
	const response = await axios.get(`/movie/detail/${id}/`)
	console.log('detail', response)

	return response.data
}

const detailCardService = {
	getMovieById,
}

export default detailCardService
