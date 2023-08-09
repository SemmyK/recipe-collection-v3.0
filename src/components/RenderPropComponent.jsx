// RenderPropComponent.js
import { useEffect, useMemo } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useDataContext } from '../hooks/useDataContext'
import useFirebaseFirestore from '../hooks/useFirebaseFirestore'

const RenderPropComponent = ({ render }) => {
	const authContext = useAuthContext()
	const dataContext = useDataContext()
	const { getUsersPosts } = useFirebaseFirestore('recipes')

	useEffect(() => {
		if (authContext.authUser) {
			getUsersPosts(authContext.authUser.uid)
		}
	}, [authContext.authUser])

	// Use useMemo to memoize the combined context data
	const combinedContextData = useMemo(
		() => ({
			...authContext,
			...dataContext,
		}),
		[authContext, dataContext]
	)
	console.log(combinedContextData)
	// Render the children with the combined context data
	return render(combinedContextData)
}

export default RenderPropComponent
