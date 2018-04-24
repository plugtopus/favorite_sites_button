var browserStorage = function () {
    "use strict";

    function e(e, n, t) {
        return new Promise(function (r, o) {
            var c;
            c = "clear" === e ? i[n][e][t](t || null, function (e) {
                return l.runtime.lastError ? o(l.runtime.lastError) : void r(e)
            }) : i[n][e](function (e) {
                return l.runtime.lastError ? o(l.runtime.lastError) : void r(e)
            }), "object" == typeof c && "function" == typeof c.then && r(c)
        })["catch"](function () {
            return "clear" === e ? i[n][e]() : i[n][e](t || null)
        })
    }

    function n(e) {
        return function (n) {
            return e(n).then(function (e) {
                return e[n]
            })
        }
    }

    function t(e) {
        return function (n, t) {
            var r = {};
            return r[n] = t, e(r)
        }
    }

    function r() {
        return i.sync ? new Promise(function (n) {
            i.sync.get("someStorageKey", function () {
                if (l.runtime.lastError) return void n(!1);
                var t = e("get", "local", "__sync_fallback__").then(function (n) {
                    return !n.__sync_fallback__ || e("get", "local", null).then(function (n) {
                        var t = ["__sync_fallback__"],
                            r = {};
                        return Object.keys(n).forEach(function (e) {
                            e.startsWith("__sync_storage__") && (t.push(e), r[e.replace("__sync_storage__", "")] = n[e])
                        }), Promise.all([e("set", "sync", r), e("remove", "local", t)])
                    }).then(function () {
                        return !0
                    })
                });
                n(t)
            })
        }) : Promise.resolve(!1)
    }

    function o() {
        var r = {
            getBytesInUse: e.bind(null, "getBytesInUse", "local"),
            set: e.bind(null, "set", "local"),
            remove: e.bind(null, "remove", "local")
        };
        return f ? (r.get = function (n) {
            return n ? e("get", "local", n) : e("get", "local", null).then(function (e) {
                var n = {};
                return Object.keys(e).forEach(function (t) {
                    t.startsWith("__sync_storage__") || "__sync_fallback__" === t || (n[t] = e[t])
                }), n
            })
        }, r.clear = function () {
            return e("get", "local", null).then(function (e) {
                return Object.keys(e).filter(function (e) {
                    return !e.startsWith("__sync_storage__")
                })
            }).then(e.bind(null, "remove", "local"))
        }) : (r.get = e.bind(null, "get", "local"), r.clear = e.bind(null, "clear", "local")), r.getItem = n(r.get), r.setItem = t(r.set), r
    }

    function c() {
        var o = {};
        if (!f) return o.get = e.bind(null, "get", "sync"), o.set = e.bind(null, "set", "sync"), o.remove = e.bind(null, "remove", "sync"), o.clear = e.bind(null, "clear", "sync"), o.getBytesInUse = e.bind(null, "getBytesInUse", "sync"), o.getItem = n(o.get), o.setItem = t(o.set), o;
        var c = r();
        return o.get = function (n) {
            return c.then(function (t) {
                if (t) return e("get", "sync", n);
                var r = null;
                return n && (r = "string" == typeof n ? [n] : n, r = r.map(function (e) {
                    return "__sync_storage__" + e
                })), e("get", "local", r).then(function (e) {
                    var n = {};
                    return Object.keys(e).forEach(function (t) {
                        t.startsWith("__sync_storage__") && (n[t.replace("__sync_storage__", "")] = e[t])
                    }), n
                })
            })
        }, o.set = function (n) {
            return c.then(function (t) {
                if (t) return e("set", "sync", n);
                var r = {
                    __sync_fallback__: !0
                };
                return Object.keys(n).forEach(function (e) {
                    r["__sync_storage__" + e] = n[e]
                }), e("set", "local", r)
            })
        }, o.remove = function (n) {
            return c.then(function (t) {
                if (t) return e("remove", "sync", n);
                var r = "string" == typeof n ? [n] : n;
                return r = r.map(function (e) {
                    return "__sync_storage__" + e
                }), e("remove", "local", r)
            })
        }, o.clear = function () {
            return c.then(function (n) {
                return n ? e("clear", "sync") : e("get", "local", null).then(function (e) {
                    return Object.keys(e).filter(function (e) {
                        return e.startsWith("__sync_storage__")
                    })
                }).then(e.bind(null, "remove", "local"))
            })
        }, o.getBytesInUse = function () {
            return c.then(function (n) {
                return n ? e("getBytesInUse", "sync") : 0
            })
        }, c.then(function (n) {
            n && (o.get = e.bind(null, "get", "sync"), o.set = e.bind(null, "set", "sync"), o.remove = e.bind(null, "remove", "sync"), o.clear = e.bind(null, "clear", "sync"))
        }), o.getItem = n(o.get), o.setItem = t(o.set), o
    }

    function u() {
        return Promise.reject(Error("Method not supported for this storage type"))
    }

    function s() {
        return {
            get: i.managed && i.managed.get ? e.bind(null, "get", "managed") : function () {
                return Promise.resolve({})
            },
            set: u,
            remove: u,
            clear: u,
            getBytesInUse: function () {
                return Promise.resolve(0)
            },
            getItem: n(e.bind(null, "get", "managed")),
            setItem: u
        }
    }
    var l = "undefined" != typeof chrome && chrome.runtime ? chrome : "undefined" != typeof browser && browser,
        i = l.storage,
        a = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1,
        f = a;
    if (!i) throw new Error("Please add storage to the list of permissions in manifest.json");
    return {
        managed: s(),
        local: o(),
        sync: c()
    }
}();