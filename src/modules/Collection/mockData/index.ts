import {
	duna,
	ellaAndTheBlackJaguar,
	oppenheimer,
	wonka,
} from '../../../assets'

interface ICard {
	id: number
	title: string
	image: string
	countryOfOrigin?: string
	rating?: number
	collection?: {
		name?: string
	}
}

export const categorySelectionList: ICard[] = [
	{ id: 1, title: 'Дюна', image: duna, countryOfOrigin: '2021, США, Канада' },
	{
		id: 2,
		title: 'Оппенгеймер',
		image: oppenheimer,
		countryOfOrigin: '2023, США, Великобритания',
	},
	{
		id: 3,
		title: 'Вонка',
		image: wonka,
		countryOfOrigin: '2023, США, Великобритания',
	},
	{
		id: 4,
		title: 'Элла и черный ягуар',
		image: ellaAndTheBlackJaguar,
		countryOfOrigin: '2024, Франция, Германия',
	},
	{ id: 5, title: 'Дюна', image: duna, countryOfOrigin: '2021, США, Канада' },
	{
		id: 6,
		title: 'Оппенгеймер',
		image: oppenheimer,
		countryOfOrigin: '2023, США, Великобритания',
	},
	{
		id: 7,
		title: 'Вонка',
		image: wonka,
		countryOfOrigin: '2023, США, Великобритания',
	},
	{
		id: 8,
		title: 'Элла и черный ягуар',
		image: ellaAndTheBlackJaguar,
		countryOfOrigin: '2024, Франция, Германия',
	},
	{ id: 9, title: 'Дюна', image: duna, countryOfOrigin: '2021, США, Канада' },
	{
		id: 10,
		title: 'Оппенгеймер',
		image: oppenheimer,
		countryOfOrigin: '2023, США, Великобритания',
	},
	{
		id: 11,
		title: 'Вонка',
		image: wonka,
		countryOfOrigin: '2023, США, Великобритания',
	},
	{
		id: 12,
		title: 'Элла и черный ягуар',
		image: ellaAndTheBlackJaguar,
		countryOfOrigin: '2024, Франция, Германия',
	},
	{ id: 13, title: 'Дюна', image: duna, countryOfOrigin: '2021, США, Канада' },
	{
		id: 14,
		title: 'Оппенгеймер',
		image: oppenheimer,
		countryOfOrigin: '2023, США, Великобритания',
	},
	{
		id: 15,
		title: 'Вонка',
		image: wonka,
		countryOfOrigin: '2023, США, Великобритания',
	},
	{
		id: 16,
		title: 'Элла и черный ягуар',
		image: ellaAndTheBlackJaguar,
		countryOfOrigin: '2024, Франция, Германия',
	},
]
