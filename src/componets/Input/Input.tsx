import { clsx } from 'clsx'
import { FC } from 'react'
import { InputProps } from './Input.props'

import styles from './Input.module.scss'

const Input: FC<InputProps> = ({
	className,
	icon,
	sendIcon,
	handleSubmit,
	...props
}) => {
	return (
		<div className={clsx(styles.wrapper, className)}>
			{icon && <img src={icon} alt='Input icon' className={styles.icon} />}
			<input
				className={clsx(styles.input, {
					[styles.sendInput]: sendIcon && props.value,
				})}
				{...props}
				placeholder={props.placeholder}
			/>
			{sendIcon && props.value && (
				<img
					className={styles.sendIcon}
					src={sendIcon}
					onClick={handleSubmit}
				/>
			)}
		</div>
	)
}

export default Input
