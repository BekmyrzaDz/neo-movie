import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Auth, ConfirmCode, ForgotPassword } from '..'
import {
	reviewProfile,
	savedActive,
	savedOutline,
	sendLight,
	threeDots,
	trash,
} from '../../assets'
import { Button, Footer, Header, Input, Modal, Spinner } from '../../componets'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import styles from './/DetailCard.module.scss'
import {
	createFavoriteById,
	deleteFavoriteById,
	fetchMovieById,
} from './redux/asyncActions'

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
	const { movie, isLoading } = useAppSelector(state => state.detail)
	const [openLogin, setOpenLogin] = useState<boolean>(false)
	const [openForgotPassword, setOpenForgotPassword] = useState<boolean>(false)
	const [openConfirmCode, setOpenConfirmCode] = useState<boolean>(false)
	const [openCreatePassword, setOpenCreatePassword] = useState<boolean>(false)

	const [removeToggle, setRemoveToggle] = useState<boolean>(false)
	const [replyToggle, setReplyToggle] = useState<boolean>(false)
	const [review, setReview] = useState('')
	const [reply, setReply] = useState('')

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
							<Input
								className={styles.input}
								name='review'
								type='input'
								value={review}
								onChange={e => setReview(e.target.value)}
								placeholder='Написать отзыв'
							/>
							<div className={styles.reviews}>
								<img
									src={reviewProfile}
									alt='Review profile image'
									className={styles.reviewsImg}
								/>
								<div className={styles.reviewsContent}>
									<div className={styles.reviewsContentTop}>
										<div className={styles.userNameWrapper}>
											<h5 className={styles.userName}>aminatursunalieva</h5>
											<p className={styles.reviewTime}>2 месяца назад</p>
										</div>
										<div className={styles.threeDotsWrapper}>
											<img
												src={threeDots}
												alt='Three dots icon'
												className={styles.threeDots}
												onClick={() => setRemoveToggle(!removeToggle)}
											/>
											{removeToggle && (
												<Button className={styles.removeButton}>
													<img
														src={trash}
														alt='Trash icon'
														className={styles.trash}
													/>
													Удалить
												</Button>
											)}
										</div>
									</div>
									<p className={styles.reviewText}>
										Актерская игра в фильме оставляет только положительные
										эмоции. В особенности заслуживает восхищения работа
										Харрисона Форда. Актер мастерски передает эмоции и чувства
										своего персонажа, что делает его очень реалистичным и
										близким зрителям.
									</p>
									{replyToggle ? (
										<div className={styles.replyInputWrapper}>
											<Input
												className={styles.replyInput}
												name='reply'
												value={reply}
												onChange={e => setReply(e.target.value)}
											/>
											{reply && (
												<img
													src={sendLight}
													alt='Send icon'
													className={styles.sendLight}
												/>
											)}
										</div>
									) : (
										<div
											className={styles.reply}
											onClick={() => setReplyToggle(!replyToggle)}
										>
											Ответить
										</div>
									)}
								</div>
							</div>
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
