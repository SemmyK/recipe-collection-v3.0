import Card from 'react-bootstrap/Card'
import { useTheme } from '../hooks/useTheme'
import ButtonBox from './ButtonBox'

function RecipeCard({ recipe }) {
	const { color } = useTheme()

	return (
		<Card style={{ height: '100%' }}>
			<Card.Body>
				<Card.Title className='text-center' style={{ background: color }}>
					{recipe.title}
				</Card.Title>
				<Card.Subtitle className='mb-2 text-muted  '>
					<ul
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							justifyContent: 'left',
						}}
					>
						{recipe.ingredients &&
							recipe.ingredients.map(ing => (
								<li
									style={{ listStyleType: 'none', marginRight: '5px' }}
									key={ing}
								>
									{ing}
								</li>
							))}
					</ul>
				</Card.Subtitle>
				<Card.Text>{recipe.method && recipe.method.slice(0, 100)}...</Card.Text>
				<p className='blockquote-footer'>{recipe.cookingTime} to make.</p>
			</Card.Body>
			<ButtonBox
				link={`/recipes/${recipe.id}`}
				color={color}
				recipe={recipe}
				text='Cook this'
			/>
		</Card>
	)
}
export default RecipeCard
