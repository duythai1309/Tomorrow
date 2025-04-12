document.addEventListener("DOMContentLoaded", () => {
  const highlightListEl = document.getElementById("highlightList");
  const highlights = JSON.parse(localStorage.getItem("highlights") || "[]");

  if (highlights.length > 0) {
    highlights.forEach((highlight) => {
      const highlightCard = document.createElement("div");
      highlightCard.classList.add("bg-white", "rounded-xl", "shadow", "p-6", "mb-4");

      const quoteText = document.createElement("p");
      quoteText.classList.add("text-lg", "leading-relaxed", "italic");
      quoteText.textContent = highlight;

      highlightCard.appendChild(quoteText);
      highlightListEl.appendChild(highlightCard);
    });
  } else {
    const noHighlightsMessage = document.createElement("p");
    noHighlightsMessage.textContent = "No highlights saved yet.";
    highlightListEl.appendChild(noHighlightsMessage);
  }
});
