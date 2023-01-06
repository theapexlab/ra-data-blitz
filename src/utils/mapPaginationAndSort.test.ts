import { mapPaginationAndSort } from '~/utils/mapPaginationAndSort';

describe('mapPaginationAndSort', () => {
  it('should map pagination and sort correctly', () => {
    const mapped = mapPaginationAndSort({
      filter: {},
      pagination: {
        page: 1,
        perPage: 10,
      },
      sort: {
        field: 'fieldName',
        order: 'ASC',
      },
    });

    expect(mapped).toEqual({
      orderBy: {
        fieldName: 'asc',
      },
      skip: 0,
      take: 10,
    });
  });
});
