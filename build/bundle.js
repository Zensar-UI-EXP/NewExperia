/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "629250728822db75ab07";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
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
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/assets/scripts/index.js")(__webpack_require__.s = "./src/assets/scripts/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./node_modules/material-icons/iconfont/material-icons.css":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/material-icons/iconfont/material-icons.css ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@font-face {\n  font-family: \"Material Icons\";\n  font-style: normal;\n  font-weight: 400;\n  src: url(" + escape(__webpack_require__(/*! ./MaterialIcons-Regular.eot */ "./node_modules/material-icons/iconfont/MaterialIcons-Regular.eot")) + ");\n  /* For IE6-8 */\n  src: local(\"Material Icons\"), local(\"MaterialIcons-Regular\"), url(" + escape(__webpack_require__(/*! ./MaterialIcons-Regular.woff2 */ "./node_modules/material-icons/iconfont/MaterialIcons-Regular.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ./MaterialIcons-Regular.woff */ "./node_modules/material-icons/iconfont/MaterialIcons-Regular.woff")) + ") format(\"woff\"), url(" + escape(__webpack_require__(/*! ./MaterialIcons-Regular.ttf */ "./node_modules/material-icons/iconfont/MaterialIcons-Regular.ttf")) + ") format(\"truetype\"); }\n\n.material-icons {\n  font-family: \"Material Icons\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  display: inline-block;\n  line-height: 1;\n  text-transform: none;\n  letter-spacing: normal;\n  word-wrap: normal;\n  white-space: nowrap;\n  direction: ltr;\n  /* Support for all WebKit browsers. */\n  -webkit-font-smoothing: antialiased;\n  /* Support for Safari and Chrome. */\n  text-rendering: optimizeLegibility;\n  /* Support for Firefox. */\n  -moz-osx-font-smoothing: grayscale;\n  /* Support for IE. */\n  font-feature-settings: 'liga'; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./node_modules/roboto-fontface/css/roboto/roboto-fontface.css":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/roboto-fontface/css/roboto/roboto-fontface.css ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../../css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@font-face {\n  font-family: 'Roboto';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Thin.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Thin.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Thin.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Thin.woff")) + ") format(\"woff\");\n  font-weight: 100;\n  font-style: normal; }\n\n@font-face {\n  font-family: 'Roboto-Thin';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Thin.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Thin.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Thin.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Thin.woff")) + ") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Roboto';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-ThinItalic.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-ThinItalic.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-ThinItalic.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-ThinItalic.woff")) + ") format(\"woff\");\n  font-weight: 100;\n  font-style: italic; }\n\n@font-face {\n  font-family: 'Roboto-ThinItalic';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-ThinItalic.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-ThinItalic.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-ThinItalic.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-ThinItalic.woff")) + ") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Roboto';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Light.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Light.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Light.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Light.woff")) + ") format(\"woff\");\n  font-weight: 300;\n  font-style: normal; }\n\n@font-face {\n  font-family: 'Roboto-Light';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Light.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Light.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Light.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Light.woff")) + ") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Roboto';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-LightItalic.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-LightItalic.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-LightItalic.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-LightItalic.woff")) + ") format(\"woff\");\n  font-weight: 300;\n  font-style: italic; }\n\n@font-face {\n  font-family: 'Roboto-LightItalic';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-LightItalic.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-LightItalic.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-LightItalic.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-LightItalic.woff")) + ") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Roboto';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Regular.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Regular.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Regular.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Regular.woff")) + ") format(\"woff\");\n  font-weight: 400;\n  font-style: normal; }\n\n@font-face {\n  font-family: 'Roboto-Regular';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Regular.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Regular.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Regular.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Regular.woff")) + ") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Roboto';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-RegularItalic.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-RegularItalic.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-RegularItalic.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-RegularItalic.woff")) + ") format(\"woff\");\n  font-weight: 400;\n  font-style: italic; }\n\n@font-face {\n  font-family: 'Roboto-RegularItalic';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-RegularItalic.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-RegularItalic.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-RegularItalic.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-RegularItalic.woff")) + ") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Roboto';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Medium.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Medium.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Medium.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Medium.woff")) + ") format(\"woff\");\n  font-weight: 500;\n  font-style: normal; }\n\n@font-face {\n  font-family: 'Roboto-Medium';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Medium.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Medium.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Medium.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Medium.woff")) + ") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Roboto';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-MediumItalic.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-MediumItalic.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-MediumItalic.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-MediumItalic.woff")) + ") format(\"woff\");\n  font-weight: 500;\n  font-style: italic; }\n\n@font-face {\n  font-family: 'Roboto-MediumItalic';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-MediumItalic.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-MediumItalic.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-MediumItalic.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-MediumItalic.woff")) + ") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Roboto';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Bold.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Bold.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Bold.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Bold.woff")) + ") format(\"woff\");\n  font-weight: 700;\n  font-style: normal; }\n\n@font-face {\n  font-family: 'Roboto-Bold';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Bold.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Bold.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Bold.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Bold.woff")) + ") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Roboto';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-BoldItalic.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-BoldItalic.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-BoldItalic.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-BoldItalic.woff")) + ") format(\"woff\");\n  font-weight: 700;\n  font-style: italic; }\n\n@font-face {\n  font-family: 'Roboto-BoldItalic';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-BoldItalic.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-BoldItalic.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-BoldItalic.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-BoldItalic.woff")) + ") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Roboto';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Black.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Black.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Black.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Black.woff")) + ") format(\"woff\");\n  font-weight: 900;\n  font-style: normal; }\n\n@font-face {\n  font-family: 'Roboto-Black';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Black.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Black.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Black.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Black.woff")) + ") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Roboto';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-BlackItalic.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-BlackItalic.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-BlackItalic.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-BlackItalic.woff")) + ") format(\"woff\");\n  font-weight: 900;\n  font-style: italic; }\n\n@font-face {\n  font-family: 'Roboto-BlackItalic';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-BlackItalic.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-BlackItalic.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-BlackItalic.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-BlackItalic.woff")) + ") format(\"woff\"); }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/activities.scss":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/activities.scss ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".activity-tabs li {\n  padding: 10px 15px;\n  border-bottom: 1px solid #d8d8d8; }\n  .activity-tabs li a {\n    text-decoration: none;\n    font-size: 14px;\n    font-weight: 500;\n    position: relative; }\n  .activity-tabs li .eds-accordion-caret {\n    position: absolute;\n    right: -22px;\n    top: 6px;\n    width: 12px;\n    height: 8px;\n    background-repeat: no-repeat;\n    background-size: contain;\n    background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSI3cHgiIHZpZXdCb3g9IjAgMCAxMiA3IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0OC4yICg0NzMyNykgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+R3JvdXAgMjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTIzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iR3JvdXAtMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNi4wMDAwMDAsIDEuMDAwMDAwKSByb3RhdGUoLTQ1LjAwMDAwMCkgdHJhbnNsYXRlKC02LjAwMDAwMCwgLTEuMDAwMDAwKSB0cmFuc2xhdGUoMi4wMDAwMDAsIC0zLjAwMDAwMCkiIGZpbGw9IiMwRTZFQjciPgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTIiIHg9IjAiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjgiIHJ4PSIxIj48L3JlY3Q+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMi1Db3B5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LjAwMDAwMCwgNy4wMDAwMDApIHJvdGF0ZSg5MC4wMDAwMDApIHRyYW5zbGF0ZSgtNC4wMDAwMDAsIC03LjAwMDAwMCkgIiB4PSIzIiB5PSIzIiB3aWR0aD0iMiIgaGVpZ2h0PSI4IiByeD0iMSI+PC9yZWN0PgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+\"); }\n\n.notes-tab {\n  margin-top: 385px; }\n  .notes-tab .eds-accordion-label {\n    background: #dcdcdc !important; }\n  .notes-tab .greyHeading button {\n    color: #426da9; }\n  .notes-tab textarea {\n    resize: none; }\n  .notes-tab .table {\n    padding: 10px;\n    background: #dcdcdc !important; }\n  .notes-tab .cell {\n    font-size: 12px; }\n  .notes-tab .eds-icon {\n    vertical-align: bottom; }\n  .notes-tab .note-btn {\n    border: none;\n    padding: 10px 25px !important;\n    background: #426da9 !important;\n    border-radius: 5px;\n    color: #fff !important;\n    text-transform: capitalize;\n    font-size: 14px; }\n  .notes-tab .row {\n    padding: 0 10px; }\n    .notes-tab .row > .cell {\n      vertical-align: middle; }\n\n.memo-tab ul {\n  display: none; }\n  .memo-tab ul li {\n    padding: 5px 10px; }\n\n.memo-tab[active=\"true\"] .eds-accordion-caret {\n  transform: rotate(180deg); }\n\n.memo-tab[active=\"true\"] ul {\n  display: block; }\n  .memo-tab[active=\"true\"] ul li {\n    border-bottom: none; }\n  .memo-tab[active=\"true\"] ul a {\n    font-weight: normal; }\n\n.promisepay__link {\n  margin-top: 10px !important;\n  padding-top: 7px !important;\n  padding-bottom: 7px !important;\n  border-bottom: none !important;\n  margin-bottom: 5px !important; }\n\n.promisepay--linkactive {\n  background: #fff;\n  border-left: solid 4px #d82b80;\n  padding-right: 12px !important; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/app.scss":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/app.scss ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "html, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline; }\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block; }\n\nbody {\n  line-height: 1; }\n\nol, ul {\n  list-style: none; }\n\nblockquote, q {\n  quotes: none; }\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: '';\n  content: none; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\nbody {\n  font-family: 'Roboto'; }\n\n.container {\n  max-width: 1680px;\n  margin: auto; }\n\n.dis-flex {\n  display: flex; }\n\n.clear {\n  clear: both;\n  float: none; }\n\n.btn {\n  width: 120px;\n  padding: 10px 0;\n  border-radius: 4px;\n  background-color: #426da9;\n  border: solid 1px #004590;\n  font-size: 14px;\n  font-family: \"Roboto-Medium\" !important;\n  font-weight: normal !important;\n  color: #ffffff;\n  text-align: center;\n  cursor: pointer; }\n  .btn--ok {\n    width: 45px !important;\n    margin-right: 5px; }\n  .btn--cancel {\n    background: #f6f6f6;\n    border: solid 1px #cccccc;\n    color: #333333;\n    width: 80px; }\n  .btn--viewall {\n    float: right;\n    background: #f6f6f6;\n    color: #0e6eb7;\n    border: solid 1px rgba(0, 69, 144, 0.3);\n    cursor: auto; }\n\n.bor-left--none {\n  border-left: none !important; }\n\n.mar-top--none {\n  margin-top: 0 !important; }\n\n.mar-bot--none {\n  margin-bottom: 0 !important; }\n\n.mar-right--none {\n  margin-right: 0 !important; }\n\n.mar-tpbt--20 {\n  margin: 20px 0; }\n\n.txt-aln--right {\n  text-align: right !important; }\n\n.pad-top--10 {\n  padding-top: 10px !important; }\n\n.pad-top--8 {\n  padding-top: 8px !important; }\n\n.cur--auto {\n  cursor: auto !important; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/caseList.scss":
/*!************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/caseList.scss ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".caselist__cont {\n  width: 77%;\n  margin: 0 auto; }\n\n.caselist__heading {\n  font-size: 20px !important;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #000000 !important;\n  line-height: 39px !important; }\n\n.caselist__case {\n  margin: 25px 36px 25px 0;\n  border-radius: 4px;\n  border: solid 1px #cccccc;\n  float: left;\n  width: 18.5em;\n  position: relative; }\n\n.caselist__case:nth-child(3) .caselist__infotime, .caselist__case:nth-child(4) .caselist__infotime {\n  margin-left: 24px; }\n\n.caselist__box {\n  background-color: #f6f6f6;\n  padding: 15px;\n  float: left;\n  width: 100%;\n  position: relative;\n  border-radius: 4px 4px 0 0; }\n\n.caselist__visuallyhidden {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px; }\n\n.caselist__name {\n  font-size: 15px;\n  font-family: \"Roboto-Medium\" !important;\n  font-weight: normal !important;\n  color: #000000; }\n\n.caselist__number {\n  font-size: 14px;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #000000; }\n\n.caselist__link {\n  font-size: 14px;\n  font-family: \"Roboto-Medium\" !important;\n  font-weight: normal !important;\n  color: #006dbd !important;\n  margin-top: 10px;\n  float: left;\n  text-decoration: none; }\n\n.caselist__goicon {\n  margin-left: 5px;\n  width: 9px;\n  height: 14px;\n  float: left;\n  background: url(" + escape(__webpack_require__(/*! ../images/next__icon.png */ "./src/assets/images/next__icon.png")) + ") no-repeat center center transparent;\n  background-size: 100%;\n  float: right; }\n\n.caselist__balance {\n  padding: 5px 0 0; }\n\n.caselist__label {\n  line-height: 1.15;\n  font-size: 13px;\n  font-family: \"Roboto-Bold\" !important;\n  font-weight: normal !important;\n  color: #333333; }\n\n.caselist__value {\n  font-size: 13px;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #333333;\n  float: right; }\n\n.caselist__info {\n  padding: 10px 0 10px 15px;\n  float: left;\n  width: 100%;\n  min-height: 120px; }\n\n.caselist__infoname {\n  font-size: 13px;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #af1685;\n  line-height: 1.15;\n  margin-top: 3px; }\n\n.caselist__infotime {\n  font-size: 12px;\n  font-family: \"Roboto-Medium\" !important;\n  font-weight: normal !important;\n  color: #888888;\n  text-transform: uppercase;\n  margin-top: 5px;\n  float: left; }\n\n.caselist__user {\n  width: 255px;\n  float: right;\n  padding: 7px 0 0;\n  margin-top: 40px;\n  border-top: solid 1px #dcdcdc;\n  font-size: 13px;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #333333;\n  position: absolute;\n  right: 0;\n  bottom: 10px; }\n\n.caselist__profileicon {\n  opacity: 0.3;\n  position: absolute;\n  right: -15px;\n  top: -13px;\n  width: 100px;\n  height: 100px;\n  float: left;\n  background: url(" + escape(__webpack_require__(/*! ../images/profile__icon.png */ "./src/assets/images/profile__icon.png")) + ") no-repeat center center transparent;\n  background-size: 100%; }\n\n.caselist--nobg {\n  border-bottom: solid 1px #dcdcdc;\n  background: #ffffff; }\n\n.caselist__usericon {\n  margin-right: 5px;\n  margin-top: 3px;\n  width: 14px;\n  height: 14px;\n  float: left;\n  background: url(" + escape(__webpack_require__(/*! ../images/user__icon.png */ "./src/assets/images/user__icon.png")) + ") no-repeat center center transparent;\n  background-size: 100%; }\n\n.caselist__fileicon {\n  margin-right: 5px;\n  width: 15px;\n  height: 30px;\n  float: left;\n  background: url(" + escape(__webpack_require__(/*! ../images/file__icon.png */ "./src/assets/images/file__icon.png")) + ") no-repeat center center transparent;\n  background-size: 100%; }\n\n.caselist__diverticon {\n  margin-right: 5px;\n  width: 18px;\n  height: 30px;\n  float: left;\n  background: url(" + escape(__webpack_require__(/*! ../images/divert__icon.png */ "./src/assets/images/divert__icon.png")) + ") no-repeat center center transparent;\n  background-size: 100%; }\n\n.caselist__foldericon {\n  margin-right: 5px;\n  width: 18px;\n  height: 30px;\n  float: left;\n  background: url(" + escape(__webpack_require__(/*! ../images/userfolder_icon.png */ "./src/assets/images/userfolder_icon.png")) + ") no-repeat center center transparent;\n  background-size: 100%; }\n\n.caselist__boldtext {\n  font-size: 13px;\n  font-family: \"Roboto-Bold\" !important;\n  font-weight: normal !important;\n  color: #af1685; }\n\n.caselist__secondline {\n  font-size: 13px;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #af1685;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  width: 88%;\n  float: left; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/contact-details.scss":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/contact-details.scss ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".contactdetails__innercont {\n  width: 100%;\n  clear: both;\n  padding: 0; }\n\n.contactdetails__headerContainer {\n  height: auto;\n  overflow: hidden; }\n\n.contactdetails__headertext {\n  float: left;\n  font-weight: 300;\n  font-size: 20px;\n  font-family: \"Roboto-Medium\" !important;\n  font-weight: normal !important;\n  color: #000000; }\n\n.contactdetails__btn {\n  float: right;\n  width: 134px;\n  height: 34px;\n  background-color: #EDF4FA;\n  border: solid 1px rgba(0, 69, 144, 0.3);\n  font-size: 14px;\n  font-family: \"Roboto-Medium\" !important;\n  font-weight: normal !important;\n  color: #0e6eb7; }\n\n.contactdetails__accordian {\n  height: 427px;\n  border-radius: 6px;\n  border: solid 1px #cccccc;\n  clear: both;\n  padding: 10px 35px;\n  margin-top: 50px; }\n\n.contactdetails__addresstext {\n  text-transform: uppercase;\n  font-size: 14px;\n  font-family: \"Roboto-Medium\" !important;\n  font-weight: normal !important;\n  color: #000000;\n  font-weight: 500;\n  padding-left: 19px; }\n\n.contactdetails__select--right {\n  float: right; }\n\n.contactdetails__list--text {\n  text-decoration: none; }\n\n.contactdetails__addressheader {\n  padding: 12px 12px 12px 12px;\n  border-bottom: 1px solid #cccccc;\n  background-color: #f6f6f6;\n  border-radius: 6px; }\n\n.contactdetails__edit {\n  float: right; }\n\n.contactdetails__edittext {\n  font-size: 14px;\n  font-family: \"Roboto-Medium\" !important;\n  font-weight: normal !important;\n  color: #0e6eb7;\n  font-weight: 500; }\n  .contactdetails__edittext svg {\n    vertical-align: bottom;\n    fill: #0e6eb7; }\n\n.contactdetails__headtext {\n  text-transform: uppercase;\n  color: #6d2077;\n  font-size: 14px;\n  font-weight: 500; }\n\n.contactdetails__accordian--rotate {\n  transform: rotate(0deg); }\n\n.contactdetails__headertext--padding {\n  padding-left: 26px; }\n\n.contactdetails__closedaccordian {\n  border: 1px solid #cccccc;\n  border-bottom: none;\n  border-radius: 0 0 6px 6px;\n  margin-top: -25px;\n  margin-bottom: 45px; }\n\n.contactdetails__list--display {\n  vertical-align: sub; }\n  .contactdetails__list--display a {\n    position: relative;\n    vertical-align: sub; }\n    .contactdetails__list--display a .contactdetails__eds-accordion-caret {\n      top: 8px; }\n\n.contactdetails__eds-accordion-caret {\n  transform: rotate(180deg);\n  top: 20px;\n  position: absolute;\n  width: 12px;\n  height: 8px;\n  background-repeat: no-repeat;\n  background-size: contain;\n  background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSI3cHgiIHZpZXdCb3g9IjAgMCAxMiA3IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0OC4yICg0NzMyNykgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+R3JvdXAgMjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTIzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iR3JvdXAtMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNi4wMDAwMDAsIDEuMDAwMDAwKSByb3RhdGUoLTQ1LjAwMDAwMCkgdHJhbnNsYXRlKC02LjAwMDAwMCwgLTEuMDAwMDAwKSB0cmFuc2xhdGUoMi4wMDAwMDAsIC0zLjAwMDAwMCkiIGZpbGw9IiMwRTZFQjciPgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTIiIHg9IjAiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjgiIHJ4PSIxIj48L3JlY3Q+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMi1Db3B5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LjAwMDAwMCwgNy4wMDAwMDApIHJvdGF0ZSg5MC4wMDAwMDApIHRyYW5zbGF0ZSgtNC4wMDAwMDAsIC03LjAwMDAwMCkgIiB4PSIzIiB5PSIzIiB3aWR0aD0iMiIgaGVpZ2h0PSI4IiByeD0iMSI+PC9yZWN0PgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+\"); }\n\n.contactdetails__select--right {\n  margin-top: 0 !important; }\n\n.contactdetails__list--display {\n  display: unset; }\n\n.contactdetails__innereds {\n  padding: 20px 38px; }\n\n.contactdetails__width {\n  height: 43px;\n  width: 100%;\n  margin: auto;\n  border-bottom: 1px solid #cccccc;\n  padding: 0 0 10px 0; }\n\n.contactdetails__validity--padding15 {\n  padding-left: 15px; }\n\n.contactdetails__hr {\n  width: 100%;\n  margin: auto;\n  color: #cccccc;\n  margin: 28px 0;\n  border: 0.5px solid; }\n\n.contactdetails__addressdetails {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  width: 100%; }\n\n.contactdetails__homeaddress {\n  width: 47.5%;\n  border-radius: 6px;\n  border: solid 1px #cccccc;\n  height: 50%; }\n\n.contactdetails__workaddress {\n  width: 47.5%;\n  border-radius: 6px;\n  border: solid 1px #cccccc; }\n\n.contactdetails__addressheader--topborder {\n  border-top: 1px solid #cccccc; }\n\n.contactdetails__validity--padding {\n  padding: 0 0 15px 15px; }\n\n.contactdetails__address {\n  padding: 20px 15px 15px;\n  font-size: 14px;\n  font-family: \"Roboto-Medium\" !important;\n  font-weight: normal !important;\n  color: #000000; }\n\n.contactdetails__validity {\n  font-size: 13px;\n  font-family: \"Roboto-Medium\" !important;\n  font-weight: normal !important;\n  color: #888888;\n  font-weight: 500; }\n\n.contactdetails__validity--font {\n  font-size: 13px;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #888888; }\n\n.contactdetails__addressheader--displayinline {\n  display: inline-block; }\n\n[label=\"Profile\"] .all-users-dd, [label=\"Profile\"] .form-switch {\n  display: none; }\n\n[label=\"Profile\"] .sort-filter > div {\n  flex: none; }\n  [label=\"Profile\"] .sort-filter > div:first-child {\n    margin-left: 15px; }\n\n[label=\"Profile\"] .sort-by-container {\n  margin-left: 30px; }\n\n[label=\"Profile\"] eds-accordion {\n  display: none; }\n  [label=\"Profile\"] eds-accordion.data, [label=\"Profile\"] eds-accordion.contact-details-card {\n    display: block; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/demo-pcc-overview.scss":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/demo-pcc-overview.scss ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".font-wt500 {\n  font-weight: 500; }\n\n.font-wtnormal {\n  font-family: Roboto !important;\n  font-weight: normal !important; }\n\n.pos-rel {\n  position: relative; }\n\n.text-Cap {\n  text-transform: capitalize; }\n\n.v-align-top {\n  vertical-align: top; }\n\n.marginBtm20 {\n  margin-bottom: 20px !important; }\n\n.marginBtm30 {\n  margin-bottom: 30px !important; }\n\n.marginBtm46 {\n  margin-bottom: 46px !important; }\n\n.marginTop20 {\n  margin-top: 20px !important; }\n\n.marginLft36 {\n  margin-left: 36px !important; }\n\n.containerSide {\n  padding: 10px;\n  height: 870px;\n  width: 300px; }\n  .containerSide.left {\n    width: 330px;\n    padding: 10px 0; }\n  .containerSide:last-child {\n    background-color: #f6f6f6;\n    padding: 10px 0; }\n  .containerSide:first-child {\n    padding-top: 15px; }\n\n.containerMiddle {\n  padding: 10px;\n  height: 870px;\n  padding-top: 15px;\n  flex: 0.95;\n  vertical-align: top; }\n  .containerMiddle eds-card header {\n    border-bottom: 0; }\n  .containerMiddle eds-dropdown {\n    margin-top: 20px; }\n\n.containerFlex {\n  display: flex;\n  justify-content: space-between;\n  height: 1000px; }\n\neds-accordion:first-child {\n  margin-top: 0; }\n\neds-card:first-child {\n  margin-top: 0; }\n\neds-card header h4 {\n  font-weight: 500 !important; }\n\neds-card header div:first-child {\n  display: inline-block; }\n\neds-card header div:last-child {\n  float: right;\n  display: inline-block; }\n\neds-card main {\n  margin: -20px !important;\n  margin-bottom: -15px !important; }\n\neds-dropdown {\n  min-width: 130px; }\n\n.greyHeading button {\n  margin: 0 !important;\n  padding-left: 20px !important;\n  background-color: whitesmoke !important;\n  text-transform: uppercase;\n  color: #6d2077; }\n\n.table {\n  padding: 10px 0;\n  display: block;\n  width: 100%; }\n  .table .row {\n    padding: 3px 20px; }\n\n.even-style .row:nth-child(even) {\n  background: #f6f6f6; }\n\n.row {\n  display: block;\n  width: 100%; }\n  .row > .cell {\n    vertical-align: top; }\n\n.cell {\n  display: inline-block;\n  width: 49%;\n  font-size: 13px; }\n  .cell:first-child {\n    text-align: left;\n    font-weight: 500; }\n  .cell:last-child {\n    text-align: right; }\n\n.table.middle .cell {\n  display: inline-block;\n  width: 49%;\n  font-size: 14px;\n  display: inline-block;\n  width: 22%;\n  padding: 5px; }\n  .table.middle .cell:first-child {\n    text-align: left;\n    font-weight: 500; }\n  .table.middle .cell:last-child {\n    text-align: left; }\n\n.table.middle .row {\n  width: 100%; }\n\neds-accordion-panel[aria-expanded=\"false\"] .table {\n  display: none !important; }\n\neds-icon.round-border {\n  background-color: #0e6eb7;\n  border-radius: 50%;\n  text-align: center;\n  width: 21px;\n  height: 21px;\n  vertical-align: text-bottom; }\n  eds-icon.round-border i {\n    font-size: 13px;\n    padding-top: 3px; }\n\nbutton.eds-accordion-label {\n  height: auto !important; }\n\neds-option {\n  display: none; }\n\n.acct-container .table.middle .cell:nth-child(2) {\n  width: 15%; }\n\n.evenHighlight .row:nth-child(even) {\n  background: #f6f6f6; }\n\n[slot=\"slot-header-center\"] {\n  border-bottom: 1px solid #d8d8d8;\n  padding-bottom: 8px; }\n\n.form-switch {\n  display: inline-block;\n  cursor: pointer;\n  -webkit-tap-highlight-color: transparent; }\n\n.form-switch i {\n  position: relative;\n  display: inline-block;\n  margin-right: .5rem;\n  width: 46px;\n  height: 26px;\n  background-color: #888888;\n  border-radius: 23px;\n  vertical-align: text-bottom;\n  transition: all 0.3s linear;\n  top: 5px;\n  margin-left: 5px; }\n\n.form-switch i::before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  width: 42px;\n  height: 22px;\n  background-color: #f6f6f6;\n  border-radius: 11px;\n  transform: translate3d(2px, 2px, 0) scale3d(1, 1, 1);\n  transition: all 0.25s linear; }\n\n.form-switch i::after {\n  content: \"\";\n  position: absolute;\n  left: 2px;\n  width: 16px;\n  height: 16px;\n  background-color: #888888;\n  border-radius: 11px;\n  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.24);\n  transform: translate3d(2px, 2px, 0);\n  transition: all 0.2s ease-in-out;\n  top: 3px; }\n\n.form-switch:active i::after {\n  width: 28px;\n  transform: translate3d(2px, 2px, 0); }\n\n.form-switch:active input:checked + i::after {\n  transform: translate3d(16px, 2px, 0); }\n\n.form-switch input {\n  display: none; }\n\n.form-switch input:checked + i {\n  background-color: #4BD763; }\n\n.form-switch input:checked + i::before {\n  transform: translate3d(18px, 2px, 0) scale3d(0, 0, 0); }\n\n.form-switch input:checked + i::after {\n  transform: translate3d(22px, 2px, 0); }\n\n.sort-filter {\n  background: #d2e8f9;\n  display: flex;\n  align-items: baseline;\n  flex: 5;\n  padding: 5px 15px; }\n  .sort-filter eds-dropdown {\n    margin: 0; }\n  .sort-filter label {\n    vertical-align: super;\n    font-size: 14px;\n    font-weight: 500; }\n  .sort-filter > div {\n    flex: 1; }\n  .sort-filter > div:first-child {\n    text-align: right;\n    margin-right: 10px; }\n  .sort-filter > div:last-child {\n    text-align: right; }\n\n.acct-container .sort-filter eds-dropdown {\n  min-width: 150px; }\n\n.contact-details-card .table {\n  padding: 0; }\n  .contact-details-card .table .row:first-child .cell:last-child {\n    width: 43%; }\n  .contact-details-card .table .row {\n    border-bottom: 1px solid #d8d8d8;\n    padding: 10px 20px; }\n    .contact-details-card .table .row .cell:first-child {\n      width: 34%; }\n    .contact-details-card .table .row .cell:last-child {\n      width: 63%; }\n  .contact-details-card .table .row .cell {\n    text-align: left; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-card.scss":
/*!************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-card.scss ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\neds-card {\n  display: block;\n  padding: 20px;\n  margin: 20px 0;\n  border: 1px solid #d8d8d8;\n  border-radius: 6px;\n  background-color: #ffffff; }\n  eds-card > h1 {\n    margin-top: 0; }\n  eds-card > h2 {\n    margin-top: 0; }\n  eds-card > h3 {\n    margin-top: 0; }\n  eds-card > h4 {\n    margin-top: 0; }\n  eds-card > h5 {\n    margin-top: 0; }\n  eds-card > h6 {\n    margin-top: 0; }\n  eds-card p {\n    margin-top: 0; }\n    eds-card p:last-child {\n      margin-bottom: 0; }\n  eds-card header {\n    margin: -20px -20px 20px;\n    padding: 12px 20px;\n    border-bottom: 1px solid #d8d8d8; }\n    eds-card header > h1 {\n      margin: 0; }\n    eds-card header > h2 {\n      margin: 0; }\n    eds-card header > h3 {\n      margin: 0; }\n    eds-card header > h4 {\n      margin: 0; }\n    eds-card header > h5 {\n      margin: 0; }\n    eds-card header > h6 {\n      margin: 0; }\n    eds-card header p {\n      margin: 0; }\n  eds-card header.flush {\n    padding: 0; }\n    eds-card header.flush eds-toolbar {\n      border-bottom: 0; }\n  eds-card main {\n    line-height: 1.4rem; }\n  eds-card footer {\n    margin: 20px -20px -20px;\n    padding: 15px 20px;\n    border-top: 1px solid #d8d8d8; }\n    eds-card footer p:last-child {\n      margin: 0; }\n  eds-card footer.flush {\n    padding: 0; }\n    eds-card footer.flush eds-toolbar {\n      border-bottom: 0; }\n\neds-card[background='gray'] {\n  background-color: #f6f6f6; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-dropdown.scss":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-dropdown.scss ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\neds-dropdown {\n  position: relative;\n  display: inline-block;\n  text-align: left;\n  vertical-align: bottom; }\n  eds-dropdown .slotted {\n    display: none; }\n  eds-dropdown > label {\n    display: none;\n    font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 16px;\n    font-weight: 400;\n    color: #333333;\n    font-size: 0.88rem;\n    font-weight: 500;\n    line-height: 1rem;\n    margin-bottom: 10px; }\n  eds-dropdown > label.show {\n    display: block; }\n  eds-dropdown .eds-dropdown-trigger {\n    position: relative;\n    display: block;\n    background-color: #ffffff;\n    width: 100%;\n    box-sizing: border-box;\n    font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 16px;\n    font-weight: 400;\n    color: #333333;\n    text-rendering: optimizeLegibility;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    padding: 5px 10px;\n    line-height: 1.4rem;\n    min-height: 34px;\n    border: 1px solid #939393;\n    border-radius: 4px;\n    transition: border-color 0.15s ease;\n    outline: none; }\n    eds-dropdown .eds-dropdown-trigger .eds-dropdown-placeholder {\n      display: none;\n      color: #b9b9b9;\n      font-weight: 400; }\n    eds-dropdown .eds-dropdown-trigger .eds-dropdown-placeholder.show {\n      display: block; }\n    eds-dropdown .eds-dropdown-trigger .eds-dropdown-arrow {\n      position: absolute;\n      bottom: 14px;\n      right: 10px;\n      display: inline-block;\n      width: 0;\n      height: 0;\n      border-left: 5px solid transparent;\n      border-right: 5px solid transparent;\n      border-top: 5px solid #426da9; }\n    eds-dropdown .eds-dropdown-trigger::after {\n      content: '';\n      position: absolute;\n      top: -2px;\n      left: -2px;\n      right: -2px;\n      bottom: -2px;\n      border-radius: 4px;\n      border: 2px solid #426da9;\n      opacity: 0;\n      transition: opacity 0.15s ease; }\n    eds-dropdown .eds-dropdown-trigger:focus::after {\n      opacity: 1;\n      transition: opacity 0.15s ease; }\n  eds-dropdown .eds-dropdown-trigger.focus::after {\n    opacity: 1;\n    transition: opacity 0.15s ease; }\n  eds-dropdown .eds-dropdown-options {\n    display: none;\n    opacity: 0;\n    position: absolute;\n    z-index: 1000;\n    top: calc(100% + 8px);\n    width: 100%;\n    background-color: #ffffff;\n    border-radius: 4px;\n    border: 1px solid transparent;\n    border: 1px solid #d8d8d8;\n    background-clip: border-box;\n    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);\n    background-clip: padding-box;\n    font-weight: 400;\n    transition: border-color 0.15s ease, opacity 0.15s ease; }\n    eds-dropdown .eds-dropdown-options .eds-dropdown-searchbox {\n      display: none;\n      position: relative;\n      border-bottom: 1px solid #d8d8d8;\n      padding: 5px; }\n      eds-dropdown .eds-dropdown-options .eds-dropdown-searchbox::after {\n        content: '';\n        position: absolute;\n        top: 5px;\n        left: 5px;\n        right: 5px;\n        bottom: 5px;\n        border-radius: 4px;\n        border: 2px solid #426da9;\n        opacity: 0;\n        transition: opacity 0.15s ease; }\n      eds-dropdown .eds-dropdown-options .eds-dropdown-searchbox:focus::after {\n        opacity: 1;\n        transition: opacity 0.15s ease; }\n      eds-dropdown .eds-dropdown-options .eds-dropdown-searchbox .eds-search-icon {\n        position: absolute;\n        top: 10px;\n        right: 12px;\n        width: 20px;\n        height: 20px; }\n        eds-dropdown .eds-dropdown-options .eds-dropdown-searchbox .eds-search-icon svg {\n          fill: #426da9;\n          width: 20px; }\n      eds-dropdown .eds-dropdown-options .eds-dropdown-searchbox input {\n        outline: none;\n        display: block;\n        width: 100%;\n        padding: 5px 10px;\n        border: none;\n        line-height: 1.4rem;\n        font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n        font-size: 16px;\n        font-weight: 400;\n        color: #333333;\n        box-sizing: border-box; }\n    eds-dropdown .eds-dropdown-options .eds-dropdown-searchbox.focus::after {\n      opacity: 1;\n      transition: opacity 0.15s ease; }\n    eds-dropdown .eds-dropdown-options .eds-dropdown-searchbox.show {\n      display: block; }\n    eds-dropdown .eds-dropdown-options ul {\n      padding: 5px 0;\n      margin: 2px 0 0;\n      list-style: none;\n      max-height: 280px;\n      overflow: auto; }\n      eds-dropdown .eds-dropdown-options ul li {\n        margin: 0;\n        padding: 10px 20px;\n        white-space: nowrap;\n        cursor: pointer;\n        min-height: 40px;\n        box-sizing: border-box;\n        position: relative;\n        outline: none; }\n        eds-dropdown .eds-dropdown-options ul li::after {\n          content: '';\n          position: absolute;\n          top: 0px;\n          left: 0px;\n          right: 0px;\n          bottom: 0px;\n          border-radius: 0;\n          border: 2px solid #426da9;\n          opacity: 0;\n          transition: opacity 0.15s ease; }\n        eds-dropdown .eds-dropdown-options ul li:focus::after {\n          opacity: 1;\n          transition: opacity 0.15s ease; }\n        eds-dropdown .eds-dropdown-options ul li:hover {\n          background-color: #426da9;\n          color: #ffffff; }\n        eds-dropdown .eds-dropdown-options ul li eds-checkbox {\n          position: absolute;\n          top: 12px;\n          left: 20px; }\n      eds-dropdown .eds-dropdown-options ul li.focus::after {\n        opacity: 1;\n        transition: opacity 0.15s ease; }\n      eds-dropdown .eds-dropdown-options ul li.eds-checkbox-option {\n        padding-left: 48px; }\n\neds-dropdown.eds-dropdown-open .eds-dropdown-options {\n  display: block;\n  opacity: 1; }\n\neds-dropdown[disabled] {\n  cursor: not-allowed; }\n  eds-dropdown[disabled] .eds-dropdown-trigger {\n    border-color: #cccccc;\n    color: #888888; }\n    eds-dropdown[disabled] .eds-dropdown-trigger:focus {\n      border-color: #cccccc;\n      color: #888888; }\n      eds-dropdown[disabled] .eds-dropdown-trigger:focus::after {\n        opacity: 0; }\n      eds-dropdown[disabled] .eds-dropdown-trigger:focus .eds-dropdown-arrow {\n        border-top-color: #cccccc; }\n    eds-dropdown[disabled] .eds-dropdown-trigger::after {\n      opacity: 0; }\n    eds-dropdown[disabled] .eds-dropdown-trigger .eds-dropdown-arrow {\n      border-top-color: #cccccc; }\n\n.acct-container eds-dropdown {\n  min-width: 181px; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-global-styles.scss":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-global-styles.scss ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "body.eds {\n  display: none;\n  font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 16px;\n  font-weight: 400;\n  color: #333333; }\n  body.eds * {\n    box-sizing: border-box; }\n    body.eds *::before {\n      box-sizing: border-box; }\n    body.eds *::after {\n      box-sizing: border-box; }\n\nbody.eds.eds-show-body {\n  display: block; }\n\n.eds {\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  line-height: 1.4em; }\n  .eds a {\n    color: #426da9; }\n    .eds a:hover {\n      color: #163c6f; }\n  .eds h1 {\n    color: #333333;\n    font-weight: 300;\n    line-height: 1.4em;\n    font-size: 30px; }\n  .eds h2 {\n    color: #333333;\n    font-weight: 300;\n    line-height: 1.4em;\n    font-size: 24px; }\n  .eds h3 {\n    color: #333333;\n    font-weight: bold;\n    font-size: 18px; }\n  .eds h4 {\n    color: #333333;\n    font-weight: bold;\n    font-size: 16px; }\n  .eds h5 {\n    color: #333333;\n    font-weight: bold; }\n  .eds h1[caps] {\n    text-transform: uppercase;\n    color: #6d2077;\n    font-weight: 400;\n    font-size: 28px; }\n  .eds h2[caps] {\n    text-transform: uppercase;\n    color: #6d2077;\n    font-weight: 400;\n    font-size: 22px; }\n  .eds h3[caps] {\n    text-transform: uppercase;\n    color: #6d2077;\n    font-weight: 400;\n    font-size: 16px; }\n  .eds h4[caps] {\n    text-transform: uppercase;\n    color: #6d2077;\n    font-weight: 400;\n    font-size: 14px; }\n  .eds h5[caps] {\n    text-transform: uppercase;\n    color: #6d2077;\n    font-weight: 400;\n    font-size: 12px; }\n  .eds hr {\n    border: none;\n    border-top: 1px solid #d8d8d8;\n    height: 1px; }\n  .eds .sr-only {\n    position: absolute;\n    width: 1px;\n    height: 1px;\n    padding: 0;\n    overflow: hidden;\n    clip: rect(0, 0, 0, 0);\n    white-space: nowrap;\n    border: 0; }\n\n[background='gray'] {\n  background-color: #f6f6f6; }\n\n.no-scroll {\n  overflow: hidden; }\n\neds-icon[spin] {\n  animation: eds-spin 2s infinite linear; }\n\neds-icon {\n  display: inline-block;\n  line-height: 0 !important;\n  margin: 0 6px 0 0;\n  vertical-align: text-bottom; }\n  eds-icon .material-icons {\n    font-size: inherit; }\n  eds-icon > * {\n    font-size: inherit; }\n\neds-icon.s18 > * {\n  font-size: 18px;\n  vertical-align: bottom; }\n\neds-icon.s24 > * {\n  font-size: 24px;\n  vertical-align: bottom; }\n\neds-icon.s36 > * {\n  font-size: 36px;\n  vertical-align: bottom; }\n\neds-icon.s48 > * {\n  font-size: 48px;\n  vertical-align: bottom; }\n\neds-icon.s60 > * {\n  font-size: 60px;\n  vertical-align: bottom; }\n\neds-icon[border] {\n  padding: 0.8rem;\n  border: 4px solid #d8d8d8;\n  border-radius: 3px; }\n\n.header-container {\n  height: 50px;\n  background: #e6e6e6;\n  display: flex;\n  align-items: center; }\n  .header-container .icon-container {\n    background-color: #f6f6f6;\n    line-height: 0; }\n    .header-container .icon-container .home-icon {\n      background-color: transparent;\n      padding: 17px 23px;\n      margin: 0;\n      color: #426da9;\n      cursor: pointer; }\n      .header-container .icon-container .home-icon:hover {\n        color: #1d4f91; }\n    .header-container .icon-container .home-icon.selected {\n      background-color: #ffffff;\n      color: #333333; }\n  .header-container .tabs-container {\n    display: flex;\n    flex-wrap: wrap;\n    max-width: 100%;\n    max-height: 100%;\n    overflow: hidden; }\n\npcc-eds-secondary-header-tab {\n  background-color: #f6f6f6;\n  border-left: 1px solid #cccccc;\n  display: flex;\n  align-content: space-between;\n  align-items: center;\n  width: 380px;\n  height: 50px; }\n  pcc-eds-secondary-header-tab:last-child {\n    border-right: 1px solid #cccccc; }\n  pcc-eds-secondary-header-tab .info-container {\n    height: 100%;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    color: #426da9; }\n    pcc-eds-secondary-header-tab .info-container eds-icon {\n      margin: 0; }\n    pcc-eds-secondary-header-tab .info-container [icon='person'] {\n      padding: 0 10px 0 20px; }\n    pcc-eds-secondary-header-tab .info-container .person-name {\n      min-width: 172px;\n      font-size: 12px;\n      font-weight: bold;\n      max-height: 100%;\n      line-height: 1.4; }\n  pcc-eds-secondary-header-tab .tab-controls {\n    display: flex;\n    height: 100%;\n    align-items: center; }\n    pcc-eds-secondary-header-tab .tab-controls .close-button {\n      margin: 0 10px 0 5px;\n      padding: 8px;\n      cursor: default;\n      color: #426da9; }\n\npcc-eds-secondary-header-tab[active] {\n  background-color: #ffffff; }\n  pcc-eds-secondary-header-tab[active] .info-container {\n    color: #333333; }\n\n@keyframes \"eds-spin\" {\n  from {\n    transform: rotate(0deg); }\n  to {\n    transform: rotate(360deg); } }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-icon.scss":
/*!************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-icon.scss ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\neds-icon[spin] {\n  animation: eds-spin 2s infinite linear; }\n\neds-icon {\n  display: inline-block;\n  line-height: 0 !important;\n  margin: 0 6px 0 0;\n  vertical-align: text-bottom; }\n  eds-icon .material-icons {\n    font-size: inherit; }\n  eds-icon > * {\n    font-size: inherit; }\n\neds-icon.s12 > * {\n  font-size: 12px;\n  vertical-align: bottom; }\n\neds-icon.s16 > * {\n  font-size: 16px;\n  vertical-align: bottom; }\n\neds-icon.s18 > * {\n  font-size: 18px;\n  vertical-align: bottom; }\n\neds-icon.s24 > * {\n  font-size: 24px;\n  vertical-align: bottom; }\n\neds-icon.s36 > * {\n  font-size: 36px;\n  vertical-align: bottom; }\n\neds-icon.s48 > * {\n  font-size: 48px;\n  vertical-align: bottom; }\n\neds-icon.s60 > * {\n  font-size: 60px;\n  vertical-align: bottom; }\n\neds-icon[border] {\n  padding: 0.8rem;\n  border: 4px solid #d8d8d8;\n  border-radius: 3px; }\n\n.phone-icon {\n  width: 32px;\n  height: 34px;\n  background: #426da9;\n  text-align: center;\n  border-radius: 3px;\n  margin-left: 10px; }\n  .phone-icon svg {\n    fill: #ffffff;\n    vertical-align: -webkit-baseline-middle; }\n\n.timer-icon {\n  margin-right: 11.3px; }\n  .timer-icon svg {\n    vertical-align: text-top;\n    fill: #dcdcdc; }\n\n.eds-icon.time {\n  font-size: 12px; }\n\n@keyframes \"eds-spin\" {\n  from {\n    transform: rotate(0deg); }\n  to {\n    transform: rotate(360deg); } }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-tag.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-tag.scss ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "eds-tag {\n  display: inline-block;\n  padding: 4px 10px;\n  font-size: 14px;\n  border-radius: 12px;\n  margin-left: 2px;\n  line-height: 1 !important; }\n  eds-tag:not([motif]) {\n    background: #e6e6e6;\n    color: #333333; }\n\neds-tag[motif=\"default\"] {\n  background: #e6e6e6;\n  color: #333333; }\n\neds-tag[motif='error'] {\n  background: #ffdce2;\n  color: #e4002b; }\n\neds-tag[motif='warning'] {\n  background: #fceeba;\n  color: #b35900; }\n\neds-tag[motif='success'] {\n  background: #cdf4d2;\n  color: #007A3B;\n  font-weight: normal;\n  text-transform: capitalize; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-timeline-item.scss":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-timeline-item.scss ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\npcc-eds-timeline-item {\n  font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 12px;\n  font-weight: 400;\n  color: #333333; }\n  pcc-eds-timeline-item .flex-container {\n    display: flex; }\n  pcc-eds-timeline-item .section-left {\n    flex: 1; }\n  pcc-eds-timeline-item .section-icon {\n    border-left: 1px solid #d8d8d8;\n    margin-left: 53px;\n    min-height: 100px;\n    padding-right: 30px;\n    text-align: center; }\n    pcc-eds-timeline-item .section-icon .icon-circle {\n      background-color: #af1685;\n      border-radius: 50%;\n      color: #ffffff;\n      height: 40px;\n      line-height: 42px;\n      margin-left: -20px;\n      padding-left: 5px;\n      width: 40px; }\n  pcc-eds-timeline-item .section-main {\n    flex: 5;\n    padding-bottom: 10px;\n    padding-top: 10px; }\n    pcc-eds-timeline-item .section-main .placeholder-center {\n      flex: 2; }\n    pcc-eds-timeline-item .section-main .placeholder-right {\n      flex: 1; }\n  pcc-eds-timeline-item [slot=\"slot-header-center\"] {\n    display: flex;\n    flex: 5; }\n    pcc-eds-timeline-item [slot=\"slot-header-center\"] [slot=\"slot-header-left\"] {\n      flex: 4; }\n    pcc-eds-timeline-item [slot=\"slot-header-center\"] [slot=\"slot-header-right\"] {\n      flex: 1;\n      font-size: 14px;\n      text-align: right; }\n\npcc-eds-timeline-item:last-child .section-icon {\n  border-left: 0; }\n\n.pcc-eds-timeline-view {\n  padding: 0 50px 0 0; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/header.scss":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/header.scss ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".header {\n  padding: 10px 0 0 0;\n  float: left;\n  width: 100%; }\n  .header__logo {\n    width: 117px;\n    height: 55px;\n    margin: 0 0 0 15px;\n    padding-right: 20px;\n    float: left; }\n  .header__logolink {\n    text-indent: -99999em;\n    width: 100%;\n    height: 100%;\n    float: left;\n    background: url(" + escape(__webpack_require__(/*! ../images/experian__logolatest.png */ "./src/assets/images/experian__logolatest.png")) + ") no-repeat center center transparent;\n    background-size: 100%; }\n  .header__logodesc {\n    font-size: 16px;\n    font-family: \"Roboto-Regular\" !important;\n    font-weight: normal !important;\n    color: #333333;\n    text-decoration: none;\n    padding: 3px 0 3px 20px;\n    float: left;\n    border-left: solid 1px #cccccc;\n    margin-top: 15px; }\n  .header__nav {\n    float: right; }\n  .header__listcont {\n    padding: 0;\n    margin: 0; }\n  .header__list {\n    float: left;\n    border-left: solid 1px #dcdcdc;\n    padding: 15px; }\n  .header__link {\n    float: left;\n    font-size: 16px;\n    font-family: \"Roboto-Medium\" !important;\n    font-weight: normal !important;\n    color: #426da9;\n    text-decoration: none;\n    position: relative; }\n  .header__iconimages {\n    vertical-align: middle; }\n  .header__counter {\n    position: absolute;\n    background: #e20000;\n    width: 21px;\n    height: 21px;\n    border-radius: 50%;\n    top: -7px;\n    right: -7px;\n    text-align: center;\n    font-size: 13px;\n    font-family: \"Roboto-Medium\" !important;\n    font-weight: normal !important;\n    color: #ffffff; }\n  .header--userprofile {\n    border: solid 2px #426da9;\n    border-radius: 50%;\n    padding: 1px 5px;\n    font-size: 12px; }\n  .header__hrline {\n    height: 2px !important;\n    -webkit-box-sizing: border-box !important;\n    -moz-box-sizing: border-box !important;\n    box-sizing: border-box !important;\n    background-position: 0 0, 0 100% !important;\n    background-repeat: no-repeat !important;\n    -webkit-background-size: 100% 4px !important;\n    -moz-background-size: 100% 4px !important;\n    background-size: 100% 4px !important;\n    background-image: -webkit-linear-gradient(left, #ba2f7d 0%, #26478d 100%), -webkit-linear-gradient(left, #ba2f7d 0%, #26478d 100%) !important;\n    background-image: -moz-linear-gradient(left, #ba2f7d 0%, #26478d 100%), -moz-linear-gradient(left, #ba2f7d 0%, #26478d 100%) !important;\n    background-image: -o-linear-gradient(left, #ba2f7d 0%, #26478d 100%), -o-linear-gradient(left, #ba2f7d 0%, #26478d 100%) !important;\n    background-image: linear-gradient(to right, #ba2f7d 0%, #26478d 100%), linear-gradient(to right, #ba2f7d 0%, #26478d 100%) !important;\n    margin: 0;\n    float: left;\n    width: 100%; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/pcc-accordian.scss":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/pcc-accordian.scss ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "eds-accordion {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  border: 1px solid #cccccc;\n  border-radius: 6px;\n  background-color: #ffffff; }\n  eds-accordion eds-accordion-panel {\n    border-top: 1px solid #cccccc;\n    position: relative;\n    display: flex;\n    flex-direction: column; }\n    eds-accordion eds-accordion-panel p {\n      transition: padding 100ms ease 0ms, opacity 75ms ease 25ms;\n      padding: 0 20px;\n      margin: 0;\n      font-size: 14px;\n      max-height: 0;\n      opacity: 0; }\n    eds-accordion eds-accordion-panel .eds-accordion-caret {\n      transition: transform 150ms ease 0ms; }\n    eds-accordion eds-accordion-panel .eds-accordion-label {\n      text-align: left;\n      border: 0;\n      height: 40px;\n      padding: 10px 20px;\n      background-color: #f6f6f6;\n      font-weight: 500;\n      font-size: 14px;\n      font-family: Roboto;\n      cursor: pointer; }\n      eds-accordion eds-accordion-panel .eds-accordion-label:focus {\n        outline: none;\n        background-color: #EDF4FA; }\n      eds-accordion eds-accordion-panel .eds-accordion-label:active {\n        outline: none; }\n      eds-accordion eds-accordion-panel .eds-accordion-label .eds-accordion-label-text:nth-child(1) {\n        display: block; }\n      eds-accordion eds-accordion-panel .eds-accordion-label .eds-accordion-label-text:nth-child(2) {\n        display: none; }\n      eds-accordion eds-accordion-panel .eds-accordion-label .eds-accordion-caret {\n        position: absolute;\n        right: 20px;\n        top: 16px;\n        width: 12px;\n        height: 8px;\n        background-repeat: no-repeat;\n        background-size: contain;\n        background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSI3cHgiIHZpZXdCb3g9IjAgMCAxMiA3IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0OC4yICg0NzMyNykgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+R3JvdXAgMjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTIzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iR3JvdXAtMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNi4wMDAwMDAsIDEuMDAwMDAwKSByb3RhdGUoLTQ1LjAwMDAwMCkgdHJhbnNsYXRlKC02LjAwMDAwMCwgLTEuMDAwMDAwKSB0cmFuc2xhdGUoMi4wMDAwMDAsIC0zLjAwMDAwMCkiIGZpbGw9IiMwRTZFQjciPgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTIiIHg9IjAiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjgiIHJ4PSIxIj48L3JlY3Q+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMi1Db3B5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LjAwMDAwMCwgNy4wMDAwMDApIHJvdGF0ZSg5MC4wMDAwMDApIHRyYW5zbGF0ZSgtNC4wMDAwMDAsIC03LjAwMDAwMCkgIiB4PSIzIiB5PSIzIiB3aWR0aD0iMiIgaGVpZ2h0PSI4IiByeD0iMSI+PC9yZWN0PgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+\"); }\n      eds-accordion eds-accordion-panel .eds-accordion-label .edit-tab {\n        display: none; }\n        eds-accordion eds-accordion-panel .eds-accordion-label .edit-tab svg {\n          vertical-align: bottom;\n          fill: #0e6eb7; }\n      eds-accordion eds-accordion-panel .eds-accordion-label.active .edit-tab {\n        display: block;\n        float: right;\n        color: #0e6eb7; }\n    eds-accordion eds-accordion-panel:first-child {\n      border: 0; }\n    eds-accordion eds-accordion-panel .table {\n      background: #ffffff; }\n  eds-accordion eds-accordion-panel[active=\"true\"] {\n    min-height: 200px; }\n    eds-accordion eds-accordion-panel[active=\"true\"] p {\n      transition: padding 150ms ease 0ms;\n      max-height: none;\n      padding: 24px 20px;\n      opacity: 1; }\n    eds-accordion eds-accordion-panel[active=\"true\"] .eds-accordion-label {\n      background-color: transparent;\n      border-bottom: 1px solid #cccccc;\n      margin: 0 20px;\n      padding: 10px 0;\n      width: auto; }\n      eds-accordion eds-accordion-panel[active=\"true\"] .eds-accordion-label .eds-accordion-label-text:nth-child(1) {\n        display: none; }\n      eds-accordion eds-accordion-panel[active=\"true\"] .eds-accordion-label .eds-accordion-label-text:nth-child(2) {\n        display: block; }\n      eds-accordion eds-accordion-panel[active=\"true\"] .eds-accordion-label .eds-accordion-sublabel {\n        display: block; }\n      eds-accordion eds-accordion-panel[active=\"true\"] .eds-accordion-label .eds-accordion-caret {\n        transform: rotate(180deg); }\n  eds-accordion eds-accordion-panel[active] p {\n    transition: padding 150ms ease 0ms;\n    max-height: none;\n    padding: 24px 20px;\n    opacity: 1; }\n  eds-accordion eds-accordion-panel[active] .eds-accordion-label {\n    background-color: transparent;\n    border-bottom: 1px solid #cccccc;\n    padding: 10px 20px;\n    width: auto; }\n    eds-accordion eds-accordion-panel[active] .eds-accordion-label .eds-accordion-label-text:nth-child(1) {\n      display: none; }\n    eds-accordion eds-accordion-panel[active] .eds-accordion-label .eds-accordion-label-text:nth-child(2) {\n      display: block; }\n    eds-accordion eds-accordion-panel[active] .eds-accordion-label .eds-accordion-sublabel {\n      display: block; }\n    eds-accordion eds-accordion-panel[active] .eds-accordion-label .eds-accordion-caret {\n      transform: rotate(180deg); }\n  eds-accordion.data {\n    display: none; }\n\neds-accordion[wide] {\n  border-radius: 0; }\n  eds-accordion[wide] eds-accordion-panel .eds-accordion-label {\n    padding: 10px 50px; }\n  eds-accordion[wide] eds-accordion-panel .eds-accordion-label-text:nth-child(1) {\n    display: inline-block;\n    text-transform: uppercase;\n    color: #6d2077; }\n  eds-accordion[wide] eds-accordion-panel .eds-accordion-label-text:nth-child(2) {\n    display: inline-block;\n    color: #333333;\n    margin-left: 3px; }\n  eds-accordion[wide] eds-accordion-panel .eds-accordion-caret {\n    top: 16px;\n    left: 19px; }\n  eds-accordion[wide] eds-accordion-panel p {\n    padding: 0 50px; }\n  eds-accordion[wide] eds-accordion-panel[active] .eds-accordion-label {\n    border: 0;\n    padding: 11px 0;\n    margin: 0 50px; }\n    eds-accordion[wide] eds-accordion-panel[active] .eds-accordion-label .eds-accordion-label-text:nth-child(1) {\n      display: inline-block; }\n    eds-accordion[wide] eds-accordion-panel[active] .eds-accordion-label .eds-accordion-label-text:nth-child(2) {\n      display: inline-block; }\n  eds-accordion[wide] eds-accordion-panel[active] p {\n    padding: 24px 50px 48px 50px; }\n  eds-accordion[wide] eds-accordion-panel[active=\"true\"] .eds-accordion-label {\n    border: 0;\n    padding: 11px 0;\n    margin: 0 50px; }\n    eds-accordion[wide] eds-accordion-panel[active=\"true\"] .eds-accordion-label .eds-accordion-label-text:nth-child(1) {\n      display: inline-block; }\n    eds-accordion[wide] eds-accordion-panel[active=\"true\"] .eds-accordion-label .eds-accordion-label-text:nth-child(2) {\n      display: inline-block; }\n  eds-accordion[wide] eds-accordion-panel[active=\"true\"] p {\n    padding: 24px 50px 48px 50px; }\n\neds-accordion[wide=\"true\"] {\n  border-radius: 0; }\n  eds-accordion[wide=\"true\"] eds-accordion-panel .eds-accordion-label {\n    padding: 10px 50px; }\n  eds-accordion[wide=\"true\"] eds-accordion-panel .eds-accordion-label-text:nth-child(1) {\n    display: inline-block;\n    text-transform: uppercase;\n    color: #6d2077; }\n  eds-accordion[wide=\"true\"] eds-accordion-panel .eds-accordion-label-text:nth-child(2) {\n    display: inline-block;\n    color: #333333;\n    margin-left: 3px; }\n  eds-accordion[wide=\"true\"] eds-accordion-panel .eds-accordion-caret {\n    top: 16px;\n    left: 19px; }\n  eds-accordion[wide=\"true\"] eds-accordion-panel p {\n    padding: 0 50px; }\n  eds-accordion[wide=\"true\"] eds-accordion-panel[active] .eds-accordion-label {\n    border: 0;\n    padding: 11px 0;\n    margin: 0 50px; }\n    eds-accordion[wide=\"true\"] eds-accordion-panel[active] .eds-accordion-label .eds-accordion-label-text:nth-child(1) {\n      display: inline-block; }\n    eds-accordion[wide=\"true\"] eds-accordion-panel[active] .eds-accordion-label .eds-accordion-label-text:nth-child(2) {\n      display: inline-block; }\n  eds-accordion[wide=\"true\"] eds-accordion-panel[active] p {\n    padding: 24px 50px 48px 50px; }\n  eds-accordion[wide=\"true\"] eds-accordion-panel[active=\"true\"] .eds-accordion-label {\n    border: 0;\n    padding: 11px 0;\n    margin: 0 50px; }\n    eds-accordion[wide=\"true\"] eds-accordion-panel[active=\"true\"] .eds-accordion-label .eds-accordion-label-text:nth-child(1) {\n      display: inline-block; }\n    eds-accordion[wide=\"true\"] eds-accordion-panel[active=\"true\"] .eds-accordion-label .eds-accordion-label-text:nth-child(2) {\n      display: inline-block; }\n  eds-accordion[wide=\"true\"] eds-accordion-panel[active=\"true\"] p {\n    padding: 24px 50px 48px 50px; }\n\n.eds-greyed {\n  color: #cccccc; }\n\n.acct-container .eds-accordion-label .eds-accordion-label-text {\n  vertical-align: super; }\n\n.acct-container .containerMiddle > eds-card {\n  padding: 20px 38px; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/pcc-eds-secondary-header.scss":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/pcc-eds-secondary-header.scss ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "eds-tabs {\n  display: block;\n  padding-left: 36px; }\n  eds-tabs .tab-labels {\n    border-bottom: 1px solid #cccccc;\n    width: 100%;\n    height: 50px;\n    overflow-x: auto;\n    margin: 0;\n    padding: 0; }\n    eds-tabs .tab-labels li {\n      margin: 0;\n      padding: 0;\n      display: inline-block;\n      text-align: center;\n      line-height: 45px; }\n      eds-tabs .tab-labels li a {\n        padding: 0 20px;\n        width: 100%;\n        font-size: 14px;\n        font-weight: 500;\n        display: block;\n        color: #426da9;\n        text-decoration: none; }\n        eds-tabs .tab-labels li a:hover {\n          border-bottom: 4px solid #d8d8d8;\n          color: #163c6f; }\n      eds-tabs .tab-labels li a[aria-selected=\"true\"] {\n        border-bottom: 4px solid #e63888;\n        color: #163c6f; }\n  eds-tabs eds-tab {\n    display: none;\n    opacity: 0;\n    transition: opacity .15s linear; }\n    eds-tabs eds-tab:after {\n      content: \" \";\n      display: table; }\n    eds-tabs eds-tab:before {\n      content: \" \";\n      display: table; }\n  eds-tabs eds-tab[active] {\n    display: block;\n    opacity: 1; }\n  eds-tabs .containerSide eds-tabs {\n    padding: 0; }\n\neds-tabs[vertical] {\n  display: flex; }\n  eds-tabs[vertical] .tab-labels {\n    height: fit-content;\n    flex: 0 0 180px;\n    border-right: 1px solid #d8d8d8;\n    border-bottom: none; }\n    eds-tabs[vertical] .tab-labels li {\n      height: 50px;\n      line-height: 50px;\n      text-align: left;\n      display: block;\n      overflow: hidden;\n      border-top: 1px solid #d8d8d8; }\n      eds-tabs[vertical] .tab-labels li:last-child {\n        border-bottom: 1px solid #d8d8d8; }\n      eds-tabs[vertical] .tab-labels li a:hover {\n        border-left: 4px solid #d8d8d8;\n        border-bottom: none;\n        padding-left: 16px; }\n      eds-tabs[vertical] .tab-labels li a[aria-selected=\"true\"] {\n        border-left: 4px solid #e63888;\n        border-bottom: none;\n        padding-left: 16px; }\n\n@media only screen and (max-width: 480px) {\n  eds-tabs {\n    display: flex; }\n    eds-tabs .tab-labels {\n      height: fit-content;\n      flex: 0 0 180px;\n      border-right: 1px solid #d8d8d8;\n      border-bottom: none; }\n      eds-tabs .tab-labels li {\n        height: 50px;\n        line-height: 50px;\n        text-align: left;\n        display: block;\n        overflow: hidden;\n        border-top: 1px solid #d8d8d8; }\n        eds-tabs .tab-labels li:last-child {\n          border-bottom: 1px solid #d8d8d8; }\n        eds-tabs .tab-labels li a:hover {\n          border-left: 4px solid #d8d8d8;\n          border-bottom: none;\n          padding-left: 16px; }\n        eds-tabs .tab-labels li a[aria-selected=\"true\"] {\n          border-left: 4px solid #e63888;\n          border-bottom: none;\n          padding-left: 16px; } }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/promise-pay.scss":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/promise-pay.scss ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".promisepay__navtab {\n  width: 200px;\n  margin: 0 auto 20px;\n  border-radius: 4px; }\n\n.promisepay__navtabcont {\n  padding: 0;\n  line-height: 10px; }\n\n.promisepay__navtablist {\n  list-style: none;\n  line-height: 10px; }\n\n.promisepay__navtablink {\n  border: solid 1px #d82b80;\n  text-decoration: none;\n  text-align: center;\n  font-size: 16px;\n  font-family: \"Roboto-Medium\" !important;\n  font-weight: normal !important;\n  color: #426da9;\n  min-width: 97px;\n  float: left;\n  padding: 10px 0; }\n\n.promisepay--navtablinkactive {\n  background: #d82b80;\n  color: #ffffff !important; }\n\n.promisepay--navtablinkfirst {\n  border-radius: 4px 0 0 4px !important; }\n\n.promisepay--navtablinklast {\n  border-radius: 0 4px 4px 0 !important; }\n\n.promisepay__heading {\n  font-size: 20px !important;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #000000;\n  margin-bottom: 25px; }\n\n.promisepay__list {\n  margin-bottom: 10px;\n  width: 100%;\n  float: left; }\n  .promisepay__list eds-dropdown .eds-dropdown-trigger {\n    font-size: 14px; }\n\n.promisepay__label {\n  font-size: 14px;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #426da9;\n  min-width: 210px;\n  float: left;\n  padding-top: 7px;\n  position: relative; }\n\n.promisepay__required {\n  position: absolute;\n  top: 3px;\n  font-size: 14px;\n  font-family: \"Roboto-Regular\";\n  font-weight: normal;\n  color: #426da9;\n  left: -9px; }\n\n.promisepay__input {\n  border: solid 1px #cccccc;\n  padding: 9px 5px;\n  background: #ffffff;\n  width: 140px;\n  float: left;\n  border-radius: 4px;\n  font-size: 14px;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #333333; }\n\n.promisepay--readonly {\n  background: #f6f6f6; }\n\n.promisepay--smlwidth {\n  width: 50px;\n  margin-left: 10px; }\n\n.promisepay__output {\n  padding-top: 5px; }\n\n.promisepay__btncont {\n  margin: 0 !important;\n  border-radius: 0 0 4px 4px;\n  border-top: 0 !important; }\n\n.promisepay__help {\n  float: right;\n  border-radius: 4px;\n  padding: 5px;\n  border: solid 1px #426da9; }\n\n.promisepay__helpimg {\n  width: 20px;\n  height: 20px;\n  float: left; }\n\n.promisepay__innertab {\n  display: none; }\n\n.promisepay--selectedtab {\n  display: block; }\n\n.promisepay__calendar {\n  padding: 6px 15px 7px 15px;\n  background: #f6f6f6;\n  float: left;\n  vertical-align: middle;\n  border-radius: 0 4px 4px 0;\n  border: solid 1px #ccc;\n  border-left: none; }\n\n.promisepay--datefield {\n  border-radius: 4px 0 0 4px; }\n\n.promisepay__caldrimg {\n  vertical-align: middle; }\n\n.promisepay__output {\n  font-size: 14px; }\n\n.eds--promisecont {\n  margin-bottom: 0 !important;\n  border-radius: 4px 4px 0 0; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/search.scss":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/search.scss ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".search {\n  float: left;\n  width: 100%; }\n  .search__innercont {\n    width: 77%;\n    margin: 50px auto 0 auto; }\n  .search__heading {\n    font-size: 15px !important;\n    font-family: \"Roboto-Regular\" !important !important;\n    font-weight: normal !important;\n    color: #000000;\n    line-height: 1.33; }\n  .search__callstats {\n    float: left;\n    width: 130px;\n    margin: 42px 46px 48px;\n    text-align: center; }\n  .search__statcount {\n    font-size: 64px !important;\n    font-family: \"Roboto-Medium\" !important;\n    font-weight: normal !important;\n    color: #4e4e4e;\n    text-align: center;\n    position: relative; }\n  .search__statdesc {\n    font-size: 12px;\n    font-family: \"Roboto\" !important;\n    font-weight: normal !important;\n    color: #7a7a7a;\n    text-transform: uppercase;\n    margin-top: 32px;\n    text-align: center;\n    width: 100%;\n    line-height: 17px;\n    font-weight: bold !important; }\n  .search__visuallyhidden {\n    border: 0;\n    clip: rect(0 0 0 0);\n    height: 1px;\n    margin: -1px;\n    overflow: hidden;\n    padding: 0;\n    position: absolute;\n    width: 1px; }\n  .search__percentage {\n    font-size: 18px;\n    font-family: \"Roboto-Bold\" !important;\n    font-weight: normal !important;\n    color: #333333;\n    line-height: 0.83;\n    position: absolute;\n    bottom: -15px;\n    right: -3px; }\n  .search--collected {\n    margin: 40px 10px 30px;\n    width: 150px; }\n  .search__bycont {\n    width: 100%;\n    border-radius: 4px;\n    background-color: #f6f6f6;\n    border: solid 1px #cccccc;\n    float: left;\n    padding: 20px 0;\n    margin-bottom: 52px; }\n  .search__form {\n    width: 70%;\n    margin: 0 auto; }\n    .search__form .btn {\n      border: none;\n      padding: 7px 0;\n      font-family: Roboto !important; }\n  .search__input {\n    background-color: #ffffff;\n    border: solid 1px #888888;\n    border-radius: 4px;\n    font-size: 16px;\n    font-family: \"Roboto-Regular\" !important;\n    font-weight: normal !important;\n    color: #aaaaaa;\n    padding: 5px 0px 5px 10px;\n    margin-right: 10px;\n    width: 239px; }\n    .search__input::-webkit-input-placeholder {\n      color: #aaaaaa;\n      font-weight: normal; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/style.css":
/*!********************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/style.css ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline; }\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {\n  display: block; }\n\nbody {\n  line-height: 1; }\n\nol, ul {\n  list-style: none; }\n\nblockquote, q {\n  quotes: none; }\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: '';\n  content: none; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\nbody {\n  background: #fff;\n  max-width: 1680px;\n  margin: 0 auto; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/css-loader/lib/url/escape.js":
/*!***************************************************!*\
  !*** ./node_modules/css-loader/lib/url/escape.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),

/***/ "./node_modules/material-icons/iconfont/MaterialIcons-Regular.eot":
/*!************************************************************************!*\
  !*** ./node_modules/material-icons/iconfont/MaterialIcons-Regular.eot ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/MaterialIcons-Regular.eot";

/***/ }),

/***/ "./node_modules/material-icons/iconfont/MaterialIcons-Regular.ttf":
/*!************************************************************************!*\
  !*** ./node_modules/material-icons/iconfont/MaterialIcons-Regular.ttf ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/MaterialIcons-Regular.ttf";

/***/ }),

/***/ "./node_modules/material-icons/iconfont/MaterialIcons-Regular.woff":
/*!*************************************************************************!*\
  !*** ./node_modules/material-icons/iconfont/MaterialIcons-Regular.woff ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/MaterialIcons-Regular.woff";

/***/ }),

/***/ "./node_modules/material-icons/iconfont/MaterialIcons-Regular.woff2":
/*!**************************************************************************!*\
  !*** ./node_modules/material-icons/iconfont/MaterialIcons-Regular.woff2 ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/MaterialIcons-Regular.woff2";

/***/ }),

/***/ "./node_modules/material-icons/iconfont/material-icons.css":
/*!*****************************************************************!*\
  !*** ./node_modules/material-icons/iconfont/material-icons.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../css-loader!../../sass-loader/lib/loader.js!./material-icons.css */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./node_modules/material-icons/iconfont/material-icons.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../css-loader!../../sass-loader/lib/loader.js!./material-icons.css */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./node_modules/material-icons/iconfont/material-icons.css", function() {
		var newContent = __webpack_require__(/*! !../../css-loader!../../sass-loader/lib/loader.js!./material-icons.css */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./node_modules/material-icons/iconfont/material-icons.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/roboto-fontface/css/roboto/roboto-fontface.css":
/*!*********************************************************************!*\
  !*** ./node_modules/roboto-fontface/css/roboto/roboto-fontface.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../css-loader!../../../sass-loader/lib/loader.js!./roboto-fontface.css */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./node_modules/roboto-fontface/css/roboto/roboto-fontface.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../css-loader!../../../sass-loader/lib/loader.js!./roboto-fontface.css */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./node_modules/roboto-fontface/css/roboto/roboto-fontface.css", function() {
		var newContent = __webpack_require__(/*! !../../../css-loader!../../../sass-loader/lib/loader.js!./roboto-fontface.css */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./node_modules/roboto-fontface/css/roboto/roboto-fontface.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Black.woff":
/*!*********************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-Black.woff ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-Black.woff";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Black.woff2":
/*!**********************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-Black.woff2 ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-Black.woff2";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-BlackItalic.woff":
/*!***************************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-BlackItalic.woff ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-BlackItalic.woff";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-BlackItalic.woff2":
/*!****************************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-BlackItalic.woff2 ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-BlackItalic.woff2";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Bold.woff":
/*!********************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-Bold.woff ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-Bold.woff";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Bold.woff2":
/*!*********************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-Bold.woff2 ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-Bold.woff2";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-BoldItalic.woff":
/*!**************************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-BoldItalic.woff ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-BoldItalic.woff";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-BoldItalic.woff2":
/*!***************************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-BoldItalic.woff2 ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-BoldItalic.woff2";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Light.woff":
/*!*********************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-Light.woff ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-Light.woff";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Light.woff2":
/*!**********************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-Light.woff2 ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-Light.woff2";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-LightItalic.woff":
/*!***************************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-LightItalic.woff ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-LightItalic.woff";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-LightItalic.woff2":
/*!****************************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-LightItalic.woff2 ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-LightItalic.woff2";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Medium.woff":
/*!**********************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-Medium.woff ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-Medium.woff";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Medium.woff2":
/*!***********************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-Medium.woff2 ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-Medium.woff2";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-MediumItalic.woff":
/*!****************************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-MediumItalic.woff ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-MediumItalic.woff";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-MediumItalic.woff2":
/*!*****************************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-MediumItalic.woff2 ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-MediumItalic.woff2";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Regular.woff":
/*!***********************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-Regular.woff ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-Regular.woff";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Regular.woff2":
/*!************************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-Regular.woff2 ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-Regular.woff2";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-RegularItalic.woff":
/*!*****************************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-RegularItalic.woff ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-RegularItalic.woff";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-RegularItalic.woff2":
/*!******************************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-RegularItalic.woff2 ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-RegularItalic.woff2";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Thin.woff":
/*!********************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-Thin.woff ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-Thin.woff";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Thin.woff2":
/*!*********************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-Thin.woff2 ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-Thin.woff2";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-ThinItalic.woff":
/*!**************************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-ThinItalic.woff ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-ThinItalic.woff";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-ThinItalic.woff2":
/*!***************************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-ThinItalic.woff2 ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-ThinItalic.woff2";

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/assets/images/divert__icon.png":
/*!********************************************!*\
  !*** ./src/assets/images/divert__icon.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/assets/images/divert__icon.png";

/***/ }),

/***/ "./src/assets/images/experian__logolatest.png":
/*!****************************************************!*\
  !*** ./src/assets/images/experian__logolatest.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/assets/images/experian__logolatest.png";

/***/ }),

/***/ "./src/assets/images/file__icon.png":
/*!******************************************!*\
  !*** ./src/assets/images/file__icon.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/assets/images/file__icon.png";

/***/ }),

/***/ "./src/assets/images/next__icon.png":
/*!******************************************!*\
  !*** ./src/assets/images/next__icon.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/assets/images/next__icon.png";

/***/ }),

/***/ "./src/assets/images/profile__icon.png":
/*!*********************************************!*\
  !*** ./src/assets/images/profile__icon.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/assets/images/profile__icon.png";

/***/ }),

/***/ "./src/assets/images/user__icon.png":
/*!******************************************!*\
  !*** ./src/assets/images/user__icon.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/assets/images/user__icon.png";

/***/ }),

/***/ "./src/assets/images/userfolder_icon.png":
/*!***********************************************!*\
  !*** ./src/assets/images/userfolder_icon.png ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/assets/images/userfolder_icon.png";

/***/ }),

/***/ "./src/assets/scripts/index.js":
/*!*************************************!*\
  !*** ./src/assets/scripts/index.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var roboto_fontface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! roboto-fontface */ "./node_modules/roboto-fontface/css/roboto/roboto-fontface.css");
/* harmony import */ var roboto_fontface__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(roboto_fontface__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var material_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! material-icons */ "./node_modules/material-icons/iconfont/material-icons.css");
/* harmony import */ var material_icons__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(material_icons__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_app_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/app.scss */ "./src/assets/styles/app.scss");
/* harmony import */ var _styles_app_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_app_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_eds_global_styles_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/eds-global-styles.scss */ "./src/assets/styles/eds-global-styles.scss");
/* harmony import */ var _styles_eds_global_styles_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_eds_global_styles_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _styles_header_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/header.scss */ "./src/assets/styles/header.scss");
/* harmony import */ var _styles_header_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_header_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _styles_search_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/search.scss */ "./src/assets/styles/search.scss");
/* harmony import */ var _styles_search_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_search_scss__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _styles_caseList_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styles/caseList.scss */ "./src/assets/styles/caseList.scss");
/* harmony import */ var _styles_caseList_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_caseList_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../styles/style.css */ "./src/assets/styles/style.css");
/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_styles_style_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _styles_pcc_eds_secondary_header_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../styles/pcc-eds-secondary-header.scss */ "./src/assets/styles/pcc-eds-secondary-header.scss");
/* harmony import */ var _styles_pcc_eds_secondary_header_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_styles_pcc_eds_secondary_header_scss__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _styles_demo_pcc_overview_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../styles/demo-pcc-overview.scss */ "./src/assets/styles/demo-pcc-overview.scss");
/* harmony import */ var _styles_demo_pcc_overview_scss__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_styles_demo_pcc_overview_scss__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _styles_pcc_accordian_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../styles/pcc-accordian.scss */ "./src/assets/styles/pcc-accordian.scss");
/* harmony import */ var _styles_pcc_accordian_scss__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_styles_pcc_accordian_scss__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _styles_eds_card_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../styles/eds-card.scss */ "./src/assets/styles/eds-card.scss");
/* harmony import */ var _styles_eds_card_scss__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_styles_eds_card_scss__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _styles_eds_dropdown_scss__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../styles/eds-dropdown.scss */ "./src/assets/styles/eds-dropdown.scss");
/* harmony import */ var _styles_eds_dropdown_scss__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_styles_eds_dropdown_scss__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _styles_eds_icon_scss__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../styles/eds-icon.scss */ "./src/assets/styles/eds-icon.scss");
/* harmony import */ var _styles_eds_icon_scss__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_styles_eds_icon_scss__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _styles_eds_timeline_item_scss__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../styles/eds-timeline-item.scss */ "./src/assets/styles/eds-timeline-item.scss");
/* harmony import */ var _styles_eds_timeline_item_scss__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_styles_eds_timeline_item_scss__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _styles_eds_tag_scss__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../styles/eds-tag.scss */ "./src/assets/styles/eds-tag.scss");
/* harmony import */ var _styles_eds_tag_scss__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_styles_eds_tag_scss__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _styles_activities_scss__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../styles/activities.scss */ "./src/assets/styles/activities.scss");
/* harmony import */ var _styles_activities_scss__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_styles_activities_scss__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _styles_contact_details_scss__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../styles/contact-details.scss */ "./src/assets/styles/contact-details.scss");
/* harmony import */ var _styles_contact_details_scss__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_styles_contact_details_scss__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _styles_promise_pay_scss__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../styles/promise-pay.scss */ "./src/assets/styles/promise-pay.scss");
/* harmony import */ var _styles_promise_pay_scss__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_styles_promise_pay_scss__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _scripts_promise_pay_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../scripts/promise-pay.js */ "./src/assets/scripts/promise-pay.js");
/* harmony import */ var _scripts_promise_pay_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_scripts_promise_pay_js__WEBPACK_IMPORTED_MODULE_19__);






















/***/ }),

/***/ "./src/assets/scripts/promise-pay.js":
/*!*******************************************!*\
  !*** ./src/assets/scripts/promise-pay.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

switchTab = (documentId, selectedTabClassName, thisParam) => {
	let idElement = document.getElementById(documentId);
	let classElement = document.getElementsByClassName(selectedTabClassName);
	let activeTabElement = document.getElementsByClassName("promisepay--navtablinkactive");
	activeTabElement[0].setAttribute("aria-pressed", false);
	activeTabElement[0].classList.remove("promisepay--navtablinkactive");
	thisParam.classList.add("promisepay--navtablinkactive");
	thisParam.setAttribute("aria-pressed", true);
	classElement[0].classList.remove(selectedTabClassName);
	idElement.classList.add(selectedTabClassName);
}
switchParentTab = tabId => {
	let tabElement = document.getElementById("tab-"+tabId);
	let panelElement = document.getElementById("tab-panel-"+tabId);
	let panelElements = document.getElementsByClassName("accountsTabPanel");
	let tabElements = document.getElementsByClassName("accountsTab");
	for (element of tabElements) {
		if (tabId == 3 && element.id === "tab-0") {
			element.setAttribute("aria-selected", true);
		} else{
			element.setAttribute("aria-selected", false);
		}
	}
	for (element of panelElements) {
		element.removeAttribute("active");
		element.setAttribute("aria-hidden", true);
		element.setAttribute("tabindex", "-1");
	}
	tabElement.setAttribute("aria-selected", true);
	panelElement.setAttribute("active", true);
	panelElement.setAttribute("aria-hidden", false);
	panelElement.setAttribute("tabindex", "0");
	if (tabId == 3) {
		document.getElementById("promiseActivity").click();
		document.getElementById("promise__actsection").children[0].children[1].children[0].classList.add("promisepay--linkactive");
	}
}

let path = window.location.pathname;
let page = path.split("/").pop();
let headerElement = document.getElementById("header");
let property = page === "index.html" ? true : false;
let tabindex = page === "index.html" ? 0 : -1;
headerElement.setAttribute("aria-hidden", property);
headerElement.setAttribute("tabindex", tabindex);

toggleMemo = () =>{
	let memoElement = document.getElementsByClassName("memodetail");
	for (element of memoElement){
		let activeValue = element.getAttribute("active") == "true" ? false : true;
		element.setAttribute("active", activeValue);
	}
}

/***/ }),

/***/ "./src/assets/styles/activities.scss":
/*!*******************************************!*\
  !*** ./src/assets/styles/activities.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./activities.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/activities.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./activities.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/activities.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./activities.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/activities.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/app.scss":
/*!************************************!*\
  !*** ./src/assets/styles/app.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./app.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/app.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./app.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/app.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./app.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/app.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/caseList.scss":
/*!*****************************************!*\
  !*** ./src/assets/styles/caseList.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./caseList.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/caseList.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./caseList.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/caseList.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./caseList.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/caseList.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/contact-details.scss":
/*!************************************************!*\
  !*** ./src/assets/styles/contact-details.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./contact-details.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/contact-details.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./contact-details.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/contact-details.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./contact-details.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/contact-details.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/demo-pcc-overview.scss":
/*!**************************************************!*\
  !*** ./src/assets/styles/demo-pcc-overview.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./demo-pcc-overview.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/demo-pcc-overview.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./demo-pcc-overview.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/demo-pcc-overview.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./demo-pcc-overview.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/demo-pcc-overview.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/eds-card.scss":
/*!*****************************************!*\
  !*** ./src/assets/styles/eds-card.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-card.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-card.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-card.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-card.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-card.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-card.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/eds-dropdown.scss":
/*!*********************************************!*\
  !*** ./src/assets/styles/eds-dropdown.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-dropdown.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-dropdown.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-dropdown.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-dropdown.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-dropdown.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-dropdown.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/eds-global-styles.scss":
/*!**************************************************!*\
  !*** ./src/assets/styles/eds-global-styles.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-global-styles.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-global-styles.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-global-styles.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-global-styles.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-global-styles.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-global-styles.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/eds-icon.scss":
/*!*****************************************!*\
  !*** ./src/assets/styles/eds-icon.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-icon.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-icon.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-icon.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-icon.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-icon.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-icon.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/eds-tag.scss":
/*!****************************************!*\
  !*** ./src/assets/styles/eds-tag.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-tag.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-tag.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-tag.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-tag.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-tag.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-tag.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/eds-timeline-item.scss":
/*!**************************************************!*\
  !*** ./src/assets/styles/eds-timeline-item.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-timeline-item.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-timeline-item.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-timeline-item.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-timeline-item.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-timeline-item.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-timeline-item.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/header.scss":
/*!***************************************!*\
  !*** ./src/assets/styles/header.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./header.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/header.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./header.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/header.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./header.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/header.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/pcc-accordian.scss":
/*!**********************************************!*\
  !*** ./src/assets/styles/pcc-accordian.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./pcc-accordian.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/pcc-accordian.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./pcc-accordian.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/pcc-accordian.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./pcc-accordian.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/pcc-accordian.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/pcc-eds-secondary-header.scss":
/*!*********************************************************!*\
  !*** ./src/assets/styles/pcc-eds-secondary-header.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./pcc-eds-secondary-header.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/pcc-eds-secondary-header.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./pcc-eds-secondary-header.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/pcc-eds-secondary-header.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./pcc-eds-secondary-header.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/pcc-eds-secondary-header.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/promise-pay.scss":
/*!********************************************!*\
  !*** ./src/assets/styles/promise-pay.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./promise-pay.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/promise-pay.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./promise-pay.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/promise-pay.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./promise-pay.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/promise-pay.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/search.scss":
/*!***************************************!*\
  !*** ./src/assets/styles/search.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./search.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/search.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./search.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/search.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./search.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/search.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/style.css":
/*!*************************************!*\
  !*** ./src/assets/styles/style.css ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./style.css */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/style.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./style.css */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/style.css", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./style.css */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/style.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21hdGVyaWFsLWljb25zL2ljb25mb250L21hdGVyaWFsLWljb25zLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2Nzcy9yb2JvdG8vcm9ib3RvLWZvbnRmYWNlLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9hY3Rpdml0aWVzLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXMvYXBwLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXMvY2FzZUxpc3Quc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9jb250YWN0LWRldGFpbHMuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9kZW1vLXBjYy1vdmVydmlldy5zY3NzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL2Vkcy1jYXJkLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXMvZWRzLWRyb3Bkb3duLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXMvZWRzLWdsb2JhbC1zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9lZHMtaWNvbi5zY3NzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL2Vkcy10YWcuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9lZHMtdGltZWxpbmUtaXRlbS5zY3NzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL2hlYWRlci5zY3NzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL3BjYy1hY2NvcmRpYW4uc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9wY2MtZWRzLXNlY29uZGFyeS1oZWFkZXIuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9wcm9taXNlLXBheS5zY3NzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL3NlYXJjaC5zY3NzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL3VybC9lc2NhcGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21hdGVyaWFsLWljb25zL2ljb25mb250L01hdGVyaWFsSWNvbnMtUmVndWxhci5lb3QiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21hdGVyaWFsLWljb25zL2ljb25mb250L01hdGVyaWFsSWNvbnMtUmVndWxhci50dGYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21hdGVyaWFsLWljb25zL2ljb25mb250L01hdGVyaWFsSWNvbnMtUmVndWxhci53b2ZmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tYXRlcmlhbC1pY29ucy9pY29uZm9udC9NYXRlcmlhbEljb25zLVJlZ3VsYXIud29mZjIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21hdGVyaWFsLWljb25zL2ljb25mb250L21hdGVyaWFsLWljb25zLmNzcz8xZTljIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb2JvdG8tZm9udGZhY2UvY3NzL3JvYm90by9yb2JvdG8tZm9udGZhY2UuY3NzPzMxNmIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvYm90by1mb250ZmFjZS9mb250cy9yb2JvdG8vUm9ib3RvLUJsYWNrLndvZmYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvYm90by1mb250ZmFjZS9mb250cy9yb2JvdG8vUm9ib3RvLUJsYWNrLndvZmYyIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb2JvdG8tZm9udGZhY2UvZm9udHMvcm9ib3RvL1JvYm90by1CbGFja0l0YWxpYy53b2ZmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb2JvdG8tZm9udGZhY2UvZm9udHMvcm9ib3RvL1JvYm90by1CbGFja0l0YWxpYy53b2ZmMiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2ZvbnRzL3JvYm90by9Sb2JvdG8tQm9sZC53b2ZmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb2JvdG8tZm9udGZhY2UvZm9udHMvcm9ib3RvL1JvYm90by1Cb2xkLndvZmYyIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb2JvdG8tZm9udGZhY2UvZm9udHMvcm9ib3RvL1JvYm90by1Cb2xkSXRhbGljLndvZmYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvYm90by1mb250ZmFjZS9mb250cy9yb2JvdG8vUm9ib3RvLUJvbGRJdGFsaWMud29mZjIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvYm90by1mb250ZmFjZS9mb250cy9yb2JvdG8vUm9ib3RvLUxpZ2h0LndvZmYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvYm90by1mb250ZmFjZS9mb250cy9yb2JvdG8vUm9ib3RvLUxpZ2h0LndvZmYyIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb2JvdG8tZm9udGZhY2UvZm9udHMvcm9ib3RvL1JvYm90by1MaWdodEl0YWxpYy53b2ZmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb2JvdG8tZm9udGZhY2UvZm9udHMvcm9ib3RvL1JvYm90by1MaWdodEl0YWxpYy53b2ZmMiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2ZvbnRzL3JvYm90by9Sb2JvdG8tTWVkaXVtLndvZmYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvYm90by1mb250ZmFjZS9mb250cy9yb2JvdG8vUm9ib3RvLU1lZGl1bS53b2ZmMiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2ZvbnRzL3JvYm90by9Sb2JvdG8tTWVkaXVtSXRhbGljLndvZmYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvYm90by1mb250ZmFjZS9mb250cy9yb2JvdG8vUm9ib3RvLU1lZGl1bUl0YWxpYy53b2ZmMiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2ZvbnRzL3JvYm90by9Sb2JvdG8tUmVndWxhci53b2ZmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb2JvdG8tZm9udGZhY2UvZm9udHMvcm9ib3RvL1JvYm90by1SZWd1bGFyLndvZmYyIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb2JvdG8tZm9udGZhY2UvZm9udHMvcm9ib3RvL1JvYm90by1SZWd1bGFySXRhbGljLndvZmYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvYm90by1mb250ZmFjZS9mb250cy9yb2JvdG8vUm9ib3RvLVJlZ3VsYXJJdGFsaWMud29mZjIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvYm90by1mb250ZmFjZS9mb250cy9yb2JvdG8vUm9ib3RvLVRoaW4ud29mZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2ZvbnRzL3JvYm90by9Sb2JvdG8tVGhpbi53b2ZmMiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2ZvbnRzL3JvYm90by9Sb2JvdG8tVGhpbkl0YWxpYy53b2ZmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb2JvdG8tZm9udGZhY2UvZm9udHMvcm9ib3RvL1JvYm90by1UaGluSXRhbGljLndvZmYyIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2RpdmVydF9faWNvbi5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvZXhwZXJpYW5fX2xvZ29sYXRlc3QucG5nIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ZpbGVfX2ljb24ucG5nIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL25leHRfX2ljb24ucG5nIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL3Byb2ZpbGVfX2ljb24ucG5nIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL3VzZXJfX2ljb24ucG5nIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL3VzZXJmb2xkZXJfaWNvbi5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zY3JpcHRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc2NyaXB0cy9wcm9taXNlLXBheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9hY3Rpdml0aWVzLnNjc3M/NDcxMSIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9hcHAuc2Nzcz8xNzdlIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL2Nhc2VMaXN0LnNjc3M/MTE2MyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9jb250YWN0LWRldGFpbHMuc2Nzcz8wN2FkIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL2RlbW8tcGNjLW92ZXJ2aWV3LnNjc3M/NDNmZSIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9lZHMtY2FyZC5zY3NzP2E4MDQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXMvZWRzLWRyb3Bkb3duLnNjc3M/NGZhZSIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9lZHMtZ2xvYmFsLXN0eWxlcy5zY3NzP2U0ZWMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXMvZWRzLWljb24uc2Nzcz9iOTQxIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL2Vkcy10YWcuc2Nzcz8xMDk5Iiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL2Vkcy10aW1lbGluZS1pdGVtLnNjc3M/MmYzZSIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9oZWFkZXIuc2Nzcz9iMjdmIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL3BjYy1hY2NvcmRpYW4uc2Nzcz9iZmZhIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL3BjYy1lZHMtc2Vjb25kYXJ5LWhlYWRlci5zY3NzPzNjNDkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXMvcHJvbWlzZS1wYXkuc2Nzcz82YjNhIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL3NlYXJjaC5zY3NzPzJkYmEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXMvc3R5bGUuY3NzPzI4NjYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUE2QjtBQUM3QixxQ0FBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQXFCLGdCQUFnQjtBQUNyQztBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQkFBa0IsOEJBQThCO0FBQ2hEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUFvQiwyQkFBMkI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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LHFCQUF1QixtQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QixvQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1Qiw0Qjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1Qiw2Qjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QixrQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QixtQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1Qiw2Qjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1Qiw4Qjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QixtQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QixvQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1Qiw4Qjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwrQjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QixvQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QixxQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwrQjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QixnQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QixxQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QixzQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1Qiw0Qjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1Qiw2Qjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QixrQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QixtQzs7Ozs7Ozs7Ozs7QUNBeEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLG1CQUFPLENBQUMsdURBQVE7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsbUJBQW1CO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixzQkFBc0I7QUFDdkM7O0FBRUE7QUFDQSxtQkFBbUIsMkJBQTJCOztBQUU5QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCLG1CQUFtQjtBQUNuQztBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLDJCQUEyQjtBQUM1QztBQUNBOztBQUVBLFFBQVEsdUJBQXVCO0FBQy9CO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsaUJBQWlCLHVCQUF1QjtBQUN4QztBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixpQkFBaUI7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7O0FBRWQsa0RBQWtELHNCQUFzQjtBQUN4RTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBLEtBQUssS0FBd0MsRUFBRSxFQUU3Qzs7QUFFRixRQUFRLHNCQUFpQjtBQUN6Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDs7QUFFQSw2QkFBNkIsbUJBQW1COztBQUVoRDs7QUFFQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDNVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxXQUFXLEVBQUU7QUFDckQsd0NBQXdDLFdBQVcsRUFBRTs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxzQ0FBc0M7QUFDdEMsR0FBRztBQUNIO0FBQ0EsOERBQThEO0FBQzlEOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDeEZBLGlCQUFpQixxQkFBdUIsd0M7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsZ0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsc0M7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsc0M7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIseUM7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsc0M7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsMkM7Ozs7Ozs7Ozs7OztBQ0F4QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FB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bUJBQW1CLG9OQUEyRztBQUM5SCxtQkFBbUIsbUJBQU8sQ0FBQyxvTkFBMkc7O0FBRXRJLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7QUMzQ0EsY0FBYyxtQkFBTyxDQUFDLGdOQUF5Rzs7QUFFL0gsNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHlHQUFzRDs7QUFFM0U7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLGdOQUF5RztBQUM1SCxtQkFBbUIsbUJBQU8sQ0FBQyxnTkFBeUc7O0FBRXBJLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDIiwiZmlsZSI6ImJ1aWxkL2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0O1xuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiNjI5MjUwNzI4ODIyZGI3NWFiMDdcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IFwibWFpblwiO1xuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZShcIi4vc3JjL2Fzc2V0cy9zY3JpcHRzL2luZGV4LmpzXCIpKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYXNzZXRzL3NjcmlwdHMvaW5kZXguanNcIik7XG4iLCJ2YXIgZXNjYXBlID0gcmVxdWlyZShcIi4uLy4uL2Nzcy1sb2FkZXIvbGliL3VybC9lc2NhcGUuanNcIik7XG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogXFxcIk1hdGVyaWFsIEljb25zXFxcIjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBzcmM6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi9NYXRlcmlhbEljb25zLVJlZ3VsYXIuZW90XCIpKSArIFwiKTtcXG4gIC8qIEZvciBJRTYtOCAqL1xcbiAgc3JjOiBsb2NhbChcXFwiTWF0ZXJpYWwgSWNvbnNcXFwiKSwgbG9jYWwoXFxcIk1hdGVyaWFsSWNvbnMtUmVndWxhclxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4vTWF0ZXJpYWxJY29ucy1SZWd1bGFyLndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi9NYXRlcmlhbEljb25zLVJlZ3VsYXIud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi9NYXRlcmlhbEljb25zLVJlZ3VsYXIudHRmXCIpKSArIFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIik7IH1cXG5cXG4ubWF0ZXJpYWwtaWNvbnMge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJNYXRlcmlhbCBJY29uc1xcXCI7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgbGluZS1oZWlnaHQ6IDE7XFxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXG4gIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XFxuICB3b3JkLXdyYXA6IG5vcm1hbDtcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICBkaXJlY3Rpb246IGx0cjtcXG4gIC8qIFN1cHBvcnQgZm9yIGFsbCBXZWJLaXQgYnJvd3NlcnMuICovXFxuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG4gIC8qIFN1cHBvcnQgZm9yIFNhZmFyaSBhbmQgQ2hyb21lLiAqL1xcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcXG4gIC8qIFN1cHBvcnQgZm9yIEZpcmVmb3guICovXFxuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xcbiAgLyogU3VwcG9ydCBmb3IgSUUuICovXFxuICBmb250LWZlYXR1cmUtc2V0dGluZ3M6ICdsaWdhJzsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsInZhciBlc2NhcGUgPSByZXF1aXJlKFwiLi4vLi4vLi4vY3NzLWxvYWRlci9saWIvdXJsL2VzY2FwZS5qc1wiKTtcbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJAZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLVRoaW4ud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLVRoaW4ud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7XFxuICBmb250LXdlaWdodDogMTAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsOyB9XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90by1UaGluJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLVRoaW4ud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLVRoaW4ud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7IH1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLVRoaW5JdGFsaWMud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLVRoaW5JdGFsaWMud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7XFxuICBmb250LXdlaWdodDogMTAwO1xcbiAgZm9udC1zdHlsZTogaXRhbGljOyB9XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90by1UaGluSXRhbGljJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLVRoaW5JdGFsaWMud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLVRoaW5JdGFsaWMud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7IH1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUxpZ2h0LndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1MaWdodC53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICBmb250LXN0eWxlOiBub3JtYWw7IH1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvLUxpZ2h0JztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUxpZ2h0LndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1MaWdodC53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tTGlnaHRJdGFsaWMud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUxpZ2h0SXRhbGljLndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYzsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8tTGlnaHRJdGFsaWMnO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tTGlnaHRJdGFsaWMud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUxpZ2h0SXRhbGljLndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpOyB9XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBzcmM6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1SZWd1bGFyLndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1SZWd1bGFyLndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8tUmVndWxhcic7XFxuICBzcmM6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1SZWd1bGFyLndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1SZWd1bGFyLndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpOyB9XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBzcmM6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1SZWd1bGFySXRhbGljLndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1SZWd1bGFySXRhbGljLndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYzsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8tUmVndWxhckl0YWxpYyc7XFxuICBzcmM6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1SZWd1bGFySXRhbGljLndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1SZWd1bGFySXRhbGljLndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpOyB9XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBzcmM6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1NZWRpdW0ud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLU1lZGl1bS53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBmb250LXN0eWxlOiBub3JtYWw7IH1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvLU1lZGl1bSc7XFxuICBzcmM6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1NZWRpdW0ud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLU1lZGl1bS53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tTWVkaXVtSXRhbGljLndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1NZWRpdW1JdGFsaWMud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgZm9udC1zdHlsZTogaXRhbGljOyB9XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90by1NZWRpdW1JdGFsaWMnO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tTWVkaXVtSXRhbGljLndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1NZWRpdW1JdGFsaWMud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7IH1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUJvbGQud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUJvbGQud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsOyB9XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90by1Cb2xkJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUJvbGQud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUJvbGQud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7IH1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUJvbGRJdGFsaWMud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUJvbGRJdGFsaWMud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zdHlsZTogaXRhbGljOyB9XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90by1Cb2xkSXRhbGljJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUJvbGRJdGFsaWMud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUJvbGRJdGFsaWMud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7IH1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUJsYWNrLndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1CbGFjay53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTtcXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XFxuICBmb250LXN0eWxlOiBub3JtYWw7IH1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvLUJsYWNrJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUJsYWNrLndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1CbGFjay53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tQmxhY2tJdGFsaWMud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUJsYWNrSXRhbGljLndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYzsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8tQmxhY2tJdGFsaWMnO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tQmxhY2tJdGFsaWMud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUJsYWNrSXRhbGljLndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuYWN0aXZpdHktdGFicyBsaSB7XFxuICBwYWRkaW5nOiAxMHB4IDE1cHg7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Q4ZDhkODsgfVxcbiAgLmFjdGl2aXR5LXRhYnMgbGkgYSB7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICBmb250LXdlaWdodDogNTAwO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG4gIC5hY3Rpdml0eS10YWJzIGxpIC5lZHMtYWNjb3JkaW9uLWNhcmV0IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICByaWdodDogLTIycHg7XFxuICAgIHRvcDogNnB4O1xcbiAgICB3aWR0aDogMTJweDtcXG4gICAgaGVpZ2h0OiA4cHg7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQmxibU52WkdsdVp6MGlWVlJHTFRnaVB6NEtQSE4yWnlCM2FXUjBhRDBpTVRKd2VDSWdhR1ZwWjJoMFBTSTNjSGdpSUhacFpYZENiM2c5SWpBZ01DQXhNaUEzSWlCMlpYSnphVzl1UFNJeExqRWlJSGh0Ykc1elBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHlNREF3TDNOMlp5SWdlRzFzYm5NNmVHeHBibXM5SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpFNU9Ua3ZlR3hwYm1zaVBnb2dJQ0FnUENFdExTQkhaVzVsY21GMGIzSTZJRk5yWlhSamFDQTBPQzR5SUNnME56TXlOeWtnTFNCb2RIUndPaTh2ZDNkM0xtSnZhR1Z0YVdGdVkyOWthVzVuTG1OdmJTOXphMlYwWTJnZ0xTMCtDaUFnSUNBOGRHbDBiR1UrUjNKdmRYQWdNand2ZEdsMGJHVStDaUFnSUNBOFpHVnpZejVEY21WaGRHVmtJSGRwZEdnZ1UydGxkR05vTGp3dlpHVnpZejRLSUNBZ0lEeGtaV1p6UGp3dlpHVm1jejRLSUNBZ0lEeG5JR2xrUFNKUVlXZGxMVEl6SWlCemRISnZhMlU5SW01dmJtVWlJSE4wY205clpTMTNhV1IwYUQwaU1TSWdabWxzYkQwaWJtOXVaU0lnWm1sc2JDMXlkV3hsUFNKbGRtVnViMlJrSWo0S0lDQWdJQ0FnSUNBOFp5QnBaRDBpUjNKdmRYQXRNaUlnZEhKaGJuTm1iM0p0UFNKMGNtRnVjMnhoZEdVb05pNHdNREF3TURBc0lERXVNREF3TURBd0tTQnliM1JoZEdVb0xUUTFMakF3TURBd01Da2dkSEpoYm5Oc1lYUmxLQzAyTGpBd01EQXdNQ3dnTFRFdU1EQXdNREF3S1NCMGNtRnVjMnhoZEdVb01pNHdNREF3TURBc0lDMHpMakF3TURBd01Da2lJR1pwYkd3OUlpTXdSVFpGUWpjaVBnb2dJQ0FnSUNBZ0lDQWdJQ0E4Y21WamRDQnBaRDBpVW1WamRHRnVaMnhsTFRJaUlIZzlJakFpSUhrOUlqQWlJSGRwWkhSb1BTSXlJaUJvWldsbmFIUTlJamdpSUhKNFBTSXhJajQ4TDNKbFkzUStDaUFnSUNBZ0lDQWdJQ0FnSUR4eVpXTjBJR2xrUFNKU1pXTjBZVzVuYkdVdE1pMURiM0I1SWlCMGNtRnVjMlp2Y20wOUluUnlZVzV6YkdGMFpTZzBMakF3TURBd01Dd2dOeTR3TURBd01EQXBJSEp2ZEdGMFpTZzVNQzR3TURBd01EQXBJSFJ5WVc1emJHRjBaU2d0TkM0d01EQXdNREFzSUMwM0xqQXdNREF3TUNrZ0lpQjRQU0l6SWlCNVBTSXpJaUIzYVdSMGFEMGlNaUlnYUdWcFoyaDBQU0k0SWlCeWVEMGlNU0krUEM5eVpXTjBQZ29nSUNBZ0lDQWdJRHd2Wno0S0lDQWdJRHd2Wno0S1BDOXpkbWMrXFxcIik7IH1cXG5cXG4ubm90ZXMtdGFiIHtcXG4gIG1hcmdpbi10b3A6IDM4NXB4OyB9XFxuICAubm90ZXMtdGFiIC5lZHMtYWNjb3JkaW9uLWxhYmVsIHtcXG4gICAgYmFja2dyb3VuZDogI2RjZGNkYyAhaW1wb3J0YW50OyB9XFxuICAubm90ZXMtdGFiIC5ncmV5SGVhZGluZyBidXR0b24ge1xcbiAgICBjb2xvcjogIzQyNmRhOTsgfVxcbiAgLm5vdGVzLXRhYiB0ZXh0YXJlYSB7XFxuICAgIHJlc2l6ZTogbm9uZTsgfVxcbiAgLm5vdGVzLXRhYiAudGFibGUge1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICBiYWNrZ3JvdW5kOiAjZGNkY2RjICFpbXBvcnRhbnQ7IH1cXG4gIC5ub3Rlcy10YWIgLmNlbGwge1xcbiAgICBmb250LXNpemU6IDEycHg7IH1cXG4gIC5ub3Rlcy10YWIgLmVkcy1pY29uIHtcXG4gICAgdmVydGljYWwtYWxpZ246IGJvdHRvbTsgfVxcbiAgLm5vdGVzLXRhYiAubm90ZS1idG4ge1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIHBhZGRpbmc6IDEwcHggMjVweCAhaW1wb3J0YW50O1xcbiAgICBiYWNrZ3JvdW5kOiAjNDI2ZGE5ICFpbXBvcnRhbnQ7XFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gICAgY29sb3I6ICNmZmYgIWltcG9ydGFudDtcXG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XFxuICAgIGZvbnQtc2l6ZTogMTRweDsgfVxcbiAgLm5vdGVzLXRhYiAucm93IHtcXG4gICAgcGFkZGluZzogMCAxMHB4OyB9XFxuICAgIC5ub3Rlcy10YWIgLnJvdyA+IC5jZWxsIHtcXG4gICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyB9XFxuXFxuLm1lbW8tdGFiIHVsIHtcXG4gIGRpc3BsYXk6IG5vbmU7IH1cXG4gIC5tZW1vLXRhYiB1bCBsaSB7XFxuICAgIHBhZGRpbmc6IDVweCAxMHB4OyB9XFxuXFxuLm1lbW8tdGFiW2FjdGl2ZT1cXFwidHJ1ZVxcXCJdIC5lZHMtYWNjb3JkaW9uLWNhcmV0IHtcXG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7IH1cXG5cXG4ubWVtby10YWJbYWN0aXZlPVxcXCJ0cnVlXFxcIl0gdWwge1xcbiAgZGlzcGxheTogYmxvY2s7IH1cXG4gIC5tZW1vLXRhYlthY3RpdmU9XFxcInRydWVcXFwiXSB1bCBsaSB7XFxuICAgIGJvcmRlci1ib3R0b206IG5vbmU7IH1cXG4gIC5tZW1vLXRhYlthY3RpdmU9XFxcInRydWVcXFwiXSB1bCBhIHtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDsgfVxcblxcbi5wcm9taXNlcGF5X19saW5rIHtcXG4gIG1hcmdpbi10b3A6IDEwcHggIWltcG9ydGFudDtcXG4gIHBhZGRpbmctdG9wOiA3cHggIWltcG9ydGFudDtcXG4gIHBhZGRpbmctYm90dG9tOiA3cHggIWltcG9ydGFudDtcXG4gIGJvcmRlci1ib3R0b206IG5vbmUgIWltcG9ydGFudDtcXG4gIG1hcmdpbi1ib3R0b206IDVweCAhaW1wb3J0YW50OyB9XFxuXFxuLnByb21pc2VwYXktLWxpbmthY3RpdmUge1xcbiAgYmFja2dyb3VuZDogI2ZmZjtcXG4gIGJvcmRlci1sZWZ0OiBzb2xpZCA0cHggI2Q4MmI4MDtcXG4gIHBhZGRpbmctcmlnaHQ6IDEycHggIWltcG9ydGFudDsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm9yZGVyOiAwO1xcbiAgZm9udC1zaXplOiAxMDAlO1xcbiAgZm9udDogaW5oZXJpdDtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTsgfVxcblxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBibG9jazsgfVxcblxcbmJvZHkge1xcbiAgbGluZS1oZWlnaHQ6IDE7IH1cXG5cXG5vbCwgdWwge1xcbiAgbGlzdC1zdHlsZTogbm9uZTsgfVxcblxcbmJsb2NrcXVvdGUsIHEge1xcbiAgcXVvdGVzOiBub25lOyB9XFxuXFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcbiAgY29udGVudDogJyc7XFxuICBjb250ZW50OiBub25lOyB9XFxuXFxudGFibGUge1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG4gIGJvcmRlci1zcGFjaW5nOiAwOyB9XFxuXFxuYm9keSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7IH1cXG5cXG4uY29udGFpbmVyIHtcXG4gIG1heC13aWR0aDogMTY4MHB4O1xcbiAgbWFyZ2luOiBhdXRvOyB9XFxuXFxuLmRpcy1mbGV4IHtcXG4gIGRpc3BsYXk6IGZsZXg7IH1cXG5cXG4uY2xlYXIge1xcbiAgY2xlYXI6IGJvdGg7XFxuICBmbG9hdDogbm9uZTsgfVxcblxcbi5idG4ge1xcbiAgd2lkdGg6IDEyMHB4O1xcbiAgcGFkZGluZzogMTBweCAwO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQyNmRhOTtcXG4gIGJvcmRlcjogc29saWQgMXB4ICMwMDQ1OTA7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1NZWRpdW1cXFwiICFpbXBvcnRhbnQ7XFxuICBmb250LXdlaWdodDogbm9ybWFsICFpbXBvcnRhbnQ7XFxuICBjb2xvcjogI2ZmZmZmZjtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGN1cnNvcjogcG9pbnRlcjsgfVxcbiAgLmJ0bi0tb2sge1xcbiAgICB3aWR0aDogNDVweCAhaW1wb3J0YW50O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDVweDsgfVxcbiAgLmJ0bi0tY2FuY2VsIHtcXG4gICAgYmFja2dyb3VuZDogI2Y2ZjZmNjtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggI2NjY2NjYztcXG4gICAgY29sb3I6ICMzMzMzMzM7XFxuICAgIHdpZHRoOiA4MHB4OyB9XFxuICAuYnRuLS12aWV3YWxsIHtcXG4gICAgZmxvYXQ6IHJpZ2h0O1xcbiAgICBiYWNrZ3JvdW5kOiAjZjZmNmY2O1xcbiAgICBjb2xvcjogIzBlNmViNztcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggcmdiYSgwLCA2OSwgMTQ0LCAwLjMpO1xcbiAgICBjdXJzb3I6IGF1dG87IH1cXG5cXG4uYm9yLWxlZnQtLW5vbmUge1xcbiAgYm9yZGVyLWxlZnQ6IG5vbmUgIWltcG9ydGFudDsgfVxcblxcbi5tYXItdG9wLS1ub25lIHtcXG4gIG1hcmdpbi10b3A6IDAgIWltcG9ydGFudDsgfVxcblxcbi5tYXItYm90LS1ub25lIHtcXG4gIG1hcmdpbi1ib3R0b206IDAgIWltcG9ydGFudDsgfVxcblxcbi5tYXItcmlnaHQtLW5vbmUge1xcbiAgbWFyZ2luLXJpZ2h0OiAwICFpbXBvcnRhbnQ7IH1cXG5cXG4ubWFyLXRwYnQtLTIwIHtcXG4gIG1hcmdpbjogMjBweCAwOyB9XFxuXFxuLnR4dC1hbG4tLXJpZ2h0IHtcXG4gIHRleHQtYWxpZ246IHJpZ2h0ICFpbXBvcnRhbnQ7IH1cXG5cXG4ucGFkLXRvcC0tMTAge1xcbiAgcGFkZGluZy10b3A6IDEwcHggIWltcG9ydGFudDsgfVxcblxcbi5wYWQtdG9wLS04IHtcXG4gIHBhZGRpbmctdG9wOiA4cHggIWltcG9ydGFudDsgfVxcblxcbi5jdXItLWF1dG8ge1xcbiAgY3Vyc29yOiBhdXRvICFpbXBvcnRhbnQ7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJ2YXIgZXNjYXBlID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi91cmwvZXNjYXBlLmpzXCIpO1xuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuY2FzZWxpc3RfX2NvbnQge1xcbiAgd2lkdGg6IDc3JTtcXG4gIG1hcmdpbjogMCBhdXRvOyB9XFxuXFxuLmNhc2VsaXN0X19oZWFkaW5nIHtcXG4gIGZvbnQtc2l6ZTogMjBweCAhaW1wb3J0YW50O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8tUmVndWxhclxcXCIgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gIGNvbG9yOiAjMDAwMDAwICFpbXBvcnRhbnQ7XFxuICBsaW5lLWhlaWdodDogMzlweCAhaW1wb3J0YW50OyB9XFxuXFxuLmNhc2VsaXN0X19jYXNlIHtcXG4gIG1hcmdpbjogMjVweCAzNnB4IDI1cHggMDtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIGJvcmRlcjogc29saWQgMXB4ICNjY2NjY2M7XFxuICBmbG9hdDogbGVmdDtcXG4gIHdpZHRoOiAxOC41ZW07XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4uY2FzZWxpc3RfX2Nhc2U6bnRoLWNoaWxkKDMpIC5jYXNlbGlzdF9faW5mb3RpbWUsIC5jYXNlbGlzdF9fY2FzZTpudGgtY2hpbGQoNCkgLmNhc2VsaXN0X19pbmZvdGltZSB7XFxuICBtYXJnaW4tbGVmdDogMjRweDsgfVxcblxcbi5jYXNlbGlzdF9fYm94IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNmY2ZjY7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJvcmRlci1yYWRpdXM6IDRweCA0cHggMCAwOyB9XFxuXFxuLmNhc2VsaXN0X192aXN1YWxseWhpZGRlbiB7XFxuICBib3JkZXI6IDA7XFxuICBjbGlwOiByZWN0KDAgMCAwIDApO1xcbiAgaGVpZ2h0OiAxcHg7XFxuICBtYXJnaW46IC0xcHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgcGFkZGluZzogMDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHdpZHRoOiAxcHg7IH1cXG5cXG4uY2FzZWxpc3RfX25hbWUge1xcbiAgZm9udC1zaXplOiAxNXB4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8tTWVkaXVtXFxcIiAhaW1wb3J0YW50O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4uY2FzZWxpc3RfX251bWJlciB7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1SZWd1bGFyXFxcIiAhaW1wb3J0YW50O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4uY2FzZWxpc3RfX2xpbmsge1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8tTWVkaXVtXFxcIiAhaW1wb3J0YW50O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xcbiAgY29sb3I6ICMwMDZkYmQgIWltcG9ydGFudDtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxuICBmbG9hdDogbGVmdDtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTsgfVxcblxcbi5jYXNlbGlzdF9fZ29pY29uIHtcXG4gIG1hcmdpbi1sZWZ0OiA1cHg7XFxuICB3aWR0aDogOXB4O1xcbiAgaGVpZ2h0OiAxNHB4O1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2ltYWdlcy9uZXh0X19pY29uLnBuZ1wiKSkgKyBcIikgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXIgdHJhbnNwYXJlbnQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XFxuICBmbG9hdDogcmlnaHQ7IH1cXG5cXG4uY2FzZWxpc3RfX2JhbGFuY2Uge1xcbiAgcGFkZGluZzogNXB4IDAgMDsgfVxcblxcbi5jYXNlbGlzdF9fbGFiZWwge1xcbiAgbGluZS1oZWlnaHQ6IDEuMTU7XFxuICBmb250LXNpemU6IDEzcHg7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1Cb2xkXFxcIiAhaW1wb3J0YW50O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xcbiAgY29sb3I6ICMzMzMzMzM7IH1cXG5cXG4uY2FzZWxpc3RfX3ZhbHVlIHtcXG4gIGZvbnQtc2l6ZTogMTNweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLVJlZ3VsYXJcXFwiICFpbXBvcnRhbnQ7XFxuICBmb250LXdlaWdodDogbm9ybWFsICFpbXBvcnRhbnQ7XFxuICBjb2xvcjogIzMzMzMzMztcXG4gIGZsb2F0OiByaWdodDsgfVxcblxcbi5jYXNlbGlzdF9faW5mbyB7XFxuICBwYWRkaW5nOiAxMHB4IDAgMTBweCAxNXB4O1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1pbi1oZWlnaHQ6IDEyMHB4OyB9XFxuXFxuLmNhc2VsaXN0X19pbmZvbmFtZSB7XFxuICBmb250LXNpemU6IDEzcHg7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1SZWd1bGFyXFxcIiAhaW1wb3J0YW50O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xcbiAgY29sb3I6ICNhZjE2ODU7XFxuICBsaW5lLWhlaWdodDogMS4xNTtcXG4gIG1hcmdpbi10b3A6IDNweDsgfVxcblxcbi5jYXNlbGlzdF9faW5mb3RpbWUge1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8tTWVkaXVtXFxcIiAhaW1wb3J0YW50O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xcbiAgY29sb3I6ICM4ODg4ODg7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgbWFyZ2luLXRvcDogNXB4O1xcbiAgZmxvYXQ6IGxlZnQ7IH1cXG5cXG4uY2FzZWxpc3RfX3VzZXIge1xcbiAgd2lkdGg6IDI1NXB4O1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbiAgcGFkZGluZzogN3B4IDAgMDtcXG4gIG1hcmdpbi10b3A6IDQwcHg7XFxuICBib3JkZXItdG9wOiBzb2xpZCAxcHggI2RjZGNkYztcXG4gIGZvbnQtc2l6ZTogMTNweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLVJlZ3VsYXJcXFwiICFpbXBvcnRhbnQ7XFxuICBmb250LXdlaWdodDogbm9ybWFsICFpbXBvcnRhbnQ7XFxuICBjb2xvcjogIzMzMzMzMztcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHJpZ2h0OiAwO1xcbiAgYm90dG9tOiAxMHB4OyB9XFxuXFxuLmNhc2VsaXN0X19wcm9maWxlaWNvbiB7XFxuICBvcGFjaXR5OiAwLjM7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICByaWdodDogLTE1cHg7XFxuICB0b3A6IC0xM3B4O1xcbiAgd2lkdGg6IDEwMHB4O1xcbiAgaGVpZ2h0OiAxMDBweDtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9pbWFnZXMvcHJvZmlsZV9faWNvbi5wbmdcIikpICsgXCIpIG5vLXJlcGVhdCBjZW50ZXIgY2VudGVyIHRyYW5zcGFyZW50O1xcbiAgYmFja2dyb3VuZC1zaXplOiAxMDAlOyB9XFxuXFxuLmNhc2VsaXN0LS1ub2JnIHtcXG4gIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCAjZGNkY2RjO1xcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjsgfVxcblxcbi5jYXNlbGlzdF9fdXNlcmljb24ge1xcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XFxuICBtYXJnaW4tdG9wOiAzcHg7XFxuICB3aWR0aDogMTRweDtcXG4gIGhlaWdodDogMTRweDtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9pbWFnZXMvdXNlcl9faWNvbi5wbmdcIikpICsgXCIpIG5vLXJlcGVhdCBjZW50ZXIgY2VudGVyIHRyYW5zcGFyZW50O1xcbiAgYmFja2dyb3VuZC1zaXplOiAxMDAlOyB9XFxuXFxuLmNhc2VsaXN0X19maWxlaWNvbiB7XFxuICBtYXJnaW4tcmlnaHQ6IDVweDtcXG4gIHdpZHRoOiAxNXB4O1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2ltYWdlcy9maWxlX19pY29uLnBuZ1wiKSkgKyBcIikgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXIgdHJhbnNwYXJlbnQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7IH1cXG5cXG4uY2FzZWxpc3RfX2RpdmVydGljb24ge1xcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XFxuICB3aWR0aDogMThweDtcXG4gIGhlaWdodDogMzBweDtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9pbWFnZXMvZGl2ZXJ0X19pY29uLnBuZ1wiKSkgKyBcIikgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXIgdHJhbnNwYXJlbnQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7IH1cXG5cXG4uY2FzZWxpc3RfX2ZvbGRlcmljb24ge1xcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XFxuICB3aWR0aDogMThweDtcXG4gIGhlaWdodDogMzBweDtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9pbWFnZXMvdXNlcmZvbGRlcl9pY29uLnBuZ1wiKSkgKyBcIikgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXIgdHJhbnNwYXJlbnQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7IH1cXG5cXG4uY2FzZWxpc3RfX2JvbGR0ZXh0IHtcXG4gIGZvbnQtc2l6ZTogMTNweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLUJvbGRcXFwiICFpbXBvcnRhbnQ7XFxuICBmb250LXdlaWdodDogbm9ybWFsICFpbXBvcnRhbnQ7XFxuICBjb2xvcjogI2FmMTY4NTsgfVxcblxcbi5jYXNlbGlzdF9fc2Vjb25kbGluZSB7XFxuICBmb250LXNpemU6IDEzcHg7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1SZWd1bGFyXFxcIiAhaW1wb3J0YW50O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xcbiAgY29sb3I6ICNhZjE2ODU7XFxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgd2lkdGg6IDg4JTtcXG4gIGZsb2F0OiBsZWZ0OyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuY29udGFjdGRldGFpbHNfX2lubmVyY29udCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGNsZWFyOiBib3RoO1xcbiAgcGFkZGluZzogMDsgfVxcblxcbi5jb250YWN0ZGV0YWlsc19faGVhZGVyQ29udGFpbmVyIHtcXG4gIGhlaWdodDogYXV0bztcXG4gIG92ZXJmbG93OiBoaWRkZW47IH1cXG5cXG4uY29udGFjdGRldGFpbHNfX2hlYWRlcnRleHQge1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgZm9udC1zaXplOiAyMHB4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8tTWVkaXVtXFxcIiAhaW1wb3J0YW50O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4uY29udGFjdGRldGFpbHNfX2J0biB7XFxuICBmbG9hdDogcmlnaHQ7XFxuICB3aWR0aDogMTM0cHg7XFxuICBoZWlnaHQ6IDM0cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRURGNEZBO1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggcmdiYSgwLCA2OSwgMTQ0LCAwLjMpO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8tTWVkaXVtXFxcIiAhaW1wb3J0YW50O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xcbiAgY29sb3I6ICMwZTZlYjc7IH1cXG5cXG4uY29udGFjdGRldGFpbHNfX2FjY29yZGlhbiB7XFxuICBoZWlnaHQ6IDQyN3B4O1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggI2NjY2NjYztcXG4gIGNsZWFyOiBib3RoO1xcbiAgcGFkZGluZzogMTBweCAzNXB4O1xcbiAgbWFyZ2luLXRvcDogNTBweDsgfVxcblxcbi5jb250YWN0ZGV0YWlsc19fYWRkcmVzc3RleHQge1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLU1lZGl1bVxcXCIgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gIGNvbG9yOiAjMDAwMDAwO1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIHBhZGRpbmctbGVmdDogMTlweDsgfVxcblxcbi5jb250YWN0ZGV0YWlsc19fc2VsZWN0LS1yaWdodCB7XFxuICBmbG9hdDogcmlnaHQ7IH1cXG5cXG4uY29udGFjdGRldGFpbHNfX2xpc3QtLXRleHQge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB9XFxuXFxuLmNvbnRhY3RkZXRhaWxzX19hZGRyZXNzaGVhZGVyIHtcXG4gIHBhZGRpbmc6IDEycHggMTJweCAxMnB4IDEycHg7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NjY2NjYztcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNmY2ZjY7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7IH1cXG5cXG4uY29udGFjdGRldGFpbHNfX2VkaXQge1xcbiAgZmxvYXQ6IHJpZ2h0OyB9XFxuXFxuLmNvbnRhY3RkZXRhaWxzX19lZGl0dGV4dCB7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1NZWRpdW1cXFwiICFpbXBvcnRhbnQ7XFxuICBmb250LXdlaWdodDogbm9ybWFsICFpbXBvcnRhbnQ7XFxuICBjb2xvcjogIzBlNmViNztcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7IH1cXG4gIC5jb250YWN0ZGV0YWlsc19fZWRpdHRleHQgc3ZnIHtcXG4gICAgdmVydGljYWwtYWxpZ246IGJvdHRvbTtcXG4gICAgZmlsbDogIzBlNmViNzsgfVxcblxcbi5jb250YWN0ZGV0YWlsc19faGVhZHRleHQge1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gIGNvbG9yOiAjNmQyMDc3O1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgZm9udC13ZWlnaHQ6IDUwMDsgfVxcblxcbi5jb250YWN0ZGV0YWlsc19fYWNjb3JkaWFuLS1yb3RhdGUge1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cXG5cXG4uY29udGFjdGRldGFpbHNfX2hlYWRlcnRleHQtLXBhZGRpbmcge1xcbiAgcGFkZGluZy1sZWZ0OiAyNnB4OyB9XFxuXFxuLmNvbnRhY3RkZXRhaWxzX19jbG9zZWRhY2NvcmRpYW4ge1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjY2NjYztcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiAwIDAgNnB4IDZweDtcXG4gIG1hcmdpbi10b3A6IC0yNXB4O1xcbiAgbWFyZ2luLWJvdHRvbTogNDVweDsgfVxcblxcbi5jb250YWN0ZGV0YWlsc19fbGlzdC0tZGlzcGxheSB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogc3ViOyB9XFxuICAuY29udGFjdGRldGFpbHNfX2xpc3QtLWRpc3BsYXkgYSB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgdmVydGljYWwtYWxpZ246IHN1YjsgfVxcbiAgICAuY29udGFjdGRldGFpbHNfX2xpc3QtLWRpc3BsYXkgYSAuY29udGFjdGRldGFpbHNfX2Vkcy1hY2NvcmRpb24tY2FyZXQge1xcbiAgICAgIHRvcDogOHB4OyB9XFxuXFxuLmNvbnRhY3RkZXRhaWxzX19lZHMtYWNjb3JkaW9uLWNhcmV0IHtcXG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XFxuICB0b3A6IDIwcHg7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogMTJweDtcXG4gIGhlaWdodDogOHB4O1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQRDk0Yld3Z2RtVnljMmx2YmowaU1TNHdJaUJsYm1OdlpHbHVaejBpVlZSR0xUZ2lQejRLUEhOMlp5QjNhV1IwYUQwaU1USndlQ0lnYUdWcFoyaDBQU0kzY0hnaUlIWnBaWGRDYjNnOUlqQWdNQ0F4TWlBM0lpQjJaWEp6YVc5dVBTSXhMakVpSUhodGJHNXpQU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh5TURBd0wzTjJaeUlnZUcxc2JuTTZlR3hwYm1zOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6RTVPVGt2ZUd4cGJtc2lQZ29nSUNBZ1BDRXRMU0JIWlc1bGNtRjBiM0k2SUZOclpYUmphQ0EwT0M0eUlDZzBOek15TnlrZ0xTQm9kSFJ3T2k4dmQzZDNMbUp2YUdWdGFXRnVZMjlrYVc1bkxtTnZiUzl6YTJWMFkyZ2dMUzArQ2lBZ0lDQThkR2wwYkdVK1IzSnZkWEFnTWp3dmRHbDBiR1UrQ2lBZ0lDQThaR1Z6WXo1RGNtVmhkR1ZrSUhkcGRHZ2dVMnRsZEdOb0xqd3ZaR1Z6WXo0S0lDQWdJRHhrWldaelBqd3ZaR1ZtY3o0S0lDQWdJRHhuSUdsa1BTSlFZV2RsTFRJeklpQnpkSEp2YTJVOUltNXZibVVpSUhOMGNtOXJaUzEzYVdSMGFEMGlNU0lnWm1sc2JEMGlibTl1WlNJZ1ptbHNiQzF5ZFd4bFBTSmxkbVZ1YjJSa0lqNEtJQ0FnSUNBZ0lDQThaeUJwWkQwaVIzSnZkWEF0TWlJZ2RISmhibk5tYjNKdFBTSjBjbUZ1YzJ4aGRHVW9OaTR3TURBd01EQXNJREV1TURBd01EQXdLU0J5YjNSaGRHVW9MVFExTGpBd01EQXdNQ2tnZEhKaGJuTnNZWFJsS0MwMkxqQXdNREF3TUN3Z0xURXVNREF3TURBd0tTQjBjbUZ1YzJ4aGRHVW9NaTR3TURBd01EQXNJQzB6TGpBd01EQXdNQ2tpSUdacGJHdzlJaU13UlRaRlFqY2lQZ29nSUNBZ0lDQWdJQ0FnSUNBOGNtVmpkQ0JwWkQwaVVtVmpkR0Z1WjJ4bExUSWlJSGc5SWpBaUlIazlJakFpSUhkcFpIUm9QU0l5SWlCb1pXbG5hSFE5SWpnaUlISjRQU0l4SWo0OEwzSmxZM1ErQ2lBZ0lDQWdJQ0FnSUNBZ0lEeHlaV04wSUdsa1BTSlNaV04wWVc1bmJHVXRNaTFEYjNCNUlpQjBjbUZ1YzJadmNtMDlJblJ5WVc1emJHRjBaU2cwTGpBd01EQXdNQ3dnTnk0d01EQXdNREFwSUhKdmRHRjBaU2c1TUM0d01EQXdNREFwSUhSeVlXNXpiR0YwWlNndE5DNHdNREF3TURBc0lDMDNMakF3TURBd01Da2dJaUI0UFNJeklpQjVQU0l6SWlCM2FXUjBhRDBpTWlJZ2FHVnBaMmgwUFNJNElpQnllRDBpTVNJK1BDOXlaV04wUGdvZ0lDQWdJQ0FnSUR3dlp6NEtJQ0FnSUR3dlp6NEtQQzl6ZG1jK1xcXCIpOyB9XFxuXFxuLmNvbnRhY3RkZXRhaWxzX19zZWxlY3QtLXJpZ2h0IHtcXG4gIG1hcmdpbi10b3A6IDAgIWltcG9ydGFudDsgfVxcblxcbi5jb250YWN0ZGV0YWlsc19fbGlzdC0tZGlzcGxheSB7XFxuICBkaXNwbGF5OiB1bnNldDsgfVxcblxcbi5jb250YWN0ZGV0YWlsc19faW5uZXJlZHMge1xcbiAgcGFkZGluZzogMjBweCAzOHB4OyB9XFxuXFxuLmNvbnRhY3RkZXRhaWxzX193aWR0aCB7XFxuICBoZWlnaHQ6IDQzcHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1hcmdpbjogYXV0bztcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjY2NjO1xcbiAgcGFkZGluZzogMCAwIDEwcHggMDsgfVxcblxcbi5jb250YWN0ZGV0YWlsc19fdmFsaWRpdHktLXBhZGRpbmcxNSB7XFxuICBwYWRkaW5nLWxlZnQ6IDE1cHg7IH1cXG5cXG4uY29udGFjdGRldGFpbHNfX2hyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgY29sb3I6ICNjY2NjY2M7XFxuICBtYXJnaW46IDI4cHggMDtcXG4gIGJvcmRlcjogMC41cHggc29saWQ7IH1cXG5cXG4uY29udGFjdGRldGFpbHNfX2FkZHJlc3NkZXRhaWxzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgd2lkdGg6IDEwMCU7IH1cXG5cXG4uY29udGFjdGRldGFpbHNfX2hvbWVhZGRyZXNzIHtcXG4gIHdpZHRoOiA0Ny41JTtcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gIGJvcmRlcjogc29saWQgMXB4ICNjY2NjY2M7XFxuICBoZWlnaHQ6IDUwJTsgfVxcblxcbi5jb250YWN0ZGV0YWlsc19fd29ya2FkZHJlc3Mge1xcbiAgd2lkdGg6IDQ3LjUlO1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggI2NjY2NjYzsgfVxcblxcbi5jb250YWN0ZGV0YWlsc19fYWRkcmVzc2hlYWRlci0tdG9wYm9yZGVyIHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjY2NjY2NjOyB9XFxuXFxuLmNvbnRhY3RkZXRhaWxzX192YWxpZGl0eS0tcGFkZGluZyB7XFxuICBwYWRkaW5nOiAwIDAgMTVweCAxNXB4OyB9XFxuXFxuLmNvbnRhY3RkZXRhaWxzX19hZGRyZXNzIHtcXG4gIHBhZGRpbmc6IDIwcHggMTVweCAxNXB4O1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8tTWVkaXVtXFxcIiAhaW1wb3J0YW50O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4uY29udGFjdGRldGFpbHNfX3ZhbGlkaXR5IHtcXG4gIGZvbnQtc2l6ZTogMTNweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLU1lZGl1bVxcXCIgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gIGNvbG9yOiAjODg4ODg4O1xcbiAgZm9udC13ZWlnaHQ6IDUwMDsgfVxcblxcbi5jb250YWN0ZGV0YWlsc19fdmFsaWRpdHktLWZvbnQge1xcbiAgZm9udC1zaXplOiAxM3B4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8tUmVndWxhclxcXCIgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gIGNvbG9yOiAjODg4ODg4OyB9XFxuXFxuLmNvbnRhY3RkZXRhaWxzX19hZGRyZXNzaGVhZGVyLS1kaXNwbGF5aW5saW5lIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jazsgfVxcblxcbltsYWJlbD1cXFwiUHJvZmlsZVxcXCJdIC5hbGwtdXNlcnMtZGQsIFtsYWJlbD1cXFwiUHJvZmlsZVxcXCJdIC5mb3JtLXN3aXRjaCB7XFxuICBkaXNwbGF5OiBub25lOyB9XFxuXFxuW2xhYmVsPVxcXCJQcm9maWxlXFxcIl0gLnNvcnQtZmlsdGVyID4gZGl2IHtcXG4gIGZsZXg6IG5vbmU7IH1cXG4gIFtsYWJlbD1cXFwiUHJvZmlsZVxcXCJdIC5zb3J0LWZpbHRlciA+IGRpdjpmaXJzdC1jaGlsZCB7XFxuICAgIG1hcmdpbi1sZWZ0OiAxNXB4OyB9XFxuXFxuW2xhYmVsPVxcXCJQcm9maWxlXFxcIl0gLnNvcnQtYnktY29udGFpbmVyIHtcXG4gIG1hcmdpbi1sZWZ0OiAzMHB4OyB9XFxuXFxuW2xhYmVsPVxcXCJQcm9maWxlXFxcIl0gZWRzLWFjY29yZGlvbiB7XFxuICBkaXNwbGF5OiBub25lOyB9XFxuICBbbGFiZWw9XFxcIlByb2ZpbGVcXFwiXSBlZHMtYWNjb3JkaW9uLmRhdGEsIFtsYWJlbD1cXFwiUHJvZmlsZVxcXCJdIGVkcy1hY2NvcmRpb24uY29udGFjdC1kZXRhaWxzLWNhcmQge1xcbiAgICBkaXNwbGF5OiBibG9jazsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmZvbnQtd3Q1MDAge1xcbiAgZm9udC13ZWlnaHQ6IDUwMDsgfVxcblxcbi5mb250LXd0bm9ybWFsIHtcXG4gIGZvbnQtZmFtaWx5OiBSb2JvdG8gIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDsgfVxcblxcbi5wb3MtcmVsIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi50ZXh0LUNhcCB7XFxuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTsgfVxcblxcbi52LWFsaWduLXRvcCB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogdG9wOyB9XFxuXFxuLm1hcmdpbkJ0bTIwIHtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHggIWltcG9ydGFudDsgfVxcblxcbi5tYXJnaW5CdG0zMCB7XFxuICBtYXJnaW4tYm90dG9tOiAzMHB4ICFpbXBvcnRhbnQ7IH1cXG5cXG4ubWFyZ2luQnRtNDYge1xcbiAgbWFyZ2luLWJvdHRvbTogNDZweCAhaW1wb3J0YW50OyB9XFxuXFxuLm1hcmdpblRvcDIwIHtcXG4gIG1hcmdpbi10b3A6IDIwcHggIWltcG9ydGFudDsgfVxcblxcbi5tYXJnaW5MZnQzNiB7XFxuICBtYXJnaW4tbGVmdDogMzZweCAhaW1wb3J0YW50OyB9XFxuXFxuLmNvbnRhaW5lclNpZGUge1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGhlaWdodDogODcwcHg7XFxuICB3aWR0aDogMzAwcHg7IH1cXG4gIC5jb250YWluZXJTaWRlLmxlZnQge1xcbiAgICB3aWR0aDogMzMwcHg7XFxuICAgIHBhZGRpbmc6IDEwcHggMDsgfVxcbiAgLmNvbnRhaW5lclNpZGU6bGFzdC1jaGlsZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmNmY2ZjY7XFxuICAgIHBhZGRpbmc6IDEwcHggMDsgfVxcbiAgLmNvbnRhaW5lclNpZGU6Zmlyc3QtY2hpbGQge1xcbiAgICBwYWRkaW5nLXRvcDogMTVweDsgfVxcblxcbi5jb250YWluZXJNaWRkbGUge1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGhlaWdodDogODcwcHg7XFxuICBwYWRkaW5nLXRvcDogMTVweDtcXG4gIGZsZXg6IDAuOTU7XFxuICB2ZXJ0aWNhbC1hbGlnbjogdG9wOyB9XFxuICAuY29udGFpbmVyTWlkZGxlIGVkcy1jYXJkIGhlYWRlciB7XFxuICAgIGJvcmRlci1ib3R0b206IDA7IH1cXG4gIC5jb250YWluZXJNaWRkbGUgZWRzLWRyb3Bkb3duIHtcXG4gICAgbWFyZ2luLXRvcDogMjBweDsgfVxcblxcbi5jb250YWluZXJGbGV4IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBoZWlnaHQ6IDEwMDBweDsgfVxcblxcbmVkcy1hY2NvcmRpb246Zmlyc3QtY2hpbGQge1xcbiAgbWFyZ2luLXRvcDogMDsgfVxcblxcbmVkcy1jYXJkOmZpcnN0LWNoaWxkIHtcXG4gIG1hcmdpbi10b3A6IDA7IH1cXG5cXG5lZHMtY2FyZCBoZWFkZXIgaDQge1xcbiAgZm9udC13ZWlnaHQ6IDUwMCAhaW1wb3J0YW50OyB9XFxuXFxuZWRzLWNhcmQgaGVhZGVyIGRpdjpmaXJzdC1jaGlsZCB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXG5cXG5lZHMtY2FyZCBoZWFkZXIgZGl2Omxhc3QtY2hpbGQge1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrOyB9XFxuXFxuZWRzLWNhcmQgbWFpbiB7XFxuICBtYXJnaW46IC0yMHB4ICFpbXBvcnRhbnQ7XFxuICBtYXJnaW4tYm90dG9tOiAtMTVweCAhaW1wb3J0YW50OyB9XFxuXFxuZWRzLWRyb3Bkb3duIHtcXG4gIG1pbi13aWR0aDogMTMwcHg7IH1cXG5cXG4uZ3JleUhlYWRpbmcgYnV0dG9uIHtcXG4gIG1hcmdpbjogMCAhaW1wb3J0YW50O1xcbiAgcGFkZGluZy1sZWZ0OiAyMHB4ICFpbXBvcnRhbnQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZXNtb2tlICFpbXBvcnRhbnQ7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgY29sb3I6ICM2ZDIwNzc7IH1cXG5cXG4udGFibGUge1xcbiAgcGFkZGluZzogMTBweCAwO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB3aWR0aDogMTAwJTsgfVxcbiAgLnRhYmxlIC5yb3cge1xcbiAgICBwYWRkaW5nOiAzcHggMjBweDsgfVxcblxcbi5ldmVuLXN0eWxlIC5yb3c6bnRoLWNoaWxkKGV2ZW4pIHtcXG4gIGJhY2tncm91bmQ6ICNmNmY2ZjY7IH1cXG5cXG4ucm93IHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDEwMCU7IH1cXG4gIC5yb3cgPiAuY2VsbCB7XFxuICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7IH1cXG5cXG4uY2VsbCB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aWR0aDogNDklO1xcbiAgZm9udC1zaXplOiAxM3B4OyB9XFxuICAuY2VsbDpmaXJzdC1jaGlsZCB7XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7IH1cXG4gIC5jZWxsOmxhc3QtY2hpbGQge1xcbiAgICB0ZXh0LWFsaWduOiByaWdodDsgfVxcblxcbi50YWJsZS5taWRkbGUgLmNlbGwge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgd2lkdGg6IDQ5JTtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiAyMiU7XFxuICBwYWRkaW5nOiA1cHg7IH1cXG4gIC50YWJsZS5taWRkbGUgLmNlbGw6Zmlyc3QtY2hpbGQge1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgICBmb250LXdlaWdodDogNTAwOyB9XFxuICAudGFibGUubWlkZGxlIC5jZWxsOmxhc3QtY2hpbGQge1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0OyB9XFxuXFxuLnRhYmxlLm1pZGRsZSAucm93IHtcXG4gIHdpZHRoOiAxMDAlOyB9XFxuXFxuZWRzLWFjY29yZGlvbi1wYW5lbFthcmlhLWV4cGFuZGVkPVxcXCJmYWxzZVxcXCJdIC50YWJsZSB7XFxuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH1cXG5cXG5lZHMtaWNvbi5yb3VuZC1ib3JkZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBlNmViNztcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHdpZHRoOiAyMXB4O1xcbiAgaGVpZ2h0OiAyMXB4O1xcbiAgdmVydGljYWwtYWxpZ246IHRleHQtYm90dG9tOyB9XFxuICBlZHMtaWNvbi5yb3VuZC1ib3JkZXIgaSB7XFxuICAgIGZvbnQtc2l6ZTogMTNweDtcXG4gICAgcGFkZGluZy10b3A6IDNweDsgfVxcblxcbmJ1dHRvbi5lZHMtYWNjb3JkaW9uLWxhYmVsIHtcXG4gIGhlaWdodDogYXV0byAhaW1wb3J0YW50OyB9XFxuXFxuZWRzLW9wdGlvbiB7XFxuICBkaXNwbGF5OiBub25lOyB9XFxuXFxuLmFjY3QtY29udGFpbmVyIC50YWJsZS5taWRkbGUgLmNlbGw6bnRoLWNoaWxkKDIpIHtcXG4gIHdpZHRoOiAxNSU7IH1cXG5cXG4uZXZlbkhpZ2hsaWdodCAucm93Om50aC1jaGlsZChldmVuKSB7XFxuICBiYWNrZ3JvdW5kOiAjZjZmNmY2OyB9XFxuXFxuW3Nsb3Q9XFxcInNsb3QtaGVhZGVyLWNlbnRlclxcXCJdIHtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZDhkOGQ4O1xcbiAgcGFkZGluZy1ib3R0b206IDhweDsgfVxcblxcbi5mb3JtLXN3aXRjaCB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50OyB9XFxuXFxuLmZvcm0tc3dpdGNoIGkge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgbWFyZ2luLXJpZ2h0OiAuNXJlbTtcXG4gIHdpZHRoOiA0NnB4O1xcbiAgaGVpZ2h0OiAyNnB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzg4ODg4ODtcXG4gIGJvcmRlci1yYWRpdXM6IDIzcHg7XFxuICB2ZXJ0aWNhbC1hbGlnbjogdGV4dC1ib3R0b207XFxuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBsaW5lYXI7XFxuICB0b3A6IDVweDtcXG4gIG1hcmdpbi1sZWZ0OiA1cHg7IH1cXG5cXG4uZm9ybS1zd2l0Y2ggaTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiA0MnB4O1xcbiAgaGVpZ2h0OiAyMnB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y2ZjZmNjtcXG4gIGJvcmRlci1yYWRpdXM6IDExcHg7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDJweCwgMnB4LCAwKSBzY2FsZTNkKDEsIDEsIDEpO1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuMjVzIGxpbmVhcjsgfVxcblxcbi5mb3JtLXN3aXRjaCBpOjphZnRlciB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDJweDtcXG4gIHdpZHRoOiAxNnB4O1xcbiAgaGVpZ2h0OiAxNnB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzg4ODg4ODtcXG4gIGJvcmRlci1yYWRpdXM6IDExcHg7XFxuICBib3gtc2hhZG93OiAwIDJweCAycHggcmdiYSgwLCAwLCAwLCAwLjI0KTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMnB4LCAycHgsIDApO1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZS1pbi1vdXQ7XFxuICB0b3A6IDNweDsgfVxcblxcbi5mb3JtLXN3aXRjaDphY3RpdmUgaTo6YWZ0ZXIge1xcbiAgd2lkdGg6IDI4cHg7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDJweCwgMnB4LCAwKTsgfVxcblxcbi5mb3JtLXN3aXRjaDphY3RpdmUgaW5wdXQ6Y2hlY2tlZCArIGk6OmFmdGVyIHtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMTZweCwgMnB4LCAwKTsgfVxcblxcbi5mb3JtLXN3aXRjaCBpbnB1dCB7XFxuICBkaXNwbGF5OiBub25lOyB9XFxuXFxuLmZvcm0tc3dpdGNoIGlucHV0OmNoZWNrZWQgKyBpIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0QkQ3NjM7IH1cXG5cXG4uZm9ybS1zd2l0Y2ggaW5wdXQ6Y2hlY2tlZCArIGk6OmJlZm9yZSB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDE4cHgsIDJweCwgMCkgc2NhbGUzZCgwLCAwLCAwKTsgfVxcblxcbi5mb3JtLXN3aXRjaCBpbnB1dDpjaGVja2VkICsgaTo6YWZ0ZXIge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgyMnB4LCAycHgsIDApOyB9XFxuXFxuLnNvcnQtZmlsdGVyIHtcXG4gIGJhY2tncm91bmQ6ICNkMmU4Zjk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcbiAgZmxleDogNTtcXG4gIHBhZGRpbmc6IDVweCAxNXB4OyB9XFxuICAuc29ydC1maWx0ZXIgZWRzLWRyb3Bkb3duIHtcXG4gICAgbWFyZ2luOiAwOyB9XFxuICAuc29ydC1maWx0ZXIgbGFiZWwge1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogc3VwZXI7XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgZm9udC13ZWlnaHQ6IDUwMDsgfVxcbiAgLnNvcnQtZmlsdGVyID4gZGl2IHtcXG4gICAgZmxleDogMTsgfVxcbiAgLnNvcnQtZmlsdGVyID4gZGl2OmZpcnN0LWNoaWxkIHtcXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XFxuICAgIG1hcmdpbi1yaWdodDogMTBweDsgfVxcbiAgLnNvcnQtZmlsdGVyID4gZGl2Omxhc3QtY2hpbGQge1xcbiAgICB0ZXh0LWFsaWduOiByaWdodDsgfVxcblxcbi5hY2N0LWNvbnRhaW5lciAuc29ydC1maWx0ZXIgZWRzLWRyb3Bkb3duIHtcXG4gIG1pbi13aWR0aDogMTUwcHg7IH1cXG5cXG4uY29udGFjdC1kZXRhaWxzLWNhcmQgLnRhYmxlIHtcXG4gIHBhZGRpbmc6IDA7IH1cXG4gIC5jb250YWN0LWRldGFpbHMtY2FyZCAudGFibGUgLnJvdzpmaXJzdC1jaGlsZCAuY2VsbDpsYXN0LWNoaWxkIHtcXG4gICAgd2lkdGg6IDQzJTsgfVxcbiAgLmNvbnRhY3QtZGV0YWlscy1jYXJkIC50YWJsZSAucm93IHtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkOGQ4ZDg7XFxuICAgIHBhZGRpbmc6IDEwcHggMjBweDsgfVxcbiAgICAuY29udGFjdC1kZXRhaWxzLWNhcmQgLnRhYmxlIC5yb3cgLmNlbGw6Zmlyc3QtY2hpbGQge1xcbiAgICAgIHdpZHRoOiAzNCU7IH1cXG4gICAgLmNvbnRhY3QtZGV0YWlscy1jYXJkIC50YWJsZSAucm93IC5jZWxsOmxhc3QtY2hpbGQge1xcbiAgICAgIHdpZHRoOiA2MyU7IH1cXG4gIC5jb250YWN0LWRldGFpbHMtY2FyZCAudGFibGUgLnJvdyAuY2VsbCB7XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qXFxuICogVGhlc2UgdmFyaWFibGVzIGFyZSBhdmFpbGFibGUgdG8gYWxsIGNvbXBvbmVudHMgZ2xvYmFsbHkgYW5kIGFyZSB0aHVzIGRlc2lnbmF0ZWQgd2l0aCBhbiBcXFwiZWRzLVxcXCIgcHJlZml4LlxcbiAqIENvbXBvbmVudHMgbWF5IGltcGxlbWVudCB0aGVzZSBhbmQgcGFzcy10aHJvdWdoIHRvIGEgbG9jYWwgdmFyaWFibGUgbmFtZS5cXG4gKi9cXG4vKlxcbiAqIFRoZXNlIHZhcmlhYmxlcyBhcmUgYXZhaWxhYmxlIHRvIGFsbCBjb21wb25lbnRzIGdsb2JhbGx5IGFuZCBhcmUgdGh1cyBkZXNpZ25hdGVkIHdpdGggYW4gXFxcImVkcy1cXFwiIHByZWZpeC5cXG4gKiBDb21wb25lbnRzIG1heSBpbXBsZW1lbnQgdGhlc2UgYW5kIHBhc3MtdGhyb3VnaCB0byBhIGxvY2FsIHZhcmlhYmxlIG5hbWUuXFxuICovXFxuZWRzLWNhcmQge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgbWFyZ2luOiAyMHB4IDA7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZDhkOGQ4O1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjsgfVxcbiAgZWRzLWNhcmQgPiBoMSB7XFxuICAgIG1hcmdpbi10b3A6IDA7IH1cXG4gIGVkcy1jYXJkID4gaDIge1xcbiAgICBtYXJnaW4tdG9wOiAwOyB9XFxuICBlZHMtY2FyZCA+IGgzIHtcXG4gICAgbWFyZ2luLXRvcDogMDsgfVxcbiAgZWRzLWNhcmQgPiBoNCB7XFxuICAgIG1hcmdpbi10b3A6IDA7IH1cXG4gIGVkcy1jYXJkID4gaDUge1xcbiAgICBtYXJnaW4tdG9wOiAwOyB9XFxuICBlZHMtY2FyZCA+IGg2IHtcXG4gICAgbWFyZ2luLXRvcDogMDsgfVxcbiAgZWRzLWNhcmQgcCB7XFxuICAgIG1hcmdpbi10b3A6IDA7IH1cXG4gICAgZWRzLWNhcmQgcDpsYXN0LWNoaWxkIHtcXG4gICAgICBtYXJnaW4tYm90dG9tOiAwOyB9XFxuICBlZHMtY2FyZCBoZWFkZXIge1xcbiAgICBtYXJnaW46IC0yMHB4IC0yMHB4IDIwcHg7XFxuICAgIHBhZGRpbmc6IDEycHggMjBweDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkOGQ4ZDg7IH1cXG4gICAgZWRzLWNhcmQgaGVhZGVyID4gaDEge1xcbiAgICAgIG1hcmdpbjogMDsgfVxcbiAgICBlZHMtY2FyZCBoZWFkZXIgPiBoMiB7XFxuICAgICAgbWFyZ2luOiAwOyB9XFxuICAgIGVkcy1jYXJkIGhlYWRlciA+IGgzIHtcXG4gICAgICBtYXJnaW46IDA7IH1cXG4gICAgZWRzLWNhcmQgaGVhZGVyID4gaDQge1xcbiAgICAgIG1hcmdpbjogMDsgfVxcbiAgICBlZHMtY2FyZCBoZWFkZXIgPiBoNSB7XFxuICAgICAgbWFyZ2luOiAwOyB9XFxuICAgIGVkcy1jYXJkIGhlYWRlciA+IGg2IHtcXG4gICAgICBtYXJnaW46IDA7IH1cXG4gICAgZWRzLWNhcmQgaGVhZGVyIHAge1xcbiAgICAgIG1hcmdpbjogMDsgfVxcbiAgZWRzLWNhcmQgaGVhZGVyLmZsdXNoIHtcXG4gICAgcGFkZGluZzogMDsgfVxcbiAgICBlZHMtY2FyZCBoZWFkZXIuZmx1c2ggZWRzLXRvb2xiYXIge1xcbiAgICAgIGJvcmRlci1ib3R0b206IDA7IH1cXG4gIGVkcy1jYXJkIG1haW4ge1xcbiAgICBsaW5lLWhlaWdodDogMS40cmVtOyB9XFxuICBlZHMtY2FyZCBmb290ZXIge1xcbiAgICBtYXJnaW46IDIwcHggLTIwcHggLTIwcHg7XFxuICAgIHBhZGRpbmc6IDE1cHggMjBweDtcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkOGQ4ZDg7IH1cXG4gICAgZWRzLWNhcmQgZm9vdGVyIHA6bGFzdC1jaGlsZCB7XFxuICAgICAgbWFyZ2luOiAwOyB9XFxuICBlZHMtY2FyZCBmb290ZXIuZmx1c2gge1xcbiAgICBwYWRkaW5nOiAwOyB9XFxuICAgIGVkcy1jYXJkIGZvb3Rlci5mbHVzaCBlZHMtdG9vbGJhciB7XFxuICAgICAgYm9yZGVyLWJvdHRvbTogMDsgfVxcblxcbmVkcy1jYXJkW2JhY2tncm91bmQ9J2dyYXknXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjZmNmY2OyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKlxcbiAqIFRoZXNlIHZhcmlhYmxlcyBhcmUgYXZhaWxhYmxlIHRvIGFsbCBjb21wb25lbnRzIGdsb2JhbGx5IGFuZCBhcmUgdGh1cyBkZXNpZ25hdGVkIHdpdGggYW4gXFxcImVkcy1cXFwiIHByZWZpeC5cXG4gKiBDb21wb25lbnRzIG1heSBpbXBsZW1lbnQgdGhlc2UgYW5kIHBhc3MtdGhyb3VnaCB0byBhIGxvY2FsIHZhcmlhYmxlIG5hbWUuXFxuICovXFxuLypcXG4gKiBUaGVzZSB2YXJpYWJsZXMgYXJlIGF2YWlsYWJsZSB0byBhbGwgY29tcG9uZW50cyBnbG9iYWxseSBhbmQgYXJlIHRodXMgZGVzaWduYXRlZCB3aXRoIGFuIFxcXCJlZHMtXFxcIiBwcmVmaXguXFxuICogQ29tcG9uZW50cyBtYXkgaW1wbGVtZW50IHRoZXNlIGFuZCBwYXNzLXRocm91Z2ggdG8gYSBsb2NhbCB2YXJpYWJsZSBuYW1lLlxcbiAqL1xcbmVkcy1kcm9wZG93biB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgdmVydGljYWwtYWxpZ246IGJvdHRvbTsgfVxcbiAgZWRzLWRyb3Bkb3duIC5zbG90dGVkIHtcXG4gICAgZGlzcGxheTogbm9uZTsgfVxcbiAgZWRzLWRyb3Bkb3duID4gbGFiZWwge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBmb250LWZhbWlseTogXFxcIlJvYm90b1xcXCIsIFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gICAgY29sb3I6ICMzMzMzMzM7XFxuICAgIGZvbnQtc2l6ZTogMC44OHJlbTtcXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gICAgbGluZS1oZWlnaHQ6IDFyZW07XFxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7IH1cXG4gIGVkcy1kcm9wZG93biA+IGxhYmVsLnNob3cge1xcbiAgICBkaXNwbGF5OiBibG9jazsgfVxcbiAgZWRzLWRyb3Bkb3duIC5lZHMtZHJvcGRvd24tdHJpZ2dlciB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBmb250LWZhbWlseTogXFxcIlJvYm90b1xcXCIsIFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gICAgY29sb3I6ICMzMzMzMzM7XFxuICAgIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XFxuICAgIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xcbiAgICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xcbiAgICBwYWRkaW5nOiA1cHggMTBweDtcXG4gICAgbGluZS1oZWlnaHQ6IDEuNHJlbTtcXG4gICAgbWluLWhlaWdodDogMzRweDtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzkzOTM5MztcXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMC4xNXMgZWFzZTtcXG4gICAgb3V0bGluZTogbm9uZTsgfVxcbiAgICBlZHMtZHJvcGRvd24gLmVkcy1kcm9wZG93bi10cmlnZ2VyIC5lZHMtZHJvcGRvd24tcGxhY2Vob2xkZXIge1xcbiAgICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgICAgY29sb3I6ICNiOWI5Yjk7XFxuICAgICAgZm9udC13ZWlnaHQ6IDQwMDsgfVxcbiAgICBlZHMtZHJvcGRvd24gLmVkcy1kcm9wZG93bi10cmlnZ2VyIC5lZHMtZHJvcGRvd24tcGxhY2Vob2xkZXIuc2hvdyB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7IH1cXG4gICAgZWRzLWRyb3Bkb3duIC5lZHMtZHJvcGRvd24tdHJpZ2dlciAuZWRzLWRyb3Bkb3duLWFycm93IHtcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgYm90dG9tOiAxNHB4O1xcbiAgICAgIHJpZ2h0OiAxMHB4O1xcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICB3aWR0aDogMDtcXG4gICAgICBoZWlnaHQ6IDA7XFxuICAgICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgICBib3JkZXItdG9wOiA1cHggc29saWQgIzQyNmRhOTsgfVxcbiAgICBlZHMtZHJvcGRvd24gLmVkcy1kcm9wZG93bi10cmlnZ2VyOjphZnRlciB7XFxuICAgICAgY29udGVudDogJyc7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIHRvcDogLTJweDtcXG4gICAgICBsZWZ0OiAtMnB4O1xcbiAgICAgIHJpZ2h0OiAtMnB4O1xcbiAgICAgIGJvdHRvbTogLTJweDtcXG4gICAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgICAgYm9yZGVyOiAycHggc29saWQgIzQyNmRhOTtcXG4gICAgICBvcGFjaXR5OiAwO1xcbiAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4xNXMgZWFzZTsgfVxcbiAgICBlZHMtZHJvcGRvd24gLmVkcy1kcm9wZG93bi10cmlnZ2VyOmZvY3VzOjphZnRlciB7XFxuICAgICAgb3BhY2l0eTogMTtcXG4gICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMTVzIGVhc2U7IH1cXG4gIGVkcy1kcm9wZG93biAuZWRzLWRyb3Bkb3duLXRyaWdnZXIuZm9jdXM6OmFmdGVyIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjE1cyBlYXNlOyB9XFxuICBlZHMtZHJvcGRvd24gLmVkcy1kcm9wZG93bi1vcHRpb25zIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB6LWluZGV4OiAxMDAwO1xcbiAgICB0b3A6IGNhbGMoMTAwJSArIDhweCk7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZDhkOGQ4O1xcbiAgICBiYWNrZ3JvdW5kLWNsaXA6IGJvcmRlci1ib3g7XFxuICAgIGJveC1zaGFkb3c6IDAgMnB4IDRweCAwIHJnYmEoMCwgMCwgMCwgMC4xMik7XFxuICAgIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICAgIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjE1cyBlYXNlLCBvcGFjaXR5IDAuMTVzIGVhc2U7IH1cXG4gICAgZWRzLWRyb3Bkb3duIC5lZHMtZHJvcGRvd24tb3B0aW9ucyAuZWRzLWRyb3Bkb3duLXNlYXJjaGJveCB7XFxuICAgICAgZGlzcGxheTogbm9uZTtcXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkOGQ4ZDg7XFxuICAgICAgcGFkZGluZzogNXB4OyB9XFxuICAgICAgZWRzLWRyb3Bkb3duIC5lZHMtZHJvcGRvd24tb3B0aW9ucyAuZWRzLWRyb3Bkb3duLXNlYXJjaGJveDo6YWZ0ZXIge1xcbiAgICAgICAgY29udGVudDogJyc7XFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICB0b3A6IDVweDtcXG4gICAgICAgIGxlZnQ6IDVweDtcXG4gICAgICAgIHJpZ2h0OiA1cHg7XFxuICAgICAgICBib3R0b206IDVweDtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICM0MjZkYTk7XFxuICAgICAgICBvcGFjaXR5OiAwO1xcbiAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjE1cyBlYXNlOyB9XFxuICAgICAgZWRzLWRyb3Bkb3duIC5lZHMtZHJvcGRvd24tb3B0aW9ucyAuZWRzLWRyb3Bkb3duLXNlYXJjaGJveDpmb2N1czo6YWZ0ZXIge1xcbiAgICAgICAgb3BhY2l0eTogMTtcXG4gICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4xNXMgZWFzZTsgfVxcbiAgICAgIGVkcy1kcm9wZG93biAuZWRzLWRyb3Bkb3duLW9wdGlvbnMgLmVkcy1kcm9wZG93bi1zZWFyY2hib3ggLmVkcy1zZWFyY2gtaWNvbiB7XFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICB0b3A6IDEwcHg7XFxuICAgICAgICByaWdodDogMTJweDtcXG4gICAgICAgIHdpZHRoOiAyMHB4O1xcbiAgICAgICAgaGVpZ2h0OiAyMHB4OyB9XFxuICAgICAgICBlZHMtZHJvcGRvd24gLmVkcy1kcm9wZG93bi1vcHRpb25zIC5lZHMtZHJvcGRvd24tc2VhcmNoYm94IC5lZHMtc2VhcmNoLWljb24gc3ZnIHtcXG4gICAgICAgICAgZmlsbDogIzQyNmRhOTtcXG4gICAgICAgICAgd2lkdGg6IDIwcHg7IH1cXG4gICAgICBlZHMtZHJvcGRvd24gLmVkcy1kcm9wZG93bi1vcHRpb25zIC5lZHMtZHJvcGRvd24tc2VhcmNoYm94IGlucHV0IHtcXG4gICAgICAgIG91dGxpbmU6IG5vbmU7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgICAgcGFkZGluZzogNXB4IDEwcHg7XFxuICAgICAgICBib3JkZXI6IG5vbmU7XFxuICAgICAgICBsaW5lLWhlaWdodDogMS40cmVtO1xcbiAgICAgICAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG9cXFwiLCBcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gICAgICAgIGNvbG9yOiAjMzMzMzMzO1xcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxcbiAgICBlZHMtZHJvcGRvd24gLmVkcy1kcm9wZG93bi1vcHRpb25zIC5lZHMtZHJvcGRvd24tc2VhcmNoYm94LmZvY3VzOjphZnRlciB7XFxuICAgICAgb3BhY2l0eTogMTtcXG4gICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMTVzIGVhc2U7IH1cXG4gICAgZWRzLWRyb3Bkb3duIC5lZHMtZHJvcGRvd24tb3B0aW9ucyAuZWRzLWRyb3Bkb3duLXNlYXJjaGJveC5zaG93IHtcXG4gICAgICBkaXNwbGF5OiBibG9jazsgfVxcbiAgICBlZHMtZHJvcGRvd24gLmVkcy1kcm9wZG93bi1vcHRpb25zIHVsIHtcXG4gICAgICBwYWRkaW5nOiA1cHggMDtcXG4gICAgICBtYXJnaW46IDJweCAwIDA7XFxuICAgICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgICBtYXgtaGVpZ2h0OiAyODBweDtcXG4gICAgICBvdmVyZmxvdzogYXV0bzsgfVxcbiAgICAgIGVkcy1kcm9wZG93biAuZWRzLWRyb3Bkb3duLW9wdGlvbnMgdWwgbGkge1xcbiAgICAgICAgbWFyZ2luOiAwO1xcbiAgICAgICAgcGFkZGluZzogMTBweCAyMHB4O1xcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICAgIG1pbi1oZWlnaHQ6IDQwcHg7XFxuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgICAgb3V0bGluZTogbm9uZTsgfVxcbiAgICAgICAgZWRzLWRyb3Bkb3duIC5lZHMtZHJvcGRvd24tb3B0aW9ucyB1bCBsaTo6YWZ0ZXIge1xcbiAgICAgICAgICBjb250ZW50OiAnJztcXG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgICB0b3A6IDBweDtcXG4gICAgICAgICAgbGVmdDogMHB4O1xcbiAgICAgICAgICByaWdodDogMHB4O1xcbiAgICAgICAgICBib3R0b206IDBweDtcXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMDtcXG4gICAgICAgICAgYm9yZGVyOiAycHggc29saWQgIzQyNmRhOTtcXG4gICAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjE1cyBlYXNlOyB9XFxuICAgICAgICBlZHMtZHJvcGRvd24gLmVkcy1kcm9wZG93bi1vcHRpb25zIHVsIGxpOmZvY3VzOjphZnRlciB7XFxuICAgICAgICAgIG9wYWNpdHk6IDE7XFxuICAgICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4xNXMgZWFzZTsgfVxcbiAgICAgICAgZWRzLWRyb3Bkb3duIC5lZHMtZHJvcGRvd24tb3B0aW9ucyB1bCBsaTpob3ZlciB7XFxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICM0MjZkYTk7XFxuICAgICAgICAgIGNvbG9yOiAjZmZmZmZmOyB9XFxuICAgICAgICBlZHMtZHJvcGRvd24gLmVkcy1kcm9wZG93bi1vcHRpb25zIHVsIGxpIGVkcy1jaGVja2JveCB7XFxuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgICAgdG9wOiAxMnB4O1xcbiAgICAgICAgICBsZWZ0OiAyMHB4OyB9XFxuICAgICAgZWRzLWRyb3Bkb3duIC5lZHMtZHJvcGRvd24tb3B0aW9ucyB1bCBsaS5mb2N1czo6YWZ0ZXIge1xcbiAgICAgICAgb3BhY2l0eTogMTtcXG4gICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4xNXMgZWFzZTsgfVxcbiAgICAgIGVkcy1kcm9wZG93biAuZWRzLWRyb3Bkb3duLW9wdGlvbnMgdWwgbGkuZWRzLWNoZWNrYm94LW9wdGlvbiB7XFxuICAgICAgICBwYWRkaW5nLWxlZnQ6IDQ4cHg7IH1cXG5cXG5lZHMtZHJvcGRvd24uZWRzLWRyb3Bkb3duLW9wZW4gLmVkcy1kcm9wZG93bi1vcHRpb25zIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb3BhY2l0eTogMTsgfVxcblxcbmVkcy1kcm9wZG93bltkaXNhYmxlZF0ge1xcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDsgfVxcbiAgZWRzLWRyb3Bkb3duW2Rpc2FibGVkXSAuZWRzLWRyb3Bkb3duLXRyaWdnZXIge1xcbiAgICBib3JkZXItY29sb3I6ICNjY2NjY2M7XFxuICAgIGNvbG9yOiAjODg4ODg4OyB9XFxuICAgIGVkcy1kcm9wZG93bltkaXNhYmxlZF0gLmVkcy1kcm9wZG93bi10cmlnZ2VyOmZvY3VzIHtcXG4gICAgICBib3JkZXItY29sb3I6ICNjY2NjY2M7XFxuICAgICAgY29sb3I6ICM4ODg4ODg7IH1cXG4gICAgICBlZHMtZHJvcGRvd25bZGlzYWJsZWRdIC5lZHMtZHJvcGRvd24tdHJpZ2dlcjpmb2N1czo6YWZ0ZXIge1xcbiAgICAgICAgb3BhY2l0eTogMDsgfVxcbiAgICAgIGVkcy1kcm9wZG93bltkaXNhYmxlZF0gLmVkcy1kcm9wZG93bi10cmlnZ2VyOmZvY3VzIC5lZHMtZHJvcGRvd24tYXJyb3cge1xcbiAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogI2NjY2NjYzsgfVxcbiAgICBlZHMtZHJvcGRvd25bZGlzYWJsZWRdIC5lZHMtZHJvcGRvd24tdHJpZ2dlcjo6YWZ0ZXIge1xcbiAgICAgIG9wYWNpdHk6IDA7IH1cXG4gICAgZWRzLWRyb3Bkb3duW2Rpc2FibGVkXSAuZWRzLWRyb3Bkb3duLXRyaWdnZXIgLmVkcy1kcm9wZG93bi1hcnJvdyB7XFxuICAgICAgYm9yZGVyLXRvcC1jb2xvcjogI2NjY2NjYzsgfVxcblxcbi5hY2N0LWNvbnRhaW5lciBlZHMtZHJvcGRvd24ge1xcbiAgbWluLXdpZHRoOiAxODFweDsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keS5lZHMge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIiwgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBjb2xvcjogIzMzMzMzMzsgfVxcbiAgYm9keS5lZHMgKiB7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cXG4gICAgYm9keS5lZHMgKjo6YmVmb3JlIHtcXG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuICAgIGJvZHkuZWRzICo6OmFmdGVyIHtcXG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuXFxuYm9keS5lZHMuZWRzLXNob3ctYm9keSB7XFxuICBkaXNwbGF5OiBibG9jazsgfVxcblxcbi5lZHMge1xcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcXG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIiwgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcXG4gIGxpbmUtaGVpZ2h0OiAxLjRlbTsgfVxcbiAgLmVkcyBhIHtcXG4gICAgY29sb3I6ICM0MjZkYTk7IH1cXG4gICAgLmVkcyBhOmhvdmVyIHtcXG4gICAgICBjb2xvcjogIzE2M2M2ZjsgfVxcbiAgLmVkcyBoMSB7XFxuICAgIGNvbG9yOiAjMzMzMzMzO1xcbiAgICBmb250LXdlaWdodDogMzAwO1xcbiAgICBsaW5lLWhlaWdodDogMS40ZW07XFxuICAgIGZvbnQtc2l6ZTogMzBweDsgfVxcbiAgLmVkcyBoMiB7XFxuICAgIGNvbG9yOiAjMzMzMzMzO1xcbiAgICBmb250LXdlaWdodDogMzAwO1xcbiAgICBsaW5lLWhlaWdodDogMS40ZW07XFxuICAgIGZvbnQtc2l6ZTogMjRweDsgfVxcbiAgLmVkcyBoMyB7XFxuICAgIGNvbG9yOiAjMzMzMzMzO1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgZm9udC1zaXplOiAxOHB4OyB9XFxuICAuZWRzIGg0IHtcXG4gICAgY29sb3I6ICMzMzMzMzM7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICBmb250LXNpemU6IDE2cHg7IH1cXG4gIC5lZHMgaDUge1xcbiAgICBjb2xvcjogIzMzMzMzMztcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7IH1cXG4gIC5lZHMgaDFbY2Fwc10ge1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgICBjb2xvcjogIzZkMjA3NztcXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gICAgZm9udC1zaXplOiAyOHB4OyB9XFxuICAuZWRzIGgyW2NhcHNdIHtcXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gICAgY29sb3I6ICM2ZDIwNzc7XFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICAgIGZvbnQtc2l6ZTogMjJweDsgfVxcbiAgLmVkcyBoM1tjYXBzXSB7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgIGNvbG9yOiAjNmQyMDc3O1xcbiAgICBmb250LXdlaWdodDogNDAwO1xcbiAgICBmb250LXNpemU6IDE2cHg7IH1cXG4gIC5lZHMgaDRbY2Fwc10ge1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgICBjb2xvcjogIzZkMjA3NztcXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gICAgZm9udC1zaXplOiAxNHB4OyB9XFxuICAuZWRzIGg1W2NhcHNdIHtcXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gICAgY29sb3I6ICM2ZDIwNzc7XFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICAgIGZvbnQtc2l6ZTogMTJweDsgfVxcbiAgLmVkcyBociB7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkOGQ4ZDg7XFxuICAgIGhlaWdodDogMXB4OyB9XFxuICAuZWRzIC5zci1vbmx5IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMXB4O1xcbiAgICBoZWlnaHQ6IDFweDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgY2xpcDogcmVjdCgwLCAwLCAwLCAwKTtcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgYm9yZGVyOiAwOyB9XFxuXFxuW2JhY2tncm91bmQ9J2dyYXknXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjZmNmY2OyB9XFxuXFxuLm5vLXNjcm9sbCB7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuXFxuZWRzLWljb25bc3Bpbl0ge1xcbiAgYW5pbWF0aW9uOiBlZHMtc3BpbiAycyBpbmZpbml0ZSBsaW5lYXI7IH1cXG5cXG5lZHMtaWNvbiB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBsaW5lLWhlaWdodDogMCAhaW1wb3J0YW50O1xcbiAgbWFyZ2luOiAwIDZweCAwIDA7XFxuICB2ZXJ0aWNhbC1hbGlnbjogdGV4dC1ib3R0b207IH1cXG4gIGVkcy1pY29uIC5tYXRlcmlhbC1pY29ucyB7XFxuICAgIGZvbnQtc2l6ZTogaW5oZXJpdDsgfVxcbiAgZWRzLWljb24gPiAqIHtcXG4gICAgZm9udC1zaXplOiBpbmhlcml0OyB9XFxuXFxuZWRzLWljb24uczE4ID4gKiB7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tOyB9XFxuXFxuZWRzLWljb24uczI0ID4gKiB7XFxuICBmb250LXNpemU6IDI0cHg7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tOyB9XFxuXFxuZWRzLWljb24uczM2ID4gKiB7XFxuICBmb250LXNpemU6IDM2cHg7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tOyB9XFxuXFxuZWRzLWljb24uczQ4ID4gKiB7XFxuICBmb250LXNpemU6IDQ4cHg7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tOyB9XFxuXFxuZWRzLWljb24uczYwID4gKiB7XFxuICBmb250LXNpemU6IDYwcHg7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tOyB9XFxuXFxuZWRzLWljb25bYm9yZGVyXSB7XFxuICBwYWRkaW5nOiAwLjhyZW07XFxuICBib3JkZXI6IDRweCBzb2xpZCAjZDhkOGQ4O1xcbiAgYm9yZGVyLXJhZGl1czogM3B4OyB9XFxuXFxuLmhlYWRlci1jb250YWluZXIge1xcbiAgaGVpZ2h0OiA1MHB4O1xcbiAgYmFja2dyb3VuZDogI2U2ZTZlNjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyOyB9XFxuICAuaGVhZGVyLWNvbnRhaW5lciAuaWNvbi1jb250YWluZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjZmNmY2O1xcbiAgICBsaW5lLWhlaWdodDogMDsgfVxcbiAgICAuaGVhZGVyLWNvbnRhaW5lciAuaWNvbi1jb250YWluZXIgLmhvbWUtaWNvbiB7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgICAgcGFkZGluZzogMTdweCAyM3B4O1xcbiAgICAgIG1hcmdpbjogMDtcXG4gICAgICBjb2xvcjogIzQyNmRhOTtcXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7IH1cXG4gICAgICAuaGVhZGVyLWNvbnRhaW5lciAuaWNvbi1jb250YWluZXIgLmhvbWUtaWNvbjpob3ZlciB7XFxuICAgICAgICBjb2xvcjogIzFkNGY5MTsgfVxcbiAgICAuaGVhZGVyLWNvbnRhaW5lciAuaWNvbi1jb250YWluZXIgLmhvbWUtaWNvbi5zZWxlY3RlZCB7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcXG4gICAgICBjb2xvcjogIzMzMzMzMzsgfVxcbiAgLmhlYWRlci1jb250YWluZXIgLnRhYnMtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcbiAgICBtYXgtd2lkdGg6IDEwMCU7XFxuICAgIG1heC1oZWlnaHQ6IDEwMCU7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47IH1cXG5cXG5wY2MtZWRzLXNlY29uZGFyeS1oZWFkZXItdGFiIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNmY2ZjY7XFxuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNjY2NjY2M7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24tY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMzgwcHg7XFxuICBoZWlnaHQ6IDUwcHg7IH1cXG4gIHBjYy1lZHMtc2Vjb25kYXJ5LWhlYWRlci10YWI6bGFzdC1jaGlsZCB7XFxuICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNjY2NjY2M7IH1cXG4gIHBjYy1lZHMtc2Vjb25kYXJ5LWhlYWRlci10YWIgLmluZm8tY29udGFpbmVyIHtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBmbGV4OiAxO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBjb2xvcjogIzQyNmRhOTsgfVxcbiAgICBwY2MtZWRzLXNlY29uZGFyeS1oZWFkZXItdGFiIC5pbmZvLWNvbnRhaW5lciBlZHMtaWNvbiB7XFxuICAgICAgbWFyZ2luOiAwOyB9XFxuICAgIHBjYy1lZHMtc2Vjb25kYXJ5LWhlYWRlci10YWIgLmluZm8tY29udGFpbmVyIFtpY29uPSdwZXJzb24nXSB7XFxuICAgICAgcGFkZGluZzogMCAxMHB4IDAgMjBweDsgfVxcbiAgICBwY2MtZWRzLXNlY29uZGFyeS1oZWFkZXItdGFiIC5pbmZvLWNvbnRhaW5lciAucGVyc29uLW5hbWUge1xcbiAgICAgIG1pbi13aWR0aDogMTcycHg7XFxuICAgICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICAgIG1heC1oZWlnaHQ6IDEwMCU7XFxuICAgICAgbGluZS1oZWlnaHQ6IDEuNDsgfVxcbiAgcGNjLWVkcy1zZWNvbmRhcnktaGVhZGVyLXRhYiAudGFiLWNvbnRyb2xzIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyOyB9XFxuICAgIHBjYy1lZHMtc2Vjb25kYXJ5LWhlYWRlci10YWIgLnRhYi1jb250cm9scyAuY2xvc2UtYnV0dG9uIHtcXG4gICAgICBtYXJnaW46IDAgMTBweCAwIDVweDtcXG4gICAgICBwYWRkaW5nOiA4cHg7XFxuICAgICAgY3Vyc29yOiBkZWZhdWx0O1xcbiAgICAgIGNvbG9yOiAjNDI2ZGE5OyB9XFxuXFxucGNjLWVkcy1zZWNvbmRhcnktaGVhZGVyLXRhYlthY3RpdmVdIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7IH1cXG4gIHBjYy1lZHMtc2Vjb25kYXJ5LWhlYWRlci10YWJbYWN0aXZlXSAuaW5mby1jb250YWluZXIge1xcbiAgICBjb2xvcjogIzMzMzMzMzsgfVxcblxcbkBrZXlmcmFtZXMgXFxcImVkcy1zcGluXFxcIiB7XFxuICBmcm9tIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfSB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKlxcbiAqIFRoZXNlIHZhcmlhYmxlcyBhcmUgYXZhaWxhYmxlIHRvIGFsbCBjb21wb25lbnRzIGdsb2JhbGx5IGFuZCBhcmUgdGh1cyBkZXNpZ25hdGVkIHdpdGggYW4gXFxcImVkcy1cXFwiIHByZWZpeC5cXG4gKiBDb21wb25lbnRzIG1heSBpbXBsZW1lbnQgdGhlc2UgYW5kIHBhc3MtdGhyb3VnaCB0byBhIGxvY2FsIHZhcmlhYmxlIG5hbWUuXFxuICovXFxuLypcXG4gKiBUaGVzZSB2YXJpYWJsZXMgYXJlIGF2YWlsYWJsZSB0byBhbGwgY29tcG9uZW50cyBnbG9iYWxseSBhbmQgYXJlIHRodXMgZGVzaWduYXRlZCB3aXRoIGFuIFxcXCJlZHMtXFxcIiBwcmVmaXguXFxuICogQ29tcG9uZW50cyBtYXkgaW1wbGVtZW50IHRoZXNlIGFuZCBwYXNzLXRocm91Z2ggdG8gYSBsb2NhbCB2YXJpYWJsZSBuYW1lLlxcbiAqL1xcbmVkcy1pY29uW3NwaW5dIHtcXG4gIGFuaW1hdGlvbjogZWRzLXNwaW4gMnMgaW5maW5pdGUgbGluZWFyOyB9XFxuXFxuZWRzLWljb24ge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgbGluZS1oZWlnaHQ6IDAgIWltcG9ydGFudDtcXG4gIG1hcmdpbjogMCA2cHggMCAwO1xcbiAgdmVydGljYWwtYWxpZ246IHRleHQtYm90dG9tOyB9XFxuICBlZHMtaWNvbiAubWF0ZXJpYWwtaWNvbnMge1xcbiAgICBmb250LXNpemU6IGluaGVyaXQ7IH1cXG4gIGVkcy1pY29uID4gKiB7XFxuICAgIGZvbnQtc2l6ZTogaW5oZXJpdDsgfVxcblxcbmVkcy1pY29uLnMxMiA+ICoge1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgdmVydGljYWwtYWxpZ246IGJvdHRvbTsgfVxcblxcbmVkcy1pY29uLnMxNiA+ICoge1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbiAgdmVydGljYWwtYWxpZ246IGJvdHRvbTsgfVxcblxcbmVkcy1pY29uLnMxOCA+ICoge1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgdmVydGljYWwtYWxpZ246IGJvdHRvbTsgfVxcblxcbmVkcy1pY29uLnMyNCA+ICoge1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgdmVydGljYWwtYWxpZ246IGJvdHRvbTsgfVxcblxcbmVkcy1pY29uLnMzNiA+ICoge1xcbiAgZm9udC1zaXplOiAzNnB4O1xcbiAgdmVydGljYWwtYWxpZ246IGJvdHRvbTsgfVxcblxcbmVkcy1pY29uLnM0OCA+ICoge1xcbiAgZm9udC1zaXplOiA0OHB4O1xcbiAgdmVydGljYWwtYWxpZ246IGJvdHRvbTsgfVxcblxcbmVkcy1pY29uLnM2MCA+ICoge1xcbiAgZm9udC1zaXplOiA2MHB4O1xcbiAgdmVydGljYWwtYWxpZ246IGJvdHRvbTsgfVxcblxcbmVkcy1pY29uW2JvcmRlcl0ge1xcbiAgcGFkZGluZzogMC44cmVtO1xcbiAgYm9yZGVyOiA0cHggc29saWQgI2Q4ZDhkODtcXG4gIGJvcmRlci1yYWRpdXM6IDNweDsgfVxcblxcbi5waG9uZS1pY29uIHtcXG4gIHdpZHRoOiAzMnB4O1xcbiAgaGVpZ2h0OiAzNHB4O1xcbiAgYmFja2dyb3VuZDogIzQyNmRhOTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXG4gIG1hcmdpbi1sZWZ0OiAxMHB4OyB9XFxuICAucGhvbmUtaWNvbiBzdmcge1xcbiAgICBmaWxsOiAjZmZmZmZmO1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogLXdlYmtpdC1iYXNlbGluZS1taWRkbGU7IH1cXG5cXG4udGltZXItaWNvbiB7XFxuICBtYXJnaW4tcmlnaHQ6IDExLjNweDsgfVxcbiAgLnRpbWVyLWljb24gc3ZnIHtcXG4gICAgdmVydGljYWwtYWxpZ246IHRleHQtdG9wO1xcbiAgICBmaWxsOiAjZGNkY2RjOyB9XFxuXFxuLmVkcy1pY29uLnRpbWUge1xcbiAgZm9udC1zaXplOiAxMnB4OyB9XFxuXFxuQGtleWZyYW1lcyBcXFwiZWRzLXNwaW5cXFwiIHtcXG4gIGZyb20ge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImVkcy10YWcge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgcGFkZGluZzogNHB4IDEwcHg7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xcbiAgbWFyZ2luLWxlZnQ6IDJweDtcXG4gIGxpbmUtaGVpZ2h0OiAxICFpbXBvcnRhbnQ7IH1cXG4gIGVkcy10YWc6bm90KFttb3RpZl0pIHtcXG4gICAgYmFja2dyb3VuZDogI2U2ZTZlNjtcXG4gICAgY29sb3I6ICMzMzMzMzM7IH1cXG5cXG5lZHMtdGFnW21vdGlmPVxcXCJkZWZhdWx0XFxcIl0ge1xcbiAgYmFja2dyb3VuZDogI2U2ZTZlNjtcXG4gIGNvbG9yOiAjMzMzMzMzOyB9XFxuXFxuZWRzLXRhZ1ttb3RpZj0nZXJyb3InXSB7XFxuICBiYWNrZ3JvdW5kOiAjZmZkY2UyO1xcbiAgY29sb3I6ICNlNDAwMmI7IH1cXG5cXG5lZHMtdGFnW21vdGlmPSd3YXJuaW5nJ10ge1xcbiAgYmFja2dyb3VuZDogI2ZjZWViYTtcXG4gIGNvbG9yOiAjYjM1OTAwOyB9XFxuXFxuZWRzLXRhZ1ttb3RpZj0nc3VjY2VzcyddIHtcXG4gIGJhY2tncm91bmQ6ICNjZGY0ZDI7XFxuICBjb2xvcjogIzAwN0EzQjtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLypcXG4gKiBUaGVzZSB2YXJpYWJsZXMgYXJlIGF2YWlsYWJsZSB0byBhbGwgY29tcG9uZW50cyBnbG9iYWxseSBhbmQgYXJlIHRodXMgZGVzaWduYXRlZCB3aXRoIGFuIFxcXCJlZHMtXFxcIiBwcmVmaXguXFxuICogQ29tcG9uZW50cyBtYXkgaW1wbGVtZW50IHRoZXNlIGFuZCBwYXNzLXRocm91Z2ggdG8gYSBsb2NhbCB2YXJpYWJsZSBuYW1lLlxcbiAqL1xcbi8qXFxuICogVGhlc2UgdmFyaWFibGVzIGFyZSBhdmFpbGFibGUgdG8gYWxsIGNvbXBvbmVudHMgZ2xvYmFsbHkgYW5kIGFyZSB0aHVzIGRlc2lnbmF0ZWQgd2l0aCBhbiBcXFwiZWRzLVxcXCIgcHJlZml4LlxcbiAqIENvbXBvbmVudHMgbWF5IGltcGxlbWVudCB0aGVzZSBhbmQgcGFzcy10aHJvdWdoIHRvIGEgbG9jYWwgdmFyaWFibGUgbmFtZS5cXG4gKi9cXG5wY2MtZWRzLXRpbWVsaW5lLWl0ZW0ge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG9cXFwiLCBcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGNvbG9yOiAjMzMzMzMzOyB9XFxuICBwY2MtZWRzLXRpbWVsaW5lLWl0ZW0gLmZsZXgtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDsgfVxcbiAgcGNjLWVkcy10aW1lbGluZS1pdGVtIC5zZWN0aW9uLWxlZnQge1xcbiAgICBmbGV4OiAxOyB9XFxuICBwY2MtZWRzLXRpbWVsaW5lLWl0ZW0gLnNlY3Rpb24taWNvbiB7XFxuICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2Q4ZDhkODtcXG4gICAgbWFyZ2luLWxlZnQ6IDUzcHg7XFxuICAgIG1pbi1oZWlnaHQ6IDEwMHB4O1xcbiAgICBwYWRkaW5nLXJpZ2h0OiAzMHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gICAgcGNjLWVkcy10aW1lbGluZS1pdGVtIC5zZWN0aW9uLWljb24gLmljb24tY2lyY2xlIHtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWYxNjg1O1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgICBjb2xvcjogI2ZmZmZmZjtcXG4gICAgICBoZWlnaHQ6IDQwcHg7XFxuICAgICAgbGluZS1oZWlnaHQ6IDQycHg7XFxuICAgICAgbWFyZ2luLWxlZnQ6IC0yMHB4O1xcbiAgICAgIHBhZGRpbmctbGVmdDogNXB4O1xcbiAgICAgIHdpZHRoOiA0MHB4OyB9XFxuICBwY2MtZWRzLXRpbWVsaW5lLWl0ZW0gLnNlY3Rpb24tbWFpbiB7XFxuICAgIGZsZXg6IDU7XFxuICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xcbiAgICBwYWRkaW5nLXRvcDogMTBweDsgfVxcbiAgICBwY2MtZWRzLXRpbWVsaW5lLWl0ZW0gLnNlY3Rpb24tbWFpbiAucGxhY2Vob2xkZXItY2VudGVyIHtcXG4gICAgICBmbGV4OiAyOyB9XFxuICAgIHBjYy1lZHMtdGltZWxpbmUtaXRlbSAuc2VjdGlvbi1tYWluIC5wbGFjZWhvbGRlci1yaWdodCB7XFxuICAgICAgZmxleDogMTsgfVxcbiAgcGNjLWVkcy10aW1lbGluZS1pdGVtIFtzbG90PVxcXCJzbG90LWhlYWRlci1jZW50ZXJcXFwiXSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXg6IDU7IH1cXG4gICAgcGNjLWVkcy10aW1lbGluZS1pdGVtIFtzbG90PVxcXCJzbG90LWhlYWRlci1jZW50ZXJcXFwiXSBbc2xvdD1cXFwic2xvdC1oZWFkZXItbGVmdFxcXCJdIHtcXG4gICAgICBmbGV4OiA0OyB9XFxuICAgIHBjYy1lZHMtdGltZWxpbmUtaXRlbSBbc2xvdD1cXFwic2xvdC1oZWFkZXItY2VudGVyXFxcIl0gW3Nsb3Q9XFxcInNsb3QtaGVhZGVyLXJpZ2h0XFxcIl0ge1xcbiAgICAgIGZsZXg6IDE7XFxuICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgIHRleHQtYWxpZ246IHJpZ2h0OyB9XFxuXFxucGNjLWVkcy10aW1lbGluZS1pdGVtOmxhc3QtY2hpbGQgLnNlY3Rpb24taWNvbiB7XFxuICBib3JkZXItbGVmdDogMDsgfVxcblxcbi5wY2MtZWRzLXRpbWVsaW5lLXZpZXcge1xcbiAgcGFkZGluZzogMCA1MHB4IDAgMDsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsInZhciBlc2NhcGUgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL3VybC9lc2NhcGUuanNcIik7XG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5oZWFkZXIge1xcbiAgcGFkZGluZzogMTBweCAwIDAgMDtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgd2lkdGg6IDEwMCU7IH1cXG4gIC5oZWFkZXJfX2xvZ28ge1xcbiAgICB3aWR0aDogMTE3cHg7XFxuICAgIGhlaWdodDogNTVweDtcXG4gICAgbWFyZ2luOiAwIDAgMCAxNXB4O1xcbiAgICBwYWRkaW5nLXJpZ2h0OiAyMHB4O1xcbiAgICBmbG9hdDogbGVmdDsgfVxcbiAgLmhlYWRlcl9fbG9nb2xpbmsge1xcbiAgICB0ZXh0LWluZGVudDogLTk5OTk5ZW07XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2ltYWdlcy9leHBlcmlhbl9fbG9nb2xhdGVzdC5wbmdcIikpICsgXCIpIG5vLXJlcGVhdCBjZW50ZXIgY2VudGVyIHRyYW5zcGFyZW50O1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7IH1cXG4gIC5oZWFkZXJfX2xvZ29kZXNjIHtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICBmb250LWZhbWlseTogXFxcIlJvYm90by1SZWd1bGFyXFxcIiAhaW1wb3J0YW50O1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsICFpbXBvcnRhbnQ7XFxuICAgIGNvbG9yOiAjMzMzMzMzO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIHBhZGRpbmc6IDNweCAwIDNweCAyMHB4O1xcbiAgICBmbG9hdDogbGVmdDtcXG4gICAgYm9yZGVyLWxlZnQ6IHNvbGlkIDFweCAjY2NjY2NjO1xcbiAgICBtYXJnaW4tdG9wOiAxNXB4OyB9XFxuICAuaGVhZGVyX19uYXYge1xcbiAgICBmbG9hdDogcmlnaHQ7IH1cXG4gIC5oZWFkZXJfX2xpc3Rjb250IHtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgbWFyZ2luOiAwOyB9XFxuICAuaGVhZGVyX19saXN0IHtcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIGJvcmRlci1sZWZ0OiBzb2xpZCAxcHggI2RjZGNkYztcXG4gICAgcGFkZGluZzogMTVweDsgfVxcbiAgLmhlYWRlcl9fbGluayB7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgICBmb250LXNpemU6IDE2cHg7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLU1lZGl1bVxcXCIgIWltcG9ydGFudDtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xcbiAgICBjb2xvcjogIzQyNmRhOTtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG4gIC5oZWFkZXJfX2ljb25pbWFnZXMge1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyB9XFxuICAuaGVhZGVyX19jb3VudGVyIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBiYWNrZ3JvdW5kOiAjZTIwMDAwO1xcbiAgICB3aWR0aDogMjFweDtcXG4gICAgaGVpZ2h0OiAyMXB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIHRvcDogLTdweDtcXG4gICAgcmlnaHQ6IC03cHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgZm9udC1zaXplOiAxM3B4O1xcbiAgICBmb250LWZhbWlseTogXFxcIlJvYm90by1NZWRpdW1cXFwiICFpbXBvcnRhbnQ7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gICAgY29sb3I6ICNmZmZmZmY7IH1cXG4gIC5oZWFkZXItLXVzZXJwcm9maWxlIHtcXG4gICAgYm9yZGVyOiBzb2xpZCAycHggIzQyNmRhOTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBwYWRkaW5nOiAxcHggNXB4O1xcbiAgICBmb250LXNpemU6IDEycHg7IH1cXG4gIC5oZWFkZXJfX2hybGluZSB7XFxuICAgIGhlaWdodDogMnB4ICFpbXBvcnRhbnQ7XFxuICAgIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveCAhaW1wb3J0YW50O1xcbiAgICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3ggIWltcG9ydGFudDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveCAhaW1wb3J0YW50O1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAsIDAgMTAwJSAhaW1wb3J0YW50O1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0ICFpbXBvcnRhbnQ7XFxuICAgIC13ZWJraXQtYmFja2dyb3VuZC1zaXplOiAxMDAlIDRweCAhaW1wb3J0YW50O1xcbiAgICAtbW96LWJhY2tncm91bmQtc2l6ZTogMTAwJSA0cHggIWltcG9ydGFudDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxMDAlIDRweCAhaW1wb3J0YW50O1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChsZWZ0LCAjYmEyZjdkIDAlLCAjMjY0NzhkIDEwMCUpLCAtd2Via2l0LWxpbmVhci1ncmFkaWVudChsZWZ0LCAjYmEyZjdkIDAlLCAjMjY0NzhkIDEwMCUpICFpbXBvcnRhbnQ7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IC1tb3otbGluZWFyLWdyYWRpZW50KGxlZnQsICNiYTJmN2QgMCUsICMyNjQ3OGQgMTAwJSksIC1tb3otbGluZWFyLWdyYWRpZW50KGxlZnQsICNiYTJmN2QgMCUsICMyNjQ3OGQgMTAwJSkgIWltcG9ydGFudDtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogLW8tbGluZWFyLWdyYWRpZW50KGxlZnQsICNiYTJmN2QgMCUsICMyNjQ3OGQgMTAwJSksIC1vLWxpbmVhci1ncmFkaWVudChsZWZ0LCAjYmEyZjdkIDAlLCAjMjY0NzhkIDEwMCUpICFpbXBvcnRhbnQ7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgI2JhMmY3ZCAwJSwgIzI2NDc4ZCAxMDAlKSwgbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAjYmEyZjdkIDAlLCAjMjY0NzhkIDEwMCUpICFpbXBvcnRhbnQ7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIHdpZHRoOiAxMDAlOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJlZHMtYWNjb3JkaW9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2NjY2M7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmOyB9XFxuICBlZHMtYWNjb3JkaW9uIGVkcy1hY2NvcmRpb24tcGFuZWwge1xcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2NjY2NjYztcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyB9XFxuICAgIGVkcy1hY2NvcmRpb24gZWRzLWFjY29yZGlvbi1wYW5lbCBwIHtcXG4gICAgICB0cmFuc2l0aW9uOiBwYWRkaW5nIDEwMG1zIGVhc2UgMG1zLCBvcGFjaXR5IDc1bXMgZWFzZSAyNW1zO1xcbiAgICAgIHBhZGRpbmc6IDAgMjBweDtcXG4gICAgICBtYXJnaW46IDA7XFxuICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgIG1heC1oZWlnaHQ6IDA7XFxuICAgICAgb3BhY2l0eTogMDsgfVxcbiAgICBlZHMtYWNjb3JkaW9uIGVkcy1hY2NvcmRpb24tcGFuZWwgLmVkcy1hY2NvcmRpb24tY2FyZXQge1xcbiAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxNTBtcyBlYXNlIDBtczsgfVxcbiAgICBlZHMtYWNjb3JkaW9uIGVkcy1hY2NvcmRpb24tcGFuZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwge1xcbiAgICAgIHRleHQtYWxpZ246IGxlZnQ7XFxuICAgICAgYm9yZGVyOiAwO1xcbiAgICAgIGhlaWdodDogNDBweDtcXG4gICAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Y2ZjZmNjtcXG4gICAgICBmb250LXdlaWdodDogNTAwO1xcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgICBmb250LWZhbWlseTogUm9ib3RvO1xcbiAgICAgIGN1cnNvcjogcG9pbnRlcjsgfVxcbiAgICAgIGVkcy1hY2NvcmRpb24gZWRzLWFjY29yZGlvbi1wYW5lbCAuZWRzLWFjY29yZGlvbi1sYWJlbDpmb2N1cyB7XFxuICAgICAgICBvdXRsaW5lOiBub25lO1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0VERjRGQTsgfVxcbiAgICAgIGVkcy1hY2NvcmRpb24gZWRzLWFjY29yZGlvbi1wYW5lbCAuZWRzLWFjY29yZGlvbi1sYWJlbDphY3RpdmUge1xcbiAgICAgICAgb3V0bGluZTogbm9uZTsgfVxcbiAgICAgIGVkcy1hY2NvcmRpb24gZWRzLWFjY29yZGlvbi1wYW5lbCAuZWRzLWFjY29yZGlvbi1sYWJlbCAuZWRzLWFjY29yZGlvbi1sYWJlbC10ZXh0Om50aC1jaGlsZCgxKSB7XFxuICAgICAgICBkaXNwbGF5OiBibG9jazsgfVxcbiAgICAgIGVkcy1hY2NvcmRpb24gZWRzLWFjY29yZGlvbi1wYW5lbCAuZWRzLWFjY29yZGlvbi1sYWJlbCAuZWRzLWFjY29yZGlvbi1sYWJlbC10ZXh0Om50aC1jaGlsZCgyKSB7XFxuICAgICAgICBkaXNwbGF5OiBub25lOyB9XFxuICAgICAgZWRzLWFjY29yZGlvbiBlZHMtYWNjb3JkaW9uLXBhbmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsIC5lZHMtYWNjb3JkaW9uLWNhcmV0IHtcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgIHJpZ2h0OiAyMHB4O1xcbiAgICAgICAgdG9wOiAxNnB4O1xcbiAgICAgICAgd2lkdGg6IDEycHg7XFxuICAgICAgICBoZWlnaHQ6IDhweDtcXG4gICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaVZWUkdMVGdpUHo0S1BITjJaeUIzYVdSMGFEMGlNVEp3ZUNJZ2FHVnBaMmgwUFNJM2NIZ2lJSFpwWlhkQ2IzZzlJakFnTUNBeE1pQTNJaUIyWlhKemFXOXVQU0l4TGpFaUlIaHRiRzV6UFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eU1EQXdMM04yWnlJZ2VHMXNibk02ZUd4cGJtczlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5MekU1T1RrdmVHeHBibXNpUGdvZ0lDQWdQQ0V0TFNCSFpXNWxjbUYwYjNJNklGTnJaWFJqYUNBME9DNHlJQ2cwTnpNeU55a2dMU0JvZEhSd09pOHZkM2QzTG1KdmFHVnRhV0Z1WTI5a2FXNW5MbU52YlM5emEyVjBZMmdnTFMwK0NpQWdJQ0E4ZEdsMGJHVStSM0p2ZFhBZ01qd3ZkR2wwYkdVK0NpQWdJQ0E4WkdWell6NURjbVZoZEdWa0lIZHBkR2dnVTJ0bGRHTm9Mand2WkdWell6NEtJQ0FnSUR4a1pXWnpQand2WkdWbWN6NEtJQ0FnSUR4bklHbGtQU0pRWVdkbExUSXpJaUJ6ZEhKdmEyVTlJbTV2Ym1VaUlITjBjbTlyWlMxM2FXUjBhRDBpTVNJZ1ptbHNiRDBpYm05dVpTSWdabWxzYkMxeWRXeGxQU0psZG1WdWIyUmtJajRLSUNBZ0lDQWdJQ0E4WnlCcFpEMGlSM0p2ZFhBdE1pSWdkSEpoYm5ObWIzSnRQU0owY21GdWMyeGhkR1VvTmk0d01EQXdNREFzSURFdU1EQXdNREF3S1NCeWIzUmhkR1VvTFRRMUxqQXdNREF3TUNrZ2RISmhibk5zWVhSbEtDMDJMakF3TURBd01Dd2dMVEV1TURBd01EQXdLU0IwY21GdWMyeGhkR1VvTWk0d01EQXdNREFzSUMwekxqQXdNREF3TUNraUlHWnBiR3c5SWlNd1JUWkZRamNpUGdvZ0lDQWdJQ0FnSUNBZ0lDQThjbVZqZENCcFpEMGlVbVZqZEdGdVoyeGxMVElpSUhnOUlqQWlJSGs5SWpBaUlIZHBaSFJvUFNJeUlpQm9aV2xuYUhROUlqZ2lJSEo0UFNJeElqNDhMM0psWTNRK0NpQWdJQ0FnSUNBZ0lDQWdJRHh5WldOMElHbGtQU0pTWldOMFlXNW5iR1V0TWkxRGIzQjVJaUIwY21GdWMyWnZjbTA5SW5SeVlXNXpiR0YwWlNnMExqQXdNREF3TUN3Z055NHdNREF3TURBcElISnZkR0YwWlNnNU1DNHdNREF3TURBcElIUnlZVzV6YkdGMFpTZ3ROQzR3TURBd01EQXNJQzAzTGpBd01EQXdNQ2tnSWlCNFBTSXpJaUI1UFNJeklpQjNhV1IwYUQwaU1pSWdhR1ZwWjJoMFBTSTRJaUJ5ZUQwaU1TSStQQzl5WldOMFBnb2dJQ0FnSUNBZ0lEd3ZaejRLSUNBZ0lEd3ZaejRLUEM5emRtYytcXFwiKTsgfVxcbiAgICAgIGVkcy1hY2NvcmRpb24gZWRzLWFjY29yZGlvbi1wYW5lbCAuZWRzLWFjY29yZGlvbi1sYWJlbCAuZWRpdC10YWIge1xcbiAgICAgICAgZGlzcGxheTogbm9uZTsgfVxcbiAgICAgICAgZWRzLWFjY29yZGlvbiBlZHMtYWNjb3JkaW9uLXBhbmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsIC5lZGl0LXRhYiBzdmcge1xcbiAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tO1xcbiAgICAgICAgICBmaWxsOiAjMGU2ZWI3OyB9XFxuICAgICAgZWRzLWFjY29yZGlvbiBlZHMtYWNjb3JkaW9uLXBhbmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsLmFjdGl2ZSAuZWRpdC10YWIge1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICBmbG9hdDogcmlnaHQ7XFxuICAgICAgICBjb2xvcjogIzBlNmViNzsgfVxcbiAgICBlZHMtYWNjb3JkaW9uIGVkcy1hY2NvcmRpb24tcGFuZWw6Zmlyc3QtY2hpbGQge1xcbiAgICAgIGJvcmRlcjogMDsgfVxcbiAgICBlZHMtYWNjb3JkaW9uIGVkcy1hY2NvcmRpb24tcGFuZWwgLnRhYmxlIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmOyB9XFxuICBlZHMtYWNjb3JkaW9uIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlPVxcXCJ0cnVlXFxcIl0ge1xcbiAgICBtaW4taGVpZ2h0OiAyMDBweDsgfVxcbiAgICBlZHMtYWNjb3JkaW9uIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlPVxcXCJ0cnVlXFxcIl0gcCB7XFxuICAgICAgdHJhbnNpdGlvbjogcGFkZGluZyAxNTBtcyBlYXNlIDBtcztcXG4gICAgICBtYXgtaGVpZ2h0OiBub25lO1xcbiAgICAgIHBhZGRpbmc6IDI0cHggMjBweDtcXG4gICAgICBvcGFjaXR5OiAxOyB9XFxuICAgIGVkcy1hY2NvcmRpb24gZWRzLWFjY29yZGlvbi1wYW5lbFthY3RpdmU9XFxcInRydWVcXFwiXSAuZWRzLWFjY29yZGlvbi1sYWJlbCB7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2NjY2M7XFxuICAgICAgbWFyZ2luOiAwIDIwcHg7XFxuICAgICAgcGFkZGluZzogMTBweCAwO1xcbiAgICAgIHdpZHRoOiBhdXRvOyB9XFxuICAgICAgZWRzLWFjY29yZGlvbiBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZT1cXFwidHJ1ZVxcXCJdIC5lZHMtYWNjb3JkaW9uLWxhYmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsLXRleHQ6bnRoLWNoaWxkKDEpIHtcXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7IH1cXG4gICAgICBlZHMtYWNjb3JkaW9uIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlPVxcXCJ0cnVlXFxcIl0gLmVkcy1hY2NvcmRpb24tbGFiZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwtdGV4dDpudGgtY2hpbGQoMikge1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7IH1cXG4gICAgICBlZHMtYWNjb3JkaW9uIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlPVxcXCJ0cnVlXFxcIl0gLmVkcy1hY2NvcmRpb24tbGFiZWwgLmVkcy1hY2NvcmRpb24tc3VibGFiZWwge1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7IH1cXG4gICAgICBlZHMtYWNjb3JkaW9uIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlPVxcXCJ0cnVlXFxcIl0gLmVkcy1hY2NvcmRpb24tbGFiZWwgLmVkcy1hY2NvcmRpb24tY2FyZXQge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTsgfVxcbiAgZWRzLWFjY29yZGlvbiBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZV0gcCB7XFxuICAgIHRyYW5zaXRpb246IHBhZGRpbmcgMTUwbXMgZWFzZSAwbXM7XFxuICAgIG1heC1oZWlnaHQ6IG5vbmU7XFxuICAgIHBhZGRpbmc6IDI0cHggMjBweDtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgZWRzLWFjY29yZGlvbiBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZV0gLmVkcy1hY2NvcmRpb24tbGFiZWwge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2NjY2M7XFxuICAgIHBhZGRpbmc6IDEwcHggMjBweDtcXG4gICAgd2lkdGg6IGF1dG87IH1cXG4gICAgZWRzLWFjY29yZGlvbiBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZV0gLmVkcy1hY2NvcmRpb24tbGFiZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwtdGV4dDpudGgtY2hpbGQoMSkge1xcbiAgICAgIGRpc3BsYXk6IG5vbmU7IH1cXG4gICAgZWRzLWFjY29yZGlvbiBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZV0gLmVkcy1hY2NvcmRpb24tbGFiZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwtdGV4dDpudGgtY2hpbGQoMikge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrOyB9XFxuICAgIGVkcy1hY2NvcmRpb24gZWRzLWFjY29yZGlvbi1wYW5lbFthY3RpdmVdIC5lZHMtYWNjb3JkaW9uLWxhYmVsIC5lZHMtYWNjb3JkaW9uLXN1YmxhYmVsIHtcXG4gICAgICBkaXNwbGF5OiBibG9jazsgfVxcbiAgICBlZHMtYWNjb3JkaW9uIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlXSAuZWRzLWFjY29yZGlvbi1sYWJlbCAuZWRzLWFjY29yZGlvbi1jYXJldCB7XFxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTsgfVxcbiAgZWRzLWFjY29yZGlvbi5kYXRhIHtcXG4gICAgZGlzcGxheTogbm9uZTsgfVxcblxcbmVkcy1hY2NvcmRpb25bd2lkZV0ge1xcbiAgYm9yZGVyLXJhZGl1czogMDsgfVxcbiAgZWRzLWFjY29yZGlvblt3aWRlXSBlZHMtYWNjb3JkaW9uLXBhbmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsIHtcXG4gICAgcGFkZGluZzogMTBweCA1MHB4OyB9XFxuICBlZHMtYWNjb3JkaW9uW3dpZGVdIGVkcy1hY2NvcmRpb24tcGFuZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwtdGV4dDpudGgtY2hpbGQoMSkge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgIGNvbG9yOiAjNmQyMDc3OyB9XFxuICBlZHMtYWNjb3JkaW9uW3dpZGVdIGVkcy1hY2NvcmRpb24tcGFuZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwtdGV4dDpudGgtY2hpbGQoMikge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIGNvbG9yOiAjMzMzMzMzO1xcbiAgICBtYXJnaW4tbGVmdDogM3B4OyB9XFxuICBlZHMtYWNjb3JkaW9uW3dpZGVdIGVkcy1hY2NvcmRpb24tcGFuZWwgLmVkcy1hY2NvcmRpb24tY2FyZXQge1xcbiAgICB0b3A6IDE2cHg7XFxuICAgIGxlZnQ6IDE5cHg7IH1cXG4gIGVkcy1hY2NvcmRpb25bd2lkZV0gZWRzLWFjY29yZGlvbi1wYW5lbCBwIHtcXG4gICAgcGFkZGluZzogMCA1MHB4OyB9XFxuICBlZHMtYWNjb3JkaW9uW3dpZGVdIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlXSAuZWRzLWFjY29yZGlvbi1sYWJlbCB7XFxuICAgIGJvcmRlcjogMDtcXG4gICAgcGFkZGluZzogMTFweCAwO1xcbiAgICBtYXJnaW46IDAgNTBweDsgfVxcbiAgICBlZHMtYWNjb3JkaW9uW3dpZGVdIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlXSAuZWRzLWFjY29yZGlvbi1sYWJlbCAuZWRzLWFjY29yZGlvbi1sYWJlbC10ZXh0Om50aC1jaGlsZCgxKSB7XFxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrOyB9XFxuICAgIGVkcy1hY2NvcmRpb25bd2lkZV0gZWRzLWFjY29yZGlvbi1wYW5lbFthY3RpdmVdIC5lZHMtYWNjb3JkaW9uLWxhYmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsLXRleHQ6bnRoLWNoaWxkKDIpIHtcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXG4gIGVkcy1hY2NvcmRpb25bd2lkZV0gZWRzLWFjY29yZGlvbi1wYW5lbFthY3RpdmVdIHAge1xcbiAgICBwYWRkaW5nOiAyNHB4IDUwcHggNDhweCA1MHB4OyB9XFxuICBlZHMtYWNjb3JkaW9uW3dpZGVdIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlPVxcXCJ0cnVlXFxcIl0gLmVkcy1hY2NvcmRpb24tbGFiZWwge1xcbiAgICBib3JkZXI6IDA7XFxuICAgIHBhZGRpbmc6IDExcHggMDtcXG4gICAgbWFyZ2luOiAwIDUwcHg7IH1cXG4gICAgZWRzLWFjY29yZGlvblt3aWRlXSBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZT1cXFwidHJ1ZVxcXCJdIC5lZHMtYWNjb3JkaW9uLWxhYmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsLXRleHQ6bnRoLWNoaWxkKDEpIHtcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXG4gICAgZWRzLWFjY29yZGlvblt3aWRlXSBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZT1cXFwidHJ1ZVxcXCJdIC5lZHMtYWNjb3JkaW9uLWxhYmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsLXRleHQ6bnRoLWNoaWxkKDIpIHtcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXG4gIGVkcy1hY2NvcmRpb25bd2lkZV0gZWRzLWFjY29yZGlvbi1wYW5lbFthY3RpdmU9XFxcInRydWVcXFwiXSBwIHtcXG4gICAgcGFkZGluZzogMjRweCA1MHB4IDQ4cHggNTBweDsgfVxcblxcbmVkcy1hY2NvcmRpb25bd2lkZT1cXFwidHJ1ZVxcXCJdIHtcXG4gIGJvcmRlci1yYWRpdXM6IDA7IH1cXG4gIGVkcy1hY2NvcmRpb25bd2lkZT1cXFwidHJ1ZVxcXCJdIGVkcy1hY2NvcmRpb24tcGFuZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwge1xcbiAgICBwYWRkaW5nOiAxMHB4IDUwcHg7IH1cXG4gIGVkcy1hY2NvcmRpb25bd2lkZT1cXFwidHJ1ZVxcXCJdIGVkcy1hY2NvcmRpb24tcGFuZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwtdGV4dDpudGgtY2hpbGQoMSkge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgIGNvbG9yOiAjNmQyMDc3OyB9XFxuICBlZHMtYWNjb3JkaW9uW3dpZGU9XFxcInRydWVcXFwiXSBlZHMtYWNjb3JkaW9uLXBhbmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsLXRleHQ6bnRoLWNoaWxkKDIpIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBjb2xvcjogIzMzMzMzMztcXG4gICAgbWFyZ2luLWxlZnQ6IDNweDsgfVxcbiAgZWRzLWFjY29yZGlvblt3aWRlPVxcXCJ0cnVlXFxcIl0gZWRzLWFjY29yZGlvbi1wYW5lbCAuZWRzLWFjY29yZGlvbi1jYXJldCB7XFxuICAgIHRvcDogMTZweDtcXG4gICAgbGVmdDogMTlweDsgfVxcbiAgZWRzLWFjY29yZGlvblt3aWRlPVxcXCJ0cnVlXFxcIl0gZWRzLWFjY29yZGlvbi1wYW5lbCBwIHtcXG4gICAgcGFkZGluZzogMCA1MHB4OyB9XFxuICBlZHMtYWNjb3JkaW9uW3dpZGU9XFxcInRydWVcXFwiXSBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZV0gLmVkcy1hY2NvcmRpb24tbGFiZWwge1xcbiAgICBib3JkZXI6IDA7XFxuICAgIHBhZGRpbmc6IDExcHggMDtcXG4gICAgbWFyZ2luOiAwIDUwcHg7IH1cXG4gICAgZWRzLWFjY29yZGlvblt3aWRlPVxcXCJ0cnVlXFxcIl0gZWRzLWFjY29yZGlvbi1wYW5lbFthY3RpdmVdIC5lZHMtYWNjb3JkaW9uLWxhYmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsLXRleHQ6bnRoLWNoaWxkKDEpIHtcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXG4gICAgZWRzLWFjY29yZGlvblt3aWRlPVxcXCJ0cnVlXFxcIl0gZWRzLWFjY29yZGlvbi1wYW5lbFthY3RpdmVdIC5lZHMtYWNjb3JkaW9uLWxhYmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsLXRleHQ6bnRoLWNoaWxkKDIpIHtcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXG4gIGVkcy1hY2NvcmRpb25bd2lkZT1cXFwidHJ1ZVxcXCJdIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlXSBwIHtcXG4gICAgcGFkZGluZzogMjRweCA1MHB4IDQ4cHggNTBweDsgfVxcbiAgZWRzLWFjY29yZGlvblt3aWRlPVxcXCJ0cnVlXFxcIl0gZWRzLWFjY29yZGlvbi1wYW5lbFthY3RpdmU9XFxcInRydWVcXFwiXSAuZWRzLWFjY29yZGlvbi1sYWJlbCB7XFxuICAgIGJvcmRlcjogMDtcXG4gICAgcGFkZGluZzogMTFweCAwO1xcbiAgICBtYXJnaW46IDAgNTBweDsgfVxcbiAgICBlZHMtYWNjb3JkaW9uW3dpZGU9XFxcInRydWVcXFwiXSBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZT1cXFwidHJ1ZVxcXCJdIC5lZHMtYWNjb3JkaW9uLWxhYmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsLXRleHQ6bnRoLWNoaWxkKDEpIHtcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXG4gICAgZWRzLWFjY29yZGlvblt3aWRlPVxcXCJ0cnVlXFxcIl0gZWRzLWFjY29yZGlvbi1wYW5lbFthY3RpdmU9XFxcInRydWVcXFwiXSAuZWRzLWFjY29yZGlvbi1sYWJlbCAuZWRzLWFjY29yZGlvbi1sYWJlbC10ZXh0Om50aC1jaGlsZCgyKSB7XFxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrOyB9XFxuICBlZHMtYWNjb3JkaW9uW3dpZGU9XFxcInRydWVcXFwiXSBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZT1cXFwidHJ1ZVxcXCJdIHAge1xcbiAgICBwYWRkaW5nOiAyNHB4IDUwcHggNDhweCA1MHB4OyB9XFxuXFxuLmVkcy1ncmV5ZWQge1xcbiAgY29sb3I6ICNjY2NjY2M7IH1cXG5cXG4uYWNjdC1jb250YWluZXIgLmVkcy1hY2NvcmRpb24tbGFiZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwtdGV4dCB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogc3VwZXI7IH1cXG5cXG4uYWNjdC1jb250YWluZXIgLmNvbnRhaW5lck1pZGRsZSA+IGVkcy1jYXJkIHtcXG4gIHBhZGRpbmc6IDIwcHggMzhweDsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiZWRzLXRhYnMge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwYWRkaW5nLWxlZnQ6IDM2cHg7IH1cXG4gIGVkcy10YWJzIC50YWItbGFiZWxzIHtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2NjY2M7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDUwcHg7XFxuICAgIG92ZXJmbG93LXg6IGF1dG87XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDsgfVxcbiAgICBlZHMtdGFicyAudGFiLWxhYmVscyBsaSB7XFxuICAgICAgbWFyZ2luOiAwO1xcbiAgICAgIHBhZGRpbmc6IDA7XFxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgICBsaW5lLWhlaWdodDogNDVweDsgfVxcbiAgICAgIGVkcy10YWJzIC50YWItbGFiZWxzIGxpIGEge1xcbiAgICAgICAgcGFkZGluZzogMCAyMHB4O1xcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICBmb250LXNpemU6IDE0cHg7XFxuICAgICAgICBmb250LXdlaWdodDogNTAwO1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICBjb2xvcjogIzQyNmRhOTtcXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTsgfVxcbiAgICAgICAgZWRzLXRhYnMgLnRhYi1sYWJlbHMgbGkgYTpob3ZlciB7XFxuICAgICAgICAgIGJvcmRlci1ib3R0b206IDRweCBzb2xpZCAjZDhkOGQ4O1xcbiAgICAgICAgICBjb2xvcjogIzE2M2M2ZjsgfVxcbiAgICAgIGVkcy10YWJzIC50YWItbGFiZWxzIGxpIGFbYXJpYS1zZWxlY3RlZD1cXFwidHJ1ZVxcXCJdIHtcXG4gICAgICAgIGJvcmRlci1ib3R0b206IDRweCBzb2xpZCAjZTYzODg4O1xcbiAgICAgICAgY29sb3I6ICMxNjNjNmY7IH1cXG4gIGVkcy10YWJzIGVkcy10YWIge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IC4xNXMgbGluZWFyOyB9XFxuICAgIGVkcy10YWJzIGVkcy10YWI6YWZ0ZXIge1xcbiAgICAgIGNvbnRlbnQ6IFxcXCIgXFxcIjtcXG4gICAgICBkaXNwbGF5OiB0YWJsZTsgfVxcbiAgICBlZHMtdGFicyBlZHMtdGFiOmJlZm9yZSB7XFxuICAgICAgY29udGVudDogXFxcIiBcXFwiO1xcbiAgICAgIGRpc3BsYXk6IHRhYmxlOyB9XFxuICBlZHMtdGFicyBlZHMtdGFiW2FjdGl2ZV0ge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgZWRzLXRhYnMgLmNvbnRhaW5lclNpZGUgZWRzLXRhYnMge1xcbiAgICBwYWRkaW5nOiAwOyB9XFxuXFxuZWRzLXRhYnNbdmVydGljYWxdIHtcXG4gIGRpc3BsYXk6IGZsZXg7IH1cXG4gIGVkcy10YWJzW3ZlcnRpY2FsXSAudGFiLWxhYmVscyB7XFxuICAgIGhlaWdodDogZml0LWNvbnRlbnQ7XFxuICAgIGZsZXg6IDAgMCAxODBweDtcXG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2Q4ZDhkODtcXG4gICAgYm9yZGVyLWJvdHRvbTogbm9uZTsgfVxcbiAgICBlZHMtdGFic1t2ZXJ0aWNhbF0gLnRhYi1sYWJlbHMgbGkge1xcbiAgICAgIGhlaWdodDogNTBweDtcXG4gICAgICBsaW5lLWhlaWdodDogNTBweDtcXG4gICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkOGQ4ZDg7IH1cXG4gICAgICBlZHMtdGFic1t2ZXJ0aWNhbF0gLnRhYi1sYWJlbHMgbGk6bGFzdC1jaGlsZCB7XFxuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Q4ZDhkODsgfVxcbiAgICAgIGVkcy10YWJzW3ZlcnRpY2FsXSAudGFiLWxhYmVscyBsaSBhOmhvdmVyIHtcXG4gICAgICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgI2Q4ZDhkODtcXG4gICAgICAgIGJvcmRlci1ib3R0b206IG5vbmU7XFxuICAgICAgICBwYWRkaW5nLWxlZnQ6IDE2cHg7IH1cXG4gICAgICBlZHMtdGFic1t2ZXJ0aWNhbF0gLnRhYi1sYWJlbHMgbGkgYVthcmlhLXNlbGVjdGVkPVxcXCJ0cnVlXFxcIl0ge1xcbiAgICAgICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCAjZTYzODg4O1xcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcXG4gICAgICAgIHBhZGRpbmctbGVmdDogMTZweDsgfVxcblxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDgwcHgpIHtcXG4gIGVkcy10YWJzIHtcXG4gICAgZGlzcGxheTogZmxleDsgfVxcbiAgICBlZHMtdGFicyAudGFiLWxhYmVscyB7XFxuICAgICAgaGVpZ2h0OiBmaXQtY29udGVudDtcXG4gICAgICBmbGV4OiAwIDAgMTgwcHg7XFxuICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2Q4ZDhkODtcXG4gICAgICBib3JkZXItYm90dG9tOiBub25lOyB9XFxuICAgICAgZWRzLXRhYnMgLnRhYi1sYWJlbHMgbGkge1xcbiAgICAgICAgaGVpZ2h0OiA1MHB4O1xcbiAgICAgICAgbGluZS1oZWlnaHQ6IDUwcHg7XFxuICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkOGQ4ZDg7IH1cXG4gICAgICAgIGVkcy10YWJzIC50YWItbGFiZWxzIGxpOmxhc3QtY2hpbGQge1xcbiAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Q4ZDhkODsgfVxcbiAgICAgICAgZWRzLXRhYnMgLnRhYi1sYWJlbHMgbGkgYTpob3ZlciB7XFxuICAgICAgICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgI2Q4ZDhkODtcXG4gICAgICAgICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcXG4gICAgICAgICAgcGFkZGluZy1sZWZ0OiAxNnB4OyB9XFxuICAgICAgICBlZHMtdGFicyAudGFiLWxhYmVscyBsaSBhW2FyaWEtc2VsZWN0ZWQ9XFxcInRydWVcXFwiXSB7XFxuICAgICAgICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgI2U2Mzg4ODtcXG4gICAgICAgICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcXG4gICAgICAgICAgcGFkZGluZy1sZWZ0OiAxNnB4OyB9IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5wcm9taXNlcGF5X19uYXZ0YWIge1xcbiAgd2lkdGg6IDIwMHB4O1xcbiAgbWFyZ2luOiAwIGF1dG8gMjBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDsgfVxcblxcbi5wcm9taXNlcGF5X19uYXZ0YWJjb250IHtcXG4gIHBhZGRpbmc6IDA7XFxuICBsaW5lLWhlaWdodDogMTBweDsgfVxcblxcbi5wcm9taXNlcGF5X19uYXZ0YWJsaXN0IHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICBsaW5lLWhlaWdodDogMTBweDsgfVxcblxcbi5wcm9taXNlcGF5X19uYXZ0YWJsaW5rIHtcXG4gIGJvcmRlcjogc29saWQgMXB4ICNkODJiODA7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1NZWRpdW1cXFwiICFpbXBvcnRhbnQ7XFxuICBmb250LXdlaWdodDogbm9ybWFsICFpbXBvcnRhbnQ7XFxuICBjb2xvcjogIzQyNmRhOTtcXG4gIG1pbi13aWR0aDogOTdweDtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgcGFkZGluZzogMTBweCAwOyB9XFxuXFxuLnByb21pc2VwYXktLW5hdnRhYmxpbmthY3RpdmUge1xcbiAgYmFja2dyb3VuZDogI2Q4MmI4MDtcXG4gIGNvbG9yOiAjZmZmZmZmICFpbXBvcnRhbnQ7IH1cXG5cXG4ucHJvbWlzZXBheS0tbmF2dGFibGlua2ZpcnN0IHtcXG4gIGJvcmRlci1yYWRpdXM6IDRweCAwIDAgNHB4ICFpbXBvcnRhbnQ7IH1cXG5cXG4ucHJvbWlzZXBheS0tbmF2dGFibGlua2xhc3Qge1xcbiAgYm9yZGVyLXJhZGl1czogMCA0cHggNHB4IDAgIWltcG9ydGFudDsgfVxcblxcbi5wcm9taXNlcGF5X19oZWFkaW5nIHtcXG4gIGZvbnQtc2l6ZTogMjBweCAhaW1wb3J0YW50O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8tUmVndWxhclxcXCIgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gIGNvbG9yOiAjMDAwMDAwO1xcbiAgbWFyZ2luLWJvdHRvbTogMjVweDsgfVxcblxcbi5wcm9taXNlcGF5X19saXN0IHtcXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIGZsb2F0OiBsZWZ0OyB9XFxuICAucHJvbWlzZXBheV9fbGlzdCBlZHMtZHJvcGRvd24gLmVkcy1kcm9wZG93bi10cmlnZ2VyIHtcXG4gICAgZm9udC1zaXplOiAxNHB4OyB9XFxuXFxuLnByb21pc2VwYXlfX2xhYmVsIHtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLVJlZ3VsYXJcXFwiICFpbXBvcnRhbnQ7XFxuICBmb250LXdlaWdodDogbm9ybWFsICFpbXBvcnRhbnQ7XFxuICBjb2xvcjogIzQyNmRhOTtcXG4gIG1pbi13aWR0aDogMjEwcHg7XFxuICBmbG9hdDogbGVmdDtcXG4gIHBhZGRpbmctdG9wOiA3cHg7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4ucHJvbWlzZXBheV9fcmVxdWlyZWQge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAzcHg7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1SZWd1bGFyXFxcIjtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBjb2xvcjogIzQyNmRhOTtcXG4gIGxlZnQ6IC05cHg7IH1cXG5cXG4ucHJvbWlzZXBheV9faW5wdXQge1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggI2NjY2NjYztcXG4gIHBhZGRpbmc6IDlweCA1cHg7XFxuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xcbiAgd2lkdGg6IDE0MHB4O1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1SZWd1bGFyXFxcIiAhaW1wb3J0YW50O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xcbiAgY29sb3I6ICMzMzMzMzM7IH1cXG5cXG4ucHJvbWlzZXBheS0tcmVhZG9ubHkge1xcbiAgYmFja2dyb3VuZDogI2Y2ZjZmNjsgfVxcblxcbi5wcm9taXNlcGF5LS1zbWx3aWR0aCB7XFxuICB3aWR0aDogNTBweDtcXG4gIG1hcmdpbi1sZWZ0OiAxMHB4OyB9XFxuXFxuLnByb21pc2VwYXlfX291dHB1dCB7XFxuICBwYWRkaW5nLXRvcDogNXB4OyB9XFxuXFxuLnByb21pc2VwYXlfX2J0bmNvbnQge1xcbiAgbWFyZ2luOiAwICFpbXBvcnRhbnQ7XFxuICBib3JkZXItcmFkaXVzOiAwIDAgNHB4IDRweDtcXG4gIGJvcmRlci10b3A6IDAgIWltcG9ydGFudDsgfVxcblxcbi5wcm9taXNlcGF5X19oZWxwIHtcXG4gIGZsb2F0OiByaWdodDtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIGJvcmRlcjogc29saWQgMXB4ICM0MjZkYTk7IH1cXG5cXG4ucHJvbWlzZXBheV9faGVscGltZyB7XFxuICB3aWR0aDogMjBweDtcXG4gIGhlaWdodDogMjBweDtcXG4gIGZsb2F0OiBsZWZ0OyB9XFxuXFxuLnByb21pc2VwYXlfX2lubmVydGFiIHtcXG4gIGRpc3BsYXk6IG5vbmU7IH1cXG5cXG4ucHJvbWlzZXBheS0tc2VsZWN0ZWR0YWIge1xcbiAgZGlzcGxheTogYmxvY2s7IH1cXG5cXG4ucHJvbWlzZXBheV9fY2FsZW5kYXIge1xcbiAgcGFkZGluZzogNnB4IDE1cHggN3B4IDE1cHg7XFxuICBiYWNrZ3JvdW5kOiAjZjZmNmY2O1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgYm9yZGVyLXJhZGl1czogMCA0cHggNHB4IDA7XFxuICBib3JkZXI6IHNvbGlkIDFweCAjY2NjO1xcbiAgYm9yZGVyLWxlZnQ6IG5vbmU7IH1cXG5cXG4ucHJvbWlzZXBheS0tZGF0ZWZpZWxkIHtcXG4gIGJvcmRlci1yYWRpdXM6IDRweCAwIDAgNHB4OyB9XFxuXFxuLnByb21pc2VwYXlfX2NhbGRyaW1nIHtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IH1cXG5cXG4ucHJvbWlzZXBheV9fb3V0cHV0IHtcXG4gIGZvbnQtc2l6ZTogMTRweDsgfVxcblxcbi5lZHMtLXByb21pc2Vjb250IHtcXG4gIG1hcmdpbi1ib3R0b206IDAgIWltcG9ydGFudDtcXG4gIGJvcmRlci1yYWRpdXM6IDRweCA0cHggMCAwOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuc2VhcmNoIHtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgd2lkdGg6IDEwMCU7IH1cXG4gIC5zZWFyY2hfX2lubmVyY29udCB7XFxuICAgIHdpZHRoOiA3NyU7XFxuICAgIG1hcmdpbjogNTBweCBhdXRvIDAgYXV0bzsgfVxcbiAgLnNlYXJjaF9faGVhZGluZyB7XFxuICAgIGZvbnQtc2l6ZTogMTVweCAhaW1wb3J0YW50O1xcbiAgICBmb250LWZhbWlseTogXFxcIlJvYm90by1SZWd1bGFyXFxcIiAhaW1wb3J0YW50ICFpbXBvcnRhbnQ7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gICAgY29sb3I6ICMwMDAwMDA7XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjMzOyB9XFxuICAuc2VhcmNoX19jYWxsc3RhdHMge1xcbiAgICBmbG9hdDogbGVmdDtcXG4gICAgd2lkdGg6IDEzMHB4O1xcbiAgICBtYXJnaW46IDQycHggNDZweCA0OHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gIC5zZWFyY2hfX3N0YXRjb3VudCB7XFxuICAgIGZvbnQtc2l6ZTogNjRweCAhaW1wb3J0YW50O1xcbiAgICBmb250LWZhbWlseTogXFxcIlJvYm90by1NZWRpdW1cXFwiICFpbXBvcnRhbnQ7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gICAgY29sb3I6ICM0ZTRlNGU7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuICAuc2VhcmNoX19zdGF0ZGVzYyB7XFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG9cXFwiICFpbXBvcnRhbnQ7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gICAgY29sb3I6ICM3YTdhN2E7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgIG1hcmdpbi10b3A6IDMycHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGxpbmUtaGVpZ2h0OiAxN3B4O1xcbiAgICBmb250LXdlaWdodDogYm9sZCAhaW1wb3J0YW50OyB9XFxuICAuc2VhcmNoX192aXN1YWxseWhpZGRlbiB7XFxuICAgIGJvcmRlcjogMDtcXG4gICAgY2xpcDogcmVjdCgwIDAgMCAwKTtcXG4gICAgaGVpZ2h0OiAxcHg7XFxuICAgIG1hcmdpbjogLTFweDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMXB4OyB9XFxuICAuc2VhcmNoX19wZXJjZW50YWdlIHtcXG4gICAgZm9udC1zaXplOiAxOHB4O1xcbiAgICBmb250LWZhbWlseTogXFxcIlJvYm90by1Cb2xkXFxcIiAhaW1wb3J0YW50O1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsICFpbXBvcnRhbnQ7XFxuICAgIGNvbG9yOiAjMzMzMzMzO1xcbiAgICBsaW5lLWhlaWdodDogMC44MztcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBib3R0b206IC0xNXB4O1xcbiAgICByaWdodDogLTNweDsgfVxcbiAgLnNlYXJjaC0tY29sbGVjdGVkIHtcXG4gICAgbWFyZ2luOiA0MHB4IDEwcHggMzBweDtcXG4gICAgd2lkdGg6IDE1MHB4OyB9XFxuICAuc2VhcmNoX19ieWNvbnQge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjZmNmY2O1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjY2NjY2NjO1xcbiAgICBmbG9hdDogbGVmdDtcXG4gICAgcGFkZGluZzogMjBweCAwO1xcbiAgICBtYXJnaW4tYm90dG9tOiA1MnB4OyB9XFxuICAuc2VhcmNoX19mb3JtIHtcXG4gICAgd2lkdGg6IDcwJTtcXG4gICAgbWFyZ2luOiAwIGF1dG87IH1cXG4gICAgLnNlYXJjaF9fZm9ybSAuYnRuIHtcXG4gICAgICBib3JkZXI6IG5vbmU7XFxuICAgICAgcGFkZGluZzogN3B4IDA7XFxuICAgICAgZm9udC1mYW1pbHk6IFJvYm90byAhaW1wb3J0YW50OyB9XFxuICAuc2VhcmNoX19pbnB1dCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICM4ODg4ODg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICBmb250LWZhbWlseTogXFxcIlJvYm90by1SZWd1bGFyXFxcIiAhaW1wb3J0YW50O1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsICFpbXBvcnRhbnQ7XFxuICAgIGNvbG9yOiAjYWFhYWFhO1xcbiAgICBwYWRkaW5nOiA1cHggMHB4IDVweCAxMHB4O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxuICAgIHdpZHRoOiAyMzlweDsgfVxcbiAgICAuc2VhcmNoX19pbnB1dDo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciB7XFxuICAgICAgY29sb3I6ICNhYWFhYWE7XFxuICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLCBoMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsIGEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSwgZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLCBzbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLCBiLCB1LCBpLCBjZW50ZXIsIGRsLCBkdCwgZGQsIG9sLCB1bCwgbGksIGZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLCB0YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCwgYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIGZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksIHRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm9yZGVyOiAwO1xcbiAgZm9udC1zaXplOiAxMDAlO1xcbiAgZm9udDogaW5oZXJpdDtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTsgfVxcblxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcbiAgZGlzcGxheTogYmxvY2s7IH1cXG5cXG5ib2R5IHtcXG4gIGxpbmUtaGVpZ2h0OiAxOyB9XFxuXFxub2wsIHVsIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7IH1cXG5cXG5ibG9ja3F1b3RlLCBxIHtcXG4gIHF1b3Rlczogbm9uZTsgfVxcblxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgY29udGVudDogbm9uZTsgfVxcblxcbnRhYmxlIHtcXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuICBib3JkZXItc3BhY2luZzogMDsgfVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZDogI2ZmZjtcXG4gIG1heC13aWR0aDogMTY4MHB4O1xcbiAgbWFyZ2luOiAwIGF1dG87IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlU291cmNlTWFwKSB7XG5cdHZhciBsaXN0ID0gW107XG5cblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmV0dXJuIFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgY29udGVudCArIFwifVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSkuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcblx0dmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuXHR2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cdGlmICghY3NzTWFwcGluZykge1xuXHRcdHJldHVybiBjb250ZW50O1xuXHR9XG5cblx0aWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuXHRcdHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0XHRyZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcblx0fVxuXG5cdHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuXHR2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuXG5cdHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVzY2FwZSh1cmwpIHtcbiAgICBpZiAodHlwZW9mIHVybCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHVybFxuICAgIH1cbiAgICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICAgICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgICB9XG4gICAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAgIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gICAgaWYgKC9bXCInKCkgXFx0XFxuXS8udGVzdCh1cmwpKSB7XG4gICAgICAgIHJldHVybiAnXCInICsgdXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgJ1xcXFxuJykgKyAnXCInXG4gICAgfVxuXG4gICAgcmV0dXJuIHVybFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvTWF0ZXJpYWxJY29ucy1SZWd1bGFyLmVvdFwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL01hdGVyaWFsSWNvbnMtUmVndWxhci50dGZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9NYXRlcmlhbEljb25zLVJlZ3VsYXIud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL01hdGVyaWFsSWNvbnMtUmVndWxhci53b2ZmMlwiOyIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9tYXRlcmlhbC1pY29ucy5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbWF0ZXJpYWwtaWNvbnMuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbWF0ZXJpYWwtaWNvbnMuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3JvYm90by1mb250ZmFjZS5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vcm9ib3RvLWZvbnRmYWNlLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3JvYm90by1mb250ZmFjZS5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9Sb2JvdG8tQmxhY2sud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1CbGFjay53b2ZmMlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1CbGFja0l0YWxpYy53b2ZmXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvUm9ib3RvLUJsYWNrSXRhbGljLndvZmYyXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvUm9ib3RvLUJvbGQud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1Cb2xkLndvZmYyXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvUm9ib3RvLUJvbGRJdGFsaWMud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1Cb2xkSXRhbGljLndvZmYyXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvUm9ib3RvLUxpZ2h0LndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9Sb2JvdG8tTGlnaHQud29mZjJcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9Sb2JvdG8tTGlnaHRJdGFsaWMud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1MaWdodEl0YWxpYy53b2ZmMlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1NZWRpdW0ud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1NZWRpdW0ud29mZjJcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9Sb2JvdG8tTWVkaXVtSXRhbGljLndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9Sb2JvdG8tTWVkaXVtSXRhbGljLndvZmYyXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvUm9ib3RvLVJlZ3VsYXIud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1SZWd1bGFyLndvZmYyXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvUm9ib3RvLVJlZ3VsYXJJdGFsaWMud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1SZWd1bGFySXRhbGljLndvZmYyXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvUm9ib3RvLVRoaW4ud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1UaGluLndvZmYyXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvUm9ib3RvLVRoaW5JdGFsaWMud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1UaGluSXRhbGljLndvZmYyXCI7IiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uICh0YXJnZXQsIHBhcmVudCkge1xuICBpZiAocGFyZW50KXtcbiAgICByZXR1cm4gcGFyZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcbiAgfVxuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xufTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHRhcmdldCwgcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgcGFzc2luZyBmdW5jdGlvbiBpbiBvcHRpb25zLCB0aGVuIHVzZSBpdCBmb3IgcmVzb2x2ZSBcImhlYWRcIiBlbGVtZW50LlxuICAgICAgICAgICAgICAgIC8vIFVzZWZ1bCBmb3IgU2hhZG93IFJvb3Qgc3R5bGUgaS5lXG4gICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgIC8vICAgaW5zZXJ0SW50bzogZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb29cIikuc2hhZG93Um9vdCB9XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBnZXRUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQsIHBhcmVudCk7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG5cdFx0XHRcdFx0Ly8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuXHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1t0YXJnZXRdXG5cdH07XG59KSgpO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09IFwiYm9vbGVhblwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuICAgICAgICBpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpIHtcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlLCB0YXJnZXQpO1xuXHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIG5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJbU3R5bGUgTG9hZGVyXVxcblxcbiBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0JyAoJ29wdGlvbnMuaW5zZXJ0QXQnKSBmb3VuZC5cXG4gTXVzdCBiZSAndG9wJywgJ2JvdHRvbScsIG9yIE9iamVjdC5cXG4gKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyI2luc2VydGF0KVxcblwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXG5cdGlmKG9wdGlvbnMuYXR0cnMubm9uY2UgPT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBub25jZSA9IGdldE5vbmNlKCk7XG5cdFx0aWYgKG5vbmNlKSB7XG5cdFx0XHRvcHRpb25zLmF0dHJzLm5vbmNlID0gbm9uY2U7XG5cdFx0fVxuXHR9XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gZ2V0Tm9uY2UoKSB7XG5cdGlmICh0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRyZXR1cm4gX193ZWJwYWNrX25vbmNlX187XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG4iLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcL3xcXHMqJCkvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInNyYy9hc3NldHMvaW1hZ2VzL2RpdmVydF9faWNvbi5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJzcmMvYXNzZXRzL2ltYWdlcy9leHBlcmlhbl9fbG9nb2xhdGVzdC5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJzcmMvYXNzZXRzL2ltYWdlcy9maWxlX19pY29uLnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInNyYy9hc3NldHMvaW1hZ2VzL25leHRfX2ljb24ucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwic3JjL2Fzc2V0cy9pbWFnZXMvcHJvZmlsZV9faWNvbi5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJzcmMvYXNzZXRzL2ltYWdlcy91c2VyX19pY29uLnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInNyYy9hc3NldHMvaW1hZ2VzL3VzZXJmb2xkZXJfaWNvbi5wbmdcIjsiLCJpbXBvcnQgJ3JvYm90by1mb250ZmFjZSc7XG5pbXBvcnQgJ21hdGVyaWFsLWljb25zJztcbmltcG9ydCAnLi4vc3R5bGVzL2FwcC5zY3NzJztcbmltcG9ydCAnLi4vc3R5bGVzL2Vkcy1nbG9iYWwtc3R5bGVzLnNjc3MnO1xuXG5pbXBvcnQgJy4uL3N0eWxlcy9oZWFkZXIuc2Nzcyc7XG5pbXBvcnQgJy4uL3N0eWxlcy9zZWFyY2guc2Nzcyc7XG5pbXBvcnQgJy4uL3N0eWxlcy9jYXNlTGlzdC5zY3NzJztcbmltcG9ydCAnLi4vc3R5bGVzL3N0eWxlLmNzcyc7XG5pbXBvcnQgJy4uL3N0eWxlcy9wY2MtZWRzLXNlY29uZGFyeS1oZWFkZXIuc2Nzcyc7XG5pbXBvcnQgJy4uL3N0eWxlcy9kZW1vLXBjYy1vdmVydmlldy5zY3NzJztcbmltcG9ydCAnLi4vc3R5bGVzL3BjYy1hY2NvcmRpYW4uc2Nzcyc7XG5pbXBvcnQgJy4uL3N0eWxlcy9lZHMtY2FyZC5zY3NzJztcbmltcG9ydCAnLi4vc3R5bGVzL2Vkcy1kcm9wZG93bi5zY3NzJztcbmltcG9ydCAnLi4vc3R5bGVzL2Vkcy1pY29uLnNjc3MnO1xuaW1wb3J0ICcuLi9zdHlsZXMvZWRzLXRpbWVsaW5lLWl0ZW0uc2Nzcyc7XG5pbXBvcnQgJy4uL3N0eWxlcy9lZHMtdGFnLnNjc3MnO1xuaW1wb3J0ICcuLi9zdHlsZXMvYWN0aXZpdGllcy5zY3NzJztcbmltcG9ydCAnLi4vc3R5bGVzL2NvbnRhY3QtZGV0YWlscy5zY3NzJztcbmltcG9ydCAnLi4vc3R5bGVzL3Byb21pc2UtcGF5LnNjc3MnO1xuaW1wb3J0ICcuLi9zY3JpcHRzL3Byb21pc2UtcGF5LmpzJyIsInN3aXRjaFRhYiA9IChkb2N1bWVudElkLCBzZWxlY3RlZFRhYkNsYXNzTmFtZSwgdGhpc1BhcmFtKSA9PiB7XG5cdGxldCBpZEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkb2N1bWVudElkKTtcblx0bGV0IGNsYXNzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoc2VsZWN0ZWRUYWJDbGFzc05hbWUpO1xuXHRsZXQgYWN0aXZlVGFiRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwcm9taXNlcGF5LS1uYXZ0YWJsaW5rYWN0aXZlXCIpO1xuXHRhY3RpdmVUYWJFbGVtZW50WzBdLnNldEF0dHJpYnV0ZShcImFyaWEtcHJlc3NlZFwiLCBmYWxzZSk7XG5cdGFjdGl2ZVRhYkVsZW1lbnRbMF0uY2xhc3NMaXN0LnJlbW92ZShcInByb21pc2VwYXktLW5hdnRhYmxpbmthY3RpdmVcIik7XG5cdHRoaXNQYXJhbS5jbGFzc0xpc3QuYWRkKFwicHJvbWlzZXBheS0tbmF2dGFibGlua2FjdGl2ZVwiKTtcblx0dGhpc1BhcmFtLnNldEF0dHJpYnV0ZShcImFyaWEtcHJlc3NlZFwiLCB0cnVlKTtcblx0Y2xhc3NFbGVtZW50WzBdLmNsYXNzTGlzdC5yZW1vdmUoc2VsZWN0ZWRUYWJDbGFzc05hbWUpO1xuXHRpZEVsZW1lbnQuY2xhc3NMaXN0LmFkZChzZWxlY3RlZFRhYkNsYXNzTmFtZSk7XG59XG5zd2l0Y2hQYXJlbnRUYWIgPSB0YWJJZCA9PiB7XG5cdGxldCB0YWJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YWItXCIrdGFiSWQpO1xuXHRsZXQgcGFuZWxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YWItcGFuZWwtXCIrdGFiSWQpO1xuXHRsZXQgcGFuZWxFbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJhY2NvdW50c1RhYlBhbmVsXCIpO1xuXHRsZXQgdGFiRWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYWNjb3VudHNUYWJcIik7XG5cdGZvciAoZWxlbWVudCBvZiB0YWJFbGVtZW50cykge1xuXHRcdGlmICh0YWJJZCA9PSAzICYmIGVsZW1lbnQuaWQgPT09IFwidGFiLTBcIikge1xuXHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhcmlhLXNlbGVjdGVkXCIsIHRydWUpO1xuXHRcdH0gZWxzZXtcblx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1zZWxlY3RlZFwiLCBmYWxzZSk7XG5cdFx0fVxuXHR9XG5cdGZvciAoZWxlbWVudCBvZiBwYW5lbEVsZW1lbnRzKSB7XG5cdFx0ZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJhY3RpdmVcIik7XG5cdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCB0cnVlKTtcblx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG5cdH1cblx0dGFiRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhcmlhLXNlbGVjdGVkXCIsIHRydWUpO1xuXHRwYW5lbEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYWN0aXZlXCIsIHRydWUpO1xuXHRwYW5lbEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgZmFsc2UpO1xuXHRwYW5lbEVsZW1lbnQuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCIwXCIpO1xuXHRpZiAodGFiSWQgPT0gMykge1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvbWlzZUFjdGl2aXR5XCIpLmNsaWNrKCk7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9taXNlX19hY3RzZWN0aW9uXCIpLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzBdLmNsYXNzTGlzdC5hZGQoXCJwcm9taXNlcGF5LS1saW5rYWN0aXZlXCIpO1xuXHR9XG59XG5cbmxldCBwYXRoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xubGV0IHBhZ2UgPSBwYXRoLnNwbGl0KFwiL1wiKS5wb3AoKTtcbmxldCBoZWFkZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoZWFkZXJcIik7XG5sZXQgcHJvcGVydHkgPSBwYWdlID09PSBcImluZGV4Lmh0bWxcIiA/IHRydWUgOiBmYWxzZTtcbmxldCB0YWJpbmRleCA9IHBhZ2UgPT09IFwiaW5kZXguaHRtbFwiID8gMCA6IC0xO1xuaGVhZGVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBwcm9wZXJ0eSk7XG5oZWFkZXJFbGVtZW50LnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIHRhYmluZGV4KTtcblxudG9nZ2xlTWVtbyA9ICgpID0+e1xuXHRsZXQgbWVtb0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibWVtb2RldGFpbFwiKTtcblx0Zm9yIChlbGVtZW50IG9mIG1lbW9FbGVtZW50KXtcblx0XHRsZXQgYWN0aXZlVmFsdWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImFjdGl2ZVwiKSA9PSBcInRydWVcIiA/IGZhbHNlIDogdHJ1ZTtcblx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZShcImFjdGl2ZVwiLCBhY3RpdmVWYWx1ZSk7XG5cdH1cbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9hY3Rpdml0aWVzLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vYWN0aXZpdGllcy5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9hY3Rpdml0aWVzLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9hcHAuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9hcHAuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vYXBwLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9jYXNlTGlzdC5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2Nhc2VMaXN0LnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2Nhc2VMaXN0LnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9jb250YWN0LWRldGFpbHMuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9jb250YWN0LWRldGFpbHMuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vY29udGFjdC1kZXRhaWxzLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9kZW1vLXBjYy1vdmVydmlldy5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2RlbW8tcGNjLW92ZXJ2aWV3LnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2RlbW8tcGNjLW92ZXJ2aWV3LnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9lZHMtY2FyZC5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2Vkcy1jYXJkLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2Vkcy1jYXJkLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9lZHMtZHJvcGRvd24uc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9lZHMtZHJvcGRvd24uc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vZWRzLWRyb3Bkb3duLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9lZHMtZ2xvYmFsLXN0eWxlcy5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2Vkcy1nbG9iYWwtc3R5bGVzLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2Vkcy1nbG9iYWwtc3R5bGVzLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9lZHMtaWNvbi5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2Vkcy1pY29uLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2Vkcy1pY29uLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9lZHMtdGFnLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vZWRzLXRhZy5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9lZHMtdGFnLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9lZHMtdGltZWxpbmUtaXRlbS5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2Vkcy10aW1lbGluZS1pdGVtLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2Vkcy10aW1lbGluZS1pdGVtLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9oZWFkZXIuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9oZWFkZXIuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vaGVhZGVyLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9wY2MtYWNjb3JkaWFuLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vcGNjLWFjY29yZGlhbi5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9wY2MtYWNjb3JkaWFuLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9wY2MtZWRzLXNlY29uZGFyeS1oZWFkZXIuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9wY2MtZWRzLXNlY29uZGFyeS1oZWFkZXIuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vcGNjLWVkcy1zZWNvbmRhcnktaGVhZGVyLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9wcm9taXNlLXBheS5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3Byb21pc2UtcGF5LnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3Byb21pc2UtcGF5LnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zZWFyY2guc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zZWFyY2guc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc2VhcmNoLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iXSwic291cmNlUm9vdCI6IiJ9