<?php


use acme\Basket;
use acme\Product;
use acme\rules\DeliveryRuleCharges;
use PHPUnit\Framework\TestCase;



final class BasketTest extends TestCase
{
    public function testBasket(){
        $productCatalogue = [
            new Product('Red Widget', 'RO1', 32.95),
            new Product('Red Widget', 'R01', 32.95),
        ];

        $deliveryCharges = [
            ['threshold' => 50.00, 'cost' => 4.95],
            ['threshold' => 90.00, 'cost' => 2.95],
        ];
        $basket = new Basket($productCatalogue, new DeliveryRuleCharges($deliveryCharges), null);
        $this->assertNotEmpty($basket);
        $this->assertEquals(54.37, $basket->total());

    }

}
