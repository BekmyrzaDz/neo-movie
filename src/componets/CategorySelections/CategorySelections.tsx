import clsx from 'clsx'
import { FC } from 'react'
import { Card } from '..'
import { cross } from '../../assets'
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

interface ICategorySelections {
	title: string
	categorySelection: ICard[]
	filteredParams?: string[]
}

const CategorySelections: FC<ICategorySelections> = ({
	title,
	categorySelection,
	filteredParams,
}) => {
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
			{filteredParams && (
				<div className={styles.genreGroup}>
					{filteredParams?.map(
						param =>
							param && (
								<div className={styles.paramButton} key={param}>
									<p className={styles.paramText}>{param}</p>
									<img className={styles.cross} src={cross} alt='Cross icon' />
								</div>
							)
					)}
				</div>
			)}
			<div className={styles.categorySelection}>
				{categorySelection?.map(category => (
					<Card
						key={category?.id}
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
