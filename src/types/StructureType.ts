import { SchemaTypes } from './SchemaTypes';

type AllStructureKeys<StructureSchema> = Partial<StructureSchema> & Required<StructureSchema>

export type StructureType<StructureSchema> = {
  [key in keyof AllStructureKeys<StructureSchema>]: { 
    type: AllStructureKeys<StructureSchema>[key] extends Number ? NumberConstructor :
    AllStructureKeys<StructureSchema>[key] extends String ? StringConstructor :
    AllStructureKeys<StructureSchema>[key] extends Array<any> ? ArrayConstructor :
    AllStructureKeys<StructureSchema>[key] extends Map<any, any> ? MapConstructor :
    AllStructureKeys<StructureSchema>[key] extends Set<any> ? SetConstructor :
    AllStructureKeys<StructureSchema>[key] extends Object ? ObjectConstructor :
    SchemaTypes, 
    default?: StructureSchema[key] }
}
