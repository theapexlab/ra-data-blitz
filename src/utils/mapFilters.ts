import { getEntityNameFromResource } from '~/utils/getEntityNameFromResource';

export const mapFilters = (params: { filter: any }, resource: string, searchEntities?: (q: string) => any) => {
  const { q, ...filters } = params.filter || {};
  if (q && searchEntities) {
    const resourceEntity = getEntityNameFromResource(resource);
    const prismaResouce = resourceEntity.charAt(0).toLocaleLowerCase() + resourceEntity.slice(1);
    const search = searchEntities(q)[prismaResouce];
    return {
      where: {
        ...search,
        ...filters,
      },
    };
  } else {
    return {
      where: {
        ...filters,
      },
    };
  }
};
