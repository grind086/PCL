/**
 * Returns the value stored in its `ConstantNode.value` property.
 *
 * @class PCL.ConstantNode
 * @constructor
 * @extends PCL.GeneratorNode
 */
 PCL.ConstantNode = function() {

    PCL.GeneratorNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default ConstantNode
     */
    this.name = 'ConstantNode';

    /**
     * The value to be returned by this node.
     *
     * @property value
     * @type number
     * @default 0
     */
    this.value = 0;

};

PCL.ConstantNode.prototype = Object.create( PCL.GeneratorNode.prototype );
PCL.ConstantNode.constructor = PCL.ConstantNode;

/**
 * Returns the value of `ConstantNode.value`.
 *
 * @method getValue
 * @return {number} `value`
 */
PCL.ConstantNode.prototype.getValue = function() {

    return this.value

};
