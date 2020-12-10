ctx.beginPath();
ctx.fillStyle = "#f3ea5f";
ctx.fillRect(20, 40, 75, 20);

ctx.strokeStyle = "#ff48c4";
ctx.lineWidth = 4;
ctx.strokeRect(20, 40, 75, 20);
ctx.closePath();

ctx.beginPath();
ctx.arc(240, 160, 7, 0, Math.PI*2, false);
ctx.fillStyle = "#FDA400";
ctx.fill();
ctx.closePath(); 