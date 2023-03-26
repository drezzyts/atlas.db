export default interface ITableDataProps<TableData> {
  save: () => TableData | false,
  file_version: number
} 