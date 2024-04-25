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

interface IFilteredParams {
	category: string
	genre: string[] | undefined
	country: string[] | undefined
	year: string
	page?: number
	limit?: number
}

const PageSize = 16

const Filter = () => {
	const dispatch = useAppDispatch()
	const { filtered, filteredParams } = useAppSelector(state => state.filter)
	const [currentPage, setCurrentPage] = useState<number>(1)

	useEffect(() => {
		const filterParams: IFilteredParams = {
			category: (filteredParams?.category as string)?.toLowerCase(),
			genre: filteredParams?.genre.map(g => g?.toLowerCase()),
			country: filteredParams?.country.map(c => c?.toLowerCase()),
			year: filteredParams?.year as string,
			page: currentPage,
			limit: PageSize,
		}

		dispatch(fetchMoviesByType(filterParams))
	}, [dispatch, currentPage])

	if (filteredParams)
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
										filteredParams={filteredParams as IFilteredParams}
										page={currentPage}
										limit={PageSize}
									/>
								</div>
							</div>
							<FilterBar
								page={currentPage}
								limit={PageSize}
								setCurrentPage={setCurrentPage}
							/>
						</div>
						<Pagination
							className={styles.paginationBar}
							currentPage={currentPage}
							totalCount={filtered?.count as number}
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
