/**
 * Creates a simple checkered pattern in 2d.
 *
 * @class PCL.Perlin2DNode
 * @constructor
 * @extends PCL.GeneratorNode
 */
PCL.Perlin2DNode = function( seed ) {

    PCL.GeneratorNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default Perlin2DNode
     */
    this.name = 'Perlin2DNode';

    /**
     * The random seed used by the node.
     *
     * @property seed
     * @type any
     * @default `Date.now()`
     */
    this.seed = PCL.Math.hashCode( seed === undefined ? Date.now() : seed );

    /**
     * The size of grid spaces between gradient vectors
     *
     * @property gridSize
     * @type number
     * @default 64
     */
    this.gridSize = 64;

    this._lcg = new PCL.Math.LCG();

};

PCL.Perlin2DNode.prototype = Object.create( PCL.GeneratorNode.prototype );
PCL.Perlin2DNode.constructor = PCL.Perlin2DNode;

PCL.Perlin2DNode.prototype.dotGridGradient = function( ix, iy, x, y ) {

    this._lcg.setSeed( 
        ( ( ( ( ix * 0x1f1f1f1f ) ^ ( iy * 0xadadadad ) ) + 1 ) * this.seed ) >>> 2
    );

    var a = this._lcg.random(),
        b = this._lcg.random();

    return ( (x - ix) * a + (y - iy) * b ) / Math.sqrt( a * a + b * b );

};

/**
 * Returns a height value for the given (x, y) coordinates.
 *
 * @method getValue
 * @return {number}
 */
PCL.Perlin2DNode.prototype.getValue = function( x, y ) {

    x = x / this.gridSize;
    y = y / this.gridSize;

    // Grid coordinates
    var gx0 = Math.floor( x ),
        gx1 = gx0 + 1,
        gy0 = Math.floor( y ),
        gy1 = gy0 + 1;

    // Grid values
    var n00 = this.dotGridGradient( gx0, gy0, x, y ),
        n10 = this.dotGridGradient( gx1, gy0, x, y ),
        n01 = this.dotGridGradient( gx0, gy1, x, y ),
        n11 = this.dotGridGradient( gx1, gy1, x, y );

    // Interpolation weights
    var sx = x - gx0,
        sy = y - gy0;

    // Interpolated values
    var x0 = PCL.Math.lerp( n00, n10, sx ),
        x1 = PCL.Math.lerp( n01, n11, sx );

    return PCL.Math.clamp( PCL.Math.lerp( x0, x1, sy ) * 1.7 + 0.5, 0, 1 );

};
