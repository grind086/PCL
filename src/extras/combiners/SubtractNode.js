/**
 * Subtracts the second input from the first.
 *
 * @class PCL.SubtractNode
 * @constructor
 * @extends PCL.CombinerNode
 */
PCL.SubtractNode = function() {

    PCL.CombinerNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default SubtractNode
     */
    this.name = 'SubtractNode';

};

PCL.SubtractNode.prototype = Object.create( PCL.CombinerNode.prototype );
PCL.SubtractNode.constructor = PCL.SubtractNode;

/**
 * Performs `input[0] - input[1]`.
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.SubtractNode.prototype.getValue = function() {

    var inputValues = this.getInputValues( arguments );
    return inputValues[0] - inputValues[1];

};
