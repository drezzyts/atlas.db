import fs from 'fs';

export default function deleteFile(path: string){
  if(fs.existsSync(path)){
    fs.unlinkSync(path)
  }
}