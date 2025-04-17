import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL'; // Thay bằng URL Supabase của bạn
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'; // Thay bằng Anon Key Supabase của bạn
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', async () => {
    const booksTableBody = document.querySelector('.table-container table tbody');
    const searchInput = document.querySelector('.search-bar input');

    if (booksTableBody && searchInput) {
        await fetchAndDisplayBooks();

        searchInput.addEventListener('input', async (event) => {
            const searchTerm = event.target.value.toLowerCase().trim();
            await fetchAndDisplayBooks(searchTerm);
        });
    } else {
        console.error('Không tìm thấy phần tử tbody của bảng sách hoặc thanh tìm kiếm.');
    }
});

async function fetchAndDisplayBooks(searchTerm = '') {
    const booksTableBody = document.querySelector('.table-container table tbody');
    if (!booksTableBody) return;
    booksTableBody.innerHTML = ''; // Xóa dữ liệu cũ

    try {
        let query = supabase
            .from('books') // Thay 'books' bằng tên bảng sách của bạn
            .select('title, author, publication_date, id'); // Chọn các cột cần thiết

        if (searchTerm) {
            query = query.ilike('title', `%${searchTerm}%`); // Tìm kiếm gần đúng theo tiêu đề
        }

        const { data: books, error } = await query.order('title', { ascending: true });

        if (error) {
            console.error('Lỗi khi tải sách:', error.message);
            const errorRow = booksTableBody.insertRow();
            const errorCell = errorRow.insertCell();
            errorCell.colSpan = 4;
            errorCell.textContent = `Error loading books: ${error.message}`;
        } else if (books && books.length > 0) {
            books.forEach(book => {
                const row = booksTableBody.insertRow();

                const titleCell = row.insertCell();
                titleCell.textContent = book.title;

                const authorCell = row.insertCell();
                authorCell.textContent = book.author;

                const dateCell = row.insertCell();
                dateCell.textContent = book.publication_date ? new Date(book.publication_date).toLocaleDateString() : '';

                const actionsCell = row.insertCell();
                const viewButton = document.createElement('a');
                viewButton.href = `/books.html?id=${book.id}`; // Chuyển đến trang đọc sách với ID
                viewButton.classList.add('btn', 'btn-sm'); // Thêm class стили nếu cần
                viewButton.textContent = 'Read';
                actionsCell.appendChild(viewButton);
            });
        } else {
            const emptyRow = booksTableBody.insertRow();
            const emptyCell = emptyRow.insertCell();
            emptyCell.colSpan = 4;
            emptyCell.textContent = 'No books found in your library.';
        }
    } catch (error) {
        console.error('Đã xảy ra lỗi không mong muốn:', error.message);
        const errorRow = booksTableBody.insertRow();
        const errorCell = errorRow.insertCell();
        errorCell.colSpan = 4;
        errorCell.textContent = 'An unexpected error occurred.';
    }
}
