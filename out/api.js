YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "PCL",
        "PCL.AbsNode",
        "PCL.AddNode",
        "PCL.ArgumentNode",
        "PCL.BaseNode",
        "PCL.BlendNode",
        "PCL.ClampNode",
        "PCL.CombinerNode",
        "PCL.ConstantNode",
        "PCL.CurveNode",
        "PCL.DivideNode",
        "PCL.GeneratorNode",
        "PCL.InvertNode",
        "PCL.MaxNode",
        "PCL.MinNode",
        "PCL.ModifierNode",
        "PCL.MultiplyNode",
        "PCL.PowerNode",
        "PCL.ScaleBiasNode",
        "PCL.SelectNode",
        "PCL.SelectorNode",
        "PCL.SubtractNode",
        "PCL.TerraceNode"
    ],
    "modules": [
        "PCL"
    ],
    "allModules": [
        {
            "displayName": "PCL",
            "name": "PCL",
            "description": "Node-based procedural noise library with utilities for turning that\nnoise into useful data structures, such as textures. Based on the C++\nlibrary `libnoise` by Jason Bevins (http://libnoise.sourceforge.net/index.html).\n\nNodes are broken down into four different categories:\n{{#crossLink \"PCL.GeneratorNode\"}}Generators{{/crossLink}},\n{{#crossLink \"PCL.ModifierNode\"}}Modifiers{{/crossLink}},\n{{#crossLink \"PCL.CombinerNode\"}}Combiners{{/crossLink}},\nand {{#crossLink \"PCL.SelectorNode\"}}Selectors{{/crossLink}}.\n\n__Generators__  \nGenerators have no inputs, and one output. They provide the base values for the \nrest of the node chain.\n\n- {{#crossLink \"PCL.ArgumentNode\"}}ArgumentNode{{/crossLink}}\n- {{#crossLink \"PCL.ConstantNode\"}}ConstantNode{{/crossLink}}\n\n__Modifiers__  \nModifiers have one input, and one output.\n\n- {{#crossLink \"PCL.AbsNode\"}}AbsNode{{/crossLink}}\n- {{#crossLink \"PCL.ClampNode\"}}ClampNode{{/crossLink}}\n- {{#crossLink \"PCL.CurveNode\"}}CurveNode{{/crossLink}}\n- {{#crossLink \"PCL.InvertNode\"}}InvertNode{{/crossLink}}\n- {{#crossLink \"PCL.ScaleBiasNode\"}}ScaleBiasNode{{/crossLink}}\n- {{#crossLink \"PCL.TerraceNode\"}}TerraceNode{{/crossLink}}\n\n__Combiners__  \nCombiners have two inputs, and one output.\n\n- {{#crossLink \"PCL.AddNode\"}}AddNode{{/crossLink}}\n- {{#crossLink \"PCL.DivideNode\"}}DivideNode{{/crossLink}}\n- {{#crossLink \"PCL.MaxNode\"}}MaxNode{{/crossLink}}\n- {{#crossLink \"PCL.MinNode\"}}MinNode{{/crossLink}}\n- {{#crossLink \"PCL.MultiplyNode\"}}MultiplyNode{{/crossLink}}\n- {{#crossLink \"PCL.PowerNode\"}}PowerNode{{/crossLink}}\n- {{#crossLink \"PCL.SubtractNode\"}}SubtractNode{{/crossLink}}\n\n__Selectors__  \nSelectors have three inputs, and one output.\n\n- {{#crossLink \"PCL.BlendNode\"}}BlendNode{{/crossLink}}\n- {{#crossLink \"PCL.SelectNode\"}}SelectNode{{/crossLink}}"
        }
    ]
} };
});