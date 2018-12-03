//Game setup

(function (exports) {
    
    exports.WEB_SOCKET_URL = "ws://145.94.222.143:3000";             //Web socket url

}(typeof exports === "undefined" ? this.Setup = {} : exports));
//If exports is undefined, we are on client, else server