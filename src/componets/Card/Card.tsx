import { FC } from 'react'
import styles from './Card.module.scss'

interface ICard {
	title: string
	image: string
	countryOfOrigin?: string
	rating?: number
	collection?: {
		name?: string
	}
}

const Card: FC<ICard> = ({ title, image, countryOfOrigin }) => {
	return (
		<div className={styles.card}>
			<img src={image} alt='Card image' className={styles.cardImg} />
			<div className={styles.cardBottom}>
				<h4 className={styles.cardTitle}>{title}</h4>
				{countryOfOrigin && (
					<h5 className={styles.cardSubtitle}>{countryOfOrigin}</h5>
				)}
			</div>
		</div>
	)
}

export default Card
