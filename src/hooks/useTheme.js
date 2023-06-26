import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export function useTheme() {
	const context = useContext(ThemeContext)

	if (context === undefined) {
		//context is undefined if we are using it out of the scope of the context(if the component is not wrapped in context) -  if we don't wrap the whole app with context
		//error so that developer knows what is the issue if the context is not working
		throw new Error('useTheme must be used inside a ThemeProvider')
	}
	return context
}
