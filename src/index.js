import React from 'react'
import ReactDOM from 'react-dom/client'

//context
import { ThemeProvider } from './context/ThemeContext'
import { AuthContextProvider } from './context/AuthContext'
import { DataContextProvider } from './context/DataContext'
//style
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
//components
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<AuthContextProvider>
			<DataContextProvider>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</DataContextProvider>
		</AuthContextProvider>
	</React.StrictMode>
)
