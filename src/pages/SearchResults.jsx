import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
//hooks
import { useTheme } from '../hooks/useTheme'
//bootstrap
import { Container } from 'react-bootstrap'
//components
import RecipeList from '../components/RecipeList'
import { ScaleLoader } from 'react-spinners'

function SearchResults({ searchedData: searchResults, loading, error }) {
	const navigate = useNavigate()
	const { color } = useTheme()
	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)
	const searchTerm = queryParams.get('q')

	useEffect(() => {
		if (searchResults.length === 0) {
			// Redirect to '/'
			setTimeout(() => {
				navigate('/')
			}, 2000)
		}
	}, [searchResults])

	return (
		<Container className='home search'>
			{loading && (
				<div className='d-flex justify-content-center align-items-center  h-100'>
					<ScaleLoader color={color} width='10px' height='100px' />
				</div>
			)}
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
							{searchResults.length !== 0 ? (
								<RecipeList recipes={searchResults} />
							) : (
								<h2>No recipes to show</h2>
							)}
						</>
					)}
				</>
			)}
		</Container>
	)
}
export default SearchResults
