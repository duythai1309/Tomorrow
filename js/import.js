import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL'; // <--- CHÚ Ý: Thay bằng URL Supabase của bạn
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'; // <--- CHÚ Ý: Thay bằng Anon Key Supabase của bạn
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.querySelector('.buttons .btn:nth-child(1)');
    const highlightTextarea = document.getElementById('highlight');
    const authorInput = document.getElementById('author');
    const titleInput = document.getElementById('title');
    const bookIdSelect = document.getElementById('bookId'); // Lấy tham chiếu đến dropdown

    if (saveButton) {
        saveButton.addEventListener('click', handleSaveHighlight);
    } else {
        console.error('Không tìm thấy nút Save.');
    }

    const createNewButton = document.querySelector('.buttons .btn:nth-child(2)');
    if (createNewButton) {
        createNewButton.addEventListener('click', handleCreateNew);
    } else {
        console.warn('Không tìm thấy nút Create new one.');
    }

    const viewAllButton = document.querySelector('.buttons .btn:nth-child(3)');
    if (viewAllButton) {
        viewAllButton.addEventListener('click', handleViewAll);
    } else {
        console.warn('Không tìm thấy nút View all.');
    }

    // Gọi hàm để tải danh sách sách khi trang tải
    fetchUserBooks(bookIdSelect);
});

async function fetchUserBooks(selectElement) {
    try {
        const { data: books, error } = await supabase
            .from('books')
            .select('id, title')
            .eq('user_id', supabase.auth.currentUser?.id); // Chỉ lấy sách của người dùng hiện tại
            // Bạn có thể cần thiết lập RLS policy cho bảng 'books' để đảm bảo an toàn

        if (error) {
            console.error('Lỗi khi tải danh sách sách:', error.message);
            const errorOption = document.createElement('option');
            errorOption.textContent = 'Failed to load books';
            selectElement.appendChild(errorOption);
            selectElement.disabled = true;
        } else if (books && books.length > 0) {
            books.forEach(book => {
                const option = document.createElement('option');
                option.value = book.id;
                option.textContent = book.title;
                selectElement.appendChild(option);
            });
        } else {
            const emptyOption = document.createElement('option');
            emptyOption.textContent = 'No books available';
            selectElement.appendChild(emptyOption);
            selectElement.disabled = true;
        }
    } catch (error) {
        console.error('Lỗi không mong muốn khi tải sách:', error.message);
        const errorOption = document.createElement('option');
        errorOption.textContent = 'An unexpected error occurred';
        selectElement.appendChild(errorOption);
        selectElement.disabled = true;
    }
}

async function handleSaveHighlight() {
    const highlightText = highlightTextarea.value.trim();
    const author = authorInput.value.trim();
    const title = titleInput.value.trim();
    const bookId = document.getElementById('bookId').value; // Lấy bookId từ dropdown

    if (!highlightText) {
        alert('Please paste your highlight text.');
        return;
    }

    if (!bookId) {
        alert('Please select a book for this highlight.');
        return;
    }

    const newHighlight = {
        book_id: bookId,
        user_id: supabase.auth.currentUser?.id,
        text: highlightText,
        start_index: 0,
        end_index: highlightText.length,
        metadata: {
            author: author || null,
            title: title || null
        }
    };

    try {
        const { data, error } = await supabase
            .from('highlights') // <--- CHÚ Ý: Thay 'highlights' bằng tên bảng của bạn
            .insert([newHighlight]);

        if (error) {
            console.error('Lỗi khi lưu highlight:', error.message);
            alert(`Failed to save highlight: ${error.message}`);
        } else {
            console.log('Highlight saved successfully!', data);
            alert('Highlight saved successfully! Returning to main page.');
            window.location.href = 'index.html'; // Chuyển về trang chính
        }
    } catch (error) {
        console.error('Lỗi không mong muốn khi lưu highlight:', error.message);
        alert('An unexpected error occurred while saving the highlight.');
    }
}

function handleCreateNew() {
    document.getElementById('highlight').value = '';
    document.getElementById('author').value = '';
    document.getElementById('title').value = '';
    document.getElementById('bookId').value = ''; // Reset dropdown về tùy chọn mặc định
}

function handleViewAll() {
    window.location.href = 'library.html';
}
