function tab(n) {
    let tabContents = document.querySelectorAll('.tab')
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }
    let clicked = document.querySelectorAll("div.tab" + n);
    let item = clicked[0];
    item.style.display = "flex";
}

tab(1);