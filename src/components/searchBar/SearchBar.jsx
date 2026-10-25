import { Search, X } from "lucide-react"
import "./SearchBar.css"
import { useContext } from "react"
import { SearchContext } from "../../context/searchContext"

function SearchBar() {
    const { searchQuery, onSearchChange } = useContext(SearchContext)
    return (
        <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input
                type="text"
                placeholder="Search products..."
                value={searchQuery || ""}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            />
            {searchQuery && (
                <button
                    type="button"
                    className="search-clear-btn"
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