if (!localStorage.getItem("loade")) {
    new duDialog(
        null,
        "This page is currently under construction :)",
        {
            buttons: duDialog.OK_CANCEL,
            okText: "Ok",
            dark: true,
            callbacks: {
                okClick: function () {
                    this.hide();
                },
            },
        }
    ).show();
    localStorage.setItem("loaded", true);
}

let container = $(".error-container"),
    input = $("textarea"),
    log = $("#log"),
    filename = $("#filename"),
    button = $("#button"),
    type = "json",
    finp = document.createElement("input"),
    copy = $("#copy"),
    lang = $("#language"),
    fontSize = $("#font-size"),
    lineNumberIndicator = $(".line-number-indicator");

design(finp, {
    position: "fixed",
    left: 0,
    opacity: 0,
});

document.body.appendChild(finp);

const autoComplete = {
    "{": "}",
    "[": "]",
    '"': '"',
    "'": "'",
    "(": ")",
    "<": ">",
};

const formatCode = function (_code) {
    let rxp = /(\s*\=\s*)?(\s+)?(\{)?/g;

    return _code.replace(rxp, (_, _p1, _p2, _p3, _p4, _p5, _p6) => {
        let on = " = ",
            sp = " ",
            nl = "{&#10;";
        txt = "";

        _p1 ? (txt += on) : undefined;
        _p2 ? (txt += sp) : undefined;
        _p3 ? (txt += nl) : undefined;

        return txt;
    });
};

const generate = _object => {
    let jsonRegExp =
        /([\[\]\{\}\,])?(".*?")?([0-9])?('.*?')?(\n)?([\w\-]+\s*?:)?/g;

    let json = _object.replace(
        jsonRegExp,
        (_, _p1, _p2, _p3, _p4, _p5, _p6) => {
            let on = "<span class='json_chars'>" + _p1 + "</span>",
                se = "<span class='json_string'>" + _p2 + "</span>",
                uc = "<span class='json_numbers'>" + _p3 + "</span>",
                to = "<span class='json_string'>" + _p4 + "</span>",
                be = "&#10;",
                ol = "<span class='json_property'>" + _p6 + "</span>",
                txt = "";

            _p1 ? (txt += on) : undefined;
            _p2 ? (txt += se) : undefined;
            _p3 ? (txt += uc) : undefined;
            _p4 ? (txt += to) : undefined;
            _p5 ? (txt += be) : undefined;
            _p6 ? (txt += ol) : undefined;

            return txt;
        }
    );

    let jsRegExp =
        /(?:(var|function|default|const|let|new|continue|class|break|return|this|undefined|switch|if|else|extends|export|import|true|false)(?!\w))?([\!\?\&\^%\(\)\*\+\-\|\=\>\<])?([\.\}\{\]\[])?([0-9]+)?(\w+\s*(?=\((?:.|\n)*?\)))?(".*?")?('.*?')?(\/\*[\w\s\d\D\n]*?\*\/)?(\/\/.*)?([\w\-]+\s*?:)?/g;
    let js = _object.replace(
        jsRegExp,
        (_, _p1, _p2, _p3, _p4, _p5, _p6, _p7, _p8, _p9, _p10) => {
            let keywords = "<span class='js_keywords'>" + _p1 + "</span>",
                chars = "<span class='js_chars'>" + _p2 + "</span>",
                excepts = "<span class='js_excepts'>" + _p3 + "</span>",
                numbs = "<span class='js_numbs'>" + _p4 + "</span>",
                funcs = "<span class='js_funcs'>" + _p5 + "</span>",
                string = "<span class='js_string'>" + _p6 + "</span>",
                string2 = "<span class='js_string'>" + _p7 + "</span>",
                comment = "<span class='js_comment'>" + _p8 + "</span>",
                comment2 = "<span class='js_comment'>" + _p9 + "</span>",
                property = "<span class='js_property'>" + _p10 + "</span>",
                txt = "";

            _p1 ? (txt += keywords) : undefined;
            _p2 ? (txt += chars) : undefined;
            _p3 ? (txt += excepts) : undefined;
            _p4 ? (txt += numbs) : undefined;
            _p5 ? (txt += funcs) : undefined;
            _p6 ? (txt += string) : undefined;
            _p7 ? (txt += string2) : undefined;
            _p8 ? (txt += comment) : undefined;
            _p9 ? (txt += comment2) : undefined;
            _p10 ? (txt += property) : undefined;

            return txt;
        }
    );
    let cssRegExp =
        /(\w+(?=\s*\{))?([\w\-]+(?=\s*\:))?(#[0-9A-Fa-f]{6}(?!\w))?(#[0-9A-Fa-f]{3}(?!\w))?(".*?")?('.*?')?/g;

    let css = _object.replace(cssRegExp, (_, _p1, _p2, _p4, _p5, _p6, _p7) => {
        let selectors = "<span class='css_selector'>" + _p1 + "</span>",
            property = "<span class='css_property'>" + _p2 + "</span>",
            hex =
                "<span class='css_hex' data-color=" +
                _p4 +
                " style='color: " +
                _p4 +
                "'>" +
                _p4 +
                "</span>",
            hex2 =
                "<span class='css_hex' data-color=" +
                _p5 +
                " style='color: " +
                _p5 +
                "'>" +
                _p5 +
                "</span>",
            string = "<span class='css_string'>" + _p6 + "</span>",
            string2 = "<span class='css_string'>" + _p7 + "</span>",
            txt = "";

        _p1 ? (txt += selectors) : undefined;
        _p2 ? (txt += property) : undefined;
        _p4 ? (txt += hex) : undefined;
        _p5 ? (txt += hex2) : undefined;
        _p6 ? (txt += string) : undefined;
        _p7 ? (txt += string2) : undefined;

        return txt;
    });

    if (type === "json") return json;
    if (type === "js") return js;
    if (type === "css") return css;
};

const generateConsole = _object => {
    let o =
        /([\[\]\{\}\,])?(".*?")?([0-9])?('.*?')?([a-zA-Z"'\n\s:\!\@\#\$\\\/\|\%\.\^\&\*\(\)\_\+\=\?)])?/g;
    return _object.replace(o, (_, _p1, _p2, _p3, _p4, _p5) => {
        let on = "<16 style='font-weight: bold; color: brown'>" + _p1 + "</16>",
            se = "<16 style='color: cyan'>" + _p2 + "</16>",
            uc = "<16 style='color: gold'>" + _p3 + "</16>",
            to = "<16 style='color: cyan'>" + _p4 + "</16>",
            be = "<16 style='color: white'>" + _p5 + "</16>",
            txt = "";

        _p1 ? (txt += on) : undefined;
        _p2 ? (txt += se) : undefined;
        _p3 ? (txt += uc) : undefined;
        _p4 ? (txt += to) : undefined;
        _p5 ? (txt += be) : undefined;

        return txt;
    });
};

input.addEventListener("keydown", _key => {

    if (_key.key === "Backspace") {
        let sp = input.selectionStart,
            removedChar = input.value.slice(sp - 1, sp),
            comparing = input.value.slice(sp, sp + 1);
        if (autoComplete[removedChar] === comparing) {
            input.value =
                input.value.slice(0, input.selectionStart) +
                input.value.slice(input.selectionStart + 1, input.value.length);
            input.selectionStart = sp;
            input.selectionEnd = sp;
        }
    }
    if (_key.key === "Tab") {
        _key.preventDefault();
        let sp = input.selectionStart;
        let ss = storageSupport.getTabSize() ? storageSupport.getTabSize() : 2;
        input.value =
            input.value.slice(0, input.selectionStart) +
            generateSpace(ss) +
            input.value.slice(input.selectionStart, input.value.length);
        input.selectionStart = sp + +ss;
        input.selectionEnd = sp + +ss;
    }
    setTimeout(() => {
        if (["}", "]", ">", ")"].includes(_key.key)) {
            let sp = input.selectionStart,
                nextChar = input.value.slice(sp, sp + 1);
            if (nextChar === _key.key) {
                input.value =
                    input.value.slice(0, sp - 1) +
                    input.value.slice(sp, input.value.length);
                input.selectionStart = sp;
                input.selectionEnd = sp;
            }
        }
        if (autoComplete[_key.key]) {
            let sp = input.selectionStart;
            input.value =
                input.value.slice(0, input.selectionStart) +
                autoComplete[_key.key] +
                input.value.slice(input.selectionStart, input.value.length);
            input.selectionStart = sp;
            input.selectionEnd = sp;
        }
        storageSupport.getAutoSave() === "true"
            ? localStorage.setItem("code", input.value)
            : undefined;

        lineNumberIndicator.innerHTML = "";

        let len = input.value.toString().split("\n"),
            le = len.length;

        for (let index = 0; index < le; index++) {
            const element = document.createElement("div");
            element.classList.toggle("line");
            element.textContent = index + 1;
            element.title = index + 1;

            lineNumberIndicator.appendChild(element);
        }
        write(container, generate(input.value));
        log.checked && type === "json"
            ? input.value
                ? cjs.log(generateConsole(input.value))
                : undefined
            : undefined;
    }, 0);
});

 

button.addEventListener("click", () => {
    new duDialog(
        "Download as a file.",
        `<input type='text' id="fff"
        style="background: none; border-radius: 2px; border: 2px solid #155; padding: .5em .8em; color: #fefefe; font-family: monospace; font-size: 16px;"
        placeholder='File name...'>
        `,
        {
            buttons: duDialog.OK_CANCEL,
            okText: "Ok",
            dark: true,
            callbacks: {
                okClick: function () {
                    let link = generateDownloadLink(document.getElementById("fff").value, type),
                        blob = new Blob([input.value], {
                            type: "application/json",
                        }),
                        l = URL.createObjectURL(blob);
                    link.setAttribute("href", l);
                    link.click();
                    link.remove();
                    this.hide();
                },
            },
        }
    ).show();
});

lang.addEventListener("change", () => {
    localStorage.setItem("lang", lang.value);
    type = lang.value;
    input.placeholder = "Write some " + type.toUpperCase() + ` code here...`;
    write(container, generate(input.value));
    log.checked && type === "json"
        ? input.value
            ? cjs.log(generateConsole(input.value))
            : undefined
        : undefined;
});

copy.addEventListener("click", () => {
    copyCp(input.value);
});

fontSize.addEventListener("change", () => {
    input.style.fontSize = fontSize.value;
    container.style.fontSize = fontSize.value;
    lineNumberIndicator.style.fontSize = fontSize.value;
    document.querySelectorAll(".line").forEach(e => {
        e.style.lineHeight = 1.3;
    });
    localStorage.setItem("size", fontSize.value);
});

window.onload = () => {
    log.checked = storageSupport.getConsolePrint() === "true" ? true : false;
    if (localStorage.getItem("size")) {
        fontSize.value = localStorage.getItem("size");
        input.style.fontSize = fontSize.value;
        container.style.fontSize = fontSize.value;
        lineNumberIndicator.style.fontSize = fontSize.value;
    }
    if (localStorage.getItem("lang")) {
        lang.value = localStorage.getItem("lang");
        type = lang.value;
        input.placeholder =
            "Write some " + type.toUpperCase() + " code here...";
        write(container, generate(input.value));
        log.checked && type === "json"
            ? input.value
                ? cjs.log(generateConsole(input.value))
                : undefined
            : undefined;
    }
    input.value = localStorage.getItem("code");
    lineNumberIndicator.innerHTML = "";
    const length = input.value.toString().split("\n").length;
    for (let index = 0; index < length; index++) {
        const element = document.createElement("div");
        element.classList.toggle("line");
        element.textContent = index + 1;
        element.title = index + 1;
        lineNumberIndicator.appendChild(element);
    }
    write(container, generate(input.value));
    log.checked && type === "json"
        ? input.value
            ? cjs.log(generateConsole(input.value))
            : undefined
        : undefined;
};

window.oncontextmenu = _e => {
    _e.preventDefault();
};

animate();
function animate() {
    container.scrollTo(input.scrollLeft, input.scrollTop);
    lineNumberIndicator.scrollTo(input.scrollLeft, input.scrollTop);
    requestAnimationFrame(animate);
}

/* Code is messed up, but works perfectly :) */
