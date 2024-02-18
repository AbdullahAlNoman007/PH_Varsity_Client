import { Button, Row } from 'antd';
import { FieldValues } from 'react-hook-form';
import { useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import PHForm from '../components/form/PHForm';
import PHInput from '../components/form/PHInput';
import { useChangePasswordMutation } from '../redux/features/auth/authApi';

const ChangePassword = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [changePassword, { error }] = useChangePasswordMutation()
    console.log(error);

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading('Logging in');
        try {
            const userInfo = {
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
            };
            const res = await changePassword(userInfo).unwrap();
            if (res.success) {
                toast.success(res.message, { id: toastId, duration: 2000 });
            }
            dispatch(logout());
            navigate(`/login`);
        } catch (err: any) {
            toast.error(err?.data?.message, { id: toastId, duration: 2000 });
        }
    };

    return (
        <Row justify="center" align="middle" style={{ height: '100vh' }}>
            <PHForm onSubmit={onSubmit}>
                <PHInput type="password" name="oldPassword" label="Old Password" />
                <PHInput type="password" name="newPassword" label="New Password" />
                <Button htmlType="submit">Submit</Button>
            </PHForm>
        </Row>
    );
};

export default ChangePassword;
