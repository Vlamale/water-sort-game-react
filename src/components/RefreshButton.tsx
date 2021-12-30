import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { reloadLevel } from '../redux/actions'

const RefreshButton: React.FC = () => {
    const dispatch = useDispatch()
    const {colorsForFlasksDouble} = useTypedSelector(state => state)

    const reloadHandler = () => {
        dispatch(reloadLevel(colorsForFlasksDouble))
    }

    return (
        <button className='reload' onClick={reloadHandler} title='Reload level' />
    )
}

export default RefreshButton