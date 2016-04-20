var path = require('path');
var byAlpha2 = require(path.join(__dirname, 'generated', 'postal-codes-alpha2.json'));
var byAlpha3 = require(path.join(__dirname, 'generated', 'postal-codes-alpha3.json'));

module.exports.validate = function (countryCode, postalCode, callback) {

    if (callback) {
        return validatePostalCodeInternal(countryCode, postalCode, callback);
    }

    var result;
    validatePostalCodeInternal(countryCode, postalCode, function (err, isValid) {
        result = isValid;
    });

    return result;
};

function validatePostalCodeInternal(countryCode, postalCode, callback) {
    if (!countryCode) {
        callback('Invalid country code.');
        return;
    }

    if (!postalCode) {
        callback('Invalid postal code.');
        return;
    }

    var countryData = undefined;
    countryCode = countryCode.trim();

    // Is it alpha2 ?
    if (countryCode.length == 2) {
        countryData = byAlpha2[countryCode.toUpperCase()];
    }

    // Is it alpha3 ?
    if (countryCode.length == 3) {
        countryData = byAlpha3[countryCode.toUpperCase()];
    }

    if (!countryData) {
        callback('Unknown alpha2/alpha3 country code: ' + countryCode);
        return;
    }

    var format = require(path.join(__dirname, 'formats', countryData.postalCodeFormat));
    if (!format) {
        callback('Failed to load postal code format "' + countryData.postalCodeFormat + '".');
        return;
    }

    postalCode = postalCode.toString().trim();
    var preparedPostalCode = postalCode.slice(0);
    for(var i=0; i<format.RedundantCharacters.length; i++) {
        preparedPostalCode = preparedPostalCode.replace(new RegExp(format.RedundantCharacters[i], 'g'), '');
    }

    var expression = format.ValidationRegex;
    if (expression instanceof Array) {
        expression = '^' + expression.join('|') + '$';
    }

    var regexp = new RegExp(expression, 'i');
    var result = regexp.exec(preparedPostalCode);

    if (!result) {
        // Invalid postal code
        callback(null, false);
        return;
    }

    if (result[0].toLowerCase() != preparedPostalCode.toLowerCase()) {
        // Found "sub" match
        callback(null, false);
        return;
    }

    // Valid postal code
    callback(null, true);
}
