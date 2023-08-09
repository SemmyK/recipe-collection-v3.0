import { createContext, useEffect, useReducer } from 'react'
//firestore and auth
import { getAuth } from 'firebase/auth'
import app from '../firebase/firebase'
import { doc, getDoc, getFirestore } from 'firebase/firestore'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				authUser: action.payload.authUser,
				userData: action.payload.userData,
				isAuthReady: true,
				loggedIn: true,
				checkingStatus: false,
				authError: null,
			}
		case 'UPDATE':
			return {
				...state,
				authUser: action.payload.authUser,
				userData: action.payload.userData,
				isAuthReady: true,
				loggedIn: true,
				checkingStatus: false,
				authError: null,
			}
		case 'AUTH_IS_READY':
			return {
				authUser: action.payload.authUser,
				userData: action.payload.userData,
				isAuthReady: true,
				loggedIn: action.payload.loggedIn,
				checkingStatus: action.payload.checkingStatus,
				authError: null,
			}
		case 'LOGOUT':
			return {
				...state,
				authUser: null,
				userData: null,
				checkingStatus: true,
				loggedIn: false,
				authError: null,
			}
		case 'AUTH_ERROR':
			return {
				...state,
				authUser: null,
				userData: null,
				checkingStatus: true,
				loggedIn: false,
				authError: action.payload,
			}
		default:
			return state
	}
}

export const AuthContextProvider = ({ children }) => {
	const [state, authDispatch] = useReducer(authReducer, {
		authUser: null,
		userData: null,
		isAuthReady: false,
		loggedIn: false,
		checkingStatus: true,
		authError: null,
	})

	useEffect(() => {
		const auth = getAuth(app)
		const db = getFirestore(app)

		const unsub = auth.onAuthStateChanged(user => {
			if (!user) {
				authDispatch({
					type: 'AUTH_IS_READY',
					payload: {
						authUser: null,
						userData: null,
						isAuthReady: true,
						loggedIn: false,
						checkingStatus: true,
						authError: null,
					},
				})
			} else {
				const getData = async user => {
					const userDocRef = doc(db, 'users', user.uid)
					//get snapshot of data from user doc
					const docSnap = await getDoc(userDocRef)

					if (docSnap.exists()) {
						const data = docSnap.data()
						return data
					}
				}
				const getUserData = async () => {
					const userDoc = await getData(user)

					if (userDoc) {
						authDispatch({
							type: 'AUTH_IS_READY',
							payload: {
								authUser: user,
								userData: userDoc,
								isAuthReady: true,
								loggedIn: true,
								checkingStatus: false,
								authError: null,
							},
						})
					}
				}

				getUserData()
			}
		})
		unsub()
	}, [])

	return (
		<AuthContext.Provider value={{ ...state, authDispatch }}>
			{children}
		</AuthContext.Provider>
	)
}
