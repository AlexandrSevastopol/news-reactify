import NewsList from '../NewsList/NewsList'
import { TOTAL_PAGES } from '../../constants/constants'
import NewsFilters from '../NewsFilters/NewsFilters'
import { useDebounce } from '../../helpers/hooks/useDebounce'
import PaginationWrapper from '../PaginationWrapper/PaginationWrapper'
import { useGetNewsQuery } from './../../store/services/newsApi'
import { useAppDispatch, useAppSelector } from './../../store/index'
import { setFilters } from './../../store/slices/newsSlice'
import styles from './styles.module.css'

const NewsByFilters = () => {
	const dispatch = useAppDispatch()

	const filters = useAppSelector(state => state.news.filters)
	const news = useAppSelector(state => state.news.news)
	console.log('news:', news)

	const debounceKeyWords = useDebounce(filters.keywords, 1500)

	const { isLoading } = useGetNewsQuery({
		...filters,
		keywords: debounceKeyWords,
	})

	const handleNextPage = () => {
		if (filters.page_number < TOTAL_PAGES) {
			dispatch(
				setFilters({ key: 'page_number', value: filters.page_number + 1 })
			)
		}
	}

	const handlePreviousPage = () => {
		if (filters.page_number > 1) {
			dispatch(
				setFilters({ key: 'page_number', value: filters.page_number - 1 })
			)
		}
	}

	const handlePageClick = (pageNumber: number) => {
		dispatch(setFilters({ key: 'page_number', value: pageNumber }))
	}

	return (
		<section className={styles.section}>
			<NewsFilters filters={filters} />
			<PaginationWrapper
				top
				bottom
				handleNextPage={handleNextPage}
				handlePreviousPage={handlePreviousPage}
				handlePageClick={handlePageClick}
				totalPages={TOTAL_PAGES}
				currentPage={filters.page_number}
			>
				<NewsList isLoading={isLoading} news={news} />
			</PaginationWrapper>
		</section>
	)
}

export default NewsByFilters
