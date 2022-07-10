basic.forever(function () {
    if (KrathokRobot.ReadADC(ReadADC.ADC0) == 0) {
        KrathokRobot.Moves(1000, 0)
    } else if (KrathokRobot.ReadADC(ReadADC.ADC1) == 0) {
        KrathokRobot.Moves(0, 1000)
    } else {
        KrathokRobot.Moves(1000, 1000)
    }
})
