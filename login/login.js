document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8000/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            document.getElementById('error').innerText = errorData.message || 'Invalid credentials';
            document.querySelector('.login-container').classList.add('shake');
            setTimeout(() => {
                document.querySelector('.login-container').classList.remove('shake');
            }, 500);
            return;
        }

        const data = await response.json();
        console.log('Login successful:', data);
        
        // Store the token if your API returns one
        if (data.token) {
            localStorage.setItem('token', data.token);
        }

        // Redirect to dashboard or home page
        window.location.href = '../Home/Homepage.html';
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('error').innerText = 'An error occurred. Please try again.';
    }
});

// Social login buttons (placeholder functionality)
document.querySelector('.google-btn').addEventListener('click', () => {
    alert('Google login integration coming soon!');
});

document.querySelector('.facebook-btn').addEventListener('click', () => {
    alert('Facebook login integration coming soon!');
});