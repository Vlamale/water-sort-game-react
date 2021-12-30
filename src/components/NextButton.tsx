import { useDispatch } from 'react-redux'
import { nextButtonText } from '../const'
import { startLevel } from '../redux/actions'

const NextButton: React.FC = () => {
    const dispatch = useDispatch()
    const nextBtnHandler = () => {
        dispatch(startLevel())
    }
    return (
        <div className='next-button-wrapper'>
            <button
                className='next-level-button'
                onClick={nextBtnHandler}
            >{nextButtonText}
            </button>
        </div>
    )
}

export default NextButton