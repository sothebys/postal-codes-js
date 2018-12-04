[![Build Status](https://travis-ci.org/Cimpress-MCP/postal-codes-js.svg?branch=master)](https://travis-ci.org/Cimpress-MCP/postal-codes-js)
[![Coverage Status](https://coveralls.io/repos/github/Cimpress-MCP/postal-codes-js/badge.svg?branch=master)](https://coveralls.io/github/Cimpress-MCP/postal-codes-js?branch=master)
[![npm version](https://badge.fury.io/js/postal-codes-js.svg)](https://badge.fury.io/js/postal-codes-js)

# postal-codes.js
Provide javascript postal code validation for [all  countries](https://en.wikipedia.org/wiki/List_of_postal_codes).


### Validation rules
1. Characters " " (space) and "-" (dash) are removed from the passed string
2. Case doesn't matter

### Testing with mocha
    $ npm test
    $ npm run coverage

### Usage
```
var postalCodes = require('postal-codes-js');

// All the calls below returns true
postalCodes.validate('bg', '1003');
postalCodes.validate('gb', 'EC1A 1BB');
postalCodes.validate('gb', 'EC1A1BB');
postalCodes.validate('gb', 'EC1A-1BB');
postalCodes.validate('tr', '33150');
postalCodes.validate('us', '22313');
```

## Contribution
Contributions are more than welcome, just fork the repo and create a pull-request ;)

## Contact
PostalCodesJS@cimpress.com
