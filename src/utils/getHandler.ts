import { QueryMethod, GetHandlerParams, GetHandlerModuleParams } from '../types';
import { getEntityNameFromResource } from './getEntityNameFromResource';
import { getPluralEntityName } from './getPluralEntityName';

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