import { useState } from 'react';
import { Button, Modal } from 'antd';
import { useDeleteFacultyMemberMutation } from '../../../../redux/features/admin/createFaculty.api';

const Delete = ({ id }: { id: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteFacultyMember] = useDeleteFacultyMemberMutation()


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        deleteFacultyMember(id);

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
                <h2>Are you sure?? You want to delete the Faculty</h2>
            </Modal>
        </>
    );
};

export default Delete;