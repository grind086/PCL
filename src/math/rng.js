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

PCL.Math.MersenneTwister = (function() {
    function MersenneTwister( seed ) {

        // Modified version of MersenneTwister by Stephan Brumme
        // http://create.stephan-brumme.com/mersenne-twister/mersenne.js

        var state = new Array(624);
        var next;

        // if no seed is given, use current time
        if (seed === undefined)
            seed = Date.now();

        // private function: create new state (based on old one)
        var twist = function()
        {
            // first 624-397=227 words
            for (var i = 0; i < 227; i++)
            {
                var bits = (state[i] & 0x80000000) | (state[i + 1] & 0x7fffffff);
                state[i] = state[i + 397] ^ (bits >>> 1) ^ ((bits & 1) * 0x9908b0df);
            }
            // remaining words (except the very last one)
            for (var i = 227 ; i < 623; i++)
            {
                var bits = (state[i] & 0x80000000) | (state[i + 1] & 0x7fffffff);
                state[i] = state[i - 227] ^ (bits >>> 1) ^ ((bits & 1) * 0x9908b0df);
            }

            // last word is computed pretty much the same way, but i + 1 must wrap around to 0
            var bits = (state[623] & 0x80000000) | (state[0] & 0x7fffffff);
            state[623] = state[396] ^ (bits >>> 1) ^ ((bits & 1) * 0x9908b0df);

            // word used for next random number
            next = 0;
        }

        // fill initial state
        state[0] = seed;
        for (var i = 1; i < 624; i++)
        {
            var s = state[i - 1] ^ (state[i - 1] >>> 30);
            // avoid multiplication overflow: split 32 bits into 2x 16 bits and process them individually
            state[i]  = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) +
            (s & 0x0000ffff)         * 1812433253)        + i;
            // convert to 32 bit unsigned int
            state[i] |= 0;
        }

        // twist'n'shout
        twist();

        // public function: return a random 32 bit number
        this.random = function()
        {
            // compute new state ?
            if (next >= 624)
                twist();

            // shuffle bits around
            var x = state[next++];
            x ^=  x >>> 11;
            x ^= (x  <<  7) & 0x9d2c5680;
            x ^= (x  << 15) & 0xefc60000;
            x ^=  x >>> 18;

            return x;
        }
    };

}());
