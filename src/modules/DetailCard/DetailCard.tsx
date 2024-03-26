import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { reviewProfile, saved, savedOutline } from '../../assets'
import { Button, Footer, Header, Input } from '../../componets'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import styles from './/DetailCard.module.scss'
import { fetchMovieById } from './redux/asyncActions'

interface IMovieParam {
	id: number
}

// Searching for a number in a string
function extractFirstNumberFromString(inputString: string): number | null {
	const regex = /\d+/
	const match = inputString.match(regex)
	if (match) {
		return Number(match[0])
	} else {
		return null
	}
}

const DetailCard = () => {
	const dispatch = useAppDispatch()
	const location = useLocation()
	const id: number | null = extractFirstNumberFromString(location.pathname)
	const { movie } = useAppSelector(state => state.detail)

	const movieParam: IMovieParam = {
		id: id as number,
	}

	useEffect(() => {
		dispatch(fetchMovieById(movieParam))
	}, [dispatch])

	return (
		<div className={styles.detail}>
			<Header />
			<div className={styles.detailContent}>
				<div className={styles.container}>
					<div className={styles.detailContentInner}>
						<div className={styles.detailContentTop}>
							<div className={styles.detailContentTopLeft}>
								<img
									src={movie?.image}
									alt='Detail image'
									className={styles.detailImg}
								/>
								<Button className={styles.button}>
									<img
										src={movie?.is_favorite ? saved : savedOutline}
										alt='Saved icon'
										className={styles.savedIcon}
									/>
									Сохранить
								</Button>
							</div>
							<section className={styles.detailContentTopRight}>
								<ul className={styles.list}>
									<li className={styles.listItem}>
										<h4 className={styles.title}>{movie?.title}</h4>
									</li>
									<li className={styles.listItem}>
										<p className={styles.releaseYear}>Год выпуска:</p>
										<span>{movie?.release_year}</span>
									</li>
									<li className={styles.listItem}>
										<p className={styles.countryOfOrigin}>Страна:</p>
										<span>{movie?.country_of_origin}</span>
									</li>
									<li className={styles.listItem}>
										<p className={styles.releaseYear}>Жанр:</p>
										<p>
											{movie?.genres.map(genre => (
												<span>{genre?.name}, </span>
											))}
										</p>
									</li>
									<li className={styles.listItem}>
										<p className={styles.film_duration}>Длительность:</p>
										<span>{movie?.film_duration}</span>
									</li>
									<li className={styles.listItem}>
										<p className={styles.film_duration}>Бюджет:</p>
										<span>135 000 000 $</span>
									</li>
									<li className={styles.listItem}>
										<p className={styles.rating}>IMDb:</p>
										<span>{movie?.rating} / 10</span>
									</li>
									<li className={styles.listItem}>
										<p className={styles.description}>{movie?.description}</p>
									</li>
								</ul>
							</section>
						</div>
						<section className={styles.frames}>
							<h4 className={styles.framesTitle}>Кадры из фильма:</h4>
							<div className={styles.framesImages}>
								{movie?.detail_images.map(detailImage => (
									<img
										src={detailImage.image}
										alt='Frame from the movie'
										className={styles.framesImage}
									/>
								))}
							</div>
						</section>
						<section className={styles.review}>
							<h4 className={styles.reviewTitle}>Оставьте отзыв</h4>
							<Input
								className={styles.input}
								name='Написать отзыв'
								placeholder='Написать отзыв'
							/>
							<div className={styles.reviews}>
								<img
									src={reviewProfile}
									alt='Review profile image'
									className={styles.reviewsImg}
								/>
								<div className={styles.reviewsContent}>
									<div className={styles.userNameWrapper}>
										<h5 className={styles.userName}>aminatursunalieva</h5>
										<p className={styles.reviewTime}>2 месяца назад</p>
									</div>
									<p className={styles.review}>
										Актерская игра в фильме оставляет только положительные
										эмоции. В особенности заслуживает восхищения работа
										Харрисона Форда. Актер мастерски передает эмоции и чувства
										своего персонажа, что делает его очень реалистичным и
										близким зрителям.
									</p>
									<div className={styles.reply}>Ответить</div>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default DetailCard
