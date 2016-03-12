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

        format.TestData.Invalid.map(function (validPostalCode) {
            it(alpha2Code + ' / ' + validPostalCode + ' is NOT valid', function () {
                postalCodes.validate(alpha2Code, validPostalCode).should.eql(false);
            })
        });
    });
});