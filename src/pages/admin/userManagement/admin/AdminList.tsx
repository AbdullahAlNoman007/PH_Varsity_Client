import { Button, Pagination, Space, Table, TableColumnsType, TableProps } from "antd";
import { Link } from "react-router-dom";
import BlockAdmin from "./BlockAdmin";
import { useState } from "react";
import { Tfilter } from "../../../../types/academicManagement.type";
import { useGetAllAdminQuery } from "../../../../redux/features/admin/createAdmin.api";

type TtableData = {
    key: string;
    _id: string;
    fullName: string;
    email: string;
    contactNo: string;
    presentAddress: string;
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
        title: 'Address',
        key: 'address',
        dataIndex: 'presentAddress',
    },
    {
        title: "Action",
        key: 'x',
        render: (item) => {
            return (
                <Space>
                    <Link to={`/admin/admin-data/${item.key}`}>
                        <Button>Details</Button>
                    </Link>
                    <Link to={`/admin/admin-update/${item.key}`}>
                        <Button>Update</Button>
                    </Link>
                    <BlockAdmin id={item.key} />
                </Space >
            )
        },
        width: '1%'
    }
];

const AdminList = () => {

    const [params, setParams] = useState<Tfilter[]>([])
    const [page, setPage] = useState(1)
    const { data: facultyData, isFetching } =
        useGetAllAdminQuery([
            { name: 'limit', value: 10 },
            { name: 'page', value: page },
            { name: 'sort', value: 'id' },
            ...params
        ])

    const metaData = facultyData?.meta
    const tableData = facultyData?.data?.map(({ _id, fullName, email, contactNo, presentAddress }) => ({
        key: _id,
        _id,
        fullName,
        email,
        contactNo,
        presentAddress
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

export default AdminList;