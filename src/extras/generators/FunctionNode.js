/**
 * Returns the value returned by `FunctionNode.value` property.
 *
 * @class PCL.FunctionNode
 * @constructor
 * @extends PCL.GeneratorNode
 */
 PCL.FunctionNode = function() {

    PCL.GeneratorNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default FunctionNode
     */
    this.name = 'FunctionNode';

    /**
     * The value to be returned by this node.
     *
     * @property value
     * @type function
     * @default 0
     */
    this.value = function() {
        return 0;
    };

};

PCL.FunctionNode.prototype = Object.create( PCL.GeneratorNode.prototype );
PCL.FunctionNode.constructor = PCL.FunctionNode;

/**
 * Returns the value of `FunctionNode.value` for the given arguments.
 *
 * @method getValue
 * @return {number} `value`
 */
PCL.FunctionNode.prototype.getValue = function() {

    return this.value.apply( this, arguments );

};
