import clsx from 'clsx'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { eye, eyeOff } from '../../assets'
import { Button, MyInput, Spinner } from '../../componets'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import styles from './ChangeProfilePassword.module.scss'
import { changeProfilePassword } from './redux/asyncActions'

interface IChangeProfilePassword {
	current_password: string
	new_password: string
	password_confirm: string
}

const ChangeProfilePassword = () => {
	const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false)
	const toggleShowCurrentPassword = (): void =>
		setShowCurrentPassword(prev => !prev)
	const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
	const toggleShowNewPassword = (): void => setShowNewPassword(prev => !prev)
	const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false)
	const toggleShowPasswordConfirm = (): void =>
		setShowPasswordConfirm(prev => !prev)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { isLoading } = useAppSelector(state => state.changeProfilePassword)

	const initialValues: IChangeProfilePassword = {
		current_password: '',
		new_password: '',
		password_confirm: '',
	}

	// Change Profile Password Schema
	const profilePasswordSchema = Yup.object().shape({
		current_password: Yup.string()
			.min(8, 'Пароль должен содержать не менее 8 символов')
			.required('Обязательное поле'),
		new_password: Yup.string()
			.min(8, 'Пароль должен содержать не менее 8 символов')
			.required('Обязательное поле'),
		password_confirm: Yup.string()
			.min(8, 'Пароль должен содержать не менее 8 символов')
			.oneOf([Yup.ref('new_password'), null], 'Пароли не совпадают')
			.required('Обязательное поле'),
	})

	const handleSubmit = (values: IChangeProfilePassword) => {
		console.log(JSON.stringify(values, null, 2))
		dispatch(changeProfilePassword(values))
	}

	const handleBack = () => {
		navigate(-1)
	}

	if (isLoading) return <Spinner />

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={profilePasswordSchema}
			onSubmit={handleSubmit}
		>
			{({ values, isValid, isSubmitting }) => (
				<Form className={styles.form}>
					<h3 className={styles.title}>Изменение пароля</h3>
					<MyInput
						className={clsx(styles.input, styles.currentPassword, {
							[styles.activeInput]: values.current_password.length > 0,
						})}
						id='current_password'
						name='current_password'
						type={showCurrentPassword ? 'text' : 'password'}
						label='Текущий пароль'
						passwordIcon={
							values.current_password.length > 0
								? showCurrentPassword
									? eye
									: eyeOff
								: ''
						}
						toggleShowPassword={toggleShowCurrentPassword}
					/>
					<MyInput
						className={clsx(styles.input, styles.newPassword, {
							[styles.activeInput]: values.new_password.length > 0,
						})}
						id='new_password'
						name='new_password'
						type={showNewPassword ? 'text' : 'password'}
						label='Новый пароль'
						passwordIcon={
							values.new_password.length > 0
								? showNewPassword
									? eye
									: eyeOff
								: ''
						}
						toggleShowPassword={toggleShowNewPassword}
					/>
					<MyInput
						className={clsx(styles.input, styles.passwordConfirm, {
							[styles.activeInput]: values.password_confirm.length > 0,
						})}
						id='password_confirm'
						name='password_confirm'
						type={showPasswordConfirm ? 'text' : 'password'}
						label='Повторите пароль'
						passwordIcon={
							values.password_confirm.length > 0
								? showPasswordConfirm
									? eye
									: eyeOff
								: ''
						}
						toggleShowPassword={toggleShowPasswordConfirm}
					/>
					<Button
						className={clsx(styles.button, {
							[styles.activeButton]:
								values?.current_password?.length > 0 &&
								values?.new_password?.length > 0 &&
								values?.password_confirm?.length > 0 &&
								(isValid || isSubmitting),
						})}
						disabled={!isValid || isSubmitting}
						type='submit'
					>
						{values?.current_password?.length > 0 &&
						values?.new_password?.length > 0 &&
						values?.password_confirm?.length > 0 &&
						(isValid || isSubmitting)
							? 'Сохранить'
							: 'Продолжить'}
					</Button>
					<button
						className={styles.profileBtn}
						type='button'
						onClick={handleBack}
					>
						Назад
					</button>
				</Form>
			)}
		</Formik>
	)
}

export default ChangeProfilePassword
