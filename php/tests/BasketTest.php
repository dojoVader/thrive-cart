<?php


use acme\Basket;
use acme\offer\RedOfferHalfPrice;
use acme\Product;
use acme\rules\DeliveryRuleCharges;
use PHPUnit\Framework\TestCase;



final class BasketTest extends TestCase
{
    private array $productCatalogue;
    private array $deliveryCharges;
    private RedOfferHalfPrice $redOffer;

    protected function setUp(): void
    {
        $this->productCatalogue = [
            'R01' => new Product('Red Widget', 'R01', 32.95),
            'G01' => new Product('Green Widget', 'G01', 24.95),
            'B01' => new Product('Blue Widget', 'B01', 7.95),
        ];

        $this->deliveryCharges = [
            ['threshold' => 50.00, 'cost' => 4.95],
            ['threshold' => 90.00, 'cost' => 2.95],
        ];

        $this->redOffer = new RedOfferHalfPrice();

    }
    public function testBlueGreenBasket(){


        $basket = new Basket($this->productCatalogue, new DeliveryRuleCharges($this->deliveryCharges), [$this->redOffer]);
        $this->assertNotEmpty($basket);
        $basket->add('B01');
        $basket->add('G01');
        $this->assertEquals(37.85, $basket->total());

    }

    public function testRedBaskets(){


        $basket = new Basket($this->productCatalogue, new DeliveryRuleCharges($this->deliveryCharges), [$this->redOffer]);
        $this->assertNotEmpty($basket);
        $basket->add('R01');
        $basket->add('R01');
        $this->assertEquals(54.37, $basket->total());

    }

    public function testRedGreenBasket(){


        $basket = new Basket($this->productCatalogue, new DeliveryRuleCharges($this->deliveryCharges), [$this->redOffer]);
        $this->assertNotEmpty($basket);
        $basket->add('R01');
        $basket->add('G01');
        $this->assertEquals(60.85, $basket->total());

    }

    public function testThreeRedTwoBlueBasket(){


        $basket = new Basket($this->productCatalogue, new DeliveryRuleCharges($this->deliveryCharges), [$this->redOffer]);
        $this->assertNotEmpty($basket);
        $basket->add('R01');
        $basket->add('R01');
        $basket->add('R01');
        $basket->add('B01');
        $basket->add('B01');
        $this->assertEquals(98.27, $basket->total());

    }

}
