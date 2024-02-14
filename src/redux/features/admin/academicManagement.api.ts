import { TResponseRedux } from '../../../types';
import { TAcademicSemester, Tfilter } from '../../../types/academicManagement.type';
import { baseApi } from '../../api/baseApi';

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: Tfilter) => {
            params.append(item.name, item.value as string)
          });
        }
        return {
          url: "/academic-semesters",
          method: "GET",
          params
        }
      },
      transformResponse: (res: TResponseRedux<TAcademicSemester[]>) => ({
        data: res.data,
        meta: res.meta
      })
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: '/academic-semesters/create-academic-semester',
        method: 'POST',
        body: data
      })
    })
  }),
});

export const { useGetAllSemestersQuery, useAddAcademicSemesterMutation } =
  academicManagementApi;
