import { mapFilters } from './mapFilters';

describe('mapFilters', () => {
  it('should map filters correctly', () => {
    const response = mapFilters({
      filter: {
        q: 'test',
      },
    });

    expect(response).toEqual({
      where: {
        email: {
          contains: 'test',
        },
      },
    });
  });
});
