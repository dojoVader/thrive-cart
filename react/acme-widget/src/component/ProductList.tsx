import {Product} from "../core/Product.ts";


interface ProductListProps {
    products?: Product[]
}

export const ProductList = (props: ProductListProps) => {
    const {products} = props;
    return (
        <div className="product-list">
            {products?.map((product) => (
                <div key={product.productCode} className="product-item">
                    <h3>{product.productName}</h3>
                    <p>Code: {product.productCode}</p>
                    <p>Price: ${product.productPrice.toFixed(2)}</p>
                </div>
            ))}
        </div>
    );
}