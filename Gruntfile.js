/*
**  WebSocket-Framed -- Framed WebSocket Communication
**  Copyright (c) 2017-2022 Dr. Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/* global module: true */
module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-contrib-clean")
    grunt.loadNpmTasks("grunt-browserify")
    grunt.loadNpmTasks("grunt-eslint")
    grunt.loadNpmTasks("grunt-babel")
    grunt.initConfig({
        eslint: {
            options: {
                overrideConfigFile: "eslint.yaml"
            },
            "gruntfile": [ "Gruntfile.js" ],
            "websocket-framed": [ "src/**/*.js" ]
        },
        browserify: {
            "websocket-framed-browser": {
                files: {
                    "lib/websocket-framed.browser.js": [ "src/websocket-framed.js" ]
                },
                options: {
                    transform: [
                        [ "babelify", {
                            presets: [
                                [ "@babel/preset-env", {
                                    "targets": {
                                        "browsers": "last 2 versions, > 1%, ie 11"
                                    }
                                } ]
                            ],
                            plugins: [ [ "@babel/transform-runtime", {
                                "helpers":     false,
                                "regenerator": false
                            } ] ]
                        } ],
                        [ "uglifyify", { sourceMap: false, global: true } ]
                    ],
                    plugin: [
                        [ "browserify-derequire" ],
                        [ "browserify-header" ]
                    ],
                    browserifyOptions: {
                        standalone: "WebSocketFramed",
                        debug: false
                    }
                }
            }
        },
        babel: {
            "websocket-framed-node": {
                files: {
                    "lib/websocket-framed.node.js": [ "src/websocket-framed.js" ]
                },
                options: {
                    sourceMap: false,
                    presets: [
                        [ "@babel/preset-env", {
                            "targets": {
                                "node": "8.0.0"
                            }
                        } ]
                    ],
                    plugins: [
                        [ "@babel/transform-runtime", {
                            "helpers":     false,
                            "regenerator": false
                        } ]
                    ]
                }
            }
        },
        clean: {
            clean: [],
            distclean: [ "node_modules" ]
        }
    })
    grunt.registerTask("default", [
        "eslint",
        "browserify:websocket-framed-browser",
        "babel:websocket-framed-node"
    ])
}

