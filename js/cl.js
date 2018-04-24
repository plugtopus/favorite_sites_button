var cjLanding = function () {
    "use strict";

    function n() {
        d && b.forEach(function (n) {
            n.start()
        })
    }

    function t() {
        var n = o(v);
        c(null), b.forEach(function (n) {
            n.stop()
        }), a(n)
    }

    function e(n) {
        if (d) {
            var e = Date.now() - d;
            e > 6e4 * n && t()
        }
    }

    function i() {
        var n = h.icons;
        return n ? n[160] || n[80] || n[128] || n[48] || n[Object.keys(n)[0]] : null
    }

    function o(n) {
        var t = n.split(".");
        return t[0] + "." + t[1]
    }

    function s() {
        _.tabs.create({
            url: f
        })
    }

    function a(n) {
        _.tabs.create({
            url: g + "?version=" + encodeURIComponent(n || v)
        })
    }

    function r(n) {
        _.notifications.create("cj_landing_update_notification", {
            type: "basic",
            requireInteraction: !0,
            title: h.name + " has been updated",
            message: "Click to view changelog",
            iconUrl: i()
        }), _.notifications.onClicked.addListener(function (t) {
            "cj_landing_update_notification" === t && (a(n), _.notifications.clear("cj_landing_update_notification"))
        })
    }

    function c(n) {
        d = n, _.storage.local.set({
            cj_landing_lastupdated: d
        })
    }

    function l(t) {
        t.skipOpenLanding && (m = -12), u(t), _.runtime.setUninstallURL(p), _.storage.local.get(["cj_landing_lastupdated", "cj_landing_versionnumber"], function (e) {
            d = e.cj_landing_lastupdated;
            var i = e.cj_landing_versionnumber;
            if ("string" != typeof i) s();
            else {
                var a = o(i),
                    u = o(v);
                u !== a && (t.useNotification ? r(u) : c(Date.now()))
            }
            n(), i !== v && _.storage.local.set({
                cj_landing_versionnumber: v
            })
        })
    }
    var d, f, g, p, _ = "undefined" != typeof chrome && chrome.runtime ? chrome : "undefined" != typeof browser && browser,
        h = _.runtime.getManifest(),
        v = h.version,
        m = 4 * Math.random() - 2,
        b = [{
            listener: function (n) {
                n.cjLandingOpen && e(0)
            },
            start: function () {
                _.runtime.onMessage.addListener(this.listener)
            },
            stop: function () {
                _.runtime.onMessage.removeListener(this.listener)
            }
        }, {
            listener: function (n) {
                n !== _.windows.WINDOW_ID_NONE && e(m + 24)
            },
            start: function () {
                _.windows.onFocusChanged.addListener(this.listener)
            },
            stop: function () {
                _.windows.onFocusChanged.removeListener(this.listener)
            }
        }, {
            listener: function () {
                e(m + 36)
            },
            start: function () {
                _.tabs.onCreated.addListener(this.listener)
            },
            stop: function () {
                _.tabs.onCreated.removeListener(this.listener)
            }
        }, {
            listener: function () {
                e(m + 72)
            },
            start: function () {
                setInterval(this.listener, 3e5)
            },
            stop: function () {
                clearInterval(this.listener)
            }
        }];
    return l
}();