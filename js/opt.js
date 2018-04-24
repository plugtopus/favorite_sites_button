! function () {
    "use strict";

    function e() {
        return (1e4 * Date.now() + Math.round(1e4 * Math.random())).toString(36)
    }

    function t(e) {
        return e.toString()
    }

    function n(e) {
        return new Promise(function (t, n) {
            var o = new window.FileReader;
            o.addEventListener("error", function (e) {
                n(e)
            }), o.addEventListener("load", function (e) {
                t(e.currentTarget.result)
            }), o.readAsText(e)
        })
    }

    function o(e) {
        return n(e).then(function (e) {
            try {
                return JSON.parse(e)
            } catch (t) {
                return h(e)
            }
        })
    }

    function r(e, t) {
        var n = document.createElement("a");
        n.download = t, n.href = e, n.setAttribute("style", "all:initial !important;visibility: hidden !important;opacity:0 !important;pointer-events: none !important;position: fixed !important;"), n.textContent = "Download", document.body.appendChild(n), n.click()
    }

    function s(e, t) {
        return parseInt(e, 10) > parseInt(t, 10) ? -1 : 1
    }

    function a(e, t) {
        var n = de[e].name.toLowerCase(),
            o = de[t].name.toLowerCase();
        return n !== o ? n > o ? 1 : -1 : s(t, e)
    }

    function c(e, t) {
        var n;
        e > 1e3 ? n = -1 * e : (n = cjgShortcuts.mostPopular.indexOf(e), n === -1 && (n = 1e3));
        var o;
        return t > 1e3 ? o = -1 * t : (o = cjgShortcuts.mostPopular.indexOf(t), o === -1 && (o = 1e3)), n < o ? -1 : n > o ? 1 : a(e, t)
    }

    function i(e, t) {
        var n = de[e].name.toLowerCase(),
            o = de[t].name.toLowerCase();
        return e > 1e3 && t < 1e3 ? -1 : e < 1e3 && t > 1e3 ? 1 : e > 1e3 && t > 1e3 ? n < o ? -1 : n > o ? 1 : 0 : n < o ? -1 : n > o ? 1 : 0
    }

    function d(e, t) {
        document.getElementById(e).classList.toggle("on", t)
    }

    function l(e) {
        document.getElementById("remove-shortcut-popup").dataset.service = e, d("remove-shortcut-popup", !0)
    }

    function u() {
        document.getElementById("custom-shortcut-popup__remove").hidden = !0, document.getElementById("custom-shortcut-popup__name").value = "", document.getElementById("custom-shortcut-popup__url").value = "", document.getElementById("custom-shortcut-popup__iconurl").value = "", document.getElementById("custom-shortcut-popup").dataset.service = e(), d("custom-shortcut-popup", !0)
    }

    function p(e) {
        var t = pe[e].iconUrl;
        document.getElementById("custom-shortcut-popup__remove").hidden = !1, document.getElementById("custom-shortcut-popup__name").value = pe[e].name, document.getElementById("custom-shortcut-popup__url").value = pe[e].url, document.getElementById("custom-shortcut-popup__iconurl").value = t || "", document.getElementById("custom-shortcut-popup").dataset.service = e, d("custom-shortcut-popup", !0)
    }

    function g(e) {
        return e.toLowerCase().replace(/[\s-]/g, "")
    }

    function h(t) {
        var n = {
                customServicesDatabase: {}
            },
            o = {},
            r = [],
            s = [];
        return t.split("\n").forEach(function (e) {
            if ("focustab=false" === e && (n.noFocusTab = !0), "openintab=false" === e && (n.openInCurrentTab = !0), e.startsWith("userlist=") && (r = e.replace("userlist=", "").split(",").map(g)), e.indexOf("_url=") !== -1) {
                var t = e.split("_url="),
                    s = g(t[0]);
                o[s] || (o[s] = {}), o[s].url = t[1]
            }
            if (e.indexOf("_newname=") !== -1) {
                var a = e.split("_newname="),
                    c = g(a[0]);
                o[c] || (o[c] = {}), o[c].name = a[1]
            }
        }), Object.keys(o).forEach(function (t) {
            var s = o[t];
            if (s.url) {
                var a = s.url;
                if (a.startsWith("http://") || a.startsWith("https://")) {
                    var c = e();
                    ie[t] = c, n.customServicesDatabase[c] = {
                        url: a,
                        name: s.name || t
                    }, r.indexOf(t) === -1 && r.push(t)
                }
            }
        }), r.forEach(function (e) {
            var t = ie[e];
            t && s.indexOf(t) === -1 && s.push(t)
        }), s.length > 0 && (n.userList = s), n
    }

    function v(e, t) {
        for (var n = {}, o = "images/extension/" + e + "/icon-", r = 0; r < t.length; r++) {
            var s = t[r];
            n[s] = o + s + ".png"
        }
        return n
    }

    function f(e) {
        return "default" === e || "customizer" === e ? null : ae.indexOf(e) !== -1 ? e : e && e.startsWith("gsa") && ae.indexOf("gsa_nobg") !== -1 ? "gsa_nobg" : null
    }

    function b(e) {
        var t = f(e) || se;
        return "alg" === t ? Z.browserAction.setIcon({
            path: v(t, [16, 19, 20, 24, 28, 32, 38, 48, 76])
        }) : "default" === t ? Z.browserAction.setIcon({
            path: v(t, [16, 19, 32, 38, 48, 76])
        }) : "app_launcher" === t ? Z.browserAction.setIcon({
            path: v(t, [16, 19, 24, 32, 38, 48, 76])
        }) : "customizer" === t ? Z.browserAction.setIcon({
            path: v(t, [16, 19, 32, 38, 48])
        }) : Z.browserAction.setIcon({
            path: v(t, [19, 38, 76])
        })
    }

    function y(e) {
        return browserStorage.sync.clear().then(function () {
            return e.alwaysTab === !1 && (e.openInCurrentTab = !0), delete e.alwaysTab, browserStorage.sync.set(e)
        }).then(function () {
            d("import-success-popup", !0), b(e.toolbarIcon)
        })
    }

    function _() {
        d("import-fail-popup", !0)
    }

    function w(e) {
        o(e.target.files[0]).then(y, _)
    }

    function E(e) {
        var t = document.createElement("img");
        t.className = "alg-pref-toolbaricons__item", t.addEventListener("click", function () {
            browserStorage.sync.setItem("toolbarIcon", e), b(e)
        });
        var n = window.devicePixelRatio > 1 ? "76" : "38";
        return t.src = "images/extension/" + (e || se) + "/icon-" + n + ".png", t
    }

    function I(e, t) {
        var n = cjgShortcuts.badgeOnLeftIcons.indexOf(t) !== -1,
            o = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        o.setAttribute("viewBox", "0 0 48 48"), o.setAttribute("class", "cj-shortcutlist__badge");
        var r = document.createElementNS("http://www.w3.org/2000/svg", "g");
        r.setAttribute("transform", n ? "translate(1, 27)" : "translate(27, 27)"), o.appendChild(r);
        var s = document.createElementNS("http://www.w3.org/2000/svg", "path");
        s.setAttribute("d", "M10,21.1421356 C15.5228475,21.1421356 20,16.6649831 20,11.1421356 C20,5.61928813 0,5.61928813 0,11.1421356 C0,16.6649831 4.4771525,21.1421356 10,21.1421356 Z"), s.setAttribute("style", "fill:rgba(0,0,0,.1)"), r.appendChild(s);
        var a = document.createElementNS("http://www.w3.org/2000/svg", "path");
        a.setAttribute("d", "M20,10 C20,15.5228 15.5228,20 10,20 C4.47715,20 0,15.5228 0,10 C0,4.47715 4.47715,0 10,0 C15.5228,0 20,4.47715 20,10 Z"), a.setAttribute("style", "fill:#f5f5f5"), r.appendChild(a);
        var c = document.createElementNS("http://www.w3.org/2000/svg", "path");
        return c.setAttribute("d", cjgShortcuts.badgeIcons[e]), c.setAttribute("style", "fill:rgba(0,0,0,.54)"), r.appendChild(c), o
    }

    function k(e) {
        var t = pe[e];
        t.custom = !0, t.query = t.name, de[e] = t
    }

    function L() {
        browserStorage.sync.set({
            customServicesDatabase: pe
        })
    }

    function B(e) {
        delete pe[e], delete de[e], L()
    }

    function C(e, t) {
        var n = pe[e] || {},
            o = ("undefined" == typeof t.name ? n.name : t.name) || "",
            r = ("undefined" == typeof t.url ? n.url : t.url) || "about:blank",
            s = "undefined" == typeof t.iconUrl ? n.iconUrl : t.iconUrl,
            a = {
                name: o,
                url: r
            };
        s && (a.iconUrl = s), pe[e] = a, k(e), L()
    }

    function S(e) {
        return !e || e > 40 ? 48 : 24
    }

    function x(e) {
        return !e || e > 40 ? 64 : !ne || e > 20 ? 32 : 16
    }

    function j(e) {
        P = S(e);
        var t = P < 20;
        ge.classList.toggle("cj-shortcutlist--condensed", t), me.classList.toggle("cj-shortcutlist--condensed", t);
    }

    function O(e) {
        j(e);
        var t = x(e);
        browserStorage.sync.setItem("shortcutIconSize", t), F()
    }

    function N() {
        for (var e = document.getElementById("selectservices__filter"), t = e.value.toLowerCase(), n = document.querySelectorAll(".cj-shortcutlist .cj-shortcutlist__item"), o = 0; o < n.length; o++) {
            var r = n[o].dataset.id,
                s = pe[r] || de[r] || {},
                a = s.query || s.name || "",
                c = a.toLowerCase().indexOf(t) === -1;
            n[o].hidden = c
        }
    }

    function z() {
        browserStorage.sync.set({
            userList: ve
        })
    }

    function A() {
        ve = [];
        for (var e = 0; e < me.children.length; e++) ve.push(me.children[e].dataset.id);
        z()
    }

    function T() {
        ve.sort(a), F(), z()
    }

    function M(e) {
        e.dataTransfer.setData("text/plain", "drag");
        var t = e.target,
            n = t.parentNode;
        n === me && ge.parentNode.classList.add("alg-selectservices__shortcuts--remove"), n !== me && n !== ge || (ue = t, setTimeout(function () {
            t.classList.add("cj-shortcutlist__item--dragging")
        }))
    }

    function q(e) {
        ue = null, e.target.classList.remove("cj-shortcutlist__item--dragging"), ge.parentNode.classList.remove("alg-selectservices__shortcuts--remove"), e.preventDefault()
    }

    function D(e) {
        var t = e.target,
            n = ue.dataset.id;
        if (t === me || t === ge) t.appendChild(ue);
        else {
            var o = t.parentNode,
                r = o === me ? ve : he,
                s = r.indexOf(n) !== -1 && r.indexOf(n) < r.indexOf(t.dataset.id) ? t.nextSibling : t;
            o.insertBefore(ue, s)
        }
    }

    function U(e) {
        var t = document.createElement("li");
        t.draggable = !0, t.dataset.id = e, t.className = "cj-shortcutlist__item";
        var n = de[e],
            o = n.url || n.u;
        o && (t.title = o), t.addEventListener("click", function () {
            t.parentNode === ge ? (me.appendChild(t), A()) : e in pe ? p(e) : t.parentNode === me && (ge.appendChild(t), A())
        });
        var r = document.createElement("div");
        if (r.style.height = P + "px", r.style.width = P + "px", r.className = "cj-shortcutlist__icon", n.badge && n.badge in cjgShortcuts.badgeIcons) {
            var s = I(n.badge, n.icon);
            r.appendChild(s)
        }
        var a = document.createElement("img"),
            c = n.icon,
            i = n.iconUrl,
            d = i || "../images/48/" + (c || "placeholder") + "_48dp.svg";
        e in pe && !i && (d = "https://www.google.com/s2/favicons?domain_url=" + encodeURIComponent(n.url)), a.src = d, r.appendChild(a), t.appendChild(r);
        var l = document.createElement("div");
        return l.className = "cj-shortcutlist__label", l.textContent = n.name, t.appendChild(l), e in pe && (t.classList.add("cj-shortcutlist__item--edit"), t.title = "Edit service", P > 28 && a.addEventListener("load", function () {
            a.naturalHeight < 34 && a.naturalWidth < 34 && r.classList.add("cj-shortcutlist__icon--box")
        })), t
    }

    function W() {
        ge.textContent = "";
        var e = document.getElementById("selectservices__orderselect").value,
            t = {
                popularity: c,
                alphabetically: i,
                newest: s
            };
        he.sort(t[e]), he.forEach(function (e) {
            var t = U(e);
            ge.appendChild(t)
        })
    }

    function R() {
        ve = [], F(), z()
    }

    function F() {
        ge.textContent = "", me.textContent = "", ve.forEach(function (e) {
            e in de && me.appendChild(U(e))
        });
        var e = document.getElementById("selectservices__orderselect").value,
            t = {
                popularity: c,
                alphabetically: i,
                newest: s
            };
        Object.keys(de).sort(t[e]).forEach(function (e) {
            ve.indexOf(e) === -1 && ge.appendChild(U(e))
        }), N()
    }
    var P, Z = "undefined" != typeof chrome && chrome.runtime ? chrome : "undefined" != typeof browser && browser,
        J = Z.runtime.getURL("").startsWith("moz-"),
        X = function () {
            var e = ["alg", "alc", "alf", "sfg"],
                t = window.location.search,
                n = t.indexOf("extch=") !== -1 && t.split("extch=")[1].split("&")[0];
            if (e.indexOf(n) !== -1) return n;
            var o = ["", ""];
            return o.indexOf(Z.runtime.id) !== -1 ? "sfg" : J ? "alf" : "alc"
        }(),
        H = "sfg" === X,
        K = "alf" === X,
        V = "alc" === X,
        G = "alg" === X,
        Q = H,
        Y = J || H,
        $ = !G,
        ee = H,
        te = V || G,
        ne = H,
        oe = !V,
        re = Q || Y,
        se = "alg",
        ae = [null, "app_launcher", "gsa_nobg", "gsa_grey"];
    V ? (ae = [null], se = "customizer") : H ? (se = "default", ae = [null, "original", "app_launcher_square", "gsa_blue_square", "gsa_blue_circle", "default_blue", "original_blue", "app_launcher_blue", "gsa_blue", "gsa", "default_grey", "original_grey", "app_launcher", "gsa_grey", "gsa_nobg"]) : K && (se = "default", se = "default");
    var ce = ["customServicesDatabase", "displayMarketplaceApps", "displayMode", "hideLabel", "iconBreak", "noFocusTab", "openInCurrentTab", "openInNewTabChrome", "shortcutIconSize", "showLaunchbox", "showSettings", "userList", "toolbarIcon"],
        ie = {
            "3dwarehouse": "604",
            accounts: "79",
            admanager: "2",
            adplanner: "3",
            adsense: "4",
            adwords: "6",
            alerts: "10",
            analytics: "11",
            androiddevelopers: "581",
            androidmarket: "70",
            androidmarketdeveloperconsole: "63",
            appengine: "15",
            appinventor: "581",
            apps: "16",
            appsmarketplace: "17",
            appsstatusdashboard: "213",
            artproject: "18",
            blogdirectory: "20",
            blogger: "21",
            blogsearch: "21",
            bodybrowser: "298",
            bookmarks: "23",
            bookmarksbookmarkthis: "172",
            bookmarkslabels: "23",
            bookmarkslists: "23",
            bookmarkslistsgmarkthis: "172",
            books: "65",
            booksngramviewer: "408",
            browsersize: "336",
            calendar: "27",
            calendarnewevent: "28",
            checkout: "488",
            chromeextensions: "33",
            chromewebstore: "31",
            chromewebstoredeveloperdashboard: "32",
            code: "45",
            contacts: "39",
            currencyconverter: "55",
            customsearch: "42",
            dashboard: "43",
            directory: "248",
            docs: "48",
            docsnewdoc: "299",
            docsnewdrawing: "47",
            docsnewform: "329",
            docsnewfromtemplate: "142",
            docsnewpresentation: "301",
            docsnewspreadsheet: "300",
            docsuploadfiles: "48",
            docsviewer: "48",
            earth: "49",
            ebookstore: "72",
            externalkeywordtool: "182",
            feedburner: "53",
            finance: "54",
            friendconnect: "82",
            fusiontables: "58",
            "goo.gl": "152",
            googlestore: "73",
            governmentrequests: "91",
            groups: "93",
            hottrends: "149",
            igoogle: "157",
            imagesearch: "96",
            imageswirl: "96",
            insights: "237",
            knol: "125",
            languagetools: "352",
            latitude: "590",
            lifephotoarchive: "99",
            mail: "59",
            mailgmailthis: "175",
            mailnewmail: "60",
            maps: "101",
            mapsmapthis: "176",
            merchantcenter: "104",
            movies: "68",
            music: "69",
            musicchina: "69",
            musicindia: "69",
            "new": "1",
            news: "109",
            newsarchive: "110",
            notebook: "97",
            notebookgnotethis: "97",
            offers: "155",
            orkut: "82",
            pacman: "113",
            panoramio: "457",
            patentsearch: "115",
            phonegallery: "73",
            picasawebalbums: "409",
            places: "234",
            placesnewplace: "235",
            plus: "82",
            pluscircles: "83",
            plusgames: "729",
            plushangouts: "280",
            plusone: "82",
            plusphotos: "89",
            plusprofile: "334",
            postini: "725",
            productideas: "521",
            productsearch: "129",
            publicdataexplorer: "121",
            reader: "210",
            readerplay: "74",
            readersubscribe: "210",
            realtime: "157",
            recaptcha: "188",
            scholar: "125",
            searchstories: "1",
            sites: "405",
            smschannels: "664",
            submityourcontent: "158",
            support: "137",
            talk: "218",
            tasks: "140",
            teachparentstech: "207",
            trafficestimator: "182",
            transit: "143",
            translate: "144",
            translatortoolkit: "145",
            transliteration: "62",
            transparencyreport: "146",
            trends: "147",
            trendsforwebsites: "189",
            tv: "81",
            video: "153",
            voice: "154",
            wallet: "155",
            wave: "48",
            webelements: "45",
            webfonts: "61",
            webhistory: "407",
            webmastertools: "158",
            websearch: "157",
            websiteoptimizer: "367",
            webtoolkit: "289",
            youtube: "160",
            youtubeleanback: "162",
            zeitgeist: "163"
        },
        de = cjgShortcuts.list,
        le = browserStorage.sync.get(ce);
    le.then(function (e) {
        "object" == typeof e.customServicesDatabase && (pe = e.customServicesDatabase, Object.keys(pe).forEach(k));
        var n = parseInt(e.shortcutIconSize, 10);
        j(n), Array.isArray(e.userList) && (ve = e.userList.map(t)), Object.keys(de).forEach(function (e) {
            var t = de[e],
                n = t.name,
                o = t.bu || t.au || t.u || t.url || "",
                r = o.replace("/", " ").replace(".", " ").replace("#", " ") + " " + n;
            if (t.i18n) {
                var s = Z.i18n.getMessage(t.i18n) || n;
                r += " " + s, t.name = s
            }
            if (t.subId) {
                r += " " + de[t.subId].name;
                var a = de[t.subId].i18n;
                a && (r += " " + (Z.i18n.getMessage(a) || n))
            }
            t.query = r.toLowerCase(), ve.indexOf(e) === -1 && he.push(e)
        }), F()
    });
    var ue, pe = {},
        me = document.getElementById("selectservices__selected"),
        ge = document.getElementById("selectservices__available"),
        he = [],
        ve = cjgShortcuts.defaultSelection;
    document.getElementById("import-success-popup__reload").addEventListener("click", function () {
        window.location.reload()
    }), document.getElementById("btn-export-settings").addEventListener("click", function () {
        browserStorage.sync.get(ce).then(m)
    }), document.getElementById("import-settings-popup__import").addEventListener("click", function () {
        var e = document.createElement("input");
        e.type = "file", e.addEventListener("change", w), e.click()
    }), document.getElementById("btn-import-settings").addEventListener("click", function () {
        d("import-settings-popup", !0)
    }), Array.prototype.forEach.call(document.getElementsByClassName("close-popup-button"), function (e) {
        e.addEventListener("click", function () {
            d(e.dataset.popup, !1)
        })
    }), document.getElementById("reset-settings-popup__reset").addEventListener("click", function () {
        browserStorage.sync.clear().then(function () {
            b(null), window.location.reload()
        })
    }), document.getElementById("selectservices__suggest").addEventListener("click", function () {
    }), document.getElementById("selectservices__addcustom").addEventListener("click", u), document.getElementById("btn-reset-settings").addEventListener("click", function () {
        d("reset-settings-popup", !0)
    });
    var fe = document.getElementById("open-in-new-tab-children"),
        be = document.getElementById("open-in-new-tab");
    be.addEventListener("click", function () {
        var e = !be.checked;
        fe.hidden = e, browserStorage.sync.setItem("openInCurrentTab", e)
    });
    var ye = document.getElementById("open-in-new-tab-chrome");
    if (ye.addEventListener("click", function () {
            browserStorage.sync.setItem("openInNewTabChrome", ye.checked)
        }), document.getElementById("support-appearance-header").hidden = !re, te) {
        document.getElementById("support-marketplace-apps").hidden = !1;
        var _e = document.getElementById("display-marketplace-apps-button");
        _e.addEventListener("click", function () {
            browserStorage.sync.setItem("displayMarketplaceApps", _e.checked)
        })
    }
    var we = document.getElementById("shortcuts-listmode-container"),
        Ee = document.getElementById("shortcuts-listmode");
    Ee.addEventListener("click", function () {
        var e = Ee.checked ? 32 : 64;
        O(e);
        var t = document.querySelector(".alg-pref-iconsizes__item--selected"),
            n = document.querySelector('.alg-pref-iconsizes__item[data-size="' + e + '"]');
        t && t.classList.remove("alg-pref-iconsizes__item--selected"), n && n.classList.add("alg-pref-iconsizes__item--selected")
    });
    var Ie = document.getElementById("hide-label");
    if (Ie.addEventListener("click", function () {
            var e = Ie.checked;
            browserStorage.sync.setItem("hideLabel", e), we.hidden = e, Ce.hidden = !e
        }), ee) {
        var ke = document.getElementById("support-display-settings");
        ke.hidden = !1;
        var Le = document.getElementById("display-settings");
        Le.addEventListener("click", function () {
            browserStorage.sync.setItem("showSettings", Le.checked)
        })
    }
    if ($) {
        document.getElementById("support-display-launchbox").hidden = !1;
        var Be = document.getElementById("display-launchbox");
        Be.addEventListener("click", function () {
            var e = Be.checked;
            ee && (ke.hidden = e), browserStorage.sync.setItem("showLaunchbox", e)
        })
    }
    var Ce = document.getElementById("iconsizes-group"),
        Se = document.getElementById("iconsizes-container"),
        xe = {
            24: 32,
            48: 64
        };
    if (ne && (xe = {
            16: 16,
            32: 32,
            48: 64
        }), Object.keys(xe).forEach(function (e) {
            var t = xe[e],
                n = document.createElement("div");
            n.className = "alg-pref-iconsizes__item", n.dataset.size = t, n.addEventListener("click", function () {
                document.querySelector(".alg-pref-iconsizes__item--selected").classList.remove("alg-pref-iconsizes__item--selected"), n.classList.add("alg-pref-iconsizes__item--selected"), O(t), Ee.checked = t < 48
            });
            var o = document.createElement("div");
            o.className = "alg-pref-iconsizes__illustration", o.style.height = e + "px", o.style.width = e + "px", o.textContent = e, n.appendChild(o), Se.appendChild(n)
        }), Q) {
        document.getElementById("support-advanced-display-settings").hidden = !1;
        var je = document.getElementById("column-count"),
            Oe = document.getElementById("column-count-input");
        Oe.addEventListener("keyup", function () {
            Oe.validity.valid ? browserStorage.sync.set({
                iconBreak: Number(Oe.value)
            }) : browserStorage.sync.remove("iconBreak")
        });
        var Ne = document.getElementById("current-display-mode"),
            ze = document.getElementById("display-mode");
        ze.addEventListener("change", function () {
            Ne.textContent = ze.selectedOptions[0].textContent, je.hidden = "custom" !== ze.value, browserStorage.sync.setItem("displayMode", ze.value)
        })
    }
    if (oe) {
        var Ae = document.getElementById("toolbar-icons");
        document.getElementById("toolbar-icons-header").hidden = !1, Ae.hidden = !1, ae.forEach(function (e) {
            var t = E(e);
            Ae.appendChild(t)
        })
    }
    le.then(function (e) {
        document.getElementById("support-advanced-shortcuts-settings").hidden = !Y, e.openInCurrentTab !== !0 && (be.checked = !0, fe.hidden = !1), e.openInNewTabChrome && (ye.checked = !0), te && e.displayMarketplaceApps && (_e.checked = !0);
        var t = Number(e.shortcutIconSize) || 64;
        !ne && t < 32 && (t = 32), Ee.checked = t < 48;
        var n = document.querySelector('.alg-pref-iconsizes__item[data-size="' + t + '"]');
        if (n && n.classList.add("alg-pref-iconsizes__item--selected"), e.hideLabel && (Ie.checked = !0, we.hidden = !0, Ce.hidden = !1), ee && e.showSettings !== !1 && (Le.checked = !0), e.noFocusTab) {
            var o = document.getElementById("no-focus-tab-container");
            o.hidden = !1;
            var r = document.getElementById("no-focus-tab");
            r.checked = !0, r.addEventListener("click", function () {
                browserStorage.sync.setItem("noFocusTab", r.checked)
            })
        }
        $ && (Be.checked = e.showLaunchbox !== !1), ee && (ke.hidden = e.showLaunchbox !== !1), Q && ("custom" === e.displayMode && (je.hidden = !1), isNaN(e.iconBreak) || (Oe.value = e.iconBreak), ze.value = e.displayMode ? e.displayMode : "grid", Ne.textContent = ze.selectedOptions[0].textContent)
    }), document.getElementById("remove-shortcut-popup__remove").addEventListener("click", function () {
        var e = document.getElementById("remove-shortcut-popup").dataset.service,
            t = document.querySelector('.cj-shortcutlist__item[data-id="' + e + '"]');
        t.parentNode === me && me.removeChild(t), B(e), A()
    });
    var Te = document.getElementById("selectservices__ordercurrent"),
        Me = document.getElementById("selectservices__orderselect");
    Me.addEventListener("change", function () {
        Te.textContent = Me.selectedOptions[0].textContent, F()
    });
    var qe = document.getElementById("selectservices__removeall");
    qe.addEventListener("click", R), me.addEventListener("dragstart", M), me.addEventListener("dragend", q), me.addEventListener("dragenter", function (e) {
        D(e), he = [];
        for (var t = 0; t < ge.children.length; t++) he.push(ge.children[t].dataset.id);
        A()
    }), ge.addEventListener("drop", function (e) {
        if (ue.parentNode === me) {
            ge.parentNode.classList.remove("alg-selectservices__shortcuts--remove");
            var t = ue.dataset.id,
                n = t in pe;
            n ? l(t) : (me.removeChild(ue), he.push(t), W(), A()), e.preventDefault()
        }
    }), ge.addEventListener("dragover", function (e) {
        e.preventDefault()
    }), ge.addEventListener("dragstart", M), ge.addEventListener("dragend", q), document.getElementById("custom-shortcut-popup__save").addEventListener("click", function () {
        var e = document.getElementById("custom-shortcut-popup").dataset.service,
            t = document.getElementById("custom-shortcut-popup__name").value,
            n = document.getElementById("custom-shortcut-popup__iconurl").value,
            o = document.getElementById("custom-shortcut-popup__url").value;
        o.indexOf("://") === -1 && (o = "http://" + o), C(e, {
            name: t,
            url: o,
            iconUrl: n
        }), ve.indexOf(e) === -1 && ve.push(e), F(), z()
    }), document.getElementById("selectservices__sort").addEventListener("click", T);
    var De = document.getElementById("selectservices__filter");
    setTimeout(function () {
        De.focus()
    }, 1e3), De.addEventListener("keyup", function () {
        N()
    }), document.getElementById("custom-shortcut-popup__remove").addEventListener("click", function () {
        var e = document.getElementById("custom-shortcut-popup").dataset.service;
        l(e)
    })
}();