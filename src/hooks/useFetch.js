import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const useFetch = url => {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const fetchData = async url => {
		try {
			const response = await fetch(url)
			const json = await response.json()
			setData(json)
			setLoading(false)
		} catch (error) {
			setError(error)
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchData(url)
	}, [url])

	const createData = async newData => {
		console.log(newData)
		try {
			setLoading(true)
			if (newData.length !== 0) {
				const response = await fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(newData),
				})
				console.log(response)
				const json = await response.json()
				console.log(json)
				setData(json)
				setLoading(false)
			}
		} catch (error) {
			setError(error)
			setLoading(false)
		}
	}

	const updateData = async (id, updatedData) => {
		try {
			setLoading(true)
			const response = await fetch(`${url}/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedData),
			})
			const json = await response.json()
			setData(json)
			setLoading(false)
		} catch (error) {
			setError(error)
			setLoading(false)
		}
	}

	const deleteData = async id => {
		try {
			setLoading(true)
			await fetch(`${url}/${id}`, {
				method: 'DELETE',
			})
			setData(null)
			setLoading(false)
			toast.info('Sucessfully deleted recipe.')
		} catch (error) {
			setError(error)
			setLoading(false)
		}
		fetchData(url)
	}

	return {
		data,
		loading,
		error,
		createData,
		updateData,
		deleteData,
	}
}

export default useFetch
