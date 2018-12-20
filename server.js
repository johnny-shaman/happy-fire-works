(() => {
  'use strict';
  const _ = require("losand");
  const messages = [];
  global.pyrokinesist = null;

  _(require('http').createServer(
    _(require('express'))
    .map($ => ({
      app: $(),
      "static": $.static
    }))
    .map($ => 
      _($.app)
      .been
      .use(require('cors')())
      .use($.static('./public'))
      .set('view options', {layout: false})
      .get('/', (req, res) => res.status(200).render("index.html"))
      ._
    )._
  ))
  .$(sv => _(new (require('ws').Server)({server : sv})).on({connection (ws) {
    _(ws).$(s => _(s).on({
      message (d) {
        console.log(d);
        //WebSocket接続後に、JSONで、{"!pyrokinesis!": true}を送信すると、Output側として認識するよ！
        d.json._['!pyrokinesis!']
        ? _(global).draw({pyrokinesist: ws})
        : messages.push(d);
      }
    }));
    setInterval(
      () => messages.length && global.pyrokinesist && global.pyrokinesist.send(messages.shift()),
      250
    );
  }}))._.listen(process.env.PORT, process.env.IP);
})();
