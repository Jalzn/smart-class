import { ValidationError } from "../errors"
import { SubjectCode } from "../types"

type Props = {
    subjectCode: SubjectCode | null
    dayInWeek: number
    hour: number
}
export default class Horario implements Props {
    public subjectCode: SubjectCode | null
    public dayInWeek: number
    public hour: number

    private constructor({ subjectCode, dayInWeek, hour }: Props) {
        this.subjectCode = subjectCode
        this.dayInWeek = dayInWeek
        this.hour = hour
    }

    public static create(subjectCode: SubjectCode, dayInWeek: number, hour: number) {
        if (dayInWeek < 0 || dayInWeek > 5) {
            throw new ValidationError("Horario dayInWeek should be between 0 and 5")
        }

        if (hour < 0 || hour > 5) {
            throw new ValidationError("Horario hour should be between 0 and 5")
        }

        return new Horario({
            subjectCode,
            dayInWeek,
            hour
        })
    }
}