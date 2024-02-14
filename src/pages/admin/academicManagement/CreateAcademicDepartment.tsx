import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllFacultyQuery } from "../../../redux/features/admin/academicFaculty.api";
import { useAddDepartmentMutation } from "../../../redux/features/admin/academicDepartment.api";
import { toast } from "sonner";

const CreateAcademicDepartment = () => {
  const { data } = useGetAllFacultyQuery(undefined)
  const [addDepartment] = useAddDepartmentMutation()
  const facultyOptions = data?.data?.map(({ _id, name }) => ({
    value: _id,
    label: name
  }))
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Creating Academic Department...')
    try {
      const res = await addDepartment(data).unwrap()
      if (res.success) {
        toast.success(res.message, { id: toastId })
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId })
    }

  }
  return (
    <Flex justify="center" align="center">
      <Col span={16}>
        <PHForm onSubmit={onSubmit}>
          <PHInput type="text" name="name" label="Department Name" placeholder="Department of ..." />
          <PHSelect name="academicFaculty" label="Academic Faculty" options={facultyOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
