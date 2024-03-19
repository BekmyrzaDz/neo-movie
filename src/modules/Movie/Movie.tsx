import { CategorySelections, FilterBar, Footer, Header } from '../../componets'
import styles from './Movie.module.scss'
import { categorySelectionList } from './mockData'

const Movie = () => {
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

export default Movie
