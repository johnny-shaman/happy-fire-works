let message: string[] = []
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.Asleep)
})
input.onButtonPressed(Button.A, function () {
    bluetooth.uartWriteNumber(message.length)
    for (let str of message) {
        bluetooth.uartWriteString(str)
    }
})
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Happy)
})
// A value can set's under 20 letters.
//
// And you rewrite it then reload at
//
//
// https://happy-fire-works-node.glitch.me/
//
message = ["May I have", "your message?"]
bluetooth.startButtonService()
bluetooth.startUartService()
basic.showIcon(IconNames.Asleep)
