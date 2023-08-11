import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import RecipeCard from './RecipeCard'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

export default function RecipeList({ recipes, userData }) {
	useEffect(() => {
		if (recipes === []) {
			toast.info('No recipes to show')
		}
	}, [recipes])

	return (
		<article className='mx-auto' style={{ padding: '1em ', width: '95%' }}>
			<Row className='mx-auto w-100'>
				{recipes &&
					recipes !== [] &&
					recipes.map(recipe => (
						<Col
							key={recipe.id}
							xs={12}
							md={6}
							lg={4}
							style={{ padding: '1em 0' }}
						>
							<RecipeCard recipe={recipe} userData={userData} />
						</Col>
					))}
			</Row>
		</article>
	)
}
