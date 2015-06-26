PCL.Math.LCG = (function() {
    var a = 1664525, 
        c = 1013904223,
        m = Math.pow(2, 32);
        
    function LCG( seed ) {
        if ( seed === undefined )
            seed = Date.now();
        this.setSeed( seed );
    };

    LCG.prototype = {
        setSeed: function( seed ) {
            this.seed = ( typeof seed === 'number' 
                ? seed 
                : PCL.Math.hashCode( seed )
            );
            this.xi = this.seed;
        },

        next: function() {
            return this.xi = (a * this.xi + c) % m;
        },

        random: function() {
            return Math.abs( this.next() / m );
        }
    };

    return LCG;
}());