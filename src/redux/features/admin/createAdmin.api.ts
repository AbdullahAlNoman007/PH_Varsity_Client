import { TResponseRedux } from "../../../types";
import { Tfilter, Tstudent } from "../../../types/academicManagement.type";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addAdmin: builder.mutation({
            query: (data) => ({
                url: '/users/create-admin',
                method: 'POST',
                body: data
            })
        }),
        getAllAdmin: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: Tfilter) => {
                        params.append(item.name, item.value as string)
                    });
                }

                return {
                    url: '/admins',
                    method: "GET",
                    params
                }
            },
            providesTags: ['admin'],

            transformResponse: (res: TResponseRedux<Tstudent[]>) => ({
                data: res.data,
                meta: res.meta
            })
        }),
        getAAdmin: builder.query({
            query: (id) => ({
                url: `/admins/${id}`,
                method: "GET"
            })
        }),
        updateAdmin: builder.mutation({
            query: (data) => {
                let id;
                let student;
                if (data) {
                    id = data?.id;
                    student = data.studentData
                }
                return {
                    url: `/admins/${id}`,
                    method: "PATCH",
                    body: student
                }

            },
            invalidatesTags: ['admin']
        }),
        deleteAdmin: builder.mutation({
            query: (id) => ({
                url: `/admins/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['admin']
        })

    }),
});

export const { useAddAdminMutation, useDeleteAdminMutation, useGetAAdminQuery, useGetAllAdminQuery, useUpdateAdminMutation } = academicManagementApi