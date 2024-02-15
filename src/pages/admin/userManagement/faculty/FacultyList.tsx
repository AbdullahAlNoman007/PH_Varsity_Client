import { Button, Pagination, Space, Table } from "antd";
import type { TableColumnsType, TableProps } from 'antd';
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tfilter } from "../../../../types/academicManagement.type";
import { useGetAllFacultyMemberQuery } from "../../../../redux/features/admin/createFaculty.api";
import Delete from "./BlockFaculty";

type TtableData = {
    key: string;
    _id: string;
    fullName: string;
    email: string;
    contactNo: string;
    academicDepartment: string;
}


const columns: TableColumnsType<TtableData> = [
    {
        title: 'Name',
        key: 'name',
        dataIndex: 'fullName',
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
        title: 'Department',
        key: 'academicDepartment',
        dataIndex: 'academicDepartment',
    },
    {
        title: "Action",
        key: 'x',
        render: (item) => {
            return (
                <Space>
                    <Link to={`/admin/faculty-data/${item.key}`}>
                        <Button>Details</Button>
                    </Link>
                    <Link to={`/admin/faculty-update/${item.key}`}>
                        <Button>Update</Button>
                    </Link>
                    <Delete id={item.key} />
                </Space >
            )
        },
        width: '1%'
    }
];

const FacultyList = () => {
    const [params, setParams] = useState<Tfilter[]>([])
    const [page, setPage] = useState(1)
    const { data: facultyData, isFetching } =
        useGetAllFacultyMemberQuery([
            { name: 'limit', value: 10 },
            { name: 'page', value: page },
            { name: 'sort', value: 'id' },
            ...params
        ])

    const metaData = facultyData?.meta
    const tableData = facultyData?.data?.map(({ _id, fullName, email, contactNo, academicDepartment }) => ({
        key: _id,
        _id,
        fullName,
        email,
        contactNo,
        academicDepartment: academicDepartment.name
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

export default FacultyList;