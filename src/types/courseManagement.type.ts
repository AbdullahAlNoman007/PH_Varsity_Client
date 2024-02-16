import { TAcademicSemester } from "./academicManagement.type"

export interface TsemesterRegistration {
    _id: string
    academicSemester: TAcademicSemester
    status: string
    startDate: string
    endDate: string
    minCredit: number
    maxCredit: number
    createdAt: string
    updatedAt: string
}

export interface Tcourses {
    _id: string
    title: string
    prefix: string
    code: number
    credits: number
    isDeleted: boolean
    preRequisiteCourses: TPreRequisiteCourse[]
    createdAt: string
    updatedAt: string
}

export interface TPreRequisiteCourse {
    course: string
    isDeleted: boolean
    _id: string
}


