PCL.Math = {};

PCL.Math.uuid = function() {

    // From http://www.broofa.com/Tools/Math.uuid.js
    // uuidFast

    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

    return function() {

        var uuid = new Array(36), rnd=0, r;

        for (var i = 0; i < 36; i++) {

            if ( i === 8 || i === 13 || i === 18 || i === 23 ) {
                uuid[i] = '-';
            } else if ( i === 14 ) {
                uuid[i] = '4';
            } else {

                if (rnd <= 0x02) {
                    rnd = 0x2000000 + (Math.random()*0x1000000) | 0
                };

                r = rnd & 0xf;
                rnd = rnd >> 4;
                uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];

            }

        }

        return uuid.join('');

    }

}();

PCL.Math.lerp = function( a, b, alpha ) {
    return a * (1 - alpha) + b * alpha;
};

PCL.Math.cerp = function( a, b, c, d, alpha ) {
    var p = (d - c) - (a - b),
        q = (a - b) - p,
        r = c - a,
        s = b;

    // a^3 * p + a^2 * q + a * r + s
    return s + alpha * ( r + alpha * ( q + alpha * p ) );
};

PCL.Math.clamp = function( x, min, max ) {
    return Math.min( max, Math.max( min, x ) );
};

PCL.Math.getEasingFunction = function( type ) {

    switch (type) {
        
    }

};
