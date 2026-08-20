import type { Product } from '../Product';

/**
 * The IOffer interface defines the structure for implementing offers in the shopping basket system. we can create new
 * offers based on this interface
 */
export interface IOffer {
    /**
     * Applies the offer to the given items and product catalogues, returning the total discount amount.
     * @param items Items in the basket are represented by their product codes.
     * @param product_catalogues The Product catalogues containing product details
     */
    apply(items: string[], product_catalogues: Record<string, Product>): number;
}
