import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pshfjrusiecymvdcvilq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzaGZqcnVzaWVjeW12ZGN2aWxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1MzMxOTAsImV4cCI6MjA2MDEwOTE5MH0.3aXLVXbFAJ_iorUMOPCK8IqaQySNUP-vRRuYFWIY3So';
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', async () => {
    const bookTitleElement = document.querySelector('.max-w-3xl h1');
    const bookAuthorElement = document.querySelector('.max-w-3xl p');
    const bookContentContainer = document.querySelector('.max-w-3xl'); // Container chứa các đoạn văn

    // Lấy ID sách từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    const backButton = document.querySelector('.absolute a');
    if (backButton) {
        backButton.href = document.referrer || 'library.html'; // Quay lại trang trước hoặc trang thư viện
    }

    if (bookId) {
        const bookData = await fetchBookData(bookId);
        if (bookData) {
            bookTitleElement.textContent = bookData.title || 'Untitled';
            bookAuthorElement.textContent = bookData.author || 'Unknown Author';
            displayBookContent(bookData.content || 'No content available.', bookContentContainer);
            await fetchAndDisplayHighlights(bookId, bookContentContainer);
        } else {
            bookContentContainer.textContent = 'Failed to load book content.';
        }
    } else {
        bookContentContainer.textContent = 'Invalid book ID.';
    }
});

async function fetchBookData(bookId) {
    try {
        const { data: book, error } = await supabase
            .from('books') // Thay 'books' bằng tên bảng sách của bạn
            .select('title, author, content') // Chọn các cột cần thiết
            .eq('id', bookId)
            .single();

        if (error) {
            console.error('Lỗi khi tải dữ liệu sách:', error.message);
            return null;
        }
        return book;
    } catch (error) {
        console.error('Lỗi không mong muốn khi tải dữ liệu sách:', error.message);
        return null;
    }
}

function displayBookContent(content, container) {
    container.innerHTML = ''; // Clear existing content
    // Split content into paragraphs (you might need a more sophisticated way based on your data)
    const paragraphs = content.split('\n\n'); // Assuming paragraphs are separated by double newlines
    paragraphs.forEach((paragraph, index) => {
        const paragraphDiv = document.createElement('div');
        paragraphDiv.id = `paragraph-${index}`;
        paragraphDiv.classList.add('bg-white', 'rounded-xl', 'shadow', 'p-6', 'text-lg', 'leading-relaxed', 'cursor-pointer', 'select-text', 'mb-4');
        paragraphDiv.textContent = paragraph.trim();
        container.appendChild(paragraphDiv);
        paragraphDiv.addEventListener('mouseup', handleTextSelection);
    });
}

async function fetchAndDisplayHighlights(bookId, contentContainer) {
    try {
        const { data: highlights, error } = await supabase
            .from('highlights') // Thay 'highlights' bằng tên bảng highlight của bạn
            .select('start_index, end_index, text, paragraph_index')
            .eq('book_id', bookId)
            .eq('user_id', supabase.auth.currentUser?.id);

        if (error) {
            console.error('Lỗi khi tải highlights:', error.message);
        } else if (highlights) {
            applyHighlights(highlights, contentContainer);
        }
    } catch (error) {
        console.error('Lỗi không mong muốn khi tải highlights:', error.message);
    }
}

function applyHighlights(highlights, contentContainer) {
    const paragraphDivs = contentContainer.querySelectorAll('.select-text');
    if (!paragraphDivs) return;

    highlights.forEach(highlight => {
        const paragraphIndex = highlight.paragraph_index;
        const startIndex = highlight.start_index;
        const endIndex = highlight.end_index;
        const highlightedText = highlight.text;

        if (paragraphDivs[paragraphIndex]) {
            const paragraph = paragraphDivs[paragraphIndex];
            const originalText = paragraph.textContent;

            const pre = originalText.substring(0, startIndex);
            const highlightSpan = `<span class="highlighted">${highlightedText}</span>`;
            const post = originalText.substring(endIndex);

            paragraph.innerHTML = pre + highlightSpan + post;
        }
    });
}

function handleTextSelection() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const selectedText = selection.toString().trim();
        if (selectedText) {
            const range = selection.getRangeAt(0);
            const startNode = range.startContainer.parentNode;
            const endNode = range.endContainer.parentNode;

            if (startNode && endNode && startNode.classList.contains('select-text') && startNode === endNode) {
                const paragraphIndex = parseInt(startNode.id.split('-')[1]);
                const startIndex = range.startOffset;
                const endIndex = range.endOffset;

                saveHighlight(bookId, startIndex, endIndex, selectedText, paragraphIndex);
                selection.removeAllRanges();
            }
        }
    }
}

async function saveHighlight(bookId, startIndex, endIndex, text, paragraphIndex) {
    try {
        const { data, error } = await supabase
            .from('highlights') // Thay 'highlights' bằng tên bảng highlight của bạn
            .insert([
                {
                    book_id: bookId,
                    user_id: supabase.auth.currentUser?.id,
                    start_index: startIndex,
                    end_index: endIndex,
                    text: text,
                    paragraph_index: paragraphIndex
                }
            ]);

        if (error) {
            console.error('Lỗi khi lưu highlight:', error.message);
            alert('Failed to save highlight.');
        } else {
            console.log('Highlight saved:', data);
            fetchAndDisplayHighlights(bookId, document.querySelector('.max-w-3xl'));
        }
    } catch (error) {
        console.error('Lỗi không mong muốn khi lưu highlight:', error.message);
        alert('An unexpected error occurred while saving highlight.');
    }
}
