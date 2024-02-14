import { Table } from "antd";
import type { TableColumnsType, TableProps } from 'antd';
import { Tfilter } from "../../../types/academicManagement.type";
import { useState } from "react";
import { useGetAllDepartmentQuery } from "../../../redux/features/admin/academicDepartment.api";



const columns: TableColumnsType<{ department: string, faculty: string }> = [
  {
    title: 'Department Name',
    dataIndex: 'department',
  },
  {
    title: 'Faculty Name',
    dataIndex: 'faculty',
    filters: [
      {
        text: 'Faculty of ECE',
        value: '65c9e37b22baba1e9bec1648',
      },
      {
        text: 'Faculty of CE',
        value: '65c9e3af22baba1e9bec164b',
      },
      {
        text: 'Faculty of Mechanical',
        value: '65c9e3cd22baba1e9bec164e',
      }
    ]
  }
];

const AcademicDepartment = () => {
  const [params, setParams] = useState<Tfilter[] | undefined>(undefined)
  const { data: departments, isFetching } = useGetAllDepartmentQuery(params)

  const tableData = departments?.data?.map(({ _id, name, academicFaculty }) => ({
    key: _id,
    _id,
    department: name,
    faculty: academicFaculty.name
  }))

  const onChange: TableProps<{ department: string, faculty: string }>['onChange'] = (_pagination, filters, _sorter, extra) => {
    if (extra.action === 'filter') {
      const queryParams: Tfilter[] = []
      filters?.faculty?.forEach((item) => queryParams.push({ name: 'academicFaculty', value: item }))

      setParams(queryParams)
    }
  };

  return (
    <Table loading={isFetching} columns={columns} dataSource={tableData} onChange={onChange} />
  );
};

export default AcademicDepartment;
