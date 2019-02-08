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
/******/ 	var hotCurrentHash = "18b20d7b360f7fe27057";
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
exports.push([module.i, ".mar-tp--0 {\n  margin-top: 0 !important; }\n\n.mar-rt--none {\n  margin-right: 0 !important; }\n\n.wdh-per--10 {\n  width: 10% !important; }\n\n.wdh-per--25 {\n  width: 25% !important; }\n\n.wdh-per--35 {\n  width: 35% !important; }\n\n.wdh-per--100 {\n  width: 100% !important; }\n\n.bor-tp--none {\n  border-top: none !important; }\n\n.bor-tpbt--none {\n  border-top: none !important;\n  border-bottom: none !important; }\n\n.txt-aln--rt {\n  text-align: right; }\n\n.activity-tabs li {\n  padding: 10px 15px;\n  border-bottom: 1px solid #d8d8d8; }\n  .activity-tabs li a {\n    text-decoration: none;\n    font-size: 14px;\n    font-weight: 500;\n    position: relative; }\n  .activity-tabs li .eds-accordion-caret {\n    position: absolute;\n    right: -22px;\n    top: 6px;\n    width: 12px;\n    height: 8px;\n    background-repeat: no-repeat;\n    background-size: contain;\n    background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSI3cHgiIHZpZXdCb3g9IjAgMCAxMiA3IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0OC4yICg0NzMyNykgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+R3JvdXAgMjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTIzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iR3JvdXAtMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNi4wMDAwMDAsIDEuMDAwMDAwKSByb3RhdGUoLTQ1LjAwMDAwMCkgdHJhbnNsYXRlKC02LjAwMDAwMCwgLTEuMDAwMDAwKSB0cmFuc2xhdGUoMi4wMDAwMDAsIC0zLjAwMDAwMCkiIGZpbGw9IiMwRTZFQjciPgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTIiIHg9IjAiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjgiIHJ4PSIxIj48L3JlY3Q+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMi1Db3B5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LjAwMDAwMCwgNy4wMDAwMDApIHJvdGF0ZSg5MC4wMDAwMDApIHRyYW5zbGF0ZSgtNC4wMDAwMDAsIC03LjAwMDAwMCkgIiB4PSIzIiB5PSIzIiB3aWR0aD0iMiIgaGVpZ2h0PSI4IiByeD0iMSI+PC9yZWN0PgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+\"); }\n\n.notes-tab {\n  margin-top: 385px; }\n  .notes-tab .eds-accordion-label {\n    background: #dcdcdc !important;\n    color: #426da9; }\n    .notes-tab .eds-accordion-label .notes-icon img {\n      vertical-align: bottom;\n      width: 24px;\n      height: 24px; }\n  .notes-tab .greyHeading button, .notes-tab .greyHeading h5 {\n    color: #426da9; }\n  .notes-tab textarea {\n    resize: none; }\n  .notes-tab .table {\n    padding: 10px;\n    background: #dcdcdc !important; }\n  .notes-tab .cell {\n    font-size: 12px; }\n  .notes-tab .eds-icon {\n    vertical-align: bottom; }\n  .notes-tab .note-btn {\n    border: none;\n    padding: 10px 25px !important;\n    background: #426da9 !important;\n    border-radius: 5px;\n    color: #fff !important;\n    text-transform: capitalize;\n    font-size: 14px; }\n  .notes-tab .row {\n    padding: 0 10px; }\n    .notes-tab .row > .cell {\n      vertical-align: middle; }\n\n.memo-tab ul {\n  display: none; }\n  .memo-tab ul li {\n    padding: 5px 10px; }\n\n.memo-tab[active=\"true\"] .eds-accordion-caret {\n  transform: rotate(180deg); }\n\n.memo-tab[active=\"true\"] ul {\n  display: block; }\n  .memo-tab[active=\"true\"] ul li {\n    border-bottom: none; }\n  .memo-tab[active=\"true\"] ul a {\n    font-weight: normal; }\n\n.promisepay__link {\n  margin-top: 10px !important;\n  padding-top: 7px !important;\n  padding-bottom: 7px !important;\n  border-bottom: none !important;\n  margin-bottom: 5px !important; }\n\n.promisepay--linkactive {\n  background: #fff;\n  border-left: solid 4px #d82b80;\n  padding-right: 12px !important; }\n", ""]);

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
exports.push([module.i, ".mar-tp--0 {\n  margin-top: 0 !important; }\n\n.mar-rt--none {\n  margin-right: 0 !important; }\n\n.wdh-per--10 {\n  width: 10% !important; }\n\n.wdh-per--25 {\n  width: 25% !important; }\n\n.wdh-per--35 {\n  width: 35% !important; }\n\n.wdh-per--100 {\n  width: 100% !important; }\n\n.bor-tp--none {\n  border-top: none !important; }\n\n.bor-tpbt--none {\n  border-top: none !important;\n  border-bottom: none !important; }\n\n.txt-aln--rt {\n  text-align: right; }\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline; }\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block; }\n\nbody {\n  line-height: 1; }\n\nol, ul, ol li, ul li {\n  list-style: none; }\n\n@media all and (-ms-high-contrast: none) {\n  ol, ul, ol li, ul li {\n    list-style: none;\n    list-style-image: url(data:0); } }\n\nblockquote, q {\n  quotes: none; }\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: '';\n  content: none; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\nbody {\n  font-family: 'Roboto'; }\n\n.container {\n  width: 1680px;\n  margin: auto; }\n\n.dis-flex {\n  display: flex; }\n\n.clear {\n  clear: both;\n  float: none; }\n\n.btn {\n  width: 120px;\n  padding: 10px 0;\n  border-radius: 4px;\n  background-color: #426da9;\n  border: solid 1px #004590;\n  font-size: 14px;\n  font-family: \"Roboto-Medium\" !important;\n  font-weight: normal !important;\n  color: #ffffff;\n  text-align: center;\n  cursor: pointer; }\n  .btn--ok {\n    width: 45px !important;\n    margin-right: 5px; }\n  .btn--cancel {\n    background: #f6f6f6;\n    border: solid 1px #cccccc;\n    color: #333333;\n    width: 80px; }\n  .btn--viewall {\n    float: right;\n    background: #f6f6f6;\n    color: #0e6eb7;\n    border: solid 1px rgba(0, 69, 144, 0.3); }\n    .btn--viewall:hover {\n      background-color: #426da9;\n      font-size: 14px;\n      font-family: \"Roboto-Medium\" !important;\n      font-weight: normal !important;\n      color: #ffffff; }\n\n.bor-left--none {\n  border-left: none !important; }\n\n.bor-top--1 {\n  border-top: 1px solid #d8d8d8; }\n\n.bor-botrad--ltrt {\n  border-radius: 0px 0px 6px 6px !important; }\n\n.mar-top--none {\n  margin-top: 0 !important; }\n\n.mar-top--7 {\n  margin-top: 7px !important; }\n\n.mar-top--5 {\n  margin-top: 5px !important; }\n\n.mar-bot--none {\n  margin-bottom: 0 !important; }\n\n.mar-right--none {\n  margin-right: 0 !important; }\n\n.mar-tpbt--20 {\n  margin: 20px 0; }\n\n.mar-left--3 {\n  margin-left: 3px !important; }\n\n.txt-aln--right {\n  text-align: right !important; }\n\n.txt-ind--hide {\n  text-indent: -99999em; }\n\n.pad-top--10 {\n  padding-top: 10px !important; }\n\n.pad-top--7 {\n  padding-top: 7px !important; }\n\n.pad-top--8 {\n  padding-top: 8px !important; }\n\n.cur--auto {\n  cursor: default !important; }\n\n.cur--pointer {\n  cursor: pointer !important; }\n\n.scroll {\n  overflow-y: scroll; }\n\n.scroll::-webkit-scrollbar {\n  width: 17.9px; }\n\n.scroll::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 2px #dcdcdc; }\n\n.scroll::-webkit-scrollbar-thumb {\n  -webkit-box-shadow: inset 0 0 2px #dcdcdc;\n  background: #dcdcdc;\n  border: 4px solid transparent;\n  border-radius: 10px;\n  background-clip: content-box; }\n\n.ver-aln--mdl {\n  vertical-align: middle !important; }\n\n.ver-aln--txtop {\n  vertical-align: text-top !important; }\n\n.skiplink {\n  position: absolute;\n  left: -9999em; }\n  .skiplink:focus {\n    left: 0; }\n\n.focus {\n  outline: -webkit-focus-ring-color auto 5px; }\n\n/**** IE 9+ styles*****/\n:root .btn--viewall {\n  padding: 0\\0 !important;\n  margin-top: -2px\\0; }\n\n:root .contactdetails__list--display a .contactdetails__eds-accordion-caret {\n  top: 12px\\0; }\n\n:root .containerMiddle {\n  margin: 0 25px\\0; }\n\n:root eds-card header {\n  margin-bottom: 0\\0;\n  padding-bottom: 0\\0; }\n\n:root .table.tabledata {\n  padding: 0\\0; }\n\n:root .acct-container .containerMiddle > eds-card {\n  padding-bottom: 0\\0; }\n\n:root #accountsActivity eds-tabs :first-child.tab-labels li {\n  margin-top: -2px\\0; }\n\n:root #accountsActivity eds-tabs :first-child.tab-labels li a {\n  padding-top: 0\\0; }\n\n:root #accountsActivity {\n  padding-top: 0\\0; }\n\n:root #promise__actsection eds-tabs :first-child.tab-labels li {\n  margin-top: -2px\\0; }\n\n:root #promise__actsection eds-tabs :first-child.tab-labels li a {\n  padding-top: 0\\0; }\n\n:root #promise__actsection {\n  padding-top: 0\\0; }\n\n:root .promisepay__navtab {\n  margin-top: 20px\\0; }\n\n:root .container {\n  overflow: hidden\\0; }\n\n:root .acct-container {\n  height: 1250px\\0; }\n", ""]);

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
exports.push([module.i, ".mar-tp--0 {\n  margin-top: 0 !important; }\n\n.mar-rt--none {\n  margin-right: 0 !important; }\n\n.wdh-per--10 {\n  width: 10% !important; }\n\n.wdh-per--25 {\n  width: 25% !important; }\n\n.wdh-per--35 {\n  width: 35% !important; }\n\n.wdh-per--100 {\n  width: 100% !important; }\n\n.bor-tp--none {\n  border-top: none !important; }\n\n.bor-tpbt--none {\n  border-top: none !important;\n  border-bottom: none !important; }\n\n.txt-aln--rt {\n  text-align: right; }\n\n.caselist__cont {\n  width: 77%;\n  margin: 0 auto; }\n\n.caselist__heading {\n  font-size: 20px !important;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #000000 !important;\n  line-height: 39px !important; }\n\n.caselist__case {\n  margin: 25px 36px 25px 0;\n  border-radius: 4px;\n  border: solid 1px #cccccc;\n  float: left;\n  width: 18.5em;\n  position: relative; }\n\n.caselist__case:nth-child(3) .caselist__infotime, .caselist__case:nth-child(4) .caselist__infotime {\n  margin-left: 24px; }\n\n.caselist__box {\n  background-color: #f6f6f6;\n  padding: 15px;\n  float: left;\n  width: 100%;\n  position: relative;\n  border-radius: 4px 4px 0 0; }\n\n.caselist__visuallyhidden {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px; }\n\n.caselist__name {\n  font-size: 15px;\n  font-family: \"Roboto-Medium\" !important;\n  font-weight: normal !important;\n  color: #000000; }\n\n.caselist__number {\n  font-size: 14px;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #000000; }\n\n.caselist__link {\n  font-size: 14px;\n  font-family: \"Roboto-Medium\" !important;\n  font-weight: normal !important;\n  color: #006dbd !important;\n  margin-top: 10px;\n  float: left;\n  text-decoration: none; }\n\n.caselist__goicon {\n  margin-left: 5px;\n  width: 9px;\n  height: 14px;\n  float: left;\n  background: url(" + escape(__webpack_require__(/*! ../images/next__icon.png */ "./src/assets/images/next__icon.png")) + ") no-repeat center center transparent;\n  background-size: 100%;\n  float: right; }\n\n.caselist__balance {\n  padding: 5px 0 0; }\n\n.caselist__label {\n  line-height: 1.15;\n  font-size: 13px;\n  font-family: \"Roboto-Bold\" !important;\n  font-weight: normal !important;\n  color: #333333; }\n\n.caselist__value {\n  font-size: 13px;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #333333;\n  float: right; }\n\n.caselist__info {\n  padding: 10px 0 10px 15px;\n  float: left;\n  width: 100%;\n  min-height: 120px; }\n\n.caselist__infoname {\n  font-size: 13px;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #af1685;\n  line-height: 1.15;\n  margin-top: 3px; }\n\n.caselist__infotime {\n  font-size: 12px;\n  font-family: \"Roboto-Medium\" !important;\n  font-weight: normal !important;\n  color: #888888;\n  text-transform: uppercase;\n  margin-top: 5px;\n  float: left; }\n\n.caselist__user {\n  width: 255px;\n  float: right;\n  padding: 7px 0 0;\n  margin-top: 40px;\n  border-top: solid 1px #dcdcdc;\n  font-size: 13px;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #333333;\n  position: absolute;\n  right: 0;\n  bottom: 10px; }\n\n.caselist__profileicon {\n  opacity: 0.3;\n  position: absolute;\n  right: -15px;\n  top: -13px;\n  width: 100px;\n  height: 100px;\n  float: left;\n  background: url(" + escape(__webpack_require__(/*! ../images/profile__icon.png */ "./src/assets/images/profile__icon.png")) + ") no-repeat center center transparent;\n  background-size: 100%; }\n\n.caselist--nobg {\n  border-bottom: solid 1px #dcdcdc;\n  background: #ffffff; }\n\n.caselist__usericon {\n  margin-right: 5px;\n  margin-top: 3px;\n  width: 14px;\n  height: 14px;\n  float: left;\n  background: url(" + escape(__webpack_require__(/*! ../images/user__icon.png */ "./src/assets/images/user__icon.png")) + ") no-repeat center center transparent;\n  background-size: 100%; }\n\n.caselist__fileicon {\n  margin-right: 5px;\n  width: 15px;\n  height: 30px;\n  float: left;\n  background: url(" + escape(__webpack_require__(/*! ../images/file__icon.png */ "./src/assets/images/file__icon.png")) + ") no-repeat center center transparent;\n  background-size: 100%; }\n\n.caselist__diverticon {\n  margin-right: 5px;\n  width: 18px;\n  height: 30px;\n  float: left;\n  background: url(" + escape(__webpack_require__(/*! ../images/divert__icon.png */ "./src/assets/images/divert__icon.png")) + ") no-repeat center center transparent;\n  background-size: 100%; }\n\n.caselist__foldericon {\n  margin-right: 5px;\n  width: 18px;\n  height: 30px;\n  float: left;\n  background: url(" + escape(__webpack_require__(/*! ../images/userfolder_icon.png */ "./src/assets/images/userfolder_icon.png")) + ") no-repeat center center transparent;\n  background-size: 100%; }\n\n.caselist__boldtext {\n  font-size: 13px;\n  font-family: \"Roboto-Bold\" !important;\n  font-weight: normal !important;\n  color: #af1685; }\n\n.caselist__secondline {\n  font-size: 13px;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #af1685;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  width: 88%;\n  float: left; }\n\n.caselist__docicon {\n  float: left;\n  margin-right: 10px;\n  vertical-align: middle;\n  margin-bottom: 10px; }\n\n.casetable {\n  width: 77%;\n  margin: 0 auto;\n  display: none; }\n  .casetable__heading {\n    font-size: 20px !important;\n    font-family: \"Roboto-Regular\" !important;\n    font-weight: normal !important;\n    color: #000000 !important;\n    line-height: 39px !important; }\n  .casetable__tbl {\n    width: 100%;\n    border: solid 1px #cccccc;\n    border-radius: 3px; }\n  .casetable__headtbl {\n    margin: 40px 0 0;\n    border-top: solid 1px #cccccc;\n    border-radius: 5px 5px 0 0;\n    overflow: hidden; }\n  .casetable__tblhead {\n    background: #f6f6f6;\n    font-size: 14px;\n    font-family: \"Roboto-Medium\" !important;\n    font-weight: normal !important;\n    color: #000000; }\n  .casetable__tblhdcol {\n    text-align: left;\n    padding: 7px 10px;\n    border: solid 1px #cccccc; }\n  .casetable__tblbdyrow {\n    font-size: 14px;\n    font-family: \"Roboto-Regular\" !important;\n    font-weight: normal !important;\n    color: #000000; }\n    .casetable__tblbdyrow:nth-child(even) {\n      background: #f6f6f6; }\n  .casetable__tblbdycol {\n    text-align: left;\n    padding: 7px 10px;\n    border-left: solid 1px #cccccc;\n    border-right: solid 1px #cccccc; }\n  .casetable__tblcont {\n    height: 395px;\n    overflow: hidden;\n    border-bottom: solid 1px #cccccc;\n    border-radius: 0 0 5px 5px; }\n  .casetable__tblsorticon {\n    position: relative;\n    margin-left: 3px; }\n    .casetable__tblsorticon:after {\n      position: absolute;\n      content: \"\";\n      border-top: solid 5px #cccccc;\n      border-left: solid 4px transparent;\n      border-right: solid 4px transparent;\n      top: 9px; }\n    .casetable__tblsorticon:before {\n      position: absolute;\n      content: \"\";\n      border-bottom: solid 5px #cccccc;\n      border-left: solid 4px transparent;\n      border-right: solid 4px transparent;\n      top: 2px; }\n  .casetable__pagination {\n    margin: 10px 0;\n    font-size: 14px; }\n  .casetable__pagecont {\n    margin: 10px 30px 10px 0;\n    float: left; }\n  .casetable__pagelist {\n    float: left;\n    margin: 0 5px 5px; }\n  .casetable__pagelink {\n    text-decoration: none;\n    color: #426da9;\n    padding: 0 5px 5px; }\n  .casetable__rowscont {\n    float: left; }\n  .casetable__rowslabel {\n    margin: 10px 10px 10px 0;\n    float: left; }\n  .casetable__totalpage {\n    float: left;\n    margin: 10px 0 10px 30px; }\n  .casetable__rowselect {\n    float: left;\n    margin: 4px 0 10px 0;\n    padding: 7px 15px;\n    border-radius: 5px;\n    position: relative; }\n    .casetable__rowselect option {\n      padding: 10px; }\n  .casetable--pagelinkactive {\n    color: #000000 !important;\n    border-bottom: solid 2px #000000; }\n\n.icon--previous {\n  position: relative;\n  width: 10px;\n  height: 10px;\n  float: left;\n  margin-top: 3px; }\n  .icon--previous:before {\n    border-right: solid 7px #cccccc;\n    border-top: solid 7px transparent;\n    border-bottom: solid 7px transparent;\n    content: \"\";\n    position: absolute;\n    left: 0;\n    top: 0; }\n  .icon--previous:after {\n    border-right: solid 7px #ffffff;\n    border-top: solid 7px transparent;\n    border-bottom: solid 7px transparent;\n    content: \"\";\n    position: absolute;\n    left: 2px;\n    top: 0; }\n\n.icon--next {\n  position: relative;\n  width: 10px;\n  height: 10px;\n  float: left;\n  margin-top: 3px; }\n  .icon--next:before {\n    border-left: solid 7px #426da9;\n    border-top: solid 7px transparent;\n    border-bottom: solid 7px transparent;\n    content: \"\";\n    position: absolute;\n    right: 0;\n    top: 0; }\n  .icon--next:after {\n    border-left: solid 7px #ffffff;\n    border-top: solid 7px transparent;\n    border-bottom: solid 7px transparent;\n    content: \"\";\n    position: absolute;\n    right: 2px;\n    top: 0; }\n\n.cur--pointer {\n  cursor: pointer; }\n", ""]);

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
exports.push([module.i, ".mar-tp--0 {\n  margin-top: 0 !important; }\n\n.mar-rt--none {\n  margin-right: 0 !important; }\n\n.wdh-per--10 {\n  width: 10% !important; }\n\n.wdh-per--25 {\n  width: 25% !important; }\n\n.wdh-per--35 {\n  width: 35% !important; }\n\n.wdh-per--100 {\n  width: 100% !important; }\n\n.bor-tp--none {\n  border-top: none !important; }\n\n.bor-tpbt--none {\n  border-top: none !important;\n  border-bottom: none !important; }\n\n.txt-aln--rt {\n  text-align: right; }\n\n.font-wt500 {\n  font-weight: 500; }\n\n.font-wtnormal {\n  font-family: Roboto !important;\n  font-weight: normal !important; }\n\n.pos-rel {\n  position: relative; }\n\n.text-Cap {\n  text-transform: capitalize; }\n\n.v-align-top {\n  vertical-align: top; }\n\n.marginBtm20 {\n  margin-bottom: 20px !important; }\n\n.marginBtm30 {\n  margin-bottom: 30px !important; }\n\n.marginBtm46 {\n  margin-bottom: 46px !important; }\n\n.marginTop20 {\n  margin-top: 20px !important; }\n\n.marginLft36 {\n  margin-left: 36px !important; }\n\n.containerSide {\n  padding: 10px;\n  height: 870px;\n  width: 300px; }\n  .containerSide.left {\n    width: 330px;\n    padding: 10px 0; }\n  .containerSide:last-child {\n    background-color: #f6f6f6;\n    padding: 10px 0; }\n  .containerSide:first-child {\n    padding-top: 15px; }\n\n.containerMiddle {\n  padding: 10px;\n  height: 870px;\n  padding-top: 15px;\n  flex: 0.95;\n  vertical-align: top; }\n  .containerMiddle eds-card header {\n    border-bottom: 0; }\n  .containerMiddle eds-dropdown {\n    margin-top: 20px; }\n\n.containerFlex {\n  display: flex;\n  justify-content: space-between;\n  height: 1000px; }\n\neds-accordion:first-child {\n  margin-top: 0; }\n\neds-card:first-child {\n  margin-top: 0; }\n\neds-card header h4 {\n  font-weight: 500 !important; }\n\neds-card header div:first-child {\n  display: inline-block; }\n\neds-card header div:last-child {\n  float: right;\n  display: inline-block; }\n\neds-card main {\n  margin: -20px !important;\n  margin-bottom: -15px !important; }\n\neds-dropdown {\n  min-width: 130px; }\n\n.greyHeading button, .greyHeading h5 {\n  margin: 0 !important;\n  padding-left: 20px !important;\n  background-color: whitesmoke !important;\n  text-transform: uppercase;\n  color: #6d2077; }\n\n.table {\n  padding: 10px 0;\n  display: block;\n  width: 100%; }\n  .table .row {\n    padding: 3px 20px; }\n\n.even-style .row:nth-child(even) {\n  background: #f6f6f6; }\n\n.row {\n  display: block;\n  width: 100%; }\n  .row > .cell {\n    vertical-align: top; }\n\n.cell {\n  display: inline-block;\n  width: 49%;\n  font-size: 13px; }\n  .cell:first-child {\n    text-align: left;\n    font-weight: 500; }\n  .cell:last-child {\n    text-align: right; }\n\n.table.middle .cell {\n  display: inline-block;\n  width: 49%;\n  font-size: 14px;\n  display: inline-block;\n  width: 22%;\n  padding: 5px; }\n  .table.middle .cell:first-child {\n    text-align: left;\n    font-weight: 500; }\n  .table.middle .cell:last-child {\n    text-align: left; }\n\n.table.middle .row {\n  width: 100%; }\n\neds-accordion-panel[aria-expanded=\"false\"] .table {\n  display: none !important; }\n\neds-icon.round-border {\n  background-color: #0e6eb7;\n  border-radius: 50%;\n  text-align: center;\n  width: 21px;\n  height: 21px;\n  vertical-align: text-bottom; }\n  eds-icon.round-border i {\n    font-size: 13px;\n    padding-top: 3px; }\n\nbutton.eds-accordion-label, h5.eds-accordion-label {\n  height: auto !important; }\n\neds-option {\n  display: none; }\n\n.acct-container .table.middle .cell:nth-child(2) {\n  width: 15%; }\n\n.evenHighlight .row:nth-child(even) {\n  background: #f6f6f6; }\n\n.oddHighlight .row:nth-child(odd) {\n  background: #f6f6f6; }\n\n[slot=\"slot-header-center\"] {\n  border-bottom: 1px solid #d8d8d8;\n  padding-bottom: 8px; }\n\n.form-switch {\n  display: inline-block;\n  cursor: pointer;\n  -webkit-tap-highlight-color: transparent; }\n\n.form-switch i {\n  position: relative;\n  display: inline-block;\n  margin-right: .5rem;\n  width: 46px;\n  height: 26px;\n  background-color: #888888;\n  border-radius: 23px;\n  vertical-align: text-bottom;\n  transition: all 0.3s linear;\n  top: 5px;\n  margin-left: 5px; }\n\n.form-switch i::before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  width: 42px;\n  height: 22px;\n  background-color: #f6f6f6;\n  border-radius: 11px;\n  transform: translate3d(2px, 2px, 0) scale3d(1, 1, 1);\n  transition: all 0.25s linear; }\n\n.form-switch i::after {\n  content: \"\";\n  position: absolute;\n  left: 2px;\n  width: 16px;\n  height: 16px;\n  background-color: #888888;\n  border-radius: 11px;\n  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.24);\n  transform: translate3d(2px, 2px, 0);\n  transition: all 0.2s ease-in-out;\n  top: 3px; }\n\n.form-switch:active i::after {\n  width: 28px;\n  transform: translate3d(2px, 2px, 0); }\n\n.form-switch:active input:checked + i::after {\n  transform: translate3d(16px, 2px, 0); }\n\n.form-switch input {\n  display: none; }\n\n.form-switch input:checked + i {\n  background-color: #4BD763; }\n\n.form-switch input:checked + i::before {\n  transform: translate3d(18px, 2px, 0) scale3d(0, 0, 0); }\n\n.form-switch input:checked + i::after {\n  transform: translate3d(22px, 2px, 0); }\n\n.sort-filter {\n  background: #d2e8f9;\n  display: flex;\n  align-items: baseline;\n  flex: 5;\n  padding: 5px 15px; }\n  .sort-filter eds-dropdown {\n    margin: 0; }\n  .sort-filter label {\n    vertical-align: super;\n    font-size: 14px;\n    font-weight: 500; }\n  .sort-filter > div {\n    flex: 1; }\n  .sort-filter > div:first-child {\n    text-align: right;\n    margin-right: 10px; }\n  .sort-filter > div:last-child {\n    text-align: right; }\n\n.acct-container .sort-filter eds-dropdown {\n  min-width: 150px; }\n\n.contact-details-card .table {\n  padding: 0; }\n  .contact-details-card .table .row:first-child .cell:last-child {\n    width: 43%; }\n  .contact-details-card .table .row {\n    border-bottom: 1px solid #d8d8d8;\n    padding: 10px 20px; }\n    .contact-details-card .table .row .cell:first-child {\n      width: 34%; }\n    .contact-details-card .table .row .cell:last-child {\n      width: 63%; }\n  .contact-details-card .table .row .cell {\n    text-align: left; }\n\n.table table {\n  width: 100%; }\n  .table table .row {\n    padding: 3px 12px;\n    margin-bottom: 3px; }\n    .table table .row .cell {\n      padding: 0; }\n\n.table.tabledata {\n  padding: 10px 19px; }\n", ""]);

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
exports.push([module.i, ".mar-tp--0 {\n  margin-top: 0 !important; }\n\n.mar-rt--none {\n  margin-right: 0 !important; }\n\n.wdh-per--10 {\n  width: 10% !important; }\n\n.wdh-per--25 {\n  width: 25% !important; }\n\n.wdh-per--35 {\n  width: 35% !important; }\n\n.wdh-per--100 {\n  width: 100% !important; }\n\n.bor-tp--none {\n  border-top: none !important; }\n\n.bor-tpbt--none {\n  border-top: none !important;\n  border-bottom: none !important; }\n\n.txt-aln--rt {\n  text-align: right; }\n\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\neds-card {\n  display: block;\n  padding: 20px;\n  margin: 20px 0;\n  border: 1px solid #d8d8d8;\n  border-radius: 6px;\n  background-color: #ffffff; }\n  eds-card > h1 {\n    margin-top: 0; }\n  eds-card > h2 {\n    margin-top: 0; }\n  eds-card > h3 {\n    margin-top: 0; }\n  eds-card > h4 {\n    margin-top: 0; }\n  eds-card > h5 {\n    margin-top: 0; }\n  eds-card > h6 {\n    margin-top: 0; }\n  eds-card p {\n    margin-top: 0; }\n    eds-card p:last-child {\n      margin-bottom: 0; }\n  eds-card header {\n    margin: -20px -20px 20px;\n    padding: 12px 20px;\n    border-bottom: 1px solid #d8d8d8; }\n    eds-card header > h1 {\n      margin: 0; }\n    eds-card header > h2 {\n      margin: 0; }\n    eds-card header > h3 {\n      margin: 0; }\n    eds-card header > h4 {\n      margin: 0; }\n    eds-card header > h5 {\n      margin: 0; }\n    eds-card header > h6 {\n      margin: 0; }\n    eds-card header p {\n      margin: 0; }\n  eds-card header.flush {\n    padding: 0; }\n    eds-card header.flush eds-toolbar {\n      border-bottom: 0; }\n  eds-card main {\n    line-height: 1.4rem; }\n  eds-card footer {\n    margin: 20px -20px -20px;\n    padding: 15px 20px;\n    border-top: 1px solid #d8d8d8; }\n    eds-card footer p:last-child {\n      margin: 0; }\n  eds-card footer.flush {\n    padding: 0; }\n    eds-card footer.flush eds-toolbar {\n      border-bottom: 0; }\n\neds-card[background='gray'] {\n  background-color: #f6f6f6; }\n", ""]);

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
exports.push([module.i, ".mar-tp--0 {\n  margin-top: 0 !important; }\n\n.mar-rt--none {\n  margin-right: 0 !important; }\n\n.wdh-per--10 {\n  width: 10% !important; }\n\n.wdh-per--25 {\n  width: 25% !important; }\n\n.wdh-per--35 {\n  width: 35% !important; }\n\n.wdh-per--100 {\n  width: 100% !important; }\n\n.bor-tp--none {\n  border-top: none !important; }\n\n.bor-tpbt--none {\n  border-top: none !important;\n  border-bottom: none !important; }\n\n.txt-aln--rt {\n  text-align: right; }\n\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\neds-dropdown {\n  position: relative;\n  display: inline-block;\n  text-align: left;\n  vertical-align: bottom; }\n  eds-dropdown .slotted {\n    display: none; }\n  eds-dropdown > label {\n    display: none;\n    font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 16px;\n    font-weight: 400;\n    color: #333333;\n    font-size: 0.88rem;\n    font-weight: 500;\n    line-height: 1rem;\n    margin-bottom: 10px; }\n  eds-dropdown > label.show {\n    display: block; }\n  eds-dropdown .eds-dropdown-trigger {\n    position: relative;\n    display: block;\n    background-color: #ffffff;\n    width: 100%;\n    box-sizing: border-box;\n    font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 16px;\n    font-weight: 400;\n    color: #333333;\n    text-rendering: optimizeLegibility;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    padding: 5px 10px;\n    line-height: 1.4rem;\n    min-height: 34px;\n    border: 1px solid #939393;\n    border-radius: 4px;\n    transition: border-color 0.15s ease;\n    outline: none; }\n    eds-dropdown .eds-dropdown-trigger .eds-dropdown-placeholder {\n      display: none;\n      color: #b9b9b9;\n      font-weight: 400; }\n    eds-dropdown .eds-dropdown-trigger .eds-dropdown-placeholder.show {\n      display: block; }\n    eds-dropdown .eds-dropdown-trigger .eds-dropdown-arrow {\n      position: absolute;\n      bottom: 14px;\n      right: 10px;\n      display: inline-block;\n      width: 0;\n      height: 0;\n      border-left: 5px solid transparent;\n      border-right: 5px solid transparent;\n      border-top: 5px solid #426da9; }\n    eds-dropdown .eds-dropdown-trigger::after {\n      content: '';\n      position: absolute;\n      top: -2px;\n      left: -2px;\n      right: -2px;\n      bottom: -2px;\n      border-radius: 4px;\n      border: 2px solid #426da9;\n      opacity: 0;\n      transition: opacity 0.15s ease; }\n    eds-dropdown .eds-dropdown-trigger:focus {\n      outline: -webkit-focus-ring-color auto 5px; }\n      eds-dropdown .eds-dropdown-trigger:focus::after {\n        opacity: 1;\n        transition: opacity 0.15s ease; }\n  eds-dropdown .eds-dropdown-trigger.focus::after {\n    opacity: 1;\n    transition: opacity 0.15s ease; }\n  eds-dropdown .eds-dropdown-options {\n    display: none;\n    opacity: 0;\n    position: absolute;\n    z-index: 1000;\n    top: calc(100% + 8px);\n    width: 100%;\n    background-color: #ffffff;\n    border-radius: 4px;\n    border: 1px solid transparent;\n    border: 1px solid #d8d8d8;\n    background-clip: border-box;\n    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);\n    background-clip: padding-box;\n    font-weight: 400;\n    transition: border-color 0.15s ease, opacity 0.15s ease; }\n    eds-dropdown .eds-dropdown-options .eds-dropdown-searchbox {\n      display: none;\n      position: relative;\n      border-bottom: 1px solid #d8d8d8;\n      padding: 5px; }\n      eds-dropdown .eds-dropdown-options .eds-dropdown-searchbox::after {\n        content: '';\n        position: absolute;\n        top: 5px;\n        left: 5px;\n        right: 5px;\n        bottom: 5px;\n        border-radius: 4px;\n        border: 2px solid #426da9;\n        opacity: 0;\n        transition: opacity 0.15s ease; }\n      eds-dropdown .eds-dropdown-options .eds-dropdown-searchbox:focus::after {\n        opacity: 1;\n        transition: opacity 0.15s ease; }\n      eds-dropdown .eds-dropdown-options .eds-dropdown-searchbox .eds-search-icon {\n        position: absolute;\n        top: 10px;\n        right: 12px;\n        width: 20px;\n        height: 20px; }\n        eds-dropdown .eds-dropdown-options .eds-dropdown-searchbox .eds-search-icon svg {\n          fill: #426da9;\n          width: 20px; }\n      eds-dropdown .eds-dropdown-options .eds-dropdown-searchbox input {\n        outline: none;\n        display: block;\n        width: 100%;\n        padding: 5px 10px;\n        border: none;\n        line-height: 1.4rem;\n        font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n        font-size: 16px;\n        font-weight: 400;\n        color: #333333;\n        box-sizing: border-box; }\n    eds-dropdown .eds-dropdown-options .eds-dropdown-searchbox.focus::after {\n      opacity: 1;\n      transition: opacity 0.15s ease; }\n    eds-dropdown .eds-dropdown-options .eds-dropdown-searchbox.show {\n      display: block; }\n    eds-dropdown .eds-dropdown-options ul {\n      padding: 5px 0;\n      margin: 2px 0 0;\n      list-style: none;\n      max-height: 280px;\n      overflow: auto; }\n      eds-dropdown .eds-dropdown-options ul li {\n        margin: 0;\n        padding: 10px 20px;\n        white-space: nowrap;\n        cursor: pointer;\n        min-height: 40px;\n        box-sizing: border-box;\n        position: relative;\n        outline: none; }\n        eds-dropdown .eds-dropdown-options ul li::after {\n          content: '';\n          position: absolute;\n          top: 0px;\n          left: 0px;\n          right: 0px;\n          bottom: 0px;\n          border-radius: 0;\n          border: 2px solid #426da9;\n          opacity: 0;\n          transition: opacity 0.15s ease; }\n        eds-dropdown .eds-dropdown-options ul li:focus::after {\n          opacity: 1;\n          transition: opacity 0.15s ease; }\n        eds-dropdown .eds-dropdown-options ul li:hover {\n          background-color: #426da9;\n          color: #ffffff; }\n        eds-dropdown .eds-dropdown-options ul li eds-checkbox {\n          position: absolute;\n          top: 12px;\n          left: 20px; }\n      eds-dropdown .eds-dropdown-options ul li.focus::after {\n        opacity: 1;\n        transition: opacity 0.15s ease; }\n      eds-dropdown .eds-dropdown-options ul li.eds-checkbox-option {\n        padding-left: 48px; }\n\neds-dropdown.eds-dropdown-open .eds-dropdown-options {\n  display: block;\n  opacity: 1; }\n\neds-dropdown[disabled] {\n  cursor: not-allowed; }\n  eds-dropdown[disabled] .eds-dropdown-trigger {\n    border-color: #cccccc;\n    color: #888888; }\n    eds-dropdown[disabled] .eds-dropdown-trigger:focus {\n      border-color: #cccccc;\n      color: #888888; }\n      eds-dropdown[disabled] .eds-dropdown-trigger:focus::after {\n        opacity: 0; }\n      eds-dropdown[disabled] .eds-dropdown-trigger:focus .eds-dropdown-arrow {\n        border-top-color: #cccccc; }\n    eds-dropdown[disabled] .eds-dropdown-trigger::after {\n      opacity: 0; }\n    eds-dropdown[disabled] .eds-dropdown-trigger .eds-dropdown-arrow {\n      border-top-color: #cccccc; }\n\n.acct-container eds-dropdown {\n  min-width: 181px; }\n", ""]);

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
exports.push([module.i, ".mar-tp--0 {\n  margin-top: 0 !important; }\n\n.mar-rt--none {\n  margin-right: 0 !important; }\n\n.wdh-per--10 {\n  width: 10% !important; }\n\n.wdh-per--25 {\n  width: 25% !important; }\n\n.wdh-per--35 {\n  width: 35% !important; }\n\n.wdh-per--100 {\n  width: 100% !important; }\n\n.bor-tp--none {\n  border-top: none !important; }\n\n.bor-tpbt--none {\n  border-top: none !important;\n  border-bottom: none !important; }\n\n.txt-aln--rt {\n  text-align: right; }\n\nbody.eds {\n  display: none;\n  font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 16px;\n  font-weight: 400;\n  color: #333333; }\n  body.eds * {\n    box-sizing: border-box; }\n    body.eds *::before {\n      box-sizing: border-box; }\n    body.eds *::after {\n      box-sizing: border-box; }\n\nbody.eds.eds-show-body {\n  display: block; }\n\n.eds {\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  line-height: 1.4em; }\n  .eds a {\n    color: #426da9; }\n    .eds a:hover {\n      color: #163c6f; }\n  .eds h1 {\n    color: #333333;\n    font-weight: 300;\n    line-height: 1.4em;\n    font-size: 30px; }\n  .eds h2 {\n    color: #333333;\n    font-weight: 300;\n    line-height: 1.4em;\n    font-size: 24px; }\n  .eds h3 {\n    color: #333333;\n    font-weight: bold;\n    font-size: 18px; }\n  .eds h4 {\n    color: #333333;\n    font-weight: bold;\n    font-size: 16px; }\n  .eds h5 {\n    color: #333333;\n    font-weight: bold; }\n  .eds h1[caps] {\n    text-transform: uppercase;\n    color: #6d2077;\n    font-weight: 400;\n    font-size: 28px; }\n  .eds h2[caps] {\n    text-transform: uppercase;\n    color: #6d2077;\n    font-weight: 400;\n    font-size: 22px; }\n  .eds h3[caps] {\n    text-transform: uppercase;\n    color: #6d2077;\n    font-weight: 400;\n    font-size: 16px; }\n  .eds h4[caps] {\n    text-transform: uppercase;\n    color: #6d2077;\n    font-weight: 400;\n    font-size: 14px; }\n  .eds h5[caps] {\n    text-transform: uppercase;\n    color: #6d2077;\n    font-weight: 400;\n    font-size: 12px; }\n  .eds hr {\n    border: none;\n    border-top: 1px solid #d8d8d8;\n    height: 1px; }\n  .eds .sr-only {\n    position: absolute;\n    width: 1px;\n    height: 1px;\n    padding: 0;\n    overflow: hidden;\n    clip: rect(0, 0, 0, 0);\n    white-space: nowrap;\n    border: 0; }\n\n[background='gray'] {\n  background-color: #f6f6f6; }\n\n.no-scroll {\n  overflow: hidden; }\n\neds-icon[spin] {\n  animation: eds-spin 2s infinite linear; }\n\neds-icon {\n  display: inline-block;\n  line-height: 0 !important;\n  margin: 0 6px 0 0;\n  vertical-align: text-bottom; }\n  eds-icon .material-icons {\n    font-size: inherit; }\n  eds-icon > * {\n    font-size: inherit; }\n\neds-icon.s18 > * {\n  font-size: 18px;\n  vertical-align: bottom; }\n\neds-icon.s24 > * {\n  font-size: 24px;\n  vertical-align: bottom; }\n\neds-icon.s36 > * {\n  font-size: 36px;\n  vertical-align: bottom; }\n\neds-icon.s48 > * {\n  font-size: 48px;\n  vertical-align: bottom; }\n\neds-icon.s60 > * {\n  font-size: 60px;\n  vertical-align: bottom; }\n\neds-icon[border] {\n  padding: 0.8rem;\n  border: 4px solid #d8d8d8;\n  border-radius: 3px; }\n\n.header-container {\n  height: 50px;\n  background: #e6e6e6;\n  display: flex;\n  align-items: center;\n  position: relative; }\n  .header-container .icon-container {\n    background-color: #f6f6f6;\n    line-height: 0; }\n    .header-container .icon-container .home-icon {\n      background-color: transparent;\n      padding: 17px 23px;\n      margin: 0;\n      color: #426da9;\n      cursor: pointer; }\n      .header-container .icon-container .home-icon:hover {\n        color: #1d4f91; }\n    .header-container .icon-container .home-icon.selected {\n      background-color: #ffffff;\n      color: #333333; }\n  .header-container .tabs-container {\n    display: flex;\n    flex-wrap: wrap;\n    max-width: 100%;\n    max-height: 100%;\n    overflow: hidden; }\n\npcc-eds-secondary-header-tab {\n  background-color: #f6f6f6;\n  border-left: 1px solid #cccccc;\n  display: flex;\n  align-content: space-between;\n  align-items: center;\n  width: 380px;\n  height: 50px; }\n  pcc-eds-secondary-header-tab:last-child {\n    border-right: 1px solid #cccccc; }\n  pcc-eds-secondary-header-tab .info-container {\n    height: 100%;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    color: #426da9; }\n    pcc-eds-secondary-header-tab .info-container eds-icon {\n      margin: 0; }\n    pcc-eds-secondary-header-tab .info-container [icon='person'] {\n      padding: 0 10px 0 20px; }\n    pcc-eds-secondary-header-tab .info-container .person-name {\n      min-width: 172px;\n      font-size: 12px;\n      font-weight: bold;\n      max-height: 100%;\n      line-height: 1.4; }\n  pcc-eds-secondary-header-tab .tab-controls {\n    display: flex;\n    height: 100%;\n    align-items: center; }\n    pcc-eds-secondary-header-tab .tab-controls .close-button {\n      margin: 0 10px 0 5px;\n      padding: 8px;\n      cursor: default;\n      color: #426da9; }\n\npcc-eds-secondary-header-tab[active] {\n  background-color: #ffffff; }\n  pcc-eds-secondary-header-tab[active] .info-container {\n    color: #333333; }\n\n@keyframes \"eds-spin\" {\n  from {\n    transform: rotate(0deg); }\n  to {\n    transform: rotate(360deg); } }\n", ""]);

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
exports.push([module.i, "/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n.mar-tp--0 {\n  margin-top: 0 !important; }\n\n.mar-rt--none {\n  margin-right: 0 !important; }\n\n.wdh-per--10 {\n  width: 10% !important; }\n\n.wdh-per--25 {\n  width: 25% !important; }\n\n.wdh-per--35 {\n  width: 35% !important; }\n\n.wdh-per--100 {\n  width: 100% !important; }\n\n.bor-tp--none {\n  border-top: none !important; }\n\n.bor-tpbt--none {\n  border-top: none !important;\n  border-bottom: none !important; }\n\n.txt-aln--rt {\n  text-align: right; }\n\neds-icon[spin] {\n  animation: eds-spin 2s infinite linear; }\n\neds-icon {\n  display: inline-block;\n  line-height: 0 !important;\n  margin: 0 6px 0 0;\n  vertical-align: text-bottom; }\n  eds-icon .material-icons {\n    font-size: inherit; }\n  eds-icon > * {\n    font-size: inherit; }\n\neds-icon.s12 > * {\n  font-size: 12px;\n  vertical-align: bottom; }\n\neds-icon.s16 > * {\n  font-size: 16px;\n  vertical-align: bottom; }\n\neds-icon.s18 > * {\n  font-size: 18px;\n  vertical-align: bottom; }\n\neds-icon.s24 > * {\n  font-size: 24px;\n  vertical-align: bottom; }\n\neds-icon.s36 > * {\n  font-size: 36px;\n  vertical-align: bottom; }\n\neds-icon.s48 > * {\n  font-size: 48px;\n  vertical-align: bottom; }\n\neds-icon.s60 > * {\n  font-size: 60px;\n  vertical-align: bottom; }\n\neds-icon[border] {\n  padding: 0.8rem;\n  border: 4px solid #d8d8d8;\n  border-radius: 3px; }\n\n.phone-icon {\n  width: 32px;\n  height: 34px;\n  background: #426da9;\n  text-align: center;\n  border-radius: 3px;\n  margin-left: 10px;\n  position: relative; }\n  .phone-icon svg {\n    fill: #ffffff;\n    position: absolute;\n    top: 7px;\n    left: 7px; }\n\n.timer-icon {\n  margin-right: 11.3px; }\n  .timer-icon svg {\n    vertical-align: text-top;\n    fill: #dcdcdc; }\n\n.eds-icon.time {\n  font-size: 12px; }\n\n.pcc-eds-timeline-view .section-icon .icon-circle {\n  padding-top: 3px; }\n\n.pcc-eds-timeline-view.user-call-flow .section-icon .icon-circle {\n  padding-top: 0px; }\n\n@keyframes \"eds-spin\" {\n  from {\n    transform: rotate(0deg); }\n  to {\n    transform: rotate(360deg); } }\n", ""]);

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
exports.push([module.i, ".mar-tp--0 {\n  margin-top: 0 !important; }\n\n.mar-rt--none {\n  margin-right: 0 !important; }\n\n.wdh-per--10 {\n  width: 10% !important; }\n\n.wdh-per--25 {\n  width: 25% !important; }\n\n.wdh-per--35 {\n  width: 35% !important; }\n\n.wdh-per--100 {\n  width: 100% !important; }\n\n.bor-tp--none {\n  border-top: none !important; }\n\n.bor-tpbt--none {\n  border-top: none !important;\n  border-bottom: none !important; }\n\n.txt-aln--rt {\n  text-align: right; }\n\neds-tag {\n  display: inline-block;\n  padding: 4px 10px;\n  font-size: 14px;\n  border-radius: 12px;\n  margin-left: 2px;\n  line-height: 1 !important; }\n  eds-tag:not([motif]) {\n    background: #e6e6e6;\n    color: #333333; }\n\neds-tag[motif=\"default\"] {\n  background: #e6e6e6;\n  color: #333333; }\n\neds-tag[motif='error'] {\n  background: #ffdce2;\n  color: #e4002b; }\n\neds-tag[motif='warning'] {\n  background: #fceeba;\n  color: #b35900; }\n\neds-tag[motif='success'] {\n  background: #cdf4d2;\n  color: #007A3B;\n  font-weight: normal;\n  text-transform: capitalize; }\n", ""]);

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
exports.push([module.i, ".mar-tp--0 {\n  margin-top: 0 !important; }\n\n.mar-rt--none {\n  margin-right: 0 !important; }\n\n.wdh-per--10 {\n  width: 10% !important; }\n\n.wdh-per--25 {\n  width: 25% !important; }\n\n.wdh-per--35 {\n  width: 35% !important; }\n\n.wdh-per--100 {\n  width: 100% !important; }\n\n.bor-tp--none {\n  border-top: none !important; }\n\n.bor-tpbt--none {\n  border-top: none !important;\n  border-bottom: none !important; }\n\n.txt-aln--rt {\n  text-align: right; }\n\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\n/*\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\n * Components may implement these and pass-through to a local variable name.\n */\npcc-eds-timeline-item {\n  font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 12px;\n  font-weight: 400;\n  color: #333333; }\n  pcc-eds-timeline-item .flex-container {\n    display: flex; }\n  pcc-eds-timeline-item .section-left {\n    flex: 1; }\n  pcc-eds-timeline-item .section-icon {\n    border-left: 1px solid #d8d8d8;\n    margin-left: 53px;\n    min-height: 71px;\n    padding-right: 30px;\n    text-align: center; }\n    pcc-eds-timeline-item .section-icon .icon-circle {\n      background-color: #af1685;\n      border-radius: 50%;\n      color: #ffffff;\n      height: 40px;\n      line-height: 42px;\n      margin-left: -20px;\n      padding-left: 5px;\n      width: 40px; }\n  pcc-eds-timeline-item .section-main {\n    flex: 5;\n    padding-bottom: 10px;\n    padding-top: 10px; }\n    pcc-eds-timeline-item .section-main .placeholder-center {\n      flex: 2; }\n    pcc-eds-timeline-item .section-main .placeholder-right {\n      flex: 1; }\n  pcc-eds-timeline-item [slot=\"slot-header-center\"] {\n    display: flex;\n    flex: 5; }\n    pcc-eds-timeline-item [slot=\"slot-header-center\"] [slot=\"slot-header-left\"] {\n      flex: 4; }\n    pcc-eds-timeline-item [slot=\"slot-header-center\"] [slot=\"slot-header-right\"] {\n      flex: 1;\n      font-size: 14px;\n      text-align: right; }\n\npcc-eds-timeline-item:last-child .section-icon {\n  border-left: 0; }\n\n.pcc-eds-timeline-view {\n  padding: 0 50px 0 0; }\n", ""]);

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
exports.push([module.i, ".mar-tp--0 {\n  margin-top: 0 !important; }\n\n.mar-rt--none {\n  margin-right: 0 !important; }\n\n.wdh-per--10 {\n  width: 10% !important; }\n\n.wdh-per--25 {\n  width: 25% !important; }\n\n.wdh-per--35 {\n  width: 35% !important; }\n\n.wdh-per--100 {\n  width: 100% !important; }\n\n.bor-tp--none {\n  border-top: none !important; }\n\n.bor-tpbt--none {\n  border-top: none !important;\n  border-bottom: none !important; }\n\n.txt-aln--rt {\n  text-align: right; }\n\n.header {\n  padding: 10px 0 0 0;\n  float: left;\n  width: 100%; }\n  .header__logo {\n    width: 117px;\n    height: 55px;\n    margin: 0 0 0 15px;\n    padding-right: 20px;\n    float: left; }\n  .header__logolink {\n    text-indent: -99999em;\n    width: 100%;\n    height: 100%;\n    float: left;\n    background: url(" + escape(__webpack_require__(/*! ../images/experian__logolatest.png */ "./src/assets/images/experian__logolatest.png")) + ") no-repeat center center transparent;\n    background-size: 100%; }\n  .header__dwplogo {\n    width: 94px;\n    height: 49px;\n    margin: 0 20px 0 15px;\n    padding-right: 20px;\n    float: left;\n    border-left: solid 1px #cccccc;\n    border-right: solid 1px #cccccc;\n    padding-left: 20px;\n    padding-top: 3px;\n    padding-bottom: 3px; }\n  .header__dwplogolink {\n    text-indent: -99999em;\n    width: 100%;\n    height: 100%;\n    float: left;\n    background: url(" + escape(__webpack_require__(/*! ../images/dwp-logo-transparent.png */ "./src/assets/images/dwp-logo-transparent.png")) + ") no-repeat center center transparent;\n    background-size: 100%; }\n  .header__logodesc {\n    font-size: 16px;\n    font-family: \"Roboto-Regular\" !important;\n    font-weight: normal !important;\n    color: #333333;\n    text-decoration: none;\n    padding: 3px 0 3px 15px;\n    float: left;\n    margin-top: 15px;\n    border-left: solid 1px #cccccc; }\n  .header__divider {\n    width: 1px;\n    height: 55px;\n    float: left;\n    background: #cccccc; }\n  .header__nav {\n    float: right; }\n  .header__listcont {\n    padding: 0;\n    margin: 0; }\n  .header__list {\n    float: left;\n    padding: 15px; }\n  .header__link {\n    float: left;\n    font-size: 16px;\n    font-family: \"Roboto-Medium\" !important;\n    font-weight: normal !important;\n    color: #426da9;\n    text-decoration: none;\n    position: relative; }\n  .header__iconimages {\n    vertical-align: text-top; }\n  .header__counter {\n    position: absolute;\n    background: #e20000;\n    width: 21px;\n    height: 21px;\n    border-radius: 50%;\n    top: -7px;\n    right: -7px;\n    text-align: center;\n    font-size: 13px;\n    font-family: \"Roboto-Medium\" !important;\n    font-weight: normal !important;\n    color: #ffffff; }\n  .header--userprofile {\n    border: solid 2px #426da9;\n    border-radius: 50%;\n    padding: 1px 5px;\n    font-size: 12px; }\n  .header__hrline {\n    height: 2px !important;\n    -webkit-box-sizing: border-box !important;\n    -moz-box-sizing: border-box !important;\n    box-sizing: border-box !important;\n    background-position: 0 0, 0 100% !important;\n    background-repeat: no-repeat !important;\n    -webkit-background-size: 100% 4px !important;\n    -moz-background-size: 100% 4px !important;\n    background-size: 100% 4px !important;\n    background-image: -webkit-linear-gradient(left, #ba2f7d 0%, #26478d 100%), -webkit-linear-gradient(left, #ba2f7d 0%, #26478d 100%) !important;\n    background-image: -moz-linear-gradient(left, #ba2f7d 0%, #26478d 100%), -moz-linear-gradient(left, #ba2f7d 0%, #26478d 100%) !important;\n    background-image: -o-linear-gradient(left, #ba2f7d 0%, #26478d 100%), -o-linear-gradient(left, #ba2f7d 0%, #26478d 100%) !important;\n    background-image: linear-gradient(to right, #ba2f7d 0%, #26478d 100%), linear-gradient(to right, #ba2f7d 0%, #26478d 100%) !important;\n    margin: 0;\n    float: left;\n    width: 100%; }\n  .header__whitecircle {\n    top: -9px;\n    position: absolute;\n    width: 25px;\n    height: 25px;\n    background: #ffffff;\n    content: \"\";\n    border-radius: 50%;\n    right: -9px;\n    z-index: 0; }\n\n.scndryheader {\n  clear: both;\n  float: none; }\n  .scndryheader__cont {\n    width: 1680px;\n    margin: auto;\n    text-rendering: optimizeLegibility;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    line-height: 1.4em; }\n  .scndryheader__tabcont {\n    height: 50px;\n    background: #e6e6e6;\n    display: flex;\n    align-items: center;\n    position: relative; }\n  .scndryheader__tabinner {\n    background-color: #ffffff;\n    line-height: 0;\n    border-right: solid 1px #cccccc; }\n  .scndryheader__homeicon {\n    background-color: transparent;\n    padding: 18px 23px;\n    margin: 0;\n    color: #426da9;\n    cursor: pointer; }\n  .scndryheader__homesvg {\n    font-size: 16px;\n    vertical-align: bottom; }\n  .scndryheader__homelink {\n    color: #426da9; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/login.scss":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/login.scss ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".mar-tp--0 {\n  margin-top: 0 !important; }\n\n.mar-rt--none {\n  margin-right: 0 !important; }\n\n.wdh-per--10 {\n  width: 10% !important; }\n\n.wdh-per--25 {\n  width: 25% !important; }\n\n.wdh-per--35 {\n  width: 35% !important; }\n\n.wdh-per--100 {\n  width: 100% !important; }\n\n.bor-tp--none {\n  border-top: none !important; }\n\n.bor-tpbt--none {\n  border-top: none !important;\n  border-bottom: none !important; }\n\n.txt-aln--rt {\n  text-align: right; }\n\n.logincont {\n  width: 400px;\n  position: fixed;\n  top: 50%;\n  height: 190px;\n  left: 50%;\n  margin-top: -95px;\n  margin-left: -200px;\n  background: #e6e6e6;\n  border: solid 1px #cccccc;\n  border-radius: 5px; }\n  .logincont__form {\n    margin: 25px 25px 25px; }\n  .logincont__formlist {\n    margin: 0 0 15px;\n    float: left;\n    width: 100%; }\n  .logincont__formlabel {\n    width: 100px;\n    float: left;\n    line-height: 36px; }\n  .logincont__forminput {\n    width: 100%;\n    float: right;\n    padding: 10px;\n    border-radius: 5px;\n    border: solid 1px #cccccc; }\n  .logincont__formbutton {\n    float: right; }\n  .logincont__logo {\n    width: 117px;\n    height: 55px;\n    position: absolute;\n    top: -58px;\n    padding: 0;\n    margin: 0;\n    left: 15px; }\n  .logincont__logolink {\n    text-indent: -99999em;\n    width: 100%;\n    height: 100%;\n    float: left;\n    background: url(" + escape(__webpack_require__(/*! ../images/experian__logolatest.png */ "./src/assets/images/experian__logolatest.png")) + ") no-repeat center center transparent;\n    background-size: 100%; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/main.scss":
/*!********************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/main.scss ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".mar-tp--0 {\n  margin-top: 0 !important; }\n\n.mar-rt--none {\n  margin-right: 0 !important; }\n\n.wdh-per--10 {\n  width: 10% !important; }\n\n.wdh-per--25 {\n  width: 25% !important; }\n\n.wdh-per--35 {\n  width: 35% !important; }\n\n.wdh-per--100 {\n  width: 100% !important; }\n\n.bor-tp--none {\n  border-top: none !important; }\n\n.bor-tpbt--none {\n  border-top: none !important;\n  border-bottom: none !important; }\n\n.txt-aln--rt {\n  text-align: right; }\n\n.subpage__alertinfo {\n  margin: 10px 15px 0;\n  min-height: 70px;\n  border: solid 1px #fad9dd;\n  border-radius: 5px;\n  overflow: hidden;\n  font-size: 14px; }\n\n.subpage__alertleft {\n  width: 15%;\n  background: #fad9dd;\n  float: left;\n  height: 70px; }\n\n.subpage__alertright {\n  width: 85%;\n  float: left;\n  background: #ffffff;\n  padding: 10px 0 15px; }\n\n.subpage__alertmessage {\n  margin: 0 15px; }\n\n.subpage__alerticon {\n  background: url(" + escape(__webpack_require__(/*! ../images/alert.png */ "./src/assets/images/alert.png")) + ") no-repeat 0 0 transparent;\n  display: block;\n  width: 20px;\n  height: 20px;\n  margin: 15px auto 0; }\n\n.subpage__arrangeheading {\n  float: left;\n  font-size: 20px !important;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #aaaaaa;\n  margin-top: 10px; }\n\n.subpage__arrangecont {\n  width: 100%;\n  border-bottom: solid 1px #cccccc;\n  float: left; }\n\n.subpage__arrangeselect {\n  float: right;\n  margin-top: 0 !important;\n  margin-bottom: 20px !important; }\n  .subpage__arrangeselect .eds-dropdown-trigger .eds-dropdown-arrow {\n    right: 5px; }\n  .subpage__arrangeselect .eds-dropdown-trigger {\n    background: none;\n    padding-right: 20px; }\n\n.subpage__createarrange {\n  float: left;\n  margin: 35px 0 35px;\n  width: 100%;\n  font-size: 22px !important;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #aaaaaa; }\n\n.subpage__arrangeprogresscont {\n  margin: 0 50px;\n  position: relative; }\n\n.subpage__arrangeprogressline {\n  position: absolute;\n  width: 100%;\n  height: 2px;\n  background: #cccccc;\n  left: 0;\n  top: 40px; }\n\n.subpage__arrangeprogress {\n  float: left;\n  width: 100%;\n  position: relative; }\n\n.subpage__arrangetaskcircle {\n  background: #cccccc;\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  position: absolute;\n  left: 0;\n  top: 22px; }\n  .subpage__arrangetaskcircle:before {\n    background: #ffffff;\n    position: absolute;\n    width: 12px;\n    height: 12px;\n    content: \"\";\n    border-radius: 50%;\n    top: 50%;\n    margin-left: -6px;\n    left: 50%;\n    margin-top: -6px; }\n\n.subpage__arrangetask {\n  position: absolute;\n  left: -10px;\n  top: 8px; }\n\n.subpage__arrangetaskinfo {\n  position: absolute;\n  margin-left: -10px;\n  left: 50%;\n  top: -20px; }\n\n.subpage__arrangeform {\n  float: left;\n  width: 100%;\n  margin-top: 100px; }\n\n.subpage__arrangeforminner {\n  float: left;\n  width: 100%; }\n\n.subpage__arrangeformlabel {\n  float: left;\n  width: 50%;\n  padding-top: 5px;\n  font-size: 16px !important;\n  font-family: \"Roboto-Medium\" !important;\n  font-weight: normal !important;\n  color: #333333; }\n\n.subpage__arrangeformlist {\n  float: left;\n  width: 60%;\n  margin-bottom: 10px; }\n\n.subpage__arrangeforminput {\n  width: 50%;\n  padding: 10px;\n  border-radius: 5px;\n  border: solid 1px #cccccc; }\n\n.subpage__arrangeformselect {\n  float: right;\n  margin-top: 0 !important;\n  margin-bottom: 20px !important;\n  width: 50%; }\n  .subpage__arrangeformselect .eds-dropdown-trigger .eds-dropdown-arrow {\n    right: 5px; }\n  .subpage__arrangeformselect .eds-dropdown-trigger {\n    background: none;\n    padding-right: 20px; }\n\n.subpage__arrangeformbuton {\n  float: right;\n  padding: 10px;\n  background: #426da9;\n  border-radius: 5px;\n  border: none;\n  font-size: 14px !important;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #ffffff;\n  margin: 30px 0;\n  cursor: pointer; }\n  .subpage__arrangeformbuton:hover {\n    background: #004590;\n    color: #ffffff; }\n\n.subpage__arrangegraph {\n  border-top: solid 1px #cccccc;\n  float: left;\n  width: 100%; }\n\n.subpage__arrangegraphhead {\n  margin: 30px 0;\n  font-size: 22px !important;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #333333; }\n\n.subpage__graphcont {\n  border: solid 1px #cccccc;\n  text-align: center;\n  border-radius: 5px;\n  padding: 15px 0; }\n\n.subpage__graphimg {\n  width: 96%; }\n\n.subpage__sustaincont {\n  float: left;\n  width: 100%;\n  padding: 35px 0 30px;\n  border-bottom: solid 1px #cccccc;\n  margin-bottom: 35px; }\n\n.subpage__sustainlist {\n  float: left;\n  width: 31%;\n  border: solid 1px #cccccc;\n  border-radius: 5px;\n  overflow: hidden;\n  margin-right: 3.5%; }\n  .subpage__sustainlist:nth-child(last) {\n    margin-right: 0; }\n\n.subpage__sustainhead {\n  padding: 20px;\n  background: #f6f6f6; }\n\n.subpage__sustainnumber {\n  float: left;\n  font-size: 46px !important;\n  font-family: \"Roboto-Medium\" !important;\n  font-weight: normal !important;\n  color: #333333;\n  margin-right: 10px;\n  height: 30px;\n  margin-top: 10px; }\n\n.subpage__sustainheading {\n  float: left;\n  width: 80%;\n  font-size: 16px !important;\n  font-family: \"Roboto-Medium\" !important;\n  font-weight: normal !important;\n  color: #333333; }\n\n.subpage__sustaindesc {\n  font-size: 14px !important;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #333333; }\n\n.subpage__sustaintime {\n  font-size: 16px !important;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #333333;\n  padding: 20px 0;\n  text-align: center;\n  border-top: solid 1px #cccccc;\n  border-bottom: solid 1px #cccccc; }\n\n.subpage__sustaindetails {\n  margin-top: 10px;\n  float: left;\n  width: 100%; }\n\n.subpage__sustaindetailsinner {\n  padding: 15px; }\n\n.subpage__sustaindetailslabel {\n  font-size: 16px !important;\n  font-family: \"Roboto-Medium\" !important;\n  font-weight: normal !important;\n  color: #666666;\n  text-transform: uppercase;\n  margin-bottom: 3px;\n  float: left;\n  width: 100%; }\n\n.subpage__sustaindetailsamount {\n  font-size: 16px !important;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #333333; }\n\n.subpage__sustainselectbutton {\n  background: #edf4fa;\n  border-radius: 5px;\n  border: solid 1px #426da9;\n  padding: 5px 10px;\n  float: right;\n  margin-bottom: 25px;\n  font-size: 14px !important;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #426da9;\n  margin-left: 15px;\n  min-width: 80px;\n  cursor: pointer; }\n  .subpage__sustainselectbutton:hover {\n    background: #004590;\n    color: #ffffff; }\n\n.subpage__sustaineditbutton {\n  float: right;\n  font-size: 14px !important;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #426da9;\n  background: transparent;\n  border: none;\n  padding: 5px 10px;\n  cursor: pointer; }\n  .subpage__sustaineditbutton:hover {\n    color: #004590; }\n\n.subpage__previewschedulebutton {\n  background: #edf4fa;\n  border-radius: 5px;\n  border: solid 1px #426da9;\n  padding: 5px 10px;\n  float: right;\n  font-size: 14px !important;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #426da9;\n  cursor: pointer; }\n  .subpage__previewschedulebutton:hover {\n    background: #004590;\n    color: #ffffff; }\n\n.subpage__createarrangebutton {\n  background: #426da9;\n  border-radius: 5px;\n  border: solid 1px #426da9;\n  padding: 5px 10px;\n  float: right;\n  font-size: 14px !important;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #ffffff;\n  margin-left: 20px;\n  cursor: pointer; }\n  .subpage__createarrangebutton:hover {\n    background: #004590;\n    color: #ffffff; }\n\n.subpage__sustainbuttons {\n  margin-bottom: 20px;\n  float: left;\n  width: 100%; }\n\n.subpage__arrangereviewcont {\n  float: left;\n  width: 100%;\n  margin-top: 100px; }\n\n.subpage__arrangereview {\n  float: left;\n  width: 50%;\n  position: relative; }\n\n.subpage__arrangereviewhead {\n  text-transform: uppercase;\n  padding: 15px;\n  font-size: 14px !important;\n  font-family: \"Roboto-Medium\" !important;\n  font-weight: normal !important;\n  color: #000000; }\n\n.subpage__arrangereviewblock {\n  border-top: solid 1px #cccccc;\n  padding: 10px 0;\n  float: left;\n  width: 100%; }\n\n.subpage__arrangereviewlist {\n  margin: 5px 0;\n  float: left;\n  width: 100%; }\n\n.subpage__arrangereviewlabel {\n  font-size: 12px !important;\n  font-family: \"Roboto-Medium\" !important;\n  font-weight: normal !important;\n  color: #cccccc;\n  text-transform: uppercase;\n  float: left;\n  margin-left: 15px; }\n\n.subpage__arrangereviewvalue {\n  float: right;\n  margin-right: 15px;\n  font-size: 12px !important;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #000000; }\n\n.subpage__arrangereviewoutline {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  border: solid 1px #426da9; }\n\n.subpage__arrangereviewbtns {\n  float: left;\n  width: 100%;\n  margin: 30px 0; }\n\n.subpage__arrangereviewbtn {\n  background: #edf4fa;\n  border-radius: 5px;\n  border: solid 1px #426da9;\n  padding: 5px 10px;\n  float: right;\n  font-size: 14px !important;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #426da9;\n  min-width: 150px;\n  cursor: pointer; }\n  .subpage__arrangereviewbtn:hover {\n    background: #004590;\n    color: #ffffff; }\n\n.subpage__arrangereviewcmptbtn {\n  background: #426da9;\n  border-radius: 5px;\n  border: solid 1px #426da9;\n  padding: 5px 10px;\n  float: right;\n  font-size: 14px !important;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #ffffff;\n  min-width: 150px;\n  cursor: pointer; }\n  .subpage__arrangereviewcmptbtn:hover {\n    background: #004590;\n    color: #ffffff; }\n\n.subpage__sendarrangetbl {\n  width: 100%;\n  border-top: solid 1px #cccccc;\n  border-bottom: solid 1px #cccccc;\n  font-size: 14px !important;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #000000; }\n\n.subpage__sendarrangecol {\n  padding: 20px 10px;\n  border-top: solid 1px #cccccc;\n  border-bottom: solid 1px #cccccc; }\n\n.subpage__arrangesetup {\n  margin-top: 60px;\n  float: left;\n  width: 100%;\n  border-bottom: solid 1px #ccc;\n  padding-bottom: 40px; }\n\n.subpage__arrangesetupdesc {\n  float: left;\n  width: 100%;\n  font-size: 14px !important;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #000000;\n  margin-bottom: 15px; }\n\n.subpage__arrangesetuplabel {\n  float: left;\n  line-height: 32px;\n  font-size: 14px !important;\n  font-family: \"Roboto-Regular\" !important;\n  font-weight: normal !important;\n  color: #000000; }\n\n.subpage__arrangesetuplist {\n  float: left;\n  width: 100%;\n  margin-top: 5px; }\n\n.aln-at--middle {\n  left: 50%; }\n  .aln-at--middle .subpage__arrangetaskinfo {\n    margin-left: -15px; }\n\n.aln-at--end {\n  left: auto;\n  right: 0; }\n  .aln-at--end .subpage__arrangetaskinfo {\n    margin-left: -30px; }\n\n.progress--active .subpage__arrangetaskinfo {\n  color: #e63888; }\n\n.progress--active .subpage__arrangetaskcircle {\n  background: #e63888; }\n\n.progress--complete .subpage__arrangetaskcircle {\n  background: #e63888; }\n  .progress--complete .subpage__arrangetaskcircle::after {\n    width: 6px;\n    height: 12px;\n    border-right: solid 2px #ffffff;\n    border-bottom: solid 2px #ffffff;\n    left: 7px;\n    top: 3px;\n    content: \"\";\n    transform: rotate(45deg);\n    position: absolute; }\n  .progress--complete .subpage__arrangetaskcircle::before {\n    display: none; }\n\n.clear--both {\n  clear: both !important; }\n\n.pull--left {\n  float: left !important; }\n\n.sustain--active.subpage__sustainlist {\n  border-color: #426da9; }\n\n.sustain--active .subpage__sustainhead {\n  background: #426da9; }\n\n.sustain--active .subpage__sustainnumber {\n  color: #ffffff !important; }\n\n.sustain--active .subpage__sustainheading {\n  color: #ffffff !important; }\n\n.sustain--active .subpage__sustaindesc {\n  color: #ffffff !important; }\n\n.sustain--active .subpage__sustaintime {\n  border-color: #426da9;\n  font-family: \"Roboto-Medium\" !important; }\n\n.sustain--active .subpage__sustainselectbutton {\n  background: #426da9;\n  color: #ffffff !important; }\n\n.mar-lt--25 {\n  margin-left: 25px !important; }\n\n.txt-aln--rt {\n  text-align: right; }\n\n.checkbox {\n  width: 20px;\n  height: 20px;\n  border-radius: 5px;\n  border: solid 1px #426da9;\n  background: #fff;\n  margin: 0 10px 0 0;\n  -webkit-appearance: none;\n  outline: none;\n  cursor: pointer;\n  float: right;\n  position: relative;\n  top: 5px; }\n  .checkbox:checked {\n    position: relative; }\n    .checkbox:checked::after {\n      position: absolute;\n      width: 7px;\n      height: 12px;\n      border-right: solid 3px #426da9;\n      border-bottom: solid 3px #426da9;\n      left: 6px;\n      top: 2px;\n      content: \"\";\n      transform: rotate(45deg); }\n\n.roundedcheckbox {\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  border: solid 1px #47780c;\n  background: #fff;\n  margin: 0 15px 0 0;\n  -webkit-appearance: none;\n  outline: none;\n  cursor: pointer;\n  float: left;\n  position: relative;\n  top: 5px; }\n  .roundedcheckbox:checked {\n    position: relative;\n    background: #47780c; }\n    .roundedcheckbox:checked::after {\n      position: absolute;\n      width: 6px;\n      height: 12px;\n      border-right: solid 2px #ffffff;\n      border-bottom: solid 2px #ffffff;\n      left: 6px;\n      top: 2px;\n      content: \"\";\n      transform: rotate(45deg); }\n\n.row--selected {\n  font-size: 14px !important;\n  font-family: \"Roboto-Medium\" !important;\n  font-weight: normal !important;\n  color: #000000; }\n\n#createarrangement, #completearrangement, #generatearrangement {\n  display: none; }\n\neds-tag[motif='primary'] {\n  background: #d2e7f7;\n  color: #333333; }\n\n.cell--span-2 {\n  display: inline-block;\n  width: 99%;\n  font-size: 13px;\n  text-align: left;\n  font-weight: 500; }\n\n.arrears__data {\n  display: block;\n  font-weight: 400;\n  font-size: 13px; }\n\n.txt--transform-none {\n  text-transform: none; }\n\n.txt--normal {\n  font-weight: 400; }\n\n.txt--display-inline {\n  display: inline !important; }\n\n.labelsection__left {\n  float: left; }\n\n.labelsection__right {\n  float: right; }\n\n.mrg-left--10px {\n  margin-left: 10px; }\n\n.mrg-left--40px {\n  margin-left: 40px !important; }\n\n.mrg-top--30px {\n  margin-top: 30px !important; }\n\n.borderradius--top-none {\n  border-top-left-radius: 0;\n  border-top-right-radius: 0; }\n\n.borderradius--bottom-none {\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0; }\n\n.eds-accordion-add {\n  position: absolute;\n  right: 60px;\n  top: 12px;\n  width: 15px;\n  height: 15px;\n  background-repeat: no-repeat;\n  background-size: contain;\n  background-image: url(" + escape(__webpack_require__(/*! ../images/add.png */ "./src/assets/images/add.png")) + "); }\n\n.clr--blue {\n  color: #0e6eb7; }\n\n.accountinfo__calendarcontainer {\n  border: 1px solid #cccccc;\n  border-radius: 6px;\n  margin-top: 80px; }\n\n.accountinfo__calendartemplate {\n  padding: 10px 40px; }\n\n.accountinfo__calendar {\n  overflow: hidden; }\n\n.accountinfo__calendarview {\n  overflow: hidden;\n  padding: 10px 0; }\n\n.accountinfo__switchmonth {\n  float: left;\n  width: 5%;\n  min-height: 253px;\n  display: table; }\n\n.accountinfo__monthviews {\n  float: left;\n  width: 90%; }\n\n.accountinfo__monthviewsection {\n  float: left;\n  width: 50%; }\n\n.accountinfo__monthview {\n  width: calc(100% - 20px - 1px);\n  padding: 0 10px;\n  overflow: hidden;\n  margin: 0 auto; }\n\n.accountinfo__calendartitle {\n  font-weight: 600;\n  font-size: 13px;\n  display: block;\n  padding: 5px 0;\n  text-align: center;\n  border-bottom: 1px solid #d6d6d6; }\n\n.accountinfo__calendarcells {\n  overflow: hidden;\n  padding-top: 10px;\n  margin: 0 auto; }\n\n.accountinfo__calendarheader {\n  font-weight: 500;\n  font-size: 13px;\n  display: block;\n  text-align: center;\n  display: inline-block;\n  float: left;\n  width: 14.285%;\n  height: 30px;\n  overflow: hidden;\n  line-height: 30px; }\n\n.accountinfo__calendarcell {\n  font-weight: 400;\n  font-size: 13px;\n  text-align: center;\n  width: 14.285%;\n  height: 30px;\n  display: inline-block;\n  float: left;\n  overflow: hidden;\n  line-height: 30px;\n  position: relative; }\n\n.circle--fill {\n  width: 25px;\n  height: 25px;\n  border-radius: 50%;\n  position: absolute;\n  z-index: -1;\n  background-color: transparent; }\n\n.circle--border {\n  width: 25px;\n  height: 25px;\n  border: 2px solid transparent;\n  border-radius: 50%;\n  z-index: -1; }\n\n.circle--pos-center {\n  position: absolute;\n  margin-left: -12px;\n  margin-top: -13px;\n  left: 50%;\n  top: 50%; }\n\n.smallcircle--fill {\n  width: 15px;\n  height: 15px;\n  border: none;\n  border-radius: 50%;\n  position: absolute;\n  display: inline-block;\n  margin-top: 4px; }\n\n.smallcircle--border {\n  width: 15px;\n  height: 15px;\n  border: 2px solid transparent;\n  border-radius: 50%;\n  position: absolute;\n  display: inline-block;\n  margin-top: 4px; }\n\n.accountinfo__multipleevents {\n  border-color: #6b2075; }\n\n.accountinfo__arrangement {\n  background-color: #b7bd11; }\n\n.accountinfo__debit {\n  background-color: #00b0a4; }\n\n.accountinfo__credit {\n  background-color: #0082a6; }\n\n.accountinfo__call {\n  background-color: #6b2075; }\n\n.accountinfo__communication {\n  background-color: #e63987; }\n\n.accountinfo__userconfig1 {\n  background-color: #ff8e1c; }\n\n.accountinfo__userconfig2 {\n  background-color: #fcd700; }\n\n.accountinfo__today {\n  background-color: #e1effa;\n  width: 25px;\n  height: 25px;\n  position: absolute;\n  margin-left: -12.5px;\n  margin-top: -12.5px;\n  left: 50%;\n  top: 50%;\n  z-index: -1; }\n\n.clr--white {\n  color: #fff; }\n\n.clr--purple {\n  color: #6b2075; }\n\n.devider {\n  width: 1px;\n  height: 200px;\n  background-color: #d6d6d6;\n  margin-top: 50px;\n  float: left; }\n\n.accountinfo__legendsection {\n  overflow: hidden;\n  background-color: #f5f5f5;\n  padding: 15px 0; }\n\n.accountinfo__calendarlegends {\n  width: 85%;\n  margin: 0 auto;\n  overflow: hidden; }\n\n.accountinfo__calendarlegend {\n  position: relative;\n  float: left;\n  width: 25%;\n  margin: 4px 0; }\n\n.accountinfo__calendarlegendtext {\n  margin-left: 25px;\n  font-weight: 400;\n  font-size: 13px; }\n\n.accountinfo__switchmonthlink {\n  position: relative;\n  display: table-cell;\n  vertical-align: middle;\n  text-align: center; }\n\n.eds-previous-caret {\n  position: absolute;\n  right: 0px;\n  top: 50%;\n  width: 20px;\n  height: 20px;\n  background-repeat: no-repeat;\n  background-size: contain;\n  background-image: url(" + escape(__webpack_require__(/*! ../images/left_arrow.png */ "./src/assets/images/left_arrow.png")) + ");\n  margin-top: -10px; }\n\n.eds-next-caret {\n  position: absolute;\n  right: 0px;\n  top: 50%;\n  width: 20px;\n  height: 20px;\n  background-repeat: no-repeat;\n  background-size: contain;\n  background-image: url(" + escape(__webpack_require__(/*! ../images/right_arrow.png */ "./src/assets/images/right_arrow.png")) + ");\n  margin-top: -10px; }\n\n.pcc-eds-timeline-item [slot=\"slot-header-center\"] {\n  font-size: 14px; }\n\n.timeline__day {\n  color: #7a7a7a; }\n\n.timeline__details {\n  font-weight: 400; }\n\n.scale2 {\n  transform: scale(2);\n  vertical-align: bottom; }\n\n/* eds-icon[icon*=\"keyboard_arrow\"] {\n    color: #0e6eb7;\n    margin-left: 5px;\n} */\npcc-eds-timeline-item [slot=\"slot-header-center\"] [slot=\"slot-header-right\"] {\n  text-align: left !important; }\n\npcc-eds-timeline-item .pagination {\n  border-left: 1px solid #d8d8d8;\n  margin-left: 53px;\n  /* min-height: 20px; */\n  padding-right: 30px;\n  text-align: center; }\n\npcc-eds-timeline-item .section-pagination {\n  flex: 5;\n  margin-left: 20px; }\n\n.paginate {\n  display: inline-block;\n  padding: 0;\n  margin: 0;\n  font-size: 14px; }\n\n.paginate__item {\n  display: inline; }\n\n.paginate__link {\n  font-weight: 700;\n  float: left;\n  padding: 8px 8px;\n  text-decoration: none;\n  margin: 0 4px;\n  /* transition: background-color .3s; */\n  /* border: 1px solid #ddd; */ }\n\n.link--active {\n  color: #333333 !important;\n  border-bottom: 2px solid #af1685; }\n\n.link--disabled {\n  color: #7a7a7a !important; }\n\n.margin0 {\n  margin: 0 !important; }\n\n.margin-left--5px {\n  margin-left: 5px; }\n\n.padding-left--0 {\n  padding-left: 0; }\n\n.padding-right--0 {\n  padding-right: 0; }\n\n.font--normal {\n  font-weight: 400; }\n\n.pcc-eds-timeline-view {\n  padding-bottom: 15px; }\n\n.pagination__container {\n  display: flex;\n  flex: 5;\n  align-items: center; }\n\n.pagination__links {\n  /* display: flex; */\n  flex: 4; }\n\n.pagination__status {\n  /* display: flex; */\n  flex: 1;\n  font-weight: normal; }\n\n.pcc-eds-timeline-view {\n  padding-bottom: 15px !important; }\n\n.slot__datacontainer {\n  background-color: #f5f5f5;\n  padding: 20px 0; }\n\n.slot__datetemplate {\n  overflow: hidden;\n  padding: 0 30px; }\n\n.slot__datacontainer {\n  overflow: hidden;\n  background-color: #f5f5f5; }\n\n.slot__dataitem {\n  float: left;\n  width: 50%;\n  padding: 0 20px; }\n\n.slot__dataheader {\n  color: #af1685;\n  margin-left: 5px; }\n\n.slot__datafield {\n  margin-left: 5px;\n  margin-top: 15px;\n  font-weight: 500;\n  font-size: 14px; }\n\n.slot__value {\n  margin-left: 5px;\n  padding: 2px 5px;\n  font-size: 14px;\n  font-weight: 400;\n  margin-top: 5px;\n  display: inline-block; }\n\n.slot__updatedvalue {\n  background-color: #faecb9;\n  padding: 2px 5px;\n  font-size: 14px;\n  font-weight: 400;\n  margin-top: 5px;\n  display: inline-block; }\n\n.brd-right--1px {\n  border-right: 1px solid #d6d6d6; }\n\n.upload__document {\n  background: url(" + escape(__webpack_require__(/*! ../images/upload_document.png */ "./src/assets/images/upload_document.png")) + ") 0 no-repeat;\n  width: 20px;\n  height: 20px;\n  background-size: contain;\n  display: block;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  margin-top: -10px;\n  margin-left: -7px; }\n\n.document {\n  background: url(" + escape(__webpack_require__(/*! ../images/document.png */ "./src/assets/images/document.png")) + ") 0 no-repeat;\n  width: 20px;\n  height: 20px;\n  background-size: contain;\n  display: block;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  margin-top: -10px;\n  margin-left: -9px; }\n\n.pos--relative {\n  position: relative; }\n\n.promisepay__navtab {\n  width: 200px;\n  margin: 0 auto 20px;\n  border-radius: 4px; }\n\n.promisepay__navtabcont {\n  padding: 0;\n  line-height: 10px; }\n\n.promisepay__navtablist {\n  list-style: none;\n  line-height: 10px; }\n\n@media all and (-ms-high-contrast: none) {\n  .promisepay__navtablist {\n    list-style-image: url(data:0);\n    display: inline; } }\n\n.promisepay__navtablink {\n  border: solid 1px #cccccc;\n  text-decoration: none;\n  text-align: center;\n  font-size: 14px;\n  font-family: \"Roboto\" !important;\n  font-weight: normal !important;\n  color: #426da9;\n  min-width: 97px;\n  float: left;\n  padding: 10px 0;\n  font-weight: 500 !important; }\n\n.promisepay--navtablinkactive {\n  background: #d82b80;\n  color: #ffffff !important;\n  border: solid 1px #d82b80; }\n\n.promisepay--navtablinkfirst {\n  border-radius: 4px 0 0 4px !important;\n  border-right: none; }\n\n.promisepay--navtablinklast {\n  border-radius: 0 4px 4px 0 !important;\n  border-left: none; }\n\n.notes-tab eds-accordion {\n  border-color: #426DA9; }\n\n.notes-tab .note-container {\n  background-color: #426DA9; }\n  .notes-tab .note-container eds-accordion-panel {\n    background-color: #426DA9; }\n  .notes-tab .note-container .eds-accordion-label {\n    background: #426DA9 !important;\n    color: #ffffff !important; }\n  .notes-tab .note-container .table {\n    background: #ffffff !important; }\n\n.notes-tab .note-btn {\n  float: right; }\n\n.notes-tab .row > .cell {\n  float: right; }\n\n.notes-tab textarea {\n  padding: 10px 10px 0;\n  font-size: 14px !important; }\n\n/******************************************************\n    Income and Expenditure\n******************************************************/\n.IncomeExpenditure__ {\n  float: left;\n  width: 80%; }\n  .IncomeExpenditure__ h1 {\n    color: #000000;\n    font-family: 'Roboto';\n    font-size: 20px;\n    font-weight: 300;\n    line-height: 24px;\n    padding: 2em 0 0 0; }\n    .IncomeExpenditure__ h1 b {\n      font-weight: bold; }\n    .IncomeExpenditure__ h1 span {\n      color: #6D2077;\n      font-family: Roboto;\n      font-size: 14px;\n      line-height: 14px;\n      text-align: center;\n      border-radius: 12px;\n      background-color: #ECE3EE;\n      padding: 5px 10px;\n      display: inline-block; }\n  .IncomeExpenditure__ input {\n    width: 100%;\n    position: absolute;\n    left: 0;\n    top: 0;\n    text-align: right;\n    height: 100%;\n    border: none;\n    background: transparent; }\n  .IncomeExpenditure__ select {\n    width: 100%;\n    position: absolute;\n    left: 0;\n    top: 0;\n    height: 100%;\n    border: none;\n    background: transparent; }\n  .IncomeExpenditure__ .subHeading__ {\n    width: 100%;\n    color: #333333;\n    font-family: 'Roboto';\n    font-size: 13px;\n    line-height: 14px;\n    padding: 10px 0 0 0; }\n    .IncomeExpenditure__ .subHeading__ label {\n      padding-right: 1em; }\n  .IncomeExpenditure__withswitch {\n    float: left;\n    width: 100%;\n    margin-bottom: 15px; }\n  .IncomeExpenditure__livingcost {\n    color: #333333;\n    font-family: 'Roboto';\n    font-size: 16px;\n    font-weight: 500;\n    line-height: 19px;\n    float: left;\n    padding: 0 !important; }\n  .IncomeExpenditure__ .accordion {\n    margin-top: 1em; }\n    .IncomeExpenditure__ .accordion .transition, .IncomeExpenditure__ .accordion p, .IncomeExpenditure__ .accordion ul li i:before, .IncomeExpenditure__ .accordion ul li i:after {\n      transition: all 0.25s ease-in-out; }\n    .IncomeExpenditure__ .accordion .flipIn, .IncomeExpenditure__ .accordion h1, .IncomeExpenditure__ .accordion ul li {\n      animation: flipdown 0.5s ease both; }\n    .IncomeExpenditure__ .accordion .no-select, .IncomeExpenditure__ .accordion h2 {\n      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n      -webkit-touch-callout: none;\n      -webkit-user-select: none;\n      -khtml-user-select: none;\n      -moz-user-select: none;\n      -ms-user-select: none;\n      user-select: none; }\n    .IncomeExpenditure__ .accordion body {\n      min-height: 0;\n      display: inline-block;\n      position: relative;\n      left: 50%;\n      margin: 90px 0;\n      transform: translate(-50%, 0);\n      box-shadow: 0 10px 0 0 #ff6873 inset;\n      border: 1px solid #ff6873;\n      background-color: #fefffa;\n      max-width: 450px;\n      padding: 30px; }\n    @media (max-width: 550px) {\n      .IncomeExpenditure__ .accordion body {\n        box-sizing: border-box;\n        transform: translate(0, 0);\n        max-width: 100%;\n        min-height: 100%;\n        margin: 0;\n        left: 0; } }\n    .IncomeExpenditure__ .accordion h1, .IncomeExpenditure__ .accordion h2 {\n      color: #84278d; }\n    .IncomeExpenditure__ .accordion h1 span, .IncomeExpenditure__ .accordion h2 span {\n      color: #333; }\n    .IncomeExpenditure__ .accordion h1 {\n      color: #333;\n      width: 100%;\n      font-size: 1em;\n      padding: 2em 0 1em 0; }\n    .IncomeExpenditure__ .accordion h2 {\n      letter-spacing: 1px;\n      display: block;\n      padding: 1em 2em 1em 4em;\n      text-transform: uppercase;\n      color: #163c6f;\n      font-family: 'Roboto';\n      font-size: 14px;\n      font-weight: 500;\n      line-height: 16px span;\n        line-height-color: #424242; }\n    .IncomeExpenditure__ .accordion h3 {\n      font-size: 1em;\n      padding: 2em 2em 1em 0em; }\n    .IncomeExpenditure__ .accordion table {\n      position: relative;\n      overflow: hidden;\n      max-height: 800px;\n      opacity: 1;\n      transform: translate(0, 0);\n      z-index: 2; }\n    .IncomeExpenditure__ .accordion ul {\n      list-style: none;\n      perspective: 900;\n      padding: 0px;\n      margin: 0;\n      border: 1px solid #cccccc;\n      border-radius: 6px; }\n    .IncomeExpenditure__ .accordion ul li {\n      position: relative;\n      padding: 0;\n      margin: 0;\n      padding-bottom: 4px;\n      /* padding-top: 18px; */\n      /* border-top: 1px dotted #dce7eb; */ }\n    .IncomeExpenditure__ .accordion ul li div {\n      margin: 0 2em 1em; }\n    .IncomeExpenditure__ .accordion ul li.bg_gray {\n      background-color: #f2f2f2; }\n    .IncomeExpenditure__ .accordion ul li.bdr_t {\n      border-top: 1px solid #d1d1d1; }\n    .IncomeExpenditure__ .accordion ul li:nth-of-type(1) {\n      animation-delay: 0.5s; }\n    .IncomeExpenditure__ .accordion ul li:nth-of-type(2) {\n      animation-delay: 0.75s; }\n    .IncomeExpenditure__ .accordion ul li:nth-of-type(3) {\n      animation-delay: 1s; }\n    .IncomeExpenditure__ .accordion ul li:last-of-type {\n      padding-bottom: 0; }\n    .IncomeExpenditure__ .accordion ul li i {\n      position: absolute;\n      transform: translate(-6px, 0);\n      margin-top: 17px;\n      left: 3em; }\n    .IncomeExpenditure__ .accordion ul li i:before, .IncomeExpenditure__ .accordion ul li i:after {\n      content: \"\";\n      position: absolute;\n      background-color: #426da9;\n      width: 3px;\n      height: 9px; }\n    .IncomeExpenditure__ .accordion ul li i:before {\n      transform: translate(-2px, 0) rotate(45deg); }\n    .IncomeExpenditure__ .accordion ul li i:after {\n      transform: translate(2px, 0) rotate(-45deg); }\n    .IncomeExpenditure__ .accordion ul li input[type=checkbox] {\n      position: absolute;\n      cursor: pointer;\n      width: 100%;\n      height: 100%;\n      z-index: 1;\n      opacity: 0; }\n    .IncomeExpenditure__ .accordion ul li input[type=checkbox]:checked ~ table {\n      margin-top: 0;\n      max-height: 0;\n      opacity: 0;\n      transform: translate(0, 50%);\n      display: none; }\n    .IncomeExpenditure__ .accordion ul li input[type=checkbox]:checked ~ i:before {\n      transform: translate(2px, 0) rotate(45deg); }\n    .IncomeExpenditure__ .accordion ul li input[type=checkbox]:checked ~ i:after {\n      transform: translate(-2px, 0) rotate(-45deg); }\n\n@keyframes flipdown {\n  0% {\n    opacity: 0;\n    transform-origin: top center;\n    transform: rotateX(-90deg); }\n  5% {\n    opacity: 1; }\n  80% {\n    transform: rotateX(8deg); }\n  83% {\n    transform: rotateX(6deg); }\n  92% {\n    transform: rotateX(-3deg); }\n  100% {\n    transform-origin: top center;\n    transform: rotateX(0deg); } }\n    .IncomeExpenditure__ .accordion table.tbl {\n      width: 100%;\n      font-size: 0.8em; }\n    .IncomeExpenditure__ .accordion table.tbl th,\n    .IncomeExpenditure__ .accordion table.tbl td {\n      padding: 10px 15px;\n      text-align: right;\n      border-top: 1px solid #d1d1d1;\n      border-bottom: 1px solid #d1d1d1;\n      color: #424242;\n      font-family: 'Roboto';\n      font-size: 14px;\n      font-weight: 500;\n      line-height: 14px;\n      position: relative; }\n    .IncomeExpenditure__ .accordion table.tbl thead th,\n    .IncomeExpenditure__ .accordion table.tbl thead td {\n      background-color: #edf6fd;\n      font-weight: 500;\n      color: #323232;\n      font-family: 'Roboto';\n      font-size: 14px;\n      font-weight: 500;\n      letter-spacing: -0.35px;\n      line-height: 16px; }\n    .IncomeExpenditure__ .accordion table.tbl thead th:first-child,\n    .IncomeExpenditure__ .accordion table.tbl td:first-child {\n      font-weight: 500;\n      text-align: left; }\n    .IncomeExpenditure__ .accordion table.tbl thead th:last-child,\n    .IncomeExpenditure__ .accordion table.tbl td:last-child {\n      font-weight: 500;\n      text-align: right; }\n    .IncomeExpenditure__ .accordion table.tbl tr:nth-child(even) {\n      background-color: #f6f6f6; }\n\n.ieaside__ {\n  float: right;\n  width: 20%;\n  margin-top: 165px; }\n  .ieaside__ h3 {\n    color: #000000;\n    font-family: Roboto;\n    font-size: 20px;\n    font-weight: 300;\n    line-height: 24px; }\n  .ieaside__ table {\n    width: 100%;\n    margin-top: 20px; }\n  .ieaside__ table td {\n    color: #555656;\n    font-family: Roboto;\n    font-size: 16px;\n    line-height: 40px; }\n    .ieaside__ table td b {\n      color: #3A3A3A;\n      font-family: Roboto;\n      font-size: 16px;\n      font-weight: bold;\n      line-height: 40px; }\n  .ieaside__inner {\n    margin: 0 2em; }\n  .ieaside__btn {\n    padding: 8px 28px;\n    border-radius: 5px;\n    border: 0;\n    background-color: #426da9;\n    font-size: 14px;\n    color: #fff; }\n  .ieaside__lastsevedleft {\n    color: #A7A8A7;\n    font-family: Roboto;\n    font-size: 14px;\n    font-weight: 500;\n    line-height: 21px;\n    float: left; }\n  .ieaside__lastsevedcont {\n    float: left;\n    width: 100%;\n    margin-bottom: 30px; }\n  .ieaside__lastsevedright {\n    color: #9D9E9D;\n    font-family: Roboto;\n    font-size: 14px;\n    font-weight: 300;\n    line-height: 21px;\n    float: right; }\n\n.highlight--avgrow {\n  background-color: rgba(252, 238, 186, 0.18); }\n\n.txt-aln--left {\n  text-align: left !important; }\n\n.txt-aln--cntr {\n  text-align: center !important; }\n\n.txt-aln--right {\n  text-align: right !important; }\n\n.wdh-per--5 {\n  width: 5%; }\n\n.wdh-per--7 {\n  width: 7%; }\n\n.wdh-per--48 {\n  width: 48%; }\n\n.wdh-per--15 {\n  width: 15%; }\n\n.wdh-per--20 {\n  width: 20%; }\n\n.wdh-per--10 {\n  width: 10%; }\n\n.tbl--checkbox {\n  position: absolute;\n  opacity: 1 !important;\n  height: 20px !important;\n  width: 20px !important;\n  left: 50% !important;\n  top: 50% !important;\n  margin-top: -10px;\n  border: solid 1px #426da9 !important; }\n\n.clear {\n  clear: both; }\n\n.pull--right {\n  float: right !important; }\n\n.icon--totalincome {\n  background: url(" + escape(__webpack_require__(/*! ../images/icon_ie2.png */ "./src/assets/images/icon_ie2.png")) + ") no-repeat 0 0 transparent;\n  float: left;\n  width: 35px;\n  height: 35px;\n  margin-right: 10px;\n  background-size: 100%;\n  position: relative;\n  top: -5px; }\n\n.icon--totalexpenditure {\n  background: url(" + escape(__webpack_require__(/*! ../images/icon_ie1.png */ "./src/assets/images/icon_ie1.png")) + ") no-repeat 0 0 transparent;\n  float: left;\n  width: 35px;\n  height: 35px;\n  margin-right: 10px;\n  background-size: 100%;\n  position: relative;\n  top: -5px; }\n\n.icon--profile {\n  background: url(" + escape(__webpack_require__(/*! ../images/icon__ieprofile.png */ "./src/assets/images/icon__ieprofile.png")) + ") no-repeat 0 0 transparent;\n  width: 15px;\n  height: 15px;\n  margin-right: 3px;\n  background-size: 100%;\n  display: inline-block;\n  position: relative;\n  top: 3px; }\n\n.icon--ieinfo {\n  background: url(" + escape(__webpack_require__(/*! ../images/icon__IEInfo.png */ "./src/assets/images/icon__IEInfo.png")) + ") no-repeat 0 0 transparent;\n  width: 15px;\n  height: 15px;\n  background-size: 100%;\n  display: inline-block;\n  position: relative !important;\n  top: 3px;\n  margin-top: 0 !important;\n  transform: translate(0, 0) !important;\n  left: auto !important; }\n  .icon--ieinfo:after {\n    display: none !important; }\n  .icon--ieinfo:before {\n    display: none !important; }\n\n.icon--iecancel {\n  background: url(" + escape(__webpack_require__(/*! ../images/icon__ieclose.png */ "./src/assets/images/icon__ieclose.png")) + ") no-repeat 0 0 transparent;\n  width: 15px;\n  height: 15px;\n  background-size: 100%;\n  display: inline-block;\n  position: relative !important;\n  top: 3px;\n  margin-top: 0 !important;\n  transform: translate(0, 0) !important;\n  left: auto !important; }\n\n.icon--addierow {\n  background: url(" + escape(__webpack_require__(/*! ../images/icon__ieaddrow.png */ "./src/assets/images/icon__ieaddrow.png")) + ") no-repeat 0 0 transparent;\n  width: 15px;\n  height: 15px;\n  background-size: 100%;\n  display: inline-block;\n  position: relative !important;\n  top: 3px;\n  margin-top: 0 !important;\n  transform: translate(0, 0) !important;\n  left: auto !important; }\n  .icon--addierow:after {\n    display: none !important; }\n  .icon--addierow:before {\n    display: none !important; }\n\n.tbl--innerborder td {\n  border: solid 1px #cccccc; }\n\n.bor-rt--none {\n  border-right: none !important; }\n\n.bor-lt--none {\n  border-left: none !important; }\n\n.addierowlink {\n  color: #0E6EB7;\n  font-family: Roboto;\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 16px;\n  float: right;\n  text-decoration: none;\n  margin: 20px 0 0;\n  position: relative;\n  z-index: 1; }\n  .addierowlink:hover {\n    opacity: 0.7; }\n\n.btn--iecancel {\n  background: transparent;\n  color: #426DA9;\n  font-family: Roboto;\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 16px;\n  border: none;\n  width: auto;\n  padding-left: 0;\n  padding-right: 0; }\n  .btn--iecancel:hover {\n    opacity: 0.7; }\n\n.btn--iesave {\n  width: 75px;\n  border: 1px solid rgba(0, 69, 144, 0.3);\n  border-radius: 4px;\n  background-color: rgba(14, 110, 183, 0.08);\n  box-shadow: 0 1px 0 0 rgba(14, 110, 183, 0.3);\n  color: #0E6EB7;\n  font-family: Roboto;\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 16px;\n  margin: 0 10px; }\n  .btn--iesave:hover {\n    background-color: #426da9;\n    font-size: 14px;\n    font-family: \"Roboto-Medium\" !important;\n    font-weight: normal !important;\n    color: #ffffff; }\n\n.btn--iecomplete {\n  width: 100px; }\n  .btn--iecomplete:hover {\n    background-color: rgba(14, 110, 183, 0.08);\n    color: #0E6EB7; }\n\n.close--acctab {\n  position: absolute;\n  right: 3px;\n  top: 7px;\n  padding: 0 !important;\n  width: auto !important; }\n\n.pad-rt--15 {\n  padding-right: 15px !important; }\n", ""]);

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
exports.push([module.i, ".mar-tp--0 {\n  margin-top: 0 !important; }\n\n.mar-rt--none {\n  margin-right: 0 !important; }\n\n.wdh-per--10 {\n  width: 10% !important; }\n\n.wdh-per--25 {\n  width: 25% !important; }\n\n.wdh-per--35 {\n  width: 35% !important; }\n\n.wdh-per--100 {\n  width: 100% !important; }\n\n.bor-tp--none {\n  border-top: none !important; }\n\n.bor-tpbt--none {\n  border-top: none !important;\n  border-bottom: none !important; }\n\n.txt-aln--rt {\n  text-align: right; }\n\neds-accordion {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  border: 1px solid #cccccc;\n  border-radius: 6px;\n  background-color: #ffffff; }\n  eds-accordion eds-accordion-panel {\n    border-top: 1px solid #cccccc;\n    position: relative;\n    display: flex;\n    flex-direction: column; }\n    eds-accordion eds-accordion-panel p {\n      transition: padding 100ms ease 0ms, opacity 75ms ease 25ms;\n      padding: 0 20px;\n      margin: 0;\n      font-size: 14px;\n      max-height: 0;\n      opacity: 0; }\n    eds-accordion eds-accordion-panel .eds-accordion-caret {\n      transition: transform 150ms ease 0ms; }\n    eds-accordion eds-accordion-panel .eds-accordion-label {\n      text-align: left;\n      border: 0;\n      height: 40px;\n      padding: 10px 20px;\n      background-color: #f6f6f6;\n      font-weight: 500;\n      font-size: 14px;\n      font-family: Roboto;\n      cursor: pointer; }\n      eds-accordion eds-accordion-panel .eds-accordion-label:focus {\n        outline: none;\n        background-color: #EDF4FA; }\n      eds-accordion eds-accordion-panel .eds-accordion-label:active {\n        outline: none; }\n      eds-accordion eds-accordion-panel .eds-accordion-label .eds-accordion-label-text:nth-child(1) {\n        display: block; }\n      eds-accordion eds-accordion-panel .eds-accordion-label .eds-accordion-label-text:nth-child(2) {\n        display: none; }\n      eds-accordion eds-accordion-panel .eds-accordion-label .eds-accordion-caret {\n        position: absolute;\n        right: 20px;\n        top: 16px;\n        width: 12px;\n        height: 8px;\n        background-repeat: no-repeat;\n        background-size: contain;\n        background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSI3cHgiIHZpZXdCb3g9IjAgMCAxMiA3IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0OC4yICg0NzMyNykgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+R3JvdXAgMjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTIzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iR3JvdXAtMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNi4wMDAwMDAsIDEuMDAwMDAwKSByb3RhdGUoLTQ1LjAwMDAwMCkgdHJhbnNsYXRlKC02LjAwMDAwMCwgLTEuMDAwMDAwKSB0cmFuc2xhdGUoMi4wMDAwMDAsIC0zLjAwMDAwMCkiIGZpbGw9IiMwRTZFQjciPgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTIiIHg9IjAiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjgiIHJ4PSIxIj48L3JlY3Q+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMi1Db3B5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LjAwMDAwMCwgNy4wMDAwMDApIHJvdGF0ZSg5MC4wMDAwMDApIHRyYW5zbGF0ZSgtNC4wMDAwMDAsIC03LjAwMDAwMCkgIiB4PSIzIiB5PSIzIiB3aWR0aD0iMiIgaGVpZ2h0PSI4IiByeD0iMSI+PC9yZWN0PgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+\"); }\n      eds-accordion eds-accordion-panel .eds-accordion-label .edit-tab {\n        display: none; }\n        eds-accordion eds-accordion-panel .eds-accordion-label .edit-tab svg {\n          vertical-align: sub;\n          fill: #0e6eb7; }\n      eds-accordion eds-accordion-panel .eds-accordion-label.active .edit-tab {\n        display: block;\n        float: right;\n        color: #0e6eb7; }\n    eds-accordion eds-accordion-panel:first-child {\n      border: 0; }\n    eds-accordion eds-accordion-panel .table {\n      background: #ffffff; }\n  eds-accordion eds-accordion-panel[active=\"true\"] {\n    min-height: 200px; }\n    eds-accordion eds-accordion-panel[active=\"true\"] p {\n      transition: padding 150ms ease 0ms;\n      max-height: none;\n      padding: 24px 20px;\n      opacity: 1; }\n    eds-accordion eds-accordion-panel[active=\"true\"] .eds-accordion-label {\n      background-color: transparent;\n      border-bottom: 1px solid #cccccc;\n      margin: 0 20px;\n      padding: 10px 0;\n      width: auto; }\n      eds-accordion eds-accordion-panel[active=\"true\"] .eds-accordion-label .eds-accordion-label-text:nth-child(1) {\n        display: none; }\n      eds-accordion eds-accordion-panel[active=\"true\"] .eds-accordion-label .eds-accordion-label-text:nth-child(2) {\n        display: block; }\n      eds-accordion eds-accordion-panel[active=\"true\"] .eds-accordion-label .eds-accordion-sublabel {\n        display: block; }\n      eds-accordion eds-accordion-panel[active=\"true\"] .eds-accordion-label .eds-accordion-caret {\n        transform: rotate(180deg); }\n  eds-accordion eds-accordion-panel[active] p {\n    transition: padding 150ms ease 0ms;\n    max-height: none;\n    padding: 24px 20px;\n    opacity: 1; }\n  eds-accordion eds-accordion-panel[active] .eds-accordion-label {\n    background-color: transparent;\n    border-bottom: 1px solid #cccccc;\n    padding: 10px 20px 7px 20px;\n    width: auto; }\n    eds-accordion eds-accordion-panel[active] .eds-accordion-label .eds-accordion-label-text:nth-child(1) {\n      display: none; }\n    eds-accordion eds-accordion-panel[active] .eds-accordion-label .eds-accordion-label-text:nth-child(2) {\n      display: block; }\n    eds-accordion eds-accordion-panel[active] .eds-accordion-label .eds-accordion-sublabel {\n      display: block; }\n    eds-accordion eds-accordion-panel[active] .eds-accordion-label .eds-accordion-caret {\n      transform: rotate(180deg); }\n  eds-accordion.data {\n    display: none; }\n\neds-accordion[wide] {\n  border-radius: 0; }\n  eds-accordion[wide] eds-accordion-panel .eds-accordion-label {\n    padding: 10px 50px; }\n  eds-accordion[wide] eds-accordion-panel .eds-accordion-label-text:nth-child(1) {\n    display: inline-block;\n    text-transform: uppercase;\n    color: #6d2077; }\n  eds-accordion[wide] eds-accordion-panel .eds-accordion-label-text:nth-child(2) {\n    display: inline-block;\n    color: #333333;\n    margin-left: 3px; }\n  eds-accordion[wide] eds-accordion-panel .eds-accordion-caret {\n    top: 16px;\n    left: 19px; }\n  eds-accordion[wide] eds-accordion-panel p {\n    padding: 0 50px; }\n  eds-accordion[wide] eds-accordion-panel[active] .eds-accordion-label {\n    border: 0;\n    padding: 11px 0;\n    margin: 0 50px; }\n    eds-accordion[wide] eds-accordion-panel[active] .eds-accordion-label .eds-accordion-label-text:nth-child(1) {\n      display: inline-block; }\n    eds-accordion[wide] eds-accordion-panel[active] .eds-accordion-label .eds-accordion-label-text:nth-child(2) {\n      display: inline-block; }\n  eds-accordion[wide] eds-accordion-panel[active] p {\n    padding: 24px 50px 48px 50px; }\n  eds-accordion[wide] eds-accordion-panel[active=\"true\"] .eds-accordion-label {\n    border: 0;\n    padding: 11px 0;\n    margin: 0 50px; }\n    eds-accordion[wide] eds-accordion-panel[active=\"true\"] .eds-accordion-label .eds-accordion-label-text:nth-child(1) {\n      display: inline-block; }\n    eds-accordion[wide] eds-accordion-panel[active=\"true\"] .eds-accordion-label .eds-accordion-label-text:nth-child(2) {\n      display: inline-block; }\n  eds-accordion[wide] eds-accordion-panel[active=\"true\"] p {\n    padding: 24px 50px 48px 50px; }\n\neds-accordion[wide=\"true\"] {\n  border-radius: 0; }\n  eds-accordion[wide=\"true\"] eds-accordion-panel .eds-accordion-label {\n    padding: 10px 50px; }\n  eds-accordion[wide=\"true\"] eds-accordion-panel .eds-accordion-label-text:nth-child(1) {\n    display: inline-block;\n    text-transform: uppercase;\n    color: #6d2077; }\n  eds-accordion[wide=\"true\"] eds-accordion-panel .eds-accordion-label-text:nth-child(2) {\n    display: inline-block;\n    color: #333333;\n    margin-left: 3px; }\n  eds-accordion[wide=\"true\"] eds-accordion-panel .eds-accordion-caret {\n    top: 16px;\n    left: 19px; }\n  eds-accordion[wide=\"true\"] eds-accordion-panel p {\n    padding: 0 50px; }\n  eds-accordion[wide=\"true\"] eds-accordion-panel[active] .eds-accordion-label {\n    border: 0;\n    padding: 11px 0;\n    margin: 0 50px; }\n    eds-accordion[wide=\"true\"] eds-accordion-panel[active] .eds-accordion-label .eds-accordion-label-text:nth-child(1) {\n      display: inline-block; }\n    eds-accordion[wide=\"true\"] eds-accordion-panel[active] .eds-accordion-label .eds-accordion-label-text:nth-child(2) {\n      display: inline-block; }\n  eds-accordion[wide=\"true\"] eds-accordion-panel[active] p {\n    padding: 24px 50px 48px 50px; }\n  eds-accordion[wide=\"true\"] eds-accordion-panel[active=\"true\"] .eds-accordion-label {\n    border: 0;\n    padding: 11px 0;\n    margin: 0 50px; }\n    eds-accordion[wide=\"true\"] eds-accordion-panel[active=\"true\"] .eds-accordion-label .eds-accordion-label-text:nth-child(1) {\n      display: inline-block; }\n    eds-accordion[wide=\"true\"] eds-accordion-panel[active=\"true\"] .eds-accordion-label .eds-accordion-label-text:nth-child(2) {\n      display: inline-block; }\n  eds-accordion[wide=\"true\"] eds-accordion-panel[active=\"true\"] p {\n    padding: 24px 50px 48px 50px; }\n\n.eds-greyed {\n  color: #cccccc; }\n\n.acct-container .eds-accordion-label i {\n  vertical-align: sub; }\n\n.acct-container .eds-accordion-label .eds-accordion-label-text {\n  vertical-align: text-bottom; }\n\n.acct-container .containerMiddle > eds-card {\n  padding: 20px 38px; }\n", ""]);

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
exports.push([module.i, ".mar-tp--0 {\n  margin-top: 0 !important; }\n\n.mar-rt--none {\n  margin-right: 0 !important; }\n\n.wdh-per--10 {\n  width: 10% !important; }\n\n.wdh-per--25 {\n  width: 25% !important; }\n\n.wdh-per--35 {\n  width: 35% !important; }\n\n.wdh-per--100 {\n  width: 100% !important; }\n\n.bor-tp--none {\n  border-top: none !important; }\n\n.bor-tpbt--none {\n  border-top: none !important;\n  border-bottom: none !important; }\n\n.txt-aln--rt {\n  text-align: right; }\n\neds-tabs {\n  display: block;\n  padding-left: 36px; }\n  eds-tabs .tab-labels {\n    border-bottom: 1px solid #cccccc;\n    width: 100%;\n    height: 50px;\n    overflow-x: auto;\n    margin: 0;\n    padding: 0; }\n    eds-tabs .tab-labels li {\n      margin: 0;\n      padding: 0;\n      display: inline-block; }\n      eds-tabs .tab-labels li a {\n        padding: 0 20px;\n        width: 100%;\n        font-size: 14px;\n        font-weight: 500;\n        display: block;\n        color: #426da9;\n        text-decoration: none; }\n        eds-tabs .tab-labels li a:hover {\n          border-bottom: 4px solid #d8d8d8;\n          color: #163c6f; }\n      eds-tabs .tab-labels li a[aria-selected=\"true\"] {\n        border-bottom: 4px solid #e63888;\n        color: #163c6f; }\n    eds-tabs .tab-labels:first-child {\n      height: auto; }\n      eds-tabs .tab-labels:first-child li {\n        height: auto; }\n        eds-tabs .tab-labels:first-child li a {\n          padding: 11px 18px; }\n  eds-tabs eds-tab {\n    display: none;\n    opacity: 0;\n    transition: opacity .15s linear; }\n    eds-tabs eds-tab:after {\n      content: \" \";\n      display: table; }\n    eds-tabs eds-tab:before {\n      content: \" \";\n      display: table; }\n  eds-tabs eds-tab[active] {\n    display: block;\n    opacity: 1; }\n  eds-tabs .containerSide eds-tabs {\n    padding: 0; }\n\neds-tabs[vertical] {\n  display: flex; }\n  eds-tabs[vertical] .tab-labels {\n    height: fit-content;\n    flex: 0 0 180px;\n    border-right: 1px solid #d8d8d8;\n    border-bottom: none; }\n    eds-tabs[vertical] .tab-labels li {\n      height: 50px;\n      line-height: 50px;\n      text-align: left;\n      display: block;\n      overflow: hidden;\n      border-top: 1px solid #d8d8d8; }\n      eds-tabs[vertical] .tab-labels li:last-child {\n        border-bottom: 1px solid #d8d8d8; }\n      eds-tabs[vertical] .tab-labels li a:hover {\n        border-left: 4px solid #d8d8d8;\n        border-bottom: none;\n        padding-left: 16px; }\n      eds-tabs[vertical] .tab-labels li a[aria-selected=\"true\"] {\n        border-left: 4px solid #e63888;\n        border-bottom: none;\n        padding-left: 16px; }\n\n@media only screen and (max-width: 480px) {\n  eds-tabs {\n    display: flex; }\n    eds-tabs .tab-labels {\n      height: fit-content;\n      flex: 0 0 180px;\n      border-right: 1px solid #d8d8d8;\n      border-bottom: none; }\n      eds-tabs .tab-labels li {\n        height: 50px;\n        line-height: 50px;\n        text-align: left;\n        display: block;\n        overflow: hidden;\n        border-top: 1px solid #d8d8d8; }\n        eds-tabs .tab-labels li:last-child {\n          border-bottom: 1px solid #d8d8d8; }\n        eds-tabs .tab-labels li a:hover {\n          border-left: 4px solid #d8d8d8;\n          border-bottom: none;\n          padding-left: 16px; }\n        eds-tabs .tab-labels li a[aria-selected=\"true\"] {\n          border-left: 4px solid #e63888;\n          border-bottom: none;\n          padding-left: 16px; } }\n\n.account__more {\n  position: absolute;\n  right: 0;\n  padding: 10px 15px;\n  top: 2px; }\n", ""]);

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
exports.push([module.i, ".mar-tp--0 {\n  margin-top: 0 !important; }\n\n.mar-rt--none {\n  margin-right: 0 !important; }\n\n.wdh-per--10 {\n  width: 10% !important; }\n\n.wdh-per--25 {\n  width: 25% !important; }\n\n.wdh-per--35 {\n  width: 35% !important; }\n\n.wdh-per--100 {\n  width: 100% !important; }\n\n.bor-tp--none {\n  border-top: none !important; }\n\n.bor-tpbt--none {\n  border-top: none !important;\n  border-bottom: none !important; }\n\n.txt-aln--rt {\n  text-align: right; }\n\n.search {\n  float: left;\n  width: 100%; }\n  .search__innercont {\n    width: 77%;\n    margin: 50px auto 0 auto; }\n  .search__heading {\n    font-size: 15px !important;\n    font-family: \"Roboto-Regular\" !important !important;\n    font-weight: normal !important;\n    color: #000000;\n    line-height: 1.33;\n    float: left; }\n  .search__callstats {\n    float: left;\n    width: 130px;\n    margin: 60px 46px 48px;\n    text-align: center;\n    position: relative;\n    min-height: 135px; }\n  .search__statcount {\n    font-size: 64px !important;\n    font-family: \"Roboto-Medium\" !important;\n    font-weight: normal !important;\n    color: #4e4e4e;\n    text-align: center;\n    position: relative; }\n  .search__statdesc {\n    font-size: 12px;\n    font-family: \"Roboto\" !important;\n    font-weight: normal !important;\n    color: #7a7a7a;\n    text-transform: uppercase;\n    margin-top: 32px;\n    text-align: center;\n    width: 100%;\n    line-height: 17px;\n    font-weight: bold !important; }\n  .search__visuallyhidden {\n    border: 0;\n    clip: rect(0 0 0 0);\n    height: 1px;\n    margin: -1px;\n    overflow: hidden;\n    padding: 0;\n    position: absolute;\n    width: 1px; }\n  .search__percentage {\n    font-size: 18px;\n    font-family: \"Roboto-Bold\" !important;\n    font-weight: normal !important;\n    color: #333333;\n    line-height: 0.83;\n    position: absolute;\n    bottom: -15px; }\n  .search--collected {\n    margin: 60px 10px 30px;\n    width: 150px; }\n  .search__bycont {\n    width: 100%;\n    border-radius: 4px;\n    background-color: #f6f6f6;\n    border: solid 1px #cccccc;\n    float: left;\n    padding: 20px 0;\n    margin-bottom: 52px; }\n  .search__form {\n    width: 70%;\n    margin: 0 auto; }\n    .search__form .btn {\n      border: none;\n      padding: 7px 0;\n      font-family: Roboto !important; }\n      .search__form .btn:hover {\n        background: #004590; }\n  .search__input {\n    background-color: #ffffff;\n    border: solid 1px #888888;\n    border-radius: 4px;\n    font-size: 16px;\n    font-family: \"Roboto-Regular\" !important;\n    font-weight: normal !important;\n    color: #aaaaaa;\n    padding: 5px 0px 5px 10px;\n    margin-right: 10px;\n    width: 239px; }\n    .search__input::-webkit-input-placeholder {\n      color: #aaaaaa;\n      font-weight: normal; }\n  .search__targetcont {\n    background: #ebe4ed;\n    border-radius: 30px;\n    width: 120%;\n    padding: 3px 0;\n    position: absolute;\n    left: 50%;\n    margin-left: -60%;\n    bottom: 0;\n    font-size: 16px;\n    font-family: \"Roboto-Regular\" !important;\n    font-weight: normal !important;\n    color: #426da9; }\n  .search__targeticon {\n    width: 16px;\n    height: 16px;\n    position: absolute;\n    left: 5px;\n    top: 5px; }\n  .search__statshead {\n    width: 545px;\n    margin: 0 auto; }\n  .search__daylist {\n    float: left; }\n  .search__daylistcont {\n    float: left;\n    margin-left: 20px; }\n  .search__daylabel {\n    position: relative;\n    cursor: pointer;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    padding: 1px 15px 0 30px;\n    font-size: 14px; }\n    .search__daylabel:hover .search__dayinput ~ .search__daycheckmark {\n      background-color: #ccc;\n      border: solid 1px #426da9; }\n  .search__dayinput {\n    position: absolute;\n    opacity: 0;\n    cursor: pointer; }\n    .search__dayinput:checked ~ .search__daycheckmark {\n      background-color: #fff;\n      border: solid 1px #426da9; }\n    .search__dayinput:checked ~ .search__daycheckmark:after {\n      display: block; }\n  .search__daycheckmark {\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 20px;\n    width: 20px;\n    background-color: #fff;\n    border: solid 1px #333;\n    border-radius: 50%; }\n    .search__daycheckmark:after {\n      content: \"\";\n      position: absolute;\n      display: none; }\n    .search__daycheckmark:after {\n      top: 50%;\n      left: 50%;\n      width: 10px;\n      height: 10px;\n      border-radius: 50%;\n      background: #426da9;\n      margin-left: -5px;\n      margin-top: -5px; }\n", ""]);

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

/***/ "./src/assets/images/add.png":
/*!***********************************!*\
  !*** ./src/assets/images/add.png ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/assets/images/add.png";

/***/ }),

/***/ "./src/assets/images/alert.png":
/*!*************************************!*\
  !*** ./src/assets/images/alert.png ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/assets/images/alert.png";

/***/ }),

/***/ "./src/assets/images/divert__icon.png":
/*!********************************************!*\
  !*** ./src/assets/images/divert__icon.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/assets/images/divert__icon.png";

/***/ }),

/***/ "./src/assets/images/document.png":
/*!****************************************!*\
  !*** ./src/assets/images/document.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/assets/images/document.png";

/***/ }),

/***/ "./src/assets/images/dwp-logo-transparent.png":
/*!****************************************************!*\
  !*** ./src/assets/images/dwp-logo-transparent.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/assets/images/dwp-logo-transparent.png";

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

/***/ "./src/assets/images/icon__IEInfo.png":
/*!********************************************!*\
  !*** ./src/assets/images/icon__IEInfo.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/assets/images/icon__IEInfo.png";

/***/ }),

/***/ "./src/assets/images/icon__ieaddrow.png":
/*!**********************************************!*\
  !*** ./src/assets/images/icon__ieaddrow.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/assets/images/icon__ieaddrow.png";

/***/ }),

/***/ "./src/assets/images/icon__ieclose.png":
/*!*********************************************!*\
  !*** ./src/assets/images/icon__ieclose.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/assets/images/icon__ieclose.png";

/***/ }),

/***/ "./src/assets/images/icon__ieprofile.png":
/*!***********************************************!*\
  !*** ./src/assets/images/icon__ieprofile.png ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/assets/images/icon__ieprofile.png";

/***/ }),

/***/ "./src/assets/images/icon_ie1.png":
/*!****************************************!*\
  !*** ./src/assets/images/icon_ie1.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/assets/images/icon_ie1.png";

/***/ }),

/***/ "./src/assets/images/icon_ie2.png":
/*!****************************************!*\
  !*** ./src/assets/images/icon_ie2.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/assets/images/icon_ie2.png";

/***/ }),

/***/ "./src/assets/images/left_arrow.png":
/*!******************************************!*\
  !*** ./src/assets/images/left_arrow.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/assets/images/left_arrow.png";

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

/***/ "./src/assets/images/right_arrow.png":
/*!*******************************************!*\
  !*** ./src/assets/images/right_arrow.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/assets/images/right_arrow.png";

/***/ }),

/***/ "./src/assets/images/upload_document.png":
/*!***********************************************!*\
  !*** ./src/assets/images/upload_document.png ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/assets/images/upload_document.png";

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
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/main.scss */ "./src/assets/styles/main.scss");
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_main_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _styles_header_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/header.scss */ "./src/assets/styles/header.scss");
/* harmony import */ var _styles_header_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_header_scss__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _styles_search_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styles/search.scss */ "./src/assets/styles/search.scss");
/* harmony import */ var _styles_search_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_search_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _styles_caseList_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../styles/caseList.scss */ "./src/assets/styles/caseList.scss");
/* harmony import */ var _styles_caseList_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_styles_caseList_scss__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../styles/style.css */ "./src/assets/styles/style.css");
/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_styles_style_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _styles_pcc_eds_secondary_header_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../styles/pcc-eds-secondary-header.scss */ "./src/assets/styles/pcc-eds-secondary-header.scss");
/* harmony import */ var _styles_pcc_eds_secondary_header_scss__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_styles_pcc_eds_secondary_header_scss__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _styles_demo_pcc_overview_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../styles/demo-pcc-overview.scss */ "./src/assets/styles/demo-pcc-overview.scss");
/* harmony import */ var _styles_demo_pcc_overview_scss__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_styles_demo_pcc_overview_scss__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _styles_pcc_accordian_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../styles/pcc-accordian.scss */ "./src/assets/styles/pcc-accordian.scss");
/* harmony import */ var _styles_pcc_accordian_scss__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_styles_pcc_accordian_scss__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _styles_eds_card_scss__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../styles/eds-card.scss */ "./src/assets/styles/eds-card.scss");
/* harmony import */ var _styles_eds_card_scss__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_styles_eds_card_scss__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _styles_eds_dropdown_scss__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../styles/eds-dropdown.scss */ "./src/assets/styles/eds-dropdown.scss");
/* harmony import */ var _styles_eds_dropdown_scss__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_styles_eds_dropdown_scss__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _styles_eds_icon_scss__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../styles/eds-icon.scss */ "./src/assets/styles/eds-icon.scss");
/* harmony import */ var _styles_eds_icon_scss__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_styles_eds_icon_scss__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _styles_eds_timeline_item_scss__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../styles/eds-timeline-item.scss */ "./src/assets/styles/eds-timeline-item.scss");
/* harmony import */ var _styles_eds_timeline_item_scss__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_styles_eds_timeline_item_scss__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _styles_eds_tag_scss__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../styles/eds-tag.scss */ "./src/assets/styles/eds-tag.scss");
/* harmony import */ var _styles_eds_tag_scss__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_styles_eds_tag_scss__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _styles_activities_scss__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../styles/activities.scss */ "./src/assets/styles/activities.scss");
/* harmony import */ var _styles_activities_scss__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_styles_activities_scss__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _styles_login_scss__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../styles/login.scss */ "./src/assets/styles/login.scss");
/* harmony import */ var _styles_login_scss__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_styles_login_scss__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _scripts_promise_pay_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../scripts/promise-pay.js */ "./src/assets/scripts/promise-pay.js");
/* harmony import */ var _scripts_promise_pay_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_scripts_promise_pay_js__WEBPACK_IMPORTED_MODULE_19__);





















/***/ }),

/***/ "./src/assets/scripts/promise-pay.js":
/*!*******************************************!*\
  !*** ./src/assets/scripts/promise-pay.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

switchTab = function switchTab(documentId, selectedTabClassName, thisParam) {
  var idElement = document.getElementById(documentId);
  var classElement = document.getElementsByClassName(selectedTabClassName);
  var activeTabElement = document.getElementsByClassName("promisepay--navtablinkactive");
  activeTabElement[0].setAttribute("aria-selected", false);
  activeTabElement[0].classList.remove("promisepay--navtablinkactive");
  thisParam.classList.add("promisepay--navtablinkactive");
  thisParam.setAttribute("aria-selected", true);
  classElement[0].classList.remove(selectedTabClassName);
  idElement.classList.add(selectedTabClassName);
};

switchParentTab = function switchParentTab(tabId, focusOnNotes) {
  var tabElement = document.getElementById("tab-" + tabId);
  var panelElement = document.getElementById("tab-panel-" + tabId);
  var panelElements = document.getElementsByClassName("accountsTabPanel");
  var tabElements = document.getElementsByClassName("accountsTab");

  for (var i = 0; i <= tabElements.length; i++) {
    var element = tabElements[i];
    /*if (tabId == 3 && element && element.id === "tab-0") {
    	element.setAttribute("aria-selected", true);
    } else*/

    if (element) {
      element.setAttribute("aria-selected", false);
    }
  }

  for (var _i = 0; _i <= panelElements.length; _i++) {
    var _element = panelElements[_i];

    if (_element) {
      _element.removeAttribute("active");

      _element.setAttribute("aria-hidden", true);

      _element.setAttribute("tabindex", "-1");
    }
  }

  tabElement.setAttribute("aria-selected", true);
  panelElement.setAttribute("active", true);
  panelElement.setAttribute("aria-hidden", false);
  panelElement.setAttribute("tabindex", "0"); // if (tabId == 3) {
  // 	document.getElementById("promiseActivity").click();
  // 	document.getElementById("promise__actsection").children[0].children[1].children[0].classList.add("promisepay--linkactive");
  // }
  // let accountsActivityElement = document.getElementById("accountsActivity");
  // if (focusOnNotes) {
  // 	let accountsNotesElement = accountsActivityElement.children[1];
  // 	getElement("accountsActivity", false, 0, accountsNotesElement, true);
  // 	let noteElement = document.getElementById("notes__text");
  // 		noteElement.focus();
  // } else {
  // 	let accountsNotesElement = accountsActivityElement.children[1];
  // 	getElement("accountsActivity", true, -1, accountsNotesElement);
  // }
};

gotoPage = function gotoPage(pagePath) {
  window.location.href = pagePath;
};

setTabAria = function setTabAria(element, setProperty, setTabindex, removeAttr) {
  if (element && !removeAttr) {
    element.setAttribute("aria-hidden", setProperty);
    element.setAttribute("tabindex", setTabindex);
  } else if (element && removeAttr) {
    element.removeAttribute("aria-hidden");
    element.removeAttribute("tabindex");
  }
};

setAllElements = function (_setAllElements) {
  function setAllElements(_x, _x2, _x3, _x4) {
    return _setAllElements.apply(this, arguments);
  }

  setAllElements.toString = function () {
    return _setAllElements.toString();
  };

  return setAllElements;
}(function (elements, setProperty, setTabindex, removeAttr) {
  for (var i = 0; i <= elements.length; i++) {
    var element = elements[i];
    setTabAria(element, setProperty, setTabindex, removeAttr);

    if (element && element.children && element.children.length) {
      setAllElements(element.children, setProperty, setTabindex, removeAttr);
    }
  }
});

getElement = function getElement(elementId, setProperty, setTabindex, element, removeAttr) {
  var activityElement = element || document.getElementById(elementId);
  setTabAria(activityElement, setProperty, setTabindex, removeAttr);

  if (activityElement && activityElement.children && activityElement.children.length) {
    setAllElements(activityElement.children, setProperty, setTabindex, removeAttr);
  }
};

getElement("profileActivities", true, -1);
getElement("promise__actsection", true, -1);
getElement("promiseProfile", true, -1);
var accountsActivityElement = document.getElementById("accountsActivity");

if (accountsActivityElement) {
  var accountsNotesElement = accountsActivityElement.children[1];
  getElement("accountsActivity", true, -1, accountsNotesElement);
}

var profileElement = document.getElementById("profileContact");

if (profileElement) {
  var profileThirdElement = profileElement.children[2];
  getElement("profileContact", true, -1, profileThirdElement);
}

toggleMemo = function toggleMemo() {
  var memoElement = document.getElementsByClassName("memodetail");

  for (var i = 0; i <= memoElement.length; i++) {
    var element = memoElement[i];
    var activeValue = element.getAttribute("active") == "true" ? false : true;
    element.setAttribute("active", activeValue);
    element.children[0].setAttribute("aria-expanded", activeValue);
  }
}; // document.addEventListener('focus',function(e){
// 	console.log(e);
// }, true);


addRemoveClass = function addRemoveClass(headingId, panelId) {
  var collectionElement = document.getElementById(headingId);
  var collectionPanel = document.getElementById(panelId);
  collectionElement.addEventListener('focus', function (e) {
    collectionPanel.classList.add("focus");
  }, true);
  collectionElement.addEventListener('blur', function (e) {
    collectionPanel.classList.remove("focus");
  }, true);
};

var path = window.location.pathname;
var page = path.split("/").pop();

if (page && page !== "index.html" && page !== "dashboard.html") {
  // document.getElementsByClassName("textNote")[1].removeAttribute("for");
  // document.getElementsByClassName("textNote")[2].removeAttribute("for");	
  addRemoveClass("accountFirstHeading", "accountFirstPanel");
  addRemoveClass("collectionHeading", "collectionPanel");
  switchParentTab(2);
}

showhideblocks = function showhideblocks(showElementId, hideElementId) {
  document.getElementById(showElementId).style.display = "block";
  if (hideElementId) document.getElementById(hideElementId).style.display = "none";
};

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

/***/ "./src/assets/styles/login.scss":
/*!**************************************!*\
  !*** ./src/assets/styles/login.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./login.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/login.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./login.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/login.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./login.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/login.scss");

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

/***/ "./src/assets/styles/main.scss":
/*!*************************************!*\
  !*** ./src/assets/styles/main.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./main.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/main.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./main.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/main.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./main.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/main.scss");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21hdGVyaWFsLWljb25zL2ljb25mb250L21hdGVyaWFsLWljb25zLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2Nzcy9yb2JvdG8vcm9ib3RvLWZvbnRmYWNlLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9hY3Rpdml0aWVzLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXMvYXBwLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXMvY2FzZUxpc3Quc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9kZW1vLXBjYy1vdmVydmlldy5zY3NzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL2Vkcy1jYXJkLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXMvZWRzLWRyb3Bkb3duLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXMvZWRzLWdsb2JhbC1zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9lZHMtaWNvbi5zY3NzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL2Vkcy10YWcuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9lZHMtdGltZWxpbmUtaXRlbS5zY3NzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL2hlYWRlci5zY3NzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL2xvZ2luLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXMvbWFpbi5zY3NzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL3BjYy1hY2NvcmRpYW4uc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9wY2MtZWRzLXNlY29uZGFyeS1oZWFkZXIuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9zZWFyY2guc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi91cmwvZXNjYXBlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tYXRlcmlhbC1pY29ucy9pY29uZm9udC9NYXRlcmlhbEljb25zLVJlZ3VsYXIuZW90Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tYXRlcmlhbC1pY29ucy9pY29uZm9udC9NYXRlcmlhbEljb25zLVJlZ3VsYXIudHRmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tYXRlcmlhbC1pY29ucy9pY29uZm9udC9NYXRlcmlhbEljb25zLVJlZ3VsYXIud29mZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWF0ZXJpYWwtaWNvbnMvaWNvbmZvbnQvTWF0ZXJpYWxJY29ucy1SZWd1bGFyLndvZmYyIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tYXRlcmlhbC1pY29ucy9pY29uZm9udC9tYXRlcmlhbC1pY29ucy5jc3M/MWU5YyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2Nzcy9yb2JvdG8vcm9ib3RvLWZvbnRmYWNlLmNzcz8zMTZiIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb2JvdG8tZm9udGZhY2UvZm9udHMvcm9ib3RvL1JvYm90by1CbGFjay53b2ZmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb2JvdG8tZm9udGZhY2UvZm9udHMvcm9ib3RvL1JvYm90by1CbGFjay53b2ZmMiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2ZvbnRzL3JvYm90by9Sb2JvdG8tQmxhY2tJdGFsaWMud29mZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2ZvbnRzL3JvYm90by9Sb2JvdG8tQmxhY2tJdGFsaWMud29mZjIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvYm90by1mb250ZmFjZS9mb250cy9yb2JvdG8vUm9ib3RvLUJvbGQud29mZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2ZvbnRzL3JvYm90by9Sb2JvdG8tQm9sZC53b2ZmMiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2ZvbnRzL3JvYm90by9Sb2JvdG8tQm9sZEl0YWxpYy53b2ZmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb2JvdG8tZm9udGZhY2UvZm9udHMvcm9ib3RvL1JvYm90by1Cb2xkSXRhbGljLndvZmYyIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb2JvdG8tZm9udGZhY2UvZm9udHMvcm9ib3RvL1JvYm90by1MaWdodC53b2ZmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb2JvdG8tZm9udGZhY2UvZm9udHMvcm9ib3RvL1JvYm90by1MaWdodC53b2ZmMiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2ZvbnRzL3JvYm90by9Sb2JvdG8tTGlnaHRJdGFsaWMud29mZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2ZvbnRzL3JvYm90by9Sb2JvdG8tTGlnaHRJdGFsaWMud29mZjIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvYm90by1mb250ZmFjZS9mb250cy9yb2JvdG8vUm9ib3RvLU1lZGl1bS53b2ZmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb2JvdG8tZm9udGZhY2UvZm9udHMvcm9ib3RvL1JvYm90by1NZWRpdW0ud29mZjIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvYm90by1mb250ZmFjZS9mb250cy9yb2JvdG8vUm9ib3RvLU1lZGl1bUl0YWxpYy53b2ZmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb2JvdG8tZm9udGZhY2UvZm9udHMvcm9ib3RvL1JvYm90by1NZWRpdW1JdGFsaWMud29mZjIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvYm90by1mb250ZmFjZS9mb250cy9yb2JvdG8vUm9ib3RvLVJlZ3VsYXIud29mZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2ZvbnRzL3JvYm90by9Sb2JvdG8tUmVndWxhci53b2ZmMiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2ZvbnRzL3JvYm90by9Sb2JvdG8tUmVndWxhckl0YWxpYy53b2ZmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb2JvdG8tZm9udGZhY2UvZm9udHMvcm9ib3RvL1JvYm90by1SZWd1bGFySXRhbGljLndvZmYyIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb2JvdG8tZm9udGZhY2UvZm9udHMvcm9ib3RvL1JvYm90by1UaGluLndvZmYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvYm90by1mb250ZmFjZS9mb250cy9yb2JvdG8vUm9ib3RvLVRoaW4ud29mZjIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvYm90by1mb250ZmFjZS9mb250cy9yb2JvdG8vUm9ib3RvLVRoaW5JdGFsaWMud29mZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2ZvbnRzL3JvYm90by9Sb2JvdG8tVGhpbkl0YWxpYy53b2ZmMiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy9hZGQucG5nIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2FsZXJ0LnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy9kaXZlcnRfX2ljb24ucG5nIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2RvY3VtZW50LnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy9kd3AtbG9nby10cmFuc3BhcmVudC5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvZXhwZXJpYW5fX2xvZ29sYXRlc3QucG5nIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ZpbGVfX2ljb24ucG5nIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ljb25fX0lFSW5mby5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvaWNvbl9faWVhZGRyb3cucG5nIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ljb25fX2llY2xvc2UucG5nIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ljb25fX2llcHJvZmlsZS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvaWNvbl9pZTEucG5nIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ljb25faWUyLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy9sZWZ0X2Fycm93LnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy9uZXh0X19pY29uLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy9wcm9maWxlX19pY29uLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy9yaWdodF9hcnJvdy5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvdXBsb2FkX2RvY3VtZW50LnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy91c2VyX19pY29uLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy91c2VyZm9sZGVyX2ljb24ucG5nIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3NjcmlwdHMvcHJvbWlzZS1wYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXMvYWN0aXZpdGllcy5zY3NzPzQ3MTEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXMvYXBwLnNjc3M/MTc3ZSIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9jYXNlTGlzdC5zY3NzPzExNjMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXMvZGVtby1wY2Mtb3ZlcnZpZXcuc2Nzcz80M2ZlIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL2Vkcy1jYXJkLnNjc3M/YTgwNCIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9lZHMtZHJvcGRvd24uc2Nzcz80ZmFlIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL2Vkcy1nbG9iYWwtc3R5bGVzLnNjc3M/ZTRlYyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9lZHMtaWNvbi5zY3NzP2I5NDEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXMvZWRzLXRhZy5zY3NzPzEwOTkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXMvZWRzLXRpbWVsaW5lLWl0ZW0uc2Nzcz8yZjNlIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL2hlYWRlci5zY3NzP2IyN2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXMvbG9naW4uc2Nzcz9lNjc5Iiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL21haW4uc2Nzcz8wZTQ0Iiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL3BjYy1hY2NvcmRpYW4uc2Nzcz9iZmZhIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL3BjYy1lZHMtc2Vjb25kYXJ5LWhlYWRlci5zY3NzPzNjNDkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXMvc2VhcmNoLnNjc3M/MmRiYSIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9zdHlsZS5jc3M/Mjg2NiJdLCJuYW1lcyI6WyJzd2l0Y2hUYWIiLCJkb2N1bWVudElkIiwic2VsZWN0ZWRUYWJDbGFzc05hbWUiLCJ0aGlzUGFyYW0iLCJpZEVsZW1lbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY2xhc3NFbGVtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImFjdGl2ZVRhYkVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJzd2l0Y2hQYXJlbnRUYWIiLCJ0YWJJZCIsImZvY3VzT25Ob3RlcyIsInRhYkVsZW1lbnQiLCJwYW5lbEVsZW1lbnQiLCJwYW5lbEVsZW1lbnRzIiwidGFiRWxlbWVudHMiLCJpIiwibGVuZ3RoIiwiZWxlbWVudCIsInJlbW92ZUF0dHJpYnV0ZSIsImdvdG9QYWdlIiwicGFnZVBhdGgiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJzZXRUYWJBcmlhIiwic2V0UHJvcGVydHkiLCJzZXRUYWJpbmRleCIsInJlbW92ZUF0dHIiLCJzZXRBbGxFbGVtZW50cyIsImVsZW1lbnRzIiwiY2hpbGRyZW4iLCJnZXRFbGVtZW50IiwiZWxlbWVudElkIiwiYWN0aXZpdHlFbGVtZW50IiwiYWNjb3VudHNBY3Rpdml0eUVsZW1lbnQiLCJhY2NvdW50c05vdGVzRWxlbWVudCIsInByb2ZpbGVFbGVtZW50IiwicHJvZmlsZVRoaXJkRWxlbWVudCIsInRvZ2dsZU1lbW8iLCJtZW1vRWxlbWVudCIsImFjdGl2ZVZhbHVlIiwiZ2V0QXR0cmlidXRlIiwiYWRkUmVtb3ZlQ2xhc3MiLCJoZWFkaW5nSWQiLCJwYW5lbElkIiwiY29sbGVjdGlvbkVsZW1lbnQiLCJjb2xsZWN0aW9uUGFuZWwiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInBhdGgiLCJwYXRobmFtZSIsInBhZ2UiLCJzcGxpdCIsInBvcCIsInNob3doaWRlYmxvY2tzIiwic2hvd0VsZW1lbnRJZCIsImhpZGVFbGVtZW50SWQiLCJzdHlsZSIsImRpc3BsYXkiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDhCQUE4QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7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Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsNkI7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsa0M7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsbUM7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsNkI7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsOEI7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsbUM7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsb0M7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsOEI7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsK0I7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsb0M7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIscUM7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsK0I7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsZ0M7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIscUM7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsc0M7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsNEI7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsNkI7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsa0M7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsbUM7Ozs7Ozs7Ozs7O0FDQXhDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUEsY0FBYyxtQkFBTyxDQUFDLHVEQUFROztBQUU5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLG1CQUFtQjtBQUNwQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsc0JBQXNCO0FBQ3ZDOztBQUVBO0FBQ0EsbUJBQW1CLDJCQUEyQjs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQixtQkFBbUI7QUFDbkM7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQiwyQkFBMkI7QUFDNUM7QUFDQTs7QUFFQSxRQUFRLHVCQUF1QjtBQUMvQjtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGlCQUFpQix1QkFBdUI7QUFDeEM7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjOztBQUVkLGtEQUFrRCxzQkFBc0I7QUFDeEU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQSxLQUFLLEtBQXdDLEVBQUUsRUFFN0M7O0FBRUYsUUFBUSxzQkFBaUI7QUFDekI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQzVZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVyxFQUFFO0FBQ3JELHdDQUF3QyxXQUFXLEVBQUU7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esc0NBQXNDO0FBQ3RDLEdBQUc7QUFDSDtBQUNBLDhEQUE4RDtBQUM5RDs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3hGQSxpQkFBaUIscUJBQXVCLCtCOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLGlDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLHdDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLG9DOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLGdEOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLGdEOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLHNDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLHdDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLDBDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLHlDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLDJDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLG9DOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLG9DOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLHNDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLHNDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLHlDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLHVDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLDJDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLHNDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLDJDOzs7Ozs7Ozs7Ozs7QUNBeEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNuQkFBLFNBQVMsR0FBRyxtQkFBVUMsVUFBVixFQUFzQkMsb0JBQXRCLEVBQTRDQyxTQUE1QyxFQUF1RDtBQUNsRSxNQUFJQyxTQUFTLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QkwsVUFBeEIsQ0FBaEI7QUFDQSxNQUFJTSxZQUFZLEdBQUdGLFFBQVEsQ0FBQ0csc0JBQVQsQ0FBZ0NOLG9CQUFoQyxDQUFuQjtBQUNBLE1BQUlPLGdCQUFnQixHQUFHSixRQUFRLENBQUNHLHNCQUFULENBQWdDLDhCQUFoQyxDQUF2QjtBQUNBQyxrQkFBZ0IsQ0FBQyxDQUFELENBQWhCLENBQW9CQyxZQUFwQixDQUFpQyxlQUFqQyxFQUFrRCxLQUFsRDtBQUNBRCxrQkFBZ0IsQ0FBQyxDQUFELENBQWhCLENBQW9CRSxTQUFwQixDQUE4QkMsTUFBOUIsQ0FBcUMsOEJBQXJDO0FBQ0FULFdBQVMsQ0FBQ1EsU0FBVixDQUFvQkUsR0FBcEIsQ0FBd0IsOEJBQXhCO0FBQ0FWLFdBQVMsQ0FBQ08sWUFBVixDQUF1QixlQUF2QixFQUF3QyxJQUF4QztBQUNBSCxjQUFZLENBQUMsQ0FBRCxDQUFaLENBQWdCSSxTQUFoQixDQUEwQkMsTUFBMUIsQ0FBaUNWLG9CQUFqQztBQUNBRSxXQUFTLENBQUNPLFNBQVYsQ0FBb0JFLEdBQXBCLENBQXdCWCxvQkFBeEI7QUFDQSxDQVZEOztBQVlBWSxlQUFlLEdBQUcseUJBQVVDLEtBQVYsRUFBaUJDLFlBQWpCLEVBQStCO0FBQ2hELE1BQUlDLFVBQVUsR0FBR1osUUFBUSxDQUFDQyxjQUFULENBQXdCLFNBQU9TLEtBQS9CLENBQWpCO0FBQ0EsTUFBSUcsWUFBWSxHQUFHYixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsZUFBYVMsS0FBckMsQ0FBbkI7QUFDQSxNQUFJSSxhQUFhLEdBQUdkLFFBQVEsQ0FBQ0csc0JBQVQsQ0FBZ0Msa0JBQWhDLENBQXBCO0FBQ0EsTUFBSVksV0FBVyxHQUFHZixRQUFRLENBQUNHLHNCQUFULENBQWdDLGFBQWhDLENBQWxCOztBQUNBLE9BQUssSUFBSWEsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsSUFBSUQsV0FBVyxDQUFDRSxNQUFqQyxFQUF5Q0QsQ0FBQyxFQUExQyxFQUE4QztBQUM3QyxRQUFJRSxPQUFPLEdBQUdILFdBQVcsQ0FBQ0MsQ0FBRCxDQUF6QjtBQUNBOzs7O0FBRVMsUUFBSUUsT0FBSixFQUFhO0FBQ3JCQSxhQUFPLENBQUNiLFlBQVIsQ0FBcUIsZUFBckIsRUFBc0MsS0FBdEM7QUFDQTtBQUNEOztBQUNELE9BQUssSUFBSVcsRUFBQyxHQUFHLENBQWIsRUFBZ0JBLEVBQUMsSUFBSUYsYUFBYSxDQUFDRyxNQUFuQyxFQUEyQ0QsRUFBQyxFQUE1QyxFQUFnRDtBQUMvQyxRQUFJRSxRQUFPLEdBQUdKLGFBQWEsQ0FBQ0UsRUFBRCxDQUEzQjs7QUFDQSxRQUFJRSxRQUFKLEVBQWE7QUFDWkEsY0FBTyxDQUFDQyxlQUFSLENBQXdCLFFBQXhCOztBQUNBRCxjQUFPLENBQUNiLFlBQVIsQ0FBcUIsYUFBckIsRUFBb0MsSUFBcEM7O0FBQ0FhLGNBQU8sQ0FBQ2IsWUFBUixDQUFxQixVQUFyQixFQUFpQyxJQUFqQztBQUNBO0FBQ0Q7O0FBQ0RPLFlBQVUsQ0FBQ1AsWUFBWCxDQUF3QixlQUF4QixFQUF5QyxJQUF6QztBQUNBUSxjQUFZLENBQUNSLFlBQWIsQ0FBMEIsUUFBMUIsRUFBb0MsSUFBcEM7QUFDQVEsY0FBWSxDQUFDUixZQUFiLENBQTBCLGFBQTFCLEVBQXlDLEtBQXpDO0FBQ0FRLGNBQVksQ0FBQ1IsWUFBYixDQUEwQixVQUExQixFQUFzQyxHQUF0QyxFQXhCZ0QsQ0F5QmhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQXZDRDs7QUF5Q0FlLFFBQVEsR0FBRyxrQkFBVUMsUUFBVixFQUFvQjtBQUM5QkMsUUFBTSxDQUFDQyxRQUFQLENBQWdCQyxJQUFoQixHQUF1QkgsUUFBdkI7QUFDQSxDQUZEOztBQUlBSSxVQUFVLEdBQUcsb0JBQVVQLE9BQVYsRUFBbUJRLFdBQW5CLEVBQWdDQyxXQUFoQyxFQUE2Q0MsVUFBN0MsRUFBeUQ7QUFDckUsTUFBSVYsT0FBTyxJQUFJLENBQUNVLFVBQWhCLEVBQTRCO0FBQzNCVixXQUFPLENBQUNiLFlBQVIsQ0FBcUIsYUFBckIsRUFBb0NxQixXQUFwQztBQUNBUixXQUFPLENBQUNiLFlBQVIsQ0FBcUIsVUFBckIsRUFBaUNzQixXQUFqQztBQUNBLEdBSEQsTUFHTyxJQUFJVCxPQUFPLElBQUlVLFVBQWYsRUFBMkI7QUFDakNWLFdBQU8sQ0FBQ0MsZUFBUixDQUF3QixhQUF4QjtBQUNBRCxXQUFPLENBQUNDLGVBQVIsQ0FBd0IsVUFBeEI7QUFDQTtBQUNELENBUkQ7O0FBVUFVLGNBQWM7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsRUFBRyxVQUFVQyxRQUFWLEVBQW9CSixXQUFwQixFQUFpQ0MsV0FBakMsRUFBOENDLFVBQTlDLEVBQTBEO0FBQzFFLE9BQUssSUFBSVosQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsSUFBSWMsUUFBUSxDQUFDYixNQUE5QixFQUFzQ0QsQ0FBQyxFQUF2QyxFQUEyQztBQUMxQyxRQUFJRSxPQUFPLEdBQUdZLFFBQVEsQ0FBQ2QsQ0FBRCxDQUF0QjtBQUNBUyxjQUFVLENBQUNQLE9BQUQsRUFBVVEsV0FBVixFQUF1QkMsV0FBdkIsRUFBb0NDLFVBQXBDLENBQVY7O0FBQ0EsUUFBSVYsT0FBTyxJQUFJQSxPQUFPLENBQUNhLFFBQW5CLElBQStCYixPQUFPLENBQUNhLFFBQVIsQ0FBaUJkLE1BQXBELEVBQTREO0FBQzNEWSxvQkFBYyxDQUFDWCxPQUFPLENBQUNhLFFBQVQsRUFBbUJMLFdBQW5CLEVBQWdDQyxXQUFoQyxFQUE2Q0MsVUFBN0MsQ0FBZDtBQUNBO0FBQ0Q7QUFDRCxDQVJhLENBQWQ7O0FBVUFJLFVBQVUsR0FBRyxvQkFBVUMsU0FBVixFQUFxQlAsV0FBckIsRUFBa0NDLFdBQWxDLEVBQStDVCxPQUEvQyxFQUF3RFUsVUFBeEQsRUFBb0U7QUFDaEYsTUFBSU0sZUFBZSxHQUFHaEIsT0FBTyxJQUFJbEIsUUFBUSxDQUFDQyxjQUFULENBQXdCZ0MsU0FBeEIsQ0FBakM7QUFDQ1IsWUFBVSxDQUFDUyxlQUFELEVBQWtCUixXQUFsQixFQUErQkMsV0FBL0IsRUFBNENDLFVBQTVDLENBQVY7O0FBQ0QsTUFBSU0sZUFBZSxJQUFJQSxlQUFlLENBQUNILFFBQW5DLElBQStDRyxlQUFlLENBQUNILFFBQWhCLENBQXlCZCxNQUE1RSxFQUFvRjtBQUNuRlksa0JBQWMsQ0FBQ0ssZUFBZSxDQUFDSCxRQUFqQixFQUEyQkwsV0FBM0IsRUFBd0NDLFdBQXhDLEVBQXFEQyxVQUFyRCxDQUFkO0FBQ0E7QUFDRCxDQU5EOztBQVFBSSxVQUFVLENBQUMsbUJBQUQsRUFBc0IsSUFBdEIsRUFBNEIsQ0FBQyxDQUE3QixDQUFWO0FBQ0FBLFVBQVUsQ0FBQyxxQkFBRCxFQUF3QixJQUF4QixFQUE4QixDQUFDLENBQS9CLENBQVY7QUFDQUEsVUFBVSxDQUFDLGdCQUFELEVBQW1CLElBQW5CLEVBQXlCLENBQUMsQ0FBMUIsQ0FBVjtBQUNBLElBQUlHLHVCQUF1QixHQUFHbkMsUUFBUSxDQUFDQyxjQUFULENBQXdCLGtCQUF4QixDQUE5Qjs7QUFDQSxJQUFJa0MsdUJBQUosRUFBNEI7QUFDM0IsTUFBSUMsb0JBQW9CLEdBQUdELHVCQUF1QixDQUFDSixRQUF4QixDQUFpQyxDQUFqQyxDQUEzQjtBQUNBQyxZQUFVLENBQUMsa0JBQUQsRUFBcUIsSUFBckIsRUFBMkIsQ0FBQyxDQUE1QixFQUErQkksb0JBQS9CLENBQVY7QUFDQTs7QUFDRCxJQUFJQyxjQUFjLEdBQUdyQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsZ0JBQXhCLENBQXJCOztBQUNBLElBQUlvQyxjQUFKLEVBQW9CO0FBQ25CLE1BQUlDLG1CQUFtQixHQUFHRCxjQUFjLENBQUNOLFFBQWYsQ0FBd0IsQ0FBeEIsQ0FBMUI7QUFDQUMsWUFBVSxDQUFDLGdCQUFELEVBQW1CLElBQW5CLEVBQXlCLENBQUMsQ0FBMUIsRUFBNkJNLG1CQUE3QixDQUFWO0FBQ0E7O0FBRURDLFVBQVUsR0FBRyxzQkFBWTtBQUN4QixNQUFJQyxXQUFXLEdBQUd4QyxRQUFRLENBQUNHLHNCQUFULENBQWdDLFlBQWhDLENBQWxCOztBQUNBLE9BQUssSUFBSWEsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsSUFBSXdCLFdBQVcsQ0FBQ3ZCLE1BQWpDLEVBQXlDRCxDQUFDLEVBQTFDLEVBQTZDO0FBQzVDLFFBQUlFLE9BQU8sR0FBR3NCLFdBQVcsQ0FBQ3hCLENBQUQsQ0FBekI7QUFDQSxRQUFJeUIsV0FBVyxHQUFHdkIsT0FBTyxDQUFDd0IsWUFBUixDQUFxQixRQUFyQixLQUFrQyxNQUFsQyxHQUEyQyxLQUEzQyxHQUFtRCxJQUFyRTtBQUNBeEIsV0FBTyxDQUFDYixZQUFSLENBQXFCLFFBQXJCLEVBQStCb0MsV0FBL0I7QUFDQXZCLFdBQU8sQ0FBQ2EsUUFBUixDQUFpQixDQUFqQixFQUFvQjFCLFlBQXBCLENBQWlDLGVBQWpDLEVBQWtEb0MsV0FBbEQ7QUFDQTtBQUNELENBUkQsQyxDQVVBO0FBQ0E7QUFDQTs7O0FBQ0FFLGNBQWMsR0FBRyx3QkFBVUMsU0FBVixFQUFxQkMsT0FBckIsRUFBOEI7QUFDOUMsTUFBSUMsaUJBQWlCLEdBQUc5QyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IyQyxTQUF4QixDQUF4QjtBQUNBLE1BQUlHLGVBQWUsR0FBRy9DLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QjRDLE9BQXhCLENBQXRCO0FBQ0FDLG1CQUFpQixDQUFDRSxnQkFBbEIsQ0FBbUMsT0FBbkMsRUFBMkMsVUFBU0MsQ0FBVCxFQUFXO0FBQ3JERixtQkFBZSxDQUFDekMsU0FBaEIsQ0FBMEJFLEdBQTFCLENBQThCLE9BQTlCO0FBQ0EsR0FGRCxFQUVHLElBRkg7QUFHQXNDLG1CQUFpQixDQUFDRSxnQkFBbEIsQ0FBbUMsTUFBbkMsRUFBMEMsVUFBU0MsQ0FBVCxFQUFXO0FBQ3BERixtQkFBZSxDQUFDekMsU0FBaEIsQ0FBMEJDLE1BQTFCLENBQWlDLE9BQWpDO0FBQ0EsR0FGRCxFQUVHLElBRkg7QUFHQSxDQVREOztBQVVBLElBQU0yQyxJQUFJLEdBQUc1QixNQUFNLENBQUNDLFFBQVAsQ0FBZ0I0QixRQUE3QjtBQUNBLElBQU1DLElBQUksR0FBR0YsSUFBSSxDQUFDRyxLQUFMLENBQVcsR0FBWCxFQUFnQkMsR0FBaEIsRUFBYjs7QUFDQSxJQUFJRixJQUFJLElBQUlBLElBQUksS0FBSyxZQUFqQixJQUFpQ0EsSUFBSSxLQUFLLGdCQUE5QyxFQUFnRTtBQUMvRDtBQUNBO0FBQ0FULGdCQUFjLENBQUMscUJBQUQsRUFBd0IsbUJBQXhCLENBQWQ7QUFDQUEsZ0JBQWMsQ0FBQyxtQkFBRCxFQUFzQixpQkFBdEIsQ0FBZDtBQUNBbEMsaUJBQWUsQ0FBQyxDQUFELENBQWY7QUFDQTs7QUFDRDhDLGNBQWMsR0FBRyx3QkFBVUMsYUFBVixFQUF5QkMsYUFBekIsRUFBd0M7QUFDeER6RCxVQUFRLENBQUNDLGNBQVQsQ0FBd0J1RCxhQUF4QixFQUF1Q0UsS0FBdkMsQ0FBNkNDLE9BQTdDLEdBQXVELE9BQXZEO0FBQ0EsTUFBSUYsYUFBSixFQUFtQnpELFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QndELGFBQXhCLEVBQXVDQyxLQUF2QyxDQUE2Q0MsT0FBN0MsR0FBdUQsTUFBdkQ7QUFDbkIsQ0FIRCxDOzs7Ozs7Ozs7Ozs7QUNsSUEsY0FBYyxtQkFBTyxDQUFDLDROQUErRzs7QUFFckksNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHlHQUFzRDs7QUFFM0U7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLDROQUErRztBQUNsSSxtQkFBbUIsbUJBQU8sQ0FBQyw0TkFBK0c7O0FBRTFJLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7QUMzQ0EsY0FBYyxtQkFBTyxDQUFDLDhNQUF3Rzs7QUFFOUgsNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHlHQUFzRDs7QUFFM0U7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLDhNQUF3RztBQUMzSCxtQkFBbUIsbUJBQU8sQ0FBQyw4TUFBd0c7O0FBRW5JLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7QUMzQ0EsY0FBYyxtQkFBTyxDQUFDLHdOQUE2Rzs7QUFFbkksNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHlHQUFzRDs7QUFFM0U7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLHdOQUE2RztBQUNoSSxtQkFBbUIsbUJBQU8sQ0FBQyx3TkFBNkc7O0FBRXhJLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7QUMzQ0EsY0FBYyxtQkFBTyxDQUFDLDBPQUFzSDs7QUFFNUksNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHlHQUFzRDs7QUFFM0U7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLDBPQUFzSDtBQUN6SSxtQkFBbUIsbUJBQU8sQ0FBQywwT0FBc0g7O0FBRWpKLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7QUMzQ0EsY0FBYyxtQkFBTyxDQUFDLHdOQUE2Rzs7QUFFbkksNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHlHQUFzRDs7QUFFM0U7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLHdOQUE2RztBQUNoSSxtQkFBbUIsbUJBQU8sQ0FBQyx3TkFBNkc7O0FBRXhJLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7QUMzQ0EsY0FBYyxtQkFBTyxDQUFDLGdPQUFpSDs7QUFFdkksNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHlHQUFzRDs7QUFFM0U7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLGdPQUFpSDtBQUNwSSxtQkFBbUIsbUJBQU8sQ0FBQyxnT0FBaUg7O0FBRTVJLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7QUMzQ0EsY0FBYyxtQkFBTyxDQUFDLDBPQUFzSDs7QUFFNUksNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHlHQUFzRDs7QUFFM0U7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLDBPQUFzSDtBQUN6SSxtQkFBbUIsbUJBQU8sQ0FBQywwT0FBc0g7O0FBRWpKLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7QUMzQ0EsY0FBYyxtQkFBTyxDQUFDLHdOQUE2Rzs7QUFFbkksNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHlHQUFzRDs7QUFFM0U7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLHdOQUE2RztBQUNoSSxtQkFBbUIsbUJBQU8sQ0FBQyx3TkFBNkc7O0FBRXhJLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7QUMzQ0EsY0FBYyxtQkFBTyxDQUFDLHNOQUE0Rzs7QUFFbEksNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHlHQUFzRDs7QUFFM0U7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLHNOQUE0RztBQUMvSCxtQkFBbUIsbUJBQU8sQ0FBQyxzTkFBNEc7O0FBRXZJLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7QUMzQ0EsY0FBYyxtQkFBTyxDQUFDLDBPQUFzSDs7QUFFNUksNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHlHQUFzRDs7QUFFM0U7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLDBPQUFzSDtBQUN6SSxtQkFBbUIsbUJBQU8sQ0FBQywwT0FBc0g7O0FBRWpKLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7QUMzQ0EsY0FBYyxtQkFBTyxDQUFDLG9OQUEyRzs7QUFFakksNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHlHQUFzRDs7QUFFM0U7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLG9OQUEyRztBQUM5SCxtQkFBbUIsbUJBQU8sQ0FBQyxvTkFBMkc7O0FBRXRJLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7QUMzQ0EsY0FBYyxtQkFBTyxDQUFDLGtOQUEwRzs7QUFFaEksNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHlHQUFzRDs7QUFFM0U7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLGtOQUEwRztBQUM3SCxtQkFBbUIsbUJBQU8sQ0FBQyxrTkFBMEc7O0FBRXJJLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7QUMzQ0EsY0FBYyxtQkFBTyxDQUFDLGdOQUF5Rzs7QUFFL0gsNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHlHQUFzRDs7QUFFM0U7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLGdOQUF5RztBQUM1SCxtQkFBbUIsbUJBQU8sQ0FBQyxnTkFBeUc7O0FBRXBJLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7QUMzQ0EsY0FBYyxtQkFBTyxDQUFDLGtPQUFrSDs7QUFFeEksNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHlHQUFzRDs7QUFFM0U7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLGtPQUFrSDtBQUNySSxtQkFBbUIsbUJBQU8sQ0FBQyxrT0FBa0g7O0FBRTdJLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7QUMzQ0EsY0FBYyxtQkFBTyxDQUFDLHdQQUE2SDs7QUFFbkosNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHlHQUFzRDs7QUFFM0U7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLHdQQUE2SDtBQUNoSixtQkFBbUIsbUJBQU8sQ0FBQyx3UEFBNkg7O0FBRXhKLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7QUMzQ0EsY0FBYyxtQkFBTyxDQUFDLG9OQUEyRzs7QUFFakksNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHlHQUFzRDs7QUFFM0U7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLG9OQUEyRztBQUM5SCxtQkFBbUIsbUJBQU8sQ0FBQyxvTkFBMkc7O0FBRXRJLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7QUMzQ0EsY0FBYyxtQkFBTyxDQUFDLGdOQUF5Rzs7QUFFL0gsNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHlHQUFzRDs7QUFFM0U7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLGdOQUF5RztBQUM1SCxtQkFBbUIsbUJBQU8sQ0FBQyxnTkFBeUc7O0FBRXBJLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDIiwiZmlsZSI6ImJ1aWxkL2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0O1xuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiMThiMjBkN2IzNjBmN2ZlMjcwNTdcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IFwibWFpblwiO1xuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZShcIi4vc3JjL2Fzc2V0cy9zY3JpcHRzL2luZGV4LmpzXCIpKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYXNzZXRzL3NjcmlwdHMvaW5kZXguanNcIik7XG4iLCJ2YXIgZXNjYXBlID0gcmVxdWlyZShcIi4uLy4uL2Nzcy1sb2FkZXIvbGliL3VybC9lc2NhcGUuanNcIik7XG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogXFxcIk1hdGVyaWFsIEljb25zXFxcIjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBzcmM6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi9NYXRlcmlhbEljb25zLVJlZ3VsYXIuZW90XCIpKSArIFwiKTtcXG4gIC8qIEZvciBJRTYtOCAqL1xcbiAgc3JjOiBsb2NhbChcXFwiTWF0ZXJpYWwgSWNvbnNcXFwiKSwgbG9jYWwoXFxcIk1hdGVyaWFsSWNvbnMtUmVndWxhclxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4vTWF0ZXJpYWxJY29ucy1SZWd1bGFyLndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi9NYXRlcmlhbEljb25zLVJlZ3VsYXIud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi9NYXRlcmlhbEljb25zLVJlZ3VsYXIudHRmXCIpKSArIFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIik7IH1cXG5cXG4ubWF0ZXJpYWwtaWNvbnMge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJNYXRlcmlhbCBJY29uc1xcXCI7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgbGluZS1oZWlnaHQ6IDE7XFxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXG4gIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XFxuICB3b3JkLXdyYXA6IG5vcm1hbDtcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICBkaXJlY3Rpb246IGx0cjtcXG4gIC8qIFN1cHBvcnQgZm9yIGFsbCBXZWJLaXQgYnJvd3NlcnMuICovXFxuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG4gIC8qIFN1cHBvcnQgZm9yIFNhZmFyaSBhbmQgQ2hyb21lLiAqL1xcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcXG4gIC8qIFN1cHBvcnQgZm9yIEZpcmVmb3guICovXFxuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xcbiAgLyogU3VwcG9ydCBmb3IgSUUuICovXFxuICBmb250LWZlYXR1cmUtc2V0dGluZ3M6ICdsaWdhJzsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsInZhciBlc2NhcGUgPSByZXF1aXJlKFwiLi4vLi4vLi4vY3NzLWxvYWRlci9saWIvdXJsL2VzY2FwZS5qc1wiKTtcbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJAZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLVRoaW4ud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLVRoaW4ud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7XFxuICBmb250LXdlaWdodDogMTAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsOyB9XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90by1UaGluJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLVRoaW4ud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLVRoaW4ud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7IH1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLVRoaW5JdGFsaWMud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLVRoaW5JdGFsaWMud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7XFxuICBmb250LXdlaWdodDogMTAwO1xcbiAgZm9udC1zdHlsZTogaXRhbGljOyB9XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90by1UaGluSXRhbGljJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLVRoaW5JdGFsaWMud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLVRoaW5JdGFsaWMud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7IH1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUxpZ2h0LndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1MaWdodC53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICBmb250LXN0eWxlOiBub3JtYWw7IH1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvLUxpZ2h0JztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUxpZ2h0LndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1MaWdodC53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tTGlnaHRJdGFsaWMud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUxpZ2h0SXRhbGljLndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYzsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8tTGlnaHRJdGFsaWMnO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tTGlnaHRJdGFsaWMud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUxpZ2h0SXRhbGljLndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpOyB9XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBzcmM6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1SZWd1bGFyLndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1SZWd1bGFyLndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8tUmVndWxhcic7XFxuICBzcmM6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1SZWd1bGFyLndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1SZWd1bGFyLndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpOyB9XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBzcmM6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1SZWd1bGFySXRhbGljLndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1SZWd1bGFySXRhbGljLndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYzsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8tUmVndWxhckl0YWxpYyc7XFxuICBzcmM6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1SZWd1bGFySXRhbGljLndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1SZWd1bGFySXRhbGljLndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpOyB9XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBzcmM6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1NZWRpdW0ud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLU1lZGl1bS53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBmb250LXN0eWxlOiBub3JtYWw7IH1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvLU1lZGl1bSc7XFxuICBzcmM6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1NZWRpdW0ud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLU1lZGl1bS53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tTWVkaXVtSXRhbGljLndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1NZWRpdW1JdGFsaWMud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgZm9udC1zdHlsZTogaXRhbGljOyB9XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90by1NZWRpdW1JdGFsaWMnO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tTWVkaXVtSXRhbGljLndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1NZWRpdW1JdGFsaWMud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7IH1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUJvbGQud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUJvbGQud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsOyB9XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90by1Cb2xkJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUJvbGQud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUJvbGQud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7IH1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUJvbGRJdGFsaWMud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUJvbGRJdGFsaWMud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zdHlsZTogaXRhbGljOyB9XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90by1Cb2xkSXRhbGljJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUJvbGRJdGFsaWMud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUJvbGRJdGFsaWMud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7IH1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUJsYWNrLndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1CbGFjay53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTtcXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XFxuICBmb250LXN0eWxlOiBub3JtYWw7IH1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvLUJsYWNrJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUJsYWNrLndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1CbGFjay53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tQmxhY2tJdGFsaWMud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUJsYWNrSXRhbGljLndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYzsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8tQmxhY2tJdGFsaWMnO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tQmxhY2tJdGFsaWMud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUJsYWNrSXRhbGljLndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIubWFyLXRwLS0wIHtcXG4gIG1hcmdpbi10b3A6IDAgIWltcG9ydGFudDsgfVxcblxcbi5tYXItcnQtLW5vbmUge1xcbiAgbWFyZ2luLXJpZ2h0OiAwICFpbXBvcnRhbnQ7IH1cXG5cXG4ud2RoLXBlci0tMTAge1xcbiAgd2lkdGg6IDEwJSAhaW1wb3J0YW50OyB9XFxuXFxuLndkaC1wZXItLTI1IHtcXG4gIHdpZHRoOiAyNSUgIWltcG9ydGFudDsgfVxcblxcbi53ZGgtcGVyLS0zNSB7XFxuICB3aWR0aDogMzUlICFpbXBvcnRhbnQ7IH1cXG5cXG4ud2RoLXBlci0tMTAwIHtcXG4gIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7IH1cXG5cXG4uYm9yLXRwLS1ub25lIHtcXG4gIGJvcmRlci10b3A6IG5vbmUgIWltcG9ydGFudDsgfVxcblxcbi5ib3ItdHBidC0tbm9uZSB7XFxuICBib3JkZXItdG9wOiBub25lICFpbXBvcnRhbnQ7XFxuICBib3JkZXItYm90dG9tOiBub25lICFpbXBvcnRhbnQ7IH1cXG5cXG4udHh0LWFsbi0tcnQge1xcbiAgdGV4dC1hbGlnbjogcmlnaHQ7IH1cXG5cXG4uYWN0aXZpdHktdGFicyBsaSB7XFxuICBwYWRkaW5nOiAxMHB4IDE1cHg7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Q4ZDhkODsgfVxcbiAgLmFjdGl2aXR5LXRhYnMgbGkgYSB7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICBmb250LXdlaWdodDogNTAwO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG4gIC5hY3Rpdml0eS10YWJzIGxpIC5lZHMtYWNjb3JkaW9uLWNhcmV0IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICByaWdodDogLTIycHg7XFxuICAgIHRvcDogNnB4O1xcbiAgICB3aWR0aDogMTJweDtcXG4gICAgaGVpZ2h0OiA4cHg7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQmxibU52WkdsdVp6MGlWVlJHTFRnaVB6NEtQSE4yWnlCM2FXUjBhRDBpTVRKd2VDSWdhR1ZwWjJoMFBTSTNjSGdpSUhacFpYZENiM2c5SWpBZ01DQXhNaUEzSWlCMlpYSnphVzl1UFNJeExqRWlJSGh0Ykc1elBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHlNREF3TDNOMlp5SWdlRzFzYm5NNmVHeHBibXM5SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpFNU9Ua3ZlR3hwYm1zaVBnb2dJQ0FnUENFdExTQkhaVzVsY21GMGIzSTZJRk5yWlhSamFDQTBPQzR5SUNnME56TXlOeWtnTFNCb2RIUndPaTh2ZDNkM0xtSnZhR1Z0YVdGdVkyOWthVzVuTG1OdmJTOXphMlYwWTJnZ0xTMCtDaUFnSUNBOGRHbDBiR1UrUjNKdmRYQWdNand2ZEdsMGJHVStDaUFnSUNBOFpHVnpZejVEY21WaGRHVmtJSGRwZEdnZ1UydGxkR05vTGp3dlpHVnpZejRLSUNBZ0lEeGtaV1p6UGp3dlpHVm1jejRLSUNBZ0lEeG5JR2xrUFNKUVlXZGxMVEl6SWlCemRISnZhMlU5SW01dmJtVWlJSE4wY205clpTMTNhV1IwYUQwaU1TSWdabWxzYkQwaWJtOXVaU0lnWm1sc2JDMXlkV3hsUFNKbGRtVnViMlJrSWo0S0lDQWdJQ0FnSUNBOFp5QnBaRDBpUjNKdmRYQXRNaUlnZEhKaGJuTm1iM0p0UFNKMGNtRnVjMnhoZEdVb05pNHdNREF3TURBc0lERXVNREF3TURBd0tTQnliM1JoZEdVb0xUUTFMakF3TURBd01Da2dkSEpoYm5Oc1lYUmxLQzAyTGpBd01EQXdNQ3dnTFRFdU1EQXdNREF3S1NCMGNtRnVjMnhoZEdVb01pNHdNREF3TURBc0lDMHpMakF3TURBd01Da2lJR1pwYkd3OUlpTXdSVFpGUWpjaVBnb2dJQ0FnSUNBZ0lDQWdJQ0E4Y21WamRDQnBaRDBpVW1WamRHRnVaMnhsTFRJaUlIZzlJakFpSUhrOUlqQWlJSGRwWkhSb1BTSXlJaUJvWldsbmFIUTlJamdpSUhKNFBTSXhJajQ4TDNKbFkzUStDaUFnSUNBZ0lDQWdJQ0FnSUR4eVpXTjBJR2xrUFNKU1pXTjBZVzVuYkdVdE1pMURiM0I1SWlCMGNtRnVjMlp2Y20wOUluUnlZVzV6YkdGMFpTZzBMakF3TURBd01Dd2dOeTR3TURBd01EQXBJSEp2ZEdGMFpTZzVNQzR3TURBd01EQXBJSFJ5WVc1emJHRjBaU2d0TkM0d01EQXdNREFzSUMwM0xqQXdNREF3TUNrZ0lpQjRQU0l6SWlCNVBTSXpJaUIzYVdSMGFEMGlNaUlnYUdWcFoyaDBQU0k0SWlCeWVEMGlNU0krUEM5eVpXTjBQZ29nSUNBZ0lDQWdJRHd2Wno0S0lDQWdJRHd2Wno0S1BDOXpkbWMrXFxcIik7IH1cXG5cXG4ubm90ZXMtdGFiIHtcXG4gIG1hcmdpbi10b3A6IDM4NXB4OyB9XFxuICAubm90ZXMtdGFiIC5lZHMtYWNjb3JkaW9uLWxhYmVsIHtcXG4gICAgYmFja2dyb3VuZDogI2RjZGNkYyAhaW1wb3J0YW50O1xcbiAgICBjb2xvcjogIzQyNmRhOTsgfVxcbiAgICAubm90ZXMtdGFiIC5lZHMtYWNjb3JkaW9uLWxhYmVsIC5ub3Rlcy1pY29uIGltZyB7XFxuICAgICAgdmVydGljYWwtYWxpZ246IGJvdHRvbTtcXG4gICAgICB3aWR0aDogMjRweDtcXG4gICAgICBoZWlnaHQ6IDI0cHg7IH1cXG4gIC5ub3Rlcy10YWIgLmdyZXlIZWFkaW5nIGJ1dHRvbiwgLm5vdGVzLXRhYiAuZ3JleUhlYWRpbmcgaDUge1xcbiAgICBjb2xvcjogIzQyNmRhOTsgfVxcbiAgLm5vdGVzLXRhYiB0ZXh0YXJlYSB7XFxuICAgIHJlc2l6ZTogbm9uZTsgfVxcbiAgLm5vdGVzLXRhYiAudGFibGUge1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICBiYWNrZ3JvdW5kOiAjZGNkY2RjICFpbXBvcnRhbnQ7IH1cXG4gIC5ub3Rlcy10YWIgLmNlbGwge1xcbiAgICBmb250LXNpemU6IDEycHg7IH1cXG4gIC5ub3Rlcy10YWIgLmVkcy1pY29uIHtcXG4gICAgdmVydGljYWwtYWxpZ246IGJvdHRvbTsgfVxcbiAgLm5vdGVzLXRhYiAubm90ZS1idG4ge1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIHBhZGRpbmc6IDEwcHggMjVweCAhaW1wb3J0YW50O1xcbiAgICBiYWNrZ3JvdW5kOiAjNDI2ZGE5ICFpbXBvcnRhbnQ7XFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gICAgY29sb3I6ICNmZmYgIWltcG9ydGFudDtcXG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XFxuICAgIGZvbnQtc2l6ZTogMTRweDsgfVxcbiAgLm5vdGVzLXRhYiAucm93IHtcXG4gICAgcGFkZGluZzogMCAxMHB4OyB9XFxuICAgIC5ub3Rlcy10YWIgLnJvdyA+IC5jZWxsIHtcXG4gICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyB9XFxuXFxuLm1lbW8tdGFiIHVsIHtcXG4gIGRpc3BsYXk6IG5vbmU7IH1cXG4gIC5tZW1vLXRhYiB1bCBsaSB7XFxuICAgIHBhZGRpbmc6IDVweCAxMHB4OyB9XFxuXFxuLm1lbW8tdGFiW2FjdGl2ZT1cXFwidHJ1ZVxcXCJdIC5lZHMtYWNjb3JkaW9uLWNhcmV0IHtcXG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7IH1cXG5cXG4ubWVtby10YWJbYWN0aXZlPVxcXCJ0cnVlXFxcIl0gdWwge1xcbiAgZGlzcGxheTogYmxvY2s7IH1cXG4gIC5tZW1vLXRhYlthY3RpdmU9XFxcInRydWVcXFwiXSB1bCBsaSB7XFxuICAgIGJvcmRlci1ib3R0b206IG5vbmU7IH1cXG4gIC5tZW1vLXRhYlthY3RpdmU9XFxcInRydWVcXFwiXSB1bCBhIHtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDsgfVxcblxcbi5wcm9taXNlcGF5X19saW5rIHtcXG4gIG1hcmdpbi10b3A6IDEwcHggIWltcG9ydGFudDtcXG4gIHBhZGRpbmctdG9wOiA3cHggIWltcG9ydGFudDtcXG4gIHBhZGRpbmctYm90dG9tOiA3cHggIWltcG9ydGFudDtcXG4gIGJvcmRlci1ib3R0b206IG5vbmUgIWltcG9ydGFudDtcXG4gIG1hcmdpbi1ib3R0b206IDVweCAhaW1wb3J0YW50OyB9XFxuXFxuLnByb21pc2VwYXktLWxpbmthY3RpdmUge1xcbiAgYmFja2dyb3VuZDogI2ZmZjtcXG4gIGJvcmRlci1sZWZ0OiBzb2xpZCA0cHggI2Q4MmI4MDtcXG4gIHBhZGRpbmctcmlnaHQ6IDEycHggIWltcG9ydGFudDsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLm1hci10cC0tMCB7XFxuICBtYXJnaW4tdG9wOiAwICFpbXBvcnRhbnQ7IH1cXG5cXG4ubWFyLXJ0LS1ub25lIHtcXG4gIG1hcmdpbi1yaWdodDogMCAhaW1wb3J0YW50OyB9XFxuXFxuLndkaC1wZXItLTEwIHtcXG4gIHdpZHRoOiAxMCUgIWltcG9ydGFudDsgfVxcblxcbi53ZGgtcGVyLS0yNSB7XFxuICB3aWR0aDogMjUlICFpbXBvcnRhbnQ7IH1cXG5cXG4ud2RoLXBlci0tMzUge1xcbiAgd2lkdGg6IDM1JSAhaW1wb3J0YW50OyB9XFxuXFxuLndkaC1wZXItLTEwMCB7XFxuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50OyB9XFxuXFxuLmJvci10cC0tbm9uZSB7XFxuICBib3JkZXItdG9wOiBub25lICFpbXBvcnRhbnQ7IH1cXG5cXG4uYm9yLXRwYnQtLW5vbmUge1xcbiAgYm9yZGVyLXRvcDogbm9uZSAhaW1wb3J0YW50O1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZSAhaW1wb3J0YW50OyB9XFxuXFxuLnR4dC1hbG4tLXJ0IHtcXG4gIHRleHQtYWxpZ246IHJpZ2h0OyB9XFxuXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm9yZGVyOiAwO1xcbiAgZm9udC1zaXplOiAxMDAlO1xcbiAgZm9udDogaW5oZXJpdDtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTsgfVxcblxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBibG9jazsgfVxcblxcbmJvZHkge1xcbiAgbGluZS1oZWlnaHQ6IDE7IH1cXG5cXG5vbCwgdWwsIG9sIGxpLCB1bCBsaSB7XFxuICBsaXN0LXN0eWxlOiBub25lOyB9XFxuXFxuQG1lZGlhIGFsbCBhbmQgKC1tcy1oaWdoLWNvbnRyYXN0OiBub25lKSB7XFxuICBvbCwgdWwsIG9sIGxpLCB1bCBsaSB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIGxpc3Qtc3R5bGUtaW1hZ2U6IHVybChkYXRhOjApOyB9IH1cXG5cXG5ibG9ja3F1b3RlLCBxIHtcXG4gIHF1b3Rlczogbm9uZTsgfVxcblxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgY29udGVudDogbm9uZTsgfVxcblxcbnRhYmxlIHtcXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuICBib3JkZXItc3BhY2luZzogMDsgfVxcblxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nOyB9XFxuXFxuLmNvbnRhaW5lciB7XFxuICB3aWR0aDogMTY4MHB4O1xcbiAgbWFyZ2luOiBhdXRvOyB9XFxuXFxuLmRpcy1mbGV4IHtcXG4gIGRpc3BsYXk6IGZsZXg7IH1cXG5cXG4uY2xlYXIge1xcbiAgY2xlYXI6IGJvdGg7XFxuICBmbG9hdDogbm9uZTsgfVxcblxcbi5idG4ge1xcbiAgd2lkdGg6IDEyMHB4O1xcbiAgcGFkZGluZzogMTBweCAwO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQyNmRhOTtcXG4gIGJvcmRlcjogc29saWQgMXB4ICMwMDQ1OTA7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1NZWRpdW1cXFwiICFpbXBvcnRhbnQ7XFxuICBmb250LXdlaWdodDogbm9ybWFsICFpbXBvcnRhbnQ7XFxuICBjb2xvcjogI2ZmZmZmZjtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGN1cnNvcjogcG9pbnRlcjsgfVxcbiAgLmJ0bi0tb2sge1xcbiAgICB3aWR0aDogNDVweCAhaW1wb3J0YW50O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDVweDsgfVxcbiAgLmJ0bi0tY2FuY2VsIHtcXG4gICAgYmFja2dyb3VuZDogI2Y2ZjZmNjtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggI2NjY2NjYztcXG4gICAgY29sb3I6ICMzMzMzMzM7XFxuICAgIHdpZHRoOiA4MHB4OyB9XFxuICAuYnRuLS12aWV3YWxsIHtcXG4gICAgZmxvYXQ6IHJpZ2h0O1xcbiAgICBiYWNrZ3JvdW5kOiAjZjZmNmY2O1xcbiAgICBjb2xvcjogIzBlNmViNztcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggcmdiYSgwLCA2OSwgMTQ0LCAwLjMpOyB9XFxuICAgIC5idG4tLXZpZXdhbGw6aG92ZXIge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICM0MjZkYTk7XFxuICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLU1lZGl1bVxcXCIgIWltcG9ydGFudDtcXG4gICAgICBmb250LXdlaWdodDogbm9ybWFsICFpbXBvcnRhbnQ7XFxuICAgICAgY29sb3I6ICNmZmZmZmY7IH1cXG5cXG4uYm9yLWxlZnQtLW5vbmUge1xcbiAgYm9yZGVyLWxlZnQ6IG5vbmUgIWltcG9ydGFudDsgfVxcblxcbi5ib3ItdG9wLS0xIHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZDhkOGQ4OyB9XFxuXFxuLmJvci1ib3RyYWQtLWx0cnQge1xcbiAgYm9yZGVyLXJhZGl1czogMHB4IDBweCA2cHggNnB4ICFpbXBvcnRhbnQ7IH1cXG5cXG4ubWFyLXRvcC0tbm9uZSB7XFxuICBtYXJnaW4tdG9wOiAwICFpbXBvcnRhbnQ7IH1cXG5cXG4ubWFyLXRvcC0tNyB7XFxuICBtYXJnaW4tdG9wOiA3cHggIWltcG9ydGFudDsgfVxcblxcbi5tYXItdG9wLS01IHtcXG4gIG1hcmdpbi10b3A6IDVweCAhaW1wb3J0YW50OyB9XFxuXFxuLm1hci1ib3QtLW5vbmUge1xcbiAgbWFyZ2luLWJvdHRvbTogMCAhaW1wb3J0YW50OyB9XFxuXFxuLm1hci1yaWdodC0tbm9uZSB7XFxuICBtYXJnaW4tcmlnaHQ6IDAgIWltcG9ydGFudDsgfVxcblxcbi5tYXItdHBidC0tMjAge1xcbiAgbWFyZ2luOiAyMHB4IDA7IH1cXG5cXG4ubWFyLWxlZnQtLTMge1xcbiAgbWFyZ2luLWxlZnQ6IDNweCAhaW1wb3J0YW50OyB9XFxuXFxuLnR4dC1hbG4tLXJpZ2h0IHtcXG4gIHRleHQtYWxpZ246IHJpZ2h0ICFpbXBvcnRhbnQ7IH1cXG5cXG4udHh0LWluZC0taGlkZSB7XFxuICB0ZXh0LWluZGVudDogLTk5OTk5ZW07IH1cXG5cXG4ucGFkLXRvcC0tMTAge1xcbiAgcGFkZGluZy10b3A6IDEwcHggIWltcG9ydGFudDsgfVxcblxcbi5wYWQtdG9wLS03IHtcXG4gIHBhZGRpbmctdG9wOiA3cHggIWltcG9ydGFudDsgfVxcblxcbi5wYWQtdG9wLS04IHtcXG4gIHBhZGRpbmctdG9wOiA4cHggIWltcG9ydGFudDsgfVxcblxcbi5jdXItLWF1dG8ge1xcbiAgY3Vyc29yOiBkZWZhdWx0ICFpbXBvcnRhbnQ7IH1cXG5cXG4uY3VyLS1wb2ludGVyIHtcXG4gIGN1cnNvcjogcG9pbnRlciAhaW1wb3J0YW50OyB9XFxuXFxuLnNjcm9sbCB7XFxuICBvdmVyZmxvdy15OiBzY3JvbGw7IH1cXG5cXG4uc2Nyb2xsOjotd2Via2l0LXNjcm9sbGJhciB7XFxuICB3aWR0aDogMTcuOXB4OyB9XFxuXFxuLnNjcm9sbDo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDAgMnB4ICNkY2RjZGM7IH1cXG5cXG4uc2Nyb2xsOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCAycHggI2RjZGNkYztcXG4gIGJhY2tncm91bmQ6ICNkY2RjZGM7XFxuICBib3JkZXI6IDRweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBiYWNrZ3JvdW5kLWNsaXA6IGNvbnRlbnQtYm94OyB9XFxuXFxuLnZlci1hbG4tLW1kbCB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlICFpbXBvcnRhbnQ7IH1cXG5cXG4udmVyLWFsbi0tdHh0b3Age1xcbiAgdmVydGljYWwtYWxpZ246IHRleHQtdG9wICFpbXBvcnRhbnQ7IH1cXG5cXG4uc2tpcGxpbmsge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogLTk5OTllbTsgfVxcbiAgLnNraXBsaW5rOmZvY3VzIHtcXG4gICAgbGVmdDogMDsgfVxcblxcbi5mb2N1cyB7XFxuICBvdXRsaW5lOiAtd2Via2l0LWZvY3VzLXJpbmctY29sb3IgYXV0byA1cHg7IH1cXG5cXG4vKioqKiBJRSA5KyBzdHlsZXMqKioqKi9cXG46cm9vdCAuYnRuLS12aWV3YWxsIHtcXG4gIHBhZGRpbmc6IDBcXFxcMCAhaW1wb3J0YW50O1xcbiAgbWFyZ2luLXRvcDogLTJweFxcXFwwOyB9XFxuXFxuOnJvb3QgLmNvbnRhY3RkZXRhaWxzX19saXN0LS1kaXNwbGF5IGEgLmNvbnRhY3RkZXRhaWxzX19lZHMtYWNjb3JkaW9uLWNhcmV0IHtcXG4gIHRvcDogMTJweFxcXFwwOyB9XFxuXFxuOnJvb3QgLmNvbnRhaW5lck1pZGRsZSB7XFxuICBtYXJnaW46IDAgMjVweFxcXFwwOyB9XFxuXFxuOnJvb3QgZWRzLWNhcmQgaGVhZGVyIHtcXG4gIG1hcmdpbi1ib3R0b206IDBcXFxcMDtcXG4gIHBhZGRpbmctYm90dG9tOiAwXFxcXDA7IH1cXG5cXG46cm9vdCAudGFibGUudGFibGVkYXRhIHtcXG4gIHBhZGRpbmc6IDBcXFxcMDsgfVxcblxcbjpyb290IC5hY2N0LWNvbnRhaW5lciAuY29udGFpbmVyTWlkZGxlID4gZWRzLWNhcmQge1xcbiAgcGFkZGluZy1ib3R0b206IDBcXFxcMDsgfVxcblxcbjpyb290ICNhY2NvdW50c0FjdGl2aXR5IGVkcy10YWJzIDpmaXJzdC1jaGlsZC50YWItbGFiZWxzIGxpIHtcXG4gIG1hcmdpbi10b3A6IC0ycHhcXFxcMDsgfVxcblxcbjpyb290ICNhY2NvdW50c0FjdGl2aXR5IGVkcy10YWJzIDpmaXJzdC1jaGlsZC50YWItbGFiZWxzIGxpIGEge1xcbiAgcGFkZGluZy10b3A6IDBcXFxcMDsgfVxcblxcbjpyb290ICNhY2NvdW50c0FjdGl2aXR5IHtcXG4gIHBhZGRpbmctdG9wOiAwXFxcXDA7IH1cXG5cXG46cm9vdCAjcHJvbWlzZV9fYWN0c2VjdGlvbiBlZHMtdGFicyA6Zmlyc3QtY2hpbGQudGFiLWxhYmVscyBsaSB7XFxuICBtYXJnaW4tdG9wOiAtMnB4XFxcXDA7IH1cXG5cXG46cm9vdCAjcHJvbWlzZV9fYWN0c2VjdGlvbiBlZHMtdGFicyA6Zmlyc3QtY2hpbGQudGFiLWxhYmVscyBsaSBhIHtcXG4gIHBhZGRpbmctdG9wOiAwXFxcXDA7IH1cXG5cXG46cm9vdCAjcHJvbWlzZV9fYWN0c2VjdGlvbiB7XFxuICBwYWRkaW5nLXRvcDogMFxcXFwwOyB9XFxuXFxuOnJvb3QgLnByb21pc2VwYXlfX25hdnRhYiB7XFxuICBtYXJnaW4tdG9wOiAyMHB4XFxcXDA7IH1cXG5cXG46cm9vdCAuY29udGFpbmVyIHtcXG4gIG92ZXJmbG93OiBoaWRkZW5cXFxcMDsgfVxcblxcbjpyb290IC5hY2N0LWNvbnRhaW5lciB7XFxuICBoZWlnaHQ6IDEyNTBweFxcXFwwOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwidmFyIGVzY2FwZSA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvdXJsL2VzY2FwZS5qc1wiKTtcbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLm1hci10cC0tMCB7XFxuICBtYXJnaW4tdG9wOiAwICFpbXBvcnRhbnQ7IH1cXG5cXG4ubWFyLXJ0LS1ub25lIHtcXG4gIG1hcmdpbi1yaWdodDogMCAhaW1wb3J0YW50OyB9XFxuXFxuLndkaC1wZXItLTEwIHtcXG4gIHdpZHRoOiAxMCUgIWltcG9ydGFudDsgfVxcblxcbi53ZGgtcGVyLS0yNSB7XFxuICB3aWR0aDogMjUlICFpbXBvcnRhbnQ7IH1cXG5cXG4ud2RoLXBlci0tMzUge1xcbiAgd2lkdGg6IDM1JSAhaW1wb3J0YW50OyB9XFxuXFxuLndkaC1wZXItLTEwMCB7XFxuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50OyB9XFxuXFxuLmJvci10cC0tbm9uZSB7XFxuICBib3JkZXItdG9wOiBub25lICFpbXBvcnRhbnQ7IH1cXG5cXG4uYm9yLXRwYnQtLW5vbmUge1xcbiAgYm9yZGVyLXRvcDogbm9uZSAhaW1wb3J0YW50O1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZSAhaW1wb3J0YW50OyB9XFxuXFxuLnR4dC1hbG4tLXJ0IHtcXG4gIHRleHQtYWxpZ246IHJpZ2h0OyB9XFxuXFxuLmNhc2VsaXN0X19jb250IHtcXG4gIHdpZHRoOiA3NyU7XFxuICBtYXJnaW46IDAgYXV0bzsgfVxcblxcbi5jYXNlbGlzdF9faGVhZGluZyB7XFxuICBmb250LXNpemU6IDIwcHggIWltcG9ydGFudDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLVJlZ3VsYXJcXFwiICFpbXBvcnRhbnQ7XFxuICBmb250LXdlaWdodDogbm9ybWFsICFpbXBvcnRhbnQ7XFxuICBjb2xvcjogIzAwMDAwMCAhaW1wb3J0YW50O1xcbiAgbGluZS1oZWlnaHQ6IDM5cHggIWltcG9ydGFudDsgfVxcblxcbi5jYXNlbGlzdF9fY2FzZSB7XFxuICBtYXJnaW46IDI1cHggMzZweCAyNXB4IDA7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBib3JkZXI6IHNvbGlkIDFweCAjY2NjY2NjO1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICB3aWR0aDogMTguNWVtO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuLmNhc2VsaXN0X19jYXNlOm50aC1jaGlsZCgzKSAuY2FzZWxpc3RfX2luZm90aW1lLCAuY2FzZWxpc3RfX2Nhc2U6bnRoLWNoaWxkKDQpIC5jYXNlbGlzdF9faW5mb3RpbWUge1xcbiAgbWFyZ2luLWxlZnQ6IDI0cHg7IH1cXG5cXG4uY2FzZWxpc3RfX2JveCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjZmNmY2O1xcbiAgcGFkZGluZzogMTVweDtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBib3JkZXItcmFkaXVzOiA0cHggNHB4IDAgMDsgfVxcblxcbi5jYXNlbGlzdF9fdmlzdWFsbHloaWRkZW4ge1xcbiAgYm9yZGVyOiAwO1xcbiAgY2xpcDogcmVjdCgwIDAgMCAwKTtcXG4gIGhlaWdodDogMXB4O1xcbiAgbWFyZ2luOiAtMXB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBhZGRpbmc6IDA7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogMXB4OyB9XFxuXFxuLmNhc2VsaXN0X19uYW1lIHtcXG4gIGZvbnQtc2l6ZTogMTVweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLU1lZGl1bVxcXCIgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLmNhc2VsaXN0X19udW1iZXIge1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8tUmVndWxhclxcXCIgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLmNhc2VsaXN0X19saW5rIHtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLU1lZGl1bVxcXCIgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gIGNvbG9yOiAjMDA2ZGJkICFpbXBvcnRhbnQ7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7IH1cXG5cXG4uY2FzZWxpc3RfX2dvaWNvbiB7XFxuICBtYXJnaW4tbGVmdDogNXB4O1xcbiAgd2lkdGg6IDlweDtcXG4gIGhlaWdodDogMTRweDtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9pbWFnZXMvbmV4dF9faWNvbi5wbmdcIikpICsgXCIpIG5vLXJlcGVhdCBjZW50ZXIgY2VudGVyIHRyYW5zcGFyZW50O1xcbiAgYmFja2dyb3VuZC1zaXplOiAxMDAlO1xcbiAgZmxvYXQ6IHJpZ2h0OyB9XFxuXFxuLmNhc2VsaXN0X19iYWxhbmNlIHtcXG4gIHBhZGRpbmc6IDVweCAwIDA7IH1cXG5cXG4uY2FzZWxpc3RfX2xhYmVsIHtcXG4gIGxpbmUtaGVpZ2h0OiAxLjE1O1xcbiAgZm9udC1zaXplOiAxM3B4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8tQm9sZFxcXCIgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gIGNvbG9yOiAjMzMzMzMzOyB9XFxuXFxuLmNhc2VsaXN0X192YWx1ZSB7XFxuICBmb250LXNpemU6IDEzcHg7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1SZWd1bGFyXFxcIiAhaW1wb3J0YW50O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xcbiAgY29sb3I6ICMzMzMzMzM7XFxuICBmbG9hdDogcmlnaHQ7IH1cXG5cXG4uY2FzZWxpc3RfX2luZm8ge1xcbiAgcGFkZGluZzogMTBweCAwIDEwcHggMTVweDtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtaW4taGVpZ2h0OiAxMjBweDsgfVxcblxcbi5jYXNlbGlzdF9faW5mb25hbWUge1xcbiAgZm9udC1zaXplOiAxM3B4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8tUmVndWxhclxcXCIgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gIGNvbG9yOiAjYWYxNjg1O1xcbiAgbGluZS1oZWlnaHQ6IDEuMTU7XFxuICBtYXJnaW4tdG9wOiAzcHg7IH1cXG5cXG4uY2FzZWxpc3RfX2luZm90aW1lIHtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLU1lZGl1bVxcXCIgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gIGNvbG9yOiAjODg4ODg4O1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gIG1hcmdpbi10b3A6IDVweDtcXG4gIGZsb2F0OiBsZWZ0OyB9XFxuXFxuLmNhc2VsaXN0X191c2VyIHtcXG4gIHdpZHRoOiAyNTVweDtcXG4gIGZsb2F0OiByaWdodDtcXG4gIHBhZGRpbmc6IDdweCAwIDA7XFxuICBtYXJnaW4tdG9wOiA0MHB4O1xcbiAgYm9yZGVyLXRvcDogc29saWQgMXB4ICNkY2RjZGM7XFxuICBmb250LXNpemU6IDEzcHg7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1SZWd1bGFyXFxcIiAhaW1wb3J0YW50O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xcbiAgY29sb3I6ICMzMzMzMzM7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMTBweDsgfVxcblxcbi5jYXNlbGlzdF9fcHJvZmlsZWljb24ge1xcbiAgb3BhY2l0eTogMC4zO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgcmlnaHQ6IC0xNXB4O1xcbiAgdG9wOiAtMTNweDtcXG4gIHdpZHRoOiAxMDBweDtcXG4gIGhlaWdodDogMTAwcHg7XFxuICBmbG9hdDogbGVmdDtcXG4gIGJhY2tncm91bmQ6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vaW1hZ2VzL3Byb2ZpbGVfX2ljb24ucG5nXCIpKSArIFwiKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlciB0cmFuc3BhcmVudDtcXG4gIGJhY2tncm91bmQtc2l6ZTogMTAwJTsgfVxcblxcbi5jYXNlbGlzdC0tbm9iZyB7XFxuICBib3JkZXItYm90dG9tOiBzb2xpZCAxcHggI2RjZGNkYztcXG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7IH1cXG5cXG4uY2FzZWxpc3RfX3VzZXJpY29uIHtcXG4gIG1hcmdpbi1yaWdodDogNXB4O1xcbiAgbWFyZ2luLXRvcDogM3B4O1xcbiAgd2lkdGg6IDE0cHg7XFxuICBoZWlnaHQ6IDE0cHg7XFxuICBmbG9hdDogbGVmdDtcXG4gIGJhY2tncm91bmQ6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vaW1hZ2VzL3VzZXJfX2ljb24ucG5nXCIpKSArIFwiKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlciB0cmFuc3BhcmVudDtcXG4gIGJhY2tncm91bmQtc2l6ZTogMTAwJTsgfVxcblxcbi5jYXNlbGlzdF9fZmlsZWljb24ge1xcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XFxuICB3aWR0aDogMTVweDtcXG4gIGhlaWdodDogMzBweDtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9pbWFnZXMvZmlsZV9faWNvbi5wbmdcIikpICsgXCIpIG5vLXJlcGVhdCBjZW50ZXIgY2VudGVyIHRyYW5zcGFyZW50O1xcbiAgYmFja2dyb3VuZC1zaXplOiAxMDAlOyB9XFxuXFxuLmNhc2VsaXN0X19kaXZlcnRpY29uIHtcXG4gIG1hcmdpbi1yaWdodDogNXB4O1xcbiAgd2lkdGg6IDE4cHg7XFxuICBoZWlnaHQ6IDMwcHg7XFxuICBmbG9hdDogbGVmdDtcXG4gIGJhY2tncm91bmQ6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vaW1hZ2VzL2RpdmVydF9faWNvbi5wbmdcIikpICsgXCIpIG5vLXJlcGVhdCBjZW50ZXIgY2VudGVyIHRyYW5zcGFyZW50O1xcbiAgYmFja2dyb3VuZC1zaXplOiAxMDAlOyB9XFxuXFxuLmNhc2VsaXN0X19mb2xkZXJpY29uIHtcXG4gIG1hcmdpbi1yaWdodDogNXB4O1xcbiAgd2lkdGg6IDE4cHg7XFxuICBoZWlnaHQ6IDMwcHg7XFxuICBmbG9hdDogbGVmdDtcXG4gIGJhY2tncm91bmQ6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vaW1hZ2VzL3VzZXJmb2xkZXJfaWNvbi5wbmdcIikpICsgXCIpIG5vLXJlcGVhdCBjZW50ZXIgY2VudGVyIHRyYW5zcGFyZW50O1xcbiAgYmFja2dyb3VuZC1zaXplOiAxMDAlOyB9XFxuXFxuLmNhc2VsaXN0X19ib2xkdGV4dCB7XFxuICBmb250LXNpemU6IDEzcHg7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1Cb2xkXFxcIiAhaW1wb3J0YW50O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xcbiAgY29sb3I6ICNhZjE2ODU7IH1cXG5cXG4uY2FzZWxpc3RfX3NlY29uZGxpbmUge1xcbiAgZm9udC1zaXplOiAxM3B4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8tUmVndWxhclxcXCIgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gIGNvbG9yOiAjYWYxNjg1O1xcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIHdpZHRoOiA4OCU7XFxuICBmbG9hdDogbGVmdDsgfVxcblxcbi5jYXNlbGlzdF9fZG9jaWNvbiB7XFxuICBmbG9hdDogbGVmdDtcXG4gIG1hcmdpbi1yaWdodDogMTBweDtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4OyB9XFxuXFxuLmNhc2V0YWJsZSB7XFxuICB3aWR0aDogNzclO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBkaXNwbGF5OiBub25lOyB9XFxuICAuY2FzZXRhYmxlX19oZWFkaW5nIHtcXG4gICAgZm9udC1zaXplOiAyMHB4ICFpbXBvcnRhbnQ7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLVJlZ3VsYXJcXFwiICFpbXBvcnRhbnQ7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gICAgY29sb3I6ICMwMDAwMDAgIWltcG9ydGFudDtcXG4gICAgbGluZS1oZWlnaHQ6IDM5cHggIWltcG9ydGFudDsgfVxcbiAgLmNhc2V0YWJsZV9fdGJsIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICNjY2NjY2M7XFxuICAgIGJvcmRlci1yYWRpdXM6IDNweDsgfVxcbiAgLmNhc2V0YWJsZV9faGVhZHRibCB7XFxuICAgIG1hcmdpbjogNDBweCAwIDA7XFxuICAgIGJvcmRlci10b3A6IHNvbGlkIDFweCAjY2NjY2NjO1xcbiAgICBib3JkZXItcmFkaXVzOiA1cHggNXB4IDAgMDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgLmNhc2V0YWJsZV9fdGJsaGVhZCB7XFxuICAgIGJhY2tncm91bmQ6ICNmNmY2ZjY7XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8tTWVkaXVtXFxcIiAhaW1wb3J0YW50O1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsICFpbXBvcnRhbnQ7XFxuICAgIGNvbG9yOiAjMDAwMDAwOyB9XFxuICAuY2FzZXRhYmxlX190YmxoZGNvbCB7XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxuICAgIHBhZGRpbmc6IDdweCAxMHB4O1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjY2NjY2NjOyB9XFxuICAuY2FzZXRhYmxlX190YmxiZHlyb3cge1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLVJlZ3VsYXJcXFwiICFpbXBvcnRhbnQ7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gICAgY29sb3I6ICMwMDAwMDA7IH1cXG4gICAgLmNhc2V0YWJsZV9fdGJsYmR5cm93Om50aC1jaGlsZChldmVuKSB7XFxuICAgICAgYmFja2dyb3VuZDogI2Y2ZjZmNjsgfVxcbiAgLmNhc2V0YWJsZV9fdGJsYmR5Y29sIHtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgcGFkZGluZzogN3B4IDEwcHg7XFxuICAgIGJvcmRlci1sZWZ0OiBzb2xpZCAxcHggI2NjY2NjYztcXG4gICAgYm9yZGVyLXJpZ2h0OiBzb2xpZCAxcHggI2NjY2NjYzsgfVxcbiAgLmNhc2V0YWJsZV9fdGJsY29udCB7XFxuICAgIGhlaWdodDogMzk1cHg7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCAjY2NjY2NjO1xcbiAgICBib3JkZXItcmFkaXVzOiAwIDAgNXB4IDVweDsgfVxcbiAgLmNhc2V0YWJsZV9fdGJsc29ydGljb24ge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIG1hcmdpbi1sZWZ0OiAzcHg7IH1cXG4gICAgLmNhc2V0YWJsZV9fdGJsc29ydGljb246YWZ0ZXIge1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgICBib3JkZXItdG9wOiBzb2xpZCA1cHggI2NjY2NjYztcXG4gICAgICBib3JkZXItbGVmdDogc29saWQgNHB4IHRyYW5zcGFyZW50O1xcbiAgICAgIGJvcmRlci1yaWdodDogc29saWQgNHB4IHRyYW5zcGFyZW50O1xcbiAgICAgIHRvcDogOXB4OyB9XFxuICAgIC5jYXNldGFibGVfX3RibHNvcnRpY29uOmJlZm9yZSB7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICAgIGJvcmRlci1ib3R0b206IHNvbGlkIDVweCAjY2NjY2NjO1xcbiAgICAgIGJvcmRlci1sZWZ0OiBzb2xpZCA0cHggdHJhbnNwYXJlbnQ7XFxuICAgICAgYm9yZGVyLXJpZ2h0OiBzb2xpZCA0cHggdHJhbnNwYXJlbnQ7XFxuICAgICAgdG9wOiAycHg7IH1cXG4gIC5jYXNldGFibGVfX3BhZ2luYXRpb24ge1xcbiAgICBtYXJnaW46IDEwcHggMDtcXG4gICAgZm9udC1zaXplOiAxNHB4OyB9XFxuICAuY2FzZXRhYmxlX19wYWdlY29udCB7XFxuICAgIG1hcmdpbjogMTBweCAzMHB4IDEwcHggMDtcXG4gICAgZmxvYXQ6IGxlZnQ7IH1cXG4gIC5jYXNldGFibGVfX3BhZ2VsaXN0IHtcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIG1hcmdpbjogMCA1cHggNXB4OyB9XFxuICAuY2FzZXRhYmxlX19wYWdlbGluayB7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgY29sb3I6ICM0MjZkYTk7XFxuICAgIHBhZGRpbmc6IDAgNXB4IDVweDsgfVxcbiAgLmNhc2V0YWJsZV9fcm93c2NvbnQge1xcbiAgICBmbG9hdDogbGVmdDsgfVxcbiAgLmNhc2V0YWJsZV9fcm93c2xhYmVsIHtcXG4gICAgbWFyZ2luOiAxMHB4IDEwcHggMTBweCAwO1xcbiAgICBmbG9hdDogbGVmdDsgfVxcbiAgLmNhc2V0YWJsZV9fdG90YWxwYWdlIHtcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIG1hcmdpbjogMTBweCAwIDEwcHggMzBweDsgfVxcbiAgLmNhc2V0YWJsZV9fcm93c2VsZWN0IHtcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIG1hcmdpbjogNHB4IDAgMTBweCAwO1xcbiAgICBwYWRkaW5nOiA3cHggMTVweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG4gICAgLmNhc2V0YWJsZV9fcm93c2VsZWN0IG9wdGlvbiB7XFxuICAgICAgcGFkZGluZzogMTBweDsgfVxcbiAgLmNhc2V0YWJsZS0tcGFnZWxpbmthY3RpdmUge1xcbiAgICBjb2xvcjogIzAwMDAwMCAhaW1wb3J0YW50O1xcbiAgICBib3JkZXItYm90dG9tOiBzb2xpZCAycHggIzAwMDAwMDsgfVxcblxcbi5pY29uLS1wcmV2aW91cyB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB3aWR0aDogMTBweDtcXG4gIGhlaWdodDogMTBweDtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgbWFyZ2luLXRvcDogM3B4OyB9XFxuICAuaWNvbi0tcHJldmlvdXM6YmVmb3JlIHtcXG4gICAgYm9yZGVyLXJpZ2h0OiBzb2xpZCA3cHggI2NjY2NjYztcXG4gICAgYm9yZGVyLXRvcDogc29saWQgN3B4IHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXItYm90dG9tOiBzb2xpZCA3cHggdHJhbnNwYXJlbnQ7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHRvcDogMDsgfVxcbiAgLmljb24tLXByZXZpb3VzOmFmdGVyIHtcXG4gICAgYm9yZGVyLXJpZ2h0OiBzb2xpZCA3cHggI2ZmZmZmZjtcXG4gICAgYm9yZGVyLXRvcDogc29saWQgN3B4IHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXItYm90dG9tOiBzb2xpZCA3cHggdHJhbnNwYXJlbnQ7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDJweDtcXG4gICAgdG9wOiAwOyB9XFxuXFxuLmljb24tLW5leHQge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IDEwcHg7XFxuICBoZWlnaHQ6IDEwcHg7XFxuICBmbG9hdDogbGVmdDtcXG4gIG1hcmdpbi10b3A6IDNweDsgfVxcbiAgLmljb24tLW5leHQ6YmVmb3JlIHtcXG4gICAgYm9yZGVyLWxlZnQ6IHNvbGlkIDdweCAjNDI2ZGE5O1xcbiAgICBib3JkZXItdG9wOiBzb2xpZCA3cHggdHJhbnNwYXJlbnQ7XFxuICAgIGJvcmRlci1ib3R0b206IHNvbGlkIDdweCB0cmFuc3BhcmVudDtcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIHRvcDogMDsgfVxcbiAgLmljb24tLW5leHQ6YWZ0ZXIge1xcbiAgICBib3JkZXItbGVmdDogc29saWQgN3B4ICNmZmZmZmY7XFxuICAgIGJvcmRlci10b3A6IHNvbGlkIDdweCB0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyLWJvdHRvbTogc29saWQgN3B4IHRyYW5zcGFyZW50O1xcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICByaWdodDogMnB4O1xcbiAgICB0b3A6IDA7IH1cXG5cXG4uY3VyLS1wb2ludGVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLm1hci10cC0tMCB7XFxuICBtYXJnaW4tdG9wOiAwICFpbXBvcnRhbnQ7IH1cXG5cXG4ubWFyLXJ0LS1ub25lIHtcXG4gIG1hcmdpbi1yaWdodDogMCAhaW1wb3J0YW50OyB9XFxuXFxuLndkaC1wZXItLTEwIHtcXG4gIHdpZHRoOiAxMCUgIWltcG9ydGFudDsgfVxcblxcbi53ZGgtcGVyLS0yNSB7XFxuICB3aWR0aDogMjUlICFpbXBvcnRhbnQ7IH1cXG5cXG4ud2RoLXBlci0tMzUge1xcbiAgd2lkdGg6IDM1JSAhaW1wb3J0YW50OyB9XFxuXFxuLndkaC1wZXItLTEwMCB7XFxuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50OyB9XFxuXFxuLmJvci10cC0tbm9uZSB7XFxuICBib3JkZXItdG9wOiBub25lICFpbXBvcnRhbnQ7IH1cXG5cXG4uYm9yLXRwYnQtLW5vbmUge1xcbiAgYm9yZGVyLXRvcDogbm9uZSAhaW1wb3J0YW50O1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZSAhaW1wb3J0YW50OyB9XFxuXFxuLnR4dC1hbG4tLXJ0IHtcXG4gIHRleHQtYWxpZ246IHJpZ2h0OyB9XFxuXFxuLmZvbnQtd3Q1MDAge1xcbiAgZm9udC13ZWlnaHQ6IDUwMDsgfVxcblxcbi5mb250LXd0bm9ybWFsIHtcXG4gIGZvbnQtZmFtaWx5OiBSb2JvdG8gIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDsgfVxcblxcbi5wb3MtcmVsIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi50ZXh0LUNhcCB7XFxuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTsgfVxcblxcbi52LWFsaWduLXRvcCB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogdG9wOyB9XFxuXFxuLm1hcmdpbkJ0bTIwIHtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHggIWltcG9ydGFudDsgfVxcblxcbi5tYXJnaW5CdG0zMCB7XFxuICBtYXJnaW4tYm90dG9tOiAzMHB4ICFpbXBvcnRhbnQ7IH1cXG5cXG4ubWFyZ2luQnRtNDYge1xcbiAgbWFyZ2luLWJvdHRvbTogNDZweCAhaW1wb3J0YW50OyB9XFxuXFxuLm1hcmdpblRvcDIwIHtcXG4gIG1hcmdpbi10b3A6IDIwcHggIWltcG9ydGFudDsgfVxcblxcbi5tYXJnaW5MZnQzNiB7XFxuICBtYXJnaW4tbGVmdDogMzZweCAhaW1wb3J0YW50OyB9XFxuXFxuLmNvbnRhaW5lclNpZGUge1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGhlaWdodDogODcwcHg7XFxuICB3aWR0aDogMzAwcHg7IH1cXG4gIC5jb250YWluZXJTaWRlLmxlZnQge1xcbiAgICB3aWR0aDogMzMwcHg7XFxuICAgIHBhZGRpbmc6IDEwcHggMDsgfVxcbiAgLmNvbnRhaW5lclNpZGU6bGFzdC1jaGlsZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmNmY2ZjY7XFxuICAgIHBhZGRpbmc6IDEwcHggMDsgfVxcbiAgLmNvbnRhaW5lclNpZGU6Zmlyc3QtY2hpbGQge1xcbiAgICBwYWRkaW5nLXRvcDogMTVweDsgfVxcblxcbi5jb250YWluZXJNaWRkbGUge1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGhlaWdodDogODcwcHg7XFxuICBwYWRkaW5nLXRvcDogMTVweDtcXG4gIGZsZXg6IDAuOTU7XFxuICB2ZXJ0aWNhbC1hbGlnbjogdG9wOyB9XFxuICAuY29udGFpbmVyTWlkZGxlIGVkcy1jYXJkIGhlYWRlciB7XFxuICAgIGJvcmRlci1ib3R0b206IDA7IH1cXG4gIC5jb250YWluZXJNaWRkbGUgZWRzLWRyb3Bkb3duIHtcXG4gICAgbWFyZ2luLXRvcDogMjBweDsgfVxcblxcbi5jb250YWluZXJGbGV4IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBoZWlnaHQ6IDEwMDBweDsgfVxcblxcbmVkcy1hY2NvcmRpb246Zmlyc3QtY2hpbGQge1xcbiAgbWFyZ2luLXRvcDogMDsgfVxcblxcbmVkcy1jYXJkOmZpcnN0LWNoaWxkIHtcXG4gIG1hcmdpbi10b3A6IDA7IH1cXG5cXG5lZHMtY2FyZCBoZWFkZXIgaDQge1xcbiAgZm9udC13ZWlnaHQ6IDUwMCAhaW1wb3J0YW50OyB9XFxuXFxuZWRzLWNhcmQgaGVhZGVyIGRpdjpmaXJzdC1jaGlsZCB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXG5cXG5lZHMtY2FyZCBoZWFkZXIgZGl2Omxhc3QtY2hpbGQge1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrOyB9XFxuXFxuZWRzLWNhcmQgbWFpbiB7XFxuICBtYXJnaW46IC0yMHB4ICFpbXBvcnRhbnQ7XFxuICBtYXJnaW4tYm90dG9tOiAtMTVweCAhaW1wb3J0YW50OyB9XFxuXFxuZWRzLWRyb3Bkb3duIHtcXG4gIG1pbi13aWR0aDogMTMwcHg7IH1cXG5cXG4uZ3JleUhlYWRpbmcgYnV0dG9uLCAuZ3JleUhlYWRpbmcgaDUge1xcbiAgbWFyZ2luOiAwICFpbXBvcnRhbnQ7XFxuICBwYWRkaW5nLWxlZnQ6IDIwcHggIWltcG9ydGFudDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2UgIWltcG9ydGFudDtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBjb2xvcjogIzZkMjA3NzsgfVxcblxcbi50YWJsZSB7XFxuICBwYWRkaW5nOiAxMHB4IDA7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHdpZHRoOiAxMDAlOyB9XFxuICAudGFibGUgLnJvdyB7XFxuICAgIHBhZGRpbmc6IDNweCAyMHB4OyB9XFxuXFxuLmV2ZW4tc3R5bGUgLnJvdzpudGgtY2hpbGQoZXZlbikge1xcbiAgYmFja2dyb3VuZDogI2Y2ZjZmNjsgfVxcblxcbi5yb3cge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB3aWR0aDogMTAwJTsgfVxcbiAgLnJvdyA+IC5jZWxsIHtcXG4gICAgdmVydGljYWwtYWxpZ246IHRvcDsgfVxcblxcbi5jZWxsIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiA0OSU7XFxuICBmb250LXNpemU6IDEzcHg7IH1cXG4gIC5jZWxsOmZpcnN0LWNoaWxkIHtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgZm9udC13ZWlnaHQ6IDUwMDsgfVxcbiAgLmNlbGw6bGFzdC1jaGlsZCB7XFxuICAgIHRleHQtYWxpZ246IHJpZ2h0OyB9XFxuXFxuLnRhYmxlLm1pZGRsZSAuY2VsbCB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aWR0aDogNDklO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgd2lkdGg6IDIyJTtcXG4gIHBhZGRpbmc6IDVweDsgfVxcbiAgLnRhYmxlLm1pZGRsZSAuY2VsbDpmaXJzdC1jaGlsZCB7XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7IH1cXG4gIC50YWJsZS5taWRkbGUgLmNlbGw6bGFzdC1jaGlsZCB7XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7IH1cXG5cXG4udGFibGUubWlkZGxlIC5yb3cge1xcbiAgd2lkdGg6IDEwMCU7IH1cXG5cXG5lZHMtYWNjb3JkaW9uLXBhbmVsW2FyaWEtZXhwYW5kZWQ9XFxcImZhbHNlXFxcIl0gLnRhYmxlIHtcXG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfVxcblxcbmVkcy1pY29uLnJvdW5kLWJvcmRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGU2ZWI3O1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgd2lkdGg6IDIxcHg7XFxuICBoZWlnaHQ6IDIxcHg7XFxuICB2ZXJ0aWNhbC1hbGlnbjogdGV4dC1ib3R0b207IH1cXG4gIGVkcy1pY29uLnJvdW5kLWJvcmRlciBpIHtcXG4gICAgZm9udC1zaXplOiAxM3B4O1xcbiAgICBwYWRkaW5nLXRvcDogM3B4OyB9XFxuXFxuYnV0dG9uLmVkcy1hY2NvcmRpb24tbGFiZWwsIGg1LmVkcy1hY2NvcmRpb24tbGFiZWwge1xcbiAgaGVpZ2h0OiBhdXRvICFpbXBvcnRhbnQ7IH1cXG5cXG5lZHMtb3B0aW9uIHtcXG4gIGRpc3BsYXk6IG5vbmU7IH1cXG5cXG4uYWNjdC1jb250YWluZXIgLnRhYmxlLm1pZGRsZSAuY2VsbDpudGgtY2hpbGQoMikge1xcbiAgd2lkdGg6IDE1JTsgfVxcblxcbi5ldmVuSGlnaGxpZ2h0IC5yb3c6bnRoLWNoaWxkKGV2ZW4pIHtcXG4gIGJhY2tncm91bmQ6ICNmNmY2ZjY7IH1cXG5cXG4ub2RkSGlnaGxpZ2h0IC5yb3c6bnRoLWNoaWxkKG9kZCkge1xcbiAgYmFja2dyb3VuZDogI2Y2ZjZmNjsgfVxcblxcbltzbG90PVxcXCJzbG90LWhlYWRlci1jZW50ZXJcXFwiXSB7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Q4ZDhkODtcXG4gIHBhZGRpbmctYm90dG9tOiA4cHg7IH1cXG5cXG4uZm9ybS1zd2l0Y2gge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDsgfVxcblxcbi5mb3JtLXN3aXRjaCBpIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIG1hcmdpbi1yaWdodDogLjVyZW07XFxuICB3aWR0aDogNDZweDtcXG4gIGhlaWdodDogMjZweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM4ODg4ODg7XFxuICBib3JkZXItcmFkaXVzOiAyM3B4O1xcbiAgdmVydGljYWwtYWxpZ246IHRleHQtYm90dG9tO1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgbGluZWFyO1xcbiAgdG9wOiA1cHg7XFxuICBtYXJnaW4tbGVmdDogNXB4OyB9XFxuXFxuLmZvcm0tc3dpdGNoIGk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogNDJweDtcXG4gIGhlaWdodDogMjJweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNmY2ZjY7XFxuICBib3JkZXItcmFkaXVzOiAxMXB4O1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgycHgsIDJweCwgMCkgc2NhbGUzZCgxLCAxLCAxKTtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjI1cyBsaW5lYXI7IH1cXG5cXG4uZm9ybS1zd2l0Y2ggaTo6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAycHg7XFxuICB3aWR0aDogMTZweDtcXG4gIGhlaWdodDogMTZweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM4ODg4ODg7XFxuICBib3JkZXItcmFkaXVzOiAxMXB4O1xcbiAgYm94LXNoYWRvdzogMCAycHggMnB4IHJnYmEoMCwgMCwgMCwgMC4yNCk7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDJweCwgMnB4LCAwKTtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2UtaW4tb3V0O1xcbiAgdG9wOiAzcHg7IH1cXG5cXG4uZm9ybS1zd2l0Y2g6YWN0aXZlIGk6OmFmdGVyIHtcXG4gIHdpZHRoOiAyOHB4O1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgycHgsIDJweCwgMCk7IH1cXG5cXG4uZm9ybS1zd2l0Y2g6YWN0aXZlIGlucHV0OmNoZWNrZWQgKyBpOjphZnRlciB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDE2cHgsIDJweCwgMCk7IH1cXG5cXG4uZm9ybS1zd2l0Y2ggaW5wdXQge1xcbiAgZGlzcGxheTogbm9uZTsgfVxcblxcbi5mb3JtLXN3aXRjaCBpbnB1dDpjaGVja2VkICsgaSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNEJENzYzOyB9XFxuXFxuLmZvcm0tc3dpdGNoIGlucHV0OmNoZWNrZWQgKyBpOjpiZWZvcmUge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxOHB4LCAycHgsIDApIHNjYWxlM2QoMCwgMCwgMCk7IH1cXG5cXG4uZm9ybS1zd2l0Y2ggaW5wdXQ6Y2hlY2tlZCArIGk6OmFmdGVyIHtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMjJweCwgMnB4LCAwKTsgfVxcblxcbi5zb3J0LWZpbHRlciB7XFxuICBiYWNrZ3JvdW5kOiAjZDJlOGY5O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXG4gIGZsZXg6IDU7XFxuICBwYWRkaW5nOiA1cHggMTVweDsgfVxcbiAgLnNvcnQtZmlsdGVyIGVkcy1kcm9wZG93biB7XFxuICAgIG1hcmdpbjogMDsgfVxcbiAgLnNvcnQtZmlsdGVyIGxhYmVsIHtcXG4gICAgdmVydGljYWwtYWxpZ246IHN1cGVyO1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7IH1cXG4gIC5zb3J0LWZpbHRlciA+IGRpdiB7XFxuICAgIGZsZXg6IDE7IH1cXG4gIC5zb3J0LWZpbHRlciA+IGRpdjpmaXJzdC1jaGlsZCB7XFxuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7IH1cXG4gIC5zb3J0LWZpbHRlciA+IGRpdjpsYXN0LWNoaWxkIHtcXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7IH1cXG5cXG4uYWNjdC1jb250YWluZXIgLnNvcnQtZmlsdGVyIGVkcy1kcm9wZG93biB7XFxuICBtaW4td2lkdGg6IDE1MHB4OyB9XFxuXFxuLmNvbnRhY3QtZGV0YWlscy1jYXJkIC50YWJsZSB7XFxuICBwYWRkaW5nOiAwOyB9XFxuICAuY29udGFjdC1kZXRhaWxzLWNhcmQgLnRhYmxlIC5yb3c6Zmlyc3QtY2hpbGQgLmNlbGw6bGFzdC1jaGlsZCB7XFxuICAgIHdpZHRoOiA0MyU7IH1cXG4gIC5jb250YWN0LWRldGFpbHMtY2FyZCAudGFibGUgLnJvdyB7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZDhkOGQ4O1xcbiAgICBwYWRkaW5nOiAxMHB4IDIwcHg7IH1cXG4gICAgLmNvbnRhY3QtZGV0YWlscy1jYXJkIC50YWJsZSAucm93IC5jZWxsOmZpcnN0LWNoaWxkIHtcXG4gICAgICB3aWR0aDogMzQlOyB9XFxuICAgIC5jb250YWN0LWRldGFpbHMtY2FyZCAudGFibGUgLnJvdyAuY2VsbDpsYXN0LWNoaWxkIHtcXG4gICAgICB3aWR0aDogNjMlOyB9XFxuICAuY29udGFjdC1kZXRhaWxzLWNhcmQgLnRhYmxlIC5yb3cgLmNlbGwge1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0OyB9XFxuXFxuLnRhYmxlIHRhYmxlIHtcXG4gIHdpZHRoOiAxMDAlOyB9XFxuICAudGFibGUgdGFibGUgLnJvdyB7XFxuICAgIHBhZGRpbmc6IDNweCAxMnB4O1xcbiAgICBtYXJnaW4tYm90dG9tOiAzcHg7IH1cXG4gICAgLnRhYmxlIHRhYmxlIC5yb3cgLmNlbGwge1xcbiAgICAgIHBhZGRpbmc6IDA7IH1cXG5cXG4udGFibGUudGFibGVkYXRhIHtcXG4gIHBhZGRpbmc6IDEwcHggMTlweDsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLm1hci10cC0tMCB7XFxuICBtYXJnaW4tdG9wOiAwICFpbXBvcnRhbnQ7IH1cXG5cXG4ubWFyLXJ0LS1ub25lIHtcXG4gIG1hcmdpbi1yaWdodDogMCAhaW1wb3J0YW50OyB9XFxuXFxuLndkaC1wZXItLTEwIHtcXG4gIHdpZHRoOiAxMCUgIWltcG9ydGFudDsgfVxcblxcbi53ZGgtcGVyLS0yNSB7XFxuICB3aWR0aDogMjUlICFpbXBvcnRhbnQ7IH1cXG5cXG4ud2RoLXBlci0tMzUge1xcbiAgd2lkdGg6IDM1JSAhaW1wb3J0YW50OyB9XFxuXFxuLndkaC1wZXItLTEwMCB7XFxuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50OyB9XFxuXFxuLmJvci10cC0tbm9uZSB7XFxuICBib3JkZXItdG9wOiBub25lICFpbXBvcnRhbnQ7IH1cXG5cXG4uYm9yLXRwYnQtLW5vbmUge1xcbiAgYm9yZGVyLXRvcDogbm9uZSAhaW1wb3J0YW50O1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZSAhaW1wb3J0YW50OyB9XFxuXFxuLnR4dC1hbG4tLXJ0IHtcXG4gIHRleHQtYWxpZ246IHJpZ2h0OyB9XFxuXFxuLypcXG4gKiBUaGVzZSB2YXJpYWJsZXMgYXJlIGF2YWlsYWJsZSB0byBhbGwgY29tcG9uZW50cyBnbG9iYWxseSBhbmQgYXJlIHRodXMgZGVzaWduYXRlZCB3aXRoIGFuIFxcXCJlZHMtXFxcIiBwcmVmaXguXFxuICogQ29tcG9uZW50cyBtYXkgaW1wbGVtZW50IHRoZXNlIGFuZCBwYXNzLXRocm91Z2ggdG8gYSBsb2NhbCB2YXJpYWJsZSBuYW1lLlxcbiAqL1xcbi8qXFxuICogVGhlc2UgdmFyaWFibGVzIGFyZSBhdmFpbGFibGUgdG8gYWxsIGNvbXBvbmVudHMgZ2xvYmFsbHkgYW5kIGFyZSB0aHVzIGRlc2lnbmF0ZWQgd2l0aCBhbiBcXFwiZWRzLVxcXCIgcHJlZml4LlxcbiAqIENvbXBvbmVudHMgbWF5IGltcGxlbWVudCB0aGVzZSBhbmQgcGFzcy10aHJvdWdoIHRvIGEgbG9jYWwgdmFyaWFibGUgbmFtZS5cXG4gKi9cXG5lZHMtY2FyZCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBtYXJnaW46IDIwcHggMDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNkOGQ4ZDg7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmOyB9XFxuICBlZHMtY2FyZCA+IGgxIHtcXG4gICAgbWFyZ2luLXRvcDogMDsgfVxcbiAgZWRzLWNhcmQgPiBoMiB7XFxuICAgIG1hcmdpbi10b3A6IDA7IH1cXG4gIGVkcy1jYXJkID4gaDMge1xcbiAgICBtYXJnaW4tdG9wOiAwOyB9XFxuICBlZHMtY2FyZCA+IGg0IHtcXG4gICAgbWFyZ2luLXRvcDogMDsgfVxcbiAgZWRzLWNhcmQgPiBoNSB7XFxuICAgIG1hcmdpbi10b3A6IDA7IH1cXG4gIGVkcy1jYXJkID4gaDYge1xcbiAgICBtYXJnaW4tdG9wOiAwOyB9XFxuICBlZHMtY2FyZCBwIHtcXG4gICAgbWFyZ2luLXRvcDogMDsgfVxcbiAgICBlZHMtY2FyZCBwOmxhc3QtY2hpbGQge1xcbiAgICAgIG1hcmdpbi1ib3R0b206IDA7IH1cXG4gIGVkcy1jYXJkIGhlYWRlciB7XFxuICAgIG1hcmdpbjogLTIwcHggLTIwcHggMjBweDtcXG4gICAgcGFkZGluZzogMTJweCAyMHB4O1xcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Q4ZDhkODsgfVxcbiAgICBlZHMtY2FyZCBoZWFkZXIgPiBoMSB7XFxuICAgICAgbWFyZ2luOiAwOyB9XFxuICAgIGVkcy1jYXJkIGhlYWRlciA+IGgyIHtcXG4gICAgICBtYXJnaW46IDA7IH1cXG4gICAgZWRzLWNhcmQgaGVhZGVyID4gaDMge1xcbiAgICAgIG1hcmdpbjogMDsgfVxcbiAgICBlZHMtY2FyZCBoZWFkZXIgPiBoNCB7XFxuICAgICAgbWFyZ2luOiAwOyB9XFxuICAgIGVkcy1jYXJkIGhlYWRlciA+IGg1IHtcXG4gICAgICBtYXJnaW46IDA7IH1cXG4gICAgZWRzLWNhcmQgaGVhZGVyID4gaDYge1xcbiAgICAgIG1hcmdpbjogMDsgfVxcbiAgICBlZHMtY2FyZCBoZWFkZXIgcCB7XFxuICAgICAgbWFyZ2luOiAwOyB9XFxuICBlZHMtY2FyZCBoZWFkZXIuZmx1c2gge1xcbiAgICBwYWRkaW5nOiAwOyB9XFxuICAgIGVkcy1jYXJkIGhlYWRlci5mbHVzaCBlZHMtdG9vbGJhciB7XFxuICAgICAgYm9yZGVyLWJvdHRvbTogMDsgfVxcbiAgZWRzLWNhcmQgbWFpbiB7XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjRyZW07IH1cXG4gIGVkcy1jYXJkIGZvb3RlciB7XFxuICAgIG1hcmdpbjogMjBweCAtMjBweCAtMjBweDtcXG4gICAgcGFkZGluZzogMTVweCAyMHB4O1xcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2Q4ZDhkODsgfVxcbiAgICBlZHMtY2FyZCBmb290ZXIgcDpsYXN0LWNoaWxkIHtcXG4gICAgICBtYXJnaW46IDA7IH1cXG4gIGVkcy1jYXJkIGZvb3Rlci5mbHVzaCB7XFxuICAgIHBhZGRpbmc6IDA7IH1cXG4gICAgZWRzLWNhcmQgZm9vdGVyLmZsdXNoIGVkcy10b29sYmFyIHtcXG4gICAgICBib3JkZXItYm90dG9tOiAwOyB9XFxuXFxuZWRzLWNhcmRbYmFja2dyb3VuZD0nZ3JheSddIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNmY2ZjY7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5tYXItdHAtLTAge1xcbiAgbWFyZ2luLXRvcDogMCAhaW1wb3J0YW50OyB9XFxuXFxuLm1hci1ydC0tbm9uZSB7XFxuICBtYXJnaW4tcmlnaHQ6IDAgIWltcG9ydGFudDsgfVxcblxcbi53ZGgtcGVyLS0xMCB7XFxuICB3aWR0aDogMTAlICFpbXBvcnRhbnQ7IH1cXG5cXG4ud2RoLXBlci0tMjUge1xcbiAgd2lkdGg6IDI1JSAhaW1wb3J0YW50OyB9XFxuXFxuLndkaC1wZXItLTM1IHtcXG4gIHdpZHRoOiAzNSUgIWltcG9ydGFudDsgfVxcblxcbi53ZGgtcGVyLS0xMDAge1xcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDsgfVxcblxcbi5ib3ItdHAtLW5vbmUge1xcbiAgYm9yZGVyLXRvcDogbm9uZSAhaW1wb3J0YW50OyB9XFxuXFxuLmJvci10cGJ0LS1ub25lIHtcXG4gIGJvcmRlci10b3A6IG5vbmUgIWltcG9ydGFudDtcXG4gIGJvcmRlci1ib3R0b206IG5vbmUgIWltcG9ydGFudDsgfVxcblxcbi50eHQtYWxuLS1ydCB7XFxuICB0ZXh0LWFsaWduOiByaWdodDsgfVxcblxcbi8qXFxuICogVGhlc2UgdmFyaWFibGVzIGFyZSBhdmFpbGFibGUgdG8gYWxsIGNvbXBvbmVudHMgZ2xvYmFsbHkgYW5kIGFyZSB0aHVzIGRlc2lnbmF0ZWQgd2l0aCBhbiBcXFwiZWRzLVxcXCIgcHJlZml4LlxcbiAqIENvbXBvbmVudHMgbWF5IGltcGxlbWVudCB0aGVzZSBhbmQgcGFzcy10aHJvdWdoIHRvIGEgbG9jYWwgdmFyaWFibGUgbmFtZS5cXG4gKi9cXG4vKlxcbiAqIFRoZXNlIHZhcmlhYmxlcyBhcmUgYXZhaWxhYmxlIHRvIGFsbCBjb21wb25lbnRzIGdsb2JhbGx5IGFuZCBhcmUgdGh1cyBkZXNpZ25hdGVkIHdpdGggYW4gXFxcImVkcy1cXFwiIHByZWZpeC5cXG4gKiBDb21wb25lbnRzIG1heSBpbXBsZW1lbnQgdGhlc2UgYW5kIHBhc3MtdGhyb3VnaCB0byBhIGxvY2FsIHZhcmlhYmxlIG5hbWUuXFxuICovXFxuZWRzLWRyb3Bkb3duIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tOyB9XFxuICBlZHMtZHJvcGRvd24gLnNsb3R0ZWQge1xcbiAgICBkaXNwbGF5OiBub25lOyB9XFxuICBlZHMtZHJvcGRvd24gPiBsYWJlbCB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIiwgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICBmb250LXdlaWdodDogNDAwO1xcbiAgICBjb2xvcjogIzMzMzMzMztcXG4gICAgZm9udC1zaXplOiAwLjg4cmVtO1xcbiAgICBmb250LXdlaWdodDogNTAwO1xcbiAgICBsaW5lLWhlaWdodDogMXJlbTtcXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDsgfVxcbiAgZWRzLWRyb3Bkb3duID4gbGFiZWwuc2hvdyB7XFxuICAgIGRpc3BsYXk6IGJsb2NrOyB9XFxuICBlZHMtZHJvcGRvd24gLmVkcy1kcm9wZG93bi10cmlnZ2VyIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIiwgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICBmb250LXdlaWdodDogNDAwO1xcbiAgICBjb2xvcjogIzMzMzMzMztcXG4gICAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcXG4gICAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuICAgIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XFxuICAgIHBhZGRpbmc6IDVweCAxMHB4O1xcbiAgICBsaW5lLWhlaWdodDogMS40cmVtO1xcbiAgICBtaW4taGVpZ2h0OiAzNHB4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjOTM5MzkzO1xcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjE1cyBlYXNlO1xcbiAgICBvdXRsaW5lOiBub25lOyB9XFxuICAgIGVkcy1kcm9wZG93biAuZWRzLWRyb3Bkb3duLXRyaWdnZXIgLmVkcy1kcm9wZG93bi1wbGFjZWhvbGRlciB7XFxuICAgICAgZGlzcGxheTogbm9uZTtcXG4gICAgICBjb2xvcjogI2I5YjliOTtcXG4gICAgICBmb250LXdlaWdodDogNDAwOyB9XFxuICAgIGVkcy1kcm9wZG93biAuZWRzLWRyb3Bkb3duLXRyaWdnZXIgLmVkcy1kcm9wZG93bi1wbGFjZWhvbGRlci5zaG93IHtcXG4gICAgICBkaXNwbGF5OiBibG9jazsgfVxcbiAgICBlZHMtZHJvcGRvd24gLmVkcy1kcm9wZG93bi10cmlnZ2VyIC5lZHMtZHJvcGRvd24tYXJyb3cge1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICBib3R0b206IDE0cHg7XFxuICAgICAgcmlnaHQ6IDEwcHg7XFxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgIHdpZHRoOiAwO1xcbiAgICAgIGhlaWdodDogMDtcXG4gICAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCAjNDI2ZGE5OyB9XFxuICAgIGVkcy1kcm9wZG93biAuZWRzLWRyb3Bkb3duLXRyaWdnZXI6OmFmdGVyIHtcXG4gICAgICBjb250ZW50OiAnJztcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgdG9wOiAtMnB4O1xcbiAgICAgIGxlZnQ6IC0ycHg7XFxuICAgICAgcmlnaHQ6IC0ycHg7XFxuICAgICAgYm90dG9tOiAtMnB4O1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgICBib3JkZXI6IDJweCBzb2xpZCAjNDI2ZGE5O1xcbiAgICAgIG9wYWNpdHk6IDA7XFxuICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjE1cyBlYXNlOyB9XFxuICAgIGVkcy1kcm9wZG93biAuZWRzLWRyb3Bkb3duLXRyaWdnZXI6Zm9jdXMge1xcbiAgICAgIG91dGxpbmU6IC13ZWJraXQtZm9jdXMtcmluZy1jb2xvciBhdXRvIDVweDsgfVxcbiAgICAgIGVkcy1kcm9wZG93biAuZWRzLWRyb3Bkb3duLXRyaWdnZXI6Zm9jdXM6OmFmdGVyIHtcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxuICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMTVzIGVhc2U7IH1cXG4gIGVkcy1kcm9wZG93biAuZWRzLWRyb3Bkb3duLXRyaWdnZXIuZm9jdXM6OmFmdGVyIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjE1cyBlYXNlOyB9XFxuICBlZHMtZHJvcGRvd24gLmVkcy1kcm9wZG93bi1vcHRpb25zIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB6LWluZGV4OiAxMDAwO1xcbiAgICB0b3A6IGNhbGMoMTAwJSArIDhweCk7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZDhkOGQ4O1xcbiAgICBiYWNrZ3JvdW5kLWNsaXA6IGJvcmRlci1ib3g7XFxuICAgIGJveC1zaGFkb3c6IDAgMnB4IDRweCAwIHJnYmEoMCwgMCwgMCwgMC4xMik7XFxuICAgIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICAgIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjE1cyBlYXNlLCBvcGFjaXR5IDAuMTVzIGVhc2U7IH1cXG4gICAgZWRzLWRyb3Bkb3duIC5lZHMtZHJvcGRvd24tb3B0aW9ucyAuZWRzLWRyb3Bkb3duLXNlYXJjaGJveCB7XFxuICAgICAgZGlzcGxheTogbm9uZTtcXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkOGQ4ZDg7XFxuICAgICAgcGFkZGluZzogNXB4OyB9XFxuICAgICAgZWRzLWRyb3Bkb3duIC5lZHMtZHJvcGRvd24tb3B0aW9ucyAuZWRzLWRyb3Bkb3duLXNlYXJjaGJveDo6YWZ0ZXIge1xcbiAgICAgICAgY29udGVudDogJyc7XFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICB0b3A6IDVweDtcXG4gICAgICAgIGxlZnQ6IDVweDtcXG4gICAgICAgIHJpZ2h0OiA1cHg7XFxuICAgICAgICBib3R0b206IDVweDtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICM0MjZkYTk7XFxuICAgICAgICBvcGFjaXR5OiAwO1xcbiAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjE1cyBlYXNlOyB9XFxuICAgICAgZWRzLWRyb3Bkb3duIC5lZHMtZHJvcGRvd24tb3B0aW9ucyAuZWRzLWRyb3Bkb3duLXNlYXJjaGJveDpmb2N1czo6YWZ0ZXIge1xcbiAgICAgICAgb3BhY2l0eTogMTtcXG4gICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4xNXMgZWFzZTsgfVxcbiAgICAgIGVkcy1kcm9wZG93biAuZWRzLWRyb3Bkb3duLW9wdGlvbnMgLmVkcy1kcm9wZG93bi1zZWFyY2hib3ggLmVkcy1zZWFyY2gtaWNvbiB7XFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICB0b3A6IDEwcHg7XFxuICAgICAgICByaWdodDogMTJweDtcXG4gICAgICAgIHdpZHRoOiAyMHB4O1xcbiAgICAgICAgaGVpZ2h0OiAyMHB4OyB9XFxuICAgICAgICBlZHMtZHJvcGRvd24gLmVkcy1kcm9wZG93bi1vcHRpb25zIC5lZHMtZHJvcGRvd24tc2VhcmNoYm94IC5lZHMtc2VhcmNoLWljb24gc3ZnIHtcXG4gICAgICAgICAgZmlsbDogIzQyNmRhOTtcXG4gICAgICAgICAgd2lkdGg6IDIwcHg7IH1cXG4gICAgICBlZHMtZHJvcGRvd24gLmVkcy1kcm9wZG93bi1vcHRpb25zIC5lZHMtZHJvcGRvd24tc2VhcmNoYm94IGlucHV0IHtcXG4gICAgICAgIG91dGxpbmU6IG5vbmU7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgICAgcGFkZGluZzogNXB4IDEwcHg7XFxuICAgICAgICBib3JkZXI6IG5vbmU7XFxuICAgICAgICBsaW5lLWhlaWdodDogMS40cmVtO1xcbiAgICAgICAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG9cXFwiLCBcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gICAgICAgIGNvbG9yOiAjMzMzMzMzO1xcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxcbiAgICBlZHMtZHJvcGRvd24gLmVkcy1kcm9wZG93bi1vcHRpb25zIC5lZHMtZHJvcGRvd24tc2VhcmNoYm94LmZvY3VzOjphZnRlciB7XFxuICAgICAgb3BhY2l0eTogMTtcXG4gICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMTVzIGVhc2U7IH1cXG4gICAgZWRzLWRyb3Bkb3duIC5lZHMtZHJvcGRvd24tb3B0aW9ucyAuZWRzLWRyb3Bkb3duLXNlYXJjaGJveC5zaG93IHtcXG4gICAgICBkaXNwbGF5OiBibG9jazsgfVxcbiAgICBlZHMtZHJvcGRvd24gLmVkcy1kcm9wZG93bi1vcHRpb25zIHVsIHtcXG4gICAgICBwYWRkaW5nOiA1cHggMDtcXG4gICAgICBtYXJnaW46IDJweCAwIDA7XFxuICAgICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgICBtYXgtaGVpZ2h0OiAyODBweDtcXG4gICAgICBvdmVyZmxvdzogYXV0bzsgfVxcbiAgICAgIGVkcy1kcm9wZG93biAuZWRzLWRyb3Bkb3duLW9wdGlvbnMgdWwgbGkge1xcbiAgICAgICAgbWFyZ2luOiAwO1xcbiAgICAgICAgcGFkZGluZzogMTBweCAyMHB4O1xcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICAgIG1pbi1oZWlnaHQ6IDQwcHg7XFxuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgICAgb3V0bGluZTogbm9uZTsgfVxcbiAgICAgICAgZWRzLWRyb3Bkb3duIC5lZHMtZHJvcGRvd24tb3B0aW9ucyB1bCBsaTo6YWZ0ZXIge1xcbiAgICAgICAgICBjb250ZW50OiAnJztcXG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgICB0b3A6IDBweDtcXG4gICAgICAgICAgbGVmdDogMHB4O1xcbiAgICAgICAgICByaWdodDogMHB4O1xcbiAgICAgICAgICBib3R0b206IDBweDtcXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMDtcXG4gICAgICAgICAgYm9yZGVyOiAycHggc29saWQgIzQyNmRhOTtcXG4gICAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjE1cyBlYXNlOyB9XFxuICAgICAgICBlZHMtZHJvcGRvd24gLmVkcy1kcm9wZG93bi1vcHRpb25zIHVsIGxpOmZvY3VzOjphZnRlciB7XFxuICAgICAgICAgIG9wYWNpdHk6IDE7XFxuICAgICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4xNXMgZWFzZTsgfVxcbiAgICAgICAgZWRzLWRyb3Bkb3duIC5lZHMtZHJvcGRvd24tb3B0aW9ucyB1bCBsaTpob3ZlciB7XFxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICM0MjZkYTk7XFxuICAgICAgICAgIGNvbG9yOiAjZmZmZmZmOyB9XFxuICAgICAgICBlZHMtZHJvcGRvd24gLmVkcy1kcm9wZG93bi1vcHRpb25zIHVsIGxpIGVkcy1jaGVja2JveCB7XFxuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgICAgdG9wOiAxMnB4O1xcbiAgICAgICAgICBsZWZ0OiAyMHB4OyB9XFxuICAgICAgZWRzLWRyb3Bkb3duIC5lZHMtZHJvcGRvd24tb3B0aW9ucyB1bCBsaS5mb2N1czo6YWZ0ZXIge1xcbiAgICAgICAgb3BhY2l0eTogMTtcXG4gICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4xNXMgZWFzZTsgfVxcbiAgICAgIGVkcy1kcm9wZG93biAuZWRzLWRyb3Bkb3duLW9wdGlvbnMgdWwgbGkuZWRzLWNoZWNrYm94LW9wdGlvbiB7XFxuICAgICAgICBwYWRkaW5nLWxlZnQ6IDQ4cHg7IH1cXG5cXG5lZHMtZHJvcGRvd24uZWRzLWRyb3Bkb3duLW9wZW4gLmVkcy1kcm9wZG93bi1vcHRpb25zIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb3BhY2l0eTogMTsgfVxcblxcbmVkcy1kcm9wZG93bltkaXNhYmxlZF0ge1xcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDsgfVxcbiAgZWRzLWRyb3Bkb3duW2Rpc2FibGVkXSAuZWRzLWRyb3Bkb3duLXRyaWdnZXIge1xcbiAgICBib3JkZXItY29sb3I6ICNjY2NjY2M7XFxuICAgIGNvbG9yOiAjODg4ODg4OyB9XFxuICAgIGVkcy1kcm9wZG93bltkaXNhYmxlZF0gLmVkcy1kcm9wZG93bi10cmlnZ2VyOmZvY3VzIHtcXG4gICAgICBib3JkZXItY29sb3I6ICNjY2NjY2M7XFxuICAgICAgY29sb3I6ICM4ODg4ODg7IH1cXG4gICAgICBlZHMtZHJvcGRvd25bZGlzYWJsZWRdIC5lZHMtZHJvcGRvd24tdHJpZ2dlcjpmb2N1czo6YWZ0ZXIge1xcbiAgICAgICAgb3BhY2l0eTogMDsgfVxcbiAgICAgIGVkcy1kcm9wZG93bltkaXNhYmxlZF0gLmVkcy1kcm9wZG93bi10cmlnZ2VyOmZvY3VzIC5lZHMtZHJvcGRvd24tYXJyb3cge1xcbiAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogI2NjY2NjYzsgfVxcbiAgICBlZHMtZHJvcGRvd25bZGlzYWJsZWRdIC5lZHMtZHJvcGRvd24tdHJpZ2dlcjo6YWZ0ZXIge1xcbiAgICAgIG9wYWNpdHk6IDA7IH1cXG4gICAgZWRzLWRyb3Bkb3duW2Rpc2FibGVkXSAuZWRzLWRyb3Bkb3duLXRyaWdnZXIgLmVkcy1kcm9wZG93bi1hcnJvdyB7XFxuICAgICAgYm9yZGVyLXRvcC1jb2xvcjogI2NjY2NjYzsgfVxcblxcbi5hY2N0LWNvbnRhaW5lciBlZHMtZHJvcGRvd24ge1xcbiAgbWluLXdpZHRoOiAxODFweDsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLm1hci10cC0tMCB7XFxuICBtYXJnaW4tdG9wOiAwICFpbXBvcnRhbnQ7IH1cXG5cXG4ubWFyLXJ0LS1ub25lIHtcXG4gIG1hcmdpbi1yaWdodDogMCAhaW1wb3J0YW50OyB9XFxuXFxuLndkaC1wZXItLTEwIHtcXG4gIHdpZHRoOiAxMCUgIWltcG9ydGFudDsgfVxcblxcbi53ZGgtcGVyLS0yNSB7XFxuICB3aWR0aDogMjUlICFpbXBvcnRhbnQ7IH1cXG5cXG4ud2RoLXBlci0tMzUge1xcbiAgd2lkdGg6IDM1JSAhaW1wb3J0YW50OyB9XFxuXFxuLndkaC1wZXItLTEwMCB7XFxuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50OyB9XFxuXFxuLmJvci10cC0tbm9uZSB7XFxuICBib3JkZXItdG9wOiBub25lICFpbXBvcnRhbnQ7IH1cXG5cXG4uYm9yLXRwYnQtLW5vbmUge1xcbiAgYm9yZGVyLXRvcDogbm9uZSAhaW1wb3J0YW50O1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZSAhaW1wb3J0YW50OyB9XFxuXFxuLnR4dC1hbG4tLXJ0IHtcXG4gIHRleHQtYWxpZ246IHJpZ2h0OyB9XFxuXFxuYm9keS5lZHMge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIiwgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBjb2xvcjogIzMzMzMzMzsgfVxcbiAgYm9keS5lZHMgKiB7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cXG4gICAgYm9keS5lZHMgKjo6YmVmb3JlIHtcXG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuICAgIGJvZHkuZWRzICo6OmFmdGVyIHtcXG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuXFxuYm9keS5lZHMuZWRzLXNob3ctYm9keSB7XFxuICBkaXNwbGF5OiBibG9jazsgfVxcblxcbi5lZHMge1xcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcXG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIiwgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcXG4gIGxpbmUtaGVpZ2h0OiAxLjRlbTsgfVxcbiAgLmVkcyBhIHtcXG4gICAgY29sb3I6ICM0MjZkYTk7IH1cXG4gICAgLmVkcyBhOmhvdmVyIHtcXG4gICAgICBjb2xvcjogIzE2M2M2ZjsgfVxcbiAgLmVkcyBoMSB7XFxuICAgIGNvbG9yOiAjMzMzMzMzO1xcbiAgICBmb250LXdlaWdodDogMzAwO1xcbiAgICBsaW5lLWhlaWdodDogMS40ZW07XFxuICAgIGZvbnQtc2l6ZTogMzBweDsgfVxcbiAgLmVkcyBoMiB7XFxuICAgIGNvbG9yOiAjMzMzMzMzO1xcbiAgICBmb250LXdlaWdodDogMzAwO1xcbiAgICBsaW5lLWhlaWdodDogMS40ZW07XFxuICAgIGZvbnQtc2l6ZTogMjRweDsgfVxcbiAgLmVkcyBoMyB7XFxuICAgIGNvbG9yOiAjMzMzMzMzO1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgZm9udC1zaXplOiAxOHB4OyB9XFxuICAuZWRzIGg0IHtcXG4gICAgY29sb3I6ICMzMzMzMzM7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICBmb250LXNpemU6IDE2cHg7IH1cXG4gIC5lZHMgaDUge1xcbiAgICBjb2xvcjogIzMzMzMzMztcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7IH1cXG4gIC5lZHMgaDFbY2Fwc10ge1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgICBjb2xvcjogIzZkMjA3NztcXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gICAgZm9udC1zaXplOiAyOHB4OyB9XFxuICAuZWRzIGgyW2NhcHNdIHtcXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gICAgY29sb3I6ICM2ZDIwNzc7XFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICAgIGZvbnQtc2l6ZTogMjJweDsgfVxcbiAgLmVkcyBoM1tjYXBzXSB7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgIGNvbG9yOiAjNmQyMDc3O1xcbiAgICBmb250LXdlaWdodDogNDAwO1xcbiAgICBmb250LXNpemU6IDE2cHg7IH1cXG4gIC5lZHMgaDRbY2Fwc10ge1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgICBjb2xvcjogIzZkMjA3NztcXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gICAgZm9udC1zaXplOiAxNHB4OyB9XFxuICAuZWRzIGg1W2NhcHNdIHtcXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gICAgY29sb3I6ICM2ZDIwNzc7XFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICAgIGZvbnQtc2l6ZTogMTJweDsgfVxcbiAgLmVkcyBociB7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkOGQ4ZDg7XFxuICAgIGhlaWdodDogMXB4OyB9XFxuICAuZWRzIC5zci1vbmx5IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMXB4O1xcbiAgICBoZWlnaHQ6IDFweDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgY2xpcDogcmVjdCgwLCAwLCAwLCAwKTtcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgYm9yZGVyOiAwOyB9XFxuXFxuW2JhY2tncm91bmQ9J2dyYXknXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjZmNmY2OyB9XFxuXFxuLm5vLXNjcm9sbCB7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuXFxuZWRzLWljb25bc3Bpbl0ge1xcbiAgYW5pbWF0aW9uOiBlZHMtc3BpbiAycyBpbmZpbml0ZSBsaW5lYXI7IH1cXG5cXG5lZHMtaWNvbiB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBsaW5lLWhlaWdodDogMCAhaW1wb3J0YW50O1xcbiAgbWFyZ2luOiAwIDZweCAwIDA7XFxuICB2ZXJ0aWNhbC1hbGlnbjogdGV4dC1ib3R0b207IH1cXG4gIGVkcy1pY29uIC5tYXRlcmlhbC1pY29ucyB7XFxuICAgIGZvbnQtc2l6ZTogaW5oZXJpdDsgfVxcbiAgZWRzLWljb24gPiAqIHtcXG4gICAgZm9udC1zaXplOiBpbmhlcml0OyB9XFxuXFxuZWRzLWljb24uczE4ID4gKiB7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tOyB9XFxuXFxuZWRzLWljb24uczI0ID4gKiB7XFxuICBmb250LXNpemU6IDI0cHg7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tOyB9XFxuXFxuZWRzLWljb24uczM2ID4gKiB7XFxuICBmb250LXNpemU6IDM2cHg7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tOyB9XFxuXFxuZWRzLWljb24uczQ4ID4gKiB7XFxuICBmb250LXNpemU6IDQ4cHg7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tOyB9XFxuXFxuZWRzLWljb24uczYwID4gKiB7XFxuICBmb250LXNpemU6IDYwcHg7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tOyB9XFxuXFxuZWRzLWljb25bYm9yZGVyXSB7XFxuICBwYWRkaW5nOiAwLjhyZW07XFxuICBib3JkZXI6IDRweCBzb2xpZCAjZDhkOGQ4O1xcbiAgYm9yZGVyLXJhZGl1czogM3B4OyB9XFxuXFxuLmhlYWRlci1jb250YWluZXIge1xcbiAgaGVpZ2h0OiA1MHB4O1xcbiAgYmFja2dyb3VuZDogI2U2ZTZlNjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuICAuaGVhZGVyLWNvbnRhaW5lciAuaWNvbi1jb250YWluZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjZmNmY2O1xcbiAgICBsaW5lLWhlaWdodDogMDsgfVxcbiAgICAuaGVhZGVyLWNvbnRhaW5lciAuaWNvbi1jb250YWluZXIgLmhvbWUtaWNvbiB7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgICAgcGFkZGluZzogMTdweCAyM3B4O1xcbiAgICAgIG1hcmdpbjogMDtcXG4gICAgICBjb2xvcjogIzQyNmRhOTtcXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7IH1cXG4gICAgICAuaGVhZGVyLWNvbnRhaW5lciAuaWNvbi1jb250YWluZXIgLmhvbWUtaWNvbjpob3ZlciB7XFxuICAgICAgICBjb2xvcjogIzFkNGY5MTsgfVxcbiAgICAuaGVhZGVyLWNvbnRhaW5lciAuaWNvbi1jb250YWluZXIgLmhvbWUtaWNvbi5zZWxlY3RlZCB7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcXG4gICAgICBjb2xvcjogIzMzMzMzMzsgfVxcbiAgLmhlYWRlci1jb250YWluZXIgLnRhYnMtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcbiAgICBtYXgtd2lkdGg6IDEwMCU7XFxuICAgIG1heC1oZWlnaHQ6IDEwMCU7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47IH1cXG5cXG5wY2MtZWRzLXNlY29uZGFyeS1oZWFkZXItdGFiIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNmY2ZjY7XFxuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNjY2NjY2M7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24tY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMzgwcHg7XFxuICBoZWlnaHQ6IDUwcHg7IH1cXG4gIHBjYy1lZHMtc2Vjb25kYXJ5LWhlYWRlci10YWI6bGFzdC1jaGlsZCB7XFxuICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNjY2NjY2M7IH1cXG4gIHBjYy1lZHMtc2Vjb25kYXJ5LWhlYWRlci10YWIgLmluZm8tY29udGFpbmVyIHtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBmbGV4OiAxO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBjb2xvcjogIzQyNmRhOTsgfVxcbiAgICBwY2MtZWRzLXNlY29uZGFyeS1oZWFkZXItdGFiIC5pbmZvLWNvbnRhaW5lciBlZHMtaWNvbiB7XFxuICAgICAgbWFyZ2luOiAwOyB9XFxuICAgIHBjYy1lZHMtc2Vjb25kYXJ5LWhlYWRlci10YWIgLmluZm8tY29udGFpbmVyIFtpY29uPSdwZXJzb24nXSB7XFxuICAgICAgcGFkZGluZzogMCAxMHB4IDAgMjBweDsgfVxcbiAgICBwY2MtZWRzLXNlY29uZGFyeS1oZWFkZXItdGFiIC5pbmZvLWNvbnRhaW5lciAucGVyc29uLW5hbWUge1xcbiAgICAgIG1pbi13aWR0aDogMTcycHg7XFxuICAgICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICAgIG1heC1oZWlnaHQ6IDEwMCU7XFxuICAgICAgbGluZS1oZWlnaHQ6IDEuNDsgfVxcbiAgcGNjLWVkcy1zZWNvbmRhcnktaGVhZGVyLXRhYiAudGFiLWNvbnRyb2xzIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyOyB9XFxuICAgIHBjYy1lZHMtc2Vjb25kYXJ5LWhlYWRlci10YWIgLnRhYi1jb250cm9scyAuY2xvc2UtYnV0dG9uIHtcXG4gICAgICBtYXJnaW46IDAgMTBweCAwIDVweDtcXG4gICAgICBwYWRkaW5nOiA4cHg7XFxuICAgICAgY3Vyc29yOiBkZWZhdWx0O1xcbiAgICAgIGNvbG9yOiAjNDI2ZGE5OyB9XFxuXFxucGNjLWVkcy1zZWNvbmRhcnktaGVhZGVyLXRhYlthY3RpdmVdIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7IH1cXG4gIHBjYy1lZHMtc2Vjb25kYXJ5LWhlYWRlci10YWJbYWN0aXZlXSAuaW5mby1jb250YWluZXIge1xcbiAgICBjb2xvcjogIzMzMzMzMzsgfVxcblxcbkBrZXlmcmFtZXMgXFxcImVkcy1zcGluXFxcIiB7XFxuICBmcm9tIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfSB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKlxcbiAqIFRoZXNlIHZhcmlhYmxlcyBhcmUgYXZhaWxhYmxlIHRvIGFsbCBjb21wb25lbnRzIGdsb2JhbGx5IGFuZCBhcmUgdGh1cyBkZXNpZ25hdGVkIHdpdGggYW4gXFxcImVkcy1cXFwiIHByZWZpeC5cXG4gKiBDb21wb25lbnRzIG1heSBpbXBsZW1lbnQgdGhlc2UgYW5kIHBhc3MtdGhyb3VnaCB0byBhIGxvY2FsIHZhcmlhYmxlIG5hbWUuXFxuICovXFxuLypcXG4gKiBUaGVzZSB2YXJpYWJsZXMgYXJlIGF2YWlsYWJsZSB0byBhbGwgY29tcG9uZW50cyBnbG9iYWxseSBhbmQgYXJlIHRodXMgZGVzaWduYXRlZCB3aXRoIGFuIFxcXCJlZHMtXFxcIiBwcmVmaXguXFxuICogQ29tcG9uZW50cyBtYXkgaW1wbGVtZW50IHRoZXNlIGFuZCBwYXNzLXRocm91Z2ggdG8gYSBsb2NhbCB2YXJpYWJsZSBuYW1lLlxcbiAqL1xcbi5tYXItdHAtLTAge1xcbiAgbWFyZ2luLXRvcDogMCAhaW1wb3J0YW50OyB9XFxuXFxuLm1hci1ydC0tbm9uZSB7XFxuICBtYXJnaW4tcmlnaHQ6IDAgIWltcG9ydGFudDsgfVxcblxcbi53ZGgtcGVyLS0xMCB7XFxuICB3aWR0aDogMTAlICFpbXBvcnRhbnQ7IH1cXG5cXG4ud2RoLXBlci0tMjUge1xcbiAgd2lkdGg6IDI1JSAhaW1wb3J0YW50OyB9XFxuXFxuLndkaC1wZXItLTM1IHtcXG4gIHdpZHRoOiAzNSUgIWltcG9ydGFudDsgfVxcblxcbi53ZGgtcGVyLS0xMDAge1xcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDsgfVxcblxcbi5ib3ItdHAtLW5vbmUge1xcbiAgYm9yZGVyLXRvcDogbm9uZSAhaW1wb3J0YW50OyB9XFxuXFxuLmJvci10cGJ0LS1ub25lIHtcXG4gIGJvcmRlci10b3A6IG5vbmUgIWltcG9ydGFudDtcXG4gIGJvcmRlci1ib3R0b206IG5vbmUgIWltcG9ydGFudDsgfVxcblxcbi50eHQtYWxuLS1ydCB7XFxuICB0ZXh0LWFsaWduOiByaWdodDsgfVxcblxcbmVkcy1pY29uW3NwaW5dIHtcXG4gIGFuaW1hdGlvbjogZWRzLXNwaW4gMnMgaW5maW5pdGUgbGluZWFyOyB9XFxuXFxuZWRzLWljb24ge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgbGluZS1oZWlnaHQ6IDAgIWltcG9ydGFudDtcXG4gIG1hcmdpbjogMCA2cHggMCAwO1xcbiAgdmVydGljYWwtYWxpZ246IHRleHQtYm90dG9tOyB9XFxuICBlZHMtaWNvbiAubWF0ZXJpYWwtaWNvbnMge1xcbiAgICBmb250LXNpemU6IGluaGVyaXQ7IH1cXG4gIGVkcy1pY29uID4gKiB7XFxuICAgIGZvbnQtc2l6ZTogaW5oZXJpdDsgfVxcblxcbmVkcy1pY29uLnMxMiA+ICoge1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgdmVydGljYWwtYWxpZ246IGJvdHRvbTsgfVxcblxcbmVkcy1pY29uLnMxNiA+ICoge1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbiAgdmVydGljYWwtYWxpZ246IGJvdHRvbTsgfVxcblxcbmVkcy1pY29uLnMxOCA+ICoge1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgdmVydGljYWwtYWxpZ246IGJvdHRvbTsgfVxcblxcbmVkcy1pY29uLnMyNCA+ICoge1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgdmVydGljYWwtYWxpZ246IGJvdHRvbTsgfVxcblxcbmVkcy1pY29uLnMzNiA+ICoge1xcbiAgZm9udC1zaXplOiAzNnB4O1xcbiAgdmVydGljYWwtYWxpZ246IGJvdHRvbTsgfVxcblxcbmVkcy1pY29uLnM0OCA+ICoge1xcbiAgZm9udC1zaXplOiA0OHB4O1xcbiAgdmVydGljYWwtYWxpZ246IGJvdHRvbTsgfVxcblxcbmVkcy1pY29uLnM2MCA+ICoge1xcbiAgZm9udC1zaXplOiA2MHB4O1xcbiAgdmVydGljYWwtYWxpZ246IGJvdHRvbTsgfVxcblxcbmVkcy1pY29uW2JvcmRlcl0ge1xcbiAgcGFkZGluZzogMC44cmVtO1xcbiAgYm9yZGVyOiA0cHggc29saWQgI2Q4ZDhkODtcXG4gIGJvcmRlci1yYWRpdXM6IDNweDsgfVxcblxcbi5waG9uZS1pY29uIHtcXG4gIHdpZHRoOiAzMnB4O1xcbiAgaGVpZ2h0OiAzNHB4O1xcbiAgYmFja2dyb3VuZDogIzQyNmRhOTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuICAucGhvbmUtaWNvbiBzdmcge1xcbiAgICBmaWxsOiAjZmZmZmZmO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogN3B4O1xcbiAgICBsZWZ0OiA3cHg7IH1cXG5cXG4udGltZXItaWNvbiB7XFxuICBtYXJnaW4tcmlnaHQ6IDExLjNweDsgfVxcbiAgLnRpbWVyLWljb24gc3ZnIHtcXG4gICAgdmVydGljYWwtYWxpZ246IHRleHQtdG9wO1xcbiAgICBmaWxsOiAjZGNkY2RjOyB9XFxuXFxuLmVkcy1pY29uLnRpbWUge1xcbiAgZm9udC1zaXplOiAxMnB4OyB9XFxuXFxuLnBjYy1lZHMtdGltZWxpbmUtdmlldyAuc2VjdGlvbi1pY29uIC5pY29uLWNpcmNsZSB7XFxuICBwYWRkaW5nLXRvcDogM3B4OyB9XFxuXFxuLnBjYy1lZHMtdGltZWxpbmUtdmlldy51c2VyLWNhbGwtZmxvdyAuc2VjdGlvbi1pY29uIC5pY29uLWNpcmNsZSB7XFxuICBwYWRkaW5nLXRvcDogMHB4OyB9XFxuXFxuQGtleWZyYW1lcyBcXFwiZWRzLXNwaW5cXFwiIHtcXG4gIGZyb20ge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5tYXItdHAtLTAge1xcbiAgbWFyZ2luLXRvcDogMCAhaW1wb3J0YW50OyB9XFxuXFxuLm1hci1ydC0tbm9uZSB7XFxuICBtYXJnaW4tcmlnaHQ6IDAgIWltcG9ydGFudDsgfVxcblxcbi53ZGgtcGVyLS0xMCB7XFxuICB3aWR0aDogMTAlICFpbXBvcnRhbnQ7IH1cXG5cXG4ud2RoLXBlci0tMjUge1xcbiAgd2lkdGg6IDI1JSAhaW1wb3J0YW50OyB9XFxuXFxuLndkaC1wZXItLTM1IHtcXG4gIHdpZHRoOiAzNSUgIWltcG9ydGFudDsgfVxcblxcbi53ZGgtcGVyLS0xMDAge1xcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDsgfVxcblxcbi5ib3ItdHAtLW5vbmUge1xcbiAgYm9yZGVyLXRvcDogbm9uZSAhaW1wb3J0YW50OyB9XFxuXFxuLmJvci10cGJ0LS1ub25lIHtcXG4gIGJvcmRlci10b3A6IG5vbmUgIWltcG9ydGFudDtcXG4gIGJvcmRlci1ib3R0b206IG5vbmUgIWltcG9ydGFudDsgfVxcblxcbi50eHQtYWxuLS1ydCB7XFxuICB0ZXh0LWFsaWduOiByaWdodDsgfVxcblxcbmVkcy10YWcge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgcGFkZGluZzogNHB4IDEwcHg7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xcbiAgbWFyZ2luLWxlZnQ6IDJweDtcXG4gIGxpbmUtaGVpZ2h0OiAxICFpbXBvcnRhbnQ7IH1cXG4gIGVkcy10YWc6bm90KFttb3RpZl0pIHtcXG4gICAgYmFja2dyb3VuZDogI2U2ZTZlNjtcXG4gICAgY29sb3I6ICMzMzMzMzM7IH1cXG5cXG5lZHMtdGFnW21vdGlmPVxcXCJkZWZhdWx0XFxcIl0ge1xcbiAgYmFja2dyb3VuZDogI2U2ZTZlNjtcXG4gIGNvbG9yOiAjMzMzMzMzOyB9XFxuXFxuZWRzLXRhZ1ttb3RpZj0nZXJyb3InXSB7XFxuICBiYWNrZ3JvdW5kOiAjZmZkY2UyO1xcbiAgY29sb3I6ICNlNDAwMmI7IH1cXG5cXG5lZHMtdGFnW21vdGlmPSd3YXJuaW5nJ10ge1xcbiAgYmFja2dyb3VuZDogI2ZjZWViYTtcXG4gIGNvbG9yOiAjYjM1OTAwOyB9XFxuXFxuZWRzLXRhZ1ttb3RpZj0nc3VjY2VzcyddIHtcXG4gIGJhY2tncm91bmQ6ICNjZGY0ZDI7XFxuICBjb2xvcjogIzAwN0EzQjtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLm1hci10cC0tMCB7XFxuICBtYXJnaW4tdG9wOiAwICFpbXBvcnRhbnQ7IH1cXG5cXG4ubWFyLXJ0LS1ub25lIHtcXG4gIG1hcmdpbi1yaWdodDogMCAhaW1wb3J0YW50OyB9XFxuXFxuLndkaC1wZXItLTEwIHtcXG4gIHdpZHRoOiAxMCUgIWltcG9ydGFudDsgfVxcblxcbi53ZGgtcGVyLS0yNSB7XFxuICB3aWR0aDogMjUlICFpbXBvcnRhbnQ7IH1cXG5cXG4ud2RoLXBlci0tMzUge1xcbiAgd2lkdGg6IDM1JSAhaW1wb3J0YW50OyB9XFxuXFxuLndkaC1wZXItLTEwMCB7XFxuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50OyB9XFxuXFxuLmJvci10cC0tbm9uZSB7XFxuICBib3JkZXItdG9wOiBub25lICFpbXBvcnRhbnQ7IH1cXG5cXG4uYm9yLXRwYnQtLW5vbmUge1xcbiAgYm9yZGVyLXRvcDogbm9uZSAhaW1wb3J0YW50O1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZSAhaW1wb3J0YW50OyB9XFxuXFxuLnR4dC1hbG4tLXJ0IHtcXG4gIHRleHQtYWxpZ246IHJpZ2h0OyB9XFxuXFxuLypcXG4gKiBUaGVzZSB2YXJpYWJsZXMgYXJlIGF2YWlsYWJsZSB0byBhbGwgY29tcG9uZW50cyBnbG9iYWxseSBhbmQgYXJlIHRodXMgZGVzaWduYXRlZCB3aXRoIGFuIFxcXCJlZHMtXFxcIiBwcmVmaXguXFxuICogQ29tcG9uZW50cyBtYXkgaW1wbGVtZW50IHRoZXNlIGFuZCBwYXNzLXRocm91Z2ggdG8gYSBsb2NhbCB2YXJpYWJsZSBuYW1lLlxcbiAqL1xcbi8qXFxuICogVGhlc2UgdmFyaWFibGVzIGFyZSBhdmFpbGFibGUgdG8gYWxsIGNvbXBvbmVudHMgZ2xvYmFsbHkgYW5kIGFyZSB0aHVzIGRlc2lnbmF0ZWQgd2l0aCBhbiBcXFwiZWRzLVxcXCIgcHJlZml4LlxcbiAqIENvbXBvbmVudHMgbWF5IGltcGxlbWVudCB0aGVzZSBhbmQgcGFzcy10aHJvdWdoIHRvIGEgbG9jYWwgdmFyaWFibGUgbmFtZS5cXG4gKi9cXG5wY2MtZWRzLXRpbWVsaW5lLWl0ZW0ge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG9cXFwiLCBcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGNvbG9yOiAjMzMzMzMzOyB9XFxuICBwY2MtZWRzLXRpbWVsaW5lLWl0ZW0gLmZsZXgtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDsgfVxcbiAgcGNjLWVkcy10aW1lbGluZS1pdGVtIC5zZWN0aW9uLWxlZnQge1xcbiAgICBmbGV4OiAxOyB9XFxuICBwY2MtZWRzLXRpbWVsaW5lLWl0ZW0gLnNlY3Rpb24taWNvbiB7XFxuICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2Q4ZDhkODtcXG4gICAgbWFyZ2luLWxlZnQ6IDUzcHg7XFxuICAgIG1pbi1oZWlnaHQ6IDcxcHg7XFxuICAgIHBhZGRpbmctcmlnaHQ6IDMwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcbiAgICBwY2MtZWRzLXRpbWVsaW5lLWl0ZW0gLnNlY3Rpb24taWNvbiAuaWNvbi1jaXJjbGUge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNhZjE2ODU7XFxuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICAgIGNvbG9yOiAjZmZmZmZmO1xcbiAgICAgIGhlaWdodDogNDBweDtcXG4gICAgICBsaW5lLWhlaWdodDogNDJweDtcXG4gICAgICBtYXJnaW4tbGVmdDogLTIwcHg7XFxuICAgICAgcGFkZGluZy1sZWZ0OiA1cHg7XFxuICAgICAgd2lkdGg6IDQwcHg7IH1cXG4gIHBjYy1lZHMtdGltZWxpbmUtaXRlbSAuc2VjdGlvbi1tYWluIHtcXG4gICAgZmxleDogNTtcXG4gICAgcGFkZGluZy1ib3R0b206IDEwcHg7XFxuICAgIHBhZGRpbmctdG9wOiAxMHB4OyB9XFxuICAgIHBjYy1lZHMtdGltZWxpbmUtaXRlbSAuc2VjdGlvbi1tYWluIC5wbGFjZWhvbGRlci1jZW50ZXIge1xcbiAgICAgIGZsZXg6IDI7IH1cXG4gICAgcGNjLWVkcy10aW1lbGluZS1pdGVtIC5zZWN0aW9uLW1haW4gLnBsYWNlaG9sZGVyLXJpZ2h0IHtcXG4gICAgICBmbGV4OiAxOyB9XFxuICBwY2MtZWRzLXRpbWVsaW5lLWl0ZW0gW3Nsb3Q9XFxcInNsb3QtaGVhZGVyLWNlbnRlclxcXCJdIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleDogNTsgfVxcbiAgICBwY2MtZWRzLXRpbWVsaW5lLWl0ZW0gW3Nsb3Q9XFxcInNsb3QtaGVhZGVyLWNlbnRlclxcXCJdIFtzbG90PVxcXCJzbG90LWhlYWRlci1sZWZ0XFxcIl0ge1xcbiAgICAgIGZsZXg6IDQ7IH1cXG4gICAgcGNjLWVkcy10aW1lbGluZS1pdGVtIFtzbG90PVxcXCJzbG90LWhlYWRlci1jZW50ZXJcXFwiXSBbc2xvdD1cXFwic2xvdC1oZWFkZXItcmlnaHRcXFwiXSB7XFxuICAgICAgZmxleDogMTtcXG4gICAgICBmb250LXNpemU6IDE0cHg7XFxuICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7IH1cXG5cXG5wY2MtZWRzLXRpbWVsaW5lLWl0ZW06bGFzdC1jaGlsZCAuc2VjdGlvbi1pY29uIHtcXG4gIGJvcmRlci1sZWZ0OiAwOyB9XFxuXFxuLnBjYy1lZHMtdGltZWxpbmUtdmlldyB7XFxuICBwYWRkaW5nOiAwIDUwcHggMCAwOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwidmFyIGVzY2FwZSA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvdXJsL2VzY2FwZS5qc1wiKTtcbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLm1hci10cC0tMCB7XFxuICBtYXJnaW4tdG9wOiAwICFpbXBvcnRhbnQ7IH1cXG5cXG4ubWFyLXJ0LS1ub25lIHtcXG4gIG1hcmdpbi1yaWdodDogMCAhaW1wb3J0YW50OyB9XFxuXFxuLndkaC1wZXItLTEwIHtcXG4gIHdpZHRoOiAxMCUgIWltcG9ydGFudDsgfVxcblxcbi53ZGgtcGVyLS0yNSB7XFxuICB3aWR0aDogMjUlICFpbXBvcnRhbnQ7IH1cXG5cXG4ud2RoLXBlci0tMzUge1xcbiAgd2lkdGg6IDM1JSAhaW1wb3J0YW50OyB9XFxuXFxuLndkaC1wZXItLTEwMCB7XFxuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50OyB9XFxuXFxuLmJvci10cC0tbm9uZSB7XFxuICBib3JkZXItdG9wOiBub25lICFpbXBvcnRhbnQ7IH1cXG5cXG4uYm9yLXRwYnQtLW5vbmUge1xcbiAgYm9yZGVyLXRvcDogbm9uZSAhaW1wb3J0YW50O1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZSAhaW1wb3J0YW50OyB9XFxuXFxuLnR4dC1hbG4tLXJ0IHtcXG4gIHRleHQtYWxpZ246IHJpZ2h0OyB9XFxuXFxuLmhlYWRlciB7XFxuICBwYWRkaW5nOiAxMHB4IDAgMCAwO1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICB3aWR0aDogMTAwJTsgfVxcbiAgLmhlYWRlcl9fbG9nbyB7XFxuICAgIHdpZHRoOiAxMTdweDtcXG4gICAgaGVpZ2h0OiA1NXB4O1xcbiAgICBtYXJnaW46IDAgMCAwIDE1cHg7XFxuICAgIHBhZGRpbmctcmlnaHQ6IDIwcHg7XFxuICAgIGZsb2F0OiBsZWZ0OyB9XFxuICAuaGVhZGVyX19sb2dvbGluayB7XFxuICAgIHRleHQtaW5kZW50OiAtOTk5OTllbTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIGJhY2tncm91bmQ6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vaW1hZ2VzL2V4cGVyaWFuX19sb2dvbGF0ZXN0LnBuZ1wiKSkgKyBcIikgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXIgdHJhbnNwYXJlbnQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJTsgfVxcbiAgLmhlYWRlcl9fZHdwbG9nbyB7XFxuICAgIHdpZHRoOiA5NHB4O1xcbiAgICBoZWlnaHQ6IDQ5cHg7XFxuICAgIG1hcmdpbjogMCAyMHB4IDAgMTVweDtcXG4gICAgcGFkZGluZy1yaWdodDogMjBweDtcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIGJvcmRlci1sZWZ0OiBzb2xpZCAxcHggI2NjY2NjYztcXG4gICAgYm9yZGVyLXJpZ2h0OiBzb2xpZCAxcHggI2NjY2NjYztcXG4gICAgcGFkZGluZy1sZWZ0OiAyMHB4O1xcbiAgICBwYWRkaW5nLXRvcDogM3B4O1xcbiAgICBwYWRkaW5nLWJvdHRvbTogM3B4OyB9XFxuICAuaGVhZGVyX19kd3Bsb2dvbGluayB7XFxuICAgIHRleHQtaW5kZW50OiAtOTk5OTllbTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIGJhY2tncm91bmQ6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vaW1hZ2VzL2R3cC1sb2dvLXRyYW5zcGFyZW50LnBuZ1wiKSkgKyBcIikgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXIgdHJhbnNwYXJlbnQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJTsgfVxcbiAgLmhlYWRlcl9fbG9nb2Rlc2Mge1xcbiAgICBmb250LXNpemU6IDE2cHg7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLVJlZ3VsYXJcXFwiICFpbXBvcnRhbnQ7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gICAgY29sb3I6ICMzMzMzMzM7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgcGFkZGluZzogM3B4IDAgM3B4IDE1cHg7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgICBtYXJnaW4tdG9wOiAxNXB4O1xcbiAgICBib3JkZXItbGVmdDogc29saWQgMXB4ICNjY2NjY2M7IH1cXG4gIC5oZWFkZXJfX2RpdmlkZXIge1xcbiAgICB3aWR0aDogMXB4O1xcbiAgICBoZWlnaHQ6IDU1cHg7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgICBiYWNrZ3JvdW5kOiAjY2NjY2NjOyB9XFxuICAuaGVhZGVyX19uYXYge1xcbiAgICBmbG9hdDogcmlnaHQ7IH1cXG4gIC5oZWFkZXJfX2xpc3Rjb250IHtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgbWFyZ2luOiAwOyB9XFxuICAuaGVhZGVyX19saXN0IHtcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIHBhZGRpbmc6IDE1cHg7IH1cXG4gIC5oZWFkZXJfX2xpbmsge1xcbiAgICBmbG9hdDogbGVmdDtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICBmb250LWZhbWlseTogXFxcIlJvYm90by1NZWRpdW1cXFwiICFpbXBvcnRhbnQ7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gICAgY29sb3I6ICM0MjZkYTk7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuICAuaGVhZGVyX19pY29uaW1hZ2VzIHtcXG4gICAgdmVydGljYWwtYWxpZ246IHRleHQtdG9wOyB9XFxuICAuaGVhZGVyX19jb3VudGVyIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBiYWNrZ3JvdW5kOiAjZTIwMDAwO1xcbiAgICB3aWR0aDogMjFweDtcXG4gICAgaGVpZ2h0OiAyMXB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIHRvcDogLTdweDtcXG4gICAgcmlnaHQ6IC03cHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgZm9udC1zaXplOiAxM3B4O1xcbiAgICBmb250LWZhbWlseTogXFxcIlJvYm90by1NZWRpdW1cXFwiICFpbXBvcnRhbnQ7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gICAgY29sb3I6ICNmZmZmZmY7IH1cXG4gIC5oZWFkZXItLXVzZXJwcm9maWxlIHtcXG4gICAgYm9yZGVyOiBzb2xpZCAycHggIzQyNmRhOTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBwYWRkaW5nOiAxcHggNXB4O1xcbiAgICBmb250LXNpemU6IDEycHg7IH1cXG4gIC5oZWFkZXJfX2hybGluZSB7XFxuICAgIGhlaWdodDogMnB4ICFpbXBvcnRhbnQ7XFxuICAgIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveCAhaW1wb3J0YW50O1xcbiAgICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3ggIWltcG9ydGFudDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveCAhaW1wb3J0YW50O1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAsIDAgMTAwJSAhaW1wb3J0YW50O1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0ICFpbXBvcnRhbnQ7XFxuICAgIC13ZWJraXQtYmFja2dyb3VuZC1zaXplOiAxMDAlIDRweCAhaW1wb3J0YW50O1xcbiAgICAtbW96LWJhY2tncm91bmQtc2l6ZTogMTAwJSA0cHggIWltcG9ydGFudDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxMDAlIDRweCAhaW1wb3J0YW50O1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChsZWZ0LCAjYmEyZjdkIDAlLCAjMjY0NzhkIDEwMCUpLCAtd2Via2l0LWxpbmVhci1ncmFkaWVudChsZWZ0LCAjYmEyZjdkIDAlLCAjMjY0NzhkIDEwMCUpICFpbXBvcnRhbnQ7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IC1tb3otbGluZWFyLWdyYWRpZW50KGxlZnQsICNiYTJmN2QgMCUsICMyNjQ3OGQgMTAwJSksIC1tb3otbGluZWFyLWdyYWRpZW50KGxlZnQsICNiYTJmN2QgMCUsICMyNjQ3OGQgMTAwJSkgIWltcG9ydGFudDtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogLW8tbGluZWFyLWdyYWRpZW50KGxlZnQsICNiYTJmN2QgMCUsICMyNjQ3OGQgMTAwJSksIC1vLWxpbmVhci1ncmFkaWVudChsZWZ0LCAjYmEyZjdkIDAlLCAjMjY0NzhkIDEwMCUpICFpbXBvcnRhbnQ7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgI2JhMmY3ZCAwJSwgIzI2NDc4ZCAxMDAlKSwgbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAjYmEyZjdkIDAlLCAjMjY0NzhkIDEwMCUpICFpbXBvcnRhbnQ7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIHdpZHRoOiAxMDAlOyB9XFxuICAuaGVhZGVyX193aGl0ZWNpcmNsZSB7XFxuICAgIHRvcDogLTlweDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMjVweDtcXG4gICAgaGVpZ2h0OiAyNXB4O1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICByaWdodDogLTlweDtcXG4gICAgei1pbmRleDogMDsgfVxcblxcbi5zY25kcnloZWFkZXIge1xcbiAgY2xlYXI6IGJvdGg7XFxuICBmbG9hdDogbm9uZTsgfVxcbiAgLnNjbmRyeWhlYWRlcl9fY29udCB7XFxuICAgIHdpZHRoOiAxNjgwcHg7XFxuICAgIG1hcmdpbjogYXV0bztcXG4gICAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcXG4gICAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuICAgIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIiwgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcXG4gICAgbGluZS1oZWlnaHQ6IDEuNGVtOyB9XFxuICAuc2NuZHJ5aGVhZGVyX190YWJjb250IHtcXG4gICAgaGVpZ2h0OiA1MHB4O1xcbiAgICBiYWNrZ3JvdW5kOiAjZTZlNmU2O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG4gIC5zY25kcnloZWFkZXJfX3RhYmlubmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcXG4gICAgbGluZS1oZWlnaHQ6IDA7XFxuICAgIGJvcmRlci1yaWdodDogc29saWQgMXB4ICNjY2NjY2M7IH1cXG4gIC5zY25kcnloZWFkZXJfX2hvbWVpY29uIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIHBhZGRpbmc6IDE4cHggMjNweDtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBjb2xvcjogIzQyNmRhOTtcXG4gICAgY3Vyc29yOiBwb2ludGVyOyB9XFxuICAuc2NuZHJ5aGVhZGVyX19ob21lc3ZnIHtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tOyB9XFxuICAuc2NuZHJ5aGVhZGVyX19ob21lbGluayB7XFxuICAgIGNvbG9yOiAjNDI2ZGE5OyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwidmFyIGVzY2FwZSA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvdXJsL2VzY2FwZS5qc1wiKTtcbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLm1hci10cC0tMCB7XFxuICBtYXJnaW4tdG9wOiAwICFpbXBvcnRhbnQ7IH1cXG5cXG4ubWFyLXJ0LS1ub25lIHtcXG4gIG1hcmdpbi1yaWdodDogMCAhaW1wb3J0YW50OyB9XFxuXFxuLndkaC1wZXItLTEwIHtcXG4gIHdpZHRoOiAxMCUgIWltcG9ydGFudDsgfVxcblxcbi53ZGgtcGVyLS0yNSB7XFxuICB3aWR0aDogMjUlICFpbXBvcnRhbnQ7IH1cXG5cXG4ud2RoLXBlci0tMzUge1xcbiAgd2lkdGg6IDM1JSAhaW1wb3J0YW50OyB9XFxuXFxuLndkaC1wZXItLTEwMCB7XFxuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50OyB9XFxuXFxuLmJvci10cC0tbm9uZSB7XFxuICBib3JkZXItdG9wOiBub25lICFpbXBvcnRhbnQ7IH1cXG5cXG4uYm9yLXRwYnQtLW5vbmUge1xcbiAgYm9yZGVyLXRvcDogbm9uZSAhaW1wb3J0YW50O1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZSAhaW1wb3J0YW50OyB9XFxuXFxuLnR4dC1hbG4tLXJ0IHtcXG4gIHRleHQtYWxpZ246IHJpZ2h0OyB9XFxuXFxuLmxvZ2luY29udCB7XFxuICB3aWR0aDogNDAwcHg7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB0b3A6IDUwJTtcXG4gIGhlaWdodDogMTkwcHg7XFxuICBsZWZ0OiA1MCU7XFxuICBtYXJnaW4tdG9wOiAtOTVweDtcXG4gIG1hcmdpbi1sZWZ0OiAtMjAwcHg7XFxuICBiYWNrZ3JvdW5kOiAjZTZlNmU2O1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggI2NjY2NjYztcXG4gIGJvcmRlci1yYWRpdXM6IDVweDsgfVxcbiAgLmxvZ2luY29udF9fZm9ybSB7XFxuICAgIG1hcmdpbjogMjVweCAyNXB4IDI1cHg7IH1cXG4gIC5sb2dpbmNvbnRfX2Zvcm1saXN0IHtcXG4gICAgbWFyZ2luOiAwIDAgMTVweDtcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIHdpZHRoOiAxMDAlOyB9XFxuICAubG9naW5jb250X19mb3JtbGFiZWwge1xcbiAgICB3aWR0aDogMTAwcHg7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgICBsaW5lLWhlaWdodDogMzZweDsgfVxcbiAgLmxvZ2luY29udF9fZm9ybWlucHV0IHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGZsb2F0OiByaWdodDtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjY2NjY2NjOyB9XFxuICAubG9naW5jb250X19mb3JtYnV0dG9uIHtcXG4gICAgZmxvYXQ6IHJpZ2h0OyB9XFxuICAubG9naW5jb250X19sb2dvIHtcXG4gICAgd2lkdGg6IDExN3B4O1xcbiAgICBoZWlnaHQ6IDU1cHg7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAtNThweDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBsZWZ0OiAxNXB4OyB9XFxuICAubG9naW5jb250X19sb2dvbGluayB7XFxuICAgIHRleHQtaW5kZW50OiAtOTk5OTllbTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIGJhY2tncm91bmQ6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vaW1hZ2VzL2V4cGVyaWFuX19sb2dvbGF0ZXN0LnBuZ1wiKSkgKyBcIikgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXIgdHJhbnNwYXJlbnQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJTsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsInZhciBlc2NhcGUgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL3VybC9lc2NhcGUuanNcIik7XG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5tYXItdHAtLTAge1xcbiAgbWFyZ2luLXRvcDogMCAhaW1wb3J0YW50OyB9XFxuXFxuLm1hci1ydC0tbm9uZSB7XFxuICBtYXJnaW4tcmlnaHQ6IDAgIWltcG9ydGFudDsgfVxcblxcbi53ZGgtcGVyLS0xMCB7XFxuICB3aWR0aDogMTAlICFpbXBvcnRhbnQ7IH1cXG5cXG4ud2RoLXBlci0tMjUge1xcbiAgd2lkdGg6IDI1JSAhaW1wb3J0YW50OyB9XFxuXFxuLndkaC1wZXItLTM1IHtcXG4gIHdpZHRoOiAzNSUgIWltcG9ydGFudDsgfVxcblxcbi53ZGgtcGVyLS0xMDAge1xcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDsgfVxcblxcbi5ib3ItdHAtLW5vbmUge1xcbiAgYm9yZGVyLXRvcDogbm9uZSAhaW1wb3J0YW50OyB9XFxuXFxuLmJvci10cGJ0LS1ub25lIHtcXG4gIGJvcmRlci10b3A6IG5vbmUgIWltcG9ydGFudDtcXG4gIGJvcmRlci1ib3R0b206IG5vbmUgIWltcG9ydGFudDsgfVxcblxcbi50eHQtYWxuLS1ydCB7XFxuICB0ZXh0LWFsaWduOiByaWdodDsgfVxcblxcbi5zdWJwYWdlX19hbGVydGluZm8ge1xcbiAgbWFyZ2luOiAxMHB4IDE1cHggMDtcXG4gIG1pbi1oZWlnaHQ6IDcwcHg7XFxuICBib3JkZXI6IHNvbGlkIDFweCAjZmFkOWRkO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGZvbnQtc2l6ZTogMTRweDsgfVxcblxcbi5zdWJwYWdlX19hbGVydGxlZnQge1xcbiAgd2lkdGg6IDE1JTtcXG4gIGJhY2tncm91bmQ6ICNmYWQ5ZGQ7XFxuICBmbG9hdDogbGVmdDtcXG4gIGhlaWdodDogNzBweDsgfVxcblxcbi5zdWJwYWdlX19hbGVydHJpZ2h0IHtcXG4gIHdpZHRoOiA4NSU7XFxuICBmbG9hdDogbGVmdDtcXG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XFxuICBwYWRkaW5nOiAxMHB4IDAgMTVweDsgfVxcblxcbi5zdWJwYWdlX19hbGVydG1lc3NhZ2Uge1xcbiAgbWFyZ2luOiAwIDE1cHg7IH1cXG5cXG4uc3VicGFnZV9fYWxlcnRpY29uIHtcXG4gIGJhY2tncm91bmQ6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vaW1hZ2VzL2FsZXJ0LnBuZ1wiKSkgKyBcIikgbm8tcmVwZWF0IDAgMCB0cmFuc3BhcmVudDtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDIwcHg7XFxuICBoZWlnaHQ6IDIwcHg7XFxuICBtYXJnaW46IDE1cHggYXV0byAwOyB9XFxuXFxuLnN1YnBhZ2VfX2FycmFuZ2VoZWFkaW5nIHtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgZm9udC1zaXplOiAyMHB4ICFpbXBvcnRhbnQ7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1SZWd1bGFyXFxcIiAhaW1wb3J0YW50O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xcbiAgY29sb3I6ICNhYWFhYWE7XFxuICBtYXJnaW4tdG9wOiAxMHB4OyB9XFxuXFxuLnN1YnBhZ2VfX2FycmFuZ2Vjb250IHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYm9yZGVyLWJvdHRvbTogc29saWQgMXB4ICNjY2NjY2M7XFxuICBmbG9hdDogbGVmdDsgfVxcblxcbi5zdWJwYWdlX19hcnJhbmdlc2VsZWN0IHtcXG4gIGZsb2F0OiByaWdodDtcXG4gIG1hcmdpbi10b3A6IDAgIWltcG9ydGFudDtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHggIWltcG9ydGFudDsgfVxcbiAgLnN1YnBhZ2VfX2FycmFuZ2VzZWxlY3QgLmVkcy1kcm9wZG93bi10cmlnZ2VyIC5lZHMtZHJvcGRvd24tYXJyb3cge1xcbiAgICByaWdodDogNXB4OyB9XFxuICAuc3VicGFnZV9fYXJyYW5nZXNlbGVjdCAuZWRzLWRyb3Bkb3duLXRyaWdnZXIge1xcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xcbiAgICBwYWRkaW5nLXJpZ2h0OiAyMHB4OyB9XFxuXFxuLnN1YnBhZ2VfX2NyZWF0ZWFycmFuZ2Uge1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBtYXJnaW46IDM1cHggMCAzNXB4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBmb250LXNpemU6IDIycHggIWltcG9ydGFudDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLVJlZ3VsYXJcXFwiICFpbXBvcnRhbnQ7XFxuICBmb250LXdlaWdodDogbm9ybWFsICFpbXBvcnRhbnQ7XFxuICBjb2xvcjogI2FhYWFhYTsgfVxcblxcbi5zdWJwYWdlX19hcnJhbmdlcHJvZ3Jlc3Njb250IHtcXG4gIG1hcmdpbjogMCA1MHB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuLnN1YnBhZ2VfX2FycmFuZ2Vwcm9ncmVzc2xpbmUge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDJweDtcXG4gIGJhY2tncm91bmQ6ICNjY2NjY2M7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiA0MHB4OyB9XFxuXFxuLnN1YnBhZ2VfX2FycmFuZ2Vwcm9ncmVzcyB7XFxuICBmbG9hdDogbGVmdDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuLnN1YnBhZ2VfX2FycmFuZ2V0YXNrY2lyY2xlIHtcXG4gIGJhY2tncm91bmQ6ICNjY2NjY2M7XFxuICB3aWR0aDogMjBweDtcXG4gIGhlaWdodDogMjBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDIycHg7IH1cXG4gIC5zdWJwYWdlX19hcnJhbmdldGFza2NpcmNsZTpiZWZvcmUge1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAxMnB4O1xcbiAgICBoZWlnaHQ6IDEycHg7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBtYXJnaW4tbGVmdDogLTZweDtcXG4gICAgbGVmdDogNTAlO1xcbiAgICBtYXJnaW4tdG9wOiAtNnB4OyB9XFxuXFxuLnN1YnBhZ2VfX2FycmFuZ2V0YXNrIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IC0xMHB4O1xcbiAgdG9wOiA4cHg7IH1cXG5cXG4uc3VicGFnZV9fYXJyYW5nZXRhc2tpbmZvIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIG1hcmdpbi1sZWZ0OiAtMTBweDtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRvcDogLTIwcHg7IH1cXG5cXG4uc3VicGFnZV9fYXJyYW5nZWZvcm0ge1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1hcmdpbi10b3A6IDEwMHB4OyB9XFxuXFxuLnN1YnBhZ2VfX2FycmFuZ2Vmb3JtaW5uZXIge1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICB3aWR0aDogMTAwJTsgfVxcblxcbi5zdWJwYWdlX19hcnJhbmdlZm9ybWxhYmVsIHtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgd2lkdGg6IDUwJTtcXG4gIHBhZGRpbmctdG9wOiA1cHg7XFxuICBmb250LXNpemU6IDE2cHggIWltcG9ydGFudDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLU1lZGl1bVxcXCIgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gIGNvbG9yOiAjMzMzMzMzOyB9XFxuXFxuLnN1YnBhZ2VfX2FycmFuZ2Vmb3JtbGlzdCB7XFxuICBmbG9hdDogbGVmdDtcXG4gIHdpZHRoOiA2MCU7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4OyB9XFxuXFxuLnN1YnBhZ2VfX2FycmFuZ2Vmb3JtaW5wdXQge1xcbiAgd2lkdGg6IDUwJTtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3JkZXI6IHNvbGlkIDFweCAjY2NjY2NjOyB9XFxuXFxuLnN1YnBhZ2VfX2FycmFuZ2Vmb3Jtc2VsZWN0IHtcXG4gIGZsb2F0OiByaWdodDtcXG4gIG1hcmdpbi10b3A6IDAgIWltcG9ydGFudDtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHggIWltcG9ydGFudDtcXG4gIHdpZHRoOiA1MCU7IH1cXG4gIC5zdWJwYWdlX19hcnJhbmdlZm9ybXNlbGVjdCAuZWRzLWRyb3Bkb3duLXRyaWdnZXIgLmVkcy1kcm9wZG93bi1hcnJvdyB7XFxuICAgIHJpZ2h0OiA1cHg7IH1cXG4gIC5zdWJwYWdlX19hcnJhbmdlZm9ybXNlbGVjdCAuZWRzLWRyb3Bkb3duLXRyaWdnZXIge1xcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xcbiAgICBwYWRkaW5nLXJpZ2h0OiAyMHB4OyB9XFxuXFxuLnN1YnBhZ2VfX2FycmFuZ2Vmb3JtYnV0b24ge1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGJhY2tncm91bmQ6ICM0MjZkYTk7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBmb250LXNpemU6IDE0cHggIWltcG9ydGFudDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLVJlZ3VsYXJcXFwiICFpbXBvcnRhbnQ7XFxuICBmb250LXdlaWdodDogbm9ybWFsICFpbXBvcnRhbnQ7XFxuICBjb2xvcjogI2ZmZmZmZjtcXG4gIG1hcmdpbjogMzBweCAwO1xcbiAgY3Vyc29yOiBwb2ludGVyOyB9XFxuICAuc3VicGFnZV9fYXJyYW5nZWZvcm1idXRvbjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQ6ICMwMDQ1OTA7XFxuICAgIGNvbG9yOiAjZmZmZmZmOyB9XFxuXFxuLnN1YnBhZ2VfX2FycmFuZ2VncmFwaCB7XFxuICBib3JkZXItdG9wOiBzb2xpZCAxcHggI2NjY2NjYztcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgd2lkdGg6IDEwMCU7IH1cXG5cXG4uc3VicGFnZV9fYXJyYW5nZWdyYXBoaGVhZCB7XFxuICBtYXJnaW46IDMwcHggMDtcXG4gIGZvbnQtc2l6ZTogMjJweCAhaW1wb3J0YW50O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8tUmVndWxhclxcXCIgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gIGNvbG9yOiAjMzMzMzMzOyB9XFxuXFxuLnN1YnBhZ2VfX2dyYXBoY29udCB7XFxuICBib3JkZXI6IHNvbGlkIDFweCAjY2NjY2NjO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgcGFkZGluZzogMTVweCAwOyB9XFxuXFxuLnN1YnBhZ2VfX2dyYXBoaW1nIHtcXG4gIHdpZHRoOiA5NiU7IH1cXG5cXG4uc3VicGFnZV9fc3VzdGFpbmNvbnQge1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBhZGRpbmc6IDM1cHggMCAzMHB4O1xcbiAgYm9yZGVyLWJvdHRvbTogc29saWQgMXB4ICNjY2NjY2M7XFxuICBtYXJnaW4tYm90dG9tOiAzNXB4OyB9XFxuXFxuLnN1YnBhZ2VfX3N1c3RhaW5saXN0IHtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgd2lkdGg6IDMxJTtcXG4gIGJvcmRlcjogc29saWQgMXB4ICNjY2NjY2M7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgbWFyZ2luLXJpZ2h0OiAzLjUlOyB9XFxuICAuc3VicGFnZV9fc3VzdGFpbmxpc3Q6bnRoLWNoaWxkKGxhc3QpIHtcXG4gICAgbWFyZ2luLXJpZ2h0OiAwOyB9XFxuXFxuLnN1YnBhZ2VfX3N1c3RhaW5oZWFkIHtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBiYWNrZ3JvdW5kOiAjZjZmNmY2OyB9XFxuXFxuLnN1YnBhZ2VfX3N1c3RhaW5udW1iZXIge1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBmb250LXNpemU6IDQ2cHggIWltcG9ydGFudDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLU1lZGl1bVxcXCIgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gIGNvbG9yOiAjMzMzMzMzO1xcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgbWFyZ2luLXRvcDogMTBweDsgfVxcblxcbi5zdWJwYWdlX19zdXN0YWluaGVhZGluZyB7XFxuICBmbG9hdDogbGVmdDtcXG4gIHdpZHRoOiA4MCU7XFxuICBmb250LXNpemU6IDE2cHggIWltcG9ydGFudDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLU1lZGl1bVxcXCIgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gIGNvbG9yOiAjMzMzMzMzOyB9XFxuXFxuLnN1YnBhZ2VfX3N1c3RhaW5kZXNjIHtcXG4gIGZvbnQtc2l6ZTogMTRweCAhaW1wb3J0YW50O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8tUmVndWxhclxcXCIgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gIGNvbG9yOiAjMzMzMzMzOyB9XFxuXFxuLnN1YnBhZ2VfX3N1c3RhaW50aW1lIHtcXG4gIGZvbnQtc2l6ZTogMTZweCAhaW1wb3J0YW50O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8tUmVndWxhclxcXCIgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gIGNvbG9yOiAjMzMzMzMzO1xcbiAgcGFkZGluZzogMjBweCAwO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgYm9yZGVyLXRvcDogc29saWQgMXB4ICNjY2NjY2M7XFxuICBib3JkZXItYm90dG9tOiBzb2xpZCAxcHggI2NjY2NjYzsgfVxcblxcbi5zdWJwYWdlX19zdXN0YWluZGV0YWlscyB7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICB3aWR0aDogMTAwJTsgfVxcblxcbi5zdWJwYWdlX19zdXN0YWluZGV0YWlsc2lubmVyIHtcXG4gIHBhZGRpbmc6IDE1cHg7IH1cXG5cXG4uc3VicGFnZV9fc3VzdGFpbmRldGFpbHNsYWJlbCB7XFxuICBmb250LXNpemU6IDE2cHggIWltcG9ydGFudDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLU1lZGl1bVxcXCIgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gIGNvbG9yOiAjNjY2NjY2O1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gIG1hcmdpbi1ib3R0b206IDNweDtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgd2lkdGg6IDEwMCU7IH1cXG5cXG4uc3VicGFnZV9fc3VzdGFpbmRldGFpbHNhbW91bnQge1xcbiAgZm9udC1zaXplOiAxNnB4ICFpbXBvcnRhbnQ7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1SZWd1bGFyXFxcIiAhaW1wb3J0YW50O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xcbiAgY29sb3I6ICMzMzMzMzM7IH1cXG5cXG4uc3VicGFnZV9fc3VzdGFpbnNlbGVjdGJ1dHRvbiB7XFxuICBiYWNrZ3JvdW5kOiAjZWRmNGZhO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggIzQyNmRhOTtcXG4gIHBhZGRpbmc6IDVweCAxMHB4O1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbiAgbWFyZ2luLWJvdHRvbTogMjVweDtcXG4gIGZvbnQtc2l6ZTogMTRweCAhaW1wb3J0YW50O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8tUmVndWxhclxcXCIgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gIGNvbG9yOiAjNDI2ZGE5O1xcbiAgbWFyZ2luLWxlZnQ6IDE1cHg7XFxuICBtaW4td2lkdGg6IDgwcHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7IH1cXG4gIC5zdWJwYWdlX19zdXN0YWluc2VsZWN0YnV0dG9uOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZDogIzAwNDU5MDtcXG4gICAgY29sb3I6ICNmZmZmZmY7IH1cXG5cXG4uc3VicGFnZV9fc3VzdGFpbmVkaXRidXR0b24ge1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbiAgZm9udC1zaXplOiAxNHB4ICFpbXBvcnRhbnQ7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1SZWd1bGFyXFxcIiAhaW1wb3J0YW50O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xcbiAgY29sb3I6ICM0MjZkYTk7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHBhZGRpbmc6IDVweCAxMHB4O1xcbiAgY3Vyc29yOiBwb2ludGVyOyB9XFxuICAuc3VicGFnZV9fc3VzdGFpbmVkaXRidXR0b246aG92ZXIge1xcbiAgICBjb2xvcjogIzAwNDU5MDsgfVxcblxcbi5zdWJwYWdlX19wcmV2aWV3c2NoZWR1bGVidXR0b24ge1xcbiAgYmFja2dyb3VuZDogI2VkZjRmYTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJvcmRlcjogc29saWQgMXB4ICM0MjZkYTk7XFxuICBwYWRkaW5nOiA1cHggMTBweDtcXG4gIGZsb2F0OiByaWdodDtcXG4gIGZvbnQtc2l6ZTogMTRweCAhaW1wb3J0YW50O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8tUmVndWxhclxcXCIgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gIGNvbG9yOiAjNDI2ZGE5O1xcbiAgY3Vyc29yOiBwb2ludGVyOyB9XFxuICAuc3VicGFnZV9fcHJldmlld3NjaGVkdWxlYnV0dG9uOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZDogIzAwNDU5MDtcXG4gICAgY29sb3I6ICNmZmZmZmY7IH1cXG5cXG4uc3VicGFnZV9fY3JlYXRlYXJyYW5nZWJ1dHRvbiB7XFxuICBiYWNrZ3JvdW5kOiAjNDI2ZGE5O1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggIzQyNmRhOTtcXG4gIHBhZGRpbmc6IDVweCAxMHB4O1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbiAgZm9udC1zaXplOiAxNHB4ICFpbXBvcnRhbnQ7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1SZWd1bGFyXFxcIiAhaW1wb3J0YW50O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICBtYXJnaW4tbGVmdDogMjBweDtcXG4gIGN1cnNvcjogcG9pbnRlcjsgfVxcbiAgLnN1YnBhZ2VfX2NyZWF0ZWFycmFuZ2VidXR0b246aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kOiAjMDA0NTkwO1xcbiAgICBjb2xvcjogI2ZmZmZmZjsgfVxcblxcbi5zdWJwYWdlX19zdXN0YWluYnV0dG9ucyB7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICB3aWR0aDogMTAwJTsgfVxcblxcbi5zdWJwYWdlX19hcnJhbmdlcmV2aWV3Y29udCB7XFxuICBmbG9hdDogbGVmdDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWFyZ2luLXRvcDogMTAwcHg7IH1cXG5cXG4uc3VicGFnZV9fYXJyYW5nZXJldmlldyB7XFxuICBmbG9hdDogbGVmdDtcXG4gIHdpZHRoOiA1MCU7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4uc3VicGFnZV9fYXJyYW5nZXJldmlld2hlYWQge1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gIHBhZGRpbmc6IDE1cHg7XFxuICBmb250LXNpemU6IDE0cHggIWltcG9ydGFudDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLU1lZGl1bVxcXCIgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLnN1YnBhZ2VfX2FycmFuZ2VyZXZpZXdibG9jayB7XFxuICBib3JkZXItdG9wOiBzb2xpZCAxcHggI2NjY2NjYztcXG4gIHBhZGRpbmc6IDEwcHggMDtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgd2lkdGg6IDEwMCU7IH1cXG5cXG4uc3VicGFnZV9fYXJyYW5nZXJldmlld2xpc3Qge1xcbiAgbWFyZ2luOiA1cHggMDtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgd2lkdGg6IDEwMCU7IH1cXG5cXG4uc3VicGFnZV9fYXJyYW5nZXJldmlld2xhYmVsIHtcXG4gIGZvbnQtc2l6ZTogMTJweCAhaW1wb3J0YW50O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8tTWVkaXVtXFxcIiAhaW1wb3J0YW50O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xcbiAgY29sb3I6ICNjY2NjY2M7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBtYXJnaW4tbGVmdDogMTVweDsgfVxcblxcbi5zdWJwYWdlX19hcnJhbmdlcmV2aWV3dmFsdWUge1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbiAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xcbiAgZm9udC1zaXplOiAxMnB4ICFpbXBvcnRhbnQ7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1SZWd1bGFyXFxcIiAhaW1wb3J0YW50O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4uc3VicGFnZV9fYXJyYW5nZXJldmlld291dGxpbmUge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiAwO1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggIzQyNmRhOTsgfVxcblxcbi5zdWJwYWdlX19hcnJhbmdlcmV2aWV3YnRucyB7XFxuICBmbG9hdDogbGVmdDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWFyZ2luOiAzMHB4IDA7IH1cXG5cXG4uc3VicGFnZV9fYXJyYW5nZXJldmlld2J0biB7XFxuICBiYWNrZ3JvdW5kOiAjZWRmNGZhO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggIzQyNmRhOTtcXG4gIHBhZGRpbmc6IDVweCAxMHB4O1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbiAgZm9udC1zaXplOiAxNHB4ICFpbXBvcnRhbnQ7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1SZWd1bGFyXFxcIiAhaW1wb3J0YW50O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xcbiAgY29sb3I6ICM0MjZkYTk7XFxuICBtaW4td2lkdGg6IDE1MHB4O1xcbiAgY3Vyc29yOiBwb2ludGVyOyB9XFxuICAuc3VicGFnZV9fYXJyYW5nZXJldmlld2J0bjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQ6ICMwMDQ1OTA7XFxuICAgIGNvbG9yOiAjZmZmZmZmOyB9XFxuXFxuLnN1YnBhZ2VfX2FycmFuZ2VyZXZpZXdjbXB0YnRuIHtcXG4gIGJhY2tncm91bmQ6ICM0MjZkYTk7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3JkZXI6IHNvbGlkIDFweCAjNDI2ZGE5O1xcbiAgcGFkZGluZzogNXB4IDEwcHg7XFxuICBmbG9hdDogcmlnaHQ7XFxuICBmb250LXNpemU6IDE0cHggIWltcG9ydGFudDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLVJlZ3VsYXJcXFwiICFpbXBvcnRhbnQ7XFxuICBmb250LXdlaWdodDogbm9ybWFsICFpbXBvcnRhbnQ7XFxuICBjb2xvcjogI2ZmZmZmZjtcXG4gIG1pbi13aWR0aDogMTUwcHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7IH1cXG4gIC5zdWJwYWdlX19hcnJhbmdlcmV2aWV3Y21wdGJ0bjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQ6ICMwMDQ1OTA7XFxuICAgIGNvbG9yOiAjZmZmZmZmOyB9XFxuXFxuLnN1YnBhZ2VfX3NlbmRhcnJhbmdldGJsIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYm9yZGVyLXRvcDogc29saWQgMXB4ICNjY2NjY2M7XFxuICBib3JkZXItYm90dG9tOiBzb2xpZCAxcHggI2NjY2NjYztcXG4gIGZvbnQtc2l6ZTogMTRweCAhaW1wb3J0YW50O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8tUmVndWxhclxcXCIgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLnN1YnBhZ2VfX3NlbmRhcnJhbmdlY29sIHtcXG4gIHBhZGRpbmc6IDIwcHggMTBweDtcXG4gIGJvcmRlci10b3A6IHNvbGlkIDFweCAjY2NjY2NjO1xcbiAgYm9yZGVyLWJvdHRvbTogc29saWQgMXB4ICNjY2NjY2M7IH1cXG5cXG4uc3VicGFnZV9fYXJyYW5nZXNldHVwIHtcXG4gIG1hcmdpbi10b3A6IDYwcHg7XFxuICBmbG9hdDogbGVmdDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYm9yZGVyLWJvdHRvbTogc29saWQgMXB4ICNjY2M7XFxuICBwYWRkaW5nLWJvdHRvbTogNDBweDsgfVxcblxcbi5zdWJwYWdlX19hcnJhbmdlc2V0dXBkZXNjIHtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBmb250LXNpemU6IDE0cHggIWltcG9ydGFudDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLVJlZ3VsYXJcXFwiICFpbXBvcnRhbnQ7XFxuICBmb250LXdlaWdodDogbm9ybWFsICFpbXBvcnRhbnQ7XFxuICBjb2xvcjogIzAwMDAwMDtcXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7IH1cXG5cXG4uc3VicGFnZV9fYXJyYW5nZXNldHVwbGFiZWwge1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBsaW5lLWhlaWdodDogMzJweDtcXG4gIGZvbnQtc2l6ZTogMTRweCAhaW1wb3J0YW50O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8tUmVndWxhclxcXCIgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLnN1YnBhZ2VfX2FycmFuZ2VzZXR1cGxpc3Qge1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1hcmdpbi10b3A6IDVweDsgfVxcblxcbi5hbG4tYXQtLW1pZGRsZSB7XFxuICBsZWZ0OiA1MCU7IH1cXG4gIC5hbG4tYXQtLW1pZGRsZSAuc3VicGFnZV9fYXJyYW5nZXRhc2tpbmZvIHtcXG4gICAgbWFyZ2luLWxlZnQ6IC0xNXB4OyB9XFxuXFxuLmFsbi1hdC0tZW5kIHtcXG4gIGxlZnQ6IGF1dG87XFxuICByaWdodDogMDsgfVxcbiAgLmFsbi1hdC0tZW5kIC5zdWJwYWdlX19hcnJhbmdldGFza2luZm8ge1xcbiAgICBtYXJnaW4tbGVmdDogLTMwcHg7IH1cXG5cXG4ucHJvZ3Jlc3MtLWFjdGl2ZSAuc3VicGFnZV9fYXJyYW5nZXRhc2tpbmZvIHtcXG4gIGNvbG9yOiAjZTYzODg4OyB9XFxuXFxuLnByb2dyZXNzLS1hY3RpdmUgLnN1YnBhZ2VfX2FycmFuZ2V0YXNrY2lyY2xlIHtcXG4gIGJhY2tncm91bmQ6ICNlNjM4ODg7IH1cXG5cXG4ucHJvZ3Jlc3MtLWNvbXBsZXRlIC5zdWJwYWdlX19hcnJhbmdldGFza2NpcmNsZSB7XFxuICBiYWNrZ3JvdW5kOiAjZTYzODg4OyB9XFxuICAucHJvZ3Jlc3MtLWNvbXBsZXRlIC5zdWJwYWdlX19hcnJhbmdldGFza2NpcmNsZTo6YWZ0ZXIge1xcbiAgICB3aWR0aDogNnB4O1xcbiAgICBoZWlnaHQ6IDEycHg7XFxuICAgIGJvcmRlci1yaWdodDogc29saWQgMnB4ICNmZmZmZmY7XFxuICAgIGJvcmRlci1ib3R0b206IHNvbGlkIDJweCAjZmZmZmZmO1xcbiAgICBsZWZ0OiA3cHg7XFxuICAgIHRvcDogM3B4O1xcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7IH1cXG4gIC5wcm9ncmVzcy0tY29tcGxldGUgLnN1YnBhZ2VfX2FycmFuZ2V0YXNrY2lyY2xlOjpiZWZvcmUge1xcbiAgICBkaXNwbGF5OiBub25lOyB9XFxuXFxuLmNsZWFyLS1ib3RoIHtcXG4gIGNsZWFyOiBib3RoICFpbXBvcnRhbnQ7IH1cXG5cXG4ucHVsbC0tbGVmdCB7XFxuICBmbG9hdDogbGVmdCAhaW1wb3J0YW50OyB9XFxuXFxuLnN1c3RhaW4tLWFjdGl2ZS5zdWJwYWdlX19zdXN0YWlubGlzdCB7XFxuICBib3JkZXItY29sb3I6ICM0MjZkYTk7IH1cXG5cXG4uc3VzdGFpbi0tYWN0aXZlIC5zdWJwYWdlX19zdXN0YWluaGVhZCB7XFxuICBiYWNrZ3JvdW5kOiAjNDI2ZGE5OyB9XFxuXFxuLnN1c3RhaW4tLWFjdGl2ZSAuc3VicGFnZV9fc3VzdGFpbm51bWJlciB7XFxuICBjb2xvcjogI2ZmZmZmZiAhaW1wb3J0YW50OyB9XFxuXFxuLnN1c3RhaW4tLWFjdGl2ZSAuc3VicGFnZV9fc3VzdGFpbmhlYWRpbmcge1xcbiAgY29sb3I6ICNmZmZmZmYgIWltcG9ydGFudDsgfVxcblxcbi5zdXN0YWluLS1hY3RpdmUgLnN1YnBhZ2VfX3N1c3RhaW5kZXNjIHtcXG4gIGNvbG9yOiAjZmZmZmZmICFpbXBvcnRhbnQ7IH1cXG5cXG4uc3VzdGFpbi0tYWN0aXZlIC5zdWJwYWdlX19zdXN0YWludGltZSB7XFxuICBib3JkZXItY29sb3I6ICM0MjZkYTk7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1NZWRpdW1cXFwiICFpbXBvcnRhbnQ7IH1cXG5cXG4uc3VzdGFpbi0tYWN0aXZlIC5zdWJwYWdlX19zdXN0YWluc2VsZWN0YnV0dG9uIHtcXG4gIGJhY2tncm91bmQ6ICM0MjZkYTk7XFxuICBjb2xvcjogI2ZmZmZmZiAhaW1wb3J0YW50OyB9XFxuXFxuLm1hci1sdC0tMjUge1xcbiAgbWFyZ2luLWxlZnQ6IDI1cHggIWltcG9ydGFudDsgfVxcblxcbi50eHQtYWxuLS1ydCB7XFxuICB0ZXh0LWFsaWduOiByaWdodDsgfVxcblxcbi5jaGVja2JveCB7XFxuICB3aWR0aDogMjBweDtcXG4gIGhlaWdodDogMjBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJvcmRlcjogc29saWQgMXB4ICM0MjZkYTk7XFxuICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgbWFyZ2luOiAwIDEwcHggMCAwO1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbiAgb3V0bGluZTogbm9uZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGZsb2F0OiByaWdodDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHRvcDogNXB4OyB9XFxuICAuY2hlY2tib3g6Y2hlY2tlZCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcbiAgICAuY2hlY2tib3g6Y2hlY2tlZDo6YWZ0ZXIge1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICB3aWR0aDogN3B4O1xcbiAgICAgIGhlaWdodDogMTJweDtcXG4gICAgICBib3JkZXItcmlnaHQ6IHNvbGlkIDNweCAjNDI2ZGE5O1xcbiAgICAgIGJvcmRlci1ib3R0b206IHNvbGlkIDNweCAjNDI2ZGE5O1xcbiAgICAgIGxlZnQ6IDZweDtcXG4gICAgICB0b3A6IDJweDtcXG4gICAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7IH1cXG5cXG4ucm91bmRlZGNoZWNrYm94IHtcXG4gIHdpZHRoOiAyMHB4O1xcbiAgaGVpZ2h0OiAyMHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggIzQ3NzgwYztcXG4gIGJhY2tncm91bmQ6ICNmZmY7XFxuICBtYXJnaW46IDAgMTVweCAwIDA7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB0b3A6IDVweDsgfVxcbiAgLnJvdW5kZWRjaGVja2JveDpjaGVja2VkIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBiYWNrZ3JvdW5kOiAjNDc3ODBjOyB9XFxuICAgIC5yb3VuZGVkY2hlY2tib3g6Y2hlY2tlZDo6YWZ0ZXIge1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICB3aWR0aDogNnB4O1xcbiAgICAgIGhlaWdodDogMTJweDtcXG4gICAgICBib3JkZXItcmlnaHQ6IHNvbGlkIDJweCAjZmZmZmZmO1xcbiAgICAgIGJvcmRlci1ib3R0b206IHNvbGlkIDJweCAjZmZmZmZmO1xcbiAgICAgIGxlZnQ6IDZweDtcXG4gICAgICB0b3A6IDJweDtcXG4gICAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7IH1cXG5cXG4ucm93LS1zZWxlY3RlZCB7XFxuICBmb250LXNpemU6IDE0cHggIWltcG9ydGFudDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLU1lZGl1bVxcXCIgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuI2NyZWF0ZWFycmFuZ2VtZW50LCAjY29tcGxldGVhcnJhbmdlbWVudCwgI2dlbmVyYXRlYXJyYW5nZW1lbnQge1xcbiAgZGlzcGxheTogbm9uZTsgfVxcblxcbmVkcy10YWdbbW90aWY9J3ByaW1hcnknXSB7XFxuICBiYWNrZ3JvdW5kOiAjZDJlN2Y3O1xcbiAgY29sb3I6ICMzMzMzMzM7IH1cXG5cXG4uY2VsbC0tc3Bhbi0yIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiA5OSU7XFxuICBmb250LXNpemU6IDEzcHg7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgZm9udC13ZWlnaHQ6IDUwMDsgfVxcblxcbi5hcnJlYXJzX19kYXRhIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtc2l6ZTogMTNweDsgfVxcblxcbi50eHQtLXRyYW5zZm9ybS1ub25lIHtcXG4gIHRleHQtdHJhbnNmb3JtOiBub25lOyB9XFxuXFxuLnR4dC0tbm9ybWFsIHtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7IH1cXG5cXG4udHh0LS1kaXNwbGF5LWlubGluZSB7XFxuICBkaXNwbGF5OiBpbmxpbmUgIWltcG9ydGFudDsgfVxcblxcbi5sYWJlbHNlY3Rpb25fX2xlZnQge1xcbiAgZmxvYXQ6IGxlZnQ7IH1cXG5cXG4ubGFiZWxzZWN0aW9uX19yaWdodCB7XFxuICBmbG9hdDogcmlnaHQ7IH1cXG5cXG4ubXJnLWxlZnQtLTEwcHgge1xcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7IH1cXG5cXG4ubXJnLWxlZnQtLTQwcHgge1xcbiAgbWFyZ2luLWxlZnQ6IDQwcHggIWltcG9ydGFudDsgfVxcblxcbi5tcmctdG9wLS0zMHB4IHtcXG4gIG1hcmdpbi10b3A6IDMwcHggIWltcG9ydGFudDsgfVxcblxcbi5ib3JkZXJyYWRpdXMtLXRvcC1ub25lIHtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDA7XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMDsgfVxcblxcbi5ib3JkZXJyYWRpdXMtLWJvdHRvbS1ub25lIHtcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDA7XFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMDsgfVxcblxcbi5lZHMtYWNjb3JkaW9uLWFkZCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICByaWdodDogNjBweDtcXG4gIHRvcDogMTJweDtcXG4gIHdpZHRoOiAxNXB4O1xcbiAgaGVpZ2h0OiAxNXB4O1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vaW1hZ2VzL2FkZC5wbmdcIikpICsgXCIpOyB9XFxuXFxuLmNsci0tYmx1ZSB7XFxuICBjb2xvcjogIzBlNmViNzsgfVxcblxcbi5hY2NvdW50aW5mb19fY2FsZW5kYXJjb250YWluZXIge1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjY2NjYztcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gIG1hcmdpbi10b3A6IDgwcHg7IH1cXG5cXG4uYWNjb3VudGluZm9fX2NhbGVuZGFydGVtcGxhdGUge1xcbiAgcGFkZGluZzogMTBweCA0MHB4OyB9XFxuXFxuLmFjY291bnRpbmZvX19jYWxlbmRhciB7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuXFxuLmFjY291bnRpbmZvX19jYWxlbmRhcnZpZXcge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBhZGRpbmc6IDEwcHggMDsgfVxcblxcbi5hY2NvdW50aW5mb19fc3dpdGNobW9udGgge1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICB3aWR0aDogNSU7XFxuICBtaW4taGVpZ2h0OiAyNTNweDtcXG4gIGRpc3BsYXk6IHRhYmxlOyB9XFxuXFxuLmFjY291bnRpbmZvX19tb250aHZpZXdzIHtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgd2lkdGg6IDkwJTsgfVxcblxcbi5hY2NvdW50aW5mb19fbW9udGh2aWV3c2VjdGlvbiB7XFxuICBmbG9hdDogbGVmdDtcXG4gIHdpZHRoOiA1MCU7IH1cXG5cXG4uYWNjb3VudGluZm9fX21vbnRodmlldyB7XFxuICB3aWR0aDogY2FsYygxMDAlIC0gMjBweCAtIDFweCk7XFxuICBwYWRkaW5nOiAwIDEwcHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgbWFyZ2luOiAwIGF1dG87IH1cXG5cXG4uYWNjb3VudGluZm9fX2NhbGVuZGFydGl0bGUge1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGZvbnQtc2l6ZTogMTNweDtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcGFkZGluZzogNXB4IDA7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Q2ZDZkNjsgfVxcblxcbi5hY2NvdW50aW5mb19fY2FsZW5kYXJjZWxscyB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgcGFkZGluZy10b3A6IDEwcHg7XFxuICBtYXJnaW46IDAgYXV0bzsgfVxcblxcbi5hY2NvdW50aW5mb19fY2FsZW5kYXJoZWFkZXIge1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIGZvbnQtc2l6ZTogMTNweDtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICB3aWR0aDogMTQuMjg1JTtcXG4gIGhlaWdodDogMzBweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBsaW5lLWhlaWdodDogMzBweDsgfVxcblxcbi5hY2NvdW50aW5mb19fY2FsZW5kYXJjZWxsIHtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBmb250LXNpemU6IDEzcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB3aWR0aDogMTQuMjg1JTtcXG4gIGhlaWdodDogMzBweDtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGxpbmUtaGVpZ2h0OiAzMHB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuLmNpcmNsZS0tZmlsbCB7XFxuICB3aWR0aDogMjVweDtcXG4gIGhlaWdodDogMjVweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHotaW5kZXg6IC0xO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7IH1cXG5cXG4uY2lyY2xlLS1ib3JkZXIge1xcbiAgd2lkdGg6IDI1cHg7XFxuICBoZWlnaHQ6IDI1cHg7XFxuICBib3JkZXI6IDJweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIHotaW5kZXg6IC0xOyB9XFxuXFxuLmNpcmNsZS0tcG9zLWNlbnRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBtYXJnaW4tbGVmdDogLTEycHg7XFxuICBtYXJnaW4tdG9wOiAtMTNweDtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRvcDogNTAlOyB9XFxuXFxuLnNtYWxsY2lyY2xlLS1maWxsIHtcXG4gIHdpZHRoOiAxNXB4O1xcbiAgaGVpZ2h0OiAxNXB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgbWFyZ2luLXRvcDogNHB4OyB9XFxuXFxuLnNtYWxsY2lyY2xlLS1ib3JkZXIge1xcbiAgd2lkdGg6IDE1cHg7XFxuICBoZWlnaHQ6IDE1cHg7XFxuICBib3JkZXI6IDJweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIG1hcmdpbi10b3A6IDRweDsgfVxcblxcbi5hY2NvdW50aW5mb19fbXVsdGlwbGVldmVudHMge1xcbiAgYm9yZGVyLWNvbG9yOiAjNmIyMDc1OyB9XFxuXFxuLmFjY291bnRpbmZvX19hcnJhbmdlbWVudCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYjdiZDExOyB9XFxuXFxuLmFjY291bnRpbmZvX19kZWJpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBiMGE0OyB9XFxuXFxuLmFjY291bnRpbmZvX19jcmVkaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwODJhNjsgfVxcblxcbi5hY2NvdW50aW5mb19fY2FsbCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNmIyMDc1OyB9XFxuXFxuLmFjY291bnRpbmZvX19jb21tdW5pY2F0aW9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlNjM5ODc7IH1cXG5cXG4uYWNjb3VudGluZm9fX3VzZXJjb25maWcxIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjhlMWM7IH1cXG5cXG4uYWNjb3VudGluZm9fX3VzZXJjb25maWcyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmY2Q3MDA7IH1cXG5cXG4uYWNjb3VudGluZm9fX3RvZGF5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlMWVmZmE7XFxuICB3aWR0aDogMjVweDtcXG4gIGhlaWdodDogMjVweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIG1hcmdpbi1sZWZ0OiAtMTIuNXB4O1xcbiAgbWFyZ2luLXRvcDogLTEyLjVweDtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRvcDogNTAlO1xcbiAgei1pbmRleDogLTE7IH1cXG5cXG4uY2xyLS13aGl0ZSB7XFxuICBjb2xvcjogI2ZmZjsgfVxcblxcbi5jbHItLXB1cnBsZSB7XFxuICBjb2xvcjogIzZiMjA3NTsgfVxcblxcbi5kZXZpZGVyIHtcXG4gIHdpZHRoOiAxcHg7XFxuICBoZWlnaHQ6IDIwMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Q2ZDZkNjtcXG4gIG1hcmdpbi10b3A6IDUwcHg7XFxuICBmbG9hdDogbGVmdDsgfVxcblxcbi5hY2NvdW50aW5mb19fbGVnZW5kc2VjdGlvbiB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcXG4gIHBhZGRpbmc6IDE1cHggMDsgfVxcblxcbi5hY2NvdW50aW5mb19fY2FsZW5kYXJsZWdlbmRzIHtcXG4gIHdpZHRoOiA4NSU7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIG92ZXJmbG93OiBoaWRkZW47IH1cXG5cXG4uYWNjb3VudGluZm9fX2NhbGVuZGFybGVnZW5kIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgd2lkdGg6IDI1JTtcXG4gIG1hcmdpbjogNHB4IDA7IH1cXG5cXG4uYWNjb3VudGluZm9fX2NhbGVuZGFybGVnZW5kdGV4dCB7XFxuICBtYXJnaW4tbGVmdDogMjVweDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBmb250LXNpemU6IDEzcHg7IH1cXG5cXG4uYWNjb3VudGluZm9fX3N3aXRjaG1vbnRobGluayB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcblxcbi5lZHMtcHJldmlvdXMtY2FyZXQge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgcmlnaHQ6IDBweDtcXG4gIHRvcDogNTAlO1xcbiAgd2lkdGg6IDIwcHg7XFxuICBoZWlnaHQ6IDIwcHg7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9pbWFnZXMvbGVmdF9hcnJvdy5wbmdcIikpICsgXCIpO1xcbiAgbWFyZ2luLXRvcDogLTEwcHg7IH1cXG5cXG4uZWRzLW5leHQtY2FyZXQge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgcmlnaHQ6IDBweDtcXG4gIHRvcDogNTAlO1xcbiAgd2lkdGg6IDIwcHg7XFxuICBoZWlnaHQ6IDIwcHg7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9pbWFnZXMvcmlnaHRfYXJyb3cucG5nXCIpKSArIFwiKTtcXG4gIG1hcmdpbi10b3A6IC0xMHB4OyB9XFxuXFxuLnBjYy1lZHMtdGltZWxpbmUtaXRlbSBbc2xvdD1cXFwic2xvdC1oZWFkZXItY2VudGVyXFxcIl0ge1xcbiAgZm9udC1zaXplOiAxNHB4OyB9XFxuXFxuLnRpbWVsaW5lX19kYXkge1xcbiAgY29sb3I6ICM3YTdhN2E7IH1cXG5cXG4udGltZWxpbmVfX2RldGFpbHMge1xcbiAgZm9udC13ZWlnaHQ6IDQwMDsgfVxcblxcbi5zY2FsZTIge1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyKTtcXG4gIHZlcnRpY2FsLWFsaWduOiBib3R0b207IH1cXG5cXG4vKiBlZHMtaWNvbltpY29uKj1cXFwia2V5Ym9hcmRfYXJyb3dcXFwiXSB7XFxuICAgIGNvbG9yOiAjMGU2ZWI3O1xcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xcbn0gKi9cXG5wY2MtZWRzLXRpbWVsaW5lLWl0ZW0gW3Nsb3Q9XFxcInNsb3QtaGVhZGVyLWNlbnRlclxcXCJdIFtzbG90PVxcXCJzbG90LWhlYWRlci1yaWdodFxcXCJdIHtcXG4gIHRleHQtYWxpZ246IGxlZnQgIWltcG9ydGFudDsgfVxcblxcbnBjYy1lZHMtdGltZWxpbmUtaXRlbSAucGFnaW5hdGlvbiB7XFxuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNkOGQ4ZDg7XFxuICBtYXJnaW4tbGVmdDogNTNweDtcXG4gIC8qIG1pbi1oZWlnaHQ6IDIwcHg7ICovXFxuICBwYWRkaW5nLXJpZ2h0OiAzMHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuXFxucGNjLWVkcy10aW1lbGluZS1pdGVtIC5zZWN0aW9uLXBhZ2luYXRpb24ge1xcbiAgZmxleDogNTtcXG4gIG1hcmdpbi1sZWZ0OiAyMHB4OyB9XFxuXFxuLnBhZ2luYXRlIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBmb250LXNpemU6IDE0cHg7IH1cXG5cXG4ucGFnaW5hdGVfX2l0ZW0ge1xcbiAgZGlzcGxheTogaW5saW5lOyB9XFxuXFxuLnBhZ2luYXRlX19saW5rIHtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmbG9hdDogbGVmdDtcXG4gIHBhZGRpbmc6IDhweCA4cHg7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBtYXJnaW46IDAgNHB4O1xcbiAgLyogdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAuM3M7ICovXFxuICAvKiBib3JkZXI6IDFweCBzb2xpZCAjZGRkOyAqLyB9XFxuXFxuLmxpbmstLWFjdGl2ZSB7XFxuICBjb2xvcjogIzMzMzMzMyAhaW1wb3J0YW50O1xcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNhZjE2ODU7IH1cXG5cXG4ubGluay0tZGlzYWJsZWQge1xcbiAgY29sb3I6ICM3YTdhN2EgIWltcG9ydGFudDsgfVxcblxcbi5tYXJnaW4wIHtcXG4gIG1hcmdpbjogMCAhaW1wb3J0YW50OyB9XFxuXFxuLm1hcmdpbi1sZWZ0LS01cHgge1xcbiAgbWFyZ2luLWxlZnQ6IDVweDsgfVxcblxcbi5wYWRkaW5nLWxlZnQtLTAge1xcbiAgcGFkZGluZy1sZWZ0OiAwOyB9XFxuXFxuLnBhZGRpbmctcmlnaHQtLTAge1xcbiAgcGFkZGluZy1yaWdodDogMDsgfVxcblxcbi5mb250LS1ub3JtYWwge1xcbiAgZm9udC13ZWlnaHQ6IDQwMDsgfVxcblxcbi5wY2MtZWRzLXRpbWVsaW5lLXZpZXcge1xcbiAgcGFkZGluZy1ib3R0b206IDE1cHg7IH1cXG5cXG4ucGFnaW5hdGlvbl9fY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4OiA1O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjsgfVxcblxcbi5wYWdpbmF0aW9uX19saW5rcyB7XFxuICAvKiBkaXNwbGF5OiBmbGV4OyAqL1xcbiAgZmxleDogNDsgfVxcblxcbi5wYWdpbmF0aW9uX19zdGF0dXMge1xcbiAgLyogZGlzcGxheTogZmxleDsgKi9cXG4gIGZsZXg6IDE7XFxuICBmb250LXdlaWdodDogbm9ybWFsOyB9XFxuXFxuLnBjYy1lZHMtdGltZWxpbmUtdmlldyB7XFxuICBwYWRkaW5nLWJvdHRvbTogMTVweCAhaW1wb3J0YW50OyB9XFxuXFxuLnNsb3RfX2RhdGFjb250YWluZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcXG4gIHBhZGRpbmc6IDIwcHggMDsgfVxcblxcbi5zbG90X19kYXRldGVtcGxhdGUge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBhZGRpbmc6IDAgMzBweDsgfVxcblxcbi5zbG90X19kYXRhY29udGFpbmVyIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1OyB9XFxuXFxuLnNsb3RfX2RhdGFpdGVtIHtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgd2lkdGg6IDUwJTtcXG4gIHBhZGRpbmc6IDAgMjBweDsgfVxcblxcbi5zbG90X19kYXRhaGVhZGVyIHtcXG4gIGNvbG9yOiAjYWYxNjg1O1xcbiAgbWFyZ2luLWxlZnQ6IDVweDsgfVxcblxcbi5zbG90X19kYXRhZmllbGQge1xcbiAgbWFyZ2luLWxlZnQ6IDVweDtcXG4gIG1hcmdpbi10b3A6IDE1cHg7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgZm9udC1zaXplOiAxNHB4OyB9XFxuXFxuLnNsb3RfX3ZhbHVlIHtcXG4gIG1hcmdpbi1sZWZ0OiA1cHg7XFxuICBwYWRkaW5nOiAycHggNXB4O1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIG1hcmdpbi10b3A6IDVweDtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jazsgfVxcblxcbi5zbG90X191cGRhdGVkdmFsdWUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZWNiOTtcXG4gIHBhZGRpbmc6IDJweCA1cHg7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgbWFyZ2luLXRvcDogNXB4O1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrOyB9XFxuXFxuLmJyZC1yaWdodC0tMXB4IHtcXG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNkNmQ2ZDY7IH1cXG5cXG4udXBsb2FkX19kb2N1bWVudCB7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2ltYWdlcy91cGxvYWRfZG9jdW1lbnQucG5nXCIpKSArIFwiKSAwIG5vLXJlcGVhdDtcXG4gIHdpZHRoOiAyMHB4O1xcbiAgaGVpZ2h0OiAyMHB4O1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiA1MCU7XFxuICB0b3A6IDUwJTtcXG4gIG1hcmdpbi10b3A6IC0xMHB4O1xcbiAgbWFyZ2luLWxlZnQ6IC03cHg7IH1cXG5cXG4uZG9jdW1lbnQge1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9pbWFnZXMvZG9jdW1lbnQucG5nXCIpKSArIFwiKSAwIG5vLXJlcGVhdDtcXG4gIHdpZHRoOiAyMHB4O1xcbiAgaGVpZ2h0OiAyMHB4O1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiA1MCU7XFxuICB0b3A6IDUwJTtcXG4gIG1hcmdpbi10b3A6IC0xMHB4O1xcbiAgbWFyZ2luLWxlZnQ6IC05cHg7IH1cXG5cXG4ucG9zLS1yZWxhdGl2ZSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4ucHJvbWlzZXBheV9fbmF2dGFiIHtcXG4gIHdpZHRoOiAyMDBweDtcXG4gIG1hcmdpbjogMCBhdXRvIDIwcHg7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7IH1cXG5cXG4ucHJvbWlzZXBheV9fbmF2dGFiY29udCB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbGluZS1oZWlnaHQ6IDEwcHg7IH1cXG5cXG4ucHJvbWlzZXBheV9fbmF2dGFibGlzdCB7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbiAgbGluZS1oZWlnaHQ6IDEwcHg7IH1cXG5cXG5AbWVkaWEgYWxsIGFuZCAoLW1zLWhpZ2gtY29udHJhc3Q6IG5vbmUpIHtcXG4gIC5wcm9taXNlcGF5X19uYXZ0YWJsaXN0IHtcXG4gICAgbGlzdC1zdHlsZS1pbWFnZTogdXJsKGRhdGE6MCk7XFxuICAgIGRpc3BsYXk6IGlubGluZTsgfSB9XFxuXFxuLnByb21pc2VwYXlfX25hdnRhYmxpbmsge1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggI2NjY2NjYztcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIiAhaW1wb3J0YW50O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xcbiAgY29sb3I6ICM0MjZkYTk7XFxuICBtaW4td2lkdGg6IDk3cHg7XFxuICBmbG9hdDogbGVmdDtcXG4gIHBhZGRpbmc6IDEwcHggMDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDAgIWltcG9ydGFudDsgfVxcblxcbi5wcm9taXNlcGF5LS1uYXZ0YWJsaW5rYWN0aXZlIHtcXG4gIGJhY2tncm91bmQ6ICNkODJiODA7XFxuICBjb2xvcjogI2ZmZmZmZiAhaW1wb3J0YW50O1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggI2Q4MmI4MDsgfVxcblxcbi5wcm9taXNlcGF5LS1uYXZ0YWJsaW5rZmlyc3Qge1xcbiAgYm9yZGVyLXJhZGl1czogNHB4IDAgMCA0cHggIWltcG9ydGFudDtcXG4gIGJvcmRlci1yaWdodDogbm9uZTsgfVxcblxcbi5wcm9taXNlcGF5LS1uYXZ0YWJsaW5rbGFzdCB7XFxuICBib3JkZXItcmFkaXVzOiAwIDRweCA0cHggMCAhaW1wb3J0YW50O1xcbiAgYm9yZGVyLWxlZnQ6IG5vbmU7IH1cXG5cXG4ubm90ZXMtdGFiIGVkcy1hY2NvcmRpb24ge1xcbiAgYm9yZGVyLWNvbG9yOiAjNDI2REE5OyB9XFxuXFxuLm5vdGVzLXRhYiAubm90ZS1jb250YWluZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQyNkRBOTsgfVxcbiAgLm5vdGVzLXRhYiAubm90ZS1jb250YWluZXIgZWRzLWFjY29yZGlvbi1wYW5lbCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0MjZEQTk7IH1cXG4gIC5ub3Rlcy10YWIgLm5vdGUtY29udGFpbmVyIC5lZHMtYWNjb3JkaW9uLWxhYmVsIHtcXG4gICAgYmFja2dyb3VuZDogIzQyNkRBOSAhaW1wb3J0YW50O1xcbiAgICBjb2xvcjogI2ZmZmZmZiAhaW1wb3J0YW50OyB9XFxuICAubm90ZXMtdGFiIC5ub3RlLWNvbnRhaW5lciAudGFibGUge1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmICFpbXBvcnRhbnQ7IH1cXG5cXG4ubm90ZXMtdGFiIC5ub3RlLWJ0biB7XFxuICBmbG9hdDogcmlnaHQ7IH1cXG5cXG4ubm90ZXMtdGFiIC5yb3cgPiAuY2VsbCB7XFxuICBmbG9hdDogcmlnaHQ7IH1cXG5cXG4ubm90ZXMtdGFiIHRleHRhcmVhIHtcXG4gIHBhZGRpbmc6IDEwcHggMTBweCAwO1xcbiAgZm9udC1zaXplOiAxNHB4ICFpbXBvcnRhbnQ7IH1cXG5cXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXFxuICAgIEluY29tZSBhbmQgRXhwZW5kaXR1cmVcXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXFxuLkluY29tZUV4cGVuZGl0dXJlX18ge1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICB3aWR0aDogODAlOyB9XFxuICAuSW5jb21lRXhwZW5kaXR1cmVfXyBoMSB7XFxuICAgIGNvbG9yOiAjMDAwMDAwO1xcbiAgICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gICAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICAgIHBhZGRpbmc6IDJlbSAwIDAgMDsgfVxcbiAgICAuSW5jb21lRXhwZW5kaXR1cmVfXyBoMSBiIHtcXG4gICAgICBmb250LXdlaWdodDogYm9sZDsgfVxcbiAgICAuSW5jb21lRXhwZW5kaXR1cmVfXyBoMSBzcGFuIHtcXG4gICAgICBjb2xvcjogIzZEMjA3NztcXG4gICAgICBmb250LWZhbWlseTogUm9ib3RvO1xcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgICBsaW5lLWhlaWdodDogMTRweDtcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRUNFM0VFO1xcbiAgICAgIHBhZGRpbmc6IDVweCAxMHB4O1xcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsgfVxcbiAgLkluY29tZUV4cGVuZGl0dXJlX18gaW5wdXQge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB0b3A6IDA7XFxuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IH1cXG4gIC5JbmNvbWVFeHBlbmRpdHVyZV9fIHNlbGVjdCB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHRvcDogMDtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50OyB9XFxuICAuSW5jb21lRXhwZW5kaXR1cmVfXyAuc3ViSGVhZGluZ19fIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGNvbG9yOiAjMzMzMzMzO1xcbiAgICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICAgIGZvbnQtc2l6ZTogMTNweDtcXG4gICAgbGluZS1oZWlnaHQ6IDE0cHg7XFxuICAgIHBhZGRpbmc6IDEwcHggMCAwIDA7IH1cXG4gICAgLkluY29tZUV4cGVuZGl0dXJlX18gLnN1YkhlYWRpbmdfXyBsYWJlbCB7XFxuICAgICAgcGFkZGluZy1yaWdodDogMWVtOyB9XFxuICAuSW5jb21lRXhwZW5kaXR1cmVfX3dpdGhzd2l0Y2gge1xcbiAgICBmbG9hdDogbGVmdDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIG1hcmdpbi1ib3R0b206IDE1cHg7IH1cXG4gIC5JbmNvbWVFeHBlbmRpdHVyZV9fbGl2aW5nY29zdCB7XFxuICAgIGNvbG9yOiAjMzMzMzMzO1xcbiAgICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gICAgbGluZS1oZWlnaHQ6IDE5cHg7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgICBwYWRkaW5nOiAwICFpbXBvcnRhbnQ7IH1cXG4gIC5JbmNvbWVFeHBlbmRpdHVyZV9fIC5hY2NvcmRpb24ge1xcbiAgICBtYXJnaW4tdG9wOiAxZW07IH1cXG4gICAgLkluY29tZUV4cGVuZGl0dXJlX18gLmFjY29yZGlvbiAudHJhbnNpdGlvbiwgLkluY29tZUV4cGVuZGl0dXJlX18gLmFjY29yZGlvbiBwLCAuSW5jb21lRXhwZW5kaXR1cmVfXyAuYWNjb3JkaW9uIHVsIGxpIGk6YmVmb3JlLCAuSW5jb21lRXhwZW5kaXR1cmVfXyAuYWNjb3JkaW9uIHVsIGxpIGk6YWZ0ZXIge1xcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjI1cyBlYXNlLWluLW91dDsgfVxcbiAgICAuSW5jb21lRXhwZW5kaXR1cmVfXyAuYWNjb3JkaW9uIC5mbGlwSW4sIC5JbmNvbWVFeHBlbmRpdHVyZV9fIC5hY2NvcmRpb24gaDEsIC5JbmNvbWVFeHBlbmRpdHVyZV9fIC5hY2NvcmRpb24gdWwgbGkge1xcbiAgICAgIGFuaW1hdGlvbjogZmxpcGRvd24gMC41cyBlYXNlIGJvdGg7IH1cXG4gICAgLkluY29tZUV4cGVuZGl0dXJlX18gLmFjY29yZGlvbiAubm8tc2VsZWN0LCAuSW5jb21lRXhwZW5kaXR1cmVfXyAuYWNjb3JkaW9uIGgyIHtcXG4gICAgICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XFxuICAgICAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lO1xcbiAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgICAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAgIHVzZXItc2VsZWN0OiBub25lOyB9XFxuICAgIC5JbmNvbWVFeHBlbmRpdHVyZV9fIC5hY2NvcmRpb24gYm9keSB7XFxuICAgICAgbWluLWhlaWdodDogMDtcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgIGxlZnQ6IDUwJTtcXG4gICAgICBtYXJnaW46IDkwcHggMDtcXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAwKTtcXG4gICAgICBib3gtc2hhZG93OiAwIDEwcHggMCAwICNmZjY4NzMgaW5zZXQ7XFxuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2ZmNjg3MztcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmVmZmZhO1xcbiAgICAgIG1heC13aWR0aDogNDUwcHg7XFxuICAgICAgcGFkZGluZzogMzBweDsgfVxcbiAgICBAbWVkaWEgKG1heC13aWR0aDogNTUwcHgpIHtcXG4gICAgICAuSW5jb21lRXhwZW5kaXR1cmVfXyAuYWNjb3JkaW9uIGJvZHkge1xcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApO1xcbiAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgICAgICAgbWluLWhlaWdodDogMTAwJTtcXG4gICAgICAgIG1hcmdpbjogMDtcXG4gICAgICAgIGxlZnQ6IDA7IH0gfVxcbiAgICAuSW5jb21lRXhwZW5kaXR1cmVfXyAuYWNjb3JkaW9uIGgxLCAuSW5jb21lRXhwZW5kaXR1cmVfXyAuYWNjb3JkaW9uIGgyIHtcXG4gICAgICBjb2xvcjogIzg0Mjc4ZDsgfVxcbiAgICAuSW5jb21lRXhwZW5kaXR1cmVfXyAuYWNjb3JkaW9uIGgxIHNwYW4sIC5JbmNvbWVFeHBlbmRpdHVyZV9fIC5hY2NvcmRpb24gaDIgc3BhbiB7XFxuICAgICAgY29sb3I6ICMzMzM7IH1cXG4gICAgLkluY29tZUV4cGVuZGl0dXJlX18gLmFjY29yZGlvbiBoMSB7XFxuICAgICAgY29sb3I6ICMzMzM7XFxuICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgZm9udC1zaXplOiAxZW07XFxuICAgICAgcGFkZGluZzogMmVtIDAgMWVtIDA7IH1cXG4gICAgLkluY29tZUV4cGVuZGl0dXJlX18gLmFjY29yZGlvbiBoMiB7XFxuICAgICAgbGV0dGVyLXNwYWNpbmc6IDFweDtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICBwYWRkaW5nOiAxZW0gMmVtIDFlbSA0ZW07XFxuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gICAgICBjb2xvcjogIzE2M2M2ZjtcXG4gICAgICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICAgICAgbGluZS1oZWlnaHQ6IDE2cHggc3BhbjtcXG4gICAgICAgIGxpbmUtaGVpZ2h0LWNvbG9yOiAjNDI0MjQyOyB9XFxuICAgIC5JbmNvbWVFeHBlbmRpdHVyZV9fIC5hY2NvcmRpb24gaDMge1xcbiAgICAgIGZvbnQtc2l6ZTogMWVtO1xcbiAgICAgIHBhZGRpbmc6IDJlbSAyZW0gMWVtIDBlbTsgfVxcbiAgICAuSW5jb21lRXhwZW5kaXR1cmVfXyAuYWNjb3JkaW9uIHRhYmxlIHtcXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICBtYXgtaGVpZ2h0OiA4MDBweDtcXG4gICAgICBvcGFjaXR5OiAxO1xcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApO1xcbiAgICAgIHotaW5kZXg6IDI7IH1cXG4gICAgLkluY29tZUV4cGVuZGl0dXJlX18gLmFjY29yZGlvbiB1bCB7XFxuICAgICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgICBwZXJzcGVjdGl2ZTogOTAwO1xcbiAgICAgIHBhZGRpbmc6IDBweDtcXG4gICAgICBtYXJnaW46IDA7XFxuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2NjY2NjYztcXG4gICAgICBib3JkZXItcmFkaXVzOiA2cHg7IH1cXG4gICAgLkluY29tZUV4cGVuZGl0dXJlX18gLmFjY29yZGlvbiB1bCBsaSB7XFxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgIHBhZGRpbmc6IDA7XFxuICAgICAgbWFyZ2luOiAwO1xcbiAgICAgIHBhZGRpbmctYm90dG9tOiA0cHg7XFxuICAgICAgLyogcGFkZGluZy10b3A6IDE4cHg7ICovXFxuICAgICAgLyogYm9yZGVyLXRvcDogMXB4IGRvdHRlZCAjZGNlN2ViOyAqLyB9XFxuICAgIC5JbmNvbWVFeHBlbmRpdHVyZV9fIC5hY2NvcmRpb24gdWwgbGkgZGl2IHtcXG4gICAgICBtYXJnaW46IDAgMmVtIDFlbTsgfVxcbiAgICAuSW5jb21lRXhwZW5kaXR1cmVfXyAuYWNjb3JkaW9uIHVsIGxpLmJnX2dyYXkge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmMmYyZjI7IH1cXG4gICAgLkluY29tZUV4cGVuZGl0dXJlX18gLmFjY29yZGlvbiB1bCBsaS5iZHJfdCB7XFxuICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkMWQxZDE7IH1cXG4gICAgLkluY29tZUV4cGVuZGl0dXJlX18gLmFjY29yZGlvbiB1bCBsaTpudGgtb2YtdHlwZSgxKSB7XFxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjVzOyB9XFxuICAgIC5JbmNvbWVFeHBlbmRpdHVyZV9fIC5hY2NvcmRpb24gdWwgbGk6bnRoLW9mLXR5cGUoMikge1xcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogMC43NXM7IH1cXG4gICAgLkluY29tZUV4cGVuZGl0dXJlX18gLmFjY29yZGlvbiB1bCBsaTpudGgtb2YtdHlwZSgzKSB7XFxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAxczsgfVxcbiAgICAuSW5jb21lRXhwZW5kaXR1cmVfXyAuYWNjb3JkaW9uIHVsIGxpOmxhc3Qtb2YtdHlwZSB7XFxuICAgICAgcGFkZGluZy1ib3R0b206IDA7IH1cXG4gICAgLkluY29tZUV4cGVuZGl0dXJlX18gLmFjY29yZGlvbiB1bCBsaSBpIHtcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTZweCwgMCk7XFxuICAgICAgbWFyZ2luLXRvcDogMTdweDtcXG4gICAgICBsZWZ0OiAzZW07IH1cXG4gICAgLkluY29tZUV4cGVuZGl0dXJlX18gLmFjY29yZGlvbiB1bCBsaSBpOmJlZm9yZSwgLkluY29tZUV4cGVuZGl0dXJlX18gLmFjY29yZGlvbiB1bCBsaSBpOmFmdGVyIHtcXG4gICAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzQyNmRhOTtcXG4gICAgICB3aWR0aDogM3B4O1xcbiAgICAgIGhlaWdodDogOXB4OyB9XFxuICAgIC5JbmNvbWVFeHBlbmRpdHVyZV9fIC5hY2NvcmRpb24gdWwgbGkgaTpiZWZvcmUge1xcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0ycHgsIDApIHJvdGF0ZSg0NWRlZyk7IH1cXG4gICAgLkluY29tZUV4cGVuZGl0dXJlX18gLmFjY29yZGlvbiB1bCBsaSBpOmFmdGVyIHtcXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgycHgsIDApIHJvdGF0ZSgtNDVkZWcpOyB9XFxuICAgIC5JbmNvbWVFeHBlbmRpdHVyZV9fIC5hY2NvcmRpb24gdWwgbGkgaW5wdXRbdHlwZT1jaGVja2JveF0ge1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgaGVpZ2h0OiAxMDAlO1xcbiAgICAgIHotaW5kZXg6IDE7XFxuICAgICAgb3BhY2l0eTogMDsgfVxcbiAgICAuSW5jb21lRXhwZW5kaXR1cmVfXyAuYWNjb3JkaW9uIHVsIGxpIGlucHV0W3R5cGU9Y2hlY2tib3hdOmNoZWNrZWQgfiB0YWJsZSB7XFxuICAgICAgbWFyZ2luLXRvcDogMDtcXG4gICAgICBtYXgtaGVpZ2h0OiAwO1xcbiAgICAgIG9wYWNpdHk6IDA7XFxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgNTAlKTtcXG4gICAgICBkaXNwbGF5OiBub25lOyB9XFxuICAgIC5JbmNvbWVFeHBlbmRpdHVyZV9fIC5hY2NvcmRpb24gdWwgbGkgaW5wdXRbdHlwZT1jaGVja2JveF06Y2hlY2tlZCB+IGk6YmVmb3JlIHtcXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgycHgsIDApIHJvdGF0ZSg0NWRlZyk7IH1cXG4gICAgLkluY29tZUV4cGVuZGl0dXJlX18gLmFjY29yZGlvbiB1bCBsaSBpbnB1dFt0eXBlPWNoZWNrYm94XTpjaGVja2VkIH4gaTphZnRlciB7XFxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTJweCwgMCkgcm90YXRlKC00NWRlZyk7IH1cXG5cXG5Aa2V5ZnJhbWVzIGZsaXBkb3duIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogdG9wIGNlbnRlcjtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGVYKC05MGRlZyk7IH1cXG4gIDUlIHtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgODAlIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGVYKDhkZWcpOyB9XFxuICA4MyUge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoNmRlZyk7IH1cXG4gIDkyJSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlWCgtM2RlZyk7IH1cXG4gIDEwMCUge1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiB0b3AgY2VudGVyO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoMGRlZyk7IH0gfVxcbiAgICAuSW5jb21lRXhwZW5kaXR1cmVfXyAuYWNjb3JkaW9uIHRhYmxlLnRibCB7XFxuICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgZm9udC1zaXplOiAwLjhlbTsgfVxcbiAgICAuSW5jb21lRXhwZW5kaXR1cmVfXyAuYWNjb3JkaW9uIHRhYmxlLnRibCB0aCxcXG4gICAgLkluY29tZUV4cGVuZGl0dXJlX18gLmFjY29yZGlvbiB0YWJsZS50YmwgdGQge1xcbiAgICAgIHBhZGRpbmc6IDEwcHggMTVweDtcXG4gICAgICB0ZXh0LWFsaWduOiByaWdodDtcXG4gICAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2QxZDFkMTtcXG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2QxZDFkMTtcXG4gICAgICBjb2xvcjogIzQyNDI0MjtcXG4gICAgICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICAgICAgbGluZS1oZWlnaHQ6IDE0cHg7XFxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuICAgIC5JbmNvbWVFeHBlbmRpdHVyZV9fIC5hY2NvcmRpb24gdGFibGUudGJsIHRoZWFkIHRoLFxcbiAgICAuSW5jb21lRXhwZW5kaXR1cmVfXyAuYWNjb3JkaW9uIHRhYmxlLnRibCB0aGVhZCB0ZCB7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2VkZjZmZDtcXG4gICAgICBmb250LXdlaWdodDogNTAwO1xcbiAgICAgIGNvbG9yOiAjMzIzMjMyO1xcbiAgICAgIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gICAgICBmb250LXNpemU6IDE0cHg7XFxuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gICAgICBsZXR0ZXItc3BhY2luZzogLTAuMzVweDtcXG4gICAgICBsaW5lLWhlaWdodDogMTZweDsgfVxcbiAgICAuSW5jb21lRXhwZW5kaXR1cmVfXyAuYWNjb3JkaW9uIHRhYmxlLnRibCB0aGVhZCB0aDpmaXJzdC1jaGlsZCxcXG4gICAgLkluY29tZUV4cGVuZGl0dXJlX18gLmFjY29yZGlvbiB0YWJsZS50YmwgdGQ6Zmlyc3QtY2hpbGQge1xcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICAgICAgdGV4dC1hbGlnbjogbGVmdDsgfVxcbiAgICAuSW5jb21lRXhwZW5kaXR1cmVfXyAuYWNjb3JkaW9uIHRhYmxlLnRibCB0aGVhZCB0aDpsYXN0LWNoaWxkLFxcbiAgICAuSW5jb21lRXhwZW5kaXR1cmVfXyAuYWNjb3JkaW9uIHRhYmxlLnRibCB0ZDpsYXN0LWNoaWxkIHtcXG4gICAgICBmb250LXdlaWdodDogNTAwO1xcbiAgICAgIHRleHQtYWxpZ246IHJpZ2h0OyB9XFxuICAgIC5JbmNvbWVFeHBlbmRpdHVyZV9fIC5hY2NvcmRpb24gdGFibGUudGJsIHRyOm50aC1jaGlsZChldmVuKSB7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Y2ZjZmNjsgfVxcblxcbi5pZWFzaWRlX18ge1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbiAgd2lkdGg6IDIwJTtcXG4gIG1hcmdpbi10b3A6IDE2NXB4OyB9XFxuICAuaWVhc2lkZV9fIGgzIHtcXG4gICAgY29sb3I6ICMwMDAwMDA7XFxuICAgIGZvbnQtZmFtaWx5OiBSb2JvdG87XFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gICAgbGluZS1oZWlnaHQ6IDI0cHg7IH1cXG4gIC5pZWFzaWRlX18gdGFibGUge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgbWFyZ2luLXRvcDogMjBweDsgfVxcbiAgLmllYXNpZGVfXyB0YWJsZSB0ZCB7XFxuICAgIGNvbG9yOiAjNTU1NjU2O1xcbiAgICBmb250LWZhbWlseTogUm9ib3RvO1xcbiAgICBmb250LXNpemU6IDE2cHg7XFxuICAgIGxpbmUtaGVpZ2h0OiA0MHB4OyB9XFxuICAgIC5pZWFzaWRlX18gdGFibGUgdGQgYiB7XFxuICAgICAgY29sb3I6ICMzQTNBM0E7XFxuICAgICAgZm9udC1mYW1pbHk6IFJvYm90bztcXG4gICAgICBmb250LXNpemU6IDE2cHg7XFxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgICAgbGluZS1oZWlnaHQ6IDQwcHg7IH1cXG4gIC5pZWFzaWRlX19pbm5lciB7XFxuICAgIG1hcmdpbjogMCAyZW07IH1cXG4gIC5pZWFzaWRlX19idG4ge1xcbiAgICBwYWRkaW5nOiA4cHggMjhweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgICBib3JkZXI6IDA7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0MjZkYTk7XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgY29sb3I6ICNmZmY7IH1cXG4gIC5pZWFzaWRlX19sYXN0c2V2ZWRsZWZ0IHtcXG4gICAgY29sb3I6ICNBN0E4QTc7XFxuICAgIGZvbnQtZmFtaWx5OiBSb2JvdG87XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gICAgbGluZS1oZWlnaHQ6IDIxcHg7XFxuICAgIGZsb2F0OiBsZWZ0OyB9XFxuICAuaWVhc2lkZV9fbGFzdHNldmVkY29udCB7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgbWFyZ2luLWJvdHRvbTogMzBweDsgfVxcbiAgLmllYXNpZGVfX2xhc3RzZXZlZHJpZ2h0IHtcXG4gICAgY29sb3I6ICM5RDlFOUQ7XFxuICAgIGZvbnQtZmFtaWx5OiBSb2JvdG87XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gICAgbGluZS1oZWlnaHQ6IDIxcHg7XFxuICAgIGZsb2F0OiByaWdodDsgfVxcblxcbi5oaWdobGlnaHQtLWF2Z3JvdyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1MiwgMjM4LCAxODYsIDAuMTgpOyB9XFxuXFxuLnR4dC1hbG4tLWxlZnQge1xcbiAgdGV4dC1hbGlnbjogbGVmdCAhaW1wb3J0YW50OyB9XFxuXFxuLnR4dC1hbG4tLWNudHIge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyICFpbXBvcnRhbnQ7IH1cXG5cXG4udHh0LWFsbi0tcmlnaHQge1xcbiAgdGV4dC1hbGlnbjogcmlnaHQgIWltcG9ydGFudDsgfVxcblxcbi53ZGgtcGVyLS01IHtcXG4gIHdpZHRoOiA1JTsgfVxcblxcbi53ZGgtcGVyLS03IHtcXG4gIHdpZHRoOiA3JTsgfVxcblxcbi53ZGgtcGVyLS00OCB7XFxuICB3aWR0aDogNDglOyB9XFxuXFxuLndkaC1wZXItLTE1IHtcXG4gIHdpZHRoOiAxNSU7IH1cXG5cXG4ud2RoLXBlci0tMjAge1xcbiAgd2lkdGg6IDIwJTsgfVxcblxcbi53ZGgtcGVyLS0xMCB7XFxuICB3aWR0aDogMTAlOyB9XFxuXFxuLnRibC0tY2hlY2tib3gge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgb3BhY2l0eTogMSAhaW1wb3J0YW50O1xcbiAgaGVpZ2h0OiAyMHB4ICFpbXBvcnRhbnQ7XFxuICB3aWR0aDogMjBweCAhaW1wb3J0YW50O1xcbiAgbGVmdDogNTAlICFpbXBvcnRhbnQ7XFxuICB0b3A6IDUwJSAhaW1wb3J0YW50O1xcbiAgbWFyZ2luLXRvcDogLTEwcHg7XFxuICBib3JkZXI6IHNvbGlkIDFweCAjNDI2ZGE5ICFpbXBvcnRhbnQ7IH1cXG5cXG4uY2xlYXIge1xcbiAgY2xlYXI6IGJvdGg7IH1cXG5cXG4ucHVsbC0tcmlnaHQge1xcbiAgZmxvYXQ6IHJpZ2h0ICFpbXBvcnRhbnQ7IH1cXG5cXG4uaWNvbi0tdG90YWxpbmNvbWUge1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9pbWFnZXMvaWNvbl9pZTIucG5nXCIpKSArIFwiKSBuby1yZXBlYXQgMCAwIHRyYW5zcGFyZW50O1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICB3aWR0aDogMzVweDtcXG4gIGhlaWdodDogMzVweDtcXG4gIG1hcmdpbi1yaWdodDogMTBweDtcXG4gIGJhY2tncm91bmQtc2l6ZTogMTAwJTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHRvcDogLTVweDsgfVxcblxcbi5pY29uLS10b3RhbGV4cGVuZGl0dXJlIHtcXG4gIGJhY2tncm91bmQ6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vaW1hZ2VzL2ljb25faWUxLnBuZ1wiKSkgKyBcIikgbm8tcmVwZWF0IDAgMCB0cmFuc3BhcmVudDtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgd2lkdGg6IDM1cHg7XFxuICBoZWlnaHQ6IDM1cHg7XFxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB0b3A6IC01cHg7IH1cXG5cXG4uaWNvbi0tcHJvZmlsZSB7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2ltYWdlcy9pY29uX19pZXByb2ZpbGUucG5nXCIpKSArIFwiKSBuby1yZXBlYXQgMCAwIHRyYW5zcGFyZW50O1xcbiAgd2lkdGg6IDE1cHg7XFxuICBoZWlnaHQ6IDE1cHg7XFxuICBtYXJnaW4tcmlnaHQ6IDNweDtcXG4gIGJhY2tncm91bmQtc2l6ZTogMTAwJTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHRvcDogM3B4OyB9XFxuXFxuLmljb24tLWllaW5mbyB7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2ltYWdlcy9pY29uX19JRUluZm8ucG5nXCIpKSArIFwiKSBuby1yZXBlYXQgMCAwIHRyYW5zcGFyZW50O1xcbiAgd2lkdGg6IDE1cHg7XFxuICBoZWlnaHQ6IDE1cHg7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBwb3NpdGlvbjogcmVsYXRpdmUgIWltcG9ydGFudDtcXG4gIHRvcDogM3B4O1xcbiAgbWFyZ2luLXRvcDogMCAhaW1wb3J0YW50O1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCkgIWltcG9ydGFudDtcXG4gIGxlZnQ6IGF1dG8gIWltcG9ydGFudDsgfVxcbiAgLmljb24tLWllaW5mbzphZnRlciB7XFxuICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfVxcbiAgLmljb24tLWllaW5mbzpiZWZvcmUge1xcbiAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH1cXG5cXG4uaWNvbi0taWVjYW5jZWwge1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9pbWFnZXMvaWNvbl9faWVjbG9zZS5wbmdcIikpICsgXCIpIG5vLXJlcGVhdCAwIDAgdHJhbnNwYXJlbnQ7XFxuICB3aWR0aDogMTVweDtcXG4gIGhlaWdodDogMTVweDtcXG4gIGJhY2tncm91bmQtc2l6ZTogMTAwJTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZSAhaW1wb3J0YW50O1xcbiAgdG9wOiAzcHg7XFxuICBtYXJnaW4tdG9wOiAwICFpbXBvcnRhbnQ7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKSAhaW1wb3J0YW50O1xcbiAgbGVmdDogYXV0byAhaW1wb3J0YW50OyB9XFxuXFxuLmljb24tLWFkZGllcm93IHtcXG4gIGJhY2tncm91bmQ6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vaW1hZ2VzL2ljb25fX2llYWRkcm93LnBuZ1wiKSkgKyBcIikgbm8tcmVwZWF0IDAgMCB0cmFuc3BhcmVudDtcXG4gIHdpZHRoOiAxNXB4O1xcbiAgaGVpZ2h0OiAxNXB4O1xcbiAgYmFja2dyb3VuZC1zaXplOiAxMDAlO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlICFpbXBvcnRhbnQ7XFxuICB0b3A6IDNweDtcXG4gIG1hcmdpbi10b3A6IDAgIWltcG9ydGFudDtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApICFpbXBvcnRhbnQ7XFxuICBsZWZ0OiBhdXRvICFpbXBvcnRhbnQ7IH1cXG4gIC5pY29uLS1hZGRpZXJvdzphZnRlciB7XFxuICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfVxcbiAgLmljb24tLWFkZGllcm93OmJlZm9yZSB7XFxuICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfVxcblxcbi50YmwtLWlubmVyYm9yZGVyIHRkIHtcXG4gIGJvcmRlcjogc29saWQgMXB4ICNjY2NjY2M7IH1cXG5cXG4uYm9yLXJ0LS1ub25lIHtcXG4gIGJvcmRlci1yaWdodDogbm9uZSAhaW1wb3J0YW50OyB9XFxuXFxuLmJvci1sdC0tbm9uZSB7XFxuICBib3JkZXItbGVmdDogbm9uZSAhaW1wb3J0YW50OyB9XFxuXFxuLmFkZGllcm93bGluayB7XFxuICBjb2xvcjogIzBFNkVCNztcXG4gIGZvbnQtZmFtaWx5OiBSb2JvdG87XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgbGluZS1oZWlnaHQ6IDE2cHg7XFxuICBmbG9hdDogcmlnaHQ7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBtYXJnaW46IDIwcHggMCAwO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgei1pbmRleDogMTsgfVxcbiAgLmFkZGllcm93bGluazpob3ZlciB7XFxuICAgIG9wYWNpdHk6IDAuNzsgfVxcblxcbi5idG4tLWllY2FuY2VsIHtcXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgY29sb3I6ICM0MjZEQTk7XFxuICBmb250LWZhbWlseTogUm9ib3RvO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIGxpbmUtaGVpZ2h0OiAxNnB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgd2lkdGg6IGF1dG87XFxuICBwYWRkaW5nLWxlZnQ6IDA7XFxuICBwYWRkaW5nLXJpZ2h0OiAwOyB9XFxuICAuYnRuLS1pZWNhbmNlbDpob3ZlciB7XFxuICAgIG9wYWNpdHk6IDAuNzsgfVxcblxcbi5idG4tLWllc2F2ZSB7XFxuICB3aWR0aDogNzVweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgNjksIDE0NCwgMC4zKTtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTQsIDExMCwgMTgzLCAwLjA4KTtcXG4gIGJveC1zaGFkb3c6IDAgMXB4IDAgMCByZ2JhKDE0LCAxMTAsIDE4MywgMC4zKTtcXG4gIGNvbG9yOiAjMEU2RUI3O1xcbiAgZm9udC1mYW1pbHk6IFJvYm90bztcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBsaW5lLWhlaWdodDogMTZweDtcXG4gIG1hcmdpbjogMCAxMHB4OyB9XFxuICAuYnRuLS1pZXNhdmU6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDI2ZGE5O1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLU1lZGl1bVxcXCIgIWltcG9ydGFudDtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xcbiAgICBjb2xvcjogI2ZmZmZmZjsgfVxcblxcbi5idG4tLWllY29tcGxldGUge1xcbiAgd2lkdGg6IDEwMHB4OyB9XFxuICAuYnRuLS1pZWNvbXBsZXRlOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxNCwgMTEwLCAxODMsIDAuMDgpO1xcbiAgICBjb2xvcjogIzBFNkVCNzsgfVxcblxcbi5jbG9zZS0tYWNjdGFiIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHJpZ2h0OiAzcHg7XFxuICB0b3A6IDdweDtcXG4gIHBhZGRpbmc6IDAgIWltcG9ydGFudDtcXG4gIHdpZHRoOiBhdXRvICFpbXBvcnRhbnQ7IH1cXG5cXG4ucGFkLXJ0LS0xNSB7XFxuICBwYWRkaW5nLXJpZ2h0OiAxNXB4ICFpbXBvcnRhbnQ7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5tYXItdHAtLTAge1xcbiAgbWFyZ2luLXRvcDogMCAhaW1wb3J0YW50OyB9XFxuXFxuLm1hci1ydC0tbm9uZSB7XFxuICBtYXJnaW4tcmlnaHQ6IDAgIWltcG9ydGFudDsgfVxcblxcbi53ZGgtcGVyLS0xMCB7XFxuICB3aWR0aDogMTAlICFpbXBvcnRhbnQ7IH1cXG5cXG4ud2RoLXBlci0tMjUge1xcbiAgd2lkdGg6IDI1JSAhaW1wb3J0YW50OyB9XFxuXFxuLndkaC1wZXItLTM1IHtcXG4gIHdpZHRoOiAzNSUgIWltcG9ydGFudDsgfVxcblxcbi53ZGgtcGVyLS0xMDAge1xcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDsgfVxcblxcbi5ib3ItdHAtLW5vbmUge1xcbiAgYm9yZGVyLXRvcDogbm9uZSAhaW1wb3J0YW50OyB9XFxuXFxuLmJvci10cGJ0LS1ub25lIHtcXG4gIGJvcmRlci10b3A6IG5vbmUgIWltcG9ydGFudDtcXG4gIGJvcmRlci1ib3R0b206IG5vbmUgIWltcG9ydGFudDsgfVxcblxcbi50eHQtYWxuLS1ydCB7XFxuICB0ZXh0LWFsaWduOiByaWdodDsgfVxcblxcbmVkcy1hY2NvcmRpb24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjY2NjYztcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7IH1cXG4gIGVkcy1hY2NvcmRpb24gZWRzLWFjY29yZGlvbi1wYW5lbCB7XFxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjY2NjY2NjO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IH1cXG4gICAgZWRzLWFjY29yZGlvbiBlZHMtYWNjb3JkaW9uLXBhbmVsIHAge1xcbiAgICAgIHRyYW5zaXRpb246IHBhZGRpbmcgMTAwbXMgZWFzZSAwbXMsIG9wYWNpdHkgNzVtcyBlYXNlIDI1bXM7XFxuICAgICAgcGFkZGluZzogMCAyMHB4O1xcbiAgICAgIG1hcmdpbjogMDtcXG4gICAgICBmb250LXNpemU6IDE0cHg7XFxuICAgICAgbWF4LWhlaWdodDogMDtcXG4gICAgICBvcGFjaXR5OiAwOyB9XFxuICAgIGVkcy1hY2NvcmRpb24gZWRzLWFjY29yZGlvbi1wYW5lbCAuZWRzLWFjY29yZGlvbi1jYXJldCB7XFxuICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDE1MG1zIGVhc2UgMG1zOyB9XFxuICAgIGVkcy1hY2NvcmRpb24gZWRzLWFjY29yZGlvbi1wYW5lbCAuZWRzLWFjY29yZGlvbi1sYWJlbCB7XFxuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgICBib3JkZXI6IDA7XFxuICAgICAgaGVpZ2h0OiA0MHB4O1xcbiAgICAgIHBhZGRpbmc6IDEwcHggMjBweDtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjZmNmY2O1xcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgIGZvbnQtZmFtaWx5OiBSb2JvdG87XFxuICAgICAgY3Vyc29yOiBwb2ludGVyOyB9XFxuICAgICAgZWRzLWFjY29yZGlvbiBlZHMtYWNjb3JkaW9uLXBhbmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsOmZvY3VzIHtcXG4gICAgICAgIG91dGxpbmU6IG5vbmU7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRURGNEZBOyB9XFxuICAgICAgZWRzLWFjY29yZGlvbiBlZHMtYWNjb3JkaW9uLXBhbmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsOmFjdGl2ZSB7XFxuICAgICAgICBvdXRsaW5lOiBub25lOyB9XFxuICAgICAgZWRzLWFjY29yZGlvbiBlZHMtYWNjb3JkaW9uLXBhbmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsLXRleHQ6bnRoLWNoaWxkKDEpIHtcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrOyB9XFxuICAgICAgZWRzLWFjY29yZGlvbiBlZHMtYWNjb3JkaW9uLXBhbmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsLXRleHQ6bnRoLWNoaWxkKDIpIHtcXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7IH1cXG4gICAgICBlZHMtYWNjb3JkaW9uIGVkcy1hY2NvcmRpb24tcGFuZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwgLmVkcy1hY2NvcmRpb24tY2FyZXQge1xcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgcmlnaHQ6IDIwcHg7XFxuICAgICAgICB0b3A6IDE2cHg7XFxuICAgICAgICB3aWR0aDogMTJweDtcXG4gICAgICAgIGhlaWdodDogOHB4O1xcbiAgICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQRDk0Yld3Z2RtVnljMmx2YmowaU1TNHdJaUJsYm1OdlpHbHVaejBpVlZSR0xUZ2lQejRLUEhOMlp5QjNhV1IwYUQwaU1USndlQ0lnYUdWcFoyaDBQU0kzY0hnaUlIWnBaWGRDYjNnOUlqQWdNQ0F4TWlBM0lpQjJaWEp6YVc5dVBTSXhMakVpSUhodGJHNXpQU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh5TURBd0wzTjJaeUlnZUcxc2JuTTZlR3hwYm1zOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6RTVPVGt2ZUd4cGJtc2lQZ29nSUNBZ1BDRXRMU0JIWlc1bGNtRjBiM0k2SUZOclpYUmphQ0EwT0M0eUlDZzBOek15TnlrZ0xTQm9kSFJ3T2k4dmQzZDNMbUp2YUdWdGFXRnVZMjlrYVc1bkxtTnZiUzl6YTJWMFkyZ2dMUzArQ2lBZ0lDQThkR2wwYkdVK1IzSnZkWEFnTWp3dmRHbDBiR1UrQ2lBZ0lDQThaR1Z6WXo1RGNtVmhkR1ZrSUhkcGRHZ2dVMnRsZEdOb0xqd3ZaR1Z6WXo0S0lDQWdJRHhrWldaelBqd3ZaR1ZtY3o0S0lDQWdJRHhuSUdsa1BTSlFZV2RsTFRJeklpQnpkSEp2YTJVOUltNXZibVVpSUhOMGNtOXJaUzEzYVdSMGFEMGlNU0lnWm1sc2JEMGlibTl1WlNJZ1ptbHNiQzF5ZFd4bFBTSmxkbVZ1YjJSa0lqNEtJQ0FnSUNBZ0lDQThaeUJwWkQwaVIzSnZkWEF0TWlJZ2RISmhibk5tYjNKdFBTSjBjbUZ1YzJ4aGRHVW9OaTR3TURBd01EQXNJREV1TURBd01EQXdLU0J5YjNSaGRHVW9MVFExTGpBd01EQXdNQ2tnZEhKaGJuTnNZWFJsS0MwMkxqQXdNREF3TUN3Z0xURXVNREF3TURBd0tTQjBjbUZ1YzJ4aGRHVW9NaTR3TURBd01EQXNJQzB6TGpBd01EQXdNQ2tpSUdacGJHdzlJaU13UlRaRlFqY2lQZ29nSUNBZ0lDQWdJQ0FnSUNBOGNtVmpkQ0JwWkQwaVVtVmpkR0Z1WjJ4bExUSWlJSGc5SWpBaUlIazlJakFpSUhkcFpIUm9QU0l5SWlCb1pXbG5hSFE5SWpnaUlISjRQU0l4SWo0OEwzSmxZM1ErQ2lBZ0lDQWdJQ0FnSUNBZ0lEeHlaV04wSUdsa1BTSlNaV04wWVc1bmJHVXRNaTFEYjNCNUlpQjBjbUZ1YzJadmNtMDlJblJ5WVc1emJHRjBaU2cwTGpBd01EQXdNQ3dnTnk0d01EQXdNREFwSUhKdmRHRjBaU2c1TUM0d01EQXdNREFwSUhSeVlXNXpiR0YwWlNndE5DNHdNREF3TURBc0lDMDNMakF3TURBd01Da2dJaUI0UFNJeklpQjVQU0l6SWlCM2FXUjBhRDBpTWlJZ2FHVnBaMmgwUFNJNElpQnllRDBpTVNJK1BDOXlaV04wUGdvZ0lDQWdJQ0FnSUR3dlp6NEtJQ0FnSUR3dlp6NEtQQzl6ZG1jK1xcXCIpOyB9XFxuICAgICAgZWRzLWFjY29yZGlvbiBlZHMtYWNjb3JkaW9uLXBhbmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsIC5lZGl0LXRhYiB7XFxuICAgICAgICBkaXNwbGF5OiBub25lOyB9XFxuICAgICAgICBlZHMtYWNjb3JkaW9uIGVkcy1hY2NvcmRpb24tcGFuZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwgLmVkaXQtdGFiIHN2ZyB7XFxuICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiBzdWI7XFxuICAgICAgICAgIGZpbGw6ICMwZTZlYjc7IH1cXG4gICAgICBlZHMtYWNjb3JkaW9uIGVkcy1hY2NvcmRpb24tcGFuZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwuYWN0aXZlIC5lZGl0LXRhYiB7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIGZsb2F0OiByaWdodDtcXG4gICAgICAgIGNvbG9yOiAjMGU2ZWI3OyB9XFxuICAgIGVkcy1hY2NvcmRpb24gZWRzLWFjY29yZGlvbi1wYW5lbDpmaXJzdC1jaGlsZCB7XFxuICAgICAgYm9yZGVyOiAwOyB9XFxuICAgIGVkcy1hY2NvcmRpb24gZWRzLWFjY29yZGlvbi1wYW5lbCAudGFibGUge1xcbiAgICAgIGJhY2tncm91bmQ6ICNmZmZmZmY7IH1cXG4gIGVkcy1hY2NvcmRpb24gZWRzLWFjY29yZGlvbi1wYW5lbFthY3RpdmU9XFxcInRydWVcXFwiXSB7XFxuICAgIG1pbi1oZWlnaHQ6IDIwMHB4OyB9XFxuICAgIGVkcy1hY2NvcmRpb24gZWRzLWFjY29yZGlvbi1wYW5lbFthY3RpdmU9XFxcInRydWVcXFwiXSBwIHtcXG4gICAgICB0cmFuc2l0aW9uOiBwYWRkaW5nIDE1MG1zIGVhc2UgMG1zO1xcbiAgICAgIG1heC1oZWlnaHQ6IG5vbmU7XFxuICAgICAgcGFkZGluZzogMjRweCAyMHB4O1xcbiAgICAgIG9wYWNpdHk6IDE7IH1cXG4gICAgZWRzLWFjY29yZGlvbiBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZT1cXFwidHJ1ZVxcXCJdIC5lZHMtYWNjb3JkaW9uLWxhYmVsIHtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NjY2NjYztcXG4gICAgICBtYXJnaW46IDAgMjBweDtcXG4gICAgICBwYWRkaW5nOiAxMHB4IDA7XFxuICAgICAgd2lkdGg6IGF1dG87IH1cXG4gICAgICBlZHMtYWNjb3JkaW9uIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlPVxcXCJ0cnVlXFxcIl0gLmVkcy1hY2NvcmRpb24tbGFiZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwtdGV4dDpudGgtY2hpbGQoMSkge1xcbiAgICAgICAgZGlzcGxheTogbm9uZTsgfVxcbiAgICAgIGVkcy1hY2NvcmRpb24gZWRzLWFjY29yZGlvbi1wYW5lbFthY3RpdmU9XFxcInRydWVcXFwiXSAuZWRzLWFjY29yZGlvbi1sYWJlbCAuZWRzLWFjY29yZGlvbi1sYWJlbC10ZXh0Om50aC1jaGlsZCgyKSB7XFxuICAgICAgICBkaXNwbGF5OiBibG9jazsgfVxcbiAgICAgIGVkcy1hY2NvcmRpb24gZWRzLWFjY29yZGlvbi1wYW5lbFthY3RpdmU9XFxcInRydWVcXFwiXSAuZWRzLWFjY29yZGlvbi1sYWJlbCAuZWRzLWFjY29yZGlvbi1zdWJsYWJlbCB7XFxuICAgICAgICBkaXNwbGF5OiBibG9jazsgfVxcbiAgICAgIGVkcy1hY2NvcmRpb24gZWRzLWFjY29yZGlvbi1wYW5lbFthY3RpdmU9XFxcInRydWVcXFwiXSAuZWRzLWFjY29yZGlvbi1sYWJlbCAuZWRzLWFjY29yZGlvbi1jYXJldCB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyB9XFxuICBlZHMtYWNjb3JkaW9uIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlXSBwIHtcXG4gICAgdHJhbnNpdGlvbjogcGFkZGluZyAxNTBtcyBlYXNlIDBtcztcXG4gICAgbWF4LWhlaWdodDogbm9uZTtcXG4gICAgcGFkZGluZzogMjRweCAyMHB4O1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICBlZHMtYWNjb3JkaW9uIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlXSAuZWRzLWFjY29yZGlvbi1sYWJlbCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NjY2NjYztcXG4gICAgcGFkZGluZzogMTBweCAyMHB4IDdweCAyMHB4O1xcbiAgICB3aWR0aDogYXV0bzsgfVxcbiAgICBlZHMtYWNjb3JkaW9uIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlXSAuZWRzLWFjY29yZGlvbi1sYWJlbCAuZWRzLWFjY29yZGlvbi1sYWJlbC10ZXh0Om50aC1jaGlsZCgxKSB7XFxuICAgICAgZGlzcGxheTogbm9uZTsgfVxcbiAgICBlZHMtYWNjb3JkaW9uIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlXSAuZWRzLWFjY29yZGlvbi1sYWJlbCAuZWRzLWFjY29yZGlvbi1sYWJlbC10ZXh0Om50aC1jaGlsZCgyKSB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7IH1cXG4gICAgZWRzLWFjY29yZGlvbiBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZV0gLmVkcy1hY2NvcmRpb24tbGFiZWwgLmVkcy1hY2NvcmRpb24tc3VibGFiZWwge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrOyB9XFxuICAgIGVkcy1hY2NvcmRpb24gZWRzLWFjY29yZGlvbi1wYW5lbFthY3RpdmVdIC5lZHMtYWNjb3JkaW9uLWxhYmVsIC5lZHMtYWNjb3JkaW9uLWNhcmV0IHtcXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyB9XFxuICBlZHMtYWNjb3JkaW9uLmRhdGEge1xcbiAgICBkaXNwbGF5OiBub25lOyB9XFxuXFxuZWRzLWFjY29yZGlvblt3aWRlXSB7XFxuICBib3JkZXItcmFkaXVzOiAwOyB9XFxuICBlZHMtYWNjb3JkaW9uW3dpZGVdIGVkcy1hY2NvcmRpb24tcGFuZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwge1xcbiAgICBwYWRkaW5nOiAxMHB4IDUwcHg7IH1cXG4gIGVkcy1hY2NvcmRpb25bd2lkZV0gZWRzLWFjY29yZGlvbi1wYW5lbCAuZWRzLWFjY29yZGlvbi1sYWJlbC10ZXh0Om50aC1jaGlsZCgxKSB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gICAgY29sb3I6ICM2ZDIwNzc7IH1cXG4gIGVkcy1hY2NvcmRpb25bd2lkZV0gZWRzLWFjY29yZGlvbi1wYW5lbCAuZWRzLWFjY29yZGlvbi1sYWJlbC10ZXh0Om50aC1jaGlsZCgyKSB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgY29sb3I6ICMzMzMzMzM7XFxuICAgIG1hcmdpbi1sZWZ0OiAzcHg7IH1cXG4gIGVkcy1hY2NvcmRpb25bd2lkZV0gZWRzLWFjY29yZGlvbi1wYW5lbCAuZWRzLWFjY29yZGlvbi1jYXJldCB7XFxuICAgIHRvcDogMTZweDtcXG4gICAgbGVmdDogMTlweDsgfVxcbiAgZWRzLWFjY29yZGlvblt3aWRlXSBlZHMtYWNjb3JkaW9uLXBhbmVsIHAge1xcbiAgICBwYWRkaW5nOiAwIDUwcHg7IH1cXG4gIGVkcy1hY2NvcmRpb25bd2lkZV0gZWRzLWFjY29yZGlvbi1wYW5lbFthY3RpdmVdIC5lZHMtYWNjb3JkaW9uLWxhYmVsIHtcXG4gICAgYm9yZGVyOiAwO1xcbiAgICBwYWRkaW5nOiAxMXB4IDA7XFxuICAgIG1hcmdpbjogMCA1MHB4OyB9XFxuICAgIGVkcy1hY2NvcmRpb25bd2lkZV0gZWRzLWFjY29yZGlvbi1wYW5lbFthY3RpdmVdIC5lZHMtYWNjb3JkaW9uLWxhYmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsLXRleHQ6bnRoLWNoaWxkKDEpIHtcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXG4gICAgZWRzLWFjY29yZGlvblt3aWRlXSBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZV0gLmVkcy1hY2NvcmRpb24tbGFiZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwtdGV4dDpudGgtY2hpbGQoMikge1xcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsgfVxcbiAgZWRzLWFjY29yZGlvblt3aWRlXSBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZV0gcCB7XFxuICAgIHBhZGRpbmc6IDI0cHggNTBweCA0OHB4IDUwcHg7IH1cXG4gIGVkcy1hY2NvcmRpb25bd2lkZV0gZWRzLWFjY29yZGlvbi1wYW5lbFthY3RpdmU9XFxcInRydWVcXFwiXSAuZWRzLWFjY29yZGlvbi1sYWJlbCB7XFxuICAgIGJvcmRlcjogMDtcXG4gICAgcGFkZGluZzogMTFweCAwO1xcbiAgICBtYXJnaW46IDAgNTBweDsgfVxcbiAgICBlZHMtYWNjb3JkaW9uW3dpZGVdIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlPVxcXCJ0cnVlXFxcIl0gLmVkcy1hY2NvcmRpb24tbGFiZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwtdGV4dDpudGgtY2hpbGQoMSkge1xcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsgfVxcbiAgICBlZHMtYWNjb3JkaW9uW3dpZGVdIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlPVxcXCJ0cnVlXFxcIl0gLmVkcy1hY2NvcmRpb24tbGFiZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwtdGV4dDpudGgtY2hpbGQoMikge1xcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsgfVxcbiAgZWRzLWFjY29yZGlvblt3aWRlXSBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZT1cXFwidHJ1ZVxcXCJdIHAge1xcbiAgICBwYWRkaW5nOiAyNHB4IDUwcHggNDhweCA1MHB4OyB9XFxuXFxuZWRzLWFjY29yZGlvblt3aWRlPVxcXCJ0cnVlXFxcIl0ge1xcbiAgYm9yZGVyLXJhZGl1czogMDsgfVxcbiAgZWRzLWFjY29yZGlvblt3aWRlPVxcXCJ0cnVlXFxcIl0gZWRzLWFjY29yZGlvbi1wYW5lbCAuZWRzLWFjY29yZGlvbi1sYWJlbCB7XFxuICAgIHBhZGRpbmc6IDEwcHggNTBweDsgfVxcbiAgZWRzLWFjY29yZGlvblt3aWRlPVxcXCJ0cnVlXFxcIl0gZWRzLWFjY29yZGlvbi1wYW5lbCAuZWRzLWFjY29yZGlvbi1sYWJlbC10ZXh0Om50aC1jaGlsZCgxKSB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gICAgY29sb3I6ICM2ZDIwNzc7IH1cXG4gIGVkcy1hY2NvcmRpb25bd2lkZT1cXFwidHJ1ZVxcXCJdIGVkcy1hY2NvcmRpb24tcGFuZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwtdGV4dDpudGgtY2hpbGQoMikge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIGNvbG9yOiAjMzMzMzMzO1xcbiAgICBtYXJnaW4tbGVmdDogM3B4OyB9XFxuICBlZHMtYWNjb3JkaW9uW3dpZGU9XFxcInRydWVcXFwiXSBlZHMtYWNjb3JkaW9uLXBhbmVsIC5lZHMtYWNjb3JkaW9uLWNhcmV0IHtcXG4gICAgdG9wOiAxNnB4O1xcbiAgICBsZWZ0OiAxOXB4OyB9XFxuICBlZHMtYWNjb3JkaW9uW3dpZGU9XFxcInRydWVcXFwiXSBlZHMtYWNjb3JkaW9uLXBhbmVsIHAge1xcbiAgICBwYWRkaW5nOiAwIDUwcHg7IH1cXG4gIGVkcy1hY2NvcmRpb25bd2lkZT1cXFwidHJ1ZVxcXCJdIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlXSAuZWRzLWFjY29yZGlvbi1sYWJlbCB7XFxuICAgIGJvcmRlcjogMDtcXG4gICAgcGFkZGluZzogMTFweCAwO1xcbiAgICBtYXJnaW46IDAgNTBweDsgfVxcbiAgICBlZHMtYWNjb3JkaW9uW3dpZGU9XFxcInRydWVcXFwiXSBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZV0gLmVkcy1hY2NvcmRpb24tbGFiZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwtdGV4dDpudGgtY2hpbGQoMSkge1xcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsgfVxcbiAgICBlZHMtYWNjb3JkaW9uW3dpZGU9XFxcInRydWVcXFwiXSBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZV0gLmVkcy1hY2NvcmRpb24tbGFiZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwtdGV4dDpudGgtY2hpbGQoMikge1xcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsgfVxcbiAgZWRzLWFjY29yZGlvblt3aWRlPVxcXCJ0cnVlXFxcIl0gZWRzLWFjY29yZGlvbi1wYW5lbFthY3RpdmVdIHAge1xcbiAgICBwYWRkaW5nOiAyNHB4IDUwcHggNDhweCA1MHB4OyB9XFxuICBlZHMtYWNjb3JkaW9uW3dpZGU9XFxcInRydWVcXFwiXSBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZT1cXFwidHJ1ZVxcXCJdIC5lZHMtYWNjb3JkaW9uLWxhYmVsIHtcXG4gICAgYm9yZGVyOiAwO1xcbiAgICBwYWRkaW5nOiAxMXB4IDA7XFxuICAgIG1hcmdpbjogMCA1MHB4OyB9XFxuICAgIGVkcy1hY2NvcmRpb25bd2lkZT1cXFwidHJ1ZVxcXCJdIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlPVxcXCJ0cnVlXFxcIl0gLmVkcy1hY2NvcmRpb24tbGFiZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwtdGV4dDpudGgtY2hpbGQoMSkge1xcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsgfVxcbiAgICBlZHMtYWNjb3JkaW9uW3dpZGU9XFxcInRydWVcXFwiXSBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZT1cXFwidHJ1ZVxcXCJdIC5lZHMtYWNjb3JkaW9uLWxhYmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsLXRleHQ6bnRoLWNoaWxkKDIpIHtcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXG4gIGVkcy1hY2NvcmRpb25bd2lkZT1cXFwidHJ1ZVxcXCJdIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlPVxcXCJ0cnVlXFxcIl0gcCB7XFxuICAgIHBhZGRpbmc6IDI0cHggNTBweCA0OHB4IDUwcHg7IH1cXG5cXG4uZWRzLWdyZXllZCB7XFxuICBjb2xvcjogI2NjY2NjYzsgfVxcblxcbi5hY2N0LWNvbnRhaW5lciAuZWRzLWFjY29yZGlvbi1sYWJlbCBpIHtcXG4gIHZlcnRpY2FsLWFsaWduOiBzdWI7IH1cXG5cXG4uYWNjdC1jb250YWluZXIgLmVkcy1hY2NvcmRpb24tbGFiZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwtdGV4dCB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogdGV4dC1ib3R0b207IH1cXG5cXG4uYWNjdC1jb250YWluZXIgLmNvbnRhaW5lck1pZGRsZSA+IGVkcy1jYXJkIHtcXG4gIHBhZGRpbmc6IDIwcHggMzhweDsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLm1hci10cC0tMCB7XFxuICBtYXJnaW4tdG9wOiAwICFpbXBvcnRhbnQ7IH1cXG5cXG4ubWFyLXJ0LS1ub25lIHtcXG4gIG1hcmdpbi1yaWdodDogMCAhaW1wb3J0YW50OyB9XFxuXFxuLndkaC1wZXItLTEwIHtcXG4gIHdpZHRoOiAxMCUgIWltcG9ydGFudDsgfVxcblxcbi53ZGgtcGVyLS0yNSB7XFxuICB3aWR0aDogMjUlICFpbXBvcnRhbnQ7IH1cXG5cXG4ud2RoLXBlci0tMzUge1xcbiAgd2lkdGg6IDM1JSAhaW1wb3J0YW50OyB9XFxuXFxuLndkaC1wZXItLTEwMCB7XFxuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50OyB9XFxuXFxuLmJvci10cC0tbm9uZSB7XFxuICBib3JkZXItdG9wOiBub25lICFpbXBvcnRhbnQ7IH1cXG5cXG4uYm9yLXRwYnQtLW5vbmUge1xcbiAgYm9yZGVyLXRvcDogbm9uZSAhaW1wb3J0YW50O1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZSAhaW1wb3J0YW50OyB9XFxuXFxuLnR4dC1hbG4tLXJ0IHtcXG4gIHRleHQtYWxpZ246IHJpZ2h0OyB9XFxuXFxuZWRzLXRhYnMge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwYWRkaW5nLWxlZnQ6IDM2cHg7IH1cXG4gIGVkcy10YWJzIC50YWItbGFiZWxzIHtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2NjY2M7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDUwcHg7XFxuICAgIG92ZXJmbG93LXg6IGF1dG87XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDsgfVxcbiAgICBlZHMtdGFicyAudGFiLWxhYmVscyBsaSB7XFxuICAgICAgbWFyZ2luOiAwO1xcbiAgICAgIHBhZGRpbmc6IDA7XFxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrOyB9XFxuICAgICAgZWRzLXRhYnMgLnRhYi1sYWJlbHMgbGkgYSB7XFxuICAgICAgICBwYWRkaW5nOiAwIDIwcHg7XFxuICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIGNvbG9yOiAjNDI2ZGE5O1xcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB9XFxuICAgICAgICBlZHMtdGFicyAudGFiLWxhYmVscyBsaSBhOmhvdmVyIHtcXG4gICAgICAgICAgYm9yZGVyLWJvdHRvbTogNHB4IHNvbGlkICNkOGQ4ZDg7XFxuICAgICAgICAgIGNvbG9yOiAjMTYzYzZmOyB9XFxuICAgICAgZWRzLXRhYnMgLnRhYi1sYWJlbHMgbGkgYVthcmlhLXNlbGVjdGVkPVxcXCJ0cnVlXFxcIl0ge1xcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogNHB4IHNvbGlkICNlNjM4ODg7XFxuICAgICAgICBjb2xvcjogIzE2M2M2ZjsgfVxcbiAgICBlZHMtdGFicyAudGFiLWxhYmVsczpmaXJzdC1jaGlsZCB7XFxuICAgICAgaGVpZ2h0OiBhdXRvOyB9XFxuICAgICAgZWRzLXRhYnMgLnRhYi1sYWJlbHM6Zmlyc3QtY2hpbGQgbGkge1xcbiAgICAgICAgaGVpZ2h0OiBhdXRvOyB9XFxuICAgICAgICBlZHMtdGFicyAudGFiLWxhYmVsczpmaXJzdC1jaGlsZCBsaSBhIHtcXG4gICAgICAgICAgcGFkZGluZzogMTFweCAxOHB4OyB9XFxuICBlZHMtdGFicyBlZHMtdGFiIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAuMTVzIGxpbmVhcjsgfVxcbiAgICBlZHMtdGFicyBlZHMtdGFiOmFmdGVyIHtcXG4gICAgICBjb250ZW50OiBcXFwiIFxcXCI7XFxuICAgICAgZGlzcGxheTogdGFibGU7IH1cXG4gICAgZWRzLXRhYnMgZWRzLXRhYjpiZWZvcmUge1xcbiAgICAgIGNvbnRlbnQ6IFxcXCIgXFxcIjtcXG4gICAgICBkaXNwbGF5OiB0YWJsZTsgfVxcbiAgZWRzLXRhYnMgZWRzLXRhYlthY3RpdmVdIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIGVkcy10YWJzIC5jb250YWluZXJTaWRlIGVkcy10YWJzIHtcXG4gICAgcGFkZGluZzogMDsgfVxcblxcbmVkcy10YWJzW3ZlcnRpY2FsXSB7XFxuICBkaXNwbGF5OiBmbGV4OyB9XFxuICBlZHMtdGFic1t2ZXJ0aWNhbF0gLnRhYi1sYWJlbHMge1xcbiAgICBoZWlnaHQ6IGZpdC1jb250ZW50O1xcbiAgICBmbGV4OiAwIDAgMTgwcHg7XFxuICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNkOGQ4ZDg7XFxuICAgIGJvcmRlci1ib3R0b206IG5vbmU7IH1cXG4gICAgZWRzLXRhYnNbdmVydGljYWxdIC50YWItbGFiZWxzIGxpIHtcXG4gICAgICBoZWlnaHQ6IDUwcHg7XFxuICAgICAgbGluZS1oZWlnaHQ6IDUwcHg7XFxuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZDhkOGQ4OyB9XFxuICAgICAgZWRzLXRhYnNbdmVydGljYWxdIC50YWItbGFiZWxzIGxpOmxhc3QtY2hpbGQge1xcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkOGQ4ZDg7IH1cXG4gICAgICBlZHMtdGFic1t2ZXJ0aWNhbF0gLnRhYi1sYWJlbHMgbGkgYTpob3ZlciB7XFxuICAgICAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkICNkOGQ4ZDg7XFxuICAgICAgICBib3JkZXItYm90dG9tOiBub25lO1xcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAxNnB4OyB9XFxuICAgICAgZWRzLXRhYnNbdmVydGljYWxdIC50YWItbGFiZWxzIGxpIGFbYXJpYS1zZWxlY3RlZD1cXFwidHJ1ZVxcXCJdIHtcXG4gICAgICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgI2U2Mzg4ODtcXG4gICAgICAgIGJvcmRlci1ib3R0b206IG5vbmU7XFxuICAgICAgICBwYWRkaW5nLWxlZnQ6IDE2cHg7IH1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDQ4MHB4KSB7XFxuICBlZHMtdGFicyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7IH1cXG4gICAgZWRzLXRhYnMgLnRhYi1sYWJlbHMge1xcbiAgICAgIGhlaWdodDogZml0LWNvbnRlbnQ7XFxuICAgICAgZmxleDogMCAwIDE4MHB4O1xcbiAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNkOGQ4ZDg7XFxuICAgICAgYm9yZGVyLWJvdHRvbTogbm9uZTsgfVxcbiAgICAgIGVkcy10YWJzIC50YWItbGFiZWxzIGxpIHtcXG4gICAgICAgIGhlaWdodDogNTBweDtcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiA1MHB4O1xcbiAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZDhkOGQ4OyB9XFxuICAgICAgICBlZHMtdGFicyAudGFiLWxhYmVscyBsaTpsYXN0LWNoaWxkIHtcXG4gICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkOGQ4ZDg7IH1cXG4gICAgICAgIGVkcy10YWJzIC50YWItbGFiZWxzIGxpIGE6aG92ZXIge1xcbiAgICAgICAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkICNkOGQ4ZDg7XFxuICAgICAgICAgIGJvcmRlci1ib3R0b206IG5vbmU7XFxuICAgICAgICAgIHBhZGRpbmctbGVmdDogMTZweDsgfVxcbiAgICAgICAgZWRzLXRhYnMgLnRhYi1sYWJlbHMgbGkgYVthcmlhLXNlbGVjdGVkPVxcXCJ0cnVlXFxcIl0ge1xcbiAgICAgICAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkICNlNjM4ODg7XFxuICAgICAgICAgIGJvcmRlci1ib3R0b206IG5vbmU7XFxuICAgICAgICAgIHBhZGRpbmctbGVmdDogMTZweDsgfSB9XFxuXFxuLmFjY291bnRfX21vcmUge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgcmlnaHQ6IDA7XFxuICBwYWRkaW5nOiAxMHB4IDE1cHg7XFxuICB0b3A6IDJweDsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLm1hci10cC0tMCB7XFxuICBtYXJnaW4tdG9wOiAwICFpbXBvcnRhbnQ7IH1cXG5cXG4ubWFyLXJ0LS1ub25lIHtcXG4gIG1hcmdpbi1yaWdodDogMCAhaW1wb3J0YW50OyB9XFxuXFxuLndkaC1wZXItLTEwIHtcXG4gIHdpZHRoOiAxMCUgIWltcG9ydGFudDsgfVxcblxcbi53ZGgtcGVyLS0yNSB7XFxuICB3aWR0aDogMjUlICFpbXBvcnRhbnQ7IH1cXG5cXG4ud2RoLXBlci0tMzUge1xcbiAgd2lkdGg6IDM1JSAhaW1wb3J0YW50OyB9XFxuXFxuLndkaC1wZXItLTEwMCB7XFxuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50OyB9XFxuXFxuLmJvci10cC0tbm9uZSB7XFxuICBib3JkZXItdG9wOiBub25lICFpbXBvcnRhbnQ7IH1cXG5cXG4uYm9yLXRwYnQtLW5vbmUge1xcbiAgYm9yZGVyLXRvcDogbm9uZSAhaW1wb3J0YW50O1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZSAhaW1wb3J0YW50OyB9XFxuXFxuLnR4dC1hbG4tLXJ0IHtcXG4gIHRleHQtYWxpZ246IHJpZ2h0OyB9XFxuXFxuLnNlYXJjaCB7XFxuICBmbG9hdDogbGVmdDtcXG4gIHdpZHRoOiAxMDAlOyB9XFxuICAuc2VhcmNoX19pbm5lcmNvbnQge1xcbiAgICB3aWR0aDogNzclO1xcbiAgICBtYXJnaW46IDUwcHggYXV0byAwIGF1dG87IH1cXG4gIC5zZWFyY2hfX2hlYWRpbmcge1xcbiAgICBmb250LXNpemU6IDE1cHggIWltcG9ydGFudDtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8tUmVndWxhclxcXCIgIWltcG9ydGFudCAhaW1wb3J0YW50O1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsICFpbXBvcnRhbnQ7XFxuICAgIGNvbG9yOiAjMDAwMDAwO1xcbiAgICBsaW5lLWhlaWdodDogMS4zMztcXG4gICAgZmxvYXQ6IGxlZnQ7IH1cXG4gIC5zZWFyY2hfX2NhbGxzdGF0cyB7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgICB3aWR0aDogMTMwcHg7XFxuICAgIG1hcmdpbjogNjBweCA0NnB4IDQ4cHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBtaW4taGVpZ2h0OiAxMzVweDsgfVxcbiAgLnNlYXJjaF9fc3RhdGNvdW50IHtcXG4gICAgZm9udC1zaXplOiA2NHB4ICFpbXBvcnRhbnQ7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLU1lZGl1bVxcXCIgIWltcG9ydGFudDtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xcbiAgICBjb2xvcjogIzRlNGU0ZTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG4gIC5zZWFyY2hfX3N0YXRkZXNjIHtcXG4gICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICBmb250LWZhbWlseTogXFxcIlJvYm90b1xcXCIgIWltcG9ydGFudDtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xcbiAgICBjb2xvcjogIzdhN2E3YTtcXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gICAgbWFyZ2luLXRvcDogMzJweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgbGluZS1oZWlnaHQ6IDE3cHg7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkICFpbXBvcnRhbnQ7IH1cXG4gIC5zZWFyY2hfX3Zpc3VhbGx5aGlkZGVuIHtcXG4gICAgYm9yZGVyOiAwO1xcbiAgICBjbGlwOiByZWN0KDAgMCAwIDApO1xcbiAgICBoZWlnaHQ6IDFweDtcXG4gICAgbWFyZ2luOiAtMXB4O1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAxcHg7IH1cXG4gIC5zZWFyY2hfX3BlcmNlbnRhZ2Uge1xcbiAgICBmb250LXNpemU6IDE4cHg7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLUJvbGRcXFwiICFpbXBvcnRhbnQ7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcXG4gICAgY29sb3I6ICMzMzMzMzM7XFxuICAgIGxpbmUtaGVpZ2h0OiAwLjgzO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGJvdHRvbTogLTE1cHg7IH1cXG4gIC5zZWFyY2gtLWNvbGxlY3RlZCB7XFxuICAgIG1hcmdpbjogNjBweCAxMHB4IDMwcHg7XFxuICAgIHdpZHRoOiAxNTBweDsgfVxcbiAgLnNlYXJjaF9fYnljb250IHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y2ZjZmNjtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggI2NjY2NjYztcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIHBhZGRpbmc6IDIwcHggMDtcXG4gICAgbWFyZ2luLWJvdHRvbTogNTJweDsgfVxcbiAgLnNlYXJjaF9fZm9ybSB7XFxuICAgIHdpZHRoOiA3MCU7XFxuICAgIG1hcmdpbjogMCBhdXRvOyB9XFxuICAgIC5zZWFyY2hfX2Zvcm0gLmJ0biB7XFxuICAgICAgYm9yZGVyOiBub25lO1xcbiAgICAgIHBhZGRpbmc6IDdweCAwO1xcbiAgICAgIGZvbnQtZmFtaWx5OiBSb2JvdG8gIWltcG9ydGFudDsgfVxcbiAgICAgIC5zZWFyY2hfX2Zvcm0gLmJ0bjpob3ZlciB7XFxuICAgICAgICBiYWNrZ3JvdW5kOiAjMDA0NTkwOyB9XFxuICAuc2VhcmNoX19pbnB1dCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICM4ODg4ODg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICBmb250LWZhbWlseTogXFxcIlJvYm90by1SZWd1bGFyXFxcIiAhaW1wb3J0YW50O1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsICFpbXBvcnRhbnQ7XFxuICAgIGNvbG9yOiAjYWFhYWFhO1xcbiAgICBwYWRkaW5nOiA1cHggMHB4IDVweCAxMHB4O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxuICAgIHdpZHRoOiAyMzlweDsgfVxcbiAgICAuc2VhcmNoX19pbnB1dDo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciB7XFxuICAgICAgY29sb3I6ICNhYWFhYWE7XFxuICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDsgfVxcbiAgLnNlYXJjaF9fdGFyZ2V0Y29udCB7XFxuICAgIGJhY2tncm91bmQ6ICNlYmU0ZWQ7XFxuICAgIGJvcmRlci1yYWRpdXM6IDMwcHg7XFxuICAgIHdpZHRoOiAxMjAlO1xcbiAgICBwYWRkaW5nOiAzcHggMDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIG1hcmdpbi1sZWZ0OiAtNjAlO1xcbiAgICBib3R0b206IDA7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8tUmVndWxhclxcXCIgIWltcG9ydGFudDtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xcbiAgICBjb2xvcjogIzQyNmRhOTsgfVxcbiAgLnNlYXJjaF9fdGFyZ2V0aWNvbiB7XFxuICAgIHdpZHRoOiAxNnB4O1xcbiAgICBoZWlnaHQ6IDE2cHg7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogNXB4O1xcbiAgICB0b3A6IDVweDsgfVxcbiAgLnNlYXJjaF9fc3RhdHNoZWFkIHtcXG4gICAgd2lkdGg6IDU0NXB4O1xcbiAgICBtYXJnaW46IDAgYXV0bzsgfVxcbiAgLnNlYXJjaF9fZGF5bGlzdCB7XFxuICAgIGZsb2F0OiBsZWZ0OyB9XFxuICAuc2VhcmNoX19kYXlsaXN0Y29udCB7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgICBtYXJnaW4tbGVmdDogMjBweDsgfVxcbiAgLnNlYXJjaF9fZGF5bGFiZWwge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgcGFkZGluZzogMXB4IDE1cHggMCAzMHB4O1xcbiAgICBmb250LXNpemU6IDE0cHg7IH1cXG4gICAgLnNlYXJjaF9fZGF5bGFiZWw6aG92ZXIgLnNlYXJjaF9fZGF5aW5wdXQgfiAuc2VhcmNoX19kYXljaGVja21hcmsge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XFxuICAgICAgYm9yZGVyOiBzb2xpZCAxcHggIzQyNmRhOTsgfVxcbiAgLnNlYXJjaF9fZGF5aW5wdXQge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIGN1cnNvcjogcG9pbnRlcjsgfVxcbiAgICAuc2VhcmNoX19kYXlpbnB1dDpjaGVja2VkIH4gLnNlYXJjaF9fZGF5Y2hlY2ttYXJrIHtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgICAgIGJvcmRlcjogc29saWQgMXB4ICM0MjZkYTk7IH1cXG4gICAgLnNlYXJjaF9fZGF5aW5wdXQ6Y2hlY2tlZCB+IC5zZWFyY2hfX2RheWNoZWNrbWFyazphZnRlciB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7IH1cXG4gIC5zZWFyY2hfX2RheWNoZWNrbWFyayB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICBoZWlnaHQ6IDIwcHg7XFxuICAgIHdpZHRoOiAyMHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjMzMzO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7IH1cXG4gICAgLnNlYXJjaF9fZGF5Y2hlY2ttYXJrOmFmdGVyIHtcXG4gICAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgZGlzcGxheTogbm9uZTsgfVxcbiAgICAuc2VhcmNoX19kYXljaGVja21hcms6YWZ0ZXIge1xcbiAgICAgIHRvcDogNTAlO1xcbiAgICAgIGxlZnQ6IDUwJTtcXG4gICAgICB3aWR0aDogMTBweDtcXG4gICAgICBoZWlnaHQ6IDEwcHg7XFxuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICAgIGJhY2tncm91bmQ6ICM0MjZkYTk7XFxuICAgICAgbWFyZ2luLWxlZnQ6IC01cHg7XFxuICAgICAgbWFyZ2luLXRvcDogLTVweDsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLCBoMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsIGEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSwgZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLCBzbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLCBiLCB1LCBpLCBjZW50ZXIsIGRsLCBkdCwgZGQsIG9sLCB1bCwgbGksIGZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLCB0YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCwgYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIGZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksIHRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm9yZGVyOiAwO1xcbiAgZm9udC1zaXplOiAxMDAlO1xcbiAgZm9udDogaW5oZXJpdDtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTsgfVxcblxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcbiAgZGlzcGxheTogYmxvY2s7IH1cXG5cXG5ib2R5IHtcXG4gIGxpbmUtaGVpZ2h0OiAxOyB9XFxuXFxub2wsIHVsIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7IH1cXG5cXG5ibG9ja3F1b3RlLCBxIHtcXG4gIHF1b3Rlczogbm9uZTsgfVxcblxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgY29udGVudDogbm9uZTsgfVxcblxcbnRhYmxlIHtcXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuICBib3JkZXItc3BhY2luZzogMDsgfVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZDogI2ZmZjtcXG4gIG1heC13aWR0aDogMTY4MHB4O1xcbiAgbWFyZ2luOiAwIGF1dG87IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlU291cmNlTWFwKSB7XG5cdHZhciBsaXN0ID0gW107XG5cblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmV0dXJuIFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgY29udGVudCArIFwifVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSkuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcblx0dmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuXHR2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cdGlmICghY3NzTWFwcGluZykge1xuXHRcdHJldHVybiBjb250ZW50O1xuXHR9XG5cblx0aWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuXHRcdHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0XHRyZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcblx0fVxuXG5cdHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuXHR2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuXG5cdHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVzY2FwZSh1cmwpIHtcbiAgICBpZiAodHlwZW9mIHVybCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHVybFxuICAgIH1cbiAgICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICAgICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgICB9XG4gICAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAgIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gICAgaWYgKC9bXCInKCkgXFx0XFxuXS8udGVzdCh1cmwpKSB7XG4gICAgICAgIHJldHVybiAnXCInICsgdXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgJ1xcXFxuJykgKyAnXCInXG4gICAgfVxuXG4gICAgcmV0dXJuIHVybFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvTWF0ZXJpYWxJY29ucy1SZWd1bGFyLmVvdFwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL01hdGVyaWFsSWNvbnMtUmVndWxhci50dGZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9NYXRlcmlhbEljb25zLVJlZ3VsYXIud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL01hdGVyaWFsSWNvbnMtUmVndWxhci53b2ZmMlwiOyIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9tYXRlcmlhbC1pY29ucy5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbWF0ZXJpYWwtaWNvbnMuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbWF0ZXJpYWwtaWNvbnMuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3JvYm90by1mb250ZmFjZS5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vcm9ib3RvLWZvbnRmYWNlLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3JvYm90by1mb250ZmFjZS5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9Sb2JvdG8tQmxhY2sud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1CbGFjay53b2ZmMlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1CbGFja0l0YWxpYy53b2ZmXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvUm9ib3RvLUJsYWNrSXRhbGljLndvZmYyXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvUm9ib3RvLUJvbGQud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1Cb2xkLndvZmYyXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvUm9ib3RvLUJvbGRJdGFsaWMud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1Cb2xkSXRhbGljLndvZmYyXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvUm9ib3RvLUxpZ2h0LndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9Sb2JvdG8tTGlnaHQud29mZjJcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9Sb2JvdG8tTGlnaHRJdGFsaWMud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1MaWdodEl0YWxpYy53b2ZmMlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1NZWRpdW0ud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1NZWRpdW0ud29mZjJcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9Sb2JvdG8tTWVkaXVtSXRhbGljLndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9Sb2JvdG8tTWVkaXVtSXRhbGljLndvZmYyXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvUm9ib3RvLVJlZ3VsYXIud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1SZWd1bGFyLndvZmYyXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvUm9ib3RvLVJlZ3VsYXJJdGFsaWMud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1SZWd1bGFySXRhbGljLndvZmYyXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvUm9ib3RvLVRoaW4ud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1UaGluLndvZmYyXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvUm9ib3RvLVRoaW5JdGFsaWMud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1UaGluSXRhbGljLndvZmYyXCI7IiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uICh0YXJnZXQsIHBhcmVudCkge1xuICBpZiAocGFyZW50KXtcbiAgICByZXR1cm4gcGFyZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcbiAgfVxuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xufTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHRhcmdldCwgcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgcGFzc2luZyBmdW5jdGlvbiBpbiBvcHRpb25zLCB0aGVuIHVzZSBpdCBmb3IgcmVzb2x2ZSBcImhlYWRcIiBlbGVtZW50LlxuICAgICAgICAgICAgICAgIC8vIFVzZWZ1bCBmb3IgU2hhZG93IFJvb3Qgc3R5bGUgaS5lXG4gICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgIC8vICAgaW5zZXJ0SW50bzogZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb29cIikuc2hhZG93Um9vdCB9XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBnZXRUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQsIHBhcmVudCk7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG5cdFx0XHRcdFx0Ly8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuXHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1t0YXJnZXRdXG5cdH07XG59KSgpO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09IFwiYm9vbGVhblwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuICAgICAgICBpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpIHtcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlLCB0YXJnZXQpO1xuXHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIG5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJbU3R5bGUgTG9hZGVyXVxcblxcbiBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0JyAoJ29wdGlvbnMuaW5zZXJ0QXQnKSBmb3VuZC5cXG4gTXVzdCBiZSAndG9wJywgJ2JvdHRvbScsIG9yIE9iamVjdC5cXG4gKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyI2luc2VydGF0KVxcblwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXG5cdGlmKG9wdGlvbnMuYXR0cnMubm9uY2UgPT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBub25jZSA9IGdldE5vbmNlKCk7XG5cdFx0aWYgKG5vbmNlKSB7XG5cdFx0XHRvcHRpb25zLmF0dHJzLm5vbmNlID0gbm9uY2U7XG5cdFx0fVxuXHR9XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gZ2V0Tm9uY2UoKSB7XG5cdGlmICh0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRyZXR1cm4gX193ZWJwYWNrX25vbmNlX187XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG4iLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcL3xcXHMqJCkvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInNyYy9hc3NldHMvaW1hZ2VzL2FkZC5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJzcmMvYXNzZXRzL2ltYWdlcy9hbGVydC5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJzcmMvYXNzZXRzL2ltYWdlcy9kaXZlcnRfX2ljb24ucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwic3JjL2Fzc2V0cy9pbWFnZXMvZG9jdW1lbnQucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwic3JjL2Fzc2V0cy9pbWFnZXMvZHdwLWxvZ28tdHJhbnNwYXJlbnQucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwic3JjL2Fzc2V0cy9pbWFnZXMvZXhwZXJpYW5fX2xvZ29sYXRlc3QucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwic3JjL2Fzc2V0cy9pbWFnZXMvZmlsZV9faWNvbi5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJzcmMvYXNzZXRzL2ltYWdlcy9pY29uX19JRUluZm8ucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwic3JjL2Fzc2V0cy9pbWFnZXMvaWNvbl9faWVhZGRyb3cucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwic3JjL2Fzc2V0cy9pbWFnZXMvaWNvbl9faWVjbG9zZS5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJzcmMvYXNzZXRzL2ltYWdlcy9pY29uX19pZXByb2ZpbGUucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwic3JjL2Fzc2V0cy9pbWFnZXMvaWNvbl9pZTEucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwic3JjL2Fzc2V0cy9pbWFnZXMvaWNvbl9pZTIucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwic3JjL2Fzc2V0cy9pbWFnZXMvbGVmdF9hcnJvdy5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJzcmMvYXNzZXRzL2ltYWdlcy9uZXh0X19pY29uLnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInNyYy9hc3NldHMvaW1hZ2VzL3Byb2ZpbGVfX2ljb24ucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwic3JjL2Fzc2V0cy9pbWFnZXMvcmlnaHRfYXJyb3cucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwic3JjL2Fzc2V0cy9pbWFnZXMvdXBsb2FkX2RvY3VtZW50LnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInNyYy9hc3NldHMvaW1hZ2VzL3VzZXJfX2ljb24ucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwic3JjL2Fzc2V0cy9pbWFnZXMvdXNlcmZvbGRlcl9pY29uLnBuZ1wiOyIsImltcG9ydCAncm9ib3RvLWZvbnRmYWNlJztcbmltcG9ydCAnbWF0ZXJpYWwtaWNvbnMnO1xuaW1wb3J0ICcuLi9zdHlsZXMvYXBwLnNjc3MnO1xuaW1wb3J0ICcuLi9zdHlsZXMvZWRzLWdsb2JhbC1zdHlsZXMuc2Nzcyc7XG5cbmltcG9ydCAnLi4vc3R5bGVzL21haW4uc2Nzcyc7XG5pbXBvcnQgJy4uL3N0eWxlcy9oZWFkZXIuc2Nzcyc7XG5pbXBvcnQgJy4uL3N0eWxlcy9zZWFyY2guc2Nzcyc7XG5pbXBvcnQgJy4uL3N0eWxlcy9jYXNlTGlzdC5zY3NzJztcbmltcG9ydCAnLi4vc3R5bGVzL3N0eWxlLmNzcyc7XG5pbXBvcnQgJy4uL3N0eWxlcy9wY2MtZWRzLXNlY29uZGFyeS1oZWFkZXIuc2Nzcyc7XG5pbXBvcnQgJy4uL3N0eWxlcy9kZW1vLXBjYy1vdmVydmlldy5zY3NzJztcbmltcG9ydCAnLi4vc3R5bGVzL3BjYy1hY2NvcmRpYW4uc2Nzcyc7XG5pbXBvcnQgJy4uL3N0eWxlcy9lZHMtY2FyZC5zY3NzJztcbmltcG9ydCAnLi4vc3R5bGVzL2Vkcy1kcm9wZG93bi5zY3NzJztcbmltcG9ydCAnLi4vc3R5bGVzL2Vkcy1pY29uLnNjc3MnO1xuaW1wb3J0ICcuLi9zdHlsZXMvZWRzLXRpbWVsaW5lLWl0ZW0uc2Nzcyc7XG5pbXBvcnQgJy4uL3N0eWxlcy9lZHMtdGFnLnNjc3MnO1xuaW1wb3J0ICcuLi9zdHlsZXMvYWN0aXZpdGllcy5zY3NzJztcbmltcG9ydCAnLi4vc3R5bGVzL2xvZ2luLnNjc3MnO1xuaW1wb3J0ICcuLi9zY3JpcHRzL3Byb21pc2UtcGF5LmpzJzsiLCJzd2l0Y2hUYWIgPSBmdW5jdGlvbiAoZG9jdW1lbnRJZCwgc2VsZWN0ZWRUYWJDbGFzc05hbWUsIHRoaXNQYXJhbSkge1xuXHRsZXQgaWRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZG9jdW1lbnRJZCk7XG5cdGxldCBjbGFzc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHNlbGVjdGVkVGFiQ2xhc3NOYW1lKTtcblx0bGV0IGFjdGl2ZVRhYkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicHJvbWlzZXBheS0tbmF2dGFibGlua2FjdGl2ZVwiKTtcblx0YWN0aXZlVGFiRWxlbWVudFswXS5zZXRBdHRyaWJ1dGUoXCJhcmlhLXNlbGVjdGVkXCIsIGZhbHNlKTtcblx0YWN0aXZlVGFiRWxlbWVudFswXS5jbGFzc0xpc3QucmVtb3ZlKFwicHJvbWlzZXBheS0tbmF2dGFibGlua2FjdGl2ZVwiKTtcblx0dGhpc1BhcmFtLmNsYXNzTGlzdC5hZGQoXCJwcm9taXNlcGF5LS1uYXZ0YWJsaW5rYWN0aXZlXCIpO1xuXHR0aGlzUGFyYW0uc2V0QXR0cmlidXRlKFwiYXJpYS1zZWxlY3RlZFwiLCB0cnVlKTtcblx0Y2xhc3NFbGVtZW50WzBdLmNsYXNzTGlzdC5yZW1vdmUoc2VsZWN0ZWRUYWJDbGFzc05hbWUpO1xuXHRpZEVsZW1lbnQuY2xhc3NMaXN0LmFkZChzZWxlY3RlZFRhYkNsYXNzTmFtZSk7XG59XG5cbnN3aXRjaFBhcmVudFRhYiA9IGZ1bmN0aW9uICh0YWJJZCwgZm9jdXNPbk5vdGVzKSB7XG5cdGxldCB0YWJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YWItXCIrdGFiSWQpO1xuXHRsZXQgcGFuZWxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YWItcGFuZWwtXCIrdGFiSWQpO1xuXHRsZXQgcGFuZWxFbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJhY2NvdW50c1RhYlBhbmVsXCIpO1xuXHRsZXQgdGFiRWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYWNjb3VudHNUYWJcIik7XG5cdGZvciAobGV0IGkgPSAwOyBpIDw9IHRhYkVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0bGV0IGVsZW1lbnQgPSB0YWJFbGVtZW50c1tpXTtcblx0XHQvKmlmICh0YWJJZCA9PSAzICYmIGVsZW1lbnQgJiYgZWxlbWVudC5pZCA9PT0gXCJ0YWItMFwiKSB7XG5cdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZShcImFyaWEtc2VsZWN0ZWRcIiwgdHJ1ZSk7XG5cdFx0fSBlbHNlKi8gaWYgKGVsZW1lbnQpIHtcblx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1zZWxlY3RlZFwiLCBmYWxzZSk7XG5cdFx0fVxuXHR9XG5cdGZvciAobGV0IGkgPSAwOyBpIDw9IHBhbmVsRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRsZXQgZWxlbWVudCA9IHBhbmVsRWxlbWVudHNbaV07XG5cdFx0aWYgKGVsZW1lbnQpIHtcblx0XHRcdGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFwiYWN0aXZlXCIpO1xuXHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCB0cnVlKTtcblx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcblx0XHR9XG5cdH1cblx0dGFiRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhcmlhLXNlbGVjdGVkXCIsIHRydWUpO1xuXHRwYW5lbEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYWN0aXZlXCIsIHRydWUpO1xuXHRwYW5lbEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgZmFsc2UpO1xuXHRwYW5lbEVsZW1lbnQuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCIwXCIpO1xuXHQvLyBpZiAodGFiSWQgPT0gMykge1xuXHQvLyBcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvbWlzZUFjdGl2aXR5XCIpLmNsaWNrKCk7XG5cdC8vIFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9taXNlX19hY3RzZWN0aW9uXCIpLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzBdLmNsYXNzTGlzdC5hZGQoXCJwcm9taXNlcGF5LS1saW5rYWN0aXZlXCIpO1xuXHQvLyB9XG5cdC8vIGxldCBhY2NvdW50c0FjdGl2aXR5RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWNjb3VudHNBY3Rpdml0eVwiKTtcblx0Ly8gaWYgKGZvY3VzT25Ob3Rlcykge1xuXHQvLyBcdGxldCBhY2NvdW50c05vdGVzRWxlbWVudCA9IGFjY291bnRzQWN0aXZpdHlFbGVtZW50LmNoaWxkcmVuWzFdO1xuXHQvLyBcdGdldEVsZW1lbnQoXCJhY2NvdW50c0FjdGl2aXR5XCIsIGZhbHNlLCAwLCBhY2NvdW50c05vdGVzRWxlbWVudCwgdHJ1ZSk7XG5cdC8vIFx0bGV0IG5vdGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJub3Rlc19fdGV4dFwiKTtcblx0Ly8gXHRcdG5vdGVFbGVtZW50LmZvY3VzKCk7XG5cdC8vIH0gZWxzZSB7XG5cdC8vIFx0bGV0IGFjY291bnRzTm90ZXNFbGVtZW50ID0gYWNjb3VudHNBY3Rpdml0eUVsZW1lbnQuY2hpbGRyZW5bMV07XG5cdC8vIFx0Z2V0RWxlbWVudChcImFjY291bnRzQWN0aXZpdHlcIiwgdHJ1ZSwgLTEsIGFjY291bnRzTm90ZXNFbGVtZW50KTtcblx0Ly8gfVxufVxuXG5nb3RvUGFnZSA9IGZ1bmN0aW9uIChwYWdlUGF0aCkge1xuXHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IHBhZ2VQYXRoO1xufVxuXG5zZXRUYWJBcmlhID0gZnVuY3Rpb24gKGVsZW1lbnQsIHNldFByb3BlcnR5LCBzZXRUYWJpbmRleCwgcmVtb3ZlQXR0cikge1xuXHRpZiAoZWxlbWVudCAmJiAhcmVtb3ZlQXR0cikge1xuXHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgc2V0UHJvcGVydHkpO1xuXHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgc2V0VGFiaW5kZXgpO1xuXHR9IGVsc2UgaWYgKGVsZW1lbnQgJiYgcmVtb3ZlQXR0cikge1xuXHRcdGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIik7XG5cdFx0ZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKTtcblx0fVxufVxuXG5zZXRBbGxFbGVtZW50cyA9IGZ1bmN0aW9uIChlbGVtZW50cywgc2V0UHJvcGVydHksIHNldFRhYmluZGV4LCByZW1vdmVBdHRyKSB7XG5cdGZvciAobGV0IGkgPSAwOyBpIDw9IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0bGV0IGVsZW1lbnQgPSBlbGVtZW50c1tpXTtcblx0XHRzZXRUYWJBcmlhKGVsZW1lbnQsIHNldFByb3BlcnR5LCBzZXRUYWJpbmRleCwgcmVtb3ZlQXR0cik7XG5cdFx0aWYgKGVsZW1lbnQgJiYgZWxlbWVudC5jaGlsZHJlbiAmJiBlbGVtZW50LmNoaWxkcmVuLmxlbmd0aCkge1xuXHRcdFx0c2V0QWxsRWxlbWVudHMoZWxlbWVudC5jaGlsZHJlbiwgc2V0UHJvcGVydHksIHNldFRhYmluZGV4LCByZW1vdmVBdHRyKTtcblx0XHR9XG5cdH1cbn1cblxuZ2V0RWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50SWQsIHNldFByb3BlcnR5LCBzZXRUYWJpbmRleCwgZWxlbWVudCwgcmVtb3ZlQXR0cikge1xuXHRsZXQgYWN0aXZpdHlFbGVtZW50ID0gZWxlbWVudCB8fCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuXHRcdHNldFRhYkFyaWEoYWN0aXZpdHlFbGVtZW50LCBzZXRQcm9wZXJ0eSwgc2V0VGFiaW5kZXgsIHJlbW92ZUF0dHIpO1xuXHRpZiAoYWN0aXZpdHlFbGVtZW50ICYmIGFjdGl2aXR5RWxlbWVudC5jaGlsZHJlbiAmJiBhY3Rpdml0eUVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoKSB7XG5cdFx0c2V0QWxsRWxlbWVudHMoYWN0aXZpdHlFbGVtZW50LmNoaWxkcmVuLCBzZXRQcm9wZXJ0eSwgc2V0VGFiaW5kZXgsIHJlbW92ZUF0dHIpO1xuXHR9XG59XG5cbmdldEVsZW1lbnQoXCJwcm9maWxlQWN0aXZpdGllc1wiLCB0cnVlLCAtMSk7XG5nZXRFbGVtZW50KFwicHJvbWlzZV9fYWN0c2VjdGlvblwiLCB0cnVlLCAtMSk7XG5nZXRFbGVtZW50KFwicHJvbWlzZVByb2ZpbGVcIiwgdHJ1ZSwgLTEpO1xubGV0IGFjY291bnRzQWN0aXZpdHlFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhY2NvdW50c0FjdGl2aXR5XCIpO1xuaWYgKGFjY291bnRzQWN0aXZpdHlFbGVtZW50KXtcblx0bGV0IGFjY291bnRzTm90ZXNFbGVtZW50ID0gYWNjb3VudHNBY3Rpdml0eUVsZW1lbnQuY2hpbGRyZW5bMV07XG5cdGdldEVsZW1lbnQoXCJhY2NvdW50c0FjdGl2aXR5XCIsIHRydWUsIC0xLCBhY2NvdW50c05vdGVzRWxlbWVudCk7XG59XG5sZXQgcHJvZmlsZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2ZpbGVDb250YWN0XCIpO1xuaWYgKHByb2ZpbGVFbGVtZW50KSB7XG5cdGxldCBwcm9maWxlVGhpcmRFbGVtZW50ID0gcHJvZmlsZUVsZW1lbnQuY2hpbGRyZW5bMl07XG5cdGdldEVsZW1lbnQoXCJwcm9maWxlQ29udGFjdFwiLCB0cnVlLCAtMSwgcHJvZmlsZVRoaXJkRWxlbWVudCk7XG59XG5cbnRvZ2dsZU1lbW8gPSBmdW5jdGlvbiAoKSB7XG5cdGxldCBtZW1vRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJtZW1vZGV0YWlsXCIpO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8PSBtZW1vRWxlbWVudC5sZW5ndGg7IGkrKyl7XG5cdFx0bGV0IGVsZW1lbnQgPSBtZW1vRWxlbWVudFtpXTtcblx0XHRsZXQgYWN0aXZlVmFsdWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImFjdGl2ZVwiKSA9PSBcInRydWVcIiA/IGZhbHNlIDogdHJ1ZTtcblx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZShcImFjdGl2ZVwiLCBhY3RpdmVWYWx1ZSk7XG5cdFx0ZWxlbWVudC5jaGlsZHJlblswXS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIGFjdGl2ZVZhbHVlKTtcblx0fVxufVxuXG4vLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsZnVuY3Rpb24oZSl7XG4vLyBcdGNvbnNvbGUubG9nKGUpO1xuLy8gfSwgdHJ1ZSk7XG5hZGRSZW1vdmVDbGFzcyA9IGZ1bmN0aW9uIChoZWFkaW5nSWQsIHBhbmVsSWQpIHtcblx0bGV0IGNvbGxlY3Rpb25FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaGVhZGluZ0lkKTtcblx0bGV0IGNvbGxlY3Rpb25QYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhbmVsSWQpO1xuXHRjb2xsZWN0aW9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsZnVuY3Rpb24oZSl7XG5cdFx0Y29sbGVjdGlvblBhbmVsLmNsYXNzTGlzdC5hZGQoXCJmb2N1c1wiKTtcblx0fSwgdHJ1ZSk7XG5cdGNvbGxlY3Rpb25FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLGZ1bmN0aW9uKGUpe1xuXHRcdGNvbGxlY3Rpb25QYW5lbC5jbGFzc0xpc3QucmVtb3ZlKFwiZm9jdXNcIik7XG5cdH0sIHRydWUpO1xufVxuY29uc3QgcGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbmNvbnN0IHBhZ2UgPSBwYXRoLnNwbGl0KFwiL1wiKS5wb3AoKTtcbmlmIChwYWdlICYmIHBhZ2UgIT09IFwiaW5kZXguaHRtbFwiICYmIHBhZ2UgIT09IFwiZGFzaGJvYXJkLmh0bWxcIikge1xuXHQvLyBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidGV4dE5vdGVcIilbMV0ucmVtb3ZlQXR0cmlidXRlKFwiZm9yXCIpO1xuXHQvLyBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidGV4dE5vdGVcIilbMl0ucmVtb3ZlQXR0cmlidXRlKFwiZm9yXCIpO1x0XG5cdGFkZFJlbW92ZUNsYXNzKFwiYWNjb3VudEZpcnN0SGVhZGluZ1wiLCBcImFjY291bnRGaXJzdFBhbmVsXCIpO1xuXHRhZGRSZW1vdmVDbGFzcyhcImNvbGxlY3Rpb25IZWFkaW5nXCIsIFwiY29sbGVjdGlvblBhbmVsXCIpO1xuXHRzd2l0Y2hQYXJlbnRUYWIoMik7XG59XG5zaG93aGlkZWJsb2NrcyA9IGZ1bmN0aW9uIChzaG93RWxlbWVudElkLCBoaWRlRWxlbWVudElkKSB7XG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNob3dFbGVtZW50SWQpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdGlmIChoaWRlRWxlbWVudElkKSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChoaWRlRWxlbWVudElkKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vYWN0aXZpdGllcy5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2FjdGl2aXRpZXMuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vYWN0aXZpdGllcy5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vYXBwLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vYXBwLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2FwcC5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vY2FzZUxpc3Quc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9jYXNlTGlzdC5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9jYXNlTGlzdC5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vZGVtby1wY2Mtb3ZlcnZpZXcuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9kZW1vLXBjYy1vdmVydmlldy5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9kZW1vLXBjYy1vdmVydmlldy5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vZWRzLWNhcmQuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9lZHMtY2FyZC5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9lZHMtY2FyZC5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vZWRzLWRyb3Bkb3duLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vZWRzLWRyb3Bkb3duLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2Vkcy1kcm9wZG93bi5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vZWRzLWdsb2JhbC1zdHlsZXMuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9lZHMtZ2xvYmFsLXN0eWxlcy5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9lZHMtZ2xvYmFsLXN0eWxlcy5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vZWRzLWljb24uc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9lZHMtaWNvbi5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9lZHMtaWNvbi5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vZWRzLXRhZy5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2Vkcy10YWcuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vZWRzLXRhZy5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vZWRzLXRpbWVsaW5lLWl0ZW0uc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9lZHMtdGltZWxpbmUtaXRlbS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9lZHMtdGltZWxpbmUtaXRlbS5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vaGVhZGVyLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vaGVhZGVyLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2hlYWRlci5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbG9naW4uc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9sb2dpbi5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9sb2dpbi5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbWFpbi5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL21haW4uc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbWFpbi5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vcGNjLWFjY29yZGlhbi5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3BjYy1hY2NvcmRpYW4uc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vcGNjLWFjY29yZGlhbi5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vcGNjLWVkcy1zZWNvbmRhcnktaGVhZGVyLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vcGNjLWVkcy1zZWNvbmRhcnktaGVhZGVyLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3BjYy1lZHMtc2Vjb25kYXJ5LWhlYWRlci5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc2VhcmNoLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc2VhcmNoLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3NlYXJjaC5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59Il0sInNvdXJjZVJvb3QiOiIifQ==