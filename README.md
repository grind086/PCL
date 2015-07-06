# PCL
Procedural Content Library

### Building From Source
First, clone the repository:

    git clone https://github.com/grind086/PCL.git
    
Then enter the repository directory (`/PCL`) and run the following. Requires [node](https://nodejs.org/) and [npm](https://www.npmjs.com/).

    npm install
    node build.js
    
The files `PCL.js` and `PCL.min.js` will be created in `/build`. It is also possible to generate documentation from the source comments using [yuidoc](http://yui.github.io/yuidoc/).

    npm install yuidoc
    yuidoc ./src
    
By default this will generate documentation files in `/out`, simply open `/out/index.html`. Note that some files may not be fully documented yet.