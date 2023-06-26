//style
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
//components
import NavMenu from './components/NavMenu'
import { ToastContainer } from 'react-toastify'

//pages
import Create from './pages/Create'
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import SingleRecipe from './pages/SingleRecipe'
import ThemeSelector from './components/ThemeSelector'
import { useTheme } from './hooks/useTheme'

function App() {
	const { mode } = useTheme()
	return (
		<BrowserRouter>
			<div className={`App ${mode}`}>
				<header className='App-header'>
					<NavMenu />
					<ThemeSelector />
				</header>
				<main>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/create' element={<Create />} />
						<Route path='/recipes/:id' element={<SingleRecipe />} />
						<Route path='/search' element={<SearchResults />} />
					</Routes>
				</main>
				<ToastContainer />
			</div>
		</BrowserRouter>
	)
}

export default App
