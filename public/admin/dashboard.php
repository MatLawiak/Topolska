<?php
require_once __DIR__ . '/auth.php';
requireLogin();

$data = json_decode(file_get_contents(DATA_FILE), true) ?? [];
$inv  = $data['inwestycja']  ?? [];
$dev  = $data['deweloper']   ?? [];
$lokale = $data['lokale']    ?? [];

$activeTab = $_GET['tab'] ?? 'baner';
$savedMsg  = $_GET['saved'] ?? '';
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
<body class="dashboard-page">

<!-- Topbar -->
<header class="topbar">
    <span class="topbar-logo">Topolska <em>Residence</em> <small>Admin</small></span>
    <div class="topbar-actions">
        <a href="/" target="_blank" class="btn btn-sm btn-outline">↗ Strona</a>
        <a href="logout.php" class="btn btn-sm btn-danger">Wyloguj</a>
    </div>
</header>

<div class="dashboard-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
        <nav>
            <a href="?tab=baner"     class="sidebar-link <?= $activeTab === 'baner'     ? 'active' : '' ?>">🖼 Baner</a>
            <a href="?tab=tresci"    class="sidebar-link <?= $activeTab === 'tresci'    ? 'active' : '' ?>">✏️ Treści</a>
            <a href="?tab=mieszkania" class="sidebar-link <?= $activeTab === 'mieszkania' ? 'active' : '' ?>">🏠 Mieszkania</a>
        </nav>
        <div class="sidebar-footer">
            <a href="/dane-gov/cennik_latest.csv" class="btn btn-sm btn-outline btn-block" download>
                ⬇ Pobierz CSV
            </a>
        </div>
    </aside>

    <!-- Główna treść -->
    <main class="dashboard-content">
        <?php if ($savedMsg === '1'): ?>
            <div class="alert alert-success" id="save-alert" role="alert">
                ✅ Zapisano pomyślnie. Cennik CSV został zaktualizowany.
            </div>
        <?php endif; ?>

        <!-- ===================== ZAKŁADKA: BANER ===================== -->
        <?php if ($activeTab === 'baner'): ?>
        <div class="card">
            <h2 class="card-title">🖼 Baner hero</h2>

            <!-- Podgląd aktualnego zdjęcia -->
            <div class="hero-preview-wrap">
                <img
                    id="hero-preview"
                    src="<?= htmlspecialchars($inv['zdjecie_hero'] ?? '/images/hero.png') ?>"
                    alt="Aktualne zdjęcie hero"
                    class="hero-preview"
                >
            </div>

            <!-- Upload nowego zdjęcia -->
            <form id="upload-form" class="upload-form">
                <div class="form-group">
                    <label for="hero_image">Zmień zdjęcie banera (JPG, PNG, WebP, max 10 MB)</label>
                    <input type="file" id="hero_image" name="hero_image" accept="image/jpeg,image/png,image/webp">
                </div>
                <button type="submit" class="btn btn-primary">Prześlij nowe zdjęcie</button>
                <span id="upload-msg" class="msg"></span>
            </form>

            <hr class="divider">

            <!-- Teksty banera -->
            <form id="baner-form" class="form-section">
                <h3>Teksty banera</h3>
                <div class="form-group">
                    <label for="naglowek">Nagłówek H1</label>
                    <input type="text" id="naglowek" name="naglowek"
                           value="<?= htmlspecialchars($inv['hero']['naglowek'] ?? '') ?>">
                </div>
                <div class="form-group">
                    <label for="podtytul_hero">Podtytuł</label>
                    <input type="text" id="podtytul_hero" name="podtytul"
                           value="<?= htmlspecialchars($inv['hero']['podtytul'] ?? '') ?>">
                </div>
                <div class="form-group">
                    <label for="cta">Tekst przycisku CTA</label>
                    <input type="text" id="cta" name="cta"
                           value="<?= htmlspecialchars($inv['hero']['cta'] ?? '') ?>">
                </div>
                <button type="submit" class="btn btn-primary">Zapisz baner</button>
                <span id="baner-msg" class="msg"></span>
            </form>
        </div>

        <!-- ===================== ZAKŁADKA: TREŚCI ===================== -->
        <?php elseif ($activeTab === 'tresci'): ?>
        <div class="card">
            <h2 class="card-title">✏️ Treści strony</h2>
            <form id="tresci-form" class="form-section">
                <div class="form-group">
                    <label for="opis">Opis inwestycji</label>
                    <textarea id="opis" name="opis" rows="6"><?= htmlspecialchars($inv['opis'] ?? '') ?></textarea>
                </div>
                <div class="form-group">
                    <label for="podtytul_inv">Podtytuł strony</label>
                    <input type="text" id="podtytul_inv" name="podtytul"
                           value="<?= htmlspecialchars($inv['podtytul'] ?? '') ?>">
                </div>
                <hr class="divider">
                <h3>Dane kontaktowe</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label for="telefon">Telefon</label>
                        <input type="tel" id="telefon" name="telefon"
                               value="<?= htmlspecialchars($dev['telefon'] ?? '') ?>"
                               placeholder="+48 500 000 000">
                    </div>
                    <div class="form-group">
                        <label for="email_dev">E-mail</label>
                        <input type="email" id="email_dev" name="email"
                               value="<?= htmlspecialchars($dev['email'] ?? '') ?>"
                               placeholder="kontakt@topolska-residence.pl">
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Zapisz treści</button>
                <span id="tresci-msg" class="msg"></span>
            </form>
        </div>

        <!-- ===================== ZAKŁADKA: MIESZKANIA ===================== -->
        <?php elseif ($activeTab === 'mieszkania'): ?>
        <div class="card">
            <h2 class="card-title">🏠 Lokale i cennik</h2>
            <p class="card-desc">
                Zmień cenę lub status lokalu, a następnie kliknij <strong>Zapisz i aktualizuj cennik</strong>.
                Plik CSV dla dane.gov.pl zostanie automatycznie wygenerowany.
            </p>

            <form id="mieszkania-form">
                <div class="table-wrap">
                    <table class="lokale-table">
                        <thead>
                            <tr>
                                <th>Nr</th>
                                <th>Piętro</th>
                                <th>Metraż</th>
                                <th>Pokoje</th>
                                <th>Udogodnienia</th>
                                <th>Cena/m² (zł)</th>
                                <th>Cena całk. (zł)</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        <?php foreach ($lokale as $lokal): ?>
                            <tr data-id="<?= htmlspecialchars($lokal['id']) ?>">
                                <td><strong>Lokal <?= htmlspecialchars($lokal['nr']) ?></strong></td>
                                <td><?= htmlspecialchars($lokal['pietro']) ?></td>
                                <td><?= htmlspecialchars($lokal['metraz']) ?> m²</td>
                                <td><?= htmlspecialchars($lokal['pokoje']) ?></td>
                                <td>
                                    <?php if ($lokal['garaz']): ?>
                                        <span class="tag">Garaż</span>
                                    <?php endif; ?>
                                    <?php if ($lokal['taras_dachowy']): ?>
                                        <span class="tag tag-gold">Dach tarasowy ★</span>
                                    <?php endif; ?>
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="cena_m2"
                                        class="input-sm"
                                        value="<?= (int)$lokal['cena_m2'] ?>"
                                        min="1000"
                                        max="30000"
                                        step="50"
                                    >
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="cena_total"
                                        class="input-sm"
                                        value="<?= (int)$lokal['cena_total'] ?>"
                                        min="100000"
                                        max="5000000"
                                        step="1000"
                                    >
                                </td>
                                <td>
                                    <select name="status" class="select-sm">
                                        <?php foreach (['Dostępny','Rezerwacja','Sprzedany'] as $s): ?>
                                            <option value="<?= $s ?>" <?= $lokal['status'] === $s ? 'selected' : '' ?>>
                                                <?= $s ?>
                                            </option>
                                        <?php endforeach; ?>
                                    </select>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary btn-lg">
                        💾 Zapisz i aktualizuj cennik
                    </button>
                    <span id="mieszkania-msg" class="msg"></span>
                </div>
            </form>
        </div>
        <?php endif; ?>
    </main>
</div>

<script>
// ---- Upload hero ----
document.getElementById('upload-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const fileInput = form.querySelector('#hero_image');
    if (!fileInput.files.length) return;
    const fd = new FormData();
    fd.append('hero_image', fileInput.files[0]);
    const msg = document.getElementById('upload-msg');
    msg.textContent = 'Przesyłam...';
    try {
        const r = await fetch('upload.php', { method: 'POST', body: fd });
        const d = await r.json();
        msg.textContent = d.msg ?? (d.ok ? 'OK' : 'Błąd');
        msg.className = 'msg ' + (d.ok ? 'msg-ok' : 'msg-err');
        if (d.ok && d.url) {
            document.getElementById('hero-preview').src = d.url + '?t=' + Date.now();
        }
    } catch (err) {
        msg.textContent = 'Błąd połączenia';
        msg.className = 'msg msg-err';
    }
});

// ---- Zapisz baner ----
document.getElementById('baner-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = { tab: 'baner', ...Object.fromEntries(fd) };
    await saveData(payload, 'baner-msg');
});

// ---- Zapisz treści ----
document.getElementById('tresci-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = { tab: 'tresci', ...Object.fromEntries(fd) };
    await saveData(payload, 'tresci-msg');
});

// ---- Zapisz mieszkania ----
document.getElementById('mieszkania-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const rows = document.querySelectorAll('.lokale-table tbody tr');
    const lokale = Array.from(rows).map(row => ({
        id:         row.dataset.id,
        cena_m2:    parseInt(row.querySelector('[name="cena_m2"]').value),
        cena_total: parseInt(row.querySelector('[name="cena_total"]').value),
        status:     row.querySelector('[name="status"]').value,
    }));
    await saveData({ tab: 'mieszkania', lokale }, 'mieszkania-msg');
});

async function saveData(payload, msgId) {
    const msg = document.getElementById(msgId);
    if (msg) { msg.textContent = 'Zapisuję...'; msg.className = 'msg'; }
    try {
        const r = await fetch('save.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const d = await r.json();
        if (msg) {
            msg.textContent = d.msg ?? (d.ok ? 'Zapisano!' : 'Błąd zapisu');
            msg.className   = 'msg ' + (d.ok ? 'msg-ok' : 'msg-err');
        }
    } catch (err) {
        if (msg) { msg.textContent = 'Błąd połączenia'; msg.className = 'msg msg-err'; }
    }
}

// Auto-hide save alert
const alert = document.getElementById('save-alert');
if (alert) setTimeout(() => alert.style.opacity = '0', 4000);
</script>
</body>
</html>
