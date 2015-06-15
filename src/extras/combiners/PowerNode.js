/**
 * Raises the first input to the power of the second.
 *
 * @class PCL.PowerNode
 * @constructor
 * @extends PCL.CombinerNode
 */
PCL.PowerNode = function() {

    PCL.CombinerNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default PowerNode
     */
    this.name = 'PowerNode';

};

PCL.PowerNode.prototype = Object.create( PCL.CombinerNode.prototype );
PCL.PowerNode.constructor = PCL.PowerNode;

/**
 * Performs `Math.pow( input[0], input[1] )`.
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.PowerNode.prototype.getValue = function() {

    var inputValues = this.getInputValues( arguments );
    return Math.pow( inputValues[0] );

};
