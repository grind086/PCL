/**
 * Scales the value of the input node, then adds a bias to it.
 *
 * @class PCL.ScaleBiasNode
 * @constructor
 * @extends PCL.ModifierNode
 */
PCL.ScaleBiasNode = function() {

	PCL.ModifierNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default ScaleBiasNode
     */
	this.name = 'ScaleBiasNode';

    /**
     * The amount to scale the input value by.
     *
     * @property scale
     * @type number
     * @default 1
     */
	this.scale = 1;

    /**
     * The amount to bias the input value by.
     *
     * @property bias
     * @type number
     * @default 0
     */
	this.bias  = 0;

};

PCL.ScaleBiasNode.prototype = Object.create( PCL.ModifierNode.prototype );
PCL.ScaleBiasNode.constructor = PCL.ScaleBiasNode;

/**
 * Performs `input[0] * ScaleBiasNode.scale + ScaleBiasNode.bias`.
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.ScaleBiasNode.prototype.getValue = function() {

	return this.getInputValue( arguments ) * this.scale + this.bias;

};
