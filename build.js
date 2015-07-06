var fs = require('fs');
var UglifyJS = require('uglify-js');

var fileList = [

    './src/PCL.js',

    './src/math/Math.js',
    './src/math/easing.js',
    './src/math/rng.js',

    './src/core/BaseNode.js',
    './src/core/CombinerNode.js',
    './src/core/GeneratorNode.js',
    './src/core/ModifierNode.js',
    './src/core/SelectorNode.js',

    './src/extras/combiners/AddNode.js',
    './src/extras/combiners/DivideNode.js',
    './src/extras/combiners/MaxNode.js',
    './src/extras/combiners/MinNode.js',
    './src/extras/combiners/MultiplyNode.js',
    './src/extras/combiners/PowerNode.js',
    './src/extras/combiners/SubtractNode.js',

    './src/extras/generators/ArgumentNode.js',
    './src/extras/generators/CheckerNode.js',
    './src/extras/generators/ConstantNode.js',
    './src/extras/generators/FunctionNode.js',
    './src/extras/generators/Worley2DNode.js',

    './src/extras/modifiers/AbsNode.js',
    './src/extras/modifiers/ClampNode.js',
    './src/extras/modifiers/CurveNode.js',
    './src/extras/modifiers/FBMNode.js',
    './src/extras/modifiers/InvertNode.js',
    './src/extras/modifiers/ScaleBiasNode.js',
    './src/extras/modifiers/TerraceNode.js',

    './src/extras/selectors/BlendNode.js',
    './src/extras/selectors/SelectNode.js'

];

// Concatenate files

var rawCode = '';

for (var i = 0; i < fileList.length; i++) {

    rawCode += '// ----------\n';
    rawCode += '// ' + fileList[i].replace(/\.\/src\//, '') + '\n';
    rawCode += '// ----------\n\n';
    rawCode += fs.readFileSync( fileList[i] );

    if (i < fileList.length - 1) {
        rawCode += '\n\n';
    }

}

// Output raw code

fs.writeFile( './build/PCL.js', rawCode, function( err ) {

    if (err) throw err;
    console.log( 'Raw code output to ./build/PCL.js' );

} );

// Minify raw code

var mini = UglifyJS.minify(rawCode, {

    fromString: true,
    // outSourceMap: 'PCL.min.js.map',
    // sourceRoot:   'PCL'

});

// Output minified code

fs.writeFile( './build/PCL.min.js', mini.code + '\n', function( err ) {

    if (err) throw err;
    console.log( 'Minified file output to ./build/PCL.min.js' );

} );

// fs.writeFile( './build/PCL.min.js.map', mini.map, function( err ) {

//     if (err) throw err;
//     console.log( 'Source map output to ./build/PCL.min.js.map' );

// } );
