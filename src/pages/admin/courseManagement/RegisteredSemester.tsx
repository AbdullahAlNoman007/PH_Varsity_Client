import { Button, Dropdown, MenuProps, Pagination, Table, TableColumnsType, TableProps, Tag } from "antd";
import { useState } from "react";
import { TsemesterRegistration } from "../../../types";
import { Tfilter } from "../../../types/academicManagement.type";
import { useGetAllSemesterRegistrationQuery, useUpdateSemesterRegistrationMutation } from "../../../redux/features/admin/CourseManagement.api";
import moment from "moment";
import { toast } from "sonner";

type TtableData = Pick<TsemesterRegistration, 'status' | 'startDate' | 'endDate'>

export const items = [
    {
        key: "UPCOMING",
        label: "Upcoming"
    },
    {
        key: "ONGOING",
        label: "Ongoing"
    },
    {
        key: "ENDED",
        label: "Ended"
    },
]



const RegisteredSemester = () => {
    const [params, setParams] = useState<Tfilter[]>([])
    const [page, setPage] = useState(1)
    const [key, setKey] = useState()
    const [updateSemesterRegistration, { error }] = useUpdateSemesterRegistrationMutation()
    console.log(error);

    const handleMenuClick: MenuProps['onClick'] = async (e) => {
        const body = {
            status: e.key,
        }
        const toastId = toast.loading('Updating admin...')
        try {
            const res = await updateSemesterRegistration({ body, key }).unwrap()
            if (res.success) {
                toast.success(res.message, { id: toastId })
            }
        } catch (error: any) {
            toast.error(error?.data?.message, { id: toastId })
        }
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    const columns: TableColumnsType<TtableData> = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (item) => {
                let color;
                if (item === 'UPCOMING') {
                    color = 'blue';
                }
                else if (item === 'ONGOING') {
                    color = 'green';
                }
                else if (item === 'ENDED') {
                    color = 'red';
                }
                return <Tag color={color}>{item}</Tag>
            }
        },
        {
            title: 'Start Date',
            key: 'start-date',
            dataIndex: 'startDate',
        },
        {
            title: 'End Date',
            key: 'end-date',
            dataIndex: 'endDate',
        },
        {
            title: "Action",
            key: 'x',
            render: (item) => {
                return (
                    <Dropdown menu={menuProps} trigger={['click']}>
                        <Button onClick={() => setKey(item.key)}>Update</Button>
                    </Dropdown >
                )
            },
            width: '1%'
        }
    ];


    const { data: semesterData, isFetching } = useGetAllSemesterRegistrationQuery([
        { name: 'limit', value: 10 },
        { name: 'page', value: page },
        { name: 'sort', value: 'id' },
        ...params
    ])


    const metaData = semesterData?.meta
    const tableData = semesterData?.data?.map(({ _id, academicSemester, status, startDate, endDate }) => ({
        key: _id,
        _id,
        name: `${academicSemester.name} ${academicSemester.year}`,
        status,
        startDate: moment(new Date(startDate)).format('MMMM'),
        endDate: moment(new Date(endDate)).format('MMMM')
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

export default RegisteredSemester;