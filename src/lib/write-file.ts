import { writeFileSync } from "fs";
import { Structure } from "../entities/Structure";
import { TableSchema } from "../types/TableSchema";

import parseAndValidateRawData from "./parse-and-validate-raw-data";
import readFile from "./read-file";

export default function writeFile<
  StructureData,
  TableData extends TableSchema<StructureData>
> (
  path: string,
  newRawData: TableData[],
  structure: Structure<StructureData>
) {
  const data = readFile<StructureData>(path, structure);
  
  const parsedAndValidatedData = newRawData.map(raw => {
    return parseAndValidateRawData(raw, structure.props)
  });
  
  parsedAndValidatedData.forEach((currData: TableData) => {
    Object.entries(currData).forEach(([ref, val]) => {
      if(ref == 'id')return;
      
      const previousLocalData = data.find(x => x.id == currData.id)
      if(!previousLocalData)return data.push(currData)

      const localDataIndex = data.indexOf(previousLocalData)

      data[localDataIndex][ref as keyof StructureData] = val;
    })
  })

  writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8')
}