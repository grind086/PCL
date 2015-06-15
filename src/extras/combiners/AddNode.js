/**
 * Sums the values of the inputs.
 *
 * @class PCL.AddNode
 * @constructor
 * @extends PCL.CombinerNode
 */
PCL.AddNode = function() {

    PCL.CombinerNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default AddNode
     */
    this.name = 'AddNode';

};

PCL.AddNode.prototype = Object.create( PCL.CombinerNode.prototype );
PCL.AddNode.constructor = PCL.AddNode;

/**
 * Performs `input[0] + input[1]`.
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.AddNode.prototype.getValue = function() {

    var inputValues = this.getInputValues( arguments );
    return inputValues[0] + inputValues[1];

};
