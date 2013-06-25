/**
 * Timeago is a fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago")
 * library based on the jquery-timeago jQuery plugin.
 */
(function (factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        // Browser globals
        this.timeago = factory();
    }
}(function () {
    var timeago;

    function interpolate(locale, tpl, diff, number) {
        var string = typeof tpl === "function" ? tpl(number, diff) : tpl;
        var value = (locale.numbers && locale.numbers[number]) || number;
        return string.replace(/%d/i, value);
    }

    function trim(str) {
        return str.replace(/^\s+/, "").replace(/\s+$/, "");
    }

    var defaultLocale = {
        prefixAgo: null,
        prefixFromNow: null,
        suffixAgo: "ago",
        suffixFromNow: "from now",
        seconds: "less than a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years",
        wordSeparator: " ",
        numbers: []
    };

    function Timeago(locale) {
        this.locale = locale;

        for (var prop in defaultLocale) {
            if (typeof this.locale[prop] === "undefined") {
                this.locale[prop] = defaultLocale[prop];
            }
        }
    }

    Timeago.prototype = timeago = {
        locale: defaultLocale,
        locales: { en: defaultLocale },

        configure: function (locale) {
            var ta = new Timeago(locale || timeago.locales.en);
            return ta;
        },

        relative: function (date) {
            return this.inWords(new Date().getTime() - date.getTime());
        },

        inWords: function(msDiff) {
            var l = this.locale;
            var prefix = l.prefixAgo;
            var suffix = l.suffixAgo;

            if (msDiff < 0) {
                prefix = l.prefixFromNow;
                suffix = l.suffixFromNow;
            }

            var seconds = Math.abs(msDiff) / 1000;
            var minutes = seconds / 60;
            var hours = minutes / 60;
            var days = hours / 24;
            var years = days / 365;

            var words = seconds < 45 && interpolate(l, l.seconds, msDiff, Math.round(seconds)) ||
                    seconds < 90 && interpolate(l, l.minute, msDiff, 1) ||
                    minutes < 45 && interpolate(l, l.minutes, msDiff, Math.round(minutes)) ||
                    minutes < 90 && interpolate(l, l.hour, msDiff, 1) ||
                    hours < 24 && interpolate(l, l.hours, msDiff, Math.round(hours)) ||
                    hours < 42 && interpolate(l, l.day, msDiff, 1) ||
                    days < 30 && interpolate(l, l.days, msDiff, Math.round(days)) ||
                    days < 45 && interpolate(l, l.month, msDiff, 1) ||
                    days < 365 && interpolate(l, l.months, msDiff, Math.round(days / 30)) ||
                    years < 1.5 && interpolate(l, l.year, msDiff, 1) ||
                    interpolate(l, l.years, msDiff, Math.round(years));

            words = [prefix, words, suffix].join(
                typeof l.wordSeparator === "string" ? l.wordSeparator : ""
            );

            return trim(words);
        },

        parse: function(iso8601) {
            var s = trim(iso8601);
            s = s.replace(/\.\d+/,""); // remove milliseconds
            s = s.replace(/-/,"/").replace(/-/,"/");
            s = s.replace(/T/," ").replace(/Z/," UTC");
            s = s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
            return new Date(s);
        }
    };

    return timeago;
}));
