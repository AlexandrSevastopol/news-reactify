import React, { useState } from 'react'
import { PAGE_SIZE } from '../../constants/constants'
import { getNews } from '../../api/apiNews'
import { useDebounce } from '../../helpers/hooks/useDebounce'
import { useFetch } from '../../helpers/hooks/useFetch'
import { useFilters } from '../../helpers/hooks/useFilters'
import LatestNews from '../../components/LatestNews/LatestNews'
import NewsByFilters from '../../components/NewsByFilters/NewsByFilters'
import styles from './styles.module.css'

const Main = () => {

   const { filters, changeFilter } = useFilters({
      page_number: 1,
      page_size: PAGE_SIZE,
      category: null,
      keywords: ''
   })

   const debounceKeyWords = useDebounce(filters.keywords, 1500)

   const { data, isLoading } = useFetch(getNews, {
      ...filters,
      keywords: debounceKeyWords
   })

   return (
      <main className={styles.main}>
         <LatestNews banners={data && data.news} isLoading={isLoading} />
         <NewsByFilters
            filters={filters}
            isLoading={isLoading}
            news={data?.news}
            changeFilter={changeFilter}
         />
      </main>
   )
}

export default Main