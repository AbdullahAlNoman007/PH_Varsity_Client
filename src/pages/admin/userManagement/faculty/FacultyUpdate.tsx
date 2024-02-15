import { useNavigate, useParams } from "react-router-dom";
import { useGetAFacultyMemberQuery, useUpdateFacultyMemberMutation } from "../../../../redux/features/admin/createFaculty.api";
import { useGetAllDepartmentQuery } from "../../../../redux/features/admin/academicDepartment.api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Tfaculty } from "../../../../types/academicManagement.type";
import { Button, Col, Divider, Row } from "antd";
import PHForm from "../../../../components/form/PHForm";
import PHSelect from "../../../../components/form/PHSelect";
import { bloodOptions, designationOptions, gendersOptions } from "../../../../constants/global";
import PHInput from "../../../../components/form/PHInput";
import PHDatePicker from "../../../../components/form/PHDatePicker";

const FacultyUpdate = () => {

    const { facultyID } = useParams()
    const { data: studentData, isFetching, isLoading } = useGetAFacultyMemberQuery(facultyID)
    const { data: department, isLoading: dLoading } = useGetAllDepartmentQuery(undefined)
    const [updateFacultyMember, { error }] = useUpdateFacultyMemberMutation();
    console.log(error);

    const navigate = useNavigate();

    if (isFetching || isLoading) {
        return <p>Loading ...</p>
    }
    const { dateOfBirth, _id, user, academicFaculty, academicDepartment, ...defaultValue } = studentData.data as Tfaculty

    const departmentOption = department?.data?.map((item) => ({
        value: item._id,
        label: item.name
    }))
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        const facultyData = {
            faculty: data
        }

        const toastId = toast.loading('Updating faculty...')
        try {
            const res = await updateFacultyMember({ facultyData, _id }).unwrap()
            if (res.success) {
                toast.success(res.message, { id: toastId })
                navigate('/admin/faculties-data')
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
                        <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                            <PHSelect name="designation" label="designation" options={designationOptions} />
                        </Col>
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
                    <Divider>Academic Info</Divider>
                    <Row gutter={8}>
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

export default FacultyUpdate;