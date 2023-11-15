
/**
  * State of receiver: Ready, Active, Paused
  */
enum irState
{
    Ready,
    Active,
    Paused
}

/**
  * Key code translations
  */
enum irKeys
{
    //% block="any"
    any=0,
    //% block="0"
    zero=152,
    //% block="1"
    one=162,
    //% block="2"
    two=98,
    //% block="3"
    two=226,
    //% block="4"
    two=34,
    //% block="5"
    two=2,
    //% block="6"
    two=194,
    //% block="7"
    two=224,
    //% block="8"
    two=168,
    //% block="9"
    two=144,
    //% block="star"
    two=104,
    //% block="hash"
    two=176,
    //% block="up"
    two=24,
    //% block="down"
    two=74,
    //% block="left"
    two=16,
    //% block="right"
    two=90,
    //% block="ok"
    two=56
}

/**
 * Makecode support for 4tronix IR Receiver
 */
//% weight=50 color=#e7660b icon="\uf0a3"
namespace irBlocks
{
    let rxData: number[] = [0, 0, 0, 0]
    let rxIdx = 0
    let rxCount = 0
    let width = 0
    let pulseCount = 0
    let final = 0
    let state = 0
    let lastCode = 0
    let pulses: number[] = []
    let _initEvents = true
    const irEvent = 1995

// Helper Functions

    function between(data: number, min: number, max: number) : boolean
    {
        return (data >= min) && (data <= max)
    }

    function addBit(bit: number)
    {
        rxData[rxIdx] = (rxData[rxIdx] << 1) + bit
        rxCount++
        if (rxCount > 7)
        {
            rxCount = 0
            rxIdx++
        }
    }

    function initEvents(): void
    {
        if (_initEvents)
        {
	    pins.setPull(DigitalPin.P14, PinPullMode.PullUp)
            pins.setEvents(DigitalPin.P14, PinEventType.Pulse);
            _initEvents = false;
// ---
// Main receiver function
    pins.onPulsed(DigitalPin.P14, PulseValue.High, function () {
    width = pins.pulseDuration()
    if(state==0 && !between(width, 4000, 5000))
        return
    if(state==0 && between(width, 4000, 5000))
    {
        pulseCount = 0
        for(let i=0; i<4; i++)
            rxData[i] = 0
        rxIdx = 0
        rxCount = 0
        state = 1
        return
    }
    if(state==1 && between(width, 400, 700))
    {
        pulses[pulseCount++] = width
        addBit(0)
    }
    if(state==1 && between(width, 1500, 1800))
    {
        pulses[pulseCount++] = width
        addBit(1)
    }
    if (pulseCount >= 32)
    {
        state = 0
        final = pulseCount
        if(rxData[2] + rxData[3] == 255)
	    lastCode = rxData[2]
        else
	    lastCode = 0
        control.raiseEvent(irEvent, lastCode)
    }
})


// ---
        }
    }


    /**
      * Block for On Receive
      */
    //% weight=100
    //% blockId=onIrEvent
    //% block="on 03 IR key%key"
    export function onIREvent(event: irKeys, handler: Action)
    {
        initEvents();
        control.onEvent(irEvent, <number>event, handler);
    }

    /**
      * Last IR Code received
      */
    //% weight=90
    //% blockID=IRCode
    //% block="IR code"
    export function irCode(): number
    {
	return lastCode
    }

}
