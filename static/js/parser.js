let content = document.querySelector("#intermediate").innerHTML;
let parentPara = document.querySelector("p#content");

let questionsDIV = document.querySelector("div#questions")

content = content.split("&lt;")

parentPara.value = ""


let intermediate = []

for (var i = 0; i < content.length; i++) {
    if (!content[i].includes("&gt;")) {
        let p = document.createElement("p");
        p.innerHTML = content[i];
        parentPara.appendChild(p)
    } else {
        inter = "<" + content[i]
        intermediate.push(inter.replace("&gt;", ">"))
    }
}

intermediate = intermediate.filter(function(x) {
    return x !== "<p>";
});


intermediate = intermediate.filter(function(x) {
    return x !== "</p>";
});


intermediate = intermediate.filter(function(x) {
    return x !== "<h2>";
});


intermediate = intermediate.filter(function(x) {
    return x !== "<div>";
});


intermediate = intermediate.filter(function(x) {
    return x !== "</div>";
});

intermediate = intermediate.filter(function(x) {
    return x !== "</h2>";
});

intermediate = intermediate.filter(function(x) {
    return x !== '<h2 class="link">';
});


for (var i = 0; i < intermediate.length; i++) {
    if (intermediate[i].includes("<p>")) {
        el = document.createElement("p");
        el.innerHTML = intermediate[i]
        parentPara.appendChild(el)
    } else if (intermediate[i].includes("<h2>")) {
        el = document.createElement("h2");
        el.innerHTML = intermediate[i]
        parentPara.appendChild(el)
    } else if (intermediate[i].includes('<h2 class="link">')) {
        el = document.createElement("h2");
        el.innerHTML = intermediate[i]
        el.classList.add("link")
        parentPara.appendChild(el)
    } else if (intermediate[i] === "<br>") {
        el = document.createElement("BR");
        parentPara.appendChild(el)
    }
}


let all_questions = questionsDIV.textContent;
all_questions = all_questions.split(">")

for (let i = 0; i < all_questions.length; i++) {
    if (all_questions[i].includes('</h6')) {
        h6 = document.createElement("h6");
        h6.innerHTML = all_questions[i];
        h6.contentEditable = "true";
        questionsDIV.appendChild(h6)
    } else if (all_questions[i].includes('</p')) {
        h6 = document.createElement("p");
        h6.innerHTML = all_questions[i];
        h6.contentEditable = "true";
        questionsDIV.appendChild(h6)

        br = document.createElement("BR")
        questionsDIV.appendChild(br)
    }
}
