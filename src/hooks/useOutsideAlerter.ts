// Хук для отслеживания кликов вне зоны компонента
import { RefObject, useEffect, useRef } from 'react'

export function useOutsideAlerter(
	onOutsideClick: () => void
): RefObject<HTMLDivElement> {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		function handleClick(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onOutsideClick()
			}
		}

		document.addEventListener('mousedown', handleClick)

		return () => {
			document.removeEventListener('mousedown', handleClick)
		}
	}, [onOutsideClick])

	return ref
}
