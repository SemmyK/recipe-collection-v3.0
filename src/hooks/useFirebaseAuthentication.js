import { useState } from 'react'
//firebase auth & firestore
import app from '../firebase/firebase'
import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signInWithPopup,
	updateProfile,
} from 'firebase/auth'
import {
	doc,
	getDoc,
	getFirestore,
	serverTimestamp,
	setDoc,
	updateDoc,
} from 'firebase/firestore'
import { useAuthContext } from './useAuthContext'

function useFirebaseAuthentication() {
	const auth = getAuth(app)
	const db = getFirestore(app)
	const { authDispatch } = useAuthContext()
	const [error, setError] = useState(null)

	//email & password authentication
	const createUser = async (email, password, userData) => {
		try {
			//register user to firebase
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			//set auth user display name to be equal to username
			userData.username !== '' &&
				updateProfile(auth.currentUser, {
					displayName: userData.username,
				})

			//user info from auth to be the state for userAuth (user info from auth)
			const authUser = userCredential.user
			//add user to users collection
			//refference to user document
			const userDocRef = doc(db, 'users', userCredential.user.uid)
			//add data to user doc
			await setDoc(userDocRef, {
				...userData,
				userUID: userCredential.user.uid,
				profileCreated: serverTimestamp(),
			})
			//get snapshot of data from user doc
			const data = await getUserData(userCredential.user.uid)

			//authDispatch login action
			authDispatch({
				type: 'LOGIN',
				payload: {
					authUser: authUser,
					userData: data,
				},
			})
			return data
		} catch (error) {
			console.log(error)
			authDispatch({ type: 'AUTH_ERROR', payload: error })
		}
	}

	const signIn = async (email, password) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			)
			const user = userCredential.user

			if (user) {
				//get user data from collection
				const data = await getUserData(user.uid)

				//authDispatch login action
				authDispatch({
					type: 'LOGIN',
					payload: {
						authUser: user,
						userData: data,
					},
				})
				return data
			}
		} catch (error) {
			console.log(error)
			authDispatch({ type: 'AUTH_ERROR', payload: error })
		}
		// console.log(userDB)
	}

	//google authentication
	const createGoogleUser = async userData => {
		try {
			const provider = new GoogleAuthProvider()
			provider.setCustomParameters({
				prompt: 'select_account',
			})
			// Sign in with Google popup
			const { user } = await signInWithPopup(auth, provider)

			//check if user exists in firestore if does not add it
			const userDocRef = doc(db, 'users', user.uid)
			//get snapshot of data from user doc
			const docSnap = await getDoc(userDocRef)
			if (!docSnap.exists()) {
				//add user to firestore if it does not exists
				await setDoc(userDocRef, {
					...userData,
					email: user.email,
					username: user.displayName,
					userUID: user.uid,
					avatar: user.photoURL,
					profileCreated: serverTimestamp(),
				})
				//get snapshot of data from user doc
				if (user) {
					const data = await getUserData(user.uid)

					//authDispatch login action
					authDispatch({
						type: 'LOGIN',
						payload: {
							authUser: user,
							userData: data,
						},
					})
					return [user, data]
				}
			}
		} catch (error) {
			console.log(error)
			authDispatch({ type: 'AUTH_ERROR', payload: error })
		}
	}

	const signInGoogleUser = async () => {
		try {
			const provider = new GoogleAuthProvider()
			provider.setCustomParameters({
				prompt: 'select_account',
			})
			// Sign in with Google popup
			const { user } = await signInWithPopup(auth, provider)
			//get data from firebase
			if (user) {
				const data = await getUserData(user.uid)

				//authDispatch login action
				authDispatch({
					type: 'LOGIN',
					payload: {
						authUser: user,
						userData: data,
					},
				})
				return data
			}
		} catch (error) {
			console.log(error)
			authDispatch({ type: 'AUTH_ERROR', payload: error })
		}
	}

	//get user data from firestore
	const getUserData = async uid => {
		try {
			const userDocRef = doc(db, 'users', uid)
			//get snapshot of data from user doc
			const docSnap = await getDoc(userDocRef)

			if (docSnap.exists()) {
				//if user document has data
				const data = docSnap.data()
				return data
			} else {
				// docSnap.data() will be undefined in this case
				console.log('No such document!')
				authDispatch({
					type: 'AUTH_ERROR',
					payload: 'Could not find the document.',
				})
			}
		} catch (error) {
			console.log(error)
			authDispatch({ type: 'AUTH_ERROR', payload: error })
		}
	}

	//update user
	const updateUser = async (user, newData) => {
		try {
			//update in auth
			await updateProfile(auth.currentUser, { displayName: newData.username })

			if (auth.currentUser.photoURL !== newData.avatar) {
				await updateProfile(auth.currentUser, { photoURL: newData.avatar })
			}

			//update in firestore
			const userDocRef = doc(db, 'users', user.userUID)
			await updateDoc(userDocRef, { ...newData })

			//get snapshot of data from user doc
			const docSnap = await getDoc(userDocRef)

			if (docSnap.exists()) {
				//if user document has data
				console.log('Document data:', docSnap.data())
				const data = docSnap.data()
				//authDispatch login action
				authDispatch({
					type: 'UPDATE',
					payload: {
						authUser: auth.currentUser,
						userData: data,
					},
				})

				return data
			} else {
				// docSnap.data() will be undefined in this case
				console.log()
				authDispatch({ type: 'AUTH_ERROR', payload: 'No such document!' })
			}
		} catch (error) {
			console.log(error)
			authDispatch({ type: 'AUTH_ERROR', payload: error })
		}
	}

	const logOut = async () => {
		try {
			await auth.signOut()
			authDispatch({ type: 'LOGOUT' })
		} catch (error) {
			console.log(error)
			authDispatch({ type: 'AUTH_ERROR', payload: error })
		}
	}

	return {
		auth,
		createUser,
		signIn,
		createGoogleUser,
		signInGoogleUser,
		getUserData,
		updateUser,
		logOut,
	}
}
export default useFirebaseAuthentication
