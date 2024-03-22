import { CategorySelections, FilterBar, Footer, Header } from '../../componets'
import styles from './Serial.module.scss'
import { categorySelectionList } from './mockData'

const Serial = () => {
	return (
		<div className={styles.serial}>
			<Header />
			<div className={styles.serialContent}>
				<div className={styles.container}>
					<div className={styles.serialContentInner}>
						<div className={styles.categories}>
							<div className={styles.category}>
								<CategorySelections
									title='Сериалы'
									categorySelection={categorySelectionList}
								/>
							</div>
						</div>
						<FilterBar />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Serial
