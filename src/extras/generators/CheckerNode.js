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

};

PCL.CheckerNode.prototype = Object.create( PCL.GeneratorNode.prototype );
PCL.CheckerNode.constructor = PCL.CheckerNode;

/**
 * Returns 1 for black and 0 for white squares.
 *
 * @method getValue
 * @param value {number} The value to be returned by this 'generator'.
 * @return {number} `value`
 */
PCL.CheckerNode.prototype.getValue = function( x, y ) {

    return (x ^ y) & 1;

};
