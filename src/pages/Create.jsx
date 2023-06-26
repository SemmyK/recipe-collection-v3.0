import { useRef, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import useFirebase from '../hooks/useFirebase'

function Create() {
	const { color } = useTheme()
	const navigate = useNavigate()
	const ingredientInput = useRef(null)
	const [ingredient, setIngredient] = useState('')
	const [ingredients, setIngredients] = useState([])
	const { createItem } = useFirebase()
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

	const handleSubmit = e => {
		e.preventDefault()

		newRecipe &&
			ingredients !== [] &&
			createItem('recipes', {
				title: newRecipe.title,
				ingredients: ingredients,
				cookingTime: newRecipe.cookingTime + ' minutes',
				method: newRecipe.method + ' Enjoy your meal!',
			})
		setNewRecipe({
			title: '',
			cookingTime: '',
			method: '',
		})
		setIngredients([])
		toast.success('Recipe added successfully!')
		setTimeout(() => navigate('/', 100))
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

								<Form.Group
									className='mb-3 ingInput'
									controlId='exampleForm.ControlInput1'
								>
									<Form.Label>Ingredients (add one by one):</Form.Label>
									<input
										style={{ borderColor: color }}
										ref={ingredientInput}
										type='string'
										value={ingredient}
										onChange={e => setIngredient(e.target.value)}
									/>
									<Button
										onClick={handleAdd}
										style={{ background: color, border: 'none' }}
									>
										Add
									</Button>

									<p>
										{' '}
										Current ingredients:
										{ingredients !== [] &&
											ingredients.map(ing => <span key={ing}> {ing} |</span>)}
									</p>
								</Form.Group>

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
