/**
 * Divides the first input by the second.
 *
 * @class PCL.DivideNode
 * @constructor
 * @extends PCL.CombinerNode
 */
PCL.DivideNode = function() {

    PCL.CombinerNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default DivideNode
     */
    this.name = 'DivideNode';

};

PCL.DivideNode.prototype = Object.create( PCL.CombinerNode.prototype );
PCL.DivideNode.constructor = PCL.DivideNode;

/**
 * Performs `input[0] / input[1]`.
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.DivideNode.prototype.getValue = function() {

    var inputValues = this.getInputValues( arguments );
    return inputValues[0] / inputValues[1];

};
