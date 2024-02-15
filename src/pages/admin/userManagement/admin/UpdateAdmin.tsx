import { useNavigate, useParams } from "react-router-dom";
import { useGetAAdminQuery, useUpdateAdminMutation } from "../../../../redux/features/admin/createAdmin.api";
import { Tadmin } from "../../../../types/academicManagement.type";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Button, Col, Divider, Row } from "antd";
import PHForm from "../../../../components/form/PHForm";
import PHSelect from "../../../../components/form/PHSelect";
import PHInput from "../../../../components/form/PHInput";
import PHDatePicker from "../../../../components/form/PHDatePicker";
import { bloodOptions, gendersOptions } from "../../../../constants/global";

const UpdateAdmin = () => {

    const { adminID } = useParams()
    const { data: adminDATA, isFetching, isLoading } = useGetAAdminQuery(adminID)
    const [updateAdmin] = useUpdateAdminMutation()

    const navigate = useNavigate();

    if (isFetching || isLoading) {
        return <p>Loading ...</p>
    }
    const { dateOfBirth, _id, user, ...defaultValue } = adminDATA.data as Tadmin

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        const adminData = {
            admin: data
        }

        const toastId = toast.loading('Updating admin...')
        try {
            const res = await updateAdmin({ adminData, _id }).unwrap()
            if (res.success) {
                toast.success(res.message, { id: toastId })
                navigate('/admin/admins-data')
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
                    <Button htmlType='submit'>Update</Button>
                </PHForm>
            </Col>
        </Row>
    );
};

export default UpdateAdmin;