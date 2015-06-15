/**
 * Takes one input, and performs some operation on it.
 *
 * @class PCL.ModifierNode
 * @constructor
 * @extends PCL.BaseNode
 */

PCL.ModifierNode = function() {

    PCL.BaseNode.call( this );

    /**
     * The type of node (ex. BaseNode, GeneratorNode, ModifierNode, etc.)
     *
     * @property type
     * @type string
     * @default ModifierNode
     */
    this.type = 'ModifierNode';

    /**
     * Number of inputs to this node
     *
     * @property inputs
     * @type number
     * @default 1
     */
    this.inputs = 1;

};

PCL.ModifierNode.prototype = Object.create( PCL.BaseNode.prototype );
PCL.ModifierNode.constructor = PCL.ModifierNode;
