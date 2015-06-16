/**
 * Inverts the value of the input node.
 *
 * @class PCL.InvertNode
 * @constructor
 * @extends PCL.ModifierNode
 */
 PCL.InvertNode = function() {

	PCL.ModifierNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default InvertNode
     */
	this.name = 'InvertNode';

};

PCL.InvertNode.prototype = Object.create( PCL.ModifierNode.prototype );
PCL.InvertNode.constructor = PCL.InvertNode;

/**
 * Performs `-1 * input[0]`.
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.InvertNode.prototype.getValue = function() {

	return -1 * this.getInputValue( arguments );

};
