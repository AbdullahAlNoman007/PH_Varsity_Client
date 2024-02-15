import { Button, Modal } from "antd";
import { useState } from "react";
import { useDeleteAdminMutation } from "../../../../redux/features/admin/createAdmin.api";

const BlockAdmin = ({ id }: { id: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteAdmin] = useDeleteAdminMutation()


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        deleteAdmin(id);

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
                <h2>Are you sure?? You want to delete the Admin</h2>
            </Modal>
        </>
    );
};

export default BlockAdmin;