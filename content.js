

chrome.storage.sync.get(['selector', 'contentTag', 'colors'], function (data) {

    const selector = data.selector;
    const contentTag = data.contentTag;
    const colors = data.colors;

    autoHighLight(selector, contentTag, colors);
});

function autoHighLight(selector, contentTag, colors) {

    if (!selector) {
        selector = "body";
    }

    if (!contentTag) {
        contentTag = "p";
    }

    const article = document.querySelector(selector);
    const paragraphs = article.querySelectorAll(contentTag);

    let lastColor = colors[Math.floor(Math.random() * colors.length)];

    paragraphs.forEach(paragraph => {
        // TODO : ignore a. b. c. 1. 2. 3.
        let texts = paragraph.innerHTML.split(new RegExp(/(\. |\? |\! |\.\&nbsp\;)/gi));

        paragraph.innerHTML = "";
        let color = "";
        let cleanText = [];

        texts.forEach((text) => {
            // console.log(text);
            const separators = ['. ', '! ', '? ', ' ', '&nbsp;', '.&nbsp;', ''];
            let addText = true;

            separators.forEach(separator => {
                if (text == separator) {
                    cleanText[cleanText.length - 1] = cleanText[cleanText.length - 1] + separator;
                    addText = false;
                }
            });

            addText ? cleanText.push(text) : null;
        })


        cleanText.forEach(text => {
            // console.log(text);

            const index = colors.indexOf(lastColor);

            if (index >= 0 && index < colors.length - 1) {
                color = colors[index + 1]
            } else {
                color = colors[0]
            }

            const textSpan = document.createElement('span');
            textSpan.classList.add('text-colored');
            textSpan.setAttribute('color', color);
            textSpan.setAttribute('colored', "1");
            textSpan.style.backgroundColor = color;
            textSpan.innerHTML = text;
            paragraph.appendChild(textSpan);
            lastColor = color;
        });
    })

    const textColored = document.querySelectorAll('.text-colored');

    textColored.forEach(text => {
        text.addEventListener("click", () => {
            const color = text.getAttribute('color');
            const colored = text.getAttribute('colored');

            if (colored == "1") {
                text.style.backgroundColor = "transparent";
                text.setAttribute('colored', "0");
            } else {
                text.style.backgroundColor = color;
                text.setAttribute('colored', "1");
            }

        });
    });

};
