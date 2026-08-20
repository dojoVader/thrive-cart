import {useState} from 'react'
import './App.css'
import {ProductList} from "./component/ProductList.tsx";
import {BasketComponent} from "./component/BasketComponent.tsx";
import {Product} from "./core/Product.ts";

const catalogue: Product[] = [
    new Product("Red Widget", "R01", 32.95),
    new Product("Green Widget", "G01", 24.95),
    new Product("Blue Widget", "B01", 7.95),
];

function App() {
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    const increment = (productCode: string) =>
        setQuantities((prev) => ({...prev, [productCode]: (prev[productCode] ?? 0) + 1}));

    const decrement = (productCode: string) =>
        setQuantities((prev) => ({...prev, [productCode]: Math.max(0, (prev[productCode] ?? 0) - 1)}));

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-2xl px-6 py-10 sm:px-10">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
                            Acme Widget Co
                        </p>
                        <h1 className="mt-1 text-3xl font-bold text-gray-900">Widget Basket</h1>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-yellow-400">
                            <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z"/>
                        </svg>
                    </div>
                </div>

                <p className="mb-3 mt-8 text-xs font-semibold uppercase tracking-widest text-amber-700/80">
                    Products
                </p>

                <ProductList
                    products={catalogue}
                    quantities={quantities}
                    onIncrement={increment}
                    onDecrement={decrement}
                />

                <p className="mb-3 mt-8 text-xs font-semibold uppercase tracking-widest text-amber-700/80">
                    Basket
                </p>

                <BasketComponent products={catalogue} quantities={quantities}/>
            </div>
        </div>
    )
}

export default App
