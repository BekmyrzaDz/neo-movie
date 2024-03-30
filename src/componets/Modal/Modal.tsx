import clsx from 'clsx'
import { FC } from 'react'
import { cross } from '../../assets'
import styles from './Modal.module.scss'

interface IModal {
	active: boolean
	setActive: React.Dispatch<React.SetStateAction<boolean>>
	children?: React.ReactNode
}

const Modal: FC<IModal> = ({ active, setActive, children }) => {
	const modalClasses = clsx(styles.modal, {
		[`${styles.modal} ${styles.active}`]: active,
	})
	const modalContentClasses = clsx(styles.modalContent, {
		[`${styles.modalContent} ${styles.active}`]: active,
	})
	return (
		<div className={modalClasses} onClick={() => setActive(false)}>
			<div className={modalContentClasses} onClick={e => e.stopPropagation()}>
				<img
					src={cross}
					alt='Cross icon'
					className={styles.cross}
					onClick={() => setActive(false)}
				/>
				<div className={styles.contentInner}>{children}</div>
			</div>
		</div>
	)
}

export default Modal
