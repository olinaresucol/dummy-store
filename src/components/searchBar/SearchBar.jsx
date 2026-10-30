import { Search, X } from "lucide-react"
import { useContext } from "react"
import { SearchContext } from "../../context/searchContext"

function SearchBar() {
    const { searchQuery, onSearchChange } = useContext(SearchContext)
    return (
        <div className="order-last flex w-full max-w-none basis-full flex-1 items-center gap-2 rounded-full bg-[#f6f5f2] px-4 py-[10px] md:order-none md:w-auto md:basis-auto md:max-w-[400px]">
            <Search size={18} className="shrink-0 text-[#78716c]" />
            <input
                type="text"
                className="w-full border-0 bg-transparent text-sm text-[#1c1917] outline-none placeholder:text-[#a8a29e]"
                placeholder="Search products..."
                value={searchQuery || ""}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            />
            {searchQuery && (
                <button
                    type="button"
                    className="flex shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-[#78716c]"
                    aria-label="Clear search"
                    onClick={() => onSearchChange && onSearchChange("")}
                >
                    <X size={16} />
                </button>
            )}
        </div>
    )
}

export default SearchBar