
WebSocket-Framed
================

Framed WebSocket Communication for Node.js and Browser.

<p/>
<img src="https://nodei.co/npm/websocket-framed.png?downloads=true&stars=true" alt=""/>

<p/>
<img src="https://david-dm.org/rse/websocket-framed.png" alt=""/>

About
-----

This is a small JavaScript librar< for Node.js and the Browser
to encode/decode WebSocket messages to/from frames, based on the object serialization formats JavaScript
Object Notation (JSON, [RFC4627](https://tools.ietf.org/html/rfc4627)),
Concise Binary Object Representation (CBOR, [RFC7049](https://tools.ietf.org/html/rfc7049))
or [MsgPack](https://github.com/msgpack/msgpack/blob/master/spec.md).

Installation
------------

```shell
$ npm install websocket-framed
```

Usage
-----

```js
const WebSocketFramed = require("websocket-framed")

let ws  = new WebSocket(...)
let wsf = new WebSocketFramed(ws, "cbor")

wsf.on("message", (request) => {
    let { fid, rid, type, message }) = request
    let response = { type: ..., message: ... }
    wsf.send(response, request)
})

let request = { type: "REQUEST", data: ... }
wsf.send(request)
```

Application Programming Interface
---------------------------------

- `new WebSocketFramed(ws: WebSocket, codec: string = "json"): API`
  Create a new WebSocket-Framed instance for a particular communication
  with the help of the frame serialization cocdec. The supported codecs are `json`, `cbor` and `msgpack`.

- `API::on(name: string, callback: (frame: { fid, rid, type, data }) => Void): Void`
  Receive a message in case `name` is `message` in the form of a decoded frame.

- `API::send(frame: { type, data }, replyTo?: frame): Void`
  Send a message in the form of a encoded frame.
  Optionally set the `rid` of the message to the `fid` of the frame you want to replyt to.

License
-------

Copyright (c) 2017 Ralf S. Engelschall (http://engelschall.com/)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

