import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

export interface InputProps
	extends DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	icon?: string
	name: string
	sendIcon?: string
	handleSubmit?: () => void
}
