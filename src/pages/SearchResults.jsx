import { useLocation, useNavigate } from 'react-router-dom'
import RecipeList from '../components/RecipeList'
import { useEffect, useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useTheme } from '../hooks/useTheme'
import useFirebase from '../hooks/useFirebase'

function SearchResults() {
	const navigate = useNavigate()
	const location = useLocation()
	const { color } = useTheme()
	const [searchResults, setSearchResults] = useState(null)
	const queryParams = new URLSearchParams(location.search)
	const searchTerm = queryParams.get('q')
	const { searchWholeCollection, loading, error } = useFirebase()

	const performSearch = useCallback(
		async searchTerm => {
			try {
				const results = await searchWholeCollection('recipes', searchTerm)
				if (results.length === 0) {
					setSearchResults([])
					// Redirect to '/'
					setTimeout(() => {
						navigate('/')
					}, 2000)

					return
				} else {
					setSearchResults(results)

					return
				}
			} catch (error) {
				console.error('Error searching collection:', error)
				toast.error('Error getting searched recipes')
				navigate('/')
				// Handle the error, e.g., show an error message
			}
		},
		[navigate, searchWholeCollection]
	)

	useEffect(() => {
		if (searchTerm) {
			performSearch(searchTerm)
		} else {
			setSearchResults(null)
		}
	}, [searchTerm, performSearch])

	return (
		<div className='home search'>
			{loading && <div className='loading'>Loading...</div>}
			{error && <div className='error'>{error}</div>}

			{searchResults && (
				<>
					{!searchResults || searchResults.length === 0 ? (
						<p
							className='text-center search-title'
							style={{ color: color, boxShadow: ` 0 8px 6px -6px ${color}` }}
						>
							No recipes including word "{searchTerm}"
						</p>
					) : (
						<>
							<p
								className='text-center search-title'
								style={{ color: color, boxShadow: ` 0 8px 6px -6px ${color}` }}
							>
								Recipes including word "{searchTerm}"
							</p>

							<RecipeList recipes={searchResults} />
						</>
					)}
				</>
			)}
		</div>
	)
}
export default SearchResults
