var should = require('should');
var postalCodes = require('../postal-codes.js')

describe('Postal codes validation: ', function () {

    var countriesData = require('../generated/postal-codes-alpha2');
    Object.keys(countriesData).map(function (alpha2Code) {

        var formatFileName = countriesData[alpha2Code].postalCodeFormat;
        if (!formatFileName) {
            console.log('Cannot find format file for ' + alpha2Code);
            return;
        }

        var format = require('../formats/' + formatFileName);
        format.TestData.Valid.map(function (validPostalCode) {
            it(alpha2Code + ' / ' + validPostalCode + ' is valid', function () {
                postalCodes.validate(alpha2Code, validPostalCode).should.eql(true);
            })
        });

        format.TestData.Invalid.map(function (invalidPostalCode) {
            it(alpha2Code + ' / ' + invalidPostalCode + ' is NOT valid', function () {
                postalCodes.validate(alpha2Code, invalidPostalCode).should.eql(false);
            })
        });
    });
});

describe('Postal codes border cases: ', function() {
    var testCases = [
        {
            countryCode: null,
            postalCode: 1234,
            description: 'should return error when country code is null',
            expectedResult: undefined,
            expectedError: 'Invalid country code.',
        },
        {
            countryCode: undefined,
            postalCode: 1234,
            description: 'should return error when country code is undefined',
            expectedResult: undefined,
            expectedError: 'Invalid country code.',
        },
        {
            countryCode: 'us',
            postalCode: null,
            description: 'should return error when postal code is null',
            expectedResult: undefined,
            expectedError: 'Invalid postal code.',
        },
        {
            countryCode: 'gb',
            postalCode: undefined,
            description: 'should return error when postal code is undefined',
            expectedResult: undefined,
            expectedError: 'Invalid postal code.',
        },
        {
            countryCode: 'chf',
            postalCode: 8001,
            description: 'should return false when country code is unknown',
            expectedResult: undefined,
            expectedError: 'Unknown alpha2/alpha3 country code: chf',
        },
        {
            countryCode: 'ch',
            postalCode: '80010',
            description: 'should return false when postal code is invalid',
            expectedResult: false,
            expectedError: null,
        },
        {
            countryCode: 'ch',
            postalCode: '8001',
            description: 'should return true when postal code is valid string',
            expectedResult: true,
            expectedError: null,
        },
        {
            countryCode: 'ch',
            postalCode: 8001,
            description: 'should return true when postal code is valid number',
            expectedResult: true,
            expectedError: null,
        },
        {
            countryCode: ' us ',
            postalCode: ' 98001 ',
            description: 'should trim white spaces in input',
            expectedResult: true,
            expectedError: null,
        }
    ];

    testCases.forEach(function(test) {
        it(`${test.description}`, function(done) {
            postalCodes.validate(test.countryCode, test.postalCode, function(error, result) {
                should(result).be.eql(test.expectedResult);
                should(error).be.eql(test.expectedError);
                done();
            });
        });
    });
});