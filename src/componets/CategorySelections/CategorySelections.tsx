import clsx from 'clsx'
import { FC } from 'react'
import { Link } from 'react-router-dom'
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
	is_favorite?: boolean
}

interface IFilteredParams {
	category: string
	genre: string[] | undefined
	country: string[] | undefined
	year: string
}

interface ICategorySelections {
	title?: string
	categoryType?: string
	categorySelection?: ICard[]
	filteredParams?: IFilteredParams
	handleCategoryClick?: () => void
	handleGenreClick?: () => void
}

const CategorySelections: FC<ICategorySelections> = ({
	title,
	categoryType,
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

	interface INavList {
		link: string
		value: string
	}

	const navList: INavList[] = [
		{ link: '/', value: 'главное' },
		{ link: '/movies', value: 'фильмы' },
		{ link: '/serials', value: 'сериалы' },
		{ link: '/cartoons', value: 'мультфильмы' },
		{ link: '/anime', value: 'аниме' },
		{ link: '/collections', value: 'подборки' },
	]

	const renderLink = (title: string, list: INavList[]): string => {
		const result = list.find(item => {
			if (item.value.toLowerCase() === title.toLowerCase()) return item.link
		})

		return result?.link as string
	}

	return (
		<section className={styles.categorySelectionsSection}>
			{title && (
				<h2
					className={clsx(styles.title, {
						[styles.filterTitle]:
							title?.toLowerCase() === 'Найдено по запросу:'.toLowerCase(),
					})}
				>
					<Link className={styles.link} to={renderLink(title, navList)}>
						{title}
					</Link>
				</h2>
			)}
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
			<div
				className={clsx(styles.categorySelection, {
					[styles.categorySavedSelection]:
						categoryType?.toLowerCase() === 'Сохраненные'.toLowerCase(),
				})}
			>
				{categorySelection?.map(category => (
					<Card
						categoryType={categoryType}
						is_favorite={category?.is_favorite}
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
