import { mapFilters } from '~/utils/mapFilters';

describe('mapFilters', () => {
  it('should map filters correctly', () => {
    const testSearchEntities = (q: string) => ({
      user: {
        OR: [
          {
            email: {
              contains: q,
            },
          },
          {
            name: {
              contains: q,
            },
          },
        ],
      },
      post: {
        OR: [
          {
            title: {
              contains: q,
            },
          },
          {
            content: {
              contains: q,
            },
          },
        ],
      },
    });

    const response = mapFilters(
      {
        filter: {
          q: 'test',
        },
      },
      'users',
      testSearchEntities,
    );
    
    expect(response).toEqual({
      where: {
        OR: [
          {
            email: {
              contains: 'test',
            },
          },
          {
            name: {
              contains: 'test',
            },
          },
        ],
      },
    });
  });
});
