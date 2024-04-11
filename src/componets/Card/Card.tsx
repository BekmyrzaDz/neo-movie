import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { favorite } from '../../assets'
import { useAppDispatch } from '../../hooks/redux'
import { deleteFavoriteById } from '../../modules/DetailCard/redux/asyncActions'
import { removeSavedById } from '../../modules/Saved/redux/savedSlice'
import styles from './Card.module.scss'

interface ICard {
	is_favorite?: boolean
	categoryType?: string
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

interface IMovieParam {
	id: number
}

const Card: FC<ICard> = ({
	id,
	title,
	image,
	name,
	country_of_origin,
	categoryType,
	is_favorite,
}) => {
	const { pathname } = useLocation()
	const path = pathname === '/' ? '' : pathname
	const token = localStorage.getItem('access_token')
	const dispatch = useAppDispatch()

	const handleFavoriteClick = () => {
		const movieParam: IMovieParam = {
			id: id as number,
		}

		if (categoryType?.toLowerCase() === 'Сохраненные'.toLowerCase()) {
			dispatch(removeSavedById(id))
			dispatch(deleteFavoriteById(movieParam))
		}
	}

	return (
		<div className={styles.wrapper}>
			{token && is_favorite && (
				<img
					src={favorite}
					alt='Favorite icon'
					className={styles.favorite}
					onClick={handleFavoriteClick}
				/>
			)}
			{categoryType?.toLowerCase() === 'Подборки'.toLowerCase() ? (
				<div className={styles.card}>
					<img src={image} alt='Card image' className={styles.cardImg} />
					<div className={styles.cardBottom}>
						<h4 className={styles.cardTitle}>{title ? title : name}</h4>
						{country_of_origin && (
							<h5 className={styles.cardSubtitle}>{country_of_origin}</h5>
						)}
					</div>
				</div>
			) : (
				<Link className={styles.card} to={`${path}/${id}`}>
					<img src={image} alt='Card image' className={styles.cardImg} />
					<div className={styles.cardBottom}>
						<h4 className={styles.cardTitle}>{title ? title : name}</h4>
						{country_of_origin && (
							<h5 className={styles.cardSubtitle}>{country_of_origin}</h5>
						)}
					</div>
				</Link>
			)}
		</div>
	)
}

export default Card
