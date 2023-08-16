/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * monaco-html version: 2.5.2(19e24b67beebe862bdc640bb0809aeb3e48c76ca)
 * Released under the MIT license
 * https://github.com/Microsoft/monaco-html/blob/master/LICENSE.md
 *-----------------------------------------------------------------------------*/
define("vscode-nls/vscode-nls", ["require", "exports"], function (e, t) {
  "use strict";
  function n(e, t) {
    for (var n, i, r = [], a = 2; a < arguments.length; a++)
      r[a - 2] = arguments[a];
    return (
      (n = t),
      0 === (i = r).length
        ? n
        : n.replace(/\{(\d+)\}/g, function (e, t) {
            var n = t[0];
            return void 0 !== i[n] ? i[n] : e;
          })
    );
  }
  function i(e) {
    return n;
  }
  Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.loadMessageBundle = i),
    (t.config = function (e) {
      return i;
    });
}),
  define("vscode-nls", ["vscode-nls/vscode-nls"], function (e) {
    return e;
  }),
  (function (e) {
    if ("object" == typeof module && "object" == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      "function" == typeof define &&
        define.amd &&
        define(
          "vscode-html-languageservice/htmlLanguageTypes",
          ["require", "exports"],
          e
        );
  })(function (e, t) {
    "use strict";
    var n, i, r;
    Object.defineProperty(t, "__esModule", { value: !0 }),
      ((n = t.SelectionRangeKind || (t.SelectionRangeKind = {})).Empty = ""),
      (n.Statement = "statement"),
      (n.Declaration = "declaration"),
      ((i = t.TokenType || (t.TokenType = {}))[(i.StartCommentTag = 0)] =
        "StartCommentTag"),
      (i[(i.Comment = 1)] = "Comment"),
      (i[(i.EndCommentTag = 2)] = "EndCommentTag"),
      (i[(i.StartTagOpen = 3)] = "StartTagOpen"),
      (i[(i.StartTagClose = 4)] = "StartTagClose"),
      (i[(i.StartTagSelfClose = 5)] = "StartTagSelfClose"),
      (i[(i.StartTag = 6)] = "StartTag"),
      (i[(i.EndTagOpen = 7)] = "EndTagOpen"),
      (i[(i.EndTagClose = 8)] = "EndTagClose"),
      (i[(i.EndTag = 9)] = "EndTag"),
      (i[(i.DelimiterAssign = 10)] = "DelimiterAssign"),
      (i[(i.AttributeName = 11)] = "AttributeName"),
      (i[(i.AttributeValue = 12)] = "AttributeValue"),
      (i[(i.StartDoctypeTag = 13)] = "StartDoctypeTag"),
      (i[(i.Doctype = 14)] = "Doctype"),
      (i[(i.EndDoctypeTag = 15)] = "EndDoctypeTag"),
      (i[(i.Content = 16)] = "Content"),
      (i[(i.Whitespace = 17)] = "Whitespace"),
      (i[(i.Unknown = 18)] = "Unknown"),
      (i[(i.Script = 19)] = "Script"),
      (i[(i.Styles = 20)] = "Styles"),
      (i[(i.EOS = 21)] = "EOS"),
      ((r = t.ScannerState || (t.ScannerState = {}))[(r.WithinContent = 0)] =
        "WithinContent"),
      (r[(r.AfterOpeningStartTag = 1)] = "AfterOpeningStartTag"),
      (r[(r.AfterOpeningEndTag = 2)] = "AfterOpeningEndTag"),
      (r[(r.WithinDoctype = 3)] = "WithinDoctype"),
      (r[(r.WithinTag = 4)] = "WithinTag"),
      (r[(r.WithinEndTag = 5)] = "WithinEndTag"),
      (r[(r.WithinComment = 6)] = "WithinComment"),
      (r[(r.WithinScriptContent = 7)] = "WithinScriptContent"),
      (r[(r.WithinStyleContent = 8)] = "WithinStyleContent"),
      (r[(r.AfterAttributeName = 9)] = "AfterAttributeName"),
      (r[(r.BeforeAttributeValue = 10)] = "BeforeAttributeValue");
  }),
  (function (e) {
    if ("object" == typeof module && "object" == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      "function" == typeof define &&
        define.amd &&
        define(
          "vscode-html-languageservice/parser/htmlScanner",
          ["require", "exports", "vscode-nls", "../htmlLanguageTypes"],
          e
        );
  })(function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var n = e("vscode-nls"),
      g = e("../htmlLanguageTypes"),
      _ = n.loadMessageBundle(),
      o = (function () {
        function e(e, t) {
          (this.source = e), (this.len = e.length), (this.position = t);
        }
        return (
          (e.prototype.eos = function () {
            return this.len <= this.position;
          }),
          (e.prototype.getSource = function () {
            return this.source;
          }),
          (e.prototype.pos = function () {
            return this.position;
          }),
          (e.prototype.goBackTo = function (e) {
            this.position = e;
          }),
          (e.prototype.goBack = function (e) {
            this.position -= e;
          }),
          (e.prototype.advance = function (e) {
            this.position += e;
          }),
          (e.prototype.goToEnd = function () {
            this.position = this.source.length;
          }),
          (e.prototype.nextChar = function () {
            return this.source.charCodeAt(this.position++) || 0;
          }),
          (e.prototype.peekChar = function (e) {
            return (
              void 0 === e && (e = 0),
              this.source.charCodeAt(this.position + e) || 0
            );
          }),
          (e.prototype.advanceIfChar = function (e) {
            return (
              e === this.source.charCodeAt(this.position) &&
              (this.position++, !0)
            );
          }),
          (e.prototype.advanceIfChars = function (e) {
            var t;
            if (this.position + e.length > this.source.length) return !1;
            for (t = 0; t < e.length; t++)
              if (this.source.charCodeAt(this.position + t) !== e[t]) return !1;
            return this.advance(t), !0;
          }),
          (e.prototype.advanceIfRegExp = function (e) {
            var t = this.source.substr(this.position).match(e);
            return t
              ? ((this.position = this.position + t.index + t[0].length), t[0])
              : "";
          }),
          (e.prototype.advanceUntilRegExp = function (e) {
            var t = this.source.substr(this.position).match(e);
            return t
              ? ((this.position = this.position + t.index), t[0])
              : (this.goToEnd(), "");
          }),
          (e.prototype.advanceUntilChar = function (e) {
            for (; this.position < this.source.length; ) {
              if (this.source.charCodeAt(this.position) === e) return !0;
              this.advance(1);
            }
            return !1;
          }),
          (e.prototype.advanceUntilChars = function (e) {
            for (; this.position + e.length <= this.source.length; ) {
              for (
                var t = 0;
                t < e.length &&
                this.source.charCodeAt(this.position + t) === e[t];
                t++
              );
              if (t === e.length) return !0;
              this.advance(1);
            }
            return this.goToEnd(), !1;
          }),
          (e.prototype.skipWhitespace = function () {
            return (
              0 <
              this.advanceWhileChar(function (e) {
                return e === s || e === l || e === i || e === a || e === r;
              })
            );
          }),
          (e.prototype.advanceWhileChar = function (e) {
            for (
              var t = this.position;
              this.position < this.len &&
              e(this.source.charCodeAt(this.position));

            )
              this.position++;
            return this.position - t;
          }),
          e
        );
      })(),
      b = "!".charCodeAt(0),
      v = "-".charCodeAt(0),
      y = "<".charCodeAt(0),
      w = ">".charCodeAt(0),
      T = "/".charCodeAt(0),
      S = "=".charCodeAt(0),
      x = '"'.charCodeAt(0),
      k = "'".charCodeAt(0),
      i = "\n".charCodeAt(0),
      r = "\r".charCodeAt(0),
      a = "\f".charCodeAt(0),
      s = " ".charCodeAt(0),
      l = "\t".charCodeAt(0),
      E = { "text/x-handlebars-template": !0 };
    t.createScanner = function (e, t, n) {
      void 0 === t && (t = 0),
        void 0 === n && (n = g.ScannerState.WithinContent);
      var i,
        l,
        c,
        h,
        d,
        u = new o(e, t),
        p = n,
        r = 0,
        a = g.TokenType.Unknown;
      function m() {
        return u.advanceIfRegExp(/^[_:\w][_:\w-.\d]*/).toLowerCase();
      }
      function f(e, t, n) {
        return (r = e), (i = n), (a = t);
      }
      return {
        scan: function () {
          var e = u.pos(),
            t = p,
            n = (function e() {
              var t,
                n = u.pos();
              if (u.eos()) return f(n, g.TokenType.EOS);
              switch (p) {
                case g.ScannerState.WithinComment:
                  return u.advanceIfChars([v, v, w])
                    ? ((p = g.ScannerState.WithinContent),
                      f(n, g.TokenType.EndCommentTag))
                    : (u.advanceUntilChars([v, v, w]),
                      f(n, g.TokenType.Comment));
                case g.ScannerState.WithinDoctype:
                  return u.advanceIfChar(w)
                    ? ((p = g.ScannerState.WithinContent),
                      f(n, g.TokenType.EndDoctypeTag))
                    : (u.advanceUntilChar(w), f(n, g.TokenType.Doctype));
                case g.ScannerState.WithinContent:
                  if (u.advanceIfChar(y)) {
                    if (!u.eos() && u.peekChar() === b) {
                      if (u.advanceIfChars([b, v, v]))
                        return (
                          (p = g.ScannerState.WithinComment),
                          f(n, g.TokenType.StartCommentTag)
                        );
                      if (u.advanceIfRegExp(/^!doctype/i))
                        return (
                          (p = g.ScannerState.WithinDoctype),
                          f(n, g.TokenType.StartDoctypeTag)
                        );
                    }
                    return u.advanceIfChar(T)
                      ? ((p = g.ScannerState.AfterOpeningEndTag),
                        f(n, g.TokenType.EndTagOpen))
                      : ((p = g.ScannerState.AfterOpeningStartTag),
                        f(n, g.TokenType.StartTagOpen));
                  }
                  return u.advanceUntilChar(y), f(n, g.TokenType.Content);
                case g.ScannerState.AfterOpeningEndTag:
                  var i = m();
                  return 0 < i.length
                    ? ((p = g.ScannerState.WithinEndTag),
                      f(n, g.TokenType.EndTag))
                    : u.skipWhitespace()
                    ? f(
                        n,
                        g.TokenType.Whitespace,
                        _(
                          "error.unexpectedWhitespace",
                          "Tag name must directly follow the open bracket."
                        )
                      )
                    : ((p = g.ScannerState.WithinEndTag),
                      u.advanceUntilChar(w),
                      n < u.pos()
                        ? f(
                            n,
                            g.TokenType.Unknown,
                            _(
                              "error.endTagNameExpected",
                              "End tag name expected."
                            )
                          )
                        : e());
                case g.ScannerState.WithinEndTag:
                  if (u.skipWhitespace()) return f(n, g.TokenType.Whitespace);
                  if (u.advanceIfChar(w))
                    return (
                      (p = g.ScannerState.WithinContent),
                      f(n, g.TokenType.EndTagClose)
                    );
                  t = _("error.tagNameExpected", "Closing bracket expected.");
                  break;
                case g.ScannerState.AfterOpeningStartTag:
                  return (
                    (c = m()),
                    (h = d = void 0),
                    0 < c.length
                      ? ((l = !1),
                        (p = g.ScannerState.WithinTag),
                        f(n, g.TokenType.StartTag))
                      : u.skipWhitespace()
                      ? f(
                          n,
                          g.TokenType.Whitespace,
                          _(
                            "error.unexpectedWhitespace",
                            "Tag name must directly follow the open bracket."
                          )
                        )
                      : ((p = g.ScannerState.WithinTag),
                        u.advanceUntilChar(w),
                        n < u.pos()
                          ? f(
                              n,
                              g.TokenType.Unknown,
                              _(
                                "error.startTagNameExpected",
                                "Start tag name expected."
                              )
                            )
                          : e())
                  );
                case g.ScannerState.WithinTag:
                  return u.skipWhitespace()
                    ? ((l = !0), f(n, g.TokenType.Whitespace))
                    : l &&
                      0 <
                        (h = u
                          .advanceIfRegExp(/^[^\s"'>/=\x00-\x0F\x7F\x80-\x9F]*/)
                          .toLowerCase()).length
                    ? ((p = g.ScannerState.AfterAttributeName),
                      (l = !1),
                      f(n, g.TokenType.AttributeName))
                    : u.advanceIfChars([T, w])
                    ? ((p = g.ScannerState.WithinContent),
                      f(n, g.TokenType.StartTagSelfClose))
                    : u.advanceIfChar(w)
                    ? ((p =
                        "script" === c
                          ? d && E[d]
                            ? g.ScannerState.WithinContent
                            : g.ScannerState.WithinScriptContent
                          : "style" === c
                          ? g.ScannerState.WithinStyleContent
                          : g.ScannerState.WithinContent),
                      f(n, g.TokenType.StartTagClose))
                    : (u.advance(1),
                      f(
                        n,
                        g.TokenType.Unknown,
                        _(
                          "error.unexpectedCharacterInTag",
                          "Unexpected character in tag."
                        )
                      ));
                case g.ScannerState.AfterAttributeName:
                  return u.skipWhitespace()
                    ? ((l = !0), f(n, g.TokenType.Whitespace))
                    : u.advanceIfChar(S)
                    ? ((p = g.ScannerState.BeforeAttributeValue),
                      f(n, g.TokenType.DelimiterAssign))
                    : ((p = g.ScannerState.WithinTag), e());
                case g.ScannerState.BeforeAttributeValue:
                  if (u.skipWhitespace()) return f(n, g.TokenType.Whitespace);
                  var r = u.advanceIfRegExp(/^[^\s"'`=<>\/]+/);
                  if (0 < r.length)
                    return (
                      "type" === h && (d = r),
                      (p = g.ScannerState.WithinTag),
                      (l = !1),
                      f(n, g.TokenType.AttributeValue)
                    );
                  var a = u.peekChar();
                  return a === k || a === x
                    ? (u.advance(1),
                      u.advanceUntilChar(a) && u.advance(1),
                      "type" === h &&
                        (d = u.getSource().substring(n + 1, u.pos() - 1)),
                      (p = g.ScannerState.WithinTag),
                      (l = !1),
                      f(n, g.TokenType.AttributeValue))
                    : ((p = g.ScannerState.WithinTag), (l = !1), e());
                case g.ScannerState.WithinScriptContent:
                  for (var o = 1; !u.eos(); ) {
                    var s = u.advanceIfRegExp(/<!--|-->|<\/?script\s*\/?>?/i);
                    if (0 === s.length)
                      return u.goToEnd(), f(n, g.TokenType.Script);
                    if ("\x3c!--" === s) 1 === o && (o = 2);
                    else if ("--\x3e" === s) o = 1;
                    else if ("/" !== s[1]) 2 === o && (o = 3);
                    else {
                      if (3 !== o) {
                        u.goBack(s.length);
                        break;
                      }
                      o = 2;
                    }
                  }
                  return (
                    (p = g.ScannerState.WithinContent),
                    n < u.pos() ? f(n, g.TokenType.Script) : e()
                  );
                case g.ScannerState.WithinStyleContent:
                  return (
                    u.advanceUntilRegExp(/<\/style/i),
                    (p = g.ScannerState.WithinContent),
                    n < u.pos() ? f(n, g.TokenType.Styles) : e()
                  );
              }
              return (
                u.advance(1),
                (p = g.ScannerState.WithinContent),
                f(n, g.TokenType.Unknown, t)
              );
            })();
          return n !== g.TokenType.EOS && e === u.pos()
            ? (console.log(
                "Scanner.scan has not advanced at offset " +
                  e +
                  ", state before: " +
                  t +
                  " after: " +
                  p
              ),
              u.advance(1),
              f(e, g.TokenType.Unknown))
            : n;
        },
        getTokenType: function () {
          return a;
        },
        getTokenOffset: function () {
          return r;
        },
        getTokenLength: function () {
          return u.pos() - r;
        },
        getTokenEnd: function () {
          return u.pos();
        },
        getTokenText: function () {
          return u.getSource().substring(r, u.pos());
        },
        getScannerState: function () {
          return p;
        },
        getTokenError: function () {
          return i;
        },
      };
    };
  }),
  (function (e) {
    if ("object" == typeof module && "object" == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      "function" == typeof define &&
        define.amd &&
        define(
          "vscode-html-languageservice/utils/arrays",
          ["require", "exports"],
          e
        );
  })(function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.findFirst = function (e, t) {
        var n = 0,
          i = e.length;
        if (0 === i) return 0;
        for (; n < i; ) {
          var r = Math.floor((n + i) / 2);
          t(e[r]) ? (i = r) : (n = r + 1);
        }
        return n;
      }),
      (t.binarySearch = function (e, t, n) {
        for (var i = 0, r = e.length - 1; i <= r; ) {
          var a = ((i + r) / 2) | 0,
            o = n(e[a], t);
          if (o < 0) i = a + 1;
          else {
            if (!(0 < o)) return a;
            r = a - 1;
          }
        }
        return -(i + 1);
      });
  }),
  (function (e) {
    if ("object" == typeof module && "object" == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      "function" == typeof define &&
        define.amd &&
        define(
          "vscode-html-languageservice/languageFacts/fact",
          ["require", "exports", "../utils/arrays"],
          e
        );
  })(function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var n = e("../utils/arrays");
    (t.VOID_ELEMENTS = [
      "area",
      "base",
      "br",
      "col",
      "embed",
      "hr",
      "img",
      "input",
      "keygen",
      "link",
      "menuitem",
      "meta",
      "param",
      "source",
      "track",
      "wbr",
    ]),
      (t.isVoidElement = function (e) {
        return (
          !!e &&
          0 <=
            n.binarySearch(t.VOID_ELEMENTS, e.toLowerCase(), function (e, t) {
              return e.localeCompare(t);
            })
        );
      });
  }),
  (function (e) {
    if ("object" == typeof module && "object" == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      "function" == typeof define &&
        define.amd &&
        define(
          "vscode-html-languageservice/parser/htmlParser",
          [
            "require",
            "exports",
            "./htmlScanner",
            "../utils/arrays",
            "../htmlLanguageTypes",
            "../languageFacts/fact",
          ],
          e
        );
  })(function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var u = e("./htmlScanner"),
      r = e("../utils/arrays"),
      p = e("../htmlLanguageTypes"),
      m = e("../languageFacts/fact"),
      f = (function () {
        function e(e, t, n, i) {
          (this.start = e),
            (this.end = t),
            (this.children = n),
            (this.parent = i),
            (this.closed = !1);
        }
        return (
          Object.defineProperty(e.prototype, "attributeNames", {
            get: function () {
              return this.attributes ? Object.keys(this.attributes) : [];
            },
            enumerable: !0,
            configurable: !0,
          }),
          (e.prototype.isSameTag = function (e) {
            return (
              this.tag &&
              e &&
              this.tag.length === e.length &&
              this.tag.toLowerCase() === e
            );
          }),
          Object.defineProperty(e.prototype, "firstChild", {
            get: function () {
              return this.children[0];
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, "lastChild", {
            get: function () {
              return this.children.length
                ? this.children[this.children.length - 1]
                : void 0;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (e.prototype.findNodeBefore = function (t) {
            var e =
              r.findFirst(this.children, function (e) {
                return t <= e.start;
              }) - 1;
            if (0 <= e) {
              var n = this.children[e];
              if (t > n.start) {
                if (t < n.end) return n.findNodeBefore(t);
                var i = n.lastChild;
                return i && i.end === n.end ? n.findNodeBefore(t) : n;
              }
            }
            return this;
          }),
          (e.prototype.findNodeAt = function (t) {
            var e =
              r.findFirst(this.children, function (e) {
                return t <= e.start;
              }) - 1;
            if (0 <= e) {
              var n = this.children[e];
              if (t > n.start && t <= n.end) return n.findNodeAt(t);
            }
            return this;
          }),
          e
        );
      })();
    (t.Node = f),
      (t.parse = function (e) {
        for (
          var t = u.createScanner(e),
            n = new f(0, e.length, [], void 0),
            i = n,
            r = -1,
            a = null,
            o = null,
            s = t.scan();
          s !== p.TokenType.EOS;

        ) {
          switch (s) {
            case p.TokenType.StartTagOpen:
              var l = new f(t.getTokenOffset(), e.length, [], i);
              i.children.push(l), (i = l);
              break;
            case p.TokenType.StartTag:
              i.tag = t.getTokenText();
              break;
            case p.TokenType.StartTagClose:
              (i.end = t.getTokenEnd()),
                (i.startTagEnd = t.getTokenEnd()),
                i.tag &&
                  m.isVoidElement(i.tag) &&
                  i.parent &&
                  ((i.closed = !0), (i = i.parent));
              break;
            case p.TokenType.StartTagSelfClose:
              i.parent &&
                ((i.closed = !0),
                (i.end = t.getTokenEnd()),
                (i.startTagEnd = t.getTokenEnd()),
                (i = i.parent));
              break;
            case p.TokenType.EndTagOpen:
              (r = t.getTokenOffset()), (a = null);
              break;
            case p.TokenType.EndTag:
              a = t.getTokenText().toLowerCase();
              break;
            case p.TokenType.EndTagClose:
              if (a) {
                for (var c = i; !c.isSameTag(a) && c.parent; ) c = c.parent;
                if (c.parent) {
                  for (; i !== c; )
                    (i.end = r), (i.closed = !1), (i = i.parent);
                  (i.closed = !0),
                    (i.endTagStart = r),
                    (i.end = t.getTokenEnd()),
                    (i = i.parent);
                }
              }
              break;
            case p.TokenType.AttributeName:
              (o = t.getTokenText()),
                (h = i.attributes) || (i.attributes = h = {}),
                (h[o] = null);
              break;
            case p.TokenType.AttributeValue:
              var h,
                d = t.getTokenText();
              (h = i.attributes) && o && ((h[o] = d), (o = null));
          }
          s = t.scan();
        }
        for (; i.parent; ) (i.end = e.length), (i.closed = !1), (i = i.parent);
        return {
          roots: n.children,
          findNodeBefore: n.findNodeBefore.bind(n),
          findNodeAt: n.findNodeAt.bind(n),
        };
      });
  }),
  (function (e) {
    if ("object" == typeof module && "object" == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      "function" == typeof define &&
        define.amd &&
        define("vscode-languageserver-types/main", ["require", "exports"], e);
  })(function (e, t) {
    "use strict";
    var o,
      n,
      i,
      r,
      a,
      s,
      l,
      c,
      h,
      d,
      u,
      p,
      m,
      f,
      g,
      _,
      b,
      v,
      y,
      w,
      T,
      S,
      x,
      k,
      E,
      L,
      C,
      A,
      I,
      U,
      M;
    Object.defineProperty(t, "__esModule", { value: !0 }),
      ((n = o = t.Position || (t.Position = {})).create = function (e, t) {
        return { line: e, character: t };
      }),
      (n.is = function (e) {
        var t = e;
        return (
          oe.objectLiteral(t) && oe.number(t.line) && oe.number(t.character)
        );
      }),
      ((r = i = t.Range || (t.Range = {})).create = function (e, t, n, i) {
        if (oe.number(e) && oe.number(t) && oe.number(n) && oe.number(i))
          return { start: o.create(e, t), end: o.create(n, i) };
        if (o.is(e) && o.is(t)) return { start: e, end: t };
        throw new Error(
          "Range#create called with invalid arguments[" +
            e +
            ", " +
            t +
            ", " +
            n +
            ", " +
            i +
            "]"
        );
      }),
      (r.is = function (e) {
        var t = e;
        return oe.objectLiteral(t) && o.is(t.start) && o.is(t.end);
      }),
      ((s = a = t.Location || (t.Location = {})).create = function (e, t) {
        return { uri: e, range: t };
      }),
      (s.is = function (e) {
        var t = e;
        return (
          oe.defined(t) &&
          i.is(t.range) &&
          (oe.string(t.uri) || oe.undefined(t.uri))
        );
      }),
      ((l = t.LocationLink || (t.LocationLink = {})).create = function (
        e,
        t,
        n,
        i
      ) {
        return {
          targetUri: e,
          targetRange: t,
          targetSelectionRange: n,
          originSelectionRange: i,
        };
      }),
      (l.is = function (e) {
        var t = e;
        return (
          oe.defined(t) &&
          i.is(t.targetRange) &&
          oe.string(t.targetUri) &&
          (i.is(t.targetSelectionRange) ||
            oe.undefined(t.targetSelectionRange)) &&
          (i.is(t.originSelectionRange) || oe.undefined(t.originSelectionRange))
        );
      }),
      ((h = c = t.Color || (t.Color = {})).create = function (e, t, n, i) {
        return { red: e, green: t, blue: n, alpha: i };
      }),
      (h.is = function (e) {
        var t = e;
        return (
          oe.number(t.red) &&
          oe.number(t.green) &&
          oe.number(t.blue) &&
          oe.number(t.alpha)
        );
      }),
      ((d = t.ColorInformation || (t.ColorInformation = {})).create = function (
        e,
        t
      ) {
        return { range: e, color: t };
      }),
      (d.is = function (e) {
        var t = e;
        return i.is(t.range) && c.is(t.color);
      }),
      ((u = t.ColorPresentation || (t.ColorPresentation = {})).create =
        function (e, t, n) {
          return { label: e, textEdit: t, additionalTextEdits: n };
        }),
      (u.is = function (e) {
        var t = e;
        return (
          oe.string(t.label) &&
          (oe.undefined(t.textEdit) || T.is(t)) &&
          (oe.undefined(t.additionalTextEdits) ||
            oe.typedArray(t.additionalTextEdits, T.is))
        );
      }),
      ((p = t.FoldingRangeKind || (t.FoldingRangeKind = {})).Comment =
        "comment"),
      (p.Imports = "imports"),
      (p.Region = "region"),
      ((m = t.FoldingRange || (t.FoldingRange = {})).create = function (
        e,
        t,
        n,
        i,
        r
      ) {
        var a = { startLine: e, endLine: t };
        return (
          oe.defined(n) && (a.startCharacter = n),
          oe.defined(i) && (a.endCharacter = i),
          oe.defined(r) && (a.kind = r),
          a
        );
      }),
      (m.is = function (e) {
        var t = e;
        return (
          oe.number(t.startLine) &&
          oe.number(t.startLine) &&
          (oe.undefined(t.startCharacter) || oe.number(t.startCharacter)) &&
          (oe.undefined(t.endCharacter) || oe.number(t.endCharacter)) &&
          (oe.undefined(t.kind) || oe.string(t.kind))
        );
      }),
      ((g = f =
        t.DiagnosticRelatedInformation ||
        (t.DiagnosticRelatedInformation = {})).create = function (e, t) {
        return { location: e, message: t };
      }),
      (g.is = function (e) {
        var t = e;
        return oe.defined(t) && a.is(t.location) && oe.string(t.message);
      }),
      ((_ = t.DiagnosticSeverity || (t.DiagnosticSeverity = {})).Error = 1),
      (_.Warning = 2),
      (_.Information = 3),
      (_.Hint = 4),
      ((v = b = t.Diagnostic || (t.Diagnostic = {})).create = function (
        e,
        t,
        n,
        i,
        r,
        a
      ) {
        var o = { range: e, message: t };
        return (
          oe.defined(n) && (o.severity = n),
          oe.defined(i) && (o.code = i),
          oe.defined(r) && (o.source = r),
          oe.defined(a) && (o.relatedInformation = a),
          o
        );
      }),
      (v.is = function (e) {
        var t = e;
        return (
          oe.defined(t) &&
          i.is(t.range) &&
          oe.string(t.message) &&
          (oe.number(t.severity) || oe.undefined(t.severity)) &&
          (oe.number(t.code) || oe.string(t.code) || oe.undefined(t.code)) &&
          (oe.string(t.source) || oe.undefined(t.source)) &&
          (oe.undefined(t.relatedInformation) ||
            oe.typedArray(t.relatedInformation, f.is))
        );
      }),
      ((w = y = t.Command || (t.Command = {})).create = function (e, t) {
        for (var n = [], i = 2; i < arguments.length; i++)
          n[i - 2] = arguments[i];
        var r = { title: e, command: t };
        return oe.defined(n) && 0 < n.length && (r.arguments = n), r;
      }),
      (w.is = function (e) {
        var t = e;
        return oe.defined(t) && oe.string(t.title) && oe.string(t.command);
      }),
      ((S = T = t.TextEdit || (t.TextEdit = {})).replace = function (e, t) {
        return { range: e, newText: t };
      }),
      (S.insert = function (e, t) {
        return { range: { start: e, end: e }, newText: t };
      }),
      (S.del = function (e) {
        return { range: e, newText: "" };
      }),
      (S.is = function (e) {
        var t = e;
        return oe.objectLiteral(t) && oe.string(t.newText) && i.is(t.range);
      }),
      ((k = x = t.TextDocumentEdit || (t.TextDocumentEdit = {})).create =
        function (e, t) {
          return { textDocument: e, edits: t };
        }),
      (k.is = function (e) {
        var t = e;
        return oe.defined(t) && q.is(t.textDocument) && Array.isArray(t.edits);
      }),
      ((L = E = t.CreateFile || (t.CreateFile = {})).create = function (e, t) {
        var n = { kind: "create", uri: e };
        return (
          void 0 === t ||
            (void 0 === t.overwrite && void 0 === t.ignoreIfExists) ||
            (n.options = t),
          n
        );
      }),
      (L.is = function (e) {
        var t = e;
        return (
          t &&
          "create" === t.kind &&
          oe.string(t.uri) &&
          (void 0 === t.options ||
            ((void 0 === t.options.overwrite ||
              oe.boolean(t.options.overwrite)) &&
              (void 0 === t.options.ignoreIfExists ||
                oe.boolean(t.options.ignoreIfExists))))
        );
      }),
      ((A = C = t.RenameFile || (t.RenameFile = {})).create = function (
        e,
        t,
        n
      ) {
        var i = { kind: "rename", oldUri: e, newUri: t };
        return (
          void 0 === n ||
            (void 0 === n.overwrite && void 0 === n.ignoreIfExists) ||
            (i.options = n),
          i
        );
      }),
      (A.is = function (e) {
        var t = e;
        return (
          t &&
          "rename" === t.kind &&
          oe.string(t.oldUri) &&
          oe.string(t.newUri) &&
          (void 0 === t.options ||
            ((void 0 === t.options.overwrite ||
              oe.boolean(t.options.overwrite)) &&
              (void 0 === t.options.ignoreIfExists ||
                oe.boolean(t.options.ignoreIfExists))))
        );
      }),
      ((U = I = t.DeleteFile || (t.DeleteFile = {})).create = function (e, t) {
        var n = { kind: "delete", uri: e };
        return (
          void 0 === t ||
            (void 0 === t.recursive && void 0 === t.ignoreIfNotExists) ||
            (n.options = t),
          n
        );
      }),
      (U.is = function (e) {
        var t = e;
        return (
          t &&
          "delete" === t.kind &&
          oe.string(t.uri) &&
          (void 0 === t.options ||
            ((void 0 === t.options.recursive ||
              oe.boolean(t.options.recursive)) &&
              (void 0 === t.options.ignoreIfNotExists ||
                oe.boolean(t.options.ignoreIfNotExists))))
        );
      }),
      ((M = t.WorkspaceEdit || (t.WorkspaceEdit = {})).is = function (e) {
        var t = e;
        return (
          t &&
          (void 0 !== t.changes || void 0 !== t.documentChanges) &&
          (void 0 === t.documentChanges ||
            t.documentChanges.every(function (e) {
              return oe.string(e.kind)
                ? E.is(e) || C.is(e) || I.is(e)
                : x.is(e);
            }))
        );
      });
    var H,
      q,
      O,
      D,
      P,
      R,
      W,
      j,
      N,
      z,
      F,
      B,
      V,
      G,
      K = (function () {
        function e(e) {
          this.edits = e;
        }
        return (
          (e.prototype.insert = function (e, t) {
            this.edits.push(T.insert(e, t));
          }),
          (e.prototype.replace = function (e, t) {
            this.edits.push(T.replace(e, t));
          }),
          (e.prototype.delete = function (e) {
            this.edits.push(T.del(e));
          }),
          (e.prototype.add = function (e) {
            this.edits.push(e);
          }),
          (e.prototype.all = function () {
            return this.edits;
          }),
          (e.prototype.clear = function () {
            this.edits.splice(0, this.edits.length);
          }),
          e
        );
      })(),
      J = (function () {
        function e(n) {
          var i = this;
          (this._textEditChanges = Object.create(null)),
            n &&
              ((this._workspaceEdit = n).documentChanges
                ? n.documentChanges.forEach(function (e) {
                    if (x.is(e)) {
                      var t = new K(e.edits);
                      i._textEditChanges[e.textDocument.uri] = t;
                    }
                  })
                : n.changes &&
                  Object.keys(n.changes).forEach(function (e) {
                    var t = new K(n.changes[e]);
                    i._textEditChanges[e] = t;
                  }));
        }
        return (
          Object.defineProperty(e.prototype, "edit", {
            get: function () {
              return this._workspaceEdit;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (e.prototype.getTextEditChange = function (e) {
            if (q.is(e)) {
              if (
                (this._workspaceEdit ||
                  (this._workspaceEdit = { documentChanges: [] }),
                !this._workspaceEdit.documentChanges)
              )
                throw new Error(
                  "Workspace edit is not configured for document changes."
                );
              var t = e;
              if (!(i = this._textEditChanges[t.uri])) {
                var n = { textDocument: t, edits: (r = []) };
                this._workspaceEdit.documentChanges.push(n),
                  (i = new K(r)),
                  (this._textEditChanges[t.uri] = i);
              }
              return i;
            }
            if (
              (this._workspaceEdit ||
                (this._workspaceEdit = { changes: Object.create(null) }),
              !this._workspaceEdit.changes)
            )
              throw new Error(
                "Workspace edit is not configured for normal text edit changes."
              );
            var i;
            if (!(i = this._textEditChanges[e])) {
              var r = [];
              (this._workspaceEdit.changes[e] = r),
                (i = new K(r)),
                (this._textEditChanges[e] = i);
            }
            return i;
          }),
          (e.prototype.createFile = function (e, t) {
            this.checkDocumentChanges(),
              this._workspaceEdit.documentChanges.push(E.create(e, t));
          }),
          (e.prototype.renameFile = function (e, t, n) {
            this.checkDocumentChanges(),
              this._workspaceEdit.documentChanges.push(C.create(e, t, n));
          }),
          (e.prototype.deleteFile = function (e, t) {
            this.checkDocumentChanges(),
              this._workspaceEdit.documentChanges.push(I.create(e, t));
          }),
          (e.prototype.checkDocumentChanges = function () {
            if (!this._workspaceEdit || !this._workspaceEdit.documentChanges)
              throw new Error(
                "Workspace edit is not configured for document changes."
              );
          }),
          e
        );
      })();
    (t.WorkspaceChange = J),
      ((H =
        t.TextDocumentIdentifier || (t.TextDocumentIdentifier = {})).create =
        function (e) {
          return { uri: e };
        }),
      (H.is = function (e) {
        var t = e;
        return oe.defined(t) && oe.string(t.uri);
      }),
      ((O = q =
        t.VersionedTextDocumentIdentifier ||
        (t.VersionedTextDocumentIdentifier = {})).create = function (e, t) {
        return { uri: e, version: t };
      }),
      (O.is = function (e) {
        var t = e;
        return (
          oe.defined(t) &&
          oe.string(t.uri) &&
          (null === t.version || oe.number(t.version))
        );
      }),
      ((D = t.TextDocumentItem || (t.TextDocumentItem = {})).create = function (
        e,
        t,
        n,
        i
      ) {
        return { uri: e, languageId: t, version: n, text: i };
      }),
      (D.is = function (e) {
        var t = e;
        return (
          oe.defined(t) &&
          oe.string(t.uri) &&
          oe.string(t.languageId) &&
          oe.number(t.version) &&
          oe.string(t.text)
        );
      }),
      ((R = P = t.MarkupKind || (t.MarkupKind = {})).PlainText = "plaintext"),
      (R.Markdown = "markdown"),
      ((W = P = t.MarkupKind || (t.MarkupKind = {})).is = function (e) {
        var t = e;
        return t === W.PlainText || t === W.Markdown;
      }),
      ((j = t.MarkupContent || (t.MarkupContent = {})).is = function (e) {
        var t = e;
        return oe.objectLiteral(e) && P.is(t.kind) && oe.string(t.value);
      }),
      ((N = t.CompletionItemKind || (t.CompletionItemKind = {})).Text = 1),
      (N.Method = 2),
      (N.Function = 3),
      (N.Constructor = 4),
      (N.Field = 5),
      (N.Variable = 6),
      (N.Class = 7),
      (N.Interface = 8),
      (N.Module = 9),
      (N.Property = 10),
      (N.Unit = 11),
      (N.Value = 12),
      (N.Enum = 13),
      (N.Keyword = 14),
      (N.Snippet = 15),
      (N.Color = 16),
      (N.File = 17),
      (N.Reference = 18),
      (N.Folder = 19),
      (N.EnumMember = 20),
      (N.Constant = 21),
      (N.Struct = 22),
      (N.Event = 23),
      (N.Operator = 24),
      (N.TypeParameter = 25),
      ((z = t.InsertTextFormat || (t.InsertTextFormat = {})).PlainText = 1),
      (z.Snippet = 2),
      ((t.CompletionItem || (t.CompletionItem = {})).create = function (e) {
        return { label: e };
      }),
      ((t.CompletionList || (t.CompletionList = {})).create = function (e, t) {
        return { items: e || [], isIncomplete: !!t };
      }),
      ((B = F = t.MarkedString || (t.MarkedString = {})).fromPlainText =
        function (e) {
          return e.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
        }),
      (B.is = function (e) {
        var t = e;
        return (
          oe.string(t) ||
          (oe.objectLiteral(t) && oe.string(t.language) && oe.string(t.value))
        );
      }),
      ((t.Hover || (t.Hover = {})).is = function (e) {
        var t = e;
        return (
          !!t &&
          oe.objectLiteral(t) &&
          (j.is(t.contents) ||
            F.is(t.contents) ||
            oe.typedArray(t.contents, F.is)) &&
          (void 0 === e.range || i.is(e.range))
        );
      }),
      ((t.ParameterInformation || (t.ParameterInformation = {})).create =
        function (e, t) {
          return t ? { label: e, documentation: t } : { label: e };
        }),
      ((t.SignatureInformation || (t.SignatureInformation = {})).create =
        function (e, t) {
          for (var n = [], i = 2; i < arguments.length; i++)
            n[i - 2] = arguments[i];
          var r = { label: e };
          return (
            oe.defined(t) && (r.documentation = t),
            oe.defined(n) ? (r.parameters = n) : (r.parameters = []),
            r
          );
        }),
      ((V =
        t.DocumentHighlightKind || (t.DocumentHighlightKind = {})).Text = 1),
      (V.Read = 2),
      (V.Write = 3),
      ((t.DocumentHighlight || (t.DocumentHighlight = {})).create = function (
        e,
        t
      ) {
        var n = { range: e };
        return oe.number(t) && (n.kind = t), n;
      }),
      ((G = t.SymbolKind || (t.SymbolKind = {})).File = 1),
      (G.Module = 2),
      (G.Namespace = 3),
      (G.Package = 4),
      (G.Class = 5),
      (G.Method = 6),
      (G.Property = 7),
      (G.Field = 8),
      (G.Constructor = 9),
      (G.Enum = 10),
      (G.Interface = 11),
      (G.Function = 12),
      (G.Variable = 13),
      (G.Constant = 14),
      (G.String = 15),
      (G.Number = 16),
      (G.Boolean = 17),
      (G.Array = 18),
      (G.Object = 19),
      (G.Key = 20),
      (G.Null = 21),
      (G.EnumMember = 22),
      (G.Struct = 23),
      (G.Event = 24),
      (G.Operator = 25),
      (G.TypeParameter = 26),
      ((t.SymbolInformation || (t.SymbolInformation = {})).create = function (
        e,
        t,
        n,
        i,
        r
      ) {
        var a = { name: e, kind: t, location: { uri: i, range: n } };
        return r && (a.containerName = r), a;
      });
    var Y,
      X,
      $,
      Q,
      Z,
      ee,
      te = function () {};
    (t.DocumentSymbol = te),
      ((Y = te = t.DocumentSymbol || (t.DocumentSymbol = {})).create =
        function (e, t, n, i, r, a) {
          var o = { name: e, detail: t, kind: n, range: i, selectionRange: r };
          return void 0 !== a && (o.children = a), o;
        }),
      (Y.is = function (e) {
        var t = e;
        return (
          t &&
          oe.string(t.name) &&
          oe.number(t.kind) &&
          i.is(t.range) &&
          i.is(t.selectionRange) &&
          (void 0 === t.detail || oe.string(t.detail)) &&
          (void 0 === t.deprecated || oe.boolean(t.deprecated)) &&
          (void 0 === t.children || Array.isArray(t.children))
        );
      }),
      (t.DocumentSymbol = te),
      ((X = t.CodeActionKind || (t.CodeActionKind = {})).QuickFix = "quickfix"),
      (X.Refactor = "refactor"),
      (X.RefactorExtract = "refactor.extract"),
      (X.RefactorInline = "refactor.inline"),
      (X.RefactorRewrite = "refactor.rewrite"),
      (X.Source = "source"),
      (X.SourceOrganizeImports = "source.organizeImports"),
      (($ = t.CodeActionContext || (t.CodeActionContext = {})).create =
        function (e, t) {
          var n = { diagnostics: e };
          return null != t && (n.only = t), n;
        }),
      ($.is = function (e) {
        var t = e;
        return (
          oe.defined(t) &&
          oe.typedArray(t.diagnostics, b.is) &&
          (void 0 === t.only || oe.typedArray(t.only, oe.string))
        );
      }),
      ((Q = t.CodeAction || (t.CodeAction = {})).create = function (e, t, n) {
        var i = { title: e };
        return (
          y.is(t) ? (i.command = t) : (i.edit = t),
          void 0 !== n && (i.kind = n),
          i
        );
      }),
      (Q.is = function (e) {
        var t = e;
        return (
          t &&
          oe.string(t.title) &&
          (void 0 === t.diagnostics || oe.typedArray(t.diagnostics, b.is)) &&
          (void 0 === t.kind || oe.string(t.kind)) &&
          (void 0 !== t.edit || void 0 !== t.command) &&
          (void 0 === t.command || y.is(t.command)) &&
          (void 0 === t.edit || M.is(t.edit))
        );
      }),
      ((Z = t.CodeLens || (t.CodeLens = {})).create = function (e, t) {
        var n = { range: e };
        return oe.defined(t) && (n.data = t), n;
      }),
      (Z.is = function (e) {
        var t = e;
        return (
          oe.defined(t) &&
          i.is(t.range) &&
          (oe.undefined(t.command) || y.is(t.command))
        );
      }),
      ((ee = t.FormattingOptions || (t.FormattingOptions = {})).create =
        function (e, t) {
          return { tabSize: e, insertSpaces: t };
        }),
      (ee.is = function (e) {
        var t = e;
        return (
          oe.defined(t) && oe.number(t.tabSize) && oe.boolean(t.insertSpaces)
        );
      });
    var ne,
      ie,
      re,
      ae = function () {};
    (t.DocumentLink = ae),
      ((ne = ae = t.DocumentLink || (t.DocumentLink = {})).create = function (
        e,
        t,
        n
      ) {
        return { range: e, target: t, data: n };
      }),
      (ne.is = function (e) {
        var t = e;
        return (
          oe.defined(t) &&
          i.is(t.range) &&
          (oe.undefined(t.target) || oe.string(t.target))
        );
      }),
      (t.DocumentLink = ae),
      (t.EOL = ["\n", "\r\n", "\r"]),
      ((ie = t.TextDocument || (t.TextDocument = {})).create = function (
        e,
        t,
        n,
        i
      ) {
        return new ce(e, t, n, i);
      }),
      (ie.is = function (e) {
        var t = e;
        return !!(
          oe.defined(t) &&
          oe.string(t.uri) &&
          (oe.undefined(t.languageId) || oe.string(t.languageId)) &&
          oe.number(t.lineCount) &&
          oe.func(t.getText) &&
          oe.func(t.positionAt) &&
          oe.func(t.offsetAt)
        );
      }),
      (ie.applyEdits = function (e, t) {
        for (
          var n = e.getText(),
            i = (function e(t, n) {
              if (t.length <= 1) return t;
              var i = (t.length / 2) | 0,
                r = t.slice(0, i),
                a = t.slice(i);
              e(r, n), e(a, n);
              for (var o = 0, s = 0, l = 0; o < r.length && s < a.length; ) {
                var c = n(r[o], a[s]);
                t[l++] = c <= 0 ? r[o++] : a[s++];
              }
              for (; o < r.length; ) t[l++] = r[o++];
              for (; s < a.length; ) t[l++] = a[s++];
              return t;
            })(t, function (e, t) {
              var n = e.range.start.line - t.range.start.line;
              return 0 === n
                ? e.range.start.character - t.range.start.character
                : n;
            }),
            r = n.length,
            a = i.length - 1;
          0 <= a;
          a--
        ) {
          var o = i[a],
            s = e.offsetAt(o.range.start),
            l = e.offsetAt(o.range.end);
          if (!(l <= r)) throw new Error("Overlapping edit");
          (n = n.substring(0, s) + o.newText + n.substring(l, n.length)),
            (r = s);
        }
        return n;
      }),
      ((re =
        t.TextDocumentSaveReason ||
        (t.TextDocumentSaveReason = {})).Manual = 1),
      (re.AfterDelay = 2),
      (re.FocusOut = 3);
    var oe,
      se,
      le,
      ce = (function () {
        function e(e, t, n, i) {
          (this._uri = e),
            (this._languageId = t),
            (this._version = n),
            (this._content = i),
            (this._lineOffsets = null);
        }
        return (
          Object.defineProperty(e.prototype, "uri", {
            get: function () {
              return this._uri;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, "languageId", {
            get: function () {
              return this._languageId;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, "version", {
            get: function () {
              return this._version;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (e.prototype.getText = function (e) {
            if (e) {
              var t = this.offsetAt(e.start),
                n = this.offsetAt(e.end);
              return this._content.substring(t, n);
            }
            return this._content;
          }),
          (e.prototype.update = function (e, t) {
            (this._content = e.text),
              (this._version = t),
              (this._lineOffsets = null);
          }),
          (e.prototype.getLineOffsets = function () {
            if (null === this._lineOffsets) {
              for (
                var e = [], t = this._content, n = !0, i = 0;
                i < t.length;
                i++
              ) {
                n && (e.push(i), (n = !1));
                var r = t.charAt(i);
                (n = "\r" === r || "\n" === r),
                  "\r" === r &&
                    i + 1 < t.length &&
                    "\n" === t.charAt(i + 1) &&
                    i++;
              }
              n && 0 < t.length && e.push(t.length), (this._lineOffsets = e);
            }
            return this._lineOffsets;
          }),
          (e.prototype.positionAt = function (e) {
            e = Math.max(Math.min(e, this._content.length), 0);
            var t = this.getLineOffsets(),
              n = 0,
              i = t.length;
            if (0 === i) return o.create(0, e);
            for (; n < i; ) {
              var r = Math.floor((n + i) / 2);
              t[r] > e ? (i = r) : (n = r + 1);
            }
            var a = n - 1;
            return o.create(a, e - t[a]);
          }),
          (e.prototype.offsetAt = function (e) {
            var t = this.getLineOffsets();
            if (e.line >= t.length) return this._content.length;
            if (e.line < 0) return 0;
            var n = t[e.line],
              i = e.line + 1 < t.length ? t[e.line + 1] : this._content.length;
            return Math.max(Math.min(n + e.character, i), n);
          }),
          Object.defineProperty(e.prototype, "lineCount", {
            get: function () {
              return this.getLineOffsets().length;
            },
            enumerable: !0,
            configurable: !0,
          }),
          e
        );
      })();
    (se = oe || (oe = {})),
      (le = Object.prototype.toString),
      (se.defined = function (e) {
        return void 0 !== e;
      }),
      (se.undefined = function (e) {
        return void 0 === e;
      }),
      (se.boolean = function (e) {
        return !0 === e || !1 === e;
      }),
      (se.string = function (e) {
        return "[object String]" === le.call(e);
      }),
      (se.number = function (e) {
        return "[object Number]" === le.call(e);
      }),
      (se.func = function (e) {
        return "[object Function]" === le.call(e);
      }),
      (se.objectLiteral = function (e) {
        return null !== e && "object" == typeof e;
      }),
      (se.typedArray = function (e, t) {
        return Array.isArray(e) && e.every(t);
      });
  }),
  define(
    "vscode-languageserver-types",
    ["vscode-languageserver-types/main"],
    function (e) {
      return e;
    }
  ),
  (function (e) {
    if ("object" == typeof module && "object" == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      "function" == typeof define &&
        define.amd &&
        define(
          "vscode-html-languageservice/parser/htmlEntities",
          ["require", "exports"],
          e
        );
  })(function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.entities = {
        "Aacute;": "Á",
        Aacute: "Á",
        "aacute;": "á",
        aacute: "á",
        "Abreve;": "Ă",
        "abreve;": "ă",
        "ac;": "∾",
        "acd;": "∿",
        "acE;": "∾̳",
        "Acirc;": "Â",
        Acirc: "Â",
        "acirc;": "â",
        acirc: "â",
        "acute;": "´",
        acute: "´",
        "Acy;": "А",
        "acy;": "а",
        "AElig;": "Æ",
        AElig: "Æ",
        "aelig;": "æ",
        aelig: "æ",
        "af;": "⁡",
        "Afr;": "𝔄",
        "afr;": "𝔞",
        "Agrave;": "À",
        Agrave: "À",
        "agrave;": "à",
        agrave: "à",
        "alefsym;": "ℵ",
        "aleph;": "ℵ",
        "Alpha;": "Α",
        "alpha;": "α",
        "Amacr;": "Ā",
        "amacr;": "ā",
        "amalg;": "⨿",
        "AMP;": "&",
        AMP: "&",
        "amp;": "&",
        amp: "&",
        "And;": "⩓",
        "and;": "∧",
        "andand;": "⩕",
        "andd;": "⩜",
        "andslope;": "⩘",
        "andv;": "⩚",
        "ang;": "∠",
        "ange;": "⦤",
        "angle;": "∠",
        "angmsd;": "∡",
        "angmsdaa;": "⦨",
        "angmsdab;": "⦩",
        "angmsdac;": "⦪",
        "angmsdad;": "⦫",
        "angmsdae;": "⦬",
        "angmsdaf;": "⦭",
        "angmsdag;": "⦮",
        "angmsdah;": "⦯",
        "angrt;": "∟",
        "angrtvb;": "⊾",
        "angrtvbd;": "⦝",
        "angsph;": "∢",
        "angst;": "Å",
        "angzarr;": "⍼",
        "Aogon;": "Ą",
        "aogon;": "ą",
        "Aopf;": "𝔸",
        "aopf;": "𝕒",
        "ap;": "≈",
        "apacir;": "⩯",
        "apE;": "⩰",
        "ape;": "≊",
        "apid;": "≋",
        "apos;": "'",
        "ApplyFunction;": "⁡",
        "approx;": "≈",
        "approxeq;": "≊",
        "Aring;": "Å",
        Aring: "Å",
        "aring;": "å",
        aring: "å",
        "Ascr;": "𝒜",
        "ascr;": "𝒶",
        "Assign;": "≔",
        "ast;": "*",
        "asymp;": "≈",
        "asympeq;": "≍",
        "Atilde;": "Ã",
        Atilde: "Ã",
        "atilde;": "ã",
        atilde: "ã",
        "Auml;": "Ä",
        Auml: "Ä",
        "auml;": "ä",
        auml: "ä",
        "awconint;": "∳",
        "awint;": "⨑",
        "backcong;": "≌",
        "backepsilon;": "϶",
        "backprime;": "‵",
        "backsim;": "∽",
        "backsimeq;": "⋍",
        "Backslash;": "∖",
        "Barv;": "⫧",
        "barvee;": "⊽",
        "Barwed;": "⌆",
        "barwed;": "⌅",
        "barwedge;": "⌅",
        "bbrk;": "⎵",
        "bbrktbrk;": "⎶",
        "bcong;": "≌",
        "Bcy;": "Б",
        "bcy;": "б",
        "bdquo;": "„",
        "becaus;": "∵",
        "Because;": "∵",
        "because;": "∵",
        "bemptyv;": "⦰",
        "bepsi;": "϶",
        "bernou;": "ℬ",
        "Bernoullis;": "ℬ",
        "Beta;": "Β",
        "beta;": "β",
        "beth;": "ℶ",
        "between;": "≬",
        "Bfr;": "𝔅",
        "bfr;": "𝔟",
        "bigcap;": "⋂",
        "bigcirc;": "◯",
        "bigcup;": "⋃",
        "bigodot;": "⨀",
        "bigoplus;": "⨁",
        "bigotimes;": "⨂",
        "bigsqcup;": "⨆",
        "bigstar;": "★",
        "bigtriangledown;": "▽",
        "bigtriangleup;": "△",
        "biguplus;": "⨄",
        "bigvee;": "⋁",
        "bigwedge;": "⋀",
        "bkarow;": "⤍",
        "blacklozenge;": "⧫",
        "blacksquare;": "▪",
        "blacktriangle;": "▴",
        "blacktriangledown;": "▾",
        "blacktriangleleft;": "◂",
        "blacktriangleright;": "▸",
        "blank;": "␣",
        "blk12;": "▒",
        "blk14;": "░",
        "blk34;": "▓",
        "block;": "█",
        "bne;": "=⃥",
        "bnequiv;": "≡⃥",
        "bNot;": "⫭",
        "bnot;": "⌐",
        "Bopf;": "𝔹",
        "bopf;": "𝕓",
        "bot;": "⊥",
        "bottom;": "⊥",
        "bowtie;": "⋈",
        "boxbox;": "⧉",
        "boxDL;": "╗",
        "boxDl;": "╖",
        "boxdL;": "╕",
        "boxdl;": "┐",
        "boxDR;": "╔",
        "boxDr;": "╓",
        "boxdR;": "╒",
        "boxdr;": "┌",
        "boxH;": "═",
        "boxh;": "─",
        "boxHD;": "╦",
        "boxHd;": "╤",
        "boxhD;": "╥",
        "boxhd;": "┬",
        "boxHU;": "╩",
        "boxHu;": "╧",
        "boxhU;": "╨",
        "boxhu;": "┴",
        "boxminus;": "⊟",
        "boxplus;": "⊞",
        "boxtimes;": "⊠",
        "boxUL;": "╝",
        "boxUl;": "╜",
        "boxuL;": "╛",
        "boxul;": "┘",
        "boxUR;": "╚",
        "boxUr;": "╙",
        "boxuR;": "╘",
        "boxur;": "└",
        "boxV;": "║",
        "boxv;": "│",
        "boxVH;": "╬",
        "boxVh;": "╫",
        "boxvH;": "╪",
        "boxvh;": "┼",
        "boxVL;": "╣",
        "boxVl;": "╢",
        "boxvL;": "╡",
        "boxvl;": "┤",
        "boxVR;": "╠",
        "boxVr;": "╟",
        "boxvR;": "╞",
        "boxvr;": "├",
        "bprime;": "‵",
        "Breve;": "˘",
        "breve;": "˘",
        "brvbar;": "¦",
        brvbar: "¦",
        "Bscr;": "ℬ",
        "bscr;": "𝒷",
        "bsemi;": "⁏",
        "bsim;": "∽",
        "bsime;": "⋍",
        "bsol;": "\\",
        "bsolb;": "⧅",
        "bsolhsub;": "⟈",
        "bull;": "•",
        "bullet;": "•",
        "bump;": "≎",
        "bumpE;": "⪮",
        "bumpe;": "≏",
        "Bumpeq;": "≎",
        "bumpeq;": "≏",
        "Cacute;": "Ć",
        "cacute;": "ć",
        "Cap;": "⋒",
        "cap;": "∩",
        "capand;": "⩄",
        "capbrcup;": "⩉",
        "capcap;": "⩋",
        "capcup;": "⩇",
        "capdot;": "⩀",
        "CapitalDifferentialD;": "ⅅ",
        "caps;": "∩︀",
        "caret;": "⁁",
        "caron;": "ˇ",
        "Cayleys;": "ℭ",
        "ccaps;": "⩍",
        "Ccaron;": "Č",
        "ccaron;": "č",
        "Ccedil;": "Ç",
        Ccedil: "Ç",
        "ccedil;": "ç",
        ccedil: "ç",
        "Ccirc;": "Ĉ",
        "ccirc;": "ĉ",
        "Cconint;": "∰",
        "ccups;": "⩌",
        "ccupssm;": "⩐",
        "Cdot;": "Ċ",
        "cdot;": "ċ",
        "cedil;": "¸",
        cedil: "¸",
        "Cedilla;": "¸",
        "cemptyv;": "⦲",
        "cent;": "¢",
        cent: "¢",
        "CenterDot;": "·",
        "centerdot;": "·",
        "Cfr;": "ℭ",
        "cfr;": "𝔠",
        "CHcy;": "Ч",
        "chcy;": "ч",
        "check;": "✓",
        "checkmark;": "✓",
        "Chi;": "Χ",
        "chi;": "χ",
        "cir;": "○",
        "circ;": "ˆ",
        "circeq;": "≗",
        "circlearrowleft;": "↺",
        "circlearrowright;": "↻",
        "circledast;": "⊛",
        "circledcirc;": "⊚",
        "circleddash;": "⊝",
        "CircleDot;": "⊙",
        "circledR;": "®",
        "circledS;": "Ⓢ",
        "CircleMinus;": "⊖",
        "CirclePlus;": "⊕",
        "CircleTimes;": "⊗",
        "cirE;": "⧃",
        "cire;": "≗",
        "cirfnint;": "⨐",
        "cirmid;": "⫯",
        "cirscir;": "⧂",
        "ClockwiseContourIntegral;": "∲",
        "CloseCurlyDoubleQuote;": "”",
        "CloseCurlyQuote;": "’",
        "clubs;": "♣",
        "clubsuit;": "♣",
        "Colon;": "∷",
        "colon;": ":",
        "Colone;": "⩴",
        "colone;": "≔",
        "coloneq;": "≔",
        "comma;": ",",
        "commat;": "@",
        "comp;": "∁",
        "compfn;": "∘",
        "complement;": "∁",
        "complexes;": "ℂ",
        "cong;": "≅",
        "congdot;": "⩭",
        "Congruent;": "≡",
        "Conint;": "∯",
        "conint;": "∮",
        "ContourIntegral;": "∮",
        "Copf;": "ℂ",
        "copf;": "𝕔",
        "coprod;": "∐",
        "Coproduct;": "∐",
        "COPY;": "©",
        COPY: "©",
        "copy;": "©",
        copy: "©",
        "copysr;": "℗",
        "CounterClockwiseContourIntegral;": "∳",
        "crarr;": "↵",
        "Cross;": "⨯",
        "cross;": "✗",
        "Cscr;": "𝒞",
        "cscr;": "𝒸",
        "csub;": "⫏",
        "csube;": "⫑",
        "csup;": "⫐",
        "csupe;": "⫒",
        "ctdot;": "⋯",
        "cudarrl;": "⤸",
        "cudarrr;": "⤵",
        "cuepr;": "⋞",
        "cuesc;": "⋟",
        "cularr;": "↶",
        "cularrp;": "⤽",
        "Cup;": "⋓",
        "cup;": "∪",
        "cupbrcap;": "⩈",
        "CupCap;": "≍",
        "cupcap;": "⩆",
        "cupcup;": "⩊",
        "cupdot;": "⊍",
        "cupor;": "⩅",
        "cups;": "∪︀",
        "curarr;": "↷",
        "curarrm;": "⤼",
        "curlyeqprec;": "⋞",
        "curlyeqsucc;": "⋟",
        "curlyvee;": "⋎",
        "curlywedge;": "⋏",
        "curren;": "¤",
        curren: "¤",
        "curvearrowleft;": "↶",
        "curvearrowright;": "↷",
        "cuvee;": "⋎",
        "cuwed;": "⋏",
        "cwconint;": "∲",
        "cwint;": "∱",
        "cylcty;": "⌭",
        "Dagger;": "‡",
        "dagger;": "†",
        "daleth;": "ℸ",
        "Darr;": "↡",
        "dArr;": "⇓",
        "darr;": "↓",
        "dash;": "‐",
        "Dashv;": "⫤",
        "dashv;": "⊣",
        "dbkarow;": "⤏",
        "dblac;": "˝",
        "Dcaron;": "Ď",
        "dcaron;": "ď",
        "Dcy;": "Д",
        "dcy;": "д",
        "DD;": "ⅅ",
        "dd;": "ⅆ",
        "ddagger;": "‡",
        "ddarr;": "⇊",
        "DDotrahd;": "⤑",
        "ddotseq;": "⩷",
        "deg;": "°",
        deg: "°",
        "Del;": "∇",
        "Delta;": "Δ",
        "delta;": "δ",
        "demptyv;": "⦱",
        "dfisht;": "⥿",
        "Dfr;": "𝔇",
        "dfr;": "𝔡",
        "dHar;": "⥥",
        "dharl;": "⇃",
        "dharr;": "⇂",
        "DiacriticalAcute;": "´",
        "DiacriticalDot;": "˙",
        "DiacriticalDoubleAcute;": "˝",
        "DiacriticalGrave;": "`",
        "DiacriticalTilde;": "˜",
        "diam;": "⋄",
        "Diamond;": "⋄",
        "diamond;": "⋄",
        "diamondsuit;": "♦",
        "diams;": "♦",
        "die;": "¨",
        "DifferentialD;": "ⅆ",
        "digamma;": "ϝ",
        "disin;": "⋲",
        "div;": "÷",
        "divide;": "÷",
        divide: "÷",
        "divideontimes;": "⋇",
        "divonx;": "⋇",
        "DJcy;": "Ђ",
        "djcy;": "ђ",
        "dlcorn;": "⌞",
        "dlcrop;": "⌍",
        "dollar;": "$",
        "Dopf;": "𝔻",
        "dopf;": "𝕕",
        "Dot;": "¨",
        "dot;": "˙",
        "DotDot;": "⃜",
        "doteq;": "≐",
        "doteqdot;": "≑",
        "DotEqual;": "≐",
        "dotminus;": "∸",
        "dotplus;": "∔",
        "dotsquare;": "⊡",
        "doublebarwedge;": "⌆",
        "DoubleContourIntegral;": "∯",
        "DoubleDot;": "¨",
        "DoubleDownArrow;": "⇓",
        "DoubleLeftArrow;": "⇐",
        "DoubleLeftRightArrow;": "⇔",
        "DoubleLeftTee;": "⫤",
        "DoubleLongLeftArrow;": "⟸",
        "DoubleLongLeftRightArrow;": "⟺",
        "DoubleLongRightArrow;": "⟹",
        "DoubleRightArrow;": "⇒",
        "DoubleRightTee;": "⊨",
        "DoubleUpArrow;": "⇑",
        "DoubleUpDownArrow;": "⇕",
        "DoubleVerticalBar;": "∥",
        "DownArrow;": "↓",
        "Downarrow;": "⇓",
        "downarrow;": "↓",
        "DownArrowBar;": "⤓",
        "DownArrowUpArrow;": "⇵",
        "DownBreve;": "̑",
        "downdownarrows;": "⇊",
        "downharpoonleft;": "⇃",
        "downharpoonright;": "⇂",
        "DownLeftRightVector;": "⥐",
        "DownLeftTeeVector;": "⥞",
        "DownLeftVector;": "↽",
        "DownLeftVectorBar;": "⥖",
        "DownRightTeeVector;": "⥟",
        "DownRightVector;": "⇁",
        "DownRightVectorBar;": "⥗",
        "DownTee;": "⊤",
        "DownTeeArrow;": "↧",
        "drbkarow;": "⤐",
        "drcorn;": "⌟",
        "drcrop;": "⌌",
        "Dscr;": "𝒟",
        "dscr;": "𝒹",
        "DScy;": "Ѕ",
        "dscy;": "ѕ",
        "dsol;": "⧶",
        "Dstrok;": "Đ",
        "dstrok;": "đ",
        "dtdot;": "⋱",
        "dtri;": "▿",
        "dtrif;": "▾",
        "duarr;": "⇵",
        "duhar;": "⥯",
        "dwangle;": "⦦",
        "DZcy;": "Џ",
        "dzcy;": "џ",
        "dzigrarr;": "⟿",
        "Eacute;": "É",
        Eacute: "É",
        "eacute;": "é",
        eacute: "é",
        "easter;": "⩮",
        "Ecaron;": "Ě",
        "ecaron;": "ě",
        "ecir;": "≖",
        "Ecirc;": "Ê",
        Ecirc: "Ê",
        "ecirc;": "ê",
        ecirc: "ê",
        "ecolon;": "≕",
        "Ecy;": "Э",
        "ecy;": "э",
        "eDDot;": "⩷",
        "Edot;": "Ė",
        "eDot;": "≑",
        "edot;": "ė",
        "ee;": "ⅇ",
        "efDot;": "≒",
        "Efr;": "𝔈",
        "efr;": "𝔢",
        "eg;": "⪚",
        "Egrave;": "È",
        Egrave: "È",
        "egrave;": "è",
        egrave: "è",
        "egs;": "⪖",
        "egsdot;": "⪘",
        "el;": "⪙",
        "Element;": "∈",
        "elinters;": "⏧",
        "ell;": "ℓ",
        "els;": "⪕",
        "elsdot;": "⪗",
        "Emacr;": "Ē",
        "emacr;": "ē",
        "empty;": "∅",
        "emptyset;": "∅",
        "EmptySmallSquare;": "◻",
        "emptyv;": "∅",
        "EmptyVerySmallSquare;": "▫",
        "emsp;": " ",
        "emsp13;": " ",
        "emsp14;": " ",
        "ENG;": "Ŋ",
        "eng;": "ŋ",
        "ensp;": " ",
        "Eogon;": "Ę",
        "eogon;": "ę",
        "Eopf;": "𝔼",
        "eopf;": "𝕖",
        "epar;": "⋕",
        "eparsl;": "⧣",
        "eplus;": "⩱",
        "epsi;": "ε",
        "Epsilon;": "Ε",
        "epsilon;": "ε",
        "epsiv;": "ϵ",
        "eqcirc;": "≖",
        "eqcolon;": "≕",
        "eqsim;": "≂",
        "eqslantgtr;": "⪖",
        "eqslantless;": "⪕",
        "Equal;": "⩵",
        "equals;": "=",
        "EqualTilde;": "≂",
        "equest;": "≟",
        "Equilibrium;": "⇌",
        "equiv;": "≡",
        "equivDD;": "⩸",
        "eqvparsl;": "⧥",
        "erarr;": "⥱",
        "erDot;": "≓",
        "Escr;": "ℰ",
        "escr;": "ℯ",
        "esdot;": "≐",
        "Esim;": "⩳",
        "esim;": "≂",
        "Eta;": "Η",
        "eta;": "η",
        "ETH;": "Ð",
        ETH: "Ð",
        "eth;": "ð",
        eth: "ð",
        "Euml;": "Ë",
        Euml: "Ë",
        "euml;": "ë",
        euml: "ë",
        "euro;": "€",
        "excl;": "!",
        "exist;": "∃",
        "Exists;": "∃",
        "expectation;": "ℰ",
        "ExponentialE;": "ⅇ",
        "exponentiale;": "ⅇ",
        "fallingdotseq;": "≒",
        "Fcy;": "Ф",
        "fcy;": "ф",
        "female;": "♀",
        "ffilig;": "ﬃ",
        "fflig;": "ﬀ",
        "ffllig;": "ﬄ",
        "Ffr;": "𝔉",
        "ffr;": "𝔣",
        "filig;": "ﬁ",
        "FilledSmallSquare;": "◼",
        "FilledVerySmallSquare;": "▪",
        "fjlig;": "fj",
        "flat;": "♭",
        "fllig;": "ﬂ",
        "fltns;": "▱",
        "fnof;": "ƒ",
        "Fopf;": "𝔽",
        "fopf;": "𝕗",
        "ForAll;": "∀",
        "forall;": "∀",
        "fork;": "⋔",
        "forkv;": "⫙",
        "Fouriertrf;": "ℱ",
        "fpartint;": "⨍",
        "frac12;": "½",
        frac12: "½",
        "frac13;": "⅓",
        "frac14;": "¼",
        frac14: "¼",
        "frac15;": "⅕",
        "frac16;": "⅙",
        "frac18;": "⅛",
        "frac23;": "⅔",
        "frac25;": "⅖",
        "frac34;": "¾",
        frac34: "¾",
        "frac35;": "⅗",
        "frac38;": "⅜",
        "frac45;": "⅘",
        "frac56;": "⅚",
        "frac58;": "⅝",
        "frac78;": "⅞",
        "frasl;": "⁄",
        "frown;": "⌢",
        "Fscr;": "ℱ",
        "fscr;": "𝒻",
        "gacute;": "ǵ",
        "Gamma;": "Γ",
        "gamma;": "γ",
        "Gammad;": "Ϝ",
        "gammad;": "ϝ",
        "gap;": "⪆",
        "Gbreve;": "Ğ",
        "gbreve;": "ğ",
        "Gcedil;": "Ģ",
        "Gcirc;": "Ĝ",
        "gcirc;": "ĝ",
        "Gcy;": "Г",
        "gcy;": "г",
        "Gdot;": "Ġ",
        "gdot;": "ġ",
        "gE;": "≧",
        "ge;": "≥",
        "gEl;": "⪌",
        "gel;": "⋛",
        "geq;": "≥",
        "geqq;": "≧",
        "geqslant;": "⩾",
        "ges;": "⩾",
        "gescc;": "⪩",
        "gesdot;": "⪀",
        "gesdoto;": "⪂",
        "gesdotol;": "⪄",
        "gesl;": "⋛︀",
        "gesles;": "⪔",
        "Gfr;": "𝔊",
        "gfr;": "𝔤",
        "Gg;": "⋙",
        "gg;": "≫",
        "ggg;": "⋙",
        "gimel;": "ℷ",
        "GJcy;": "Ѓ",
        "gjcy;": "ѓ",
        "gl;": "≷",
        "gla;": "⪥",
        "glE;": "⪒",
        "glj;": "⪤",
        "gnap;": "⪊",
        "gnapprox;": "⪊",
        "gnE;": "≩",
        "gne;": "⪈",
        "gneq;": "⪈",
        "gneqq;": "≩",
        "gnsim;": "⋧",
        "Gopf;": "𝔾",
        "gopf;": "𝕘",
        "grave;": "`",
        "GreaterEqual;": "≥",
        "GreaterEqualLess;": "⋛",
        "GreaterFullEqual;": "≧",
        "GreaterGreater;": "⪢",
        "GreaterLess;": "≷",
        "GreaterSlantEqual;": "⩾",
        "GreaterTilde;": "≳",
        "Gscr;": "𝒢",
        "gscr;": "ℊ",
        "gsim;": "≳",
        "gsime;": "⪎",
        "gsiml;": "⪐",
        "GT;": ">",
        GT: ">",
        "Gt;": "≫",
        "gt;": ">",
        gt: ">",
        "gtcc;": "⪧",
        "gtcir;": "⩺",
        "gtdot;": "⋗",
        "gtlPar;": "⦕",
        "gtquest;": "⩼",
        "gtrapprox;": "⪆",
        "gtrarr;": "⥸",
        "gtrdot;": "⋗",
        "gtreqless;": "⋛",
        "gtreqqless;": "⪌",
        "gtrless;": "≷",
        "gtrsim;": "≳",
        "gvertneqq;": "≩︀",
        "gvnE;": "≩︀",
        "Hacek;": "ˇ",
        "hairsp;": " ",
        "half;": "½",
        "hamilt;": "ℋ",
        "HARDcy;": "Ъ",
        "hardcy;": "ъ",
        "hArr;": "⇔",
        "harr;": "↔",
        "harrcir;": "⥈",
        "harrw;": "↭",
        "Hat;": "^",
        "hbar;": "ℏ",
        "Hcirc;": "Ĥ",
        "hcirc;": "ĥ",
        "hearts;": "♥",
        "heartsuit;": "♥",
        "hellip;": "…",
        "hercon;": "⊹",
        "Hfr;": "ℌ",
        "hfr;": "𝔥",
        "HilbertSpace;": "ℋ",
        "hksearow;": "⤥",
        "hkswarow;": "⤦",
        "hoarr;": "⇿",
        "homtht;": "∻",
        "hookleftarrow;": "↩",
        "hookrightarrow;": "↪",
        "Hopf;": "ℍ",
        "hopf;": "𝕙",
        "horbar;": "―",
        "HorizontalLine;": "─",
        "Hscr;": "ℋ",
        "hscr;": "𝒽",
        "hslash;": "ℏ",
        "Hstrok;": "Ħ",
        "hstrok;": "ħ",
        "HumpDownHump;": "≎",
        "HumpEqual;": "≏",
        "hybull;": "⁃",
        "hyphen;": "‐",
        "Iacute;": "Í",
        Iacute: "Í",
        "iacute;": "í",
        iacute: "í",
        "ic;": "⁣",
        "Icirc;": "Î",
        Icirc: "Î",
        "icirc;": "î",
        icirc: "î",
        "Icy;": "И",
        "icy;": "и",
        "Idot;": "İ",
        "IEcy;": "Е",
        "iecy;": "е",
        "iexcl;": "¡",
        iexcl: "¡",
        "iff;": "⇔",
        "Ifr;": "ℑ",
        "ifr;": "𝔦",
        "Igrave;": "Ì",
        Igrave: "Ì",
        "igrave;": "ì",
        igrave: "ì",
        "ii;": "ⅈ",
        "iiiint;": "⨌",
        "iiint;": "∭",
        "iinfin;": "⧜",
        "iiota;": "℩",
        "IJlig;": "Ĳ",
        "ijlig;": "ĳ",
        "Im;": "ℑ",
        "Imacr;": "Ī",
        "imacr;": "ī",
        "image;": "ℑ",
        "ImaginaryI;": "ⅈ",
        "imagline;": "ℐ",
        "imagpart;": "ℑ",
        "imath;": "ı",
        "imof;": "⊷",
        "imped;": "Ƶ",
        "Implies;": "⇒",
        "in;": "∈",
        "incare;": "℅",
        "infin;": "∞",
        "infintie;": "⧝",
        "inodot;": "ı",
        "Int;": "∬",
        "int;": "∫",
        "intcal;": "⊺",
        "integers;": "ℤ",
        "Integral;": "∫",
        "intercal;": "⊺",
        "Intersection;": "⋂",
        "intlarhk;": "⨗",
        "intprod;": "⨼",
        "InvisibleComma;": "⁣",
        "InvisibleTimes;": "⁢",
        "IOcy;": "Ё",
        "iocy;": "ё",
        "Iogon;": "Į",
        "iogon;": "į",
        "Iopf;": "𝕀",
        "iopf;": "𝕚",
        "Iota;": "Ι",
        "iota;": "ι",
        "iprod;": "⨼",
        "iquest;": "¿",
        iquest: "¿",
        "Iscr;": "ℐ",
        "iscr;": "𝒾",
        "isin;": "∈",
        "isindot;": "⋵",
        "isinE;": "⋹",
        "isins;": "⋴",
        "isinsv;": "⋳",
        "isinv;": "∈",
        "it;": "⁢",
        "Itilde;": "Ĩ",
        "itilde;": "ĩ",
        "Iukcy;": "І",
        "iukcy;": "і",
        "Iuml;": "Ï",
        Iuml: "Ï",
        "iuml;": "ï",
        iuml: "ï",
        "Jcirc;": "Ĵ",
        "jcirc;": "ĵ",
        "Jcy;": "Й",
        "jcy;": "й",
        "Jfr;": "𝔍",
        "jfr;": "𝔧",
        "jmath;": "ȷ",
        "Jopf;": "𝕁",
        "jopf;": "𝕛",
        "Jscr;": "𝒥",
        "jscr;": "𝒿",
        "Jsercy;": "Ј",
        "jsercy;": "ј",
        "Jukcy;": "Є",
        "jukcy;": "є",
        "Kappa;": "Κ",
        "kappa;": "κ",
        "kappav;": "ϰ",
        "Kcedil;": "Ķ",
        "kcedil;": "ķ",
        "Kcy;": "К",
        "kcy;": "к",
        "Kfr;": "𝔎",
        "kfr;": "𝔨",
        "kgreen;": "ĸ",
        "KHcy;": "Х",
        "khcy;": "х",
        "KJcy;": "Ќ",
        "kjcy;": "ќ",
        "Kopf;": "𝕂",
        "kopf;": "𝕜",
        "Kscr;": "𝒦",
        "kscr;": "𝓀",
        "lAarr;": "⇚",
        "Lacute;": "Ĺ",
        "lacute;": "ĺ",
        "laemptyv;": "⦴",
        "lagran;": "ℒ",
        "Lambda;": "Λ",
        "lambda;": "λ",
        "Lang;": "⟪",
        "lang;": "⟨",
        "langd;": "⦑",
        "langle;": "⟨",
        "lap;": "⪅",
        "Laplacetrf;": "ℒ",
        "laquo;": "«",
        laquo: "«",
        "Larr;": "↞",
        "lArr;": "⇐",
        "larr;": "←",
        "larrb;": "⇤",
        "larrbfs;": "⤟",
        "larrfs;": "⤝",
        "larrhk;": "↩",
        "larrlp;": "↫",
        "larrpl;": "⤹",
        "larrsim;": "⥳",
        "larrtl;": "↢",
        "lat;": "⪫",
        "lAtail;": "⤛",
        "latail;": "⤙",
        "late;": "⪭",
        "lates;": "⪭︀",
        "lBarr;": "⤎",
        "lbarr;": "⤌",
        "lbbrk;": "❲",
        "lbrace;": "{",
        "lbrack;": "[",
        "lbrke;": "⦋",
        "lbrksld;": "⦏",
        "lbrkslu;": "⦍",
        "Lcaron;": "Ľ",
        "lcaron;": "ľ",
        "Lcedil;": "Ļ",
        "lcedil;": "ļ",
        "lceil;": "⌈",
        "lcub;": "{",
        "Lcy;": "Л",
        "lcy;": "л",
        "ldca;": "⤶",
        "ldquo;": "“",
        "ldquor;": "„",
        "ldrdhar;": "⥧",
        "ldrushar;": "⥋",
        "ldsh;": "↲",
        "lE;": "≦",
        "le;": "≤",
        "LeftAngleBracket;": "⟨",
        "LeftArrow;": "←",
        "Leftarrow;": "⇐",
        "leftarrow;": "←",
        "LeftArrowBar;": "⇤",
        "LeftArrowRightArrow;": "⇆",
        "leftarrowtail;": "↢",
        "LeftCeiling;": "⌈",
        "LeftDoubleBracket;": "⟦",
        "LeftDownTeeVector;": "⥡",
        "LeftDownVector;": "⇃",
        "LeftDownVectorBar;": "⥙",
        "LeftFloor;": "⌊",
        "leftharpoondown;": "↽",
        "leftharpoonup;": "↼",
        "leftleftarrows;": "⇇",
        "LeftRightArrow;": "↔",
        "Leftrightarrow;": "⇔",
        "leftrightarrow;": "↔",
        "leftrightarrows;": "⇆",
        "leftrightharpoons;": "⇋",
        "leftrightsquigarrow;": "↭",
        "LeftRightVector;": "⥎",
        "LeftTee;": "⊣",
        "LeftTeeArrow;": "↤",
        "LeftTeeVector;": "⥚",
        "leftthreetimes;": "⋋",
        "LeftTriangle;": "⊲",
        "LeftTriangleBar;": "⧏",
        "LeftTriangleEqual;": "⊴",
        "LeftUpDownVector;": "⥑",
        "LeftUpTeeVector;": "⥠",
        "LeftUpVector;": "↿",
        "LeftUpVectorBar;": "⥘",
        "LeftVector;": "↼",
        "LeftVectorBar;": "⥒",
        "lEg;": "⪋",
        "leg;": "⋚",
        "leq;": "≤",
        "leqq;": "≦",
        "leqslant;": "⩽",
        "les;": "⩽",
        "lescc;": "⪨",
        "lesdot;": "⩿",
        "lesdoto;": "⪁",
        "lesdotor;": "⪃",
        "lesg;": "⋚︀",
        "lesges;": "⪓",
        "lessapprox;": "⪅",
        "lessdot;": "⋖",
        "lesseqgtr;": "⋚",
        "lesseqqgtr;": "⪋",
        "LessEqualGreater;": "⋚",
        "LessFullEqual;": "≦",
        "LessGreater;": "≶",
        "lessgtr;": "≶",
        "LessLess;": "⪡",
        "lesssim;": "≲",
        "LessSlantEqual;": "⩽",
        "LessTilde;": "≲",
        "lfisht;": "⥼",
        "lfloor;": "⌊",
        "Lfr;": "𝔏",
        "lfr;": "𝔩",
        "lg;": "≶",
        "lgE;": "⪑",
        "lHar;": "⥢",
        "lhard;": "↽",
        "lharu;": "↼",
        "lharul;": "⥪",
        "lhblk;": "▄",
        "LJcy;": "Љ",
        "ljcy;": "љ",
        "Ll;": "⋘",
        "ll;": "≪",
        "llarr;": "⇇",
        "llcorner;": "⌞",
        "Lleftarrow;": "⇚",
        "llhard;": "⥫",
        "lltri;": "◺",
        "Lmidot;": "Ŀ",
        "lmidot;": "ŀ",
        "lmoust;": "⎰",
        "lmoustache;": "⎰",
        "lnap;": "⪉",
        "lnapprox;": "⪉",
        "lnE;": "≨",
        "lne;": "⪇",
        "lneq;": "⪇",
        "lneqq;": "≨",
        "lnsim;": "⋦",
        "loang;": "⟬",
        "loarr;": "⇽",
        "lobrk;": "⟦",
        "LongLeftArrow;": "⟵",
        "Longleftarrow;": "⟸",
        "longleftarrow;": "⟵",
        "LongLeftRightArrow;": "⟷",
        "Longleftrightarrow;": "⟺",
        "longleftrightarrow;": "⟷",
        "longmapsto;": "⟼",
        "LongRightArrow;": "⟶",
        "Longrightarrow;": "⟹",
        "longrightarrow;": "⟶",
        "looparrowleft;": "↫",
        "looparrowright;": "↬",
        "lopar;": "⦅",
        "Lopf;": "𝕃",
        "lopf;": "𝕝",
        "loplus;": "⨭",
        "lotimes;": "⨴",
        "lowast;": "∗",
        "lowbar;": "_",
        "LowerLeftArrow;": "↙",
        "LowerRightArrow;": "↘",
        "loz;": "◊",
        "lozenge;": "◊",
        "lozf;": "⧫",
        "lpar;": "(",
        "lparlt;": "⦓",
        "lrarr;": "⇆",
        "lrcorner;": "⌟",
        "lrhar;": "⇋",
        "lrhard;": "⥭",
        "lrm;": "‎",
        "lrtri;": "⊿",
        "lsaquo;": "‹",
        "Lscr;": "ℒ",
        "lscr;": "𝓁",
        "Lsh;": "↰",
        "lsh;": "↰",
        "lsim;": "≲",
        "lsime;": "⪍",
        "lsimg;": "⪏",
        "lsqb;": "[",
        "lsquo;": "‘",
        "lsquor;": "‚",
        "Lstrok;": "Ł",
        "lstrok;": "ł",
        "LT;": "<",
        LT: "<",
        "Lt;": "≪",
        "lt;": "<",
        lt: "<",
        "ltcc;": "⪦",
        "ltcir;": "⩹",
        "ltdot;": "⋖",
        "lthree;": "⋋",
        "ltimes;": "⋉",
        "ltlarr;": "⥶",
        "ltquest;": "⩻",
        "ltri;": "◃",
        "ltrie;": "⊴",
        "ltrif;": "◂",
        "ltrPar;": "⦖",
        "lurdshar;": "⥊",
        "luruhar;": "⥦",
        "lvertneqq;": "≨︀",
        "lvnE;": "≨︀",
        "macr;": "¯",
        macr: "¯",
        "male;": "♂",
        "malt;": "✠",
        "maltese;": "✠",
        "Map;": "⤅",
        "map;": "↦",
        "mapsto;": "↦",
        "mapstodown;": "↧",
        "mapstoleft;": "↤",
        "mapstoup;": "↥",
        "marker;": "▮",
        "mcomma;": "⨩",
        "Mcy;": "М",
        "mcy;": "м",
        "mdash;": "—",
        "mDDot;": "∺",
        "measuredangle;": "∡",
        "MediumSpace;": " ",
        "Mellintrf;": "ℳ",
        "Mfr;": "𝔐",
        "mfr;": "𝔪",
        "mho;": "℧",
        "micro;": "µ",
        micro: "µ",
        "mid;": "∣",
        "midast;": "*",
        "midcir;": "⫰",
        "middot;": "·",
        middot: "·",
        "minus;": "−",
        "minusb;": "⊟",
        "minusd;": "∸",
        "minusdu;": "⨪",
        "MinusPlus;": "∓",
        "mlcp;": "⫛",
        "mldr;": "…",
        "mnplus;": "∓",
        "models;": "⊧",
        "Mopf;": "𝕄",
        "mopf;": "𝕞",
        "mp;": "∓",
        "Mscr;": "ℳ",
        "mscr;": "𝓂",
        "mstpos;": "∾",
        "Mu;": "Μ",
        "mu;": "μ",
        "multimap;": "⊸",
        "mumap;": "⊸",
        "nabla;": "∇",
        "Nacute;": "Ń",
        "nacute;": "ń",
        "nang;": "∠⃒",
        "nap;": "≉",
        "napE;": "⩰̸",
        "napid;": "≋̸",
        "napos;": "ŉ",
        "napprox;": "≉",
        "natur;": "♮",
        "natural;": "♮",
        "naturals;": "ℕ",
        "nbsp;": " ",
        nbsp: " ",
        "nbump;": "≎̸",
        "nbumpe;": "≏̸",
        "ncap;": "⩃",
        "Ncaron;": "Ň",
        "ncaron;": "ň",
        "Ncedil;": "Ņ",
        "ncedil;": "ņ",
        "ncong;": "≇",
        "ncongdot;": "⩭̸",
        "ncup;": "⩂",
        "Ncy;": "Н",
        "ncy;": "н",
        "ndash;": "–",
        "ne;": "≠",
        "nearhk;": "⤤",
        "neArr;": "⇗",
        "nearr;": "↗",
        "nearrow;": "↗",
        "nedot;": "≐̸",
        "NegativeMediumSpace;": "​",
        "NegativeThickSpace;": "​",
        "NegativeThinSpace;": "​",
        "NegativeVeryThinSpace;": "​",
        "nequiv;": "≢",
        "nesear;": "⤨",
        "nesim;": "≂̸",
        "NestedGreaterGreater;": "≫",
        "NestedLessLess;": "≪",
        "NewLine;": "\n",
        "nexist;": "∄",
        "nexists;": "∄",
        "Nfr;": "𝔑",
        "nfr;": "𝔫",
        "ngE;": "≧̸",
        "nge;": "≱",
        "ngeq;": "≱",
        "ngeqq;": "≧̸",
        "ngeqslant;": "⩾̸",
        "nges;": "⩾̸",
        "nGg;": "⋙̸",
        "ngsim;": "≵",
        "nGt;": "≫⃒",
        "ngt;": "≯",
        "ngtr;": "≯",
        "nGtv;": "≫̸",
        "nhArr;": "⇎",
        "nharr;": "↮",
        "nhpar;": "⫲",
        "ni;": "∋",
        "nis;": "⋼",
        "nisd;": "⋺",
        "niv;": "∋",
        "NJcy;": "Њ",
        "njcy;": "њ",
        "nlArr;": "⇍",
        "nlarr;": "↚",
        "nldr;": "‥",
        "nlE;": "≦̸",
        "nle;": "≰",
        "nLeftarrow;": "⇍",
        "nleftarrow;": "↚",
        "nLeftrightarrow;": "⇎",
        "nleftrightarrow;": "↮",
        "nleq;": "≰",
        "nleqq;": "≦̸",
        "nleqslant;": "⩽̸",
        "nles;": "⩽̸",
        "nless;": "≮",
        "nLl;": "⋘̸",
        "nlsim;": "≴",
        "nLt;": "≪⃒",
        "nlt;": "≮",
        "nltri;": "⋪",
        "nltrie;": "⋬",
        "nLtv;": "≪̸",
        "nmid;": "∤",
        "NoBreak;": "⁠",
        "NonBreakingSpace;": " ",
        "Nopf;": "ℕ",
        "nopf;": "𝕟",
        "Not;": "⫬",
        "not;": "¬",
        not: "¬",
        "NotCongruent;": "≢",
        "NotCupCap;": "≭",
        "NotDoubleVerticalBar;": "∦",
        "NotElement;": "∉",
        "NotEqual;": "≠",
        "NotEqualTilde;": "≂̸",
        "NotExists;": "∄",
        "NotGreater;": "≯",
        "NotGreaterEqual;": "≱",
        "NotGreaterFullEqual;": "≧̸",
        "NotGreaterGreater;": "≫̸",
        "NotGreaterLess;": "≹",
        "NotGreaterSlantEqual;": "⩾̸",
        "NotGreaterTilde;": "≵",
        "NotHumpDownHump;": "≎̸",
        "NotHumpEqual;": "≏̸",
        "notin;": "∉",
        "notindot;": "⋵̸",
        "notinE;": "⋹̸",
        "notinva;": "∉",
        "notinvb;": "⋷",
        "notinvc;": "⋶",
        "NotLeftTriangle;": "⋪",
        "NotLeftTriangleBar;": "⧏̸",
        "NotLeftTriangleEqual;": "⋬",
        "NotLess;": "≮",
        "NotLessEqual;": "≰",
        "NotLessGreater;": "≸",
        "NotLessLess;": "≪̸",
        "NotLessSlantEqual;": "⩽̸",
        "NotLessTilde;": "≴",
        "NotNestedGreaterGreater;": "⪢̸",
        "NotNestedLessLess;": "⪡̸",
        "notni;": "∌",
        "notniva;": "∌",
        "notnivb;": "⋾",
        "notnivc;": "⋽",
        "NotPrecedes;": "⊀",
        "NotPrecedesEqual;": "⪯̸",
        "NotPrecedesSlantEqual;": "⋠",
        "NotReverseElement;": "∌",
        "NotRightTriangle;": "⋫",
        "NotRightTriangleBar;": "⧐̸",
        "NotRightTriangleEqual;": "⋭",
        "NotSquareSubset;": "⊏̸",
        "NotSquareSubsetEqual;": "⋢",
        "NotSquareSuperset;": "⊐̸",
        "NotSquareSupersetEqual;": "⋣",
        "NotSubset;": "⊂⃒",
        "NotSubsetEqual;": "⊈",
        "NotSucceeds;": "⊁",
        "NotSucceedsEqual;": "⪰̸",
        "NotSucceedsSlantEqual;": "⋡",
        "NotSucceedsTilde;": "≿̸",
        "NotSuperset;": "⊃⃒",
        "NotSupersetEqual;": "⊉",
        "NotTilde;": "≁",
        "NotTildeEqual;": "≄",
        "NotTildeFullEqual;": "≇",
        "NotTildeTilde;": "≉",
        "NotVerticalBar;": "∤",
        "npar;": "∦",
        "nparallel;": "∦",
        "nparsl;": "⫽⃥",
        "npart;": "∂̸",
        "npolint;": "⨔",
        "npr;": "⊀",
        "nprcue;": "⋠",
        "npre;": "⪯̸",
        "nprec;": "⊀",
        "npreceq;": "⪯̸",
        "nrArr;": "⇏",
        "nrarr;": "↛",
        "nrarrc;": "⤳̸",
        "nrarrw;": "↝̸",
        "nRightarrow;": "⇏",
        "nrightarrow;": "↛",
        "nrtri;": "⋫",
        "nrtrie;": "⋭",
        "nsc;": "⊁",
        "nsccue;": "⋡",
        "nsce;": "⪰̸",
        "Nscr;": "𝒩",
        "nscr;": "𝓃",
        "nshortmid;": "∤",
        "nshortparallel;": "∦",
        "nsim;": "≁",
        "nsime;": "≄",
        "nsimeq;": "≄",
        "nsmid;": "∤",
        "nspar;": "∦",
        "nsqsube;": "⋢",
        "nsqsupe;": "⋣",
        "nsub;": "⊄",
        "nsubE;": "⫅̸",
        "nsube;": "⊈",
        "nsubset;": "⊂⃒",
        "nsubseteq;": "⊈",
        "nsubseteqq;": "⫅̸",
        "nsucc;": "⊁",
        "nsucceq;": "⪰̸",
        "nsup;": "⊅",
        "nsupE;": "⫆̸",
        "nsupe;": "⊉",
        "nsupset;": "⊃⃒",
        "nsupseteq;": "⊉",
        "nsupseteqq;": "⫆̸",
        "ntgl;": "≹",
        "Ntilde;": "Ñ",
        Ntilde: "Ñ",
        "ntilde;": "ñ",
        ntilde: "ñ",
        "ntlg;": "≸",
        "ntriangleleft;": "⋪",
        "ntrianglelefteq;": "⋬",
        "ntriangleright;": "⋫",
        "ntrianglerighteq;": "⋭",
        "Nu;": "Ν",
        "nu;": "ν",
        "num;": "#",
        "numero;": "№",
        "numsp;": " ",
        "nvap;": "≍⃒",
        "nVDash;": "⊯",
        "nVdash;": "⊮",
        "nvDash;": "⊭",
        "nvdash;": "⊬",
        "nvge;": "≥⃒",
        "nvgt;": ">⃒",
        "nvHarr;": "⤄",
        "nvinfin;": "⧞",
        "nvlArr;": "⤂",
        "nvle;": "≤⃒",
        "nvlt;": "<⃒",
        "nvltrie;": "⊴⃒",
        "nvrArr;": "⤃",
        "nvrtrie;": "⊵⃒",
        "nvsim;": "∼⃒",
        "nwarhk;": "⤣",
        "nwArr;": "⇖",
        "nwarr;": "↖",
        "nwarrow;": "↖",
        "nwnear;": "⤧",
        "Oacute;": "Ó",
        Oacute: "Ó",
        "oacute;": "ó",
        oacute: "ó",
        "oast;": "⊛",
        "ocir;": "⊚",
        "Ocirc;": "Ô",
        Ocirc: "Ô",
        "ocirc;": "ô",
        ocirc: "ô",
        "Ocy;": "О",
        "ocy;": "о",
        "odash;": "⊝",
        "Odblac;": "Ő",
        "odblac;": "ő",
        "odiv;": "⨸",
        "odot;": "⊙",
        "odsold;": "⦼",
        "OElig;": "Œ",
        "oelig;": "œ",
        "ofcir;": "⦿",
        "Ofr;": "𝔒",
        "ofr;": "𝔬",
        "ogon;": "˛",
        "Ograve;": "Ò",
        Ograve: "Ò",
        "ograve;": "ò",
        ograve: "ò",
        "ogt;": "⧁",
        "ohbar;": "⦵",
        "ohm;": "Ω",
        "oint;": "∮",
        "olarr;": "↺",
        "olcir;": "⦾",
        "olcross;": "⦻",
        "oline;": "‾",
        "olt;": "⧀",
        "Omacr;": "Ō",
        "omacr;": "ō",
        "Omega;": "Ω",
        "omega;": "ω",
        "Omicron;": "Ο",
        "omicron;": "ο",
        "omid;": "⦶",
        "ominus;": "⊖",
        "Oopf;": "𝕆",
        "oopf;": "𝕠",
        "opar;": "⦷",
        "OpenCurlyDoubleQuote;": "“",
        "OpenCurlyQuote;": "‘",
        "operp;": "⦹",
        "oplus;": "⊕",
        "Or;": "⩔",
        "or;": "∨",
        "orarr;": "↻",
        "ord;": "⩝",
        "order;": "ℴ",
        "orderof;": "ℴ",
        "ordf;": "ª",
        ordf: "ª",
        "ordm;": "º",
        ordm: "º",
        "origof;": "⊶",
        "oror;": "⩖",
        "orslope;": "⩗",
        "orv;": "⩛",
        "oS;": "Ⓢ",
        "Oscr;": "𝒪",
        "oscr;": "ℴ",
        "Oslash;": "Ø",
        Oslash: "Ø",
        "oslash;": "ø",
        oslash: "ø",
        "osol;": "⊘",
        "Otilde;": "Õ",
        Otilde: "Õ",
        "otilde;": "õ",
        otilde: "õ",
        "Otimes;": "⨷",
        "otimes;": "⊗",
        "otimesas;": "⨶",
        "Ouml;": "Ö",
        Ouml: "Ö",
        "ouml;": "ö",
        ouml: "ö",
        "ovbar;": "⌽",
        "OverBar;": "‾",
        "OverBrace;": "⏞",
        "OverBracket;": "⎴",
        "OverParenthesis;": "⏜",
        "par;": "∥",
        "para;": "¶",
        para: "¶",
        "parallel;": "∥",
        "parsim;": "⫳",
        "parsl;": "⫽",
        "part;": "∂",
        "PartialD;": "∂",
        "Pcy;": "П",
        "pcy;": "п",
        "percnt;": "%",
        "period;": ".",
        "permil;": "‰",
        "perp;": "⊥",
        "pertenk;": "‱",
        "Pfr;": "𝔓",
        "pfr;": "𝔭",
        "Phi;": "Φ",
        "phi;": "φ",
        "phiv;": "ϕ",
        "phmmat;": "ℳ",
        "phone;": "☎",
        "Pi;": "Π",
        "pi;": "π",
        "pitchfork;": "⋔",
        "piv;": "ϖ",
        "planck;": "ℏ",
        "planckh;": "ℎ",
        "plankv;": "ℏ",
        "plus;": "+",
        "plusacir;": "⨣",
        "plusb;": "⊞",
        "pluscir;": "⨢",
        "plusdo;": "∔",
        "plusdu;": "⨥",
        "pluse;": "⩲",
        "PlusMinus;": "±",
        "plusmn;": "±",
        plusmn: "±",
        "plussim;": "⨦",
        "plustwo;": "⨧",
        "pm;": "±",
        "Poincareplane;": "ℌ",
        "pointint;": "⨕",
        "Popf;": "ℙ",
        "popf;": "𝕡",
        "pound;": "£",
        pound: "£",
        "Pr;": "⪻",
        "pr;": "≺",
        "prap;": "⪷",
        "prcue;": "≼",
        "prE;": "⪳",
        "pre;": "⪯",
        "prec;": "≺",
        "precapprox;": "⪷",
        "preccurlyeq;": "≼",
        "Precedes;": "≺",
        "PrecedesEqual;": "⪯",
        "PrecedesSlantEqual;": "≼",
        "PrecedesTilde;": "≾",
        "preceq;": "⪯",
        "precnapprox;": "⪹",
        "precneqq;": "⪵",
        "precnsim;": "⋨",
        "precsim;": "≾",
        "Prime;": "″",
        "prime;": "′",
        "primes;": "ℙ",
        "prnap;": "⪹",
        "prnE;": "⪵",
        "prnsim;": "⋨",
        "prod;": "∏",
        "Product;": "∏",
        "profalar;": "⌮",
        "profline;": "⌒",
        "profsurf;": "⌓",
        "prop;": "∝",
        "Proportion;": "∷",
        "Proportional;": "∝",
        "propto;": "∝",
        "prsim;": "≾",
        "prurel;": "⊰",
        "Pscr;": "𝒫",
        "pscr;": "𝓅",
        "Psi;": "Ψ",
        "psi;": "ψ",
        "puncsp;": " ",
        "Qfr;": "𝔔",
        "qfr;": "𝔮",
        "qint;": "⨌",
        "Qopf;": "ℚ",
        "qopf;": "𝕢",
        "qprime;": "⁗",
        "Qscr;": "𝒬",
        "qscr;": "𝓆",
        "quaternions;": "ℍ",
        "quatint;": "⨖",
        "quest;": "?",
        "questeq;": "≟",
        "QUOT;": '"',
        QUOT: '"',
        "quot;": '"',
        quot: '"',
        "rAarr;": "⇛",
        "race;": "∽̱",
        "Racute;": "Ŕ",
        "racute;": "ŕ",
        "radic;": "√",
        "raemptyv;": "⦳",
        "Rang;": "⟫",
        "rang;": "⟩",
        "rangd;": "⦒",
        "range;": "⦥",
        "rangle;": "⟩",
        "raquo;": "»",
        raquo: "»",
        "Rarr;": "↠",
        "rArr;": "⇒",
        "rarr;": "→",
        "rarrap;": "⥵",
        "rarrb;": "⇥",
        "rarrbfs;": "⤠",
        "rarrc;": "⤳",
        "rarrfs;": "⤞",
        "rarrhk;": "↪",
        "rarrlp;": "↬",
        "rarrpl;": "⥅",
        "rarrsim;": "⥴",
        "Rarrtl;": "⤖",
        "rarrtl;": "↣",
        "rarrw;": "↝",
        "rAtail;": "⤜",
        "ratail;": "⤚",
        "ratio;": "∶",
        "rationals;": "ℚ",
        "RBarr;": "⤐",
        "rBarr;": "⤏",
        "rbarr;": "⤍",
        "rbbrk;": "❳",
        "rbrace;": "}",
        "rbrack;": "]",
        "rbrke;": "⦌",
        "rbrksld;": "⦎",
        "rbrkslu;": "⦐",
        "Rcaron;": "Ř",
        "rcaron;": "ř",
        "Rcedil;": "Ŗ",
        "rcedil;": "ŗ",
        "rceil;": "⌉",
        "rcub;": "}",
        "Rcy;": "Р",
        "rcy;": "р",
        "rdca;": "⤷",
        "rdldhar;": "⥩",
        "rdquo;": "”",
        "rdquor;": "”",
        "rdsh;": "↳",
        "Re;": "ℜ",
        "real;": "ℜ",
        "realine;": "ℛ",
        "realpart;": "ℜ",
        "reals;": "ℝ",
        "rect;": "▭",
        "REG;": "®",
        REG: "®",
        "reg;": "®",
        reg: "®",
        "ReverseElement;": "∋",
        "ReverseEquilibrium;": "⇋",
        "ReverseUpEquilibrium;": "⥯",
        "rfisht;": "⥽",
        "rfloor;": "⌋",
        "Rfr;": "ℜ",
        "rfr;": "𝔯",
        "rHar;": "⥤",
        "rhard;": "⇁",
        "rharu;": "⇀",
        "rharul;": "⥬",
        "Rho;": "Ρ",
        "rho;": "ρ",
        "rhov;": "ϱ",
        "RightAngleBracket;": "⟩",
        "RightArrow;": "→",
        "Rightarrow;": "⇒",
        "rightarrow;": "→",
        "RightArrowBar;": "⇥",
        "RightArrowLeftArrow;": "⇄",
        "rightarrowtail;": "↣",
        "RightCeiling;": "⌉",
        "RightDoubleBracket;": "⟧",
        "RightDownTeeVector;": "⥝",
        "RightDownVector;": "⇂",
        "RightDownVectorBar;": "⥕",
        "RightFloor;": "⌋",
        "rightharpoondown;": "⇁",
        "rightharpoonup;": "⇀",
        "rightleftarrows;": "⇄",
        "rightleftharpoons;": "⇌",
        "rightrightarrows;": "⇉",
        "rightsquigarrow;": "↝",
        "RightTee;": "⊢",
        "RightTeeArrow;": "↦",
        "RightTeeVector;": "⥛",
        "rightthreetimes;": "⋌",
        "RightTriangle;": "⊳",
        "RightTriangleBar;": "⧐",
        "RightTriangleEqual;": "⊵",
        "RightUpDownVector;": "⥏",
        "RightUpTeeVector;": "⥜",
        "RightUpVector;": "↾",
        "RightUpVectorBar;": "⥔",
        "RightVector;": "⇀",
        "RightVectorBar;": "⥓",
        "ring;": "˚",
        "risingdotseq;": "≓",
        "rlarr;": "⇄",
        "rlhar;": "⇌",
        "rlm;": "‏",
        "rmoust;": "⎱",
        "rmoustache;": "⎱",
        "rnmid;": "⫮",
        "roang;": "⟭",
        "roarr;": "⇾",
        "robrk;": "⟧",
        "ropar;": "⦆",
        "Ropf;": "ℝ",
        "ropf;": "𝕣",
        "roplus;": "⨮",
        "rotimes;": "⨵",
        "RoundImplies;": "⥰",
        "rpar;": ")",
        "rpargt;": "⦔",
        "rppolint;": "⨒",
        "rrarr;": "⇉",
        "Rrightarrow;": "⇛",
        "rsaquo;": "›",
        "Rscr;": "ℛ",
        "rscr;": "𝓇",
        "Rsh;": "↱",
        "rsh;": "↱",
        "rsqb;": "]",
        "rsquo;": "’",
        "rsquor;": "’",
        "rthree;": "⋌",
        "rtimes;": "⋊",
        "rtri;": "▹",
        "rtrie;": "⊵",
        "rtrif;": "▸",
        "rtriltri;": "⧎",
        "RuleDelayed;": "⧴",
        "ruluhar;": "⥨",
        "rx;": "℞",
        "Sacute;": "Ś",
        "sacute;": "ś",
        "sbquo;": "‚",
        "Sc;": "⪼",
        "sc;": "≻",
        "scap;": "⪸",
        "Scaron;": "Š",
        "scaron;": "š",
        "sccue;": "≽",
        "scE;": "⪴",
        "sce;": "⪰",
        "Scedil;": "Ş",
        "scedil;": "ş",
        "Scirc;": "Ŝ",
        "scirc;": "ŝ",
        "scnap;": "⪺",
        "scnE;": "⪶",
        "scnsim;": "⋩",
        "scpolint;": "⨓",
        "scsim;": "≿",
        "Scy;": "С",
        "scy;": "с",
        "sdot;": "⋅",
        "sdotb;": "⊡",
        "sdote;": "⩦",
        "searhk;": "⤥",
        "seArr;": "⇘",
        "searr;": "↘",
        "searrow;": "↘",
        "sect;": "§",
        sect: "§",
        "semi;": ";",
        "seswar;": "⤩",
        "setminus;": "∖",
        "setmn;": "∖",
        "sext;": "✶",
        "Sfr;": "𝔖",
        "sfr;": "𝔰",
        "sfrown;": "⌢",
        "sharp;": "♯",
        "SHCHcy;": "Щ",
        "shchcy;": "щ",
        "SHcy;": "Ш",
        "shcy;": "ш",
        "ShortDownArrow;": "↓",
        "ShortLeftArrow;": "←",
        "shortmid;": "∣",
        "shortparallel;": "∥",
        "ShortRightArrow;": "→",
        "ShortUpArrow;": "↑",
        "shy;": "­",
        shy: "­",
        "Sigma;": "Σ",
        "sigma;": "σ",
        "sigmaf;": "ς",
        "sigmav;": "ς",
        "sim;": "∼",
        "simdot;": "⩪",
        "sime;": "≃",
        "simeq;": "≃",
        "simg;": "⪞",
        "simgE;": "⪠",
        "siml;": "⪝",
        "simlE;": "⪟",
        "simne;": "≆",
        "simplus;": "⨤",
        "simrarr;": "⥲",
        "slarr;": "←",
        "SmallCircle;": "∘",
        "smallsetminus;": "∖",
        "smashp;": "⨳",
        "smeparsl;": "⧤",
        "smid;": "∣",
        "smile;": "⌣",
        "smt;": "⪪",
        "smte;": "⪬",
        "smtes;": "⪬︀",
        "SOFTcy;": "Ь",
        "softcy;": "ь",
        "sol;": "/",
        "solb;": "⧄",
        "solbar;": "⌿",
        "Sopf;": "𝕊",
        "sopf;": "𝕤",
        "spades;": "♠",
        "spadesuit;": "♠",
        "spar;": "∥",
        "sqcap;": "⊓",
        "sqcaps;": "⊓︀",
        "sqcup;": "⊔",
        "sqcups;": "⊔︀",
        "Sqrt;": "√",
        "sqsub;": "⊏",
        "sqsube;": "⊑",
        "sqsubset;": "⊏",
        "sqsubseteq;": "⊑",
        "sqsup;": "⊐",
        "sqsupe;": "⊒",
        "sqsupset;": "⊐",
        "sqsupseteq;": "⊒",
        "squ;": "□",
        "Square;": "□",
        "square;": "□",
        "SquareIntersection;": "⊓",
        "SquareSubset;": "⊏",
        "SquareSubsetEqual;": "⊑",
        "SquareSuperset;": "⊐",
        "SquareSupersetEqual;": "⊒",
        "SquareUnion;": "⊔",
        "squarf;": "▪",
        "squf;": "▪",
        "srarr;": "→",
        "Sscr;": "𝒮",
        "sscr;": "𝓈",
        "ssetmn;": "∖",
        "ssmile;": "⌣",
        "sstarf;": "⋆",
        "Star;": "⋆",
        "star;": "☆",
        "starf;": "★",
        "straightepsilon;": "ϵ",
        "straightphi;": "ϕ",
        "strns;": "¯",
        "Sub;": "⋐",
        "sub;": "⊂",
        "subdot;": "⪽",
        "subE;": "⫅",
        "sube;": "⊆",
        "subedot;": "⫃",
        "submult;": "⫁",
        "subnE;": "⫋",
        "subne;": "⊊",
        "subplus;": "⪿",
        "subrarr;": "⥹",
        "Subset;": "⋐",
        "subset;": "⊂",
        "subseteq;": "⊆",
        "subseteqq;": "⫅",
        "SubsetEqual;": "⊆",
        "subsetneq;": "⊊",
        "subsetneqq;": "⫋",
        "subsim;": "⫇",
        "subsub;": "⫕",
        "subsup;": "⫓",
        "succ;": "≻",
        "succapprox;": "⪸",
        "succcurlyeq;": "≽",
        "Succeeds;": "≻",
        "SucceedsEqual;": "⪰",
        "SucceedsSlantEqual;": "≽",
        "SucceedsTilde;": "≿",
        "succeq;": "⪰",
        "succnapprox;": "⪺",
        "succneqq;": "⪶",
        "succnsim;": "⋩",
        "succsim;": "≿",
        "SuchThat;": "∋",
        "Sum;": "∑",
        "sum;": "∑",
        "sung;": "♪",
        "Sup;": "⋑",
        "sup;": "⊃",
        "sup1;": "¹",
        sup1: "¹",
        "sup2;": "²",
        sup2: "²",
        "sup3;": "³",
        sup3: "³",
        "supdot;": "⪾",
        "supdsub;": "⫘",
        "supE;": "⫆",
        "supe;": "⊇",
        "supedot;": "⫄",
        "Superset;": "⊃",
        "SupersetEqual;": "⊇",
        "suphsol;": "⟉",
        "suphsub;": "⫗",
        "suplarr;": "⥻",
        "supmult;": "⫂",
        "supnE;": "⫌",
        "supne;": "⊋",
        "supplus;": "⫀",
        "Supset;": "⋑",
        "supset;": "⊃",
        "supseteq;": "⊇",
        "supseteqq;": "⫆",
        "supsetneq;": "⊋",
        "supsetneqq;": "⫌",
        "supsim;": "⫈",
        "supsub;": "⫔",
        "supsup;": "⫖",
        "swarhk;": "⤦",
        "swArr;": "⇙",
        "swarr;": "↙",
        "swarrow;": "↙",
        "swnwar;": "⤪",
        "szlig;": "ß",
        szlig: "ß",
        "Tab;": "\t",
        "target;": "⌖",
        "Tau;": "Τ",
        "tau;": "τ",
        "tbrk;": "⎴",
        "Tcaron;": "Ť",
        "tcaron;": "ť",
        "Tcedil;": "Ţ",
        "tcedil;": "ţ",
        "Tcy;": "Т",
        "tcy;": "т",
        "tdot;": "⃛",
        "telrec;": "⌕",
        "Tfr;": "𝔗",
        "tfr;": "𝔱",
        "there4;": "∴",
        "Therefore;": "∴",
        "therefore;": "∴",
        "Theta;": "Θ",
        "theta;": "θ",
        "thetasym;": "ϑ",
        "thetav;": "ϑ",
        "thickapprox;": "≈",
        "thicksim;": "∼",
        "ThickSpace;": "  ",
        "thinsp;": " ",
        "ThinSpace;": " ",
        "thkap;": "≈",
        "thksim;": "∼",
        "THORN;": "Þ",
        THORN: "Þ",
        "thorn;": "þ",
        thorn: "þ",
        "Tilde;": "∼",
        "tilde;": "˜",
        "TildeEqual;": "≃",
        "TildeFullEqual;": "≅",
        "TildeTilde;": "≈",
        "times;": "×",
        times: "×",
        "timesb;": "⊠",
        "timesbar;": "⨱",
        "timesd;": "⨰",
        "tint;": "∭",
        "toea;": "⤨",
        "top;": "⊤",
        "topbot;": "⌶",
        "topcir;": "⫱",
        "Topf;": "𝕋",
        "topf;": "𝕥",
        "topfork;": "⫚",
        "tosa;": "⤩",
        "tprime;": "‴",
        "TRADE;": "™",
        "trade;": "™",
        "triangle;": "▵",
        "triangledown;": "▿",
        "triangleleft;": "◃",
        "trianglelefteq;": "⊴",
        "triangleq;": "≜",
        "triangleright;": "▹",
        "trianglerighteq;": "⊵",
        "tridot;": "◬",
        "trie;": "≜",
        "triminus;": "⨺",
        "TripleDot;": "⃛",
        "triplus;": "⨹",
        "trisb;": "⧍",
        "tritime;": "⨻",
        "trpezium;": "⏢",
        "Tscr;": "𝒯",
        "tscr;": "𝓉",
        "TScy;": "Ц",
        "tscy;": "ц",
        "TSHcy;": "Ћ",
        "tshcy;": "ћ",
        "Tstrok;": "Ŧ",
        "tstrok;": "ŧ",
        "twixt;": "≬",
        "twoheadleftarrow;": "↞",
        "twoheadrightarrow;": "↠",
        "Uacute;": "Ú",
        Uacute: "Ú",
        "uacute;": "ú",
        uacute: "ú",
        "Uarr;": "↟",
        "uArr;": "⇑",
        "uarr;": "↑",
        "Uarrocir;": "⥉",
        "Ubrcy;": "Ў",
        "ubrcy;": "ў",
        "Ubreve;": "Ŭ",
        "ubreve;": "ŭ",
        "Ucirc;": "Û",
        Ucirc: "Û",
        "ucirc;": "û",
        ucirc: "û",
        "Ucy;": "У",
        "ucy;": "у",
        "udarr;": "⇅",
        "Udblac;": "Ű",
        "udblac;": "ű",
        "udhar;": "⥮",
        "ufisht;": "⥾",
        "Ufr;": "𝔘",
        "ufr;": "𝔲",
        "Ugrave;": "Ù",
        Ugrave: "Ù",
        "ugrave;": "ù",
        ugrave: "ù",
        "uHar;": "⥣",
        "uharl;": "↿",
        "uharr;": "↾",
        "uhblk;": "▀",
        "ulcorn;": "⌜",
        "ulcorner;": "⌜",
        "ulcrop;": "⌏",
        "ultri;": "◸",
        "Umacr;": "Ū",
        "umacr;": "ū",
        "uml;": "¨",
        uml: "¨",
        "UnderBar;": "_",
        "UnderBrace;": "⏟",
        "UnderBracket;": "⎵",
        "UnderParenthesis;": "⏝",
        "Union;": "⋃",
        "UnionPlus;": "⊎",
        "Uogon;": "Ų",
        "uogon;": "ų",
        "Uopf;": "𝕌",
        "uopf;": "𝕦",
        "UpArrow;": "↑",
        "Uparrow;": "⇑",
        "uparrow;": "↑",
        "UpArrowBar;": "⤒",
        "UpArrowDownArrow;": "⇅",
        "UpDownArrow;": "↕",
        "Updownarrow;": "⇕",
        "updownarrow;": "↕",
        "UpEquilibrium;": "⥮",
        "upharpoonleft;": "↿",
        "upharpoonright;": "↾",
        "uplus;": "⊎",
        "UpperLeftArrow;": "↖",
        "UpperRightArrow;": "↗",
        "Upsi;": "ϒ",
        "upsi;": "υ",
        "upsih;": "ϒ",
        "Upsilon;": "Υ",
        "upsilon;": "υ",
        "UpTee;": "⊥",
        "UpTeeArrow;": "↥",
        "upuparrows;": "⇈",
        "urcorn;": "⌝",
        "urcorner;": "⌝",
        "urcrop;": "⌎",
        "Uring;": "Ů",
        "uring;": "ů",
        "urtri;": "◹",
        "Uscr;": "𝒰",
        "uscr;": "𝓊",
        "utdot;": "⋰",
        "Utilde;": "Ũ",
        "utilde;": "ũ",
        "utri;": "▵",
        "utrif;": "▴",
        "uuarr;": "⇈",
        "Uuml;": "Ü",
        Uuml: "Ü",
        "uuml;": "ü",
        uuml: "ü",
        "uwangle;": "⦧",
        "vangrt;": "⦜",
        "varepsilon;": "ϵ",
        "varkappa;": "ϰ",
        "varnothing;": "∅",
        "varphi;": "ϕ",
        "varpi;": "ϖ",
        "varpropto;": "∝",
        "vArr;": "⇕",
        "varr;": "↕",
        "varrho;": "ϱ",
        "varsigma;": "ς",
        "varsubsetneq;": "⊊︀",
        "varsubsetneqq;": "⫋︀",
        "varsupsetneq;": "⊋︀",
        "varsupsetneqq;": "⫌︀",
        "vartheta;": "ϑ",
        "vartriangleleft;": "⊲",
        "vartriangleright;": "⊳",
        "Vbar;": "⫫",
        "vBar;": "⫨",
        "vBarv;": "⫩",
        "Vcy;": "В",
        "vcy;": "в",
        "VDash;": "⊫",
        "Vdash;": "⊩",
        "vDash;": "⊨",
        "vdash;": "⊢",
        "Vdashl;": "⫦",
        "Vee;": "⋁",
        "vee;": "∨",
        "veebar;": "⊻",
        "veeeq;": "≚",
        "vellip;": "⋮",
        "Verbar;": "‖",
        "verbar;": "|",
        "Vert;": "‖",
        "vert;": "|",
        "VerticalBar;": "∣",
        "VerticalLine;": "|",
        "VerticalSeparator;": "❘",
        "VerticalTilde;": "≀",
        "VeryThinSpace;": " ",
        "Vfr;": "𝔙",
        "vfr;": "𝔳",
        "vltri;": "⊲",
        "vnsub;": "⊂⃒",
        "vnsup;": "⊃⃒",
        "Vopf;": "𝕍",
        "vopf;": "𝕧",
        "vprop;": "∝",
        "vrtri;": "⊳",
        "Vscr;": "𝒱",
        "vscr;": "𝓋",
        "vsubnE;": "⫋︀",
        "vsubne;": "⊊︀",
        "vsupnE;": "⫌︀",
        "vsupne;": "⊋︀",
        "Vvdash;": "⊪",
        "vzigzag;": "⦚",
        "Wcirc;": "Ŵ",
        "wcirc;": "ŵ",
        "wedbar;": "⩟",
        "Wedge;": "⋀",
        "wedge;": "∧",
        "wedgeq;": "≙",
        "weierp;": "℘",
        "Wfr;": "𝔚",
        "wfr;": "𝔴",
        "Wopf;": "𝕎",
        "wopf;": "𝕨",
        "wp;": "℘",
        "wr;": "≀",
        "wreath;": "≀",
        "Wscr;": "𝒲",
        "wscr;": "𝓌",
        "xcap;": "⋂",
        "xcirc;": "◯",
        "xcup;": "⋃",
        "xdtri;": "▽",
        "Xfr;": "𝔛",
        "xfr;": "𝔵",
        "xhArr;": "⟺",
        "xharr;": "⟷",
        "Xi;": "Ξ",
        "xi;": "ξ",
        "xlArr;": "⟸",
        "xlarr;": "⟵",
        "xmap;": "⟼",
        "xnis;": "⋻",
        "xodot;": "⨀",
        "Xopf;": "𝕏",
        "xopf;": "𝕩",
        "xoplus;": "⨁",
        "xotime;": "⨂",
        "xrArr;": "⟹",
        "xrarr;": "⟶",
        "Xscr;": "𝒳",
        "xscr;": "𝓍",
        "xsqcup;": "⨆",
        "xuplus;": "⨄",
        "xutri;": "△",
        "xvee;": "⋁",
        "xwedge;": "⋀",
        "Yacute;": "Ý",
        Yacute: "Ý",
        "yacute;": "ý",
        yacute: "ý",
        "YAcy;": "Я",
        "yacy;": "я",
        "Ycirc;": "Ŷ",
        "ycirc;": "ŷ",
        "Ycy;": "Ы",
        "ycy;": "ы",
        "yen;": "¥",
        yen: "¥",
        "Yfr;": "𝔜",
        "yfr;": "𝔶",
        "YIcy;": "Ї",
        "yicy;": "ї",
        "Yopf;": "𝕐",
        "yopf;": "𝕪",
        "Yscr;": "𝒴",
        "yscr;": "𝓎",
        "YUcy;": "Ю",
        "yucy;": "ю",
        "Yuml;": "Ÿ",
        "yuml;": "ÿ",
        yuml: "ÿ",
        "Zacute;": "Ź",
        "zacute;": "ź",
        "Zcaron;": "Ž",
        "zcaron;": "ž",
        "Zcy;": "З",
        "zcy;": "з",
        "Zdot;": "Ż",
        "zdot;": "ż",
        "zeetrf;": "ℨ",
        "ZeroWidthSpace;": "​",
        "Zeta;": "Ζ",
        "zeta;": "ζ",
        "Zfr;": "ℨ",
        "zfr;": "𝔷",
        "ZHcy;": "Ж",
        "zhcy;": "ж",
        "zigrarr;": "⇝",
        "Zopf;": "ℤ",
        "zopf;": "𝕫",
        "Zscr;": "𝒵",
        "zscr;": "𝓏",
        "zwj;": "‍",
        "zwnj;": "‌",
      });
  }),
  (function (e) {
    if ("object" == typeof module && "object" == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      "function" == typeof define &&
        define.amd &&
        define(
          "vscode-html-languageservice/utils/strings",
          ["require", "exports"],
          e
        );
  })(function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.startsWith = function (e, t) {
        if (e.length < t.length) return !1;
        for (var n = 0; n < t.length; n++) if (e[n] !== t[n]) return !1;
        return !0;
      }),
      (t.endsWith = function (e, t) {
        var n = e.length - t.length;
        return 0 < n ? e.lastIndexOf(t) === n : 0 === n && e === t;
      }),
      (t.commonPrefixLength = function (e, t) {
        var n,
          i = Math.min(e.length, t.length);
        for (n = 0; n < i; n++)
          if (e.charCodeAt(n) !== t.charCodeAt(n)) return n;
        return i;
      }),
      (t.repeat = function (e, t) {
        for (var n = ""; 0 < t; )
          1 == (1 & t) && (n += e), (e += e), (t >>>= 1);
        return n;
      });
    var i = "a".charCodeAt(0),
      r = "z".charCodeAt(0),
      a = "A".charCodeAt(0),
      o = "Z".charCodeAt(0),
      s = "0".charCodeAt(0),
      l = "9".charCodeAt(0);
    t.isLetterOrDigit = function (e, t) {
      var n = e.charCodeAt(t);
      return (i <= n && n <= r) || (a <= n && n <= o) || (s <= n && n <= l);
    };
  }),
  (function (e) {
    if ("object" == typeof module && "object" == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      "function" == typeof define &&
        define.amd &&
        define(
          "vscode-html-languageservice/languageFacts/dataProvider",
          ["require", "exports"],
          e
        );
  })(function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var n = (function () {
      function e(e, t) {
        var n = this;
        (this.id = e),
          (this._tags = []),
          (this._tagMap = {}),
          (this._attributeMap = {}),
          (this._valueSetMap = {}),
          (this._tags = t.tags || []),
          (this._globalAttributes = t.globalAttributes || []),
          this._tags.forEach(function (e) {
            (n._tagMap[e.name] = e).attributes &&
              e.attributes.forEach(function (e) {
                n._attributeMap[e.name] = e;
              });
          }),
          this._globalAttributes.forEach(function (e) {
            n._attributeMap[e.name] = e;
          }),
          t.valueSets &&
            t.valueSets.forEach(function (e) {
              n._valueSetMap[e.name] = e.values;
            });
      }
      return (
        (e.prototype.isApplicable = function () {
          return !0;
        }),
        (e.prototype.getId = function () {
          return this.id;
        }),
        (e.prototype.provideTags = function () {
          return this._tags;
        }),
        (e.prototype.provideAttributes = function (e) {
          var t = [],
            n = function (e) {
              t.push({
                name: e.name,
                description: e.description,
                valueSet: e.valueSet,
              });
            };
          return (
            this._tagMap[e] &&
              this._tagMap[e].attributes.forEach(function (e) {
                n(e);
              }),
            this._globalAttributes.forEach(function (e) {
              n(e);
            }),
            t
          );
        }),
        (e.prototype.provideValues = function (e, t) {
          var n = this,
            i = [],
            r = function (e) {
              e.forEach(function (e) {
                e.name === t &&
                  (e.values &&
                    e.values.forEach(function (e) {
                      i.push(e);
                    }),
                  e.valueSet &&
                    n._valueSetMap[e.valueSet] &&
                    n._valueSetMap[e.valueSet].forEach(function (e) {
                      i.push(e);
                    }));
              });
            };
          return this._tagMap[e]
            ? (r(this._tagMap[e].attributes), r(this._globalAttributes), i)
            : [];
        }),
        e
      );
    })();
    t.HTMLDataProvider = n;
  }),
  (function (e) {
    if ("object" == typeof module && "object" == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      "function" == typeof define &&
        define.amd &&
        define(
          "vscode-html-languageservice/languageFacts/data/html5Tags",
          ["require", "exports"],
          e
        );
  })(function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.HTML5_TAGS = [
        {
          name: "html",
          description:
            "The html element represents the root of an HTML document.",
          attributes: [
            {
              name: "manifest",
              description:
                "Specifies the URI of a resource manifest indicating resources that should be cached locally. See [Using the application cache](/en-US/docs/Web/HTML/Using_the_application_cache) for details.",
            },
            {
              name: "version",
              description:
                'Specifies the version of the HTML [Document Type Definition](/en-US/docs/Glossary/DTD "Document Type Definition: In HTML, the doctype is the required "<!DOCTYPE html>" preamble found at the top of all documents. Its sole purpose is to prevent a browser from switching into so-called “quirks mode” when rendering a document; that is, the "<!DOCTYPE html>" doctype ensures that the browser makes a best-effort attempt at following the relevant specifications, rather than using a different rendering mode that is incompatible with some specifications.") that governs the current document. This attribute is not needed, because it is redundant with the version information in the document type declaration.',
            },
            {
              name: "xmlns",
              description:
                'Specifies the XML Namespace of the document. Default value is `"http://www.w3.org/1999/xhtml"`. This is required in documents parsed with XML parsers, and optional in text/html documents.',
            },
          ],
        },
        {
          name: "head",
          description:
            "The head element represents a collection of metadata for the Document.",
          attributes: [
            {
              name: "profile",
              description:
                "The URIs of one or more metadata profiles, separated by white space.",
            },
          ],
        },
        {
          name: "title",
          description:
            "The title element represents the document's title or name. Authors should use titles that identify their documents even when they are used out of context, for example in a user's history or bookmarks, or in search results. The document's title is often different from its first heading, since the first heading does not have to stand alone when taken out of context.",
          attributes: [],
        },
        {
          name: "base",
          description:
            "The base element allows authors to specify the document base URL for the purposes of resolving relative URLs, and the name of the default browsing context for the purposes of following hyperlinks. The element does not represent any content beyond this information.",
          attributes: [
            {
              name: "href",
              description:
                "The base URL to be used throughout the document for relative URL addresses. If this attribute is specified, this element must come before any other elements with attributes whose values are URLs. Absolute and relative URLs are allowed.",
            },
            {
              name: "target",
              description:
                "A name or keyword indicating the default location to display the result when hyperlinks or forms cause navigation, for elements that do not have an explicit target reference. It is a name of, or keyword for, a _browsing context_ (for example: tab, window, or inline frame). The following keywords have special meanings:\n\n*   `_self`: Load the result into the same browsing context as the current one. This value is the default if the attribute is not specified.\n*   `_blank`: Load the result into a new unnamed browsing context.\n*   `_parent`: Load the result into the parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.\n*   `_top`: Load the result into the top-level browsing context (that is, the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`.\n\nIf this attribute is specified, this element must come before any other elements with attributes whose values are URLs.",
            },
          ],
        },
        {
          name: "link",
          description:
            "The link element allows authors to link their document to other resources.",
          attributes: [
            {
              name: "href",
              description:
                'This attribute specifies the [URL](/en-US/docs/Glossary/URL "URL: Uniform Resource Locator (URL) is a text string specifying where a resource can be found on the Internet.") of the linked resource. A URL can be absolute or relative.',
            },
            {
              name: "crossorigin",
              valueSet: "xo",
              description:
                'This enumerated attribute indicates whether [CORS](/en-US/docs/Glossary/CORS "CORS: CORS (Cross-Origin Resource Sharing) is a system, consisting of transmitting HTTP headers, that determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests.") must be used when fetching the resource. [CORS-enabled images](/en-US/docs/Web/HTML/CORS_Enabled_Image) can be reused in the [`<canvas>`](/en-US/docs/Web/HTML/Element/canvas "Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.") element without being _tainted_. The allowed values are:\n\n`anonymous`\n\nA cross-origin request (i.e. with an [`Origin`](/en-US/docs/Web/HTTP/Headers/Origin "The Origin request header indicates where a fetch originates from. It doesn\'t include any path information, but only the server name. It is sent with CORS requests, as well as with POST requests. It is similar to the Referer header, but, unlike this header, it doesn\'t disclose the whole path.") HTTP header) is performed, but no credential is sent (i.e. no cookie, X.509 certificate, or HTTP Basic authentication). If the server does not give credentials to the origin site (by not setting the [`Access-Control-Allow-Origin`](/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin "The Access-Control-Allow-Origin response header indicates whether the response can be shared with requesting code from the given origin.") HTTP header) the image will be tainted and its usage restricted.\n\n`use-credentials`\n\nA cross-origin request (i.e. with an `Origin` HTTP header) is performed along with a credential sent (i.e. a cookie, certificate, and/or HTTP Basic authentication is performed). If the server does not give credentials to the origin site (through [`Access-Control-Allow-Credentials`](/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials "The Access-Control-Allow-Credentials response header tells browsers whether to expose the response to frontend JavaScript code when the request\'s credentials mode (Request.credentials) is "include".") HTTP header), the resource will be _tainted_ and its usage restricted.\n\nIf the attribute is not present, the resource is fetched without a [CORS](/en-US/docs/Glossary/CORS "CORS: CORS (Cross-Origin Resource Sharing) is a system, consisting of transmitting HTTP headers, that determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests.") request (i.e. without sending the `Origin` HTTP header), preventing its non-tainted usage. If invalid, it is handled as if the enumerated keyword **anonymous** was used. See [CORS settings attributes](/en-US/docs/Web/HTML/CORS_settings_attributes) for additional information.',
            },
            {
              name: "rel",
              description:
                "This attribute names a relationship of the linked document to the current document. The attribute must be a space-separated list of the [link types values](/en-US/docs/Web/HTML/Link_types).",
            },
            {
              name: "media",
              description:
                "This attribute specifies the media that the linked resource applies to. Its value must be a media type / [media query](/en-US/docs/Web/CSS/Media_queries). This attribute is mainly useful when linking to external stylesheets — it allows the user agent to pick the best adapted one for the device it runs on.\n\n**Notes:**\n\n*   In HTML 4, this can only be a simple white-space-separated list of media description literals, i.e., [media types and groups](/en-US/docs/Web/CSS/@media), where defined and allowed as values for this attribute, such as `print`, `screen`, `aural`, `braille`. HTML5 extended this to any kind of [media queries](/en-US/docs/Web/CSS/Media_queries), which are a superset of the allowed values of HTML 4.\n*   Browsers not supporting [CSS3 Media Queries](/en-US/docs/Web/CSS/Media_queries) won't necessarily recognize the adequate link; do not forget to set fallback links, the restricted set of media queries defined in HTML 4.",
            },
            {
              name: "hreflang",
              description:
                "This attribute indicates the language of the linked resource. It is purely advisory. Allowed values are determined by [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt). Use this attribute only if the `[href](/en-US/docs/Web/HTML/Element/a#attr-href)` attribute is present.",
            },
            {
              name: "type",
              description:
                'This attribute is used to define the type of the content linked to. The value of the attribute should be a MIME type such as **text/html**, **text/css**, and so on. The common use of this attribute is to define the type of stylesheet being referenced (such as **text/css**), but given that CSS is the only stylesheet language used on the web, not only is it possible to omit the `type` attribute, but is actually now recommended practice. It is also used on `rel="preload"` link types, to make sure the browser only downloads file types that it supports.',
            },
            {
              name: "sizes",
              description:
                "This attribute defines the sizes of the icons for visual media contained in the resource. It must be present only if the `[rel](/en-US/docs/Web/HTML/Element/link#attr-rel)` contains a value of `icon` or a non-standard type such as Apple's `apple-touch-icon`. It may have the following values:\n\n*   `any`, meaning that the icon can be scaled to any size as it is in a vector format, like `image/svg+xml`.\n*   a white-space separated list of sizes, each in the format `_<width in pixels>_x_<height in pixels>_` or `_<width in pixels>_X_<height in pixels>_`. Each of these sizes must be contained in the resource.\n\n**Note:** Most icon formats are only able to store one single icon; therefore most of the time the `[sizes](/en-US/docs/Web/HTML/Global_attributes#attr-sizes)` contains only one entry. MS's ICO format does, as well as Apple's ICNS. ICO is more ubiquitous; you should definitely use it.",
            },
            {
              name: "as",
              description:
                'This attribute is only used when `rel="preload"` or `rel="prefetch"` has been set on the `<link>` element. It specifies the type of content being loaded by the `<link>`, which is necessary for content prioritization, request matching, application of correct [content security policy](/en-US/docs/Web/HTTP/CSP), and setting of correct [`Accept`](/en-US/docs/Web/HTTP/Headers/Accept "The Accept request HTTP header advertises which content types, expressed as MIME types, the client is able to understand. Using content negotiation, the server then selects one of the proposals, uses it and informs the client of its choice with the Content-Type response header. Browsers set adequate values for this header depending on the context where the request is done: when fetching a CSS stylesheet a different value is set for the request than when fetching an image, video or a script.") request header.',
            },
            {
              name: "importance",
              description:
                "Indicates the relative importance of the resource. Priority hints are delegated using the values:",
            },
            {
              name: "importance",
              description:
                '**`auto`**: Indicates **no preference**. The browser may use its own heuristics to decide the priority of the resource.\n\n**`high`**: Indicates to the browser that the resource is of **high** priority.\n\n**`low`**: Indicates to the browser that the resource is of **low** priority.\n\n**Note:** The `importance` attribute may only be used for the `<link>` element if `rel="preload"` or `rel="prefetch"` is present.',
            },
            {
              name: "integrity",
              description:
                "Contains inline metadata — a base64-encoded cryptographic hash of the resource (file) you’re telling the browser to fetch. The browser can use this to verify that the fetched resource has been delivered free of unexpected manipulation. See [Subresource Integrity](/en-US/docs/Web/Security/Subresource_Integrity).",
            },
            {
              name: "referrerpolicy",
              description:
                'A string indicating which referrer to use when fetching the resource:\n\n*   `no-referrer` means that the [`Referer`](/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will not be sent.\n*   `no-referrer-when-downgrade` means that no [`Referer`](/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will be sent when navigating to an origin without TLS (HTTPS). This is a user agent’s default behavior, if no policy is otherwise specified.\n*   `origin` means that the referrer will be the origin of the page, which is roughly the scheme, the host, and the port.\n*   `origin-when-cross-origin` means that navigating to other origins will be limited to the scheme, the host, and the port, while navigating on the same origin will include the referrer\'s path.\n*   `unsafe-url` means that the referrer will include the origin and the path (but not the fragment, password, or username). This case is unsafe because it can leak origins and paths from TLS-protected resources to insecure origins.',
            },
            {
              name: "title",
              description:
                'The `title` attribute has special semantics on the `<link>` element. When used on a `<link rel="stylesheet">` it defines a [preferred or an alternate stylesheet](/en-US/docs/Web/CSS/Alternative_style_sheets). Incorrectly using it may [cause the stylesheet to be ignored](/en-US/docs/Correctly_Using_Titles_With_External_Stylesheets).',
            },
          ],
        },
        {
          name: "meta",
          description:
            "The meta element represents various kinds of metadata that cannot be expressed using the title, base, link, style, and script elements.",
          attributes: [
            {
              name: "name",
              description:
                'This attribute defines the name of a piece of document-level metadata. It should not be set if one of the attributes `[itemprop](/en-US/docs/Web/HTML/Global_attributes#attr-itemprop)`, `[http-equiv](/en-US/docs/Web/HTML/Element/meta#attr-http-equiv)` or `[charset](/en-US/docs/Web/HTML/Element/meta#attr-charset)` is also set.\n\nThis metadata name is associated with the value contained by the `[content](/en-US/docs/Web/HTML/Element/meta#attr-content)` attribute. The possible values for the name attribute are:\n\n*   `application-name` which defines the name of the application running in the web page.\n    \n    **Note:**\n    \n    *   Browsers may use this to identify the application. It is different from the [`<title>`](/en-US/docs/Web/HTML/Element/title "The HTML Title element (<title>) defines the document\'s title that is shown in a browser\'s title bar or a page\'s tab.") element, which usually contain the application name, but may also contain information like the document name or a status.\n    *   Simple web pages shouldn\'t define an application-name.\n    \n*   `author` which defines the name of the document\'s author.\n*   `description` which contains a short and accurate summary of the content of the page. Several browsers, like Firefox and Opera, use this as the default description of bookmarked pages.\n*   `generator` which contains the identifier of the software that generated the page.\n*   `keywords` which contains words relevant to the page\'s content separated by commas.\n*   `referrer` which controls the [`Referer` HTTP header](/en-US/docs/Web/HTTP/Headers/Referer) attached to requests sent from the document:\n    \n    Values for the `content` attribute of `<meta name="referrer">`\n    \n    `no-referrer`\n    \n    Do not send a HTTP `Referrer` header.\n    \n    `origin`\n    \n    Send the [origin](/en-US/docs/Glossary/Origin) of the document.\n    \n    `no-referrer-when-downgrade`\n    \n    Send the [origin](/en-US/docs/Glossary/Origin) as a referrer to URLs as secure as the current page, (https→https), but does not send a referrer to less secure URLs (https→http). This is the default behaviour.\n    \n    `origin-when-cross-origin`\n    \n    Send the full URL (stripped of parameters) for same-origin requests, but only send the [origin](/en-US/docs/Glossary/Origin) for other cases.\n    \n    `same-origin`\n    \n    A referrer will be sent for [same-site origins](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy), but cross-origin requests will contain no referrer information.\n    \n    `strict-origin`\n    \n    Only send the origin of the document as the referrer to a-priori as-much-secure destination (HTTPS->HTTPS), but don\'t send it to a less secure destination (HTTPS->HTTP).\n    \n    `strict-origin-when-cross-origin`\n    \n    Send a full URL when performing a same-origin request, only send the origin of the document to a-priori as-much-secure destination (HTTPS->HTTPS), and send no header to a less secure destination (HTTPS->HTTP).\n    \n    `unsafe-URL`\n    \n    Send the full URL (stripped of parameters) for same-origin or cross-origin requests.\n    \n    **Notes:**\n    \n    *   Some browsers support the deprecated values of `always`, `default`, and `never` for referrer.\n    *   Dynamically inserting `<meta name="referrer">` (with [`document.write`](/en-US/docs/Web/API/Document/write) or [`appendChild`](/en-US/docs/Web/API/Node/appendChild)) makes the referrer behaviour unpredictable.\n    *   When several conflicting policies are defined, the no-referrer policy is applied.\n    \n\nThis attribute may also have a value taken from the extended list defined on [WHATWG Wiki MetaExtensions page](https://wiki.whatwg.org/wiki/MetaExtensions). Although none have been formally accepted yet, a few commonly used names are:\n\n*   `creator` which defines the name of the creator of the document, such as an organization or institution. If there are more than one, several [`<meta>`](/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") elements should be used.\n*   `googlebot`, a synonym of `robots`, is only followed by Googlebot (the indexing crawler for Google).\n*   `publisher` which defines the name of the document\'s publisher.\n*   `robots` which defines the behaviour that cooperative crawlers, or "robots", should use with the page. It is a comma-separated list of the values below:\n    \n    Values for the content of `<meta name="robots">`\n    \n    Value\n    \n    Description\n    \n    Used by\n    \n    `index`\n    \n    Allows the robot to index the page (default).\n    \n    All\n    \n    `noindex`\n    \n    Requests the robot to not index the page.\n    \n    All\n    \n    `follow`\n    \n    Allows the robot to follow the links on the page (default).\n    \n    All\n    \n    `nofollow`\n    \n    Requests the robot to not follow the links on the page.\n    \n    All\n    \n    `none`\n    \n    Equivalent to `noindex, nofollow`\n    \n    [Google](https://support.google.com/webmasters/answer/79812)\n    \n    `noodp`\n    \n    Prevents using the [Open Directory Project](https://www.dmoz.org/) description, if any, as the page description in search engine results.\n    \n    [Google](https://support.google.com/webmasters/answer/35624#nodmoz), [Yahoo](https://help.yahoo.com/kb/search-for-desktop/meta-tags-robotstxt-yahoo-search-sln2213.html#cont5), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)\n    \n    `noarchive`\n    \n    Requests the search engine not to cache the page content.\n    \n    [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives), [Yahoo](https://help.yahoo.com/kb/search-for-desktop/SLN2213.html), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)\n    \n    `nosnippet`\n    \n    Prevents displaying any description of the page in search engine results.\n    \n    [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)\n    \n    `noimageindex`\n    \n    Requests this page not to appear as the referring page of an indexed image.\n    \n    [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives)\n    \n    `nocache`\n    \n    Synonym of `noarchive`.\n    \n    [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)\n    \n    **Notes:**\n    \n    *   Only cooperative robots follow these rules. Do not expect to prevent e-mail harvesters with them.\n    *   The robot still needs to access the page in order to read these rules. To prevent bandwidth consumption, use a _[robots.txt](/en-US/docs/Glossary/robots.txt "robots.txt: Robots.txt is a file which is usually placed in the root of any website. It decides whether crawlers are permitted or forbidden access to the web site.")_ file.\n    *   If you want to remove a page, `noindex` will work, but only after the robot visits the page again. Ensure that the `robots.txt` file is not preventing revisits.\n    *   Some values are mutually exclusive, like `index` and `noindex`, or `follow` and `nofollow`. In these cases the robot\'s behaviour is undefined and may vary between them.\n    *   Some crawler robots, like Google, Yahoo and Bing, support the same values for the HTTP header `X-Robots-Tag`; this allows non-HTML documents like images to use these rules.\n    \n*   `slurp`, is a synonym of `robots`, but only for Slurp - the crawler for Yahoo Search.\n*   `viewport`, which gives hints about the size of the initial size of the [viewport](/en-US/docs/Glossary/viewport "viewport: A viewport represents a polygonal (normally rectangular) area in computer graphics that is currently being viewed. In web browser terms, it refers to the part of the document you\'re viewing which is currently visible in its window (or the screen, if the document is being viewed in full screen mode). Content outside the viewport is not visible onscreen until scrolled into view."). Used by mobile devices only.\n    \n    Values for the content of `<meta name="viewport">`\n    \n    Value\n    \n    Possible subvalues\n    \n    Description\n    \n    `width`\n    \n    A positive integer number, or the text `device-width`\n    \n    Defines the pixel width of the viewport that you want the web site to be rendered at.\n    \n    `height`\n    \n    A positive integer, or the text `device-height`\n    \n    Defines the height of the viewport. Not used by any browser.\n    \n    `initial-scale`\n    \n    A positive number between `0.0` and `10.0`\n    \n    Defines the ratio between the device width (`device-width` in portrait mode or `device-height` in landscape mode) and the viewport size.\n    \n    `maximum-scale`\n    \n    A positive number between `0.0` and `10.0`\n    \n    Defines the maximum amount to zoom in. It must be greater or equal to the `minimum-scale` or the behaviour is undefined. Browser settings can ignore this rule and iOS10+ ignores it by default.\n    \n    `minimum-scale`\n    \n    A positive number between `0.0` and `10.0`\n    \n    Defines the minimum zoom level. It must be smaller or equal to the `maximum-scale` or the behaviour is undefined. Browser settings can ignore this rule and iOS10+ ignores it by default.\n    \n    `user-scalable`\n    \n    `yes` or `no`\n    \n    If set to `no`, the user is not able to zoom in the webpage. The default is `yes`. Browser settings can ignore this rule, and iOS10+ ignores it by default.\n    \n    Specification\n    \n    Status\n    \n    Comment\n    \n    [CSS Device Adaptation  \n    The definition of \'<meta name="viewport">\' in that specification.](https://drafts.csswg.org/css-device-adapt/#viewport-meta)\n    \n    Working Draft\n    \n    Non-normatively describes the Viewport META element\n    \n    See also: [`@viewport`](/en-US/docs/Web/CSS/@viewport "The @viewport CSS at-rule lets you configure the viewport through which the document is viewed. It\'s primarily used for mobile devices, but is also used by desktop browsers that support features like "snap to edge" (such as Microsoft Edge).")\n    \n    **Notes:**\n    \n    *   Though unstandardized, this declaration is respected by most mobile browsers due to de-facto dominance.\n    *   The default values may vary between devices and browsers.\n    *   To learn about this declaration in Firefox for Mobile, see [this article](/en-US/docs/Mobile/Viewport_meta_tag "Mobile/Viewport meta tag").',
            },
            {
              name: "http-equiv",
              description:
                'Defines a pragma directive. The attribute is named `**http-equiv**(alent)` because all the allowed values are names of particular HTTP headers:\n\n*   `"content-language"`  \n    Defines the default language of the page. It can be overridden by the [lang](/en-US/docs/Web/HTML/Global_attributes/lang) attribute on any element.\n    \n    **Warning:** Do not use this value, as it is obsolete. Prefer the `lang` attribute on the [`<html>`](/en-US/docs/Web/HTML/Element/html "The HTML <html> element represents the root (top-level element) of an HTML document, so it is also referred to as the root element. All other elements must be descendants of this element.") element.\n    \n*   `"content-security-policy"`  \n    Allows page authors to define a [content policy](/en-US/docs/Web/Security/CSP/CSP_policy_directives) for the current page. Content policies mostly specify allowed server origins and script endpoints which help guard against cross-site scripting attacks.\n*   `"content-type"`  \n    Defines the [MIME type](/en-US/docs/Glossary/MIME_type) of the document, followed by its character encoding. It follows the same syntax as the HTTP `content-type` entity-header field, but as it is inside a HTML page, most values other than `text/html` are impossible. Therefore the valid syntax for its `content` is the string \'`text/html`\' followed by a character set with the following syntax: \'`; charset=_IANAcharset_`\', where `IANAcharset` is the _preferred MIME name_ for a character set as [defined by the IANA.](https://www.iana.org/assignments/character-sets)\n    \n    **Warning:** Do not use this value, as it is obsolete. Use the `[charset](/en-US/docs/Web/HTML/Element/meta#attr-charset)` attribute on the [`<meta>`](/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") element.\n    \n    **Note:** As [`<meta>`](/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") can\'t change documents\' types in XHTML or HTML5\'s XHTML serialization, never set the MIME type to an XHTML MIME type with `<meta>`.\n    \n*   `"refresh"`  \n    This instruction specifies:\n    *   The number of seconds until the page should be reloaded - only if the `[content](/en-US/docs/Web/HTML/Element/meta#attr-content)` attribute contains a positive integer.\n    *   The number of seconds until the page should redirect to another - only if the `[content](/en-US/docs/Web/HTML/Element/meta#attr-content)` attribute contains a positive integer followed by the string \'`;url=`\', and a valid URL.\n*   `"set-cookie"`  \n    Defines a [cookie](/en-US/docs/cookie) for the page. Its content must follow the syntax defined in the [IETF HTTP Cookie Specification](https://tools.ietf.org/html/draft-ietf-httpstate-cookie-14).\n    \n    **Warning:** Do not use this instruction, as it is obsolete. Use the HTTP header [`Set-Cookie`](/en-US/docs/Web/HTTP/Headers/Set-Cookie) instead.',
            },
            {
              name: "content",
              description:
                "This attribute contains the value for the `[http-equiv](/en-US/docs/Web/HTML/Element/meta#attr-http-equiv)` or `[name](/en-US/docs/Web/HTML/Element/meta#attr-name)` attribute, depending on which is used.",
            },
            {
              name: "charset",
              description:
                'This attribute declares the page\'s character encoding. It must contain a [standard IANA MIME name for character encodings](https://www.iana.org/assignments/character-sets). Although the standard doesn\'t request a specific encoding, it suggests:\n\n*   Authors are encouraged to use [`UTF-8`](/en-US/docs/Glossary/UTF-8).\n*   Authors should not use ASCII-incompatible encodings to avoid security risk: browsers not supporting them may interpret harmful content as HTML. This happens with the `JIS_C6226-1983`, `JIS_X0212-1990`, `HZ-GB-2312`, `JOHAB`, the ISO-2022 family and the EBCDIC family.\n\n**Note:** ASCII-incompatible encodings are those that don\'t map the 8-bit code points `0x20` to `0x7E` to the `0x0020` to `0x007E` Unicode code points)\n\n*   Authors **must not** use `CESU-8`, `UTF-7`, `BOCU-1` and/or `SCSU` as [cross-site scripting](/en-US/docs/Glossary/Cross-site_scripting) attacks with these encodings have been demonstrated.\n*   Authors should not use `UTF-32` because not all HTML5 encoding algorithms can distinguish it from `UTF-16`.\n\n**Notes:**\n\n*   The declared character encoding must match the one the page was saved with to avoid garbled characters and security holes.\n*   The [`<meta>`](/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") element declaring the encoding must be inside the [`<head>`](/en-US/docs/Web/HTML/Element/head "The HTML <head> element provides general information (metadata) about the document, including its title and links to its scripts and style sheets.") element and **within the first 1024 bytes** of the HTML as some browsers only look at those bytes before choosing an encoding.\n*   This [`<meta>`](/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") element is only one part of the [algorithm to determine a page\'s character set](https://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html#encoding-sniffing-algorithm "Algorithm charset page"). The [`Content-Type` header](/en-US/docs/Web/HTTP/Headers/Content-Type) and any [Byte-Order Marks](/en-US/docs/Glossary/Byte-Order_Mark "The definition of that term (Byte-Order Marks) has not been written yet; please consider contributing it!") override this element.\n*   It is strongly recommended to define the character encoding. If a page\'s encoding is undefined, cross-scripting techniques are possible, such as the [`UTF-7` fallback cross-scripting technique](https://code.google.com/p/doctype-mirror/wiki/ArticleUtf7).\n*   The [`<meta>`](/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") element with a `charset` attribute is a synonym for the pre-HTML5 `<meta http-equiv="Content-Type" content="text/html; charset=_IANAcharset_">`, where _`IANAcharset`_ contains the value of the equivalent `[charset](/en-US/docs/Web/HTML/Element/meta#attr-charset)` attribute. This syntax is still allowed, although no longer recommended.',
            },
            {
              name: "scheme",
              description:
                "This attribute defines the scheme in which metadata is described. A scheme is a context leading to the correct interpretations of the `[content](/en-US/docs/Web/HTML/Element/meta#attr-content)` value, like a format.\n\n**Warning:** Do not use this value, as it is obsolete. There is no replacement as there was no real usage for it.",
            },
          ],
        },
        {
          name: "style",
          description:
            "The style element allows authors to embed style information in their documents. The style element is one of several inputs to the styling processing model. The element does not represent content for the user.",
          attributes: [
            {
              name: "media",
              description:
                "This attribute defines which media the style should be applied to. Its value is a media query, which defaults to all if the attribute is missing.\n",
            },
            {
              name: "nonce",
              description:
                "A cryptographic nonce (number used once) used to whitelist inline styles in a style-src Content-Security-Policy. The server must generate a unique nonce value each time it transmits a policy. It is critical to provide a nonce that cannot be guessed as bypassing a resource’s policy is otherwise trivial.\n",
            },
            {
              name: "type",
              description:
                "This attribute defines the styling language as a MIME type (charset should not be specified). This attribute is optional and defaults to text/css if it is not specified — there is very little reason to include this in modern web documents.\n",
            },
            { name: "scoped", valueSet: "v" },
            {
              name: "title",
              description:
                "This attribute specifies alternative style sheet sets.\n",
            },
          ],
        },
        {
          name: "body",
          description:
            "The body element represents the content of the document.",
          attributes: [
            {
              name: "onafterprint",
              description:
                "Function to call after the user has printed the document.",
            },
            {
              name: "onbeforeprint",
              description:
                "Function to call when the user requests printing of the document.",
            },
            {
              name: "onbeforeunload",
              description:
                "Function to call when the document is about to be unloaded.",
            },
            {
              name: "onhashchange",
              description:
                "Function to call when the fragment identifier part (starting with the hash (`'#'`) character) of the document's current address has changed.",
            },
            {
              name: "onlanguagechange",
              description:
                "Function to call when the preferred languages changed.",
            },
            {
              name: "onmessage",
              description:
                "Function to call when the document has received a message.",
            },
            {
              name: "onoffline",
              description:
                "Function to call when network communication has failed.",
            },
            {
              name: "ononline",
              description:
                "Function to call when network communication has been restored.",
            },
            { name: "onpagehide" },
            { name: "onpageshow" },
            {
              name: "onpopstate",
              description:
                "Function to call when the user has navigated session history.",
            },
            {
              name: "onstorage",
              description:
                "Function to call when the storage area has changed.",
            },
            {
              name: "onunload",
              description: "Function to call when the document is going away.",
            },
            {
              name: "alink",
              description:
                'Color of text for hyperlinks when selected. _This method is non-conforming, use CSS [`color`](/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element\'s text and text decorations, and sets the currentcolor value.") property in conjunction with the [`:active`](/en-US/docs/Web/CSS/:active "The :active CSS pseudo-class represents an element (such as a button) that is being activated by the user.") pseudo-class instead._',
            },
            {
              name: "background",
              description:
                'URI of a image to use as a background. _This method is non-conforming, use CSS [`background`](/en-US/docs/Web/CSS/background "The background shorthand CSS property sets all background style properties at once, such as color, image, origin and size, or repeat method.") property on the element instead._',
            },
            {
              name: "bgcolor",
              description:
                'Background color for the document. _This method is non-conforming, use CSS [`background-color`](/en-US/docs/Web/CSS/background-color "The background-color CSS property sets the background color of an element.") property on the element instead._',
            },
            {
              name: "bottommargin",
              description:
                'The margin of the bottom of the body. _This method is non-conforming, use CSS [`margin-bottom`](/en-US/docs/Web/CSS/margin-bottom "The margin-bottom CSS property sets the margin area on the bottom of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") property on the element instead._',
            },
            {
              name: "leftmargin",
              description:
                'The margin of the left of the body. _This method is non-conforming, use CSS [`margin-left`](/en-US/docs/Web/CSS/margin-left "The margin-left CSS property sets the margin area on the left side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") property on the element instead._',
            },
            {
              name: "link",
              description:
                'Color of text for unvisited hypertext links. _This method is non-conforming, use CSS [`color`](/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element\'s text and text decorations, and sets the currentcolor value.") property in conjunction with the [`:link`](/en-US/docs/Web/CSS/:link "The :link CSS pseudo-class represents an element that has not yet been visited. It matches every unvisited <a>, <area>, or <link> element that has an href attribute.") pseudo-class instead._',
            },
            {
              name: "onblur",
              description: "Function to call when the document loses focus.",
            },
            {
              name: "onerror",
              description:
                "Function to call when the document fails to load properly.",
            },
            {
              name: "onfocus",
              description: "Function to call when the document receives focus.",
            },
            {
              name: "onload",
              description:
                "Function to call when the document has finished loading.",
            },
            {
              name: "onredo",
              description:
                "Function to call when the user has moved forward in undo transaction history.",
            },
            {
              name: "onresize",
              description:
                "Function to call when the document has been resized.",
            },
            {
              name: "onundo",
              description:
                "Function to call when the user has moved backward in undo transaction history.",
            },
            {
              name: "rightmargin",
              description:
                'The margin of the right of the body. _This method is non-conforming, use CSS [`margin-right`](/en-US/docs/Web/CSS/margin-right "The margin-right CSS property sets the margin area on the right side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") property on the element instead._',
            },
            {
              name: "text",
              description:
                'Foreground color of text. _This method is non-conforming, use CSS [`color`](/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element\'s text and text decorations, and sets the currentcolor value.") property on the element instead._',
            },
            {
              name: "topmargin",
              description:
                'The margin of the top of the body. _This method is non-conforming, use CSS [`margin-top`](/en-US/docs/Web/CSS/margin-top "The margin-top CSS property sets the margin area on the top of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") property on the element instead._',
            },
            {
              name: "vlink",
              description:
                'Color of text for visited hypertext links. _This method is non-conforming, use CSS [`color`](/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element\'s text and text decorations, and sets the currentcolor value.") property in conjunction with the [`:visited`](/en-US/docs/Web/CSS/:visited "The :visited CSS pseudo-class represents links that the user has already visited. For privacy reasons, the styles that can be modified using this selector are very limited.") pseudo-class instead._',
            },
          ],
        },
        {
          name: "article",
          description:
            "The article element represents a complete, or self-contained, composition in a document, page, application, or site and that is, in principle, independently distributable or reusable, e.g. in syndication. This could be a forum post, a magazine or newspaper article, a blog entry, a user-submitted comment, an interactive widget or gadget, or any other independent item of content. Each article should be identified, typically by including a heading (h1–h6 element) as a child of the article element.",
          attributes: [],
        },
        {
          name: "section",
          description:
            "The section element represents a generic section of a document or application. A section, in this context, is a thematic grouping of content. Each section should be identified, typically by including a heading ( h1- h6 element) as a child of the section element.",
          attributes: [],
        },
        {
          name: "nav",
          description:
            "The nav element represents a section of a page that links to other pages or to parts within the page: a section with navigation links.",
          attributes: [],
        },
        {
          name: "aside",
          description:
            "The aside element represents a section of a page that consists of content that is tangentially related to the content around the aside element, and which could be considered separate from that content. Such sections are often represented as sidebars in printed typography.",
          attributes: [],
        },
        {
          name: "h1",
          description: "The h1 element represents a section heading.",
          attributes: [],
        },
        {
          name: "h2",
          description: "The h2 element represents a section heading.",
          attributes: [],
        },
        {
          name: "h3",
          description: "The h3 element represents a section heading.",
          attributes: [],
        },
        {
          name: "h4",
          description: "The h4 element represents a section heading.",
          attributes: [],
        },
        {
          name: "h5",
          description: "The h5 element represents a section heading.",
          attributes: [],
        },
        {
          name: "h6",
          description: "The h6 element represents a section heading.",
          attributes: [],
        },
        {
          name: "header",
          description:
            "The header element represents introductory content for its nearest ancestor sectioning content or sectioning root element. A header typically contains a group of introductory or navigational aids. When the nearest ancestor sectioning content or sectioning root element is the body element, then it applies to the whole page.",
          attributes: [],
        },
        {
          name: "footer",
          description:
            "The footer element represents a footer for its nearest ancestor sectioning content or sectioning root element. A footer typically contains information about its section such as who wrote it, links to related documents, copyright data, and the like.",
          attributes: [],
        },
        {
          name: "address",
          description:
            "The address element represents the contact information for its nearest article or body element ancestor. If that is the body element, then the contact information applies to the document as a whole.",
          attributes: [],
        },
        {
          name: "p",
          description: "The p element represents a paragraph.",
          attributes: [],
        },
        {
          name: "hr",
          description:
            "The hr element represents a paragraph-level thematic break, e.g. a scene change in a story, or a transition to another topic within a section of a reference book.",
          attributes: [
            {
              name: "align",
              description:
                "Sets the alignment of the rule on the page. If no value is specified, the default value is left.\n",
            },
            {
              name: "color",
              description:
                "Sets the color of the rule through color name or hexadecimal value.\n",
            },
            {
              name: "noshade",
              description: "Sets the rule to have no shading.\n",
            },
            {
              name: "size",
              description: "Sets the height, in pixels, of the rule.\n",
            },
            {
              name: "width",
              description:
                "Sets the length of the rule on the page through a pixel or percentage value.\n",
            },
          ],
        },
        {
          name: "pre",
          description:
            "The pre element represents a block of preformatted text, in which structure is represented by typographic conventions rather than by elements.",
          attributes: [
            {
              name: "cols",
              description:
                "Contains the preferred count of characters that a line should have. It was a non-standard synonym of \\[width](/en-US/docs/Web/HTML/Element/pre#attr-width). To achieve such an effect, use CSS width instead.\n",
            },
            {
              name: "width",
              description:
                "Contains the preferred count of characters that a line should have. Though technically still implemented, this attribute has no visual effect; to achieve such an effect, use CSS width instead.\n",
            },
            {
              name: "wrap",
              description:
                "Is a hint indicating how the overflow must happen. In modern browser this hint is ignored and no visual effect results in its present; to achieve such an effect, use CSS white-space instead.\n",
            },
          ],
        },
        {
          name: "blockquote",
          description:
            "The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a footer or cite element, and optionally with in-line changes such as annotations and abbreviations.",
          attributes: [
            {
              name: "cite",
              description:
                "A URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote.",
            },
          ],
        },
        {
          name: "ol",
          description:
            "The ol element represents a list of items, where the items have been intentionally ordered, such that changing the order would change the meaning of the document.",
          attributes: [
            {
              name: "reversed",
              valueSet: "v",
              description:
                "This Boolean attribute specifies that the items of the list are specified in reversed order.",
            },
            {
              name: "start",
              description:
                'This integer attribute specifies the start value for numbering the individual list items. Although the ordering type of list elements might be Roman numerals, such as XXXI, or letters, the value of start is always represented as a number. To start numbering elements from the letter "C", use `<ol start="3">`.\n\n**Note**: This attribute was deprecated in HTML4, but reintroduced in HTML5.',
            },
            {
              name: "type",
              valueSet: "lt",
              description:
                "Indicates the numbering type:\n\n*   `'a'` indicates lowercase letters,\n*   `'A'` indicates uppercase letters,\n*   `'i'` indicates lowercase Roman numerals,\n*   `'I'` indicates uppercase Roman numerals,\n*   and `'1'` indicates numbers (default).\n\nThe type set is used for the entire list unless a different `[type](/en-US/docs/Web/HTML/Element/li#attr-type)` attribute is used within an enclosed [`<li>`](/en-US/docs/Web/HTML/Element/li \"The HTML <li> element is used to represent an item in a list. It must be contained in a parent element: an ordered list (<ol>), an unordered list (<ul>), or a menu (<menu>). In menus and unordered lists, list items are usually displayed using bullet points. In ordered lists, they are usually displayed with an ascending counter on the left, such as a number or letter.\") element.\n\n**Note:** This attribute was deprecated in HTML4, but reintroduced in HTML5.\n\nUnless the value of the list number matters (e.g. in legal or technical documents where items are to be referenced by their number/letter), the CSS [`list-style-type`](/en-US/docs/Web/CSS/list-style-type \"The list-style-type CSS property sets the marker (such as a disc, character, or custom counter style) of a list item element.\") property should be used instead.",
            },
            {
              name: "compact",
              description:
                'This Boolean attribute hints that the list should be rendered in a compact style. The interpretation of this attribute depends on the user agent and it doesn\'t work in all browsers.\n\n**Warning:** Do not use this attribute, as it has been deprecated: the [`<ol>`](/en-US/docs/Web/HTML/Element/ol "The HTML <ol> element represents an ordered list of items, typically rendered as a numbered list.") element should be styled using [CSS](/en-US/docs/CSS). To give an effect similar to the `compact` attribute, the [CSS](/en-US/docs/CSS) property [`line-height`](/en-US/docs/Web/CSS/line-height "The line-height CSS property sets the amount of space used for lines, such as in text. On block-level elements, it specifies the minimum height of line boxes within the element. On non-replaced inline elements, it specifies the height that is used to calculate line box height.") can be used with a value of `80%`.',
            },
          ],
        },
        {
          name: "ul",
          description:
            "The ul element represents a list of items, where the order of the items is not important — that is, where changing the order would not materially change the meaning of the document.",
          attributes: [
            {
              name: "compact",
              description:
                'This Boolean attribute hints that the list should be rendered in a compact style. The interpretation of this attribute depends on the user agent and it doesn\'t work in all browsers.\n\n**Usage note: **Do not use this attribute, as it has been deprecated: the [`<ul>`](/en-US/docs/Web/HTML/Element/ul "The HTML <ul> element represents an unordered list of items, typically rendered as a bulleted list.") element should be styled using [CSS](/en-US/docs/CSS). To give a similar effect as the `compact` attribute, the [CSS](/en-US/docs/CSS) property [line-height](/en-US/docs/CSS/line-height) can be used with a value of `80%`.',
            },
          ],
        },
        {
          name: "li",
          description:
            "The li element represents a list item. If its parent element is an ol, ul, or menu element, then the element is an item of the parent element's list, as defined for those elements. Otherwise, the list item has no defined list-related relationship to any other li element.",
          attributes: [
            {
              name: "value",
              description:
                'This integer attribute indicates the current ordinal value of the list item as defined by the [`<ol>`](/en-US/docs/Web/HTML/Element/ol "The HTML <ol> element represents an ordered list of items, typically rendered as a numbered list.") element. The only allowed value for this attribute is a number, even if the list is displayed with Roman numerals or letters. List items that follow this one continue numbering from the value set. The **value** attribute has no meaning for unordered lists ([`<ul>`](/en-US/docs/Web/HTML/Element/ul "The HTML <ul> element represents an unordered list of items, typically rendered as a bulleted list.")) or for menus ([`<menu>`](/en-US/docs/Web/HTML/Element/menu "The HTML <menu> element represents a group of commands that a user can perform or activate. This includes both list menus, which might appear across the top of a screen, as well as context menus, such as those that might appear underneath a button after it has been clicked.")).\n\n**Note**: This attribute was deprecated in HTML4, but reintroduced in HTML5.\n\n**Note:** Prior to Gecko 9.0, negative values were incorrectly converted to 0. Starting in Gecko 9.0 all integer values are correctly parsed.',
            },
            {
              name: "type",
              description:
                'This character attribute indicates the numbering type:\n\n*   `a`: lowercase letters\n*   `A`: uppercase letters\n*   `i`: lowercase Roman numerals\n*   `I`: uppercase Roman numerals\n*   `1`: numbers\n\nThis type overrides the one used by its parent [`<ol>`](/en-US/docs/Web/HTML/Element/ol "The HTML <ol> element represents an ordered list of items, typically rendered as a numbered list.") element, if any.\n\n**Usage note:** This attribute has been deprecated: use the CSS [`list-style-type`](/en-US/docs/Web/CSS/list-style-type "The list-style-type CSS property sets the marker (such as a disc, character, or custom counter style) of a list item element.") property instead.',
            },
          ],
        },
        {
          name: "dl",
          description:
            "The dl element represents an association list consisting of zero or more name-value groups (a description list). A name-value group consists of one or more names (dt elements) followed by one or more values (dd elements), ignoring any nodes other than dt and dd elements. Within a single dl element, there should not be more than one dt element for each name.",
          attributes: [],
        },
        {
          name: "dt",
          description:
            "The dt element represents the term, or name, part of a term-description group in a description list (dl element).",
          attributes: [],
        },
        {
          name: "dd",
          description:
            "The dd element represents the description, definition, or value, part of a term-description group in a description list (dl element).",
          attributes: [
            {
              name: "nowrap",
              description:
                "If the value of this attribute is set to yes, the definition text will not wrap. The default value is no.\n",
            },
          ],
        },
        {
          name: "figure",
          description:
            "The figure element represents some flow content, optionally with a caption, that is self-contained (like a complete sentence) and is typically referenced as a single unit from the main flow of the document.",
          attributes: [],
        },
        {
          name: "figcaption",
          description:
            "The figcaption element represents a caption or legend for the rest of the contents of the figcaption element's parent figure element, if any.",
          attributes: [],
        },
        {
          name: "main",
          description:
            "The main element represents the main content of the body of a document or application. The main content area consists of content that is directly related to or expands upon the central topic of a document or central functionality of an application.",
          attributes: [],
        },
        {
          name: "div",
          description:
            "The div element has no special meaning at all. It represents its children. It can be used with the class, lang, and title attributes to mark up semantics common to a group of consecutive elements.",
          attributes: [],
        },
        {
          name: "a",
          description:
            "If the a element has an href attribute, then it represents a hyperlink (a hypertext anchor) labeled by its contents.",
          attributes: [
            {
              name: "href",
              description:
                "Contains a URL or a URL fragment that the hyperlink points to.\n",
            },
            {
              name: "target",
              description:
                'Specifies where to display the linked URL. It is a name of, or keyword for, a browsing context: a tab, window, or &lt;iframe>. The following keywords have special meanings:\n\n\\_self: Load the URL into the same browsing context as the current one. This is the default behavior.\n\n\\_blank: Load the URL into a new browsing context. This is usually a tab, but users can configure browsers to use new windows instead.\n\n\\_parent: Load the URL into the parent browsing context of the current one. If there is no parent, this behaves the same way as \\_self.\n\n\\_top: Load the URL into the top-level browsing context (that is, the "highest" browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this behaves the same way as \\_self.\n\nNote: When using target, consider adding rel="noreferrer" to avoid exploitation of the window.opener API.\n\nNote: Linking to another page using target="\\_blank" will run the new page on the same process as your page. If the new page is executing expensive JS, your page\'s performance may suffer. To avoid this use rel="noopener".\n',
            },
            {
              name: "download",
              description:
                "This attribute instructs browsers to download a URL instead of navigating to it, so the user will be prompted to save it as a local file. If the attribute has a value, it is used as the pre-filled file name in the Save prompt (the user can still change the file name if they want). There are no restrictions on allowed values, though / and \\\\ are converted to underscores. Most file systems limit some punctuation in file names, and browsers will adjust the suggested name accordingly.\n\nNotes:\n\nThis attribute only works for same-origin URLs.\n\nAlthough HTTP(s) URLs need to be in the same-origin, blob: URLs and data: URLs are allowed so that content generated by JavaScript, such as pictures created in an image-editor Web app, can be downloaded.\n\nIf the HTTP header Content-Disposition: gives a different filename than this attribute, the HTTP header takes priority over this attribute.\n\nIf Content-Disposition: is set to inline, Firefox prioritizes Content-Disposition, like the filename case, while Chrome prioritizes the download attribute.\n",
            },
            {
              name: "ping",
              description:
                "Contains a space-separated list of URLs to which, when the hyperlink is followed, POST requests with the body PING will be sent by the browser (in the background). Typically used for tracking.\n",
            },
            {
              name: "rel",
              description:
                "Specifies the relationship of the target object to the link object. The value is a space-separated list of link types.\n",
            },
            {
              name: "hreflang",
              description:
                "This attribute indicates the human language of the linked resource. It is purely advisory, with no built-in functionality. Allowed values are determined by BCP47.\n",
            },
            {
              name: "type",
              description:
                'Specifies the media type in the form of a MIME type is a string sent along with a file indicating the type of the file (describing the content format, for example, a sound file might be labeled audio/ogg, or an image file image/png).") for the linked URL. It is purely advisory, with no built-in functionality.\n',
            },
            {
              name: "referrerpolicy",
              description:
                "Indicates which referrer to send when fetching the URL:\n\n'no-referrer' means the Referer: header will not be sent.\n\n'no-referrer-when-downgrade' means no Referer: header will be sent when navigating to an origin without HTTPS. This is the default behavior.\n\n'origin' means the referrer will be the origin of the page, not including information after the domain.\n\n'origin-when-cross-origin' meaning that navigations to other origins will be limited to the scheme, the host and the port, while navigations on the same origin will include the referrer's path.\n\n'strict-origin-when-cross-origin'\n\n'unsafe-url' means the referrer will include the origin and path, but not the fragment, password, or username. This is unsafe because it can leak data from secure URLs to insecure ones.\n",
            },
          ],
        },
        {
          name: "em",
          description:
            "The em element represents stress emphasis of its contents.",
          attributes: [],
        },
        {
          name: "strong",
          description:
            "The strong element represents strong importance, seriousness, or urgency for its contents.",
          attributes: [],
        },
        {
          name: "small",
          description:
            "The small element represents side comments such as small print.",
          attributes: [],
        },
        {
          name: "s",
          description:
            "The s element represents contents that are no longer accurate or no longer relevant.",
          attributes: [],
        },
        {
          name: "cite",
          description:
            "The cite element represents a reference to a creative work. It must include the title of the work or the name of the author(person, people or organization) or an URL reference, or a reference in abbreviated form as per the conventions used for the addition of citation metadata.",
          attributes: [],
        },
        {
          name: "q",
          description:
            "The q element represents some phrasing content quoted from another source.",
          attributes: [
            {
              name: "cite",
              description:
                "The value of this attribute is a URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote.\n",
            },
          ],
        },
        {
          name: "dfn",
          description:
            "The dfn element represents the defining instance of a term. The paragraph, description list group, or section that is the nearest ancestor of the dfn element must also contain the definition(s) for the term given by the dfn element.",
          attributes: [],
        },
        {
          name: "abbr",
          description:
            "The abbr element represents an abbreviation or acronym, optionally with its expansion. The title attribute may be used to provide an expansion of the abbreviation. The attribute, if specified, must contain an expansion of the abbreviation, and nothing else.",
          attributes: [],
        },
        {
          name: "ruby",
          description:
            "The ruby element allows one or more spans of phrasing content to be marked with ruby annotations. Ruby annotations are short runs of text presented alongside base text, primarily used in East Asian typography as a guide for pronunciation or to include other annotations. In Japanese, this form of typography is also known as furigana. Ruby text can appear on either side, and sometimes both sides, of the base text, and it is possible to control its position using CSS. A more complete introduction to ruby can be found in the Use Cases & Exploratory Approaches for Ruby Markup document as well as in CSS Ruby Module Level 1. [RUBY-UC] [CSSRUBY]",
          attributes: [],
        },
        {
          name: "rb",
          description:
            "The rb element marks the base text component of a ruby annotation. When it is the child of a ruby element, it doesn't represent anything itself, but its parent ruby element uses it as part of determining what it represents.",
          attributes: [],
        },
        {
          name: "rt",
          description:
            "The rt element marks the ruby text component of a ruby annotation. When it is the child of a ruby element or of an rtc element that is itself the child of a ruby element, it doesn't represent anything itself, but its ancestor ruby element uses it as part of determining what it represents.",
          attributes: [],
        },
        {
          name: "rp",
          description:
            "The rp element is used to provide fallback text to be shown by user agents that don't support ruby annotations. One widespread convention is to provide parentheses around the ruby text component of a ruby annotation.",
          attributes: [],
        },
        {
          name: "time",
          description:
            "The time element represents its contents, along with a machine-readable form of those contents in the datetime attribute. The kind of content is limited to various kinds of dates, times, time-zone offsets, and durations, as described below.",
          attributes: [
            {
              name: "datetime",
              description:
                "This attribute indicates the time and/or date of the element and must be in one of the formats described below.\n",
            },
          ],
        },
        {
          name: "code",
          description:
            "The code element represents a fragment of computer code. This could be an XML element name, a file name, a computer program, or any other string that a computer would recognize.",
          attributes: [],
        },
        {
          name: "var",
          description:
            "The var element represents a variable. This could be an actual variable in a mathematical expression or programming context, an identifier representing a constant, a symbol identifying a physical quantity, a function parameter, or just be a term used as a placeholder in prose.",
          attributes: [],
        },
        {
          name: "samp",
          description:
            "The samp element represents sample or quoted output from another program or computing system.",
          attributes: [],
        },
        {
          name: "kbd",
          description:
            "The kbd element represents user input (typically keyboard input, although it may also be used to represent other input, such as voice commands).",
          attributes: [],
        },
        {
          name: "sub",
          description: "The sub element represents a subscript.",
          attributes: [],
        },
        {
          name: "sup",
          description: "The sup element represents a superscript.",
          attributes: [],
        },
        {
          name: "i",
          description:
            "The i element represents a span of text in an alternate voice or mood, or otherwise offset from the normal prose in a manner indicating a different quality of text, such as a taxonomic designation, a technical term, an idiomatic phrase from another language, transliteration, a thought, or a ship name in Western texts.",
          attributes: [],
        },
        {
          name: "b",
          description:
            "The b element represents a span of text to which attention is being drawn for utilitarian purposes without conveying any extra importance and with no implication of an alternate voice or mood, such as key words in a document abstract, product names in a review, actionable words in interactive text-driven software, or an article lede.",
          attributes: [],
        },
        {
          name: "u",
          description:
            "The u element represents a span of text with an unarticulated, though explicitly rendered, non-textual annotation, such as labeling the text as being a proper name in Chinese text (a Chinese proper name mark), or labeling the text as being misspelt.",
          attributes: [],
        },
        {
          name: "mark",
          description:
            "The mark element represents a run of text in one document marked or highlighted for reference purposes, due to its relevance in another context. When used in a quotation or other block of text referred to from the prose, it indicates a highlight that was not originally present but which has been added to bring the reader's attention to a part of the text that might not have been considered important by the original author when the block was originally written, but which is now under previously unexpected scrutiny. When used in the main prose of a document, it indicates a part of the document that has been highlighted due to its likely relevance to the user's current activity.",
          attributes: [],
        },
        {
          name: "bdi",
          description:
            "The bdi element represents a span of text that is to be isolated from its surroundings for the purposes of bidirectional text formatting. [BIDI]",
          attributes: [],
        },
        {
          name: "bdo",
          description:
            "The bdo element represents explicit text directionality formatting control for its children. It allows authors to override the Unicode bidirectional algorithm by explicitly specifying a direction override. [BIDI]",
          attributes: [
            {
              name: "dir",
              description:
                "The direction in which text should be rendered in this element's contents. Possible values are:\n\nltr: Indicates that the text should go in a left-to-right direction.\n\nrtl: Indicates that the text should go in a right-to-left direction.\n",
            },
          ],
        },
        {
          name: "span",
          description:
            "The span element doesn't mean anything on its own, but can be useful when used together with the global attributes, e.g. class, lang, or dir. It represents its children.",
          attributes: [],
        },
        {
          name: "br",
          description: "The br element represents a line break.",
          attributes: [
            {
              name: "clear",
              description:
                "Indicates where to begin the next line after the break.",
            },
          ],
        },
        {
          name: "wbr",
          description: "The wbr element represents a line break opportunity.",
          attributes: [],
        },
        {
          name: "ins",
          description:
            "The ins element represents an addition to the document.",
          attributes: [
            {
              name: "cite",
              description:
                "This attribute defines the URI of a resource that explains the change, such as a link to meeting minutes or a ticket in a troubleshooting system.\n",
            },
            {
              name: "datetime",
              description:
                "This attribute indicates the time and date of the change and must be a valid date with an optional time string. If the value cannot be parsed as a date with an optional time string, the element does not have an associated time stamp. For the format of the string without a time, see Format of a valid date string in Date and time formats used in HTML. The format of the string if it includes both date and time is covered in Format of a valid local date and time string in Date and time formats used in HTML.\n",
            },
          ],
        },
        {
          name: "del",
          description:
            "The del element represents a removal from the document.",
          attributes: [
            {
              name: "cite",
              description:
                "A URI for a resource that explains the change (for example, meeting minutes).\n",
            },
            {
              name: "datetime",
              description:
                "This attribute indicates the time and date of the change and must be a valid date string with an optional time. If the value cannot be parsed as a date with an optional time string, the element does not have an associated time stamp. For the format of the string without a time, see Format of a valid date string in Date and time formats used in HTML. The format of the string if it includes both date and time is covered in Format of a valid local date and time string in Date and time formats used in HTML.\n",
            },
          ],
        },
        {
          name: "picture",
          description:
            "The picture element is a container which provides multiple sources to its contained img element to allow authors to declaratively control or give hints to the user agent about which image resource to use, based on the screen pixel density, viewport size, image format, and other factors. It represents its children.",
          attributes: [],
        },
        {
          name: "img",
          description: "An img element represents an image.",
          attributes: [
            {
              name: "alt",
              description:
                'This attribute defines an alternative text description of the image.\n\nNote: Browsers do not always display the image referenced by the element. This is the case for non-graphical browsers (including those used by people with visual impairments), if the user chooses not to display images, or if the browser cannot display the image because it is invalid or an unsupported type. In these cases, the browser may replace the image with the text defined in this element\'s alt attribute. You should, for these reasons and others, provide a useful value for alt whenever possible.\n\nNote: Omitting this attribute altogether indicates that the image is a key part of the content, and no textual equivalent is available. Setting this attribute to an empty string (alt="") indicates that this image is not a key part of the content (decorative), and that non-visual browsers may omit it from rendering.\n',
            },
            {
              name: "src",
              description:
                "The image URL. This attribute is mandatory for the &lt;img> element. On browsers supporting srcset, src is treated like a candidate image with a pixel density descriptor 1x unless an image with this pixel density descriptor is already defined in srcset, or unless srcset contains 'w' descriptors.\n",
            },
            {
              name: "srcset",
              description:
                "A list of one or more strings separated by commas indicating a set of possible image sources for the user agent to use. Each string is composed of:\n\na URL to an image,\n\noptionally, whitespace followed by one of:\n\nA width descriptor, or a positive integer directly followed by 'w'. The width descriptor is divided by the source size given in the sizes attribute to calculate the effective pixel density.\n\nA pixel density descriptor, which is a positive floating point number directly followed by 'x'.\n\nIf no descriptor is specified, the source is assigned the default descriptor: 1x.\n\nIt is incorrect to mix width descriptors and pixel density descriptors in the same srcset attribute. Duplicate descriptors (for instance, two sources in the same srcset which are both described with '2x') are also invalid.\n\nThe user agent selects any one of the available sources at its discretion. This provides them with significant leeway to tailor their selection based on things like user preferences or bandwidth conditions. See our Responsive images tutorial for an example.\n",
            },
            {
              name: "crossorigin",
              valueSet: "xo",
              description:
                'This enumerated attribute indicates if the fetching of the related image must be done using CORS or not. CORS-enabled images can be reused in the &lt;canvas> element without being "tainted." The allowed values are:\n',
            },
            {
              name: "usemap",
              description:
                "The partial URL (starting with '#') of an image map associated with the element.\n\nNote: You cannot use this attribute if the &lt;img> element is a descendant of an &lt;a> or &lt;button> element.\n",
            },
            {
              name: "ismap",
              valueSet: "v",
              description:
                "This Boolean attribute indicates that the image is part of a server-side map. If so, the precise coordinates of a click are sent to the server.\n\nNote: This attribute is allowed only if the &lt;img> element is a descendant of an &lt;a> element with a valid \\[href](/en-US/docs/Web/HTML/Element/a#attr-href) attribute.\n",
            },
            {
              name: "width",
              description: "The intrinsic width of the image in pixels.\n",
            },
            {
              name: "height",
              description: "The intrinsic height of the image in pixels.\n",
            },
            {
              name: "decoding",
              description:
                "Provides an image decoding hint to the browser. The allowed values are:\n",
            },
            {
              name: "decoding",
              description:
                "sync\n\nDecode the image synchronously for atomic presentation with other content.\n\nasync\n\nDecode the image asynchronously to reduce delay in presenting other content.\n\nauto\n\nDefault mode, which indicates no preference for the decoding mode. The browser decides what is best for the user.\n",
            },
            {
              name: "importance",
              description:
                "Indicates the relative importance of the resource. Priority hints are delegated using the values:\n",
            },
            {
              name: "importance",
              description:
                "auto: Indicates no preference. The browser may use its own heuristics to decide the priority of the image.\n\nhigh: Indicates to the browser that the image is of high priority.\n\nlow: Indicates to the browser that the image is of low priority.\n",
            },
            {
              name: "intrinsicsize",
              description:
                "This attribute tells the browser to ignore the actual intrinsic size of the image and pretend it’s the size specified in the attribute. Specifically, the image would raster at these dimensions and naturalWidth/naturalHeight on images would return the values specified in this attribute. Explainer, examples\n",
            },
            {
              name: "referrerpolicy",
              description:
                "A string indicating which referrer to use when fetching the resource:\n\nno-referrer: The Referer header will not be sent.\n\nno-referrer-when-downgrade: No Referer header will be sent when navigating to an origin without TLS (HTTPS). This is a user agent’s default behavior if no policy is otherwise specified.\n\norigin: The Referer header will include the page of origin's scheme, the host, and the port.\n\norigin-when-cross-origin: Navigating to other origins will limit the included referral data to the scheme, the host and the port, while navigating from the same origin will include the referrer's full path.\n\nunsafe-url: The Referer header will include the origin and the path, but not the fragment, password, or username. This case is unsafe because it can leak origins and paths from TLS-protected resources to insecure origins.\n",
            },
            {
              name: "sizes",
              description:
                "A list of one or more strings separated by commas indicating a set of source sizes. Each source size consists of:\n\na media condition. This must be omitted for the last item.\n\na source size value.\n\nSource size values specify the intended display size of the image. User agents use the current source size to select one of the sources supplied by the srcset attribute, when those sources are described using width ('w') descriptors. The selected source size affects the intrinsic size of the image (the image’s display size if no CSS styling is applied). If the srcset attribute is absent, or contains no values with a width (w) descriptor, then the sizes attribute has no effect.\n",
            },
          ],
        },
        {
          name: "iframe",
          description:
            "The iframe element represents a nested browsing context.",
          attributes: [
            {
              name: "src",
              description:
                "The URL of the page to embed. Use a value of about:blank to embed an empty page that conforms to the same-origin policy. Also note that programatically removing an &lt;iframe>'s src attribute (e.g. via Element.removeAttribute()) causes about:blank to be loaded in the frame in Firefox (from version 65), Chromium-based browsers, and Safari/iOS.\n",
            },
            {
              name: "srcdoc",
              description:
                "Inline HTML to embed, overriding the src attribute. If a browser does not support the srcdoc attribute, it will fall back to the URL in the src attribute.\n",
            },
            {
              name: "name",
              description:
                "A targetable name for the embedded browsing context. This can be used in the target attribute of the &lt;a>, &lt;form>, or &lt;base> elements; the formtarget attribute of the &lt;input> or &lt;button> elements; or the windowName parameter in the window.open() method.\n",
            },
            {
              name: "sandbox",
              valueSet: "sb",
              description:
                'Applies extra restrictions to the content in the frame. The value of the attribute can either be empty to apply all restrictions, or space-separated tokens to lift particular restrictions:\n\nallow-forms: Allows the resource to submit forms. If this keyword is not used, form submission is blocked.\n\nallow-modals: Lets the resource open modal windows.\n\nallow-orientation-lock: Lets the resource lock the screen orientation.\n\nallow-pointer-lock: Lets the resource use the Pointer Lock API.\n\nallow-popups: Allows popups (such as window.open(), target="\\_blank", or showModalDialog()). If this keyword is not used, the popup will silently fail to open.\n\nallow-popups-to-escape-sandbox: Lets the sandboxed document open new windows without those windows inheriting the sandboxing. For example, this can safely sandbox an advertisement without forcing the same restrictions upon the page the ad links to.\n\nallow-presentation: Lets the resource start a presentation session.\n\nallow-same-origin: If this token is not used, the resource is treated as being from a special origin that always fails the same-origin policy.\n\nallow-scripts: Lets the resource run scripts (but not create popup windows).\n\nallow-storage-access-by-user-activation : Lets the resource request access to the parent\'s storage capabilities with the Storage Access API.\n\nallow-top-navigation: Lets the resource navigate the top-level browsing context (the one named \\_top).\n\nallow-top-navigation-by-user-activation: Lets the resource navigate the top-level browsing context, but only if initiated by a user gesture.\n\nNotes about sandboxing:\n\nWhen the embedded document has the same origin as the embedding page, it is strongly discouraged to use both allow-scripts and allow-same-origin, as that lets the embedded document remove the sandbox attribute — making it no more secure than not using the sandbox attribute at all.\n\nSandboxing is useless if the attacker can display content outside a sandboxed iframe — such as if the viewer opens the frame in a new tab. Such content should be also served from a separate origin to limit potential damage.\n\nThe sandbox attribute is unsupported in Internet Explorer 9 and earlier.\n',
            },
            { name: "seamless", valueSet: "v" },
            {
              name: "allowfullscreen",
              valueSet: "v",
              description:
                "Set to true if the &lt;iframe> can activate fullscreen mode by calling the requestFullscreen() method.\n",
            },
            {
              name: "width",
              description:
                "The width of the frame in CSS pixels. Default is 300.\n",
            },
            {
              name: "height",
              description:
                "The height of the frame in CSS pixels. Default is 150.\n",
            },
            {
              name: "allow",
              description: "Specifies a feature policy for the &lt;iframe>.\n",
            },
            {
              name: "allowpaymentrequest",
              description:
                "Set to true if a cross-origin &lt;iframe> should be allowed to invoke the Payment Request API.\n",
            },
            {
              name: "allowpaymentrequest",
              description:
                'This attribute is considered a legacy attribute and redefined as allow="payment".\n',
            },
            {
              name: "csp",
              description:
                "A Content Security Policy enforced for the embedded resource. See HTMLIFrameElement.csp for details.\n",
            },
            {
              name: "importance",
              description:
                "The download priority of the resource in the &lt;iframe>'s src attribute. Allowed values:\n\nauto (default)\n\nNo preference. The browser uses its own heuristics to decide the priority of the resource.\n\nhigh\n\nThe resource should be downloaded before other lower-priority page resources.\n\nlow\n\nThe resource should be downloaded after other higher-priority page resources.\n",
            },
            {
              name: "referrerpolicy",
              description:
                "Indicates which referrer to send when fetching the frame's resource:\n\nno-referrer: The Referer header will not be sent.\n\nno-referrer-when-downgrade (default): The Referer header will not be sent to origins without TLS (HTTPS).\n\norigin: The sent referrer will be limited to the origin of the referring page: its scheme, host, and port.\n\norigin-when-cross-origin: The referrer sent to other origins will be limited to the scheme, the host, and the port. Navigations on the same origin will still include the path.\n\nsame-origin: A referrer will be sent for same origin, but cross-origin requests will contain no referrer information.\n\nstrict-origin: Only send the origin of the document as the referrer when the protocol security level stays the same (HTTPS→HTTPS), but don't send it to a less secure destination (HTTPS→HTTP).\n\nstrict-origin-when-cross-origin: Send a full URL when performing a same-origin request, only send the origin when the protocol security level stays the same (HTTPS→HTTPS), and send no header to a less secure destination (HTTPS→HTTP).\n\nunsafe-url: The referrer will include the origin and the path (but not the fragment, password, or username). This value is unsafe, because it leaks origins and paths from TLS-protected resources to insecure origins.\n",
            },
          ],
        },
        {
          name: "embed",
          description:
            "The embed element provides an integration point for an external (typically non-HTML) application or interactive content.",
          attributes: [
            {
              name: "src",
              description: "The URL of the resource being embedded.",
            },
            {
              name: "type",
              description:
                "The MIME type to use to select the plug-in to instantiate.",
            },
            {
              name: "width",
              description:
                "The displayed width of the resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). This must be an absolute value; percentages are _not_ allowed.",
            },
            {
              name: "height",
              description:
                "The displayed height of the resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). This must be an absolute value; percentages are _not_ allowed.",
            },
          ],
        },
        {
          name: "object",
          description:
            "The object element can represent an external resource, which, depending on the type of the resource, will either be treated as an image, as a nested browsing context, or as an external resource to be processed by a plugin.",
          attributes: [
            {
              name: "data",
              description:
                "The address of the resource as a valid URL. At least one of **data** and **type** must be defined.",
            },
            {
              name: "type",
              description:
                "The [content type](/en-US/docs/Glossary/Content_type) of the resource specified by **data**. At least one of **data** and **type** must be defined.",
            },
            {
              name: "typemustmatch",
              valueSet: "v",
              description:
                "This Boolean attribute indicates if the **type** attribute and the actual [content type](/en-US/docs/Glossary/Content_type) of the resource must match to be used.",
            },
            {
              name: "name",
              description:
                "The name of valid browsing context (HTML5), or the name of the control (HTML 4).",
            },
            {
              name: "usemap",
              description:
                "A hash-name reference to a [`<map>`](/en-US/docs/Web/HTML/Element/map \"The HTML <map> element is used with <area> elements to define an image map (a clickable link area).\") element; that is a '#' followed by the value of a `[name](/en-US/docs/Web/HTML/Element/map#attr-name)` of a map element.",
            },
            {
              name: "form",
              description:
                'The form element, if any, that the object element is associated with (its _form owner_). The value of the attribute must be an ID of a [`<form>`](/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element in the same document.',
            },
            {
              name: "width",
              description:
                "The width of the display resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). -- (Absolute values only. [NO percentages](https://html.spec.whatwg.org/multipage/embedded-content.html#dimension-attributes))",
            },
            {
              name: "height",
              description:
                "The height of the displayed resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). -- (Absolute values only. [NO percentages](https://html.spec.whatwg.org/multipage/embedded-content.html#dimension-attributes))",
            },
            {
              name: "archive",
              description:
                "A space-separated list of URIs for archives of resources for the object.",
            },
            {
              name: "border",
              description:
                "The width of a border around the control, in pixels.",
            },
            {
              name: "classid",
              description:
                "The URI of the object's implementation. It can be used together with, or in place of, the **data** attribute.",
            },
            {
              name: "codebase",
              description:
                "The base path used to resolve relative URIs specified by **classid**, **data**, or **archive**. If not specified, the default is the base URI of the current document.",
            },
            {
              name: "codetype",
              description:
                "The content type of the data specified by **classid**.",
            },
            {
              name: "declare",
              description:
                "The presence of this Boolean attribute makes this element a declaration only. The object must be instantiated by a subsequent `<object>` element. In HTML5, repeat the <object> element completely each that that the resource is reused.",
            },
            {
              name: "standby",
              description:
                "A message that the browser can show while loading the object's implementation and data.",
            },
            {
              name: "tabindex",
              description:
                "The position of the element in the tabbing navigation order for the current document.",
            },
          ],
        },
        {
          name: "param",
          description:
            "The param element defines parameters for plugins invoked by object elements. It does not represent anything on its own.",
          attributes: [
            { name: "name", description: "Name of the parameter." },
            {
              name: "value",
              description: "Specifies the value of the parameter.",
            },
            {
              name: "type",
              description:
                'Only used if the `valuetype` is set to "ref". Specifies the MIME type of values found at the URI specified by value.',
            },
            {
              name: "valuetype",
              description:
                'Specifies the type of the `value` attribute. Possible values are:\n\n*   data: Default value. The value is passed to the object\'s implementation as a string.\n*   ref: The value is a URI to a resource where run-time values are stored.\n*   object: An ID of another [`<object>`](/en-US/docs/Web/HTML/Element/object "The HTML <object> element represents an external resource, which can be treated as an image, a nested browsing context, or a resource to be handled by a plugin.") in the same document.',
            },
          ],
        },
        {
          name: "video",
          description:
            "A video element is used for playing videos or movies, and audio files with captions.",
          attributes: [
            { name: "src" },
            { name: "crossorigin", valueSet: "xo" },
            { name: "poster" },
            { name: "preload", valueSet: "pl" },
            {
              name: "autoplay",
              valueSet: "v",
              description:
                "A Boolean attribute; if specified, the video automatically begins to play back as soon as it can do so without stopping to finish loading the data.\n",
            },
            { name: "mediagroup" },
            { name: "loop", valueSet: "v" },
            { name: "muted", valueSet: "v" },
            { name: "controls", valueSet: "v" },
            { name: "width" },
            { name: "height" },
          ],
        },
        {
          name: "audio",
          description: "An audio element represents a sound or audio stream.",
          attributes: [
            {
              name: "src",
              description:
                "The URL of the audio to embed. This is subject to HTTP access controls. This is optional; you may instead use the &lt;source> element within the audio block to specify the audio to embed.\n",
            },
            {
              name: "crossorigin",
              valueSet: "xo",
              description:
                "This enumerated attribute indicates whether to use CORS to fetch the related image. CORS-enabled resources can be reused in the &lt;canvas> element without being tainted. The allowed values are:\n\nanonymous\n\nSends a cross-origin request without a credential. In other words, it sends the Origin: HTTP header without a cookie, X.509 certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (by not setting the Access-Control-Allow-Origin: HTTP header), the image will be tainted, and its usage restricted.\n\nuse-credentials\n\nSends a cross-origin request with a credential. In other words, it sends the Origin: HTTP header with a cookie, a certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (through Access-Control-Allow-Credentials: HTTP header), the image will be tainted and its usage restricted.\n\nWhen not present, the resource is fetched without a CORS request (i.e. without sending the Origin: HTTP header), preventing its non-tainted used in &lt;canvas> elements. If invalid, it is handled as if the enumerated keyword anonymous was used. See CORS settings attributes for additional information.\n",
            },
            {
              name: "preload",
              valueSet: "pl",
              description:
                "This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience. It may have one of the following values:\n\nnone: Indicates that the audio should not be preloaded.\n\nmetadata: Indicates that only audio metadata (e.g. length) is fetched.\n\nauto: Indicates that the whole audio file can be downloaded, even if the user is not expected to use it.\n\nempty string: A synonym of the auto value.\n\nIf not set, preload's default value is browser-defined (i.e. each browser may have its own default value). The spec advises it to be set to metadata.\n\nUsage notes:\n\nThe autoplay attribute has precedence over preload. If autoplay is specified, the browser would obviously need to start downloading the audio for playback.\n\nThe browser is not forced by the specification to follow the value of this attribute; it is a mere hint.\n",
            },
            {
              name: "autoplay",
              valueSet: "v",
              description:
                "A Boolean attribute: if specified, the audio will automatically begin playback as soon as it can do so, without waiting for the entire audio file to finish downloading.\n\nNote: Sites that automatically play audio (or videos with an audio track) can be an unpleasant experience for users, so should be avoided when possible. If you must offer autoplay functionality, you should make it opt-in (requiring a user to specifically enable it). However, this can be useful when creating media elements whose source will be set at a later time, under user control.\n",
            },
            { name: "mediagroup" },
            {
              name: "loop",
              valueSet: "v",
              description:
                "A Boolean attribute: if specified, the audio player will automatically seek back to the start upon reaching the end of the audio.\n",
            },
            {
              name: "muted",
              valueSet: "v",
              description:
                "A Boolean attribute that indicates whether the audio will be initially silenced. Its default value is false.\n",
            },
            {
              name: "controls",
              valueSet: "v",
              description:
                "If this attribute is present, the browser will offer controls to allow the user to control audio playback, including volume, seeking, and pause/resume playback.\n",
            },
          ],
        },
        {
          name: "source",
          description:
            "The source element allows authors to specify multiple alternative media resources for media elements. It does not represent anything on its own.",
          attributes: [
            {
              name: "src",
              description:
                "Required for &lt;audio> and &lt;video>, address of the media resource. The value of this attribute is ignored when the &lt;source> element is placed inside a &lt;picture> element.\n",
            },
            {
              name: "type",
              description:
                "The MIME-type of the resource, optionally with a codecs parameter. See RFC 4281 for information about how to specify codecs.\n",
            },
            {
              name: "sizes",
              description:
                "Is a list of source sizes that describes the final rendered width of the image represented by the source. Each source size consists of a comma-separated list of media condition-length pairs. This information is used by the browser to determine, before laying the page out, which image defined in \\[srcset](/en-US/docs/Web/HTML/Element/source#attr-srcset) to use.\nThe sizes attribute has an effect only when the &lt;source> element is the direct child of a &lt;picture> element.\n",
            },
            {
              name: "srcset",
              description:
                "A list of one or more strings separated by commas indicating a set of possible images represented by the source for the browser to use. Each string is composed of:\n\none URL to an image,\n\na width descriptor, that is a positive integer directly followed by 'w'. The default value, if missing, is the infinity.\n\na pixel density descriptor, that is a positive floating number directly followed by 'x'. The default value, if missing, is 1x.\n\nEach string in the list must have at least a width descriptor or a pixel density descriptor to be valid. Among the list, there must be only one string containing the same tuple of width descriptor and pixel density descriptor.\nThe browser chooses the most adequate image to display at a given point of time.\nThe srcset attribute has an effect only when the &lt;source> element is the direct child of a &lt;picture> element.\n",
            },
            {
              name: "media",
              description:
                "Media query of the resource's intended media; this should be used only in a &lt;picture> element.\n",
            },
          ],
        },
        {
          name: "track",
          description:
            "The track element allows authors to specify explicit external timed text tracks for media elements. It does not represent anything on its own.",
          attributes: [
            {
              name: "default",
              valueSet: "v",
              description:
                "This attribute indicates that the track should be enabled unless the user's preferences indicate that another track is more appropriate. This may only be used on one `track` element per media element.",
            },
            {
              name: "kind",
              valueSet: "tk",
              description:
                "How the text track is meant to be used. If omitted the default kind is `subtitles`. If the attribute is not present, it will use the `subtitles`. If the attribute contains an invalid value, it will use `metadata`. (Versions of Chrome earlier than 52 treated an invalid value as `subtitles`.) The following keywords are allowed:\n\n*   `subtitles`\n    *   Subtitles provide translation of content that cannot be understood by the viewer. For example dialogue or text that is not English in an English language film.\n    *   Subtitles may contain additional content, usually extra background information. For example the text at the beginning of the Star Wars films, or the date, time, and location of a scene.\n*   `captions`\n    *   Closed captions provide a transcription and possibly a translation of audio.\n    *   It may include important non-verbal information such as music cues or sound effects. It may indicate the cue's source (e.g. music, text, character).\n    *   Suitable for users who are deaf or when the sound is muted.\n*   `descriptions`\n    *   Textual description of the video content.\n    *   Suitable for users who are blind or where the video cannot be seen.\n*   `chapters`\n    *   Chapter titles are intended to be used when the user is navigating the media resource.\n*   `metadata`\n    *   Tracks used by scripts. Not visible to the user.",
            },
            {
              name: "label",
              description:
                "A user-readable title of the text track which is used by the browser when listing available text tracks.",
            },
            {
              name: "src",
              description:
                'Address of the track (`.vtt` file). Must be a valid URL. This attribute must be specified and its URL value must have the same origin as the document — unless the [`<audio>`](/en-US/docs/Web/HTML/Element/audio "The HTML <audio> element is used to embed sound content in documents. It may contain one or more audio sources, represented using the src attribute or the <source> element: the browser will choose the most suitable one. It can also be the destination for streamed media, using a MediaStream.") or [`<video>`](/en-US/docs/Web/HTML/Element/video "The HTML Video element (<video>) embeds a media player which supports video playback into the document.") parent element of the `track` element has a `[crossorigin](/en-US/docs/Web/HTML/CORS_settings_attributes)` attribute.',
            },
            {
              name: "srclang",
              description:
                "Language of the track text data. It must be a valid [BCP 47](https://r12a.github.io/app-subtags/) language tag. If the `kind` attribute is set to `subtitles,` then `srclang` must be defined.",
            },
          ],
        },
        {
          name: "map",
          description:
            "The map element, in conjunction with an img element and any area element descendants, defines an image map. The element represents its children.",
          attributes: [
            {
              name: "name",
              description:
                "The name attribute gives the map a name so that it can be referenced. The attribute must be present and must have a non-empty value with no space characters. The value of the name attribute must not be a compatibility-caseless match for the value of the name attribute of another map element in the same document. If the id attribute is also specified, both attributes must have the same value.",
            },
          ],
        },
        {
          name: "area",
          description:
            "The area element represents either a hyperlink with some text and a corresponding area on an image map, or a dead area on an image map.",
          attributes: [
            { name: "alt" },
            { name: "coords" },
            { name: "shape", valueSet: "sh" },
            { name: "href" },
            { name: "target" },
            { name: "download" },
            { name: "ping" },
            { name: "rel" },
            { name: "hreflang" },
            { name: "type" },
            {
              name: "accesskey",
              description:
                "Specifies a keyboard navigation accelerator for the element. Pressing ALT or a similar key in association with the specified character selects the form control correlated with that key sequence. Page designers are forewarned to avoid key sequences already bound to browsers. This attribute is global since HTML5.",
            },
          ],
        },
        {
          name: "table",
          description:
            "The table element represents data with more than one dimension, in the form of a table.",
          attributes: [
            { name: "sortable", valueSet: "v" },
            { name: "border" },
            {
              name: "align",
              description:
                "This enumerated attribute indicates how the table must be aligned inside the containing document. It may have the following values:\n\nleft: the table is displayed on the left side of the document;\n\ncenter: the table is displayed in the center of the document;\n\nright: the table is displayed on the right side of the document.\n\nUsage Note\n\nDo not use this attribute, as it has been deprecated. The &lt;table> element should be styled using CSS. Set margin-left and margin-right to auto or margin to 0 auto to achieve an effect that is similar to the align attribute.\n\nPrior to Firefox 4, Firefox also supported the middle, absmiddle, and abscenter values as synonyms of center, in quirks mode only.\n",
            },
          ],
        },
        {
          name: "caption",
          description:
            "The caption element represents the title of the table that is its parent, if it has a parent and that is a table element.",
          attributes: [
            {
              name: "align",
              description:
                "This enumerated attribute indicates how the caption must be aligned with respect to the table. It may have one of the following values:\n\nleft\n\nThe caption is displayed to the left of the table.\n\ntop\n\nThe caption is displayed above the table.\n\nright\n\nThe caption is displayed to the right of the table.\n\nbottom\n\nThe caption is displayed below the table.\n\nUsage note: Do not use this attribute, as it has been deprecated. The &lt;caption> element should be styled using the CSS properties caption-side and text-align.\n",
            },
          ],
        },
        {
          name: "colgroup",
          description:
            "The colgroup element represents a group of one or more columns in the table that is its parent, if it has a parent and that is a table element.",
          attributes: [
            { name: "span" },
            {
              name: "align",
              description:
                'This enumerated attribute specifies how horizontal alignment of each column cell content will be handled. Possible values are:\n\n*   `left`, aligning the content to the left of the cell\n*   `center`, centering the content in the cell\n*   `right`, aligning the content to the right of the cell\n*   `justify`, inserting spaces into the textual content so that the content is justified in the cell\n*   `char`, aligning the textual content on a special character with a minimal offset, defined by the `[char](/en-US/docs/Web/HTML/Element/col#attr-char)` and `[charoff](/en-US/docs/Web/HTML/Element/col#attr-charoff)` attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:<string>)")).\n\nIf this attribute is not set, the `left` value is assumed. The descendant [`<col>`](/en-US/docs/Web/HTML/Element/col "The HTML <col> element defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a <colgroup> element.") elements may override this value using their own `[align](/en-US/docs/Web/HTML/Element/col#attr-align)` attribute.\n\n**Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values:\n    *   Do not try to set the [`text-align`](/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property on a selector giving a [`<colgroup>`](/en-US/docs/Web/HTML/Element/colgroup "The HTML <colgroup> element defines a group of columns within a table.") element. Because [`<td>`](/en-US/docs/Web/HTML/Element/td "The HTML <td> element defines a cell of a table that contains data. It participates in the table model.") elements are not descendant of the [`<colgroup>`](/en-US/docs/Web/HTML/Element/colgroup "The HTML <colgroup> element defines a group of columns within a table.") element, they won\'t inherit it.\n    *   If the table doesn\'t use a `[colspan](/en-US/docs/Web/HTML/Element/td#attr-colspan)` attribute, use one `td:nth-child(an+b)` CSS selector per column, where a is the total number of the columns in the table and b is the ordinal position of this column in the table. Only after this selector the [`text-align`](/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property can be used.\n    *   If the table does use a `[colspan](/en-US/docs/Web/HTML/Element/td#attr-colspan)` attribute, the effect can be achieved by combining adequate CSS attribute selectors like `[colspan=n]`, though this is not trivial.\n*   To achieve the same effect as the `char` value, in CSS3, you can use the value of the `[char](/en-US/docs/Web/HTML/Element/colgroup#attr-char)` as the value of the [`text-align`](/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property Unimplemented.',
            },
          ],
        },
        {
          name: "col",
          description:
            "If a col element has a parent and that is a colgroup element that itself has a parent that is a table element, then the col element represents one or more columns in the column group represented by that colgroup.",
          attributes: [
            { name: "span" },
            {
              name: "align",
              description:
                'This enumerated attribute specifies how horizontal alignment of each column cell content will be handled. Possible values are:\n\n*   `left`, aligning the content to the left of the cell\n*   `center`, centering the content in the cell\n*   `right`, aligning the content to the right of the cell\n*   `justify`, inserting spaces into the textual content so that the content is justified in the cell\n*   `char`, aligning the textual content on a special character with a minimal offset, defined by the `[char](/en-US/docs/Web/HTML/Element/col#attr-char)` and `[charoff](/en-US/docs/Web/HTML/Element/col#attr-charoff)` attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:<string>)")).\n\nIf this attribute is not set, its value is inherited from the `[align](/en-US/docs/Web/HTML/Element/colgroup#attr-align)` of the [`<colgroup>`](/en-US/docs/Web/HTML/Element/colgroup "The HTML <colgroup> element defines a group of columns within a table.") element this `<col>` element belongs too. If there are none, the `left` value is assumed.\n\n**Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values:\n    *   Do not try to set the [`text-align`](/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property on a selector giving a [`<col>`](/en-US/docs/Web/HTML/Element/col "The HTML <col> element defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a <colgroup> element.") element. Because [`<td>`](/en-US/docs/Web/HTML/Element/td "The HTML <td> element defines a cell of a table that contains data. It participates in the table model.") elements are not descendant of the [`<col>`](/en-US/docs/Web/HTML/Element/col "The HTML <col> element defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a <colgroup> element.") element, they won\'t inherit it.\n    *   If the table doesn\'t use a `[colspan](/en-US/docs/Web/HTML/Element/td#attr-colspan)` attribute, use the `td:nth-child(an+b)` CSS selector. Set `a` to zero and `b` to the position of the column in the table, e.g. `td:nth-child(2) { text-align: right; }` to right-align the second column.\n    *   If the table does use a `[colspan](/en-US/docs/Web/HTML/Element/td#attr-colspan)` attribute, the effect can be achieved by combining adequate CSS attribute selectors like `[colspan=n]`, though this is not trivial.\n*   To achieve the same effect as the `char` value, in CSS3, you can use the value of the `[char](/en-US/docs/Web/HTML/Element/col#attr-char)` as the value of the [`text-align`](/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property Unimplemented.',
            },
          ],
        },
        {
          name: "tbody",
          description:
            "The tbody element represents a block of rows that consist of a body of data for the parent table element, if the tbody element has a parent and it is a table.",
          attributes: [
            {
              name: "align",
              description:
                "This enumerated attribute specifies how horizontal alignment of each cell content will be handled. Possible values are:\n\nleft, aligning the content to the left of the cell\n\ncenter, centering the content in the cell\n\nright, aligning the content to the right of the cell\n\njustify, inserting spaces into the textual content so that the content is justified in the cell\n\nchar, aligning the textual content on a special character with a minimal offset, defined by the \\[char](/en-US/docs/Web/HTML/Element/tbody#attr-char) and \\[charoff](/en-US/docs/Web/HTML/Element/tbody#attr-charoff) attributes.\n\nIf this attribute is not set, the left value is assumed.\n\nNote: Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\nTo achieve the same effect as the left, center, right or justify values, use the CSS text-align property on it.\n\nTo achieve the same effect as the char value, in CSS3, you can use the value of the \\[char](/en-US/docs/Web/HTML/Element/tbody#attr-char) as the value of the text-align property Unimplemented.\n",
            },
          ],
        },
        {
          name: "thead",
          description:
            "The thead element represents the block of rows that consist of the column labels (headers) for the parent table element, if the thead element has a parent and it is a table.",
          attributes: [
            {
              name: "align",
              description:
                'This enumerated attribute specifies how horizontal alignment of each cell content will be handled. Possible values are:\n\n*   `left`, aligning the content to the left of the cell\n*   `center`, centering the content in the cell\n*   `right`, aligning the content to the right of the cell\n*   `justify`, inserting spaces into the textual content so that the content is justified in the cell\n*   `char`, aligning the textual content on a special character with a minimal offset, defined by the `[char](/en-US/docs/Web/HTML/Element/thead#attr-char)` and `[charoff](/en-US/docs/Web/HTML/Element/thead#attr-charoff)` attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:<string>)")).\n\nIf this attribute is not set, the `left` value is assumed.\n\n**Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values, use the CSS [`text-align`](/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property on it.\n*   To achieve the same effect as the `char` value, in CSS3, you can use the value of the `[char](/en-US/docs/Web/HTML/Element/thead#attr-char)` as the value of the [`text-align`](/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property Unimplemented.',
            },
          ],
        },
        {
          name: "tfoot",
          description:
            "The tfoot element represents the block of rows that consist of the column summaries (footers) for the parent table element, if the tfoot element has a parent and it is a table.",
          attributes: [
            {
              name: "align",
              description:
                'This enumerated attribute specifies how horizontal alignment of each cell content will be handled. Possible values are:\n\n*   `left`, aligning the content to the left of the cell\n*   `center`, centering the content in the cell\n*   `right`, aligning the content to the right of the cell\n*   `justify`, inserting spaces into the textual content so that the content is justified in the cell\n*   `char`, aligning the textual content on a special character with a minimal offset, defined by the `[char](/en-US/docs/Web/HTML/Element/tbody#attr-char)` and `[charoff](/en-US/docs/Web/HTML/Element/tbody#attr-charoff)` attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:<string>)")).\n\nIf this attribute is not set, the `left` value is assumed.\n\n**Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values, use the CSS [`text-align`](/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property on it.\n*   To achieve the same effect as the `char` value, in CSS3, you can use the value of the `[char](/en-US/docs/Web/HTML/Element/tfoot#attr-char)` as the value of the [`text-align`](/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property Unimplemented.',
            },
          ],
        },
        {
          name: "tr",
          description: "The tr element represents a row of cells in a table.",
          attributes: [
            {
              name: "align",
              description:
                'A DOMString which specifies how the cell\'s context should be aligned horizontally within the cells in the row; this is shorthand for using align on every cell in the row individually. Possible values are:\n\nleft\n\nAlign the content of each cell at its left edge.\n\ncenter\n\nCenter the contents of each cell between their left and right edges.\n\nright\n\nAlign the content of each cell at its right edge.\n\njustify\n\nWiden whitespaces within the text of each cell so that the text fills the full width of each cell (full justification).\n\nchar\n\nAlign each cell in the row on a specific character (such that each row in the column that is configured this way will horizontally align its cells on that character). This uses the \\[char](/en-US/docs/Web/HTML/Element/tr#attr-char) and \\[charoff](/en-US/docs/Web/HTML/Element/tr#attr-charoff) to establish the alignment character (typically "." or "," when aligning numerical data) and the number of characters that should follow the alignment character. This alignment type was never widely supported.\n\nIf no value is expressly set for align, the parent node\'s value is inherited.\n\nInstead of using the obsolete align attribute, you should instead use the CSS text-align property to establish left, center, right, or justify alignment for the row\'s cells. To apply character-based alignment, set the CSS text-align property to the alignment character (such as "." or ",").\n',
            },
          ],
        },
        {
          name: "td",
          description: "The td element represents a data cell in a table.",
          attributes: [
            { name: "colspan" },
            { name: "rowspan" },
            { name: "headers" },
            {
              name: "abbr",
              description:
                "This attribute contains a short abbreviated description of the cell's content. Some user-agents, such as speech readers, may present this description before the content itself.\n\n**Note:** Do not use this attribute as it is obsolete in the latest standard. Alternatively, you can put the abbreviated description inside the cell and place the long content in the **title** attribute.",
            },
            {
              name: "align",
              description:
                'This enumerated attribute specifies how the cell content\'s horizontal alignment will be handled. Possible values are:\n\n*   `left`: The content is aligned to the left of the cell.\n*   `center`: The content is centered in the cell.\n*   `right`: The content is aligned to the right of the cell.\n*   `justify` (with text only): The content is stretched out inside the cell so that it covers its entire width.\n*   `char` (with text only): The content is aligned to a character inside the `<th>` element with minimal offset. This character is defined by the `[char](/en-US/docs/Web/HTML/Element/td#attr-char)` and `[charoff](/en-US/docs/Web/HTML/Element/td#attr-charoff)` attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:<string>)")).\n\nThe default value when this attribute is not specified is `left`.\n\n**Note:** Do not use this attribute as it is obsolete in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values, apply the CSS [`text-align`](/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property to the element.\n*   To achieve the same effect as the `char` value, give the [`text-align`](/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property the same value you would use for the `[char](/en-US/docs/Web/HTML/Element/td#attr-char)`. Unimplemented in CSS3.',
            },
            {
              name: "axis",
              description:
                "This attribute contains a list of space-separated strings. Each string is the `id` of a group of cells that this header applies to.\n\n**Note:** Do not use this attribute as it is obsolete in the latest standard.",
            },
            {
              name: "bgcolor",
              description:
                'This attribute defines the background color of each cell in a column. It consists of a 6-digit hexadecimal code as defined in [sRGB](https://www.w3.org/Graphics/Color/sRGB) and is prefixed by \'#\'. This attribute may be used with one of sixteen predefined color strings:\n\n \n\n`black` = "#000000"\n\n \n\n`green` = "#008000"\n\n \n\n`silver` = "#C0C0C0"\n\n \n\n`lime` = "#00FF00"\n\n \n\n`gray` = "#808080"\n\n \n\n`olive` = "#808000"\n\n \n\n`white` = "rgb(255, 255, 255)FFF"\n\n \n\n`yellow` = "rgb(255, 255, 255)F00"\n\n \n\n`maroon` = "#800000"\n\n \n\n`navy` = "#000080"\n\n \n\n`red` = "#FF0000"\n\n \n\n`blue` = "#0000FF"\n\n \n\n`purple` = "#800080"\n\n \n\n`teal` = "#008080"\n\n \n\n`fuchsia` = "#FF00FF"\n\n \n\n`aqua` = "#00FFFF"\n\n**Note:** Do not use this attribute, as it is non-standard and only implemented in some versions of Microsoft Internet Explorer: The [`<td>`](/en-US/docs/Web/HTML/Element/td "The HTML <td> element defines a cell of a table that contains data. It participates in the table model.") element should be styled using [CSS](/en-US/docs/CSS). To create a similar effect use the [`background-color`](/en-US/docs/Web/CSS/background-color "The background-color CSS property sets the background color of an element.") property in [CSS](/en-US/docs/CSS) instead.',
            },
          ],
        },
        {
          name: "th",
          description: "The th element represents a header cell in a table.",
          attributes: [
            { name: "colspan" },
            { name: "rowspan" },
            { name: "headers" },
            { name: "scope", valueSet: "s" },
            { name: "sorted" },
            {
              name: "abbr",
              description:
                "This attribute contains a short abbreviated description of the cell's content. Some user-agents, such as speech readers, may present this description before the content itself.\n",
            },
            {
              name: "align",
              description:
                "This enumerated attribute specifies how the cell content's horizontal alignment will be handled. Possible values are:\n\nleft: The content is aligned to the left of the cell.\n\ncenter: The content is centered in the cell.\n\nright: The content is aligned to the right of the cell.\n\njustify (with text only): The content is stretched out inside the cell so that it covers its entire width.\n\nchar (with text only): The content is aligned to a character inside the &lt;th> element with minimal offset. This character is defined by the \\[char](/en-US/docs/Web/HTML/Element/th#attr-char) and \\[charoff](/en-US/docs/Web/HTML/Element/th#attr-charoff) attributes.\n\nThe default value when this attribute is not specified is left.\n\nNote: Do not use this attribute as it is obsolete in the latest standard.\n\nTo achieve the same effect as the left, center, right or justify values, apply the CSS text-align property to the element.\n\nTo achieve the same effect as the char value, give the text-align property the same value you would use for the \\[char](/en-US/docs/Web/HTML/Element/th#attr-char). Unimplemented in CSS3.\n",
            },
            {
              name: "axis",
              description:
                "This attribute contains a list of space-separated strings. Each string is the id of a group of cells that this header applies to.\n\nNote: Do not use this attribute as it is obsolete in the latest standard: use the \\[scope](/en-US/docs/Web/HTML/Element/th#attr-scope) attribute instead.\n",
            },
            {
              name: "bgcolor",
              description:
                'This attribute defines the background color of each cell in a column. It consists of a 6-digit hexadecimal code as defined in sRGB and is prefixed by \'#\'. This attribute may be used with one of sixteen predefined color strings:\n\nblack = "#000000"\n\ngreen = "#008000"\n\nsilver = "#C0C0C0"\n\nlime = "#00FF00"\n\ngray = "#808080"\n\nolive = "#808000"\n\nwhite = "rgb(255, 255, 255)FFF"\n\nyellow = "rgb(255, 255, 255)F00"\n\nmaroon = "#800000"\n\nnavy = "#000080"\n\nred = "#FF0000"\n\nblue = "#0000FF"\n\npurple = "#800080"\n\nteal = "#008080"\n\nfuchsia = "#FF00FF"\n\naqua = "#00FFFF"\n\nNote: Do not use this attribute, as it is non-standard and only implemented in some versions of Microsoft Internet Explorer: The &lt;th> element should be styled using CSS. To create a similar effect use the background-color property in CSS instead.\n',
            },
          ],
        },
        {
          name: "form",
          description:
            "The form element represents a collection of form-associated elements, some of which can represent editable values that can be submitted to a server for processing.",
          attributes: [
            {
              name: "accept-charset",
              description:
                'A space- or comma-delimited list of character encodings that the server accepts. The browser uses them in the order in which they are listed. The default value, the reserved string `"UNKNOWN"`, indicates the same encoding as that of the document containing the form element.  \nIn previous versions of HTML, the different character encodings could be delimited by spaces or commas. In HTML5, only spaces are allowed as delimiters.',
            },
            {
              name: "action",
              description:
                'The URI of a program that processes the form information. This value can be overridden by a `[formaction](/en-US/docs/Web/HTML/Element/button#attr-formaction)` attribute on a [`<button>`](/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.',
            },
            {
              name: "autocomplete",
              valueSet: "o",
              description:
                "Indicates whether input elements can by default have their values automatically completed by the browser. This setting can be overridden by an `autocomplete` attribute on an element belonging to the form. Possible values are:\n\n*   `off`: The user must explicitly enter a value into each field for every use, or the document provides its own auto-completion method; the browser does not automatically complete entries.\n*   `on`: The browser can automatically complete values based on values that the user has previously entered in the form.\n\nFor most modern browsers (including Firefox 38+, Google Chrome 34+, IE 11+) setting the autocomplete attribute will not prevent a browser's password manager from asking the user if they want to store login fields (username and password), if the user permits the storage the browser will autofill the login the next time the user visits the page. See [The autocomplete attribute and login fields](/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion#The_autocomplete_attribute_and_login_fields).",
            },
            {
              name: "enctype",
              valueSet: "et",
              description:
                'When the value of the `method` attribute is `post`, enctype is the [MIME type](https://en.wikipedia.org/wiki/Mime_type) of content that is used to submit the form to the server. Possible values are:\n\n*   `application/x-www-form-urlencoded`: The default value if the attribute is not specified.\n*   `multipart/form-data`: The value used for an [`<input>`](/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element with the `type` attribute set to "file".\n*   `text/plain`: (HTML5)\n\nThis value can be overridden by a `[formenctype](/en-US/docs/Web/HTML/Element/button#attr-formenctype)` attribute on a [`<button>`](/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.',
            },
            {
              name: "method",
              valueSet: "m",
              description:
                'The [HTTP](/en-US/docs/Web/HTTP) method that the browser uses to submit the form. Possible values are:\n\n*   `post`: Corresponds to the HTTP [POST method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.5) ; form data are included in the body of the form and sent to the server.\n*   `get`: Corresponds to the HTTP [GET method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.3); form data are appended to the `action` attribute URI with a \'?\' as separator, and the resulting URI is sent to the server. Use this method when the form has no side-effects and contains only ASCII characters.\n*   `dialog`: Use when the form is inside a [`<dialog>`](/en-US/docs/Web/HTML/Element/dialog "The HTML <dialog> element represents a dialog box or other interactive component, such as an inspector or window.") element to close the dialog when submitted.\n\nThis value can be overridden by a `[formmethod](/en-US/docs/Web/HTML/Element/button#attr-formmethod)` attribute on a [`<button>`](/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.',
            },
            {
              name: "name",
              description:
                "The name of the form. In HTML 4, its use is deprecated (`id` should be used instead). It must be unique among the forms in a document and not just an empty string in HTML 5.",
            },
            {
              name: "novalidate",
              valueSet: "v",
              description:
                'This Boolean attribute indicates that the form is not to be validated when submitted. If this attribute is not specified (and therefore the form is validated), this default setting can be overridden by a `[formnovalidate](/en-US/docs/Web/HTML/Element/button#attr-formnovalidate)` attribute on a [`<button>`](/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element belonging to the form.',
            },
            {
              name: "target",
              description:
                'A name or keyword indicating where to display the response that is received after submitting the form. In HTML 4, this is the name/keyword for a frame. In HTML5, it is a name/keyword for a _browsing context_ (for example, tab, window, or inline frame). The following keywords have special meanings:\n\n*   `_self`: Load the response into the same HTML 4 frame (or HTML5 browsing context) as the current one. This value is the default if the attribute is not specified.\n*   `_blank`: Load the response into a new unnamed HTML 4 window or HTML5 browsing context.\n*   `_parent`: Load the response into the HTML 4 frameset parent of the current frame, or HTML5 parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.\n*   `_top`: HTML 4: Load the response into the full original window, and cancel all other frames. HTML5: Load the response into the top-level browsing context (i.e., the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`.\n*   _iframename_: The response is displayed in a named [`<iframe>`](/en-US/docs/Web/HTML/Element/iframe "The HTML Inline Frame element (<iframe>) represents a nested browsing context, embedding another HTML page into the current one.").\n\nHTML5: This value can be overridden by a `[formtarget](/en-US/docs/Web/HTML/Element/button#attr-formtarget)` attribute on a [`<button>`](/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.',
            },
            {
              name: "accept",
              description:
                'A comma-separated list of content types that the server accepts.\n\n**Usage note:** This attribute has been removed in HTML5 and should no longer be used. Instead, use the `[accept](/en-US/docs/Web/HTML/Element/input#attr-accept)` attribute of the specific [`<input>`](/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.',
            },
            {
              name: "autocapitalize",
              description:
                "This is a nonstandard attribute used by iOS Safari Mobile which controls whether and how the text value for textual form control descendants should be automatically capitalized as it is entered/edited by the user. If the `autocapitalize` attribute is specified on an individual form control descendant, it trumps the form-wide `autocapitalize` setting. The non-deprecated values are available in iOS 5 and later. The default value is `sentences`. Possible values are:\n\n*   `none`: Completely disables automatic capitalization\n*   `sentences`: Automatically capitalize the first letter of sentences.\n*   `words`: Automatically capitalize the first letter of words.\n*   `characters`: Automatically capitalize all characters.\n*   `on`: Deprecated since iOS 5.\n*   `off`: Deprecated since iOS 5.",
            },
          ],
        },
        {
          name: "label",
          description:
            "The label element represents a caption in a user interface. The caption can be associated with a specific form control, known as the label element's labeled control, either using the for attribute, or by putting the form control inside the label element itself.",
          attributes: [
            {
              name: "form",
              description:
                'The [`<form>`](/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element with which the label is associated (its _form owner_). If specified, the value of the attribute is the `id` of a [`<form>`](/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element in the same document. This lets you place label elements anywhere within a document, not just as descendants of their form elements.',
            },
            {
              name: "for",
              description:
                "The `[id](/en-US/docs/Web/HTML/Global_attributes#attr-id)` of a [labelable](/en-US/docs/Web/Guide/HTML/Content_categories#Form_labelable) form-related element in the same document as the `<label>` element. The first element in the document with an `id` matching the value of the `for` attribute is the _labeled control_ for this label element, if it is a labelable element. If it is not labelable then the `for` attribute has no effect. If there are other elements which also match the `id` value, later in the document, they are not considered.\n\n**Note**: A `<label>` element can have both a `for` attribute and a contained control element, as long as the `for` attribute points to the contained control element.",
            },
          ],
        },
        {
          name: "input",
          description:
            "The input element represents a typed data field, usually with a form control to allow the user to edit the data.",
          attributes: [
            { name: "accept" },
            { name: "alt" },
            { name: "autocomplete", valueSet: "inputautocomplete" },
            { name: "autofocus", valueSet: "v" },
            { name: "checked", valueSet: "v" },
            { name: "dirname" },
            { name: "disabled", valueSet: "v" },
            { name: "form" },
            { name: "formaction" },
            { name: "formenctype", valueSet: "et" },
            { name: "formmethod", valueSet: "fm" },
            { name: "formnovalidate", valueSet: "v" },
            { name: "formtarget" },
            { name: "height" },
            { name: "inputmode", valueSet: "im" },
            { name: "list" },
            { name: "max" },
            { name: "maxlength" },
            { name: "min" },
            { name: "minlength" },
            { name: "multiple", valueSet: "v" },
            { name: "name" },
            { name: "pattern" },
            { name: "placeholder" },
            { name: "readonly", valueSet: "v" },
            { name: "required", valueSet: "v" },
            { name: "size" },
            { name: "src" },
            { name: "step" },
            { name: "type", valueSet: "t" },
            { name: "value" },
            { name: "width" },
          ],
        },
        {
          name: "button",
          description:
            "The button element represents a button labeled by its contents.",
          attributes: [
            {
              name: "autofocus",
              valueSet: "v",
              description:
                "This Boolean attribute lets you specify that the button should have input focus when the page loads, unless the user overrides it, for example by typing in a different control. Only one form-associated element in a document can have this attribute specified.\n",
            },
            {
              name: "disabled",
              valueSet: "v",
              description:
                "This Boolean attribute indicates that the user cannot interact with the button. If this attribute is not specified, the button inherits its setting from the containing element, for example &lt;fieldset>; if there is no containing element with the disabled attribute set, then the button is enabled.\n\nFirefox will, unlike other browsers, by default, persist the dynamic disabled state of a &lt;button> across page loads. Use the \\[autocomplete](/en-US/docs/Web/HTML/Element/button#attr-autocomplete) attribute to control this feature.\n",
            },
            {
              name: "form",
              description:
                "The form element that the button is associated with (its form owner). The value of the attribute must be the id attribute of a &lt;form> element in the same document. If this attribute is not specified, the &lt;button> element will be associated to an ancestor &lt;form> element, if one exists. This attribute enables you to associate &lt;button> elements to &lt;form> elements anywhere within a document, not just as descendants of &lt;form> elements.\n",
            },
            {
              name: "formaction",
              description:
                "The URI of a program that processes the information submitted by the button. If specified, it overrides the \\[action](/en-US/docs/Web/HTML/Element/form#attr-action) attribute of the button's form owner.\n",
            },
            {
              name: "formenctype",
              valueSet: "et",
              description:
                "If the button is a submit button, this attribute specifies the type of content that is used to submit the form to the server. Possible values are:\n\napplication/x-www-form-urlencoded: The default value if the attribute is not specified.\n\nmultipart/form-data: Use this value if you are using an &lt;input> element with the \\[type](/en-US/docs/Web/HTML/Element/input#attr-type) attribute set to file.\n\ntext/plain\n\nIf this attribute is specified, it overrides the \\[enctype](/en-US/docs/Web/HTML/Element/form#attr-enctype) attribute of the button's form owner.\n",
            },
            {
              name: "formmethod",
              valueSet: "fm",
              description:
                "If the button is a submit button, this attribute specifies the HTTP method that the browser uses to submit the form. Possible values are:\n\npost: The data from the form are included in the body of the form and sent to the server.\n\nget: The data from the form are appended to the form attribute URI, with a '?' as a separator, and the resulting URI is sent to the server. Use this method when the form has no side-effects and contains only ASCII characters.\n\nIf specified, this attribute overrides the \\[method](/en-US/docs/Web/HTML/Element/form#attr-method) attribute of the button's form owner.\n",
            },
            {
              name: "formnovalidate",
              valueSet: "v",
              description:
                "If the button is a submit button, this Boolean attribute specifies that the form is not to be validated when it is submitted. If this attribute is specified, it overrides the \\[novalidate](/en-US/docs/Web/HTML/Element/form#attr-novalidate) attribute of the button's form owner.\n",
            },
            {
              name: "formtarget",
              description:
                "If the button is a submit button, this attribute is a name or keyword indicating where to display the response that is received after submitting the form. This is a name of, or keyword for, a browsing context (for example, tab, window, or inline frame). If this attribute is specified, it overrides the \\[target](/en-US/docs/Web/HTML/Element/form#attr-target) attribute of the button's form owner. The following keywords have special meanings:\n\n\\_self: Load the response into the same browsing context as the current one. This value is the default if the attribute is not specified.\n\n\\_blank: Load the response into a new unnamed browsing context.\n\n\\_parent: Load the response into the parent browsing context of the current one. If there is no parent, this option behaves the same way as \\_self.\n\n\\_top: Load the response into the top-level browsing context (that is, the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as \\_self.\n",
            },
            {
              name: "name",
              description:
                "The name of the button, which is submitted with the form data.\n",
            },
            {
              name: "type",
              valueSet: "bt",
              description:
                "The type of the button. Possible values are:\n\nsubmit: The button submits the form data to the server. This is the default if the attribute is not specified, or if the attribute is dynamically changed to an empty or invalid value.\n\nreset: The button resets all the controls to their initial values.\n\nbutton: The button has no default behavior. It can have client-side scripts associated with the element's events, which are triggered when the events occur.\n",
            },
            {
              name: "value",
              description:
                "The initial value of the button. It defines the value associated with the button which is submitted with the form data. This value is passed to the server in params when the form is submitted.\n",
            },
            {
              name: "autocomplete",
              description:
                'The use of this attribute on a &lt;button> is nonstandard and Firefox-specific. By default, unlike other browsers, Firefox persists the dynamic disabled state of a &lt;button> across page loads. Setting the value of this attribute to off (i.e. autocomplete="off") disables this feature. See bug 654072.\n',
            },
          ],
        },
        {
          name: "select",
          description:
            "The select element represents a control for selecting amongst a set of options.",
          attributes: [
            {
              name: "autocomplete",
              valueSet: "inputautocomplete",
              description:
                "A DOMString providing a hint for a user agent's autocomplete feature. See The HTML autocomplete attribute for a complete list of values and details on how to use autocomplete.\n",
            },
            {
              name: "autofocus",
              valueSet: "v",
              description:
                "This Boolean attribute lets you specify that a form control should have input focus when the page loads. Only one form element in a document can have the autofocus attribute.\n",
            },
            {
              name: "disabled",
              valueSet: "v",
              description:
                "This Boolean attribute indicates that the user cannot interact with the control. If this attribute is not specified, the control inherits its setting from the containing element, for example fieldset; if there is no containing element with the disabled attribute set, then the control is enabled.\n",
            },
            {
              name: "form",
              description:
                'This attribute lets you specify the form element to which the select element is associated (that is, its "form owner"). If this attribute is specified, its value must be the same as the id of a form element in the same document. This enables you to place select elements anywhere within a document, not just as descendants of their form elements.\n',
            },
            {
              name: "multiple",
              valueSet: "v",
              description:
                "This Boolean attribute indicates that multiple options can be selected in the list. If it is not specified, then only one option can be selected at a time. When multiple is specified, most browsers will show a scrolling list box instead of a single line dropdown.\n",
            },
            {
              name: "name",
              description:
                "This attribute is used to specify the name of the control.\n",
            },
            {
              name: "required",
              valueSet: "v",
              description:
                "A Boolean attribute indicating that an option with a non-empty string value must be selected.\n",
            },
            {
              name: "size",
              description:
                "If the control is presented as a scrolling list box (e.g. when multiple is specified), this attribute represents the number of rows in the list that should be visible at one time. Browsers are not required to present a select element as a scrolled list box. The default value is 0.\n\nNote: According to the HTML5 specification, the default value for size should be 1; however, in practice, this has been found to break some web sites, and no other browser currently does that, so Mozilla has opted to continue to return 0 for the time being with Firefox.\n",
            },
          ],
        },
        {
          name: "datalist",
          description:
            "The datalist element represents a set of option elements that represent predefined options for other controls. In the rendering, the datalist element represents nothing and it, along with its children, should be hidden.",
          attributes: [],
        },
        {
          name: "optgroup",
          description:
            "The optgroup element represents a group of option elements with a common label.",
          attributes: [
            {
              name: "disabled",
              valueSet: "v",
              description:
                "If this Boolean attribute is set, none of the items in this option group is selectable. Often browsers grey out such control and it won't receive any browsing events, like mouse clicks or focus-related ones.",
            },
            {
              name: "label",
              description:
                "The name of the group of options, which the browser can use when labeling the options in the user interface. This attribute is mandatory if this element is used.",
            },
          ],
        },
        {
          name: "option",
          description:
            "The option element represents an option in a select element or as part of a list of suggestions in a datalist element.",
          attributes: [
            {
              name: "disabled",
              valueSet: "v",
              description:
                "If this Boolean attribute is set, this option is not checkable. Often browsers grey out such control and it won't receive any browsing event, like mouse clicks or focus-related ones. If this attribute is not set, the element can still be disabled if one of its ancestors is a disabled &lt;optgroup> element.\n",
            },
            {
              name: "label",
              description:
                "This attribute is text for the label indicating the meaning of the option. If the label attribute isn't defined, its value is that of the element text content.\n",
            },
            {
              name: "selected",
              valueSet: "v",
              description:
                "If present, this Boolean attribute indicates that the option is initially selected. If the &lt;option> element is the descendant of a &lt;select> element whose \\[multiple](/en-US/docs/Web/HTML/Element/select#attr-multiple) attribute is not set, only one single &lt;option> of this &lt;select> element may have the selected attribute.\n",
            },
            {
              name: "value",
              description:
                "The content of this attribute represents the value to be submitted with the form, should this option be selected. If this attribute is omitted, the value is taken from the text content of the option element.\n",
            },
          ],
        },
        {
          name: "textarea",
          description:
            "The textarea element represents a multiline plain text edit control for the element's raw value. The contents of the control represent the control's default value.",
          attributes: [
            {
              name: "autocomplete",
              valueSet: "inputautocomplete",
              description:
                'This attribute indicates whether the value of the control can be automatically completed by the browser. Possible values are:\n\n*   `off`: The user must explicitly enter a value into this field for every use, or the document provides its own auto-completion method; the browser does not automatically complete the entry.\n*   `on`: The browser can automatically complete the value based on values that the user has entered during previous uses.\n\nIf the `autocomplete` attribute is not specified on a `<textarea>` element, then the browser uses the `autocomplete` attribute value of the `<textarea>` element\'s form owner. The form owner is either the [`<form>`](/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element that this `<textarea>` element is a descendant of or the form element whose `id` is specified by the `form` attribute of the input element. For more information, see the `[autocomplete](/en-US/docs/Web/HTML/Element/form#attr-autocomplete)` attribute in [`<form>`](/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.").',
            },
            {
              name: "autofocus",
              valueSet: "v",
              description:
                "This Boolean attribute lets you specify that a form control should have input focus when the page loads. Only one form-associated element in a document can have this attribute specified.",
            },
            {
              name: "cols",
              description:
                "The visible width of the text control, in average character widths. If it is specified, it must be a positive integer. If it is not specified, the default value is `20`.",
            },
            { name: "dirname" },
            {
              name: "disabled",
              valueSet: "v",
              description:
                'This Boolean attribute indicates that the user cannot interact with the control. If this attribute is not specified, the control inherits its setting from the containing element, for example [`<fieldset>`](/en-US/docs/Web/HTML/Element/fieldset "The HTML <fieldset> element is used to group several controls as well as labels (<label>) within a web form."); if there is no containing element when the `disabled` attribute is set, the control is enabled.',
            },
            {
              name: "form",
              description:
                'The form element that the `<textarea>` element is associated with (its "form owner"). The value of the attribute must be the `id` of a form element in the same document. If this attribute is not specified, the `<textarea>` element must be a descendant of a form element. This attribute enables you to place `<textarea>` elements anywhere within a document, not just as descendants of form elements.',
            },
            { name: "inputmode", valueSet: "im" },
            {
              name: "maxlength",
              description:
                "The maximum number of characters (unicode code points) that the user can enter. If this value isn't specified, the user can enter an unlimited number of characters.",
            },
            {
              name: "minlength",
              description:
                "The minimum number of characters (unicode code points) required that the user should enter.",
            },
            { name: "name", description: "The name of the control." },
            {
              name: "placeholder",
              description:
                'A hint to the user of what can be entered in the control. Carriage returns or line-feeds within the placeholder text must be treated as line breaks when rendering the hint.\n\n**Note:** Placeholders should only be used to show an example of the type of data that should be entered into a form; they are _not_ a substitute for a proper [`<label>`](/en-US/docs/Web/HTML/Element/label "The HTML <label> element represents a caption for an item in a user interface.") element tied to the input. See [Labels and placeholders](/en-US/docs/Web/HTML/Element/input#Labels_and_placeholders "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") in [<input>: The Input (Form Input) element](/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") for a full explanation.',
            },
            {
              name: "readonly",
              valueSet: "v",
              description:
                "This Boolean attribute indicates that the user cannot modify the value of the control. Unlike the `disabled` attribute, the `readonly` attribute does not prevent the user from clicking or selecting in the control. The value of a read-only control is still submitted with the form.",
            },
            {
              name: "required",
              valueSet: "v",
              description:
                "This attribute specifies that the user must fill in a value before submitting a form.",
            },
            {
              name: "rows",
              description: "The number of visible text lines for the control.",
            },
            {
              name: "wrap",
              valueSet: "w",
              description:
                "Indicates how the control wraps text. Possible values are:\n\n*   `hard`: The browser automatically inserts line breaks (CR+LF) so that each line has no more than the width of the control; the `cols` attribute must also be specified for this to take effect.\n*   `soft`: The browser ensures that all line breaks in the value consist of a CR+LF pair, but does not insert any additional line breaks.\n*   `off` : Like `soft` but changes appearance to `white-space: pre` so line segments exceeding `cols` are not wrapped and the `<textarea>` becomes horizontally scrollable.\n\nIf this attribute is not specified, `soft` is its default value.",
            },
            {
              name: "autocapitalize",
              description:
                "This is a non-standard attribute supported by WebKit on iOS (therefore nearly all browsers running on iOS, including Safari, Firefox, and Chrome), which controls whether and how the text value should be automatically capitalized as it is entered/edited by the user. The non-deprecated values are available in iOS 5 and later. Possible values are:\n\n*   `none`: Completely disables automatic capitalization.\n*   `sentences`: Automatically capitalize the first letter of sentences.\n*   `words`: Automatically capitalize the first letter of words.\n*   `characters`: Automatically capitalize all characters.\n*   `on`: Deprecated since iOS 5.\n*   `off`: Deprecated since iOS 5.",
            },
            {
              name: "spellcheck",
              description:
                "Specifies whether the `<textarea>` is subject to spell checking by the underlying browser/OS. the value can be:\n\n*   `true`: Indicates that the element needs to have its spelling and grammar checked.\n*   `default` : Indicates that the element is to act according to a default behavior, possibly based on the parent element's own `spellcheck` value.\n*   `false` : Indicates that the element should not be spell checked.",
            },
          ],
        },
        {
          name: "output",
          description:
            "The output element represents the result of a calculation performed by the application, or the result of a user action.",
          attributes: [
            {
              name: "for",
              description:
                "A space-separated list of other elements’ \\[id](/en-US/docs/Web/HTML/Global_attributes/id)s, indicating that those elements contributed input values to (or otherwise affected) the calculation.\n",
            },
            {
              name: "form",
              description:
                'The form element that this element is associated with (its "form owner"). The value of the attribute must be an id of a form element in the same document. If this attribute is not specified, the output element must be a descendant of a form element. This attribute enables you to place output elements anywhere within a document, not just as descendants of their form elements.\n',
            },
            {
              name: "name",
              description:
                "The name of the element, exposed in the HTMLFormElement API.\n",
            },
          ],
        },
        {
          name: "progress",
          description:
            "The progress element represents the completion progress of a task. The progress is either indeterminate, indicating that progress is being made but that it is not clear how much more work remains to be done before the task is complete (e.g. because the task is waiting for a remote host to respond), or the progress is a number in the range zero to a maximum, giving the fraction of work that has so far been completed.",
          attributes: [
            {
              name: "value",
              description:
                "This attribute specifies how much of the task that has been completed. It must be a valid floating point number between 0 and `max`, or between 0 and 1 if `max` is omitted. If there is no `value` attribute, the progress bar is indeterminate; this indicates that an activity is ongoing with no indication of how long it is expected to take.",
            },
            {
              name: "max",
              description:
                "This attribute describes how much work the task indicated by the `progress` element requires. The `max` attribute, if present, must have a value greater than zero and be a valid floating point number. The default value is 1.",
            },
          ],
        },
        {
          name: "meter",
          description:
            "The meter element represents a scalar measurement within a known range, or a fractional value; for example disk usage, the relevance of a query result, or the fraction of a voting population to have selected a particular candidate.",
          attributes: [
            {
              name: "value",
              description:
                "The current numeric value. This must be between the minimum and maximum values (`min` attribute and `max` attribute) if they are specified. If unspecified or malformed, the value is 0. If specified, but not within the range given by the `min` attribute and `max` attribute, the value is equal to the nearest end of the range.\n\n**Usage note:** Unless the `value` attribute is between `0` and `1` (inclusive), the `min` and `max` attributes should define the range so that the `value` attribute's value is within it.",
            },
            {
              name: "min",
              description:
                "The lower numeric bound of the measured range. This must be less than the maximum value (`max` attribute), if specified. If unspecified, the minimum value is 0.",
            },
            {
              name: "max",
              description:
                "The upper numeric bound of the measured range. This must be greater than the minimum value (`min` attribute), if specified. If unspecified, the maximum value is 1.",
            },
            {
              name: "low",
              description:
                "The upper numeric bound of the low end of the measured range. This must be greater than the minimum value (`min` attribute), and it also must be less than the high value and maximum value (`high` attribute and `max` attribute, respectively), if any are specified. If unspecified, or if less than the minimum value, the `low` value is equal to the minimum value.",
            },
            {
              name: "high",
              description:
                "The lower numeric bound of the high end of the measured range. This must be less than the maximum value (`max` attribute), and it also must be greater than the low value and minimum value (`low` attribute and **min** attribute, respectively), if any are specified. If unspecified, or if greater than the maximum value, the `high` value is equal to the maximum value.",
            },
            {
              name: "optimum",
              description:
                "This attribute indicates the optimal numeric value. It must be within the range (as defined by the `min` attribute and `max` attribute). When used with the `low` attribute and `high` attribute, it gives an indication where along the range is considered preferable. For example, if it is between the `min` attribute and the `low` attribute, then the lower range is considered preferred.",
            },
            {
              name: "form",
              description:
                "This attribute associates the element with a `form` element that has ownership of the `meter` element. For example, a `meter` might be displaying a range corresponding to an `input` element of `type` _number_. This attribute is only used if the `meter` element is being used as a form-associated element; even then, it may be omitted if the element appears as a descendant of a `form` element.",
            },
          ],
        },
        {
          name: "fieldset",
          description:
            "The fieldset element represents a set of form controls optionally grouped under a common name.",
          attributes: [
            {
              name: "disabled",
              valueSet: "v",
              description:
                "If this Boolean attribute is set, all form controls that are descendants of the `<fieldset>`, are disabled, meaning they are not editable and won't be submitted along with the `<form>`. They won't receive any browsing events, like mouse clicks or focus-related events. By default browsers display such controls grayed out. Note that form elements inside the [`<legend>`](/en-US/docs/Web/HTML/Element/legend \"The HTML <legend> element represents a caption for the content of its parent <fieldset>.\") element won't be disabled.",
            },
            {
              name: "form",
              description:
                'This attribute takes the value of the `id` attribute of a [`<form>`](/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element you want the `<fieldset>` to be part of, even if it is not inside the form.',
            },
            {
              name: "name",
              description:
                'The name associated with the group.\n\n**Note**: The caption for the fieldset is given by the first [`<legend>`](/en-US/docs/Web/HTML/Element/legend "The HTML <legend> element represents a caption for the content of its parent <fieldset>.") element nested inside it.',
            },
          ],
        },
        {
          name: "legend",
          description:
            "The legend element represents a caption for the rest of the contents of the legend element's parent fieldset element, if any.",
          attributes: [],
        },
        {
          name: "details",
          description:
            "The details element represents a disclosure widget from which the user can obtain additional information or controls.",
          attributes: [
            {
              name: "open",
              valueSet: "v",
              description:
                "This Boolean attribute indicates whether or not the details — that is, the contents of the &lt;details> element — are currently visible. The default, false, means the details are not visible.\n",
            },
          ],
        },
        {
          name: "summary",
          description:
            "The summary element represents a summary, caption, or legend for the rest of the contents of the summary element's parent details element, if any.",
          attributes: [],
        },
        {
          name: "dialog",
          description:
            "The dialog element represents a part of an application that a user interacts with to perform a task, for example a dialog box, inspector, or window.",
          attributes: [
            {
              name: "open",
              description:
                "Indicates that the dialog is active and available for interaction. When the `open` attribute is not set, the dialog shouldn't be shown to the user.",
            },
          ],
        },
        {
          name: "script",
          description:
            "The script element allows authors to include dynamic script and data blocks in their documents. The element does not represent content for the user.",
          attributes: [
            {
              name: "src",
              description:
                "This attribute specifies the URI of an external script; this can be used as an alternative to embedding a script directly within a document.\n\nIf a script element has a src attribute specified, it should not have a script embedded inside its tags.\n",
            },
            {
              name: "type",
              description:
                'This attribute indicates the type of script represented. The value of this attribute will be in one of the following categories:\n\nOmitted or a JavaScript MIME type: For HTML5-compliant browsers this indicates the script is JavaScript. HTML5 specification urges authors to omit the attribute rather than provide a redundant MIME type. In earlier browsers, this identified the scripting language of the embedded or imported (via the src attribute) code. JavaScript MIME types are listed in the specification.\n\nmodule: For HTML5-compliant browsers the code is treated as a JavaScript module. The processing of the script contents is not affected by the charset and defer attributes. For information on using module, see ES6 in Depth: Modules. Code may behave differently when the module keyword is used.\n\nAny other value: The embedded content is treated as a data block which won\'t be processed by the browser. Developers must use a valid MIME type that is not a JavaScript MIME type to denote data blocks. The src attribute will be ignored.\n\nNote: in Firefox you could specify the version of JavaScript contained in a &lt;script> element by including a non-standard version parameter inside the type attribute — for example type="text/javascript;version=1.8". This has been removed in Firefox 59 (see bug 1428745).\n',
            },
            { name: "charset" },
            {
              name: "async",
              valueSet: "v",
              description:
                'This is a Boolean attribute indicating that the browser should, if possible, load the script asynchronously.\n\nThis attribute must not be used if the src attribute is absent (i.e. for inline scripts). If it is included in this case it will have no effect.\n\nBrowsers usually assume the worst case scenario and load scripts synchronously, (i.e. async="false") during HTML parsing.\n\nDynamically inserted scripts (using document.createElement()) load asynchronously by default, so to turn on synchronous loading (i.e. scripts load in the order they were inserted) set async="false".\n\nSee Browser compatibility for notes on browser support. See also Async scripts for asm.js.\n',
            },
            {
              name: "defer",
              valueSet: "v",
              description:
                'This Boolean attribute is set to indicate to a browser that the script is meant to be executed after the document has been parsed, but before firing \\[DOMContentLoaded](/en-US/docs/Web/Events/DOMContentLoaded "/en-US/docs/Web/Events/DOMContentLoaded").\n\nScripts with the defer attribute will prevent the DOMContentLoaded event from firing until the script has loaded and finished evaluating.\n\nThis attribute must not be used if the src attribute is absent (i.e. for inline scripts), in this case it would have no effect.\n\nTo achieve a similar effect for dynamically inserted scripts use async="false" instead. Scripts with the defer attribute will execute in the order in which they appear in the document.\n',
            },
            {
              name: "crossorigin",
              valueSet: "xo",
              description:
                "Normal script elements pass minimal information to the window.onerror for scripts which do not pass the standard CORS checks. To allow error logging for sites which use a separate domain for static media, use this attribute. See CORS settings attributes for a more descriptive explanation of its valid arguments.\n",
            },
            {
              name: "nonce",
              description:
                "A cryptographic nonce (number used once) to whitelist inline scripts in a script-src Content-Security-Policy. The server must generate a unique nonce value each time it transmits a policy. It is critical to provide a nonce that cannot be guessed as bypassing a resource's policy is otherwise trivial.\n",
            },
            {
              name: "integrity",
              description:
                "This attribute contains inline metadata that a user agent can use to verify that a fetched resource has been delivered free of unexpected manipulation. See Subresource Integrity.\n",
            },
            {
              name: "nomodule",
              description:
                "This Boolean attribute is set to indicate that the script should not be executed in browsers that support ES2015 modules — in effect, this can be used to serve fallback scripts to older browsers that do not support modular JavaScript code.\n",
            },
            {
              name: "referrerpolicy",
              description:
                'Indicates which referrer to send when fetching the script, or resources fetched by the script:\n\nno-referrer: The Referer header will not be sent.\n\nno-referrer-when-downgrade (default): The Referer header will not be sent to origins without TLS (HTTPS).\n\norigin: The sent referrer will be limited to the origin of the referring page: its scheme, host, and port.\n\norigin-when-cross-origin: The referrer sent to other origins will be limited to the scheme, the host, and the port. Navigations on the same origin will still include the path.\n\nsame-origin: A referrer will be sent for same origin, but cross-origin requests will contain no referrer information.\n\nstrict-origin: Only send the origin of the document as the referrer when the protocol security level stays the same (e.g. HTTPS→HTTPS), but don\'t send it to a less secure destination (e.g. HTTPS→HTTP).\n\nstrict-origin-when-cross-origin: Send a full URL when performing a same-origin request, but only send the origin when the protocol security level stays the same (e.g.HTTPS→HTTPS), and send no header to a less secure destination (e.g. HTTPS→HTTP).\n\nunsafe-url: The referrer will include the origin and the path (but not the fragment, password, or username). This value is unsafe, because it leaks origins and paths from TLS-protected resources to insecure origins.\n\nNote: An empty string value ("") is both the default value, and a fallback value if referrerpolicy is not supported. If referrerpolicy is not explicitly specified on the &lt;script> element, it will adopt a higher-level referrer policy, i.e. one set on the whole document or domain. If a higher-level policy is not available, the empty string is treated as being equivalent to no-referrer-when-downgrade.\n',
            },
            {
              name: "text",
              description:
                "Like the textContent attribute, this attribute sets the text content of the element. Unlike the textContent attribute, however, this attribute is evaluated as executable code after the node is inserted into the DOM.\n",
            },
          ],
        },
        {
          name: "noscript",
          description:
            "The noscript element represents nothing if scripting is enabled, and represents its children if scripting is disabled. It is used to present different markup to user agents that support scripting and those that don't support scripting, by affecting how the document is parsed.",
          attributes: [],
        },
        {
          name: "template",
          description:
            "The template element is used to declare fragments of HTML that can be cloned and inserted in the document by script.",
          attributes: [],
        },
        {
          name: "canvas",
          description:
            "The canvas element provides scripts with a resolution-dependent bitmap canvas, which can be used for rendering graphs, game graphics, art, or other visual images on the fly.",
          attributes: [
            {
              name: "width",
              description:
                "The width of the coordinate space in CSS pixels. Defaults to 300.",
            },
            {
              name: "height",
              description:
                "The height of the coordinate space in CSS pixels. Defaults to 150.",
            },
            {
              name: "moz-opaque",
              description:
                "Lets the canvas know whether or not translucency will be a factor. If the canvas knows there's no translucency, painting performance can be optimized. This is only supported by Mozilla-based browsers; use the standardized [`canvas.getContext('2d', { alpha: false })`](/en-US/docs/Web/API/HTMLCanvasElement/getContext \"The HTMLCanvasElement.getContext() method returns a drawing context on the canvas, or null if the context identifier is not supported.\") instead.",
            },
          ],
        },
      ]);
  }),
  (function (e) {
    if ("object" == typeof module && "object" == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      "function" == typeof define &&
        define.amd &&
        define(
          "vscode-html-languageservice/languageFacts/data/html5Events",
          ["require", "exports"],
          e
        );
  })(function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.HTML5_EVENTS = [
        {
          name: "onabort",
          description: "The loading of a resource has been aborted.",
        },
        {
          name: "onblur",
          description: "An element has lost focus (does not bubble).",
        },
        {
          name: "oncanplay",
          description:
            "The user agent can play the media, but estimates that not enough data has been loaded to play the media up to its end without having to stop for further buffering of content.",
        },
        {
          name: "oncanplaythrough",
          description:
            "The user agent can play the media up to its end without having to stop for further buffering of content.",
        },
        {
          name: "onchange",
          description:
            "The change event is fired for <input>, <select>, and <textarea> elements when a change to the element's value is committed by the user.",
        },
        {
          name: "onclick",
          description:
            "A pointing device button has been pressed and released on an element.",
        },
        {
          name: "oncontextmenu",
          description:
            "The right button of the mouse is clicked (before the context menu is displayed).",
        },
        {
          name: "ondblclick",
          description:
            "A pointing device button is clicked twice on an element.",
        },
        {
          name: "ondrag",
          description:
            "An element or text selection is being dragged (every 350ms).",
        },
        {
          name: "ondragend",
          description:
            "A drag operation is being ended (by releasing a mouse button or hitting the escape key).",
        },
        {
          name: "ondragenter",
          description:
            "A dragged element or text selection enters a valid drop target.",
        },
        {
          name: "ondragleave",
          description:
            "A dragged element or text selection leaves a valid drop target.",
        },
        {
          name: "ondragover",
          description:
            "An element or text selection is being dragged over a valid drop target (every 350ms).",
        },
        {
          name: "ondragstart",
          description: "The user starts dragging an element or text selection.",
        },
        {
          name: "ondrop",
          description: "An element is dropped on a valid drop target.",
        },
        {
          name: "ondurationchange",
          description: "The duration attribute has been updated.",
        },
        {
          name: "onemptied",
          description:
            "The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the load() method is called to reload it.",
        },
        {
          name: "onended",
          description:
            "Playback has stopped because the end of the media was reached.",
        },
        { name: "onerror", description: "A resource failed to load." },
        {
          name: "onfocus",
          description: "An element has received focus (does not bubble).",
        },
        { name: "onformchange" },
        { name: "onforminput" },
        {
          name: "oninput",
          description:
            "The value of an element changes or the content of an element with the attribute contenteditable is modified.",
        },
        {
          name: "oninvalid",
          description:
            "A submittable element has been checked and doesn't satisfy its constraints.",
        },
        { name: "onkeydown", description: "A key is pressed down." },
        {
          name: "onkeypress",
          description:
            "A key is pressed down and that key normally produces a character value (use input instead).",
        },
        { name: "onkeyup", description: "A key is released." },
        {
          name: "onload",
          description:
            "A resource and its dependent resources have finished loading.",
        },
        {
          name: "onloadeddata",
          description: "The first frame of the media has finished loading.",
        },
        {
          name: "onloadedmetadata",
          description: "The metadata has been loaded.",
        },
        { name: "onloadstart", description: "Progress has begun." },
        {
          name: "onmousedown",
          description:
            "A pointing device button (usually a mouse) is pressed on an element.",
        },
        {
          name: "onmousemove",
          description: "A pointing device is moved over an element.",
        },
        {
          name: "onmouseout",
          description:
            "A pointing device is moved off the element that has the listener attached or off one of its children.",
        },
        {
          name: "onmouseover",
          description:
            "A pointing device is moved onto the element that has the listener attached or onto one of its children.",
        },
        {
          name: "onmouseup",
          description: "A pointing device button is released over an element.",
        },
        { name: "onmousewheel" },
        { name: "onpause", description: "Playback has been paused." },
        { name: "onplay", description: "Playback has begun." },
        {
          name: "onplaying",
          description:
            "Playback is ready to start after having been paused or delayed due to lack of data.",
        },
        { name: "onprogress", description: "In progress." },
        { name: "onratechange", description: "The playback rate has changed." },
        { name: "onreset", description: "A form is reset." },
        {
          name: "onresize",
          description: "The document view has been resized.",
        },
        {
          name: "onreadystatechange",
          description: "The readyState attribute of a document has changed.",
        },
        {
          name: "onscroll",
          description: "The document view or an element has been scrolled.",
        },
        { name: "onseeked", description: "A seek operation completed." },
        { name: "onseeking", description: "A seek operation began." },
        { name: "onselect", description: "Some text is being selected." },
        {
          name: "onshow",
          description:
            "A contextmenu event was fired on/bubbled to an element that has a contextmenu attribute",
        },
        {
          name: "onstalled",
          description:
            "The user agent is trying to fetch media data, but data is unexpectedly not forthcoming.",
        },
        { name: "onsubmit", description: "A form is submitted." },
        {
          name: "onsuspend",
          description: "Media data loading has been suspended.",
        },
        {
          name: "ontimeupdate",
          description:
            "The time indicated by the currentTime attribute has been updated.",
        },
        { name: "onvolumechange", description: "The volume has changed." },
        {
          name: "onwaiting",
          description:
            "Playback has stopped because of a temporary lack of data.",
        },
      ]);
  }),
  (function (e) {
    if ("object" == typeof module && "object" == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      "function" == typeof define &&
        define.amd &&
        define(
          "vscode-html-languageservice/languageFacts/data/html5Aria",
          ["require", "exports"],
          e
        );
  })(function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.ARIA_ATTRIBUTES = [
        {
          name: "aria-activedescendant",
          description:
            "Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.\n",
        },
        {
          name: "aria-atomic",
          valueSet: "b",
          description:
            "Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.\n",
        },
        {
          name: "aria-autocomplete",
          valueSet: "autocomplete",
          description:
            "Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be presented if they are made.\n",
        },
        {
          name: "aria-busy",
          valueSet: "b",
          description:
            "Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user.\n",
        },
        {
          name: "aria-checked",
          valueSet: "tristate",
          description:
            'Indicates the current "checked" state of checkboxes, radio buttons, and other widgets. See related aria-pressed and aria-selected.\n',
        },
        {
          name: "aria-colcount",
          description:
            "Defines the total number of columns in a table, grid, or treegrid. See related aria-colindex.\n",
        },
        {
          name: "aria-colindex",
          description:
            "Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid. See related aria-colcount and aria-colspan.\n",
        },
        {
          name: "aria-colspan",
          description:
            "Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid. See related aria-colindex and aria-rowspan.\n",
        },
        {
          name: "aria-controls",
          description:
            "Identifies the element (or elements) whose contents or presence are controlled by the current element. See related aria-owns.\n",
        },
        {
          name: "aria-current",
          valueSet: "current",
          description:
            "Indicates the element that represents the current item within a container or set of related elements.\n",
        },
        { name: "aria-describedat" },
        {
          name: "aria-describedby",
          description:
            "Identifies the element (or elements) that describes the object. See related aria-labelledby.\n",
        },
        {
          name: "aria-disabled",
          valueSet: "b",
          description:
            "Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable. See related aria-hidden and aria-readonly.\n",
        },
        {
          name: "aria-dropeffect",
          valueSet: "dropeffect",
          description:
            "\\[Deprecated in ARIA 1.1] Indicates what functions can be performed when a dragged object is released on the drop target.\n",
        },
        {
          name: "aria-errormessage",
          description:
            "Identifies the element that provides an error message for the object. See related aria-invalid and aria-describedby.\n",
        },
        {
          name: "aria-expanded",
          valueSet: "u",
          description:
            "Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.\n",
        },
        {
          name: "aria-flowto",
          description:
            "Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion, allows assistive technology to override the general default of reading in document source order.\n",
        },
        {
          name: "aria-grabbed",
          valueSet: "u",
          description:
            '\\[Deprecated in ARIA 1.1] Indicates an element\'s "grabbed" state in a drag-and-drop operation.\n',
        },
        {
          name: "aria-haspopup",
          valueSet: "b",
          description:
            "Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.\n",
        },
        {
          name: "aria-hidden",
          valueSet: "b",
          description:
            "Indicates whether the element is exposed to an accessibility API. See related aria-disabled.\n",
        },
        {
          name: "aria-invalid",
          valueSet: "invalid",
          description:
            "Indicates the entered value does not conform to the format expected by the application. See related aria-errormessage.\n",
        },
        { name: "aria-kbdshortcuts" },
        {
          name: "aria-label",
          description:
            "Defines a string value that labels the current element. See related aria-labelledby.\n",
        },
        {
          name: "aria-labelledby",
          description:
            "Identifies the element (or elements) that labels the current element. See related aria-describedby.\n",
        },
        {
          name: "aria-level",
          description:
            "Defines the hierarchical level of an element within a structure.\n",
        },
        {
          name: "aria-live",
          valueSet: "live",
          description:
            "Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.\n",
        },
        {
          name: "aria-modal",
          valueSet: "b",
          description:
            "Indicates whether an element is modal when displayed.\n",
        },
        {
          name: "aria-multiline",
          valueSet: "b",
          description:
            "Indicates whether a text box accepts multiple lines of input or only a single line.\n",
        },
        {
          name: "aria-multiselectable",
          valueSet: "b",
          description:
            "Indicates that the user may select more than one item from the current selectable descendants.\n",
        },
        {
          name: "aria-orientation",
          valueSet: "orientation",
          description:
            "Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.\n",
        },
        {
          name: "aria-owns",
          description:
            "Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship between DOM elements where the DOM hierarchy cannot be used to represent the relationship. See related aria-controls.\n",
        },
        {
          name: "aria-placeholder",
          description:
            "Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value. A hint could be a sample value or a brief description of the expected format.\n",
        },
        {
          name: "aria-posinset",
          description:
            "Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. See related aria-setsize.\n",
        },
        {
          name: "aria-pressed",
          valueSet: "tristate",
          description:
            'Indicates the current "pressed" state of toggle buttons. See related aria-checked and aria-selected.\n',
        },
        {
          name: "aria-readonly",
          valueSet: "b",
          description:
            "Indicates that the element is not editable, but is otherwise operable. See related aria-disabled.\n",
        },
        {
          name: "aria-relevant",
          valueSet: "relevant",
          description:
            "Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified. See related aria-atomic.\n",
        },
        {
          name: "aria-required",
          valueSet: "b",
          description:
            "Indicates that user input is required on the element before a form may be submitted.\n",
        },
        {
          name: "aria-roledescription",
          description:
            "Defines a human-readable, author-localized description for the role of an element.\n",
        },
        {
          name: "aria-rowcount",
          description:
            "Defines the total number of rows in a table, grid, or treegrid. See related aria-rowindex.\n",
        },
        {
          name: "aria-rowindex",
          description:
            "Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid. See related aria-rowcount and aria-rowspan.\n",
        },
        {
          name: "aria-rowspan",
          description:
            "Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid. See related aria-rowindex and aria-colspan.\n",
        },
        {
          name: "aria-selected",
          valueSet: "u",
          description:
            'Indicates the current "selected" state of various widgets. See related aria-checked and aria-pressed.\n',
        },
        {
          name: "aria-setsize",
          description:
            "Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. See related aria-posinset.\n",
        },
        {
          name: "aria-sort",
          valueSet: "sort",
          description:
            "Indicates if items in a table or grid are sorted in ascending or descending order.\n",
        },
        {
          name: "aria-valuemax",
          description:
            "Defines the maximum allowed value for a range widget.\n",
        },
        {
          name: "aria-valuemin",
          description:
            "Defines the minimum allowed value for a range widget.\n",
        },
        {
          name: "aria-valuenow",
          description:
            "Defines the current value for a range widget. See related aria-valuetext.\n",
        },
        {
          name: "aria-valuetext",
          description:
            "Defines the human readable text alternative of aria-valuenow for a range widget.\n",
        },
        {
          name: "aria-details",
          description:
            "Identifies the element that provides a detailed, extended description for the object. See related aria-describedby.\n",
        },
        {
          name: "aria-keyshortcuts",
          description:
            "Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.\n",
        },
      ]);
  }),
  (function (e) {
    if ("object" == typeof module && "object" == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      "function" == typeof define &&
        define.amd &&
        define(
          "vscode-html-languageservice/languageFacts/data/html5",
          [
            "require",
            "exports",
            "../dataProvider",
            "./html5Tags",
            "./html5Events",
            "./html5Aria",
          ],
          e
        );
  })(function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var n = e("../dataProvider"),
      i = e("./html5Tags"),
      r = e("./html5Events"),
      a = e("./html5Aria");
    (t.getHTML5DataProvider = function () {
      return new n.HTMLDataProvider("html5", {
        version: 1,
        tags: i.HTML5_TAGS,
        globalAttributes: t.HTML5_GLOBAL_ATTRIBUTES.concat(r.HTML5_EVENTS),
        valueSets: t.HTML5_VALUE_MAP,
      });
    }),
      (t.HTML5_GLOBAL_ATTRIBUTES = a.ARIA_ATTRIBUTES.concat([
        { name: "accesskey" },
        { name: "class" },
        { name: "contenteditable", valueSet: "b" },
        { name: "contextmenu" },
        { name: "dir", valueSet: "d" },
        { name: "draggable", valueSet: "b" },
        { name: "dropzone" },
        { name: "hidden", valueSet: "v" },
        { name: "id" },
        { name: "itemid" },
        { name: "itemprop" },
        { name: "itemref" },
        { name: "itemscope", valueSet: "v" },
        { name: "itemtype" },
        { name: "lang" },
        { name: "role", valueSet: "roles" },
        { name: "spellcheck", valueSet: "b" },
        { name: "style" },
        { name: "tabindex" },
        { name: "title" },
        { name: "translate", valueSet: "y" },
      ])),
      (t.HTML5_VALUE_MAP = [
        { name: "b", values: [{ name: "true" }, { name: "false" }] },
        {
          name: "u",
          values: [{ name: "true" }, { name: "false" }, { name: "undefined" }],
        },
        { name: "o", values: [{ name: "on" }, { name: "off" }] },
        { name: "y", values: [{ name: "yes" }, { name: "no" }] },
        { name: "w", values: [{ name: "soft" }, { name: "hard" }] },
        {
          name: "d",
          values: [{ name: "ltr" }, { name: "rtl" }, { name: "auto" }],
        },
        {
          name: "m",
          values: [{ name: "GET" }, { name: "POST" }, { name: "dialog" }],
        },
        { name: "fm", values: [{ name: "GET" }, { name: "POST" }] },
        {
          name: "s",
          values: [
            { name: "row" },
            { name: "col" },
            { name: "rowgroup" },
            { name: "colgroup" },
          ],
        },
        {
          name: "t",
          values: [
            { name: "hidden" },
            { name: "text" },
            { name: "search" },
            { name: "tel" },
            { name: "url" },
            { name: "email" },
            { name: "password" },
            { name: "datetime" },
            { name: "date" },
            { name: "month" },
            { name: "week" },
            { name: "time" },
            { name: "datetime-local" },
            { name: "number" },
            { name: "range" },
            { name: "color" },
            { name: "checkbox" },
            { name: "radio" },
            { name: "file" },
            { name: "submit" },
            { name: "image" },
            { name: "reset" },
            { name: "button" },
          ],
        },
        {
          name: "im",
          values: [
            { name: "verbatim" },
            { name: "latin" },
            { name: "latin-name" },
            { name: "latin-prose" },
            { name: "full-width-latin" },
            { name: "kana" },
            { name: "kana-name" },
            { name: "katakana" },
            { name: "numeric" },
            { name: "tel" },
            { name: "email" },
            { name: "url" },
          ],
        },
        {
          name: "bt",
          values: [
            { name: "button" },
            { name: "submit" },
            { name: "reset" },
            { name: "menu" },
          ],
        },
        {
          name: "lt",
          values: [
            { name: "1" },
            { name: "a" },
            { name: "A" },
            { name: "i" },
            { name: "I" },
          ],
        },
        { name: "mt", values: [{ name: "context" }, { name: "toolbar" }] },
        {
          name: "mit",
          values: [
            { name: "command" },
            { name: "checkbox" },
            { name: "radio" },
          ],
        },
        {
          name: "et",
          values: [
            { name: "application/x-www-form-urlencoded" },
            { name: "multipart/form-data" },
            { name: "text/plain" },
          ],
        },
        {
          name: "tk",
          values: [
            { name: "subtitles" },
            { name: "captions" },
            { name: "descriptions" },
            { name: "chapters" },
            { name: "metadata" },
          ],
        },
        {
          name: "pl",
          values: [{ name: "none" }, { name: "metadata" }, { name: "auto" }],
        },
        {
          name: "sh",
          values: [
            { name: "circle" },
            { name: "default" },
            { name: "poly" },
            { name: "rect" },
          ],
        },
        {
          name: "xo",
          values: [{ name: "anonymous" }, { name: "use-credentials" }],
        },
        {
          name: "sb",
          values: [
            { name: "allow-forms" },
            { name: "allow-modals" },
            { name: "allow-pointer-lock" },
            { name: "allow-popups" },
            { name: "allow-popups-to-escape-sandbox" },
            { name: "allow-same-origin" },
            { name: "allow-scripts" },
            { name: "allow-top-navigation" },
          ],
        },
        {
          name: "tristate",
          values: [
            { name: "true" },
            { name: "false" },
            { name: "mixed" },
            { name: "undefined" },
          ],
        },
        {
          name: "inputautocomplete",
          values: [
            { name: "additional-name" },
            { name: "address-level1" },
            { name: "address-level2" },
            { name: "address-level3" },
            { name: "address-level4" },
            { name: "address-line1" },
            { name: "address-line2" },
            { name: "address-line3" },
            { name: "bday" },
            { name: "bday-year" },
            { name: "bday-day" },
            { name: "bday-month" },
            { name: "billing" },
            { name: "cc-additional-name" },
            { name: "cc-csc" },
            { name: "cc-exp" },
            { name: "cc-exp-month" },
            { name: "cc-exp-year" },
            { name: "cc-family-name" },
            { name: "cc-given-name" },
            { name: "cc-name" },
            { name: "cc-number" },
            { name: "cc-type" },
            { name: "country" },
            { name: "country-name" },
            { name: "current-password" },
            { name: "email" },
            { name: "family-name" },
            { name: "fax" },
            { name: "given-name" },
            { name: "home" },
            { name: "honorific-prefix" },
            { name: "honorific-suffix" },
            { name: "impp" },
            { name: "language" },
            { name: "mobile" },
            { name: "name" },
            { name: "new-password" },
            { name: "nickname" },
            { name: "organization" },
            { name: "organization-title" },
            { name: "pager" },
            { name: "photo" },
            { name: "postal-code" },
            { name: "sex" },
            { name: "shipping" },
            { name: "street-address" },
            { name: "tel-area-code" },
            { name: "tel" },
            { name: "tel-country-code" },
            { name: "tel-extension" },
            { name: "tel-local" },
            { name: "tel-local-prefix" },
            { name: "tel-local-suffix" },
            { name: "tel-national" },
            { name: "transaction-amount" },
            { name: "transaction-currency" },
            { name: "url" },
            { name: "username" },
            { name: "work" },
          ],
        },
        {
          name: "autocomplete",
          values: [
            { name: "inline" },
            { name: "list" },
            { name: "both" },
            { name: "none" },
          ],
        },
        {
          name: "current",
          values: [
            { name: "page" },
            { name: "step" },
            { name: "location" },
            { name: "date" },
            { name: "time" },
            { name: "true" },
            { name: "false" },
          ],
        },
        {
          name: "dropeffect",
          values: [
            { name: "copy" },
            { name: "move" },
            { name: "link" },
            { name: "execute" },
            { name: "popup" },
            { name: "none" },
          ],
        },
        {
          name: "invalid",
          values: [
            { name: "grammar" },
            { name: "false" },
            { name: "spelling" },
            { name: "true" },
          ],
        },
        {
          name: "live",
          values: [{ name: "off" }, { name: "polite" }, { name: "assertive" }],
        },
        {
          name: "orientation",
          values: [
            { name: "vertical" },
            { name: "horizontal" },
            { name: "undefined" },
          ],
        },
        {
          name: "relevant",
          values: [
            { name: "additions" },
            { name: "removals" },
            { name: "text" },
            { name: "all" },
            { name: "additions text" },
          ],
        },
        {
          name: "sort",
          values: [
            { name: "ascending" },
            { name: "descending" },
            { name: "none" },
            { name: "other" },
          ],
        },
        {
          name: "roles",
          values: [
            { name: "alert" },
            { name: "alertdialog" },
            { name: "button" },
            { name: "checkbox" },
            { name: "dialog" },
            { name: "gridcell" },
            { name: "link" },
            { name: "log" },
            { name: "marquee" },
            { name: "menuitem" },
            { name: "menuitemcheckbox" },
            { name: "menuitemradio" },
            { name: "option" },
            { name: "progressbar" },
            { name: "radio" },
            { name: "scrollbar" },
            { name: "searchbox" },
            { name: "slider" },
            { name: "spinbutton" },
            { name: "status" },
            { name: "switch" },
            { name: "tab" },
            { name: "tabpanel" },
            { name: "textbox" },
            { name: "timer" },
            { name: "tooltip" },
            { name: "treeitem" },
            { name: "combobox" },
            { name: "grid" },
            { name: "listbox" },
            { name: "menu" },
            { name: "menubar" },
            { name: "radiogroup" },
            { name: "tablist" },
            { name: "tree" },
            { name: "treegrid" },
            { name: "application" },
            { name: "article" },
            { name: "cell" },
            { name: "columnheader" },
            { name: "definition" },
            { name: "directory" },
            { name: "document" },
            { name: "feed" },
            { name: "figure" },
            { name: "group" },
            { name: "heading" },
            { name: "img" },
            { name: "list" },
            { name: "listitem" },
            { name: "math" },
            { name: "none" },
            { name: "note" },
            { name: "presentation" },
            { name: "region" },
            { name: "row" },
            { name: "rowgroup" },
            { name: "rowheader" },
            { name: "separator" },
            { name: "table" },
            { name: "term" },
            { name: "text" },
            { name: "toolbar" },
            { name: "banner" },
            { name: "complementary" },
            { name: "contentinfo" },
            { name: "form" },
            { name: "main" },
            { name: "navigation" },
            { name: "region" },
            { name: "search" },
            { name: "doc-abstract" },
            { name: "doc-acknowledgments" },
            { name: "doc-afterword" },
            { name: "doc-appendix" },
            { name: "doc-backlink" },
            { name: "doc-biblioentry" },
            { name: "doc-bibliography" },
            { name: "doc-biblioref" },
            { name: "doc-chapter" },
            { name: "doc-colophon" },
            { name: "doc-conclusion" },
            { name: "doc-cover" },
            { name: "doc-credit" },
            { name: "doc-credits" },
            { name: "doc-dedication" },
            { name: "doc-endnote" },
            { name: "doc-endnotes" },
            { name: "doc-epigraph" },
            { name: "doc-epilogue" },
            { name: "doc-errata" },
            { name: "doc-example" },
            { name: "doc-footnote" },
            { name: "doc-foreword" },
            { name: "doc-glossary" },
            { name: "doc-glossref" },
            { name: "doc-index" },
            { name: "doc-introduction" },
            { name: "doc-noteref" },
            { name: "doc-notice" },
            { name: "doc-pagebreak" },
            { name: "doc-pagelist" },
            { name: "doc-part" },
            { name: "doc-preface" },
            { name: "doc-prologue" },
            { name: "doc-pullquote" },
            { name: "doc-qna" },
            { name: "doc-subtitle" },
            { name: "doc-tip" },
            { name: "doc-toc" },
          ],
        },
        {
          name: "metanames",
          values: [
            { name: "application-name" },
            { name: "author" },
            { name: "description" },
            { name: "format-detection" },
            { name: "generator" },
            { name: "keywords" },
            { name: "publisher" },
            { name: "referrer" },
            { name: "robots" },
            { name: "theme-color" },
            { name: "viewport" },
          ],
        },
      ]);
  }),
  (function (e) {
    if ("object" == typeof module && "object" == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      "function" == typeof define &&
        define.amd &&
        define(
          "vscode-html-languageservice/languageFacts/builtinDataProviders",
          ["require", "exports", "./data/html5"],
          e
        );
  })(function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var n = e("./data/html5");
    t.builtinDataProviders = [n.getHTML5DataProvider()];
    var i = [];
    (t.getAllDataProviders = function () {
      return t.builtinDataProviders.concat(i);
    }),
      (t.handleCustomDataProviders = function (e) {
        e.forEach(function (e) {
          i.push(e);
        });
      });
  }),
  (function (e) {
    if ("object" == typeof module && "object" == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      "function" == typeof define &&
        define.amd &&
        define(
          "vscode-html-languageservice/services/htmlCompletion",
          [
            "require",
            "exports",
            "vscode-languageserver-types",
            "../parser/htmlScanner",
            "../htmlLanguageTypes",
            "../parser/htmlEntities",
            "vscode-nls",
            "../utils/strings",
            "../languageFacts/builtinDataProviders",
            "../languageFacts/fact",
          ],
          e
        );
  })(function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var A = e("vscode-languageserver-types"),
      I = e("../parser/htmlScanner"),
      U = e("../htmlLanguageTypes"),
      M = e("../parser/htmlEntities"),
      n = e("vscode-nls"),
      H = e("../utils/strings"),
      q = e("../languageFacts/builtinDataProviders"),
      O = e("../languageFacts/fact"),
      D = n.loadMessageBundle(),
      i = (function () {
        function e() {
          this.completionParticipants = [];
        }
        return (
          (e.prototype.setCompletionParticipants = function (e) {
            this.completionParticipants = e || [];
          }),
          (e.prototype.doComplete = function (g, _, s, i) {
            var b = { isIncomplete: !1, items: [] },
              v = this.completionParticipants,
              y = q.getAllDataProviders().filter(function (e) {
                return (
                  e.isApplicable(g.languageId) && (!i || !1 !== i[e.getId()])
                );
              }),
              w = g.getText(),
              T = g.offsetAt(_),
              d = s.findNodeBefore(T);
            if (!d) return b;
            var S,
              t = I.createScanner(w, d.start),
              x = "";
            function k(e, t) {
              return (
                void 0 === t && (t = T),
                T < e && (e = T),
                { start: g.positionAt(e), end: g.positionAt(t) }
              );
            }
            function n(e, t) {
              var n = k(e, t);
              return (
                y.forEach(function (e) {
                  e.provideTags().forEach(function (e) {
                    b.items.push({
                      label: e.name,
                      kind: A.CompletionItemKind.Property,
                      documentation: e.description,
                      textEdit: A.TextEdit.replace(n, e.name),
                      insertTextFormat: A.InsertTextFormat.PlainText,
                    });
                  });
                }),
                b
              );
            }
            function u(e) {
              for (var t = e; 0 < t; ) {
                var n = w.charAt(t - 1);
                if (0 <= "\n\r".indexOf(n)) return w.substring(t, e);
                if (!P(n)) return null;
                t--;
              }
              return w.substring(0, e);
            }
            function r(e, t, n) {
              void 0 === n && (n = T);
              var i = k(e, n),
                r = R(
                  w,
                  n,
                  U.ScannerState.WithinEndTag,
                  U.TokenType.EndTagClose
                )
                  ? ""
                  : ">",
                a = d;
              for (t && (a = a.parent); a; ) {
                var o = a.tag;
                if (o && (!a.closed || (a.endTagStart && a.endTagStart > T))) {
                  var s = {
                      label: "/" + o,
                      kind: A.CompletionItemKind.Property,
                      filterText: "/" + o + r,
                      textEdit: A.TextEdit.replace(i, "/" + o + r),
                      insertTextFormat: A.InsertTextFormat.PlainText,
                    },
                    l = u(a.start),
                    c = u(e - 1);
                  if (null !== l && null !== c && l !== c) {
                    var h = l + "</" + o + r;
                    (s.textEdit = A.TextEdit.replace(k(e - 1 - c.length), h)),
                      (s.filterText = c + "</" + o + r);
                  }
                  return b.items.push(s), b;
                }
                a = a.parent;
              }
              return (
                t ||
                  y.forEach(function (e) {
                    e.provideTags().forEach(function (e) {
                      b.items.push({
                        label: "/" + e.name,
                        kind: A.CompletionItemKind.Property,
                        documentation: e.description,
                        filterText: "/" + e + r,
                        textEdit: A.TextEdit.replace(i, "/" + e + r),
                        insertTextFormat: A.InsertTextFormat.PlainText,
                      });
                    });
                  }),
                b
              );
            }
            function e(e, t) {
              if (i && i.hideAutoCompleteProposals) return b;
              if (!O.isVoidElement(t)) {
                var n = g.positionAt(e);
                b.items.push({
                  label: "</" + t + ">",
                  kind: A.CompletionItemKind.Property,
                  filterText: "</" + t + ">",
                  textEdit: A.TextEdit.insert(n, "$0</" + t + ">"),
                  insertTextFormat: A.InsertTextFormat.Snippet,
                });
              }
              return b;
            }
            function a(e, t) {
              return n(e, t), r(e, !0, t), b;
            }
            function o(e, t) {
              void 0 === t && (t = T);
              for (var n = T; n < t && "<" !== w[n]; ) n++;
              var i = k(e, n),
                r = R(
                  w,
                  t,
                  U.ScannerState.AfterAttributeName,
                  U.TokenType.DelimiterAssign
                )
                  ? ""
                  : '="$1"',
                a = x.toLowerCase(),
                o = Object.create(null);
              return (
                y.forEach(function (e) {
                  e.provideAttributes(a).forEach(function (e) {
                    if (!o[e.name]) {
                      o[e.name] = !0;
                      var t,
                        n = e.name;
                      "v" !== e.valueSet &&
                        r.length &&
                        ((n += r),
                        e.valueSet &&
                          (t = {
                            title: "Suggest",
                            command: "editor.action.triggerSuggest",
                          })),
                        b.items.push({
                          label: e.name,
                          kind:
                            "handler" === e.valueSet
                              ? A.CompletionItemKind.Function
                              : A.CompletionItemKind.Value,
                          documentation: e.description,
                          textEdit: A.TextEdit.replace(i, n),
                          insertTextFormat: A.InsertTextFormat.Snippet,
                          command: t,
                        });
                    }
                  });
                }),
                (function (t, n) {
                  var i = "data-",
                    r = {};
                  (r[i] = i + '$1="$2"'),
                    s &&
                      s.roots.forEach(function (e) {
                        return (function t(e) {
                          e.attributeNames.forEach(function (e) {
                            !H.startsWith(e, i) ||
                              r[e] ||
                              n[e] ||
                              (r[e] = e + '="$1"');
                          });
                          e.children.forEach(function (e) {
                            return t(e);
                          });
                        })(e);
                      });
                  Object.keys(r).forEach(function (e) {
                    return b.items.push({
                      label: e,
                      kind: A.CompletionItemKind.Value,
                      textEdit: A.TextEdit.replace(t, r[e]),
                      insertTextFormat: A.InsertTextFormat.Snippet,
                    });
                  });
                })(i, o),
                b
              );
            }
            function l(e, t) {
              var n, i, r, a;
              if (
                (void 0 === t && (t = T),
                e < T && T <= t && ((a = w[e]), /^["']*$/.test(a)))
              ) {
                var o = e + 1,
                  s = t;
                e < t && w[t - 1] === w[e] && s--;
                var l = (function (e, t, n) {
                    for (; n < t && !P(e[t - 1]); ) t--;
                    return t;
                  })(w, T, o),
                  c = (function (e, t, n) {
                    for (; t < n && !P(e[t]); ) t++;
                    return t;
                  })(w, T, s);
                (n = k(l, c)),
                  (r = o <= T && T <= s ? w.substring(o, T) : ""),
                  (i = !1);
              } else (n = k(e, t)), (r = w.substring(e, T)), (i = !0);
              var h = x.toLowerCase(),
                d = S.toLowerCase();
              if (0 < v.length)
                for (var u = k(e, t), p = 0, m = v; p < m.length; p++) {
                  var f = m[p];
                  f.onHtmlAttributeValue &&
                    f.onHtmlAttributeValue({
                      document: g,
                      position: _,
                      tag: h,
                      attribute: d,
                      value: r,
                      range: u,
                    });
                }
              return (
                y.forEach(function (e) {
                  e.provideValues(h, d).forEach(function (e) {
                    var t = i ? '"' + e.name + '"' : e.name;
                    b.items.push({
                      label: e.name,
                      filterText: t,
                      kind: A.CompletionItemKind.Unit,
                      textEdit: A.TextEdit.replace(n, t),
                      insertTextFormat: A.InsertTextFormat.PlainText,
                    });
                  });
                }),
                E(),
                b
              );
            }
            function c(e) {
              return T === t.getTokenEnd() &&
                (m = t.scan()) === e &&
                t.getTokenOffset() === T
                ? t.getTokenEnd()
                : T;
            }
            function h() {
              for (var e = 0, t = v; e < t.length; e++) {
                var n = t[e];
                n.onHtmlContent &&
                  n.onHtmlContent({ document: g, position: _ });
              }
              return E();
            }
            function E() {
              for (
                var e = T - 1, t = _.character;
                0 <= e && H.isLetterOrDigit(w, e);

              )
                e--, t--;
              if (0 <= e && "&" === w[e]) {
                var n = A.Range.create(A.Position.create(_.line, t - 1), _);
                for (var i in M.entities)
                  if (H.endsWith(i, ";")) {
                    var r = "&" + i;
                    b.items.push({
                      label: r,
                      kind: A.CompletionItemKind.Keyword,
                      documentation: D(
                        "entity.propose",
                        "Character entity representing '" + M.entities[i] + "'"
                      ),
                      textEdit: A.TextEdit.replace(n, r),
                      insertTextFormat: A.InsertTextFormat.PlainText,
                    });
                  }
              }
              return b;
            }
            for (
              var p, m = t.scan();
              m !== U.TokenType.EOS && t.getTokenOffset() <= T;

            ) {
              switch (m) {
                case U.TokenType.StartTagOpen:
                  if (t.getTokenEnd() !== T) break;
                  var f = c(U.TokenType.StartTag);
                  return (
                    0 === _.line &&
                      (void 0,
                      (p = k(T, f)),
                      b.items.push({
                        label: "!DOCTYPE",
                        kind: A.CompletionItemKind.Property,
                        documentation: "A preamble for an HTML document.",
                        textEdit: A.TextEdit.replace(p, "!DOCTYPE html>"),
                        insertTextFormat: A.InsertTextFormat.PlainText,
                      })),
                    a(T, f)
                  );
                case U.TokenType.StartTag:
                  if (t.getTokenOffset() <= T && T <= t.getTokenEnd())
                    return n(t.getTokenOffset(), t.getTokenEnd());
                  x = t.getTokenText();
                  break;
                case U.TokenType.AttributeName:
                  if (t.getTokenOffset() <= T && T <= t.getTokenEnd())
                    return o(t.getTokenOffset(), t.getTokenEnd());
                  S = t.getTokenText();
                  break;
                case U.TokenType.DelimiterAssign:
                  if (t.getTokenEnd() !== T) break;
                  f = c(U.TokenType.AttributeValue);
                  return l(T, f);
                case U.TokenType.AttributeValue:
                  if (t.getTokenOffset() <= T && T <= t.getTokenEnd())
                    return l(t.getTokenOffset(), t.getTokenEnd());
                  break;
                case U.TokenType.Whitespace:
                  if (T <= t.getTokenEnd())
                    switch (t.getScannerState()) {
                      case U.ScannerState.AfterOpeningStartTag:
                        return a(t.getTokenOffset(), c(U.TokenType.StartTag));
                      case U.ScannerState.WithinTag:
                      case U.ScannerState.AfterAttributeName:
                        return o(t.getTokenEnd());
                      case U.ScannerState.BeforeAttributeValue:
                        return l(t.getTokenEnd());
                      case U.ScannerState.AfterOpeningEndTag:
                        return r(t.getTokenOffset() - 1, !1);
                      case U.ScannerState.WithinContent:
                        return h();
                    }
                  break;
                case U.TokenType.EndTagOpen:
                  if (T <= t.getTokenEnd())
                    return r(t.getTokenOffset() + 1, !1, c(U.TokenType.EndTag));
                  break;
                case U.TokenType.EndTag:
                  if (T <= t.getTokenEnd())
                    for (var L = t.getTokenOffset() - 1; 0 <= L; ) {
                      var C = w.charAt(L);
                      if ("/" === C) return r(L, !1, t.getTokenEnd());
                      if (!P(C)) break;
                      L--;
                    }
                  break;
                case U.TokenType.StartTagClose:
                  if (T <= t.getTokenEnd() && x) return e(t.getTokenEnd(), x);
                  break;
                case U.TokenType.Content:
                  if (T <= t.getTokenEnd()) return h();
                  break;
                default:
                  if (T <= t.getTokenEnd()) return b;
              }
              m = t.scan();
            }
            return b;
          }),
          (e.prototype.doTagComplete = function (e, t, n) {
            var i = e.offsetAt(t);
            if (i <= 0) return null;
            var r = e.getText().charAt(i - 1);
            if (">" === r) {
              if (
                (o = n.findNodeBefore(i)) &&
                o.tag &&
                !O.isVoidElement(o.tag) &&
                o.start < i &&
                (!o.endTagStart || o.endTagStart > i)
              )
                for (
                  var a = (s = I.createScanner(e.getText(), o.start)).scan();
                  a !== U.TokenType.EOS && s.getTokenEnd() <= i;

                ) {
                  if (a === U.TokenType.StartTagClose && s.getTokenEnd() === i)
                    return "$0</" + o.tag + ">";
                  a = s.scan();
                }
            } else if ("/" === r) {
              for (var o = n.findNodeBefore(i); o && o.closed; ) o = o.parent;
              if (o && o.tag) {
                var s;
                for (
                  a = (s = I.createScanner(e.getText(), o.start)).scan();
                  a !== U.TokenType.EOS && s.getTokenEnd() <= i;

                ) {
                  if (a === U.TokenType.EndTagOpen && s.getTokenEnd() === i)
                    return o.tag + ">";
                  a = s.scan();
                }
              }
            }
            return null;
          }),
          e
        );
      })();
    function P(e) {
      return /^\s*$/.test(e);
    }
    function R(e, t, n, i) {
      for (
        var r = I.createScanner(e, t, n), a = r.scan();
        a === U.TokenType.Whitespace;

      )
        a = r.scan();
      return a === i;
    }
    t.HTMLCompletion = i;
  }),
  (function (e) {
    if ("object" == typeof module && "object" == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      "function" == typeof define &&
        define.amd &&
        define(
          "vscode-html-languageservice/services/htmlHover",
          [
            "require",
            "exports",
            "../parser/htmlScanner",
            "vscode-languageserver-types",
            "../htmlLanguageTypes",
            "../languageFacts/builtinDataProviders",
          ],
          e
        );
  })(function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var h = e("../parser/htmlScanner"),
      d = e("vscode-languageserver-types"),
      u = e("../htmlLanguageTypes"),
      p = e("../languageFacts/builtinDataProviders");
    t.doHover = function (r, e, t) {
      var a = r.offsetAt(e),
        n = t.findNodeAt(a);
      if (!n || !n.tag) return null;
      var s = p.getAllDataProviders().filter(function (e) {
        return e.isApplicable(r.languageId);
      });
      function i(r, a, o) {
        r = r.toLowerCase();
        for (
          var e = function (e) {
              var i = null;
              if (
                (e.provideTags().forEach(function (e) {
                  if (e.name.toLowerCase() === r.toLowerCase()) {
                    var t = o ? "<" + r + ">" : "</" + r + ">",
                      n = e.description || "";
                    i = {
                      contents: [
                        { language: "html", value: t },
                        d.MarkedString.fromPlainText(n),
                      ],
                      range: a,
                    };
                  }
                }),
                i)
              )
                return { value: i };
            },
            t = 0,
            n = s;
          t < n.length;
          t++
        ) {
          var i = e(n[t]);
          if ("object" == typeof i) return i.value;
        }
        return null;
      }
      function o(e, t) {
        for (
          var n = h.createScanner(r.getText(), t), i = n.scan();
          i !== u.TokenType.EOS &&
          (n.getTokenEnd() < a || (n.getTokenEnd() === a && i !== e));

        )
          i = n.scan();
        return i === e && a <= n.getTokenEnd()
          ? {
              start: r.positionAt(n.getTokenOffset()),
              end: r.positionAt(n.getTokenEnd()),
            }
          : null;
      }
      if (n.endTagStart && a >= n.endTagStart) {
        var l = o(u.TokenType.EndTag, n.endTagStart);
        return l ? i(n.tag, l, !1) : null;
      }
      var c = o(u.TokenType.StartTag, n.start);
      return c ? i(n.tag, c, !0) : null;
    };
  }),
  (function (e) {
    if ("object" == typeof module && "object" == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      "function" == typeof define &&
        define.amd &&
        define(
          "vscode-html-languageservice/beautify/beautify",
          ["require", "exports"],
          e
        );
  })(function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.js_beautify = function (e, t) {
        return e;
      });
  }),
  (function () {
    var e = (function (n) {
      var i = {};
      function r(e) {
        if (i[e]) return i[e].exports;
        var t = (i[e] = { i: e, l: !1, exports: {} });
        return n[e].call(t.exports, t, t.exports, r), (t.l = !0), t.exports;
      }
      return (
        (r.m = n),
        (r.c = i),
        (r.d = function (e, t, n) {
          r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
        }),
        (r.r = function (e) {
          "undefined" != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(e, "__esModule", { value: !0 });
        }),
        (r.t = function (t, e) {
          if ((1 & e && (t = r(t)), 8 & e)) return t;
          if (4 & e && "object" == typeof t && t && t.__esModule) return t;
          var n = Object.create(null);
          if (
            (r.r(n),
            Object.defineProperty(n, "default", { enumerable: !0, value: t }),
            2 & e && "string" != typeof t)
          )
            for (var i in t)
              r.d(
                n,
                i,
                function (e) {
                  return t[e];
                }.bind(null, i)
              );
          return n;
        }),
        (r.n = function (e) {
          var t =
            e && e.__esModule
              ? function () {
                  return e.default;
                }
              : function () {
                  return e;
                };
          return r.d(t, "a", t), t;
        }),
        (r.o = function (e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (r.p = ""),
        r((r.s = 15))
      );
    })([
      ,
      ,
      function (e, t, n) {
        function r(e) {
          (this.__parent = e),
            (this.__character_count = 0),
            (this.__indent_count = -1),
            (this.__alignment_count = 0),
            (this.__wrap_point_index = 0),
            (this.__wrap_point_character_count = 0),
            (this.__wrap_point_indent_count = -1),
            (this.__wrap_point_alignment_count = 0),
            (this.__items = []);
        }
        function i(e, t) {
          (this.__cache = [""]),
            (this.__indent_size = e.indent_size),
            (this.__indent_string = e.indent_char),
            e.indent_with_tabs ||
              (this.__indent_string = new Array(e.indent_size + 1).join(
                e.indent_char
              )),
            (t = t || ""),
            0 < e.indent_level &&
              (t = new Array(e.indent_level + 1).join(this.__indent_string)),
            (this.__base_string = t),
            (this.__base_string_length = t.length);
        }
        function a(e, t) {
          (this.__indent_cache = new i(e, t)),
            (this.raw = !1),
            (this._end_with_newline = e.end_with_newline),
            (this.indent_size = e.indent_size),
            (this.wrap_line_length = e.wrap_line_length),
            (this.__lines = []),
            (this.previous_line = null),
            (this.current_line = null),
            (this.next_line = new r(this)),
            (this.space_before_token = !1),
            (this.non_breaking_space = !1),
            (this.previous_token_wrapped = !1),
            this.__add_outputline();
        }
        (r.prototype.clone_empty = function () {
          var e = new r(this.__parent);
          return e.set_indent(this.__indent_count, this.__alignment_count), e;
        }),
          (r.prototype.item = function (e) {
            return e < 0
              ? this.__items[this.__items.length + e]
              : this.__items[e];
          }),
          (r.prototype.has_match = function (e) {
            for (var t = this.__items.length - 1; 0 <= t; t--)
              if (this.__items[t].match(e)) return !0;
            return !1;
          }),
          (r.prototype.set_indent = function (e, t) {
            this.is_empty() &&
              ((this.__indent_count = e || 0),
              (this.__alignment_count = t || 0),
              (this.__character_count = this.__parent.get_indent_size(
                this.__indent_count,
                this.__alignment_count
              )));
          }),
          (r.prototype._set_wrap_point = function () {
            this.__parent.wrap_line_length &&
              ((this.__wrap_point_index = this.__items.length),
              (this.__wrap_point_character_count = this.__character_count),
              (this.__wrap_point_indent_count =
                this.__parent.next_line.__indent_count),
              (this.__wrap_point_alignment_count =
                this.__parent.next_line.__alignment_count));
          }),
          (r.prototype._should_wrap = function () {
            return (
              this.__wrap_point_index &&
              this.__character_count > this.__parent.wrap_line_length &&
              this.__wrap_point_character_count >
                this.__parent.next_line.__character_count
            );
          }),
          (r.prototype._allow_wrap = function () {
            if (this._should_wrap()) {
              this.__parent.add_new_line();
              var e = this.__parent.current_line;
              return (
                e.set_indent(
                  this.__wrap_point_indent_count,
                  this.__wrap_point_alignment_count
                ),
                (e.__items = this.__items.slice(this.__wrap_point_index)),
                (this.__items = this.__items.slice(0, this.__wrap_point_index)),
                (e.__character_count +=
                  this.__character_count - this.__wrap_point_character_count),
                (this.__character_count = this.__wrap_point_character_count),
                " " === e.__items[0] &&
                  (e.__items.splice(0, 1), (e.__character_count -= 1)),
                !0
              );
            }
            return !1;
          }),
          (r.prototype.is_empty = function () {
            return 0 === this.__items.length;
          }),
          (r.prototype.last = function () {
            return this.is_empty()
              ? null
              : this.__items[this.__items.length - 1];
          }),
          (r.prototype.push = function (e) {
            this.__items.push(e);
            var t = e.lastIndexOf("\n");
            -1 !== t
              ? (this.__character_count = e.length - t)
              : (this.__character_count += e.length);
          }),
          (r.prototype.pop = function () {
            var e = null;
            return (
              this.is_empty() ||
                ((e = this.__items.pop()),
                (this.__character_count -= e.length)),
              e
            );
          }),
          (r.prototype._remove_indent = function () {
            0 < this.__indent_count &&
              ((this.__indent_count -= 1),
              (this.__character_count -= this.__parent.indent_size));
          }),
          (r.prototype._remove_wrap_indent = function () {
            0 < this.__wrap_point_indent_count &&
              (this.__wrap_point_indent_count -= 1);
          }),
          (r.prototype.trim = function () {
            for (; " " === this.last(); )
              this.__items.pop(), (this.__character_count -= 1);
          }),
          (r.prototype.toString = function () {
            var e = "";
            return (
              this.is_empty() ||
                ((e = this.__parent.get_indent_string(
                  this.__indent_count,
                  this.__alignment_count
                )),
                (e += this.__items.join(""))),
              e
            );
          }),
          (i.prototype.get_indent_size = function (e, t) {
            var n = this.__base_string_length;
            return (
              (t = t || 0),
              e < 0 && (n = 0),
              (n += e * this.__indent_size),
              (n += t)
            );
          }),
          (i.prototype.get_indent_string = function (e, t) {
            var n = this.__base_string;
            return (
              (t = t || 0),
              e < 0 && ((e = 0), (n = "")),
              (t += e * this.__indent_size),
              this.__ensure_cache(t),
              (n += this.__cache[t])
            );
          }),
          (i.prototype.__ensure_cache = function (e) {
            for (; e >= this.__cache.length; ) this.__add_column();
          }),
          (i.prototype.__add_column = function () {
            var e = this.__cache.length,
              t = 0,
              n = "";
            this.__indent_size &&
              e >= this.__indent_size &&
              ((e -=
                (t = Math.floor(e / this.__indent_size)) * this.__indent_size),
              (n = new Array(t + 1).join(this.__indent_string))),
              e && (n += new Array(e + 1).join(" ")),
              this.__cache.push(n);
          }),
          (a.prototype.__add_outputline = function () {
            (this.previous_line = this.current_line),
              (this.current_line = this.next_line.clone_empty()),
              this.__lines.push(this.current_line);
          }),
          (a.prototype.get_line_number = function () {
            return this.__lines.length;
          }),
          (a.prototype.get_indent_string = function (e, t) {
            return this.__indent_cache.get_indent_string(e, t);
          }),
          (a.prototype.get_indent_size = function (e, t) {
            return this.__indent_cache.get_indent_size(e, t);
          }),
          (a.prototype.is_empty = function () {
            return !this.previous_line && this.current_line.is_empty();
          }),
          (a.prototype.add_new_line = function (e) {
            return (
              !(this.is_empty() || (!e && this.just_added_newline())) &&
              (this.raw || this.__add_outputline(), !0)
            );
          }),
          (a.prototype.get_code = function (e) {
            this.trim(!0);
            var t = this.current_line.pop();
            t &&
              ("\n" === t[t.length - 1] && (t = t.replace(/\n+$/g, "")),
              this.current_line.push(t)),
              this._end_with_newline && this.__add_outputline();
            var n = this.__lines.join("\n");
            return "\n" !== e && (n = n.replace(/[\n]/g, e)), n;
          }),
          (a.prototype.set_wrap_point = function () {
            this.current_line._set_wrap_point();
          }),
          (a.prototype.set_indent = function (e, t) {
            return (
              (e = e || 0),
              (t = t || 0),
              this.next_line.set_indent(e, t),
              1 < this.__lines.length
                ? (this.current_line.set_indent(e, t), !0)
                : (this.current_line.set_indent(), !1)
            );
          }),
          (a.prototype.add_raw_token = function (e) {
            for (var t = 0; t < e.newlines; t++) this.__add_outputline();
            this.current_line.set_indent(-1),
              this.current_line.push(e.whitespace_before),
              this.current_line.push(e.text),
              (this.space_before_token = !1),
              (this.non_breaking_space = !1),
              (this.previous_token_wrapped = !1);
          }),
          (a.prototype.add_token = function (e) {
            this.__add_space_before_token(),
              this.current_line.push(e),
              (this.space_before_token = !1),
              (this.non_breaking_space = !1),
              (this.previous_token_wrapped = this.current_line._allow_wrap());
          }),
          (a.prototype.__add_space_before_token = function () {
            this.space_before_token &&
              !this.just_added_newline() &&
              (this.non_breaking_space || this.set_wrap_point(),
              this.current_line.push(" "));
          }),
          (a.prototype.remove_indent = function (e) {
            for (var t = this.__lines.length; e < t; )
              this.__lines[e]._remove_indent(), e++;
            this.current_line._remove_wrap_indent();
          }),
          (a.prototype.trim = function (e) {
            for (
              e = void 0 !== e && e, this.current_line.trim();
              e && 1 < this.__lines.length && this.current_line.is_empty();

            )
              this.__lines.pop(),
                (this.current_line = this.__lines[this.__lines.length - 1]),
                this.current_line.trim();
            this.previous_line =
              1 < this.__lines.length
                ? this.__lines[this.__lines.length - 2]
                : null;
          }),
          (a.prototype.just_added_newline = function () {
            return this.current_line.is_empty();
          }),
          (a.prototype.just_added_blankline = function () {
            return (
              this.is_empty() ||
              (this.current_line.is_empty() && this.previous_line.is_empty())
            );
          }),
          (a.prototype.ensure_empty_line_above = function (e, t) {
            for (var n = this.__lines.length - 2; 0 <= n; ) {
              var i = this.__lines[n];
              if (i.is_empty()) break;
              if (0 !== i.item(0).indexOf(e) && i.item(-1) !== t) {
                this.__lines.splice(n + 1, 0, new r(this)),
                  (this.previous_line = this.__lines[this.__lines.length - 2]);
                break;
              }
              n--;
            }
          }),
          (e.exports.Output = a);
      },
      ,
      ,
      ,
      function (e, t, n) {
        function i(e, t) {
          (this.raw_options = r(e, t)),
            (this.disabled = this._get_boolean("disabled")),
            (this.eol = this._get_characters("eol", "auto")),
            (this.end_with_newline = this._get_boolean("end_with_newline")),
            (this.indent_size = this._get_number("indent_size", 4)),
            (this.indent_char = this._get_characters("indent_char", " ")),
            (this.indent_level = this._get_number("indent_level")),
            (this.preserve_newlines = this._get_boolean(
              "preserve_newlines",
              !0
            )),
            (this.max_preserve_newlines = this._get_number(
              "max_preserve_newlines",
              32786
            )),
            this.preserve_newlines || (this.max_preserve_newlines = 0),
            (this.indent_with_tabs = this._get_boolean(
              "indent_with_tabs",
              "\t" === this.indent_char
            )),
            this.indent_with_tabs &&
              ((this.indent_char = "\t"),
              1 === this.indent_size && (this.indent_size = 4)),
            (this.wrap_line_length = this._get_number(
              "wrap_line_length",
              this._get_number("max_char")
            ));
        }
        function r(e, t) {
          var n,
            i = {};
          for (n in (e = a(e))) n !== t && (i[n] = e[n]);
          if (t && e[t]) for (n in e[t]) i[n] = e[t][n];
          return i;
        }
        function a(e) {
          var t,
            n = {};
          for (t in e) {
            n[t.replace(/-/g, "_")] = e[t];
          }
          return n;
        }
        (i.prototype._get_array = function (e, t) {
          var n = this.raw_options[e],
            i = t || [];
          return (
            "object" == typeof n
              ? null !== n && "function" == typeof n.concat && (i = n.concat())
              : "string" == typeof n && (i = n.split(/[^a-zA-Z0-9_\/\-]+/)),
            i
          );
        }),
          (i.prototype._get_boolean = function (e, t) {
            var n = this.raw_options[e];
            return void 0 === n ? !!t : !!n;
          }),
          (i.prototype._get_characters = function (e, t) {
            var n = this.raw_options[e],
              i = t || "";
            return (
              "string" == typeof n &&
                (i = n
                  .replace(/\\r/, "\r")
                  .replace(/\\n/, "\n")
                  .replace(/\\t/, "\t")),
              i
            );
          }),
          (i.prototype._get_number = function (e, t) {
            var n = this.raw_options[e];
            (t = parseInt(t, 10)), isNaN(t) && (t = 0);
            var i = parseInt(n, 10);
            return isNaN(i) && (i = t), i;
          }),
          (i.prototype._get_selection = function (e, t, n) {
            var i = this._get_selection_list(e, t, n);
            if (1 !== i.length)
              throw new Error(
                "Invalid Option Value: The option '" +
                  e +
                  "' can only be one of the following values:\n" +
                  t +
                  "\nYou passed in: '" +
                  this.raw_options[e] +
                  "'"
              );
            return i[0];
          }),
          (i.prototype._get_selection_list = function (e, t, n) {
            if (!t || 0 === t.length)
              throw new Error("Selection list cannot be empty.");
            if (((n = n || [t[0]]), !this._is_valid_selection(n, t)))
              throw new Error("Invalid Default Value!");
            var i = this._get_array(e, n);
            if (!this._is_valid_selection(i, t))
              throw new Error(
                "Invalid Option Value: The option '" +
                  e +
                  "' can contain only the following values:\n" +
                  t +
                  "\nYou passed in: '" +
                  this.raw_options[e] +
                  "'"
              );
            return i;
          }),
          (i.prototype._is_valid_selection = function (e, t) {
            return (
              e.length &&
              t.length &&
              !e.some(function (e) {
                return -1 === t.indexOf(e);
              })
            );
          }),
          (e.exports.Options = i),
          (e.exports.normalizeOpts = a),
          (e.exports.mergeOpts = r);
      },
      ,
      function (e, t, n) {
        var r = RegExp.prototype.hasOwnProperty("sticky");
        function i(e) {
          (this.__input = e || ""),
            (this.__input_length = this.__input.length),
            (this.__position = 0);
        }
        (i.prototype.restart = function () {
          this.__position = 0;
        }),
          (i.prototype.back = function () {
            0 < this.__position && (this.__position -= 1);
          }),
          (i.prototype.hasNext = function () {
            return this.__position < this.__input_length;
          }),
          (i.prototype.next = function () {
            var e = null;
            return (
              this.hasNext() &&
                ((e = this.__input.charAt(this.__position)),
                (this.__position += 1)),
              e
            );
          }),
          (i.prototype.peek = function (e) {
            var t = null;
            return (
              (e = e || 0),
              0 <= (e += this.__position) &&
                e < this.__input_length &&
                (t = this.__input.charAt(e)),
              t
            );
          }),
          (i.prototype.__match = function (e, t) {
            e.lastIndex = t;
            var n = e.exec(this.__input);
            return !n || (r && e.sticky) || (n.index !== t && (n = null)), n;
          }),
          (i.prototype.test = function (e, t) {
            return (
              (t = t || 0),
              0 <= (t += this.__position) &&
                t < this.__input_length &&
                !!this.__match(e, t)
            );
          }),
          (i.prototype.testChar = function (e, t) {
            var n = this.peek(t);
            return (e.lastIndex = 0), null !== n && e.test(n);
          }),
          (i.prototype.match = function (e) {
            var t = this.__match(e, this.__position);
            return t ? (this.__position += t[0].length) : (t = null), t;
          }),
          (i.prototype.read = function (e, t, n) {
            var i,
              r = "";
            return (
              e && (i = this.match(e)) && (r += i[0]),
              !t || (!i && e) || (r += this.readUntil(t, n)),
              r
            );
          }),
          (i.prototype.readUntil = function (e, t) {
            var n,
              i = this.__position;
            e.lastIndex = this.__position;
            var r = e.exec(this.__input);
            return (
              r
                ? ((i = r.index), t && (i += r[0].length))
                : (i = this.__input_length),
              (n = this.__input.substring(this.__position, i)),
              (this.__position = i),
              n
            );
          }),
          (i.prototype.readUntilAfter = function (e) {
            return this.readUntil(e, !0);
          }),
          (i.prototype.get_regexp = function (e, t) {
            var n = null,
              i = "g";
            return (
              t && r && (i = "y"),
              "string" == typeof e && "" !== e
                ? (n = new RegExp(e, i))
                : e && (n = new RegExp(e.source, i)),
              n
            );
          }),
          (i.prototype.get_literal_regexp = function (e) {
            return RegExp(e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
          }),
          (i.prototype.peekUntilAfter = function (e) {
            var t = this.__position,
              n = this.readUntilAfter(e);
            return (this.__position = t), n;
          }),
          (i.prototype.lookBack = function (e) {
            var t = this.__position - 1;
            return (
              t >= e.length &&
              this.__input.substring(t - e.length, t).toLowerCase() === e
            );
          }),
          (e.exports.InputScanner = i);
      },
      ,
      ,
      ,
      ,
      function (e, t, n) {
        function i(e, t) {
          (e = "string" == typeof e ? e : e.source),
            (t = "string" == typeof t ? t : t.source),
            (this.__directives_block_pattern = new RegExp(
              e + / beautify( \w+[:]\w+)+ /.source + t,
              "g"
            )),
            (this.__directive_pattern = / (\w+)[:](\w+)/g),
            (this.__directives_end_ignore_pattern = new RegExp(
              e + /\sbeautify\signore:end\s/.source + t,
              "g"
            ));
        }
        (i.prototype.get_directives = function (e) {
          if (!e.match(this.__directives_block_pattern)) return null;
          var t = {};
          this.__directive_pattern.lastIndex = 0;
          for (var n = this.__directive_pattern.exec(e); n; )
            (t[n[1]] = n[2]), (n = this.__directive_pattern.exec(e));
          return t;
        }),
          (i.prototype.readIgnored = function (e) {
            return e.readUntilAfter(this.__directives_end_ignore_pattern);
          }),
          (e.exports.Directives = i);
      },
      ,
      function (e, t, n) {
        var i = n(16).Beautifier,
          r = n(17).Options;
        (e.exports = function (e, t) {
          return new i(e, t).beautify();
        }),
          (e.exports.defaultOptions = function () {
            return new r();
          });
      },
      function (e, t, n) {
        var i = n(17).Options,
          f = n(2).Output,
          g = n(8).InputScanner,
          _ = new (n(13).Directives)(/\/\*/, /\*\//),
          b = /\r\n|[\r\n]/,
          v = /\r\n|[\r\n]/g,
          y = /\s/,
          w = /(?:\s|\n)+/g,
          T = /\/\*(?:[\s\S]*?)((?:\*\/)|$)/g,
          S = /\/\/(?:[^\n\r\u2028\u2029]*)/g;
        function r(e, t) {
          (this._source_text = e || ""),
            (this._options = new i(t)),
            (this._ch = null),
            (this._input = null),
            (this.NESTED_AT_RULE = {
              "@page": !0,
              "@font-face": !0,
              "@keyframes": !0,
              "@media": !0,
              "@supports": !0,
              "@document": !0,
            }),
            (this.CONDITIONAL_GROUP_RULE = {
              "@media": !0,
              "@supports": !0,
              "@document": !0,
            });
        }
        (r.prototype.eatString = function (e) {
          var t = "";
          for (this._ch = this._input.next(); this._ch; ) {
            if (((t += this._ch), "\\" === this._ch)) t += this._input.next();
            else if (-1 !== e.indexOf(this._ch) || "\n" === this._ch) break;
            this._ch = this._input.next();
          }
          return t;
        }),
          (r.prototype.eatWhitespace = function (e) {
            for (
              var t = y.test(this._input.peek()), n = !0;
              y.test(this._input.peek());

            )
              (this._ch = this._input.next()),
                e &&
                  "\n" === this._ch &&
                  (this._options.preserve_newlines || n) &&
                  ((n = !1), this._output.add_new_line(!0));
            return t;
          }),
          (r.prototype.foundNestedPseudoClass = function () {
            for (var e = 0, t = 1, n = this._input.peek(t); n; ) {
              if ("{" === n) return !0;
              if ("(" === n) e += 1;
              else if (")" === n) {
                if (0 === e) return !1;
                e -= 1;
              } else if (";" === n || "}" === n) return !1;
              t++, (n = this._input.peek(t));
            }
            return !1;
          }),
          (r.prototype.print_string = function (e) {
            this._output.set_indent(this._indentLevel),
              (this._output.non_breaking_space = !0),
              this._output.add_token(e);
          }),
          (r.prototype.preserveSingleSpace = function (e) {
            e && (this._output.space_before_token = !0);
          }),
          (r.prototype.indent = function () {
            this._indentLevel++;
          }),
          (r.prototype.outdent = function () {
            0 < this._indentLevel && this._indentLevel--;
          }),
          (r.prototype.beautify = function () {
            if (this._options.disabled) return this._source_text;
            var e = this._source_text,
              t = this._options.eol;
            "auto" === t &&
              ((t = "\n"), e && b.test(e || "") && (t = e.match(b)[0]));
            var n = (e = e.replace(v, "\n")).match(/^[\t ]*/)[0];
            (this._output = new f(this._options, n)),
              (this._input = new g(e)),
              (this._indentLevel = 0),
              (this._nestedLevel = 0),
              (this._ch = null);
            for (
              var i,
                r,
                a = 0,
                o = !1,
                s = !1,
                l = !1,
                c = !1,
                h = !1,
                d = this._ch;
              (i = "" !== this._input.read(w)),
                (r = d),
                (this._ch = this._input.next()),
                (d = this._ch),
                this._ch;

            )
              if ("/" === this._ch && "*" === this._input.peek()) {
                this._output.add_new_line(), this._input.back();
                var u = this._input.read(T),
                  p = _.get_directives(u);
                p && "start" === p.ignore && (u += _.readIgnored(this._input)),
                  this.print_string(u),
                  this.eatWhitespace(!0),
                  this._output.add_new_line();
              } else if ("/" === this._ch && "/" === this._input.peek())
                (this._output.space_before_token = !0),
                  this._input.back(),
                  this.print_string(this._input.read(S)),
                  this.eatWhitespace(!0);
              else if ("@" === this._ch)
                if ((this.preserveSingleSpace(i), "{" === this._input.peek()))
                  this.print_string(this._ch + this.eatString("}"));
                else {
                  this.print_string(this._ch);
                  var m = this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);
                  m.match(/[ :]$/) &&
                    ((m = this.eatString(": ").replace(/\s$/, "")),
                    this.print_string(m),
                    (this._output.space_before_token = !0)),
                    "extend" === (m = m.replace(/\s$/, ""))
                      ? (c = !0)
                      : "import" === m && (h = !0),
                    m in this.NESTED_AT_RULE
                      ? ((this._nestedLevel += 1),
                        m in this.CONDITIONAL_GROUP_RULE && (l = !0))
                      : o ||
                        0 !== a ||
                        -1 === m.indexOf(":") ||
                        ((s = !0), this.indent());
                }
              else
                "#" === this._ch && "{" === this._input.peek()
                  ? (this.preserveSingleSpace(i),
                    this.print_string(this._ch + this.eatString("}")))
                  : "{" === this._ch
                  ? (s && ((s = !1), this.outdent()),
                    this.indent(),
                    (this._output.space_before_token = !0),
                    this.print_string(this._ch),
                    (o = l
                      ? ((l = !1), this._indentLevel > this._nestedLevel)
                      : this._indentLevel >= this._nestedLevel),
                    this._options.newline_between_rules &&
                      o &&
                      this._output.previous_line &&
                      "{" !== this._output.previous_line.item(-1) &&
                      this._output.ensure_empty_line_above("/", ","),
                    this.eatWhitespace(!0),
                    this._output.add_new_line())
                  : "}" === this._ch
                  ? (this.outdent(),
                    this._output.add_new_line(),
                    "{" === r && this._output.trim(!0),
                    (c = h = !1),
                    s && (this.outdent(), (s = !1)),
                    this.print_string(this._ch),
                    (o = !1),
                    this._nestedLevel && this._nestedLevel--,
                    this.eatWhitespace(!0),
                    this._output.add_new_line(),
                    this._options.newline_between_rules &&
                      !this._output.just_added_blankline() &&
                      "}" !== this._input.peek() &&
                      this._output.add_new_line(!0))
                  : ":" === this._ch
                  ? (!o && !l) ||
                    this._input.lookBack("&") ||
                    this.foundNestedPseudoClass() ||
                    this._input.lookBack("(") ||
                    c
                    ? (this._input.lookBack(" ") &&
                        (this._output.space_before_token = !0),
                      ":" === this._input.peek()
                        ? ((this._ch = this._input.next()),
                          this.print_string("::"))
                        : this.print_string(":"))
                    : (this.print_string(":"),
                      s ||
                        ((s = !0),
                        (this._output.space_before_token = !0),
                        this.eatWhitespace(!0),
                        this.indent()))
                  : '"' === this._ch || "'" === this._ch
                  ? (this.preserveSingleSpace(i),
                    this.print_string(this._ch + this.eatString(this._ch)),
                    this.eatWhitespace(!0))
                  : ";" === this._ch
                  ? (s && (this.outdent(), (s = !1)),
                    (h = c = !1),
                    this.print_string(this._ch),
                    this.eatWhitespace(!0),
                    "/" !== this._input.peek() && this._output.add_new_line())
                  : "(" === this._ch
                  ? this._input.lookBack("url")
                    ? (this.print_string(this._ch),
                      this.eatWhitespace(),
                      (this._ch = this._input.next()),
                      ")" === this._ch || '"' === this._ch || "'" === this._ch
                        ? (this._input.back(), a++)
                        : this._ch &&
                          this.print_string(this._ch + this.eatString(")")))
                    : (a++,
                      this.preserveSingleSpace(i),
                      this.print_string(this._ch),
                      this.eatWhitespace())
                  : ")" === this._ch
                  ? (this.print_string(this._ch), a--)
                  : "," === this._ch
                  ? (this.print_string(this._ch),
                    this.eatWhitespace(!0),
                    this._options.selector_separator_newline &&
                    !s &&
                    a < 1 &&
                    !h
                      ? this._output.add_new_line()
                      : (this._output.space_before_token = !0))
                  : (">" === this._ch ||
                      "+" === this._ch ||
                      "~" === this._ch) &&
                    !s &&
                    a < 1
                  ? this._options.space_around_combinator
                    ? ((this._output.space_before_token = !0),
                      this.print_string(this._ch),
                      (this._output.space_before_token = !0))
                    : (this.print_string(this._ch),
                      this.eatWhitespace(),
                      this._ch && y.test(this._ch) && (this._ch = ""))
                  : "]" === this._ch
                  ? this.print_string(this._ch)
                  : "[" === this._ch
                  ? (this.preserveSingleSpace(i), this.print_string(this._ch))
                  : "=" === this._ch
                  ? (this.eatWhitespace(),
                    this.print_string("="),
                    y.test(this._ch) && (this._ch = ""))
                  : ("!" === this._ch
                      ? this.print_string(" ")
                      : this.preserveSingleSpace(i),
                    this.print_string(this._ch));
            return this._output.get_code(t);
          }),
          (e.exports.Beautifier = r);
      },
      function (e, t, n) {
        var i = n(6).Options;
        function r(e) {
          i.call(this, e, "css"),
            (this.selector_separator_newline = this._get_boolean(
              "selector_separator_newline",
              !0
            )),
            (this.newline_between_rules = this._get_boolean(
              "newline_between_rules",
              !0
            ));
          var t = this._get_boolean("space_around_selector_separator");
          this.space_around_combinator =
            this._get_boolean("space_around_combinator") || t;
        }
        (r.prototype = new i()), (e.exports.Options = r);
      },
    ]);
    "function" == typeof define && define.amd
      ? define(
          "vscode-html-languageservice/beautify/beautify-css",
          [],
          function () {
            return { css_beautify: e };
          }
        )
      : "undefined" != typeof exports
      ? (exports.css_beautify = e)
      : "undefined" != typeof window
      ? (window.css_beautify = e)
      : "undefined" != typeof global && (global.css_beautify = e);
  })(),
  (function () {
    var r = (function (n) {
      var i = {};
      function r(e) {
        if (i[e]) return i[e].exports;
        var t = (i[e] = { i: e, l: !1, exports: {} });
        return n[e].call(t.exports, t, t.exports, r), (t.l = !0), t.exports;
      }
      return (
        (r.m = n),
        (r.c = i),
        (r.d = function (e, t, n) {
          r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
        }),
        (r.r = function (e) {
          "undefined" != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(e, "__esModule", { value: !0 });
        }),
        (r.t = function (t, e) {
          if ((1 & e && (t = r(t)), 8 & e)) return t;
          if (4 & e && "object" == typeof t && t && t.__esModule) return t;
          var n = Object.create(null);
          if (
            (r.r(n),
            Object.defineProperty(n, "default", { enumerable: !0, value: t }),
            2 & e && "string" != typeof t)
          )
            for (var i in t)
              r.d(
                n,
                i,
                function (e) {
                  return t[e];
                }.bind(null, i)
              );
          return n;
        }),
        (r.n = function (e) {
          var t =
            e && e.__esModule
              ? function () {
                  return e.default;
                }
              : function () {
                  return e;
                };
          return r.d(t, "a", t), t;
        }),
        (r.o = function (e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (r.p = ""),
        r((r.s = 18))
      );
    })([
      ,
      ,
      function (e, t, n) {
        function r(e) {
          (this.__parent = e),
            (this.__character_count = 0),
            (this.__indent_count = -1),
            (this.__alignment_count = 0),
            (this.__wrap_point_index = 0),
            (this.__wrap_point_character_count = 0),
            (this.__wrap_point_indent_count = -1),
            (this.__wrap_point_alignment_count = 0),
            (this.__items = []);
        }
        function i(e, t) {
          (this.__cache = [""]),
            (this.__indent_size = e.indent_size),
            (this.__indent_string = e.indent_char),
            e.indent_with_tabs ||
              (this.__indent_string = new Array(e.indent_size + 1).join(
                e.indent_char
              )),
            (t = t || ""),
            0 < e.indent_level &&
              (t = new Array(e.indent_level + 1).join(this.__indent_string)),
            (this.__base_string = t),
            (this.__base_string_length = t.length);
        }
        function a(e, t) {
          (this.__indent_cache = new i(e, t)),
            (this.raw = !1),
            (this._end_with_newline = e.end_with_newline),
            (this.indent_size = e.indent_size),
            (this.wrap_line_length = e.wrap_line_length),
            (this.__lines = []),
            (this.previous_line = null),
            (this.current_line = null),
            (this.next_line = new r(this)),
            (this.space_before_token = !1),
            (this.non_breaking_space = !1),
            (this.previous_token_wrapped = !1),
            this.__add_outputline();
        }
        (r.prototype.clone_empty = function () {
          var e = new r(this.__parent);
          return e.set_indent(this.__indent_count, this.__alignment_count), e;
        }),
          (r.prototype.item = function (e) {
            return e < 0
              ? this.__items[this.__items.length + e]
              : this.__items[e];
          }),
          (r.prototype.has_match = function (e) {
            for (var t = this.__items.length - 1; 0 <= t; t--)
              if (this.__items[t].match(e)) return !0;
            return !1;
          }),
          (r.prototype.set_indent = function (e, t) {
            this.is_empty() &&
              ((this.__indent_count = e || 0),
              (this.__alignment_count = t || 0),
              (this.__character_count = this.__parent.get_indent_size(
                this.__indent_count,
                this.__alignment_count
              )));
          }),
          (r.prototype._set_wrap_point = function () {
            this.__parent.wrap_line_length &&
              ((this.__wrap_point_index = this.__items.length),
              (this.__wrap_point_character_count = this.__character_count),
              (this.__wrap_point_indent_count =
                this.__parent.next_line.__indent_count),
              (this.__wrap_point_alignment_count =
                this.__parent.next_line.__alignment_count));
          }),
          (r.prototype._should_wrap = function () {
            return (
              this.__wrap_point_index &&
              this.__character_count > this.__parent.wrap_line_length &&
              this.__wrap_point_character_count >
                this.__parent.next_line.__character_count
            );
          }),
          (r.prototype._allow_wrap = function () {
            if (this._should_wrap()) {
              this.__parent.add_new_line();
              var e = this.__parent.current_line;
              return (
                e.set_indent(
                  this.__wrap_point_indent_count,
                  this.__wrap_point_alignment_count
                ),
                (e.__items = this.__items.slice(this.__wrap_point_index)),
                (this.__items = this.__items.slice(0, this.__wrap_point_index)),
                (e.__character_count +=
                  this.__character_count - this.__wrap_point_character_count),
                (this.__character_count = this.__wrap_point_character_count),
                " " === e.__items[0] &&
                  (e.__items.splice(0, 1), (e.__character_count -= 1)),
                !0
              );
            }
            return !1;
          }),
          (r.prototype.is_empty = function () {
            return 0 === this.__items.length;
          }),
          (r.prototype.last = function () {
            return this.is_empty()
              ? null
              : this.__items[this.__items.length - 1];
          }),
          (r.prototype.push = function (e) {
            this.__items.push(e);
            var t = e.lastIndexOf("\n");
            -1 !== t
              ? (this.__character_count = e.length - t)
              : (this.__character_count += e.length);
          }),
          (r.prototype.pop = function () {
            var e = null;
            return (
              this.is_empty() ||
                ((e = this.__items.pop()),
                (this.__character_count -= e.length)),
              e
            );
          }),
          (r.prototype._remove_indent = function () {
            0 < this.__indent_count &&
              ((this.__indent_count -= 1),
              (this.__character_count -= this.__parent.indent_size));
          }),
          (r.prototype._remove_wrap_indent = function () {
            0 < this.__wrap_point_indent_count &&
              (this.__wrap_point_indent_count -= 1);
          }),
          (r.prototype.trim = function () {
            for (; " " === this.last(); )
              this.__items.pop(), (this.__character_count -= 1);
          }),
          (r.prototype.toString = function () {
            var e = "";
            return (
              this.is_empty() ||
                ((e = this.__parent.get_indent_string(
                  this.__indent_count,
                  this.__alignment_count
                )),
                (e += this.__items.join(""))),
              e
            );
          }),
          (i.prototype.get_indent_size = function (e, t) {
            var n = this.__base_string_length;
            return (
              (t = t || 0),
              e < 0 && (n = 0),
              (n += e * this.__indent_size),
              (n += t)
            );
          }),
          (i.prototype.get_indent_string = function (e, t) {
            var n = this.__base_string;
            return (
              (t = t || 0),
              e < 0 && ((e = 0), (n = "")),
              (t += e * this.__indent_size),
              this.__ensure_cache(t),
              (n += this.__cache[t])
            );
          }),
          (i.prototype.__ensure_cache = function (e) {
            for (; e >= this.__cache.length; ) this.__add_column();
          }),
          (i.prototype.__add_column = function () {
            var e = this.__cache.length,
              t = 0,
              n = "";
            this.__indent_size &&
              e >= this.__indent_size &&
              ((e -=
                (t = Math.floor(e / this.__indent_size)) * this.__indent_size),
              (n = new Array(t + 1).join(this.__indent_string))),
              e && (n += new Array(e + 1).join(" ")),
              this.__cache.push(n);
          }),
          (a.prototype.__add_outputline = function () {
            (this.previous_line = this.current_line),
              (this.current_line = this.next_line.clone_empty()),
              this.__lines.push(this.current_line);
          }),
          (a.prototype.get_line_number = function () {
            return this.__lines.length;
          }),
          (a.prototype.get_indent_string = function (e, t) {
            return this.__indent_cache.get_indent_string(e, t);
          }),
          (a.prototype.get_indent_size = function (e, t) {
            return this.__indent_cache.get_indent_size(e, t);
          }),
          (a.prototype.is_empty = function () {
            return !this.previous_line && this.current_line.is_empty();
          }),
          (a.prototype.add_new_line = function (e) {
            return (
              !(this.is_empty() || (!e && this.just_added_newline())) &&
              (this.raw || this.__add_outputline(), !0)
            );
          }),
          (a.prototype.get_code = function (e) {
            this.trim(!0);
            var t = this.current_line.pop();
            t &&
              ("\n" === t[t.length - 1] && (t = t.replace(/\n+$/g, "")),
              this.current_line.push(t)),
              this._end_with_newline && this.__add_outputline();
            var n = this.__lines.join("\n");
            return "\n" !== e && (n = n.replace(/[\n]/g, e)), n;
          }),
          (a.prototype.set_wrap_point = function () {
            this.current_line._set_wrap_point();
          }),
          (a.prototype.set_indent = function (e, t) {
            return (
              (e = e || 0),
              (t = t || 0),
              this.next_line.set_indent(e, t),
              1 < this.__lines.length
                ? (this.current_line.set_indent(e, t), !0)
                : (this.current_line.set_indent(), !1)
            );
          }),
          (a.prototype.add_raw_token = function (e) {
            for (var t = 0; t < e.newlines; t++) this.__add_outputline();
            this.current_line.set_indent(-1),
              this.current_line.push(e.whitespace_before),
              this.current_line.push(e.text),
              (this.space_before_token = !1),
              (this.non_breaking_space = !1),
              (this.previous_token_wrapped = !1);
          }),
          (a.prototype.add_token = function (e) {
            this.__add_space_before_token(),
              this.current_line.push(e),
              (this.space_before_token = !1),
              (this.non_breaking_space = !1),
              (this.previous_token_wrapped = this.current_line._allow_wrap());
          }),
          (a.prototype.__add_space_before_token = function () {
            this.space_before_token &&
              !this.just_added_newline() &&
              (this.non_breaking_space || this.set_wrap_point(),
              this.current_line.push(" "));
          }),
          (a.prototype.remove_indent = function (e) {
            for (var t = this.__lines.length; e < t; )
              this.__lines[e]._remove_indent(), e++;
            this.current_line._remove_wrap_indent();
          }),
          (a.prototype.trim = function (e) {
            for (
              e = void 0 !== e && e, this.current_line.trim();
              e && 1 < this.__lines.length && this.current_line.is_empty();

            )
              this.__lines.pop(),
                (this.current_line = this.__lines[this.__lines.length - 1]),
                this.current_line.trim();
            this.previous_line =
              1 < this.__lines.length
                ? this.__lines[this.__lines.length - 2]
                : null;
          }),
          (a.prototype.just_added_newline = function () {
            return this.current_line.is_empty();
          }),
          (a.prototype.just_added_blankline = function () {
            return (
              this.is_empty() ||
              (this.current_line.is_empty() && this.previous_line.is_empty())
            );
          }),
          (a.prototype.ensure_empty_line_above = function (e, t) {
            for (var n = this.__lines.length - 2; 0 <= n; ) {
              var i = this.__lines[n];
              if (i.is_empty()) break;
              if (0 !== i.item(0).indexOf(e) && i.item(-1) !== t) {
                this.__lines.splice(n + 1, 0, new r(this)),
                  (this.previous_line = this.__lines[this.__lines.length - 2]);
                break;
              }
              n--;
            }
          }),
          (e.exports.Output = a);
      },
      function (e, t, n) {
        e.exports.Token = function (e, t, n, i) {
          (this.type = e),
            (this.text = t),
            (this.comments_before = null),
            (this.newlines = n || 0),
            (this.whitespace_before = i || ""),
            (this.parent = null),
            (this.next = null),
            (this.previous = null),
            (this.opened = null),
            (this.closed = null),
            (this.directives = null);
        };
      },
      ,
      ,
      function (e, t, n) {
        function i(e, t) {
          (this.raw_options = r(e, t)),
            (this.disabled = this._get_boolean("disabled")),
            (this.eol = this._get_characters("eol", "auto")),
            (this.end_with_newline = this._get_boolean("end_with_newline")),
            (this.indent_size = this._get_number("indent_size", 4)),
            (this.indent_char = this._get_characters("indent_char", " ")),
            (this.indent_level = this._get_number("indent_level")),
            (this.preserve_newlines = this._get_boolean(
              "preserve_newlines",
              !0
            )),
            (this.max_preserve_newlines = this._get_number(
              "max_preserve_newlines",
              32786
            )),
            this.preserve_newlines || (this.max_preserve_newlines = 0),
            (this.indent_with_tabs = this._get_boolean(
              "indent_with_tabs",
              "\t" === this.indent_char
            )),
            this.indent_with_tabs &&
              ((this.indent_char = "\t"),
              1 === this.indent_size && (this.indent_size = 4)),
            (this.wrap_line_length = this._get_number(
              "wrap_line_length",
              this._get_number("max_char")
            ));
        }
        function r(e, t) {
          var n,
            i = {};
          for (n in (e = a(e))) n !== t && (i[n] = e[n]);
          if (t && e[t]) for (n in e[t]) i[n] = e[t][n];
          return i;
        }
        function a(e) {
          var t,
            n = {};
          for (t in e) {
            n[t.replace(/-/g, "_")] = e[t];
          }
          return n;
        }
        (i.prototype._get_array = function (e, t) {
          var n = this.raw_options[e],
            i = t || [];
          return (
            "object" == typeof n
              ? null !== n && "function" == typeof n.concat && (i = n.concat())
              : "string" == typeof n && (i = n.split(/[^a-zA-Z0-9_\/\-]+/)),
            i
          );
        }),
          (i.prototype._get_boolean = function (e, t) {
            var n = this.raw_options[e];
            return void 0 === n ? !!t : !!n;
          }),
          (i.prototype._get_characters = function (e, t) {
            var n = this.raw_options[e],
              i = t || "";
            return (
              "string" == typeof n &&
                (i = n
                  .replace(/\\r/, "\r")
                  .replace(/\\n/, "\n")
                  .replace(/\\t/, "\t")),
              i
            );
          }),
          (i.prototype._get_number = function (e, t) {
            var n = this.raw_options[e];
            (t = parseInt(t, 10)), isNaN(t) && (t = 0);
            var i = parseInt(n, 10);
            return isNaN(i) && (i = t), i;
          }),
          (i.prototype._get_selection = function (e, t, n) {
            var i = this._get_selection_list(e, t, n);
            if (1 !== i.length)
              throw new Error(
                "Invalid Option Value: The option '" +
                  e +
                  "' can only be one of the following values:\n" +
                  t +
                  "\nYou passed in: '" +
                  this.raw_options[e] +
                  "'"
              );
            return i[0];
          }),
          (i.prototype._get_selection_list = function (e, t, n) {
            if (!t || 0 === t.length)
              throw new Error("Selection list cannot be empty.");
            if (((n = n || [t[0]]), !this._is_valid_selection(n, t)))
              throw new Error("Invalid Default Value!");
            var i = this._get_array(e, n);
            if (!this._is_valid_selection(i, t))
              throw new Error(
                "Invalid Option Value: The option '" +
                  e +
                  "' can contain only the following values:\n" +
                  t +
                  "\nYou passed in: '" +
                  this.raw_options[e] +
                  "'"
              );
            return i;
          }),
          (i.prototype._is_valid_selection = function (e, t) {
            return (
              e.length &&
              t.length &&
              !e.some(function (e) {
                return -1 === t.indexOf(e);
              })
            );
          }),
          (e.exports.Options = i),
          (e.exports.normalizeOpts = a),
          (e.exports.mergeOpts = r);
      },
      ,
      function (e, t, n) {
        var r = RegExp.prototype.hasOwnProperty("sticky");
        function i(e) {
          (this.__input = e || ""),
            (this.__input_length = this.__input.length),
            (this.__position = 0);
        }
        (i.prototype.restart = function () {
          this.__position = 0;
        }),
          (i.prototype.back = function () {
            0 < this.__position && (this.__position -= 1);
          }),
          (i.prototype.hasNext = function () {
            return this.__position < this.__input_length;
          }),
          (i.prototype.next = function () {
            var e = null;
            return (
              this.hasNext() &&
                ((e = this.__input.charAt(this.__position)),
                (this.__position += 1)),
              e
            );
          }),
          (i.prototype.peek = function (e) {
            var t = null;
            return (
              (e = e || 0),
              0 <= (e += this.__position) &&
                e < this.__input_length &&
                (t = this.__input.charAt(e)),
              t
            );
          }),
          (i.prototype.__match = function (e, t) {
            e.lastIndex = t;
            var n = e.exec(this.__input);
            return !n || (r && e.sticky) || (n.index !== t && (n = null)), n;
          }),
          (i.prototype.test = function (e, t) {
            return (
              (t = t || 0),
              0 <= (t += this.__position) &&
                t < this.__input_length &&
                !!this.__match(e, t)
            );
          }),
          (i.prototype.testChar = function (e, t) {
            var n = this.peek(t);
            return (e.lastIndex = 0), null !== n && e.test(n);
          }),
          (i.prototype.match = function (e) {
            var t = this.__match(e, this.__position);
            return t ? (this.__position += t[0].length) : (t = null), t;
          }),
          (i.prototype.read = function (e, t, n) {
            var i,
              r = "";
            return (
              e && (i = this.match(e)) && (r += i[0]),
              !t || (!i && e) || (r += this.readUntil(t, n)),
              r
            );
          }),
          (i.prototype.readUntil = function (e, t) {
            var n,
              i = this.__position;
            e.lastIndex = this.__position;
            var r = e.exec(this.__input);
            return (
              r
                ? ((i = r.index), t && (i += r[0].length))
                : (i = this.__input_length),
              (n = this.__input.substring(this.__position, i)),
              (this.__position = i),
              n
            );
          }),
          (i.prototype.readUntilAfter = function (e) {
            return this.readUntil(e, !0);
          }),
          (i.prototype.get_regexp = function (e, t) {
            var n = null,
              i = "g";
            return (
              t && r && (i = "y"),
              "string" == typeof e && "" !== e
                ? (n = new RegExp(e, i))
                : e && (n = new RegExp(e.source, i)),
              n
            );
          }),
          (i.prototype.get_literal_regexp = function (e) {
            return RegExp(e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
          }),
          (i.prototype.peekUntilAfter = function (e) {
            var t = this.__position,
              n = this.readUntilAfter(e);
            return (this.__position = t), n;
          }),
          (i.prototype.lookBack = function (e) {
            var t = this.__position - 1;
            return (
              t >= e.length &&
              this.__input.substring(t - e.length, t).toLowerCase() === e
            );
          }),
          (e.exports.InputScanner = i);
      },
      function (e, t, n) {
        var i = n(8).InputScanner,
          a = n(3).Token,
          o = n(10).TokenStream,
          r = n(11).WhitespacePattern,
          s = { START: "TK_START", RAW: "TK_RAW", EOF: "TK_EOF" },
          l = function (e, t) {
            (this._input = new i(e)),
              (this._options = t || {}),
              (this.__tokens = null),
              (this._patterns = {}),
              (this._patterns.whitespace = new r(this._input));
          };
        (l.prototype.tokenize = function () {
          var e;
          this._input.restart(), (this.__tokens = new o()), this._reset();
          for (
            var t = new a(s.START, ""), n = null, i = [], r = new o();
            t.type !== s.EOF;

          ) {
            for (e = this._get_next_token(t, n); this._is_comment(e); )
              r.add(e), (e = this._get_next_token(t, n));
            r.isEmpty() || ((e.comments_before = r), (r = new o())),
              (e.parent = n),
              this._is_opening(e)
                ? (i.push(n), (n = e))
                : n &&
                  this._is_closing(e, n) &&
                  (((e.opened = n).closed = e), (n = i.pop()), (e.parent = n)),
              ((e.previous = t).next = e),
              this.__tokens.add(e),
              (t = e);
          }
          return this.__tokens;
        }),
          (l.prototype._is_first_token = function () {
            return this.__tokens.isEmpty();
          }),
          (l.prototype._reset = function () {}),
          (l.prototype._get_next_token = function (e, t) {
            this._readWhitespace();
            var n = this._input.read(/.+/g);
            return n
              ? this._create_token(s.RAW, n)
              : this._create_token(s.EOF, "");
          }),
          (l.prototype._is_comment = function (e) {
            return !1;
          }),
          (l.prototype._is_opening = function (e) {
            return !1;
          }),
          (l.prototype._is_closing = function (e, t) {
            return !1;
          }),
          (l.prototype._create_token = function (e, t) {
            return new a(
              e,
              t,
              this._patterns.whitespace.newline_count,
              this._patterns.whitespace.whitespace_before_token
            );
          }),
          (l.prototype._readWhitespace = function () {
            return this._patterns.whitespace.read();
          }),
          (e.exports.Tokenizer = l),
          (e.exports.TOKEN = s);
      },
      function (e, t, n) {
        function i(e) {
          (this.__tokens = []),
            (this.__tokens_length = this.__tokens.length),
            (this.__position = 0),
            (this.__parent_token = e);
        }
        (i.prototype.restart = function () {
          this.__position = 0;
        }),
          (i.prototype.isEmpty = function () {
            return 0 === this.__tokens_length;
          }),
          (i.prototype.hasNext = function () {
            return this.__position < this.__tokens_length;
          }),
          (i.prototype.next = function () {
            var e = null;
            return (
              this.hasNext() &&
                ((e = this.__tokens[this.__position]), (this.__position += 1)),
              e
            );
          }),
          (i.prototype.peek = function (e) {
            var t = null;
            return (
              (e = e || 0),
              0 <= (e += this.__position) &&
                e < this.__tokens_length &&
                (t = this.__tokens[e]),
              t
            );
          }),
          (i.prototype.add = function (e) {
            this.__parent_token && (e.parent = this.__parent_token),
              this.__tokens.push(e),
              (this.__tokens_length += 1);
          }),
          (e.exports.TokenStream = i);
      },
      function (e, t, n) {
        var i = n(12).Pattern;
        function r(e, t) {
          i.call(this, e, t),
            t
              ? (this._line_regexp = this._input.get_regexp(t._line_regexp))
              : this.__set_whitespace_patterns("", ""),
            (this.newline_count = 0),
            (this.whitespace_before_token = "");
        }
        ((r.prototype = new i()).__set_whitespace_patterns = function (e, t) {
          (e += "\\t "),
            (t += "\\n\\r"),
            (this._match_pattern = this._input.get_regexp(
              "[" + e + t + "]+",
              !0
            )),
            (this._newline_regexp = this._input.get_regexp(
              "\\r\\n|[" + t + "]"
            ));
        }),
          (r.prototype.read = function () {
            (this.newline_count = 0), (this.whitespace_before_token = "");
            var e = this._input.read(this._match_pattern);
            if (" " === e) this.whitespace_before_token = " ";
            else if (e) {
              var t = this.__split(this._newline_regexp, e);
              (this.newline_count = t.length - 1),
                (this.whitespace_before_token = t[this.newline_count]);
            }
            return e;
          }),
          (r.prototype.matching = function (e, t) {
            var n = this._create();
            return n.__set_whitespace_patterns(e, t), n._update(), n;
          }),
          (r.prototype._create = function () {
            return new r(this._input, this);
          }),
          (r.prototype.__split = function (e, t) {
            for (var n = (e.lastIndex = 0), i = [], r = e.exec(t); r; )
              i.push(t.substring(n, r.index)),
                (n = r.index + r[0].length),
                (r = e.exec(t));
            return (
              n < t.length ? i.push(t.substring(n, t.length)) : i.push(""), i
            );
          }),
          (e.exports.WhitespacePattern = r);
      },
      function (e, t, n) {
        function i(e, t) {
          (this._input = e),
            (this._starting_pattern = null),
            (this._match_pattern = null),
            (this._until_pattern = null),
            (this._until_after = !1),
            t &&
              ((this._starting_pattern = this._input.get_regexp(
                t._starting_pattern,
                !0
              )),
              (this._match_pattern = this._input.get_regexp(
                t._match_pattern,
                !0
              )),
              (this._until_pattern = this._input.get_regexp(t._until_pattern)),
              (this._until_after = t._until_after));
        }
        (i.prototype.read = function () {
          var e = this._input.read(this._starting_pattern);
          return (
            (this._starting_pattern && !e) ||
              (e += this._input.read(
                this._match_pattern,
                this._until_pattern,
                this._until_after
              )),
            e
          );
        }),
          (i.prototype.read_match = function () {
            return this._input.match(this._match_pattern);
          }),
          (i.prototype.until_after = function (e) {
            var t = this._create();
            return (
              (t._until_after = !0),
              (t._until_pattern = this._input.get_regexp(e)),
              t._update(),
              t
            );
          }),
          (i.prototype.until = function (e) {
            var t = this._create();
            return (
              (t._until_after = !1),
              (t._until_pattern = this._input.get_regexp(e)),
              t._update(),
              t
            );
          }),
          (i.prototype.starting_with = function (e) {
            var t = this._create();
            return (
              (t._starting_pattern = this._input.get_regexp(e, !0)),
              t._update(),
              t
            );
          }),
          (i.prototype.matching = function (e) {
            var t = this._create();
            return (
              (t._match_pattern = this._input.get_regexp(e, !0)), t._update(), t
            );
          }),
          (i.prototype._create = function () {
            return new i(this._input, this);
          }),
          (i.prototype._update = function () {}),
          (e.exports.Pattern = i);
      },
      function (e, t, n) {
        function i(e, t) {
          (e = "string" == typeof e ? e : e.source),
            (t = "string" == typeof t ? t : t.source),
            (this.__directives_block_pattern = new RegExp(
              e + / beautify( \w+[:]\w+)+ /.source + t,
              "g"
            )),
            (this.__directive_pattern = / (\w+)[:](\w+)/g),
            (this.__directives_end_ignore_pattern = new RegExp(
              e + /\sbeautify\signore:end\s/.source + t,
              "g"
            ));
        }
        (i.prototype.get_directives = function (e) {
          if (!e.match(this.__directives_block_pattern)) return null;
          var t = {};
          this.__directive_pattern.lastIndex = 0;
          for (var n = this.__directive_pattern.exec(e); n; )
            (t[n[1]] = n[2]), (n = this.__directive_pattern.exec(e));
          return t;
        }),
          (i.prototype.readIgnored = function (e) {
            return e.readUntilAfter(this.__directives_end_ignore_pattern);
          }),
          (e.exports.Directives = i);
      },
      function (e, t, n) {
        var i = n(12).Pattern,
          r = { django: !1, erb: !1, handlebars: !1, php: !1 };
        function a(e, t) {
          i.call(this, e, t),
            (this.__template_pattern = null),
            (this._disabled = Object.assign({}, r)),
            (this._excluded = Object.assign({}, r)),
            t &&
              ((this.__template_pattern = this._input.get_regexp(
                t.__template_pattern
              )),
              (this._excluded = Object.assign(this._excluded, t._excluded)),
              (this._disabled = Object.assign(this._disabled, t._disabled)));
          var n = new i(e);
          this.__patterns = {
            handlebars_comment: n.starting_with(/{{!--/).until_after(/--}}/),
            handlebars: n.starting_with(/{{/).until_after(/}}/),
            php: n.starting_with(/<\?(?:[=]|php)/).until_after(/\?>/),
            erb: n.starting_with(/<%[^%]/).until_after(/[^%]%>/),
            django: n.starting_with(/{%/).until_after(/%}/),
            django_value: n.starting_with(/{{/).until_after(/}}/),
            django_comment: n.starting_with(/{#/).until_after(/#}/),
          };
        }
        ((a.prototype = new i())._create = function () {
          return new a(this._input, this);
        }),
          (a.prototype._update = function () {
            this.__set_templated_pattern();
          }),
          (a.prototype.disable = function (e) {
            var t = this._create();
            return (t._disabled[e] = !0), t._update(), t;
          }),
          (a.prototype.exclude = function (e) {
            var t = this._create();
            return (t._excluded[e] = !0), t._update(), t;
          }),
          (a.prototype.read = function () {
            var e = "";
            e = this._match_pattern
              ? this._input.read(this._starting_pattern)
              : this._input.read(
                  this._starting_pattern,
                  this.__template_pattern
                );
            for (var t = this._read_template(); t; )
              this._match_pattern
                ? (t += this._input.read(this._match_pattern))
                : (t += this._input.readUntil(this.__template_pattern)),
                (e += t),
                (t = this._read_template());
            return (
              this._until_after &&
                (e += this._input.readUntilAfter(this._until_pattern)),
              e
            );
          }),
          (a.prototype.__set_templated_pattern = function () {
            var e = [];
            this._disabled.php ||
              e.push(this.__patterns.php._starting_pattern.source),
              this._disabled.handlebars ||
                e.push(this.__patterns.handlebars._starting_pattern.source),
              this._disabled.erb ||
                e.push(this.__patterns.erb._starting_pattern.source),
              this._disabled.django ||
                (e.push(this.__patterns.django._starting_pattern.source),
                e.push(this.__patterns.django_value._starting_pattern.source),
                e.push(
                  this.__patterns.django_comment._starting_pattern.source
                )),
              this._until_pattern && e.push(this._until_pattern.source),
              (this.__template_pattern = this._input.get_regexp(
                "(?:" + e.join("|") + ")"
              ));
          }),
          (a.prototype._read_template = function () {
            var e = "",
              t = this._input.peek();
            if ("<" === t) {
              var n = this._input.peek(1);
              this._disabled.php ||
                this._excluded.php ||
                "?" !== n ||
                (e = e || this.__patterns.php.read()),
                this._disabled.erb ||
                  this._excluded.erb ||
                  "%" !== n ||
                  (e = e || this.__patterns.erb.read());
            } else
              "{" === t &&
                (this._disabled.handlebars ||
                  this._excluded.handlebars ||
                  (e =
                    (e = e || this.__patterns.handlebars_comment.read()) ||
                    this.__patterns.handlebars.read()),
                this._disabled.django ||
                  (this._excluded.django ||
                    this._excluded.handlebars ||
                    (e = e || this.__patterns.django_value.read()),
                  this._excluded.django ||
                    (e =
                      (e = e || this.__patterns.django_comment.read()) ||
                      this.__patterns.django.read())));
            return e;
          }),
          (e.exports.TemplatablePattern = a);
      },
      ,
      ,
      ,
      function (e, t, n) {
        var r = n(19).Beautifier,
          i = n(20).Options;
        (e.exports = function (e, t, n, i) {
          return new r(e, t, n, i).beautify();
        }),
          (e.exports.defaultOptions = function () {
            return new i();
          });
      },
      function (e, t, n) {
        var a = n(20).Options,
          i = n(2).Output,
          c = n(21).Tokenizer,
          h = n(21).TOKEN,
          d = /\r\n|[\r\n]/,
          u = /\r\n|[\r\n]/g,
          p = function (e, t) {
            (this.indent_level = 0),
              (this.alignment_size = 0),
              (this.max_preserve_newlines = e.max_preserve_newlines),
              (this.preserve_newlines = e.preserve_newlines),
              (this._output = new i(e, t));
          };
        (p.prototype.current_line_has_match = function (e) {
          return this._output.current_line.has_match(e);
        }),
          (p.prototype.set_space_before_token = function (e, t) {
            (this._output.space_before_token = e),
              (this._output.non_breaking_space = t);
          }),
          (p.prototype.set_wrap_point = function () {
            this._output.set_indent(this.indent_level, this.alignment_size),
              this._output.set_wrap_point();
          }),
          (p.prototype.add_raw_token = function (e) {
            this._output.add_raw_token(e);
          }),
          (p.prototype.print_preserved_newlines = function (e) {
            var t = 0;
            e.type !== h.TEXT &&
              e.previous.type !== h.TEXT &&
              (t = e.newlines ? 1 : 0),
              this.preserve_newlines &&
                (t =
                  e.newlines < this.max_preserve_newlines + 1
                    ? e.newlines
                    : this.max_preserve_newlines + 1);
            for (var n = 0; n < t; n++) this.print_newline(0 < n);
            return 0 !== t;
          }),
          (p.prototype.traverse_whitespace = function (e) {
            return (
              !(!e.whitespace_before && !e.newlines) &&
              (this.print_preserved_newlines(e) ||
                (this._output.space_before_token = !0),
              !0)
            );
          }),
          (p.prototype.previous_token_wrapped = function () {
            return this._output.previous_token_wrapped;
          }),
          (p.prototype.print_newline = function (e) {
            this._output.add_new_line(e);
          }),
          (p.prototype.print_token = function (e) {
            e.text &&
              (this._output.set_indent(this.indent_level, this.alignment_size),
              this._output.add_token(e.text));
          }),
          (p.prototype.indent = function () {
            this.indent_level++;
          }),
          (p.prototype.get_full_indent = function (e) {
            return (e = this.indent_level + (e || 0)) < 1
              ? ""
              : this._output.get_indent_string(e);
          });
        var o = function (e, t) {
          var n = null,
            i = null;
          return t.closed
            ? ("script" === e
                ? (n = "text/javascript")
                : "style" === e && (n = "text/css"),
              -1 <
              (n =
                (function (e) {
                  for (
                    var t = null, n = e.next;
                    n.type !== h.EOF && e.closed !== n;

                  ) {
                    if (n.type === h.ATTRIBUTE && "type" === n.text) {
                      n.next &&
                        n.next.type === h.EQUALS &&
                        n.next.next &&
                        n.next.next.type === h.VALUE &&
                        (t = n.next.next.text);
                      break;
                    }
                    n = n.next;
                  }
                  return t;
                })(t) || n).search("text/css")
                ? (i = "css")
                : -1 <
                  n.search(
                    /(text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect)/
                  )
                ? (i = "javascript")
                : -1 < n.search(/(text|application|dojo)\/(x-)?(html)/)
                ? (i = "html")
                : -1 < n.search(/test\/null/) && (i = "null"),
              i)
            : null;
        };
        function s(e, t) {
          return -1 !== t.indexOf(e);
        }
        function r(e, t, n) {
          (this.parent = e || null),
            (this.tag = t ? t.tag_name : ""),
            (this.indent_level = n || 0),
            (this.parser_token = t || null);
        }
        function m(e) {
          (this._printer = e), (this._current_frame = null);
        }
        function f(e, t, n, i) {
          (this._source_text = e || ""),
            (t = t || {}),
            (this._js_beautify = n),
            (this._css_beautify = i),
            (this._tag_stack = null);
          var r = new a(t, "html");
          (this._options = r),
            (this._is_wrap_attributes_force =
              "force" ===
              this._options.wrap_attributes.substr(0, "force".length)),
            (this._is_wrap_attributes_force_expand_multiline =
              "force-expand-multiline" === this._options.wrap_attributes),
            (this._is_wrap_attributes_force_aligned =
              "force-aligned" === this._options.wrap_attributes),
            (this._is_wrap_attributes_aligned_multiple =
              "aligned-multiple" === this._options.wrap_attributes),
            (this._is_wrap_attributes_preserve =
              "preserve" ===
              this._options.wrap_attributes.substr(0, "preserve".length)),
            (this._is_wrap_attributes_preserve_aligned =
              "preserve-aligned" === this._options.wrap_attributes);
        }
        (m.prototype.get_parser_token = function () {
          return this._current_frame ? this._current_frame.parser_token : null;
        }),
          (m.prototype.record_tag = function (e) {
            var t = new r(this._current_frame, e, this._printer.indent_level);
            this._current_frame = t;
          }),
          (m.prototype._try_pop_frame = function (e) {
            var t = null;
            return (
              e &&
                ((t = e.parser_token),
                (this._printer.indent_level = e.indent_level),
                (this._current_frame = e.parent)),
              t
            );
          }),
          (m.prototype._get_frame = function (e, t) {
            for (var n = this._current_frame; n && -1 === e.indexOf(n.tag); ) {
              if (t && -1 !== t.indexOf(n.tag)) {
                n = null;
                break;
              }
              n = n.parent;
            }
            return n;
          }),
          (m.prototype.try_pop = function (e, t) {
            var n = this._get_frame([e], t);
            return this._try_pop_frame(n);
          }),
          (m.prototype.indent_to_tag = function (e) {
            var t = this._get_frame(e);
            t && (this._printer.indent_level = t.indent_level);
          }),
          (f.prototype.beautify = function () {
            if (this._options.disabled) return this._source_text;
            var e = this._source_text,
              t = this._options.eol;
            "auto" === this._options.eol &&
              ((t = "\n"), e && d.test(e) && (t = e.match(d)[0]));
            var n = (e = e.replace(u, "\n")).match(/^[\t ]*/)[0],
              i = { text: "", type: "" },
              r = new g(),
              a = new p(this._options, n),
              o = new c(e, this._options).tokenize();
            this._tag_stack = new m(a);
            for (var s = null, l = o.next(); l.type !== h.EOF; )
              l.type === h.TAG_OPEN || l.type === h.COMMENT
                ? (r = s = this._handle_tag_open(a, l, r, i))
                : l.type === h.ATTRIBUTE ||
                  l.type === h.EQUALS ||
                  l.type === h.VALUE ||
                  (l.type === h.TEXT && !r.tag_complete)
                ? (s = this._handle_inside_tag(a, l, r, o))
                : l.type === h.TAG_CLOSE
                ? (s = this._handle_tag_close(a, l, r))
                : l.type === h.TEXT
                ? (s = this._handle_text(a, l, r))
                : a.add_raw_token(l),
                (i = s),
                (l = o.next());
            return a._output.get_code(t);
          }),
          (f.prototype._handle_tag_close = function (e, t, n) {
            var i = { text: t.text, type: t.type };
            return (
              (e.alignment_size = 0),
              (n.tag_complete = !0),
              e.set_space_before_token(
                t.newlines || "" !== t.whitespace_before,
                !0
              ),
              n.is_unformatted
                ? e.add_raw_token(t)
                : ("<" === n.tag_start_char &&
                    (e.set_space_before_token("/" === t.text[0], !0),
                    this._is_wrap_attributes_force_expand_multiline &&
                      n.has_wrapped_attrs &&
                      e.print_newline(!1)),
                  e.print_token(t)),
              !n.indent_content ||
                n.is_unformatted ||
                n.is_content_unformatted ||
                (e.indent(), (n.indent_content = !1)),
              n.is_inline_element ||
                n.is_unformatted ||
                n.is_content_unformatted ||
                e.set_wrap_point(),
              i
            );
          }),
          (f.prototype._handle_inside_tag = function (e, t, n, i) {
            var r = n.has_wrapped_attrs,
              a = { text: t.text, type: t.type };
            if (
              (e.set_space_before_token(
                t.newlines || "" !== t.whitespace_before,
                !0
              ),
              n.is_unformatted)
            )
              e.add_raw_token(t);
            else if ("{" === n.tag_start_char && t.type === h.TEXT)
              e.print_preserved_newlines(t)
                ? ((t.newlines = 0), e.add_raw_token(t))
                : e.print_token(t);
            else {
              if (
                (t.type === h.ATTRIBUTE
                  ? (e.set_space_before_token(!0), (n.attr_count += 1))
                  : t.type === h.EQUALS
                  ? e.set_space_before_token(!1)
                  : t.type === h.VALUE &&
                    t.previous.type === h.EQUALS &&
                    e.set_space_before_token(!1),
                t.type === h.ATTRIBUTE &&
                  "<" === n.tag_start_char &&
                  ((this._is_wrap_attributes_preserve ||
                    this._is_wrap_attributes_preserve_aligned) &&
                    (e.traverse_whitespace(t), (r = r || 0 !== t.newlines)),
                  this._is_wrap_attributes_force))
              ) {
                var o = 1 < n.attr_count;
                if (
                  this._is_wrap_attributes_force_expand_multiline &&
                  1 === n.attr_count
                ) {
                  var s,
                    l = !0,
                    c = 0;
                  do {
                    if ((s = i.peek(c)).type === h.ATTRIBUTE) {
                      l = !1;
                      break;
                    }
                    c += 1;
                  } while (c < 4 && s.type !== h.EOF && s.type !== h.TAG_CLOSE);
                  o = !l;
                }
                o && (e.print_newline(!1), (r = !0));
              }
              e.print_token(t),
                (r = r || e.previous_token_wrapped()),
                (n.has_wrapped_attrs = r);
            }
            return a;
          }),
          (f.prototype._handle_text = function (e, t, n) {
            var i = { text: t.text, type: "TK_CONTENT" };
            return (
              n.custom_beautifier_name
                ? this._print_custom_beatifier_text(e, t, n)
                : n.is_unformatted || n.is_content_unformatted
                ? e.add_raw_token(t)
                : (e.traverse_whitespace(t), e.print_token(t)),
              i
            );
          }),
          (f.prototype._print_custom_beatifier_text = function (e, t, n) {
            var i = this;
            if ("" !== t.text) {
              e.print_newline(!1);
              var r,
                a = t.text,
                o = 1;
              "javascript" === n.custom_beautifier_name &&
              "function" == typeof this._js_beautify
                ? (r = this._js_beautify)
                : "css" === n.custom_beautifier_name &&
                  "function" == typeof this._css_beautify
                ? (r = this._css_beautify)
                : "html" === n.custom_beautifier_name &&
                  (r = function (e, t) {
                    return new f(
                      e,
                      t,
                      i._js_beautify,
                      i._css_beautify
                    ).beautify();
                  }),
                "keep" === this._options.indent_scripts
                  ? (o = 0)
                  : "separate" === this._options.indent_scripts &&
                    (o = -e.indent_level);
              var s = e.get_full_indent(o);
              if (((a = a.replace(/\n[ \t]*$/, "")), r)) {
                var l = function () {
                  this.eol = "\n";
                };
                (l.prototype = this._options.raw_options),
                  (a = r(s + a, new l()));
              } else {
                var c = t.whitespace_before;
                c && (a = a.replace(new RegExp("\n(" + c + ")?", "g"), "\n")),
                  (a = s + a.replace(/\n/g, "\n" + s));
              }
              a &&
                ((t.text = a),
                (t.whitespace_before = ""),
                (t.newlines = 0),
                e.add_raw_token(t),
                e.print_newline(!0));
            }
          }),
          (f.prototype._handle_tag_open = function (e, t, n, i) {
            var r = this._get_tag_open_token(t);
            return (
              (n.is_unformatted || n.is_content_unformatted) &&
              t.type === h.TAG_OPEN &&
              0 === t.text.indexOf("</")
                ? e.add_raw_token(t)
                : (e.traverse_whitespace(t),
                  this._set_tag_position(e, t, r, n, i),
                  r.is_inline_element || e.set_wrap_point(),
                  e.print_token(t)),
              (this._is_wrap_attributes_force_aligned ||
                this._is_wrap_attributes_aligned_multiple ||
                this._is_wrap_attributes_preserve_aligned) &&
                (r.alignment_size = t.text.length + 1),
              r.tag_complete ||
                r.is_unformatted ||
                (e.alignment_size = r.alignment_size),
              r
            );
          });
        var g = function (e, t) {
          var n;
          ((this.parent = e || null),
          (this.text = ""),
          (this.type = "TK_TAG_OPEN"),
          (this.tag_name = ""),
          (this.is_inline_element = !1),
          (this.is_unformatted = !1),
          (this.is_content_unformatted = !1),
          (this.is_empty_element = !1),
          (this.is_start_tag = !1),
          (this.is_end_tag = !1),
          (this.indent_content = !1),
          (this.multiline_content = !1),
          (this.custom_beautifier_name = null),
          (this.start_tag_token = null),
          (this.attr_count = 0),
          (this.has_wrapped_attrs = !1),
          (this.alignment_size = 0),
          (this.tag_complete = !1),
          (this.tag_start_char = ""),
          (this.tag_check = ""),
          t)
            ? ((this.tag_start_char = t.text[0]),
              (this.text = t.text),
              (n =
                "<" === this.tag_start_char
                  ? t.text.match(/^<([^\s>]*)/)
                  : t.text.match(/^{{[#\^]?([^\s}]+)/)),
              (this.tag_check = n ? n[1] : ""),
              (this.tag_check = this.tag_check.toLowerCase()),
              t.type === h.COMMENT && (this.tag_complete = !0),
              (this.is_start_tag = "/" !== this.tag_check.charAt(0)),
              (this.tag_name = this.is_start_tag
                ? this.tag_check
                : this.tag_check.substr(1)),
              (this.is_end_tag =
                !this.is_start_tag || (t.closed && "/>" === t.closed.text)),
              (this.is_end_tag =
                this.is_end_tag ||
                ("{" === this.tag_start_char &&
                  (this.text.length < 3 ||
                    /[^#\^]/.test(this.text.charAt(2))))))
            : (this.tag_complete = !0);
        };
        (f.prototype._get_tag_open_token = function (e) {
          var t = new g(this._tag_stack.get_parser_token(), e);
          return (
            (t.alignment_size = this._options.wrap_attributes_indent_size),
            (t.is_end_tag =
              t.is_end_tag || s(t.tag_check, this._options.void_elements)),
            (t.is_empty_element =
              t.tag_complete || (t.is_start_tag && t.is_end_tag)),
            (t.is_unformatted =
              !t.tag_complete && s(t.tag_check, this._options.unformatted)),
            (t.is_content_unformatted =
              !t.is_empty_element &&
              s(t.tag_check, this._options.content_unformatted)),
            (t.is_inline_element =
              s(t.tag_name, this._options.inline) || "{" === t.tag_start_char),
            t
          );
        }),
          (f.prototype._set_tag_position = function (e, t, n, i, r) {
            if (
              (n.is_empty_element ||
                (n.is_end_tag
                  ? (n.start_tag_token = this._tag_stack.try_pop(n.tag_name))
                  : (this._do_optional_end_element(n) &&
                      (n.is_inline_element ||
                        (n.parent && (n.parent.multiline_content = !0),
                        e.print_newline(!1))),
                    this._tag_stack.record_tag(n),
                    ("script" !== n.tag_name && "style" !== n.tag_name) ||
                      n.is_unformatted ||
                      n.is_content_unformatted ||
                      (n.custom_beautifier_name = o(n.tag_check, t)))),
              s(n.tag_check, this._options.extra_liners) &&
                (e.print_newline(!1),
                e._output.just_added_blankline() || e.print_newline(!0)),
              n.is_empty_element)
            ) {
              if ("{" === n.tag_start_char && "else" === n.tag_check)
                this._tag_stack.indent_to_tag(["if", "unless", "each"]),
                  (n.indent_content = !0),
                  e.current_line_has_match(/{{#if/) || e.print_newline(!1);
              ("!--" === n.tag_name &&
                r.type === h.TAG_CLOSE &&
                i.is_end_tag &&
                -1 === n.text.indexOf("\n")) ||
                n.is_inline_element ||
                n.is_unformatted ||
                e.print_newline(!1);
            } else
              n.is_unformatted || n.is_content_unformatted
                ? n.is_inline_element || n.is_unformatted || e.print_newline(!1)
                : n.is_end_tag
                ? ((n.start_tag_token && n.start_tag_token.multiline_content) ||
                    !(
                      n.is_inline_element ||
                      i.is_inline_element ||
                      (r.type === h.TAG_CLOSE && n.start_tag_token === i) ||
                      "TK_CONTENT" === r.type
                    )) &&
                  e.print_newline(!1)
                : ((n.indent_content = !n.custom_beautifier_name),
                  "<" === n.tag_start_char &&
                    ("html" === n.tag_name
                      ? (n.indent_content = this._options.indent_inner_html)
                      : "head" === n.tag_name
                      ? (n.indent_content =
                          this._options.indent_head_inner_html)
                      : "body" === n.tag_name &&
                        (n.indent_content =
                          this._options.indent_body_inner_html)),
                  n.is_inline_element ||
                    "TK_CONTENT" === r.type ||
                    (n.parent && (n.parent.multiline_content = !0),
                    e.print_newline(!1)));
          }),
          (f.prototype._do_optional_end_element = function (e) {
            var t = null;
            if (!e.is_empty_element && e.is_start_tag && e.parent)
              return (
                "body" === e.tag_name
                  ? (t = t || this._tag_stack.try_pop("head"))
                  : "li" === e.tag_name
                  ? (t = t || this._tag_stack.try_pop("li", ["ol", "ul"]))
                  : "dd" === e.tag_name || "dt" === e.tag_name
                  ? (t =
                      (t = t || this._tag_stack.try_pop("dt", ["dl"])) ||
                      this._tag_stack.try_pop("dd", ["dl"]))
                  : "rp" === e.tag_name || "rt" === e.tag_name
                  ? (t =
                      (t =
                        t || this._tag_stack.try_pop("rt", ["ruby", "rtc"])) ||
                      this._tag_stack.try_pop("rp", ["ruby", "rtc"]))
                  : "optgroup" === e.tag_name
                  ? (t = t || this._tag_stack.try_pop("optgroup", ["select"]))
                  : "option" === e.tag_name
                  ? (t =
                      t ||
                      this._tag_stack.try_pop("option", [
                        "select",
                        "datalist",
                        "optgroup",
                      ]))
                  : "colgroup" === e.tag_name
                  ? (t = t || this._tag_stack.try_pop("caption", ["table"]))
                  : "thead" === e.tag_name
                  ? (t =
                      (t =
                        t || this._tag_stack.try_pop("caption", ["table"])) ||
                      this._tag_stack.try_pop("colgroup", ["table"]))
                  : "tbody" === e.tag_name || "tfoot" === e.tag_name
                  ? (t =
                      (t =
                        (t =
                          (t =
                            t ||
                            this._tag_stack.try_pop("caption", ["table"])) ||
                          this._tag_stack.try_pop("colgroup", ["table"])) ||
                        this._tag_stack.try_pop("thead", ["table"])) ||
                      this._tag_stack.try_pop("tbody", ["table"]))
                  : "tr" === e.tag_name
                  ? (t =
                      (t =
                        (t =
                          t || this._tag_stack.try_pop("caption", ["table"])) ||
                        this._tag_stack.try_pop("colgroup", ["table"])) ||
                      this._tag_stack.try_pop("tr", [
                        "table",
                        "thead",
                        "tbody",
                        "tfoot",
                      ]))
                  : ("th" !== e.tag_name && "td" !== e.tag_name) ||
                    (t =
                      (t = t || this._tag_stack.try_pop("td", ["tr"])) ||
                      this._tag_stack.try_pop("th", ["tr"])),
                (e.parent = this._tag_stack.get_parser_token()),
                t
              );
          }),
          (e.exports.Beautifier = f);
      },
      function (e, t, n) {
        var i = n(6).Options;
        function r(e) {
          i.call(this, e, "html"),
            (this.indent_inner_html = this._get_boolean("indent_inner_html")),
            (this.indent_body_inner_html = this._get_boolean(
              "indent_body_inner_html",
              !0
            )),
            (this.indent_head_inner_html = this._get_boolean(
              "indent_head_inner_html",
              !0
            )),
            (this.indent_handlebars = this._get_boolean(
              "indent_handlebars",
              !0
            )),
            (this.wrap_attributes = this._get_selection("wrap_attributes", [
              "auto",
              "force",
              "force-aligned",
              "force-expand-multiline",
              "aligned-multiple",
              "preserve",
              "preserve-aligned",
            ])),
            (this.wrap_attributes_indent_size = this._get_number(
              "wrap_attributes_indent_size",
              this.indent_size
            )),
            (this.extra_liners = this._get_array("extra_liners", [
              "head",
              "body",
              "/html",
            ])),
            (this.inline = this._get_array("inline", [
              "a",
              "abbr",
              "area",
              "audio",
              "b",
              "bdi",
              "bdo",
              "br",
              "button",
              "canvas",
              "cite",
              "code",
              "data",
              "datalist",
              "del",
              "dfn",
              "em",
              "embed",
              "i",
              "iframe",
              "img",
              "input",
              "ins",
              "kbd",
              "keygen",
              "label",
              "map",
              "mark",
              "math",
              "meter",
              "noscript",
              "object",
              "output",
              "progress",
              "q",
              "ruby",
              "s",
              "samp",
              "select",
              "small",
              "span",
              "strong",
              "sub",
              "sup",
              "svg",
              "template",
              "textarea",
              "time",
              "u",
              "var",
              "video",
              "wbr",
              "text",
              "acronym",
              "big",
              "strike",
              "tt",
            ])),
            (this.void_elements = this._get_array("void_elements", [
              "area",
              "base",
              "br",
              "col",
              "embed",
              "hr",
              "img",
              "input",
              "keygen",
              "link",
              "menuitem",
              "meta",
              "param",
              "source",
              "track",
              "wbr",
              "!doctype",
              "?xml",
              "basefont",
              "isindex",
            ])),
            (this.unformatted = this._get_array("unformatted", [])),
            (this.content_unformatted = this._get_array("content_unformatted", [
              "pre",
              "textarea",
            ])),
            (this.unformatted_content_delimiter = this._get_characters(
              "unformatted_content_delimiter"
            )),
            (this.indent_scripts = this._get_selection("indent_scripts", [
              "normal",
              "keep",
              "separate",
            ]));
        }
        (r.prototype = new i()), (e.exports.Options = r);
      },
      function (e, t, n) {
        var a = n(9).Tokenizer,
          i = n(9).TOKEN,
          r = n(13).Directives,
          o = n(14).TemplatablePattern,
          s = n(12).Pattern,
          l = {
            TAG_OPEN: "TK_TAG_OPEN",
            TAG_CLOSE: "TK_TAG_CLOSE",
            ATTRIBUTE: "TK_ATTRIBUTE",
            EQUALS: "TK_EQUALS",
            VALUE: "TK_VALUE",
            COMMENT: "TK_COMMENT",
            TEXT: "TK_TEXT",
            UNKNOWN: "TK_UNKNOWN",
            START: i.START,
            RAW: i.RAW,
            EOF: i.EOF,
          },
          c = new r(/<\!--/, /-->/),
          h = function (e, t) {
            a.call(this, e, t), (this._current_tag_name = "");
            var n = new o(this._input),
              i = new s(this._input);
            if (
              ((this.__patterns = {
                word: n.until(/[\n\r\t <]/),
                single_quote: n.until_after(/'/),
                double_quote: n.until_after(/"/),
                attribute: n.until(/[\n\r\t =\/>]/),
                element_name: n.until(/[\n\r\t >\/]/),
                handlebars_comment: i
                  .starting_with(/{{!--/)
                  .until_after(/--}}/),
                handlebars: i.starting_with(/{{/).until_after(/}}/),
                handlebars_open: i.until(/[\n\r\t }]/),
                handlebars_raw_close: i.until(/}}/),
                comment: i.starting_with(/<!--/).until_after(/-->/),
                cdata: i.starting_with(/<!\[cdata\[/).until_after(/]]>/),
                conditional_comment: i.starting_with(/<!\[/).until_after(/]>/),
                processing: i.starting_with(/<\?/).until_after(/\?>/),
              }),
              this._options.indent_handlebars &&
                (this.__patterns.word =
                  this.__patterns.word.exclude("handlebars")),
              (this._unformatted_content_delimiter = null),
              this._options.unformatted_content_delimiter)
            ) {
              var r = this._input.get_literal_regexp(
                this._options.unformatted_content_delimiter
              );
              this.__patterns.unformatted_content_delimiter = i
                .matching(r)
                .until_after(r);
            }
          };
        ((h.prototype = new a())._is_comment = function (e) {
          return !1;
        }),
          (h.prototype._is_opening = function (e) {
            return e.type === l.TAG_OPEN;
          }),
          (h.prototype._is_closing = function (e, t) {
            return (
              e.type === l.TAG_CLOSE &&
              t &&
              (((">" === e.text || "/>" === e.text) && "<" === t.text[0]) ||
                ("}}" === e.text && "{" === t.text[0] && "{" === t.text[1]))
            );
          }),
          (h.prototype._reset = function () {
            this._current_tag_name = "";
          }),
          (h.prototype._get_next_token = function (e, t) {
            var n = null;
            this._readWhitespace();
            var i = this._input.peek();
            return null === i
              ? this._create_token(l.EOF, "")
              : (n =
                  (n =
                    (n =
                      (n =
                        (n =
                          (n =
                            (n =
                              (n = n || this._read_open_handlebars(i, t)) ||
                              this._read_attribute(i, e, t)) ||
                            this._read_raw_content(e, t)) ||
                          this._read_close(i, t)) ||
                        this._read_content_word(i)) || this._read_comment(i)) ||
                    this._read_open(i, t)) ||
                  this._create_token(l.UNKNOWN, this._input.next()));
          }),
          (h.prototype._read_comment = function (e) {
            var t = null,
              n = null,
              i = null;
            if ("<" === e) {
              var r = this._input.peek(1);
              "<" !== e ||
                ("!" !== r && "?" !== r) ||
                ((n = this.__patterns.comment.read())
                  ? (i = c.get_directives(n)) &&
                    "start" === i.ignore &&
                    (n += c.readIgnored(this._input))
                  : (n =
                      (n =
                        (n = this.__patterns.cdata.read()) ||
                        this.__patterns.conditional_comment.read()) ||
                      this.__patterns.processing.read())),
                n && ((t = this._create_token(l.COMMENT, n)).directives = i);
            }
            return t;
          }),
          (h.prototype._read_open = function (e, t) {
            var n = null,
              i = null;
            return (
              t ||
                ("<" === e &&
                  ((n = this._input.next()),
                  "/" === this._input.peek() && (n += this._input.next()),
                  (n += this.__patterns.element_name.read()),
                  (i = this._create_token(l.TAG_OPEN, n)))),
              i
            );
          }),
          (h.prototype._read_open_handlebars = function (e, t) {
            var n = null,
              i = null;
            return (
              t ||
                (this._options.indent_handlebars &&
                  "{" === e &&
                  "{" === this._input.peek(1) &&
                  (i =
                    "!" === this._input.peek(2)
                      ? ((n =
                          (n = this.__patterns.handlebars_comment.read()) ||
                          this.__patterns.handlebars.read()),
                        this._create_token(l.COMMENT, n))
                      : ((n = this.__patterns.handlebars_open.read()),
                        this._create_token(l.TAG_OPEN, n)))),
              i
            );
          }),
          (h.prototype._read_close = function (e, t) {
            var n = null,
              i = null;
            return (
              t &&
                ("<" === t.text[0] &&
                (">" === e || ("/" === e && ">" === this._input.peek(1)))
                  ? ((n = this._input.next()),
                    "/" === e && (n += this._input.next()),
                    (i = this._create_token(l.TAG_CLOSE, n)))
                  : "{" === t.text[0] &&
                    "}" === e &&
                    "}" === this._input.peek(1) &&
                    (this._input.next(),
                    this._input.next(),
                    (i = this._create_token(l.TAG_CLOSE, "}}")))),
              i
            );
          }),
          (h.prototype._read_attribute = function (e, t, n) {
            var i = null,
              r = "";
            if (n && "<" === n.text[0])
              if ("=" === e)
                i = this._create_token(l.EQUALS, this._input.next());
              else if ('"' === e || "'" === e) {
                var a = this._input.next();
                (a +=
                  '"' === e
                    ? this.__patterns.double_quote.read()
                    : this.__patterns.single_quote.read()),
                  (i = this._create_token(l.VALUE, a));
              } else
                (r = this.__patterns.attribute.read()) &&
                  (i =
                    t.type === l.EQUALS
                      ? this._create_token(l.VALUE, r)
                      : this._create_token(l.ATTRIBUTE, r));
            return i;
          }),
          (h.prototype._is_content_unformatted = function (e) {
            return (
              -1 === this._options.void_elements.indexOf(e) &&
              ("script" === e ||
                "style" === e ||
                -1 !== this._options.content_unformatted.indexOf(e) ||
                -1 !== this._options.unformatted.indexOf(e))
            );
          }),
          (h.prototype._read_raw_content = function (e, t) {
            var n = "";
            if (t && "{" === t.text[0])
              n = this.__patterns.handlebars_raw_close.read();
            else if (e.type === l.TAG_CLOSE && "<" === e.opened.text[0]) {
              var i = e.opened.text.substr(1).toLowerCase();
              this._is_content_unformatted(i) &&
                (n = this._input.readUntil(
                  new RegExp("</" + i + "[\\n\\r\\t ]*?>", "ig")
                ));
            }
            return n ? this._create_token(l.TEXT, n) : null;
          }),
          (h.prototype._read_content_word = function (e) {
            var t = "";
            if (
              (this._options.unformatted_content_delimiter &&
                e === this._options.unformatted_content_delimiter[0] &&
                (t = this.__patterns.unformatted_content_delimiter.read()),
              t || (t = this.__patterns.word.read()),
              t)
            )
              return this._create_token(l.TEXT, t);
          }),
          (e.exports.Tokenizer = h),
          (e.exports.TOKEN = l);
      },
    ]);
    if ("function" == typeof define && define.amd)
      define("vscode-html-languageservice/beautify/beautify-html", [
        "require",
        "./beautify",
        "./beautify-css",
      ], function (e) {
        var n = e("./beautify"),
          i = e("./beautify-css");
        return {
          html_beautify: function (e, t) {
            return r(e, t, n.js_beautify, i.css_beautify);
          },
        };
      });
    else if ("undefined" != typeof exports) {
      var n = require("./beautify.js"),
        i = require("./beautify-css.js");
      exports.html_beautify = function (e, t) {
        return r(e, t, n.js_beautify, i.css_beautify);
      };
    } else
      "undefined" != typeof window
        ? (window.html_beautify = function (e, t) {
            return r(e, t, window.js_beautify, window.css_beautify);
          })
        : "undefined" != typeof global &&
          (global.html_beautify = function (e, t) {
            return r(e, t, global.js_beautify, global.css_beautify);
          });
  })(),
  (function (e) {
    if ("object" == typeof module && "object" == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      "function" == typeof define &&
        define.amd &&
        define(
          "vscode-html-languageservice/services/htmlFormatter",
          [
            "require",
            "exports",
            "vscode-languageserver-types",
            "../beautify/beautify-html",
            "../utils/strings",
          ],
          e
        );
  })(function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var g = e("vscode-languageserver-types"),
      _ = e("../beautify/beautify-html"),
      b = e("../utils/strings");
    function v(e, t, n) {
      if (e && e.hasOwnProperty(t)) {
        var i = e[t];
        if (null !== i) return i;
      }
      return n;
    }
    function y(e, t, n) {
      var i = v(e, t, null);
      return "string" == typeof i
        ? 0 < i.length
          ? i.split(",").map(function (e) {
              return e.trim().toLowerCase();
            })
          : []
        : n;
    }
    function w(e, t) {
      return -1 !== "\r\n".indexOf(e.charAt(t));
    }
    function T(e, t) {
      return -1 !== " \t".indexOf(e.charAt(t));
    }
    t.format = function (e, t, n) {
      var i = e.getText(),
        r = !0,
        a = 0,
        o = n.tabSize || 4;
      if (t) {
        for (var s = e.offsetAt(t.start), l = s; 0 < l && T(i, l - 1); ) l--;
        0 === l || w(i, l - 1) ? (s = l) : l < s && (s = l + 1);
        for (var c = e.offsetAt(t.end), h = c; h < i.length && T(i, h); ) h++;
        (h === i.length || w(i, h)) && (c = h),
          (t = g.Range.create(e.positionAt(s), e.positionAt(c)));
        var d = i.substring(0, s);
        if (new RegExp(/.*[<][^>]*$/).test(d))
          return [{ range: t, newText: (i = i.substring(s, c)) }];
        if (((r = c === i.length), (i = i.substring(s, c)), 0 !== s)) {
          var u = e.offsetAt(g.Position.create(t.start.line, 0));
          a = (function (e, t, n) {
            for (var i = t, r = 0, a = n.tabSize || 4; i < e.length; ) {
              var o = e.charAt(i);
              if (" " === o) r++;
              else {
                if ("\t" !== o) break;
                r += a;
              }
              i++;
            }
            return Math.floor(r / a);
          })(e.getText(), u, n);
        }
      } else
        t = g.Range.create(g.Position.create(0, 0), e.positionAt(i.length));
      var p = {
          indent_size: o,
          indent_char: n.insertSpaces ? " " : "\t",
          wrap_line_length: v(n, "wrapLineLength", 120),
          unformatted: y(n, "unformatted", void 0),
          content_unformatted: y(n, "contentUnformatted", void 0),
          indent_inner_html: v(n, "indentInnerHtml", !1),
          preserve_newlines: v(n, "preserveNewLines", !0),
          max_preserve_newlines: v(n, "maxPreserveNewLines", 32786),
          indent_handlebars: v(n, "indentHandlebars", !1),
          end_with_newline: r && v(n, "endWithNewline", !1),
          extra_liners: y(n, "extraLiners", void 0),
          wrap_attributes: v(n, "wrapAttributes", "auto"),
          wrap_attributes_indent_size: v(n, "wrapAttributesIndentSize", void 0),
          eol: "\n",
        },
        m = _.html_beautify(i.replace(/^\s+/, ""), p);
      if (0 < a) {
        var f = n.insertSpaces ? b.repeat(" ", o * a) : b.repeat("\t", a);
        (m = m.split("\n").join("\n" + f)),
          0 === t.start.character && (m = f + m);
      }
      return [{ range: t, newText: m }];
    };
  });
var __extends =
  (this && this.__extends) ||
  (function () {
    var i =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (e, t) {
          e.__proto__ = t;
        }) ||
      function (e, t) {
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
      };
    return function (e, t) {
      function n() {
        this.constructor = e;
      }
      i(e, t),
        (e.prototype =
          null === t
            ? Object.create(t)
            : ((n.prototype = t.prototype), new n()));
    };
  })();
!(function (e) {
  if ("object" == typeof module && "object" == typeof module.exports) {
    var t = e(require, exports);
    void 0 !== t && (module.exports = t);
  } else
    "function" == typeof define &&
      define.amd &&
      define("vscode-uri/index", ["require", "exports"], e);
})(function (e, t) {
  "use strict";
  var i;
  if (
    (Object.defineProperty(t, "__esModule", { value: !0 }),
    "object" == typeof process)
  )
    i = "win32" === process.platform;
  else if ("object" == typeof navigator) {
    var n = navigator.userAgent;
    i = 0 <= n.indexOf("Windows");
  }
  var a = /^\w[\w\d+.-]*$/,
    o = /^\//,
    s = /^\/\//;
  var r,
    u = "/",
    l = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,
    c = (function () {
      function n(e, t, n, i, r) {
        "object" == typeof e
          ? ((this.scheme = e.scheme || ""),
            (this.authority = e.authority || ""),
            (this.path = e.path || ""),
            (this.query = e.query || ""),
            (this.fragment = e.fragment || ""))
          : ((this.scheme = e || ""),
            (this.authority = t || ""),
            (this.path = (function (e, t) {
              switch (e) {
                case "https":
                case "http":
                case "file":
                  t ? t[0] !== u && (t = u + t) : (t = u);
              }
              return t;
            })(this.scheme, n || "")),
            (this.query = i || ""),
            (this.fragment = r || ""),
            (function (e) {
              if (e.scheme && !a.test(e.scheme))
                throw new Error(
                  "[UriError]: Scheme contains illegal characters."
                );
              if (e.path)
                if (e.authority) {
                  if (!o.test(e.path))
                    throw new Error(
                      '[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character'
                    );
                } else if (s.test(e.path))
                  throw new Error(
                    '[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")'
                  );
            })(this));
      }
      return (
        (n.isUri = function (e) {
          return (
            e instanceof n ||
            (!!e &&
              "string" == typeof e.authority &&
              "string" == typeof e.fragment &&
              "string" == typeof e.path &&
              "string" == typeof e.query &&
              "string" == typeof e.scheme)
          );
        }),
        Object.defineProperty(n.prototype, "fsPath", {
          get: function () {
            return f(this);
          },
          enumerable: !0,
          configurable: !0,
        }),
        (n.prototype.with = function (e) {
          if (!e) return this;
          var t = e.scheme,
            n = e.authority,
            i = e.path,
            r = e.query,
            a = e.fragment;
          return (
            void 0 === t ? (t = this.scheme) : null === t && (t = ""),
            void 0 === n ? (n = this.authority) : null === n && (n = ""),
            void 0 === i ? (i = this.path) : null === i && (i = ""),
            void 0 === r ? (r = this.query) : null === r && (r = ""),
            void 0 === a ? (a = this.fragment) : null === a && (a = ""),
            t === this.scheme &&
            n === this.authority &&
            i === this.path &&
            r === this.query &&
            a === this.fragment
              ? this
              : new h(t, n, i, r, a)
          );
        }),
        (n.parse = function (e) {
          var t = l.exec(e);
          return t
            ? new h(
                t[2] || "",
                decodeURIComponent(t[4] || ""),
                decodeURIComponent(t[5] || ""),
                decodeURIComponent(t[7] || ""),
                decodeURIComponent(t[9] || "")
              )
            : new h("", "", "", "", "");
        }),
        (n.file = function (e) {
          var t = "";
          if ((i && (e = e.replace(/\\/g, u)), e[0] === u && e[1] === u)) {
            var n = e.indexOf(u, 2);
            e =
              -1 === n
                ? ((t = e.substring(2)), u)
                : ((t = e.substring(2, n)), e.substring(n) || u);
          }
          return new h("file", t, e, "", "");
        }),
        (n.from = function (e) {
          return new h(e.scheme, e.authority, e.path, e.query, e.fragment);
        }),
        (n.prototype.toString = function (e) {
          return void 0 === e && (e = !1), g(this, e);
        }),
        (n.prototype.toJSON = function () {
          return this;
        }),
        (n.revive = function (e) {
          if (e) {
            if (e instanceof n) return e;
            var t = new h(e);
            return (t._fsPath = e.fsPath), (t._formatted = e.external), t;
          }
          return e;
        }),
        n
      );
    })(),
    h = (function (t) {
      function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (e._formatted = null), (e._fsPath = null), e;
      }
      return (
        __extends(e, t),
        Object.defineProperty(e.prototype, "fsPath", {
          get: function () {
            return this._fsPath || (this._fsPath = f(this)), this._fsPath;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (e.prototype.toString = function (e) {
          return (
            void 0 === e && (e = !1),
            e
              ? g(this, !0)
              : (this._formatted || (this._formatted = g(this, !1)),
                this._formatted)
          );
        }),
        (e.prototype.toJSON = function () {
          var e = { $mid: 1 };
          return (
            this._fsPath && (e.fsPath = this._fsPath),
            this._formatted && (e.external = this._formatted),
            this.path && (e.path = this.path),
            this.scheme && (e.scheme = this.scheme),
            this.authority && (e.authority = this.authority),
            this.query && (e.query = this.query),
            this.fragment && (e.fragment = this.fragment),
            e
          );
        }),
        e
      );
    })((t.default = c)),
    d =
      (((r = {})[58] = "%3A"),
      (r[47] = "%2F"),
      (r[63] = "%3F"),
      (r[35] = "%23"),
      (r[91] = "%5B"),
      (r[93] = "%5D"),
      (r[64] = "%40"),
      (r[33] = "%21"),
      (r[36] = "%24"),
      (r[38] = "%26"),
      (r[39] = "%27"),
      (r[40] = "%28"),
      (r[41] = "%29"),
      (r[42] = "%2A"),
      (r[43] = "%2B"),
      (r[44] = "%2C"),
      (r[59] = "%3B"),
      (r[61] = "%3D"),
      (r[32] = "%20"),
      r);
  function p(e, t) {
    for (var n = void 0, i = -1, r = 0; r < e.length; r++) {
      var a = e.charCodeAt(r);
      if (
        (97 <= a && a <= 122) ||
        (65 <= a && a <= 90) ||
        (48 <= a && a <= 57) ||
        45 === a ||
        46 === a ||
        95 === a ||
        126 === a ||
        (t && 47 === a)
      )
        -1 !== i && ((n += encodeURIComponent(e.substring(i, r))), (i = -1)),
          void 0 !== n && (n += e.charAt(r));
      else {
        void 0 === n && (n = e.substr(0, r));
        var o = d[a];
        void 0 !== o
          ? (-1 !== i &&
              ((n += encodeURIComponent(e.substring(i, r))), (i = -1)),
            (n += o))
          : -1 === i && (i = r);
      }
    }
    return (
      -1 !== i && (n += encodeURIComponent(e.substring(i))),
      void 0 !== n ? n : e
    );
  }
  function m(e) {
    for (var t = void 0, n = 0; n < e.length; n++) {
      var i = e.charCodeAt(n);
      35 === i || 63 === i
        ? (void 0 === t && (t = e.substr(0, n)), (t += d[i]))
        : void 0 !== t && (t += e[n]);
    }
    return void 0 !== t ? t : e;
  }
  function f(e) {
    var t;
    return (
      (t =
        e.authority && 1 < e.path.length && "file" === e.scheme
          ? "//" + e.authority + e.path
          : 47 === e.path.charCodeAt(0) &&
            ((65 <= e.path.charCodeAt(1) && e.path.charCodeAt(1) <= 90) ||
              (97 <= e.path.charCodeAt(1) && e.path.charCodeAt(1) <= 122)) &&
            58 === e.path.charCodeAt(2)
          ? e.path[1].toLowerCase() + e.path.substr(2)
          : e.path),
      i && (t = t.replace(/\//g, "\\")),
      t
    );
  }
  function g(e, t) {
    var n = t ? m : p,
      i = "",
      r = e.scheme,
      a = e.authority,
      o = e.path,
      s = e.query,
      l = e.fragment;
    if (
      (r && ((i += r), (i += ":")),
      (a || "file" === r) && ((i += u), (i += u)),
      a)
    ) {
      var c = a.indexOf("@");
      if (-1 !== c) {
        var h = a.substr(0, c);
        (a = a.substr(c + 1)),
          -1 === (c = h.indexOf(":"))
            ? (i += n(h, !1))
            : ((i += n(h.substr(0, c), !1)),
              (i += ":"),
              (i += n(h.substr(c + 1), !1))),
          (i += "@");
      }
      -1 === (c = (a = a.toLowerCase()).indexOf(":"))
        ? (i += n(a, !1))
        : ((i += n(a.substr(0, c), !1)), (i += a.substr(c)));
    }
    if (o) {
      if (3 <= o.length && 47 === o.charCodeAt(0) && 58 === o.charCodeAt(2))
        65 <= (d = o.charCodeAt(1)) &&
          d <= 90 &&
          (o = "/" + String.fromCharCode(d + 32) + ":" + o.substr(3));
      else if (2 <= o.length && 58 === o.charCodeAt(1)) {
        var d;
        65 <= (d = o.charCodeAt(0)) &&
          d <= 90 &&
          (o = String.fromCharCode(d + 32) + ":" + o.substr(2));
      }
      i += n(o, !0);
    }
    return (
      s && ((i += "?"), (i += n(s, !1))),
      l && ((i += "#"), (i += t ? l : p(l, !1))),
      i
    );
  }
}),
  define("vscode-uri", ["vscode-uri/index"], function (e) {
    return e;
  }),
  (function (e) {
    if ("object" == typeof module && "object" == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      "function" == typeof define &&
        define.amd &&
        define(
          "vscode-html-languageservice/services/htmlLinks",
          [
            "require",
            "exports",
            "../parser/htmlScanner",
            "vscode-languageserver-types",
            "../utils/strings",
            "vscode-uri",
            "../htmlLanguageTypes",
          ],
          e
        );
  })(function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var d = e("../parser/htmlScanner"),
      u = e("vscode-languageserver-types"),
      p = e("../utils/strings"),
      m = e("vscode-uri"),
      f = e("../htmlLanguageTypes");
    function g(e, t) {
      var n = e[0];
      return (
        n !== e[e.length - 1] ||
          ("'" !== n && '"' !== n) ||
          (e = e.substr(1, e.length - 2)),
        e
      );
    }
    function _(e, t, n, i, r, a) {
      var o = g(n, e.languageId);
      if (
        !(function (e, t) {
          if (!e.length) return !1;
          if ("handlebars" === t && /{{.*}}/.test(e)) return !1;
          try {
            return !!m.default.parse(e);
          } catch (e) {
            return !1;
          }
        })(o, e.languageId)
      )
        return null;
      o.length < n.length && (i++, r--);
      var s,
        l,
        c,
        h,
        d =
          ((s = e.uri),
          (c = t),
          (h = a),
          /^\s*javascript\:/i.test((l = o)) ||
          /^\s*\#/i.test(l) ||
          /[\n\r]/.test(l)
            ? null
            : ((l = l.replace(/^\s*/g, "")),
              /^https?:\/\//i.test(l) || /^file:\/\//i.test(l)
                ? l
                : /^\/\//i.test(l)
                ? (p.startsWith(s, "https://") ? "https" : "http") +
                  ":" +
                  l.replace(/^\s*/g, "")
                : c
                ? c.resolveReference(l, h || s)
                : l));
      return d &&
        (function (e) {
          try {
            return m.default.parse(e), !0;
          } catch (e) {
            return !1;
          }
        })(d)
        ? { range: u.Range.create(e.positionAt(i), e.positionAt(r)), target: d }
        : null;
    }
    t.findDocumentLinks = function (e, t) {
      for (
        var n = [],
          i = d.createScanner(e.getText(), 0),
          r = i.scan(),
          a = !1,
          o = !1,
          s = void 0;
        r !== f.TokenType.EOS;

      ) {
        switch (r) {
          case f.TokenType.StartTag:
            s || (o = "base" === i.getTokenText().toLowerCase());
            break;
          case f.TokenType.AttributeName:
            var l = i.getTokenText().toLowerCase();
            a = "src" === l || "href" === l;
            break;
          case f.TokenType.AttributeValue:
            if (a) {
              var c = i.getTokenText();
              if (!o) {
                var h = _(e, t, c, i.getTokenOffset(), i.getTokenEnd(), s);
                h && n.push(h);
              }
              o &&
                void 0 === s &&
                (s = g(c, e.languageId)) &&
                t &&
                (s = t.resolveReference(s, e.uri)),
                (a = o = !1);
            }
        }
        r = i.scan();
      }
      return n;
    };
  }),
  (function (e) {
    if ("object" == typeof module && "object" == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      "function" == typeof define &&
        define.amd &&
        define(
          "vscode-html-languageservice/services/htmlHighlighting",
          [
            "require",
            "exports",
            "../parser/htmlScanner",
            "vscode-languageserver-types",
            "../htmlLanguageTypes",
          ],
          e
        );
  })(function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var a = e("../parser/htmlScanner"),
      l = e("vscode-languageserver-types"),
      c = e("../htmlLanguageTypes");
    function n(e, t) {
      return (
        e.line < t.line || (e.line === t.line && e.character <= t.character)
      );
    }
    function h(e, t) {
      return n(e.start, t) && n(t, e.end);
    }
    function d(e, t, n) {
      for (
        var i = a.createScanner(t.getText(), n), r = i.scan();
        r !== c.TokenType.EOS && r !== e;

      )
        r = i.scan();
      return r !== c.TokenType.EOS
        ? {
            start: t.positionAt(i.getTokenOffset()),
            end: t.positionAt(i.getTokenEnd()),
          }
        : null;
    }
    t.findDocumentHighlights = function (e, t, n) {
      var i = e.offsetAt(t),
        r = n.findNodeAt(i);
      if (!r.tag) return [];
      var a = [],
        o = d(c.TokenType.StartTag, e, r.start),
        s =
          "number" == typeof r.endTagStart &&
          d(c.TokenType.EndTag, e, r.endTagStart);
      return (
        ((o && h(o, t)) || (s && h(s, t))) &&
          (o && a.push({ kind: l.DocumentHighlightKind.Read, range: o }),
          s && a.push({ kind: l.DocumentHighlightKind.Read, range: s })),
        a
      );
    };
  }),
  (function (e) {
    if ("object" == typeof module && "object" == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      "function" == typeof define &&
        define.amd &&
        define(
          "vscode-html-languageservice/services/htmlSymbolsProvider",
          ["require", "exports", "vscode-languageserver-types"],
          e
        );
  })(function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var l = e("vscode-languageserver-types");
    function c(e) {
      var t = e.tag;
      if (e.attributes) {
        var n = e.attributes.id,
          i = e.attributes.class;
        n && (t += "#" + n.replace(/[\"\']/g, "")),
          i &&
            (t += i
              .replace(/[\"\']/g, "")
              .split(/\s+/)
              .map(function (e) {
                return "." + e;
              })
              .join(""));
      }
      return t || "?";
    }
    t.findDocumentSymbols = function (t, e) {
      var n = [];
      return (
        e.roots.forEach(function (e) {
          !(function t(n, e, i, r) {
            var a = c(e),
              o = l.Location.create(
                n.uri,
                l.Range.create(n.positionAt(e.start), n.positionAt(e.end))
              ),
              s = {
                name: a,
                location: o,
                containerName: i,
                kind: l.SymbolKind.Field,
              };
            r.push(s),
              e.children.forEach(function (e) {
                t(n, e, a, r);
              });
          })(t, e, "", n);
        }),
        n
      );
    };
  }),
  (function (e) {
    if ("object" == typeof module && "object" == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      "function" == typeof define &&
        define.amd &&
        define(
          "vscode-html-languageservice/services/htmlFolding",
          [
            "require",
            "exports",
            "vscode-languageserver-types",
            "../htmlLanguageTypes",
            "../parser/htmlScanner",
            "../languageFacts/fact",
          ],
          e
        );
  })(function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var _ = e("vscode-languageserver-types"),
      b = e("../htmlLanguageTypes"),
      v = e("../parser/htmlScanner"),
      y = e("../languageFacts/fact");
    t.getFoldingRanges = function (e, t) {
      var n = v.createScanner(e.getText()),
        i = n.scan(),
        r = [],
        a = [],
        o = null,
        s = -1;
      function l(e) {
        r.push(e), (s = e.startLine);
      }
      for (; i !== b.TokenType.EOS; ) {
        switch (i) {
          case b.TokenType.StartTag:
            var c = n.getTokenText(),
              h = e.positionAt(n.getTokenOffset()).line;
            a.push({ startLine: h, tagName: c }), (o = c);
            break;
          case b.TokenType.EndTag:
            o = n.getTokenText();
            break;
          case b.TokenType.StartTagClose:
            if (!o || !y.isVoidElement(o)) break;
          case b.TokenType.EndTagClose:
          case b.TokenType.StartTagSelfClose:
            for (var d = a.length - 1; 0 <= d && a[d].tagName !== o; ) d--;
            if (0 <= d) {
              var u = a[d];
              a.length = d;
              var p = e.positionAt(n.getTokenOffset()).line;
              (h = u.startLine) < (f = p - 1) &&
                s !== h &&
                l({ startLine: h, endLine: f });
            }
            break;
          case b.TokenType.Comment:
            h = e.positionAt(n.getTokenOffset()).line;
            var m = n.getTokenText().match(/^\s*#(region\b)|(endregion\b)/);
            if (m)
              if (m[1]) a.push({ startLine: h, tagName: "" });
              else {
                for (d = a.length - 1; 0 <= d && a[d].tagName.length; ) d--;
                if (0 <= d) {
                  (u = a[d]), (a.length = d);
                  var f = h;
                  (h = u.startLine) < f &&
                    s !== h &&
                    l({
                      startLine: h,
                      endLine: f,
                      kind: _.FoldingRangeKind.Region,
                    });
                }
              }
            else
              h <
                (f = e.positionAt(
                  n.getTokenOffset() + n.getTokenLength()
                ).line) &&
                l({
                  startLine: h,
                  endLine: f,
                  kind: _.FoldingRangeKind.Comment,
                });
        }
        i = n.scan();
      }
      var g = (t && t.rangeLimit) || Number.MAX_VALUE;
      return r.length > g
        ? (function (e, t) {
            e = e.sort(function (e, t) {
              var n = e.startLine - t.startLine;
              return 0 === n && (n = e.endLine - t.endLine), n;
            });
            for (
              var n = void 0,
                i = [],
                r = [],
                a = [],
                o = function (e, t) {
                  (r[e] = t) < 30 && (a[t] = (a[t] || 0) + 1);
                },
                s = 0;
              s < e.length;
              s++
            ) {
              var l = e[s];
              if (n) {
                if (l.startLine > n.startLine)
                  if (l.endLine <= n.endLine)
                    i.push(n), (n = l), o(s, i.length);
                  else if (l.startLine > n.endLine) {
                    for (; (n = i.pop()) && l.startLine > n.endLine; );
                    n && i.push(n), (n = l), o(s, i.length);
                  }
              } else (n = l), o(s, 0);
            }
            var c = 0,
              h = 0;
            for (s = 0; s < a.length; s++) {
              var d = a[s];
              if (d) {
                if (t < d + c) {
                  h = s;
                  break;
                }
                c += d;
              }
            }
            var u = [];
            for (s = 0; s < e.length; s++) {
              var p = r[s];
              "number" == typeof p &&
                (p < h || (p === h && c++ < t)) &&
                u.push(e[s]);
            }
            return u;
          })(r, g)
        : r;
    };
  }),
  (function (e) {
    if ("object" == typeof module && "object" == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      "function" == typeof define &&
        define.amd &&
        define(
          "vscode-html-languageservice/services/htmlSelectionRange",
          [
            "require",
            "exports",
            "vscode-languageserver-types",
            "../parser/htmlScanner",
            "../parser/htmlParser",
            "../htmlLanguageTypes",
          ],
          e
        );
  })(function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var p = e("vscode-languageserver-types"),
      m = e("../parser/htmlScanner"),
      c = e("../parser/htmlParser"),
      f = e("../htmlLanguageTypes");
    function h(e, t, n) {
      for (
        var i = p.Range.create(e.positionAt(t.start), e.positionAt(t.end)),
          r = e.getText(i),
          a = n - t.start,
          o = m.createScanner(r),
          s = o.scan(),
          l = t.start,
          c = [],
          h = !1,
          d = -1;
        s !== f.TokenType.EOS;

      ) {
        switch (s) {
          case f.TokenType.AttributeName:
            if (a < o.getTokenOffset()) {
              h = !1;
              break;
            }
            a <= o.getTokenEnd() &&
              c.unshift([o.getTokenOffset(), o.getTokenEnd()]),
              (h = !0),
              (d = o.getTokenOffset());
            break;
          case f.TokenType.AttributeValue:
            if (!h) break;
            var u = o.getTokenText();
            if (a < o.getTokenOffset()) {
              c.push([d, o.getTokenEnd()]);
              break;
            }
            a >= o.getTokenOffset() &&
              a <= o.getTokenEnd() &&
              (c.unshift([o.getTokenOffset(), o.getTokenEnd()]),
              (('"' === u[0] && '"' === u[u.length - 1]) ||
                ("'" === u[0] && "'" === u[u.length - 1])) &&
                a >= o.getTokenOffset() + 1 &&
                a <= o.getTokenEnd() - 1 &&
                c.unshift([o.getTokenOffset() + 1, o.getTokenEnd() - 1]),
              c.push([d, o.getTokenEnd()]));
        }
        s = o.scan();
      }
      return c.map(function (e) {
        return [e[0] + l, e[1] + l];
      });
    }
    t.getSelectionRanges = function (t, e) {
      return e.map(function (e) {
        var i = (function (e, t) {
          var n = c.parse(e.getText()),
            i = e.offsetAt(t),
            r = n.findNodeAt(i),
            a = (function (e) {
              for (
                var t = e,
                  n = function (e) {
                    return e.startTagEnd &&
                      e.endTagStart &&
                      e.startTagEnd < e.endTagStart
                      ? [
                          [e.startTagEnd, e.endTagStart],
                          [e.start, e.end],
                        ]
                      : [[e.start, e.end]];
                  },
                  i = [];
                t.parent;

              )
                (t = t.parent),
                  n(t).forEach(function (e) {
                    return i.push(e);
                  });
              return i;
            })(r);
          if (r.startTagEnd && !r.endTagStart) {
            var o = p.Range.create(
                e.positionAt(r.startTagEnd - 2),
                e.positionAt(r.startTagEnd)
              ),
              s = e.getText(o);
            "/>" === s
              ? a.unshift([r.start + 1, r.startTagEnd - 2])
              : a.unshift([r.start + 1, r.startTagEnd - 1]);
            var l = h(e, r, i);
            return (a = l.concat(a));
          }
          if (!r.startTagEnd || !r.endTagStart) return a;
          if ((a.unshift([r.start, r.end]), r.start < i && i < r.startTagEnd)) {
            a.unshift([r.start + 1, r.startTagEnd - 1]);
            var l = h(e, r, i);
            return (a = l.concat(a));
          }
          return (
            r.startTagEnd <= i && i <= r.endTagStart
              ? a.unshift([r.startTagEnd, r.endTagStart])
              : i >= r.endTagStart + 2 &&
                a.unshift([r.endTagStart + 2, r.end - 1]),
            a
          );
        })(t, e);
        return i
          .filter(function (e, t) {
            if (0 === t) return !0;
            var n = i[t - 1];
            return e[0] !== n[0] || e[1] !== n[1];
          })
          .map(function (e) {
            return {
              range: p.Range.create(t.positionAt(e[0]), t.positionAt(e[1])),
              kind: f.SelectionRangeKind.Declaration,
            };
          });
      });
    };
  }),
  (function (e) {
    if ("object" == typeof module && "object" == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      "function" == typeof define &&
        define.amd &&
        define(
          "vscode-html-languageservice/htmlLanguageService",
          [
            "require",
            "exports",
            "./parser/htmlScanner",
            "./parser/htmlParser",
            "./services/htmlCompletion",
            "./services/htmlHover",
            "./services/htmlFormatter",
            "./services/htmlLinks",
            "./services/htmlHighlighting",
            "./services/htmlSymbolsProvider",
            "./services/htmlFolding",
            "./services/htmlSelectionRange",
            "./languageFacts/builtinDataProviders",
            "./languageFacts/dataProvider",
            "./htmlLanguageTypes",
            "vscode-languageserver-types",
          ],
          e
        );
  })(function (e, n) {
    "use strict";
    function t(e) {
      for (var t in e) n.hasOwnProperty(t) || (n[t] = e[t]);
    }
    Object.defineProperty(n, "__esModule", { value: !0 });
    var i = e("./parser/htmlScanner"),
      r = e("./parser/htmlParser"),
      a = e("./services/htmlCompletion"),
      o = e("./services/htmlHover"),
      s = e("./services/htmlFormatter"),
      l = e("./services/htmlLinks"),
      c = e("./services/htmlHighlighting"),
      h = e("./services/htmlSymbolsProvider"),
      d = e("./services/htmlFolding"),
      u = e("./services/htmlSelectionRange"),
      p = e("./languageFacts/builtinDataProviders"),
      m = e("./languageFacts/dataProvider");
    t(e("./htmlLanguageTypes")),
      t(e("vscode-languageserver-types")),
      (n.getLanguageService = function (e) {
        var t = new a.HTMLCompletion();
        return (
          e &&
            e.customDataProviders &&
            p.handleCustomDataProviders(e.customDataProviders),
          {
            createScanner: i.createScanner,
            parseHTMLDocument: function (e) {
              return r.parse(e.getText());
            },
            doComplete: t.doComplete.bind(t),
            setCompletionParticipants: t.setCompletionParticipants.bind(t),
            doHover: o.doHover,
            format: s.format,
            findDocumentHighlights: c.findDocumentHighlights,
            findDocumentLinks: l.findDocumentLinks,
            findDocumentSymbols: h.findDocumentSymbols,
            getFoldingRanges: d.getFoldingRanges,
            getSelectionRanges: u.getSelectionRanges,
            doTagComplete: t.doTagComplete.bind(t),
          }
        );
      }),
      (n.newHTMLDataProvider = function (e, t) {
        return new m.HTMLDataProvider(e, t);
      });
  }),
  define(
    "vscode-html-languageservice",
    ["vscode-html-languageservice/htmlLanguageService"],
    function (e) {
      return e;
    }
  ),
  define(
    "vs/language/html/fillers/polyfills",
    ["require", "exports"],
    function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.polyfill = function () {
          "function" != typeof Object.assign &&
            Object.defineProperty(Object, "assign", {
              value: function (e, t) {
                if (null !== e)
                  for (var n = 1; n < arguments.length; n++) {
                    var i = arguments[n];
                    if (i)
                      for (var r in i)
                        Object.prototype.hasOwnProperty.call(i, r) &&
                          (e[r] = i[r]);
                  }
                return e;
              },
              writable: !0,
              configurable: !0,
            });
        });
    }
  ),
  define(
    "vs/language/html/htmlWorker",
    [
      "require",
      "exports",
      "vscode-html-languageservice",
      "vscode-languageserver-types",
      "./fillers/polyfills",
    ],
    function (e, t, n, r, i) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }), i.polyfill();
      var a = (function () {
        function e(e, t) {
          (this._ctx = e),
            (this._languageSettings = t.languageSettings),
            (this._languageId = t.languageId),
            (this._languageService = n.getLanguageService());
        }
        return (
          (e.prototype.doValidation = function (e) {
            return Promise.resolve([]);
          }),
          (e.prototype.doComplete = function (e, t) {
            var n = this._getTextDocument(e),
              i = this._languageService.parseHTMLDocument(n);
            return Promise.resolve(
              this._languageService.doComplete(
                n,
                t,
                i,
                this._languageSettings && this._languageSettings.suggest
              )
            );
          }),
          (e.prototype.format = function (e, t, n) {
            var i = this._getTextDocument(e),
              r = this._languageService.format(
                i,
                t,
                this._languageSettings && this._languageSettings.format
              );
            return Promise.resolve(r);
          }),
          (e.prototype.doHover = function (e, t) {
            var n = this._getTextDocument(e),
              i = this._languageService.parseHTMLDocument(n),
              r = this._languageService.doHover(n, t, i);
            return Promise.resolve(r);
          }),
          (e.prototype.findDocumentHighlights = function (e, t) {
            var n = this._getTextDocument(e),
              i = this._languageService.parseHTMLDocument(n),
              r = this._languageService.findDocumentHighlights(n, t, i);
            return Promise.resolve(r);
          }),
          (e.prototype.findDocumentLinks = function (e) {
            var t = this._getTextDocument(e),
              n = this._languageService.findDocumentLinks(t, null);
            return Promise.resolve(n);
          }),
          (e.prototype.findDocumentSymbols = function (e) {
            var t = this._getTextDocument(e),
              n = this._languageService.parseHTMLDocument(t),
              i = this._languageService.findDocumentSymbols(t, n);
            return Promise.resolve(i);
          }),
          (e.prototype.provideFoldingRanges = function (e, t) {
            var n = this._getTextDocument(e),
              i = this._languageService.getFoldingRanges(n, t);
            return Promise.resolve(i);
          }),
          (e.prototype._getTextDocument = function (e) {
            for (
              var t = 0, n = this._ctx.getMirrorModels();
              t < n.length;
              t++
            ) {
              var i = n[t];
              if (i.uri.toString() === e)
                return r.TextDocument.create(
                  e,
                  this._languageId,
                  i.version,
                  i.getValue()
                );
            }
            return null;
          }),
          e
        );
      })();
      (t.HTMLWorker = a),
        (t.create = function (e, t) {
          return new a(e, t);
        });
    }
  );
