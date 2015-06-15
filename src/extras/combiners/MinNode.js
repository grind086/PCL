/**
 * Returns the smaller of the two inputs.
 *
 * @class PCL.MinNode
 * @constructor
 * @extends PCL.CombinerNode
 */
PCL.MinNode = function() {

    PCL.CombinerNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default MinNode
     */
    this.name = 'MinNode';

};

PCL.MinNode.prototype = Object.create( PCL.CombinerNode.prototype );
PCL.MinNode.constructor = PCL.MinNode;

/**
 * Performs `Math.min( input[0], input[1] )`.
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.MinNode.prototype.getValue = function() {

    var inputValues = this.getInputValues( arguments );
    return Math.min( inputValues[0], inputValues[1] );

};
