<?php

namespace acme;

final readonly class Product
{
    public function __construct(
        public string $productName,
        public string $productCode,
        public float  $productPrice
    ){

    }
}