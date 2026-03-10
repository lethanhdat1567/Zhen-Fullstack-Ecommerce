import { SearchSuggestResult } from "@/services/searchService";

export const checkShowDropdown = (searchData: SearchSuggestResult) => {
    const hasData =
        searchData.products.length > 0 ||
        searchData.services.length > 0 ||
        searchData.posts.length > 0;

    return hasData;
};
