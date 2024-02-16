import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { statusOptions } from "../../../constants/global";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { useAddSemesterRegistrationMutation } from "../../../redux/features/admin/CourseManagement.api";
import { toast } from "sonner";

const SemesterRegistration = () => {
    const { data } = useGetAllSemestersQuery([{ name: 'sort', value: 'year' }])
    const [addSemesterRegistration] = useAddSemesterRegistrationMutation()

    const semesterOptions = data?.data?.map((item) => ({
        value: item._id,
        label: `${item.name} ${item.year}`
    }))

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const semesterData = {
            ...data,
            maxCredit: Number(data.maxCredit),
            minCredit: Number(data.minCredit),
        }
        const toastId = toast.loading("Creating...")
        try {
            const res = await addSemesterRegistration(semesterData).unwrap()

            if (res.success) {
                toast.success(res.message, { id: toastId })
            }
        } catch (error: any) {
            toast.error(error.data.message, { id: toastId })
        }
    }
    return (
        <Flex justify="center" align="center">
            <Col span={8}>
                <PHForm onSubmit={onSubmit}>
                    <PHSelect name="academicSemester" label="Academic Semester" options={semesterOptions} />
                    <PHSelect name="status" label="Status" options={statusOptions} />
                    <PHDatePicker name="startDate" label="Start Date" />
                    <PHDatePicker name="endDate" label="End Date" />
                    <PHInput type="number" name="minCredit" label="Min Credit" />
                    <PHInput type="number" name="maxCredit" label="Max Credit" />
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default SemesterRegistration;