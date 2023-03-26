import { StructureType } from "../types/StructureType";
import IStructureDefaultDataType from "../interfaces/IStructureDefaultDataType";
import { SchemaTypes } from "../types/SchemaTypes";

export default function generateStructureDefaultData<Schema>(schema: StructureType<Schema>): IStructureDefaultDataType {
  const data: any = {};

  Object.entries(schema as { type: SchemaTypes, default: any }).forEach(([ref, val]) => {
    if((val?.default)?.constructor == val?.type){
      data[ref] = val?.default;
    }
  })

  return data as IStructureDefaultDataType;
}