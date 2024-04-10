import { Footer, Header } from '../../componets'
import { Profile } from '../../modules'
import styles from './ProfilePage.module.scss'

const ProfilePage = () => {
	return (
		<div className={styles.profile}>
			<Header />
			<div className={styles.profileContent}>
				<div className={styles.container}>
					<div className={styles.profileInner}>
						<Profile />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default ProfilePage
