import clsx from 'clsx'
import { Form, Formik } from 'formik'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Button, MyInput, Spinner } from '../../componets'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import styles from './ChangeProfile.module.scss'
import { changeUser, fetchUser } from './redux/asyncActions'

interface IChangeProfile {
	username: string
	email: string
}

const ChangeProfile = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { user, isLoading } = useAppSelector(state => state.changeProfile)

	const initialValues: IChangeProfile = {
		username: user?.username as string,
		email: user?.email as string,
	}

	// Change Profile Schema
	const profileSchema = Yup.object().shape({
		username: Yup.string()
			.typeError('Должно быть строкой')
			.min(2, 'Минимум 2 символа')
			.max(30, 'Максимум 30 символа')
			.required('Обязательное поле'),
		email: Yup.string()
			.email('Неверный логин или почта')
			.required('Обязательное поле'),
	})

	const handleSubmit = (values: IChangeProfile) => {
		console.log(JSON.stringify(values, null, 2))
		dispatch(changeUser(values))
	}

	const handleBack = () => {
		navigate(-1)
	}

	useEffect(() => {
		dispatch(fetchUser())
	}, [dispatch])

	if (isLoading) return <Spinner />

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={profileSchema}
			enableReinitialize={true}
			onSubmit={handleSubmit}
		>
			{({ values, isValid, isSubmitting }) => (
				<Form className={styles.form}>
					<h3 className={styles.title}>Изменение профиля</h3>
					<MyInput
						className={clsx(styles.input, styles.username, {
							[styles.activeInput]: values?.username?.length > 0,
						})}
						id='username'
						name='username'
						type='text'
						label='Логин'
					/>
					<MyInput
						className={clsx(styles.input, styles.email, {
							[styles.activeInput]: values?.email?.length > 0,
						})}
						id='email'
						name='email'
						type='email'
						label='Email'
					/>
					<Button
						className={clsx(styles.button, {
							[styles.activeButton]:
								values?.username?.length > 0 &&
								values?.email?.length > 0 &&
								(user?.username !== values.username ||
									user?.email !== values.email) &&
								(isValid || isSubmitting),
						})}
						disabled={
							!isValid ||
							isSubmitting ||
							(user?.username === values.username &&
								user?.email === values.email)
						}
						type='submit'
					>
						{values?.username?.length > 0 &&
						values?.email?.length > 0 &&
						(user?.username !== values.username ||
							user?.email !== values.email) &&
						(isValid || isSubmitting)
							? 'Сохранить'
							: 'Продолжить'}
					</Button>
					<button className={styles.profileBtn} onClick={handleBack}>
						Назад
					</button>
				</Form>
			)}
		</Formik>
	)
}

export default ChangeProfile
