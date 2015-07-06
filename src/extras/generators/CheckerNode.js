/**
 * Creates a simple checkered pattern in 2d.
 *
 * @class PCL.CheckerNode
 * @constructor
 * @extends PCL.GeneratorNode
 */
PCL.CheckerNode = function() {

    PCL.GeneratorNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default CheckerNode
     */
    this.name = 'CheckerNode';

    this.gridSize = 64;

};

PCL.CheckerNode.prototype = Object.create( PCL.GeneratorNode.prototype );
PCL.CheckerNode.constructor = PCL.CheckerNode;

/**
 * Returns 1 for black and 0 for white squares.
 *
 * @method getValue
 * @param value {number} The value to be returned by this 'generator'.
 * @return {number}
 */
PCL.CheckerNode.prototype.getValue = function( x, y ) {

    x = x / this.gridSize;
    y = y / this.gridSize;

    return (x ^ y) & 1;

};
