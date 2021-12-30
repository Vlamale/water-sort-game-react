import { useTypedSelector } from '../hooks/useTypedSelector'

interface IColorProps {
    color: string
    index: number
    flaskIndex: number
}

const Color: React.FC<IColorProps> = ({ color, index, flaskIndex }) => {
    
    const {transferableColorsForAnimation} = useTypedSelector(state => state)
    
    const transfer = (): string => {
        if (transferableColorsForAnimation.hasOwnProperty(`${flaskIndex}-${index}`)) {
            
            // @ts-ignore
            return transferableColorsForAnimation[`${flaskIndex}-${index}`]
        }
        return ''
    }

    return (
        <li className={`flask-color ${transfer()}`}
            style={{ backgroundColor: `${color}` }} data-color-index={index}>
        </li>
    )
}

export default Color