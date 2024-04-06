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
import styles from './Collection.module.scss'
import { fetchCollectionList } from './redux/asyncActions'

const PageSize = 16

const Collection = () => {
	const dispatch = useAppDispatch()
	const { collectionList, isLoading } = useAppSelector(
		state => state.collection
	)
	const [currentPage, setCurrentPage] = useState(1)

	useEffect(() => {
		dispatch(fetchCollectionList())
	}, [dispatch])

	if (isLoading) {
		return <Spinner />
	}

	return (
		<div className={styles.collection}>
			<Header />
			<div className={styles.collectionContent}>
				<div className={styles.container}>
					<div className={styles.collectionContentInner}>
						<div className={styles.categories}>
							<div className={styles.category}>
								<CategorySelections
									title='Подборки'
									categorySelection={collectionList}
								/>
							</div>
						</div>
						<FilterBar />
					</div>
					<Pagination
						className={styles.paginationBar}
						currentPage={currentPage}
						totalCount={collectionList.length || 0}
						pageSize={PageSize}
						onPageChange={page => setCurrentPage(page)}
					/>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Collection
