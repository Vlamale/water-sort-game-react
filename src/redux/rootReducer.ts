import { Actions } from "./actions"
import { ActionTypes } from "./types"

interface IInitialState {
    raisedFlask: HTMLUListElement | null
    level: number
    numberOfFinishedFlasks: number,
    numberOffilledFlasks: number,
    colorsForFlasks: string[][],
    colorsForFlasksDouble: string[][],
    endLevel: boolean,
    transferableColorsForAnimation: object,
    transferableColors: string[]
}

const initialState: IInitialState = {
    raisedFlask: null,
    level: 1,
    numberOfFinishedFlasks: 0,
    numberOffilledFlasks: 0,
    colorsForFlasks: [],
    colorsForFlasksDouble: [],
    endLevel: false,
    transferableColorsForAnimation: {},
    transferableColors: []
}

const rootReducer = (state = initialState, action: Actions) => {
    switch (action.type) {
        case ActionTypes.UP_FLASK:
            return { ...state, raisedFlask: action.payload }
        case ActionTypes.DOWN_FLASK:
            return { ...state, raisedFlask: null }
        case ActionTypes.INCREMENT_NUMBER_OF_FINISHED_FLASKS:
            return { ...state, numberOfFinishedFlasks: state.numberOfFinishedFlasks + 1 }
        case ActionTypes.NUMBER_OF_FILLED_FLASKS:
            return { ...state, numberOffilledFlasks: action.payload }
        case ActionTypes.SET_COLORS_FOR_FLASKS:
            return { ...state, colorsForFlasks: action.payload, colorsForFlasksDouble: action.payload }
        case ActionTypes.RELOAD_LEVEL:
            return {
                ...state,
                raisedFlask: null,
                flaskTransfusionStatus: false,
                numberOfFinishedFlasks: 0,
                colorsForFlasks: action.payload,
                endLevel: false,
                transferableColorsForAnimation: {},
                transferableColors: []
            }
        case ActionTypes.END_LEVEL:
            return { ...state, endLevel: true }
        case ActionTypes.START_LEVEL:
            return {
                ...state,
                endLevel: false,
                numberOfFinishedFlasks: 0,
                numberOffilledFlasks: 0,
                level: state.level + 1,
                transferableColorsForAnimation: {}
            }
        case ActionTypes.SET_TRANSFERABLE_COLORS_STYLE:
            return { ...state, transferableColorsForAnimation: { ...state.transferableColorsForAnimation, ...action.payload } }
        case ActionTypes.SPLICE_COLORS:
            return {
                ...state,
                colorsForFlasks: [...state.colorsForFlasks.map((colors, index) => {
                    if (index === action.payload.flaskIndex) {
                        return [...action.payload.newColors]
                    }
                    return [...colors]
                })],

            }
        default:
            return { ...state }
    }
}

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer