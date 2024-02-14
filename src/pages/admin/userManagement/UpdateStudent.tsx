import { useNavigate, useParams } from "react-router-dom";
import { useGetAStudentQuery, useUpdateStudentMutation } from "../../../redux/features/admin/createStudent.api";
import { Tstudent } from "../../../types/academicManagement.type";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { useGetAllDepartmentQuery } from "../../../redux/features/admin/academicDepartment.api";
import { Button, Col, Divider, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { bloodOptions, gendersOptions } from "../../../constants/global";


const UpdateStudent = () => {
    const { studentID } = useParams()
    const { data: studentData, isFetching, isLoading } = useGetAStudentQuery(studentID)
    const { data: aSemester, isLoading: sLoading } = useGetAllSemestersQuery(undefined)
    const { data: department, isLoading: dLoading } = useGetAllDepartmentQuery(undefined)
    const [updateStudent] = useUpdateStudentMutation();

    const navigate = useNavigate();

    if (isFetching || isLoading) {
        return <p>Loading ...</p>
    }
    const { dateOfBirth, _id, id, user, academicFaculty, academicDepartment, admissionSemester, ...defaultValue } = studentData.data as Tstudent

    const semesterOption = aSemester?.data?.map((item) => ({
        value: item._id,
        label: `${item.name} ${item.year}`
    }))
    const departmentOption = department?.data?.map((item) => ({
        value: item._id,
        label: item.name
    }))
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        const studentData = {
            student: data
        }


        const toastId = toast.loading('Updating Student...')
        try {
            const res = await updateStudent({ studentData, id }).unwrap()
            if (res.success) {
                toast.success(res.message, { id: toastId })
                navigate('/admin/students-data')
            }

        } catch (error: any) {
            toast.error(error?.data?.message, { id: toastId })
        }
    }
    return (
        <Row>
            <Col span={24}>
                <PHForm onSubmit={onSubmit} defaultValues={defaultValue} >
                    <Divider>Personal Info</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="name.firstName" label="First Name" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="name.middleName" label="Middle Name" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="name.lastName" label="Last Name" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHSelect name="gender" label="Gender" options={gendersOptions} />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHDatePicker name="dateOfBirth" label="Date of Birth" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHSelect name="bloogGroup" label="Blood Group" options={bloodOptions} />
                        </Col>
                    </Row>
                    <Divider>Contact Info</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="email" label="Email" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="contactNo" label="Contact No" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="emergencyContactNo" label="Emergency Contact No" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                            <PHInput type="text" name="presentAddress" label="Present Address" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                            <PHInput type="text" name="permanentAddress" label="Permanent Address" />
                        </Col>
                    </Row>
                    <Divider>Guardian Info</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="guardian.fatherName" label="Father Name" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="guardian.fatherOccupation" label="Father Occupation" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="guardian.fatherContactNo" label="Father Contact No." />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="guardian.motherName" label="Mother Name" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="guardian.motherOccupation" label="Mother Occupation" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="guardian.motherContactNo" label="Mother Contact No." />
                        </Col>
                    </Row>
                    <Divider>Local Guardian Info</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                            <PHInput type="text" name="localGuardian.name" label="Name" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                            <PHInput type="text" name="localGuardian.occupation" label="Occupation" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                            <PHInput type="text" name="localGuardian.contactNo" label="Contact No." />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                            <PHInput type="text" name="localGuardian.address" label="Address" />
                        </Col>
                    </Row>
                    <Divider>Academic Info</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                            <PHSelect
                                disabled={sLoading}
                                name="admissionSemester"
                                label="Admission Semester"
                                options={semesterOption}
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                            <PHSelect
                                name="academicDepartment"
                                label="Academic Department"
                                options={departmentOption}
                                disabled={dLoading}
                            />
                        </Col>
                    </Row>
                    <Button htmlType='submit'>Update</Button>
                </PHForm>
            </Col>
        </Row>
    );
};

export default UpdateStudent;