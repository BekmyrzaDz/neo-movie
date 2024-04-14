import { FC } from 'react'
import { letters } from './ReviewData'

interface ReviewProfile {
	username: string
}

type Letters = {
	letter: string
	color: string
}

function getColor(letters: Letters[], username: string) {
	const result = letters.find(item => {
		if (item.letter === username[0].toUpperCase()) return item.color
	})

	return result?.color
}

const ReviewProfile: FC<ReviewProfile> = ({ username }) => {
	return (
		<div
			style={{
				width: 50,
				height: 50,
				background: getColor(letters, username),
				borderRadius: '50%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<p
				style={{
					fontFamily: 'Montserrat',
					fontWeight: 500,
					fontSize: 20,
					lineHeight: '24px',
					color: '#ffffff',
				}}
			>
				{username[0].toUpperCase()}
			</p>
		</div>
	)
}

export default ReviewProfile
