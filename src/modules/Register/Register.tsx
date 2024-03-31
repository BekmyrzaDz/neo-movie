import clsx from 'clsx'
import { Form, Formik } from 'formik'
import { FC, useState } from 'react'
import * as Yup from 'yup'
import { eye, eyeOff } from '../../assets'
import { Button, Checkbox, MyInput } from '../../componets'
import styles from './Register.module.scss'

interface RegisterProps {
	setOpenRegister: React.Dispatch<React.SetStateAction<boolean>>
	setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>
}

interface IRegister {
	username: string
	email: string
	password: string
}

// Register Schema
const registerSchema = Yup.object().shape({
	username: Yup.string()
		.typeError('Должно быть строкой')
		.min(2, 'Минимум 2 символа')
		.max(30, 'Максимум 30 символа')
		.required('Обязательное поле'),
	email: Yup.string()
		.email('Неверный логин или почта')
		.required('Обязательное поле'),
	password: Yup.string()
		.min(8, 'Пароль должен содержать не менее 8 символов')
		.required('Обязательное поле'),
})

const initialValues: IRegister = {
	username: '',
	email: '',
	password: '',
}

const handleSubmit = (values: IRegister) => {
	console.log(JSON.stringify(values, null, 2))
}

const Register: FC<RegisterProps> = ({ setOpenRegister, setOpenLogin }) => {
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const toggleShowPassword = (): void => setShowPassword(prev => !prev)
	const toggleOpenLogin = (): void => {
		setOpenRegister(prev => !prev)
		setOpenLogin(prev => !prev)
	}

	return (
		<div className={styles.auth}>
			<h3 className={styles.title}>Регистрация</h3>
			<Formik
				initialValues={initialValues}
				validationSchema={registerSchema}
				onSubmit={handleSubmit}
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
							className={clsx(styles.input, styles.email, {
								[styles.activeInput]: values.email.length > 0,
							})}
							id='email'
							name='email'
							type='email'
							label='Email'
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
						<Checkbox
							className={styles.checkbox}
							id='remember'
							name='remember'
							type='checkbox'
							label='Запомнить меня'
						/>
						<Button
							className={clsx(styles.button, {
								[styles.activeButton]:
									values.username.length > 0 &&
									values.email.length > 0 &&
									values.password.length > 0 &&
									isValid &&
									!isSubmitting,
							})}
							disabled={!isValid || isSubmitting}
							type='submit'
						>
							Зарегистрироваться
						</Button>
						<p className={styles.login} onClick={toggleOpenLogin}>
							Вход
						</p>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default Register
