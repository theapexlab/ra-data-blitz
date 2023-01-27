import getBlitzDataProvider from './index';
import {DataProvider} from "ra-core";

let dataProvider: DataProvider;
const searchEntities = (q: string) => ({
  user: {
    name: {
      contains: q,
    },
  },
});

beforeEach(() => {
  // @ts-ignore
  dataProvider = getBlitzDataProvider({ invoke: global.mockedInvoke, searchEntities });
});

describe('index', () => {
  it('should return a data provider', () => {
    expect(dataProvider).toBeDefined();
  });

  test('getList should work', async () => {
    const response = await dataProvider.getList('posts', {
      filter: { q: 'asdfasdf' },
      pagination: { page: 1, perPage: 10 },
      sort: { field: 'id', order: 'ASC' },
    });
    expect(response.data).toBeDefined();
    expect(response.total).toBeDefined();
  });

  test('getOne should work', async () => {
    const response = await dataProvider.getOne('posts', { id: 1 });
    expect(response.data).toBeDefined();
  });

  test('getOne should work with UUID', async () => {
    const response = await dataProvider.getOne('posts', { id: '8bea3111-a52b-4bfc-aa0a-c7b49cd2adb4' });
    expect(response.data).toBeDefined();
  });

  test('getMany should work', async () => {
    const response = await dataProvider.getMany('posts', { ids: [1, 2] });
    expect(response.data).toBeDefined();
  });

  test('getManyReference should work', async () => {
    const response = await dataProvider.getManyReference('posts', {
      filter: undefined,
      id: '',
      target: 'comments',
      pagination: { page: 1, perPage: 10 },
      sort: { field: 'id', order: 'ASC' }
    });
    expect(response.data).toBeDefined();
    expect(response.total).toBeDefined();
  });

  test('update should work', async () => {
    const response = await dataProvider.update('posts', {previousData: { id: ''}, id: 1, data: { title: 'asdf' } });
    expect(response.data).toBeDefined();
  });

  test('updateMany should work', async () => {
    const response = await dataProvider.updateMany('posts', {
      ids: [1, 2],
      data: { title: 'asdf' },
    });
    expect(response.data).toBeDefined();
  });

  test('create should work', async () => {
    const response = await dataProvider.create('posts', { data: { title: 'asdf' } });
    expect(response.data).toBeDefined();
  });

  test('delete should work', async () => {
    const response = await dataProvider.delete('posts', { id: 1 });
    expect(response.data).toBeDefined();
  });

  test('deleteMany should work', async () => {
    const response = await dataProvider.deleteMany('posts', { ids: [1, 2] });
    expect(response.data).toBeDefined();
  });
});
