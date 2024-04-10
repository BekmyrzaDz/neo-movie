import { Footer, Header } from '../../componets'
import { ChangeProfile } from '../../modules'
import styles from './ChangeProfilePage.module.scss'

const ChangeProfilePage = () => {
	return (
		<div className={styles.profile}>
			<Header />
			<div className={styles.profileContent}>
				<div className={styles.container}>
					<div className={styles.profileInner}>
						<ChangeProfile />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default ChangeProfilePage
