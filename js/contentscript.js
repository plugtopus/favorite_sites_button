! function () {
    "use strict";

    function e(e, t) {
        if (t < 320 && (t = 320), e < 150 && (e = 150), e !== h || t !== m) {
            m = t, h = e;
            var n = document.querySelector(".💙-s");
            n || (n = document.createElement("style"), n.className = "💙-s", document.head.appendChild(n)), n.textContent = ".💙-c>:not(.💙-i){display: none !important} .💙-c {height:" + e + "px !important;width:" + t + "px !important;}"
        }
    }

    function t() {
        if (!b) {
            b = !0;
            var e = ["embedded=1", "extch=alg"];
            y && e.push("newtab=1"), f && e.push("authuser=" + f), w && e.push("pageId=" + w), s.src = p + e.join("&"), s.setAttribute("style", "display: block !important; border: 0 !important; width: 100% !important; height: 100% !important; position: relative !important;")
        }
    }

    function n() {
        var e = document.documentElement.textContent,
            t = e.match(/\/u\/(\d)(\/b\/(\d{21}))?\/widget/);
        return null !== t ? (f = t[1], void("none" !== t[3] && (w = t[3]))) : (t = e.match(/accounts\.google\.com\/ListAccounts.{0,40}authuser=(\d)/), null !== t ? void(f = t[1]) : (t = e.match(/\/u\/(\d)\//), null !== t ? void(f = t[1]) : (t = e.match(/authuser=(\d)/), void(null !== t && (f = t[1])))))
    }

    function o() {
        u.classList.add("💙-c"), s = u.querySelector("iframe"), s || (s = document.createElement("iframe"), u.appendChild(s)), s.className = "💙-i"
    }

    function i() {
        r.runtime.sendMessage({
            cjLandingOpen: !0
        })
    }

    function a() {
        l = document.querySelector("#gbwa > div > a"), l.removeAttribute("href"), l.addEventListener("click", function () {
            i(), t(), s.contentWindow && setTimeout(function () {
                s.contentWindow.postMessage({
                    algOpenState: "none" !== window.getComputedStyle(u).display
                }, "*")
            })
        }), l.addEventListener("mouseenter", t)
    }

    function d() {
        if (u = document.querySelector('[class*="gb_"][role="region"]')) {
            e(532, 320), n(), o(), a();
            var i = "none" !== window.getComputedStyle(u).display;
            i && t()
        } else g += 1, 200 !== g && setTimeout(d, 20)
    }
    var r = "undefined" != typeof chrome && chrome.runtime ? chrome : "undefined" != typeof browser && browser,
        c = r && r.runtime && r.runtime.getURL && r.runtime.getURL("");
    c || (c = "chrome-extension://ponjkmladgjfjgllmhnkhgbgocdigcjm/");
    var u, l, s, m, h, p = c + "app.html?",
        g = 0,
        f = null,
        w = null,
        v = window.location.href,
        y = v.indexOf("/_/chrome/newtab") !== -1 || v.startsWith("chrome://newtab"),
        b = !1;
    window.addEventListener("message", function (t) {
        t.data.algClose && "none" !== window.getComputedStyle(u).display && l.click(), t.data.algHeight && e(t.data.algHeight, t.data.algWidth)
    }, !0), d()
}();