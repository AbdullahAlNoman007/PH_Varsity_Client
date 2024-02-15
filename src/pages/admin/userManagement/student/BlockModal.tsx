import { useState } from 'react';
import { Button, Modal } from 'antd';
import { useDeleteStudentMutation } from '../../../../redux/features/admin/createStudent.api';



const Block = ({ id }: { id: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteStudent] = useDeleteStudentMutation()


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        deleteStudent(id);

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button onClick={showModal}>
                Delete
            </Button>
            <Modal title="Confirmation Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <h2>Are you sure?? You want to delete the student</h2>
            </Modal>
        </>
    );
};

export default Block;