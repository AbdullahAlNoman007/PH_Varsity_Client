import { TResponseRedux } from "../../../types";
import { Tfilter, Tstudent } from "../../../types/academicManagement.type";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addStudent: builder.mutation({
            query: (data) => ({
                url: '/users/create-student',
                method: 'POST',
                body: data
            })
        }),
        getAllStudent: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: Tfilter) => {
                        params.append(item.name, item.value as string)
                    });
                }

                return {
                    url: '/students',
                    method: "GET",
                    params
                }
            },
            transformResponse: (res: TResponseRedux<Tstudent[]>) => ({
                data: res.data,
                meta: res.meta
            })
        }),

    }),
});

export const { useAddStudentMutation, useGetAllStudentQuery } = academicManagementApi