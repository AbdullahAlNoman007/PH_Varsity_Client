import { useParams } from "react-router-dom";
import { useGetAStudentQuery } from "../../../redux/features/admin/createStudent.api";
import { Card, Divider, Flex } from "antd";
import { Tstudent } from "../../../types/academicManagement.type";

const StudentDetails = () => {
    const { studentID } = useParams()
    const { data: studentData, isFetching, isLoading } = useGetAStudentQuery(studentID)
    if (isFetching || isLoading) {
        return <p>Loading ...</p>
    }

    const { profileImg, fullName, email, contactNo, dateOfBirth, bloogGroup, presentAddress, permanentAddress, admissionSemester: { name: sName, year: sYear }, academicDepartment: { name: dName }, academicFaculty: { name: fName } } = studentData.data as Tstudent



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

                <Divider>Academic Info</Divider>
                <p style={{ fontWeight: 400, fontSize: '17px' }}>Semester: {sName}-{sYear}</p>
                <p style={{ fontWeight: 400, fontSize: '17px' }}>Department: {dName}</p>
                <p style={{ fontWeight: 400, fontSize: '17px' }}>Faculty: {fName}</p>
            </Card>
        </Flex>
    );
};

export default StudentDetails;