document.querySelector(".addQ").addEventListener("click", (e) => {
    var parent = document.createElement("div");
    parent.classList.add("question-div")

    var para = document.createElement("h6")
    para.contentEditable = "True";
    para.innerHTML = "Type a question..."

    var answer = document.createElement("p")
    answer.contentEditable = "True";
    answer.innerHTML = "Type in the answer..."

    parent.appendChild(para)
    parent.appendChild(answer)

    document.querySelector("#questions").appendChild(parent);
});

document.querySelector("body").addEventListener("keypress", () => {
    document.querySelectorAll("#content a").forEach((item) => {
        item.href = item.innerHTML;
    })
})

const editor = document.querySelector('#content')
editor.addEventListener("paste", (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand("insertHTML", false, text);
});

function addH() {
    var heading = document.createElement("h2");
    heading.innerHTML = "Add a heading"
    document.querySelector("#content").appendChild(heading);
}

function addL() {
    var heading = document.createElement("h2");
    heading.classList.add("link")

    var a = document.createElement("a");
    a.innerHTML = "Add URL"

    heading.appendChild(a)

    document.querySelector("#content").appendChild(heading);
}

document.querySelectorAll("h2.link").forEach((item) => {
    item.addEventListener("click", () => {
        window.open("https://" + item.innerHTML, "_blank")
    });
});

function save() {
    var rich_text = document.querySelector("#content").innerHTML;
    document.querySelector("#value").value = document.querySelector("input#title").value + "||" + rich_text;

    var questions = document.querySelector("#questions").innerHTML;
    document.querySelector("#question").value = questions;

    document.querySelector("#submit").click()
}

document.querySelector("input#title").addEventListener("click", () => {
    if (document.querySelector("input#title").value === "Untitled") {
        document.querySelector("input#title").value = "";
    }
});

document.querySelector("p#content").addEventListener("click", () => {
    if (document.querySelector("p#content").innerHTML === "Start Typing") {
        document.querySelector("p#content").innerHTML = "";
    }
});
