import createDirIfNotExists from '../lib/create-dir-if-not-exists';
import createFileIfNotExists from '../lib/create-file-if-not-exists';
import deleteFile from '../lib/delete-file';

import { TableSchema } from '../types/TableSchema';

import { Structure } from './Structure';
import { Table } from './Table';

export class Database {
  static instance: Database;

  public tables: Table<any, any>[] = [];
  public tablesPath: string;

  private constructor(public path?: string){
    path ??= './atlas';

    this.path = path;
    this.tablesPath = `${this.path}/tables`;
    
    createDirIfNotExists(this.path as string);
    createDirIfNotExists(this.tablesPath);
  }

  static getInstance(path?: string){
    
    if(!Database.instance){
      Database.instance = new Database(path)
    }
    
    return Database.instance;
  }

  public createTable<StructureData>(name: string, structure: Structure<StructureData>) : Table<StructureData, TableSchema<StructureData>> {
    const tablePath = `${this.path}/tables/${name}.json`
    createFileIfNotExists(tablePath, '[]') 
    
    const table = new Table<StructureData, TableSchema<StructureData>>(name, tablePath, structure)
    this.tables.push(table)

    return table;
  }

  public getTableByName(tableName: string) : Table<any, any> | undefined {
    const findTable = this.tables.find(table => table.name.toLowerCase() === tableName.toLowerCase())
    if(findTable)return findTable;
  }

  public deleteTableByName(tableName: string): boolean {
    const table = this.getTableByName(tableName)
    if(!table)return false;

    delete this.tables[this.tables.indexOf(table)]
    deleteFile(table.path);

    return true;
  }

}