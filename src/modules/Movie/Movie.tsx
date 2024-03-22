import { useMemo, useState } from 'react'
import {
	CategorySelections,
	FilterBar,
	Footer,
	Header,
	Pagination,
} from '../../componets'
import styles from './Movie.module.scss'
import { categorySelectionList } from './mockData'

const PageSize = 16

const Movie = () => {
	const [currentPage, setCurrentPage] = useState(1)

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize
		const lastPageIndex = firstPageIndex + PageSize
		return categorySelectionList.slice(firstPageIndex, lastPageIndex)
	}, [currentPage])

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
									categorySelection={currentTableData}
								/>
							</div>
						</div>
						<FilterBar />
					</div>
					<Pagination
						className={styles.paginationBar}
						currentPage={currentPage}
						totalCount={categorySelectionList.length}
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
