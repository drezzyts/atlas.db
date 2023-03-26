import { Structure } from "../entities/Structure";
import { TableSchema } from "../types/TableSchema";

export default function parseToRawData<StructureData>(
  data: TableSchema<StructureData>,
  structure: Structure<StructureData>
): TableSchema<StructureData> {
  const mapsAndsSets = Object.values(structure.props).map((sc:any) => sc.type).filter(c => [Map, Set].includes(c))
  if(!mapsAndsSets.length)return data;

  const structureKeys = Object.entries(structure.props)
    .filter(([ref, val], i: number) => [Map, Set].includes((val as any).type))
    .map(([ref, val]) => ref) as Array<keyof StructureData>

  mapsAndsSets.forEach((constructor, index) => {
    const value = Array.isArray(data[structureKeys[index]]) ? data[structureKeys[index]] : []
    data[structureKeys[index]] = new constructor(value)
  })

  return data;
}