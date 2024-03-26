import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Card.module.scss'

interface ICard {
	id?: number
	title?: string
	image: string
	name?: string
	country_of_origin?: string
	rating?: number
	collection?: {
		name?: string
	}
}

const Card: FC<ICard> = ({ id, title, image, name, country_of_origin }) => {
	const { pathname } = useLocation()
	const path = pathname === '/' ? '' : pathname

	return (
		<Link className={styles.card} to={`${path}/${id}`}>
			<img src={image} alt='Card image' className={styles.cardImg} />
			<div className={styles.cardBottom}>
				<h4 className={styles.cardTitle}>{title ? title : name}</h4>
				{country_of_origin && (
					<h5 className={styles.cardSubtitle}>{country_of_origin}</h5>
				)}
			</div>
		</Link>
	)
}

export default Card
