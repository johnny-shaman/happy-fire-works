/*
  global
    navigator
    _
    $
    body
    h1
    article
    iframe
    p
    button
*/

/*
  UARTRX: "6e400003-b5a3-f393-e0a9-e50e24dcca9e",
  buttonB: "e95dda91-251d-470a-a062-fa1922dfa9a8",
*/

_($.data).draw({
  uuids: {
    UARTS:  "6e400001-b5a3-f393-e0a9-e50e24dcca9e",
    UARTTX: "6e400002-b5a3-f393-e0a9-e50e24dcca9e",
    buttonA: "e95dda90-251d-470a-a062-fa1922dfa9a8",
    buttonS: "e95d9882-251d-470a-a062-fa1922dfa9a8"
  },
  button: {},
  uart: {},
  message: [],
  color: [],
  rnd () {
    return Math.floor(Math.random() * (Math.floor(201) - Math.ceil(0))); //The maximum is exclusive and the minimum is inclusive
  },
  length: 0,
  debug:[],
  async bluetooth () {
    return await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices:_($.data.uuids).vals._
    })
    .then(device => device.gatt.connect())
    .then(ready => ({
      button: (
        ready.getPrimaryService($.data.uuids.buttonS)
      )
      .then(service => (
        service.getCharacteristic($.data.uuids.buttonA)
        .then(btnA => (
          _($.data).draw({button: btnA}),
          $(btnA)
          .class("pushA")
          .on("characteristicvaluechanged")
          .get
          .startNotifications()
        ))
      )),
      uart: (
        ready.getPrimaryService($.data.uuids.UARTS)
      )
      .then(service =>(
        service.getCharacteristic($.data.uuids.UARTTX)
        .then(tx => (
          _($.data).draw({uart: tx}),
          $(tx)
          .class("message")
          .on("characteristicvaluechanged")
          .get
          .startNotifications()
        ))
      ))
    }));
  }
});

_($.role).draw({
  message (e) {
    $.data.length === 0 ? 
    _($.data).draw({
      length: Number(String.fromCharCode.call("", e.target.value.getUint8(0)))
    })
    : $.data.message.length < $.data.length && $.data.message.push(
      [...function* (v) {
        while (e.target.value.byteLength > v) {
          yield String.fromCharCode.call("", e.target.value.getUint8(v++));
        }
      }(0)].join("")
    );
  },
  pushA (e) {
    !!e.target.value.getUint8(0) && $(
      new WebSocket("wss://happy-fire-works-johnny-shaman1.c9users.io/")
    )
    .class("opened")
    .on("open");
  },
  opened (e) {
    _($(e).off("open").get)
    .been
    .send(_($.data).hold("message", "color").$(o => _(o).draw({message: o.message.join(" ")})).json)
    .close();
  },
  async pair (e) {
    $.data.color.push($.data.rnd(), $.data.rnd(), $.data.rnd());
    return await $(e).look();
  }
});

_($.pack).draw({
  async pair (e, d) {
    await d
    ? (
      $(e).$(),
      $.id.wrap.$(
        p.css({color: `rgb(${$.data.color.join(",")})`}).$(
          "Your message will appear this color."
        ),
        p.css({color: `rgb(${$.data.color.join(",")})`}).$(
          "Thank you!"
        )
      )
    )
    : $(e).seem("Retry...");
  }
});

body.$(
  h1.$("Project Name").id("header"),
  article.id("wrap").$(
    iframe.id("movie"),
    button
    .mark("bluetooth")
    .class("pair")
    .on("click")
    .$("Start to Pair")
  )
);
