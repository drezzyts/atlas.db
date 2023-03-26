import { StructureType } from "../types/StructureType";
import { TableSchema } from "../types/TableSchema";

export default function parseAndValidateRawData<StructureSchema>(
  raw: TableSchema<StructureSchema>,
  structure: StructureType<StructureSchema>
) {
  const structureConstructors = Object.values(structure).map((x: any)=> x.type)
  const rawConstructors = Object.values(raw).map(val => val.constructor)
  const simillarity = structureConstructors.map((st, i) => st === rawConstructors[i])

  if(
    rawConstructors.length !== structureConstructors.length || 
    simillarity.length !== structureConstructors.length ||
    simillarity.length !== rawConstructors.length
  ) return raw;

  let parsedData = Object.create({})

  Object.entries(raw).forEach(([ref, val], index) => {
    const constructor = val.constructor
    
    if(structureConstructors[index] !== constructor)return;
    if([Map, Set].includes(constructor)) return parsedData[ref] = [...val];
    
    return parsedData[ref] = val;
  })

  return parsedData;
}