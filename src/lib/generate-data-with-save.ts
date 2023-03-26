import { Structure } from '../entities/Structure';
import ITableDataProps from '../interfaces/ITableDataProps';
import { TableSchema } from '../types/TableSchema';

import readFile from './read-file';
import writeFile from './write-file';

export default function generateDataWithSave<StructureData, TableData extends TableSchema<StructureData>>(path: string, tableData: TableData, structure: Structure<StructureData>){

  function parseDataToSave(data: any){
    const rawData = { ...data }

    delete rawData?.save
    delete rawData?.file_version;

    data = rawData;

    return rawData;
  }
  
  return {
    ...tableData,
    save: function() {
      const data = readFile<StructureData>(path, structure)

      const previousLocalData = data.find((ref) => ref.id == this.id) 
      if(!previousLocalData)return false;

      const localDataIndex = data.indexOf(previousLocalData);
      if(localDataIndex < 0)return false;
      
      this.file_version++
      const rawData = parseDataToSave(this);

      console.log(rawData)

      data[localDataIndex] = rawData
      
      writeFile<StructureData, TableData>(path, data as TableData[], structure)

      return data;
    },
    file_version: 0
  } as TableData & ITableDataProps<TableData>
}