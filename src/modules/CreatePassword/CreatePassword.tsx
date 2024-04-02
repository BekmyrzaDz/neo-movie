import clsx from 'clsx'
import { Form, Formik } from 'formik'
import { FC, useState } from 'react'
import * as Yup from 'yup'
import { eye, eyeOff } from '../../assets'
import { Button, MyInput } from '../../componets'
import styles from './CreatePassword.module.scss'

interface ICreatePassword {
	new_password: string
	password_confirm: string
}

// Create Password Schema
const createPasswordSchema = Yup.object().shape({
	new_password: Yup.string()
		.min(8, 'Пароль должен содержать не менее 8 символов')
		.required('Обязательное поле'),
	password_confirm: Yup.string()
		.min(8, 'Пароль должен содержать не менее 8 символов')
		.oneOf([Yup.ref('new_password'), null], 'Пароли не совпадают')
		.required('Обязательное поле'),
})

const initialValues: ICreatePassword = {
	new_password: '',
	password_confirm: '',
}

const CreatePassword: FC = () => {
	const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
	const toggleShowNewPassword = (): void => setShowNewPassword(prev => !prev)
	const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false)
	const toggleShowPasswordConfirm = (): void =>
		setShowPasswordConfirm(prev => !prev)

	const handleSubmit = (values: ICreatePassword) => {
		console.log(JSON.stringify(values, null, 2))
	}

	return (
		<div className={styles.createPassword}>
			<h3 className={styles.title}>Новый пароль</h3>
			<h5 className={styles.subtitle}>Пароль должен состоять из 8 символов</h5>
			<Formik
				initialValues={initialValues}
				validationSchema={createPasswordSchema}
				onSubmit={handleSubmit}
			>
				{({ values, isValid, isSubmitting }) => (
					<Form className={styles.form}>
						<MyInput
							className={clsx(styles.input, styles.newPassword, {
								[styles.activeInput]: values.new_password.length > 0,
							})}
							id='new_password'
							name='new_password'
							type={showNewPassword ? 'text' : 'password'}
							label='Пароль'
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
								values.new_password.length > 0
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
									!(values.new_password.length < 8) &&
									!(values.password_confirm.length < 8) &&
									(isValid || isSubmitting),
							})}
							disabled={!isValid || isSubmitting}
							type='submit'
						>
							Сохранить
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default CreatePassword
