import fs from 'fs';

export default function createDirIfNotExists(path: string) : boolean {
    if(!fs.existsSync(path)){
      fs.mkdirSync(path);
      return true;
    }

    return false;
}