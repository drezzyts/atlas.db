import fs from 'fs';

export default function createFileIfNotExists(path: string, content: string) : boolean {
    if(!fs.existsSync(path)){
      fs.writeFileSync(path, content, 'utf-8');
      return true;
    }

    return false;
}