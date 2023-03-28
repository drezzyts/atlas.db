[![Version](https://img.shields.io/npm/v/atlas.db?label=version&style=flat-square&logo=npm&color=CB3837&logoColor=white)](https://npmjs.com/atlas.db)
[![GithubStars](https://img.shields.io/github/stars/drezzyts/atlas.db?style=flat-square&logo=github)](https://github.com/drezzyts/atlas.db)
[![Downloads](https://img.shields.io/npm/dt/atlas.db?label=downloads&style=flat-square&color=green)](https://npmjs.com/atlas.db)
[![Package Quality](https://packagequality.com/shield/atlas.db.svg)](https://packagequality.com/#?package=atlas.db)

# **atlas.db**
- This is a simple and powerful JSON local database library

# Installation
- Run this command for install atlas.db.
```bash
npm i atlas.db
```
# Usage
## Javascript
> JavaScript Example 
```js
const Atlas = require('atlas.db');

const Database = Atlas.Database.getInstance();

const UsersStructure = new Atlas.Structure({
  id: { type: String },
  coins: { type: Number, default: 0 }
});
const Users = Database.createTable('users', UsersStructure);

const user = Users.get('drezzy') || Users.create({ id: 'drezzy'})

if(user){
  user.coins = 2000;
  user.save();
}

user // { id: 'drezzy', coins: 2000 }
user.omit('coins') // { id: 'drezzy' }
user.pick('coins') // { coins: 2000 }
```
## Typescript
> Typescript Example
```ts
import * as Atlas from 'atlas.db';

interface IUser {
  id: string, 
  coins?: number
}

const Database = Atlas.Database.getInstance();

const UsersStructure = new Atlas.Structure<IUser>({
  id: { type: String },
  coins: { type: Number, default: 0 }
});
const Users = Database.createTable<IUser>('users', UsersStructure);

const user = Users.get('drezzy') || Users.create({ id: 'drezzy'})

if(user){
  user.coins = 2000;
  user.save();
}

user // { id: 'drezzy', coins: 2000 }
user.omit('coins') // { id: 'drezzy' }
user.pick('coins') // { coins: 2000 }
```
