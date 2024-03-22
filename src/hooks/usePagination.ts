import { FC, useMemo } from 'react'

export const DOTS = '...'

const range = (start: number, end: number) => {
	const length: number = end - start + 1
	return Array.from({ length }, (_, idx) => idx + start)
}

interface IUsePagination {
	totalCount: number
	pageSize: number
	siblingCount?: number
	currentPage: number
}

export const usePagination: FC<IUsePagination> = ({
	totalCount,
	pageSize,
	siblingCount = 1,
	currentPage,
}) => {
	const paginationRange = useMemo(() => {
		const totalPageCount = Math.ceil(totalCount / pageSize)

		const totalPageNumbers: number = siblingCount + 5

		if (totalPageNumbers >= totalPageCount) {
			return range(1, totalPageCount)
		}

		const leftSiblingIndex: number = Math.max(currentPage - siblingCount, 1)
		const rightSiblingIndex: number = Math.min(
			currentPage + siblingCount,
			totalPageCount
		)

		const shouldShowLeftDots: boolean = leftSiblingIndex > 2
		const shouldShowRightDots: boolean = rightSiblingIndex < totalPageCount - 2

		const firstPageIndex: number = 1
		const lastPageIndex: number = totalPageCount

		if (!shouldShowLeftDots && shouldShowRightDots) {
			const leftItemCount: number = 3 + 2 * siblingCount
			const leftRange: number[] = range(1, leftItemCount)

			return [...leftRange, DOTS, totalPageCount]
		}

		if (shouldShowLeftDots && !shouldShowRightDots) {
			const rightItemCount: number = 3 + 2 * siblingCount
			const rightRange: number[] = range(
				totalPageCount - rightItemCount + 1,
				totalPageCount
			)
			return [firstPageIndex, DOTS, ...rightRange]
		}

		if (shouldShowLeftDots && shouldShowRightDots) {
			const middleRange: number[] = range(leftSiblingIndex, rightSiblingIndex)
			return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
		}
	}, [totalCount, pageSize, siblingCount, currentPage])

	return paginationRange
}
