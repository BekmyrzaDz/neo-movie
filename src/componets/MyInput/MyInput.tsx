import { clsx } from 'clsx'
import { useField } from 'formik'
import { FC } from 'react'
import { InputProps } from './MyInput.props'

import styles from './MyInput.module.scss'

const Input: FC<InputProps> = ({
	className,
	label,
	passwordIcon,
	toggleShowPassword,
	...props
}) => {
	const [field, meta] = useField(props)

	return (
		<div className={clsx(styles.wrapper, className)}>
			{meta.touched && meta.error ? (
				<small className={styles.error}>{meta.error}</small>
			) : (
				<label htmlFor={props.name}>{label}</label>
			)}
			<input
				className={clsx(styles.input, {
					[styles.inputError]: meta.touched && meta.error,
				})}
				{...props}
				{...field}
				placeholder={props.placeholder}
			/>
			{passwordIcon && (
				<img
					src={passwordIcon}
					alt='eye'
					className={styles.showHide}
					onClick={toggleShowPassword}
				/>
			)}
		</div>
	)
}

export default Input
