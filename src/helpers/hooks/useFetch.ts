import { useEffect, useState } from 'react'

interface fetchFunction<P, T> {
	(params?: P): Promise<T>
}

interface UseFetchResult<T> {
	data: T | null | undefined
	isLoading: boolean
	error: Error | null
}

export const useFetch = <T, P>(
	fetchFunction: fetchFunction<P, T>,
	params?: P
): UseFetchResult<T> => {
	const [data, setData] = useState<T | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState<Error | null>(null)

	const stringParams = params ? new URLSearchParams(params).toString() : ''

	useEffect(() => {
		;(async () => {
			try {
				setIsLoading(true)
				const result = await fetchFunction(params)
				setData(result)
			} catch (error) {
				setError(error as Error)
			} finally {
				setIsLoading(false)
			}
		})()
	}, [fetchFunction, stringParams])
	return { data, isLoading, error }
}
