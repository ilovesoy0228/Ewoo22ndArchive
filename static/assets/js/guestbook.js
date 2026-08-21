// Guest book canvas drawing (source: GuestBook getPos/startDraw/draw/endDraw)
(function () {
  var canvas = document.getElementById("guestbook-canvas");
  var ctx = canvas.getContext("2d");
  var isDrawing = false;
  var lastPos = null;

  function getPos(e) {
    var rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches.length) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function startDraw(e) {
    isDrawing = true;
    lastPos = getPos(e);
  }

  function draw(e) {
    if (!isDrawing || !lastPos) return;
    var pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = "#333333";
    ctx.lineWidth = 1.5;
    ctx.lineCap = "round";
    ctx.stroke();
    lastPos = pos;
  }

  function endDraw() {
    isDrawing = false;
    lastPos = null;
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  canvas.addEventListener("mousedown", startDraw);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", endDraw);
  canvas.addEventListener("mouseleave", endDraw);
  canvas.addEventListener("touchstart", startDraw);
  canvas.addEventListener("touchmove", draw);
  canvas.addEventListener("touchend", endDraw);

  document.getElementById("guestbook-clear").addEventListener("click", clearCanvas);

  // Guest book form submit (source: GuestBook.submit)
  document.getElementById("guestbook-submit").addEventListener("click", function () {
    var nameInput = document.getElementById("guestbook-name");
    var messageInput = document.getElementById("guestbook-message");
    var name = nameInput.value.trim();
    var message = messageInput.value.trim();
    if (!name && !message) return;

    var entry = document.createElement("div");
    entry.className = "border-b border-[#E0DDD7] pb-6";

    var nameEl = document.createElement("p");
    nameEl.className = "text-xs text-[#8A8A8A] mb-1 uppercase tracking-widest";
    nameEl.style.fontFamily = "var(--font-sans)";
    nameEl.textContent = name || "익명";

    var messageEl = document.createElement("p");
    messageEl.className = "text-sm text-[#333333] leading-relaxed";
    messageEl.style.fontFamily = "var(--font-sans)";
    messageEl.textContent = message;

    entry.appendChild(nameEl);
    entry.appendChild(messageEl);
    document.getElementById("guestbook-entries").appendChild(entry);

    nameInput.value = "";
    messageInput.value = "";
    clearCanvas();
  });
})();
