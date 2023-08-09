import { BrowserRouter, Route, Routes } from 'react-router-dom'
//style
//bootstrap style
import 'bootstrap/dist/css/bootstrap.min.css'
//toastify style
import 'react-toastify/dist/ReactToastify.css'
//hooks
import { useTheme } from './hooks/useTheme'
//components
import NavMenu from './components/NavMenu'
import { ToastContainer, toast } from 'react-toastify'
import ThemeSelector from './components/ThemeSelector'
import PrivateRoute from './components/PrivateRoute'
import { ScaleLoader } from 'react-spinners'
import ProtectedRoute from './components/ProtectedRoute'
import RenderPropComponent from './components/RenderPropComponent'
//pages
import Create from './pages/Create'
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import SingleRecipe from './pages/SingleRecipe'
import SignUp from './pages/SignUp'
import SignIn from './pages/SingIn'
import Profile from './pages/Profile'
import ForgotPassword from './pages/ForgotPassword'
import ProfileDetails from './pages/ProfileDetails'
import RecipeDetails from './pages/RecipeDetails'

function App() {
	const { mode, color } = useTheme()

	return (
		<BrowserRouter>
			<RenderPropComponent
				render={({
					authUser,
					isAuthReady: authIsReady,
					userData: userDocument,
					allData: documentsCollection,
					error,
					loading,
					searchedData,
					data,
					userPosts,
				}) => {
					if (loading) {
						return (
							<div className='d-flex justify-content-center align-items-center  h-100'>
								<ScaleLoader color={color} width='10px' height='100px' />
							</div>
						)
					}
					if (error) {
						toast.error('Something went wrong. ')
					}

					return (
						<>
							{authIsReady && (
								<div className={`App ${mode}`}>
									<header className='App-header'>
										<NavMenu authUser={authUser} userData={userDocument} />
										<ThemeSelector />
									</header>
									<main>
										<Routes>
											<Route
												path='/'
												element={
													<Home
														recipes={documentsCollection}
														userData={userDocument}
													/>
												}
											/>

											<Route path='/signup' element={<ProtectedRoute />}>
												<Route path='/signup' element={<SignUp />} />
											</Route>

											<Route path='/signin' element={<ProtectedRoute />}>
												<Route
													path='/signin'
													element={<SignIn user={userDocument} />}
												/>
											</Route>

											<Route
												path='/forgot-password'
												element={<ForgotPassword />}
											/>

											<Route
												path='/recipes/:id'
												element={
													<SingleRecipe
														userData={userDocument}
														singleRecipe={data}
														loading={loading}
														error={error}
													/>
												}
											/>

											<Route
												path='/search'
												element={
													<SearchResults
														searchedData={searchedData}
														loading={loading}
														error={error}
													/>
												}
											/>

											{/* private routes */}
											<Route path='/profile' element={<PrivateRoute />}>
												<Route
													path='/profile'
													element={
														<Profile
															authUser={authUser}
															user={userDocument}
															userPosts={userPosts}
														/>
													}
												/>
											</Route>

											<Route
												path='/create'
												element={<PrivateRoute user={userDocument} />}
											>
												<Route
													path='/create'
													element={<Create user={userDocument} recipe={data} />}
												/>
											</Route>

											<Route
												path='/update-profile'
												element={<PrivateRoute user={userDocument} />}
											>
												<Route
													path='/update-profile'
													element={
														<ProfileDetails
															userData={userDocument}
															authUser={authUser}
														/>
													}
												/>
											</Route>

											<Route
												path='/update-recipe/:id'
												element={<PrivateRoute user={userDocument} />}
											>
												<Route
													path='/update-recipe/:id'
													element={
														<RecipeDetails user={userDocument} recipe={data} />
													}
												/>
											</Route>
										</Routes>
									</main>
									<ToastContainer />
								</div>
							)}
						</>
					)
				}}
			/>
		</BrowserRouter>
	)
}

export default App
