PCL.Math.getEasingFunction = function( type ) {

    switch (type) {
        
    }

};

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
