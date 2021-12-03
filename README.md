# ra-data-blitz

Easily build fullstack backoffice apps with [blitz-js](https://github.com/blitz-js/blitz) and [react-admin](https://github.com/marmelab/react-admin)!

[Demo app](https://github.com/theapexlab/react-admin-blitz-demo)

## Installation

```sh
npm install --save @theapexlab/ra-data-blitz
```

or

```sh
yarn add @theapexlab/ra-data-blitz
```

## Usage

This example assumes a `Post` type is defined in your datamodel.

```js
// in App.js
import React from 'react';
import { Admin, Resource } from 'react-admin';
import blitzDataProvider from '@theapexlab/ra-data-blitz';
import { PostList } from './PostList';
import { PostEdit } from './PostEdit';
import { PostCreate } from './PostCreate';
import { invoke } from 'blitz';

const dataProvider = blitzDataProvider({ invoke });

const ReactAdmin = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} />
    </Admin>
  );
};

export default ReactAdmin;
```
