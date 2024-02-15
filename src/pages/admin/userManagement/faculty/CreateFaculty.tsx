import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import { toast } from "sonner";
import { useGetAllDepartmentQuery } from "../../../../redux/features/admin/academicDepartment.api";
import PHForm from "../../../../components/form/PHForm";
import PHInput from "../../../../components/form/PHInput";
import PHSelect from "../../../../components/form/PHSelect";
import PHDatePicker from "../../../../components/form/PHDatePicker";
import { bloodOptions, designationOptions, gendersOptions } from "../../../../constants/global";
import { useAddFacultyMemberMutation } from "../../../../redux/features/admin/createFaculty.api";



const defaultValue = {
  designation: "Lecturer",
  name: {
    firstName: "Mridul ",
    middleName: "Das",
    lastName: "Rahman"
  },
  gender: "male",
  bloogGroup: "A+",

  email: "faculty3@gmail.com",
  contactNo: "123",
  emergencyContactNo: "123",
  presentAddress: "123 Main St, Cityville",
  permanentAddress: "456 Oak St, Townsville",

}

const CreateFaculty = () => {

  const { data: department, isLoading } = useGetAllDepartmentQuery(undefined)
  const [addFacultyMember] = useAddFacultyMemberMutation()

  const departmentOption = department?.data?.map((item) => ({
    value: item._id,
    label: item.name
  }))
  const onSubmit: SubmitHandler<FieldValues> = async ({ image, ...remaining }) => {
    const studentData = {
      password: 'faculty 123',
      faculty: remaining
    }

    const formData = new FormData()
    formData.append("data", JSON.stringify(studentData))
    formData.append('file', image)

    const toastId = toast.loading('Creating Faculty...')
    try {
      const res = await addFacultyMember(formData).unwrap()
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
            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
              <PHSelect name="designation" label="designation" options={designationOptions} />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
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
                disabled={isLoading}
              />
            </Col>
          </Row>
          <Button htmlType='submit'>Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateFaculty;
