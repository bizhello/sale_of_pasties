const getPageCount = (totalPages: number, limit: number) => {
    return Math.ceil(totalPages / limit);
};

export default getPageCount;
