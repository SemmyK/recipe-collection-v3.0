import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
//hooks
import { useTheme } from '../hooks/useTheme'
import useFirebaseFirestore from '../hooks/useFirebaseFirestore'
//bootstrap components
import { Button, Card, Row, Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
//components
import { toast } from 'react-toastify'

function Create({ user, recipe }) {
	const { color } = useTheme()
	const { addDocument } = useFirebaseFirestore('recipes')
	const navigate = useNavigate()
	const ingredientInput = useRef(null)
	const [type, setType] = useState('meal')
	const [ingredient, setIngredient] = useState('')
	const [ingredients, setIngredients] = useState([])
	const [newRecipe, setNewRecipe] = useState({
		title: '',
		cookingTime: '',
		method: '',
	})

	const handleChange = e => {
		setNewRecipe(prev => ({ ...prev, [e.target.id]: e.target.value }))
	}

	const handleAdd = () => {
		if (ingredient !== '') {
			if (!ingredients.includes(ingredient)) {
				setIngredients(prev => [...prev, ingredient.trim()])
				setIngredient('')
			} else {
				toast.error('You already have that ingredient added.')
			}
		} else {
			toast.error('Nothing there to add.')
		}
		ingredientInput.current.focus()
	}

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			if (user && newRecipe && ingredients.length !== 0) {
				await addDocument({
					title: newRecipe.title,
					type: type,
					ingredients: ingredients,
					cookingTime: newRecipe.cookingTime + ' minutes',
					method: newRecipe.method + ' Enjoy your meal!',
					userRef: user.userUID,
				}).then(() => {
					setNewRecipe({
						title: '',
						cookingTime: '',
						method: '',
					})
					setIngredients([])

					toast.success('Successfully added recipe.')
				})
			}
		} catch (error) {
			console.log(error)
			toast.error('Something went wrong. Recipe not added.')
		}

		recipe && setTimeout(() => navigate(`/recipes/${recipe.id}`), 150)
	}

	return (
		<div className='create'>
			<Card>
				<Card.Body>
					<Card.Title
						className='text-center'
						style={{ color: color, boxShadow: ` 0 8px 6px -6px ${color}` }}
					>
						Create Recipe Here
					</Card.Title>
					<div className='card-text'>
						<div>
							<Form onSubmit={handleSubmit} className='create'>
								<Form.Group
									className='mb-3'
									controlId='exampleForm.ControlInput1'
								>
									<Form.Label>Recipe Title:</Form.Label>
									<input
										type='text'
										value={newRecipe.title}
										onChange={handleChange}
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
											<Row>
												<Col xs={12}>
													<Form.Label>Type of recipe:</Form.Label>
												</Col>
												<Col>
													{' '}
													<select
														className='form-select form-select-lg '
														style={{
															borderColor: color + '!important',
														}}
														id='type'
														onChange={e => setType(e.target.value)}
													>
														<option value='meal'>Meal</option>
														<option value='soup'>Soup</option>
														<option value='salad'>Salad</option>
														<option value='snack'>Snack</option>
														<option value='smoothie'>Smoothie</option>
													</select>
												</Col>
											</Row>
										</Form.Group>
									</Col>
									<Col>
										<Form.Group
											className='mb-3'
											controlId='exampleForm.ControlInput1'
										>
											<Form.Label>Cooking Time (in minutes):</Form.Label>
											<input
												style={{ borderColor: color }}
												required
												type='number'
												value={newRecipe.cookingTime}
												onChange={handleChange}
												id='cookingTime'
											/>
										</Form.Group>
									</Col>
								</Row>

								<Form.Group
									className='mb-3 ingInput'
									controlId='exampleForm.ControlInput1'
								>
									<Row>
										<Form.Label>Ingredients (add one by one):</Form.Label>
										<Col xs={7} sm={8}>
											<input
												style={{ borderColor: color }}
												ref={ingredientInput}
												type='string'
												value={ingredient}
												onChange={e => setIngredient(e.target.value)}
											/>
										</Col>
										<Col xs={5} sm={4}>
											<Button
												onClick={handleAdd}
												style={{
													background: color,
													border: 'none',
													width: '100%',
												}}
											>
												Add
											</Button>
										</Col>
									</Row>
									<Row>
										<Col>
											{' '}
											<p>
												{' '}
												Current ingredients:
												{ingredients !== [] &&
													ingredients.map(ing => (
														<span key={ing}> {ing} |</span>
													))}
											</p>
										</Col>
									</Row>
								</Form.Group>

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
										value={newRecipe.method}
										onChange={handleChange}
										id='method'
									/>
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
									{' '}
									Add new recipe
								</Button>
							</Form>
						</div>
					</div>
				</Card.Body>
			</Card>
		</div>
	)
}
export default Create
