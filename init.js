let firePixelsArray = []
const fireWidth = 80
const fireHeight = 80
const fireColorsPalette = FireColors.colors

const debug = false

function start() {
    createFireDataStructure()
    createFireSource()
    renderFire()

    setInterval(calculateFirePropagation, 50)
}

function createFireDataStructure() { 
    firePixelsArray = 
        new Array(fireWidth * fireHeight)
        .fill(0)
}

function calculateFirePropagation() { 
    for (let column = 0; column < fireWidth; column++) {
        for (let row = 0; row < fireHeight; row++) {
            const pixelIndex = column + (fireWidth * row)
            updateFireIntensityPerPixels(pixelIndex)
        }
    }
    renderFire()
}

function updateFireIntensityPerPixels(currentPixelIndex) {
    const belowPixelIndex = currentPixelIndex + fireWidth
    if (belowPixelIndex >= fireWidth * fireHeight) {
        return
    }

    const decay = Math.floor(Math.random() * 3)
    const belowPixelFireIntensity = firePixelsArray[belowPixelIndex]
    const newFireIntensity = belowPixelFireIntensity - decay

    if (newFireIntensity < 0) return 
    
    firePixelsArray[currentPixelIndex - decay] = newFireIntensity
}

function renderFire() { 
    let table = '<table>'
    for (let row = 0; row < fireHeight; row++) {
        table += '<tr>'
        for (let column = 0; column < fireWidth; column++) {
            let pixelIndex = column + (fireWidth * row)
            let fireIntensity = firePixelsArray[pixelIndex]
            if (debug) {
                table += `<td>
                <div class='pixel-index'>${pixelIndex}</div>
                    ${fireIntensity}
                </td>`
            } else {
                const color = fireColorsPalette[fireIntensity]
                const colorString = `rgb(${color.r}, ${color.g}, ${color.b})`
                table += `<td class="pixel" style="background-color: ${colorString}"></td>`
            }
        }
        table += '</tr>'
        
    }
    table += '</table>'
    document.querySelector('#root').innerHTML = table   
}

function createFireSource() {
    for (let column = 0; column < fireWidth; column++) {
        const overflowPixelIndex = fireWidth * fireHeight
        const pixelIndex = (overflowPixelIndex - fireWidth) + column
        firePixelsArray[pixelIndex] = 36
    }
}

start()