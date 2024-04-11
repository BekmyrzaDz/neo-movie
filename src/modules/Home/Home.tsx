import { useEffect } from 'react'
import {
	CategorySelections,
	FilterBar,
	Footer,
	Header,
	Spinner,
} from '../../componets'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import styles from './Home.module.scss'
import {
	fetchAnimeByType,
	fetchCartoonsByType,
	fetchCollectionList,
	fetchMoviesByType,
	fetchSerialsByType,
} from './redux/asyncActions'

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

const Home = () => {
	const dispatch = useAppDispatch()
	const { movies, serials, cartoons, anime, collectionList, isLoading } =
		useAppSelector(state => state.home)

	interface IMoviesByTypeParams {
		type: string
		limit: number
	}

	const movieParams: IMoviesByTypeParams = {
		type: 'фильмы',
		limit: 4,
	}

	const serialParams: IMoviesByTypeParams = {
		type: 'сериалы',
		limit: 4,
	}

	const cartoonsParams: IMoviesByTypeParams = {
		type: 'мультфильмы',
		limit: 4,
	}

	const animeParams: IMoviesByTypeParams = {
		type: 'аниме',
		limit: 4,
	}

	useEffect(() => {
		dispatch(fetchMoviesByType(movieParams))
		dispatch(fetchSerialsByType(serialParams))
		dispatch(fetchCartoonsByType(cartoonsParams))
		dispatch(fetchAnimeByType(animeParams))
		dispatch(fetchCollectionList())
	}, [dispatch])

	if (isLoading) {
		return <Spinner />
	}

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
									categorySelection={movies?.results as IMovie[]}
								/>
							</div>
							<div className={styles.category}>
								<CategorySelections
									title='Сериалы'
									categorySelection={serials?.results as IMovie[]}
								/>
							</div>
							<div className={styles.category}>
								<CategorySelections
									title='Мультфильмы'
									categorySelection={cartoons?.results as IMovie[]}
								/>
							</div>
							<div className={styles.category}>
								<CategorySelections
									title='Аниме'
									categorySelection={anime?.results as IMovie[]}
								/>
							</div>
							<div>
								<CategorySelections
									title='Подборки'
									categoryType='Подборки'
									categorySelection={collectionList?.slice(0, 4)}
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
