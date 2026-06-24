export const CATALOG_PAGE_SIZE = 12;

export function getSkip(page: number, pageSize = CATALOG_PAGE_SIZE): number {
  return (page - 1) * pageSize;
}

export function getPageCount(total: number, pageSize = CATALOG_PAGE_SIZE): number {
  return Math.max(1, Math.ceil(total / pageSize));
}