import { useState } from "react"
import { Header } from "../../components/header/Header"
import { Section } from "../../components/section/Section"
import { ProductGrid } from "../../components/productGrid/ProductGrid"
import { data } from "../../utils/data.js"

// componente padre
const Home = () => {
    const { products } = data
    const [searchQuery, setSearchQuery] = useState("")

    const filteredProducts = products.filter(
        (producto) => producto.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // .jsx => una fn js que retorna html
    return (
        <main>
            {/* componentes hijo */}
            <Header
                amount={7}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            <Section>
                <ProductGrid productos={filteredProducts} />
            </Section>
        </main>
    )
}

export default Home