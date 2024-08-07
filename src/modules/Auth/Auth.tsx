import clsx from 'clsx'
import { Form, Formik } from 'formik'
import { FC, useState } from 'react'
import * as Yup from 'yup'
import { eye, eyeOff } from '../../assets'
import { Button, MyInput } from '../../componets'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import styles from './Auth.module.scss'
import { createAuthUser } from './redux/asyncActions'

interface AuthProps {
	setOpenForgotPassword: React.Dispatch<React.SetStateAction<boolean>>
	setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>
}

interface ILogin {
	username: string
	password: string
}

// Login Schema
const loginSchema = Yup.object().shape({
	username: Yup.string()
		.typeError('Должно быть строкой')
		.min(2, 'Минимум 2 символа')
		.max(30, 'Максимум 30 символа')
		.required('Обязательное поле'),
	password: Yup.string()
		.min(8, 'Пароль должен содержать не менее 8 символов')
		.required('Обязательное поле'),
})

const initialValues: ILogin = {
	username: '',
	password: '',
}

const Auth: FC<AuthProps> = ({ setOpenForgotPassword, setOpenLogin }) => {
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const toggleShowPassword = (): void => setShowPassword(prev => !prev)

	const toggleOpenForgotPassword = (): void => {
		setOpenForgotPassword(prev => !prev)
		setOpenLogin(prev => !prev)
	}

	const toggleOpenLogin = () => {
		setOpenLogin(prev => !prev)
	}

	const dispatch = useAppDispatch()
	const { user } = useAppSelector(state => state.auth)
	console.log('user', user)

	const handleSubmit = (values: ILogin) => {
		console.log(JSON.stringify(values, null, 2))
		try {
			dispatch(createAuthUser(values))
			toggleOpenLogin()
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div className={styles.auth}>
			<h3 className={styles.title}>Вход</h3>
			<Formik
				initialValues={initialValues}
				validationSchema={loginSchema}
				onSubmit={handleSubmit}
				enableReinitialize={true}
			>
				{({ values, isValid, isSubmitting }) => (
					<Form className={styles.form}>
						<MyInput
							className={clsx(styles.input, styles.username, {
								[styles.activeInput]: values.username.length > 0,
							})}
							id='username'
							name='username'
							type='text'
							label='Логин'
						/>
						<MyInput
							className={clsx(styles.input, styles.password, {
								[styles.activeInput]: values.password.length > 0,
							})}
							id='password'
							name='password'
							type={showPassword ? 'text' : 'password'}
							label='Пароль'
							passwordIcon={
								values.password.length > 0 ? (showPassword ? eye : eyeOff) : ''
							}
							toggleShowPassword={toggleShowPassword}
						/>
						<Button
							className={clsx(styles.button, {
								[styles.activeButton]:
									values.username.length > 0 &&
									values.password.length > 0 &&
									(isValid || isSubmitting),
							})}
							disabled={!isValid || isSubmitting}
							type='submit'
						>
							Войти
						</Button>
						<p
							className={styles.forgotPassword}
							onClick={toggleOpenForgotPassword}
						>
							Забыли пароль?
						</p>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default Auth
