import { SearchSuggestResult } from "@/services/searchService";
import SearchDropdownItem from "@/layouts/public/PublicHeader/components/SearchSection/components/SearchDropdownSection/SearchDropdownItem";

type Props = {
    data: SearchSuggestResult;
};

function SearchDropdownSection({ data }: Props) {
    return (
        <div className="space-y-4">
            {/* SERVICES */}
            {data.services.length > 0 && (
                <div>
                    <h3 className="text-sm font-medium">Dịch vụ</h3>

                    <div className="mt-2 space-y-2">
                        {data.services.map((item) => (
                            <SearchDropdownItem item={item} key={item.id} />
                        ))}
                    </div>
                </div>
            )}

            {/* PRODUCTS */}
            {data.products.length > 0 && (
                <div>
                    <h3 className="text-sm font-medium">Sản phẩm</h3>

                    <div className="mt-2 space-y-2">
                        {data.products.map((item) => (
                            <SearchDropdownItem item={item} key={item.id} />
                        ))}
                    </div>
                </div>
            )}

            {/* POSTS */}
            {data.posts.length > 0 && (
                <div>
                    <h3 className="text-sm font-medium">Bài viết</h3>

                    <div className="mt-2 space-y-2">
                        {data.posts.map((item) => (
                            <SearchDropdownItem item={item} key={item.id} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchDropdownSection;
