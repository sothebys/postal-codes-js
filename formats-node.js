var path = require('path');

module.exports = function getFormat(postalCodeFormat){
    //use eval(require) to workaround webpack which can't require dynamic path
    var format = eval('require')(path.join(__dirname, 'formats', postalCodeFormat));
    return format;
}