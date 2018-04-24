! function () {
    "use strict";

    function e(e) {
        if ("object" != typeof e) return "";
        var t = [];
        return Object.keys(e).forEach(function (n) {
            null !== e[n] && "undefined" != typeof e[n] && t.push(n + "=" + encodeURIComponent(e[n]))
        }), "?" + t.join("&")
    }

    function t() {
        var e = te.runtime.getManifest();
        return e.options_ui ? e.options_ui.page : e.options_page
    }

    function n() {
        te.runtime.openOptionsPage ? te.runtime.openOptionsPage() : te.tabs.create({
            url: t()
        }), f()
    }

    function r(e) {
        return e.i18n ? te.i18n.getMessage(e.i18n) || e.name : e.name
    }

    function a(e) {
        return e.toString()
    }

    function i() {
        return "undefined" == typeof te.tabs ? Promise.resolve({}) : new Promise(function (e) {
            te.tabs.query({
                active: !0,
                currentWindow: !0
            }, function (t) {
                qe = t[0], e(qe)
            })
        })
    }

    function o() {
        if ("1" === ye.newtab) return !0;
        var e = qe && qe.url;
        return !!e && (e.indexOf("/_/chrome/newtab") !== -1 || e.startsWith("chrome://newtab") || e.startsWith("chrome://startpage") || "about:newtab" === e || "about:blank" === e)
    }

    function s(e) {
        Se = {}, "object" == typeof e.customServicesDatabase && (Se = e.customServicesDatabase || {}), ke = !e.openInCurrentTab && (e.openInNewTabChrome || !o()), Ne = e.noFocusTab, Oe = !pe || e.showLaunchbox !== !1, Ie = ge && e.displayMarketplaceApps, Me = !(Oe || me && e.showSettings === !1), Ae = he && e.hideLabel, xe = Array.isArray(e.userList) ? e.userList.map(a) : cjgShortcuts.defaultSelection;
        var t = Date.now();
        t > 15225336e5 && t < 15227064e5 && (t < 15226416e5 ? xe.unshift("-2") : xe.push("-2"));
        var n = Number(e.shortcutIconSize);
        if (ze = n && n < 48 ? n : 48, he && (!ve || !Ae) && ze < 48 && (ze = 24), We = 32 === ze || 16 === ze ? ze : 48, Te = .875 * ze, Ue = ze > 32, ue) {
            var r = e.displayMode || "grid",
                i = Number(e.iconBreak),
                s = i && i >= .5;
            if ("custom" !== r || s || (r = "grid"), "grid" !== r || Ae && !Ue) {
                var c = Ue ? 44 : 16,
                    d = 794,
                    l = 152,
                    u = Ae ? 16 + ze : l;
                Ue && (u = 92);
                var h = ze > 16 ? 4 : 5;
                "vertical" === r ? h = 1 : "horizontal" === r ? h = 25 : "custom" === r && (h = Math.round(i)), h > xe.length && (h = xe.length), be = c + h * u, Oe && be < l ? (ee = be, be = l) : be > d && (be = c + Math.floor((d - c) / u) * u), Re = be < 224;
                var p = be.toString() + "px";
                document.documentElement.style.width = p, document.body.style.width = p
            }
        }
    }

    function c() {
        return browserStorage.sync.get(["customShortcutsDatabase", "displayMarketplaceApps", "displayMode", "hideLabel", "iconBreak", "noFocusTab", "openInCurrentTab", "openInNewTabChrome", "shortcutIconSize", "showLaunchbox", "showSettings", "userList"]).then(function (e) {
            s(e || {})
        })
    }

    function d(e, t) {
        var n = cjgShortcuts.badgeOnLeftIcons.indexOf(t) !== -1,
            r = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        r.setAttribute("viewBox", "0 0 48 48"), r.setAttribute("class", "cj-shortcutlist__badge");
        var a = document.createElementNS("http://www.w3.org/2000/svg", "g");
        a.setAttribute("transform", n ? "translate(1, 27)" : "translate(27, 27)"), r.appendChild(a);
        var i = document.createElementNS("http://www.w3.org/2000/svg", "path");
        i.setAttribute("d", "M10,21.1421356 C15.5228475,21.1421356 20,16.6649831 20,11.1421356 C20,5.61928813 0,5.61928813 0,11.1421356 C0,16.6649831 4.4771525,21.1421356 10,21.1421356 Z"), i.setAttribute("style", "fill:rgba(0,0,0,.1)"), a.appendChild(i);
        var o = document.createElementNS("http://www.w3.org/2000/svg", "path");
        o.setAttribute("d", "M20,10 C20,15.5228 15.5228,20 10,20 C4.47715,20 0,15.5228 0,10 C0,4.47715 4.47715,0 10,0 C15.5228,0 20,4.47715 20,10 Z"), o.setAttribute("style", "fill:#f5f5f5"), a.appendChild(o);
        var s = document.createElementNS("http://www.w3.org/2000/svg", "path");
        return s.setAttribute("d", cjgShortcuts.badgeIcons[e]), s.setAttribute("style", "fill:rgba(0,0,0,.54)"), a.appendChild(s), r
    }

    function l() {
        return new Promise(function (e) {
            te.tabs.executeScript({
                code: "window.getSelection().toString();",
                runAt: "document_start"
            }, function (t) {
                var n = "";
                !te.runtime.lastError && Array.isArray(t) && "string" == typeof t[0] && (n = t[0]), e(n)
            })
        })
    }

    function u() {
        return l().then(function (t) {
            var n = "";
            t.length > 0 && (n += t + "\n\n"), n += qe.url;
            var r = Ce.authuser || "0";
            return "https://mail.google.com/mail/u/" + r + "/" + e({
                ui: "2",
                view: "cm",
                tf: "0",
                su: qe.title,
                body: n
            })
        })
    }

    function h() {
        var t = "https://www.google.com/bookmarks/mark" + e({
            op: "add",
            bkmk: qe.url,
            title: qe.title,
            authuser: je
        });
        return Promise.resolve(t)
    }

    function p() {
        return l().then(function (t) {
            return "https://www.google.com/maps" + e({
                q: t.replace(/\n|\r\n|\r/g, ", ").replace(/ /g, "+"),
                authuser: je
            })
        })
    }

    function m(e) {
        return window.fetch("https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyBiZYqhpRmNUArKPpqk7Wj15NIArVRmS6k", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                longUrl: e
            })
        }).then(function (e) {
            return e.json()
        })
    }

    function g() {
        De && (De.remove(), document.documentElement.classList.remove("cj-al--suggestiondisplayed"), k())
    }

    function v() {
        var e = !1;
        document.documentElement.classList.add("cj-al--urlshortenerdisplayed");
        var t = document.createElement("div");
        t.className = "cj-al-appbar";
        var n = A("link");
        n.disabled = !0, t.appendChild(n);
        var r = document.createElement("input");
        r.readonly = !0, r.addEventListener("click", function () {
            e && r.select()
        }), r.className = "cj-al-appbar__input", r.value = "Shortening...", t.appendChild(r);
        var a = A("content_copy");
        a.hidden = !0, a.title = "Copy url", a.addEventListener("click", function () {
            r.focus(), r.select(), document.execCommand("copy", !1, null)
        }), t.appendChild(a);
        var i = A("close");
        return i.title = "close", i.addEventListener("click", function () {
            document.documentElement.classList.remove("cj-al--urlshortenerdisplayed"), t.remove(), k()
        }), t.appendChild(i), g(), document.body.insertBefore(t, He), window.scrollTo(0, 0), k(), qe.url.startsWith("moz-extension://") || qe.url.startsWith("chrome-extension://") || qe.url.startsWith("chrome://") || qe.url.startsWith("opera://") || qe.url.startsWith("about://") ? void(r.value = "Can't shorten this website url") : void m(qe.url).then(function (t) {
            t && t.id && t.id.startsWith("http") ? (e = !0, a.hidden = !1, r.readonly = !1, r.value = t.id, r.focus(), r.select()) : r.value = "Oops. Error."
        }, function () {
            r.value = "Oops. Error."
        })
    }

    function f() {
        _e ? window.parent && window.parent.postMessage({
            algClose: !0
        }, "*") : window.close()
    }

    function w(e) {
        var t = {
            url: e
        };
        !oe && Ne && (t.focused = !0), te.windows.create(t)
    }

    function b(e) {
        var t = {
            url: e
        };
        _e && (t.index = qe.index + 1), Ne && (t.active = !1), te.tabs.create(t)
    }

    function y(e) {
        te.tabs.update(qe.id, {
            url: e
        })
    }

    function C(e, t) {
        try {
            "undefined" == typeof te.windows ? window.open(e, "_blank") : t.shiftKey ? w(e) : ke || t[ie] || 1 === t.button ? b(e) : y(e)
        } catch (n) {
            window.open(e, "_blank")
        }
        f()
    }

    function j(e, t) {
        e().then(function (e) {
            C(e, t)
        })
    }

    function E(e, t) {
        if ("178" === e) v();
        else if ("172" === e) j(h, t);
        else if ("175" === e) j(u, t);
        else if ("176" === e) j(p, t);
        else if ("-1" === e) n();
        else if (e in Se) {
            var r = Se[e];
            C(r.url, t)
        } else {
            var a = cjgShortcuts.getUrl(e, Ce);
            a && C(a, t)
        }
    }

    function _(e, t) {
        return _e ? void i().then(function () {
            E(e, t)
        }, function () {
            E(e, t)
        }) : void E(e, t)
    }

    function L(e) {
        var t = document.createElement("div");
        t.className = "cj-shortcutlist__icon";
        var n = ze + "px";
        if (t.style.height = n, t.style.width = n, e.badge && e.badge in cjgShortcuts.badgeIcons) {
            var r = d(e.badge, e.icon);
            t.appendChild(r)
        }
        var a = document.createElement("img");
        return e.custom ? (a.src = e.iconUrl || "https://www.google.com/s2/favicons?domain_url=" + encodeURIComponent(e.url), 16 !== ze && a.addEventListener("load", function () {
            a.naturalHeight < Te && a.naturalWidth < Te && t.classList.add("cj-shortcutlist__icon--box")
        })) : (a.src = "../images/" + We + "/" + (e.icon || "placeholder") + "_" + We + "dp.svg", a.height = ze, a.width = ze), t.appendChild(a), t
    }

    function S(e, t) {
        var n = document.createElement("li");
        n.className = "cj-shortcutlist__item", t && (n.dataset.service = t), we && (n.draggable = !0);
        var a = L({
            badge: e.badge,
            icon: e.icon,
            iconUrl: e.iconUrl,
            url: e.url,
            custom: !t || t in Se
        });
        n.appendChild(a);
        var i = r(e);
        if (n.dataset.queryLabel = i.toLowerCase(), Ae) n.title = i;
        else {
            var o = document.createElement("div");
            o.className = "cj-shortcutlist__label", o.textContent = i, n.appendChild(o)
        }
        return n
    }

    function x(e) {
        e.postMessage({
            algHeight: document.body.scrollHeight,
            algWidth: document.body.scrollWidth
        }, "*")
    }

    function k() {
        x(window.parent), x(window.top)
    }

    function N() {
        setTimeout(function () {
            window.location.reload()
        })
    }

    function A(e, t) {
        var n = document.createElement("button");
        n.className = "cj-md-iconbutton", t && n.classList.add("cj-md-iconbutton--dark");
        var r = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        r.setAttribute("viewBox", "0 0 24 24"), r.style.height = "24px", r.style.width = "24px", n.appendChild(r);
        var a = document.createElementNS("http://www.w3.org/2000/svg", "path");
        return a.setAttribute("d", Fe[e]), r.appendChild(a), n
    }

    function O() {
        var e = A("settings");
        return e.title = "Settings", e.addEventListener("click", n), e
    }

    function M() {
        var e = document.createElement("div");
        e.className = "cj-al-configure";
        var t = document.createElement("button");
        t.className = "cj-md-button cj-md-button--important cj-al-configure__button", t.textContent = "Settings", t.addEventListener("click", n), e.appendChild(t);
        var r = O();
        return r.classList.add("cj-al-configure__iconbutton"), e.appendChild(r), e
    }

    function I() {
        var e = document.createElement("ul");
        return e.className = "cj-shortcutlist", ee && (e.style.width = ee + "px"), Ue && e.classList.add("cj-shortcutlist--grid"), Ae && e.classList.add("cj-shortcutlist--nolabels"), ze < 24 && e.classList.add("cj-shortcutlist--condensed"), e
    }

    function z(e) {
        var t = e.target.dataset.service;
        t && _(t, e)
    }

    function W() {
        browserStorage.sync.set({
            userList: xe
        })
    }

    function T() {
        xe = [];
        for (var e = 0; e < He.children.length; e++) xe.push(He.children[e].dataset.service)
    }

    function U(e) {
        e.dataTransfer.setData("text/plain", "drag");
        var t = e.target;
        t.parentNode === He && (Pe.hidden = !1, He.classList.add("cj-shortcutlist--dragging"), Ve = t, setTimeout(function () {
            t.classList.add("cj-shortcutlist__item--dragging")
        }))
    }

    function q(e) {
        Pe.hidden = !0, He.classList.remove("cj-shortcutlist--dragging"), Ve = null, e.target.classList.remove("cj-shortcutlist__item--dragging"), W(), k(), e.preventDefault()
    }

    function B(e) {
        var t = e.target,
            n = Ve.dataset.service;
        if (t === He) He.appendChild(Ve);
        else if (t === Pe) He.removeChild(Ve);
        else {
            var r = xe.indexOf(n) < xe.indexOf(t.dataset.service) ? t.nextSibling : t;
            He.insertBefore(Ve, r)
        }
        T()
    }

    function H() {
        var e = I();
        e.addEventListener("click", z), e.addEventListener("auxclick", z);
        for (var t = 0; t < xe.length; t++) {
            var n = xe[t],
                r = Le[n] || Se[n];
            r && e.appendChild(S(r, n))
        }
        return we && (e.addEventListener("dragstart", U), e.addEventListener("dragend", q), e.addEventListener("dragenter", B)), e
    }

    function D() {
        return cjgOgs.getMarketplaceApps(Ce).then(function (e) {
            return browserStorage.sync.setItem(Ee, e), e
        })
    }

    function P() {
        return browserStorage.sync.getItem(Ee).then(function (e) {
            return Array.isArray(e) ? e : []
        })
    }

    function V(e, t, n) {
        var r = window.devicePixelRatio * ze > 48,
            a = r ? "iconUrl96x96" : "iconUrl48x48";
        e.textContent = "";
        var i = Array.isArray(n) && n.length > 0;
        t.hidden = !i, i && n.forEach(function (t) {
            var n = S({
                name: t.name,
                iconUrl: t[a]
            });
            n.addEventListener("click", function (e) {
                C(t.url, e)
            }), e.appendChild(n)
        })
    }

    function R() {
        var e = document.createElement("div");
        e.hidden = !0;
        var t = document.createElement("div");
        t.className = "cj-al-divider", e.appendChild(t);
        var n = I();
        e.appendChild(n);
        var r = !1;
        return P().then(function (t) {
            r || V(n, e, t)
        }), D().then(function (t) {
            r = !0, V(n, e, t)
        }), e
    }

    function F() {
        var e = document.createElement("div");
        if (e.className = "cj-al-appbar", we) {
            Pe = document.createElement("div"), Pe.hidden = !0, Pe.className = "cj-al-droparea", Pe.addEventListener("drop", q), Pe.addEventListener("dragover", function (e) {
                e.preventDefault()
            }), Pe.addEventListener("dragenter", B), e.appendChild(Pe);
            var t = A("delete");
            t.disabled = !0, Pe.appendChild(t);
            var n = document.createElement("div");
            n.className = "cj-al-droparea__message", n.textContent = "Drop here to remove shortcut", Pe.appendChild(n)
        }
        var r = A("search");
        r.disabled = !0, e.appendChild(r);
        var a = document.createElement("input");
        a.className = "cj-al-appbar__input", a.autofocus = !0, a.placeholder = Re ? "Search" : "Поиск", a.addEventListener("input", function () {
            for (var e = a.value.toLowerCase(), t = document.querySelectorAll(".cj-shortcutlist > .cj-shortcutlist__item"), n = 0; n < t.length; n++) {
                var r = t[n];
                r.hidden = r.dataset.queryLabel.indexOf(e) === -1
            }
            if (He.hidden = !He.querySelector(".cj-shortcutlist__item:not([hidden])"), Ie) {
                var i = Be.querySelector(".cj-shortcutlist__item:not([hidden])");
                Be.hidden = !i
            }
            _e && setTimeout(k, 1e-10)
        }), a.addEventListener("keyup", function (e) {
            if ("Enter" === e.key || 13 === e.keyCode) {
                var t = He.querySelector(".cj-shortcutlist__item:not([hidden])");
                if (t) return void _(t.dataset.service, e);
                var n = Ie && Be.querySelector(".cj-shortcutlist__item:not([hidden])");
                n && n.click()
            }
        }), window.addEventListener("message", function (e) {
            e.data.algOpenState && a.focus()
        }), e.appendChild(a);
        var i = O();
        return e.appendChild(i), e
    }

    function K() {
        te.runtime.sendMessage({
            cjLandingOpen: !0
        })
    }

    function Z(e) {
        window.scrollTo(0, 0), document.body.setAttribute("style", "width: " + (be + e % 2) + "px"), document.documentElement.setAttribute("style", "width: " + be + "px; margin-left: " + (e - 1) % 2 + "px"), e < 2 && setTimeout(Z.bind(null, e + 1), 100)
    }

    function J(e, t, n) {
        t.indexOf(e) === -1 && (t.push(e), t.sort(), te.storage.local.set({
            suggestionBlacklist: t
        }));
        var r = n.indexOf(e);
        r > -1 && (n.splice(r, 1), n.sort(), te.storage.local.set({
            suggestionWhitelist: n
        }))
    }

    function Y(e) {
        var t = Le[e] || Se[e];
        xe.indexOf(e) === -1 && t && (xe.push(e), He.appendChild(S(t, e)), W()), g()
    }

    function G(e) {
        var t = document.createElement("div");
        t.className = "cj-shortcutlist__icon";
        var n = "48px";
        if (t.style.height = n, t.style.width = n, e.badge && e.badge in cjgShortcuts.badgeIcons) {
            var r = d(e.badge, e.icon);
            t.appendChild(r)
        }
        var a = document.createElement("img");
        return a.src = "../images/48/" + (e.icon || "search") + "_48dp.svg", a.height = 48, a.width = 48, t.appendChild(a), t
    }

    function Q(e, t, n) {
        var r = cjgShortcuts.list[e];
        document.documentElement.classList.add("cj-al--suggestiondisplayed");
        var a = document.createElement("div");
        a.className = "cj-al-suggestion";
        var i = G(r);
        i.classList.add("cj-al-suggestion__icon"), a.appendChild(i);
        var o = A("close");
        o.classList.add("cj-al-suggestion__dismiss"), o.title = "Dismiss", o.addEventListener("click", function () {
            g(), J(e, t, n)
        }), a.appendChild(o);
        var s = document.createElement("div");
        s.className = "cj-al-suggestion__details", a.appendChild(s);
        var c = document.createElement("h1");
        c.className = "cj-al-suggestion__title", c.textContent = r.name, s.appendChild(c);
        var d = document.createElement("p");
        d.className = "cj-al-suggestion__subtitle", d.textContent = r.nu, s.appendChild(d);
        var l = document.createElement("div");
        l.className = "cj-al-suggestion__actions", s.appendChild(l);
        var u = document.createElement("div");
        return u.className = "cj-modern-button cj-al-suggestion__add", u.textContent = "Add shortcut", u.addEventListener("click", function () {
            Y(e)
        }), s.appendChild(u), a
    }

    function X() {
        if (fe) {
            var e = qe && qe.url;
            e && te.storage.local.get(["suggestionBlacklist", "suggestionWhitelist"], function (t) {
                var n = t.suggestionBlacklist || [],
                    r = t.suggestionWhitelist || [],
                    a = cjgShortcuts.findMatches(e);
                if (Array.isArray(a) && 0 !== a.length) {
                    var i = a.filter(function (e) {
                        return xe.indexOf(e) === -1 && n.indexOf(e) === -1
                    })[0];
                    i && (r.indexOf(i) !== -1 ? (De = Q(i, n, r), He.parentNode.insertBefore(De, He)) : (r.push(i), r.sort(), te.storage.local.set({
                        suggestionWhitelist: r
                    })))
                }
            })
        }
    }

    function $() {
        var e = document.createDocumentFragment();
        if (Oe) {
            var t = F();
            e.appendChild(t)
        }
        if (He = H(), e.appendChild(He), X(), Ie && (Be = R(), e.appendChild(Be)), Me) {
            var n = M();
            e.appendChild(n)
        }
        document.body.appendChild(e), _e ? (k(), setTimeout(k), setTimeout(k, 1e3), setTimeout(k, 4e3), te.runtime.onInstalled.addListener(N), te.runtime.onStartup.addListener(N), te.storage.onChanged.addListener(function (e, t) {
            "sync" === t && (e.userList && e.userList.newValue.join(",") === xe.join(",") || N())
        })) : (K(), ae && re && Z(0))
    }
    var ee, te = "undefined" != typeof chrome && chrome.runtime ? chrome : "undefined" != typeof browser && browser,
        ne = navigator.userAgent.toLowerCase(),
        re = ne.indexOf("chrome") !== -1 && ne.indexOf("opr") === -1,
        ae = navigator.platform.toLowerCase().indexOf("mac") !== -1,
        ie = ae ? "metaKey" : "ctrlKey",
        oe = te.runtime.getURL("").startsWith("moz-"),
        se = function () {
            var e = ["alg", "alc", "alf", "sfg"],
                t = window.location.search,
                n = t.indexOf("extch=") !== -1 && t.split("extch=")[1].split("&")[0];
            if (e.indexOf(n) !== -1) return n;
            var r = ["abekajjnoelgfclhinpadoipocjhjceh", "baohinapilmkigilbbbcccncoljkdpnd"];
            return r.indexOf(te.runtime.id) !== -1 ? "sfg" : oe ? "alf" : "alc"
        }(),
        ce = "sfg" === se,
        de = "alc" === se,
        le = "alg" === se,
        ue = ce,
        he = oe || ce,
        pe = !le,
        me = ce,
        ge = de || le,
        ve = ce,
        fe = !ce,
        we = le,
        be = 320,
        ye = window.location.search ? JSON.parse('{"' + window.location.search.substring(1).replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (e, t) {
            return "" === e ? t : decodeURIComponent(t)
        }) : {},
        Ce = {
            authuser: ye.authuser || null,
            pageId: ye.pageId || null
        },
        je = Ce.authuser && "0" !== Ce.authuser ? Ce.authuser : null,
        Ee = "marketplace-cache-" + Ce.pageId + "-" + Ce.authuser;
    ae && document.documentElement.classList.remove("cj-al--scrollbar");
    var _e = "1" === ye.embedded,
        Le = cjgShortcuts.list;
    Le[-2] = {
        u: "https://aprilfools.jeurissen.co",
        name: "April Fools",
        icon: "aprilfools"
    };
    var Se, xe, ke, Ne, Ae, Oe, Me, Ie, ze, We, Te, Ue, qe, Be, He, De, Pe, Ve, Re = !1,
        Fe = {
            "delete": "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
            close: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
            content_copy: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z",
            link: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z",
            search: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
            settings: "M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
        };
    Promise.all([c(), i()]).then($)
}();