<?php
require_once __DIR__ . '/config.php';

function generateCSV(): bool {
    if (!file_exists(DATA_FILE)) {
        return false;
    }

    $data = json_decode(file_get_contents(DATA_FILE), true);
    if (!$data) return false;

    $dev   = $data['deweloper']  ?? [];
    $inv   = $data['inwestycja'] ?? [];
    $lokale = $data['lokale']    ?? [];

    $today = date('Y-m-d');

    // UTF-8 BOM
    $csv  = "\xEF\xBB\xBF";

    // Nagłówki zgodnie ze schematem ministerialnym
    $headers = [
        'Nazwa dewelopera',
        'Forma prawna',
        'KRS',
        'NIP',
        'REGON',
        'Telefon',
        'E-mail',
        'Adres siedziby',
        'Adres biura sprzedaży',
        'Lokalizacja inwestycji',
        'Ulica',
        'Kod pocztowy',
        'Miasto',
        'Województwo',
        'Rodzaj nieruchomości',
        'Nr lokalu',
        'Powierzchnia użytkowa (m²)',
        'Liczba pokoi',
        'Piętro',
        'Cena za m² (zł)',
        'Data ceny za m²',
        'Cena całkowita (zł)',
        'Data ceny całkowitej',
        'Garaż',
        'Taras dachowy',
        'Status',
    ];

    $csv .= implode(';', $headers) . "\r\n";

    foreach ($lokale as $lokal) {
        $row = [
            $dev['nazwa']          ?? '',
            $dev['forma_prawna']   ?? '',
            $dev['krs']            ?? '',
            $dev['nip']            ?? '',
            $dev['regon']          ?? '',
            $dev['telefon']        ?? '',
            $dev['email']          ?? '',
            $dev['adres_siedziby'] ?? '',
            $dev['biuro_sprzedazy'] ?? '',
            ($inv['lokalizacja']['ulica'] ?? '') . ', ' . ($inv['lokalizacja']['miasto'] ?? ''),
            $inv['lokalizacja']['ulica'] ?? '',
            $inv['lokalizacja']['kod']   ?? '',
            $inv['lokalizacja']['miasto'] ?? '',
            $inv['lokalizacja']['wojewodztwo'] ?? '',
            'lokal mieszkalny',
            $lokal['nr'],
            $lokal['metraz'],
            $lokal['pokoje'],
            $lokal['pietro'],
            $lokal['cena_m2'],
            $today,
            $lokal['cena_total'],
            $today,
            $lokal['garaz'] ? 'tak' : 'nie',
            $lokal['taras_dachowy'] ? 'tak' : 'nie',
            $lokal['status'],
        ];

        // Escapuj pola z przecinkami/średnikami
        $row = array_map(function ($v) {
            $v = str_replace('"', '""', (string)$v);
            if (str_contains($v, ';') || str_contains($v, '"') || str_contains($v, "\n")) {
                $v = '"' . $v . '"';
            }
            return $v;
        }, $row);

        $csv .= implode(';', $row) . "\r\n";
    }

    if (!is_dir(CSV_DIR)) {
        mkdir(CSV_DIR, 0755, true);
    }

    $dateFile = CSV_DIR . 'cennik_' . $today . '.csv';
    $latestFile = CSV_DIR . 'cennik_latest.csv';

    file_put_contents($dateFile,   $csv);
    file_put_contents($latestFile, $csv);

    return true;
}
