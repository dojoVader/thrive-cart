import type { IDeliveryRule } from './IDeliveryRule';

interface DeliveryCharge {
    threshold: number;
    cost: number;
}

export class DeliveryRuleCharges implements IDeliveryRule {
    private readonly delivery_charges: DeliveryCharge[];

    public constructor(delivery_charges: DeliveryCharge[]) {
        this.delivery_charges = delivery_charges;
    }

    public addDeliveryCharge(totalCost: number, deliveryCost: number): void {
        // Ensure that the current charge is not already computed
        if (!this.delivery_charges.some((charge) => charge.threshold === totalCost)) {
            this.delivery_charges.push({ threshold: totalCost, cost: deliveryCost });
        }
    }

    public calculate(subTotalOfCatalogue: number): number {
        for (const charges of this.delivery_charges) {
            if (subTotalOfCatalogue < charges.threshold) {
                return charges.cost;
            }
        }
        return 0.0;
    }
}
