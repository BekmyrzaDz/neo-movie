import { clsx } from 'clsx'
import { FC } from 'react'
import { InputProps } from './Input.props'

import styles from './Input.module.scss'

const Input: FC<InputProps> = ({ className, icon, ...props }) => {
	return (
		<div className={clsx(styles.wrapper, className)}>
			{icon && <img src={icon} alt='Input icon' className={styles.icon} />}
			<input
				className={clsx(styles.input)}
				{...props}
				placeholder={props.placeholder}
			/>
		</div>
	)
}

export default Input
