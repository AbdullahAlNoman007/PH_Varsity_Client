import { Table, type TableColumnsType } from "antd";
import { TacademicFaculty } from "../../../types/academicManagement.type";
import { useGetAllFacultyQuery } from "../../../redux/features/admin/academicFaculty.api";

type TtableData = Pick<TacademicFaculty, 'name'>

const columns: TableColumnsType<TtableData> = [
  {
    title: 'Name',
    dataIndex: 'name',
  }
];

const AcademicFaculty = () => {

  const { data: facultData, isFetching } = useGetAllFacultyQuery(undefined)

  const tableData = facultData?.data?.map(({ _id, name }) => ({
    key: _id,
    name
  }))

  return <Table loading={isFetching} columns={columns} dataSource={tableData} />

};

export default AcademicFaculty;
