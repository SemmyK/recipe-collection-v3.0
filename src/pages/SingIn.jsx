import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
//hooks
import { useTheme } from '../hooks/useTheme'
import useFirebaseAuthentication from '../hooks/useFirebaseAuthentication'
//style and bootstrap components
import { Button, Card, Form, Col, Row, Container } from 'react-bootstrap'
//components
import { toast } from 'react-toastify'
//assets
import visiblityIcon from '../assets/visibilityIcon.svg'

function SignIn({ user }) {
	const { color } = useTheme()
	const navigate = useNavigate()
	const { signIn, signInGoogleUser } = useFirebaseAuthentication()
	const [showPassword, setShowPassword] = useState(false)
	const [userSignIn, setUserSignIn] = useState({
		password: '',
		email: '',
	})

	const handleSignInChange = e => {
		setUserSignIn(prev => ({ ...prev, [e.target.id]: e.target.value.trim() }))
	}

	const handleSignIn = async e => {
		e.preventDefault()
		try {
			const userInfo = await signIn(userSignIn.email, userSignIn.password)
			console.log(userInfo)
			userInfo && toast.success(`Welcome back, ${userInfo.username}`)
		} catch (error) {
			toast.error('There was an error signing in. Please try again.')
			console.log(error)
		}
		navigate('/')
	}

	const handleGoogleSignIn = async () => {
		try {
			const userInfo = await signInGoogleUser()
			userInfo && toast.success(`Welcome back, ${userInfo.username}!`)
			console.log(userInfo)
		} catch (error) {
			toast.error(
				'There was an error signing you in with Google. Please try again.'
			)
			console.log(error)
		}

		navigate('/')
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
									Sign In Here
								</Card.Title>
								<div className='card-text'>
									<div>
										<Form onSubmit={handleSignIn} className='create'>
											<Row>
												<Col xs={12} md={6}>
													{' '}
													<Form.Group
														className='mb-3'
														controlId='exampleForm.ControlInput1'
													>
														<Form.Label>Email:</Form.Label>
														<input
															type='email'
															value={userSignIn.email}
															onChange={handleSignInChange}
															id='email'
															style={{ borderColor: color }}
															required
														/>
													</Form.Group>
												</Col>
												<Col xs={12} md={6}>
													{' '}
													<Form.Group
														className='mb-3'
														controlId='exampleForm.ControlInput1'
													>
														<Form.Label>Password:</Form.Label>
														<Row>
															<Col xs={10}>
																{' '}
																<input
																	style={{ borderColor: color }}
																	required
																	type={showPassword ? 'text' : 'password'}
																	value={userSignIn.password}
																	onChange={handleSignInChange}
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
											<p
												className='text-center w-100 mb-2 p-0'
												style={{
													color: color + ' !important',
													fontWeight: 'bold',
												}}
											>
												<Link
													to='/forgot-password'
													style={{
														color: color,
														fontWeight: 'bold',
														padding: '0',
													}}
												>
													Forgot Password?
												</Link>
											</p>
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
														Sign In
													</Button>
												</Col>
												<Col xs={10} md={5} xl={4}>
													<Link to='/signup'>
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
															Sign Up instead
														</Button>
													</Link>
												</Col>
											</Row>
										</Form>
									</div>
									<Row className='social'>
										<Col xs={10} md={5} xl={4}>
											{/* <!-- Google register button--> */}
											<button
												className='btn btn-block btn-social btn-google'
												onClick={handleGoogleSignIn}
											>
												<i className='fab fa-google'></i>
												<span className='social-text'>Sign In with Google</span>
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
export default SignIn
