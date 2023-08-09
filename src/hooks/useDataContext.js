import { useContext } from 'react'

import { DataContext } from '../context/DataContext'

export const useDataContext = () => {
	const context = useContext(DataContext)

	if (!context) {
		throw new Error('UseDataContext must be inside an DataContextProvider')
	}

	return context
}
