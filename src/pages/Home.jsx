//hooks

import { useTheme } from '../hooks/useTheme'
//components
import { ScaleLoader } from 'react-spinners'
import RecipeList from '../components/RecipeList'
import { toast } from 'react-toastify'

function Home({ recipes, userData, loading, error }) {
	const { color } = useTheme()
	if (loading) {
		return (
			<div className='d-flex justify-content-center align-items-center  h-100'>
				<ScaleLoader color={color} width='10px' height='100px' />
			</div>
		)
	}
	if (error) {
		toast.error(error)
	}
	return (
		<div className='home'>
			{recipes && <RecipeList recipes={recipes} userData={userData} />}
		</div>
	)
}
export default Home
