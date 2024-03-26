import clsx from 'clsx'
import { FC } from 'react'
import { Card } from '..'
import { cross } from '../../assets'
import { fetchMoviesByType } from '../../componets/FilterBar/redux/asyncActions'
import {
	removeCategory,
	removeCountry,
	removeGenre,
	removeYear,
} from '../../componets/FilterBar/redux/filterBarSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import styles from './CategorySelections.module.scss'

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

interface IFilteredParams {
	category: string
	genre: string[] | undefined
	country: string[] | undefined
	year: string
}

interface ICategorySelections {
	title: string
	categorySelection: ICard[]
	filteredParams?: IFilteredParams
	handleCategoryClick?: () => void
	handleGenreClick?: () => void
}

const CategorySelections: FC<ICategorySelections> = ({
	title,
	categorySelection,
	filteredParams,
}) => {
	const dispatch = useAppDispatch()
	const filterParams = useAppSelector(state => state.filter?.filteredParams)

	const handleCategoryClick = () => {
		dispatch(removeCategory())

		const movieParams: IFilteredParams = {
			category: '',
			genre: filterParams?.genre.map(g => g.toLowerCase()),
			country: filterParams?.country.map(c => c.toLowerCase()),
			year: filterParams?.year || '',
		}

		try {
			dispatch(fetchMoviesByType(movieParams))
		} catch (error) {
			console.log(error)
		}
	}

	const handleGenreClick = (param: string) => {
		dispatch(removeGenre(param))

		const movieParams: IFilteredParams = {
			category: filterParams?.category?.toLowerCase() || '',
			genre: filterParams?.genre
				?.filter(g => g.toLowerCase() !== param.toLowerCase())
				?.map(g => g.toLowerCase()),
			country: filterParams?.country?.map(c => c.toLowerCase()),
			year: filterParams?.year || '',
		}

		try {
			dispatch(fetchMoviesByType(movieParams))
		} catch (error) {
			console.log(error)
		}
	}

	const handleCountryClick = (param: string) => {
		dispatch(removeCountry(param))

		const movieParams: IFilteredParams = {
			category: filterParams?.category?.toLowerCase() || '',
			genre: filterParams?.genre?.map(g => g.toLowerCase()),
			country: filterParams?.country
				?.filter(c => c.toLowerCase() !== param.toLowerCase())
				.map(c => c.toLowerCase()),
			year: filterParams?.year || '',
		}

		try {
			dispatch(fetchMoviesByType(movieParams))
		} catch (error) {
			console.log(error)
		}
	}

	const handleYearClick = () => {
		dispatch(removeYear())

		const movieParams: IFilteredParams = {
			category: filterParams?.category?.toLowerCase() || '',
			genre: filterParams?.genre.map(g => g.toLowerCase()),
			country: filterParams?.country.map(c => c.toLowerCase()),
			year: '' as string,
		}

		try {
			dispatch(fetchMoviesByType(movieParams))
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<section className={styles.categorySelectionsSection}>
			<h2
				className={clsx(styles.title, {
					[styles.filterTitle]:
						title.toLowerCase() === 'Найдено по запросу:'.toLowerCase(),
				})}
			>
				{title}
			</h2>
			{(filteredParams?.category ||
				filteredParams?.country ||
				filteredParams?.genre ||
				filteredParams?.year) && (
				<div className={styles.genreGroup}>
					{filteredParams?.category && (
						<div className={styles.paramButton} key={filteredParams?.category}>
							<p className={styles.paramText}>{filteredParams?.category}</p>
							<img
								className={styles.cross}
								src={cross}
								alt='Cross icon'
								onClick={handleCategoryClick}
							/>
						</div>
					)}
					{filteredParams?.genre?.map(
						param =>
							param && (
								<div className={styles.paramButton} key={param}>
									<p className={styles.paramText}>{param}</p>
									<img
										className={styles.cross}
										src={cross}
										alt='Cross icon'
										onClick={() => handleGenreClick(param)}
									/>
								</div>
							)
					)}
					{filteredParams?.country?.map(
						param =>
							param && (
								<div className={styles.paramButton} key={param}>
									<p className={styles.paramText}>{param}</p>
									<img
										className={styles.cross}
										src={cross}
										alt='Cross icon'
										onClick={() => handleCountryClick(param)}
									/>
								</div>
							)
					)}
					{filteredParams?.year && (
						<div className={styles.paramButton} key={filteredParams?.year}>
							<p className={styles.paramText}>{filteredParams?.year}</p>
							<img
								className={styles.cross}
								src={cross}
								alt='Cross icon'
								onClick={handleYearClick}
							/>
						</div>
					)}
				</div>
			)}
			<div className={styles.categorySelection}>
				{categorySelection?.map(category => (
					<Card
						key={category?.id}
						id={category?.id}
						image={category?.image}
						title={category?.title as string}
						name={category?.name as string}
						country_of_origin={category?.country_of_origin}
					/>
				))}
			</div>
		</section>
	)
}

export default CategorySelections
