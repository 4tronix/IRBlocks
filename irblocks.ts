
/**
  * Key code translations
  */
enum irKeys
{
    //% block="any"
    Any=0,
    //% block="0"
    Zero=152,
    //% block="1"
    One=162,
    //% block="2"
    Two=98,
    //% block="3"
    Three=226,
    //% block="4"
    Four=34,
    //% block="5"
    Five=2,
    //% block="6"
    Six=194,
    //% block="7"
    Seven=224,
    //% block="8"
    Eight=168,
    //% block="9"
    Nine=144,
    //% block="star"
    Star=104,
    //% block="hash"
    Hash=176,
    //% block="up"
    Up=24,
    //% block="down"
    Down=74,
    //% block="left"
    Left=16,
    //% block="right"
    Right=90,
    //% block="ok"
    Ok=56
}

/**
  * IR Key code translations without the Any code
  */
enum irNoAny
{
    //% block="0"
    Zero=152,
    //% block="1"
    One=162,
    //% block="2"
    Two=98,
    //% block="3"
    Three=226,
    //% block="4"
    Four=34,
    //% block="5"
    Five=2,
    //% block="6"
    Six=194,
    //% block="7"
    Seven=224,
    //% block="8"
    Eight=168,
    //% block="9"
    Nine=144,
    //% block="star"
    Star=104,
    //% block="hash"
    Hash=176,
    //% block="up"
    Up=24,
    //% block="down"
    Down=74,
    //% block="left"
    Left=16,
    //% block="right"
    Right=90,
    //% block="ok"
    Ok=56
}

/**
 * Makecode support for 4tronix IR Receiver
 */
//% weight=50 color=#e7660b icon="\uf0a3"
namespace irBlocks
{
    const irEvent = 1995

// Blocks

    /**
      * Action on IR message received
      */
    //% weight=100
    //% blockId=onIrEvent
    //% block="on IR pin%pin|key%key"
    export function onIREvent(pin: DigitalPin, event: irKeys, handler: Action)
    {
        irCore.initEvents(pin)
        control.onEvent(irEvent, <number>event, handler)
    }

    /**
     * Check if IR key pressed
     */
    //% weight=90
    //% blockId=IRKey
    //% block="IR key%key|was pressed"
    export function irKey(key: irKeys): boolean
    {
        return (irCore.LastCode() == key)
    }

    /**
      * Last IR Code received as number
      */
    //% weight=80
    //% blockId=IRCode
    //% block="IR code"
    export function irCode(): number
    {
	return irCore.LastCode()
    }

    /**
      * IR Key Codes as number
      */
    //% weight=70
    //% blockId=IRKeyCode
    //% block="IR Key%key"
    export function irKeyCode(key: irNoAny): number
    {
	return key
    }

}
