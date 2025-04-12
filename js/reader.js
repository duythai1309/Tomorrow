document.addEventListener("DOMContentLoaded", () => {
  const textEl = document.getElementById("text");
  const viewBtn = document.getElementById("viewHighlights");

  textEl.addEventListener("mouseup", () => {
    const selection = window.getSelection().toString().trim();
    if (selection) {
      const highlights = JSON.parse(localStorage.getItem("highlights") || "[]");
      highlights.push(selection);
      localStorage.setItem("highlights", JSON.stringify(highlights));
      alert("Highlight saved!");
    }
  });

  viewBtn.addEventListener("click", () => {
    window.location.href = "highlights.html";
  });
});
