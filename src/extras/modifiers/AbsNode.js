/**
 * Returns the absolute value of the input node.
 *
 * @class PCL.AbsNode
 * @constructor
 * @extends PCL.ModifierNode
 */
PCL.AbsNode = function() {

    PCL.ModifierNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default AbsNode
     */
    this.name = 'AbsNode';

};

PCL.AbsNode.prototype = Object.create( PCL.ModifierNode.prototype );
PCL.AbsNode.constructor = PCL.AbsNode;

/**
 * Performs `Math.abs( input[0] )`.
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.AbsNode.prototype.getValue = function() {

    return Math.abs( this.getInputValue( arguments ) );

};
