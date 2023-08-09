import { useState, useEffect } from 'react'
import {
	getFirestore,
	collection,
	doc,
	getDocs,
	addDoc,
	getDoc,
	updateDoc,
	deleteDoc,
	query,
	where,
	serverTimestamp,
} from 'firebase/firestore'
import app from '../firebase/firebase'
//hooks
import { useDataContext } from './useDataContext'
import { useAuthContext } from './useAuthContext'

const useFirebaseFirestore = collectionName => {
	const firestore = getFirestore(app)
	const { dataDispatch } = useDataContext()
	const { authUser } = useAuthContext()
	const [isCancelled, setIsCancelled] = useState(false)

	//colection reference
	const collectionRef = collection(firestore, collectionName)

	// ADD DOCUMENT
	const addDocument = async document => {
		dataDispatch({ type: 'LOADING' })

		try {
			// create  a new document with a generated id
			const newDoc = await addDoc(collectionRef, {
				...document,
				createdAt: serverTimestamp(),
				createdBy: authUser.uid,
			})

			//get snapshot of user document
			const newDocRef = doc(firestore, 'recipes', newDoc.id)
			const newDocSnapshot = await getDoc(newDocRef)

			//check if snapshot is empty or not
			const newDocData = newDocSnapshot.exists()
				? { id: newDocRef.id, ...newDocSnapshot.data() }
				: null

			dataDispatch({ type: 'ADD', payload: newDocData })

			authUser && getUsersPosts(authUser.uid)
		} catch (error) {
			console.log(error)
			if (!isCancelled) {
				dataDispatch({ type: 'ERROR', payload: error.message })
			}
		}
	}

	// UPDATE DOCUMENT

	const updateDocument = async (docId, data) => {
		dataDispatch({ type: 'LOADING' })

		try {
			await updateDoc(doc(firestore, collectionName, docId), data)
			const documentSnapshot = await getDoc(
				doc(firestore, collectionName, docId)
			)

			dataDispatch({
				type: 'UPDATE',
				payload: { ...documentSnapshot.data() },
			})
			authUser && getUsersPosts(authUser.uid)
		} catch (error) {
			dataDispatch({ type: 'ERROR', payload: error.message })
		}
	}

	// DELETE DOCUMENT
	const deleteDocument = async id => {
		dataDispatch({ type: 'LOADING' })

		try {
			//delete document
			await deleteDoc(doc(firestore, collectionName, id))

			if (!isCancelled) {
				dataDispatch({ type: 'DELETE' })
			}
			authUser && getUsersPosts(authUser.uid)
		} catch (error) {
			console.log(error)
			if (!isCancelled) {
				dataDispatch({ type: 'ERROR', payload: error.message })
			}
		}
	}

	// GET SINGLE DOCUMENT BY ID
	const getDocById = async docId => {
		dataDispatch({ type: 'LOADING' })
		try {
			const docRef = doc(firestore, 'recipes', docId)
			const documentSnapshot = await getDoc(docRef)

			if (documentSnapshot.exists()) {
				dataDispatch({
					type: 'GET_SINGLE_DOC',
					payload: { id: docId, ...documentSnapshot.data() },
				})
			} else {
				dataDispatch({ type: 'ERROR', payload: 'Document not found' })
			}
		} catch (error) {
			dataDispatch({ type: 'ERROR', payload: error.message })
		}
	}

	// GET ALL DOCS WITH SAME EMAIL VALUE
	const getUsersPosts = async id => {
		dataDispatch({ type: 'LOADING' })

		try {
			const querySnapshot = await getDocs(
				query(collection(firestore, collectionName), where('userRef', '==', id))
			)

			const results = []
			querySnapshot.forEach(doc => {
				// doc.data() is never undefined for query doc snapshots
				results.push({ id: doc.id, ...doc.data() })
			})
			dataDispatch({
				type: 'USER_POSTS',
				payload: results,
			})
		} catch (error) {
			dataDispatch({ type: 'ERROR', payload: error.message })
		}
	}

	// SEARCH COLLECTION WITH TERM MATCHING PART OF TITLE
	const queryCollectionTitle = async term => {
		dataDispatch({ type: 'LOADING' })
		try {
			const q = query(collectionRef, where('title', 'in', term))

			const querySnapshot = await getDocs(q)
			const results = []
			const documents =
				querySnapshot &&
				querySnapshot.forEach(doc => {
					results.push({
						id: doc.id,
						...doc.data(),
					})
				})

			dataDispatch({ type: 'SEARCH', payload: results })
		} catch (error) {
			dataDispatch({ type: 'ERROR', payload: error.message })
		}
	}

	// SEARCH WHOLE COLLECTION GIVEN ONLY TERM TO SEARCH
	const searchWholeCollection = async searchTerm => {
		dataDispatch({ type: 'LOADING' })
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

			dataDispatch({ type: 'SEARCH', payload: results })
		} catch (error) {
			console.error('Error searching collection:', error)

			dataDispatch({ type: 'ERROR', payload: error.message })
		}
	}
	// SEARCH WHOLE COLLECTION GIVEN FIELD IN DOCUMENT AND A VALUE FOR THAT FIELD
	const searchCollectionWithField = async (field, operator, value) => {
		dataDispatch({ type: 'LOADING' })

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

			dataDispatch({ type: 'USER_POSTS', payload: results })
		} catch (error) {
			console.error('Error searching collection:', error)
			dataDispatch({ type: 'ERROR', payload: error.message })
		}
	}

	// UNMOUNT
	useEffect(() => {
		return () => setIsCancelled(true)
	}, [])

	return {
		getUsersPosts,
		addDocument,
		getDocById,
		updateDocument,
		deleteDocument,
		queryCollectionTitle,
		searchWholeCollection,
		searchCollectionWithField,
	}
}

export default useFirebaseFirestore
