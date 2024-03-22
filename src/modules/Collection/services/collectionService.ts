import axios from '../../../api/axios'

interface ICollection {
	id: number
	name: string
	image: string
}

// Get Collection List
const getCollectionList = async (): Promise<ICollection[]> => {
	const response = await axios.get('/movie/collection/list/')

	return response.data
}

const collectionService = {
	getCollectionList,
}

export default collectionService
