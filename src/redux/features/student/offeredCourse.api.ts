import { TResponseRedux, TofferedCourse } from "../../../types";
import { Tfilter } from "../../../types/academicManagement.type";
import { baseApi } from "../../api/baseApi";

const offeredCourseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyOfferedCourses: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((element: Tfilter) => {
                        params.append(element.name, element.value as string)
                    });
                }
                return {
                    url: '/offered-courses/my-offered-courses',
                    method: "GET",
                    params
                }
            },
            transformResponse: (res: TResponseRedux<TofferedCourse[]>) => ({
                data: res.data,
                meta: res.meta
            })
        })
    })
})

export const { useGetMyOfferedCoursesQuery } = offeredCourseApi;