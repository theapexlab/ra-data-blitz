# ra-data-blitz
Easily build fullstack backoffice apps with `blitzjs`  and `react-admin`!

# Summary

todo: write summary


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
import React from "react"
import { Admin, Resource } from "react-admin"
import blitzDataProvider from "@theapexlab/ra-data-blitz"
import { PostList } from "./PostList"
import { PostEdit } from "./PostEdit"
import { PostCreate } from "./PostCreate"
import { invoke } from "blitz"

const dataProvider = blitzDataProvider(invoke)

const ReactAdmin = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} />
    </Admin>
  )
}

export default ReactAdmin
```