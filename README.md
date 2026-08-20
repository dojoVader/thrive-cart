# thrive-cart

ThriveCart is a Data Modelling exercise to ensure that both implementation in TypeScript and PHP maintain a consistent behavior, The goal is to ensure that the data models are well-defined and can be used interchangeably between the two languages without any loss of functionality or data integrity.

## PHP Implementation

Requirement: PHP 8.3 and above and Composer ( local composer.phar has been bundled with the project, so you can use it without installing composer globally )

To run the php, there is a test that has already been implemented, but you can run the following command to run the tests:

```bash
cd php/ # Enter the PHP Folder
composer install # Requires Composer and PHPUnit to be installed globally or
composer.phar install # Bundled Composer.phar can be used without installing composer globally
vendor/bin/phpunit tests #PHPUnit Test cases
```


## React Implementation

The React Implementation is a simple front-end application that allows users to interact with the data models defined in TypeScript. It provides a user interface unlike the php version. Tailwind was used to avoid writing custom CSS and to make the UI more responsive and visually appealing. The application is built using React and TypeScript, ensuring type safety and better developer experience.

```bash
cd react/acme-widget # Enter the React Folder
npm install # Requires Node.js and npm to be installed globally
npm run vite # Runs the React application in development mode
npm run test # Runs a simple Jest test to ensure that the application is working as expected just like the PHPUnit version
```


## Assumptions Made

For this application, the following assumptions were made:

1. IOffer Interface: The Basket class takes the array of IOffers for the sake of allowing developers extend the functionality of the Basket class to accept different types of offers in the future, this also allows for better flexibility and scalability of the application.

2. Basket::add(productCode): Though not specified in the documentation, the add method was used to only process the productCode sent to it, this ensures that only products in the catalogs that matches the productCode are added to the basket, this also ensures that the application is more robust and less prone to errors.