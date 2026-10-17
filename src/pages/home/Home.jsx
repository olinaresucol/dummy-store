import { Header } from "../../components/header/Header"
import { ProductGrid } from "../../components/productGrid/ProductGrid"
import { data } from "../../utils/data.js"

// componente padre
const Home = () => {
    const { products } = data

    // .jsx => una fn js que retorna html
    return (
        <main>
            {/* componentes hijo */}
            <Header amount={7} />

            <ProductGrid productos={products} />
        </main>
    )
}

export default Home