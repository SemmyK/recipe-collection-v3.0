import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
//bootstrap components
import { Container, Button, Card, Row, Col, Form } from 'react-bootstrap'
//hooks
import { useTheme } from '../hooks/useTheme'
import useFirebaseStorage from '../hooks/useFirebaseStorage'
import useFirebaseAuthentication from '../hooks/useFirebaseAuthentication'

//components
import { toast } from 'react-toastify'

function ProfileDetails({ userData: user }) {
	const navigate = useNavigate()
	const { color } = useTheme()
	const { updateUser } = useFirebaseAuthentication()
	const { addFile, progressBar } = useFirebaseStorage()

	const [editedUser, setEditedUser] = useState({
		username: user.username,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		birthday: user.birthday,
	})
	const [selectedFile, setSelectedFile] = useState(null)
	const [avatar, setAvatar] = useState(user.avatar)

	const handleFileChange = event => {
		const file = event.target.files[0]
		setSelectedFile(file)
	}

	const handleUpload = async () => {
		if (selectedFile) {
			const link = await addFile(selectedFile)
			if (link) {
				setAvatar(link)

				setTimeout(
					() => toast.info('Upload done, you can submit the updated profile.'),
					1000
				)
			}
		} else {
			toast.error('Nothing to upload. Please, add a file.')
		}
	}

	const handleEditChange = e => {
		setEditedUser(prev => ({ ...prev, [e.target.id]: e.target.value }))
	}

	const handleEdit = async e => {
		e.preventDefault()
		const copyEditedUser = { ...editedUser, avatar }

		try {
			await updateUser(user, copyEditedUser)

			toast.success('Successfully updated profile.')
		} catch (error) {
			console.log(error)
			toast.error('Could not update data.')
		}

		navigate('/profile')
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
									See and edit your details
								</Card.Title>
								<div className='card-text'>
									<div>
										<Form onSubmit={handleEdit} className='create'>
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
															value={editedUser.email}
															onChange={handleEditChange}
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
														<Form.Label>
															Add photo: (
															<span
																style={{ color: color, fontStyle: 'italic' }}
															>
																click upload to save photo
															</span>
															)
															<span
																style={{ color: '#249c6b', fontWeight: 'bold' }}
															>
																{' '}
																{progressBar}%
															</span>
														</Form.Label>
														<Row>
															<Col xs={9}>
																<input
																	type='file'
																	onChange={handleFileChange}
																/>
															</Col>
															<Col xs={3}>
																<Button
																	variant='outline-success'
																	style={{
																		color: '#fff',
																		backgroundColor: color,
																		border: 'none',
																	}}
																	onClick={handleUpload}
																>
																	Upload
																</Button>
															</Col>
														</Row>
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
														<Form.Label>Username: </Form.Label>
														<input
															style={{ borderColor: color }}
															required
															type='text'
															value={editedUser.username}
															onChange={handleEditChange}
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
															value={editedUser.birthday}
															onChange={handleEditChange}
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
															value={editedUser.firstName}
															onChange={handleEditChange}
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
															value={editedUser.lastName}
															onChange={handleEditChange}
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
														Submit updated profile
													</Button>
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
export default ProfileDetails
