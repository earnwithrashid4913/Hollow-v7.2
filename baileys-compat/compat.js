'use strict';

/**
 * Builds the fork-era compatibility APIs that Hollow-v7.2 expects from `baileys`.
 *
 * Each implementation is built on standard Baileys primitives that exist in
 * BOTH X-Bails and the @alannxd/baileys fork, so behaviour is preserved rather
 * than stubbed:
 *
 *   InteractiveMessage  -> proto.Message.InteractiveMessage (protobuf type)
 *   MessageRetryMap     -> retry counter map ({ [msgId]: retryCount })
 *   relayWAMessage      -> re-emit/relay an already-built WAMessage
 *   removeAuthState     -> delete persisted session files (keep creds.json)
 *   generateMessageTag  -> generate a message id via generateMessageID
 */
module.exports = function buildCompat(core) {
  const proto = core.proto;
  const generateMessageID = core.generateMessageID;

  // 1) InteractiveMessage — alias for the protobuf message type used to build
  //    WhatsApp interactive/button/list messages.
  const InteractiveMessage = proto.Message.InteractiveMessage;

  // 2) MessageRetryMap — retry-counter map matching Baileys' `msgRetryCounterMap`
  //    option ({ [msgId]: retryCount }), exposed as a concrete class.
  class MessageRetryMap extends Map {
    getCount(msgId) {
      return this.get(msgId) || 0;
    }
    increment(msgId) {
      const next = this.getCount(msgId) + 1;
      this.set(msgId, next);
      return next;
    }
  }

  // 3) relayWAMessage — re-emit an already-built WAMessage. Mirrors the legacy
  //    Baileys `relayWAMessage(message)` behaviour: relay through the socket,
  //    falling back to emitting on the socket's event buffer.
  function relayWAMessage(sock, message, options = {}) {
    if (sock && typeof sock.relayMessage === 'function' && message && message.key) {
      return sock.relayMessage(message.key.remoteJid, message.message, {
        messageId: message.key.id,
        ...options,
      });
    }
    if (sock && sock.ev && typeof sock.ev.emit === 'function' && message && message.key) {
      sock.ev.emit('messages.upsert', { messages: [message], type: 'notify' });
      return Promise.resolve();
    }
    return Promise.reject(new Error('relayWAMessage: expected a socket and a WAMessage'));
  }

  // 4) removeAuthState — delete persisted session/auth files so the bot can be
  //    re-paired. `creds.json` is preserved, matching the project's own
  //    `clear-session` command behaviour.
  function removeAuthState(dir = 'sessions') {
    const fs = require('fs');
    const path = require('path');
    const full = path.isAbsolute(dir) ? dir : path.resolve(process.cwd(), dir);
    if (!fs.existsSync(full)) return false;
    for (const entry of fs.readdirSync(full)) {
      if (entry === 'creds.json') continue;
      try {
        fs.rmSync(path.join(full, entry), { recursive: true, force: true });
      } catch (_) {
        /* best-effort cleanup */
      }
    }
    return true;
  }

  // 5) generateMessageTag — generate a message tag/id. Standard Baileys exposes
  //    `generateMessageID` (and `generateMessageIDV2`) for this purpose.
  const generateMessageTag = () => generateMessageID();

  return {
    InteractiveMessage,
    MessageRetryMap,
    relayWAMessage,
    removeAuthState,
    generateMessageTag,
  };
};
