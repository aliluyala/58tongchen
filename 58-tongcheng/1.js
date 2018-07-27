var svn_revision = 11052;
define("job/util.cookie", [""],
function() {
    var cookie = {};
    cookie.getCookie = function(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2])
        } else {
            return null
        }
    };
    cookie.setCookie = function(name, value, outdays, path, domain) {
        var Days = outdays || 15,
        exp = new Date,
        path = path || "/",
        domain = domain || ".58.com";
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1e3);
        var params = ";expires=" + exp.toUTCString() + ";path=" + path + ";domain=" + domain;
        document.cookie = name + "=" + escape(value) + params
    };
    return cookie
});
define("job/busi.resume.listViewmode", ["./util.cookie"],
function(cookie) {
    var viewMode = {
        flag: $(".see-all").attr("seetype"),
        init: function() {
            var _this = viewMode
        },
        bindEvent: function() {
            var $seeDetail = $(".see-detail"),
            $seeList = $(".see-list");
            $seeDetail.click(function() {
                window.clickLog && window.clickLog("from=list-kapian-clk")
            });
            $seeList.click(function() {
                window.clickLog && window.clickLog("from=list-liebiao-clk")
            })
        }
    };
    return viewMode.init
});
define("job/busi.resume.listDownload", [],
function() {
    var downloadResume = {
        init: function(listArr, itemdiv, itemdivout, callback) {
            var isLogin = document.cookie.match(/UID=\d*/);
            if (!isLogin) {
                return
            }
            downloadResume.downloadResumeIn(listArr, itemdiv, itemdivout, 0, 30);
            downloadResume.downloadResumeIn(listArr, itemdiv, itemdivout, 30, listArr.length);
            if (typeof callback === "function") {
                callback()
            }
        },
        getIdArr: function(elemArr, attr, start, l) {
            var arr = [];
            for (var i = start; i < l; i++) {
                arr.push(elemArr.eq(i).attr(attr))
            }
            return arr
        },
        inListArray: function(arr, id) {
            for (var i = 0,
            len = arr.length; i < len; i++) {
                if ($(arr[i]).attr("infoid") == id) {
                    return $(arr[i])
                }
            }
            return false
        },
        itemhtml: function(item, text, itemdivout) {
            item.html(text).removeClass("orangebtn").addClass("graybtn");
            item.closest(itemdivout).addClass("grayfont")
        },
        downSuccess: function(entity, itemdiv, itemdivout) {
            $.each(entity,
            function(ix, val) {
                var item = downloadResume.inListArray(itemdiv, val.resumeid);
                if (val.type == 1) {
                    downloadResume.itemhtml(item, "已下载", itemdivout)
                } else if (val.type == 2) {
                    downloadResume.itemhtml(item, "已投递", itemdivout)
                }
            })
        },
        downloadResumeIn: function(listArr, itemdiv, itemdivout, start, l) {
            var idArr = downloadResume.getIdArr(listArr, "infoid", start, l),
            dataIdArr = idArr.join(","),
            url = "https://statisticszp.58.com/resume/bizList?t=-1&ids=" + dataIdArr;
            $.ajax({
                url: url,
                type: "get",
                dataType: "jsonp",
                success: function(data) {
                    if (data.returnMessage == "success") {
                        if (!$.isArray(data.entity) || data.entity.length == 0) {
                            return
                        }
                        downloadResume.downSuccess(data.entity, itemdiv, itemdivout)
                    }
                }
            })
        }
    };
    return downloadResume
}); !
function() {
    function a(a) {
        return a.replace(t, "").replace(u, ",").replace(v, "").replace(w, "").replace(x, "").split(y)
    }
    function b(a) {
        return "'" + a.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
    }
    function c(c, d) {
        function e(a) {
            return m += a.split(/\n/).length - 1,
            k && (a = a.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")),
            a && (a = s[1] + b(a) + s[2] + "\n"),
            a
        }
        function f(b) {
            var c = m;
            if (j ? b = j(b, d) : g && (b = b.replace(/\n/g,
            function() {
                return m++,
                "$line=" + m + ";"
            })), 0 === b.indexOf("=")) {
                var e = l && !/^=[=#]/.test(b);
                if (b = b.replace(/^=[=#]?|[\s;]*$/g, ""), e) {
                    var f = b.replace(/\s*\([^\)]+\)/, "");
                    n[f] || /^(include|print)$/.test(f) || (b = "$escape(" + b + ")")
                } else b = "$string(" + b + ")";
                b = s[1] + b + s[2]
            }
            return g && (b = "$line=" + c + ";" + b),
            r(a(b),
            function(a) {
                if (a && !p[a]) {
                    var b;
                    b = "print" === a ? u: "include" === a ? v: n[a] ? "$utils." + a: o[a] ? "$helpers." + a: "$data." + a,
                    w += a + "=" + b + ",",
                    p[a] = !0
                }
            }),
            b + "\n"
        }
        var g = d.debug,
        h = d.openTag,
        i = d.closeTag,
        j = d.parser,
        k = d.compress,
        l = d.escape,
        m = 1,
        p = {
            $data: 1,
            $filename: 1,
            $utils: 1,
            $helpers: 1,
            $out: 1,
            $line: 1
        },
        q = "".trim,
        s = q ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
        t = q ? "$out+=text;return $out;": "$out.push(text);",
        u = "function(){var text=''.concat.apply('',arguments);" + t + "}",
        v = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + t + "}",
        w = "var $utils=this,$helpers=$utils.$helpers," + (g ? "$line=0,": ""),
        x = s[0],
        y = "return new String(" + s[3] + ");";
        r(c.split(h),
        function(a) {
            a = a.split(i);
            var b = a[0],
            c = a[1];
            1 === a.length ? x += e(b) : (x += f(b), c && (x += e(c)))
        });
        var z = w + x + y;
        g && (z = "try{" + z + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + b(c) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
        try {
            var A = new Function("$data", "$filename", z);
            return A.prototype = n,
            A
        } catch(B) {
            throw B.temp = "function anonymous($data,$filename) {" + z + "}",
            B
        }
    }
    var d = function(a, b) {
        return "string" == typeof b ? q(b, {
            filename: a
        }) : g(a, b)
    };
    d.version = "3.0.0",
    d.config = function(a, b) {
        e[a] = b
    };
    var e = d.defaults = {
        openTag: "<%",
        closeTag: "%>",
        escape: !0,
        cache: !0,
        compress: !1,
        parser: null
    },
    f = d.cache = {};
    d.render = function(a, b) {
        return q(a, b)
    };
    var g = d.renderFile = function(a, b) {
        var c = d.get(a) || p({
            filename: a,
            name: "Render Error",
            message: "Template not found"
        });
        return b ? c(b) : c
    };
    d.get = function(a) {
        var b;
        if (f[a]) b = f[a];
        else if ("object" == typeof document) {
            var c = document.getElementById(a);
            if (c) {
                var d = (c.value || c.innerHTML).replace(/^\s*|\s*$/g, "");
                b = q(d, {
                    filename: a
                })
            }
        }
        return b
    };
    var h = function(a, b) {
        return "string" != typeof a && (b = typeof a, "number" === b ? a += "": a = "function" === b ? h(a.call(a)) : ""),
        a
    },
    i = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    },
    j = function(a) {
        return i[a]
    },
    k = function(a) {
        return h(a).replace(/&(?![\w#]+;)|[<>"']/g, j)
    },
    l = Array.isArray ||
    function(a) {
        return "[object Array]" === {}.toString.call(a)
    },
    m = function(a, b) {
        var c, d;
        if (l(a)) for (c = 0, d = a.length; d > c; c++) b.call(a, a[c], c, a);
        else for (c in a) b.call(a, a[c], c)
    },
    n = d.utils = {
        $helpers: {},
        $include: g,
        $string: h,
        $escape: k,
        $each: m
    };
    d.helper = function(a, b) {
        o[a] = b
    };
    var o = d.helpers = n.$helpers;
    d.onerror = function(a) {
        var b = "Template Error\n\n";
        for (var c in a) b += "<" + c + ">\n" + a[c] + "\n\n";
        "object" == typeof console && console.error(b)
    };
    var p = function(a) {
        return d.onerror(a),
        function() {
            return "{Template Error}"
        }
    },
    q = d.compile = function(a, b) {
        function d(c) {
            try {
                return new i(c, h) + ""
            } catch(d) {
                return b.debug ? p(d)() : (b.debug = !0, q(a, b)(c))
            }
        }
        b = b || {};
        for (var g in e) void 0 === b[g] && (b[g] = e[g]);
        var h = b.filename;
        try {
            var i = c(a, b)
        } catch(j) {
            return j.filename = h || "anonymous",
            j.name = "Syntax Error",
            p(j)
        }
        return d.prototype = i.prototype,
        d.toString = function() {
            return i.toString()
        },
        h && b.cache && (f[h] = d),
        d
    },
    r = n.$each,
    s = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",
    t = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,
    u = /[^\w$]+/g,
    v = new RegExp(["\\b" + s.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"),
    w = /^\d[^,]*|,\d[^,]*/g,
    x = /^,+|,+$/g,
    y = /^$|,+/;
    e.openTag = "{{",
    e.closeTag = "}}";
    var z = function(a, b) {
        var c = b.split(":"),
        d = c.shift(),
        e = c.join(":") || "";
        return e && (e = ", " + e),
        "$helpers." + d + "(" + a + e + ")"
    };
    e.parser = function(a) {
        a = a.replace(/^\s/, "");
        var b = a.split(" "),
        c = b.shift(),
        e = b.join(" ");
        switch (c) {
        case "if":
            a = "if(" + e + "){";
            break;
        case "else":
            b = "if" === b.shift() ? " if(" + b.join(" ") + ")": "",
            a = "}else" + b + "{";
            break;
        case "/if":
            a = "}";
            break;
        case "each":
            var f = b[0] || "$data",
            g = b[1] || "as",
            h = b[2] || "$value",
            i = b[3] || "$index",
            j = h + "," + i;
            "as" !== g && (f = "[]"),
            a = "$each(" + f + ",function(" + j + "){";
            break;
        case "/each":
            a = "});";
            break;
        case "echo":
            a = "print(" + e + ");";
            break;
        case "print":
        case "include":
            a = c + "(" + b.join(",") + ");";
            break;
        default:
            if (/^\s*\|\s*[\w\$]/.test(e)) {
                var k = !0;
                0 === a.indexOf("#") && (a = a.substr(1), k = !1);
                for (var l = 0,
                m = a.split("|"), n = m.length, o = m[l++]; n > l; l++) o = z(o, m[l]);
                a = (k ? "=": "=#") + o
            } else a = d.helpers[c] ? "=#" + c + "(" + b.join(",") + ");": "=" + a
        }
        return a
    },
    "function" == typeof define ? define("job/util.artTemplate", [],
    function() {
        return d
    }) : "undefined" != typeof exports ? module.exports = d: this.template = d
} ();
define("job/tmpl.resume.listQualityPush", [],
function() {
    var templates = {};
    templates["main/resumeCardPush"] = '{{if innerPush}}{{each innerPush as value index}}<li class="infocardLi clearfix" username="{{value.trueName}}"><i class="checkboxi" infoid="{{value.confuseId}}"></i><div class="fl"><dl class="infocardMessage clearfix" style="zoom: 1; position: static;"><dt class="fl"><a href="{{value.url}}" target="_blank"><img src="{{value.profile}}"></a></dt><dd class="fl"><div class="infocardMessageOne"><a href="{{value.url}}" target="_blank" class="clearfix"><span class="infocardName fl stonefont resumeName">{{value.trueName}}</span><div class="infocardBasic fl"><div class="clearfix"><em class="stonefont">{{value.sex}}</em><span>|</span><em class="stonefont">{{value.age}}</em><span>|</span><em class="stonefont">{{value.experience}}</em><span>|</span><em class="stonefont">{{value.educationa}}</em>{{if value.phoneVerifiy==true}}<i class="phone list-icon" title="该手机已认证"></i>{{/if}}{{if value.evaluate==true}}<i class="test list-icon" title="该简历有测评报告"></i>{{/if}}{{if value.picNumber>0}}<span class="phoNum">{{value.picNumber}}图</span>{{/if}}</div></div></a></div><p><span title="{{value.expectOffice}}" class="stonefont">期望职位：{{value.expectOffice}}</span><em class="w8">(</em><em title="团队经理" class="stonefont">现职位：{{value.currentOffice}}</em><em class="w8">)</em></p><p class="placeDesire"><em>期望地点：</em><span title="{{value.expectWorkaddress}}" class="stonefont">{{value.expectWorkaddress}}</span></p><div class="infocardMark clearfix">{{if value.hasTag==true}}<span class="fl goldLabel" title="{{value.displayTagName}}" id="{{value.innerTagName}}"></span>{{/if}}{{if value.highlightCount>0}}{{each value.highlight as values index}}<em class="fl stonefont">{{values}}</em>{{/each}}{{/if}}</div></dd></dl></div><div class="infocardStatus fr"><em class="stonefont">{{value.mark}}</em><span class="mainList-down orangebtn resumelistdown loginNot" infoid="{{value.confuseId}}">下载</span></div><div class="lightDataAll fr"><ul class="lightData" infoid="{{value.confuseId}}"><li class="lightDataTime">两周内</li><li>被浏览<em>*</em>次</li><li>被下载<em>*</em>次</li><li class="lightDataMail">主动投递<em>*</em>个职位</li></ul><div class="notLoginPoint clearfix"><p class="notLoginPointBg"></p><p><i class="list-icon fl"></i><a class="loginDetail loginNot fl" href="javascript:void(0);" target="_self" tongji_tag="">登录</a><span class="fl">可查看该数据</span></p></div></div></li>{{/each}}{{/if}}';
    templates["main/resumeCardQuality"] = '{{if highQuality}}{{each highQuality as value index}}<li class="infocardLi clearfix" username="{{value.trueName}}"><i class="checkboxi" infoid="{{value.confuseId}}"></i><div class="fl"><dl class="infocardMessage clearfix" style="zoom: 1; position: static;"><dt class="fl"><a href="{{value.url}}" target="_blank"><img src="{{value.profile}}"></a></dt><dd class="fl"><div class="infocardMessageOne"><a href="{{value.url}}" target="_blank" class="clearfix"><span class="infocardName fl stonefont resumeName">{{value.trueName}}</span><div class="infocardBasic fl"><div class="clearfix"><em class="stonefont">{{value.sex}}</em><span>|</span><em class="stonefont">{{value.age}}</em><span>|</span><em class="stonefont">{{value.experience}}</em><span>|</span><em class="stonefont">{{value.educationa}}</em>{{if value.phoneVerifiy==true}}<i class="phone list-icon" title="该手机已认证"></i>{{/if}}{{if value.evaluate==true}}<i class="test list-icon" title="该简历有测评报告"></i>{{/if}}{{if value.picNumber>0}}<span class="phoNum">{{value.picNumber}}图</span>{{/if}}</div></div></a></div><p><span title="{{value.expectOffice}}" class="stonefont">期望职位：{{value.expectOffice}}</span><em class="w8">(</em><em title="团队经理" class="stonefont">现职位：{{value.currentOffice}}</em><em class="w8">)</em></p><p class="placeDesire"><em>期望地点：</em><span title="{{value.expectWorkaddress}}" class="stonefont">{{value.expectWorkaddress}}</span></p><div class="infocardMark clearfix">{{if value.hasTag==true}}<span class="fl goldLabel" title="{{value.displayTagName}}" id="{{value.innerTagName}}"></span>{{/if}}{{if value.highlightCount>0}}{{each value.highlight as values index}}<em class="fl stonefont">{{values}}</em>{{/each}}{{/if}}</div></dd></dl></div><div class="infocardStatus fr"><em class="stonefont">{{value.mark}}</em><span class="mainList-down orangebtn resumelistdown loginNot" infoid="{{value.confuseId}}">下载</span></div><div class="lightDataAll fr"><ul class="lightData" infoid="{{value.confuseId}}"><li class="lightDataTime">两周内</li><li>被浏览<em>*</em>次</li><li>被下载<em>*</em>次</li><li class="lightDataMail">主动投递<em>*</em>个职位</li></ul><div class="notLoginPoint clearfix"><p class="notLoginPointBg"></p><p><i class="list-icon fl"></i><a class="loginDetail loginNot fl" href="javascript:void(0);" target="_self" tongji_tag="">登录</a><span class="fl">可查看该数据</span></p></div></div></li>{{/each}}{{/if}}';
    templates["main/resumeListPush"] = '{{if innerPush}}{{each innerPush as value index}}<dl><dd class="w20" username="{{value.userName}}"><i class="checkboxi" infoid="{{value.confuseId}}"></i></dd><dt class="w325"><a href="{{value.url}}" target="_blank" sortid="{{value.sortId}}" rel="nofollow" class="fl stonefont">{{value.resumeName}}</a>{{if value.phoneVerifiy==true}}<i class="phone list-icon" title="该手机已认证"></i>{{/if}}{{if value.evaluate==true}}<i class="test list-icon" title="该简历有测评报告"></i>{{/if}}{{if value.picNumber>0}}<span class="phoNum">{{value.picNumber}}图</span>{{/if}}{{if value.highlightCount>0}}<span class="liang">{{value.highlightCount}}亮点</span>{{/if}}{{if value.showPreview==true &&  value.preview}}<div class="listModel"><ul><li class="listModelPeo"><p class="listModelPeoTit clearfix"><span class="listModelPeoName stonefont">{{value.userName}}</span><span class="stonefont">({{value.sex}}</span><em>|</em><span class="stonefont">{{value.age}})</span><span class="fr orangeColor">{{value.preview.integrity}}%</span><em class="fr ">简历完善度：</em></p><div><em>期望职位：</em><span class="stonefont">{{value.preview.expectOffice}}</span></div><div><em>求职地区：</em><span class="stonefont">{{value.preview.expectWorkaddress}}</span></div><div><em>期望月薪：</em><span class="stonefont">{{value.preview.expectSalary}}</span></div><p><em>最高学历：</em><span class="stonefont">{{value.preview.highestEducationa}}</span></p></li>{{if value.preview.haswork==true}}<li class="listModelJob"><p class="listModelJobTit"><span>工作了</span><em class="orangeColor stonefont">{{value.preview.worktime}}</em><span>,做了</span><em class="orangeColor stonefont">{{value.preview.jobcount}}</em><span>份工作</span></p><p><em class="stonefont">{{value.preview.workbewrite}}</em></p></li>{{/if}}{{if value.preview.hasContent==true}}<li class="listModelCharacter"><div class="clearfix">	{{each value.preview.highlight as values index}}<span class="fl stonefont">{{values}}</span>{{/each}}</div><p><em class="stonefont">{{value.preview.letter}}</em></p></li>{{/if}}</ul></div>{{/if}}</dt><dd class="w70 stonefont resumeName">{{value.userName}}</dd><dd class="w48 stonefont">{{value.sex}}</dd><dd class="w70 stonefont">{{value.age}}</dd><dd class="w80 stonefont">{{value.experience}}</dd><dd class="w90 stonefont">{{value.educationa}}</dd><dd class="w108 stonefont" title="{{value.currentOffice}}">{{value.currentOffice}}</dd><dd class="w80 stonefont zhiding-color">{{value.mark}}</dd><dd class="w80 downStatus"><span class="mainList-down orangebtn resumelistdown loginNot" infoid="{{value.confuseId}}">下载</span></dd></dl>{{/each}}{{/if}}';
    templates["main/resumeListQuality"] = '{{if highQuality}}{{each highQuality as value index}}<dl><dd class="w20" username="{{value.userName}}"><i class="checkboxi" infoid="{{value.confuseId}}"></i></dd><dt class="w325"><a href="{{value.url}}" target="_blank" sortid="{{value.sortId}}" rel="nofollow" class="fl stonefont">{{value.resumeName}}</a>{{if value.phoneVerifiy==true}}<i class="phone list-icon" title="该手机已认证"></i>{{/if}}{{if value.evaluate==true}}<i class="test list-icon" title="该简历有测评报告"></i>{{/if}}{{if value.picNumber>0}}<span class="phoNum">{{value.picNumber}}图</span>{{/if}}{{if value.highlightCount>0}}<span class="liang">{{value.highlightCount}}亮点</span>{{/if}}{{if value.showPreview==true &&  value.preview}}<div class="listModel"><ul><li class="listModelPeo"><p class="listModelPeoTit clearfix"><span class="listModelPeoName stonefont">{{value.userName}}</span><span class="stonefont">({{value.sex}}</span><em>|</em><span class="stonefont">{{value.age}})</span><span class="fr orangeColor">{{value.preview.integrity}}%</span><em class="fr ">简历完善度：</em></p><div><em>期望职位：</em><span class="stonefont">{{value.preview.expectOffice}}</span></div><div><em>求职地区：</em><span class="stonefont">{{value.preview.expectWorkaddress}}</span></div><div><em>期望月薪：</em><span class="stonefont">{{value.preview.expectSalary}}</span></div><p><em>最高学历：</em><span class="stonefont">{{value.preview.highestEducationa}}</span></p></li>{{if value.preview.haswork==true}}<li class="listModelJob"><p class="listModelJobTit"><span>工作了</span><em class="orangeColor stonefont">{{value.preview.worktime}}</em><span>,做了</span><em class="orangeColor stonefont">{{value.preview.jobcount}}</em><span>份工作</span></p><p><em class="stonefont">{{value.preview.workbewrite}}</em></p></li>{{/if}}{{if value.preview.hasContent==true}}<li class="listModelCharacter"><div class="clearfix">{{each value.preview.highlight as values index}}<span class="fl stonefont">{{values}}</span>{{/each}}</div><p><em class="stonefont">{{value.preview.letter}}</em></p></li>{{/if}}</ul></div>{{/if}}</dt><dd class="w70 stonefont resumeName">{{value.userName}}</dd><dd class="w48 stonefont">{{value.sex}}</dd><dd class="w70 stonefont">{{value.age}}</dd><dd class="w80 stonefont">{{value.experience}}</dd><dd class="w90 stonefont">{{value.educationa}}</dd><dd class="w108 stonefont" title="{{value.currentOffice}}">{{value.currentOffice}}</dd><dd class="w80 stonefont zhiding-color">{{value.mark}}</dd><dd class="w80 downStatus"><span class="mainList-down orangebtn resumelistdown loginNot" infoid="{{value.confuseId}}">下载</span></dd></dl>{{/each}}{{/if}}';
    return templates
});
define("job/comp.resume.listUrlQueryUtil", [],
function() {
    var SEP = "&",
    EMPTY = "",
    undef, urlEncode = encodeURIComponent,
    toString = {}.toString,
    EQ = "=";
    function isValidParamValue(val) {
        var t = typeof val;
        return val == null || t !== "object" && t !== "function"
    }
    function isArray(o) {
        return toString.apply(o) === "[object Array]"
    }
    function urlDecode(s) {
        return decodeURIComponent(s.replace(/\+/g, " "))
    }
    var urlQueryUtil = {
        stringify: function(o, sep, eq, serializeArray) {
            sep = sep || SEP;
            eq = eq || EQ;
            if (serializeArray === undef) {
                serializeArray = false
            }
            var buf = [],
            key,
            i,
            v,
            len,
            val;
            for (key in o) {
                val = o[key];
                var originalKey = key;
                key = urlEncode(key);
                if (isValidParamValue(val)) {
                    buf.push(key);
                    if (val !== undef) {
                        buf.push(eq, urlEncode(val + EMPTY))
                    }
                    buf.push(sep)
                } else if (isArray(val)) {
                    for (i = 0, len = val.length; i < len; ++i) {
                        v = val[i];
                        if (isValidParamValue(v)) {
                            buf.push(key, serializeArray && originalKey.slice(0 - 2) !== "[]" ? urlEncode("[]") : EMPTY);
                            if (v !== undef) {
                                buf.push(eq, urlEncode(v + EMPTY))
                            }
                            buf.push(sep)
                        }
                    }
                }
            }
            buf.pop();
            return buf.join(EMPTY)
        },
        parse: function(str, sep, eq) {
            sep = sep || SEP;
            eq = eq || EQ;
            var ret = {},
            eqIndex, key, val, pairs = str.split(sep),
            i = 0,
            len = pairs.length;
            for (; i < len; ++i) {
                eqIndex = pairs[i].indexOf(eq);
                if (eqIndex === -1) {
                    key = urlDecode(pairs[i]);
                    val = undef
                } else {
                    key = urlDecode(pairs[i].substring(0, eqIndex));
                    val = pairs[i].substring(eqIndex + 1);
                    try {
                        val = urlDecode(val)
                    } catch(e) {
                        console.error("decodeURIComponent error : " + val);
                        console.error(e)
                    }
                    if (key.slice(0 - 2) === "[]") {
                        key = key.slice(0, 0 - 2)
                    }
                }
                if (key in ret) {
                    if (isArray(ret[key])) {
                        ret[key].push(val)
                    } else {
                        ret[key] = [ret[key], val]
                    }
                } else {
                    ret[key] = val
                }
            }
            return ret
        }
    };
    return urlQueryUtil
});
define("job/api.resume.listQualityPush", [],
function() {
    var qualityPush = function(data, ptype, callback, callbackerror) {
        $.ajax({
            type: "get",
            url: "//zp.recommend.58.com/api/abtest?ptype=" + ptype + "&fontKey=" + (____json4fe.fontkey ? ____json4fe.fontkey: ""),
            data: data,
            dataType: "jsonp",
            timeout: 1e4,
            success: function(data) {
                if (data.state == "1" && (data.highQuality || data.innerPush)) {
                    callback && callback(data)
                } else {
                    callbackerror && callbackerror()
                }
            },
            error: function(e) {
                console.log(e);
                callbackerror && callbackerror()
            }
        })
    };
    return qualityPush
});
define("job/busi.resume.listQualityPush", ["./util.artTemplate", "./tmpl.resume.listQualityPush", "./comp.resume.listUrlQueryUtil", "./api.resume.listQualityPush"],
function(artTemplate, templates, urlQueryUtil, qualityPush) {
    var qualityPushResume = {
        init: function(callbackDown, callbackerror) {
            var href = window.location.href,
            search = window.location.search,
            pageNo = href.indexOf("/pn") == -1 ? "1": href.substring(parseInt(href.indexOf("pn")) + 2, parseInt(href.indexOf("pn")) + 3),
            hrefObj = {},
            paramObj = {},
            paramsArr = href.split("pve_").slice(1),
            infoids = "",
            data = "",
            ptype = "",
            myProfile = $("#myprofile i").hasClass("selected") ? "1": "0",
            myPic = $("#mypic i").hasClass("selected") ? "1": "0",
            myCePing = $("#myceping i").hasClass("selected") ? "1": "0";
            $(".tablist dl").each(function(index, element) {
                var _this = $(this);
                infoids += _this.children().eq(0).children().eq(0).attr("infoid") + ","
            });
            infoids = infoids.substring(0, infoids.length - 1);
            for (var i = 0; i < paramsArr.length; i++) {
                var arr = paramsArr[i].split("_");
                if (i == paramsArr.length - 1) {
                    paramObj[arr[0]] = arr[1].substring(0, 1)
                } else {
                    paramObj[arr[0]] = arr[1]
                }
            }
            try {
                var catentry = ____json4fe.catentry,
                locallist = ____json4fe.locallist;
                hrefObj = urlQueryUtil.parse(search.substring(1));
                var agesObj = {
                    0 : "16_20",
                    1 : "21_30",
                    2 : "31_40",
                    3 : "41_50",
                    4 : "50_100"
                },
                cateid = catentry[catentry.length - 1].dispid || 13349,
                areaid = locallist[locallist.length - 1].dispid || 1,
                edu = paramObj["5593"] || "",
                gender = paramObj["5568"] || "2",
                ages = hrefObj["age"] || agesObj[paramObj["5569"]] || "0_0",
                workyear = paramObj["5594"] || "",
                salary = hrefObj["salary"] || "10",
                keyword = $.trim($(".sel-con-filter").val()) || ""
            } catch(e) {
                console.log(e)
            }
            data = {
                cateid: cateid,
                areaid: areaid,
                edu: edu,
                gender: gender,
                ages: ages,
                workyear: workyear,
                salary: salary,
                keyword: keyword,
                myProfile: myProfile,
                myPic: myPic,
                myCePing: myCePing
            },
            ptype = "list_opt_resume_new";
            qualityPush(data, ptype,
            function(result) {
                var resumeListPush = artTemplate.compile(templates["main/resumeListPush"]),
                resumeListQuality = artTemplate.compile(templates["main/resumeListQuality"]),
                nhtml = resumeListPush(result) + resumeListQuality(result),
                $topResume = $("#infolist .top-resume");
                if ($topResume.length > 0) {
                    $topResume.eq($topResume.length - 1).after(nhtml)
                } else {
                    $("#infolist dl").eq(0).before(nhtml)
                }
                callbackDown()
            },
            function() {
                callbackerror()
            })
        }
    };
    return qualityPushResume.init
});
define("job/api.resume.listSecondJobCates", [],
function() {
    var catelist = [{
        category: "生活 | 服务业",
        cates: [{
            name: "餐饮",
            dsid: "13915",
            listname: "zplvyoujiudian"
        },
        {
            name: "家政保洁/安保",
            dsid: "13931",
            listname: "jiazhengbaojiexin"
        },
        {
            name: "美容/美发",
            dsid: "13933",
            listname: "meirongjianshen"
        },
        {
            name: "酒店/旅游",
            dsid: "38674",
            listname: "zpjiudian"
        },
        {
            name: "娱乐/休闲",
            dsid: "13924",
            listname: "zpwentiyingshi"
        },
        {
            name: "保健按摩",
            dsid: "38679",
            listname: "zpanmo"
        },
        {
            name: "运动健身",
            dsid: "38680",
            listname: "zpjianshen"
        }]
    },
    {
        category: "人力 | 行政 | 管理",
        cates: [{
            name: "人事/行政/后勤",
            dsid: "13906",
            listname: "renli"
        },
        {
            name: "司机",
            dsid: "13928",
            listname: "siji"
        },
        {
            name: "高级管理",
            dsid: "13893",
            listname: "zpguanli"
        }]
    },
    {
        category: "销售 | 客服 | 采购 | 淘宝",
        cates: [{
            name: "销售",
            dsid: "13901",
            listname: "yewu"
        },
        {
            name: "客服",
            dsid: "13902",
            listname: "kefu"
        },
        {
            name: "贸易/采购",
            dsid: "13912",
            listname: "zpshangwumaoyi"
        },
        {
            name: "超市/百货/零售",
            dsid: "13802",
            listname: "chaoshishangye"
        },
        {
            name: "淘宝职位",
            dsid: "38658",
            listname: "zptaobao"
        },
        {
            name: "房产中介",
            dsid: "38673",
            listname: "zpfangchan"
        }]
    },
    {
        category: "市场 | 媒介 | 广告 | 设计",
        cates: [{
            name: "市场/媒介/公关",
            dsid: "13905",
            listname: "shichang"
        },
        {
            name: "广告/会展/咨询",
            dsid: "13918",
            listname: "zpguanggao"
        },
        {
            name: "美术/设计/创意",
            dsid: "38676",
            listname: "zpmeishu"
        }]
    },
    {
        category: "生产 | 物流 | 质控 | 汽车",
        cates: [{
            name: "普工/技工",
            dsid: "13916",
            listname: "zpshengchankaifa"
        },
        {
            name: "生产管理/研发",
            dsid: "38675",
            listname: "zpshengchan"
        },
        {
            name: "物流/仓储",
            dsid: "13913",
            listname: "zpwuliucangchu"
        },
        {
            name: "服装/纺织/食品",
            dsid: "24580",
            listname: "xiaofeipin"
        },
        {
            name: "质控/安防",
            dsid: "24570",
            listname: "zhikonganfang"
        },
        {
            name: "汽车制造/服务",
            dsid: "13923",
            listname: "zpqiche"
        }]
    },
    {
        category: "网络 | 通信 | 电子",
        cates: [{
            name: "计算机/互联网/通信",
            dsid: "13909",
            listname: "tech"
        },
        {
            name: "电子/电气",
            dsid: "13922",
            listname: "zpjixieyiqi"
        },
        {
            name: "机械/仪器仪表",
            dsid: "38678",
            listname: "zpjixie"
        }]
    },
    {
        category: "法律 | 教育 | 翻译 | 出版",
        cates: [{
            name: "法律",
            dsid: "13908",
            listname: "zpfalvzixun"
        },
        {
            name: "教育培训",
            dsid: "13926",
            listname: "zhuanye"
        },
        {
            name: "翻译",
            dsid: "23196",
            listname: "fanyizhaopin"
        },
        {
            name: "编辑/出版/印刷",
            dsid: "13925",
            listname: "zpxiezuochuban"
        }]
    },
    {
        category: "财会 | 金融 | 保险",
        cates: [{
            name: "财务/审计/统计",
            dsid: "13907",
            listname: "zpcaiwushenji"
        },
        {
            name: "金融/银行/证券/投资",
            dsid: "23194",
            listname: "jinrongtouzi"
        },
        {
            name: "保险",
            dsid: "9250",
            listname: "zpjinrongbaoxian"
        }]
    },
    {
        category: "医疗 | 制药 | 环保",
        cates: [{
            name: "医院/医疗/护理",
            dsid: "13919",
            listname: "zpyiyuanyiliao"
        },
        {
            name: "制药/生物工程",
            dsid: "38677",
            listname: "zpzhiyao"
        },
        {
            name: "环保",
            dsid: "24513",
            listname: "huanbao"
        }]
    },
    {
        category: "建筑 | 装修 | 物业 | 其他",
        cates: [{
            name: "建筑",
            dsid: "13914",
            listname: "zpfangchanjianzhu"
        },
        {
            name: "物业管理",
            dsid: "38672",
            listname: "zpwuye"
        },
        {
            name: "农/林/牧/渔业",
            dsid: "24466",
            listname: "nonglinmuyu"
        },
        {
            name: "其他职位",
            dsid: "13961",
            listname: "zhaopin"
        }]
    }];
    var qzcatelist = [{
        category: "生活 | 服务业",
        cates: [{
            name: "餐饮",
            dsid: "13136",
            listname: "qzzplvyoujiudian"
        },
        {
            name: "家政保洁/安保",
            dsid: "13083",
            listname: "qzjiazhengbaojiexin"
        },
        {
            name: "美容/美发",
            dsid: "13093",
            listname: "qzmeirongjianshen"
        },
        {
            name: "酒店",
            dsid: "391123",
            listname: "qzjiudianzp"
        },
        {
            name: "旅游",
            dsid: "38824",
            listname: "qzzpjiudian"
        },
        {
            name: "娱乐/休闲",
            dsid: "13146",
            listname: "qzzpwentiyingshi"
        },
        {
            name: "保健按摩",
            dsid: "38829",
            listname: "qzzpanmo"
        },
        {
            name: "运动健身",
            dsid: "38830",
            listname: "qzzpjianshen"
        }]
    },
    {
        category: "人力 | 行政 | 管理",
        cates: [{
            name: "人事/行政/后勤",
            dsid: "13126",
            listname: "qzrenli"
        },
        {
            name: "司机",
            dsid: "13080",
            listname: "qzsiji"
        },
        {
            name: "高级管理",
            dsid: "13897",
            listname: "qzzpguanli"
        }]
    },
    {
        category: "销售 | 客服 | 采购 | 淘宝",
        cates: [{
            name: "销售",
            dsid: "13139",
            listname: "qzyewu"
        },
        {
            name: "客服",
            dsid: "13122",
            listname: "qzkefu"
        },
        {
            name: "贸易/采购",
            dsid: "13133",
            listname: "qzzpshangwumaoyi"
        },
        {
            name: "超市/百货/零售",
            dsid: "13803",
            listname: "qzchaoshishangye"
        },
        {
            name: "淘宝职位",
            dsid: "38665",
            listname: "qzzptaobao"
        },
        {
            name: "房产中介",
            dsid: "38823",
            listname: "qzzpfangchan"
        }]
    },
    {
        category: "市场 | 媒介 | 广告 | 设计",
        cates: [{
            name: "市场/媒介/公关",
            dsid: "13125",
            listname: "qzshichang"
        },
        {
            name: "广告/会展/咨询",
            dsid: "13140",
            listname: "qzzpguanggao"
        },
        {
            name: "美术/设计/创意",
            dsid: "38826",
            listname: "qzzpmeishu"
        }]
    },
    {
        category: "生产 | 物流 | 质控 | 汽车",
        cates: [{
            name: "普工/技工",
            dsid: "13137",
            listname: "qzzpshengchankaifa"
        },
        {
            name: "生产管理/研发",
            dsid: "38825",
            listname: "qzzpshengchan"
        },
        {
            name: "物流/仓储",
            dsid: "13134",
            listname: "qzzpwuliucangchu"
        },
        {
            name: "服装/纺织/食品",
            dsid: "24581",
            listname: "qzxiaofeipin"
        },
        {
            name: "质控/安防",
            dsid: "24571",
            listname: "qzzhikonganfang"
        },
        {
            name: "汽车制造/服务",
            dsid: "13145",
            listname: "qzzpqiche"
        }]
    },
    {
        category: "网络 | 通信 | 电子",
        cates: [{
            name: "计算机/互联网/通信",
            dsid: "13129",
            listname: "qztech"
        },
        {
            name: "电子/电气",
            dsid: "13144",
            listname: "qzzpjixieyiqi"
        },
        {
            name: "机械/仪器仪表",
            dsid: "38828",
            listname: "qzzpjixie"
        }]
    },
    {
        category: "法律 | 教育 | 翻译 | 出版",
        cates: [{
            name: "法律",
            dsid: "13128",
            listname: "qzzpfalvzixun"
        },
        {
            name: "教育培训",
            dsid: "13148",
            listname: "qzzhuanye"
        },
        {
            name: "翻译",
            dsid: "23197",
            listname: "qzfanyizhaopin"
        },
        {
            name: "编辑/出版/印刷",
            dsid: "13147",
            listname: "qzzpxiezuochuban"
        }]
    },
    {
        category: "财会 | 金融 | 保险",
        cates: [{
            name: "财务/审计/统计",
            dsid: "13127",
            listname: "qzzpcaiwushenji"
        },
        {
            name: "金融/银行/证券/投资",
            dsid: "23195",
            listname: "qzjinrongtouzi"
        },
        {
            name: "保险",
            dsid: "13132",
            listname: "qzzpjinrongbaoxian"
        }]
    },
    {
        category: "医疗 | 制药 | 环保",
        cates: [{
            name: "医院/医疗/护理",
            dsid: "13141",
            listname: "qzzpyiyuanyiliao"
        },
        {
            name: "制药/生物工程",
            dsid: "38827",
            listname: "qzzpzhiyao"
        },
        {
            name: "环保",
            dsid: "24515",
            listname: "qzhuanbao"
        }]
    },
    {
        category: "建筑 | 装修 | 物业 | 其他",
        cates: [{
            name: "建筑",
            dsid: "13135",
            listname: "qzzpfangchanjianzhu"
        },
        {
            name: "物业管理",
            dsid: "38822",
            listname: "qzzpwuye"
        },
        {
            name: "农/林/牧/渔业",
            dsid: "24476",
            listname: "qznonglinmuyu"
        },
        {
            name: "其他职位",
            dsid: "13149",
            listname: "qzzhaopin"
        }]
    }];
    return qzcatelist
});
define("job/busi.resume.listSearch", ["./api.resume.listSecondJobCates"],
function(qzcatelist) {
    var isIE = !!window.ActiveXObject,
    isIE6 = isIE && !window.XMLHttpRequest,
    isIE7 = !!window.navigator.userAgent.toUpperCase().match("MSIE 7.0");
    $(document).ready(function() { (function() {
            $(".search-box").hover(function() {
                $(".search-icon").addClass("search-icon-hover");
                $(".search-btn").addClass("search-btn-hover")
            },
            function() {
                $(".search-icon").removeClass("search-icon-hover");
                $(".search-btn").removeClass("search-btn-hover")
            });
            $(".search-triggers").hover(function() {
                $(".search-icon").find("i").addClass("rotate-icon")
            },
            function() {
                $(".search-icon").find("i").removeClass("rotate-icon")
            });
            var searchTrigger = $(".search-triggers"),
            searchItems = searchTrigger.find(".search-items"),
            searchItem = searchItems.find(".search-item");
            searchItems.click(function(e) {
                var txt = e.target.innerText;
                if (txt == "全部") {
                    searchItem[0].innerText = "全部";
                    searchItem[1].innerText = "公司名"
                } else {
                    searchItem[0].innerText = "公司名";
                    searchItem[1].innerText = "全部"
                }
                searchTrigger.css({
                    overflow: "hidden"
                })
            }).hover(function() {
                searchTrigger.css({
                    overflow: "visible"
                })
            },
            function() {
                searchTrigger.css({
                    overflow: "hidden"
                })
            });
            $(".search-icon").hover(function() {
                searchTrigger.css({
                    overflow: "visible"
                })
            },
            function() {
                searchTrigger.css({
                    overflow: "hidden"
                })
            });
            var jList = {};
            jList.searchBtn = function() {
                var loc = location.href;
                var url = $("#rooturl").val();
                var urlArr = url.split("/");
                if (urlArr.length == 6) {
                    url = urlArr[0] + "//" + urlArr[2] + "/" + urlArr[4]
                }
                var txt = $.trim($(".search-input").val());
                if ($.trim(searchItem[0].innerText) == "全部") {
                    if (!txt) {
                        if (loc.indexOf("?key") !== -1) {
                            location.href = url;
                            return
                        } else {
                            return
                        }
                    }
                    location.href = $.urlAppend(url, "key=" + encodeURI(txt))
                } else {
                    if (!txt) {
                        if (loc.indexOf("?gongsi") !== -1) {
                            location.href = url;
                            return
                        } else {
                            return
                        }
                    }
                    location.href = $.urlAppend(url, "gongsi=" + encodeURI(txt))
                }
            };
            $(".search-btn").click(function() {
                jList.searchBtn()
            });
            $(".search-input").focus(function() {
                $(document).keydown(function(e) {
                    if (e.keyCode == 13) {
                        jList.searchBtn()
                    }
                })
            });
            jList.selonBtn = function() {
                var txt = $.trim($(".sel-con-filter").val());
                var url = location.href;
                if (url.indexOf("?itext") !== -1) {
                    if (url.split("?itext")[1].indexOf("&") !== -1) {
                        var expUrlArr = url.split("?itext")[1].split("&").slice(1);
                        location.href = $.urlAppend(url.split("?itext")[0], "itext=" + encodeURI(txt)) + "&" + expUrlArr.join("&")
                    } else {
                        location.href = $.urlAppend(url.split("?itext")[0], "itext=" + encodeURI(txt))
                    }
                } else if (url.indexOf("&itext") !== -1) {
                    if (url.split("&itext")[1].indexOf("&") !== -1) {
                        var expUrlArr = url.split("&itext")[1].split("&").slice(1);
                        location.href = $.urlAppend(url.split("&itext")[0], "itext=" + encodeURI(txt)) + "&" + expUrlArr.join("&")
                    } else {
                        location.href = $.urlAppend(url.split("&itext")[0], "itext=" + encodeURI(txt))
                    }
                } else {
                    location.href = $.urlAppend(url, "itext=" + encodeURI(txt))
                }
            };
            $(".sel-on-btn").click(function() {
                jList.selonBtn()
            });
            $(".sel-con-filter").focus(function() {
                $(document).keydown(function(e) {
                    if (e.keyCode == 13) {
                        jList.selonBtn()
                    }
                })
            });
            $(".sel-con-filter").focus(function() {
                if (this.placeholder) {
                    this.placeholder = ""
                }
            }).blur(function() {
                if (!$(this).val()) {
                    if (this.placeholder) {
                        this.placeholder = "在当前条件下筛选"
                    }
                }
            });
            var filterBtn = function(item, filterBtnBool) {
                $(item).focus(function() {
                    if ($(".age-btn-filter").css("display") == "none") {
                        $(".age-btn-filter").show()
                    }
                })
            };
            filterBtn("#startage");
            filterBtn("#endage");
            $("#startage, #endage").click(function(e) {
                e.stopPropagation()
            });
            $(".seljobAge").click(function() {
                $(".age-btn-filter").hide()
            });
            $(document).click(function() {
                $(".age-btn-filter").hide()
            });
            $(".age-btn-filter").click(function() {
                var locHref = location.href;
                var startAge = $("#startage").val();
                var endAge = $("#endage").val();
                var selected = $(".seljobAge li a strong");
                if (selected.text() !== "全部") {
                    var nowHref = selected.parent().attr("href");
                    if (nowHref.indexOf("pve_5569") !== -1) {
                        if (nowHref.indexOf("_pve_5569") !== -1) {
                            var newHref = nowHref.split("_pve_5569");
                            if (newHref[1].indexOf("?") !== -1) {
                                locHref = newHref[0] + "/?" + newHref[1].split("?")[1]
                            } else {
                                locHref = newHref[0]
                            }
                        } else {
                            if (nowHref.indexOf("?") !== -1) {
                                locHref = nowHref.split("pve_5569")[0] + "?" + nowHref.split("pve_5569")[1].split("?")[1]
                            } else {
                                locHref = nowHref.split("pve_5569")[0]
                            }
                        }
                    } else if (nowHref.indexOf("pve_5571") !== -1) {
                        if (nowHref.indexOf("_pve_5571") !== -1) {
                            var newHref = nowHref.split("_pve_5571");
                            if (newHref[1].indexOf("?") !== -1) {
                                locHref = newHref[0] + "/?" + newHref[1].split("?")[1]
                            } else {
                                locHref = newHref[0]
                            }
                        } else {
                            if (nowHref.indexOf("?") !== -1) {
                                locHref = nowHref.split("pve_5571")[0] + "?" + nowHref.split("pve_5571")[1].split("?")[1]
                            } else {
                                locHref = nowHref.split("pve_5571")[0]
                            }
                        }
                    }
                }
                if (locHref.indexOf("?age=") !== -1) {
                    var urlArr = locHref.split("?age=");
                    if (urlArr[1].indexOf("&") !== -1) {
                        var expUrlArr = urlArr[1].split("&");
                        locHref = urlArr[0] + "?" + expUrlArr.slice(1).join("&");
                    } else {
                        locHref = locHref.split("?age=")[0]
                    }
                } else if (locHref.indexOf("&age=") !== -1) {
                    if (locHref.split("&age=")[1].indexOf("&") !== -1) {
                        var expUrlArr = locHref.split("&age=")[1].split("&");
                        locHref = locHref.split("&age=")[0] + "&" + expUrlArr.slice(1).join("&")
                    } else {
                        locHref = locHref.split("&age=")[0]
                    }
                }
                if (startAge && !endAge) {
                    startAge = parseInt(startAge, 10);
                    if (isNaN(startAge) || startAge < 16 || startAge > 60) {
                        return
                    } else {
                        locHref = $.urlAppend(locHref, "age=" + startAge + "_*")
                    }
                } else if (!startAge && endAge) {
                    endAge = parseInt(endAge, 10);
                    if (!isNaN(endAge) && endAge < 60 && endAge > 16) {
                        locHref = $.urlAppend(locHref, "age=*_" + endAge)
                    } else {
                        return
                    }
                } else if (startAge && endAge) {
                    startAge = parseInt(startAge, 10);
                    endAge = parseInt(endAge, 10);
                    if (startAge > endAge || isNaN(endAge) || isNaN(startAge)) {
                        return
                    } else if (startAge < 16 || startAge > 60) {
                        return
                    } else if (endAge < 16 || endAge > 60) {
                        return
                    } else {
                        locHref = $.urlAppend(locHref, "age=" + startAge + "_" + endAge)
                    }
                } else {
                    return
                }
                location.href = locHref
            });
            if ($("#sel-job-cate").length) {
                var leibie = $(".jobcatebox");
                var jobcateHtml = "<tbody>";
                var trsHtml = "";
                var cur_dsid = $("#sel-job-cate").attr("dsid");
                for (var i = 0,
                leni = qzcatelist.length; i < leni; ++i) {
                    var cate = qzcatelist[i];
                    var categories = cate.cates;
                    var trHtml = "<tr><th>" + cate.category + '</th><td><ul class="jobcatelist">';
                    var lis = "";
                    if (cur_dsid) {
                        for (var j = 0,
                        lenj = categories.length; j < lenj; ++j) {
                            var className = "";
                            if ((j + 1) % 4 == 0) {
                                className = "leftShow"
                            }
                            var category = categories[j];
                            if (cur_dsid == category.dsid) {
                                lis += '<li class="selected' + className + '" dsid="' + category.dsid + '"><p><span><a href="/' + category.listname + '/" cln="' + category.listname + '">' + category.name + "</a></span></p></li>"
                            } else {
                                lis += '<li dsid="' + category.dsid + '" class="' + className + '"><p><span><a href="/' + category.listname + '/" cln="' + category.listname + '">' + category.name + "</a></span></p></li>"
                            }
                        }
                    } else {
                        for (var j = 0,
                        lenj = categories.length; j < lenj; ++j) {
                            var category = categories[j];
                            var className = "";
                            if ((j + 1) % 4 == 0) {
                                className = "leftShow"
                            }
                            lis += '<li dsid="' + category.dsid + '" class="' + className + '"><p><span><a href="/' + category.listname + '/" cln="' + category.listname + '">' + category.name + "</a></span></p></li>"
                        }
                    }
                    trHtml += lis + "</ul></td></tr>";
                    trsHtml += trHtml
                }
                jobcateHtml += trsHtml + "</tbody>";
                leibie.html(jobcateHtml);
                var selcateid = leibie.attr("selectedid");
                if (selcateid) {
                    var $this = leibie.find("li[dsid='" + selcateid + "']");
                    if (1 == $this.length) {
                        var url = "http://api.58.com/comm/cate/?api_type=json&api_pid=" + selcateid + "&api_callback=?";
                        $.getJSON(url,
                        function(data) {
                            var comms_getqzcatelist = data.comms_getcatelist;
                            var links = '<div class="subcate">';
                            for (var i = 0,
                            len = comms_getqzcatelist.length; i < len; ++i) {
                                var d = comms_getqzcatelist[i];
                                links += '<a href="javascript:;">' + d.cateName + "</a>"
                            }
                            links += "</div>";
                            $this.children("p:first").after(links);
                            $this.find(".subcate a").click(subcate_a_click)
                        })
                    }
                }
            }
            var hylb = $("#divIndCate a.iselect");
            if (hylb.length > 0) {
                $(".hire_item").attr("leibie", hylb.attr("href"))
            } else {
                $(".hire_item").attr("leibie", location.href)
            }
            if (location.href.indexOf("/1/") > 0) {
                $(".hire_item>span").text($(".hirelist li:last").text())
            } else {
                $(".hire_item [biz=0]").parent().addClass("ophover")
            }
        })(); (function() {
            var cookie_data = getCookie("ser_history"),
            his_ser_con = $("#his-search-con");
            if (cookie_data) {
                if (his_ser_con.children("a").length) {
                    his_ser_con.html("")
                }
                his_ser_con.show().siblings("i").show();
                var parts = cookie_data.split("++");
                var str = "<span class='f-c32'>最近搜索：</span>";
                for (var i = 0,
                l = parts.length; i < l;) {
                    str += '<a href="' + parts[i + 1] + '" class="his">' + parts[i] + "</a>";
                    i += 2
                }
                his_ser_con.append(str)
            } else {
                his_ser_con.hide().siblings("i").hide()
            }
        })();
        function subcate_a_click() {
            var $this = $(this);
            window.location = $this.attr("href");
            return
        }
        function build_type_ul(pid, node) {
            if ($("#sel-job-cate").length) {
                var url = "http://api.58.com/comm/cate/?api_type=json&api_pid=" + pid + "&api_callback=?";
                $.getJSON(url,
                function(data) {
                    var comms_getqzcatelist = data.comms_getcatelist;
                    var host = location.href.replace("http://", "");
                    var parts = host.split("/");
                    var jobArea0 = $(".seljobArea li a").eq(0);
                    var n = jobArea0.hasClass("selecteds") && jobArea0.attr("para") == undefined ? 1 : 2;
                    var erji = node.find("p span a").attr("cln");
                    parts[n] = erji;
                    var links = '<div class="subcate"><a href="http://' + parts.join("/") + '" p="' + pid + '">全部</a>';
                    for (var i = 0,
                    len = comms_getqzcatelist.length; i < len; ++i) {
                        var d = comms_getqzcatelist[i];
                        if (d) {
                            var qzcatelist = d.catelist;
                            parts[n] = qzcatelist;
                            var new_host = parts.join("/");
                            links += '<a href="http://' + new_host + '" leibie="' + qzcatelist + '">' + d.cateName + "</a>"
                        }
                    }
                    links += "</div>";
                    node.children("p:first").after(links);
                    node.find(".subcate a").click(function() {
                        var cur_node = $(this),
                        leibie = cur_node.attr("leibie"),
                        text = cur_node.html(),
                        url = this.href;
                        var http = "http://";
                        var urlArr = url.split("/");
                        if (cur_node.text() == "全部") {
                            var pLeibie = $(this).parent().prev("p").find("a").attr("cln");
                            location.href = urlArr[0] + "//" + urlArr[2] + "/" + pLeibie
                        } else {
                            location.href = urlArr[0] + "//" + urlArr[2] + "/" + leibie
                        }
                        $(".jobcatebox").find(".current").removeClass("current");
                        cur_node.addClass("current");
                        if (!leibie) {
                            var cur_parent = $(this).parents("li.selected").find("a[cln]");
                            leibie = cur_parent.attr("cln");
                            text = cur_parent.html()
                        }
                        $("#sel-job-cate").children("span").html(text).end().attr({
                            leibie: leibie,
                            u: cur_node.attr("href"),
                            dsid: cur_node.parent().parent("li").attr("dsid")
                        });
                        $("li.sel-color").removeClass("sel-color");
                        $("li.selected").removeClass("selected").addClass("sel-color").find(".subcate").hide();
                        $("#divJobCate").hide();
                        $(".masklayer").hide();
                        $("#goTab,#zpzs").css("z-index", 999);
                        return false
                    })
                })
            }
        }
        function build_city_ul(data) {
            var list = data.comms_getcitylist;
            var lis = "";
            var locasel = $(".distlist .locasel");
            var href = locasel.attr("href"),
            cat = "";
            if (href.indexOf("http://") < 0) {
                href = href.substr(href.indexOf("/", 1))
            } else {
                cat = href.substr(href.indexOf("/", href.indexOf("http://") + 7));
                href = href.substr(0, href.indexOf("/", href.indexOf("http://") + 7))
            }
            var leibie = location.href.replace("http://", "").split("/")[1];
            var hasSelected = false;
            for (var i = 0,
            len = list.length; i < len; ++i) {
                var item = list[i];
                if (!item.isVisible) {
                    continue
                }
                var citylist = item.citylist;
                var strClass = "";
                if (citylist === leibie) {
                    strClass = ' class="locasel" ';
                    hasSelected = true
                }
                if (href.indexOf("http://") < 0) {
                    lis += "<li><a " + strClass + "_param=area=" + item.localID + ' href="/' + citylist + href + '" cityid="' + item.cityid + '">' + item.cityname + "</a></li>"
                } else {
                    lis += "<li><a " + strClass + "_param=area=" + item.localID + ' href="/' + citylist + cat + '" cityid="' + item.cityid + '">' + item.cityname + "</a></li>"
                }
            }
            if (!hasSelected) {
                strClass = ' class="locasel" '
            } else {
                strClass = ""
            }
            lis = "<li><a " + strClass + ' href="' + locasel.attr("href") + '">不限</a></li>' + lis;
            return lis
        }
        function setCookie(name, value) {
            var never = new Date;
            never.setTime(never.getTime() + 30 * 24 * 60 * 60 * 1e3);
            var expString = "expires=" + never.toGMTString() + ";";
            document.cookie = name + "=" + escape(value) + ";" + expString + ";path=/"
        }
        function getCookie(name) {
            var result = null;
            var myCookie = "" + document.cookie + ";";
            var searchName = name + "=";
            var startOfCookie = myCookie.indexOf(searchName);
            var endOfCookie;
            if (startOfCookie != -1) {
                startOfCookie += searchName.length;
                endOfCookie = myCookie.indexOf(";", startOfCookie);
                result = unescape(myCookie.substring(startOfCookie, endOfCookie))
            }
            return result
        }
        window.do_search_job = function() {
            var value = $("#keyword1").val(),
            url = location.href;
            if (value == "关键词" || value == "想找什么职位？输入关键词试试") {
                value = ""
            }
            var cookie_text = value;
            url = url.replace("http://", "");
            var parts = url.split("/");
            var n = 2;
            var jobArea0 = $(".seljobArea li a").eq(0);
            if (jobArea0.hasClass("selecteds") && jobArea0.attr("para") == undefined) {
                n = 1
            }
            if ($("#sel-job-cate").length) {
                var leibie = $("#sel-job-cate").attr("leibie");
                if (leibie) {
                    if ($("#sel-job-cate").length) {
                        if (leibie == "all") {
                            parts[n] = "searchjob"
                        } else {
                            parts[n] = leibie
                        }
                    }
                }
                var type_text = $("#sel-job-cate").children("span").text();
                if (type_text != "职位不限") {
                    if (cookie_text == "") {
                        cookie_text = type_text
                    } else {
                        cookie_text = type_text + "+" + cookie_text
                    }
                }
            }
            if (value.length) {
                parts[n] = "zhaojianzhi";
                if ($("#sel-job-cate").length) {
                    parts[n] = "searchjob"
                }
            }
            if (n == 1) {
                parts = parts[0] + "/" + parts[1]
            } else {
                parts = parts[0] + "/" + parts[1] + "/" + parts[2]
            }
            var sel_con_pve = $(".search_oper").find(".sel-con[sel=t][_pve]");
            if (sel_con_pve.length) {
                var pve = "";
                sel_con_pve.each(function(i) {
                    if (i > 0) {
                        pve += "_"
                    }
                    pve += $(this).attr("_pve")
                });
                parts += "/" + pve
            }
            var sel_con_param = $(".search_oper").find(".sel-con[sel=t][_param]");
            if (sel_con_param.length) {
                var str = "";
                sel_con_param.each(function(i) {
                    param = $(this).attr("_param");
                    param = param.split("=");
                    str += param[0] + "=" + param[1] + "&"
                });
                str = str.substring(0, str.length - 1);
                parts += "/?" + str
            }
            url = parts;
            if (value) {
                var keyword = encodeURI(escape(encodeURIComponent(encodeURI(value)))),
                kn = "key=";
                url += (url.indexOf("?") > 0 ? "&": "?") + kn + keyword + "&sourcetype=4"
            }
            var sel_his_node = $(".sel-con[history=t][sel=t]");
            if (sel_his_node.length || value) {
                sel_his_node.each(function(i) {
                    if ($(this).hasClass("industry")) {
                        cookie_text += "+" + $(this).find(".current").text()
                    } else if ($(this).hasClass("sel-job-type")) {} else {
                        cookie_text += "+" + $(this).children("span").text()
                    }
                });
                if (cookie_text[0] == "+") {
                    cookie_text = cookie_text.substring(1)
                }
                var pos = url.indexOf("?");
                var cookie_url = url;
                if (pos > 0) {
                    cookie_url = url.substring(0, pos)
                }
                if (value) {
                    cookie_url += "/?key=" + keyword
                }
                cookie_text = cookie_text.replace(/\s*/g, "");
                if (cookie_text.length > 22) {
                    cookie_text = cookie_text.substring(0, 21) + "..."
                }
                if (n == 2) {
                    var p = cookie_url.split("/");
                    p[1] = "";
                    cookie_url = p.join("/");
                    cookie_url = cookie_url.replace("//", "/")
                }
                cookie_url = "http://" + cookie_url;
                cookie_text += "++" + cookie_url;
                var ser_his = getCookie("ser_history");
                if (ser_his) {
                    var arr = ser_his.split("++");
                    if (cookie_text === arr[0] + "++" + arr[1]) {
                        var cookie_tag = 1
                    }
                    cookie_text += "++" + arr[0] + "++" + arr[1]
                }
                if (!cookie_tag) {
                    setCookie("ser_history", cookie_text)
                }
            }
            url = "http://" + url;
            location = url;
            return false
        };
        var filter = $("#filter") || "";
        if (filter.length) { (function() {
                var x = $("#divJobCate");
                if (x.length) {
                    var str = '<h3><span class="fb">选择职位：</span><a href="javascript:void(0);" class="all-job-type">不限</a><a href="javascript:void(0);" class="close"></a></h3>';
                    x.prepend(str);
                    if (x.find(".close").length) {
                        x.find(".close").click(function() {
                            $("#divJobCate,.masklayer").hide();
                            $("#goTab,#zpzs").css("z-index", 999);
                            $("#infolist .w295").css({
                                position: "relative"
                            });
                            if (isIE7 || isIE6) {
                                $("#goTab,#zpzs,.spread-con").show()
                            }
                        });
                        x.find(".all-job-type").click(function() {
                            var nowHref = location.href.split("/");
                            location.href = nowHref[0] + "//" + nowHref[2] + "/searchjob";
                            $("#divJobCate,.masklayer").hide();
                            $("#goTab,#zpzs").css("z-index", 999);
                            $("#infolist .w295").css({
                                position: "relative"
                            });
                            if (isIE7 || isIE6) {
                                $("#goTab,#zpzs,.spread-con").show()
                            }
                            return false
                        })
                    }
                }
            })();
            filter.find(".jobcatelist li").click(function(e) {
                var $this = $(this),
                subcate = $this.find(".subcate"),
                pid = $this.attr("dsid");
                $(".subcate").hide();
                if (!$this.hasClass("selected")) {
                    if (!subcate[0]) {
                        build_type_ul(pid, $this)
                    }
                    subcate.show();
                    $this.addClass("selected")
                } else {
                    subcate.hide();
                    $this.removeClass("selected")
                }
                $(".selJobCatd").addClass("zdx1000");
                e.stopPropagation();
                return false
            }).mouseenter(function() {
                var $this = $(this);
                var span = $this.find("span");
                span.addClass("catehover")
            }).mouseleave(function() {
                var $this = $(this);
                var span = $this.find("span");
                span.removeClass("catehover")
            });
            filter.find(".jobcatelist li.selected").live("mouseleave",
            function() {
                $(this).removeClass("selected").find(".subcate").hide()
            });
            filter.find("#sel-job-cate, .tabselect").click(function() {
                if (filter.find("#divJobCate").is(":hidden")) {
                    ie6_bg();
                    $("#infolist .w295").css({
                        position: "static"
                    });
                    $("#goTab,#zpzs").css("z-index", 9);
                    if (isIE7 || isIE6) {
                        $("#goTab,#zpzs,.spread-con").hide()
                    }
                    filter.find("#divJobCate").show();
                    var dsid = $(this).attr("dsid"),
                    leibie = $(this).attr("leibie"),
                    node = $(this).find("li[dsid=" + dsid + "]");
                    if (dsid) {
                        if (!$(this).find(".current").length) {
                            build_type_ul(dsid, node);
                            node.addClass("selected"); (function() {
                                var nn = node.find("a[leibie=" + leibie + "]");
                                if (nn.length > 0) {
                                    nn.addClass("current")
                                } else {
                                    setTimeout(arguments.callee, 1e3)
                                }
                            })()
                        }
                    }
                    filter.find(".sel-detail:visible,#divIndCate:visible").parents(".sel-con").click();
                    $(".masklayer").show();
                    $("#goTab,#zpzs").css("z-index", 9)
                } else {
                    filter.find("#divJobCate").hide();
                    $(".masklayer").hide();
                    $("#goTab,#zpzs").css("z-index", 999);
                    $("#infolist .w295").css({
                        position: "relative"
                    });
                    if (isIE7 || isIE6) {
                        $("#goTab,#zpzs,.spread-con").show()
                    }
                }
                return false
            });
            filter.find("#divJobCate").click(function() {
                return false
            });
            filter.find(".sel-con").hover(function() {
                $(this).find(".sel-detail").show()
            },
            function() {
                $(this).find(".sel-detail").hide()
            });
            filter.find(".masklayer").click(function() {
                $(this).hide();
                $("#divJobCate").hide();
                $("#goTab,#zpzs").css("z-index", 999);
                $("#infolist .w295").css({
                    position: "relative"
                });
                if (isIE7 || isIE6) {
                    $("#goTab,#zpzs,.spread-con").show()
                }
                return false
            });
            function ie6_bg() {
                var isIE = $.browser.msie && $.browser.version == "6.0";
                if (isIE) {
                    var gray_bg = $(".masklayer");
                    var search_oper_t = $(".filter")[0].offsetTop,
                    search_oper_l = $(".filter")[0].offsetLeft,
                    fir_t = $(".nav")[0].offsetTop,
                    fir_l = $(".nav")[0].offsetLeft;
                    gray_bg.css({
                        top: document.documentElement.scrollTop - search_oper_t - fir_t - 1 + "px",
                        left: document.documentElement.scrollLeft - search_oper_l - fir_l - 1 + "px"
                    })
                }
            }
            $(window).bind("resize scroll", ie6_bg);
            filter.find(".distlist li").live("hover",
            function(event) {
                if (!$(this).children("a").hasClass("locasel")) {
                    if (event.type == "mouseenter") {
                        $(this).children("a").css({
                            backgroundColor: "#EE7711",
                            color: "#FFFFFF",
                            padding: "3px"
                        })
                    } else {
                        $(this).children("a").css({
                            backgroundColor: "",
                            color: "",
                            padding: ""
                        })
                    }
                }
                return false
            }).click(function() {
                filter.find("#sel_address").css({
                    height: "24px",
                    "border-bottom-width": "1px"
                });
                $(this).parent(".distlist").find(".locasel").removeClass("locasel").css({
                    backgroundColor: "",
                    color: "",
                    padding: ""
                });
                $(this).children("a").addClass("locasel");
                if ($(this).index() == 0) {
                    filter.find(".business").hide()
                } else {
                    filter.find(".business").show();
                    if (!$(this).hasClass("locasel")) {
                        filter.find(".business>span").text("--商圈--").css("color", "#999999")
                    }
                    var pid = $(this).children("a").attr("p");
                    if (pid) {
                        var p = "p" + pid;
                        var url = "http://api.58.com/comm/city/?api_type=json&api_pid=" + pid + "&api_callback=?";
                        $.getJSON(url,
                        function(data) {
                            if (data.comms_getcitylist.length > 0) {
                                var ulHtml = build_city_ul(data);
                                $("#business_circle ul").html(ulHtml);
                                var business = $("#business_circle .distlist");
                                business.delegate("li", "click",
                                function() {
                                    var node = $(this);
                                    text = node.children("a").text(),
                                    f_color = "#000000",
                                    sel = "t",
                                    param = node.children("a").attr("_param");
                                    if (node.index() == 0) {
                                        sel = "";
                                        text = "--商圈--";
                                        f_color = "#999999"
                                    }
                                    $(this).parent(".distlist").find(".locasel").removeClass("locasel").css({
                                        backgroundColor: "",
                                        color: "",
                                        padding: ""
                                    }).parents(".sel-con").css({
                                        height: "24px",
                                        "border-bottom-width": "1px"
                                    });
                                    $(this).children("a").addClass("locasel");
                                    node.parents(".sel-detail").hide().prev("span").html(text).css("color", f_color);
                                    if (sel) {
                                        node.parents(".sel-con").attr({
                                            sel: sel,
                                            _param: param
                                        })
                                    } else {
                                        node.parents(".sel-con").attr("sel", "")
                                    }
                                    return false
                                });
                                var businessText = $("#business_circle .locasel").text();
                                if ("不限" !== businessText) {
                                    $("#business_circle>span").text(businessText)
                                }
                                $("#business_circle").show()
                            } else {
                                $("#business_circle").hide()
                            }
                        })
                    }
                }
            });
            filter.find(".sel-detail li").hover(function(event) {
                if (!$(event.target).parents(".industry,.distlist").length) {
                    if (event.type == "mouseenter") {
                        $(this).siblings(".hover").removeClass("hover");
                        $(this).addClass("hover")
                    }
                }
            }).click(function(event) {
                var node = $(this);
                text = node.text(),
                f_color = "#000000",
                sel = "t",
                targetUrl = node.attr("href");
                node.parent().parent(".sel-detail").hide().prev("span").html(text).css("color", f_color).parent(".sel-con").css({
                    height: "24px",
                    "border-bottom-width": "1px"
                });
                if (targetUrl) {
                    location.href = targetUrl
                }
                return false
            });
            filter.find("#keyword1").keydown(function(e) {
                var keyCode = e.keyCode;
                if (13 == keyCode) {
                    do_search_job()
                }
            }).keyup(function() {
                win1.GetContentData()
            });
            filter.find("#searchbtn").bind("click",
            function() {
                do_search_job();
                return false
            }); (function() {
                var input_w = filter.find(".search-keyword input").width();
                filter;
                var url = location.href,
                key_pos = url.indexOf("key=");
                if (key_pos > 0) {
                    var key_pos_end = "",
                    value = url.substring(key_pos + 4);
                    if (url.indexOf("&", key_pos) > 0) {
                        key_pos_end = url.indexOf("&", key_pos);
                        value = url.substring(key_pos + 4, key_pos_end)
                    }
                    var keyword = decodeURI(unescape(decodeURIComponent(decodeURI(value)))),
                    className = "keyword2"
                } else {
                    var keyword = "想找什么职位？输入关键词试试",
                    className = "keyword"
                }
                filter.find("#keyword1").val(keyword).attr("class", className);
                var pve_pos = url.indexOf("pve_"),
                pve_arr1 = url.match(/pve\d+=\d{1,4}/gi),
                arr1 = [],
                arr2 = [];
                if (pve_arr1) {
                    for (var k = pve_arr1.length; k--;) {
                        arr1 = pve_arr1[k].split("=");
                        arr2.push(arr1[0].substr(0, 3));
                        arr2.push(arr1[0].substr(3));
                        arr2.push(arr1[1])
                    }
                }
                if (pve_pos > 0 || pve_arr1) {
                    var pve_node = filter.find(".sel-detail .unsel[_pve]"),
                    pve_data = [];
                    pve_node.each(function() {
                        pve_data.push($(this).attr("_pve"))
                    });
                    var pve_pos_end = "",
                    pve = url.substring(pve_pos);
                    if (url.indexOf("/", pve_pos) > 0) {
                        pve_pos_end = url.indexOf("/", pve_pos);
                        pve = url.substring(pve_pos, pve_pos_end)
                    }
                    var arr = pve.split("_");
                    if (arr.length == 1) {
                        arr = arr2
                    }
                    var i = 0,
                    j = 0,
                    arr_pve = [],
                    len = arr.length;
                    while (i < len) {
                        arr_pve[j] = arr[i] + "_" + arr[i + 1] + "_" + arr[i + 2];
                        for (var k = 0,
                        l = pve_data.length; k < l; k++) {
                            if (arr_pve[j].indexOf(pve_data[k]) >= 0) break
                        }
                        if (k == l) {
                            var node = filter.find(".industry");
                            node.find("li a[_pve=" + arr_pve[j] + "]").click()
                        } else {
                            var node = filter.find(".unsel[_pve=" + pve_data[k] + "]").parents(".sel-con");
                            node.find("li[_pve=" + arr_pve[j] + "]").click()
                        }
                        i += 3;
                        j++
                    }
                }
                var param_arr = ["local=", "area="];
                for (var i = 0,
                len = param_arr.length; i < len; i++) {
                    var param_pos = url.indexOf(param_arr[i]);
                    if (param_pos > 0) {
                        var param_pos_end = "",
                        param = url.substring(param_pos);
                        if (url.indexOf("&", param_pos) > 0) {
                            param_pos_end = url.indexOf("&", param_pos);
                            param = url.substring(param_pos, param_pos_end)
                        }
                        if (i == 0) {
                            filter.find(".sel-detail li[_param=" + param + "]").click()
                        } else { (function() {
                                if (filter.find(".distlist li a[_param=" + param + "]").length) {
                                    filter.find(".distlist li a[_param=" + param + "]").click()
                                } else {
                                    setTimeout(arguments.callee, 1e3)
                                }
                            })()
                        }
                    }
                }
                var page_id = ____json4fe.catentry.listname ? ____json4fe.catentry.listname: ____json4fe.catentry[0].dispid;
                if (page_id == 9225 && ____json4fe.catentry.length > 1) {
                    var erji_leibie = ____json4fe.catentry[1].listname,
                    erji_node = filter.find("#divJobCate li[dsid] a[cln=" + erji_leibie + "]").parents("li[dsid]");
                    erji_pid = erji_node.addClass("sel-color").attr("dsid");
                    build_type_ul(erji_pid, erji_node); (function() {
                        var sanji_node = erji_node.find(".subcate");
                        if (sanji_node.length) {
                            if (____json4fe.catentry.length > 2) {
                                var sanji_leibie = ____json4fe.catentry[2].listname;
                                text = sanji_node.find("a[leibie=" + sanji_leibie + "]").addClass("current").text()
                            } else {
                                sanji_node.find("a:first").addClass("current")
                            }
                        } else {
                            setTimeout(arguments.callee, 1e3)
                        }
                    })()
                }
                if (filter.find(".sel-type .sel-con[sel=t]").length) {
                    filter.find(".sel-type").show();
                    var str = '<a href="javascript:void(0);">收起高级搜索</a><i class="dTopArrow"></i>';
                    filter.find(".moreTypeSel").html(str)
                }
            })()
        }
        var main = $(".main") || "",
        maincon = $(".main .maincon") || "";
        if (maincon.length) {
            maincon.find("#infolist").delegate(".checkboxi", "click",
            function(event) {
                if (!$.isEmpty($(this).attr("infoid"))) {
                    $(this).parent().toggleClass("iselect")
                }
            });
            $("i.selAllIcon").click(function(event) {
                if ($(this).hasClass("selected")) {
                    $("i.selAllIcon").removeClass("selected");
                    $(".checkboxi").parent().removeClass("iselect")
                } else {
                    $("i.selAllIcon").addClass("selected");
                    $(".checkboxi").parent().addClass("iselect")
                }
            });
            main.find(".welfare .selWel").find("li").hover(function(event) {
                if (event.type == "mouseenter") {
                    if (!$(this).find("i").hasClass("selected")) {
                        $(this).find("i").addClass("hover").end().find("a").css("color", "#FA8208")
                    }
                } else {
                    $(this).find("i").removeClass("hover").end().find("a").css("color", "#404040")
                }
            });
            function iselectSee(ddIselect, type) {
                var userArray = [],
                infoids = [];
                if (ddIselect.length == 0) {
                    alert("请选择要查看的简历。")
                } else if (ddIselect.length == 1) {
                    var singleRid = "";
                    if (type == "list") {
                        singleRid = ddIselect.next("dt").find("a").attr("href")
                    } else {
                        singleRid = ddIselect.find(".infocardMessageOne>a").attr("href")
                    }
                    window.open(singleRid)
                } else {
                    var firstRid = ddIselect.eq(0).children("i").attr("infoid"),
                    sourcepath = ____json4fe.sourcepath || "",
                    followparam = ddIselect.eq(0).parent().find(".mainList-down").attr("followparam"),
                    url = "//jianli.58.com/resumedetail/batch/" + firstRid + "?page=0&sourcepath=" + sourcepath + "&followparam=" + followparam,
                    userArrayStr = "";
                    ddIselect.each(function(index) {
                        var rid = $(this).children("i").attr("infoid"),
                        name = $(this).attr("username"),
                        followparam = $(this).parent().find(".mainList-down").attr("followparam"),
                        rName = {
                            rid: rid,
                            name: name,
                            followparam: followparam
                        };
                        userArray.push(rName)
                    });
                    userArrayStr = JSON.stringify(userArray);
                    if ($("#batchWatch").length > 0) {
                        $("#batchWatch").attr("action", url);
                        $("#batchRidNames").val(userArrayStr);
                        $("#fontkey").val(____json4fe.fontkey)
                    } else {
                        formHtml = "<form id='batchWatch' action='" + url + "' method='post' target='_blank' style='display:none'>" + "<input id='batchRidNames' name='batchRidNames' value='" + userArrayStr + "'/>" + "<input id='fontkey' name='fontkey' value='" + ____json4fe.fontkey + "'/>" + "</form>";
                        $("body").append(formHtml)
                    }
                    $("#batchWatch").submit()
                }
            }
            main.find(".ser-res").click(function() {
                var ddIselect = main.find("#infolist dd.iselect") || "",
                liIselect = main.find("#infolist li.iselect") || "",
                seeType = $(".see-all").attr("seetype");
                if (seeType == 0) {
                    iselectSee(liIselect, "card")
                } else if (seeType == 1) {
                    iselectSee(ddIselect, "list")
                }
            });
            main.find("#reSearch").click(function() {
                $(document).scrollTop(0);
                $("#keyword1").val("").focus()
            })
        }
    });
    $(function() {
        function triggerLog(log) {
            window.clickLog && window.window.clickLog && window.clickLog(log)
        }
        if (____json4fe.catentry[0].dispid == "13952") {
            $(".seljobCate a").click(function() {
                triggerLog("from=zp_resume_parttime_list_div_select_cate")
            });
            $(".seljobArea a").click(function() {
                triggerLog("from=zp_resume_parttime_list_div_select_area")
            });
            $(".seljobAge a").click(function() {
                triggerLog("from=zp_resume_parttime_list_div_select_agechoose")
            });
            $(".seljobAge .age-btn-filter").click(function() {
                triggerLog("from=zp_resume_parttime_list_div_select_agedefine")
            });
            var loginfo_parttime = ["zp_resume_parttime_list_filter_talenttype", "zp_resume_parttime_list_filter_gender", "zp_resume_parttime_list_filter_updatetime"];
            $(".sel-type .sel-con").each(function(i, node) {
                $(this).find(".sel-detail li").bind("click",
                function() {
                    triggerLog("from=" + loginfo_parttime[i])
                })
            })
        } else {
            $("#filter").attr("tongji_id", "zp_resume_full_list_div_select");
            $(".seljobCate a").click(function() {
                triggerLog("from=zp_resume_full_list_div_select_cate")
            });
            $(".seljobArea a").click(function() {
                triggerLog("from=zp_resume_full_list_div_select_area")
            });
            $(".seljobAge a").click(function() {
                triggerLog("from=zp_resume_full_list_div_select_agechoose")
            });
            $(".seljobAge .age-btn-filter").click(function() {
                triggerLog("from=zp_resume_full_list_div_select_agedefine")
            });
            var loginfo = ["zp_resume_full_list_filter_gender", "zp_resume_full_list_filter_workedyears", "zp_resume_full_list_filter_education", "zp_resume_full_list_filter_salary", "zp_resume_full_list_filter_updatetime"];
            $(".sel-type .sel-con").each(function(i, node) {
                $(this).find(".sel-detail li").bind("click",
                function() {
                    triggerLog("from=" + loginfo[i])
                })
            });
            $(".sel-on-btn").click(function() {
                triggerLog("from=zp_resume_full_list_filter_keyword")
            })
        }
    })
});
define("job/util.processor", [],
function() {
    var processor = {
        timeoutId: null,
        performProcessing: function() {},
        process: function(delayFunction, interval) {
            clearTimeout(this.timeoutId);
            var that = this;
            interval = interval || 100;
            this.performProcessing = delayFunction;
            this.timeoutId = setTimeout(function() {
                that.performProcessing()
            },
            interval)
        }
    };
    return processor
});
define("job/busi.resume.listAdvert", ["./util.processor", "./util.cookie"],
function(processor, cookie) {
    $.extend({
        isEmpty: function(v, allowBlank) {
            return v === null || v === undefined || $.isArray(v) && !v.length || (!allowBlank ? v === "": false)
        },
        urlAppend: function(url, s) {
            if (!$.isEmpty(s) && url.indexOf(s) == -1) {
                return url + (url.indexOf("?") === -1 ? "?": "&") + s
            }
            return url
        }
    }); (function(bool) {
        function setInnerText(o, s) {
            while (o.childNodes.length != 0) {
                o.removeChild(o.childNodes[0])
            }
            o.appendChild(document.createTextNode(s))
        }
        function getInnerText(o) {
            var sRet = "";
            for (var i = 0; i < o.childNodes.length; i++) {
                if (o.childNodes[i].childNodes.length != 0) {
                    sRet += getInnerText(o.childNodes[i])
                }
                if (o.childNodes[i].nodeValue) {
                    if (o.currentStyle.display == "block") {
                        sRet += o.childNodes[i].nodeValue + "\n"
                    } else {
                        sRet += o.childNodes[i].nodeValue
                    }
                }
            }
            return sRet
        }
        if (bool) {
            HTMLElement.prototype.__defineGetter__("currentStyle",
            function() {
                return this.ownerDocument.defaultView.getComputedStyle(this, null)
            });
            HTMLElement.prototype.__defineGetter__("innerText",
            function() {
                return getInnerText(this)
            });
            HTMLElement.prototype.__defineSetter__("innerText",
            function(s) {
                setInnerText(this, s)
            })
        }
    })(/Firefox/.test(window.navigator.userAgent));
    var _hmt = _hmt || []; (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?a3013634de7e7a5d307653e15a0584cf";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s)
    })(); (function() {
        var secondCateId;
        try {
            secondCateId = ____json4fe.catentry[1].dispid
        } catch(e) {}
        if (secondCateId == "391123") {
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?7f92b933a3c7431941bec23796a8d71f";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s)
        }
    })();
    $(function() {
        if (____json4fe && ____json4fe.catentry && ____json4fe.catentry[0].dispid == "9225") {
            var htmlStr = '<img  src="//img.58cdn.com.cn/job/pc/full/common/0.1/400/400c.png">',
            cityArr = ["bj", "sh", "sz", "gz", "cd", "hrb", "zz", "tj", "wh", "cs", "cq", "sz", "fz", "hf", "hz", "nj", "sy", "cc", "qd", "jn", "dl", "sjz", "xm", "dg", "nn", "ty", "wx"],
            aNodes = $("#zpzs").find("ul");
            if (____json4fe && ____json4fe.locallist && ____json4fe.locallist[0].listname) {
                if ($.inArray(____json4fe.locallist[0].listname, cityArr) != -1) {
                    $(aNodes[aNodes.length - 1]).after(htmlStr)
                }
            }
        }
    });
    $(function() {
        var cateid;
        var thirdcateid;
        var cateids = ["38665", "13134"];
        var thirdcateids = ["61213"];
        try {
            cateid = ____json4fe.catentry[1].dispid;
            thirdcateid = ____json4fe.catentry[2].dispid
        } catch(e) {}
        var endTime = new Date("2016/12/13");
        var nowTime = new Date;
        if (nowTime < endTime) {
            if ($.inArray(cateid, cateids) > -1 || $.inArray(thirdcateid, thirdcateids) > -1) {
                var node = $("#brand_list_top_banner");
                var style = "<style>.brandad1000{ margin:0 auto 10px; overflow:hidden; width:1000px; position:relative;}</style>";
                node.append(style);
                var banner = '<div class="brandad1000"><a href="http://zp.58.com/yy/2016summer/onlineRetailers/index"><img src="//img.58cdn.com.cn/ui7/job/topic/dianshang1000.png"></a></div>';
                node.append(banner)
            }
        }
    });
    $(function() {
        var cateid = "",
        mydate = new Date,
        timeEnd = new Date(mydate.getFullYear() + "/" + (mydate.getMonth() + 1) + "/" + (mydate.getDate() + 1) + " 00:00:00").getTime(),
        timecha = (timeEnd - mydate.getTime()) / (1e3 * 24 * 60 * 60);
        var tmplObj = {
            13139 : {
                imgSrc: "//img.58cdn.com.cn/ui7/job/topic/zcmao_pcxiaos.png",
                tagshow: "from=zcmao_pcxiaos_show",
                tagclick: "from=zcmao_pcxiaos_click"
            },
            13136 : {
                imgSrc: "//img.58cdn.com.cn/ui7/job/topic/zcmao_pccany.png",
                tagshow: "from=zcmao_pccany_show",
                tagclick: "from=zcmao_pccany_click"
            },
            13122 : {
                imgSrc: "//img.58cdn.com.cn/ui7/job/topic/zcmao_pckefu.png",
                tagshow: "from=zcmao_pckefu_show",
                tagclick: "from=zcmao_pckefu_click"
            },
            13132 : {
                imgSrc: "//img.58cdn.com.cn/ui7/job/topic/zcmao_pcbaox.png",
                tagshow: "from=zcmao_pcbaox_show",
                tagclick: "from=zcmao_pcbaox_click"
            },
            13137 : {
                imgSrc: "//img.58cdn.com.cn/ui7/job/topic/zcmao_pcpug.png",
                tagshow: "from=zcmao_pcpug_show",
                tagclick: "from=zcmao_pcpug_click"
            },
            13148 : {
                imgSrc: "//img.58cdn.com.cn/ui7/job/topic/zcmao_pcjiaos.png",
                tagshow: "from=zcmao_pcjiaos_show",
                tagclick: "from=zcmao_pcjiaos_click"
            },
            13093 : {
                imgSrc: "//img.58cdn.com.cn/ui7/job/topic/zcmao_pcmeifa.png",
                tagshow: "from=zcmao_pcmeifa_show",
                tagclick: "from=zcmao_pcmeifa_click"
            },
            others: {
                imgSrc: "//img.58cdn.com.cn/ui7/job/topic/zcmao_pcqita.png",
                tagshow: "from=zcmao_pcqita_show",
                tagclick: "from=zcmao_pcqita_click"
            }
        };
        try {
            cateid = ____json4fe.catentry[1].dispid
        } catch(e) {
            console.warn("没有获取相应二级类")
        }
        if (cateid != "") {
            var arr = ["13139", "13136", "13122", "13132", "13137", "13148", "13093"],
            obj = "";
            if ($.inArray(cateid, arr) > -1) {
                obj = tmplObj[cateid]
            } else {
                obj = tmplObj["others"]
            }
            cookie.setCookie("zcmshow", parseInt(cookie.getCookie("zcmshow")) + 1 || 1, timecha);
            if (cookie.getCookie("zcmshow") <= 2) {
                leftPosTmpl(obj.imgSrc, obj.tagshow, obj.tagclick)
            }
        }
        function leftPosTmpl(imgSrc, tagshow, tagclick) {
            var comHtmlLeft = '<div class="coupad_l" style="bottom: 60px; left: 44.5px;">' + '<a href="//zhaoren.58.com/?from=zcmao_pcjianli" target="_blank">' + '<img src="' + imgSrc + '" width="114" height="246"></a>' + '<span class="sidebarClose"></span></div>';
            appendDom(comHtmlLeft, "coupad_l", tagshow, tagclick)
        }
        function resumeBuyCouponLeftPosTmpl(imgSrc, tagshow, tagclick, href) {
            var comHtmlLeft = '<div class="coupad_l" style="bottom: 60px; left: 44.5px;">' + '<a href="' + href + '" target="_blank">' + '<img src="' + imgSrc + '" width="114" height="246"></a>' + '<span class="sidebarClose"></span></div>';
            appendDom(comHtmlLeft, "coupad_l", tagshow, tagclick)
        }
        function appendDom(domHtml, direction, tagshow, tagclick) {
            direction = $("." + direction);
            if (direction.length > 0) {
                direction.remove()
            }
            var html = "<style>.coupad_l,.coupad_r{position:absolute;position:fixed;}.sidebarClose{cursor:pointer;position:absolute;top:2px;right:2px;width:28px;height:28px;}</style>";
            html += domHtml;
            $("body").append(html);
            window.clickLog && window.clickLog(tagshow);
            $(".coupad_l a,.coupad_l img").click(function() {
                window.clickLog && window.clickLog(tagclick)
            });
            $(".sidebarClose").click(function() {
                $(this).parent().fadeOut();
                cookie.setCookie("zcmshow", 3, timecha)
            })
        }
    });
    $(window).resize(function() {
        processor.process(function() {
            var $width = $(window).width();
            if ($width < 960) {
                $("#zpzs,.coupad_l").hide()
            } else {
                $("#zpzs,.coupad_l").show()
            }
        })
    })
});
define("job/busi.resume.listHelper", [],
function() {
    document.domain = "58.com";
    var width = 0;
    width = 1049;
    function zptop() {
        window.scroll(0, document.minTop || 0)
    }
    function callback(str) {
        try {
            if (str != null && str != "") {
                document.getElementById("zpzs").innerHTML = str;
                document.getElementById("zpzs").style.display = "";
                document.getElementById("zpzs").style.right = (document.body.clientWidth - width) / 2 - 134 + "px";
                if (document.documentElement.scrollTop + document.body.scrollTop > 0) {
                    document.getElementById("gototop").style.display = ""
                } else {
                    document.getElementById("gototop").style.display = "none"
                }
            }
        } catch(e) {}
    }
    function GetCookieValue(name) {
        var arr = document.cookie.match(new RegExp(name + "=([^&;]+)"));
        return arr == null ? "": decodeURI(arr[1])
    }
    var xiazai = "clickLog('from=pc-zpzhushou-xiazai')",
    shoudao = "clickLog('from=pc-zpzhushou-shoudao')",
    yaoqing = "clickLog('from=pc-zpzhushou-yaoqing')",
    zhiwei = "clickLog('from=pc-zpzhushou-zhiwei')",
    gongsi = "clickLog('from=pc-zpzhushou-gongsi')",
    userId = GetCookieValue("UserID"),
    zhaoren = "clickLog('from=pc-jl-lby')";
    var s = '<ul><li class="history_title">招聘助手</li><li class="jianli_pt8"><span class="s1"></span><a target="_blank" href="//my.58.com/pro/reciveresume/" id="received_resume" onclick = ' + shoudao + '>收到的简历</a><i></i></li><li><span class="s2"></span><a target="_blank" href="//my.58.com/interviewinvitesend/" id="send_invitation" onclick = ' + yaoqing + '>发送的工作邀请</a></li><li class="pb5"><span class="s3"></span><a target="_blank" href="//zppost.58.com/zhaopin/1/9224/j5" onclick = ' + zhiwei + '>发布招聘信息</a></li><li class="history_bottom"><span class="s6"></span><a target="_blank" class="quick-recruit-red" href="//trade.58.com/orderonline/newJob/orderSave/index?from=10136" onclick = ' + zhaoren + '>简历限时促销</a></li></ul><a id="gototop" class="gtop" onclick="zptop();" href="javascript:void(0);"></a>';
    callback(s);
    function getUser() {
        var ppu, values;
        var result = document.cookie.match(/;\sPPU=([^;]*);?/);
        if (result) {
            ppu = result[1];
            values = ppu.match(/UID=([^&]*)&?/);
            if (values) {
                return typeof decodeURIComponent === "function" ? decodeURIComponent(values[1]) : values[1]
            }
            return null
        }
        return null
    }
    if (getUser()) {
        $.ajax({
            type: "get",
            url: "http://statistics.zp.58.com/getqyunreadinvitecount",
            dataType: "jsonp",
            success: function(data) {
                var arr = eval(data);
                var resume = document.getElementById("received_resume");
                var invitation = document.getElementById("send_invitation");
                var resume_num = document.createElement("b");
                var invitation_num = document.createElement("b");
                invitation_num.className = resume_num.className = "red_circle";
                resume.parentNode.appendChild(resume_num);
                invitation.parentNode.appendChild(invitation_num);
                function n(n, obj) {
                    if (n < 100) {
                        obj.innerHTML = n
                    } else {
                        obj.innerHTML = "99+";
                        obj.style.width = "26px"
                    }
                }
                n(arr[0], resume_num);
                n(arr[1], invitation_num)
            }
        })
    }
});
define("job/busi.resume.listSort", ["./util.cookie"],
function(cookie) {
    $(function() {
        $(".sortType-wrap").mouseover(function() {
            $(".sortType-list").show()
        }).mouseout(function() {
            $(".sortType-list").hide()
        });
        $(".sortType-list-item").mouseover(function() {
            $(this).addClass("hover")
        }).mouseout(function() {
            $(this).removeClass("hover")
        })
    });
    $(function() {
        if (cookie.getCookie("isSmartSortTipShowed") !== null) {
            return false
        }
        if (window.____json4fe && ____json4fe.smartSort == 1) {
            $(".smartSortTip").show()
        }
        $(".smartSortTipClose").on("click",
        function() {
            $(".smartSortTip").hide();
            cookie.setCookie("isSmartSortTipShowed", true, 1500)
        })
    })
});
define("job/main.resume.list", ["./busi.resume.listViewmode", "./busi.resume.listDownload", "./busi.resume.listQualityPush", "./busi.resume.listSearch", "./busi.resume.listAdvert", "./busi.resume.listHelper", "./busi.resume.listSort"],
function(viewMode, downloadResume, qualityPushResume, listSort) {
    $(function() {
        var $myprofile = $("#myprofile"),
        $mypic = $("#mypic"),
        $myceping = $("#myceping"),
        $tablistdt = $(".tablist dt"),
        $tablistdla = $(".tablist dl a"),
        $serRes = $(".ser-res"),
        isLogin = document.cookie.match(/UID=\d*/),
        href = window.location.href,
        pageNo = href.indexOf("/pn") == -1 ? "1": href.substring(parseInt(href.indexOf("pn")) + 2, parseInt(href.indexOf("pn")) + 3),
        myprofile = {
            13126 : "from=list-touxiang-clka",
            13139 : "from=list-touxiang-clkb",
            13136 : "from=list-touxiang-clkc",
            13137 : "from=list-touxiang-clkd",
            13803 : "from=list-touxiang-clke",
            13080 : "from=list-touxiang-clkf",
            13134 : "from=list-touxiang-clkg",
            13122 : "from=list-touxiang-clkh",
            13083 : "from=list-touxiang-clki",
            13127 : "from=list-touxiang-clkj"
        },
        mypic = {
            13126 : "from=list-zuopin-clka",
            13139 : "from=list-zuopin-clkb",
            13136 : "from=list-zuopin-clkc",
            13137 : "from=list-zuopin-clkd",
            13803 : "from=list-zuopin-clke",
            13080 : "from=list-zuopin-clkf",
            13134 : "from=list-zuopin-clkg",
            13122 : "from=list-zuopin-clkh",
            13083 : "from=list-zuopin-clki",
            13127 : "from=list-zuopin-clkj"
        },
        cateid = "";
        viewMode();
        var downloadResumefn = function() {
            downloadResume.init($("#infolist dl i.checkboxi"), $(".mainList-down"), "dl",
            function() {
                $("#infolist").on("click", ".resumelistdown",
                function() {
                    var resumeid = $(this).attr("infoid"),
                    followparam = $(this).attr("followparam") || "",
                    _this = $(this),
                    pageType = window._trackURL && eval("(" + _trackURL + ")").page;
                    if (!_this.hasClass("graybtn")) {
                        window.resumeDownloadFrom = "pc,list," + (____json4fe.sourcepath || "");
                        window.clickLog && window.clickLog("from=" + pageType + "-xiazai");
                        var resumeDownloadData = {
                            resumeid: resumeid,
                            isDownloadSame: false,
                            source: window.resumeDownloadFrom,
                            followparam: followparam
                        };
                        window.resumeDownload && resumeDownload(false, resumeDownloadData,
                        function() {
                            downloadResume.itemhtml(_this, "已下载", "dl")
                        })
                    }
                })
            })
        };
        if (pageNo != "1") {
            downloadResumefn()
        } else {
            qualityPushResume(function() {
                downloadResumefn()
            },
            function() {
                downloadResumefn()
            })
        }
        try {
            cateid = ____json4fe.catentry[1].dispid
        } catch(e) {
            console.warn("没有获取相应二级类")
        }
        $myprofile.click(function() {
            if (!$(this).find("i").hasClass("selected")) {
                window.clickLog && window.clickLog("from=list-touxiang-clk");
                if (cateid != "") {
                    window.clickLog && window.clickLog(myprofile[cateid])
                }
            }
        });
        $mypic.click(function() {
            if (!$(this).find("i").hasClass("selected")) {
                window.clickLog && window.clickLog("from=list-zuopin-clk");
                if (cateid != "") {
                    window.clickLog && window.clickLog(mypic[cateid])
                }
            }
        });
        $myceping.click(function() {
            if (!$(this).find("i").hasClass("selected")) {
                window.clickLog && window.clickLog("from=list-ceping-clk")
            }
        });
        $(".tablist").on("mouseover mouseout", "dt",
        function(event) {
            event.stopPropagation();
            if (event.type == "mouseover") {
                $(this).find(".listModel").show()
            } else if (event.type == "mouseout") {
                $(this).find(".listModel").hide()
            }
        });
        $tablistdla.click(function() {
            var pageType = window._trackURL && eval("(" + _trackURL + ")").page;
            window.clickLog && window.clickLog("from=" + pageType + "-clk");
            $(this).closest("dl").addClass("grayfont");
            if (!isLogin) {
                window.clickLog && window.clickLog("from=pc-jllistb-clk-n")
            } else {
                window.clickLog && window.clickLog("from=pc-jllistb-clk-y")
            }
        });
        $serRes.click(function() {
            var count = $('#infolist dd[class$="iselect"]').length;
            if (count > 0) {
                window.clickLog && window.clickLog("from=zhaopin_batchcheckresume_up_clknew")
            }
        })
    })
});
define("_pkg/job/job_resume_listpage", ["job/main.resume.list"],
function(job_main_resume_list) {});