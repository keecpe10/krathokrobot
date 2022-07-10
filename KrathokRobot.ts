
/**
  * Enumeration of ReadADC.
  */
enum ReadADC {
    //% block="ADC 0"
    ADC0 = 132,
    //% block="ADC 1"
    ADC1 = 196,
    //% block="ADC 2"
    ADC2 = 148,
    //% block="ADC 3"
    ADC3 = 212,
    //% block="ADC 4"
    ADC4 = 164,
    //% block="ADC 5"
    ADC5 = 228,
    //% block="ADC 6"
    ADC6 = 180,
    //% block="ADC 7"
    ADC7 = 244
}

enum KrathokRobotButton {
    //% block="A"
    A,
    //% block="B"
    B
}

enum Directions {
    //% block="ซ้าย"
    Left,
    //% block="ขวา"
    Right
}

enum Motors {
    //% block="ซ้าย"
    Left,
    //% block="ขวา"
    Right
}

enum MoveDirections{
    //% block="ไปข้างหน้า"
    Forward,
    //% block="ถอยหลัง"
    Backward
}

/**
 * Custom blocks /f23c monster /f2d6 นักบินอวกาศ /f2dd
 */
//% weight=100 color=#2FE7F0 icon="\uf0fb"
namespace KrathokRobot {

    /** ความเร็วมอเตอร์ มอเตอร์1,มอเตอร์2   
      * @param left_speed percent of maximum left_speed, eg: 0
      * @param right_speed percent of maximum right_speed, eg: 0
      */
    //% blockId="KrathokRobot_set_motors" block="set_motors | left_speed %left_speed | right_speed %right_speed"
    //% Speed.min=0 Speed.max=1000
    //% weight=50
    function set_motors(left_speed: number, right_speed: number): void {
        //left_speed = Math.map(left_speed, 0, 1000, 0, 620)
        //right_speed = Math.map(right_speed, 0, 1000, 0, 620)
        //Forward
        if (right_speed >= 0 && left_speed >= 0) {
            pins.digitalWritePin(DigitalPin.P13, 1)
            pins.analogWritePin(AnalogPin.P14, left_speed)
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, right_speed)
        }
        if (right_speed >= 0 && left_speed < 0) {
            left_speed = -left_speed
            pins.digitalWritePin(DigitalPin.P13, 0)
            pins.analogWritePin(AnalogPin.P14, left_speed)
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, right_speed)
        }
        if (right_speed < 0 && left_speed >= 0) {
            right_speed = -right_speed
            pins.digitalWritePin(DigitalPin.P13, 1)
            pins.analogWritePin(AnalogPin.P14, left_speed)
            pins.digitalWritePin(DigitalPin.P15, 1)
            pins.analogWritePin(AnalogPin.P16, right_speed)
        }
    }

    /**ReadADC for read analog sensor, Select ADC channel 0-7. 
      *
      */
    //% blockId="KrathokRobot_readADC" block="ค่าเซ็นเซอร์ %ReadADC"
    //% zoom.shadow="toggleYesNo"
    //% subcategory=บล็อคเริ่มต้น
    //% group="บล็อคเริ่มต้น"
    //% weight=60
    //% blockGap=8
    export function ReadADC(ReadADC: ReadADC): number {
        let ADCValue: number;

        pins.i2cWriteNumber(
            72,
            ReadADC,
            NumberFormat.UInt8LE,
            false
        )
        return ReadADC = pins.i2cReadNumber(72, NumberFormat.UInt16BE, false)
    }

    /** เคลื่อนที่มอเตอร์ ไปข้างหน้า /ถอยหลัง มอเตอร์ซ้าย ขวา ความเร็ว
      * @param left_speed percent of maximum left_speed, eg: 0
      * @param right_speed percent of maximum right_speed, eg: 0
      */
    //% blockId="KrathokRobot_Move" block="ตั้งค่ามอเตอร์ %Motors |ความเร็วมอเตอร์ซ้าย %left_speed| ความเร็วมอเตอร์ขวา %right_speed"
    //% subcategory=บล็อคเริ่มต้น
    //% group="บล็อคเริ่มต้น"
    //% weight=60
    //% blockGap=8
    //% left_speed.min=-1000 left_speed.max=1000
     //% right_speed.min=-1000 right_speed.max=1000
    export function Moves(left_speed: number, right_speed: number) {
        set_motors(left_speed, right_speed)
    }

    /** รอการกดปุ่ม  
             */
    //% blockId="KrathokRobot_รอการกดปุ่ม" block="รอการกดปุ่ม | %button"
    //% subcategory=บล็อคเริ่มต้น
    //% group="บล็อคเริ่มต้น"
    //% weight=75
    //% blockGap=8
    export function รอการกดปุ่ม(button: KrathokRobotButton): void {
        if (button == KrathokRobotButton.A) {
            while (!(input.buttonIsPressed(Button.A))) {
                basic.showArrow(ArrowNames.West)
            }
        }
        if (button == KrathokRobotButton.B) {
            while (!(input.buttonIsPressed(Button.B))) {
                basic.showArrow(ArrowNames.East)
            }
        }
    }


}