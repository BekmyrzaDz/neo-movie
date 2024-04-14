import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Auth, ConfirmCode, ForgotPassword } from '..'
import { savedActive, savedOutline, sendLight } from '../../assets'
import {
	Button,
	Footer,
	Header,
	Input,
	Modal,
	Review,
	Spinner,
} from '../../componets'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import styles from './/DetailCard.module.scss'
import {
	createFavoriteById,
	createReview,
	deleteFavoriteById,
	fetchMovieById,
} from './redux/asyncActions'

interface IMovieParam {
	id: number
}

interface IReview {
	movie: number
	text: string
	parent_review?: number
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
	const { movie, isLoading } = useAppSelector(state => state.detail)
	const [openLogin, setOpenLogin] = useState<boolean>(false)
	const [openForgotPassword, setOpenForgotPassword] = useState<boolean>(false)
	const [openConfirmCode, setOpenConfirmCode] = useState<boolean>(false)
	const [openCreatePassword, setOpenCreatePassword] = useState<boolean>(false)
	const [review, setReview] = useState('')

	const movieParam: IMovieParam = {
		id: id as number,
	}

	useEffect(() => {
		dispatch(fetchMovieById(movieParam))
	}, [dispatch])

	const token = localStorage.getItem('access_token')
	const [isFavorite, setFavorite] = useState(false)

	useEffect(() => {
		setFavorite(movie?.is_favorite as boolean)
	}, [movie?.is_favorite])

	const handleFavoriteClick = () => {
		if (token && isFavorite) {
			setFavorite(prev => !prev)
			dispatch(deleteFavoriteById(movieParam))
		} else if (token && !isFavorite) {
			setFavorite(prev => !prev)
			dispatch(createFavoriteById(movieParam))
		} else {
			setOpenLogin(prev => !prev)
		}
	}

	const handleSubmit = () => {
		const reviewData: IReview = {
			movie: id as number,
			text: review,
		}

		setReview('')
		dispatch(createReview(reviewData))
		dispatch(fetchMovieById(movieParam))
	}

	if (isLoading) {
		return <Spinner />
	}

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
								<Button className={styles.button} onClick={handleFavoriteClick}>
									<img
										src={isFavorite && isFavorite ? savedActive : savedOutline}
										alt={
											isFavorite && isFavorite
												? 'Saved active icon'
												: 'Saved outline icon'
										}
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
												<span key={genre?.name}>{genre?.name}, </span>
											))}
										</p>
									</li>
									<li className={styles.listItem}>
										<p className={styles.film_duration}>Длительность:</p>
										<span>{movie?.film_duration}</span>
									</li>
									{movie?.budget_amount && (
										<li className={styles.listItem}>
											<p className={styles.film_duration}>Бюджет:</p>
											<span>{movie?.budget_amount}</span>
										</li>
									)}
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
								{movie?.detail_images.map((detailImage, index) => (
									<img
										className={styles.framesImage}
										src={detailImage.image}
										alt='Frame from the movie'
										key={index}
									/>
								))}
							</div>
						</section>
						<section className={styles.review}>
							<h4 className={styles.reviewTitle}>Оставьте отзыв</h4>
							<div className={styles.reviewInputWrapper}>
								<Input
									className={styles.input}
									name='review'
									type='input'
									value={review}
									placeholder='Написать отзыв'
									sendIcon={sendLight}
									onChange={e => setReview(e.target.value)}
									handleSubmit={handleSubmit}
								/>
							</div>
							{movie?.reviews
								?.filter(review => !review.parent_review)
								.map(review => (
									<>
										<Review
											key={review.id.toString()}
											id={review.id}
											movie={review.movie}
											username={review.user.username}
											text={review.text}
											created_at={review.created_at}
											reviewReply={
												<div className={styles.reviewReply}>
													{movie?.reviews
														?.filter(
															reviewReply =>
																reviewReply.parent_review === review.id
														)
														.map(reviewReply => (
															<Review
																key={reviewReply.id.toString()}
																id={reviewReply.id}
																username={reviewReply.user.username}
																movie={reviewReply.movie}
																text={reviewReply.text}
																created_at={reviewReply.created_at}
																parent_review={reviewReply.parent_review}
															/>
														))}
												</div>
											}
										/>
									</>
								))}
						</section>
					</div>
				</div>
			</div>
			<Footer />
			{openLogin && (
				<Modal active={openLogin} setActive={setOpenLogin}>
					<Auth
						setOpenLogin={setOpenLogin}
						setOpenForgotPassword={setOpenForgotPassword}
					/>
				</Modal>
			)}
			{openForgotPassword && (
				<Modal active={openForgotPassword} setActive={setOpenForgotPassword}>
					<ForgotPassword
						setOpenConfirmCode={setOpenConfirmCode}
						setOpenForgotPassword={setOpenForgotPassword}
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
					<ConfirmCode
						setOpenConfirmCode={setOpenConfirmCode}
						setOpenCreatePassword={setOpenCreatePassword}
					/>
				</Modal>
			)}
		</div>
	)
}

export default DetailCard
