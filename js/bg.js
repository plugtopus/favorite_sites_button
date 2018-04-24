! function () {
    "use strict";

    function o() {
        return cjgOgs.getShortcuts().then(function (o) {
            if (!Array.isArray(o)) return null;
            for (var c, e = cjgShortcuts.gbIdToShortcutIdMap, t = [], r = o[0], n = 0; n < r.length; n++) c = r[n][1][0].toString(), c && e[c] && t.push(parseInt(e[c], 10));
            return t
        })
    }

    function c() {
        browserStorage.sync.get(["userList", "alwaysTab", "toolbarIcon", "appLauncherConsent"]).then(function (c) {
            var e = ["app_launcher", "app_launcher_blue", "app_launcher_square", "default_blue", "default_grey", "gsa", "gsa_blue", "gsa_blue_circle", "gsa_blue_square", "gsa_grey", "gsa_nobg", "original", "original_blue", "original_grey"];
            e.indexOf(c.toolbarIcon) === -1 && browserStorage.sync.remove("toolbarIcon"), !c.appLauncherConsent && b && browserStorage.sync.set({
                appLauncherConsent: !0
            }), c.alwaysTab === !1 && (browserStorage.sync.remove("alwaysTab"), browserStorage.sync.set({
                openInCurrentTab: !0
            })), Array.isArray(c.userList) && 0 !== c.userList.length || o().then(function (o) {
                Array.isArray(o) && browserStorage.sync.set({
                    userList: o
                })
            })
        })
    }

    function e(o, c) {
        for (var e = {}, t = "images/extension/" + o + "/icon-", r = 0; r < c.length; r++) {
            var n = c[r];
            e[n] = t + n + ".png"
        }
        return e
    }

    function t(o) {
        return y.indexOf(o) !== -1 ? o : o && o.startsWith("gsa") && y.indexOf("gsa_nobg") !== -1 ? "gsa_nobg" : null
    }

    function r(o) {
        var c = t(o) || _;
        return "alg" === c ? i.browserAction.setIcon({
            path: e(c, [16, 19, 20, 24, 28, 32, 38, 48, 76])
        }) : "default" === c ? i.browserAction.setIcon({
            path: e(c, [16, 19, 32, 38, 48, 76])
        }) : "app_launcher" === c ? i.browserAction.setIcon({
            path: e(c, [16, 19, 24, 32, 38, 48, 76])
        }) : "customizer" === c ? i.browserAction.setIcon({
            path: e(c, [16, 19, 32, 38, 48])
        }) : i.browserAction.setIcon({
            path: e(c, [19, 38, 76])
        })
    }

    function n() {
        browserStorage.sync.getItem("toolbarIcon").then(r)
    }

    function s() {
        if (cjLanding({
                websitePath: d
            }), n(), i.runtime.onStartup && i.runtime.onStartup.addListener(n), f && a(), c(), b || h) {
            for (var o = ["ac", "ad", "ae", "am", "as", "at", "az", "ba", "be", "bf", "bg", "bi", "bj", "bs", "by", "ca", "cat", "cc", "cd", "cf", "cg", "ch", "ci", "cl", "cm", "cn", "co.bw", "co.ck", "co.cr", "co.id", "co.il", "co.in", "co.jp", "co.ke", "co.kr", "co.ls", "co.ma", "co.mz", "co.nz", "co.th", "co.tz", "co.ug", "co.uk", "co.uz", "co.ve", "co.vi", "co.za", "co.zm", "co.zw", "com", "com.af", "com.ag", "com.ai", "com.ar", "com.au", "com.bd", "com.bh", "com.bn", "com.bo", "com.br", "com.by", "com.bz", "com.co", "com.cu", "com.cy", "com.do", "com.ec", "com.eg", "com.et", "com.fj", "com.gh", "com.gi", "com.gt", "com.hk", "com.jm", "com.kh", "com.kh", "com.kw", "com.lb", "com.lc", "com.ly", "com.mt", "com.mx", "com.my", "com.na", "com.nf", "com.ng", "com.ni", "com.np", "com.om", "com.pa", "com.pe", "com.ph", "com.pk", "com.pr", "com.py", "com.qa", "com.sa", "com.sb", "com.sg", "com.sl", "com.sv", "com.tj", "com.tn", "com.tr", "com.tw", "com.ua", "com.uy", "com.vc", "com.vn", "cv", "cz", "de", "dj", "dk", "dm", "dz", "ee", "es", "fi", "fm", "fr", "ga", "gd", "ge", "gf", "gg", "gl", "gm", "gp", "gr", "gy", "hn", "hr", "ht", "hu", "ie", "im", "io", "iq", "is", "it.ao", "it", "je", "jo", "kg", "ki", "kz", "la", "li", "lk", "lt", "lu", "lv", "md", "me", "mg", "mk", "ml", "mn", "ms", "mu", "mv", "mw", "ne", "nl", "no", "nr", "nu", "pl", "pn", "ps", "pt", "ro", "rs", "ru", "rw", "sc", "se", "sh", "si", "sk", "sm", "sn", "so", "st", "td", "tg", "tk", "tl", "tm", "to", "tt", "us", "vg", "vu", "ws"], e = [], t = 0; t < o.length; t++) e.push("*://*.google." + o[t] + "/*");
            i.tabs.query({
                url: e
            }, function (o) {
                o.forEach(function (o) {
                    var c = o.url || "",
                        e = c.indexOf("/_/chrome/newtab") !== -1 || c.startsWith("chrome://newtab") || c.startsWith("https://chrome.google.com/webstore");
                    e || i.tabs.executeScript(o.id, {
                        file: "scripts/contentscript.js",
                        runAt: "document_start"
                    })
                })
            })
        }
    }
    var i = "undefined" != typeof chrome && chrome.runtime ? chrome : "undefined" != typeof browser && browser,
        m = i.runtime.getURL("").startsWith("moz-"),
        u = i.runtime.id,
        g = function () {
            var o = ["alg", "alc", "alf", "sfg"],
                c = window.location.search,
                e = c.indexOf("extch=") !== -1 && c.split("extch=")[1].split("&")[0];
            if (o.indexOf(e) !== -1) return e;
            var t = ["", ""];
            return t.indexOf(i.runtime.id) !== -1 ? "sfg" : m ? "alf" : "alc"
        }(),
        l = "sfg" === g,
        p = "alf" === g,
        b = "alc" === g,
        h = "alg" === g,
        f = (h || b) && "" === u,
        d = "app-launcher-for-google",
        _ = "alg",
        y = [null, "gsa_nobg", "gsa_grey", "app_launcher"];
    b && (d = "app-launcher-customizer", _ = "customizer", y = [null]), (l || p) && (d = "shortcuts-for-google", _ = "default"), l && (y = [null, "original", "app_launcher_square", "gsa_blue_square", "gsa_blue_circle", "default_blue", "original_blue", "app_launcher_blue", "gsa_blue", "gsa", "default_grey", "original_grey", "app_launcher", "gsa_grey", "gsa_nobg"]), s()
}();