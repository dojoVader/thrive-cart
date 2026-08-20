import {Basket} from '../src/core/Basket';
import {Product} from '../src/core/Product';
import {DeliveryRuleCharges} from '../src/core/rules/DeliveryRuleCharges';
import {RedOfferHalfPrice} from '../src/core/offer/RedOfferHalfPrice';

describe('Basket', () => {
    const productCatalogue: Record<string, Product> = {
        R01: new Product('Red Widget', 'R01', 32.95),
        G01: new Product('Green Widget', 'G01', 24.95),
        B01: new Product('Blue Widget', 'B01', 7.95),
    };

    const deliveryCharges = [
        {threshold: 50.0, cost: 4.95},
        {threshold: 90.0, cost: 2.95},
    ];

    const createBasket = () =>
        new Basket(productCatalogue, new DeliveryRuleCharges(deliveryCharges), [new RedOfferHalfPrice()]);

    test.each([
        [['B01', 'G01'], 37.85],
        [['R01', 'R01'], 54.37],
        [['R01', 'G01'], 60.85],
        [['B01', 'B01', 'R01', 'R01', 'R01'], 98.27],
    ])('total() for %p is %s', (productCodes, expectedTotal) => {
        const basket = createBasket();
        productCodes.forEach((code) => basket.add(code));

        expect(basket.total()).toBe(expectedTotal);
    });
});
