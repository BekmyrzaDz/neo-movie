import clsx from 'clsx'
import { FC, FormEvent, useEffect, useState } from 'react'
import PinInput from 'react-pin-input'
import { Button } from '../../componets'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import useCountdown from '../../hooks/useCountdown'
import styles from './ConfirmCode.module.scss'
import {
	createConfirmCode,
	createResendConfirmCode,
} from './redux/asyncActions'
import {
	resetIsDone,
	resetIsInvalidCode,
	resetResendCode,
	resetWithoutIsLoading,
	setIsDone,
	setIsInvalidCode,
	setResendCode,
} from './redux/confirmCodeSlice'

interface ConfirmCodeProps {
	setOpenCreatePassword: React.Dispatch<React.SetStateAction<boolean>>
	setOpenConfirmCode: React.Dispatch<React.SetStateAction<boolean>>
}

const ConfirmCode: FC<ConfirmCodeProps> = ({
	setOpenCreatePassword,
	setOpenConfirmCode,
}) => {
	const [value, setValue] = useState<string>('')
	const dispatch = useAppDispatch()
	const { code, resendCode, isSuccess, isInvalidCode } = useAppSelector(
		state => state.confirmCode
	)
	const { saveEmail } = useAppSelector(state => state.forgotPassword)

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

		dispatch(createConfirmCode({ code: value }))
	}

	const handleResendConfirmCode = () => {
		dispatch(resetResendCode())
		dispatch(resetIsInvalidCode())
		dispatch(createResendConfirmCode({ email: saveEmail }))
	}

	useEffect(() => {
		if (code) {
			toggleOpenCreatePassword()
		}
		if (!code && isSuccess) {
			dispatch(setIsInvalidCode())
		}

		return () => {
			dispatch(resetWithoutIsLoading())
			dispatch(resetIsDone())
			dispatch(resetIsInvalidCode())
			dispatch(resetResendCode())
		}
	}, [code, dispatch])

	const onDone = () => {
		console.log('Timer counted down!')
		dispatch(setResendCode())
		dispatch(setIsDone())
	}

	const { seconds } = useCountdown(onDone, 60)

	return (
		<div className={styles.confirmCode}>
			<h3 className={styles.title}>Код подтверждения</h3>
			{isInvalidCode ? (
				<h5 className={clsx(styles.subtitle, styles.errorSubtitle)}>
					Введенный код неверный
				</h5>
			) : (
				<>
					<h5 className={styles.subtitle}>
						Мы отправили код подтверждения на почту
					</h5>
					{saveEmail && (
						<h5 className={clsx(styles.subtitle, styles.emailSubtitle)}>
							{`${saveEmail}`}
						</h5>
					)}
				</>
			)}
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
					inputStyle={
						isInvalidCode
							? {
									width: '100px',
									height: '61px',
									borderTop: 'none',
									borderRight: 'none',
									borderLeft: 'none',
									borderColor: '#EC3D3D',
									borderBottomWidth: 3,
									fontFamily: 'Montserrat',
									fontWeight: 400,
									fontSize: '50px',
									lineHeight: '61px',
									color: '#000000',
							  }
							: {
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
							  }
					}
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
				{resendCode ? (
					<p className={styles.resendCode} onClick={handleResendConfirmCode}>
						Отправить код повторно
					</p>
				) : (
					<p className={styles.countdown}>
						Отправить код повторно через: {seconds} сек
					</p>
				)}
			</form>
		</div>
	)
}

export default ConfirmCode
