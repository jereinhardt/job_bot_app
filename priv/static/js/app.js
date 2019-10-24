/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../deps/phoenix/assets/js/phoenix.js":
/*!********************************************!*\
  !*** ../deps/phoenix/assets/js/phoenix.js ***!
  \********************************************/
/*! exports provided: Channel, Serializer, Socket, LongPoll, Ajax, Presence */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Channel", function() { return Channel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Serializer", function() { return Serializer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Socket", function() { return Socket; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LongPoll", function() { return LongPoll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ajax", function() { return Ajax; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Presence", function() { return Presence; });
/**
 * Phoenix Channels JavaScript client
 *
 * ## Socket Connection
 *
 * A single connection is established to the server and
 * channels are multiplexed over the connection.
 * Connect to the server using the `Socket` class:
 *
 * ```javascript
 * let socket = new Socket("/socket", {params: {userToken: "123"}})
 * socket.connect()
 * ```
 *
 * The `Socket` constructor takes the mount point of the socket,
 * the authentication params, as well as options that can be found in
 * the Socket docs, such as configuring the `LongPoll` transport, and
 * heartbeat.
 *
 * ## Channels
 *
 * Channels are isolated, concurrent processes on the server that
 * subscribe to topics and broker events between the client and server.
 * To join a channel, you must provide the topic, and channel params for
 * authorization. Here's an example chat room example where `"new_msg"`
 * events are listened for, messages are pushed to the server, and
 * the channel is joined with ok/error/timeout matches:
 *
 * ```javascript
 * let channel = socket.channel("room:123", {token: roomToken})
 * channel.on("new_msg", msg => console.log("Got message", msg) )
 * $input.onEnter( e => {
 *   channel.push("new_msg", {body: e.target.val}, 10000)
 *     .receive("ok", (msg) => console.log("created message", msg) )
 *     .receive("error", (reasons) => console.log("create failed", reasons) )
 *     .receive("timeout", () => console.log("Networking issue...") )
 * })
 *
 * channel.join()
 *   .receive("ok", ({messages}) => console.log("catching up", messages) )
 *   .receive("error", ({reason}) => console.log("failed join", reason) )
 *   .receive("timeout", () => console.log("Networking issue. Still waiting..."))
 *```
 *
 * ## Joining
 *
 * Creating a channel with `socket.channel(topic, params)`, binds the params to
 * `channel.params`, which are sent up on `channel.join()`.
 * Subsequent rejoins will send up the modified params for
 * updating authorization params, or passing up last_message_id information.
 * Successful joins receive an "ok" status, while unsuccessful joins
 * receive "error".
 *
 * ## Duplicate Join Subscriptions
 *
 * While the client may join any number of topics on any number of channels,
 * the client may only hold a single subscription for each unique topic at any
 * given time. When attempting to create a duplicate subscription,
 * the server will close the existing channel, log a warning, and
 * spawn a new channel for the topic. The client will have their
 * `channel.onClose` callbacks fired for the existing channel, and the new
 * channel join will have its receive hooks processed as normal.
 *
 * ## Pushing Messages
 *
 * From the previous example, we can see that pushing messages to the server
 * can be done with `channel.push(eventName, payload)` and we can optionally
 * receive responses from the push. Additionally, we can use
 * `receive("timeout", callback)` to abort waiting for our other `receive` hooks
 *  and take action after some period of waiting. The default timeout is 10000ms.
 *
 *
 * ## Socket Hooks
 *
 * Lifecycle events of the multiplexed connection can be hooked into via
 * `socket.onError()` and `socket.onClose()` events, ie:
 *
 * ```javascript
 * socket.onError( () => console.log("there was an error with the connection!") )
 * socket.onClose( () => console.log("the connection dropped") )
 * ```
 *
 *
 * ## Channel Hooks
 *
 * For each joined channel, you can bind to `onError` and `onClose` events
 * to monitor the channel lifecycle, ie:
 *
 * ```javascript
 * channel.onError( () => console.log("there was an error!") )
 * channel.onClose( () => console.log("the channel has gone away gracefully") )
 * ```
 *
 * ### onError hooks
 *
 * `onError` hooks are invoked if the socket connection drops, or the channel
 * crashes on the server. In either case, a channel rejoin is attempted
 * automatically in an exponential backoff manner.
 *
 * ### onClose hooks
 *
 * `onClose` hooks are invoked only in two cases. 1) the channel explicitly
 * closed on the server, or 2). The client explicitly closed, by calling
 * `channel.leave()`
 *
 *
 * ## Presence
 *
 * The `Presence` object provides features for syncing presence information
 * from the server with the client and handling presences joining and leaving.
 *
 * ### Syncing state from the server
 *
 * To sync presence state from the server, first instantiate an object and
 * pass your channel in to track lifecycle events:
 *
 * ```javascript
 * let channel = socket.channel("some:topic")
 * let presence = new Presence(channel)
 * ```
 *
 * Next, use the `presence.onSync` callback to react to state changes
 * from the server. For example, to render the list of users every time
 * the list changes, you could write:
 *
 * ```javascript
 * presence.onSync(() => {
 *   myRenderUsersFunction(presence.list())
 * })
 * ```
 *
 * ### Listing Presences
 *
 * `presence.list` is used to return a list of presence information
 * based on the local state of metadata. By default, all presence
 * metadata is returned, but a `listBy` function can be supplied to
 * allow the client to select which metadata to use for a given presence.
 * For example, you may have a user online from different devices with
 * a metadata status of "online", but they have set themselves to "away"
 * on another device. In this case, the app may choose to use the "away"
 * status for what appears on the UI. The example below defines a `listBy`
 * function which prioritizes the first metadata which was registered for
 * each user. This could be the first tab they opened, or the first device
 * they came online from:
 *
 * ```javascript
 * let listBy = (id, {metas: [first, ...rest]}) => {
 *   first.count = rest.length + 1 // count of this user's presences
 *   first.id = id
 *   return first
 * }
 * let onlineUsers = presence.list(listBy)
 * ```
 *
 * ### Handling individual presence join and leave events
 *
 * The `presence.onJoin` and `presence.onLeave` callbacks can be used to
 * react to individual presences joining and leaving the app. For example:
 *
 * ```javascript
 * let presence = new Presence(channel)
 *
 * // detect if user has joined for the 1st time or from another tab/device
 * presence.onJoin((id, current, newPres) => {
 *   if(!current){
 *     console.log("user has entered for the first time", newPres)
 *   } else {
 *     console.log("user additional presence", newPres)
 *   }
 * })
 *
 * // detect if user has left from all tabs/devices, or is still present
 * presence.onLeave((id, current, leftPres) => {
 *   if(current.metas.length === 0){
 *     console.log("user has left from all devices", leftPres)
 *   } else {
 *     console.log("user left from a device", leftPres)
 *   }
 * })
 * // receive presence data from server
 * presence.onSync(() => {
 *   displayUsers(presence.list())
 * })
 * ```
 * @module phoenix
 */

const globalSelf = typeof self !== "undefined" ? self : null
const phxWindow = typeof window !== "undefined" ? window : null
const global = globalSelf || phxWindow || undefined
const DEFAULT_VSN = "2.0.0"
const SOCKET_STATES = {connecting: 0, open: 1, closing: 2, closed: 3}
const DEFAULT_TIMEOUT = 10000
const WS_CLOSE_NORMAL = 1000
const CHANNEL_STATES = {
  closed: "closed",
  errored: "errored",
  joined: "joined",
  joining: "joining",
  leaving: "leaving",
}
const CHANNEL_EVENTS = {
  close: "phx_close",
  error: "phx_error",
  join: "phx_join",
  reply: "phx_reply",
  leave: "phx_leave"
}
const CHANNEL_LIFECYCLE_EVENTS = [
  CHANNEL_EVENTS.close,
  CHANNEL_EVENTS.error,
  CHANNEL_EVENTS.join,
  CHANNEL_EVENTS.reply,
  CHANNEL_EVENTS.leave
]
const TRANSPORTS = {
  longpoll: "longpoll",
  websocket: "websocket"
}

// wraps value in closure or returns closure
let closure = (value) => {
  if(typeof value === "function"){
    return value
  } else {
    let closure = function(){ return value }
    return closure
  }
}

/**
 * Initializes the Push
 * @param {Channel} channel - The Channel
 * @param {string} event - The event, for example `"phx_join"`
 * @param {Object} payload - The payload, for example `{user_id: 123}`
 * @param {number} timeout - The push timeout in milliseconds
 */
class Push {
  constructor(channel, event, payload, timeout){
    this.channel      = channel
    this.event        = event
    this.payload      = payload || function(){ return {} }
    this.receivedResp = null
    this.timeout      = timeout
    this.timeoutTimer = null
    this.recHooks     = []
    this.sent         = false
  }

  /**
   *
   * @param {number} timeout
   */
  resend(timeout){
    this.timeout = timeout
    this.reset()
    this.send()
  }

  /**
   *
   */
  send(){ if(this.hasReceived("timeout")){ return }
    this.startTimeout()
    this.sent = true
    this.channel.socket.push({
      topic: this.channel.topic,
      event: this.event,
      payload: this.payload(),
      ref: this.ref,
      join_ref: this.channel.joinRef()
    })
  }

  /**
   *
   * @param {*} status
   * @param {*} callback
   */
  receive(status, callback){
    if(this.hasReceived(status)){
      callback(this.receivedResp.response)
    }

    this.recHooks.push({status, callback})
    return this
  }

  /**
   * @private
   */
  reset(){
    this.cancelRefEvent()
    this.ref          = null
    this.refEvent     = null
    this.receivedResp = null
    this.sent         = false
  }

  /**
   * @private
   */
  matchReceive({status, response, ref}){
    this.recHooks.filter( h => h.status === status )
                 .forEach( h => h.callback(response) )
  }

  /**
   * @private
   */
  cancelRefEvent(){ if(!this.refEvent){ return }
    this.channel.off(this.refEvent)
  }

  /**
   * @private
   */
  cancelTimeout(){
    clearTimeout(this.timeoutTimer)
    this.timeoutTimer = null
  }

  /**
   * @private
   */
  startTimeout(){ if(this.timeoutTimer){ this.cancelTimeout() }
    this.ref      = this.channel.socket.makeRef()
    this.refEvent = this.channel.replyEventName(this.ref)

    this.channel.on(this.refEvent, payload => {
      this.cancelRefEvent()
      this.cancelTimeout()
      this.receivedResp = payload
      this.matchReceive(payload)
    })

    this.timeoutTimer = setTimeout(() => {
      this.trigger("timeout", {})
    }, this.timeout)
  }

  /**
   * @private
   */
  hasReceived(status){
    return this.receivedResp && this.receivedResp.status === status
  }

  /**
   * @private
   */
  trigger(status, response){
    this.channel.trigger(this.refEvent, {status, response})
  }
}

/**
 *
 * @param {string} topic
 * @param {(Object|function)} params
 * @param {Socket} socket
 */
class Channel {
  constructor(topic, params, socket) {
    this.state       = CHANNEL_STATES.closed
    this.topic       = topic
    this.params      = closure(params || {})
    this.socket      = socket
    this.bindings    = []
    this.bindingRef  = 0
    this.timeout     = this.socket.timeout
    this.joinedOnce  = false
    this.joinPush    = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout)
    this.pushBuffer  = []

    this.rejoinTimer = new Timer(() => {
      if(this.socket.isConnected()){ this.rejoin() }
    }, this.socket.rejoinAfterMs)
    this.socket.onError(() => this.rejoinTimer.reset())
    this.socket.onOpen(() => {
      this.rejoinTimer.reset()
      if(this.isErrored()){ this.rejoin() }
    })
    this.joinPush.receive("ok", () => {
      this.state = CHANNEL_STATES.joined
      this.rejoinTimer.reset()
      this.pushBuffer.forEach( pushEvent => pushEvent.send() )
      this.pushBuffer = []
    })
    this.joinPush.receive("error", () => {
      this.state = CHANNEL_STATES.errored
      if(this.socket.isConnected()){ this.rejoinTimer.scheduleTimeout() }
    })
    this.onClose(() => {
      this.rejoinTimer.reset()
      if(this.socket.hasLogger()) this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`)
      this.state = CHANNEL_STATES.closed
      this.socket.remove(this)
    })
    this.onError(reason => {
      if(this.socket.hasLogger()) this.socket.log("channel", `error ${this.topic}`, reason)
      if(this.isJoining()){ this.joinPush.reset() }
      this.state = CHANNEL_STATES.errored
      if(this.socket.isConnected()){ this.rejoinTimer.scheduleTimeout() }
    })
    this.joinPush.receive("timeout", () => {
      if(this.socket.hasLogger()) this.socket.log("channel", `timeout ${this.topic} (${this.joinRef()})`, this.joinPush.timeout)
      let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), this.timeout)
      leavePush.send()
      this.state = CHANNEL_STATES.errored
      this.joinPush.reset()
      if(this.socket.isConnected()){ this.rejoinTimer.scheduleTimeout() }
    })
    this.on(CHANNEL_EVENTS.reply, (payload, ref) => {
      this.trigger(this.replyEventName(ref), payload)
    })
  }

  /**
   * Join the channel
   * @param {integer} timeout
   * @returns {Push}
   */
  join(timeout = this.timeout){
    if(this.joinedOnce){
      throw new Error(`tried to join multiple times. 'join' can only be called a single time per channel instance`)
    } else {
      this.timeout = timeout
      this.joinedOnce = true
      this.rejoin()
      return this.joinPush
    }
  }

  /**
   * Hook into channel close
   * @param {Function} callback
   */
  onClose(callback){
    this.on(CHANNEL_EVENTS.close, callback)
  }

  /**
   * Hook into channel errors
   * @param {Function} callback
   */
  onError(callback){
    return this.on(CHANNEL_EVENTS.error, reason => callback(reason))
  }

  /**
   * Subscribes on channel events
   *
   * Subscription returns a ref counter, which can be used later to
   * unsubscribe the exact event listener
   *
   * @example
   * const ref1 = channel.on("event", do_stuff)
   * const ref2 = channel.on("event", do_other_stuff)
   * channel.off("event", ref1)
   * // Since unsubscription, do_stuff won't fire,
   * // while do_other_stuff will keep firing on the "event"
   *
   * @param {string} event
   * @param {Function} callback
   * @returns {integer} ref
   */
  on(event, callback){
    let ref = this.bindingRef++
    this.bindings.push({event, ref, callback})
    return ref
  }

  /**
   * @param {string} event
   * @param {integer} ref
   */
  off(event, ref){
    this.bindings = this.bindings.filter((bind) => {
      return !(bind.event === event && (typeof ref === "undefined" || ref === bind.ref))
    })
  }

  /**
   * @private
   */
  canPush(){ return this.socket.isConnected() && this.isJoined() }

  /**
   * @param {string} event
   * @param {Object} payload
   * @param {number} [timeout]
   * @returns {Push}
   */
  push(event, payload, timeout = this.timeout){
    if(!this.joinedOnce){
      throw new Error(`tried to push '${event}' to '${this.topic}' before joining. Use channel.join() before pushing events`)
    }
    let pushEvent = new Push(this, event, function(){ return payload }, timeout)
    if(this.canPush()){
      pushEvent.send()
    } else {
      pushEvent.startTimeout()
      this.pushBuffer.push(pushEvent)
    }

    return pushEvent
  }

  /** Leaves the channel
   *
   * Unsubscribes from server events, and
   * instructs channel to terminate on server
   *
   * Triggers onClose() hooks
   *
   * To receive leave acknowledgements, use the a `receive`
   * hook to bind to the server ack, ie:
   *
   * @example
   * channel.leave().receive("ok", () => alert("left!") )
   *
   * @param {integer} timeout
   * @returns {Push}
   */
  leave(timeout = this.timeout){
    this.rejoinTimer.reset()
    this.joinPush.cancelTimeout()

    this.state = CHANNEL_STATES.leaving
    let onClose = () => {
      if(this.socket.hasLogger()) this.socket.log("channel", `leave ${this.topic}`)
      this.trigger(CHANNEL_EVENTS.close, "leave")
    }
    let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), timeout)
    leavePush.receive("ok", () => onClose() )
             .receive("timeout", () => onClose() )
    leavePush.send()
    if(!this.canPush()){ leavePush.trigger("ok", {}) }

    return leavePush
  }

  /**
   * Overridable message hook
   *
   * Receives all events for specialized message handling
   * before dispatching to the channel callbacks.
   *
   * Must return the payload, modified or unmodified
   * @param {string} event
   * @param {Object} payload
   * @param {integer} ref
   * @returns {Object}
   */
  onMessage(event, payload, ref){ return payload }

  /**
   * @private
   */
  isLifecycleEvent(event) { return CHANNEL_LIFECYCLE_EVENTS.indexOf(event) >= 0 }

  /**
   * @private
   */
  isMember(topic, event, payload, joinRef){
    if(this.topic !== topic){ return false }

    if(joinRef && joinRef !== this.joinRef() && this.isLifecycleEvent(event)){
      if (this.socket.hasLogger()) this.socket.log("channel", "dropping outdated message", {topic, event, payload, joinRef})
      return false
    } else {
      return true
    }
  }

  /**
   * @private
   */
  joinRef(){ return this.joinPush.ref }

  /**
   * @private
   */
  sendJoin(timeout){
    this.state = CHANNEL_STATES.joining
    this.joinPush.resend(timeout)
  }

  /**
   * @private
   */
  rejoin(timeout = this.timeout){ if(this.isLeaving()){ return }
    this.sendJoin(timeout)
  }

  /**
   * @private
   */
  trigger(event, payload, ref, joinRef){
    let handledPayload = this.onMessage(event, payload, ref, joinRef)
    if(payload && !handledPayload){ throw new Error("channel onMessage callbacks must return the payload, modified or unmodified") }

    for (let i = 0; i < this.bindings.length; i++) {
      const bind = this.bindings[i]
      if(bind.event !== event){ continue }
      bind.callback(handledPayload, ref, joinRef || this.joinRef())
    }
  }

  /**
   * @private
   */
  replyEventName(ref){ return `chan_reply_${ref}` }

  /**
   * @private
   */
  isClosed() { return this.state === CHANNEL_STATES.closed }

  /**
   * @private
   */
  isErrored(){ return this.state === CHANNEL_STATES.errored }

  /**
   * @private
   */
  isJoined() { return this.state === CHANNEL_STATES.joined }

  /**
   * @private
   */
  isJoining(){ return this.state === CHANNEL_STATES.joining }

  /**
   * @private
   */
  isLeaving(){ return this.state === CHANNEL_STATES.leaving }
}

/* The default serializer for encoding and decoding messages */
let Serializer = {
  encode(msg, callback){
    let payload = [
      msg.join_ref, msg.ref, msg.topic, msg.event, msg.payload
    ]
    return callback(JSON.stringify(payload))
  },

  decode(rawPayload, callback){
    let [join_ref, ref, topic, event, payload] = JSON.parse(rawPayload)

    return callback({join_ref, ref, topic, event, payload})
  }
}


/** Initializes the Socket
 *
 *
 * For IE8 support use an ES5-shim (https://github.com/es-shims/es5-shim)
 *
 * @param {string} endPoint - The string WebSocket endpoint, ie, `"ws://example.com/socket"`,
 *                                               `"wss://example.com"`
 *                                               `"/socket"` (inherited host & protocol)
 * @param {Object} [opts] - Optional configuration
 * @param {string} [opts.transport] - The Websocket Transport, for example WebSocket or Phoenix.LongPoll.
 *
 * Defaults to WebSocket with automatic LongPoll fallback.
 * @param {Function} [opts.encode] - The function to encode outgoing messages.
 *
 * Defaults to JSON encoder.
 *
 * @param {Function} [opts.decode] - The function to decode incoming messages.
 *
 * Defaults to JSON:
 *
 * ```javascript
 * (payload, callback) => callback(JSON.parse(payload))
 * ```
 *
 * @param {number} [opts.timeout] - The default timeout in milliseconds to trigger push timeouts.
 *
 * Defaults `DEFAULT_TIMEOUT`
 * @param {number} [opts.heartbeatIntervalMs] - The millisec interval to send a heartbeat message
 * @param {number} [opts.reconnectAfterMs] - The optional function that returns the millsec
 * socket reconnect interval.
 *
 * Defaults to stepped backoff of:
 *
 * ```javascript
 * function(tries){
 *   return [10, 50, 100, 150, 200, 250, 500, 1000, 2000][tries - 1] || 5000
 * }
 * ````
 *
 * @param {number} [opts.rejoinAfterMs] - The optional function that returns the millsec
 * rejoin interval for individual channels.
 *
 * ```javascript
 * function(tries){
 *   return [1000, 2000, 5000][tries - 1] || 10000
 * }
 * ````
 *
 * @param {Function} [opts.logger] - The optional function for specialized logging, ie:
 *
 * ```javascript
 * function(kind, msg, data) {
 *   console.log(`${kind}: ${msg}`, data)
 * }
 * ```
 *
 * @param {number} [opts.longpollerTimeout] - The maximum timeout of a long poll AJAX request.
 *
 * Defaults to 20s (double the server long poll timer).
 *
 * @param {{Object|function)} [opts.params] - The optional params to pass when connecting
 * @param {string} [opts.binaryType] - The binary type to use for binary WebSocket frames.
 *
 * Defaults to "arraybuffer"
 *
 * @param {vsn} [opts.vsn] - The serializer's protocol version to send on connect.
 *
 * Defaults to DEFAULT_VSN.
*/
class Socket {
  constructor(endPoint, opts = {}){
    this.stateChangeCallbacks = {open: [], close: [], error: [], message: []}
    this.channels             = []
    this.sendBuffer           = []
    this.ref                  = 0
    this.timeout              = opts.timeout || DEFAULT_TIMEOUT
    this.transport            = opts.transport || global.WebSocket || LongPoll
    this.defaultEncoder       = Serializer.encode
    this.defaultDecoder       = Serializer.decode
    this.closeWasClean        = false
    this.unloaded             = false
    this.binaryType           = opts.binaryType || "arraybuffer"
    if(this.transport !== LongPoll){
      this.encode = opts.encode || this.defaultEncoder
      this.decode = opts.decode || this.defaultDecoder
    } else {
      this.encode = this.defaultEncoder
      this.decode = this.defaultDecoder
    }
    if(phxWindow && phxWindow.addEventListener){
      phxWindow.addEventListener("beforeunload", e => {
        if(this.conn){
          this.unloaded = true
          this.abnormalClose("unloaded")
        }
      })
    }
    this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 30000
    this.rejoinAfterMs = (tries) => {
      if(opts.rejoinAfterMs){
        return opts.rejoinAfterMs(tries)
      } else {
        return [1000, 2000, 5000][tries - 1] || 10000
      }
    }
    this.reconnectAfterMs = (tries) => {
      if(this.unloaded){ return 100 }
      if(opts.reconnectAfterMs){
        return opts.reconnectAfterMs(tries)
      } else {
        return [10, 50, 100, 150, 200, 250, 500, 1000, 2000][tries - 1] || 5000
      }
    }
    this.logger               = opts.logger || null
    this.longpollerTimeout    = opts.longpollerTimeout || 20000
    this.params               = closure(opts.params || {})
    this.endPoint             = `${endPoint}/${TRANSPORTS.websocket}`
    this.vsn                  = opts.vsn || DEFAULT_VSN
    this.heartbeatTimer       = null
    this.pendingHeartbeatRef  = null
    this.reconnectTimer       = new Timer(() => {
      this.teardown(() => this.connect())
    }, this.reconnectAfterMs)
  }

  /**
   * Returns the socket protocol
   *
   * @returns {string}
   */
  protocol(){ return location.protocol.match(/^https/) ? "wss" : "ws" }

  /**
   * The fully qualifed socket url
   *
   * @returns {string}
   */
  endPointURL(){
    let uri = Ajax.appendParams(
      Ajax.appendParams(this.endPoint, this.params()), {vsn: this.vsn})
    if(uri.charAt(0) !== "/"){ return uri }
    if(uri.charAt(1) === "/"){ return `${this.protocol()}:${uri}` }

    return `${this.protocol()}://${location.host}${uri}`
  }

  /**
   * Disconnects the socket
   *
   * See https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes for valid status codes.
   *
   * @param {Function} callback - Optional callback which is called after socket is disconnected.
   * @param {integer} code - A status code for disconnection (Optional).
   * @param {string} reason - A textual description of the reason to disconnect. (Optional)
   */
  disconnect(callback, code, reason){
    this.closeWasClean = true
    this.reconnectTimer.reset()
    this.teardown(callback, code, reason)
  }

  /**
   *
   * @param {Object} params - The params to send when connecting, for example `{user_id: userToken}`
   *
   * Passing params to connect is deprecated; pass them in the Socket constructor instead:
   * `new Socket("/socket", {params: {user_id: userToken}})`.
   */
  connect(params){
    if(params){
      console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor")
      this.params = closure(params)
    }
    if(this.conn){ return }
    this.closeWasClean = false
    this.conn = new this.transport(this.endPointURL())
    this.conn.binaryType = this.binaryType
    this.conn.timeout    = this.longpollerTimeout
    this.conn.onopen     = () => this.onConnOpen()
    this.conn.onerror    = error => this.onConnError(error)
    this.conn.onmessage  = event => this.onConnMessage(event)
    this.conn.onclose    = event => this.onConnClose(event)
  }

  /**
   * Logs the message. Override `this.logger` for specialized logging. noops by default
   * @param {string} kind
   * @param {string} msg
   * @param {Object} data
   */
  log(kind, msg, data){ this.logger(kind, msg, data) }

  /**
   * Returns true if a logger has been set on this socket.
   */
  hasLogger(){ return this.logger !== null }

  /**
   * Registers callbacks for connection open events
   *
   * @example socket.onOpen(function(){ console.info("the socket was opened") })
   *
   * @param {Function} callback
   */
  onOpen(callback){ this.stateChangeCallbacks.open.push(callback) }

  /**
   * Registers callbacks for connection close events
   * @param {Function} callback
   */
  onClose(callback){ this.stateChangeCallbacks.close.push(callback) }

  /**
   * Registers callbacks for connection error events
   *
   * @example socket.onError(function(error){ alert("An error occurred") })
   *
   * @param {Function} callback
   */
  onError(callback){ this.stateChangeCallbacks.error.push(callback) }

  /**
   * Registers callbacks for connection message events
   * @param {Function} callback
   */
  onMessage(callback){ this.stateChangeCallbacks.message.push(callback) }

  /**
   * @private
   */
  onConnOpen(){
    if (this.hasLogger()) this.log("transport", `connected to ${this.endPointURL()}`)
    this.unloaded = false
    this.closeWasClean = false
    this.flushSendBuffer()
    this.reconnectTimer.reset()
    this.resetHeartbeat()
    this.stateChangeCallbacks.open.forEach( callback => callback() )
  }

  /**
   * @private
   */

  resetHeartbeat(){ if(this.conn && this.conn.skipHeartbeat){ return }
    this.pendingHeartbeatRef = null
    clearInterval(this.heartbeatTimer)
    this.heartbeatTimer = setInterval(() => this.sendHeartbeat(), this.heartbeatIntervalMs)
  }

  teardown(callback, code, reason){
    if(this.conn){
      this.conn.onclose = function(){} // noop
      if(code){ this.conn.close(code, reason || "") } else { this.conn.close() }
      this.conn = null
    }
    callback && callback()
  }

  onConnClose(event){
    if (this.hasLogger()) this.log("transport", "close", event)
    this.triggerChanError()
    clearInterval(this.heartbeatTimer)
    if(!this.closeWasClean){
      this.reconnectTimer.scheduleTimeout()
    }
    this.stateChangeCallbacks.close.forEach( callback => callback(event) )
  }

  /**
   * @private
   */
  onConnError(error){
    if (this.hasLogger()) this.log("transport", error)
    this.triggerChanError()
    this.stateChangeCallbacks.error.forEach( callback => callback(error) )
  }

  /**
   * @private
   */
  triggerChanError(){
    this.channels.forEach( channel => {
      if(!(channel.isErrored() || channel.isLeaving() || channel.isClosed())){
        channel.trigger(CHANNEL_EVENTS.error)
      }
    })
  }

  /**
   * @returns {string}
   */
  connectionState(){
    switch(this.conn && this.conn.readyState){
      case SOCKET_STATES.connecting: return "connecting"
      case SOCKET_STATES.open:       return "open"
      case SOCKET_STATES.closing:    return "closing"
      default:                       return "closed"
    }
  }

  /**
   * @returns {boolean}
   */
  isConnected(){ return this.connectionState() === "open" }

  /**
   * @param {Channel}
   */
  remove(channel){
    this.channels = this.channels.filter(c => c.joinRef() !== channel.joinRef())
  }

  /**
   * Initiates a new channel for the given topic
   *
   * @param {string} topic
   * @param {Object} chanParams - Parameters for the channel
   * @returns {Channel}
   */
  channel(topic, chanParams = {}){
    let chan = new Channel(topic, chanParams, this)
    this.channels.push(chan)
    return chan
  }

  /**
   * @param {Object} data
   */
  push(data){
    if (this.hasLogger()) {
      let {topic, event, payload, ref, join_ref} = data
      this.log("push", `${topic} ${event} (${join_ref}, ${ref})`, payload)
    }

    if(this.isConnected()){
      this.encode(data, result => this.conn.send(result))
    } else {
      this.sendBuffer.push(() => this.encode(data, result => this.conn.send(result)))
    }
  }

  /**
   * Return the next message ref, accounting for overflows
   * @returns {string}
   */
  makeRef(){
    let newRef = this.ref + 1
    if(newRef === this.ref){ this.ref = 0 } else { this.ref = newRef }

    return this.ref.toString()
  }

  sendHeartbeat(){ if(!this.isConnected()){ return }
    if(this.pendingHeartbeatRef){
      this.pendingHeartbeatRef = null
      if (this.hasLogger()) this.log("transport", "heartbeat timeout. Attempting to re-establish connection")
      this.abnormalClose("heartbeat timeout")
      return
    }
    this.pendingHeartbeatRef = this.makeRef()
    this.push({topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef})
  }

  abnormalClose(reason){
    this.closeWasClean = false
    this.conn.close(WS_CLOSE_NORMAL, reason)
  }

  flushSendBuffer(){
    if(this.isConnected() && this.sendBuffer.length > 0){
      this.sendBuffer.forEach( callback => callback() )
      this.sendBuffer = []
    }
  }

  onConnMessage(rawMessage){
    this.decode(rawMessage.data, msg => {
      let {topic, event, payload, ref, join_ref} = msg
      if(ref && ref === this.pendingHeartbeatRef){ this.pendingHeartbeatRef = null }

      if (this.hasLogger()) this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload)

      for (let i = 0; i < this.channels.length; i++) {
        const channel = this.channels[i]
        if(!channel.isMember(topic, event, payload, join_ref)){ continue }
        channel.trigger(event, payload, ref, join_ref)
      }

      for (let i = 0; i < this.stateChangeCallbacks.message.length; i++) {
        this.stateChangeCallbacks.message[i](msg)
      }
    })
  }
}


class LongPoll {

  constructor(endPoint){
    this.endPoint        = null
    this.token           = null
    this.skipHeartbeat   = true
    this.onopen          = function(){} // noop
    this.onerror         = function(){} // noop
    this.onmessage       = function(){} // noop
    this.onclose         = function(){} // noop
    this.pollEndpoint    = this.normalizeEndpoint(endPoint)
    this.readyState      = SOCKET_STATES.connecting

    this.poll()
  }

  normalizeEndpoint(endPoint){
    return(endPoint
      .replace("ws://", "http://")
      .replace("wss://", "https://")
      .replace(new RegExp("(.*)\/" + TRANSPORTS.websocket), "$1/" + TRANSPORTS.longpoll))
  }

  endpointURL(){
    return Ajax.appendParams(this.pollEndpoint, {token: this.token})
  }

  closeAndRetry(){
    this.close()
    this.readyState = SOCKET_STATES.connecting
  }

  ontimeout(){
    this.onerror("timeout")
    this.closeAndRetry()
  }

  poll(){
    if(!(this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting)){ return }

    Ajax.request("GET", this.endpointURL(), "application/json", null, this.timeout, this.ontimeout.bind(this), (resp) => {
      if(resp){
        var {status, token, messages} = resp
        this.token = token
      } else{
        var status = 0
      }

      switch(status){
        case 200:
          messages.forEach(msg => this.onmessage({data: msg}))
          this.poll()
          break
        case 204:
          this.poll()
          break
        case 410:
          this.readyState = SOCKET_STATES.open
          this.onopen()
          this.poll()
          break
        case 0:
        case 500:
          this.onerror()
          this.closeAndRetry()
          break
        default: throw new Error(`unhandled poll status ${status}`)
      }
    })
  }

  send(body){
    Ajax.request("POST", this.endpointURL(), "application/json", body, this.timeout, this.onerror.bind(this, "timeout"), (resp) => {
      if(!resp || resp.status !== 200){
        this.onerror(resp && resp.status)
        this.closeAndRetry()
      }
    })
  }

  close(code, reason){
    this.readyState = SOCKET_STATES.closed
    this.onclose()
  }
}

class Ajax {

  static request(method, endPoint, accept, body, timeout, ontimeout, callback){
    if(global.XDomainRequest){
      let req = new XDomainRequest() // IE8, IE9
      this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback)
    } else {
      let req = global.XMLHttpRequest ?
                  new global.XMLHttpRequest() : // IE7+, Firefox, Chrome, Opera, Safari
                  new ActiveXObject("Microsoft.XMLHTTP") // IE6, IE5
      this.xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback)
    }
  }

  static xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback){
    req.timeout = timeout
    req.open(method, endPoint)
    req.onload = () => {
      let response = this.parseJSON(req.responseText)
      callback && callback(response)
    }
    if(ontimeout){ req.ontimeout = ontimeout }

    // Work around bug in IE9 that requires an attached onprogress handler
    req.onprogress = () => {}

    req.send(body)
  }

  static xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback){
    req.open(method, endPoint, true)
    req.timeout = timeout
    req.setRequestHeader("Content-Type", accept)
    req.onerror = () => { callback && callback(null) }
    req.onreadystatechange = () => {
      if(req.readyState === this.states.complete && callback){
        let response = this.parseJSON(req.responseText)
        callback(response)
      }
    }
    if(ontimeout){ req.ontimeout = ontimeout }

    req.send(body)
  }

  static parseJSON(resp){
    if(!resp || resp === ""){ return null }

    try {
      return JSON.parse(resp)
    } catch(e) {
      console && console.log("failed to parse JSON response", resp)
      return null
    }
  }

  static serialize(obj, parentKey){
    let queryStr = []
    for(var key in obj){ if(!obj.hasOwnProperty(key)){ continue }
      let paramKey = parentKey ? `${parentKey}[${key}]` : key
      let paramVal = obj[key]
      if(typeof paramVal === "object"){
        queryStr.push(this.serialize(paramVal, paramKey))
      } else {
        queryStr.push(encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal))
      }
    }
    return queryStr.join("&")
  }

  static appendParams(url, params){
    if(Object.keys(params).length === 0){ return url }

    let prefix = url.match(/\?/) ? "&" : "?"
    return `${url}${prefix}${this.serialize(params)}`
  }
}

Ajax.states = {complete: 4}

/**
 * Initializes the Presence
 * @param {Channel} channel - The Channel
 * @param {Object} opts - The options,
 *        for example `{events: {state: "state", diff: "diff"}}`
 */
class Presence {

  constructor(channel, opts = {}){
    let events = opts.events || {state: "presence_state", diff: "presence_diff"}
    this.state = {}
    this.pendingDiffs = []
    this.channel = channel
    this.joinRef = null
    this.caller = {
      onJoin: function(){},
      onLeave: function(){},
      onSync: function(){}
    }

    this.channel.on(events.state, newState => {
      let {onJoin, onLeave, onSync} = this.caller

      this.joinRef = this.channel.joinRef()
      this.state = Presence.syncState(this.state, newState, onJoin, onLeave)

      this.pendingDiffs.forEach(diff => {
        this.state = Presence.syncDiff(this.state, diff, onJoin, onLeave)
      })
      this.pendingDiffs = []
      onSync()
    })

    this.channel.on(events.diff, diff => {
      let {onJoin, onLeave, onSync} = this.caller

      if(this.inPendingSyncState()){
        this.pendingDiffs.push(diff)
      } else {
        this.state = Presence.syncDiff(this.state, diff, onJoin, onLeave)
        onSync()
      }
    })
  }

  onJoin(callback){ this.caller.onJoin = callback }

  onLeave(callback){ this.caller.onLeave = callback }

  onSync(callback){ this.caller.onSync = callback }

  list(by){ return Presence.list(this.state, by) }

  inPendingSyncState(){
    return !this.joinRef || (this.joinRef !== this.channel.joinRef())
  }

  // lower-level public static API

  /**
   * Used to sync the list of presences on the server
   * with the client's state. An optional `onJoin` and `onLeave` callback can
   * be provided to react to changes in the client's local presences across
   * disconnects and reconnects with the server.
   *
   * @returns {Presence}
   */
  static syncState(currentState, newState, onJoin, onLeave){
    let state = this.clone(currentState)
    let joins = {}
    let leaves = {}

    this.map(state, (key, presence) => {
      if(!newState[key]){
        leaves[key] = presence
      }
    })
    this.map(newState, (key, newPresence) => {
      let currentPresence = state[key]
      if(currentPresence){
        let newRefs = newPresence.metas.map(m => m.phx_ref)
        let curRefs = currentPresence.metas.map(m => m.phx_ref)
        let joinedMetas = newPresence.metas.filter(m => curRefs.indexOf(m.phx_ref) < 0)
        let leftMetas = currentPresence.metas.filter(m => newRefs.indexOf(m.phx_ref) < 0)
        if(joinedMetas.length > 0){
          joins[key] = newPresence
          joins[key].metas = joinedMetas
        }
        if(leftMetas.length > 0){
          leaves[key] = this.clone(currentPresence)
          leaves[key].metas = leftMetas
        }
      } else {
        joins[key] = newPresence
      }
    })
    return this.syncDiff(state, {joins: joins, leaves: leaves}, onJoin, onLeave)
  }

  /**
   *
   * Used to sync a diff of presence join and leave
   * events from the server, as they happen. Like `syncState`, `syncDiff`
   * accepts optional `onJoin` and `onLeave` callbacks to react to a user
   * joining or leaving from a device.
   *
   * @returns {Presence}
   */
  static syncDiff(currentState, {joins, leaves}, onJoin, onLeave){
    let state = this.clone(currentState)
    if(!onJoin){ onJoin = function(){} }
    if(!onLeave){ onLeave = function(){} }

    this.map(joins, (key, newPresence) => {
      let currentPresence = state[key]
      state[key] = newPresence
      if(currentPresence){
        let joinedRefs = state[key].metas.map(m => m.phx_ref)
        let curMetas = currentPresence.metas.filter(m => joinedRefs.indexOf(m.phx_ref) < 0)
        state[key].metas.unshift(...curMetas)
      }
      onJoin(key, currentPresence, newPresence)
    })
    this.map(leaves, (key, leftPresence) => {
      let currentPresence = state[key]
      if(!currentPresence){ return }
      let refsToRemove = leftPresence.metas.map(m => m.phx_ref)
      currentPresence.metas = currentPresence.metas.filter(p => {
        return refsToRemove.indexOf(p.phx_ref) < 0
      })
      onLeave(key, currentPresence, leftPresence)
      if(currentPresence.metas.length === 0){
        delete state[key]
      }
    })
    return state
  }

  /**
   * Returns the array of presences, with selected metadata.
   *
   * @param {Object} presences
   * @param {Function} chooser
   *
   * @returns {Presence}
   */
  static list(presences, chooser){
    if(!chooser){ chooser = function(key, pres){ return pres } }

    return this.map(presences, (key, presence) => {
      return chooser(key, presence)
    })
  }

  // private

  static map(obj, func){
    return Object.getOwnPropertyNames(obj).map(key => func(key, obj[key]))
  }

  static clone(obj){ return JSON.parse(JSON.stringify(obj)) }
}


/**
 *
 * Creates a timer that accepts a `timerCalc` function to perform
 * calculated timeout retries, such as exponential backoff.
 *
 * @example
 * let reconnectTimer = new Timer(() => this.connect(), function(tries){
 *   return [1000, 5000, 10000][tries - 1] || 10000
 * })
 * reconnectTimer.scheduleTimeout() // fires after 1000
 * reconnectTimer.scheduleTimeout() // fires after 5000
 * reconnectTimer.reset()
 * reconnectTimer.scheduleTimeout() // fires after 1000
 *
 * @param {Function} callback
 * @param {Function} timerCalc
 */
class Timer {
  constructor(callback, timerCalc){
    this.callback  = callback
    this.timerCalc = timerCalc
    this.timer     = null
    this.tries     = 0
  }

  reset(){
    this.tries = 0
    clearTimeout(this.timer)
  }

  /**
   * Cancels any previous scheduleTimeout and schedules callback
   */
  scheduleTimeout(){
    clearTimeout(this.timer)

    this.timer = setTimeout(() => {
      this.tries = this.tries + 1
      this.callback()
    }, this.timerCalc(this.tries + 1))
  }
}


/***/ }),

/***/ "../deps/phoenix_html/priv/static/phoenix_html.js":
/*!********************************************************!*\
  !*** ../deps/phoenix_html/priv/static/phoenix_html.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function() {
  var PolyfillEvent = eventConstructor();

  function eventConstructor() {
    if (typeof window.CustomEvent === "function") return window.CustomEvent;
    // IE<=9 Support
    function CustomEvent(event, params) {
      params = params || {bubbles: false, cancelable: false, detail: undefined};
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    }
    CustomEvent.prototype = window.Event.prototype;
    return CustomEvent;
  }

  function buildHiddenInput(name, value) {
    var input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    return input;
  }

  function handleClick(element) {
    var to = element.getAttribute("data-to"),
        method = buildHiddenInput("_method", element.getAttribute("data-method")),
        csrf = buildHiddenInput("_csrf_token", element.getAttribute("data-csrf")),
        form = document.createElement("form"),
        target = element.getAttribute("target");

    form.method = (element.getAttribute("data-method") === "get") ? "get" : "post";
    form.action = to;
    form.style.display = "hidden";

    if (target) form.target = target;

    form.appendChild(csrf);
    form.appendChild(method);
    document.body.appendChild(form);
    form.submit();
  }

  window.addEventListener("click", function(e) {
    var element = e.target;

    while (element && element.getAttribute) {
      var phoenixLinkEvent = new PolyfillEvent('phoenix.link.click', {
        "bubbles": true, "cancelable": true
      });

      if (!element.dispatchEvent(phoenixLinkEvent)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
      }

      if (element.getAttribute("data-method")) {
        handleClick(element);
        e.preventDefault();
        return false;
      } else {
        element = element.parentNode;
      }
    }
  }, false);

  window.addEventListener('phoenix.link.click', function (e) {
    var message = e.target.getAttribute("data-confirm");
    if(message && !window.confirm(message)) {
      e.preventDefault();
    }
  }, false);
})();


/***/ }),

/***/ "./css/app.scss":
/*!**********************!*\
  !*** ./css/app.scss ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var phoenix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phoenix */ "../deps/phoenix/assets/js/phoenix.js");
/* harmony import */ var phoenix_live_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! phoenix_live_view */ "./node_modules/phoenix_live_view/priv/static/phoenix_live_view.js");
/* harmony import */ var phoenix_live_view__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(phoenix_live_view__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _deps_phoenix_html_priv_static_phoenix_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../deps/phoenix_html/priv/static/phoenix_html */ "../deps/phoenix_html/priv/static/phoenix_html.js");
/* harmony import */ var _deps_phoenix_html_priv_static_phoenix_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_deps_phoenix_html_priv_static_phoenix_html__WEBPACK_IMPORTED_MODULE_2__);




var liveSocket = new phoenix_live_view__WEBPACK_IMPORTED_MODULE_1___default.a("/live", phoenix__WEBPACK_IMPORTED_MODULE_0__["Socket"]);
liveSocket.connect();

var navToggle = document.querySelector("[data-navigation-toggle]");

var toggleNavigation = function toggleNavigation(event) {
  console.log(event);
  event.preventDefault();
  var itemsContainer = document.querySelector("[data-navigation-items-container]");
  itemsContainer.classList.toggle("expanded");
  if (navToggle.getAttribute("aria-expanded") === "true") {
    navToggle.setAttribute("aria-expanded", false);
  } else {
    navToggle.setAttribute("aria-expanded", true);
  }
};

navToggle.addEventListener("click", toggleNavigation);

var flashCloseButtons = document.querySelectorAll("[data-flash-remove]");
var removeFlashMessage = function removeFlashMessage(event) {
  event.preventDefault();
  var button = event.target;
  var flashName = button.dataset.flashRemove;
  var flashMessage = document.querySelector("[data-flash-message=\"" + flashName + "\"]").remove();
};

flashCloseButtons.forEach(function (elem) {
  return elem.addEventListener("click", removeFlashMessage);
});

/***/ }),

/***/ "./node_modules/phoenix_live_view/priv/static/phoenix_live_view.js":
/*!*************************************************************************!*\
  !*** ./node_modules/phoenix_live_view/priv/static/phoenix_live_view.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():undefined}(this,function(){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";var i;n.r(t);var r="http://www.w3.org/1999/xhtml",o="undefined"==typeof document?void 0:document,a=!!o&&"content"in o.createElement("template"),u=!!o&&o.createRange&&"createContextualFragment"in o.createRange();function s(e){return a?function(e){var t=o.createElement("template");return t.innerHTML=e,t.content.childNodes[0]}(e):u?function(e){return i||(i=o.createRange()).selectNode(o.body),i.createContextualFragment(e).childNodes[0]}(e):function(e){var t=o.createElement("body");return t.innerHTML=e,t.childNodes[0]}(e)}function c(e,t){var n=e.nodeName,i=t.nodeName;return n===i||!!(t.actualize&&n.charCodeAt(0)<91&&i.charCodeAt(0)>90)&&n===i.toUpperCase()}function l(e,t,n){e[n]!==t[n]&&(e[n]=t[n],e[n]?e.setAttribute(n,""):e.removeAttribute(n))}var d={OPTION:function(e,t){var n=e.parentNode;if(n){var i=n.nodeName.toUpperCase();"OPTGROUP"===i&&(i=(n=n.parentNode)&&n.nodeName.toUpperCase()),"SELECT"!==i||n.hasAttribute("multiple")||(e.hasAttribute("selected")&&!t.selected&&(e.setAttribute("selected","selected"),e.removeAttribute("selected")),n.selectedIndex=-1)}l(e,t,"selected")},INPUT:function(e,t){l(e,t,"checked"),l(e,t,"disabled"),e.value!==t.value&&(e.value=t.value),t.hasAttribute("value")||e.removeAttribute("value")},TEXTAREA:function(e,t){var n=t.value;e.value!==n&&(e.value=n);var i=e.firstChild;if(i){var r=i.nodeValue;if(r==n||!n&&r==e.placeholder)return;i.nodeValue=n}},SELECT:function(e,t){if(!t.hasAttribute("multiple")){for(var n,i,r=-1,o=0,a=e.firstChild;a;)if("OPTGROUP"===(i=a.nodeName&&a.nodeName.toUpperCase()))a=(n=a).firstChild;else{if("OPTION"===i){if(a.hasAttribute("selected")){r=o;break}o++}!(a=a.nextSibling)&&n&&(a=n.nextSibling,n=null)}e.selectedIndex=r}}},h=1,f=11,v=3,p=8;function y(){}function g(e){return e.id}var m=function(e){return function(t,n,i){if(i||(i={}),"string"==typeof n)if("#document"===t.nodeName||"HTML"===t.nodeName){var a=n;(n=o.createElement("html")).innerHTML=a}else n=s(n);var u,l=i.getNodeKey||g,m=i.onBeforeNodeAdded||y,k=i.onNodeAdded||y,b=i.onBeforeElUpdated||y,w=i.onElUpdated||y,x=i.onBeforeNodeDiscarded||y,E=i.onNodeDiscarded||y,A=i.onBeforeElChildrenUpdated||y,S=!0===i.childrenOnly,L={};function C(e){u?u.push(e):u=[e]}function _(e,t,n){!1!==x(e)&&(t&&t.removeChild(e),E(e),function e(t,n){if(t.nodeType===h)for(var i=t.firstChild;i;){var r=void 0;n&&(r=l(i))?C(r):(E(i),i.firstChild&&e(i,n)),i=i.nextSibling}}(e,n))}function N(e){k(e);for(var t=e.firstChild;t;){var n=t.nextSibling,i=l(t);if(i){var r=L[i];r&&c(t,r)&&(t.parentNode.replaceChild(r,t),T(r,t))}N(t),t=n}}function T(i,r,a){var u=l(r);if(u&&delete L[u],!n.isSameNode||!n.isSameNode(t)){if(!a){if(!1===b(i,r))return;if(e(i,r),w(i),!1===A(i,r))return}"TEXTAREA"!==i.nodeName?function(e,t){var n,i,r,a,u,s=t.firstChild,f=e.firstChild;e:for(;s;){for(a=s.nextSibling,n=l(s);f;){if(r=f.nextSibling,s.isSameNode&&s.isSameNode(f)){s=a,f=r;continue e}i=l(f);var y=f.nodeType,g=void 0;if(y===s.nodeType&&(y===h?(n?n!==i&&((u=L[n])?r===u?g=!1:(e.insertBefore(u,f),i?C(i):_(f,e,!0),f=u):g=!1):i&&(g=!1),(g=!1!==g&&c(f,s))&&T(f,s)):y!==v&&y!=p||(g=!0,f.nodeValue!==s.nodeValue&&(f.nodeValue=s.nodeValue))),g){s=a,f=r;continue e}i?C(i):_(f,e,!0),f=r}if(n&&(u=L[n])&&c(u,s))e.appendChild(u),T(u,s);else{var k=m(s);!1!==k&&(k&&(s=k),s.actualize&&(s=s.actualize(e.ownerDocument||o)),e.appendChild(s),N(s))}s=a,f=r}!function(e,t,n){for(;t;){var i=t.nextSibling;(n=l(t))?C(n):_(t,e,!0),t=i}}(e,f,i);var b=d[e.nodeName];b&&b(e,t)}(i,r):d.TEXTAREA(i,r)}}!function e(t){if(t.nodeType===h||t.nodeType===f)for(var n=t.firstChild;n;){var i=l(n);i&&(L[i]=n),e(n),n=n.nextSibling}}(t);var I=t,R=I.nodeType,P=n.nodeType;if(!S)if(R===h)P===h?c(t,n)||(E(t),I=function(e,t){for(var n=e.firstChild;n;){var i=n.nextSibling;t.appendChild(n),n=i}return t}(t,function(e,t){return t&&t!==r?o.createElementNS(t,e):o.createElement(e)}(n.nodeName,n.namespaceURI))):I=n;else if(R===v||R===p){if(P===R)return I.nodeValue!==n.nodeValue&&(I.nodeValue=n.nodeValue),I;I=n}if(I===n)E(t);else if(T(I,n,S),u)for(var H=0,V=u.length;H<V;H++){var O=L[u[H]];O&&_(O,O.parentNode,!1)}return!S&&I!==t&&t.parentNode&&(I.actualize&&(I=I.actualize(t.ownerDocument||o)),t.parentNode.replaceChild(I,t)),I}}(function(e,t){var n,i,r,o,a,u=t.attributes;for(n=u.length-1;n>=0;--n)r=(i=u[n]).name,o=i.namespaceURI,a=i.value,o?(r=i.localName||r,e.getAttributeNS(o,r)!==a&&e.setAttributeNS(o,r,a)):e.getAttribute(r)!==a&&e.setAttribute(r,a);for(n=(u=e.attributes).length-1;n>=0;--n)!1!==(i=u[n]).specified&&(r=i.name,(o=i.namespaceURI)?(r=i.localName||r,t.hasAttributeNS(o,r)||e.removeAttributeNS(o,r)):t.hasAttribute(r)||e.removeAttribute(r))});function k(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function b(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function w(e,t,n){return t&&b(e.prototype,t),n&&b(e,n),e}function x(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],i=!0,r=!1,o=void 0;try{for(var a,u=e[Symbol.iterator]();!(i=(a=u.next()).done)&&(n.push(a.value),!t||n.length!==t);i=!0);}catch(e){r=!0,o=e}finally{try{i||null==u.return||u.return()}finally{if(r)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function E(e){return(E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}n.d(t,"debug",function(){return N}),n.d(t,"Rendered",function(){return O}),n.d(t,"LiveSocket",function(){return D}),n.d(t,"Browser",function(){return B}),n.d(t,"View",function(){return U});var A="data-phx-view",S="[".concat(A,"]"),L=["text","textarea","number","email","password","search","tel","url"],C=1,_="phx-",N=function(e,t,n,i){console.log("".concat(e.id," ").concat(t,": ").concat(n," - "),i)},T=function(e){return"function"==typeof e?e:function(){return e}},I=function(e){return JSON.parse(JSON.stringify(e))},R=function(e,t){do{if(e.matches("[".concat(t,"]")))return e;e=e.parentElement||e.parentNode}while(null!==e&&1===e.nodeType&&!e.matches(S));return null},P=function(e){return null!==e&&"object"===E(e)&&!(e instanceof Array)},H=function(e,t){return e&&t(e)},V=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=new FormData(e),i=new URLSearchParams,r=!0,o=!1,a=void 0;try{for(var u,s=n.entries()[Symbol.iterator]();!(r=(u=s.next()).done);r=!0){var c=x(u.value,2),l=c[0],d=c[1];i.append(l,d)}}catch(e){o=!0,a=e}finally{try{r||null==s.return||s.return()}finally{if(o)throw a}}for(var h in t)i.append(h,t[h]);return i.toString()},O={mergeDiff:function(e,t){return this.isNewFingerprint(t)?t:(function e(t,n){for(var i in n){var r=n[i],o=t[i];P(r)&&P(o)?(o.dynamics&&!r.dynamics&&delete o.dynamics,e(o,r)):t[i]=r}}(e,t),e)},isNewFingerprint:function(){return!!(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).static},toString:function(e){var t={buffer:""};return this.toOutputBuffer(e,t),t.buffer},toOutputBuffer:function(e,t){if(e.dynamics)return this.comprehensionToBuffer(e,t);var n=e.static;t.buffer+=n[0];for(var i=1;i<n.length;i++)this.dynamicToBuffer(e[i-1],t),t.buffer+=n[i]},comprehensionToBuffer:function(e,t){for(var n=e.dynamics,i=e.static,r=0;r<n.length;r++){var o=n[r];t.buffer+=i[0];for(var a=1;a<i.length;a++)this.dynamicToBuffer(o[a-1],t),t.buffer+=i[a]}},dynamicToBuffer:function(e,t){P(e)?this.toOutputBuffer(e,t):t.buffer+=e}},D=function(){function e(t,n){var i=this,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(k(this,e),this.unloaded=!1,!n||"Object"===n.constructor.name)throw new Error('\n      a phoenix Socket must be provided as the second argument to the LiveSocket constructor. For example:\n\n          import {Socket} from "phoenix"\n          import {LiveSocket} from "phoenix_live_view"\n          let liveSocket = new LiveSocket("/live", Socket, {...})\n      ');this.socket=new n(t,r),this.bindingPrefix=r.bindingPrefix||_,this.opts=r,this.views={},this.params=T(r.params||{}),this.viewLogger=r.viewLogger,this.activeElement=null,this.prevActive=null,this.prevInput=null,this.prevValue=null,this.silenced=!1,this.root=null,this.linkRef=0,this.href=window.location.href,this.pendingLink=null,this.currentLocation=I(window.location),this.hooks=r.hooks||{},this.socket.onOpen(function(){i.isUnloaded()&&(i.destroyAllViews(),i.joinRootViews()),i.unloaded=!1}),window.addEventListener("beforeunload",function(e){i.unloaded=!0}),this.bindTopLevelEvents()}return w(e,[{key:"getSocket",value:function(){return this.socket}},{key:"log",value:function(e,t,n){if(this.viewLogger){var i=x(n(),2),r=i[0],o=i[1];this.viewLogger(e,t,r,o)}}},{key:"connect",value:function(){var e=this;return["complete","loaded","interactive"].indexOf(document.readyState)>=0?this.joinRootViews():document.addEventListener("DOMContentLoaded",function(){e.joinRootViews()}),this.socket.connect()}},{key:"disconnect",value:function(){this.socket.disconnect()}},{key:"getHookCallbacks",value:function(e){return this.hooks[e]}},{key:"isUnloaded",value:function(){return this.unloaded}},{key:"getBindingPrefix",value:function(){return this.bindingPrefix}},{key:"binding",value:function(e){return"".concat(this.getBindingPrefix()).concat(e)}},{key:"channel",value:function(e,t){return this.socket.channel(e,t)}},{key:"joinRootViews",value:function(){var e=this;B.all(document,"".concat(S,":not([").concat("data-phx-parent-id","])"),function(t){var n=e.joinView(t,null,e.getHref());e.root=e.root||n})}},{key:"replaceRoot",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.setPendingLink(e);this.root.showLoader(C);var r=this.root.el,o=this.root.id,a=this.root.isLoading();B.fetchPage(e,function(u,s){if(200!==u)return B.redirect(e);var c=document.createElement("div");c.innerHTML=s,t.joinView(c.firstChild,null,e,function(e){t.commitPendingLink(i)?(n&&n(),t.destroyViewById(o),r.replaceWith(e.el),t.root=e,a&&t.root.showLoader()):e.destroy()})})}},{key:"joinView",value:function(e,t,n,i){if(!this.getViewByEl(e)){var r=new U(e,this,t,n);return this.views[r.id]=r,r.join(i),r}}},{key:"owner",value:function(e,t){var n=this,i=H(e.closest(S),function(e){return n.getViewByEl(e)});i&&t(i)}},{key:"getViewByEl",value:function(e){return this.views[e.id]}},{key:"onViewError",value:function(e){this.dropActiveElement(e)}},{key:"destroyAllViews",value:function(){for(var e in this.views)this.destroyViewById(e)}},{key:"destroyViewByEl",value:function(e){return this.destroyViewById(e.id)}},{key:"destroyViewById",value:function(e){var t=this.views[e];t&&(delete this.views[t.id],this.root&&t.id===this.root.id&&(this.root=null),t.destroy())}},{key:"setActiveElement",value:function(e){var t=this;if(this.activeElement!==e){this.activeElement=e;var n=function(){e===t.activeElement&&(t.activeElement=null),e.removeEventListener("mouseup",t),e.removeEventListener("touchend",t)};e.addEventListener("mouseup",n),e.addEventListener("touchend",n)}}},{key:"getActiveElement",value:function(){return document.activeElement===document.body&&this.activeElement||document.activeElement}},{key:"dropActiveElement",value:function(e){this.prevActive&&e.ownsElement(this.prevActive)&&(this.prevActive=null)}},{key:"restorePreviouslyActiveFocus",value:function(){this.prevActive&&this.prevActive!==document.body&&this.prevActive.focus()}},{key:"blurActiveElement",value:function(){this.prevActive=this.getActiveElement(),this.prevActive!==document.body&&this.prevActive.blur()}},{key:"bindTopLevelEvents",value:function(){this.bindClicks(),this.bindNav(),this.bindForms(),this.bindTargetable({keyup:"keyup",keydown:"keydown"},function(e,t,n,i,r,o){n.pushKey(i,t,r,{altGraphKey:e.altGraphKey,altKey:e.altKey,charCode:e.charCode,code:e.code,ctrlKey:e.ctrlKey,key:e.key,keyCode:e.keyCode,keyIdentifier:e.keyIdentifier,keyLocation:e.keyLocation,location:e.location,metaKey:e.metaKey,repeat:e.repeat,shiftKey:e.shiftKey,which:e.which})}),this.bindTargetable({blur:"focusout",focus:"focusin"},function(e,t,n,i,r,o){o||n.pushEvent(t,i,r,{type:t})}),this.bindTargetable({blur:"blur",focus:"focus"},function(e,t,n,i,r,o){o&&"window"!==!o&&n.pushEvent(t,i,r,{type:e.type})})}},{key:"setPendingLink",value:function(e){this.linkRef++;this.linkRef;return this.pendingLink=e,this.linkRef}},{key:"commitPendingLink",value:function(e){return this.linkRef===e&&(this.href=this.pendingLink,this.pendingLink=null,!0)}},{key:"getHref",value:function(){return this.href}},{key:"hasPendingLink",value:function(){return!!this.pendingLink}},{key:"bindTargetable",value:function(e,t){var n=this,i=function(i){var r=e[i];n.on(r,function(e){var r=n.binding(i),o=n.binding("target"),a=e.target.getAttribute&&e.target.getAttribute(r);a&&!e.target.getAttribute(o)?n.owner(e.target,function(n){return t(e,i,n,e.target,a,null)}):B.all(document,"[".concat(r,"][").concat(o,"=window]"),function(o){var a=o.getAttribute(r);n.owner(o,function(n){return t(e,i,n,o,a,"window")})})})};for(var r in e)i(r)}},{key:"bindClicks",value:function(){var e=this;window.addEventListener("click",function(t){var n=e.binding("click"),i=R(t.target,n),r=i&&i.getAttribute(n);if(r){t.stopPropagation();var o={altKey:t.altKey,shiftKey:t.shiftKey,ctrlKey:t.ctrlKey,metaKey:t.metaKey,x:t.x||t.clientX,y:t.y||t.clientY,pageX:t.pageX,pageY:t.pageY,screenX:t.screenX,screenY:t.screenY};e.owner(i,function(e){return e.pushEvent("click",i,r,o)})}},!1)}},{key:"bindNav",value:function(){var e=this;B.canPushState()&&(window.onpopstate=function(t){if(e.registerNewLocation(window.location)){var n=window.location.href;e.root.isConnected()?e.root.pushInternalLink(n):e.replaceRoot(n)}},window.addEventListener("click",function(t){var n=R(t.target,"data-phx-live-link"),i=n&&n.getAttribute("data-phx-live-link");if(i){var r=n.href;t.preventDefault(),e.root.pushInternalLink(r,function(){B.pushState(i,{},r),e.registerNewLocation(window.location)})}},!1))}},{key:"registerNewLocation",value:function(e){var t=this.currentLocation;return t.pathname+t.search!==e.pathname+e.search&&(this.currentLocation=I(e),!0)}},{key:"bindForms",value:function(){var e=this;this.on("submit",function(t){var n=t.target.getAttribute(e.binding("submit"));n&&(t.preventDefault(),t.target.disabled=!0,e.owner(t.target,function(e){return e.submitForm(t.target,n)}))},!1);for(var t=["change","input"],n=0;n<t.length;n++){var i=t[n];this.on(i,function(t){var n=t.target,i=n.form&&n.form.getAttribute(e.binding("change"));if(i){var r=JSON.stringify(new FormData(n.form).getAll(n.name));e.prevInput===n&&e.prevValue===r||"number"===n.type&&n.validity&&n.validity.badInput||(e.prevInput=n,e.prevValue=r,e.owner(n,function(r){j.isTextualInput(n)?n["phx-has-focused"]=!0:e.setActiveElement(n),r.pushInput(n,i,t)}))}},!1)}}},{key:"silenceEvents",value:function(e){this.silenced=!0,e(),this.silenced=!1}},{key:"on",value:function(e,t){var n=this;window.addEventListener(e,function(e){n.silenced||t(e)})}}]),e}(),B={all:function(e,t,n){for(var i=[],r=e.querySelectorAll(t),o=0,a=i.length=r.length;o<a;o++)i[o]=r[o];return i.forEach(n)},canPushState:function(){return void 0!==history.pushState},fetchPage:function(e,t){var n=new XMLHttpRequest;n.open("GET",e,!0),n.timeout=3e4,n.setRequestHeader("content-type","text/html"),n.setRequestHeader("cache-control","max-age=0, no-cache, no-store, must-revalidate, post-check=0, pre-check=0"),n.setRequestHeader("x-requested-with","live-link"),n.onerror=function(){return t(400)},n.ontimeout=function(){return t(504)},n.onreadystatechange=function(){if(4===n.readyState)return"live-link"!==n.getResponseHeader("x-requested-with")?t(400):200!==n.status?t(n.status):void t(200,n.responseText)},n.send()},pushState:function(e,t,n){this.canPushState()?n!==window.location.href&&history[e+"State"](t,"",n):this.redirect(n)},dispatchEvent:function(e,t){var n=null;"function"==typeof Event?n=new Event(t):(n=document.createEvent("Event")).initEvent(t,!0,!0),e.dispatchEvent(n)},setCookie:function(e,t){document.cookie="".concat(e,"=").concat(t)},getCookie:function(e){return document.cookie.replace(new RegExp("(?:(?:^|.*;s*)".concat(e,"s*=s*([^;]*).*$)|^.*$")),"$1")},redirect:function(e,t){t&&B.setCookie("__phoenix_flash__",t+"; max-age=60000; path=/"),window.location=e}},j={disableForm:function(e,t){var n="".concat(t).concat("disable-with");e.classList.add("phx-loading"),B.all(e,"[".concat(n,"]"),function(e){var t=e.getAttribute(n);e.setAttribute("".concat(n,"-restore"),e.innerText),e.innerText=t}),B.all(e,"button",function(e){e.setAttribute("data-phx-disabled",e.disabled),e.disabled=!0}),B.all(e,"input",function(e){e.setAttribute("data-phx-readonly",e.readOnly),e.readOnly=!0})},restoreDisabledForm:function(e,t){var n="".concat(t).concat("disable-with");e.classList.remove("phx-loading"),B.all(e,"[".concat(n,"]"),function(e){var t=e.getAttribute("".concat(n,"-restore"));t&&("INPUT"===e.nodeName?e.value=t:e.innerText=t,e.removeAttribute("".concat(n,"-restore")))}),B.all(e,"button",function(e){var t=e.getAttribute("data-phx-disabled");t&&(e.disabled="true"===t,e.removeAttribute("data-phx-disabled"))}),B.all(e,"input",function(e){var t=e.getAttribute("data-phx-readonly");t&&(e.readOnly="true"===t,e.removeAttribute("data-phx-readonly"))})},discardError:function(e){var t=e.getAttribute&&e.getAttribute("data-phx-error-for");if(t){var n=document.getElementById(t);!t||n["phx-has-focused"]||n.form["phx-has-submitted"]||(e.style.display="none")}},isPhxChild:function(e){return e.getAttribute&&e.getAttribute("data-phx-parent-id")},applyPhxUpdate:function(e,t,n,i,r){var o=t.getAttribute&&t.getAttribute(n);if(!o||"replace"===o)return!1;switch(j.mergeAttrs(e,t),o){case"ignore":break;case"append":case"prepend":var a=t.innerHTML;if(e.phxPrevAppend===a)break;e.phxPrevAppend=a,B.all(t,"[id]",function(t){var n=e.querySelector('[id="'.concat(t.id,'"]'));n&&(r.discarded.push(n),t.remove(),n.replaceWith(t))});var u="append"===o?"beforeend":"afterbegin";e.insertAdjacentHTML(u,t.innerHTML),B.all(e,"[".concat(i,"]"),function(e){return r.added.push(e)});break;default:throw new Error('unsupported phx-update "'.concat(o,'"'))}return r.updated.push({fromEl:e,toEl:e}),!0},patch:function(e,t,n,i){var r={added:[],updated:[],discarded:[]},o=e.liveSocket.getActiveElement(),a=null,u=null,s=e.liveSocket.binding("update"),c=e.liveSocket.binding("hook"),l=t.cloneNode();return l.innerHTML=i,j.isTextualInput(o)&&(a=o.selectionStart,u=o.selectionEnd),m(t,l,{childrenOnly:!0,onBeforeNodeAdded:function(e){return j.discardError(e),e},onNodeAdded:function(t){if(j.isPhxChild(t)&&e.ownsElement(t))return e.onNewChildAdded(),!0;r.added.push(t)},onBeforeNodeDiscarded:function(t){if(j.isPhxChild(t))return e.liveSocket.destroyViewByEl(t),!0;r.discarded.push(t)},onBeforeElUpdated:function(e,t){if(e.isEqualNode(t))return!1;if("number"===e.type&&e.validity&&e.validity.badInput)return!1;if(j.applyPhxUpdate(e,t,s,c,r))return!1;if(j.isPhxChild(t)){var n=e.getAttribute("data-phx-static");return j.mergeAttrs(e,t),e.setAttribute("data-phx-static",n),!1}return e.getAttribute&&e["phx-has-submitted"]&&(t["phx-has-submitted"]=!0),e["phx-has-focused"]&&(t["phx-has-focused"]=!0),j.discardError(t),j.isTextualInput(e)&&e===o?(j.mergeInputs(e,t),r.updated.push({fromEl:e,toEl:e}),!1):(r.updated.push({fromEl:e,toEl:t}),!0)}}),e.liveSocket.silenceEvents(function(){j.restoreFocus(o,a,u)}),B.dispatchEvent(document,"phx:update"),r},mergeAttrs:function(e,t){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],i=t.attributes,r=0,o=i.length;r<o;r++){var a=i[r].name;n.indexOf(a)<0&&e.setAttribute(a,t.getAttribute(a))}},mergeInputs:function(e,t){j.mergeAttrs(e,t,["value"]),e.readOnly=t.readOnly},restoreFocus:function(e,t,n){j.isTextualInput(e)&&((""===e.value||e.readOnly)&&e.blur(),e.focus(),(e.setSelectionRange&&"text"===e.type||"textarea"===e.type)&&e.setSelectionRange(t,n))},isTextualInput:function(e){return L.indexOf(e.type)>=0}},U=function(){function e(t,n,i,r){var o=this;k(this,e),this.liveSocket=n,this.parent=i,this.newChildrenAdded=!1,this.gracefullyClosed=!1,this.el=t,this.id=this.el.id,this.view=this.el.getAttribute(A),this.loaderTimer=null,this.pendingDiffs=[],this.href=r,this.joinedOnce=!1,this.viewHooks={},this.channel=this.liveSocket.channel("lv:".concat(this.id),function(){return{url:o.href||o.liveSocket.root.href,params:o.liveSocket.params(o.view),session:o.getSession(),static:o.getStatic()}}),this.showLoader(C),this.bindChannel()}return w(e,[{key:"isConnected",value:function(){return this.channel.canPush()}},{key:"getSession",value:function(){return this.el.getAttribute("data-phx-session")}},{key:"getStatic",value:function(){var e=this.el.getAttribute("data-phx-static");return""===e?null:e}},{key:"destroy",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};clearTimeout(this.loaderTimer);var n=function(){for(var n in t(),e.viewHooks)e.destroyHook(e.viewHooks[n])};this.hasGracefullyClosed()?(this.log("destroyed",function(){return["the server view has gracefully closed"]}),n()):(this.log("destroyed",function(){return["the child has been removed from the parent"]}),this.channel.leave().receive("ok",n).receive("error",n).receive("timeout",n))}},{key:"setContainerClasses",value:function(){var e;this.el.classList.remove("phx-connected","phx-disconnected","phx-error"),(e=this.el.classList).add.apply(e,arguments)}},{key:"isLoading",value:function(){return this.el.classList.contains("phx-disconnected")}},{key:"showLoader",value:function(e){var t=this;if(clearTimeout(this.loaderTimer),e)this.loaderTimer=setTimeout(function(){return t.showLoader()},e);else{for(var n in this.viewHooks)this.viewHooks[n].__trigger__("disconnected");this.setContainerClasses("phx-disconnected")}}},{key:"hideLoader",value:function(){for(var e in clearTimeout(this.loaderTimer),this.viewHooks)this.viewHooks[e].__trigger__("reconnected");this.setContainerClasses("phx-connected")}},{key:"log",value:function(e,t){this.liveSocket.log(this,e,t)}},{key:"onJoin",value:function(e){var t=e.rendered,n=e.live_redirect;this.log("join",function(){return["",JSON.stringify(t)]}),this.rendered=t,this.hideLoader();var i=j.patch(this,this.el,this.id,O.toString(this.rendered));if(i.added.push(this.el),B.all(this.el,"[".concat(this.binding("hook"),"]"),function(e){return i.added.push(e)}),this.triggerHooks(i),this.joinNewChildren(),n){var r=n.kind,o=n.to;B.pushState(r,{},o)}}},{key:"joinNewChildren",value:function(){var e=this;B.all(document,"".concat(S,"[").concat("data-phx-parent-id",'="').concat(this.id,'"]'),function(t){e.liveSocket.getViewByEl(t)||e.liveSocket.joinView(t,e)})}},{key:"update",value:function(e){if(!function(e){for(var t in e)return!1;return!0}(e)){if(this.liveSocket.hasPendingLink())return this.pendingDiffs.push(e);this.log("update",function(){return["",JSON.stringify(e)]}),this.rendered=O.mergeDiff(this.rendered,e);var t=O.toString(this.rendered);this.newChildrenAdded=!1,this.triggerHooks(j.patch(this,this.el,this.id,t)),this.newChildrenAdded&&this.joinNewChildren()}}},{key:"getHook",value:function(e){return this.viewHooks[K.elementID(e)]}},{key:"addHook",value:function(e){if(!K.elementID(e)&&e.getAttribute){var t=this.liveSocket.getHookCallbacks(e.getAttribute(this.binding("hook")));if(t&&this.ownsElement(e)){var n=new K(this,e,t);this.viewHooks[K.elementID(n.el)]=n,n.__trigger__("mounted")}}}},{key:"destroyHook",value:function(e){e.__trigger__("destroyed"),delete this.viewHooks[K.elementID(e.el)]}},{key:"triggerHooks",value:function(e){var t=this,n=[];e.updated.push({fromEl:this.el,toEl:this.el}),e.added.forEach(function(e){return t.addHook(e)}),e.updated.forEach(function(e){var n=e.fromEl,i=e.toEl,r=t.getHook(n),o=t.binding("hook");r&&i.getAttribute&&n.getAttribute(o)===i.getAttribute(o)?r.__trigger__("updated"):r&&(t.destroyHook(r),t.addHook(n))}),e.discarded.forEach(function(e){var i=t.componentID(e);i&&n.push(i);var r=t.getHook(e);r&&t.destroyHook(r)}),n.length>0&&this.pushComponentsDestroyed(n)}},{key:"applyPendingUpdates",value:function(){var e=this;this.pendingDiffs.forEach(function(t){return e.update(t)}),this.pendingDiffs=[]}},{key:"onNewChildAdded",value:function(){this.newChildrenAdded=!0}},{key:"bindChannel",value:function(){var e=this;this.channel.on("diff",function(t){return e.update(t)}),this.channel.on("redirect",function(t){var n=t.to,i=t.flash;return e.onRedirect({to:n,flash:i})}),this.channel.on("live_redirect",function(t){var n=t.to,i=t.kind;return e.onLiveRedirect({to:n,kind:i})}),this.channel.on("external_live_redirect",function(t){var n=t.to,i=t.kind;return e.onExternalLiveRedirect({to:n,kind:i})}),this.channel.on("session",function(t){var n=t.token;return e.el.setAttribute("data-phx-session",n)}),this.channel.onError(function(t){return e.onError(t)}),this.channel.onClose(function(){return e.onGracefulClose()})}},{key:"onGracefulClose",value:function(){this.gracefullyClosed=!0,this.liveSocket.destroyViewById(this.id)}},{key:"onExternalLiveRedirect",value:function(e){var t=e.to,n=e.kind;this.liveSocket.replaceRoot(t,function(){return B.pushState(n,{},t)})}},{key:"onLiveRedirect",value:function(e){var t=e.to,n=e.kind;this.href=t,B.pushState(n,{},t)}},{key:"onRedirect",value:function(e){var t=e.to,n=e.flash;B.redirect(t,n)}},{key:"hasGracefullyClosed",value:function(){return this.gracefullyClosed}},{key:"join",value:function(e){var t=this;this.parent&&(this.parent.channel.onClose(function(){return t.onGracefulClose()}),this.parent.channel.onError(function(){return t.liveSocket.destroyViewById(t.id)})),this.channel.join().receive("ok",function(n){t.joinedOnce||e&&e(t),t.joinedOnce=!0,t.onJoin(n)}).receive("error",function(e){return t.onJoinError(e)}).receive("timeout",function(){return t.onJoinError("timeout")})}},{key:"onJoinError",value:function(e){return(e.redirect||e.external_live_redirect)&&this.channel.leave(),e.redirect?this.onRedirect(e.redirect):e.external_live_redirect?this.onExternalLiveRedirect(e.external_live_redirect):(this.displayError(),void this.log("error",function(){return["unable to join",e]}))}},{key:"onError",value:function(e){this.log("error",function(){return["view crashed",e]}),this.liveSocket.onViewError(this),document.activeElement.blur(),this.liveSocket.isUnloaded()?this.showLoader(200):this.displayError()}},{key:"displayError",value:function(){this.showLoader(),this.setContainerClasses("phx-disconnected","phx-error")}},{key:"pushWithReply",value:function(e,t){var n=this,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){};return this.channel.push(e,t,3e4).receive("ok",function(e){e.diff&&n.update(e.diff),e.redirect&&n.onRedirect(e.redirect),e.live_redirect&&n.onLiveRedirect(e.live_redirect),e.external_live_redirect&&n.onExternalLiveRedirect(e.external_live_redirect),i(e)})}},{key:"componentID",value:function(e){return e.getAttribute&&e.getAttribute("data-phx-component")&&e.id}},{key:"targetComponentID",value:function(e){var t=this;return H(e.closest("[".concat("data-phx-component","]")),function(e){return t.ownsElement(e)&&t.componentID(e)})}},{key:"pushEvent",value:function(e,t,n,i){var r=this.binding("value-"),o=!0,a=!1,u=void 0;try{for(var s,c=t.getAttributeNames()[Symbol.iterator]();!(o=(s=c.next()).done);o=!0){var l=s.value;l.startsWith(r)&&(i[l.replace(r,"")]=t.getAttribute(l))}}catch(e){a=!0,u=e}finally{try{o||null==c.return||c.return()}finally{if(a)throw u}}void 0!==t.value&&(i.value=t.value),this.pushWithReply("event",{type:e,event:n,value:i,cid:this.targetComponentID(t)||void 0})}},{key:"pushKey",value:function(e,t,n,i){void 0!==e.value&&(i.value=e.value),this.pushWithReply("event",{type:t,event:n,value:i,cid:this.targetComponentID(e)||void 0})}},{key:"pushInput",value:function(e,t,n){this.pushWithReply("event",{type:"form",event:t,value:V(e.form,{_target:n.target.name}),cid:this.targetComponentID(e)||void 0})}},{key:"pushFormSubmit",value:function(e,t,n){this.pushWithReply("event",{type:"form",event:t,value:V(e),cid:this.targetComponentID(e)||void 0},n)}},{key:"pushInternalLink",value:function(e,t){var n=this;this.isLoading()||this.showLoader(C);var i=this.liveSocket.setPendingLink(e);this.pushWithReply("link",{url:e},function(r){r.link_redirect?n.liveSocket.replaceRoot(e,t,i):n.liveSocket.commitPendingLink(i)&&(n.href=e,n.applyPendingUpdates(),n.hideLoader(),t&&t())}).receive("timeout",function(){return B.redirect(window.location.href)})}},{key:"pushComponentsDestroyed",value:function(e){this.pushWithReply("cids_destroyed",{cids:e})}},{key:"ownsElement",value:function(e){return e.getAttribute("data-phx-parent-id")===this.id||H(e.closest(S),function(e){return e.id})===this.id}},{key:"submitForm",value:function(e,t){var n=this,i=this.liveSocket.getBindingPrefix();e["phx-has-submitted"]="true",j.disableForm(e,i),this.liveSocket.blurActiveElement(this),this.pushFormSubmit(e,t,function(){j.restoreDisabledForm(e,i),n.liveSocket.restorePreviouslyActiveFocus()})}},{key:"binding",value:function(e){return this.liveSocket.binding(e)}}]),e}(),F=1,K=function(){function e(t,n,i){for(var r in k(this,e),this.__view=t,this.__callbacks=i,this.el=n,this.viewName=t.view,this.el.phxHookId=this.constructor.makeID(),this.__callbacks)this[r]=this.__callbacks[r]}return w(e,null,[{key:"makeID",value:function(){return F++}},{key:"elementID",value:function(e){return e.phxHookId}}]),w(e,[{key:"pushEvent",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.__view.pushWithReply("event",{type:"hook",event:e,value:t})}},{key:"__trigger__",value:function(e){var t=this.__callbacks[e];t&&t.call(this)}}]),e}();t.default=D},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){(function(t){t.Phoenix||(t.Phoenix={}),e.exports=t.Phoenix.LiveView=n(0)}).call(this,n(1))}])});

/***/ }),

/***/ 0:
/*!******************************************!*\
  !*** multi ./js/index.js ./css/app.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./js/index.js */"./js/index.js");
module.exports = __webpack_require__(/*! ./css/app.scss */"./css/app.scss");


/***/ })

/******/ });
//# sourceMappingURL=app.js.map