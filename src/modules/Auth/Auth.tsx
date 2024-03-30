import clsx from 'clsx'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { eye, eyeOff } from '../../assets'
import { Button, MyInput } from '../../componets'
import styles from './Auth.module.scss'

interface ILogin {
	email: string
	password: string
}

// Login Schema
const loginSchema = Yup.object().shape({
	email: Yup.string()
		.email('Неверный логин или почта')
		.required('Обязательное поле'),
	password: Yup.string()
		.min(8, 'Пароль должен содержать не менее 8 символов')
		.required('Обязательное поле'),
})

const initialValues: ILogin = {
	email: '',
	password: '',
}

const handleSubmit = (values: ILogin) => {
	console.log(JSON.stringify(values, null, 2))
}

const Auth = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const toggleShowPassword = (): void => setShowPassword(!showPassword)

	return (
		<div className={styles.auth}>
			<h3 className={styles.title}>Вход</h3>
			<Formik
				initialValues={initialValues}
				validationSchema={loginSchema}
				onSubmit={handleSubmit}
			>
				{({ touched, values, isValid }) => (
					<Form className={styles.form}>
						<MyInput
							className={clsx(styles.input, styles.email)}
							name='email'
							type='email'
							label='Логин'
						/>
						<MyInput
							className={clsx(styles.input, styles.password)}
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
									touched.email &&
									touched.password &&
									values.email.length > 0 &&
									values.password.length > 0 &&
									isValid,
							})}
							disabled={!isValid}
							type='submit'
						>
							Войти
						</Button>
						<Link className={styles.link} to='/forgot-password'>
							Забыли пароль?
						</Link>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default Auth
