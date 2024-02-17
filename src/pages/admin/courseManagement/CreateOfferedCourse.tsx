import { Button, Col, Divider, Flex, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAddOfferCourseMutation, useGetAllCoursesQuery, useGetAllSemesterRegistrationQuery, useGetAssignFacultyMemberQuery } from "../../../redux/features/admin/CourseManagement.api";
import { toast } from "sonner";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useEffect, useState } from "react";
import { daysOption, endTimeOptions, startTimeOptions } from "../../../constants/global";
import { useGetAllFacultyQuery } from "../../../redux/features/admin/academicFaculty.api";
import { useGetAllDepartmentQuery } from "../../../redux/features/admin/academicDepartment.api";

const CreateOfferedCourse = () => {
    const [id, setId] = useState('')

    const { data: coursesOptions } = useGetAllCoursesQuery(undefined)
    const { data: semesterRegistration } = useGetAllSemesterRegistrationQuery(undefined);
    const { data: academicFaculty } = useGetAllFacultyQuery(undefined);
    const { data: academicDepartment } = useGetAllDepartmentQuery(undefined,);
    const { data: faculties, refetch } = useGetAssignFacultyMemberQuery(id);
    const [addOfferCourse, { error }] = useAddOfferCourseMutation()
    console.log(error);

    useEffect(() => {
        if (id) {
            refetch();
        }
    }, [id]);

    const facultyOption = faculties?.data?.faculties?.map((item) => ({
        value: item._id,
        label: item.fullName
    }))

    const coursesOption = coursesOptions?.data?.map((item) => ({
        value: item._id,
        label: item.title
    }))

    let semesterRegistrationOption: { value: string, label: string }[] = []
    semesterRegistration?.data?.forEach((item) => {
        if (item?.status === 'UPCOMING') {
            semesterRegistrationOption.push({
                value: item._id,
                label: `${item.academicSemester.name} ${item.academicSemester.year}`
            })
        }
    });
    const academicFacultyOption = academicFaculty?.data?.map((item) => ({
        value: item._id,
        label: item.name
    }))
    const academicDepartmentOption = academicDepartment?.data?.map((item) => ({
        value: item._id,
        label: item.name
    }))

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        const offeredData = {
            ...data,
            section: Number(data.section),
            maxCapacity: Number(data.maxCapacity)
        }
        console.log(offeredData);

        const toastId = toast.loading("Creating...")
        try {
            const res = await addOfferCourse(offeredData).unwrap()

            if (res.success) {
                toast.success(res.message, { id: toastId })
            }
        } catch (error: any) {
            toast.error(error.data.message, { id: toastId })
        }
    }
    return (
        <Flex justify="center" align="center">
            <Col span={24}>
                <PHForm onSubmit={onSubmit}>
                    <Divider>Pre Requisite Info</Divider>
                    <Row gutter={8}>
                        <Col span={8}>
                            <PHSelectWithWatch name="course" label="Course" options={coursesOption} onValueChange={setId} />
                        </Col>
                        <Col span={8}>
                            <PHSelect name="semesterRegistration" label="Semester Registration" options={semesterRegistrationOption} />
                        </Col>
                        <Col span={8}>
                            <PHSelect name="academicFaculty" label="Academic Faculty" options={academicFacultyOption} />
                        </Col>
                        <Col span={8}>
                            <PHSelect name="academicDepartment" label="Academic Department" options={academicDepartmentOption} />
                        </Col>
                        <Col span={8}>
                            <PHSelect name="faculty" label="Faculty Member" options={facultyOption} disabled={!id} />
                        </Col>
                    </Row>
                    <Divider>New Requisite Info</Divider>
                    <Row gutter={5}>
                        <Col span={8}>
                            <PHInput type="number" name="section" label="Section" />
                        </Col>
                        <Col span={8}>
                            <PHInput type="number" name="maxCapacity" label="Max Capacity" />
                        </Col>
                        <Col span={8}>
                            <PHSelect mode="multiple" name="days" label="Days" options={daysOption} />
                        </Col>
                        <Col span={8}>
                            <PHSelect name="startTime" label="Start Time" options={startTimeOptions} />
                        </Col>
                        <Col span={8}>
                            <PHSelect name="endTime" label="End Time" options={endTimeOptions} />
                        </Col>
                    </Row>

                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default CreateOfferedCourse;