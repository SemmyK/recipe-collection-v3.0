import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import useFirebaseFirestore from '../hooks/useFirebaseFirestore'

function Search() {
	const navigate = useNavigate()
	const [searchTerm, setSearchTerm] = useState('')
	const { searchWholeCollection } = useFirebaseFirestore('recipes')

	const performSearch = async search => {
		try {
			await searchWholeCollection(search)
		} catch (error) {
			console.error('Error searching collection:', error)
			toast.error('Error getting searched recipes')
		}
	}

	const handleSubmit = e => {
		e.preventDefault()

		if (searchTerm !== '') {
			performSearch(searchTerm)
			navigate(`/search?q=${searchTerm}`)
			setSearchTerm('')
		}
	}

	return (
		<form className='d-flex searchComponent mx-3' onSubmit={handleSubmit}>
			<input
				type='text'
				required
				value={searchTerm}
				placeholder='Search'
				className='me-2'
				aria-label='Search'
				onChange={e => setSearchTerm(e.target.value.trim())}
			/>

			<Button
				variant='outline-success'
				type='submit'
				style={{ marginTop: '0px', height: '100%' }}
			>
				Search
			</Button>
		</form>
	)
}
export default Search
