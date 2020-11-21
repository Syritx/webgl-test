var fragmentShaderSource = 
`
precision mediump float;
varying vec3 fragColor;
void main() {
  gl_FragColor = vec4(1.0,1.0,0, 1.0);
}
`

var vertexShaderSource = 
`
precision mediump float;
attribute vec2 vertexPosition;

void main() {
    gl_Position = vec4(vertexPosition,0.0,1.0);
}
`

function start() {
    console.log("started")
    var canvas = document.getElementById("game")
    var GL = canvas.getContext('webgl')

    if (!GL) GL = canvas.getContext('experimental-webgl')
    if (!GL) {
        alert("WebGL is not supported by your browser")
        return
    }

    GL.clearColor(0.0,0.0,0.0,1.0)
    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT)

    const vertexShader = GL.createShader(GL.VERTEX_SHADER)
    const fragmentShader = GL.createShader(GL.FRAGMENT_SHADER)

    GL.shaderSource(vertexShader, vertexShaderSource)
    GL.shaderSource(fragmentShader, fragmentShaderSource)

    GL.compileShader(vertexShader)
    GL.compileShader(fragmentShader)

    const program = GL.createProgram();
    GL.attachShader(program, vertexShader)
    GL.attachShader(program, fragmentShader)
    GL.linkProgram(program)

    var triangle = [
         0.0,  0.5,
         0.5, -0.5,
        -0.5, -0.5
    ]

    var vbo = GL.createBuffer()
    GL.bindBuffer(GL.ARRAY_BUFFER, vbo)
    GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(triangle), GL.STATIC_DRAW)

    var positionAttrib = GL.getAttribLocation(program, 'vertexPosition')
    GL.vertexAttribPointer(
        positionAttrib,
        2,
        GL.FLOAT,
        GL.FALSE,
        2 * Float32Array.BYTES_PER_ELEMENT,
        0
    )

    GL.enableVertexAttribArray(positionAttrib)

    GL.useProgram(program)
    GL.drawArrays(GL.TRIANGLES, 0, 3)
}

start()