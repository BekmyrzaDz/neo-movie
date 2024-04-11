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
	reviews: Reviews[]
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

interface Reviews {
	id: number
	movie: number
	user: number
	text: string
	parent_review: number
	created_at: string
}

const token = localStorage.getItem('access_token')

// Get Movie By Id
const getMovieById = async ({ id }: { id: number }): Promise<IMovie> => {
	const response = await axios.get(`/movie/detail/${id}/`, {
		headers: { Authorization: `Bearer ${token}` },
	})

	return response.data
}

// Add to favorites
const createFavoriteById = async ({
	id,
}: {
	id: number
}): Promise<AxiosResponse> => {
	const response = await axios.post(`/movie/add-to-favorites/${id}/`, {
		headers: { Authorization: `Bearer ${token}` },
	})

	return response
}
// Remove to favorites
const deleteFavoriteById = async ({
	id,
}: {
	id: number
}): Promise<AxiosResponse> => {
	const response = await axios.delete(`/movie/remove-from-favorites/${id}/`, {
		headers: { Authorization: `Bearer ${token}` },
	})

	return response
}

const detailCardService = {
	getMovieById,
	createFavoriteById,
	deleteFavoriteById,
}

export default detailCardService
