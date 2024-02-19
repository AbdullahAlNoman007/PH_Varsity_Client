export interface TofferedCourse {
    _id: string;
    semesterRegistration: string;
    academicSemester: string;
    academicFaculty: string;
    academicDepartment: string;
    course: Tcourse;
    faculty: string;
    maxCapacity: number;
    section: number;
    days: string[];
    startTime: string;
    endTime: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    enrolledCourses: string[];
    completedCourses: string[];
    completedCourseIds: string[];
    isPreRequisitesFulFilled: boolean;
    isAlreadyEnrolled: boolean;
}

interface Tcourse {
    _id: string;
    title: string;
    prefix: string;
    code: number;
    credits: number;
    preRequisiteCourses: any[];
    isDeleted: boolean;
    __v: number;
}
