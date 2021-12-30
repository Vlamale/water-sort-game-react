import { ActionTypes } from "./types"

interface IUpFlaskAction {
    type: ActionTypes.UP_FLASK,
    payload: HTMLUListElement
}

export const upFlaskAction = (flask: HTMLUListElement): IUpFlaskAction => {
    return {
        type: ActionTypes.UP_FLASK,
        payload: flask
    }
}

interface IDownFlaskAction {
    type: ActionTypes.DOWN_FLASK
}

export const downFlaskAction = (): IDownFlaskAction => {
    return {
        type: ActionTypes.DOWN_FLASK
    }
}

interface IIncrementNumberOfFinishedFlasks {
    type: ActionTypes.INCREMENT_NUMBER_OF_FINISHED_FLASKS
}

export const incrementNumberOfFinishedFlasks = (): IIncrementNumberOfFinishedFlasks => {
    return {
        type: ActionTypes.INCREMENT_NUMBER_OF_FINISHED_FLASKS
    }
}

interface ISetNumberOffilledFlasks {
    type: ActionTypes.NUMBER_OF_FILLED_FLASKS,
    payload: number
}

export const setNumberOffilledFlasks = (number: number): ISetNumberOffilledFlasks => {
    return {
        type: ActionTypes.NUMBER_OF_FILLED_FLASKS,
        payload: number
    }
}

interface ISetColorsForFlasks {
    type: ActionTypes.SET_COLORS_FOR_FLASKS,
    payload: string[][]
}

export const setColorsForFlasks = (colors: string[][]): ISetColorsForFlasks => {
    return {
        type: ActionTypes.SET_COLORS_FOR_FLASKS,
        payload: colors
    }
}

interface IReloadLevel {
    type: ActionTypes.RELOAD_LEVEL,
    payload: string[][]
}

export const reloadLevel = (colors: string[][]): IReloadLevel => {
    return {
        type: ActionTypes.RELOAD_LEVEL,
        payload: colors
    }
}

interface IEndLevel {
    type: ActionTypes.END_LEVEL
}

export const endLevel = (): IEndLevel => {
    return {
        type: ActionTypes.END_LEVEL
    }
}

interface IStartLevel {
    type: ActionTypes.START_LEVEL
}

export const startLevel = (): IStartLevel => {
    return {
        type: ActionTypes.START_LEVEL
    }
}

interface ISetTransferableColorsForAnimation {
    type: ActionTypes.SET_TRANSFERABLE_COLORS_STYLE,
    payload: object
}

export const setTransferableColorsForAnimation = (colorsId: object): ISetTransferableColorsForAnimation => {
    return {
        type: ActionTypes.SET_TRANSFERABLE_COLORS_STYLE,
        payload: colorsId
    }
}

interface TSpliceColorsPayload {
    flaskIndex: number,
    newColors: string[]
}

interface TSpliceColors {
    type: ActionTypes.SPLICE_COLORS,
    payload: TSpliceColorsPayload
}

export const spliceColors = ({ flaskIndex, newColors }: TSpliceColorsPayload): TSpliceColors => {
    return {
        type: ActionTypes.SPLICE_COLORS,
        payload: {
            flaskIndex,
            newColors,
        }
    }
}

export type Actions =
    IUpFlaskAction
    | IDownFlaskAction
    | IIncrementNumberOfFinishedFlasks
    | ISetNumberOffilledFlasks
    | ISetColorsForFlasks
    | IEndLevel
    | IStartLevel
    // | ISetLevel
    | ISetTransferableColorsForAnimation
    | TSpliceColors
    | IReloadLevel

