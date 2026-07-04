/**
 * Type
 */
export type PaginationAnt = {
    current: number;
    pageSize: number;
    total?: number;
}

/**
 * Request Type
 * Send form react to laravel controller
 */
export type PaginationRequest = {
    currentPage?: number;
    perPage?: number;
}

/**
 * Pagination Meta Type
 * Receive from laravel controller
 */
export type PaginationResponse = {
    current_page?: number;
    per_page?: number;
    total?: number;
}

