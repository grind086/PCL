/**
 * Returns the value returned by `Worley2DNode.value` property.
 *
 * @class PCL.Worley2DNode
 * @constructor
 * @extends PCL.GeneratorNode
 */
 PCL.Worley2DNode = function( seed ) {

    PCL.GeneratorNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default Worley2DNode
     */
    this.name = 'Worley2DNode';

    /**
     * The random seed used by the node.
     *
     * @property seed
     * @type any
     * @default `Date.now()`
     */
    this.seed = PCL.Math.hashCode( seed === undefined ? Date.now() : seed );

    /**
     * The size of feature point containing grid squares. Average of 4 points per square.
     *
     * @property gridSize
     * @type number
     * @default 64
     */
    this.gridSize = 64;

    /**
     * The number of grid squares that exist before wrapping around. Set to 0 for no wrapping.
     *
     * @property wrapSize
     * @type number
     * @default 0
     */
    this.wrapSize = 0;

    /**
     * The distance function used to calculate point values.
     *
     * @property distance
     * @type Function
     * @default PCL.Worley2DNode.prototype.distanceEuclidean
     */
    this.distance = this.distanceEuclidean;

    /**
     * Stores the points generated in the last use of `getValue()`. By caching these points
     * the number of times they must be calculated is generally drastically reduced.
     *
     * @property _lastGrid
     * @type array
     * @private
     */
    this._lastGrid = [null, null, null];

};

PCL.Worley2DNode.prototype = Object.create( PCL.GeneratorNode.prototype );
PCL.Worley2DNode.constructor = PCL.Worley2DNode;

/**
 * Given a random number 0-1 returns the number of feature points based on
 * a poisson distribution (k = 1..9, lambda = 4).
 *
 * @method probLookup
 * @return {number}
 */
PCL.Worley2DNode.prototype.probLookup = function(prob) {
    if (prob < 0.07525283359435139) return 1;
    if (prob < 0.22575850078305418) return 2;
    if (prob < 0.42643272370132457) return 3;
    if (prob < 0.62710694661959500) return 4;
    if (prob < 0.78764632495421130) return 5;
    if (prob < 0.89467257717728880) return 6;
    if (prob < 0.95583043559047590) return 7;
    if (prob < 0.98640936479706940) return 8;
    return 9;
};

PCL.Worley2DNode.prototype.distanceEuclidean = function( ax, ay, bx, by ) {
    var dx = bx - ax,
        dy = by - ay;

    return Math.sqrt( dx * dx + dy * dy );
};

PCL.Worley2DNode.prototype.distanceManhattan = function( ax, ay, bx, by ) {
    var dx = bx - ax,
        dy = by - ay;

    return Math.abs( dx ) + Math.abs( dy );
};

/**
 * Returns a height value for the given (x, y) coordinates.
 *
 * @method getValue
 * @return {number}
 */
PCL.Worley2DNode.prototype.getValue = function( x, y ) {

    var ix = Math.floor( x / this.gridSize ),
        iy = Math.floor( y / this.gridSize ),
        points = [];

    if ( this._lastGrid[0] !== ix || this._lastGrid[1] !== iy ) {

        var lcg = new PCL.Math.LCG();

        var gridX, gridY, i, coordHash, npoints, pX, pY, d;
        for ( gridX = ix - 1; gridX < ix + 2; gridX++ ) {
            for ( gridY = iy - 1; gridY < iy + 2; gridY++ ) {

                if ( this.wrapSize > 0 ) {
                    coordHash = ( ( ( ( PCL.Math.mod( gridX, this.wrapSize ) * 0x1f1f1f1f ) ^ ( PCL.Math.mod( gridY, this.wrapSize ) * 0xadadadad ) ) + 1 ) * this.seed ) >>> 2;
                } else {
                    coordHash = ( ( ( ( gridX * 0x1f1f1f1f ) ^ ( gridY * 0xadadadad ) ) + 1 ) * this.seed ) >>> 2;
                }

                lcg.setSeed( coordHash );

                npoints = this.probLookup( lcg.random() );
                for ( i = 0; i < npoints; i++ ) {
                    pX = (gridX + lcg.random()) * this.gridSize;
                    pY = (gridY + lcg.random()) * this.gridSize;

                    points.push( [pX, pY] );
                }

            }
        }

        this._lastGrid = [ix, iy, points];

    } else {

        points = this._lastGrid[2];

    }

    var min = Infinity;
    for ( var i = 0, d; i < points.length; i++ ) {
        d   = this.distance( x, y, points[i][0], points[i][1] );
        min = Math.min( min, d );
    }

    return PCL.Math.clamp( min / this.gridSize, 0, 1 );

};
