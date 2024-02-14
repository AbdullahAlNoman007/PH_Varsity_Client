import { TResponseRedux } from "../../../types";
import { TDepartment, Tfilter } from "../../../types/academicManagement.type";
import { baseApi } from "../../api/baseApi";

const academicDepartmentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addDepartment: builder.mutation({
            query: (data) => ({
                url: '/academic-departments/create-academic-department',
                method: "POST",
                body: data
            })
        }),
        getAllDepartment: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((element: Tfilter) => {
                        params.append(element.name, element.value as string)
                    });
                }
                return {
                    url: '/academic-departments',
                    method: "GET",
                    params
                }

            },
            transformResponse: (res: TResponseRedux<TDepartment[]>) => ({
                data: res.data,
                meta: res.meta
            })
        })
    })
})

export const { useAddDepartmentMutation, useGetAllDepartmentQuery } = academicDepartmentApi