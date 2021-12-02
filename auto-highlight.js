
const colors = ["red", "green", "yellow", "blue", "purple", "pink"]

const article = document.querySelector("#article")

const paragraphs = article.querySelectorAll('p')

let lastColor = "red";

paragraphs.forEach(paragraph => {
    const texts = paragraph.innerHTML.split('. ');
    console
    paragraph.innerHTML = ""

    texts.forEach(text => {

        const colorsFiltered = colors.slice()
        const index = colorsFiltered.indexOf(lastColor);

        if (index > -1) {
            colorsFiltered.splice(index, 1);
        }
    
        const randomColor = colorsFiltered[Math.floor(Math.random() * colorsFiltered.length)];
        lastColor = randomColor

        console.log(text);

        const textClean = text.slice(-1) != "." ? text + ". " : text;

        const textSpan = document.createElement('span')
        textSpan.style.backgroundColor = randomColor
        textSpan.innerHTML = textClean;

        paragraph.appendChild(textSpan);

    });
})
