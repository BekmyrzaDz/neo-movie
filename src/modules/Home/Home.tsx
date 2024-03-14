import { CategorySelections, Header } from '../../componets'
import styles from './Home.module.scss'
import { categorySelectionList } from './mockData'

const Home = () => {
	return (
		<div className={styles.home}>
			<Header />
			<div className={styles.homeContent}>
				<div className={styles.container}>
					<div className={styles.homeContentInner}>
						<div className={styles.categories}>
							<div className={styles.category}>
								<CategorySelections
									title='Фильмы'
									categorySelection={categorySelectionList}
								/>
							</div>
							<div className={styles.category}>
								<CategorySelections
									title='Сериалы'
									categorySelection={categorySelectionList}
								/>
							</div>
							<div className={styles.category}>
								<CategorySelections
									title='Мультфильмы'
									categorySelection={categorySelectionList}
								/>
							</div>
							<div className={styles.category}>
								<CategorySelections
									title='Аниме'
									categorySelection={categorySelectionList}
								/>
							</div>
							<div className={styles.category}>
								<CategorySelections
									title='Подборки'
									categorySelection={categorySelectionList}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
