import { useEffect, useState } from 'react'

const useCountdown = (onDone: () => void, initialSeconds: number) => {
	const [seconds, setSeconds] = useState<number>(initialSeconds)
	const [timeout, _setTimeout] = useState<number>()
	const [render, rerender] = useState({})

	const countDown = () => {
		setSeconds(prev => prev - 1)
	}

	const runTimer = () => {
		if (seconds === 0) return onDone()

		const timer = setTimeout(() => {
			countDown()
		}, 1000)

		_setTimeout(timer)
	}

	const reset = () => {
		setSeconds(initialSeconds)
		clearTimeout(timeout)
		rerender({})
	}

	useEffect(() => {
		runTimer()
	}, [seconds, render])

	return { seconds, reset }
}

export default useCountdown
