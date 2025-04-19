import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pshfjrusiecymvdcvilq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzaGZqcnVzaWVjeW12ZGN2aWxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1MzMxOTAsImV4cCI6MjA2MDEwOTE5MH0.3aXLVXbFAJ_iorUMOPCK8IqaQySNUP-vRRuYFWIY3So';
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.querySelector('.back-button');
    const discardCardsContainer = document.querySelector('.container'); // Container chứa các card phế liệu

    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = 'library.html'; // Chuyển về trang thư viện
        });
    } else {
        console.error('Không tìm thấy nút quay lại.');
    }

    // Gọi hàm để tải và hiển thị các highlight đã loại bỏ
    fetchAndDisplayDiscards();
});

async function fetchAndDisplayDiscards() {
    if (!discardCardsContainer) {
        console.error('Không tìm thấy container cho các card phế liệu.');
        return;
    }

    try {
        const { data: discards, error } = await supabase
            .from('discards') // <--- CHÚ Ý: Thay 'discards' bằng tên bảng phế liệu của bạn
            .select('id, book_title, book_author, highlight_text, created_at')
            .eq('user_id', supabase.auth.currentUser?.id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Lỗi khi tải các mục đã loại bỏ:', error.message);
            discardCardsContainer.innerHTML = `<p class="error-message">Error loading discards: ${error.message}</p>`;
        } else if (discards && discards.length > 0) {
            discardCardsContainer.innerHTML = ''; // Xóa nội dung cũ
            discards.forEach(discard => {
                const card = createDiscardCard(discard);
                discardCardsContainer.appendChild(card);
            });
        } else {
            discardCardsContainer.innerHTML = '<p class="empty-message">No discarded highlights yet.</p>';
        }
    } catch (error) {
        console.error('Lỗi không mong muốn khi tải các mục đã loại bỏ:', error.message);
        discardCardsContainer.innerHTML = '<p class="error-message">An unexpected error occurred.</p>';
    }
}

function createDiscardCard(discard) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.discardId = discard.id; // Lưu ID để có thể thao tác sau này

    const cardTools = document.createElement('div');
    cardTools.classList.add('card-tools');
    cardTools.innerHTML = `
        <button class="tool-button" title="View Context">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
        </button>
        <button class="tool-button" title="More Options">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 9l6 6 6-6"/>
            </svg>
        </button>
    `;
    card.appendChild(cardTools);

    const bookInfo = document.createElement('div');
    bookInfo.classList.add('book-info');
    bookInfo.innerHTML = `
        <div class="dot"></div>
        <div class="book-cover">
            <img src="/api/placeholder/60/80" alt="Book cover">
        </div>
        <div class="book-details">
            <h2>${discard.book_title || 'Unknown Title'}</h2>
            <h3>${discard.book_author || 'Unknown Author'}</h3>
        </div>
    `;
    card.appendChild(bookInfo);

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');
    cardContent.innerHTML = `<p>${discard.highlight_text}</p>`;
    card.appendChild(cardContent);

    const cardActions = document.createElement('div');
    cardActions.classList.add('card-actions');
    cardActions.innerHTML = `
        <button class="action-button restore-button" title="Restore">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>
        </button>
        <button class="action-button favorite-button" title="Favorite">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
        </button>
        <button class="action-button edit-button" title="Edit">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
        </button>
        <button class="action-button delete-button" title="Delete Permanently">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                <polyline points="16 6 12 2 8 6"></polyline>
                <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
        </button>
    `;
    card.appendChild(cardActions);

    // Thêm event listeners cho các nút hành động
    const restoreButton = card.querySelector('.restore-button');
    if (restoreButton) {
        restoreButton.addEventListener('click', () => handleRestoreDiscard(discard.id));
    }

    const deleteButton = card.querySelector('.delete-button');
    if (deleteButton) {
        deleteButton.addEventListener('click', () => handleDeleteDiscard(discard.id));
    }

    return card;
}

async function handleRestoreDiscard(discardId) {
    if (confirm('Are you sure you want to restore this highlight?')) {
        try {
            // **GIẢ ĐỊNH:** Bạn có một bảng 'highlights' và bạn muốn chuyển mục từ 'discards' về đó
            const { data, error } = await supabase
                .from('discards') // Lấy mục đã loại bỏ
                .select('*')
                .eq('id', discardId)
                .single();

            if (error) {
                console.error('Lỗi khi lấy mục đã loại bỏ để khôi phục:', error.message);
                alert('Failed to retrieve discard data for restoration.');
                return;
            }

            const highlightToRestore = {
                book_id: data.book_id,
                user_id: data.user_id,
                text: data.highlight_text,
                start_index: data.start_index,
                end_index: data.end_index,
                created_at: new Date().toISOString(), // Hoặc giữ nguyên created_at cũ
                // Thêm các cột khác nếu có
            };

            const { error: insertError } = await supabase
                .from('highlights') // Thêm vào bảng highlights
                .insert([highlightToRestore]);

            if (insertError) {
                console.error('Lỗi khi khôi phục highlight:', insertError.message);
                alert('Failed to restore highlight.');
            } else {
                // Sau khi khôi phục thành công, xóa mục khỏi bảng discards
                const { error: deleteError } = await supabase
                    .from('discards')
                    .delete()
                    .eq('id', discardId);

                if (deleteError) {
                    console.error('Lỗi khi xóa mục đã loại bỏ sau khi khôi phục:', deleteError.message);
                    alert('Failed to remove discard after restoration.');
                } else {
                    alert('Highlight restored successfully!');
                    fetchAndDisplayDiscards(); // Tải lại danh sách
                }
            }
        } catch (error) {
            console.error('Lỗi không mong muốn khi khôi phục:', error.message);
            alert('An unexpected error occurred during restoration.');
        }
    }
}

async function handleDeleteDiscard(discardId) {
    if (confirm('Are you sure you want to permanently delete this discard? This action cannot be undone.')) {
        try {
            const { error } = await supabase
                .from('discards') // <--- CHÚ Ý: Thay 'discards' bằng tên bảng phế liệu của bạn
                .delete()
                .eq('id', discardId);

            if (error) {
                console.error('Lỗi khi xóa vĩnh viễn mục đã loại bỏ:', error.message);
                alert('Failed to delete discard permanently.');
            } else {
                alert('Discard deleted permanently.');
                fetchAndDisplayDiscards(); // Tải lại danh sách
            }
        } catch (error) {
            console.error('Lỗi không mong muốn khi xóa vĩnh viễn:', error.message);
            alert('An unexpected error occurred during permanent deletion.');
        }
    }
}
