type TableBase<StructureSchema> = {
  [key in keyof StructureSchema]: StructureSchema[key] 
}
type TableId = {
  id: any
}
export type TableSchema<StructureSchema> = TableBase<StructureSchema> & TableId