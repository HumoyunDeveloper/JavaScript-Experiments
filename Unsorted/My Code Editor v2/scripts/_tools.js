const $ = _e => document.querySelector(_e);

const write = (_selector, _txt) => {
    typeof _selector == "object"
        ? (_selector.innerHTML = _txt)
        : (document.querySelector(_selector).innerHTML = _txt);
};

const copyCp = _text => {
    finp.value = _text;
    finp.select();
    document.execCommand("copy");
};

const writePlus = (_selector, _txt) => {
    document.querySelector(_selector).innerHTML += _txt;
};

const generateDownloadLink = function (_name, _ex) {
    let el = document.createElement("a");
    el.download = _name + "." + _ex;
    return el;
};

const generateSpace = (_len) => new Array(+_len).fill(" ").join("");