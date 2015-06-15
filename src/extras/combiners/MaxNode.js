/**
 * Returns the larger of the two inputs.
 *
 * @class PCL.MaxNode
 * @constructor
 * @extends PCL.CombinerNode
 */
PCL.MaxNode = function() {

    PCL.CombinerNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default MaxNode
     */
    this.name = 'MaxNode';

};

PCL.MaxNode.prototype = Object.create( PCL.CombinerNode.prototype );
PCL.MaxNode.constructor = PCL.MaxNode;

/**
 * Performs `Math.max( input[0], input[1] )`.
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.MaxNode.prototype.getValue = function() {

    var inputValues = this.getInputValues( arguments );
    return Math.max( inputValues[0], inputValues[1] );

};
