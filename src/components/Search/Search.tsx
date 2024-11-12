import styles from './styles.module.css'

interface Props {
	keywords: string
	setKeywords: (keywords: string) => void
}

const Search = ({ keywords, setKeywords }: Props) => {
	return (
		<div className={styles.search}>
			<input
				type='text'
				className={styles.input}
				value={keywords}
				onChange={e => setKeywords(e.target.value)}
				placeholder='React JS'
			/>
		</div>
	)
}

export default Search
