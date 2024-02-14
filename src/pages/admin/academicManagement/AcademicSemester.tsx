import { Table } from "antd";
import type { TableColumnsType, TableProps } from 'antd';
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester, Tfilter } from "../../../types/academicManagement.type";
import { useState } from "react";

type TtableData = Pick<TAcademicSemester, 'name' | 'endMonth' | 'startMonth' | 'year'>


const columns: TableColumnsType<TtableData> = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'Autumn',
        value: 'Autumn',
      },
      {
        text: 'Fall',
        value: 'Fall',
      },
      {
        text: 'Summer',
        value: 'Summer',
      },
    ]
  },
  {
    title: 'Year',
    dataIndex: 'year',
    filters: [
      {
        text: '2024',
        value: '2024',
      },
      {
        text: '2025',
        value: '2025',
      },
      {
        text: '2026',
        value: '2026',
      },
      {
        text: '2027',
        value: '2027',
      },
      {
        text: '2028',
        value: '2028',
      },
    ]
  },
  {
    title: 'Start Month',
    dataIndex: 'startMonth',
  },
  {
    title: 'End Month',
    dataIndex: 'endMonth',
  },
];

const AcademicSemester = () => {
  const [params, setParams] = useState<Tfilter[] | undefined>(undefined)
  const { data: semesterDate, isFetching } = useGetAllSemestersQuery(params)

  const tableData = semesterDate?.data?.map(({ _id, name, startMonth, endMonth, year }) => ({
    key: _id,
    _id,
    name,
    startMonth,
    endMonth,
    year
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
    <Table loading={isFetching} columns={columns} dataSource={tableData} onChange={onChange} />
  );
};

export default AcademicSemester;
