import clsx from 'clsx'
import { useField } from 'formik'
import { FC } from 'react'
import styles from './Checkbox.module.scss'
import { InputProps } from './Checkbox.props'

const Checkbox: FC<InputProps> = ({ label, className, ...props }) => {
	const [field, meta] = useField(props)

	return (
		<label className={clsx(styles.label, styles.checkboxWrapper, className)}>
			<input
				className={clsx(styles.input, styles.checkbox)}
				{...field}
				{...props}
			/>
			<span>{label.length > 20 ? `${label.slice(0, 20)}...` : label}</span>

			{meta.touched && meta.error ? (
				<small className={styles.error}>{meta.error}</small>
			) : null}
		</label>
	)
}

export default Checkbox
