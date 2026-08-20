<?php

namespace acme;



use acme\Product;
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
    public function __construct(
        $product_catalogue,
        IDeliveryRule $deliveryRuleCharges,
        $offer

    ){
        $this->product_catalogues = $product_catalogue;
        $this->deliveryRule = $deliveryRuleCharges;
    }

    public function add(string $product_code): void {
        $this->product_code[] = $product_code;
    }

    public function total(): float {



        $total_sum = 0;
        // Calculate the sum of the total using the value since key can be duplicated
        foreach($this->product_catalogues as $index => $catalogue){
            $total_sum+=$catalogue->productPrice;
        }
        //Calculate the discount applied
        $discountApplied =  $this->deliveryRule->calculate($total_sum);
        var_dump($discountApplied);
        return $total_sum + $discountApplied;

    }

}

