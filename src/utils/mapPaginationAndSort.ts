import { GetListParams } from 'ra-core';

const MAX_TAKE = 250;
export const mapPaginationAndSort = (params: GetListParams) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
  
    return {
      orderBy: {
        [field]: order.toLowerCase(),
      },
      skip: (page - 1) * perPage,
      // TODO: somehow get MAX_TAKE from config?
      take: perPage > MAX_TAKE ? MAX_TAKE : perPage,
    };
  };