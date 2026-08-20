<?php

namespace acme;



use acme\offer\IOffer;
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

    /**
     * @var array<IOffer> offers
     */
    private array $offers;
    public function __construct(
        $product_catalogue,
        IDeliveryRule $deliveryRuleCharges,
        array $offers

    ){
        $this->product_catalogues = $product_catalogue;
        $this->deliveryRule = $deliveryRuleCharges;
        $this->offers = $offers;
    }

    public function add(string $product_code): void {
        $this->product_code[] = $product_code;
    }

    public function total(): float {
        $total_sum = 0.0;
        // Calculate the sum of the total using the value since key can be duplicated
        foreach($this->product_code as $code){
            // Only calculate those in the product code array
            if(isset($this->product_catalogues[$code])){
                $total_sum+=$this->product_catalogues[$code]->productPrice;
            }
        }

        var_dump("Total Sum: ".$total_sum);

        // Apply the series of offer applied
        $offerApplied = 0.0;
        foreach($this->offers as $offer){
            $offerApplied = $offer->apply($this->product_code,$this->product_catalogues);
        }

        var_dump("Offer Applied: ".$offerApplied);

        // Remove the discount from total sum
        $total_sum -= $offerApplied;

        var_dump("Total Sum: ".$total_sum);

        //Calculate the total with delivery cost now
        $totalCharges =  $this->deliveryRule->calculate($total_sum);

        var_dump("Total Shipping Cost: ".$totalCharges);
        // Apply discount
        $finalCharge= $total_sum + $totalCharges;

        var_dump("Total: ".$finalCharge);
        return round($finalCharge, 2);




    }

}

