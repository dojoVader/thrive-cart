import type { Product } from './Product';
import type { IDeliveryRule } from './rules/IDeliveryRule';
import type { IOffer } from './offer/IOffer';


export class Basket {
    private product_code: string[] = [];

    /**
     * The Product Catalogue array
     */
    private readonly product_catalogues: Record<string, Product>;

    private deliveryRule: IDeliveryRule;

    private readonly offers: IOffer[];

    public constructor(
        product_catalogue: Record<string, Product>,
        deliveryRuleCharges: IDeliveryRule,
        offers?: IOffer[],
    ) {
        this.product_catalogues = product_catalogue;
        this.deliveryRule = deliveryRuleCharges;
        this.offers = offers || [];
    }

    public add(product_code: string): void {
        this.product_code.push(product_code);
    }

    public getSubtotal(): number {
        let total_sum = 0.0;

        // Calculate the sum of the total using the value since key can be duplicated
        for (const code of this.product_code) {
            // Only calculate those in the product code array
            if (code in this.product_catalogues) {
                total_sum += this.product_catalogues[code].productPrice;
            }
        }

        return total_sum;
    }

    public getDiscount(): number {
        let offerApplied = 0.0;

        for (const offer of this.offers) {
            offerApplied += offer.apply(this.product_code, this.product_catalogues);
        }

        return Math.round(offerApplied * 100) / 100;
    }

    public getDeliveryCost(): number {
        return this.deliveryRule.calculate(this.getSubtotal() - this.getDiscount());
    }

    public total(): number {
        const subTotalAfterDiscount = this.getSubtotal() - this.getDiscount();

        const finalCharge = subTotalAfterDiscount + this.deliveryRule.calculate(subTotalAfterDiscount);

        return Math.round(finalCharge * 100) / 100;
    }
}
