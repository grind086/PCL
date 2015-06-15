/**
 * Takes two inputs and combines them into a single output.
 *
 * @class PCL.CombinerNode
 * @constructor
 * @extends PCL.BaseNode
 */

PCL.CombinerNode = function() {

    PCL.BaseNode.call( this );

    /**
     * The type of node (ex. BaseNode, GeneratorNode, ModifierNode, etc.)
     *
     * @property type
     * @type string
     * @default CombinerNode
     */
    this.type = 'CombinerNode';

    /**
     * Number of inputs to this node
     *
     * @property inputs
     * @type number
     * @default 2
     */
    this.inputs = 2;

};

PCL.CombinerNode.prototype = Object.create( PCL.BaseNode.prototype );
PCL.CombinerNode.constructor = PCL.CombinerNode;
