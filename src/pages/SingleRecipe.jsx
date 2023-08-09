//hooks
import { useTheme } from '../hooks/useTheme'
//bootstrap components
import Card from 'react-bootstrap/Card'
//components
import ButtonBox from '../components/ButtonBox'
import ScaleLoader from 'react-spinners/ScaleLoader'

function SingleRecipe({ userData, singleRecipe, error, loading }) {
	const { color } = useTheme()

	if (loading) {
		return (
			<div className='d-flex justify-content-center align-items-center  h-100'>
				<ScaleLoader color={color} width='10px' height='100px' />
			</div>
		)
	}

	return (
		<article
			className='recipe d-flex justify-content-around'
			style={{ width: '100%' }}
		>
			{error ? (
				<div className='error'>{error}</div>
			) : (
				singleRecipe && (
					<Card style={{ textAlign: 'center', width: '80%' }}>
						<Card.Body>
							<Card.Title
								style={{ color: color, boxShadow: ` 0 8px 6px -6px ${color}` }}
							>
								{singleRecipe.title}
							</Card.Title>
							<p className='blockquote-footer' style={{ fontSize: '1.20em' }}>
								{singleRecipe.cookingTime} to make
							</p>
							<Card.Subtitle className='mb-2 text-muted mx-auto w-50vw'>
								<ul
									style={{
										display: 'inline-block',
										textAlign: 'left',
										fontSize: '1.25em',
									}}
								>
									{singleRecipe &&
										singleRecipe.ingredients.length !== 0 &&
										singleRecipe.ingredients.map(ing => (
											<li key={ing}>{ing}</li>
										))}
								</ul>
							</Card.Subtitle>
							<div className='card-text'>
								<ol style={{ textAlign: 'left' }}>
									{singleRecipe !== {} &&
										singleRecipe.method
											.split('.')
											.map((step, index) => <li key={index}>{step}</li>)}
								</ol>
							</div>

							<ButtonBox
								width='70%'
								btn='6'
								del='2'
								text='Go back'
								color={color}
								recipe={singleRecipe}
								userData={userData}
							/>
						</Card.Body>
					</Card>
				)
			)}
		</article>
	)
}
export default SingleRecipe
