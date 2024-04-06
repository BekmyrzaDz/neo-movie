import { useEffect, useState } from 'react'
import {
	CategorySelections,
	FilterBar,
	Footer,
	Header,
	Pagination,
	Spinner,
} from '../../componets'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import styles from './Anime.module.scss'
import { fetchMoviesByType } from './redux/asyncActions'

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

const PageSize = 16

const Anime = () => {
	const dispatch = useAppDispatch()
	const { movies, isLoading } = useAppSelector(state => state.anime)
	const [currentPage, setCurrentPage] = useState(1)

	interface IMoviesByTypeParams {
		type: string
		limit: number
	}

	const movieParams: IMoviesByTypeParams = {
		type: 'аниме',
		limit: 16,
	}

	useEffect(() => {
		dispatch(fetchMoviesByType(movieParams))
	}, [dispatch])

	if (isLoading) {
		return <Spinner />
	}

	return (
		<div className={styles.anime}>
			<Header />
			<div className={styles.animeContent}>
				<div className={styles.container}>
					<div className={styles.animeContentInner}>
						<div className={styles.categories}>
							<div className={styles.category}>
								<CategorySelections
									title='Аниме'
									categorySelection={movies?.results as IMovie[]}
								/>
							</div>
						</div>
						<FilterBar />
					</div>
					<Pagination
						className={styles.paginationBar}
						currentPage={currentPage}
						totalCount={movies?.results?.length || 0}
						pageSize={PageSize}
						onPageChange={page => setCurrentPage(page)}
					/>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Anime
