var cjgOgs = function () {
    "use strict";

    function t() {
        v || (v = !0, g.webRequest.onBeforeSendHeaders.addListener(function (t) {
            var n = t.requestHeaders.filter(function (t) {
                return "origin" !== t.name.toLowerCase()
            });
            return n.push({
                name: "Origin",
                value: "https://www.google.com"
            }), {
                requestHeaders: n
            }
        }, {
            urls: ["https://ogs.google.com/*cjg_ogs=" + m + "*"],
            types: ["xmlhttprequest"]
        }, ["blocking", "requestHeaders"]))
    }

    function n(t) {
        var n = "";
        return t.authuser && "0" !== t.authuser && (n += "u/" + t.authuser + "/"), t.pageId && (n += "b/" + t.pageId + "/"), n
    }

    function e(t) {
        return t || {
            authuser: "0",
            pageId: null
        }
    }

    function r(t) {
        var e = "https://aboutme.google.com/" + n(t);
        return window.fetch(e, {
            credentials: "same-origin"
        }).then(function (t) {
            return t.text()
        })
    }

    function o(t) {
        var n = t.pageId + "-" + t.authuser;
        return w[n] || (w[n] = r(t)), w[n]
    }

    function u(t) {
        return o(t).then(function (t) {
            var n = t.indexOf("ANZ");
            return n === -1 && (n = t.indexOf("AOZ")), n === -1 && (n = t.indexOf('remove",""]],"') + 14), n > -1 ? t.slice(n, n + 200).split('"')[0].split("'")[0] : null
        })
    }

    function i(t) {
        return o(t).then(function (t) {
            var n = t.indexOf("/installedApps/");
            return n > -1 ? t.slice(n + 15, n + 79) : null
        })
    }

    function a(t, e) {
        return o(t).then(function (e) {
            var r = e.match(/(u\/\d(\/b\/\d{21})?\/)_\/notifications\/count/);
            return r ? r[1] : n(t)
        }).then(function (t) {
            var n = "https://ogs.google.com/" + t + "_/" + e;
            return n += n.indexOf("?") === -1 ? "?" : "&", n += "cjg_ogs=" + m
        })
    }

    function c(n, e, r) {
        t();
        var o = {
            method: "POST",
            body: r.toString(),
            headers: {
                "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            credentials: "include"
        };
        return a(n, e).then(function (t) {
            return window.fetch(t, o)
        }).then(function (t) {
            return t.text()
        }).then(function (t) {
            try {
                return JSON.parse(t.replace(")]}'", ""))
            } catch (n) {
                return null
            }
        })
    }

    function s(t) {
        var n = e(t);
        return u(n).then(function (t) {
            var e = new window.URLSearchParams;
            return e.append("ntok", t), c(n, "notifications/count", e)
        }).then(function (t) {
            return t[0]
        })
    }

    function f(t) {
        var n = e(t);
        return u(n).then(function (t) {
            var e = new window.URLSearchParams;
            return e.append("ntok", t), e.append("f.req", JSON.stringify(["og.stoq", t])), c(n, "og/customization/get?rt=j", e)
        }).then(function (t) {
            return t[0][0][2]
        })
    }

    function h(t, n) {
        var r = e(t);
        return u(r).then(function (t) {
            var e = new window.URLSearchParams;
            return e.append("ntok", t), e.append("f.req", JSON.stringify(["og.stoq", t, n])), c(r, "og/customization/set?rt=j", e)
        })
    }

    function p(t) {
        if ("string" != typeof t) return null;
        var n = t;
        return n.startsWith("http:") && (n = n.replace("http:", "https:")), n.startsWith("//") && (n = n.replace("//", "https://")), n.startsWith("https://") || (n = "https://" + n), n
    }

    function l(t) {
        return t.iconUrl48x48 && (t.iconUrl48x48 = p(t.iconUrl48x48)), t.iconUrl96x96 && (t.iconUrl96x96 = p(t.iconUrl96x96)), t
    }

    function d(t) {
        var n = e(t);
        return i(n).then(function (t) {
            if (!t) return [];
            var e = "https://www.googleapis.com/appsmarket/v2/installedApps/" + t + "?authuser=" + n.authuser;
            return window.fetch(e).then(function (t) {
                return t.json()
            }).then(function (t) {
                return t && Array.isArray(t.installedApps) ? t.installedApps.map(l) : []
            })
        })
    }
    var g = "undefined" != typeof chrome && chrome.runtime ? chrome : "undefined" != typeof browser && browser,
        w = {},
        m = encodeURIComponent(Date.now().toString(36) + "-" + Math.floor(1e9 * Math.random()).toString(36)),
        v = !1;
    return {
        getNotificationsCount: s,
        getMarketplaceApps: d,
        getShortcuts: f,
        setShortcuts: h
    }
}();