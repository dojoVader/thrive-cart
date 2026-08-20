import './App.css'
import {ProductList} from "./component/ProductList.tsx";
import {Product} from "./core/Product.ts";

function App() {

  const catalogues: Product[] = [
    new Product("Red Widget", "R01", 32.95),
    new Product("Green Widget", "G01", 24.95),
    new Product("Blue Widget", "B01", 7.95)
  ];

  return (
    <>
      <section>Acme Widget</section>
      <ProductList products={catalogues} />

    </>
  )
}

export default App
