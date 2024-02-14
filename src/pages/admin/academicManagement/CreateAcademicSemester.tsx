import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";

type Tyear = {
  value: string,
  label: string
}

const year = new Date().getFullYear()
const yearOptions: Tyear[] = [0, 1, 2, 3, 4, 5].map((item) => ({
  value: String(year + item),
  label: String(year + item)
}))



const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation()
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating Academic Semester...")
    const code = data.name
    const name = semesterOptions[Number(code) - 1].label
    const semesterData = {
      name,
      code,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth
    }
    try {
      const res = await addAcademicSemester(semesterData).unwrap()
      if (res.success) {
        toast.success('Academic Semester is created Successfully!!!', { id: toastId })
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId })
    }
  }
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit} resolver={zodResolver(academicSemesterSchema)}>
          <PHSelect name="name" label="Name" options={semesterOptions} />
          <PHSelect name="year" label="Year" options={yearOptions} />
          <PHSelect name="startMonth" label="Start Month" options={monthOptions} />
          <PHSelect name="endMonth" label="End Month" options={monthOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  )
};

export default CreateAcademicSemester;
