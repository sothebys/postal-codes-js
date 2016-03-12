
var postalCodes = require('./postal-codes')


var pc1 = 'CW3 9SS';
postalCodes.validate('GB', pc1, function (err, isValid) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Postal code "' + pc1 + '" is valid? ' + isValid);
});


var pc2 = 'CW39SS';
console.log('Postal code "' + pc2 + '" is valid? ' + postalCodes.validate('GB', pc2));

var pc3 = 'xxxcw39SS';
console.log('Postal code "' + pc3 + '" is valid? ' + postalCodes.validate('GB', pc3));

var pc4 = '1234-123';
console.log('Postal code "' + pc4 + '" is valid? ' + postalCodes.validate('PT', pc4));