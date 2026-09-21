/* WSTG Bilingual — 4.5 Authorization (5 tests)
   Condensed bilingual adaptation, CC BY-SA 4.0. Registers: t=Teknis, b=Baku, s=Sederhana. */
window.WSTG_DATA = window.WSTG_DATA || [];
window.WSTG_DATA.push({
  order: 5, code: 'ATHZ',
  name_en: 'Authorization',
  desc_en: 'IDOR, privilege escalation, traversal & OAuth',
  name_id: { t: 'Otorisasi', b: 'Otorisasi', s: 'Hak Akses' },
  desc_id: { t: 'IDOR, privilege escalation, traversal & OAuth', b: 'IDOR, kenaikan hak, penelusuran jalur & OAuth', s: 'Siapa boleh melakukan apa' },
  tests: [

    {
      name_en: 'Test Directory Traversal/File Include',
      name_id: { t: 'Uji Directory Traversal / File Include', b: 'Uji Penelusuran Direktori / Pemuatan Berkas', s: 'Cek Lolos dari Folder' },
      summary: {
        en: 'Traversal (`../`) escapes the intended directory to read system files like /etc/passwd; file include bugs let you load code from unexpected places. Both turn a file parameter into a system key.',
        t: 'Traversal (`../`) kabur dari direktori yang dimaksud untuk membaca file sistem seperti /etc/passwd; bug file include memuat kode dari tempat tak terduga. Keduanya mengubah parameter file menjadi kunci sistem.',
        b: 'Penelusuran jalur (`../`) memungkinkan perpindahan keluar dari direktori yang dijatah, sehingga berkas sistem seperti /etc/passwd dapat dibaca; cacat pada pemuatan berkas menyisipkan kode dari sumber yang tidak diduga. Keduanya mengubah parameter berkas menjadi kunci masuk ke sistem.',
        s: 'Trik `../` di parameter file bisa lari dari foldernya dan membaca file sistem. Ini cara klasik mencuri password server.'
      },
      howto: {
        en: [
          'Find parameters that reference files: `?file=`, `?page=`, `?path=`, `?template=`.',
          'Try escaping the directory: `?file=../../../../etc/passwd` — observe responses.',
          'Use encoded variants: `%2e%2e%2f`, `..%5c`, double-encoding, and null bytes if legacy stacks.',
          'For include bugs (PHP): try `php://filter/convert.base64-encode/resource=index.php` to read source.',
          'Test absolute paths and UNC paths on Windows targets (`\\host\\share\\file`).'
        ],
        t: [
          'Cari parameter yang merujuk file: `?file=`, `?page=`, `?path=`, `?template=`.',
          'Coba kabur dari direktori: `?file=../../../../etc/passwd` — amati responsnya.',
          'Gunakan varian ter-encode: `%2e%2e%2f`, `..%5c`, double-encoding, dan null byte pada stack lama.',
          'Untuk bug include (PHP): coba `php://filter/convert.base64-encode/resource=index.php` untuk membaca source.',
          'Uji path absolut dan UNC pada target Windows (`\\\\host\\\\share\\\\file`).'
        ],
        b: [
          'Cari parameter yang merujuk berkas: `?file=`, `?page=`, `?path=`, `?template=`.',
          'Coba kabur dari direktori: `?file=../../../../etc/passwd` — amati responsnya.',
          'Gunakan varian terenkode: `%2e%2e%2f`, `..%5c`, peneduahan ganda, dan bita-nol pada tumpukan lama.',
          'Untuk bug pemuatan (PHP): coba `php://filter/convert.base64-encode/resource=index.php` untuk membaca sumber.',
          'Uji jalur mutlak dan UNC pada sasaran Windows (`\\\\host\\\\share\\\\file`).'
        ],
        s: [
          'Cari parameter yang namanya mengarah ke file: `?page=about`, `?file=download`.',
          'Sisipkan `../../../../etc/passwd` — kalau isinya muncul, berhasil.',
          'Kalau diblokir, coba versi ter-enkode: `%2e%2e%2f`.',
          'Di PHP, trik `php://filter` bisa menampilkan isi kode sumber.',
          'Di Windows, path UNC (`\\\\host\\share`) juga layak dicoba.'
        ]
      },
      tools: ['Burp Suite', 'curl', 'ffuf (fuzzing payloads)'],
      remediation: {
        en: 'Map user-supplied paths against a strict allowlist of files, never pass raw input to filesystem APIs, run the app with minimal filesystem privileges, and canonicalize paths before checking.',
        t: 'Cocokkan path dari user terhadap allowlist file yang ketat, jangan pernah meneruskan input mentah ke API filesystem, jalankan aplikasi dengan privilege filesystem minimal, dan kanonikalkan path sebelum memeriksa.',
        b: 'Cocokkan jalur dari pengguna terhadap daftar-izinkan berkas yang ketat, jangan meneruskan masukan mentah ke API sistem-berkas, jalankan aplikasi dengan hak minimum, dan kanonikalkan jalur sebelum memeriksa.',
        s: 'Cuma izinkan file yang sudah terdaftar. Jangan terima nama file mentah dari user. Periksa jalur finalnya sebelum dibuka.'
      }
    },

    {
      name_en: 'Test for Bypassing Authorization Schema',
      name_id: { t: 'Uji Bypass Skema Otorisasi', b: 'Uji Pintasan Skema Otorisasi', s: 'Cari Cara Lewat Izin' },
      summary: {
        en: 'The server knows your role but forgets to check it on some endpoint. Swap IDs, replay admin requests as a normal user, and find the routes where authorization was never implemented.',
        t: 'Server tahu peran Anda tetapi lupa memeriksanya di beberapa endpoint. Tukar ID, putar ulang request admin sebagai user biasa, dan temukan route tempat otorisasi tidak pernah diimplementasikan.',
        b: 'Peladen tahu peran Anda namun lupa memeriksanya pada sebagian endpoint. Tukar ID, putar ulang permintaan admin sebagai pengguna biasa, dan temukan rute tempat otorisasi tak pernah diterapkan.',
        s: 'Server kadang lupa memeriksa siapa kita di halaman tertentu. Jadi user biasa, lalu coba request admin.'
      },
      howto: {
        en: [
          'Capture an admin request (from an admin account if available, or from documentation); replay it as a normal user.',
          'Test hidden parameters: add `admin=true`, `role=admin`, `debug=1` to requests.',
          'Walk every endpoint as each role — build a permission matrix and hunt for overlaps.',
          'Test ID swaps at URL level: `/api/users/123/orders` as user 124.',
          'Check if authorization is enforced only in the UI: request the API endpoint directly without the app shell.'
        ],
        t: [
          'Tangkap request admin (dari akun admin bila tersedia, atau dari dokumentasi); putar ulang sebagai user biasa.',
          'Uji parameter tersembunyi: tambahkan `admin=true`, `role=admin`, `debug=1` pada request.',
          'Jalani setiap endpoint sebagai tiap peran — bangun matriks permission dan cari tumpang tindih.',
          'Uji penukaran ID di level URL: `/api/users/123/orders` sebagai user 124.',
          'Cek apakah otorisasi hanya ditegakkan di UI: minta endpoint API langsung tanpa shell aplikasi.'
        ],
        b: [
          'Tangkap permintaan admin (dari akun admin bila tersedia, atau dari dokumentasi); putar ulang sebagai pengguna biasa.',
          'Uji parameter tersembunyi: tambahkan `admin=true`, `role=admin`, `debug=1` pada permintaan.',
          'Jalani setiap endpoint sebagai tiap peran — bangun matriks kewenangan dan cari tumpang tindih.',
          'Uji penukaran ID di tingkat URL: `/api/users/123/orders` sebagai pengguna 124.',
          'Periksa apakah otorisasi hanya ditegakkan di antarmuka: minta endpoint API langsung tanpa kerangka aplikasi.'
        ],
        s: [
          'Kalau ada akun admin, rekam requestnya. Lalu kirim request itu sebagai user biasa.',
          'Tambahkan `role=admin` di request — kadang server memercayainya.',
          'Coba semua fitur dengan dua jenis akun — buat daftar siapa boleh apa, cari yang janggal.',
          'Ganti angka ID di alamat — akun 123 coba buka data akun 124.',
          'Pagar yang cuma ada di menu, bukan di server — itu bypass.'
        ]
      },
      tools: ['Burp Suite', 'two test accounts (user + admin if possible)'],
      remediation: {
        en: 'Enforce authorization server-side on every request, centralize the check in middleware so no route ships without it, and test coverage in CI.',
        t: 'Tegakkan otorisasi server-side di setiap request, pusatkan pemeriksaan di middleware agar tidak ada route yang lolos, dan uji cakupannya di CI.',
        b: 'Tegakkan otorisasi sisi-peladen pada setiap permintaan, pusatkan pemeriksaan di middleware agar tak ada rute yang lolos, dan uji cakupannya di CI.',
        s: 'Semua permintaan diperiksa di server. Satu middleware untuk semua rute — jangan sampai ada yang lupa. Uji otomatis setiap rilis.'
      }
    },

    {
      name_en: 'Test for Privilege Escalation',
      name_id: { t: 'Uji Privilege Escalation', b: 'Uji Kenaikan Hak', s: 'Cek Naik Jabatan Paksa' },
      summary: {
        en: 'Privilege escalation means becoming more powerful than your account should allow — horizontally (another user\'s powers) or vertically (admin powers). Look for role-editing endpoints, mass assignment on profile updates, and unguarded admin functions.',
        t: 'Privilege escalation berarti menjadi lebih kuat dari yang seharusnya diizinkan akun Anda — horizontal (kekuatan user lain) atau vertikal (kekuatan admin). Cari endpoint pengeditan peran, mass assignment pada pembaruan profil, dan fungsi admin tanpa penjaga.',
        b: 'Kenaikan hak berarti memperoleh kekuatan melebihi yang seharusnya dimiliki sebuah akun — baik horizontal (kekuatan pengguna lain) maupun vertikal (kekuatan admin). Buru endpoint pengubahan peran, penyerapan massal saat pembaruan profil, dan fungsi admin yang tanpa penjaga.',
        s: 'Naik jabatan paksa: user biasa jadi admin, atau jadi user lain. Cari titik di mana peran bisa diubah.'
      },
      howto: {
        en: [
          'Profile update endpoints: submit `role`, `isAdmin`, `permissions` fields — watch for mass assignment.',
          'Registration: re-submit with role fields added after registering normally.',
          'API endpoints that update users: try modifying another user\'s role, not just your own fields.',
          'Look for role/permission parameters in API docs, JS bundles, and mobile app traffic.',
          'Test both directions: horizontal (access user B\'s data as A) and vertical (access admin functions as A).'
        ],
        t: [
          'Endpoint pembaruan profil: kirim field `role`, `isAdmin`, `permissions` — perhatikan mass assignment.',
          'Registrasi: kirim ulang dengan field peran ditambahkan setelah registrasi normal.',
          'Endpoint API yang memperbarui user: coba ubah peran user lain, bukan hanya field milik sendiri.',
          'Cari parameter role/permission di dokumentasi API, bundel JS, dan trafik aplikasi mobile.',
          'Uji dua arah: horizontal (akses data user B sebagai A) dan vertikal (akses fungsi admin sebagai A).'
        ],
        b: [
          'Endpoint pembaruan profil: kirim bidang `role`, `isAdmin`, `permissions` — perhatikan penyerapan massal.',
          'Pendaftaran: kirim ulang dengan bidang peran ditambahkan setelah mendaftar normal.',
          'Endpoint API yang memperbarui pengguna: coba ubah peran pengguna lain, bukan hanya bidang milik sendiri.',
          'Cari parameter peran/kewenangan dalam dokumentasi API, bundel JS, dan trafik aplikasi seluler.',
          'Uji dua arah: horizontal (akses data pengguna B sebagai A) dan vertikal (akses fungsi admin sebagai A).'
        ],
        s: [
          'Di halaman ubah profil, sisipkan field `role` atau `isAdmin` — kadang diterima diam-diam.',
          'Saat daftar akun, coba kirim ulang dengan tambahan `role=admin`.',
          'Kalau ada API ubah user, coba ubah peran orang lain.',
          'Baca file JS dan dokumentasi API — nama parameter rahasia sering tertinggal.',
          'Uji dua arah: jadi orang lain (horizontal) dan jadi admin (vertikal).'
        ]
      },
      tools: ['Burp Suite', 'API documentation', 'two accounts'],
      remediation: {
        en: 'Whitelist fields per endpoint (DTOs), derive roles only from the server-side session, and centralize role checks so elevation requires an actual admin action.',
        t: 'Whitelist field per endpoint (DTO), turunkan peran hanya dari sesi server-side, dan pusatkan pemeriksaan peran agar kenaikan membutuhkan aksi admin sungguhan.',
        b: 'Daftar-putihkan bidang per endpoint (DTO), turunkan peran hanya dari sesi sisi-peladen, dan pusatkan pemeriksaan peran agar kenaikan menuntut aksi admin sungguhan.',
        s: 'Batasi field yang boleh diubah per halaman. Peran hanya boleh dibaca dari sesi server. Perubahan peran = aksi admin resmi.'
      }
    },

    {
      name_en: 'Test for Insecure Direct Object References',
      name_id: { t: 'Uji Insecure Direct Object References (IDOR)', b: 'Uji Referensi Objek Langsung Tak Aman (IDOR)', s: 'Uji IDOR — Curigai Angkanya' },
      summary: {
        en: 'IDOR is the highest-yield bug class: the app uses user-supplied IDs (document 337, invoice 88) without checking ownership. Change the number, read someone else\'s data. Found everywhere, trivially exploitable.',
        t: 'IDOR adalah bug dengan hasil terbanyak: aplikasi memakai ID dari user (dokumen 337, invoice 88) tanpa memeriksa kepemilikan. Ubah angkanya, baca data orang lain. Ada di mana-mana, mudah dieksploitasi.',
        b: 'IDOR termasuk cacat yang paling banyak menuai hasil: aplikasi memakai ID dari pengguna (dokumen 337, tagihan 88) tanpa mengecek kepemilikannya. Ubah angkanya, dan data orang lain terbaca. Ada di mana-mana serta mudah dieksploitasi.',
        s: 'IDOR itu bug paling sering ketemu: ganti angka ID di alamat, data orang lain bisa kebaca. Kunci aksesnya cuma angka.'
      },
      howto: {
        en: [
          'Create two accounts (A and B) with distinct data. As A, walk every function and log every object ID in URLs, parameters, and bodies.',
          'Take each ID and — still as A — replace it with B\'s object IDs. Document every 200/leak.',
          'Test ID formats: sequential integers, UUIDs, encoded base64, and hash-based IDs (still enumerable if short).',
          'Test all methods: viewing B\'s object is IDOR; but also try DELETE, PUT, POST on B\'s objects.',
          'Hunt beyond the UI: mobile APIs, internal endpoints, export/report functions often lack ownership checks entirely.'
        ],
        t: [
          'Buat dua akun (A dan B) dengan data berbeda. Sebagai A, jalani setiap fungsi dan catat setiap ID objek di URL, parameter, dan body.',
          'Ambil setiap ID dan — tetap sebagai A — ganti dengan ID objek milik B. Dokumentasikan setiap 200/kebocoran.',
          'Uji format ID: integer sekuensial, UUID, base64 ter-encode, dan ID berbasis hash (tetap bisa dienumerasi jika pendek).',
          'Uji semua method: melihat objek B adalah IDOR; tapi coba juga DELETE, PUT, POST pada objek B.',
          'Berburu di luar UI: API mobile, endpoint internal, fungsi ekspor/laporan sering sama sekali tanpa pemeriksaan kepemilikan.'
        ],
        b: [
          'Buat dua akun (A dan B) dengan data berbeda. Sebagai A, jalani setiap fungsi dan catat setiap ID objek dalam URL, parameter, dan isi.',
          'Ambil setiap ID dan — tetap sebagai A — ganti dengan ID objek milik B. Dokumentasikan setiap 200/kebocoran.',
          'Uji format ID: bilangan berurutan, UUID, base64 tersandi, dan ID berbasis hash (tetap dapat dicacah bila pendek).',
          'Uji semua metode: melihat objek B adalah IDOR; namun coba juga DELETE, PUT, POST pada objek B.',
          'Berburu di luar antarmuka: API seluler, endpoint internal, fungsi ekspor/laporan sering sama sekali tanpa pemeriksaan kepemilikan.'
        ],
        s: [
          'Buat dua akun dengan data berbeda. Pakai akun A, catat semua angka ID yang muncul di alamat dan permintaan.',
          'Ganti ID milik A dengan ID milik B — kalau isinya kebaca, itu IDOR.',
          'Coba juga bentuk lain: angka urut, UUID, base64 — semua layak diuji.',
          'Jangan cuma baca — coba ubah dan hapus objek milik B.',
          'API mobile dan fungsi ekspor sering lupa pemeriksaan — sasar di sana.'
        ]
      },
      tools: ['Burp Suite', 'two accounts', 'ffuf (ID enumeration)'],
      remediation: {
        en: 'Verify ownership on every object access server-side, prefer non-guessable identifiers, and log + alert on cross-account access attempts.',
        t: 'Verifikasi kepemilikan di setiap akses objek server-side, utamakan identifier yang tidak mudah ditebak, dan log + alert atas percobaan akses lintas-akun.',
        b: 'Verifikasi kepemilikan pada setiap akses objek di sisi-peladen, utamakan pengenal yang tak mudah ditebak, serta catat dan beri tanda atas percobaan akses lintas-akun.',
        s: 'Setiap akses data harus dicek pemiliknya di server. Pakai ID yang sulit ditebak. Catat dan beri tanda kalau ada yang coba akali.'
      }
    },

    {
      name_en: 'Test for OAuth Weaknesses',
      name_id: { t: 'Uji Kelemahan OAuth', b: 'Udi Kelemahan OAuth', s: 'Uji Login dengan OAuth' },
      summary: {
        en: 'OAuth grants access across sites ("Login with Google"). Weaknesses live in redirect_uri validation, state parameters, token storage, and the implicit flow — leading to account takeover via authorization-code theft.',
        t: 'OAuth memberi akses lintas situs ("Login dengan Google"). Kelemahan berada di validasi redirect_uri, parameter state, penyimpanan token, dan implicit flow — berujung pengambilalihan akun via pencurian authorization code.',
        b: 'OAuth memberi akses lintas situs ("Login dengan Google"). Kelemahan berada pada validasi redirect_uri, parameter state, penyimpanan token, dan alur implisit — berujung pengambilalihan akun lewat pencurian kode otorisasi.',
        s: '"Login dengan Google" itu OAuth. Celahnya: alihan halaman yang tidak ketat, token yang bocor, dan kode yang bisa dicuri.'
      },
      howto: {
        en: [
          'Map the flow: which grant types, where redirect_uri is validated (exact match or sloppy prefix?).',
          'Tamper redirect_uri: point it at a domain you control, or exploit open redirects on the allowed domain to leak the code.',
          'Check state parameter presence — missing state enables CSRF on the whole OAuth flow.',
          'Test token storage: where do access tokens land — URL fragments, localStorage, logs?',
          'Test code reuse: redeem an authorization code twice; check token expiry and scope inflation.'
        ],
        t: [
          'Petakan alurnya: grant type apa, di mana redirect_uri divalidasi (exact match atau prefix longgar?).',
          'Ubah redirect_uri: arahkan ke domain milik Anda, atau manfaatkan open redirect di domain yang diizinkan untuk membocorkan kode.',
          'Cek keberadaan parameter state — state yang absen memungkinkan CSRF pada seluruh alur OAuth.',
          'Uji penyimpanan token: di mana access token mendarat — fragment URL, localStorage, log?',
          'Uji pemakaian ulang kode: tukarkan authorization code dua kali; cek kedaluwarsa token dan inflasi scope.'
        ],
        b: [
          'Petakan alurnya: jenis pemberian apa, di mana redirect_uri divalidasi (kecocokan tepat atau awalan longgar?).',
          'Ubah redirect_uri: arahkan ke domain milik Anda, atau manfaatkan pengalihan-terbuka pada domain yang diizinkan untuk membocorkan kode.',
          'Periksa keberadaan parameter state — state yang absen memungkinkan CSRF pada seluruh alur OAuth.',
          'Uji penyimpanan token: di mana token akses mendarat — fragmen URL, localStorage, log?',
          'Uji pemakaian ulang kode: tukarkan kode otorisasi dua kali; periksa kedaluwarsa token dan penggelembungan lingkup.'
        ],
        s: [
          'Pahami dulu alurnya: jenisnya apa, halaman alihannya diperiksa ketat tidak.',
          'Ubah alamat alihan ke milik kita — kalau kode verifikasi dikirim ke sana, itu celah.',
          'Parameter `state` harus ada — tanpa itu, alur bisa dipalsukan.',
          'Lihat di mana token disimpan — URL, localStorage, atau log semuanya berbahaya.',
          'Coba pakai kode dua kali — harus ditolak.'
        ]
      },
      tools: ['Burp Suite', 'own OAuth test app', 'evil redirect server (localhost)'],
      remediation: {
        en: 'Enforce exact-match redirect_uri, require and validate state, use authorization-code + PKCE, store tokens server-side, and bind codes to one redemption.',
        t: 'Tegakkan exact-match redirect_uri, wajibkan dan validasi state, gunakan authorization-code + PKCE, simpan token di server-side, dan ikat kode ke satu penebusan.',
        b: 'Tegakkan kecocokan-tepat redirect_uri, wajibkan dan validasi state, gunakan kode-otorisasi + PKCE, simpan token sisi-peladen, dan kaitkan kode pada satu penebusan.',
        s: 'Alamat alihan harus cocok persis. Wajib ada parameter state. Gunakan PKCE. Token disimpan di server. Kode sekali tukar saja.'
      }
    }
  ]
});
