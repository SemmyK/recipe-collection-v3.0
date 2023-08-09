import {
	collection,
	getFirestore,
	onSnapshot,
	orderBy,
	query,
} from 'firebase/firestore'
import { createContext, useEffect, useReducer } from 'react'
import app from '../firebase/firebase'

export const DataContext = createContext()

export const dataReducer = (state, action) => {
	switch (action.type) {
		case 'LOADING':
			return {
				...state,
				loading: true,
				success: null,
				error: null,
			}
		case 'ERROR':
			return {
				...state,
				data: null,
				error: action.payload,
				loading: false,
				success: false,
			}
		case 'INIT':
			return {
				...state,
				allData: action.payload,
				error: null,
				loading: false,
				success: true,
			}
		case 'USER_POSTS':
			return {
				...state,
				userPosts: action.payload,
				error: null,
				loading: false,
				success: true,
			}
		case 'SEARCH':
			return {
				...state,
				searchedData: action.payload,
				error: null,
				loading: false,
				success: true,
			}
		case 'GET_SINGLE_DOC':
			return {
				...state,
				data: action.payload,
				error: null,
				loading: false,
				success: true,
			}
		case 'ADD':
			return {
				...state,
				data: action.payload,
				error: null,
				success: true,
				loading: false,
			}
		case 'UPDATE':
			return {
				...state,
				data: action.payload,
				error: null,
				loading: false,
				success: true,
			}
		case 'DELETE':
			return {
				...state,
				data: null,
				error: null,
				loading: false,
				success: true,
			}
		default:
			return state
	}
}

export const DataContextProvider = ({ children }) => {
	const [state, dataDispatch] = useReducer(dataReducer, {
		allData: null,
		data: null,
		error: null,
		loading: false,
		success: null,
		searchedData: null,
		userPosts: null,
	})

	useEffect(() => {
		const db = getFirestore(app)

		//colection reference
		let collectionRef = collection(db, 'recipes')

		const q = query(collectionRef, orderBy('createdAt', 'desc'))

		const unsub = onSnapshot(
			q,
			snapshot => {
				let results = []
				snapshot.docs.forEach(item =>
					results.push({ ...item.data(), id: item.id })
				)
				dataDispatch({ type: 'INIT', payload: results })
			},
			error => {
				console.log(error)
				dataDispatch({ type: 'ERROR', payload: error.message })
			}
		)

		return () => unsub()
	}, [])

	return (
		<DataContext.Provider value={{ ...state, dataDispatch }}>
			{children}
		</DataContext.Provider>
	)
}
