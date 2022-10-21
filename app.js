const cols = document.querySelectorAll(".col")

document.addEventListener('keydown', (e) => {
    e.preventDefault()
    if (e.code.toLowerCase() === 'space') {
        setRandomColors()
    }
})

document.addEventListener('click', (e) => {
    const type = e.target.dataset.type

    if (type === 'lock') {
        const node =
            e.target.tagName.toLowerCase() === 'i'
                ? e.target
                : e.target.children[0]
        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if(type === 'copy') {
        copyToClipboard(e.target.textContent)
    }
})


function generateRandomColors() {
    // RGB
    // #FF0000
    // #00FF00
    // #0000FF

    const hexCodes = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }

    return '#' + color
}

function copyToClipboard(title) {
    navigator.clipboard.writeText(title)
}

function setRandomColors() {
    cols.forEach(col => {
        const isLocked = col.querySelector("i").classList.contains('fa-lock')
        const title = col.querySelector("h2")
        const button = col.querySelector("button")
        const color = chroma.random()

        if (isLocked) {
            return
        }

        title.textContent = color
        col.style.background = color
        setTitleColor(title, color)
        setButtonColor(button, color)
    })
}

function setTitleColor(title, color) {
    const luminance = chroma(color).luminance()
    title.style.color = luminance > 0.5 ? 'black' : 'white'
}

function setButtonColor(button, color) {
    const luminance = chroma(color).luminance()
    button.style.color = luminance > 0.5 ? 'black' : 'white'
}

setRandomColors()