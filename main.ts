function pulse () {
    strip.clear()
    strip.setBrightness((counter / 20) ** 2 + 2)
    strip.showRainbow(1, 360)
    strip.rotate(counter / 2 % 34)
    strip.show()
    counter += delta * 1
    if (counter >= 200) {
        delta = -1
    }
    if (counter <= 0) {
        delta = 1
    }
}
function redgreen () {
    strip.clear()
    START += 1
    if (START == 30) {
        START = 0
    }
    range_1 = strip.range(START, 4)
    range_1.showColor(neopixel.rgb(0, 0, 255))
    START_2 += -1
    if (START_2 == 0) {
        START_2 = 30
    }
    range_2 = strip.range(START_2, 4)
    range_2.showColor(neopixel.rgb(0, 255, 0))
}
// Start samme program på neste hatt
input.onButtonPressed(Button.A, function () {
    programnr += -1
    if (programnr < 0) {
        programnr = 0
    }
    basic.showNumber(programnr)
    intensitet = 200
    init_progs()
})
function randompixelrandomcolor () {
    strip.setPixelColor(randint(0, 33), farger._pickRandom())
    strip.show()
}
function init_chase () {
    strip.clear()
    strip.setPixelColor(3, neopixel.rgb(0, 255, 255))
    strip.setPixelColor(2, neopixel.rgb(0, 100, 100))
    strip.setPixelColor(1, neopixel.rgb(0, 50, 50))
    strip.setPixelColor(0, neopixel.rgb(0, 10, 10))
}
function init_progs () {
    strip.setBrightness(255)
    if (programnr == 0) {
        init_chase()
    } else if (programnr == 2) {
        init_rainbow()
    } else if (programnr == 4) {
        START = 0
        START_2 = 17
    } else if (programnr == 5) {
        counter = 0
        delta = 1
    } else if (programnr == 9) {
        reboot()
    } else {
        strip.clear()
        strip.show()
    }
}
function flash () {
    strip.clear()
    strip.showColor(neopixel.rgb(255, 255, 255))
    basic.pause(150)
    strip.clear()
    strip.show()
    strip.showColor(neopixel.rgb(50, 50, 50))
    basic.pause(50)
    strip.clear()
    strip.show()
}
function togglebluegreen () {
    bgcounter += 1
    gstate = bgcounter % 2
    bgstate = (bgcounter + 1) % 2
    strip.showColor(neopixel.rgb(0, 255, 255))
    basic.pause(250)
    strip.showColor(neopixel.rgb(0, gstate * 255, bgstate * 255))
    basic.pause(250)
}
function init_rainbow () {
    strip.clear()
    strip.showRainbow(1, 360)
}
function reboot () {
    strip.clear()
    strip.show()
    control.reset()
}
function chase () {
    strip.rotate(1)
    strip.show()
    basic.pause(10)
}
input.onButtonPressed(Button.AB, function () {
    basic.showIcon(IconNames.Square)
    basic.pause(200)
    basic.clearScreen()
    basic.pause(1000)
})
// Start samme program på neste hatt
input.onButtonPressed(Button.B, function () {
    programnr += 1
    if (programnr > 9) {
        programnr = 0
    }
    basic.showNumber(programnr)
    intensitet = 200
    init_progs()
})
function rainbow_rotate () {
    strip.rotate(1)
    strip.show()
    basic.pause(10)
}
function lydfolsom () {
    intensitet = input.soundLevel() ** 3 / 65000
    strip.showColor(neopixel.rgb(0, intensitet, intensitet))
}
radio.onReceivedValue(function (name, value) {
    if (name == "alle") {
        programnr = value
        basic.showNumber(programnr)
    }
    init_progs()
})
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    if (skal_lyse == 0) {
        skal_lyse = 1
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    } else {
        skal_lyse = 0
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
    }
    basic.pause(500)
    basic.showNumber(programnr)
})
function randomcolor () {
    strip.clear()
    strip.showColor(farger._pickRandom())
    basic.pause(1000)
    strip.clear()
    strip.show()
}
function init_farger () {
    intensitet = 200
    farger = []
    farger.push(neopixel.rgb(intensitet, 0, 0))
    farger.push(neopixel.rgb(0, intensitet, 0))
    farger.push(neopixel.rgb(0, 0, intensitet))
    farger.push(neopixel.rgb(intensitet, intensitet, 0))
    farger.push(neopixel.rgb(0, intensitet, intensitet))
    farger.push(neopixel.rgb(intensitet, 0, intensitet))
    farger.push(neopixel.rgb(intensitet, intensitet, intensitet))
}
let skal_lyse = 0
let bgstate = 0
let gstate = 0
let bgcounter = 0
let farger: number[] = []
let intensitet = 0
let range_2: neopixel.Strip = null
let START_2 = 0
let range_1: neopixel.Strip = null
let START = 0
let delta = 0
let counter = 0
let strip: neopixel.Strip = null
let programnr = 0
let scale = 0
let rgb: number[] = []
let bakgrunnslydnivå = 0
programnr = 0
radio.setGroup(76)
strip = neopixel.create(DigitalPin.P0, 34, NeoPixelMode.RGB)
strip.clear()
strip.show()
init_farger()
basic.showIcon(IconNames.Happy)
basic.pause(500)
basic.showNumber(programnr)
init_progs()
basic.forever(function () {
    if (programnr == 0) {
        chase()
    } else if (programnr == 1) {
        lydfolsom()
    } else if (programnr == 2) {
        rainbow_rotate()
    } else if (programnr == 3) {
        togglebluegreen()
    } else if (programnr == 4) {
        redgreen()
    } else if (programnr == 5) {
        pulse()
    } else if (programnr == 6) {
        randompixelrandomcolor()
    } else if (programnr == 7) {
        if (randint(0, 200) == 0) {
            randomcolor()
        }
    } else if (programnr == 8) {
        if (randint(0, 200) == 0) {
            flash()
        }
    }
})
