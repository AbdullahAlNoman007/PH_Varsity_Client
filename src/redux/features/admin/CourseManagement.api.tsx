import { TResponseRedux, Tcourses, TsemesterRegistration } from "../../../types";
import { Tfilter } from "../../../types/academicManagement.type";
import { baseApi } from "../../api/baseApi";

const courseManagement = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addSemesterRegistration: builder.mutation({
            query: (data) => ({
                url: '/semester-registrations/create-semester-registration',
                method: "POST",
                body: data
            }),
            invalidatesTags: ['semester']
        }),
        getAllSemesterRegistration: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: Tfilter) => {
                        params.append(item.name, item.value as string)
                    });
                }
                return {
                    url: "/semester-registrations",
                    method: "GET",
                    params
                }
            },
            transformResponse: (res: TResponseRedux<TsemesterRegistration[]>) => ({
                data: res.data,
                meta: res.meta
            }),
            providesTags: ['semester']
        }),
        updateSemesterRegistration: builder.mutation({
            query: (data) => ({
                url: `/semester-registrations/${data.key}`,
                method: 'PATCH',
                body: data.body
            }),
            invalidatesTags: ['semester']
        }),
        getAllCourses: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: Tfilter) => {
                        params.append(item.name, item.value as string)
                    });
                }
                return {
                    url: "/courses",
                    method: "GET",
                    params
                }
            },
            transformResponse: (res: TResponseRedux<Tcourses[]>) => ({
                data: res.data,
                meta: res.meta
            }),
            providesTags: ['course']
        }),
        addNewCourses: builder.mutation({
            query: (data) => ({
                url: '/courses/create-course',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['course']
        }),
        assignFaculty: builder.mutation({
            query: (data) => ({
                url: `/courses/${data.item}/assign-faculties`,
                method: 'PUT',
                body: data.body
            })
        })
    })
})

export const { useAddSemesterRegistrationMutation, useGetAllSemesterRegistrationQuery, useUpdateSemesterRegistrationMutation, useGetAllCoursesQuery, useAddNewCoursesMutation, useAssignFacultyMutation } = courseManagement