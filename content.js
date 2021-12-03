

chrome.storage.sync.get(['patterns'], function (data) {

    const selector = data.patterns[0];
    const colors = data.patterns;
    const index = colors.indexOf(selector);

    if (index > -1) {
        colors.splice(index, 1);
    }

    autoHighLight(selector, colors);
});


// let actived = 0;
// let initialContent = "";

function autoHighLight(selector, colors) {

    const article = document.querySelector(selector);
    // console.log(article.innerHTML);
    // initialContent = article.textContent;

    // if (!actived) {

    // } else {
    //     article.
    // }
    const paragraphs = article.querySelectorAll('p');

    let lastColor = colors[Math.floor(Math.random() * colors.length)];

    paragraphs.forEach(paragraph => {

        // let texts = paragraph.innerHTML.split(new RegExp(/(<([^>]+)>). /gi));
        let texts = paragraph.innerHTML.split('. ');
        paragraph.innerHTML = "";

        texts.forEach(text => {
            const colorsFiltered = colors.slice();
            const index = colorsFiltered.indexOf(lastColor);

            if (index > -1) {
                colorsFiltered.splice(index, 1);
            }

            const randomColor = colorsFiltered[Math.floor(Math.random() * colorsFiltered.length)];
            lastColor = randomColor;

            text = text.slice(-1) != "." ? text + ". " : text;

            const textSpan = document.createElement('span');
            textSpan.style.backgroundColor = randomColor;
            textSpan.innerHTML = text;

            paragraph.appendChild(textSpan);
        });
    })

};
