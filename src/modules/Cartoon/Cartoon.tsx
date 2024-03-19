import { CategorySelections, FilterBar, Footer, Header } from '../../componets'
import styles from './Cartoon.module.scss'
import { categorySelectionList } from './mockData'

const Cartoon = () => {
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

export default Cartoon
