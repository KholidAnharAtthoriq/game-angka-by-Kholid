let correctNumber;
let attemptsLeft;
let gameOver = false;

// Memulai permainan baru
function startGame() {
    correctNumber = Math.floor(Math.random() * 100) + 1;
    attemptsLeft = 5;
    gameOver = false;
    updateAttemptsMessage();
    message.textContent = '';
}

// Fungsi untuk memeriksa tebakan
function checkGuess() {
    if (gameOver) {
        message.textContent = 'Silakan mulai permainan baru.';
        return;
    }

    const guessField = document.getElementById('guessField');
    const userGuess = parseInt(guessField.value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        message.textContent = 'Masukkan angka antara 1 dan 100.';
        return;
    }

    attemptsLeft--;
    updateAttemptsMessage();

    if (userGuess === correctNumber) {
        gameOver = true;
        message.textContent = `Selamat! Anda berhasil menebak angka yang benar: ${correctNumber}`;
        message.style.color = '#28a745'; // Hijau
        playCorrectSound();
        document.body.style.backgroundColor = '#cce5ff'; // Biru muda
    } else if (attemptsLeft === 0) {
        gameOver = true;
        message.textContent = `Maaf, Anda kehabisan percobaan. Angka yang benar adalah: ${correctNumber}`;
        message.style.color = '#dc3545'; // Merah
        playWrongSound();
        document.body.style.backgroundColor = '#f8d7da'; // Merah muda
    } else if (userGuess < correctNumber) {
        message.textContent = 'Tebakan terlalu rendah. Coba lagi!';
        message.style.color = '#ffc107'; // Kuning
        playWrongSound();
    } else {
        message.textContent = 'Tebakan terlalu tinggi. Coba lagi!';
        message.style.color = '#ffc107'; // Kuning
        playWrongSound();
    }
    animateGuessResult();
}

// Animasi saat hasil tebakan muncul
function animateGuessResult() {
    const message = document.getElementById('message');
    message.style.opacity = 0;
    setTimeout(() => {
        message.style.opacity = 1;
    }, 100);
}

// Memperbarui pesan percobaan tersisa
function updateAttemptsMessage() {
    attempts.textContent = `Percobaan tersisa: ${attemptsLeft}`;
}

// Memulai permainan saat halaman dimuat
window.onload = startGame;

// Fungsi untuk memulai ulang permainan
function resetGame() {
    startGame();
    document.getElementById('guessField').value = '';
    message.textContent = '';
    document.body.style.backgroundColor = '#f0f0f0'; // Warna latar belakang asli
}

// Memutar suara untuk jawaban benar
function playCorrectSound() {
    const correctSound = document.getElementById('correctSound');
    correctSound.play();
}

// Memutar suara untuk jawaban salah
function playWrongSound() {
    const wrongSound = document.getElementById('wrongSound');
    wrongSound.play();
}
