/**
 * Returns the value of the first argument passed to the top-level
 * `getValue`. Useful for debugging purposes.
 *
 * @class PCL.ArgumentNode
 * @constructor
 * @extends PCL.GeneratorNode
 */
PCL.ArgumentNode = function() {

    PCL.GeneratorNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default ArgumentNode
     */
    this.name = 'ArgumentNode';

};

PCL.ArgumentNode.prototype = Object.create( PCL.GeneratorNode.prototype );
PCL.ArgumentNode.constructor = PCL.ArgumentNode;

/**
 * Returns the value of the first argument.
 *
 * @method getValue
 * @param value {number} The value to be returned by this 'generator'.
 * @return {number} `value`
 */
PCL.ArgumentNode.prototype.getValue = function( value ) {

    return value

};
