import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
//context
import { ThemeProvider } from './context/ThemeContext'
//style
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</React.StrictMode>
)
