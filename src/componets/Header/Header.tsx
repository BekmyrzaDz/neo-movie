import clsx from 'clsx'
import { ChangeEvent, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Input, Loader, Logo, Modal, Spinner } from '..'
import { favoriteOutline, search } from '../../assets'
import { useDebounce } from '../../hooks/debounce'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
	Auth,
	ConfirmCode,
	CreatePassword,
	ForgotPassword,
	Register,
} from '../../modules'
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
	const { isLoading: isAuthLoading } = useAppSelector(state => state.auth)
	const { isLoading: isRegisterLoading } = useAppSelector(
		state => state.register
	)
	const { isLoading: isForgotPasswordLoading } = useAppSelector(
		state => state.forgotPassword
	)
	const { isLoading: isConfirmCodeLoading } = useAppSelector(
		state => state.confirmCode
	)
	const { isLoading: isCreatePasswordLoading } = useAppSelector(
		state => state.createPassword
	)
	const [searchValue, setSearchValue] = useState<string>('')
	const [openLogin, setOpenLogin] = useState<boolean>(false)
	const [openForgotPassword, setOpenForgotPassword] = useState<boolean>(false)
	const [openConfirmCode, setOpenConfirmCode] = useState<boolean>(false)
	const [openCreatePassword, setOpenCreatePassword] = useState<boolean>(false)
	const [openRegister, setOpenRegister] = useState<boolean>(false)

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

	if (isRegisterLoading) {
		return <Spinner />
	}

	if (isAuthLoading) {
		return <Spinner />
	}

	if (isForgotPasswordLoading) {
		return <Spinner />
	}

	if (isConfirmCodeLoading) {
		return <Spinner />
	}

	if (isCreatePasswordLoading) {
		return <Spinner />
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
		<>
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
								<div
									className={clsx(styles.link, styles.login)}
									onClick={() => setOpenLogin(prev => !prev)}
								>
									Войти
								</div>
								<div
									className={clsx(styles.link, styles.register)}
									onClick={() => setOpenRegister(prev => !prev)}
								>
									Регистрация
								</div>
								{/* <Link
									className={clsx(styles.link, styles.profile)}
									to='/profile'
								>
									Профиль
								</Link> */}
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
							<NavLink className={clsx(styles.favorite, setActive)} to='/saved'>
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
			{openLogin && (
				<Modal active={openLogin} setActive={setOpenLogin}>
					<Auth
						setOpenForgotPassword={setOpenForgotPassword}
						setOpenLogin={setOpenLogin}
					/>
				</Modal>
			)}
			{openRegister && (
				<Modal active={openRegister} setActive={setOpenRegister}>
					<Register
						setOpenRegister={setOpenRegister}
						setOpenLogin={setOpenLogin}
					/>
				</Modal>
			)}
			{openForgotPassword && (
				<Modal active={openForgotPassword} setActive={setOpenForgotPassword}>
					<ForgotPassword
						setOpenForgotPassword={setOpenForgotPassword}
						setOpenConfirmCode={setOpenConfirmCode}
						setOpenLogin={setOpenLogin}
					/>
				</Modal>
			)}
			{openConfirmCode && (
				<Modal active={openConfirmCode} setActive={setOpenConfirmCode}>
					<ConfirmCode
						setOpenConfirmCode={setOpenConfirmCode}
						setOpenCreatePassword={setOpenCreatePassword}
					/>
				</Modal>
			)}
			{openCreatePassword && (
				<Modal active={openCreatePassword} setActive={setOpenCreatePassword}>
					<CreatePassword setOpenCreatePassword={setOpenCreatePassword} />
				</Modal>
			)}
		</>
	)
}

export default Header
