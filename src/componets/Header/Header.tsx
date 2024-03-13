import clsx from 'clsx'
import { Link, NavLink } from 'react-router-dom'
import { Input } from '..'
import { favoriteOutline, search, streamlineFilmSlate } from '../../assets'
import styles from './Header.module.scss'

const Header = () => {
	const navList = [
		{ link: '/', value: 'главное' },
		{ link: '/movies', value: 'фильмы' },
		{ link: '/serials', value: 'сериалы' },
		{ link: '/cartoons', value: 'мультфильмы' },
		{ link: '/anime', value: 'аниме' },
		{ link: '/collections', value: 'подборки' },
	]

	const setActive = ({ isActive }: { isActive: boolean }) =>
		isActive ? styles.active : styles.navLink

	return (
		<div className={styles.header}>
			<div className={styles.headerTop}>
				<div className={styles.container}>
					<div className={styles.headerTopInner}>
						<div className={styles.logo}>
							<img
								src={streamlineFilmSlate}
								alt='Logo image'
								className={styles.logoImg}
							/>
							<h2 className={styles.logoTitle}>Movie Matcher</h2>
						</div>
						<div className={styles.headerTopRight}>
							<Input
								className={styles.input}
								name='search'
								placeholder='Поиск'
								icon={search}
							/>
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
