import { splitArray } from '@/helpers/array';

export async function generateItems<T>(items: T[], itemsPerPage = 22, restItemsPerPage = 32) {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const splitted = splitArray(items, itemsPerPage, restItemsPerPage);

  // Divide os dados em páginas
  const paginatedData = splitted.map(({ items }, index) => ({
    first: index === 0,
    current: index + 1,
    items,
    break: index + 1 < totalPages,
  }));

  return { total_pages: totalPages, pages: paginatedData };
}
