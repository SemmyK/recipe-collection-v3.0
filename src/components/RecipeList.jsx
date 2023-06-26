import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import RecipeCard from './RecipeCard'
import { toast } from 'react-toastify'

export default function RecipeList({ recipes }) {
	if (recipes === []) {
		toast.info('No recipes to show')
	}

	return (
		<Container style={{ gridAutoRows: '1fr', gap: '2em' }}>
			<Row>
				{recipes &&
					recipes !== [] &&
					recipes.map(recipe => (
						<Col
							key={recipe.id}
							xs={12}
							md={6}
							lg={4}
							style={{ padding: '1em' }}
						>
							<RecipeCard recipe={recipe} />
						</Col>
					))}
			</Row>
		</Container>
	)
}
