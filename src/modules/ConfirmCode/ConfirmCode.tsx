import clsx from 'clsx'
import { FC, FormEvent, useState } from 'react'
import PinInput from 'react-pin-input'
import { Button } from '../../componets'
import styles from './ConfirmCode.module.scss'

interface ConfirmCodeProps {
	setOpenCreatePassword: React.Dispatch<React.SetStateAction<boolean>>
	setOpenConfirmCode: React.Dispatch<React.SetStateAction<boolean>>
}

const ConfirmCode: FC<ConfirmCodeProps> = ({
	setOpenCreatePassword,
	setOpenConfirmCode,
}) => {
	const [value, setValue] = useState<string>('')

	const toggleOpenCreatePassword = (): void => {
		setOpenCreatePassword(prev => !prev)
		setOpenConfirmCode(prev => !prev)
	}

	const handlePinInputChange = (value: string) => {
		setValue(value)
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		console.log(JSON.stringify(value, null, 2))

		if (value) {
			toggleOpenCreatePassword()
		}
	}

	return (
		<div className={styles.confirmCode}>
			<h3 className={styles.title}>Код подтверждения</h3>
			<h5 className={styles.subtitle}>
				Мы отправили код подтверждения на почту
			</h5>
			<h5 className={clsx(styles.subtitle, styles.emailTitle)}>
				asanesenbaev@gmail.com
			</h5>
			<form className={styles.form} onSubmit={handleSubmit}>
				<PinInput
					length={4}
					initialValue=''
					focus
					type='custom'
					inputMode='text'
					style={{
						padding: '10px',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginBottom: 40,
					}}
					inputStyle={{
						width: '100px',
						height: '61px',
						borderTop: 'none',
						borderRight: 'none',
						borderLeft: 'none',
						borderColor: '#AAAAAA',
						borderBottomWidth: 3,
						fontFamily: 'Montserrat',
						fontWeight: 400,
						fontSize: '50px',
						lineHeight: '61px',
						color: '#000000',
					}}
					placeholder='0'
					onChange={handlePinInputChange}
				/>
				<Button
					className={clsx(styles.button, {
						[styles.activeButton]: value.length === 4,
					})}
					disabled={value.length < 4}
					type='submit'
				>
					{value.length === 4 ? 'Подтвердить' : 'Запросить код'}
				</Button>
				<p className={styles.resendCode}>
					Отправить код повторно через: 59 сек
				</p>
			</form>
		</div>
	)
}

export default ConfirmCode
