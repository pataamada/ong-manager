type Paginate<T> = {
    data: T[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
  
export function paginateItems<T>(
    items: T[],
    currentPage: number,
    itemsPerPage: number
  ): Paginate<T> {
    // Validações básicas
    if (currentPage < 1) {
      throw new Error("A página atual deve ser maior ou igual a 1.");
    }
  
    if (itemsPerPage < 1) {
      throw new Error("O número de itens por página deve ser maior ou igual a 1.");
    }
  
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    // Calcula o índice de início e fim
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    // Fatia o array de acordo com os índices calculados
    const data = items.slice(startIndex, endIndex);
  
    return {
      data,
      currentPage,
      totalPages,
      totalItems,
    };
  }
  