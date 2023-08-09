import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
//firebase
import { sendPasswordResetEmail } from 'firebase/auth'
//hooks
import { useTheme } from '../hooks/useTheme'
import useFirebaseAuthentication from '../hooks/useFirebaseAuthentication'
// bootstrap components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button, Card } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
//components
import { toast } from 'react-toastify'

function ForgotPassword() {
	const navigate = useNavigate('/')
	const { color } = useTheme()
	const { auth } = useFirebaseAuthentication()
	const [email, setEmail] = useState('')

	const handleSubmit = async e => {
		e.preventDefault()

		try {
			await sendPasswordResetEmail(auth, email)
			toast.info('Email was sent.')
			setTimeout(() => navigate('/'), 1000)
		} catch (error) {
			console.log(error)
			toast.error('Could not send reset email.')
		}
	}

	return (
		<div className='signup-in'>
			<Container style={{ gridAutoRows: '1fr', gap: '2em' }}>
				<Row>
					{/* sign in user */}
					<Col xs={12} style={{ padding: '1em' }}>
						<Card style={{ borderRadius: '6px' }}>
							<Card.Body>
								<Card.Title
									className='text-center'
									style={{
										color: color,
										boxShadow: ` 0 8px 6px -6px ${color}`,
									}}
								>
									Forgot Password
								</Card.Title>
								<div className='card-text'>
									<div>
										<Form onSubmit={handleSubmit} className='create'>
											<Row>
												<Col xs={12} md={8}>
													{' '}
													<Form.Group
														className='mb-3'
														controlId='exampleForm.ControlInput1'
													>
														<Form.Label>Email:</Form.Label>
														<input
															type='email'
															value={email}
															onChange={e => setEmail(e.target.value)}
															id='email'
															style={{ borderColor: color }}
															required
														/>
													</Form.Group>
												</Col>
											</Row>

											<Row>
												<Col xs={10} md={5} xl={4}>
													<Button
														className='mx-auto'
														variant='outline-success'
														type='submit'
														style={{
															background: color,
															border: 'none',
															padding: '0.75em 1.5em',
															display: 'block',
															width: '100%',
														}}
													>
														Send Reset Link
													</Button>
												</Col>
												<Col xs={10} md={5} xl={4}>
													<Link to='/signin'>
														<Button
															className='mx-auto'
															variant='outline-success'
															type='submit'
															style={{
																background: color,
																border: 'none',
																padding: '0.75em 1.5em',
																display: 'block',
																width: '100%',
															}}
														>
															Sign In instead
														</Button>
													</Link>
												</Col>
											</Row>
										</Form>
									</div>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	)
}
export default ForgotPassword
