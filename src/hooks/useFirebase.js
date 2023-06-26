import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import app from '../firebase/firebase'
import {
	getFirestore,
	collection,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
	query,
	where,
	getDocs,
	getDoc,
	onSnapshot,
} from 'firebase/firestore'
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
} from 'firebase/auth'
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage'

const useFirebase = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [collectionData, setCollectionData] = useState(null)
	const [firebaseInitialized, setFirebaseInitialized] = useState(false)
	const firestore = getFirestore(app)
	const auth = getAuth(app)
	const storage = getStorage(app)

	useEffect(() => {
		setFirebaseInitialized(true)
		return () => {
			setFirebaseInitialized(false)
		}
	}, [])

	const createItem = async (collectionName, data) => {
		try {
			await addDoc(collection(firestore, collectionName), data)
		} catch (error) {
			console.error('Error creating item:', error)
			setError('Error creating item:', error)
		}
	}

	const updateItem = async (collectionName, docId, data) => {
		setLoading(true)
		try {
			const itemRef = doc(firestore, collectionName, docId)
			await updateDoc(itemRef, data)
		} catch (error) {
			console.error('Error updating item:', error)
		}
		setLoading(false)
	}

	const deleteItem = async (collectionName, docId) => {
		try {
			setLoading(true)
			const itemRef = doc(firestore, collectionName, docId)
			await deleteDoc(itemRef)
		} catch (error) {
			console.error('Error deleting item:', error)
		}
		setLoading(false)
	}

	const uploadFile = async (filePath, file, onComplete) => {
		try {
			const storageRef = ref(storage, filePath)
			await uploadString(storageRef, file)
			const downloadURL = await getDownloadURL(storageRef)
			onComplete(downloadURL)
		} catch (error) {
			console.error('Error uploading file:', error)
		}
	}

	const getCollection = async collectionName => {
		setLoading(true)
		try {
			const querySnapshot = await getDocs(collection(firestore, collectionName))
			const data = querySnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
			}))
			setLoading(false)
			setCollectionData(data)
		} catch (error) {
			setLoading(false)
			console.error('Error getting collection:', error)
			setError(error)
		}
		setLoading(false)
	}

	const getSingleItem = async (collectionName, docId) => {
		setLoading(true)
		try {
			const docRef = doc(firestore, collectionName, docId)
			const docSnapshot = await getDoc(docRef)
			if (docSnapshot.exists()) {
				setLoading(false)
				setCollectionData({ id: docSnapshot.id, ...docSnapshot.data() })
				return { id: docSnapshot.id, ...docSnapshot.data() }
			}
			toast.info('Did not found data.')
			setLoading(false)
			setCollectionData(null)
			return null
		} catch (error) {
			console.error('Error getting single item:', error)
			setLoading(false)
			setError(error)
			setCollectionData(null)
			return null
		}
	}

	const searchCollectionWithField = async (
		collectionName,
		field,
		operator,
		value
	) => {
		setLoading(true)
		try {
			const q = query(
				collection(firestore, collectionName),
				where(field, operator, value)
			)
			const querySnapshot = await getDocs(q)
			const results = querySnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
			}))

			setLoading(false)
			setCollectionData(results)
			// return results
		} catch (error) {
			console.error('Error searching collection:', error)
			setLoading(false)
			setError(error.message)
			setCollectionData([])
		}
	}

	const searchWholeCollection = async (collectionName, searchTerm) => {
		try {
			const collectionRef = collection(firestore, collectionName)
			const querySnapshot = await getDocs(collectionRef)

			const results = querySnapshot.docs
				.map(doc => ({ id: doc.id, ...doc.data() }))
				.filter(data => {
					for (const field in data) {
						if (
							typeof data[field] === 'string' &&
							data[field].toLowerCase().includes(searchTerm.toLowerCase())
						) {
							return true
						}
					}
					return false
				})

			return results
		} catch (error) {
			console.error('Error searching collection:', error)
			setError(error)
			setCollectionData([])
			return []
		}
	}

	const createUserWithEmailPassword = async (email, password) => {
		try {
			await createUserWithEmailAndPassword(auth, email, password)
		} catch (error) {
			console.error('Error creating user:', error)
		}
	}

	const signInWithEmailPassword = async (email, password) => {
		try {
			await signInWithEmailAndPassword(auth, email, password)
		} catch (error) {
			console.error('Error signing in:', error)
		}
	}

	const signInWithGoogle = async () => {
		try {
			const provider = new GoogleAuthProvider()
			await signInWithPopup(auth, provider)
		} catch (error) {
			console.error('Error signing in with Google:', error)
		}
	}

	const signInWithFacebook = async () => {
		try {
			const provider = new FacebookAuthProvider()
			await signInWithPopup(auth, provider)
		} catch (error) {
			console.error('Error signing in with Facebook:', error)
		}
	}

	return {
		loading,
		error,
		collectionData,
		firebaseInitialized,
		createItem,
		updateItem,
		deleteItem,
		uploadFile,
		getCollection,
		getSingleItem,
		searchCollectionWithField,
		searchWholeCollection,
		createUserWithEmailPassword,
		signInWithEmailPassword,
		signInWithGoogle,
		signInWithFacebook,
		auth,
	}
}

export default useFirebase
