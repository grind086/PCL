/**
 * @class PCL.GeneratorNode
 * @constructor
 * @extends PCL.BaseNode
 */

PCL.GeneratorNode = function() {

    PCL.BaseNode.call( this );

    /**
     * The type of node (ex. BaseNode, GeneratorNode, ModifierNode, etc.)
     *
     * @property type
     * @type string
     * @default GeneratorNode
     */
    this.type = 'GeneratorNode';

};

PCL.GeneratorNode.prototype = Object.create( PCL.BaseNode.prototype );
PCL.GeneratorNode.constructor = PCL.GeneratorNode;
