<?php
require_once __DIR__ . '/auth.php';
if (isLoggedIn()) {
    header('Location: dashboard.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel admina – Topolska Residence</title>
    <link rel="stylesheet" href="style.css">
    <meta name="robots" content="noindex, nofollow">
</head>
<body class="login-page">
    <div class="login-card">
        <div class="login-logo">
            <span class="logo-text">Topolska <em>Residence</em></span>
            <p class="login-sub">Panel administracyjny</p>
        </div>

        <?php if ($loginError): ?>
            <div class="alert alert-error" role="alert">
                <?= htmlspecialchars($loginError) ?>
            </div>
        <?php endif; ?>

        <form method="post" action="" novalidate>
            <div class="form-group">
                <label for="email">E-mail</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="admin@topolska-residence.pl"
                    required
                    autocomplete="email"
                    <?= $isLocked ? 'disabled' : '' ?>
                    value="<?= htmlspecialchars($_POST['email'] ?? '') ?>"
                >
            </div>
            <div class="form-group">
                <label for="password">Hasło</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="••••••••••••"
                    required
                    autocomplete="current-password"
                    <?= $isLocked ? 'disabled' : '' ?>
                >
            </div>
            <button type="submit" name="login" class="btn btn-primary btn-block" <?= $isLocked ? 'disabled' : '' ?>>
                Zaloguj się
            </button>
        </form>

        <p class="login-footer">
            <a href="/">← Wróć na stronę</a>
        </p>
    </div>
</body>
</html>
