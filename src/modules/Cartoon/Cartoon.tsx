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
import styles from './Cartoon.module.scss'
import {
	fetchMoviesByType,
	fetchMoviesByTypeDidMount,
} from './redux/asyncActions'

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

const Cartoon = () => {
	const dispatch = useAppDispatch()
	const { movies, isLoading } = useAppSelector(state => state.cartoon)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalCount, setTotalCount] = useState(movies?.count)

	useEffect(() => {
		setTotalCount(movies?.count)
	}, [movies?.count])

	interface IMoviesByTypeParams {
		type: string
		limit: number
		page?: number
	}

	const movieDidMountParams: IMoviesByTypeParams = {
		type: 'мультфильмы',
		limit: 16,
	}

	const movieParams: IMoviesByTypeParams = {
		type: 'мультфильмы',
		limit: 16,
		page: currentPage,
	}

	useEffect(() => {
		dispatch(fetchMoviesByTypeDidMount(movieDidMountParams))
	}, [dispatch])

	useEffect(() => {
		dispatch(fetchMoviesByType(movieParams))
	}, [dispatch, currentPage])

	if (isLoading) {
		return <Spinner />
	}

	return (
		<div className={styles.cartoon}>
			<Header />
			<div className={styles.cartoonContent}>
				<div className={styles.container}>
					<div className={styles.cartoonContentInner}>
						<div className={styles.categories}>
							<div className={styles.category}>
								<CategorySelections
									title='Мультфильмы'
									categorySelection={movies?.results as IMovie[]}
								/>
							</div>
						</div>
						<FilterBar />
					</div>
					<Pagination
						className={styles.paginationBar}
						currentPage={currentPage}
						totalCount={totalCount as number}
						pageSize={PageSize}
						onPageChange={page => setCurrentPage(page)}
					/>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Cartoon
