/**
 * Applies fractional brownian motion. The properties `frequency` and `lacunarity`, 
 * may be set to either a number or array of numbers. If set to a number, all 
 * arguments will use the same value for that parameter. If set to an array, the
 * corresponding argument will use the proper value for that property. If an array 
 * element on any property is set to `null` or `undefined` the corresponding
 * argument will not be modified.
 *
 *     fbmNode.lacunarity = 2;
 *     fbmNode.getValue( x, y, z ); 
 *     // All arguments will have a lacunarity of 2
 *
 *     fbmNode.lacunarity = [ 2, 1.5, 2.5 ];
 *     fbmNode.getValue( x, y, z );
 *     // x lacunarity is 2
 *     // y lacunarity is 1.5
 *     // z lacunarity is 2.5
 *
 *     fbmNode.frequency = [ null, 1 / 1024 ];
 *     fbmNode.lacunarity = 2;
 *     fbmNode.getValue( x, y, z );
 *     // x is held constant
 *     // y lacunarity is 2, and frequency is 1 / 1024
 *     // z is held constant
 *
 * @class PCL.FBMNode
 * @constructor
 * @extends PCL.ModifierNode
 */
PCL.FBMNode = function() {

    PCL.ModifierNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default FBMNode
     */
    this.name = 'FBMNode';

    this.octaves = 8;

    this._frequency  = 2;
    this._lacunarity = 2;
    this._useArrays  = false;

    /**
     * The base frequency for the fbm. If set to an array separate values will 
     * be used for each argument. If an array element is `null` that argument 
     * will be held constant.
     *
     * @property frequency
     * @type number or Array<number>
     * @default 1;
     */
    this.frequency = 1;

    /**
     * The lacunarity (per-octave frequency multiplier) for the fbm. If set to
     * an array separate values will be used for each argument. If an array
     * element is `null` that argument will be held constant.
     *
     * @property lacunarity
     * @type number or Array<number>
     * @default 2
     */
    this.lacunarity = 2;

    /**
     * The base amplitude for the fbm.
     *
     * @property amplitude
     * @type number
     * @default 0.5
     */
    this.amplitude = 0.5;

    /**
     * The persistence (per-octave amplitude multiplier) for the fbm.
     *
     * @property persistence
     * @type number
     * @default 0.5
     */
    this.persistence = 0.5;

};

PCL.FBMNode.prototype = Object.create( PCL.ModifierNode.prototype );
PCL.FBMNode.constructor = PCL.FBMNode;

Object.defineProperties(PCL.FBMNode.prototype, {
    frequency: {
        get: function() { return this._frequency; },
        set: function( f ) {
            this._frequency = f;
            this.updateProperties();
        }
    },
    lacunarity: {
        get: function() { return this._lacunarity; },
        set: function( l ) {
            this._lacunarity = l;
            this.updateProperties();
        }
    }
});

PCL.FBMNode.prototype.updateProperties = function() {

    var f = this._frequency,
        l = this._lacunarity;

    var maxLength = Math.max(
        f.length || 0,
        l.length || 0
    );

    if (maxLength === 0) {

        this._frequency   = f;
        this._lacunarity  = l;

        this._useArrays = false;

    } else {

        var fArr = new Array(maxLength),
            lArr = new Array(maxLength);

        for (var i = 0; i < maxLength; i++) {
            fArr[i] = (f instanceof Array) ? f[i] : f;
            lArr[i] = (l instanceof Array) ? l[i] : l;
        }

        this._frequency   = fArr;
        this._lacunarity  = lArr;

        this._useArrays = true;

    }

};

/**
 * Does things! (todo: document this)
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.FBMNode.prototype.getValue = function() {

    var total = 0, args = [], inputValue;

    var f = this._frequency,
        l = this._lacunarity,
        a = this.amplitude,
        p = this.persistence;

    if ( this._useArrays ) {

        var argIsConst = [];

        for ( var i = 0; i < arguments.length; i++ ) {
            if ( f[i] !== undefined && l[i] !== undefined ) {
                args[i] = arguments[i] * f[i];
                argIsConst[i] = false;
            } else {
                args[i] = arguments[i];
                argIsConst[i] = true;
            }
        }

        for ( var i = 0; i < this.octaves; i++ ) {

            inputValue = this.getInputValue( args ) * a;

            total += inputValue;
            a     *= p;

            for ( var j = 0; j < args.length; j++ ) {
                if (!argIsConst[j]) {
                    args[j] *= l[j];
                }
            }

        }

    } else {

        for ( var i = 0; i < arguments.length; i++ ) {
            args[i] = arguments[i] * f;
        }

        for ( var i = 0; i < this.octaves; i++ ) {

            inputValue = this.getInputValue( args ) * a;

            total += inputValue;
            a     *= p;

            for ( var j = 0; j < args.length; j++ ) {
                args[j] *= l;
            }

        }

    }

    return total;

};
