import { isPlural } from 'pluralize';
import { QueryMethod, GetHandlerParams, GetHandlerModuleParams } from '../types';
import { getEntityNameFromResource } from './getEntityNameFromResource';
import { getPluralEntityName } from './getPluralEntityName';

const getHandlerModule = async ({ handlerRoot, resource, method, plural }: GetHandlerModuleParams) => {
  const entityName = getEntityNameFromResource(resource);
  const folder = method === QueryMethod.Get ? 'queries' : 'mutations';
  return import(
    `app${handlerRoot.length ? `/${handlerRoot}` : ''}/${resource}/${folder}/${method}${
      plural ? getPluralEntityName(entityName) : entityName
    }`
  );
};

export const getHandler = async ({
  handlerRoot,
  resource,
  method = QueryMethod.Get,
  plural = false,
  invoke,
}: GetHandlerParams) => {
  if (!isPlural(resource)) {
    throw new Error(`Resource '${resource}' MUST be plural!`);
  }

  const handlerModule = await getHandlerModule({ handlerRoot, resource, method, plural });

  return async (params: any) => invoke(handlerModule.default, params);
};
