export interface PaginationQuery {
    page?: any;
    limit?: any;
}

interface PaginateOptions {
    where?: any;
    orderBy?: any;
    include?: any;
    select?: any;
}

export async function paginate(
    model: any,
    query: PaginationQuery,
    options: PaginateOptions = {},
) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.min(Number(query.limit) || 10, 50);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
        model.findMany({
            ...options,
            skip,
            take: limit,
        }),
        model.count({
            where: options.where,
        }),
    ]);

    return {
        items,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
}
