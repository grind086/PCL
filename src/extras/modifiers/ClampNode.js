/**
 * Clamps the value of the input node between `ClampNode.min` and `ClampNode.max`.
 *
 * @class PCL.ClampNode
 * @constructor
 * @extends PCL.ModifierNode
 */
PCL.ClampNode = function() {

    PCL.ModifierNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default ClampNode
     */
    this.name = 'ClampNode';

    /**
     * The minimum value to be returned by this node.
     *
     * @property min
     * @type number
     * @default -1
     */
    this.min = -1;

    /**
     * The maximum value to be returned by this node.
     *
     * @property max
     * @type number
     * @default 1
     */
    this.max = 1;

};

PCL.ClampNode.prototype = Object.create( PCL.ModifierNode.prototype );
PCL.ClampNode.constructor = PCL.ClampNode;

/**
 * Performs `PCL.Math.clamp( input[0], ClampNode.min, ClampNode.max )`.
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.ClampNode.prototype.getValue = function() {

   return PCL.Math.clamp( this.getInputValue( arguments ), this.min, this.max );

};
