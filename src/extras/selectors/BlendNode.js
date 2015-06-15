/**
 * Outputs a weighted combination of `input[0]` and `input[1]` depending on the value
 * of `input[2]`. `input[2]` is assumed to have a range [-1, 1].
 *
 * @class PCL.BlendNode
 * @constructor
 * @extends PCL.BlendorNode
 */
PCL.BlendNode = function() {

    PCL.CombinerNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default BlendNode
     */
    this.name = 'BlendNode';

};

PCL.BlendNode.prototype = Object.create( PCL.SelectorNode.prototype );
PCL.BlendNode.constructor = PCL.BlendNode;

/**
 * Outputs `input[0]` if `input[2] < BlendNode.threshold` else `input[1]`.
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.BlendNode.prototype.getValue = function() {

    var inputValues = this.getInputValues( arguments );

    return (inputValues[2] < this.threshold)
        ? inputValues[0]
        : inputValues[1];

};
