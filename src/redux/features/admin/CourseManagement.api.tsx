import { TResponseRedux, TsemesterRegistration } from "../../../types";
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
        })
    })
})

export const { useAddSemesterRegistrationMutation, useGetAllSemesterRegistrationQuery, useUpdateSemesterRegistrationMutation } = courseManagement