import { Footer, Header } from '../../componets'
import { ChangeProfilePassword } from '../../modules'
import styles from './ChangeProfilePasswordPage.module.scss'

const ChangeProfilePasswordPage = () => {
	return (
		<div className={styles.profile}>
			<Header />
			<div className={styles.profileContent}>
				<div className={styles.container}>
					<div className={styles.profileInner}>
						<ChangeProfilePassword />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default ChangeProfilePasswordPage
