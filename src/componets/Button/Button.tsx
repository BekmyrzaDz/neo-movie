import { clsx } from 'clsx'
import styles from './Button.module.scss'
import { ButtonProps } from './Button.props'

const Button = ({ children, className, ...props }: ButtonProps) => {
	return (
		<button {...props} className={clsx(styles.button, className)}>
			{children}
		</button>
	)
}

export default Button
