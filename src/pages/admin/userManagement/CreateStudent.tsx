import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodOptions, gendersOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/createStudent.api";
import { toast } from "sonner";
import { useGetAllDepartmentQuery } from "../../../redux/features/admin/academicDepartment.api";


const defaultValue = {

  name: {
    middleName: ".",
    lastName: "."
  },
  gender: "male",
  bloogGroup: "A+",

  email: "s22@gmail.com",
  contactNo: "1235678",
  emergencyContactNo: "987-654-3210",
  presentAddress: "123 Main St, Cityville",
  permanentAddress: "456 Oak St, Townsville",

  guardian: {
    fatherName: "James Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "111-222-3333",
    motherName: "Mary Doe",
    motherOccupation: "Teacher",
    motherContactNo: "444-555-6666"
  },

  localGuardian: {
    name: "Alice Johnson",
    occupation: "Doctor",
    contactNo: "777-888-9999",
    address: "789 Pine St, Villageton"
  },
}

const CreateStudent = () => {
  const { data: aSemester, isLoading: sLoading } = useGetAllSemestersQuery(undefined)
  const { data: department, isLoading } = useGetAllDepartmentQuery(undefined)
  console.log(department);

  const [addStudent] = useAddStudentMutation()



  const semesterOption = aSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`
  }))
  const departmentOption = department?.data?.map((item) => ({
    value: item._id,
    label: item.name
  }))
  const onSubmit: SubmitHandler<FieldValues> = async ({ image, ...remaining }) => {
    const studentData = {
      password: '12345p',
      student: remaining
    }
    const formData = new FormData()
    formData.append("data", JSON.stringify(studentData))
    formData.append('file', image)

    const toastId = toast.loading('Creating Student...')
    try {
      const res = await addStudent(formData).unwrap()
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

export default CreateStudent;
