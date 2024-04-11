import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { emptyIcon, selectionsSavedIcon } from '../../assets'
import {
	CategorySelections,
	Footer,
	Header,
	Modal,
	Spinner,
} from '../../componets'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import Auth from '../Auth/Auth'
import ConfirmCode from '../ConfirmCode/ConfirmCode'
import CreatePassword from '../CreatePassword/CreatePassword'
import ForgotPassword from '../ForgotPassword/ForgotPassword'
import Register from '../Register/Register'
import styles from './Saved.module.scss'
import { fetchSavedByType } from './redux/asyncActions'

interface ISavedParams {
	page: number
	limit: number
}

interface ICard {
	id: number
	title?: string
	image: string
	name?: string
	country_of_origin?: string
	rating?: number
	collection?: {
		name?: string
	}
}

const Saved = () => {
	const dispatch = useAppDispatch()
	const [openLogin, setOpenLogin] = useState<boolean>(false)
	const [openForgotPassword, setOpenForgotPassword] = useState<boolean>(false)
	const [openConfirmCode, setOpenConfirmCode] = useState<boolean>(false)
	const [openCreatePassword, setOpenCreatePassword] = useState<boolean>(false)
	const [openRegister, setOpenRegister] = useState<boolean>(false)
	const { saved, isLoading } = useAppSelector(state => state.saved)
	const token = localStorage.getItem('access_token')

	const handleOpenLogin = () => {
		setOpenLogin(prev => !prev)
	}

	const handleOpenRegister = () => {
		setOpenRegister(prev => !prev)
	}

	const savedParams: ISavedParams = {
		page: 1,
		limit: 16,
	}

	useEffect(() => {
		dispatch(fetchSavedByType(savedParams))
	}, [dispatch])

	if (isLoading) return <Spinner />

	return (
		<div className={styles.saved}>
			<Header />
			<div className={styles.titleContainer}>
				<h2
					className={clsx(styles.title, {
						[styles.emptyTitleAddition]: token && saved?.results?.length === 0,
						[styles.titleIfUnauthorized]: !token,
					})}
				>
					<img
						src={selectionsSavedIcon}
						alt='Saved icon'
						className={styles.savedIcon}
					/>
					Сохраненные
				</h2>
			</div>
			<div
				className={clsx(styles.container, {
					[styles.containerIfNoResults]: token && saved?.results?.length === 0,
					[styles.containerIfUnauthorized]: !token,
				})}
			>
				<div className={styles.savedInner}>
					{token ? (
						<>
							{saved?.results?.length === 0 ? (
								<div className={styles.savedEmpty}>
									<h3 className={styles.emptyTitle}>
										Вы, еще ничего не сохранили
									</h3>
									<img
										src={emptyIcon}
										alt='Empty icon'
										className={styles.emptyImg}
									/>
								</div>
							) : (
								<CategorySelections
									categoryType='Сохраненные'
									categorySelection={saved?.results as ICard[]}
								/>
							)}
						</>
					) : (
						<div className={styles.unauthorized}>
							<h4 className={styles.unauthorizedTitle}>Войдите в профиль </h4>
							<p className={styles.unauthorizedText}>
								Здесь будет храниться Ваше сохраненное
							</p>
							<div className={styles.unauthorizedBtns}>
								<button
									className={clsx(styles.unauthorizedBtn, styles.loginBtn)}
									onClick={handleOpenLogin}
								>
									Войти
								</button>
								<button
									className={clsx(styles.unauthorizedBtn, styles.registerBtn)}
									onClick={handleOpenRegister}
								>
									Регистрация
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
			<Footer title='Сохраненные' />
			{openLogin && (
				<Modal active={openLogin} setActive={setOpenLogin}>
					<Auth
						setOpenLogin={setOpenLogin}
						setOpenForgotPassword={setOpenForgotPassword}
					/>
				</Modal>
			)}
			{openForgotPassword && (
				<Modal active={openForgotPassword} setActive={setOpenForgotPassword}>
					<ForgotPassword
						setOpenConfirmCode={setOpenConfirmCode}
						setOpenLogin={setOpenLogin}
						setOpenForgotPassword={setOpenForgotPassword}
					/>
				</Modal>
			)}
			{openConfirmCode && (
				<Modal active={openConfirmCode} setActive={setOpenConfirmCode}>
					<ConfirmCode
						setOpenConfirmCode={setOpenConfirmCode}
						setOpenCreatePassword={setOpenCreatePassword}
					/>
				</Modal>
			)}
			{openCreatePassword && (
				<Modal active={openCreatePassword} setActive={setOpenCreatePassword}>
					<CreatePassword setOpenCreatePassword={setOpenCreatePassword} />
				</Modal>
			)}
			{openRegister && (
				<Modal active={openRegister} setActive={setOpenRegister}>
					<Register
						setOpenRegister={setOpenRegister}
						setOpenLogin={setOpenLogin}
					/>
				</Modal>
			)}
		</div>
	)
}

export default Saved
