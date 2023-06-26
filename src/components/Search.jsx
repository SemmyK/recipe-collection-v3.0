import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'

function Search() {
	const navigate = useNavigate()
	const [searchTerm, setSearchTerm] = useState('')

	const handleSubmit = e => {
		e.preventDefault()

		if (searchTerm !== '') {
			navigate(`/search?q=${searchTerm}`)
			setSearchTerm('')
		}
	}

	return (
		<form className='d-flex' onSubmit={handleSubmit}>
			<input
				type='text'
				required
				value={searchTerm}
				placeholder='Search'
				className='me-2'
				aria-label='Search'
				onChange={e => setSearchTerm(e.target.value.trim())}
			/>
			<Button variant='outline-success' type='submit'>
				Search
			</Button>
		</form>
	)
}
export default Search
