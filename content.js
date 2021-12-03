

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

        // let texts = paragraph.innerHTML.split(new RegExp(/(<([^>]+)>). /gi));
        // let texts = paragraph.innerHTML.split(new RegExp(/(\.|<br>)/gi));
        let texts = paragraph.innerHTML.split('. ');
        paragraph.innerHTML = "";
        let nextColor = "";

        texts.forEach(text => {
            const index = colors.indexOf(lastColor);

            if (index >= 0 && index < colors.length - 1) {
                nextColor = colors[index + 1]
            } else {
                nextColor = colors[0]
            }

            text = text.slice(-1) != "." && text.slice(-1) != ":" ? text + ". " : text;

            const uselessSentence = ['. ', '<br>', '<br/>', '<br />', '.', '<br>. '];

            uselessSentence.forEach(sentence => {
                if (sentence == text) {
                    return;
                }
            });

            const textSpan = document.createElement('span');
            textSpan.style.backgroundColor = nextColor;
            textSpan.innerHTML = text;

            paragraph.appendChild(textSpan);

            lastColor = nextColor;

        });
    })
};
