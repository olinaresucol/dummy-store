import { useState } from "react"
import { Header } from "../../components/header/Header"
import { Footer } from "../../components/footer/Footer"
import { Section } from "../../components/section/Section"
import { ProductGrid } from "../../components/productGrid/ProductGrid"
import { data } from "../../utils/data.js"

// componente padre
const Home = () => {
    const { products } = data
    const [amount, setAmount] = useState(0)
    const [searchQuery, setSearchQuery] = useState("")

    const filteredProducts = products.filter(
        (producto) => producto.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <>
            <Header
                amount={amount}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            <main>
                <Section>
                    <ProductGrid productos={filteredProducts} amount={amount} onAmountChange={setAmount} />
                </Section>
            </main>

            <Footer />
        </>
    )
}

export default Home