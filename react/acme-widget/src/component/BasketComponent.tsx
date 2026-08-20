import {useMemo} from 'react'
import {Product} from "../core/Product.ts";
import {Basket} from "../core/Basket.ts";
import type {IDeliveryRule} from "../core/rules/IDeliveryRule.ts";
import type {IOffer} from "../core/offer/IOffer.ts";
import {DeliveryRuleCharges} from "../core/rules/DeliveryRuleCharges.ts";
import {RedOfferHalfPrice} from "../core/offer/RedOfferHalfPrice.ts";

interface BasketComponentProps {
    products: Product[]
    quantities: Record<string, number>
    deliveryRule?: IDeliveryRule
    offers?: IOffer[]
}

const defaultDeliveryRule = new DeliveryRuleCharges([
    {threshold: 50.0, cost: 4.95},
    {threshold: 90.0, cost: 2.95},
]);

const defaultOffers: IOffer[] = [new RedOfferHalfPrice()];

export const BasketComponent = (props: BasketComponentProps) => {
    const {products, quantities, deliveryRule = defaultDeliveryRule, offers = defaultOffers} = props;

    // Let's avoid unnecessary calculation if the params don't change
    const basket = useMemo(() => {
        // Create a catalogue of products for the basket
        const catalogue = products.reduce<Record<string, Product>>((acc, product) => {
            acc[product.productCode] = product;
            return acc;
        }, {});

        const newBasket = new Basket(catalogue, deliveryRule, offers);

        for (const [productCode, quantity] of Object.entries(quantities)) {
            for (let i = 0; i < quantity; i++) {
                newBasket.add(productCode);
            }
        }

        return newBasket;
    }, [products, quantities, deliveryRule, offers]);

    const items = products
        .map((product) => ({product, quantity: quantities[product.productCode] ?? 0}))
        .filter(({quantity}) => quantity > 0);

    const subtotal = basket.getSubtotal();
    const discount = basket.getDiscount();
    const deliveryCost = basket.getDeliveryCost();
    const total = basket.total();

    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
                     className="h-4 w-4 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.687-3.45 2.309-5.567.126-.43-.16-.865-.61-.865H5.106M7.5 14.25L5.106 5.272M7.5 14.25L6.75 17.25m6-3h.008v.008h-.008v-.008z"/>
                </svg>
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Basket</span>
            </div>

            {items.length === 0 ? (
                <p className="py-4 text-sm text-gray-400">Your basket is empty</p>
            ) : (
                <div className="flex flex-col gap-2">
                    {items.map(({product, quantity}) => (
                        <div key={product.productCode} className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">
                                {product.productName} &times; {quantity}
                            </span>
                            <span className="tabular-nums text-gray-900">
                                ${(product.productPrice * quantity).toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            <div className="my-4 border-t border-gray-100"/>

            <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="tabular-nums text-gray-700">${subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                    <div className="flex items-center justify-between">
                        <span className="font-medium text-orange-600">Offer discount</span>
                        <span className="tabular-nums font-medium text-orange-600">-${discount.toFixed(2)}</span>
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-gray-500">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
                             className="h-4 w-4 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0-6.677h-3.75m-8.25 0V18.75"/>
                        </svg>
                        Delivery
                    </span>
                    <span className="tabular-nums text-gray-700">
                        {deliveryCost === 0 ? 'Free' : `$${deliveryCost.toFixed(2)}`}
                    </span>
                </div>
            </div>

            <div className="my-4 border-t border-gray-100"/>

            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Total</span>
                <span className="text-lg font-bold tabular-nums text-gray-900">${total.toFixed(2)}</span>
            </div>
        </div>
    );
}
