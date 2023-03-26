import IStructureDefaultDataType from "../interfaces/IStructureDefaultDataType";
import { StructureType } from "../types/StructureType";

import generateStructureDefaultData from "../lib/generate-structure-default-data";


export class Structure<StructureData> {
  public props: StructureType<StructureData>;
  public defaultData: IStructureDefaultDataType;

  constructor(props: StructureType<StructureData>) {
    this.props = props;
    this.defaultData = generateStructureDefaultData(props)
  }
}