import { useRef } from "react"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { downFlaskAction, endLevel, incrementNumberOfFinishedFlasks, setTransferableColorsForAnimation, spliceColors, upFlaskAction } from "../redux/actions"
import Color from "./Color"

interface IFlaskProps {
    colors: string[]
    flaskIndex: number
}

const Flask: React.FC<IFlaskProps> = ({ colors, flaskIndex }) => {
    const $flask = useRef<HTMLUListElement>(null)
    const dispatch = useDispatch()
    const { colorsForFlasks, raisedFlask, numberOfFinishedFlasks, numberOffilledFlasks } = useTypedSelector(state => state)

    let flaskEmptySpace: number
    let raisedFlaskEmptySpace: number
    let raisedFlaskIndex: number
    let transferableСolor: string

    const upFlask = () => {
        $flask.current!.style.transform = 'translate(0, -20%)'
        dispatch(upFlaskAction($flask.current!))
    }

    const downFlask = () => {
        $flask.current!.style.transform = 'translate(0, 0)'
        dispatch(downFlaskAction())
    }

    const flaskTransfusion = () => {
        let numberOfColoursTransfused: number = 1
        let raisedFlaskTransferableColorIndex: number
        let flaskTransferableColorIndex: number
        const flaskWidthWithMargin = '8vw + 1vw'
        const center = `(${flaskWidthWithMargin}) * ${colorsForFlasks.length} / 2`
        raisedFlask!.style.transform = `translate(0, -20vw) rotate(${raisedFlaskIndex < flaskIndex ? '100deg' : '-100deg'})`
        raisedFlask!.style.left = `calc(50% - ${center} + (8vw + 1vw) * ${flaskIndex} ${raisedFlaskIndex < flaskIndex ? '-' : '+'} 12vw)`

        setTimeout(() => {
            // Compute the number of colors to move
            for (let i = 2 - raisedFlaskEmptySpace; i >= 0; i--) {
                if (colorsForFlasks[raisedFlaskIndex][i] === transferableСolor) {
                    numberOfColoursTransfused++
                } else {
                    break
                }
            }

            if (numberOfColoursTransfused > flaskEmptySpace) {
                numberOfColoursTransfused = flaskEmptySpace
            }

            // The index of the top transferable color in the first flask. Start the color removal animation from it.
            raisedFlaskTransferableColorIndex = (colorsForFlasks[raisedFlaskIndex].length - 1) - raisedFlaskEmptySpace
            
            // Color removal animation
            const transferableColorsForAnimation: any = {}
            const newRaisedFlaskColors = [...colorsForFlasks[raisedFlaskIndex]]
            for (let i = raisedFlaskTransferableColorIndex; i > raisedFlaskTransferableColorIndex - numberOfColoursTransfused; i--) {
                transferableColorsForAnimation[`${raisedFlaskIndex}-${i}`] = 'pour-out'
                newRaisedFlaskColors.splice(i, 1, 'transparent')
            }

            setTimeout(() => {
                // Remove colors from the array of the first flask
                dispatch(spliceColors({ flaskIndex: raisedFlaskIndex, newColors: newRaisedFlaskColors }))
            }, 400);
            
            // Color adding animation
            flaskTransferableColorIndex = colorsForFlasks[flaskIndex].length - flaskEmptySpace

            const newFlaskColors = [...colorsForFlasks[flaskIndex]]
            for (let i = flaskTransferableColorIndex; i < flaskTransferableColorIndex + numberOfColoursTransfused; i++) {
                
                transferableColorsForAnimation[`${flaskIndex}-${i}`] = 'pour-in'
                newFlaskColors.splice(i, 1, transferableСolor)
            }

            // Add the colors removed from the first flask to the array of the second flask
            dispatch(spliceColors({ flaskIndex: flaskIndex, newColors: newFlaskColors }))
            dispatch(setTransferableColorsForAnimation(transferableColorsForAnimation))
        }, 400)

        setTimeout(() => {
            raisedFlask!.style.transform = 'translate(0, 0) rotate(0deg)'
            raisedFlask!.style.left = `calc(50% - (((8vw + 1vw) * ${colorsForFlasks.length}) / 2) + ((8vw + 1vw) * ${raisedFlaskIndex})`

            dispatch(downFlaskAction())
            
            const checkCompletStatus = colorsForFlasks[flaskIndex].filter(color => color === transferableСolor).length + numberOfColoursTransfused
            
            if (checkCompletStatus === 4 && numberOfColoursTransfused !== 4) {
                
                dispatch(incrementNumberOfFinishedFlasks())
                if (numberOfFinishedFlasks + 1 === numberOffilledFlasks) {
                    
                    dispatch(endLevel())
                }
            }
            // Bring the number of moved colors to the initial value
            numberOfColoursTransfused = 1
        }, 850)
    }

    const flaskHandler = () => {

        // All the flasks are down
        if (!raisedFlask) {
            upFlask()
        }
        // One flask is already raised
        else {
            raisedFlaskIndex = +raisedFlask?.dataset.index!
            if (flaskIndex === raisedFlaskIndex) {
                downFlask()
            }
            // Second click on another flask
            else {
                const raisedFlaskColors = [...colorsForFlasks[raisedFlaskIndex]]

                const flaskIndex = +$flask.current!.dataset.index!
                const flaskColors = [...colorsForFlasks[flaskIndex]]

                flaskEmptySpace = colorsForFlasks[flaskIndex].filter(color => color === 'transparent')?.length || 0

                raisedFlaskEmptySpace = colorsForFlasks[raisedFlaskIndex].filter(el => el === 'transparent')?.length || 0

                transferableСolor = raisedFlaskColors[4 - (raisedFlaskEmptySpace + 1)]

                if (raisedFlaskColors[0] === 'transparent') {
                    downFlask()
                } else if (transferableСolor === flaskColors[flaskColors.length - (flaskEmptySpace + 1)] && flaskEmptySpace > 0 ||
                    flaskColors[0] === 'transparent') {
                    flaskTransfusion()
                }
            }
        }
    }

    return (
        <ul
            className="flask"
            onClick={flaskHandler}
            ref={$flask}
            data-index={flaskIndex}
            style={{
                left: `calc(50% - (((8vw + 1vw) * ${colorsForFlasks.length}) / 2) + ((8vw + 1vw) * ${flaskIndex})`
            }}>
            {colors.map((color, colorIndex) => (
                <Color key={colorIndex} color={color} flaskIndex={flaskIndex} index={colorIndex} />
            )).reverse()}
        </ul>
    )
}

export default Flask