import { CategorySelections, FilterBar, Footer, Header } from '../../componets'
import styles from './Anime.module.scss'
import { categorySelectionList } from './mockData'

const Anime = () => {
	return (
		<div className={styles.anime}>
			<Header />
			<div className={styles.animeContent}>
				<div className={styles.container}>
					<div className={styles.animeContentInner}>
						<div className={styles.categories}>
							<div className={styles.category}>
								<CategorySelections
									title='Аниме'
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

export default Anime
