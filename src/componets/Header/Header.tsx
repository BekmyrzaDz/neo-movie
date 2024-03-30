import clsx from 'clsx'
import { ChangeEvent, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Input, Loader, Logo } from '..'
import { favoriteOutline, search } from '../../assets'
import { useDebounce } from '../../hooks/debounce'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import styles from './Header.module.scss'
import { fetchMoviesByName } from './redux/asyncActions'
import { reset } from './redux/searchSlice'

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

interface INavList {
	link: string
	value: string
}

const Header = () => {
	const dispatch = useAppDispatch()
	const { searchMovies, isLoading } = useAppSelector(state => state.search)
	const [searchValue, setSearchValue] = useState<string>('')

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	const debounced = useDebounce(searchValue, 300)

	useEffect(() => {
		if (debounced.length > 0) {
			dispatch(fetchMoviesByName(debounced))
		} else {
			dispatch(reset())
		}
	}, [dispatch, debounced])

	const setActive = ({ isActive }: { isActive: boolean }) =>
		isActive ? styles.active : styles.navLink

	function renderMovies(movies: IMovie[]) {
		if (movies?.length > 0) {
			return movies.map(movie => (
				<Link className={styles.movie} to={`/${movie.id}`} key={movie.id}>
					<img
						className={styles.movieImg}
						src={movie.image}
						alt='Founded movie image'
					/>
					<div className={styles.movieNameGroup}>
						<h5 className={styles.title}>{movie.title}</h5>
						<p className={styles.country}>{movie.country_of_origin}</p>
					</div>
				</Link>
			))
		}

		return (
			<div className={styles.notFoundWrapper}>
				<p className={styles.notFound}>Ничего не найдено</p>
			</div>
		)
	}

	const navList: INavList[] = [
		{ link: '/', value: 'главное' },
		{ link: '/movies', value: 'фильмы' },
		{ link: '/serials', value: 'сериалы' },
		{ link: '/cartoons', value: 'мультфильмы' },
		{ link: '/anime', value: 'аниме' },
		{ link: '/collections', value: 'подборки' },
	]

	return (
		<div className={styles.header}>
			<div className={styles.headerTop}>
				<div className={styles.container}>
					<div className={styles.headerTopInner}>
						<Logo />
						<div className={styles.headerTopRight}>
							<div className={styles.inputWrapper}>
								<Input
									className={styles.input}
									name='search'
									value={searchValue}
									placeholder='Поиск'
									icon={search}
									onChange={handleSearchChange}
								/>
								{debounced.length > 0 && (
									<div className={styles.foundedMovies}>
										{isLoading ? (
											<div className={styles.loaderWrapper}>
												<Loader />
											</div>
										) : (
											renderMovies(searchMovies?.results as IMovie[])
										)}
									</div>
								)}
							</div>
							<Link className={clsx(styles.link, styles.login)} to='/login'>
								Войти
							</Link>
							<Link
								className={clsx(styles.link, styles.register)}
								to='/register'
							>
								Регистрация
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.headerBottom}>
				<div className={styles.container}>
					<div className={styles.headerBottomInner}>
						<nav className={styles.navbar}>
							<ul className={styles.list}>
								{navList.map((list, i) => (
									<li className={styles.listItem} key={i}>
										<NavLink className={setActive} to={list.link}>
											{list.value}
										</NavLink>
									</li>
								))}
							</ul>
						</nav>
						<div className={styles.verticalLine}></div>
						<NavLink
							className={clsx(styles.favorite, setActive)}
							to='/favorites'
						>
							<img
								src={favoriteOutline}
								alt='Favorite icon'
								className={styles.favoriteIcon}
							/>
							<p className={styles.favoriteText}>сохраненные</p>
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header
