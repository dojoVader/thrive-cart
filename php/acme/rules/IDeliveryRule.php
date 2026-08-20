<?php

namespace acme\rules;

/**
 * This interface is responsible for allowing a derived class handle the total calculation of the
 * summed items in the basket and return the total cost of the items in the basket
 */
interface IDeliveryRule
{
    public function calculate(float $subTotalOfCatalogue): float;
}