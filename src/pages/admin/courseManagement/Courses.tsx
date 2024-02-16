import { Table, TableColumnsType, TableProps, } from "antd";
import { Tcourses } from "../../../types";
import { Tfilter } from "../../../types/academicManagement.type";
import { useGetAllCoursesQuery } from "../../../redux/features/admin/CourseManagement.api";
import AssignModal from "./AssignModal";

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
                return <AssignModal item={item.key} />
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