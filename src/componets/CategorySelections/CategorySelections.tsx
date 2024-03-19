import { FC } from 'react'
import { Card } from '..'
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
}

const CategorySelections: FC<ICategorySelections> = ({
	title,
	categorySelection,
}) => {
	return (
		<section className={styles.categorySelectionsSection}>
			<h2 className={styles.title}>{title}</h2>
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
