import { Button, Dropdown, Pagination, Table, TableColumnsType, TableProps, Tag } from "antd";
import { Tcourses } from "../../../types";
import { Tfilter } from "../../../types/academicManagement.type";
import moment from "moment";
import { useGetAllCoursesQuery } from "../../../redux/features/admin/CourseManagement.api";



type TtableData = Pick<Tcourses, "title" | "code">

const Courses = () => {

    const { data: courses, isFetching } = useGetAllCoursesQuery(undefined)

    const columns: TableColumnsType<TtableData> = [
        {
            title: 'Title',
            key: 'title',
            dataIndex: 'title',
        },
        {
            title: 'Code',
            key: 'code',
            dataIndex: 'code',
        },
        {
            title: "Action",
            key: 'x',
            render: (item) => {
                return (
                    <Button>Assign Faculty</Button>
                )
            },
            width: '1%'
        }
    ];
    const tableData = courses?.data?.map(({ _id, title, code }) => ({
        key: _id,
        _id,
        title,
        code
    }))

    const onChange: TableProps<TtableData>['onChange'] = (_pagination, filters, _sorter, extra) => {
        if (extra.action === 'filter') {
            const queryParams: Tfilter[] = []
            filters.name?.forEach((item) => queryParams.push({ name: 'name', value: item }))
            filters.year?.forEach((item) => queryParams.push({ name: 'year', value: item }))
        }
    };

    return (
        <>
            <Table loading={isFetching} columns={columns} dataSource={tableData} onChange={onChange} pagination={false} />
        </>
    );

};

export default Courses;