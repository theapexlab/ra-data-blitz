# Blitz-js data provider for react-admin

Easily build fullstack backoffice apps with [blitz-js](https://github.com/blitz-js/blitz) and [react-admin](https://github.com/marmelab/react-admin)!

Check-out our official [Demo app](https://github.com/theapexlab/react-admin-blitz-demo)

## Installation

```sh
npm install --save @theapexlab/ra-data-blitz
```

or

```sh
yarn add @theapexlab/ra-data-blitz
```

## Usage

Add a new data model to your `blitzjs` project's prisma schema:

```js
// in schema.prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
}
```

Generate CRUD resolvers for the model by running the following command:
```sh
blitz generate crud post
```

Import `blitzDataProvider`  from  `@theapexlab/ra-data-blitz`  and optionally define a `searchEntities` function:

```js
// in App.js
import React from 'react';
import { Admin, Resource } from 'react-admin';
import blitzDataProvider from '@theapexlab/ra-data-blitz';
import { PostList } from './PostList';
import { PostEdit } from './PostEdit';
import { PostCreate } from './PostCreate';
import { invoke } from 'blitz';
import { Prisma } from "db"

// specifies search functionality of postFilters
const searchEntities = (
  q: string
): { user: Prisma.PostWhereInput } => ({
  // / NOTE: you can provide [prismaEnitityName]:  PrismaWhereInput pairs here
  post: {
    title: {
      contains: q
    }
  }
})

// invoke is neccasary to call blitzjs RPC api
const dataProvider = blitzDataProvider({ invoke, searchEntities });

const ReactAdmin = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} />
    </Admin>
  );
};

export default ReactAdmin;
```


```js
// in PostList.tsx
import {
  List,
  Datagrid,
  TextField,
  TextInput,
} from "react-admin"

// NOTE: source must be "q" inorder to make search functionality work
const postFilters = [
  <TextInput key="search" source="q" label="Search" alwaysOn />,
]

export const PostList = (props) => (
  <List filters={postFilters} {...props} exporter={false}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="content" />
    </Datagrid>
  </List>
)

```

##  License
This data provider is licensed under the MIT License.