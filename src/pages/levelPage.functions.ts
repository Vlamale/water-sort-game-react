import { possibleColors } from "../const"

export const defineNumberOfFlasks = (level: number = 1): number[] => {
    switch (level) {
        case 1:
            return [2, 2]
        case 2:
            return [3, 2]
        case 3:
            return [4, 2]
        case 4:
            return [5, 2]
        case 5:
            return [6, 2]
        case 6:
            return [7, 2]
        default:
            return [8, 2]
    }
}

export const mixColorsInFlasks = (numberOfFlasks: number[]) => {
    const numberOfFilledFlasks = numberOfFlasks[0]
    let currentColor: string = ''
    let counterOfIdenticalColors: number = 0

    const transparentFlask = ['transparent', 'transparent', 'transparent', 'transparent']
    const flasks: string[][] = possibleColors
        .slice(0, numberOfFilledFlasks)
        .map(color => new Array(4)
            .fill(color))

    let mixedFlasks = new Array(numberOfFilledFlasks)
        .fill([])
    const mixedColors: string[] = []
    const numberOfColor = numberOfFilledFlasks * 4

    for (let i = 0; i < numberOfColor; i++) {
        let lastColor: string
        const randomFlask = Math.floor(Math.random() * numberOfFilledFlasks)

        if (counterOfIdenticalColors === 3) {
            const suitableFlask = flasks.find(fl => fl.length > 0 && fl[fl.length - 1] !== currentColor)
            if (suitableFlask) {
                lastColor = suitableFlask.pop()!
            } else {
                const remainingColor = flasks.find(fl => fl.length > 0)![0]
                const replaceable = mixedColors[mixedColors.length - 5]
                mixedColors[mixedColors.length - 5] = remainingColor
                lastColor = replaceable
            }
            
        }else if (flasks[randomFlask].length) {
            lastColor = flasks[randomFlask].pop()!
        } else {
            const notEmptyFlask = flasks.find(fl => fl.length > 0) || []
            lastColor = notEmptyFlask.pop()!
        }
        if (currentColor === lastColor) {
            counterOfIdenticalColors++
        } else {
            currentColor = lastColor
            counterOfIdenticalColors = 1
        }
        mixedColors.push(lastColor)
    }

    mixedFlasks = mixedFlasks.map(() => {
        const fourColors = mixedColors.splice(mixedColors.length - 4, 4)
        return fourColors
    })
    return [...mixedFlasks, ...new Array(numberOfFlasks[1]).fill([...transparentFlask])]
}