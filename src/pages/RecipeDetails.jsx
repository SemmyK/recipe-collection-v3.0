import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
//hooks
import { useTheme } from '../hooks/useTheme'
import useFirebaseFirestore from '../hooks/useFirebaseFirestore'
//bootstrap components
import { Button, Card, Row, Col, Form } from 'react-bootstrap'
//components
import { toast } from 'react-toastify'

function RecipeDetails({ recipe }) {
	const navigate = useNavigate()
	const { id } = useParams()
	const { color } = useTheme()
	const { updateDocument } = useFirebaseFirestore('recipes')
	const [editedRecipe, setEditedRecipe] = useState({
		title: '',
		cookingTime: '',
		method: '',
	})
	const ingredientInput = useRef(null)
	const [ingredientString, setIngredientString] = useState('')
	const [ingredients, setIngredients] = useState([])
	const [newIngredients, setNewIngredients] = useState([])

	useEffect(() => {
		if (recipe) {
			setEditedRecipe({
				...recipe,
				cookingTime: recipe.cookingTime.slice(0, 2),
			})
			setIngredientString(recipe.ingredients.toString())
			setIngredients(recipe.ingredients)
		}

		console.log(editedRecipe, ingredientString, ingredients)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [recipe])

	const handleAdd = () => {
		if (ingredientString) {
			const newIngArray = ingredientString.split(',')
			console.log(newIngArray)
			setNewIngredients(newIngArray)
		}
	}

	const handleEditChange = e => {
		setEditedRecipe(prev => ({ ...prev, [e.target.id]: e.target.value }))
	}

	const handleEdit = async e => {
		e.preventDefault()
		console.log(editedRecipe)
		try {
			const newRecipeCopy = { ...editedRecipe }
			if (newIngredients.length !== 0) {
				newRecipeCopy.ingredients = newIngredients
			}

			newRecipeCopy.cookingTime = editedRecipe.cookingTime + ' minutes'
			const newRecipe = await updateDocument(editedRecipe.id, newRecipeCopy)
			toast.success('Successfully updated recipe.')
			console.log(newRecipe)
		} catch (error) {
			console.log(error)
			toast.error('Could not update recipe.')
		}

		setTimeout(() => navigate(`/recipes/${id}`), 100)
	}

	return (
		<div className='create'>
			<Card>
				<Card.Body>
					<Card.Title
						className='text-center'
						style={{ color: color, boxShadow: ` 0 8px 6px -6px ${color}` }}
					>
						Edit Recipe Here
					</Card.Title>
					<div className='card-text'>
						<div>
							<Form onSubmit={handleEdit} className='create'>
								<Form.Group
									className='mb-3'
									controlId='exampleForm.ControlInput1'
								>
									<Form.Label>Recipe Title:</Form.Label>
									<input
										type='text'
										value={editedRecipe.title}
										onChange={handleEditChange}
										id='title'
										style={{ borderColor: color }}
										required
									/>
								</Form.Group>

								<Row>
									<Col>
										<Form.Group
											className='mb-3'
											controlId='exampleForm.ControlInput1'
										>
											<Form.Label>Cooking Time (in minutes):</Form.Label>
											<input
												style={{ borderColor: color }}
												required
												type='text'
												value={editedRecipe.cookingTime}
												onChange={handleEditChange}
												id='cookingTime'
											/>
										</Form.Group>
									</Col>
								</Row>

								<Form.Group
									className='mb-3'
									controlId='exampleForm.ControlTextarea1'
								>
									<Form.Label>
										Write the steps for cooking (separate each step with full
										stop):
									</Form.Label>
									<textarea
										required
										style={{ border: `1px ${color} solid` }}
										rows={3}
										value={editedRecipe.method}
										onChange={handleEditChange}
										id='method'
									/>
								</Form.Group>

								<Form.Group
									className='mb-3 ingInput'
									controlId='exampleForm.ControlInput1'
								>
									<Row>
										<Form.Label>
											Ingredients (
											<span style={{ color: color, fontStyle: 'italic' }}>
												click apply changes to save shanges in ingredients
											</span>
											) :
										</Form.Label>

										<p>
											<span style={{ color: color, fontWeight: 'bold' }}>
												Current ingredients:
											</span>
											{ingredients !== [] &&
												ingredients.map(ing => <span key={ing}> {ing} |</span>)}
										</p>
										<Col xs={8} s={9}>
											<textarea
												rows={3}
												style={{ borderColor: color }}
												ref={ingredientInput}
												type='string'
												value={ingredientString}
												onChange={e => setIngredientString(e.target.value)}
											/>
										</Col>
										<Col xs={4} s={3}>
											<Button
												onClick={handleAdd}
												style={{
													background: color,
													border: 'none',
													width: '100%',
												}}
											>
												<span>Apply</span> changes<span></span>
											</Button>
										</Col>
									</Row>
									<Row>
										<Col>
											<p>
												<span style={{ color: color, fontWeight: 'bold' }}>
													New ingredients:
												</span>
												{newIngredients !== [] &&
													newIngredients.map(ing => (
														<span key={ing}> {ing} |</span>
													))}
											</p>
										</Col>
									</Row>
								</Form.Group>
								<Button
									className='mx-auto'
									variant='outline-success'
									type='submit'
									style={{
										background: color,
										border: 'none',
										padding: '0.75em 1.5em',
									}}
								>
									Submit edited recipe
								</Button>
							</Form>
						</div>
					</div>
				</Card.Body>
			</Card>
		</div>
	)
}
export default RecipeDetails
