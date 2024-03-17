import clsx from 'clsx'
import { Field, Form, Formik } from 'formik'
import { Button } from '..'
import { filterIcon } from '../../assets'
import styles from './FilterBar.module.scss'
import { filterParams } from './FilterData'

interface IInitalValues {
	category: string
	checked: string[]
	country: string[]
	year: string
}

const FilterBar = () => {
	const initialValues: IInitalValues = {
		category: '',
		checked: [],
		country: [],
		year: '',
	}

	const handleSubmit = (values: IInitalValues) => {
		console.log(values)
	}

	return (
		<div className={styles.filterBar}>
			<div className={styles.titleGroup}>
				<img src={filterIcon} alt='Filter icon' className={styles.filterIcon} />
				<h3 className={styles.title}>фильтрация</h3>
			</div>
			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				{() => (
					<Form className={styles.form}>
						<h5 className={styles.formTitle}>Смотреть</h5>
						<div
							className={styles.group}
							role='group'
							aria-labelledby='my-radio-group'
						>
							{filterParams.category.values.map(category => (
								<label
									className={clsx(styles.label, styles.radioWrapper)}
									key={category.value}
								>
									<Field
										className={clsx(styles.input, styles.radio)}
										type={filterParams.category.type}
										name={filterParams.category.name}
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
							{filterParams.genres.values.map(genre => (
								<label
									className={clsx(styles.label, styles.checkboxWrapper)}
									key={genre.value}
								>
									<Field
										className={clsx(styles.input, styles.checkbox)}
										type={filterParams.genres.type}
										name={filterParams.genres.name}
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
							{filterParams.country.values.map(genre => (
								<label
									className={clsx(styles.label, styles.checkboxWrapper)}
									key={genre.value}
								>
									<Field
										className={clsx(styles.input, styles.checkbox)}
										type={filterParams.genres.type}
										name={filterParams.genres.name}
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
						<h5 className={styles.formTitle}>Год</h5>
						<div
							className={clsx(styles.group, styles.year)}
							role='group'
							aria-labelledby='my-radio-group'
						>
							{filterParams.year.values.map(genre => (
								<label
									className={clsx(styles.label, styles.radioWrapper)}
									key={genre.value}
								>
									<Field
										className={clsx(styles.input, styles.radio)}
										type={filterParams.year.type}
										name={filterParams.year.name}
										value={genre.value}
									/>
									<span>{genre.label}</span>
								</label>
							))}
						</div>

						<div className={styles.buttonGroup}>
							<Button className={styles.button} type='submit'>
								Найти
							</Button>
							<Button className={styles.reset}>Сбросить</Button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default FilterBar
