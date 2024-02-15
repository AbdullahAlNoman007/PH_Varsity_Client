import { TResponseRedux } from "../../../types";
import { Tfaculty, Tfilter } from "../../../types/academicManagement.type";
import { baseApi } from "../../api/baseApi";

const facultyManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addFacultyMember: builder.mutation({
            query: (data) => ({
                url: '/users/create-faculty',
                method: 'POST',
                body: data
            })
        }),
        getAllFacultyMember: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: Tfilter) => {
                        params.append(item.name, item.value as string)
                    });
                }
                return {
                    url: '/faculties',
                    method: "GET",
                    params
                }
            },
            providesTags: ['faculty'],

            transformResponse: (res: TResponseRedux<Tfaculty[]>) => ({
                data: res.data,
                meta: res.meta
            })
        }),
        getAFacultyMember: builder.query({
            query: (id) => ({
                url: `/faculties/${id}`,
                method: "GET"
            })
        }),
        updateFacultyMember: builder.mutation({
            query: (data) => {
                let id;
                let faculty;
                console.log(data);
                if (data) {
                    id = data?._id;
                    faculty = data.facultyData
                }
                return {
                    url: `/faculties/${id}`,
                    method: "PATCH",
                    body: faculty
                }

            },
            invalidatesTags: ['faculty']
        }),
        deleteFacultyMember: builder.mutation({
            query: (id) => ({
                url: `/faculties/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['faculty']
        })

    }),
});

export const { useAddFacultyMemberMutation, useDeleteFacultyMemberMutation, useGetAFacultyMemberQuery, useGetAllFacultyMemberQuery, useUpdateFacultyMemberMutation } = facultyManagementApi