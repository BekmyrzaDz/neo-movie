import { AxiosResponse } from 'axios'
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
	budget_amount?: string
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

	return response.data
}

// Add to favorites
const createFavoriteById = async ({
	id,
}: {
	id: number
}): Promise<AxiosResponse> => {
	const response = await axios.post(`/movie/add-to-favorites/${id}/`)

	return response
}

const detailCardService = {
	getMovieById,
	createFavoriteById,
}

export default detailCardService
