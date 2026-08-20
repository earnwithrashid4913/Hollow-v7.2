'use strict';

/**
 * Compatibility adapter for the `baileys` dependency of Hollow-v7.2.
 *
 * The project's obfuscated core does `require('baileys')` and destructures a
 * mix of standard Baileys exports plus five fork-era names that are NOT
 * exported by either the @alannxd/baileys fork (6.1.6) or X-Bails (standard
 * Baileys 6.7.4):
 *
 *   InteractiveMessage, MessageRetryMap, relayWAMessage, removeAuthState, generateMessageTag
 *
 * This module re-exports X-Bails (installed as `baileys-core`) and attaches
 * real implementations of those five names, so Hollow-v7.2 runs against
 * X-Bails without any change to its own (obfuscated) code.
 */
const core = require('baileys-core');
const buildCompat = require('./compat');

module.exports = Object.assign({}, core, buildCompat(core));
