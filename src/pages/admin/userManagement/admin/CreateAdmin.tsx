import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useAddAdminMutation } from "../../../../redux/features/admin/createAdmin.api";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHForm from "../../../../components/form/PHForm";
import PHInput from "../../../../components/form/PHInput";
import PHSelect from "../../../../components/form/PHSelect";
import PHDatePicker from "../../../../components/form/PHDatePicker";
import { bloodOptions, gendersOptions } from "../../../../constants/global";

const defaultValue = {
  designation: "Admin",
  name: {
    firstName: "Mr",
    middleName: "Boka",
    lastName: "mofij"
  },
  gender: "male",
  contactNo: "12356789",
  emergencyContactNo: "12356789",
  bloogGroup: "O+",
  presentAddress: "123 Main St, Cityville",
  permanentAddress: "456 Oak St, Townsville"
}

const CreateAdmin = () => {

  const [addAdmin] = useAddAdminMutation()

  const onSubmit: SubmitHandler<FieldValues> = async ({ image, ...remaining }) => {
    remaining.designation = 'Admin';
    const adminData = {
      password: 'admin 123',
      admin: remaining
    }
    const formData = new FormData()
    formData.append("data", JSON.stringify(adminData))
    formData.append('file', image)

    const toastId = toast.loading('Creating Admin...')
    try {
      const res = await addAdmin(formData).unwrap()
      if (res.success) {
        toast.success(res.message, { id: toastId })
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
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Profile Picture">
                    <Input
                      type='file'
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
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
          <Button htmlType='submit'>Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateAdmin;
