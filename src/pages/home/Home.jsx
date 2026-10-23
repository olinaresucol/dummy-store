import { useState } from "react"
import { Header } from "../../components/header/Header"
import { Footer } from "../../components/footer/Footer"
import { Section } from "../../components/section/Section"
import { ProductGrid } from "../../components/productGrid/ProductGrid"
import { data } from "../../utils/data.js"

const Home = () => {
    const { products } = data
    const [amount, setAmount] = useState(0)
    const [searchQuery, setSearchQuery] = useState("")

    // Para pruebas de renderizado condicional
    const [isLoading, setLoading] = useState(true)
    setTimeout(()=>{
        setLoading(false)
    },3000)

    const filteredProducts = products.filter(
        (producto) => producto.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    {/* Renderizado condicional mediante: if temprano (parte 1 de 2) */}
    if(isLoading) {
        return <p style={{textAlign:"center"}}>Loading ...</p>
    }

    return (
        <>
            <Header
                amount={amount}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            <main>
                <Section>
                    {/* Renderizado condicional mediante: if temprano (parte 2 de 2) */}
                    <ProductGrid productos={filteredProducts} amount={amount} onAmountChange={setAmount} />

                    {/* Renderizado condicional mediante: Ternario */}
                    {/* {isLoading ? <p style={{textAlign:"center"}}>Loading ...</p> : <ProductGrid productos={filteredProducts} amount={amount} onAmountChange={setAmount} />} */}

                    {/* Renderizado condicional mediante: && */}
                    {/* {isLoading && <p style={{textAlign:"center"}}>Loading ...</p>} */}
                    {/* <ProductGrid productos={filteredProducts} amount={amount} onAmountChange={setAmount} /> */}
                </Section>
            </main>

            <Footer />
        </>
    )
}

export default Home