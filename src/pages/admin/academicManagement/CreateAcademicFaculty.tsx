import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";
import PHInput from "../../../components/form/PHInput";
import { useAddFacultyMutation } from "../../../redux/features/admin/academicFaculty.api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const CreateAcademicFaculty = () => {
  const [addFaculty] = useAddFacultyMutation()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

    const toastId = toast.loading("Creating Faculty...")
    try {
      const res = await addFaculty(data).unwrap()
      if (res.success) {
        toast.success(res.message, { id: toastId })
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId })
    }

  }
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit} resolver={zodResolver(academicFacultySchema)}>
          <PHInput type="text" name="name" label="Faculty Name" placeholder="Faculty of ..."></PHInput>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
