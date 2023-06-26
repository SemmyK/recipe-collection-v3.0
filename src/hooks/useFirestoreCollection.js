import { useState, useEffect } from 'react'
import { getFirestore, collection, onSnapshot } from 'firebase/firestore'
// import { useAuth } from './useAuth' // Assuming you have a separate custom hook for Firebase Auth

const useFirestoreCollection = collectionName => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [items, setItems] = useState([])
	const firestore = getFirestore()
	// const { user } = useAuth() // Assuming you have a custom hook for Firebase Auth

	useEffect(() => {
		setLoading(true)
		const unsubscribe = onSnapshot(
			collection(firestore, collectionName),
			snapshot => {
				const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
				setItems(data)
			}
		)

		setLoading(false)

		return () => unsubscribe()
	}, [firestore, collectionName])

	return { loading, error, items }
}

export default useFirestoreCollection
