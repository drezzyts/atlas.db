import createDirIfNotExists from '../lib/create-dir-if-not-exists';
import createFileIfNotExists from '../lib/create-file-if-not-exists';

import { TableSchema } from '../types/TableSchema';

import { Structure } from './Structure';
import { Table } from './Table';

export class Database {
  public path: string;
  public tables: Table<any, any>[] = [];
  public tablesPath: string;

  constructor(path = './atlas'){
    this.path = path;
    this.tablesPath = `${this.path}/tables`;
    
    createDirIfNotExists(this.path);
    createDirIfNotExists(this.tablesPath);
  }

  createTable<StructureData>(name: string, structure: Structure<StructureData>) : Table<StructureData, TableSchema<StructureData>> {
    const tablePath = `${this.path}/tables/${name}.json`
    createFileIfNotExists(tablePath, '[]') 
    
    const table = new Table<StructureData, TableSchema<StructureData>>(name, tablePath, structure)
    this.tables.push(table)

    return table;
  }
}