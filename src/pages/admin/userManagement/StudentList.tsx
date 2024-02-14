import { Button, Pagination, Space, Table } from "antd";
import type { TableColumnsType, TableProps } from 'antd';
import { Tfilter, Tstudent } from "../../../types/academicManagement.type";
import { useState } from "react";
import { useGetAllStudentQuery } from "../../../redux/features/admin/createStudent.api";
import { Link } from "react-router-dom";

type TtableData = Pick<Tstudent, 'id' | 'fullName' | 'email' | 'contactNo'>


const columns: TableColumnsType<TtableData> = [
    {
        title: 'Name',
        key: 'name',
        dataIndex: 'fullName',
    },
    {
        title: 'Roll No.',
        key: 'id',
        dataIndex: 'id',
    },
    {
        title: 'Email',
        key: 'email',
        dataIndex: 'email',
    },
    {
        title: 'Contact No.',
        key: 'contactNo',
        dataIndex: 'contactNo',
    },
    {
        title: "Action",
        key: 'x',
        render: (item) => {

            return (
                <Space>
                    <Link to={`/admin/student-data/${item.key}`}>
                        <Button>Details</Button>
                    </Link>
                    <Link to={`/admin/student-update/${item.key}`}>
                        <Button>Update</Button>
                    </Link>
                    <Button>Block</Button>
                </Space >
            )
        },
        width: '1%'
    }
];

const StudentList = () => {
    const [params, setParams] = useState<Tfilter[]>([])
    const [page, setPage] = useState(1)
    const { data: studentData, isFetching } =
        useGetAllStudentQuery([
            { name: 'limit', value: 10 },
            { name: 'page', value: page },
            { name: 'sort', value: 'id' },
            ...params
        ])

    const metaData = studentData?.meta
    const tableData = studentData?.data?.map(({ _id, fullName, id, email, contactNo }) => ({
        key: _id,
        _id,
        fullName,
        id,
        email,
        contactNo
    }))

    const onChange: TableProps<TtableData>['onChange'] = (_pagination, filters, _sorter, extra) => {
        if (extra.action === 'filter') {
            const queryParams: Tfilter[] = []
            filters.name?.forEach((item) => queryParams.push({ name: 'name', value: item }))
            filters.year?.forEach((item) => queryParams.push({ name: 'year', value: item }))
            setParams(queryParams)
        }
    };

    return (
        <>
            <Table loading={isFetching} columns={columns} dataSource={tableData} onChange={onChange} pagination={false} />
            <Pagination pageSize={metaData?.limit} total={metaData?.total} onChange={(value) => setPage(value)} />
        </>
    );
};

export default StudentList;