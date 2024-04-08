import { useEffect } from 'react'
import { CategorySelections, Header, Spinner } from '../../componets'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import styles from './Saved.module.scss'
import { fetchSavedByType } from './redux/asyncActions'

interface ISavedParams {
	page: number
	limit: number
}

interface ICard {
	id: number
	title?: string
	image: string
	name?: string
	country_of_origin?: string
	rating?: number
	collection?: {
		name?: string
	}
}

const Saved = () => {
	const dispatch = useAppDispatch()
	const { saved, isLoading } = useAppSelector(state => state.saved)
	console.log(saved)

	const savedParams: ISavedParams = {
		page: 1,
		limit: 16,
	}

	useEffect(() => {
		dispatch(fetchSavedByType(savedParams))
	}, [dispatch])

	if (isLoading) return <Spinner />

	return (
		<div className={styles.saved}>
			<Header />
			<div className={styles.container}>
				<CategorySelections
					title='Cохраненные'
					categorySelection={saved?.results as ICard[]}
				/>
			</div>
		</div>
	)
}

export default Saved
