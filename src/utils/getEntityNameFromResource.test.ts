import { getEntityNameFromResource } from './getEntityNameFromResource';

describe('getEntityNameFromResource', () => {
  it('should always return resource name in singular - PascalCase fromat', () => {
    const testResources = [
      { resource: 'regexes', entityName: 'Regex' },
      { resource: 'posts', entityName: 'Post' },
      { resource: 'comment-tags', entityName: 'CommentTag' },
      { resource: 'queries', entityName: 'Query' },
    ];

    testResources.forEach(e => {
      expect(getEntityNameFromResource(e.resource)).toEqual(e.entityName);
    });
  });
});
