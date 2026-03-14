<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/generate-csv.php';
requireLogin();

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['ok' => false, 'error' => 'Invalid method']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$tab   = $input['tab'] ?? '';

if (!file_exists(DATA_FILE)) {
    echo json_encode(['ok' => false, 'error' => 'data.json not found']);
    exit;
}

$data = json_decode(file_get_contents(DATA_FILE), true);
if (!$data) {
    echo json_encode(['ok' => false, 'error' => 'Cannot parse data.json']);
    exit;
}

// ---- Zakładka Baner ----
if ($tab === 'baner') {
    $data['inwestycja']['hero']['naglowek'] = strip_tags($input['naglowek'] ?? $data['inwestycja']['hero']['naglowek']);
    $data['inwestycja']['hero']['podtytul'] = strip_tags($input['podtytul'] ?? $data['inwestycja']['hero']['podtytul']);
    $data['inwestycja']['hero']['cta']      = strip_tags($input['cta']      ?? $data['inwestycja']['hero']['cta']);
}

// ---- Zakładka Treści ----
if ($tab === 'tresci') {
    $data['inwestycja']['opis']    = strip_tags($input['opis']    ?? $data['inwestycja']['opis']);
    $data['inwestycja']['podtytul'] = strip_tags($input['podtytul'] ?? $data['inwestycja']['podtytul']);
    $data['deweloper']['telefon']  = strip_tags($input['telefon'] ?? $data['deweloper']['telefon']);
    $data['deweloper']['email']    = filter_var($input['email'] ?? $data['deweloper']['email'], FILTER_SANITIZE_EMAIL);
}

// ---- Zakładka Mieszkania ----
if ($tab === 'mieszkania') {
    $lokale = $input['lokale'] ?? [];
    foreach ($lokale as $updated) {
        foreach ($data['lokale'] as &$lokal) {
            if ($lokal['id'] === $updated['id']) {
                $lokal['cena_m2']    = (int)   ($updated['cena_m2']    ?? $lokal['cena_m2']);
                $lokal['cena_total'] = (int)   ($updated['cena_total'] ?? $lokal['cena_total']);
                $lokal['status']     = in_array($updated['status'], ['Dostępny','Rezerwacja','Sprzedany'])
                    ? $updated['status']
                    : $lokal['status'];
                break;
            }
        }
        unset($lokal);
    }
}

// Zapisz data.json
$saved = file_put_contents(
    DATA_FILE,
    json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
);

// Zawsze regeneruj CSV
$csvOk = generateCSV();

echo json_encode([
    'ok'     => $saved !== false,
    'csv_ok' => $csvOk,
    'msg'    => $saved !== false ? 'Zapisano i zaktualizowano cennik CSV.' : 'Błąd zapisu.',
]);
