export default interface ITableDataProps<TableData> {
  save: () => TableData | false,
  omit: (...keys: Array<keyof TableData>) => Partial<Record<keyof TableData, any>>,
  pick: (...keys: Array<keyof TableData>) => Partial<Record<keyof TableData, any>>,
  file_version: number
} 