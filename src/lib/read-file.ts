import { readFileSync } from "fs";
import { Structure } from "../entities/Structure";
import { TableSchema } from "../types/TableSchema";

import parseToRawData from "./parse-to-raw-data";

export default function readFile<StructureData>(
  path: string,
  structure: Structure<StructureData>
): TableSchema<StructureData>[] {
  const data = JSON.parse(readFileSync(path, 'utf-8')) as TableSchema<StructureData>[]
  const parsedData = data.map(raw => parseToRawData<StructureData>(raw, structure))
  
  return parsedData;
}