/**
 * Multiplies the first input by the second.
 *
 * @class PCL.MultiplyNode
 * @constructor
 * @extends PCL.CombinerNode
 */
PCL.MultiplyNode = function() {

    PCL.CombinerNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default MultiplyNode
     */
    this.name = 'MultiplyNode';

};

PCL.MultiplyNode.prototype = Object.create( PCL.CombinerNode.prototype );
PCL.MultiplyNode.constructor = PCL.MultiplyNode;

/**
 * Performs `input[0] * input[1]`.
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.MultiplyNode.prototype.getValue = function() {

    var inputValues = this.getInputValues( arguments );
    return inputValues[0] * inputValues[1];

};
