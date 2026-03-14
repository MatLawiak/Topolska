<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/config.php';
requireLogin();

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_FILES['hero_image'])) {
    echo json_encode(['ok' => false, 'error' => 'Brak pliku']);
    exit;
}

$file      = $_FILES['hero_image'];
$allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
$maxSize   = 10 * 1024 * 1024; // 10 MB

// Walidacja
if ($file['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['ok' => false, 'error' => 'Błąd przesyłania pliku']);
    exit;
}
if ($file['size'] > $maxSize) {
    echo json_encode(['ok' => false, 'error' => 'Plik za duży (max 10 MB)']);
    exit;
}

// Sprawdź MIME przez finfo
$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime  = $finfo->file($file['tmp_name']);
if (!in_array($mime, $allowedTypes, true)) {
    echo json_encode(['ok' => false, 'error' => 'Niedozwolony typ pliku (dozwolone: JPG, PNG, WebP)']);
    exit;
}

$ext      = match ($mime) {
    'image/jpeg' => '.jpg',
    'image/png'  => '.png',
    'image/webp' => '.webp',
    default      => '.jpg',
};

// Zachowaj poprzednie hero jako backup
if (!is_dir(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, 0755, true);
}

$destPath = UPLOAD_DIR . 'hero' . $ext;
$destUrl  = '/images/hero' . $ext;

// Jeśli zmienił się ext — usuń stare
foreach (['hero.jpg', 'hero.png', 'hero.webp'] as $old) {
    $oldPath = UPLOAD_DIR . $old;
    if ($oldPath !== $destPath && file_exists($oldPath)) {
        unlink($oldPath);
    }
}

if (!move_uploaded_file($file['tmp_name'], $destPath)) {
    echo json_encode(['ok' => false, 'error' => 'Nie udało się zapisać pliku']);
    exit;
}

// Zaktualizuj data.json
if (file_exists(DATA_FILE)) {
    $data = json_decode(file_get_contents(DATA_FILE), true);
    if ($data) {
        $data['inwestycja']['zdjecie_hero'] = $destUrl;
        file_put_contents(
            DATA_FILE,
            json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
        );
    }
}

echo json_encode(['ok' => true, 'url' => $destUrl, 'msg' => 'Zdjęcie hero zostało zaktualizowane.']);
