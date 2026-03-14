<?php
// ============================================================
//  TOPOLSKA RESIDENCE — KONFIGURACJA PANELU ADMINA
//  Wygenerowano automatycznie. Zmień hasło po pierwszym logowaniu.
// ============================================================

define('ADMIN_EMAIL', 'admin@topolska-residence.pl');

// Hasło: Tr8#pLm5Wq2k  (bcrypt hash, cost=12)
define('ADMIN_PASSWORD_HASH', '$2b$12$NDjw3YVT6.9gATPPgat/0OaUeLB6Me05AGDhMDduD1o21TGnfYqk6');

define('DATA_FILE', __DIR__ . '/../data/data.json');
define('UPLOAD_DIR', __DIR__ . '/../images/');
define('CSV_DIR',    __DIR__ . '/../dane-gov/');

define('SESSION_NAME', 'tr_admin_session');
define('MAX_LOGIN_ATTEMPTS', 5);
define('LOCKOUT_MINUTES', 15);
