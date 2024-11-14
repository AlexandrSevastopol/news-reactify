import BannersList from '../BannersList/BannersList'
import { useGetLatestNewsQuery } from './../../store/services/newsApi'
import styles from './styles.module.css'

const LatestNews = () => {
	const { data, isLoading } = useGetLatestNewsQuery(null)

	return (
		<section className={styles.section}>
			<BannersList banners={data && data.news} isLoading={isLoading} />
		</section>
	)
}

export default LatestNews
