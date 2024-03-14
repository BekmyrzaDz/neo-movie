import { Link } from 'react-router-dom'
import { streamlineFilmSlate } from '../../assets'
import styles from './Logo.module.scss'

const Logo = () => {
	return (
		<Link className={styles.logo} to='/'>
			<img
				src={streamlineFilmSlate}
				alt='Logo image'
				className={styles.logoImg}
			/>
			<h2 className={styles.logoTitle}>Movie Matcher</h2>
		</Link>
	)
}

export default Logo
