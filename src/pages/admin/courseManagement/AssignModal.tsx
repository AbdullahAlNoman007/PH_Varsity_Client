import { useState } from "react";
import { useGetAllFacultyMemberQuery } from "../../../redux/features/admin/createFaculty.api";
import { useAssignFacultyMutation } from "../../../redux/features/admin/CourseManagement.api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Button, Modal } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";

const AssignModal = ({ item }: { item: string }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: faculties } = useGetAllFacultyMemberQuery(undefined)
    const [assignFaculty] = useAssignFacultyMutation()

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handlerSubmit: SubmitHandler<FieldValues> = async (data) => {

        const toastId = toast.loading("Assigning...")
        try {
            const res = await assignFaculty({ body: data, item }).unwrap()

            if (res.success) {
                toast.success(res.message, { id: toastId })
                setIsModalOpen(false)
            }
        } catch (error: any) {
            toast.error(error.data.message, { id: toastId })
            setIsModalOpen(false)
        }

    }
    const facultiesOption = faculties?.data?.map((item) => ({
        value: item._id,
        label: item.fullName
    }))

    return (
        <>
            <Button onClick={showModal}>
                Assign Faculty
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <PHForm onSubmit={handlerSubmit}>
                    <PHSelect mode="multiple" name="faculties" label="Faculties" options={facultiesOption} />
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Modal>
        </>
    );
};

export default AssignModal