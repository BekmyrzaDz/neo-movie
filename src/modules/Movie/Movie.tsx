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
import styles from './Movie.module.scss'
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

const Movie = () => {
	const dispatch = useAppDispatch()
	const { movies, isLoading } = useAppSelector(state => state.movie)
	const [currentPage, setCurrentPage] = useState(1)

	// const currentTableData = useMemo(() => {
	// 	const firstPageIndex = (currentPage - 1) * PageSize
	// 	const lastPageIndex = firstPageIndex + PageSize
	// 	return movies?.results?.slice(firstPageIndex, lastPageIndex)
	// }, [currentPage])

	interface IMoviesByTypeParams {
		type: string
		limit: number
	}

	const movieParams: IMoviesByTypeParams = {
		type: 'фильмы',
		limit: 16,
	}

	useEffect(() => {
		dispatch(fetchMoviesByType(movieParams))
	}, [dispatch])

	if (isLoading) {
		return <Spinner />
	}

	return (
		<div className={styles.movie}>
			<Header />
			<div className={styles.movieContent}>
				<div className={styles.container}>
					<div className={styles.movieContentInner}>
						<div className={styles.categories}>
							<div className={styles.category}>
								<CategorySelections
									title='Фильмы'
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

export default Movie
