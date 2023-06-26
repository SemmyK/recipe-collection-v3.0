import { Button, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import trash from '../assets/trash3.svg'
import useFirebase from '../hooks/useFirebase'
import { toast } from 'react-toastify'

function ButtonBox({ color, text, link, recipe, del, btn, width }) {
	const navigate = useNavigate()
	const { deleteItem } = useFirebase()
	return (
		<div className='btn-div' style={{ width: `${width ? width : ' 80%'}` }}>
			<Row>
				<Col xs={8} lg={btn ? btn : 8}>
					<Link style={{ display: 'block' }} to={link}>
						<Button variant='btn-outline-success' style={{ background: color }}>
							{text}
						</Button>
					</Link>
				</Col>
				<Col xs={4} lg={del ? del : 4}>
					<Button
						variant='btn-outline-success'
						style={{ background: color }}
						className='trash'
						onClick={() => {
							deleteItem('recipes', recipe.id)
							toast.info('Successfully deleted recipe.')
							navigate('/')
						}}
					>
						<img src={trash} alt='delete icon' />
					</Button>
				</Col>
			</Row>
		</div>
	)
}
export default ButtonBox
