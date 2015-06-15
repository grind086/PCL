/**
 * Outputs either `input[0]` or `input[1]` depending on the value of `input[2]`.
 *
 * @class PCL.SelectNode
 * @constructor
 * @extends PCL.SelectorNode
 */
PCL.SelectNode = function() {

    PCL.CombinerNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default SelectNode
     */
    this.name = 'SelectNode';

    /**
     * For `input[2] < SelectNode.threshold` this node will output `input[0]`.
     * Otherwise it will output `input[1]`.
     *
     * @property threshold
     * @type number
     * @default 0
     */
    this.threshold = 0;

};

PCL.SelectNode.prototype = Object.create( PCL.SelectorNode.prototype );
PCL.SelectNode.constructor = PCL.SelectNode;

/**
 * Outputs `input[0]` if `input[2] < SelectNode.threshold` else `input[1]`.
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.SelectNode.prototype.getValue = function() {

    var inputValues = this.getInputValues( arguments );

    return (inputValues[2] < this.threshold)
        ? inputValues[0]
        : inputValues[1];

};
