import React from 'react'
import { useNavigate } from 'react-router-dom'
//hooks
import { useTheme } from '../hooks/useTheme'
//bootstrap
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
//components
import Avatar from '../components/Avatar'
import RecipeList from '../components/RecipeList'

function Profile({ user, userPosts: recipes }) {
	const navigate = useNavigate()
	const { color } = useTheme()

	return (
		<Container className='profile'>
			<Row style={{ alignItems: 'stretch', justifyContent: 'center' }}>
				<Col xs={12} md={3} className='mx-auto'>
					<Avatar user={user} />
				</Col>
				<Col xs={12} md={9} style={{ textAlign: 'center', fontWeight: '500' }}>
					<Row>
						<Col xs={12} className='mb-4 text-center '>
							<Card.Title
								className='mx-auto'
								style={{
									paddingBottom: '1em',
									boxShadow: ` 0 8px 6px -6px #333`,
									width: '50%',
								}}
							>
								<h2
									style={{
										fontWeight: '700',
										fontSize: '2em',
									}}
								>
									Profile Summary
								</h2>
							</Card.Title>
						</Col>
						<Card.Body>
							<Row>
								<Col
									xs={12}
									className='mt-4'
									style={{
										borderLeftColor: color,
										borderWidth: '2px',
									}}
								>
									<h3 style={{ display: 'inline-block' }}>
										{' '}
										Profile created:{' '}
									</h3>
									<p style={{ fontSize: '1.8em', display: 'inline-block' }}>
										{' '}
										{user.profileCreated &&
											user.profileCreated.toDate().toDateString()}
									</p>
								</Col>
								<Col
									xs={12}
									s={6}
									className='mt-4 recipes-created'
									style={{
										borderLeftColor: color,
										borderWidth: '2px',
									}}
								>
									<h3> Recipes created:</h3>
									<p style={{ fontSize: '2em' }}>{recipes && recipes.length}</p>
								</Col>
								<Col
									xs={12}
									s={6}
									className='mt-4'
									style={{
										borderLeftColor: color,
										borderWidth: '2px',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<Button
										onClick={() => navigate('/update-profile')}
										variant='btn-outline-success'
										style={{ background: color, color: '#fff' }}
									>
										See or edit Profile Details
									</Button>
								</Col>
							</Row>
						</Card.Body>
					</Row>
				</Col>
			</Row>
			<Row className='mb-4 text-center '>
				<Card.Title
					className='mx-auto mt-5'
					style={{
						color: color,
						padding: '1em',
						boxShadow: ` 0 -8px 6px -6px #333`,
					}}
				>
					<h2
						style={{
							fontWeight: '700',
							fontSize: '2em',
						}}
					>
						Your recipes
					</h2>
				</Card.Title>
			</Row>
			<Row>
				{recipes !== [] && <RecipeList recipes={recipes} userData={user} />}
			</Row>
		</Container>
	)
}
export default Profile
