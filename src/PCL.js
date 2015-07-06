/**
 * Node-based procedural noise library with utilities for turning that
 * noise into useful data structures, such as textures. Based on the C++
 * library `libnoise` by Jason Bevins (http://libnoise.sourceforge.net/index.html).
 *
 * Nodes are broken down into four different categories:
 * {{#crossLink "PCL.GeneratorNode"}}Generators{{/crossLink}},
 * {{#crossLink "PCL.ModifierNode"}}Modifiers{{/crossLink}},
 * {{#crossLink "PCL.CombinerNode"}}Combiners{{/crossLink}},
 * and {{#crossLink "PCL.SelectorNode"}}Selectors{{/crossLink}}.
 *
 * __Generators__  
 * Generators have no inputs, and one output. They provide the base values for the 
 * rest of the node chain.
 * 
 * - {{#crossLink "PCL.ArgumentNode"}}ArgumentNode{{/crossLink}}
 * - {{#crossLink "PCL.ConstantNode"}}ConstantNode{{/crossLink}}
 *
 * __Modifiers__  
 * Modifiers have one input, and one output.
 * 
 * - {{#crossLink "PCL.AbsNode"}}AbsNode{{/crossLink}}
 * - {{#crossLink "PCL.ClampNode"}}ClampNode{{/crossLink}}
 * - {{#crossLink "PCL.CurveNode"}}CurveNode{{/crossLink}}
 * - {{#crossLink "PCL.InvertNode"}}InvertNode{{/crossLink}}
 * - {{#crossLink "PCL.ScaleBiasNode"}}ScaleBiasNode{{/crossLink}}
 * - {{#crossLink "PCL.TerraceNode"}}TerraceNode{{/crossLink}}
 *
 * __Combiners__  
 * Combiners have two inputs, and one output.
 * 
 * - {{#crossLink "PCL.AddNode"}}AddNode{{/crossLink}}
 * - {{#crossLink "PCL.DivideNode"}}DivideNode{{/crossLink}}
 * - {{#crossLink "PCL.MaxNode"}}MaxNode{{/crossLink}}
 * - {{#crossLink "PCL.MinNode"}}MinNode{{/crossLink}}
 * - {{#crossLink "PCL.MultiplyNode"}}MultiplyNode{{/crossLink}}
 * - {{#crossLink "PCL.PowerNode"}}PowerNode{{/crossLink}}
 * - {{#crossLink "PCL.SubtractNode"}}SubtractNode{{/crossLink}}
 *
 * __Selectors__  
 * Selectors have three inputs, and one output.
 * 
 * - {{#crossLink "PCL.BlendNode"}}BlendNode{{/crossLink}}
 * - {{#crossLink "PCL.SelectNode"}}SelectNode{{/crossLink}}
 *
 * @module PCL
 */

/**
 * The base static class to which PCL's classes are attached.
 *
 * @class PCL
 * @static
 */

var PCL = { 

    /**
     * The current PCL version
     *
     * @property VERSION
     * @type string
     * @readOnly
     * @static
     */
    VERSION: '0.1.0',

    /**
     * Whether or not THREE.js is available
     *
     * @property THREE_AVAILABLE
     * @type boolean
     * @readOnly
     * @static
     */
    THREE_AVAILABLE: (typeof THREE !== 'undefined')

};

/**
 * Information-level logging. By default simply binds `console.log`.
 * 
 * @method log
 * @static
 */

PCL.log = function() { console.log.apply( console, arguments ); };

/**
 * Warning-level logging. By default simply binds `console.warn`.
 * 
 * @method warn
 * @static
 */

PCL.warn = function() { console.warn.apply( console, arguments ); };

/**
 * Error-level logging. By default simply binds `console.error`.
 * 
 * @method error
 * @static
 */

PCL.error = function() { console.error.apply( console, arguments ); };

PCL.RBGFormat = 0;
PCL.RGBAFormat = 1;
PCL.GrayscaleFormat = 2;
