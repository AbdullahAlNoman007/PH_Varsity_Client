import { TResponseRedux } from "../../../types";
import { TacademicFaculty } from "../../../types/academicManagement.type";
import { baseApi } from "../../api/baseApi";

const academicFacultyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addFaculty: builder.mutation({
            query: (data) => {
                return {
                    url: '/academic-faculties/create-academic-faculty',
                    method: 'POST',
                    body: data
                }
            }
        }),
        getAllFaculty: builder.query({
            query: () => ({
                url: '/academic-faculties',
                method: 'GET'
            }),
            transformResponse: (res: TResponseRedux<TacademicFaculty[]>) => ({
                data: res.data,
                meta: res.meta
            })
        })
    })
})

export const { useAddFacultyMutation, useGetAllFacultyQuery } = academicFacultyApi