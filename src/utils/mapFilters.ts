export const mapFilters = (params: { filter: any }) => {
  const { q, ...filters } = params.filter || {};
  // TODO: add the ability for the user to add custom mapping
  const search = q
    ? {
        email: {
          contains: q,
        },
      }
    : undefined;

  return {
    where: {
      ...search,
      ...filters,
    },
  };
};
