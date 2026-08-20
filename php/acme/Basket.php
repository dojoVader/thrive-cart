<?php

namespace acme;

use acme\rules\DeliveryRuleCharges;

/**
 * The Basket Class is responsible handling the logic of handling product code, delivery charges, offers and total costs
 * , it's built to factor in Delivery Charges applied to the total cost of the items in the basket
 * and also apply any offers that may be available for the products in the basket
 */
class Basket
{
    private array $product_code;
    private array $product_catalogues;
    public function __construct(
        $product_catalogue,
        DeliveryRuleCharges $deliveryRuleCharges,
        $offer

    ){
        $this->product_catalogues = $product_catalogue;
    }

    public function add(string $product_code): void {
        $this->product_code[] = $product_code;
    }

    public function total(): float {

    }

}

