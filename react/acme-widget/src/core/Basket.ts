import type { Product } from './Product';
import type { IDeliveryRule } from './rules/IDeliveryRule';
import type { IOffer } from './offer/IOffer';

/**
 * The Basket Class is responsible handling the logic of handling product code, delivery charges, offers and total costs
 * , it's built to factor in Delivery Charges applied to the total cost of the items in the basket
 * and also apply any offers that may be available for the products in the basket
 */
export class Basket {
    private product_code: string[] = [];

    /**
     * The Product Catalogue array
     */
    private product_catalogues: Record<string, Product>;

    private deliveryRule: IDeliveryRule;

    private offers: IOffer[];

    public constructor(
        product_catalogue: Record<string, Product>,
        deliveryRuleCharges: IDeliveryRule,
        offers: IOffer[],
    ) {
        this.product_catalogues = product_catalogue;
        this.deliveryRule = deliveryRuleCharges;
        this.offers = offers;
    }

    public add(product_code: string): void {
        this.product_code.push(product_code);
    }

    public total(): number {
        let total_sum = 0.0;

        // Calculate the sum of the total using the value since key can be duplicated
        for (const code of this.product_code) {
            // Only calculate those in the product code array
            if (code in this.product_catalogues) {
                total_sum += this.product_catalogues[code].productPrice;
            }
        }

        let offerApplied = 0.0;

        for (const offer of this.offers) {
            offerApplied = offer.apply(this.product_code, this.product_catalogues);
        }

        total_sum -= offerApplied;

        const totalCharges = this.deliveryRule.calculate(total_sum);

        const finalCharge = total_sum + totalCharges;

        return Math.round(finalCharge * 100) / 100;
    }
}
