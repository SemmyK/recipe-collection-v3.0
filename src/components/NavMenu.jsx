import { Link, NavLink, useNavigate } from 'react-router-dom'
//hooks
import { useTheme } from '../hooks/useTheme'
import useFirebaseAuthentication from '../hooks/useFirebaseAuthentication'
//bootstrap components
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Button } from 'react-bootstrap'
//components
import Search from './Search'
import { toast } from 'react-toastify'
import Avatar from './Avatar'

function NavMenu({ authUser, userData }) {
	const navigate = useNavigate()
	const { color } = useTheme()
	const { logOut } = useFirebaseAuthentication()

	const handleLogOut = () => {
		logOut()
		toast.info('You are logged out.')
		setTimeout(() => navigate('/'), 100)
	}

	return (
		<Navbar
			expand={'md'}
			className=' mb-3 navmenu'
			style={{ background: color }}
		>
			<Container fluid>
				<Link to='/'>
					<h1>Recipe Book</h1>
				</Link>
				<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
				<Navbar.Offcanvas
					style={{ background: color }}
					id={`offcanvasNavbar-expand-md`}
					aria-labelledby={`offcanvasNavbarLabel-expand-md`}
					placement='end'
					className='d-flex justify-content-center align-items-end'
				>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title
							id={`offcanvasNavbarLabel-expand-md`}
						></Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<Search />
						<Nav className='justify-content-end flex-grow-1 pe-3'>
							<NavLink
								to='/'
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									width: 'fit-content',
									height: '3em',
									backgroundColor: color,

									margin: '0 0.5em',
								}}
							>
								Home
							</NavLink>
							{authUser && (
								<NavLink
									to='/create'
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										width: 'fit-content',
										height: '3em',
										backgroundColor: color,

										margin: '0 0.5em',
									}}
								>
									Create
								</NavLink>
							)}
							{!authUser && (
								<NavLink
									to='/signup'
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										width: 'fit-content',
										height: '3em',
										backgroundColor: color,

										margin: '0 0.5em',
									}}
								>
									Sign up
								</NavLink>
							)}
							{!authUser && (
								<NavLink
									to='/signin'
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										width: 'fit-content',
										height: '3em',
										backgroundColor: color,

										margin: '0 0.5em',
									}}
								>
									Sign in
								</NavLink>
							)}
						</Nav>

						{authUser && (
							<Button
								onClick={handleLogOut}
								variant='outline-success'
								style={{
									margin: '0 0.5em',
									backgroundColor: color,
									width: 'fit-content',
								}}
							>
								Log out
							</Button>
						)}
						{authUser && (
							<NavLink
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									backgroundColor: color,
									padding: '0px',
									width: '3em',
									height: ' 3em',
								}}
								to={`/profile`}
							>
								<Avatar user={userData} style={{ width: '100%' }} />
							</NavLink>
						)}
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Container>
		</Navbar>
	)
}
export default NavMenu
