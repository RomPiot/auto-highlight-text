




const colors = ["red", "green", "yellow", "blue", "purple", "pink"]

const article = document.querySelector("#article")

const paragraphs = article.querySelectorAll('p')

let lastColor = "red";

paragraphs.forEach(paragraph => {
    

    // paragraph.style.backgroundColor = randomColor
    
    const textPara = paragraph.textContent.replace(/(<([^>]+)>)/gi, "");
    paragraph.innerHTML = textPara

    const texts = paragraph.textContent.split('. ');
    // let textHighlighted = ""

    // paragraph.innerHTML = ""
    
    texts.forEach(text => {

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
        // textHighlighted += textSpan;
        paragraph.appendChild(textSpan);

    });

    // paragraph.innerHTML = textHighlighted
    // console.log(textHighlighted);

    
})
