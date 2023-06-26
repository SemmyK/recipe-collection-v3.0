//import function to create context object - createContext
//import react hook that allows us to specify reducer function which is going to be responsible for updating our state and keeping all that logic together in one place, and also allows us to specify initial state as well - useReducer
import { createContext, useReducer } from 'react'

//create Context object that contains contextProvider component
export const ThemeContext = createContext()

//create reducer function that will be used to change the state, we call it useing the dispatch function from useReducer
//when reducer func is called with dispatch it takes 2 arg - current up to date state and action object both are used to update the state
const themeReducer = (state, action) => {
	//based on different types of action we return different values
	switch (action.type) {
		case 'CHANGE_COLOR':
			return { ...state, color: action.payload }
		case 'CHANGE_MODE':
			return { ...state, mode: action.payload }
		default:
			return state
	}
}

//create Theme context provider
export function ThemeProvider({ children }) {
	//custom logic will allow us to have more flexibility and keep track of the values we pass to provider

	//reducer hook takes as parametres reducer function and initial state and returns state (which is equal to initial state to begin with) and dispatch function which we can use to dispatch action that we want to do (dispatch state change to reducer function)
	const [state, dispatch] = useReducer(themeReducer, {
		color: '#58249c',
		mode: 'light',
	})

	const changeMode = mode => {
		dispatch({ type: 'CHANGE_MODE', payload: mode })
	}

	const changeColor = color => {
		//dispatch function takes object as an argument which we refer to as dispatch action, object contains type of action and payload
		//type - describes type of state change
		//payload - any data we want to base the state change on
		dispatch({ type: 'CHANGE_COLOR', payload: color })
	}
	return (
		<ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
			{children}
		</ThemeContext.Provider>
	)
}
