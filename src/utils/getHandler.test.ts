import { QueryMethod } from '~/types';
import { getHandler } from '~/utils/getHandler';

describe('getHandler', () => {
  it('should not throw for valid resource and methods', async () => {
    for (const method of Object.values(QueryMethod)) {
      await expect(
        getHandler({ handlerRoot: 'app', resource: 'posts', method, invoke: global.mockedInvoke }),
      ).resolves.not.toThrow();
    }
  });

  it('should not throw for handle root of the resource is specified', async () => {
    await expect(
      getHandler({
        handlerRoot: 'app/reactAdmin',
        resource: 'posts',
        method: QueryMethod.Get,
        invoke: global.mockedInvoke,
      }),
    ).resolves.not.toThrow();
  });

  it('should not throw for handle root of the resource is specified with kebab-case', async () => {
    await expect(
      getHandler({
        handlerRoot: 'app/react-admin',
        resource: 'posts',
        method: QueryMethod.Get,
        invoke: global.mockedInvoke,
        kebabCase: true,
      }),
    ).resolves.not.toThrow();
  });

  it('should not throw for handle root of the resource is specified outside of app folder with kebab-case on', async () => {
    await expect(
      getHandler({
        handlerRoot: 'src/react-admin',
        resource: 'posts',
        method: QueryMethod.Get,
        invoke: global.mockedInvoke,
        kebabCase: true,
      }),
    ).resolves.not.toThrow();
  });

  it('should not throw for handle root of the resource is specified outside of app folder', async () => {
    await expect(
      getHandler({
        handlerRoot: 'src/reactAdmin',
        resource: 'posts',
        method: QueryMethod.Get,
        invoke: global.mockedInvoke,
      }),
    ).resolves.not.toThrow();
  });

  it('should throw error for non existing resource', async () => {
    await expect(
      getHandler({ handlerRoot: '', resource: 'non-existing', method: QueryMethod.Get, invoke: global.mockedInvoke }),
    ).rejects.toThrow();
  });

  it('should throw error for non plural resource', async () => {
    await expect(
      getHandler({ handlerRoot: '', resource: 'post', method: QueryMethod.Get, invoke: global.mockedInvoke }),
    ).rejects.toThrowError(`Resource 'post' MUST be plural!`);
  });
});
