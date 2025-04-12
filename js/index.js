document.addEventListener("DOMContentLoaded", () => {
    const recentHighlightListEl = document.getElementById("recent-highlight-list");
    const highlights = JSON.parse(localStorage.getItem("highlights") || "[]");
    const numberOfRecentHighlightsToShow = 3; // Số lượng highlight muốn hiển thị

    if (highlights.length > 0) {
        // Lấy ra một số lượng highlight gần nhất (từ cuối mảng)
        const recentHighlights = highlights.slice(-numberOfRecentHighlightsToShow);

        recentHighlights.forEach((highlight) => {
            const highlightItem = document.createElement("p");
            highlightItem.classList.add("text-gray-700", "italic");
            highlightItem.textContent = `"${highlight}"`;
            recentHighlightListEl.appendChild(highlightItem);
        });

        // Nếu có ít hơn số lượng muốn hiển thị, không cần thêm thông báo
    } else {
        const noHighlightsMessage = document.createElement("p");
        noHighlightsMessage.textContent = "No highlights saved yet.";
        recentHighlightListEl.appendChild(noHighlightsMessage);
    }
});
