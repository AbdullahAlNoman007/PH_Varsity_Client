import { Col, Row, Tag } from "antd";
import { useGetMyEnrolledCoursesQuery } from "../../redux/features/student/offeredCourse.api";

const MySchedule = () => {
    const { data: schedules } = useGetMyEnrolledCoursesQuery(undefined);

    return (
        <Row gutter={[0, 20]}>
            {
                schedules?.data?.map((item: any, index: number) => {
                    return <Col key={index} span={24} style={{ border: "solid 2px #d4d4d4", borderRadius: '5px' }}>
                        <div style={{ padding: '10px' }}>
                            <h2>{item.course.title}</h2>
                        </div>
                        <div>
                            <Row justify='space-between' align="middle" style={{ borderTop: "solid 2px #d4d4d4", borderRadius: '2px', padding: '10px' }} gutter={2}>
                                <Col span={4} style={{ fontSize: "17px", fontWeight: 450 }}>Section: {item.offeredCourse.section}</Col>
                                <Col span={4} style={{ fontSize: "17px", fontWeight: 450 }}>Faculty: {item.faculty.name.firstName}</Col>
                                <Col span={4} style={{ fontSize: "17px", fontWeight: 450 }}>Start Time: {item.offeredCourse.startTime}</Col>
                                <Col span={4} style={{ fontSize: "17px", fontWeight: 450 }}>End Time: {item.offeredCourse.endTime}</Col>
                                <Col span={4} style={{ fontSize: "17px", fontWeight: 450 }}>Days: {item.offeredCourse.days.map((day: string, index: number) => <Tag key={index}> {day} </Tag>)}</Col>
                            </Row>
                        </div>
                    </Col>
                })
            }
        </Row>
    );
};

export default MySchedule;