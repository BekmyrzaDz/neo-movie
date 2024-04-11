import clsx from 'clsx'
import { Form, Formik } from 'formik'
import { FC, useEffect } from 'react'
import * as Yup from 'yup'
import { Button, MyInput } from '../../componets'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import styles from './ForgotPassword.module.scss'
import { createForgotPassword } from './redux/asyncActions'
import { resetWithoutIsLoading, setEmail } from './redux/forgotPasswordSlice'

interface ForgotPasswordProps {
	setOpenForgotPassword: React.Dispatch<React.SetStateAction<boolean>>
	setOpenConfirmCode: React.Dispatch<React.SetStateAction<boolean>>
	setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>
}

interface IForgotPassword {
	email: string
}

// Register Schema
const registerSchema = Yup.object().shape({
	email: Yup.string()
		.email('Неверный логин или почта')
		.required('Обязательное поле'),
})

const initialValues: IForgotPassword = {
	email: '',
}

const ForgotPassword: FC<ForgotPasswordProps> = ({
	setOpenForgotPassword,
	setOpenConfirmCode,
	setOpenLogin,
}) => {
	const toggleOpenConfirmCode = (): void => {
		setOpenForgotPassword(prev => !prev)
		setOpenConfirmCode(prev => !prev)
	}

	const toggleOpenLogin = (): void => {
		setOpenForgotPassword(prev => !prev)
		setOpenLogin(prev => !prev)
	}

	const dispatch = useAppDispatch()
	const { email } = useAppSelector(state => state.forgotPassword)
	console.log('user', email)

	const handleSubmit = (values: IForgotPassword) => {
		console.log(JSON.stringify(values, null, 2))
		dispatch(setEmail(values.email))
		dispatch(createForgotPassword(values))
	}

	useEffect(() => {
		email && toggleOpenConfirmCode()

		return () => {
			dispatch(resetWithoutIsLoading())
		}
	}, [email, dispatch])

	return (
		<div className={styles.forgotPassword}>
			<h3 className={styles.title}>Забыли пароль</h3>
			<Formik
				initialValues={initialValues}
				validationSchema={registerSchema}
				onSubmit={handleSubmit}
			>
				{({ values, isValid, isSubmitting }) => (
					<Form className={styles.form}>
						<MyInput
							className={clsx(styles.input, styles.email, {
								[styles.activeInput]: values.email.length > 0,
							})}
							id='email'
							name='email'
							type='email'
							label='Email'
						/>
						<Button
							className={clsx(styles.button, {
								[styles.activeButton]:
									values.email.length > 0 && (isValid || isSubmitting),
							})}
							disabled={!isValid || isSubmitting}
							type='submit'
						>
							Продолжить
						</Button>
						<p className={styles.back} onClick={toggleOpenLogin}>
							Назад
						</p>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default ForgotPassword