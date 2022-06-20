window.indexedDB =
    window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;

const db = indexedDB.open("imageDatabase", 1), // version: 1
    file = document.getElementById("file"),
    pics = document.getElementById("pics");

let result = null;

db.onupgradeneeded = function (_e) {
    result = _e.target.result;

    console.log(
        result.createObjectStore("imgs_table", {
            autoIncrement: true, // keyPath, unique...
            img: null,
        })
    );
};

db.onsuccess = function (_e) {
    result = _e.target.result;
    
    console.log(
        `Database created, name: ${result.name}, version ${result.version}`
    );

    update();
};

db.onerror = function (_e) {
    console.log(`Error: ${_e.target.error}`);
};

file.addEventListener("change", function (_e) {
    const tx = result.transaction("imgs_table", "readwrite"),
        table = tx.objectStore("imgs_table");

    tx.onerror = function (_e) {
        console.log(`Error: ${_e.target.error}`);
    };

    table.add({
        img: new Blob([_e.target.files[0]], { type: "text/plain" }),
    });

    update();
});

function update() {
    pics.innerHTML = "";

    const tx = result.transaction("imgs_table", "readonly"),
        table = tx.objectStore("imgs_table"),
        cursor = table.openCursor();

    tx.onerror = function (_e) {
        console.log(`Error: ${_e.target.error}`);
    };

    cursor.onsuccess = function (_e) {
        const cursor = _e.target.result;

        if (cursor) {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(cursor.value.img);
            pics.appendChild(img);
            cursor.continue();
        }
    };
}
