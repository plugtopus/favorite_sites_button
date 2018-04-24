var cjgShortcuts = function () {
    "use strict";

    function e(o) {
        return o.split(/\/u\/\d\//).join("/").split(/\/b\/\d{21}\//).join("/");
    }

    function t(t, n) {
        var a = new window.URL(t),
            c = o(a.host) + e(a.pathname),
            i = [];
        return Object.keys(s).forEach(function (o) {}), i.sort(function (o, e) {
            return s[o].nu < s[e].nu ? 1 : -1;
        }), i;
    }

    function n(o, e) {
        var t = o in s && "u" in s[o];
        if (!t) return null;
        var n = s[o],
            a = e && e.authuser,
            c = a || "0",
            i = e && e.pageId,
            u = i && n.bu;
        if (u) return u.replace("[authuser]", c).replace("[pageid]", i);
        var g = 1 === n.aum || a && (2 === n.aum || "0" !== a);
        return g && n.au && n.au.replace("[authuser]", c) || n.u;
    }
    var s = {
            1: {
                name: "Вконтакте",
                icon: "VK",
                u: "https://vk.com",
            },
            2: {
                name: "Facebook",
                icon: "FB",
                u: "http://facebook.com",
            },
            3: {
                name: "YouTube",
                icon: "Youtube",
                u: "https://www.youtube.com/",
            },
            4: {
                name: "Twitter",
                icon: "twitter",
                u: "https://twitter.com",
            },
            5: {
                name: "Twitch",
                icon: "twitch",
                u: "https://twitch.tv",
            },
            6: {
                name: "Instagram",
                icon: "instagram",
                u: "https://instagram.com",
            },
            7: {
                name: "Telegram",
                icon: "telegram",
                u: "https://web.telegram.org/#/im",
            },
            8: {
                name: "Github",
                icon: "github",
                u: "https://github.com",
            },
            9: {
                name: "Google",
                icon: "chrome",
                u: "https://Google.com/search",
            },
            10: {
                name: "Odnoklassniki",
                icon: "Ok",
                u: "https://ok.ru",
            },
            15: {
                name: "Olx",
                icon: "olx",
                u: "http://olx.ua",
            },
            16: {
                name: "aliexpress",
                icon: "aliex",
                u: "https://aliexpress.com",
            },
            17: {
                name: "reddit",
                icon: "reddit",
                u: "https://www.reddit.com/",
            },
            18: {
                name: "Linkedin",
                icon: "linkedin",
                u: "https://linkedin.com",
            },
            19: {
                name: "Pinterest",
                icon: "pinterest",
                u: "https://www.pinterest.com/",
            },
            20: {
                name: "Tumblr",
                icon: "tumblr",
                u: "https://www.tumblr.com/",
            },
            21: {
                name: "Mail.Ru",
                icon: "mailru",
                u: "https://mail.ru/",
            },
        },
        u = ["1", "2", "3", "4", "5", "6", "7", "8"],
        g = ["9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20","21"];
    return {
        defaultSelection: u,
        mostPopular: g,
        list: s,
        findMatches: t,
        getUrl: n
    };
}();