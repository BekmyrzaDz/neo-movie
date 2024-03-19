import { CategorySelections, FilterBar, Footer, Header } from '../../componets'
import styles from './Collection.module.scss'
import { categorySelectionList } from './mockData'

const Collection = () => {
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
									categorySelection={categorySelectionList}
								/>
							</div>
						</div>
						<FilterBar />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Collection
