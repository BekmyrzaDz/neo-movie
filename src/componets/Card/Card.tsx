import { FC } from 'react'
import styles from './Card.module.scss'

interface ICard {
	title?: string
	image: string
	name?: string
	country_of_origin?: string
	rating?: number
	collection?: {
		name?: string
	}
}

const Card: FC<ICard> = ({ title, image, name, country_of_origin }) => {
	return (
		<div className={styles.card}>
			<img src={image} alt='Card image' className={styles.cardImg} />
			<div className={styles.cardBottom}>
				<h4 className={styles.cardTitle}>{title ? title : name}</h4>
				{country_of_origin && (
					<h5 className={styles.cardSubtitle}>{country_of_origin}</h5>
				)}
			</div>
		</div>
	)
}

export default Card
