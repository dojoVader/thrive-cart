<?php

namespace acme\rules;

class DeliveryRuleCharges implements IDeliveryRule {

    /**
     * @var array<int,float> This holds the delivery charges for the products where the key is the
     * threshold cost e.g cost < threshold cost and value is the delivery cost tied to the threshold
     */
    private array $delivery_charges = [];

    public function __construct(array $delivery_charges)
    {
        $this->delivery_charges = $delivery_charges;
    }

    /**
     * This method creates a Threshold for the delivery charges and adds it to the delivery_charges array
     * if it does not already exist. This is to ensure that the delivery charges are not computed multiple times for the same threshold cost.
     * @param int $totalCost
     * @param float $deliveryCost
     * @return void
     */
    public function addDeliveryCharge(int $totalCost, float $deliveryCost): void {
        // Ensure that the current charge is not already computed
        if(!isset($this->delivery_charges[$totalCost]))
        {
            $this->delivery_charges[$totalCost] = $deliveryCost;
        }
    }

    /**
     * @param float $subTotalOfCatalogue
     * @return float
     */
    public function calculate(float $subTotalOfCatalogue): float
    {
        foreach($this->delivery_charges as $charges_threshold => $deliveryCost ){
            if($subTotalOfCatalogue < $charges_threshold){
                return $deliveryCost;
            }
        }
    }
}