<?php


use acme\Basket;
use acme\offer\RedOfferHalfPrice;
use acme\Product;
use acme\rules\DeliveryRuleCharges;
use PHPUnit\Framework\TestCase;



final class BasketTest extends TestCase
{
    public function testBasket(){
        $productCatalogue = [
            'R01' => new Product('Red Widget', 'R01', 32.95),
            'G01' => new Product('Green Widget', 'G01', 24.95),
            'B01' => new Product('Blue Widget', 'B01', 7.95),
        ];

        $deliveryCharges = [
            ['threshold' => 50.00, 'cost' => 4.95],
            ['threshold' => 90.00, 'cost' => 2.95],
        ];

        $redOffer = new RedOfferHalfPrice();
        $basket = new Basket($productCatalogue, new DeliveryRuleCharges($deliveryCharges), [$redOffer]);
        $this->assertNotEmpty($basket);
        $basket->add('B01');
        $basket->add('B01');
        $basket->add('R01');
        $basket->add('R01');
        $basket->add('R01');
        $this->assertEquals(98.27, $basket->total());

    }

}
