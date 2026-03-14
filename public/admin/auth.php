<?php
require_once __DIR__ . '/config.php';

session_name(SESSION_NAME);
session_start([
    'cookie_httponly' => true,
    'cookie_samesite' => 'Strict',
]);

// ---- Helpers ----

function isLoggedIn(): bool {
    return !empty($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;
}

function requireLogin(): void {
    if (!isLoggedIn()) {
        header('Location: index.php');
        exit;
    }
}

function getLockoutKey(): string {
    return 'login_attempts_' . md5($_SERVER['REMOTE_ADDR'] ?? 'unknown');
}

function getAttempts(): array {
    $key = getLockoutKey();
    if (!isset($_SESSION[$key])) {
        $_SESSION[$key] = ['count' => 0, 'time' => time()];
    }
    return $_SESSION[$key];
}

function incrementAttempts(): void {
    $key = getLockoutKey();
    $attempts = getAttempts();
    $attempts['count']++;
    $attempts['time'] = time();
    $_SESSION[$key] = $attempts;
}

function resetAttempts(): void {
    unset($_SESSION[getLockoutKey()]);
}

function isLockedOut(): bool {
    $attempts = getAttempts();
    if ($attempts['count'] >= MAX_LOGIN_ATTEMPTS) {
        $elapsed = time() - $attempts['time'];
        if ($elapsed < LOCKOUT_MINUTES * 60) {
            return true;
        }
        resetAttempts();
    }
    return false;
}

function getLockoutMinutesLeft(): int {
    $attempts = getAttempts();
    $elapsed = time() - $attempts['time'];
    return max(0, (int) ceil((LOCKOUT_MINUTES * 60 - $elapsed) / 60));
}

// ---- Logowanie ----

$loginError = '';
$isLocked   = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    if (isLockedOut()) {
        $isLocked   = true;
        $loginError = 'Za dużo prób logowania. Odczekaj ' . getLockoutMinutesLeft() . ' min.';
    } else {
        $email    = trim($_POST['email'] ?? '');
        $password = $_POST['password'] ?? '';

        if (
            $email === ADMIN_EMAIL &&
            password_verify($password, ADMIN_PASSWORD_HASH)
        ) {
            session_regenerate_id(true);
            $_SESSION['admin_logged_in'] = true;
            resetAttempts();
            header('Location: dashboard.php');
            exit;
        } else {
            incrementAttempts();
            $attempts   = getAttempts();
            $remaining  = MAX_LOGIN_ATTEMPTS - $attempts['count'];
            $loginError = 'Nieprawidłowy e-mail lub hasło.'
                . ($remaining > 0 ? " Pozostało prób: $remaining." : ' Konto zablokowane.');
        }
    }
}
