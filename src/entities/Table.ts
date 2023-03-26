import fs from 'fs';

import { TableSchema } from "../types/TableSchema";

import createFileIfNotExists from "../lib/create-file-if-not-exists";
import generateDataWithSave from "../lib/generate-data-with-save";
import readFile from '../lib/read-file';
import writeFile from '../lib/write-file';

import { Structure } from "./Structure";
import ITableDataProps from '../interfaces/ITableDataProps';

export class Table<
  StructureData,
  TableData extends TableSchema<StructureData>
> {
  public name: string;
  public path: string;
  public structure: Structure<StructureData>;

  constructor(name: string, path: string, structure: Structure<StructureData>) {
    this.name = name;
    this.path = path;
    this.structure = structure;
  }

  public data(): TableData[]{
    createFileIfNotExists(this.path, '[]')

    const data = readFile<StructureData>(this.path, this.structure)
    return data as TableData[];
  }

  public create(props: TableData): TableData & ITableDataProps<TableData>| null {
    if(!props?.id)return null;
    
    const data = this.data()

    const existsIdInTable = data.find(ref => ref.id === props.id)
    if(existsIdInTable)return null;
    
    const newData = props;

    Object.entries(this.structure.defaultData).forEach(([ref, val]) => {
      if(props[ref as keyof StructureData])return;

      newData[ref as keyof StructureData] = val;
    })

    data.push(newData)

    writeFile<StructureData, TableData>(this.path, data, this.structure)

    return generateDataWithSave<StructureData, TableData>(this.path, newData, this.structure);
  }

  public get(id: TableData["id"]): TableData & ITableDataProps<TableData> | undefined {
    if(!id)return;

    const data = this.data().find(ref => ref.id === id);
    
    if(data)return generateDataWithSave<StructureData, TableData>(this.path, data, this.structure)

    return;
  }

  public find(
    func: (this: void, value: TableData, index: number, obj: TableData[]) => any, thisArg?: any
  ) {

    if(!func)return;

    const data = this.data().find(func);

    if(data)return generateDataWithSave<StructureData, TableData>(this.path, data, this.structure)
  }

  public remove(id: TableData["id"]) : boolean {
    if(!id) return false;

    const reference = this.data().find(ref => ref.id == id);
    if(!reference) return false;

    let data = this.data()
    data.splice(data.indexOf(reference), 1)
    
    writeFile<StructureData, TableData>(this.path, data, this.structure)

    return true;
  }

  public clear(): boolean {
    fs.writeFileSync(this.path, '[]', 'utf-8')
    return true;
  }
}