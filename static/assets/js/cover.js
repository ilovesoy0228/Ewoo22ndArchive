// Cover click → open book (source: App().handleOpen)
document.getElementById("cover-click-target").addEventListener("click", function () {
  document.getElementById("cover-scene").classList.add("hidden");
  var book = document.getElementById("book");
  book.style.display = "block";
  book.classList.add("is-open");
  setTimeout(function () {
    document.getElementById("book").scrollIntoView({ behavior: "smooth" });
  }, 400);
});
