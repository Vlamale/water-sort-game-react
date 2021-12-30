import { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import Flask from '../components/Flask'
import NextButton from '../components/NextButton'
import { useTypedSelector } from '../hooks/useTypedSelector'
import {  setColorsForFlasks, setNumberOffilledFlasks } from '../redux/actions'
import { defineNumberOfFlasks, mixColorsInFlasks } from './levelPage.functions'
import RefreshButton from '../components/RefreshButton'

const LevelPage: React.FC = () => {
    const {level, colorsForFlasks, endLevel} = useTypedSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        const numberOfFlasks = defineNumberOfFlasks(level)
        const colorsForFlasks: string[][] = mixColorsInFlasks(numberOfFlasks)
        dispatch(setNumberOffilledFlasks(numberOfFlasks[0]))
        dispatch(setColorsForFlasks(colorsForFlasks))
    }, [level])

    return (
        <div className="game-place">
            {colorsForFlasks.map((colors, index) => (
                <Flask key={index} colors={colors} flaskIndex={index}/>
            ))}
            <span className='level'>{`level: ${level}`}</span>
            <RefreshButton />
            {endLevel === true && (
                <NextButton />
            )}
        </div>
    )
}
export default LevelPage