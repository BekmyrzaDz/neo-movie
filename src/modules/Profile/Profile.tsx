import clsx from 'clsx'
import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Button, Modal, MyInput, Spinner } from '../../componets'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import styles from './Profile.module.scss'
import { fetchUser } from './redux/asyncActions'

interface IProfile {
	username: string
	email: string
}

const Profile = () => {
	const [openLogout, setOpenLogout] = useState<boolean>(false)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { user, isLoading } = useAppSelector(state => state.profile)

	const handleOpenLogoutClick = () => {
		setOpenLogout(prev => !prev)
	}

	const handleLogoutClick = () => {
		localStorage.removeItem('access_token')
		localStorage.removeItem('refresh_token')
		navigate('/')
	}

	const initialValues: IProfile = {
		username: user?.username as string,
		email: user?.email as string,
	}

	// Profile Schema
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

	useEffect(() => {
		dispatch(fetchUser())
	}, [dispatch])

	if (isLoading) return <Spinner />

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={profileSchema}
			onSubmit={() => {}}
		>
			{({ values, isValid, isSubmitting }) => (
				<>
					<Form className={styles.form}>
						<h3 className={styles.title}>Профиль</h3>
						<MyInput
							className={clsx(styles.input, styles.username, {
								[styles.activeInput]: values?.username?.length > 0,
							})}
							id='username'
							name='username'
							type='text'
							label='Логин'
							disabled
						/>
						<MyInput
							className={clsx(styles.input, styles.email, {
								[styles.activeInput]: values?.email?.length > 0,
							})}
							id='email'
							name='email'
							type='email'
							label='Email'
							disabled
						/>
						<Link to='/change-profile'>
							<Button
								className={clsx(styles.button, {
									[styles.activeButton]:
										values?.username?.length > 0 &&
										values?.email?.length > 0 &&
										(isValid || isSubmitting),
								})}
								type='button'
							>
								Изменить
							</Button>
						</Link>
						<div className={styles.profileBtns}>
							<Link to='/change-profile-password'>
								<button className={styles.profileBtn}>Изменить пароль</button>
							</Link>
							<button
								className={styles.profileBtn}
								type='button'
								onClick={handleOpenLogoutClick}
							>
								Выйти
							</button>
						</div>
					</Form>
					{openLogout && (
						<Modal active={openLogout} setActive={setOpenLogout}>
							<div className={styles.logout}>
								<h4 className={styles.logoutTitle}>
									Вы действительно хотите выйти из аккаунта?
								</h4>
								<Button
									className={clsx(styles.button, styles.logoutBtn)}
									type='button'
									onClick={handleLogoutClick}
								>
									Выйти
								</Button>
								<Button
									className={clsx(styles.button, styles.cancelBtn)}
									type='button'
									onClick={handleOpenLogoutClick}
								>
									Отмена
								</Button>
							</div>
						</Modal>
					)}
				</>
			)}
		</Formik>
	)
}

export default Profile
