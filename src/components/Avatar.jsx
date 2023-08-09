//bootstrap components
import { Col, Row } from 'react-bootstrap'
//hooks
import { useTheme } from '../hooks/useTheme'

function Avatar({ user: userData }) {
	const { color } = useTheme()

	return (
		userData && (
			<>
				{userData.avatar !== '' ? (
					<div
						className='avatar shadow-4'
						style={{
							backgroundColor: '#fff',
							color: color,
							width: '100%',
						}}
					>
						<img
							src={userData.avatar}
							className='rounded-circle d-block mx-auto my-auto  img-fluid'
							alt='Avatar'
						/>
					</div>
				) : (
					<Row
						className='avatar rounded-circle shadow-4'
						style={{ backgroundColor: '#fff', color: color }}
					>
						<Col className='letter'>{userData.email[0]}</Col>
					</Row>
				)}
			</>
		)
	)
}
export default Avatar
