import clsx from 'clsx'
import { FC } from 'react'
import { arrowLeft, arrowRight } from '../../assets'
import { DOTS, usePagination } from '../../hooks/usePagination'
import styles from './Pagination.module.scss'

interface IPaginationProps {
	onPageChange: (pageNumber: number) => void
	totalCount: number
	siblingCount?: number
	currentPage: number
	pageSize: number
	className?: string
}

const Pagination: FC<IPaginationProps> = props => {
	const {
		onPageChange,
		totalCount,
		siblingCount = 1,
		currentPage,
		pageSize,
		className,
	} = props

	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	})

	if (currentPage === 0 || paginationRange?.length < 2) {
		return null
	}

	const onNext = () => {
		onPageChange(currentPage + 1)
	}

	const onPrevious = () => {
		onPageChange(currentPage - 1)
	}

	const lastPage: number = paginationRange[paginationRange?.length - 1]

	return (
		<ul
			className={clsx(styles.paginationContainer, {
				[className as string]: className,
			})}
		>
			<li
				className={clsx(styles.paginationItem, {
					[styles.disabled]: currentPage === 1,
				})}
				onClick={onPrevious}
			>
				<img className={clsx(styles.arrow, styles.left)} src={arrowLeft} />
			</li>
			{paginationRange?.map(pageNumber => {
				if (pageNumber === DOTS) {
					return (
						<li
							className={clsx(styles.paginationItem, styles.dots)}
							key={pageNumber}
						>
							&#8230;
						</li>
					)
				}

				return (
					<li
						className={clsx(styles.paginationItem, {
							[styles.selected]: pageNumber === currentPage,
						})}
						key={pageNumber}
						onClick={() => onPageChange(pageNumber)}
					>
						{pageNumber}
					</li>
				)
			})}
			<li
				className={clsx(styles.paginationItem, {
					[styles.disabled]: currentPage === lastPage,
				})}
				onClick={onNext}
			>
				<img className={clsx(styles.arrow, styles.right)} src={arrowRight} />
			</li>
		</ul>
	)
}

export default Pagination
