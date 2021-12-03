import { QueryMethod } from '../types';
import { getHandler } from './getHandler';

describe('getHandler', () => {
  it('should not throw for valid resource and methods', async () => {
    for (const method of Object.values(QueryMethod)) {
      await expect(getHandler({ resource: 'posts', method, invoke: global.mockedInvoke })).resolves.not.toThrow();
    }
  });

  it('should throw error for non existing resource', async () => {
    await expect(
      getHandler({ resource: 'non-existing', method: QueryMethod.Get, invoke: global.mockedInvoke }),
    ).rejects.toThrow();
  });

  it('should throw error for non plural resource', async () => {
    await expect(
      getHandler({ resource: 'post', method: QueryMethod.Get, invoke: global.mockedInvoke }),
    ).rejects.toThrowError(`Resource 'post' MUST be plural!`);
  });
});
