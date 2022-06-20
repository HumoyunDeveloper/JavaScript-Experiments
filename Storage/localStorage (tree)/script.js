let $ = _ => document.querySelector(_),
    input,
    obj = [],
    time = $("#time");

function checkLocalStorage() {
    return "localStorage" in window;
}

function onLoad() {
    let ul = $("#ul"),
        add_btn = $("#add_btn");

    if (localStorage.getItem("data")) {
        
        const t = localStorage.getItem("last_time") || "%First time visit%";
        time.innerHTML = t;
        obj = localStorage.getItem("data").split(",");
        
        obj.forEach(_text => {
            const li = document.createElement("li");
            li.classList.add("value");
            li.innerHTML = _text;
            add_btn.before(li);
        });
    }

    localStorage.setItem("last_time", getDate());

    add_btn.onclick = function () {
        obj = [];
        let li = document.createElement("li"),
            val = document.querySelectorAll(".value");

        if (val) {
            val.forEach(_el => {
                if (_el.firstElementChild?.nodeName === "INPUT") {
                    _el.innerHTML = "Undefined";
                }
                obj.push(_el.textContent);
            });
        }

        li.classList.add("value");

        input = document.createElement("input");
        li.appendChild(input);
        add_btn.before(li);

        input.focus();
        input.onkeydown = function (_) {
            if (_.key == "Enter") {
                if (input.value != "") {
                    li.innerHTML = input.value;
                    obj.push(li.textContent);
                    localStorage.setItem("data", obj.toString());
                } else li.innerHTML = "Undefined";

                input.value = "";
            }
        };
        localStorage.setItem("data", obj.toString());
    };
}

function getDate() {
    const date = new Date(),
        day = date.getDay(),
        hours = date.getHours(),
        minutes = date.getMinutes();

    return `${day}, ${hours < 9 ? "0" + hours : hours}:${
        minutes < 9 ? "0" + minutes : minutes
    }`;
}

document.addEventListener("DOMContentLoaded", function () {
    checkLocalStorage()
        ? onLoad()
        : alert("Sorry, your browser doesn't support localStorage");
});
