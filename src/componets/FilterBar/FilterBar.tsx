import clsx from 'clsx'
import { Field, Form, Formik } from 'formik'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Spinner } from '..'
import { cross, filterIcon } from '../../assets'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import styles from './FilterBar.module.scss'
import { filterParams } from './FilterData'
import { fetchMoviesByType } from './redux/asyncActions'
import { setFilterParams } from './redux/filterBarSlice'

const { categories, countries, genres, years } = filterParams

interface FilterBar {
	page?: number
	limit?: number
	setCurrentPage?: React.Dispatch<React.SetStateAction<number>>
}

interface IInitialValues {
	category: string
	genre: string[]
	country: string[]
	year: string
}

const initialValues: IInitialValues = {
	category: '',
	genre: [],
	country: [],
	year: '',
}

const FilterBar: FC<FilterBar> = ({ page, limit, setCurrentPage }) => {
	const navigate = useNavigate()

	const dispatch = useAppDispatch()
	const { isLoading } = useAppSelector(state => state.filter)

	interface IMoviesByTypeParams {
		category: string
		genre: string[]
		country: string[]
		year: string
		page?: number
		limit?: number
	}

	const handleSubmit = (values: IInitialValues) => {
		const movieParams: IMoviesByTypeParams = {
			category: values.category.toLowerCase(),
			genre: values.genre.map(g => g.toLowerCase()),
			country: values.country.map(c => c.toLowerCase()),
			year: values.year,
			page: page,
			limit: limit,
		}

		dispatch(setFilterParams(values))
		dispatch(fetchMoviesByType(movieParams))
		if (setCurrentPage) setCurrentPage(1)

		setTimeout(() => {
			navigate('/filter')
		}, 0)
	}

	if (isLoading) return <Spinner />

	return (
		<div className={styles.filterBar}>
			<div className={styles.titleGroup}>
				<img src={filterIcon} alt='Filter icon' className={styles.filterIcon} />
				<h3 className={styles.title}>фильтрация</h3>
			</div>
			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				{({ resetForm, touched, values, setFieldValue }) => (
					<Form className={styles.form}>
						<h5 className={styles.formTitle}>Смотреть</h5>
						<div
							className={styles.group}
							role='group'
							aria-labelledby='my-radio-group'
						>
							{categories.values.map(category => (
								<label
									className={clsx(styles.label, styles.radioWrapper)}
									key={category.value}
								>
									<Field
										className={clsx(styles.input, styles.radio)}
										type={categories.type}
										name={categories.name}
										value={category.value}
									/>
									<span>{category.label}</span>
								</label>
							))}
						</div>
						<h5 className={styles.formTitle}>Жанры</h5>
						<div
							className={styles.group}
							role='group'
							aria-labelledby='checkbox-group'
						>
							{genres.values.map(genre => (
								<label
									className={clsx(styles.label, styles.checkboxWrapper)}
									key={genre.value}
								>
									<Field
										className={clsx(styles.input, styles.checkbox)}
										type={genres.type}
										name={genres.name}
										value={genre.value}
									/>
									<span>
										{genre.label.length > 20
											? `${genre.label.slice(0, 20)}...`
											: genre.label}
									</span>
								</label>
							))}
						</div>
						<h5 className={styles.formTitle}>Страна</h5>
						<div
							className={styles.group}
							role='group'
							aria-labelledby='checkbox-group'
						>
							{countries.values.map(country => (
								<label
									className={clsx(styles.label, styles.checkboxWrapper)}
									key={country.value}
								>
									<Field
										className={clsx(styles.input, styles.checkbox)}
										type={countries.type}
										name={countries.name}
										value={country.value}
									/>
									<span>
										{country.label.length > 20
											? `${country.label.slice(0, 20)}...`
											: country.label}
									</span>
								</label>
							))}
						</div>
						<h5 className={styles.formTitle}>Год</h5>
						<div
							className={clsx(styles.group, styles.year)}
							role='group'
							aria-labelledby='my-radio-group'
						>
							{years.values.map(year => (
								<label
									className={clsx(styles.label, styles.radioWrapper)}
									key={year.value}
								>
									<Field
										className={clsx(styles.input, styles.radio)}
										type={years.type}
										name={years.name}
										value={year.value}
									/>
									<span>{year.label}</span>
								</label>
							))}
						</div>

						{(values.category.length > 0 ||
							values.country.length > 0 ||
							values.genre.length > 0 ||
							values.year.length > 0) && (
							<div className={styles.filterParams}>
								<div className={styles.line}></div>
								<div className={styles.filterParamsInner}>
									<div className={styles.mediaGroup}>
										{values.category && (
											<div className={styles.paramButton}>
												<p className={styles.paramText}>{values.category}</p>
												<img
													className={styles.cross}
													src={cross}
													alt='Cross icon'
													onClick={() => setFieldValue('category', '')}
												/>
											</div>
										)}
									</div>
									{values?.genre && (
										<div className={styles.genreGroup}>
											{values?.genre?.map(genre => (
												<div className={styles.paramButton} key={genre}>
													<p className={styles.paramText}>{genre}</p>
													<img
														className={styles.cross}
														src={cross}
														alt='Cross icon'
														onClick={() =>
															setFieldValue('genre', [
																...values.genre.filter(item => item !== genre),
															])
														}
													/>
												</div>
											))}
										</div>
									)}
									{values?.country && (
										<div className={styles.countryGroup}>
											{values?.country?.map(country => (
												<div className={styles.paramButton} key={country}>
													<p className={styles.paramText}>{country}</p>
													<img
														className={styles.cross}
														src={cross}
														alt='Cross icon'
														onClick={() =>
															setFieldValue('country', [
																...values.country.filter(
																	item => item !== country
																),
															])
														}
													/>
												</div>
											))}
										</div>
									)}
									<div className={styles.yearGroup}>
										{values.year && (
											<div className={styles.paramButton}>
												<p className={styles.paramText}>{values.year}</p>
												<img
													className={styles.cross}
													src={cross}
													alt='Cross icon'
													onClick={() => setFieldValue('year', '')}
												/>
											</div>
										)}
									</div>
								</div>
							</div>
						)}

						<div className={styles.buttonGroup}>
							<Button
								className={clsx(styles.button, {
									[styles.disableButton]: true,
									[styles.activeButton]:
										touched.category ||
										touched.country ||
										touched.genre ||
										touched.year,
								})}
								type='submit'
							>
								Найти
							</Button>
							<Button
								className={clsx(styles.reset, {
									[styles.disableButton]: true,
									[styles.activeButton]:
										touched.category ||
										touched.country ||
										touched.genre ||
										touched.year,
								})}
								type='button'
								onClick={() => resetForm()}
							>
								Сбросить
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default FilterBar
