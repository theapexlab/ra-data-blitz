import { GetListParams } from 'ra-core';
import { GetHandlerModuleParams, GetHandlerParams, QueryMethod } from './types';

const MAX_TAKE = 250;

export const getEntityNameFromResource = (resource: string) => {
  const entityName = resource.charAt(0).toUpperCase() + resource.slice(1, -1);
  return entityName;
};

export const getPluralEntityName = (entityName: string) => {
  return `${entityName}s`;
};

export const mapFilters = (params: GetListParams) => {
  const { q, ...filters } = params.filter || {};
  // TODO: add the ability for the user to add custom mapping
  const search = q
    ? {
        email: {
          contains: q,
        },
      }
    : undefined;

  return {
    where: {
      ...search,
      ...filters,
    },
  };
};

export const mapPaginationAndSort = (params: GetListParams) => {
  const { page, perPage } = params.pagination;
  const { field, order } = params.sort;

  return {
    orderBy: {
      [field]: order.toLowerCase(),
    },
    skip: (page - 1) * perPage,
    // TODO: somehow get MAX_TAKE from config?
    take: perPage > MAX_TAKE ? MAX_TAKE : perPage,
  };
};

const getHandlerModule = async ({ resource, method, plural }: GetHandlerModuleParams) => {
  const entityName = getEntityNameFromResource(resource);
  const folder = method === QueryMethod.Get ? 'queries' : 'mutations';
  return import(`app/${resource}/${folder}/${method}${plural ? getPluralEntityName(entityName) : entityName}.ts`);
};

export const getHandler = async ({ resource, method = QueryMethod.Get, plural = false, invoke }: GetHandlerParams) => {
  try {
    const allowedMethods = ['create', 'get', 'update', 'delete']
    if (!allowedMethods.includes(method)) {
      throw new Error(`Unknown handler method: ${method}. Allowed methods: ${allowedMethods}`);
    }

    const handlerModule = await getHandlerModule({ resource, method, plural });

    return async (params: any) => invoke(handlerModule.default, params);
  } catch (error) {
    throw error;
  }
};
