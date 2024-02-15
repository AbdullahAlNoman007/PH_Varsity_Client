import { Tadmin } from '../../../../types/academicManagement.type';
import { useParams } from 'react-router-dom';
import { useGetAAdminQuery } from '../../../../redux/features/admin/createAdmin.api';
import { Card, Divider, Flex } from 'antd';

const AdminDetails = () => {
    const { adminID } = useParams()
    const { data: adminData, isFetching, isLoading } = useGetAAdminQuery(adminID)
    if (isFetching || isLoading) {
        return <p>Loading ...</p>
    }

    const { profileImg, fullName, email, contactNo, dateOfBirth, bloogGroup, presentAddress, permanentAddress } = adminData.data as Tadmin

    return (
        <Flex justify="center" align="center">
            <Card
                hoverable
                style={{ width: 500 }}
                cover={<img alt="example" src={profileImg}
                />}
            >
                <Divider>Personal Info</Divider>
                <h2 style={{ fontWeight: 400, fontSize: '17px' }}>Name: {fullName}</h2>
                <p style={{ fontWeight: 400, fontSize: '17px' }}>Date of Birth {dateOfBirth}</p>
                <p style={{ fontWeight: 400, fontSize: '17px' }}>Blood Group: {bloogGroup}</p>

                <Divider>Contact Info</Divider>
                <p style={{ fontWeight: 400, fontSize: '17px' }}>Email: {email}</p>
                <p style={{ fontWeight: 400, fontSize: '17px' }}>Contact No. {contactNo}</p>
                <p style={{ fontWeight: 400, fontSize: '17px' }}>Present Address: {presentAddress}</p>
                <p style={{ fontWeight: 400, fontSize: '17px' }}>Permanent Address: {permanentAddress}</p>

            </Card>
        </Flex>
    );
};

export default AdminDetails;