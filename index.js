
var extend = require('node.extend');

module.exports = function(bp, iebp) {

    return function(style, self) {

        var split = splitsuit(style, bp, iebp);

        extend(self, {
            ie: new self.constructor(split.ie),
            responsive: new self.constructor(split.responsive)
        });

    };

}

function splitsuit(style, bp, iebp) {

    if (style.obj) style = style.obj.stylesheet;

    if (!bp) bp = [,
        '(max-width: 25em)',
        '(min-width: 25em) and (max-width: 50em)',
        '(min-width: 50em)'
    ];

    if (!iebp) iebp = 2;

    var ws = /\n/g,
        respClass = /\.v([123])-/;

    var v = [{}, {}, {}, {}];

    style.rules.forEach(function(r, i) {
        if (r.selectors) r.selectors.forEach(function(s) {

            var n = (s.match(respClass) || [,0])[1];
            if (!v[n][i]) v[n][i] = [];
            v[n][i].push(s);

        });
    });

    return {
        ie: stylesheet(iebp),
        responsive: stylesheet()
    };

    function stylesheet(iebp) {

        return {
            stylesheet: compile(iebp)
        };

    }

    function compile(iebp) {

        var all = [];

        for (var n = 0; n < v.length; n++) {

            var vn = Object.keys(v[n]);

            if (!iebp && bp[n] && vn.length) {
                all.push(media(n));
            }

            if (!n || !bp[n] || iebp === n) vn.forEach(function(i) {
                all.push(rule(n, i));
            });

        }

        return {rules: all};

    }

    function media(n) {

        return {
            type: 'media',
            media: bp[n],
            rules: rules(n)
        };

    }

    function rules(n) {

        return Object.keys(v[n]).map(function(i) {
            return rule(n, i);
        });

    }

    function rule(n, i) {

        var r = extend(true, {}, style.rules[i]);
        r.selectors = v[n][i];
        return r;

    }

}
