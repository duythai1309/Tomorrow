import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pshfjrusiecymvdcvilq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzaGZqcnVzaWVjeW12ZGN2aWxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1MzMxOTAsImV4cCI6MjA2MDEwOTE5MH0.3aXLVXbFAJ_iorUMOPCK8IqaQySNUP-vRRuYFWIY3So';
const supabase = createClient(supabaseUrl, supabaseKey);

const authContainer = document.getElementById('auth-container');
const mainContent = document.getElementById('main-content');
const signupForm = document.getElementById('signup-form');
const signinForm = document.getElementById('signin-form');
const toggleSignin = document.getElementById('toggle-signin');
const toggleSignup = document.getElementById('toggle-signup');
const signupButton = document.getElementById('signup-button');
const signinButton = document.getElementById('signin-button');
const signupEmailInput = document.getElementById('signup-email');
const signupPasswordInput = document.getElementById('signup-password');
const signinEmailInput = document.getElementById('signin-email');
const signinPasswordInput = document.getElementById('signin-password');
const logoutButton = document.getElementById('logout-button');

document.addEventListener('DOMContentLoaded', async () => {
    // Kiểm tra trạng thái đăng nhập khi trang tải
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        // Nếu đã đăng nhập, hiển thị nội dung chính
        authContainer.style.display = 'none';
        mainContent.style.display = 'block';
    } else {
        // Nếu chưa đăng nhập, hiển thị form đăng ký (mặc định)
        authContainer.style.display = 'block';
        mainContent.style.display = 'none';
        signinForm.classList.add('hidden');
    }

    toggleSignin.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.classList.add('hidden');
        signinForm.classList.remove('hidden');
    });

    toggleSignup.addEventListener('click', (e) => {
        e.preventDefault();
        signinForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    });

    signupButton.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = signupEmailInput.value.trim();
        const password = signupPasswordInput.value.trim();

        if (email && password) {
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) {
                console.error('Sign up error:', error.message);
                alert(`Sign up failed: ${error.message}`);
            } else {
                console.log('Sign up successful!', data);
                alert('Sign up successful! Please check your email to verify.');
                // Có thể chuyển hướng người dùng hoặc hiển thị thông báo khác
            }
        } else {
            alert('Please enter both email and password to sign up.');
        }
    });

    signinButton.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = signinEmailInput.value.trim();
        const password = signinPasswordInput.value.trim();

        if (email && password) {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                console.error('Sign in error:', error.message);
                alert(`Sign in failed: ${error.message}`);
            } else {
                console.log('Sign in successful!', data);
                alert('Sign in successful!');
                authContainer.style.display = 'none';
                mainContent.style.display = 'block';
                // Sau khi đăng nhập thành công, bạn có thể muốn tải dữ liệu người dùng hoặc chuyển hướng đến trang khác.
            }
        } else {
            alert('Please enter both email and password to sign in.');
        }
    });

    logoutButton.addEventListener('click', async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Sign out error:', error.message);
            alert('Failed to sign out.');
        } else {
            console.log('Signed out!');
            authContainer.style.display = 'block';
            mainContent.style.display = 'none';
        }
    });
});
