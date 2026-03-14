<?php
/**
 * NARZĘDZIE DO ZMIANY HASŁA ADMINA
 * ===================================
 * Uruchom: https://twojadomena.pl/admin/setup-password.php
 * USUŃ TEN PLIK po ustawieniu hasła!
 */

// Prosta ochrona: klucz jednorazowy
define('SETUP_KEY', 'setup_topolska_2026');

$hash = '';
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $key  = $_POST['key']      ?? '';
    $pass = $_POST['password'] ?? '';
    $pass2 = $_POST['password2'] ?? '';

    if ($key !== SETUP_KEY) {
        $error = 'Nieprawidłowy klucz setup.';
    } elseif (strlen($pass) < 8) {
        $error = 'Hasło musi mieć co najmniej 8 znaków.';
    } elseif ($pass !== $pass2) {
        $error = 'Hasła nie są identyczne.';
    } else {
        $hash = password_hash($pass, PASSWORD_BCRYPT, ['cost' => 12]);
    }
}
?>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <title>Zmiana hasła admina</title>
    <style>
        body { font-family: sans-serif; max-width: 500px; margin: 60px auto; padding: 20px; background: #f5f5f5; }
        .card { background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { font-size: 20px; margin-bottom: 20px; }
        label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px; margin-top: 14px; }
        input { width: 100%; padding: 8px 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
        button { margin-top: 20px; background: #c4956a; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; cursor: pointer; width: 100%; }
        .error { background: #fee2e2; color: #b91c1c; padding: 10px; border-radius: 6px; margin-bottom: 14px; }
        .result { background: #dcfce7; color: #15803d; padding: 14px; border-radius: 6px; margin-top: 14px; word-break: break-all; }
        code { background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-size: 12px; }
        .warning { background: #fef9c3; color: #92400e; padding: 10px; border-radius: 6px; margin-bottom: 16px; font-size: 13px; }
    </style>
</head>
<body>
<div class="card">
    <h1>🔑 Zmiana hasła admina</h1>
    <div class="warning">⚠️ <strong>Usuń ten plik po użyciu!</strong></div>

    <?php if ($error): ?>
        <div class="error"><?= htmlspecialchars($error) ?></div>
    <?php endif; ?>

    <?php if ($hash): ?>
        <div class="result">
            <p><strong>✅ Nowy hash bcrypt:</strong></p>
            <p style="margin-top:8px; font-size:12px; font-family:monospace;"><?= htmlspecialchars($hash) ?></p>
            <p style="margin-top:12px; font-size:13px;">
                Skopiuj powyższy hash i wklej go do <code>admin/config.php</code>
                w miejsce wartości <code>ADMIN_PASSWORD_HASH</code>.
            </p>
        </div>
    <?php else: ?>
        <form method="post">
            <label for="key">Klucz setup (domyślnie: <code>setup_topolska_2026</code>)</label>
            <input type="text" id="key" name="key" required>

            <label for="password">Nowe hasło (min. 8 znaków)</label>
            <input type="password" id="password" name="password" required>

            <label for="password2">Powtórz hasło</label>
            <input type="password" id="password2" name="password2" required>

            <button type="submit">Generuj hash</button>
        </form>
    <?php endif; ?>
</div>
</body>
</html>
