import { useState } from 'react'
import app from '../firebase/firebase'
import { getAuth } from 'firebase/auth'
import {
	getStorage,
	ref,
	getDownloadURL,
	deleteObject,
	uploadBytesResumable,
} from 'firebase/storage'

const useFirebaseStorage = () => {
	const storage = getStorage(app)
	const auth = getAuth(app)
	const fileName = `${auth.currentUser.uid}`
	const avatarsRef = ref(storage, 'avatars/' + fileName)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [file, setFile] = useState(null)
	const [progressBar, setProgressBar] = useState(0)

	// Add file to Firebase Storage
	const addFile = async file => {
		setLoading(true)
		setError(null)

		return new Promise((resolve, reject) => {
			try {
				const uploadTask = uploadBytesResumable(avatarsRef, file)
				// Register three observers:
				// 1. 'state_changed' observer, called any time the state changes
				// 2. Error observer, called on failure
				// 3. Completion observer, called on successful completion

				uploadTask.on(
					'state_changed',
					snapshot => {
						// Observe state change events such as progress, pause, and resume
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100
						const rounded = Math.round(progress)
						console.log('Upload is ' + progress + '% done')
						setTimeout(() => {
							setProgressBar(rounded)
						}, 500)

						switch (snapshot.state) {
							case 'paused':
								console.log('Upload is paused')
								break
							case 'running':
								console.log('Upload is running')
								break
							default:
								console.log('Upload is done')
						}
					},
					error => {
						console.log(error)
						reject(error)
						// Handle unsuccessful uploads
					},
					() => {
						// Handle successful uploads on complete
						// For instance, get the download URL: https://firebasestorage.googleapis.com/...
						getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
							console.log('File available at', downloadURL)
							resolve(downloadURL)
							return downloadURL
						})
					}
				)
			} catch (err) {
				setError(err)
			} finally {
				setLoading(false)
			}
		})
	}

	// Get file from Firebase Storage by URL
	const getFile = async url => {
		setLoading(true)
		setError(null)

		try {
			const response = await fetch(url)
			const blob = await response.blob()
			setFile(blob)
		} catch (err) {
			setError(err)
		} finally {
			setLoading(false)
		}
	}

	// Delete file from Firebase Storage
	const deleteFile = async url => {
		setLoading(true)
		setError(null)

		try {
			const storageRef = ref(storage, url)
			await deleteObject(storageRef)
		} catch (err) {
			setError(err)
		} finally {
			setLoading(false)
		}
	}

	return {
		loading,
		error,
		file,
		progressBar,
		addFile,
		getFile,
		deleteFile,
	}
}

export default useFirebaseStorage
