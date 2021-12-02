


// titre d'exemple, un aéroport international au Venezuela accepte

const colors = ["red", "green", "yellow", "blue", "purple", "pink"]

const article = document.querySelector("#article")

const paragraphs = article.querySelectorAll('p')

let lastColor = "red";

paragraphs.forEach(paragraph => {
    
    const textPara = paragraph.textContent.replace(/(<([^>]+)>)/gi, "");
    const texts = textPara.split('. ');
    
    paragraph.innerHTML = ""

    texts.forEach(text => {
        console.log(text);

        const colorsFiltered = colors.slice()
        const index = colorsFiltered.indexOf(lastColor);

        if (index > -1) {
            colorsFiltered.splice(index, 1);
        }
    
        const randomColor = colorsFiltered[Math.floor(Math.random() * colorsFiltered.length)];
        lastColor = randomColor
        const textClean = text + ". ";

        const textSpan = document.createElement('span')
        textSpan.style.backgroundColor = randomColor
        textSpan.innerHTML = textClean;
        console.log(textSpan);

        paragraph.appendChild(textSpan);

    });

    // paragraph.innerHTML = textHighlighted
    // console.log(textHighlighted);

    
})
