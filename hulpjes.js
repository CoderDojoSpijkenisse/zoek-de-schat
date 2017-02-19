var canvas  = document.getElementById('kaart')
    ctx     = canvas.getContext("2d"),
    kaart   = new Image(),
    kruisje = new Image(),
    ratio   = canvas.width / kaart.width;

canvas.setAttribute('width', Math.round(0.75 * screen.width));
canvas.setAttribute('height', Math.round(0.75 * screen.height));

kaart.src = 'kaart.png';
kruisje.src = 'kruis.png';

var points = [
  { x: 0.42, y: 0.48, label: 1 },
  { x: 0.35, y: 0.2, label: 2 },
  { x: 0.67, y: 0.5, label: 3 },
  { x: 0.1, y: 0.43, label: 4 },
  { x: 0.85, y: 0.75, label: 5 },
  { x: 0.2, y: 0.6, label: 6 },
  { x: 0.6, y: 0.2, label: 7 },
  { x: 0.45, y: 0.7, label: 8 },
];
var geselecteerd = [];

window.onload = function() {
  ratio = canvas.width / kaart.width;
  ctx.drawImage(kaart, 0, 0, canvas.width, canvas.height);

  spel();
}

function tekenKruisje(x) {
  if (geselecteerd.indexOf(x) < 0) {
    geselecteerd.push(x);
  }

  var ratio = canvas.width / kaart.width;
  var x_pos = points[x].x * canvas.width,
      y_pos = points[x].y * canvas.height;

  ctx.drawImage(
    kruisje,
    x_pos,
    y_pos,
    ratio * kruisje.width,
    ratio * kruisje.height
  );
}

function kiesWillekeurigeNummers(aantal) {
  aantal = Math.min(aantal, points.length);
  var result = new Array(aantal),
      len = points.length,
      taken = new Array(len);
  if (aantal > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (aantal--) {
      var x = Math.floor(Math.random() * len);
      result[aantal] = points[x in taken ? taken[x] : x].label;
      taken[x] = --len;
  }
  return result;
}

canvas.onclick = function(e) {
  // e.clientX
  // e.clientY

  for (var x in geselecteerd) {
    var x_pos = points[x].x * canvas.width,
        y_pos = points[x].y * canvas.height;

    var pos = getCursorPosition(canvas, e);
    if (Math.abs(x_pos - pos.x) < 20 && Math.abs(y_pos - pos.y) < 20) {
      console.log('Raak');
    } else {
      console.log('Mis [%d, %d]', x_pos, y_pos);
    }
  }
  console.log('Clicked at %o', [e.x, e.y]);
}

function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    return {x: x, y: y};
}
