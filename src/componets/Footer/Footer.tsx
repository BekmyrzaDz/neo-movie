import clsx from 'clsx'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '..'
import styles from './Footer.module.scss'

interface FooterProps {
	title?: string
}

interface INavList {
	link: string
	value: string
}

const Footer: FC<FooterProps> = ({ title }) => {
	const navList: INavList[] = [
		{ link: '/movies', value: 'фильмы' },
		{ link: '/serials', value: 'сериалы' },
		{ link: '/cartoons', value: 'мультфильмы' },
		{ link: '/anime', value: 'аниме' },
		{ link: '/collections', value: 'подборки' },
	]

	return (
		<div
			className={clsx(styles.footer, {
				[styles.additionalFooterStyles]:
					title?.toLowerCase() === 'Сохраненные'.toLowerCase(),
			})}
		>
			<div className={styles.container}>
				<div className={styles.footerInner}>
					<div className={styles.footerRight}>
						<Logo />
						<p className={styles.year}>2024</p>
					</div>
					<nav className={styles.navbar}>
						<ul className={styles.list}>
							{navList.map((list, i) => (
								<li className={styles.listItem} key={i}>
									<Link className={styles.link} to={list.link}>
										{list.value}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
			</div>
		</div>
	)
}

export default Footer
