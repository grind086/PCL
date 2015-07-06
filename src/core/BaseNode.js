/**
 * The base class for all noise nodes.
 *
 * @class PCL.BaseNode
 * @constructor
 */

PCL.BaseNode = function() {

    /**
     * UUID for this node instance
     *
     * @property id
     * @type string
     */
    this.id = PCL.Math.uuid();

    /**
     * The type of node (ex. BaseNode, GeneratorNode, ModifierNode, etc.)
     *
     * @property type
     * @type string
     * @default BaseNode
     */
    this.type = 'BaseNode';

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     */
    this.name = '';

    /**
     * Number of inputs to this node
     *
     * @property inputs
     * @type number
     * @default 0
     */
    this.inputs = 0;

    /**
     * Array containing attached inputs
     *
     * @property inputNodes
     * @type Array<PCL.BaseNode>
     */
    this.inputNodes = [];

    /**
     * The node this one outputs into
     *
     * @property parent
     * @type PCL.BaseNode
     * @default null
     */
    this.parent = null;

};

PCL.BaseNode.prototype = {

    /**
     * Returns input node at index `i`
     *
     * @method getInput
     * @param i {Number} Index of the node to retrieve
     * @return {PCL.BaseNode}
     */
    getInput: function( i ) {

      if ( i > this.inputs ) {
         PCL.error( 'Input index out of range.' );
         return;
      }

      return this.inputNodes[ i ];

    },

    /**
     * Sets the input node at index `i` to `node`
     *
     * @method setInput
     * @param i {Number} Index of the node to set
     * @param node {PCL.BaseNode} The new input node
     */
    setInput: function( i, node ) {

        if ( i > this.inputs ) {
            PCL.error( 'Input index out of range.' );
            return;
        }

        if ( !(node instanceof PCL.BaseNode) ) {
            PCL.error( 'Input is not a PCL node.' );
            return;
        }

        if ( node.parent !== null ) {
            node.parent.removeInput( node );
        }

        node.parent = this;
        this.inputNodes[ i ] = node;

    },

    /**
     * Removes the input node at index `i`
     *
     * @method unsetInput
     * @param i {Number} Index of the node to unset
     */
    unsetInput: function( i ) {

        if ( this.inputNodes[ i ] ) {
            this.inputNodes[ i ].parent = null;
            this.inputNodes[ i ] = null;
        }

    },

    /**
     * Removes `node` from the input list
     *
     * @method removeInput
     * @param i {Number} Index of the node to unset
     */
    removeInput: function( node ) {

        for ( var i = 0; i < this.inputs; i++ ) {
            if ( this.inputNodes[i].id === node.id ) {
                this.unsetInput( i );
                return;
            }
        }

    },

    /**
     * Returns the value of the input with index i.
     *
     * @method getInputValue
     * @param i {Number} Input node index.
     * @param args {Array<Any>} Arguments to be passed through the node 
     *    chain (ex. x, y coordinates)
     * @return {Number} Value of the input node
     */
    getInputValue: function( i, args ) {

        var node = this.inputNodes[i];
        return node.getValue.apply( node, args );

    },

    /**
     * Returns an array of input node values (indexed the same as the
     * actual input nodes)
     *
     * @method getInputValues
     * @param args {Array<Any>} Arguments to be passed through the node 
     *    chain (ex. x, y coordinates)
     * @return {Array<Number>} Values of the input nodes
     */
    getInputValues: function( args ) {

        var values = [];

        for ( var i = 0, node; i < this.inputs; i++ ) {
            values[i] = this.getInputValue( i, args );
        }

        return values;

    },

    /**
     * Calculate the value of this node. Should call `getInputValues` and
     * use the results (with the exception of generators).
     *
     * @method getValue
     * @param [...arguments] {Any} Arguments to be passed up the node chain.
     *    Typically numbers.
     * @return {number} The value of the node chain for the given arguments.
     */
    getValue: function() {

        return 0;

    }

};

