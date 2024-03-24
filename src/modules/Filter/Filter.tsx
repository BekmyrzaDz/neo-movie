import { useEffect, useState } from 'react'
import {
	CategorySelections,
	FilterBar,
	Footer,
	Header,
	Pagination,
} from '../../componets'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import styles from './Filter.module.scss'
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

const Filter = () => {
	const dispatch = useAppDispatch()
	const { movies } = useAppSelector(state => state.movie)
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

	return (
		<div className={styles.filter}>
			<Header />
			<div className={styles.filterContent}>
				<div className={styles.container}>
					<div className={styles.filterContentInner}>
						<div className={styles.categories}>
							<div className={styles.category}>
								<CategorySelections
									title='Найдено по запросу:'
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

export default Filter
