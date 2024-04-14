import { FC, ReactNode, RefObject, useState } from 'react'
import { sendLight, threeDots, trash } from '../../assets'
import { useAppDispatch } from '../../hooks/redux'
import { useOutsideAlerter } from '../../hooks/useOutsideAlerter'
import {
	createReview,
	deleteReviewById,
	fetchMovieById,
} from '../../modules/DetailCard/redux/asyncActions'
import Button from '../Button/Button'
import Input from '../Input/Input'
import ReviewProfile from '../ReviewProfile/ReviewProfile'
import styles from './Review.module.scss'

interface Review {
	id: number
	movie: number
	username: string
	created_at: string
	text: string
	parent_review?: number
	reviewReply?: ReactNode
}

interface Reply {
	movie: number
	text: string
	parent_review?: number
}

interface IMovieParam {
	id: number
}

const Review: FC<Review> = ({
	id,
	movie,
	username,
	created_at,
	text,
	parent_review,
	reviewReply,
}) => {
	const [removeToggle, setRemoveToggle] = useState<boolean>(false)
	const [replyToggle, setReplyToggle] = useState<boolean>(false)
	const [reply, setReply] = useState('')

	const dispatch = useAppDispatch()

	const handleRemoveClick = () => {
		const reviewParam = {
			id: id,
		}

		const movieParam: IMovieParam = {
			id: movie,
		}

		setReply('')
		dispatch(deleteReviewById(reviewParam))
		dispatch(fetchMovieById(movieParam))
	}

	const outsideAlerterRef = useOutsideAlerter(() => {
		setReplyToggle(prev => !prev)
	})

	const handleReplySubmit = () => {
		const reviewData: Reply = {
			movie: movie,
			text: reply,
			parent_review: id,
		}

		const movieParam: IMovieParam = {
			id: movie,
		}

		dispatch(createReview(reviewData))
		dispatch(fetchMovieById(movieParam))
	}

	return (
		<div className={styles.review}>
			<ReviewProfile username={username} />
			<div className={styles.reviewContentWrapper}>
				<div className={styles.reviewContent}>
					<div className={styles.reviewContentTop}>
						<div className={styles.userNameWrapper}>
							<h5 className={styles.userName}>{username}</h5>
							<p className={styles.reviewTime}>{created_at}</p>
						</div>
						<div className={styles.threeDotsWrapper}>
							<img
								src={threeDots}
								alt='Three dots icon'
								className={styles.threeDots}
								onClick={() => setRemoveToggle(prev => !prev)}
							/>
							{removeToggle && (
								<Button
									className={styles.removeButton}
									onClick={handleRemoveClick}
								>
									<img src={trash} alt='Trash icon' className={styles.trash} />
									Удалить
								</Button>
							)}
						</div>
					</div>
					<p className={styles.reviewText}>{text}</p>
					{replyToggle ? (
						<div
							className={styles.replyInputWrapper}
							ref={outsideAlerterRef as RefObject<HTMLDivElement>}
						>
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
									onClick={handleReplySubmit}
								/>
							)}
						</div>
					) : (
						<>
							{!parent_review && (
								<div
									className={styles.reply}
									onClick={() => setReplyToggle(prev => !prev)}
								>
									Ответить
								</div>
							)}
						</>
					)}
				</div>
				{reviewReply && <div className={styles.reviewReply}>{reviewReply}</div>}
			</div>
		</div>
	)
}

export default Review
