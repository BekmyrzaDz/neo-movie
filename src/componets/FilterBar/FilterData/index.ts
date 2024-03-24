interface IValues {
	value: string
	label: string
}

interface ICategory {
	type: string
	name: string
	values: IValues[]
}

interface IFilterParams {
	categories: ICategory
	genres: ICategory
	years: ICategory
	countries: ICategory
}

export const filterParams: IFilterParams = {
	categories: {
		type: 'radio',
		name: 'category',
		values: [
			{ value: 'Фильмы', label: 'Фильмы' },
			{
				value: 'Мультфильмы',
				label: 'Мультфильмы',
			},
			{ value: 'Сериалы', label: 'Сериалы' },
			{ value: 'Аниме', label: 'Аниме' },
		],
	},
	genres: {
		type: 'checkbox',
		name: 'genre',
		values: [
			{
				value: 'Семейные',
				label: 'Семейные',
			},
			{ value: 'Драмы', label: 'Драмы' },
			{
				value: 'Новогодние',
				label: 'Новогодние',
			},
			{ value: 'Боевик', label: 'Боевик' },
			{
				value: 'Классика',
				label: 'Классика',
			},
			{ value: 'Ужасы', label: 'Ужасы' },
			{
				value: 'Про животных',
				label: 'Про животных',
			},
			{
				value: 'Анимационные',
				label: 'Анимационные',
			},
			{
				value: 'Подростки',
				label: 'Подростки',
			},
			{
				value: 'Основано на реальных событиях',
				label: 'Основано на реальных событиях',
			},
			{
				value: 'Нетфликс',
				label: 'Нетфликс',
			},
			{
				value: 'Про супергероев',
				label: 'Про супергероев',
			},
			{
				value: 'Приключения',
				label: 'Приключения',
			},
			{ value: 'Научные', label: 'Научные' },
			{
				value: 'Про офис',
				label: 'Про офис',
			},
		],
	},
	countries: {
		type: 'checkbox',
		name: 'country',
		values: [
			{
				value: 'США',
				label: 'США',
			},
			{ value: 'Великобритания', label: 'Великобритания' },
			{
				value: 'Франция',
				label: 'Франция',
			},
			{ value: 'Италия', label: 'Италия' },
			{
				value: 'Испания',
				label: 'Испания',
			},
			{ value: 'Германия', label: 'Германия' },
			{
				value: 'Канада',
				label: 'Канада',
			},
			{
				value: 'Япония',
				label: 'Япония',
			},
			{
				value: 'Китай',
				label: 'Китай',
			},
			{
				value: 'Австралия',
				label: 'Австралия',
			},
			{
				value: 'Южная Корея',
				label: 'Южная Корея',
			},
			{
				value: 'Индия',
				label: 'Индия',
			},
			{
				value: 'Россия',
				label: 'Россия',
			},
			{ value: 'Бразилия', label: 'Бразилия' },
			{
				value: 'Мексика',
				label: 'Мексика',
			},
			{
				value: 'ЮАР',
				label: 'ЮАР',
			},
			{
				value: 'Чехия',
				label: 'Чехия',
			},
			{
				value: 'Швеция',
				label: 'Швеция',
			},
			{
				value: 'Турция',
				label: 'Турция',
			},
			{
				value: 'Новая Зеландия',
				label: 'Новая Зеландия',
			},
		],
	},
	years: {
		type: 'radio',
		name: 'year',
		values: [
			{ value: '1990', label: '1990' },
			{
				value: '1991',
				label: '1991',
			},
			{ value: '1992', label: '1992' },
			{ value: '1993', label: '1993' },
			{ value: '1994', label: '1994' },
			{ value: '1995', label: '1995' },
			{ value: '1996', label: '1996' },
			{ value: '1997', label: '1997' },
			{ value: '1998', label: '1998' },
			{ value: '1999', label: '1999' },
			{ value: '2000', label: '2000' },
			{ value: '2001', label: '2001' },
			{ value: '2002', label: '2002' },
			{ value: '2003', label: '2003' },
			{ value: '2004', label: '2004' },
			{ value: '2005', label: '2005' },
			{ value: '2006', label: '2006' },
			{ value: '2007', label: '2007' },
			{ value: '2008', label: '2008' },
			{ value: '2009', label: '2009' },
			{ value: '2010', label: '2010' },
			{ value: '2011', label: '2011' },
			{ value: '2012', label: '2012' },
			{ value: '2013', label: '2013' },
			{ value: '2014', label: '2014' },
			{ value: '2015', label: '2015' },
			{ value: '2016', label: '2016' },
			{ value: '2017', label: '2017' },
			{ value: '2018', label: '2018' },
			{ value: '2019', label: '2019' },
			{ value: '2020', label: '2020' },
			{ value: '2021', label: '2021' },
			{ value: '2022', label: '2022' },
			{ value: '2023', label: '2023' },
			{ value: '2024', label: '2024' },
		],
	},
}
