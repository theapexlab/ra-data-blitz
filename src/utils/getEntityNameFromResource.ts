import { singular } from 'pluralize';
import { pascalCase } from 'pascal-case';

export const getEntityNameFromResource = (resource: string) => {
  return pascalCase(singular(resource));
};
