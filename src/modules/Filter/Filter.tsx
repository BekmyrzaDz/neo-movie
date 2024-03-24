import { useState } from 'react'
import {
	CategorySelections,
	FilterBar,
	Footer,
	Header,
	Pagination,
} from '../../componets'
import { useAppSelector } from '../../hooks/redux'
import styles from './Filter.module.scss'

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
	const { filtered } = useAppSelector(state => state.filter)
	const [currentPage, setCurrentPage] = useState(1)
	const [filteredParams, setFilteredParams] = useState<string[]>([])

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
									categorySelection={filtered?.results as IMovie[]}
									filteredParams={filteredParams}
								/>
							</div>
						</div>
						<FilterBar setFilteredParams={setFilteredParams} />
					</div>
					<Pagination
						className={styles.paginationBar}
						currentPage={currentPage}
						totalCount={filtered?.results?.length || 0}
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
