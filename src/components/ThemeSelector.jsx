import { useTheme } from '../hooks/useTheme'
import modeIcon from '../assets/mode-icon.svg'

//array containing colors for different themes
const themeColors = ['#58249c', '#249c6b', '#11AABA', '#BA116F']

export default function ThemeSelector() {
	const { changeColor, changeMode, mode, color } = useTheme()

	const toggleMode = () => {
		changeMode(mode === 'dark' ? 'light' : 'dark')
	}
	return (
		<div className='theme-selector'>
			<div className='mode-toggle'>
				<img
					alt='dark/light toggle icon'
					src={modeIcon}
					onClick={toggleMode}
					style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)' }}
				/>
			</div>
			<div className='theme-buttons'>
				{themeColors.map(color => (
					<div
						key={color}
						onClick={() => changeColor(color)}
						style={{ background: color }}
					/>
				))}
				<span className='tooltiptext' style={{ backgroundColor: color }}>
					Choose color theme
				</span>
			</div>
		</div>
	)
}
