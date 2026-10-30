import { useCallback, useState } from "react";
import { SearchContext } from "../../context/searchContext";

export const SearchContextProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const onSearchChange = useCallback((e) => {
        setSearchQuery(e);
    }, []);

    // return <SearchContext.Provider value={{searchQuery}}>SearchContextProvider</SearchContext.Provider>
    return (
        <SearchContext
            value={{
                searchQuery,
                onSearchChange,
            }}
        >
            {children}
        </SearchContext>
    );
};
