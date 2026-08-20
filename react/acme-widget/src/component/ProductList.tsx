import {Product} from "../core/Product.ts";

interface ProductListProps {
    products?: Product[]
    quantities: Record<string, number>
    onIncrement: (productCode: string) => void
    onDecrement: (productCode: string) => void
}

const DOT_COLORS: Record<string, string> = {
    R01: "#C1440E",
    G01: "#3F6B4E",
    B01: "#2E5C8A",
};

export const ProductList = (props: ProductListProps) => {
    const {products, quantities, onIncrement, onDecrement} = props;
    return (
        <div className="flex flex-col gap-3">
            {products?.map((product) => {
                const quantity = quantities[product.productCode] ?? 0;

                return (
                    <div
                        key={product.productCode}
                        className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm"
                    >
                        <div className="flex items-center gap-3">
                            <span
                                className="h-2.5 w-2.5 shrink-0 rounded-full"
                                style={{backgroundColor: DOT_COLORS[product.productCode] ?? "#9ca3af"}}
                            />
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">{product.productName}</h3>
                                <p className="text-xs text-gray-400">{product.productCode}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="tabular-nums text-sm text-gray-700">
                                ${product.productPrice.toFixed(2)}
                            </span>

                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => onDecrement(product.productCode)}
                                    disabled={quantity === 0}
                                    className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-gray-400 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    &minus;
                                </button>
                                <span className="w-4 text-center text-sm tabular-nums text-gray-900">
                                    {quantity}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => onIncrement(product.productCode)}
                                    className="flex h-7 w-7 items-center justify-center rounded-md bg-black text-white transition hover:bg-gray-800"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
