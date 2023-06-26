import RecipeList from '../components/RecipeList'
import useFirestoreCollection from '../hooks/useFirestoreCollection'

function Home() {
	const { loading, error, items: recipes } = useFirestoreCollection('recipes')

	return (
		<div className='home'>
			{loading ? (
				<div className='loading'>Loading...</div>
			) : error ? (
				<div className='error'>{error}</div>
			) : (
				recipes && recipes !== [] && <RecipeList recipes={recipes} />
			)}
		</div>
	)
}
export default Home
