import type { Product } from '../Product';
import type { IOffer } from './IOffer';

export class RedOfferHalfPrice implements IOffer {
    private static readonly DISCOUNT_CODE = 'R01';

    public apply(items: string[], product_catalogues: Record<string, Product>): number {

        const red_products = items.filter((item) => item === RedOfferHalfPrice.DISCOUNT_CODE);

        const price_of_red_widget = Object.values(product_catalogues).filter(
            (item) => item.productCode === RedOfferHalfPrice.DISCOUNT_CODE,
        );

        const redWidgetCount = red_products.length;

        if (redWidgetCount < 2) {
            return 0.0;
        }

        // We don't need to worry about the remainder, discount is only applied to a pair
        const pairs = Math.floor(redWidgetCount / 2);

        const redWidgetPrice = price_of_red_widget[0]?.productPrice;

        return Math.round(pairs * (redWidgetPrice / 2) * 100) / 100;
    }
}
