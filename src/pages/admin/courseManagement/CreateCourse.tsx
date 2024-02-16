import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAddNewCoursesMutation, useGetAllCoursesQuery } from "../../../redux/features/admin/CourseManagement.api";
import { toast } from "sonner";

const CreateCourse = () => {
    const { data: coursesOptions } = useGetAllCoursesQuery(undefined)
    const [addNewCourses] = useAddNewCoursesMutation()


    const coursesOption = coursesOptions?.data?.map((item) => ({
        value: item._id,
        label: item.title
    }))

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const courseData = {
            ...data,
            preRequisiteCourses: data?.preRequisiteCourses?.map((item: string) => ({
                course: item,
                isDeleted: false
            })),
            code: Number(data.code),
            credits: Number(data.credits)
        }

        const toastId = toast.loading("Creating...")
        try {
            const res = await addNewCourses(courseData).unwrap()

            if (res.success) {
                toast.success(res.message, { id: toastId })
            }
        } catch (error: any) {
            toast.error(error.data.message, { id: toastId })
        }
    }
    return (
        <Flex justify="center" align="center">
            <Col span={8}>
                <PHForm onSubmit={onSubmit}>
                    <PHInput type="text" name="title" label="Title" />
                    <PHInput type="text" name="prefix" label="Prefix" />
                    <PHInput type="text" name="code" label="Code" />
                    <PHInput type="text" name="credits" label="Credits" />
                    <PHSelect mode="multiple" name="preRequisiteCourses" label="Pre Requisite Courses" options={coursesOption} />
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default CreateCourse;