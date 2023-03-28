import { Structure } from '../entities/Structure';
import ITableDataProps from '../interfaces/ITableDataProps';
import { TableSchema } from '../types/TableSchema';

import readFile from './read-file';
import omitKeys from './table/omit-keys';
import pickKeys from './table/pick-keys';
import writeFile from './write-file';

export default function generateDataWithSave<StructureData, TableData extends TableSchema<StructureData>>(path: string, tableData: TableData, structure: Structure<StructureData>){

  function parseToRaw(data: any, save?: boolean){
    const rawData = { ...data }

    delete rawData?.save;
    delete rawData?.file_version;
    delete rawData?.omit;
    delete rawData?.pick;

    save ?? (data = rawData);

    return rawData;
  }
  
  return {
    ...tableData,
    omit: function (...keys: Array<keyof TableData>) { 
      return omitKeys<TableData>(parseToRaw(this as object), keys) 
    },
    pick: function (...keys: Array<keyof TableData>) { 
      return pickKeys<TableData>(parseToRaw(this as object), keys) 
    },
    save: function() {
      const data = readFile<StructureData>(path, structure)

      const previousLocalData = data.find((ref) => ref.id == this.id) 
      if(!previousLocalData)return false;

      const localDataIndex = data.indexOf(previousLocalData);
      if(localDataIndex < 0)return false;
      
      this.file_version++
      const rawData = parseToRaw(this, true);

      data[localDataIndex] = rawData
      
      writeFile<StructureData, TableData>(path, data as TableData[], structure)

      return data;
    },
    file_version: 0
  } as TableData & ITableDataProps<TableData>
}