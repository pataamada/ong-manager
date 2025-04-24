import { intervalToDuration } from "date-fns"

const keyMap: Record<string, string> = {
    "hours": "horas",
    "minutes": "min",
    "seconds": "seg",
    "days": "dias",
    "months": "meses",
    "years": "anos"
}

export function getAge(birthDate: Date, getFirstValue = false) {
    const interval = intervalToDuration({
        start: birthDate,
        end: new Date(),
    })
    let result = ""
    Object.entries(interval).slice(0, getFirstValue ? 1 : 3).forEach(([key, value], index, array) => {
        if (value > 0) {
            result += `${value} ${keyMap[key] || key}${index === array.length - 1 ? "" : ", "}`
        }
    })
    return result
}