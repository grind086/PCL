/**
 * (__NYI__) Outputs a weighted combination of `input[0]` and `input[1]` depending on the value
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
 * (__NYI__)
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.BlendNode.prototype.getValue = function() {

    var inputValues = this.getInputValues( arguments );
    return 0;

};
