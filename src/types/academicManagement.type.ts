import React from "react";

export type TAcademicSemester = {
  _id: string;
  name: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TacademicFaculty = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface TDepartment {
  _id: string;
  name: string;
  academicFaculty: string;
  createdAt: string;
  updatedAt: string;
}
export interface User {
  _id: string
  id: string
  email: string
  needsPasswordChange: boolean
  role: string
  status: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Name {
  firstName: string
  middleName: string
  lastName: string
  _id: string
}

export interface Guardian {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
  _id: string
}

export interface LocalGuardian {
  name: string
  occupation: string
  contactNo: string
  address: string
  _id: string
}

export interface Tstudent {
  _id: string;
  id: string;
  user: User;
  name: Name;
  gender: string;
  email: string;
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  bloogGroup: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImg: string;
  admissionSemester: TAcademicSemester;
  isDeleted: boolean;
  academicDepartment: TDepartment;
  academicFaculty: TacademicFaculty;
  fullName: string;
}

export interface Tfaculty {
  _id: string;
  id: string;
  user: User;
  designation: string
  name: Name
  gender: string
  email: string
  dateOfBirth: string
  contactNo: string
  emergencyContactNo: string
  bloogGroup: string
  presentAddress: string
  permanentAddress: string
  profileImg: string;
  isDeleted: boolean;
  academicDepartment: TDepartment;
  academicFaculty: TacademicFaculty;
  fullName: string;
}
export interface Tadmin {
  _id: string;
  id: string;
  user: User;
  designation: string
  name: Name
  gender: string
  email: string
  dateOfBirth: string
  contactNo: string
  emergencyContactNo: string
  bloogGroup: string
  presentAddress: string
  permanentAddress: string
  profileImg: string;
  isDeleted: boolean;
  fullName: string;
}


export type Tfilter = { name: string, value: boolean | React.Key }
