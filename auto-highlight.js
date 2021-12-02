


// titre d'exemple, un aéroport international au Venezuela accepte

const colors = ["red", "green", "yellow", "blue", "purple", "pink"]

const article = document.querySelector("#article")

const paragraphs = article.querySelectorAll('p')

let lastColor = "red";

paragraphs.forEach(paragraph => {
    // const textPara = paragraph.textContent.replace(/<(?!img|br\s*\/?)[^>]+>/gi, "");
    const texts = paragraph.textContent.split('. ');
    
    paragraph.innerHTML = ""

    texts.forEach(text => {

        const colorsFiltered = colors.slice()
        const index = colorsFiltered.indexOf(lastColor);

        if (index > -1) {
            colorsFiltered.splice(index, 1);
        }
    
        const randomColor = colorsFiltered[Math.floor(Math.random() * colorsFiltered.length)];
        lastColor = randomColor

        const textClean = text.slice(-1) != "." ? text + ". " : text;

        const textSpan = document.createElement('span')
        textSpan.style.backgroundColor = randomColor
        textSpan.innerHTML = textClean;

        paragraph.appendChild(textSpan);

    });

    // paragraph.innerHTML = textHighlighted
    // console.log(textHighlighted);

    
})
