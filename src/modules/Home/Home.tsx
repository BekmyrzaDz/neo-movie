import { useEffect } from 'react'
import { CategorySelections, FilterBar, Footer, Header } from '../../componets'
import { useAppDispatch } from '../../hooks/redux'
import styles from './Home.module.scss'
import { categorySelectionList } from './mockData'
// import { fetchMoviesByType } from './redux/asyncActions'

const Home = () => {
	const dispatch = useAppDispatch()

	// interface IMovieParams {
	// 	type: string
	// 	limit: number
	// }

	// const movieParams: IMovieParams = {
	// 	type: 'фильмы',
	// 	limit: 4,
	// }

	useEffect(() => {
		// dispatch(fetchMoviesByType(movieParams))
	}, [dispatch])

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
							<div>
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

export default Home
