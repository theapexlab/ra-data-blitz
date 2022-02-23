import { DataProvider } from 'ra-core';
import { BlitzDataProviderParams, QueryMethod } from './types';
import { getHandler } from './utils/getHandler';
import { mapFilters } from './utils/mapFilters';
import { mapPaginationAndSort } from './utils/mapPaginationAndSort';

const getBlitzDataProvider = ({ invoke, searchEntities, handlerRoot = '' }: BlitzDataProviderParams): DataProvider => ({
  getList: async (resource, params) => {
    const handler = await getHandler({ handlerRoot, resource, plural: true, invoke });
    const data = await handler({ ...mapPaginationAndSort(params), ...mapFilters(params, resource, searchEntities) });
    return {
      data: data[resource],
      total: data.count,
    };
  },

  getOne: async (resource, params) => {
    const id = params.id as string;
    const handler = await getHandler({ handlerRoot, resource, invoke });
    const data = await handler({ id: parseInt(id) });
    return {
      data,
    };
  },

  getMany: async (resource, params) => {
    const handler = await getHandler({ handlerRoot, resource, plural: true, invoke });
    const data = await handler({
      where: {
        id: {
          in: params.ids,
        },
      },
    });

    return {
      data: data[resource],
    };
  },

  getManyReference: async (resource, params) => {
    const handler = await getHandler({ handlerRoot, resource, plural: true, invoke });
    const data = await handler({
      ...mapPaginationAndSort(params),
      where: {
        [params.target]: params.id,
      },
    });

    return {
      data: data[resource],
      total: data.count,
    };
  },

  update: async (resource, params) => {
    const handler = await getHandler({ handlerRoot, resource, method: QueryMethod.Update, invoke });
    const data = await handler({
      id: params.id,
      ...params.data,
    });

    return { data };
  },

  updateMany: async (resource, params) => {
    const responses = await Promise.all(
      params.ids.map(async id => {
        const handler = await getHandler({
          handlerRoot,
          resource,
          method: QueryMethod.Update,
          invoke,
        });
        return handler({
          id,
          ...params.data,
        });
      }),
    );
    return { data: responses.map(data => data.id) };
  },

  create: async (resource, params) => {
    const handler = await getHandler({ handlerRoot, resource, method: QueryMethod.Create, invoke });
    const data = await handler(params.data);

    return {
      data,
    };
  },

  delete: async (resource, params) => {
    const handler = await getHandler({ handlerRoot, resource, method: QueryMethod.Delete, invoke });
    const data = await handler({
      id: params.id,
    });

    return { data };
  },

  deleteMany: async (resource, params) => {
    const responses = await Promise.all(
      params.ids.map(async id => {
        const handler = await getHandler({
          handlerRoot,
          resource,
          method: QueryMethod.Delete,
          invoke,
        });
        return handler({
          id,
        });
      }),
    );
    return { data: responses.map(data => data.id) };
  },
});

export default getBlitzDataProvider;
