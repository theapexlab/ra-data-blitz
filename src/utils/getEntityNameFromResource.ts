import pluralize from 'pluralize'
import {pascalCase} from 'pascal-case'

export const getEntityNameFromResource = (resource: string) => {
  return pascalCase(pluralize.singular(resource));
};

