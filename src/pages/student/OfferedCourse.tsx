import { Button, Col, Row, Tag } from "antd";
import { useEnrolledCourseMutation, useGetMyOfferedCoursesQuery } from "../../redux/features/student/offeredCourse.api";
import { toast } from "sonner";

type CourseData = {
  [key: string]: {
    courseTitle: string;
    sections: {
      section: number;
      _id: string;
      days: string[];
      startTime: string;
      endTime: string;
    }[];
  };
};


const OfferedCourse = () => {
  const { data: OfferedCourses } = useGetMyOfferedCoursesQuery(undefined);
  const [enrolledCourse] = useEnrolledCourseMutation();

  const singleData = OfferedCourses?.data?.reduce((acc: CourseData, item) => {
    const key = item.course.title;
    acc[key] = acc[key] || { courseTitle: key, sections: [] }

    acc[key].sections.push({
      section: item.section,
      _id: item._id,
      days: item.days,
      startTime: item.startTime,
      endTime: item.endTime
    })
    return acc;
  }, {});

  const modifiedData = (Object.values(singleData ? singleData : {}));

  const handleEnroll = async (id: string) => {
    const enrollData = {
      offeredCourse: id
    }

    const toastId = toast.loading("Creating...")
    try {
      const res = await enrolledCourse(enrollData).unwrap()

      if (res.success) {
        toast.success(res.message, { id: toastId })
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId })
    }
    enrolledCourse(enrollData);

  }

  return (
    <Row gutter={[0, 20]}>
      {
        modifiedData.map((item, index) => {
          return <Col key={index} span={24} style={{ border: "solid 2px #d4d4d4", borderRadius: '5px' }}>
            <div style={{ padding: '10px' }}>
              <h2>{item.courseTitle}</h2>
            </div>
            <div>
              {
                item.sections.map((ele) => {
                  return <Row key={ele._id} justify="space-around" align="middle" style={{ borderTop: "solid 2px #d4d4d4", borderRadius: '2px', padding: '7px' }}>
                    <Col span={5} style={{ fontSize: "17px", fontWeight: 450 }}>Section: {ele.section}</Col>
                    <Col span={5} style={{ fontSize: "17px", fontWeight: 450 }}>Days: {ele.days.map((day, index) => <Tag key={index}> {day} </Tag>)}</Col>
                    <Col span={5} style={{ fontSize: "17px", fontWeight: 450 }}>Start Time: {ele.startTime}</Col>
                    <Col span={5} style={{ fontSize: "17px", fontWeight: 450 }}>End Time: {ele.endTime}</Col>
                    <Button onClick={() => handleEnroll(ele._id)}>Enroll</Button>
                  </Row>
                })
              }
            </div>
          </Col>
        })
      }
    </Row>
  );
};

export default OfferedCourse;
