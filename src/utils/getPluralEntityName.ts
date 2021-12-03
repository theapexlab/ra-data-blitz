import pluralize from 'pluralize';
export const getPluralEntityName = (entityName: string) => {
  return pluralize.plural(entityName);
};
