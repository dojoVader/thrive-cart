<?php

namespace acme\offer;

use acme\Product;

interface IOffer{
    /**
     * @param array $items
     * @param array<Product> $product_catalogues
     * @return float
     */
    public function apply(array $items, array $product_catalogues): float;
}
class RedOfferHalfPrice implements IOffer
{
    private const DISCOUNT_CODE = 'R01';

    public function apply(array $items,array $product_catalogues): float
    {
        // Get only Red Widgets from array of products
        $red_products = array_filter($items, function($item){
            return $item === self::DISCOUNT_CODE;
        });

        $price_of_red_widget = array_filter(array_values($product_catalogues), function(Product $item){
            return $item->productCode === self::DISCOUNT_CODE;
        });


        $countOfWidgets = array_count_values($red_products);
        $redWidgetCount = $countOfWidgets[self::DISCOUNT_CODE] ?? 0;

        // We only need at least 2 Red Widgets to get discount of the second pair

        if($redWidgetCount < 2){
            return 0.0;
        }

        // Get the number of pairs so we can compute the discount applied
        $pairs = intdiv((int)$redWidgetCount, 2);
        // We are guaranteed to have 1 red widget
        $redWidgetPrice = $price_of_red_widget[0]->productPrice;
        // Return the price based on the pairs
        return round($pairs * ($redWidgetPrice / 2),2);
    }
}