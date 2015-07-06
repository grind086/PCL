PCL.Math = {};

PCL.Math.clamp = function( x, min, max ) {
    return Math.min( max, Math.max( min, x ) );
};

PCL.Math.mod = function( n, m ) {
    return ( ( ( n % m ) + m ) % m );
};

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

PCL.Math.hashCode = function( string ) {

    // Implementation of Java's String.hashCode()
    // From http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/

    if ( typeof string !== "string" ) {
        string = string.toString();
    }

    var hash = 0;
    if (string.length == 0) return hash;
    for (var i = 0; i < string.length; i++) {
        hash = ((hash<<5)-hash)+string.charCodeAt(i);
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;

};
