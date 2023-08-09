import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
//hooks
import { useTheme } from '../hooks/useTheme'
import useFirebaseAuthentication from '../hooks/useFirebaseAuthentication'
//style and bootstrap components
import { Button, Card, Row, Col, Container, Form } from 'react-bootstrap'
//components
import { toast } from 'react-toastify'
//assets
import visiblityIcon from '../assets/visibilityIcon.svg'

function SignUp() {
	const { color } = useTheme()
	const navigate = useNavigate()
	const { createUser, createGoogleUser } = useFirebaseAuthentication()
	const [showPassword, setShowPassword] = useState(false)
	const [userSignUp, setUserSignUp] = useState({
		username: '',
		firstName: '',
		lastName: '',
		email: '',
		birthday: '',
		password: '',
		avatar: '',
	})

	const handleSignUpChange = e => {
		setUserSignUp(prev => ({ ...prev, [e.target.id]: e.target.value.trim() }))
	}

	//handle sign up
	const handleSignUp = async e => {
		e.preventDefault()

		try {
			const userData = { ...userSignUp }
			delete userData.password
			await createUser(userSignUp.email, userSignUp.password, userData)

			toast.success('Successfully finished sign up process')
		} catch (error) {
			toast.error('Error signing up, please try again.')
		}

		navigate('/')
	}

	const handleGoogleSignUp = async () => {
		try {
			const userData = { ...userSignUp }
			delete userData.password

			const googleAuthUser = await createGoogleUser(userData)
			console.log(googleAuthUser)

			toast.success('Successfully finished sign up process')
		} catch (error) {
			console.log(error)
			toast.error(
				'There was an error signing you up with Google. Please try again.'
			)
		}

		navigate('/')
	}

	return (
		<div className='signup-in'>
			<Container style={{ gridAutoRows: '1fr', gap: '2em' }}>
				<Row>
					{/* sign up user */}
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
									Sign Up Here
								</Card.Title>
								<div className='card-text'>
									<div>
										<Form onSubmit={handleSignUp} className='create'>
											<Row>
												<Col xs={12} md={6}>
													{' '}
													<Form.Group
														className='mb-3'
														controlId='exampleForm.ControlInput1'
													>
														<Form.Label>Email</Form.Label>
														<input
															type='email'
															value={userSignUp.email}
															onChange={handleSignUpChange}
															id='email'
															style={{ borderColor: color }}
															required
														/>
													</Form.Group>
												</Col>
												<Col xs={12} md={6}>
													<Form.Group
														className='mb-3'
														controlId='exampleForm.ControlInput1'
													>
														<Form.Label>Password: </Form.Label>
														<Row>
															<Col xs={10} className='p-0'>
																<input
																	style={{ borderColor: color }}
																	required
																	type={showPassword ? 'text' : 'password'}
																	value={userSignUp.password}
																	onChange={handleSignUpChange}
																	id='password'
																/>
															</Col>
															<Col xs={1} className='py-0 px-1'>
																<img
																	src={visiblityIcon}
																	alt='show password'
																	onClick={() => setShowPassword(prev => !prev)}
																/>
															</Col>
														</Row>
													</Form.Group>
												</Col>
											</Row>

											<Row>
												<Col xs={12} md={6}>
													<Form.Group
														className='mb-3'
														controlId='exampleForm.ControlInput1'
													>
														<Form.Label>Username: </Form.Label>
														<input
															style={{ borderColor: color }}
															required
															type='text'
															value={userSignUp.username}
															onChange={handleSignUpChange}
															id='username'
														/>
													</Form.Group>
												</Col>

												<Col xs={12} md={6}>
													<Form.Group
														className='mb-3'
														controlId='exampleForm.ControlInput1'
													>
														<Form.Label>Birthday: </Form.Label>
														<input
															style={{ borderColor: color }}
															type='date'
															value={userSignUp.birthday}
															onChange={handleSignUpChange}
															id='birthday'
														/>
													</Form.Group>
												</Col>
											</Row>

											<Row>
												<Col xs={12} md={6}>
													{' '}
													<Form.Group
														className='mb-3'
														controlId='exampleForm.ControlInput1'
													>
														<Form.Label>First Name: </Form.Label>
														<input
															style={{ borderColor: color }}
															required
															type='text'
															value={userSignUp.firstName}
															onChange={handleSignUpChange}
															id='firstName'
														/>
													</Form.Group>
												</Col>
												<Col xs={12} md={6}>
													<Form.Group
														className='mb-3'
														controlId='exampleForm.ControlInput1'
													>
														<Form.Label>Last Name: </Form.Label>
														<input
															style={{ borderColor: color }}
															required
															type='text'
															value={userSignUp.lastName}
															onChange={handleSignUpChange}
															id='lastName'
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
														Sign Up
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

									<Row className='social'>
										<Col xs={12} md={5} xl={4}>
											{/* <!-- Google register button--> */}
											<button
												className='btn btn-block btn-social btn-google'
												onClick={handleGoogleSignUp}
											>
												<i className='fab fa-google'></i>
												<span className='social-text'>Sign Up with Google</span>
											</button>
										</Col>
									</Row>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	)
}
export default SignUp
