import { Link, NavLink } from 'react-router-dom'
//context
import { useTheme } from '../hooks/useTheme'
//bootstrap components
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'
//components
import Search from './Search'

function NavMenu() {
	const { color } = useTheme()

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
					id={`offcanvasNavbar-expand-md`}
					aria-labelledby={`offcanvasNavbarLabel-expand-md`}
					placement='end'
				>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title
							id={`offcanvasNavbarLabel-expand-md`}
						></Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<Nav className='justify-content-end flex-grow-1 pe-3'>
							<NavLink to='/'>Home</NavLink>
							<NavLink to='/create'>Create</NavLink>
						</Nav>
						<Search />
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Container>
		</Navbar>
	)
}
export default NavMenu
