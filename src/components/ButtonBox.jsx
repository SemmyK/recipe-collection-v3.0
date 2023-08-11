import { Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import trash from '../assets/trash3.svg'
import edit from '../assets/edit.svg'

import { toast } from 'react-toastify'
import useFirebaseFirestore from '../hooks/useFirebaseFirestore'

function ButtonBox({ color, text, recipe, width, userData }) {
	const navigate = useNavigate()
	const { deleteDocument, getDocById } = useFirebaseFirestore('recipes')
	const handleClick = async e => {
		if (e.target.innerText === 'Cook this') {
			await getDocById(recipe.id)
			navigate(`/recipes/${recipe.id}`)
		} else {
			navigate('/')
		}
	}
	return (
		<div className='btn-div' style={{ width: `${width ? width : '100%'}` }}>
			<Row>
				<Row>
					<Col xs={10}>
						<Button
							variant='btn-outline-success'
							style={{ background: color, display: 'block' }}
							onClick={handleClick}
						>
							{text}
						</Button>
					</Col>
				</Row>

				{userData && recipe.userRef === userData.userUID && (
					<Col xs={5}>
						<Button
							variant='btn-outline-success'
							style={{ background: color }}
							className='trash'
							onClick={() => {
								deleteDocument(recipe.id)
								toast.info('Successfully deleted recipe.')
								navigate('/')
							}}
						>
							<img src={trash} alt='delete icon' />
						</Button>
					</Col>
				)}
				{userData && recipe.userRef === userData.userUID && (
					<Col xs={5}>
						<Button
							variant='btn-outline-success'
							style={{ background: color }}
							className='trash'
							onClick={() => {
								getDocById(recipe.id)
								navigate(`/update-recipe/${recipe.id}`)
							}}
						>
							<img src={edit} alt='delete icon' />
						</Button>
					</Col>
				)}
			</Row>
		</div>
	)
}
export default ButtonBox
