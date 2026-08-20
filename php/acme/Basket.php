<?php

namespace acme;

use acme\offer\IOffer;
use acme\rules\IDeliveryRule;

/**
 * The Basket Class is responsible handling the logic of handling product code, delivery charges, offers and total costs
 * , it's built to factor in Delivery Charges applied to the total cost of the items in the basket
 * and also apply any offers that may be available for the products in the basket
 */
class Basket
{
    private array $product_code;
    /**
     * @var array<Product> The Product Catalogue array
     */
    private array $product_catalogues;

    private IDeliveryRule $deliveryRule;

    /**
     * @var array<IOffer> offers
     */
    private array $offers;

    public function __construct(
        $product_catalogue,
        IDeliveryRule $deliveryRuleCharges,
        array $offers

    )
    {
        $this->product_catalogues = $product_catalogue;
        $this->deliveryRule = $deliveryRuleCharges;
        $this->offers = $offers;
    }

    public function add(string $product_code): void
    {
        $this->product_code[] = $product_code;
    }

    public function total(): float
    {
        $total_sum = 0.0;

        // Calculate the sum of the total using the value since key can be duplicated
        foreach ($this->product_code as $code) {

            // Only calculate those in the product code array
            if (isset($this->product_catalogues[$code])) {
                $total_sum += $this->product_catalogues[$code]->productPrice;
            }
        }

        $offerApplied = 0.0;

        foreach ($this->offers as $offer) {
            $offerApplied = $offer->apply($this->product_code, $this->product_catalogues);
        }

        $total_sum -= $offerApplied;

        $totalCharges = $this->deliveryRule->calculate($total_sum);

        $finalCharge = $total_sum + $totalCharges;

        return round($finalCharge, 2);


    }

}

