import { useParams } from "react-router-dom";

const StudentDetails = () => {
    const { studentID } = useParams()
    return (
        <div>
            <h1>This is student details {studentID}</h1>
        </div>
    );
};

export default StudentDetails;