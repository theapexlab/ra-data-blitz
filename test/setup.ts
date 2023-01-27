export {};

jest.mock('app/posts/queries/getPost', () => () => ({}), { virtual: true });
jest.mock('app/posts/queries/getPosts', () => () => ({ posts: [], count: 0 }), { virtual: true });
jest.mock('app/posts/mutations/createPost', () => () => ({}), { virtual: true });
jest.mock('app/posts/mutations/updatePost', () => () => ({}), { virtual: true });
jest.mock('app/posts/mutations/deletePost', () => () => ({}), { virtual: true });
jest.mock('app/reactAdmin/posts/queries/getPost', () => () => ({}), { virtual: true });
jest.mock('app/react-admin/posts/queries/getPost', () => () => ({}), { virtual: true });
jest.mock('src/react-admin/posts/queries/getPost', () => () => ({}), { virtual: true });
jest.mock('src/reactAdmin/posts/queries/getPost', () => () => ({}), { virtual: true });

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.mockedInvoke = jest.fn(async (handler, params) => {
  return handler(params);
});
