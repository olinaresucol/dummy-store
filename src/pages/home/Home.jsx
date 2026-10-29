import { useContext, useEffect, useState } from "react";
import { Footer } from "../../components/footer/Footer";
import { Section } from "../../components/section/Section";
import { ProductGrid } from "../../components/productGrid/ProductGrid";
import { SearchContext } from "../../context/searchContext";

export const Home = () => {
    const [products, setProducts] = useState([]);
    const [amount, setAmount] = useState(0);
    const { searchQuery } = useContext(SearchContext);

    const getData = () => {
        let query = "";
        searchQuery !== ""
            ? (query = "https://dummyjson.com/products/search?q=" + searchQuery)
            : (query = "https://dummyjson.com/products");
        fetch(query)
            .then((res) => res.json())
            .then((json) => {
                document.title = `${json.products.length} productos | Dummy Shop`;
                setProducts(json.products);
            });
    };

    useEffect(() => {
        getData();
    }, [searchQuery]);

    // Para pruebas de renderizado condicional
    // const [isLoading, setLoading] = useState(true)
    // setTimeout(() => {
    //     setLoading(false)
    // }, 3000)

    const filteredProducts = products.filter((producto) =>
        producto.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    {
        /* Renderizado condicional mediante: if temprano (parte 1 de 2) */
    }
    // if (isLoading) {
    //     return <p style={{ textAlign: "center" }}>Loading ...</p>
    // }

    return (
        <>
            <main>
                <Section>
                    {/* {isLoading && <Button variant="primary" size="sm">Botón</Button>} */}

                    {/* Renderizado condicional mediante: if temprano (parte 2 de 2) */}
                    {/* <ProductGrid productos={products} amount={amount} onAmountChange={setAmount} /> */}

                    {/* Renderizado condicional mediante: Ternario */}
                    {/* {isLoading ? <p style={{textAlign:"center"}}>Loading ...</p> : <ProductGrid productos={filteredProducts} amount={amount} onAmountChange={setAmount} />} */}

                    {/* Renderizado condicional mediante: && */}
                    {/* {isLoading && <p style={{ textAlign: "center" }}>Loading ...</p>} */}

                    <ProductGrid
                        productos={products}
                        amount={amount}
                        onAmountChange={setAmount}
                    />
                </Section>
            </main>
        </>
    );
};
