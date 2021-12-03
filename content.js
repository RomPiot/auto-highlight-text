

chrome.storage.sync.get(['selector', 'colors'], function (data) {

    const selector = data.selector;
    const colors = data.colors;

    autoHighLight(selector, colors);
});

function autoHighLight(selector, colors) {

    if (!selector) {
        selector = "body";
    }

    const article = document.querySelector(selector);
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
