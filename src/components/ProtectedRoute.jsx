import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

//preventing logged in user to go to Log in or Sign up page while he/she is logged in
function ProtectedRoute() {
	const { authUser } = useAuthContext()
	return !authUser ? <Outlet /> : <Navigate to='/' />
}
export default ProtectedRoute
