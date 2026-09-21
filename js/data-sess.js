/* WSTG Bilingual — 4.8 Session Management (11 tests)
   Condensed bilingual adaptation, CC BY-SA 4.0. Registers: t=Teknis, b=Baku, s=Sederhana. */
window.WSTG_DATA = window.WSTG_DATA || [];
window.WSTG_DATA.push({
  order: 6, code: 'SESS',
  name_en: 'Session Management',
  desc_en: 'Cookies, fixation, CSRF, hijacking & JWT',
  name_id: { t: 'Pengelolaan Sesi (Session Management)', b: 'Pengelolaan Sesi', s: 'Mengelola Sesi Login' },
  desc_id: { t: 'Cookie, session fixation, CSRF, session hijacking & JWT', b: 'Kuki, pengikatan sesi, CSRF, pembajakan sesi & JWT', s: 'Semua soal "karcis" setelah login: cookie, CSRF, pembajakan, dan JWT' },
  tests: [

    {
      name_en: 'Testing for Session Management Schema',
      name_id: { t: 'Pengujian Session Management Schema', b: 'Pengujian Skema Pengelolaan Sesi', s: 'Uji Cara Situs Mengelola Sesi' },
      summary: {
        en: 'Understand how the application issues, tracks, and retires sessions: token structure, generation logic, and lifecycle. Every later session test builds on this map.',
        t: 'Pahami bagaimana aplikasi menerbitkan, melacak, dan memensiunkan sesi: struktur token, logika pembuatan, dan lifecycle-nya. Semua pengujian sesi selanjutnya dibangun di atas peta ini.',
        b: 'Pahami bagaimana aplikasi menerbitkan, melacak, dan mengakhiri sesi: struktur token, logika pembuatan, dan daur hidupnya. Seluruh pengujian sesi berikutnya dibangun di atas peta ini.',
        s: 'Sebelum nyerang sesinya, kenali dulu bentuknya: session token-nya kayak apa, gimana dibuat, dan kapan hangus. Ini peta buat semua tes selanjutnya.'
      },
      howto: {
        en: [
          'Log in twice with separate browsers and compare the session cookies — check name, length, and structure.',
          'Decode the token: is it a random opaque ID, a predictable sequence, or a base64-encoded JSON/JWT blob?',
          'Observe when tokens are reissued — on login, on privilege change, or never.',
          'Test whether the old token still works after logout and re-login: `curl -H "Cookie: old=..." https://target.com/profile`.',
          'Note every response that sets a cookie (`Set-Cookie`) and map which actions rotate it.'
        ],
        t: [
          'Login dua kali dari browser terpisah dan bandingkan session cookie — cek nama, panjang, dan strukturnya.',
          'Decode token-nya: apakah random opaque ID, sekuens yang bisa diprediksi, atau blob base64 berisi JSON/JWT?',
          'Amati kapan token diterbitkan ulang — saat login, saat perubahan privilege, atau tidak pernah.',
          'Uji apakah token lama masih berlaku setelah logout dan login ulang: `curl -H "Cookie: old=..." https://target.com/profile`.',
          'Catat setiap response yang menetapkan cookie (`Set-Cookie`) dan petakan aksi mana yang merotasinya.'
        ],
        b: [
          'Masuk dua kali dari peramban terpisah dan bandingkan kuki sesi — periksa nama, panjang, dan strukturnya.',
          'Uraikan tokennya: apakah ID buram acak, barisan yang dapat diprediksi, atau gumpalan base64 berisi JSON/JWT?',
          'Amati kapan token diterbitkan ulang — saat masuk, saat perubahan hak akses, atau tidak pernah.',
          'Uji apakah token lama masih berlaku setelah keluar dan masuk kembali: `curl -H "Cookie: old=..." https://target.com/profile`.',
          'Catat setiap respons yang menetapkan kuki (`Set-Cookie`) dan petakan tindakan mana yang menggantinya.'
        ],
        s: [
          'Login dua kali pakai dua browser (atau normal + incognito) — bandingkan cookie sesinya. Namanya apa? Panjangnya berapa?',
          'Coba decode tokennya: kalau isinya angka berurutan (123, lalu 124), itu bahaya. Kalau acak panjang, bagus.',
          'Perhatikan kapan cookie-nya berubah — pas login? Pas jadi admin? Atau nggak pernah berubah sama sekali?',
          'Logout, login lagi, lalu coba pakai cookie lama dengan `curl -H "Cookie: old=..." https://target.com/profile` — kalau masih bisa akses, itu celah.',
          'Catat semua response yang ngasih cookie baru — itu "denyut jantung" sesinya.'
        ]
      },
      tools: ['Burp Suite', 'browser dev tools', 'curl', 'base64'],
      remediation: {
        en: 'Issue long (128+ bit) cryptographically random session IDs via a battle-tested framework, rotate them at every privilege change, and invalidate old tokens server-side.',
        t: 'Terbitkan session ID yang panjang (128+ bit), cryptographically random, melalui framework yang teruji, rotasi pada setiap perubahan privilege, dan invalidasikan token lama di sisi server.',
        b: 'Terbitkan ID sesi yang panjang (128+ bit), dihasilkan secara kriptografis acak, melalui kerangka kerja yang teruji, ganti pada setiap perubahan hak akses, dan batalkan token lama di sisi peladen.',
        s: 'Buat session ID panjang dan acak (jangan bikin sendiri algoritmanya — pakai bawaan framework), ganti tiap kali hak akses berubah, dan pastikan yang lama langsung mati di server.'
      }
    },

    {
      name_en: 'Testing for Cookies Attributes',
      name_id: { t: 'Pengujian Cookie Attributes', b: 'Pengujian Atribut Kuki', s: 'Periksa Atribut Cookie-nya' },
      summary: {
        en: 'Session cookies missing Secure, HttpOnly, and SameSite flags are trivially stealable — over plain HTTP, via XSS, or cross-site. Inspect every Set-Cookie header before anything else.',
        t: 'Session cookie tanpa flag Secure, HttpOnly, dan SameSite sangat mudah dicuri — lewat HTTP polos, via XSS, atau lintas situs. Periksa setiap header Set-Cookie sebelum yang lain.',
        b: 'Kuki sesi tanpa penanda Secure, HttpOnly, dan SameSite sangat mudah dicuri — melalui HTTP polos, lewat XSS, atau lintas situs. Periksa setiap tajuk Set-Cookie terlebih dahulu.',
        s: 'Cookie itu kunci rumah kita — kalau nggak dikasih pengaman (Secure, HttpOnly, SameSite), gampang banget dicuri. Cek dulu sebelum tes lain.'
      },
      howto: {
        en: [
          'Capture the login response and read the full `Set-Cookie` header: `curl -si -d "user=a&pass=b" https://target.com/login | grep -i set-cookie`.',
          'Check for `Secure` — the cookie must not travel over plain HTTP.',
          'Check for `HttpOnly` — JavaScript must not read the cookie (blocks XSS theft).',
          'Check for `SameSite=Strict` or `Lax` — blocks the cookie being sent on cross-site requests (CSRF surface).',
          'Verify scope flags: `Domain` too broad (root domain shared with siblings) or missing `Path` restrictions widen exposure.'
        ],
        t: [
          'Tangkap response login dan baca header `Set-Cookie` lengkap: `curl -si -d "user=a&pass=b" https://target.com/login | grep -i set-cookie`.',
          'Cek `Secure` — cookie tidak boleh berjalan melalui HTTP polos.',
          'Cek `HttpOnly` — JavaScript tidak boleh membaca cookie (memblokir pencurian via XSS).',
          'Cek `SameSite=Strict` atau `Lax` — mencegah cookie dikirim pada request lintas situs (permukaan CSRF).',
          'Verifikasi flag scope: `Domain` terlalu luas (root domain dipakai bersama sibling) atau tidak adanya restriksi `Path` memperlebar eksposur.'
        ],
        b: [
          'Tangkap respons masuk dan baca tajuk `Set-Cookie` lengkap: `curl -si -d "user=a&pass=b" https://target.com/login | grep -i set-cookie`.',
          'Periksa `Secure` — kuki tidak boleh dikirim melalui HTTP polos.',
          'Periksa `HttpOnly` — JavaScript tidak boleh membaca kuki (menghalangi pencurian lewat XSS).',
          'Periksa `SameSite=Strict` atau `Lax` — mencegah kuki dikirim pada permintaan lintas situs (memperkecil permukaan CSRF).',
          'Verifikasi penanda cakupan: `Domain` yang terlalu luas (domain induk dipakai bersama saudara) atau tidak adanya pembatasan `Path` memperluas paparan.'
        ],
        s: [
          'Login sambil merekam di Burp atau dev tools — cari header `Set-Cookie` di responsenya.',
          'Cek ada tulisan `Secure` — artinya cookie cuma boleh lewat HTTPS. Kalau nggak ada, cookie bisa nyasar lewat HTTP dan kepencuri.',
          'Cek `HttpOnly` — kalau nggak ada, JavaScript (termasuk script jahat XSS) bisa baca cookie kita.',
          'Cek `SameSite=Strict` atau `Lax` — ini pengaman CSRF. Nggal nggak ada, jebol.',
          'Lihat juga `Domain` dan `Path`-nya — domain kebanyakan scope itu cookie bocor ke situs lain.'
        ]
      },
      tools: ['curl', 'Burp Suite', 'browser dev tools'],
      remediation: {
        en: 'Set Secure, HttpOnly, and SameSite=Lax (or Strict) on every session cookie, scope Domain and Path as tightly as possible, and use a short Max-Age with rotation.',
        t: 'Set Secure, HttpOnly, dan SameSite=Lax (atau Strict) pada setiap session cookie, batasi scope Domain dan Path seketat mungkin, dan gunakan Max-Age pendek dengan rotasi.',
        b: 'Tetapkan Secure, HttpOnly, dan SameSite=Lax (atau Strict) pada setiap kuki sesi, batasi cakupan Domain dan Path seketat mungkin, dan gunakan Max-Age singkat dengan pergantian berkala.',
        s: 'Kasih semua pengaman ke cookie: `Secure; HttpOnly; SameSite=Lax`, patok domain dan path-nya sempit, dan jangan biarkan cookie umur panjang.'
      }
    },

    {
      name_en: 'Testing for Session Fixation',
      name_id: { t: 'Pengujian Session Fixation', b: 'Pengujian Pengikatan Sesi', s: 'Uji Jebakan Session Fixation' },
      summary: {
        en: 'If the session ID in force before login survives the login itself, an attacker can plant a known cookie on the victim and take over the authenticated session.',
        t: 'Jika session ID yang berlaku sebelum login tetap hidup melewati proses login, penyerang bisa menanam cookie yang sudah diketahui ke korban dan mengambil alih sesi yang terautentikasi.',
        b: 'Jika ID sesi yang berlaku sebelum masuk tetap hidup melewati proses masuk itu sendiri, penyerang dapat menanam kuki yang telah diketahui kepada korban lalu mengambil alih sesi yang terautentikasi.',
        s: 'Session fixation itu jebakan: penyerang kasih cookie "bocor" ke kita, kita login pakai cookie itu, dan dia ikut masuk. Terjadi kalau cookie SEBELUM login nggak diganti SETELAH login.'
      },
      howto: {
        en: [
          'Grab the pre-authentication cookie from the login page: note its exact value.',
          'Authenticate with that known cookie attached: `curl -si -H "Cookie: PHPSESSID=known123" -d "user=victim&pass=..." https://target.com/login`.',
          'Check whether the response sets a NEW session cookie — if the old value survives, fixation works.',
          'Test the planted cookie from another machine/browser on an authenticated page — if it loads, the session is fixated.',
          'Also test token injection via URL parameter or subdomain: some apps accept the session ID from the query string.'
        ],
        t: [
          'Ambil cookie pra-autentikasi dari halaman login: catat nilainya secara persis.',
          'Autentikasi dengan cookie yang sudah diketahui itu terpasang: `curl -si -H "Cookie: PHPSESSID=known123" -d "user=victim&pass=..." https://target.com/login`.',
          'Cek apakah response menetapkan session cookie BARU — jika nilai lama bertahan, fixation berhasil.',
          'Uji cookie yang ditanam dari mesin/browser lain pada halaman terautentikasi — jika termuat, sesi terfixasi.',
          'Uji juga injeksi token via parameter URL atau subdomain: beberapa aplikasi menerima session ID dari query string.'
        ],
        b: [
          'Ambil kuki pra-autentikasi dari halaman masuk: catat nilainya secara tepat.',
          'Autentikasi dengan kuki yang telah diketahui tersebut terpasang: `curl -si -H "Cookie: PHPSESSID=known123" -d "user=victim&pass=..." https://target.com/login`.',
          'Periksa apakah respons menetapkan kuki sesi BARU — jika nilai lama bertahan, pengikatan berhasil.',
          'Uji kuki yang ditanam dari mesin/peramban lain pada halaman terautentikasi — jika termuat, sesi terikat.',
          'Uji juga penyuntikan token melalui parameter URL atau subdomain: sejumlah aplikasi menerima ID sesi dari baris kueri.'
        ],
        s: [
          'Buka halaman login, salin cookie yang ada sebelum login — misal `PHPSESSID=abc123`.',
          'Login pakai cookie itu (jangan hapus): `curl -si -H "Cookie: PHPSESSID=abc123" -d "user=victim&pass=..." https://target.com/login`.',
          'Lihat hasilnya: apakah cookie berubah jadi baru? Kalau masih `abc123` setelah login, celah!',
          'Buktikan: buka cookie itu di browser lain, akses halaman yang butuh login. Kalau masuk, sesi kita "ditungguin" penyerang.',
          'Coba juga lewat URL — beberapa situs terima session ID dari parameter seperti `?session=abc123`.'
        ]
      },
      tools: ['curl', 'Burp Suite', 'browser'],
      remediation: {
        en: 'Regenerate the session ID on every authentication and privilege change, never accept session IDs from URLs, and pre-set a fresh anonymous cookie on every login page load.',
        t: 'Regenerasi session ID pada setiap autentikasi dan perubahan privilege, jangan pernah menerima session ID dari URL, dan tetapkan cookie anonim baru pada setiap pemuatan halaman login.',
        b: 'Buat ulang ID sesi pada setiap autentikasi dan perubahan hak akses, jangan pernah menerima ID sesi dari URL, dan tetapkan kuki anonim baru pada setiap pemuatan halaman masuk.',
        s: 'Wajib ganti session ID setiap kali user login. Cookie lama = buang. Dan jangan pernah nerima session ID dari URL — itu pintu fixation klasik.'
      }
    },

    {
      name_en: 'Testing for Exposed Session Variables',
      name_id: { t: 'Pengujian Variabel Sesi yang Terekspos', b: 'Pengujian Variabel Sesi yang Terbuka', s: 'Cari Data Sesi yang Bocor' },
      summary: {
        en: 'Session state sometimes leaks outside the cookie — in URLs, hidden fields, error messages, or debug output — revealing other users\' tokens or internal structure.',
        t: 'State sesi kadang bocor keluar dari cookie — di URL, hidden field, pesan error, atau output debug — membocorkan token user lain atau struktur internal.',
        b: 'Keadaan sesi kadang terbocorkan keluar dari kuki — dalam URL, bidang tersembunyi, pesan galat, atau keluaran awakutu — memperlihatkan token pengguna lain atau struktur internal.',
        s: 'Kadang isi sesi bocor ke tempat lain: nyangkut di URL, ketulis di error page, atau kebaca di debug output. Kalau kita bisa lihat sesi orang lain, tamat.'
      },
      howto: {
        en: [
          'Walk every page and grep responses for session tokens: `curl -s https://target.com/profile | grep -iE "session|token|sid"`, check URLs, referrers, and HTML comments.',
          'Trigger error pages and stack traces — leaked session dumps are common in verbose debug output.',
          'Inspect hidden form fields and JavaScript variables for embedded session state.',
          'Check whether the Referer header leaks the session: if the token sits in the URL, it bleeds to third-party sites via outbound links.',
          'Test response headers and body of caching layers (CDN) for accidentally cached authenticated pages.'
        ],
        t: [
          'Jelajahi setiap halaman dan grep response untuk session token: `curl -s https://target.com/profile | grep -iE "session|token|sid"`, periksa URL, referrer, dan komentar HTML.',
          'Picu halaman error dan stack trace — dump sesi yang bocor sering muncul di output debug verbose.',
          'Periksa hidden form field dan variabel JavaScript untuk state sesi yang tertanam.',
          'Cek apakah header Referer membocorkan sesi: jika token berada di URL, ia menetes ke situs pihak ketiga lewat link keluar.',
          'Uji header response dan body dari lapisan cache (CDN) untuk halaman terautentikasi yang tak sengaja tercache.'
        ],
        b: [
          'Jelajahi setiap halaman dan telusuri respons untuk token sesi: `curl -s https://target.com/profile | grep -iE "session|token|sid"`, periksa URL, perujuk, dan komentar HTML.',
          'Picu halaman galat dan jejak tumpukan — buangan sesi yang bocor sering muncul dalam keluaran awakutu yang terlalu rinci.',
          'Periksa bidang formulir tersembunyi dan variabel JavaScript untuk keadaan sesi yang tertanam.',
          'Periksa apakah tajuk Referer membocorkan sesi: jika token berada pada URL, ia menetes ke situs pihak ketiga melalui tautan keluar.',
          'Uji tajuk respons dan isi lapisan singgahan (CDN) untuk halaman terautentikasi yang tanpa sengaja tersinggahkan.'
        ],
        s: [
          'Buka semua halaman, cari kata "session", "token", "sid" di source-nya: `curl -s https://target.com/profile | grep -iE "session|token|sid"`.',
          'Bikin error di sengaja — halaman debug yang bocor sering nampilin isi session lengkap.',
          'Periksa field hidden dan variabel JavaScript — kadang state sesi nyelip di situ.',
          'Kalau session token ada di URL, dia ikut nyasar lewat header Referer tiap kita klik link keluar.',
          'Cek juga CDN/cache — halaman yang seharusnya privat kadang kecache dan kebaca orang lain.'
        ]
      },
      tools: ['curl', 'grep', 'Burp Suite', 'browser dev tools'],
      remediation: {
        en: 'Keep all session state server-side keyed by the opaque cookie, never place tokens in URLs or visible output, and disable verbose errors and debug output in production.',
        t: 'Simpan seluruh state sesi di sisi server dengan kunci cookie yang opaque, jangan pernah menempatkan token di URL atau output yang terlihat, dan matikan error verbose serta output debug di production.',
        b: 'Simpan seluruh keadaan sesi di sisi peladen dengan kunci kuki yang buram, jangan pernah menempatkan token pada URL atau keluaran yang terlihat, dan matikan galat terperinci serta keluaran awakutu di produksi.',
        s: 'Simpan isi sesi di server saja — cookie cukup jadi kuncinya. Jangan pernah naruh token di URL atau nampilin error lengkap ke publik.'
      }
    },

    {
      name_en: 'Testing for Cross Site Request Forgery',
      name_id: { t: 'Pengujian Cross Site Request Forgery (CSRF)', b: 'Pengujian Pemalsuan Permintaan Lintas Situs', s: 'Uji CSRF: Palsukan Permintaan' },
      summary: {
        en: 'CSRF tricks a logged-in victim\'s browser into firing an authenticated request from an attacker-controlled page. If state-changing endpoints lack anti-CSRF tokens, an attacker can act as the victim.',
        t: 'CSRF menipu browser korban yang sedang login agar menembakkan request terautentikasi dari halaman yang dikendalikan penyerang. Jika endpoint yang mengubah state tidak punya anti-CSRF token, penyerang dapat bertindak sebagai korban.',
        b: 'CSRF menipu peramban korban yang sedang masuk agar mengirim permintaan terautentikasi dari halaman yang dikendalikan penyerang. Jika endpoint pengubah keadaan tidak memiliki token anti-CSRF, penyerang dapat bertindak selaku korban.',
        s: 'CSRF itu serangan "jadian tangan panjang": kita lagi login di bank, lalu buka situs jahat — situs itu nyuruh browser kita transfer duit diam-diam. Kuncinya: apakah form sensitif minta token rahasia?'
      },
      howto: {
        en: [
          'Identify state-changing requests: password change, email change, funds transfer, add admin.',
          'Strip any CSRF token from a captured request and replay it in Burp Repeater — if it still succeeds, protection is broken.',
          'Check token validation: change one character of the token, use an empty value, or remove the parameter entirely.',
          'Check whether the token is tied to the session — a token from user A accepted for user B means it is worthless.',
          'Craft a proof-of-concept HTML page: `<form action="https://target.com/change-email" method="POST"><input type="hidden" name="email" value="attacker@evil.com"></form><script>document.forms[0].submit()</script>` and host it to verify execution from another origin.'
        ],
        t: [
          'Identifikasi request yang mengubah state: ubah password, ubah email, transfer dana, tambah admin.',
          'Buang semua CSRF token dari request yang ditangkap dan replay di Burp Repeater — jika masih berhasil, proteksinya rusak.',
          'Cek validasi token: ubah satu karakter token, gunakan nilai kosong, atau hapus parameternya seluruhnya.',
          'Cek apakah token terikat pada sesi — token dari user A yang diterima untuk user B berarti tidak bernilai.',
          'Buat halaman HTML proof-of-concept: `<form action="https://target.com/change-email" method="POST"><input type="hidden" name="email" value="attacker@evil.com"></form><script>document.forms[0].submit()</script>` dan host untuk memverifikasi eksekusi dari origin lain.'
        ],
        b: [
          'Identifikasi permintaan pengubah keadaan: ubah kata sandi, ubah surel, transfer dana, tambah admin.',
          'Buang seluruh token CSRF dari permintaan yang ditangkap dan kirim ulang di Burp Repeater — jika masih berhasil, perlindungannya rusak.',
          'Periksa validasi token: ubah satu karakter token, gunakan nilai kosong, atau hapus parameternya seluruhnya.',
          'Periksa apakah token terikat pada sesi — token milik pengguna A yang diterima untuk pengguna B berarti tidak bernilai.',
          'Buat halaman HTML bukti konsep: `<form action="https://target.com/change-email" method="POST"><input type="hidden" name="email" value="attacker@evil.com"></form><script>document.forms[0].submit()</script>` dan hos untuk memverifikasi eksekusi dari asal lain.'
        ],
        s: [
          'Cari aksi yang sensitif: ganti password, ganti email, kirim duit.',
          'Tangkap request-nya di Burp, hapus isi token CSRF-nya, kirim ulang di Repeater — kalau tetap berhasil, gawat.',
          'Main-main sama token-nya: ganti satu huruf, kosongin, atau hapus — server harus menolak semua.',
          'Cek apakah token milik sesi kita — token orang lain harus ditolak.',
          'Bikin file HTML kecil berisi form tersembunyi yang auto-submit — kalau dijalankan dari situs lain dan berhasil, itu CSRF terbukti: `<form action="https://target.com/change-email" method="POST">...`'
        ]
      },
      tools: ['Burp Suite', 'browser', 'curl', 'Burp Engage/CSRF generator'],
      remediation: {
        en: 'Require a per-session, cryptographically random anti-CSRF token on every state-changing request, verify it server-side, and add SameSite=Lax/Strict cookies plus re-authentication for critical actions.',
        t: 'Wajibkan anti-CSRF token yang random secara kriptografis dan terikat sesi pada setiap request yang mengubah state, verifikasi di sisi server, dan tambahkan cookie SameSite=Lax/Strict plus re-autentikasi untuk aksi kritis.',
        b: 'Wajibkan token anti-CSRF yang acak secara kriptografis dan terikat sesi pada setiap permintaan pengubah keadaan, verifikasi di sisi peladen, dan tambahkan kuki SameSite=Lax/Strict serta autentikasi ulang untuk tindakan kritis.',
        s: 'Kasih token rahasia di tiap form sensitif — satu token per sesi, dicek di server. Tambahan: cookie `SameSite=Lax` dan minta password ulang buat aksi super penting kayak ganti email.'
      }
    },

    {
      name_en: 'Testing for Logout Functionality',
      name_id: { t: 'Pengujian Fungsionalitas Logout', b: 'Pengujian Fungsi Keluar', s: 'Uji Tombol Logout-nya' },
      summary: {
        en: 'Logout must kill the session server-side — not just delete the client cookie. If the old token still works after logout, a stolen cookie remains valid forever.',
        t: 'Logout harus mematikan sesi di sisi server — bukan sekadar menghapus cookie di client. Jika token lama masih berfungsi setelah logout, cookie curian tetap valid selamanya.',
        b: 'Keluar harus mematikan sesi di sisi peladen — bukan sekadar menghapus kuki di klien. Jika token lama masih berfungsi setelah keluar, kuki curian tetap sah selamanya.',
        s: 'Logout yang cuma hapus cookie di browser itu logout palsu. Yang penting: token lama harus MATI di server. Kalau masih hidup, cookie yang udah dicuri tetap dipakai maling.'
      },
      howto: {
        en: [
          'Log in, capture the session cookie, then log out normally.',
          'Replay the pre-logout cookie on an authenticated page: `curl -s -H "Cookie: session=OLD" https://target.com/profile`.',
          'If the page still loads authenticated content, the session was not invalidated server-side.',
          'Test the logout endpoint directly with GET vs POST — some apps allow logout via GET, which is itself CSRF-able (forced logout).',
          'Check all session artifacts: cookies, tokens issued to other tabs/devices, and remember-me tokens must all die.'
        ],
        t: [
          'Login, tangkap session cookie, lalu logout secara normal.',
          'Replay cookie pra-logout pada halaman terautentikasi: `curl -s -H "Cookie: session=OLD" https://target.com/profile`.',
          'Jika halaman masih memuat konten terautentikasi, sesi tidak diinvalidasi di sisi server.',
          'Uji endpoint logout langsung dengan GET vs POST — beberapa aplikasi mengizinkan logout via GET, yang itu sendiri rawan CSRF (forced logout).',
          'Periksa semua artefak sesi: cookie, token yang diterbitkan ke tab/device lain, dan token remember-me semuanya harus mati.'
        ],
        b: [
          'Masuk, tangkap kuki sesi, lalu keluar secara normal.',
          'Kirim ulang kuki pra-keluar pada halaman terautentikasi: `curl -s -H "Cookie: session=OLD" https://target.com/profile`.',
          'Jika halaman masih memuat konten terautentikasi, sesi tidak dibatalkan di sisi peladen.',
          'Uji endpoint keluar secara langsung dengan GET vs POST — sejumlah aplikasi mengizinkan keluar via GET, yang hal itu sendiri rentan CSRF (keluar paksa).',
          'Periksa seluruh artefak sesi: kuki, token yang diterbitkan ke tab/peranti lain, dan token ingat-saya semuanya harus mati.'
        ],
        s: [
          'Login, salin cookie sesinya, terus klik logout biasa.',
          'Sekarang coba pakai cookie lama itu: `curl -s -H "Cookie: session=OLD" https://target.com/profile`. Kalau masih kebaca profil kita, logout-nya bohong.',
          'Coba juga panggil URL logout langsung lewat GET — logout via GET itu bisa dipaksa penyerang buat mengeluarkan kita dari akun.',
          'Jangan lupa: kalau login di HP dan laptop, logout di satu tempat harus matiin dua-duanya, termasuk fitur "ingat saya".',
          'Simpan bukti request dan response-nya buat laporan — tunjukin bahwa sesi lama masih hidup setelah logout, itu inti temuannya.'
        ]
      },
      tools: ['curl', 'Burp Suite', 'browser'],
      remediation: {
        en: 'Invalidate the session server-side on logout (destroy the session object and all associated tokens, including remember-me and other devices), and accept logout only via POST.',
        t: 'Invalidasikan sesi di sisi server saat logout (hancurkan objek sesi dan semua token terkait, termasuk remember-me dan device lain), dan terima logout hanya via POST.',
        b: 'Batalkan sesi di sisi peladen saat keluar (hancurkan objek sesi dan seluruh token terkait, termasuk ingat-saya dan peranti lain), dan terima keluar hanya melalui POST.',
        s: 'Logout harus benar-benar membunuh sesi di server — semua token, semua device, termasuk "ingat saya". Dan tombolnya pakai POST, bukan GET.'
      }
    },

    {
      name_en: 'Testing Session Timeout',
      name_id: { t: 'Pengujian Session Timeout', b: 'Pengujian Batas Waktu Sesi', s: 'Uji Sesi Nganggur Berapa Lama' },
      summary: {
        en: 'Sessions that live indefinitely extend the window for replay of stolen cookies. Measure how long an idle session survives and whether high-value actions shorten it.',
        t: 'Sesi yang hidup tanpa batas memperpanjang jendela replay cookie curian. Ukur berapa lama sesi idle bertahan dan apakah aksi bernilai tinggi memperpendeknya.',
        b: 'Sesi yang hidup tanpa batas memperpanjang jendela pemakaian ulang kuki curian. Ukur berapa lama sesi menganggur tetap bertahan, dan apakah tindakan bernilai tinggi memperpendek masa hidupnya.',
        s: 'Session yang nggak pernah mati itu bahaya — maling yang nyuri cookie bisa pakai berbulan-bulan. Kita ukur: berapa lama sesi nganggur tetap hidup?'
      },
      howto: {
        en: [
          'Log in, save the cookie, and do absolutely nothing for increasing intervals (5, 15, 30, 60 minutes).',
          'After each interval, replay the cookie: `curl -s -o /dev/null -w "%{http_code}" -H "Cookie: session=OLD" https://target.com/profile`.',
          'Note when the response drops from 200 to 302/401 — that is the idle timeout.',
          'Verify timeout shortens for sensitive contexts (admin panel, payment flow) and check idle vs absolute timeout separately.',
          'Test whether any activity (a single background heartbeat request) resets the timer indefinitely.'
        ],
        t: [
          'Login, simpan cookie, dan jangan lakukan apa pun selama interval yang meningkat (5, 15, 30, 60 menit).',
          'Setelah tiap interval, replay cookie: `curl -s -o /dev/null -w "%{http_code}" -H "Cookie: session=OLD" https://target.com/profile`.',
          'Catat kapan respons turun dari 200 ke 302/401 — itulah idle timeout.',
          'Verifikasi timeout memendek untuk konteks sensitif (panel admin, alur pembayaran) dan cek idle vs absolute timeout secara terpisah.',
          'Uji apakah aktivitas apa pun (satu request heartbeat background) mereset timer tanpa batas.'
        ],
        b: [
          'Masuk, simpan kuki, dan jangan lakukan apa pun selama interval yang makin panjang (5, 15, 30, 60 menit).',
          'Setelah tiap interval, kirim ulang kuki: `curl -s -o /dev/null -w "%{http_code}" -H "Cookie: session=OLD" https://target.com/profile`.',
          'Catat kapan respons turun dari 200 ke 302/401 — itulah batas waktu menganggur.',
          'Verifikasi batas waktu memendek untuk konteks sensitif (panel admin, alur pembayaran) dan periksa batas menganggur vs batas mutlak secara terpisah.',
          'Uji apakah aktivitas apa pun (satu permintaan detak jantung latar) mengatur ulang penghitung tanpa batas.'
        ],
        s: [
          'Login, simpan cookie-nya, terus... nggak ngapa-ngapain. Sabar, ini tes kesabaran.',
          'Tiap 5-15-30-60 menit, coba pakai cookie itu: `curl -s -o /dev/null -w "%{http_code}" -H "Cookie: session=OLD" https://target.com/profile`. Angka 200 artinya masih hidup.',
          'Catat kapan status berubah jadi 302 atau 401 — itulah umur maksimal sesi nganggur.',
          'Halaman sensitif kayak admin atau pembayaran harus timeout lebih cepat. Coba beda-beda.',
          'Hati-hati request background (heartbeat) — kalau ada yang auto-jalan, timer bisa terus reset dan sesi jadi abadi.'
        ]
      },
      tools: ['curl', 'Burp Suite', 'browser dev tools'],
      remediation: {
        en: 'Enforce a short idle timeout (minutes, not hours) plus a hard absolute cap, shorten both for privileged sessions, and kill the session server-side rather than relying on cookie expiry.',
        t: 'Tegakkan idle timeout singkat (menit, bukan jam) plus batas absolute yang keras, perpendek keduanya untuk sesi privilege tinggi, dan matikan sesi di sisi server alih-alih mengandalkan kedaluwarsa cookie.',
        b: 'Tegakkan batas waktu menganggur yang singkat (menit, bukan jam) ditambah batas mutlak yang tegas, perpendek keduanya untuk sesi berhak istimewa, dan matikan sesi di sisi peladen alih-alih mengandalkan kedaluwarsa kuki.',
        s: 'Kasih umur pendek ke sesi nganggur — hitungan menit. Tambah batas mutlak berapa lama pun sesi boleh hidup. Untuk admin, makin pendek makin baik. Dan matinya harus di server, bukan cuma cookie-nya kedaluwarsa.'
      }
    },

    {
      name_en: 'Testing for Session Puzzling',
      name_id: { t: 'Pengujian Session Puzzling', b: 'Pengujian Kebingungan Sesi', s: 'Uji Session Puzzling: Sesi Kecampur' },
      summary: {
        en: 'Session puzzling is when the same session variable carries different meanings across flows — an early value (like a pre-login username) is later interpreted as proof of authentication, letting an attacker escalate.',
        t: 'Session puzzling terjadi ketika variabel sesi yang sama membawa makna berbeda di alur yang berbeda — nilai awal (mis. username pra-login) kemudian ditafsirkan sebagai bukti autentikasi, sehingga penyerang bisa melakukan eskalasi.',
        b: 'Kebingungan sesi terjadi ketika variabel sesi yang sama membawa makna berbeda di alur yang berbeda — nilai awal (mis. nama pengguna pra-masuk) kemudian ditafsirkan sebagai bukti autentikasi, sehingga penyerang dapat meningkatkan hak.',
        s: 'Session puzzling itu "satu laci dipakai semua orang": aplikasi nyimpen nilai di sesi pasal proses A, lalu proses B ngira nilai itu bukti sudah login. Kita pakai kekacauan itu buat masuk tanpa password.'
      },
      howto: {
        en: [
          'Map every session variable the app sets across flows: login, password reset, profile update, guest checkout.',
          'Start a password-reset or account-recovery flow for a victim user but do NOT complete it.',
          'With the half-finished state in your session, directly request an authenticated page — some apps treat the pending "user identity" variable as a valid login.',
          'Alternatively: authenticate as a low-privilege user, then trigger a flow that overwrites a session role/identity variable with attacker-controlled data.',
          'Document which flows write the variable and which flows trust it — the overlap is the puzzle.'
        ],
        t: [
          'Petakan setiap variabel sesi yang di-set aplikasi lintas alur: login, reset password, update profil, checkout tamu.',
          'Jalankan alur reset password / pemulihan akun untuk user korban tetapi JANGAN diselesaikan.',
          'Dengan state setengah jadi di sesi Anda, minta langsung halaman terautentikasi — beberapa aplikasi memperlakukan variabel "identitas user" yang tertunda sebagai login valid.',
          'Alternatif: autentikasi sebagai user privilege rendah, lalu picu alur yang menimpa variabel role/identitas sesi dengan data yang dikontrol penyerang.',
          'Dokumentasikan alur mana yang menulis variabel dan alur mana yang memercayainya — tumpang tindih itulah puzzling-nya.'
        ],
        b: [
          'Petakan setiap variabel sesi yang diterapkan aplikasi lintas alur: masuk, atur ulang kata sandi, pembaruan profil, pembayaran tamu.',
          'Jalankan alur atur ulang kata sandi / pemulihan akun untuk pengguna korban namun JANGAN diselesaikan.',
          'Dengan keadaan setengah jadi dalam sesi Anda, minta langsung halaman terautentikasi — sejumlah aplikasi memperlakukan variabel "identitas pengguna" yang tertunda sebagai masuk yang sah.',
          'Alternatif: autentikasi sebagai pengguna berhak rendah, lalu picu alur yang menimpa variabel peran/identitas sesi dengan data yang dikendalikan penyerang.',
          'Dokumentasikan alur mana yang menulis variabel dan alur mana yang memercayainya — tumpang tindih itulah kebingungannya.'
        ],
        s: [
          'Catat variabel sesi apa aja yang diisi aplikasi di tiap alur: login, lupa password, ubah profil.',
          'Mulai alur "lupa password" buat akun korban — tapi berhenti di tengah jalan, jangan diselesaikan.',
          'Dengan sesi setengah jalan itu, langsung buka halaman yang butuh login. Beberapa aplikasi ngira "ada nama user di sesi = sudah login". Boom.',
          'Cara lain: login sebagai user biasa, lalu jalankan alur yang nimpa variabel role di sesi dengan nilai buatan kita.',
          'Intinya: cari satu variabel yang ditulis alur A tapi dipercaya alur B. Itu celahnya.'
        ]
      },
      tools: ['Burp Suite', 'browser dev tools', 'curl'],
      remediation: {
        en: 'Use distinct session variables for distinct purposes, never let a pending value impersonate an authenticated state, and clear partial-flow variables when the flow is abandoned.',
        t: 'Gunakan variabel sesi yang berbeda untuk tujuan yang berbeda, jangan biarkan nilai tertunda menyamar sebagai state terautentikasi, dan bersihkan variabel alur parsial saat alur ditinggalkan.',
        b: 'Pisahkan variabel sesi menurut fungsinya masing-masing. Nilai yang belum selesai tidak boleh dianggap sebagai keadaan terautentikasi, dan begitu suatu alur ditinggalkan, variabel sisa alur itu harus dibersihkan.',
        s: 'Satu variabel = satu maksud, jangan dicampur. Nilai "setengah proses" nggak boleh dianggap "sudah login", dan kalau user nyerah di tengah alur, bersihin jejaknya.'
      }
    },

    {
      name_en: 'Testing for Session Hijacking',
      name_id: { t: 'Pengujian Session Hijacking', b: 'Pengujian Pembajakan Sesi', s: 'Uji Pencurian Sesi' },
      summary: {
        en: 'Hijacking is using someone else\'s live session token to become them. Test every channel that can leak or force a token — XSS, sniffing, fixation, and predictable generation.',
        t: 'Hijacking adalah memakai session token milik orang lain yang masih hidup untuk menjadi dia. Uji setiap channel yang bisa membocorkan atau memaksa token — XSS, sniffing, fixation, dan generasi yang bisa diprediksi.',
        b: 'Pembajakan adalah memakai token sesi milik orang lain yang masih hidup untuk menjadi dirinya. Uji setiap jalur yang dapat membocorkan atau memaksakan token — XSS, penyadapan, pengikatan, dan pembuatan yang dapat diprediksi.',
        s: 'Session hijacking = nyuri "karcis" orang lain lalu pura-pura jadi dia. Kita cari semua jalan buat dapat token: lewat XSS, jaringan, tebakan, atau jebakan fixation.'
      },
      howto: {
        en: [
          'Hunt token-leak channels first: XSS (`document.cookie` when HttpOnly is missing), Referer leakage via URL-borne tokens, network sniffing on plain HTTP.',
          'Assess token predictability: collect many tokens (parallel logins via curl) and test for sequence, timestamp, or weak-PRNG patterns.',
          'Verify a hijacked token actually works: replay it from a different IP/User-Agent — if the session does not bind to those, hijacking is fully effective.',
          'Test whether login from a second device kills the first session (single-session policy) or both coexist.',
          'Chain findings: XSS → cookie exfil → replay, and document the full hijack path as impact.'
        ],
        t: [
          'Telusuri channel kebocoran token dulu: XSS (`document.cookie` saat flag HttpOnly absen), kebocoran Referer via token di URL, sniffing jaringan pada HTTP polos.',
          'Nilai prediktabilitas token: kumpulkan banyak token (login paralel via curl) dan uji pola sekuens, timestamp, atau PRNG lemah.',
          'Verifikasi token hasil hijacking benar-benar berfungsi: replay dari IP/User-Agent berbeda — jika sesi tidak terikat padanya, hijacking sepenuhnya efektif.',
          'Uji apakah login dari device kedua mematikan sesi pertama (kebijakan single-session) atau keduanya hidup bersama.',
          'Rantai temuan: XSS → exfil cookie → replay, dan dokumentasikan jalur hijack lengkap sebagai impact.'
        ],
        b: [
          'Telusuri channel kebocoran token terlebih dahulu: XSS (`document.cookie` ketika penanda HttpOnly tidak ada), kebocoran perujuk melalui token pada URL, penyadapan jaringan pada HTTP polos.',
          'Nilai keterprediksian token: kumpulkan banyak token (masuk paralel via curl) dan uji pola barisan, waktu, atau pembangkit acak yang lemah.',
          'Pastikan token hasil pembajakan benar-benar berfungsi: kirim ulang dari IP/User-Agent berbeda — jika sesi tidak terikat padanya, pembajakan sepenuhnya efektif.',
          'Uji apakah masuk dari peranti kedua mematikan sesi pertama (kebijakan satu sesi) atau keduanya hidup bersama.',
          'Rangkai temuan: XSS → pembocoran kuki → kirim ulang, dan dokumentasikan jalur pembajakan lengkap sebagai dampak.'
        ],
        s: [
          'Cari dulu jalan bocornya: XSS yang bisa baca cookie (kalau nggak ada HttpOnly), token nyangkut di URL, atau jaringan HTTP yang bisa disadap.',
          'Tes apakah token bisa ditebak: login berkali-kali, kumpulkan tokennya, cari pola. Angka berurutan?Tanggal lahir? Itu lemah.',
          'Buktikan: pakai token itu dari komputer lain. Kalau sesi nggak ngecek IP atau device, kita resmi jadi dia.',
          'Cek juga: kalau login di HP, apakah sesi di laptop otomatis mati? Atau dua-duanya hidup — makin enak buat maling.',
          'Gabungkan: XSS → curi cookie → pakai. Itu rantai serangan lengkap buat laporan.'
        ]
      },
      tools: ['Burp Suite', 'curl', 'Wireshark', 'XSS payloads', 'Sequencer (Burp)'],
      remediation: {
        en: 'Bind sessions to at least one additional attribute (User-Agent, client certificate), rotate tokens on privilege change, enforce HSTS and Secure cookies, and kill all sessions on credential change.',
        t: 'Ikat sesi pada setidaknya satu atribut tambahan (User-Agent, client certificate), rotasi token saat perubahan privilege, wajibkan HSTS dan cookie Secure, dan matikan semua sesi saat kredensial berubah.',
        b: 'Ikat sesi pada setidaknya satu atribut tambahan (User-Agent, sertifikat klien), ganti token saat perubahan hak akses, wajibkan HSTS dan kuki Secure, dan matikan seluruh sesi saat kredensial berubah.',
        s: 'Ikat sesi ke ciri peranti (User-Agent atau sertifikat), ganti token tiap naik hak, paksa HTTPS lewat HSTS, dan saat user ganti password — bunuh semua sesinya di mana pun.'
      }
    },

    {
      name_en: 'Testing for JSON Web Tokens',
      name_id: { t: 'Pengujian JSON Web Tokens (JWT)', b: 'Pengujian Token Web JSON (JWT)', s: 'Uji JWT: Token Bawa Login' },
      summary: {
        en: 'JWTs carry their own claims — if signature verification, algorithm choice, or claim validation is weak, attackers forge tokens: alg=none, key confusion, expired-token acceptance.',
        t: 'JWT membawa claim-nya sendiri — jika verifikasi signature, pemilihan algoritma, atau validasi claim lemah, penyerang dapat memalsukan token: alg=none, key confusion, penerimaan token kedaluwarsa.',
        b: 'JWT membawa klaimnya sendiri — jika verifikasi tanda tangan, pemilihan algoritma, atau validasi klaim lemah, penyerang dapat memalsukan token: alg=none, kekeliruan kunci, penerimaan token kedaluwarsa.',
        s: 'JWT itu karcis login bentuk panjang yang isinya bisa kita baca. Kalau cek tanda tangannya lemah, kita bisa bikin karcis palsu — misal jadi admin.'
      },
      howto: {
        en: [
          'Capture a JWT and decode its parts: `echo "HEADER.PAYLOAD" | base64 -d 2>/dev/null` — inspect algorithm and claims.',
          'Try the classic alg=none attack: replace the header algorithm with `"alg":"none"`, edit claims (`"role":"admin"`), strip the signature, and resend.',
          'Try key confusion: if the header says HS256, sign with the public key material (RS256 public key as HMAC secret) — jwt_tool automates: `java -jar jwt_tool.jar <token> -X k`.',
          'Test claim validation: change `exp` to the past, `sub` to another user ID, and weak secrets with a crack attempt: `hashcat -a 0 -m 16500 token.txt wordlist.txt`.',
          'Check the server actually rejects tampered tokens and never accepts `alg` from the token itself.'
        ],
        t: [
          'Tangkap JWT dan decode bagiannya: `echo "HEADER.PAYLOAD" | base64 -d 2>/dev/null` — periksa algoritma dan claim.',
          'Coba serangan klasik alg=none: ganti algoritma header dengan `"alg":"none"`, edit claim (`"role":"admin"`), buang signature, dan kirim ulang.',
          'Coba key confusion: jika header menyebut HS256, tanda tangani dengan materi public key (public key RS256 sebagai secret HMAC) — jwt_tool mengotomasi: `java -jar jwt_tool.jar <token> -X k`.',
          'Uji validasi claim: ubah `exp` ke masa lalu, `sub` ke ID user lain, dan secret lemah dengan percobaan crack: `hashcat -a 0 -m 16500 token.txt wordlist.txt`.',
          'Pastikan server benar-benar menolak token yang dimanipulasi dan tidak pernah menerima `alg` dari token itu sendiri.'
        ],
        b: [
          'Tangkap JWT dan uraikan bagiannya: `echo "HEADER.PAYLOAD" | base64 -d 2>/dev/null` — periksa algoritma dan klaim.',
          'Coba serangan klasik alg=none: ganti algoritma tajuk dengan `"alg":"none"`, ubah klaim (`"role":"admin"`), buang tanda tangan, dan kirim ulang.',
          'Coba kekeliruan kunci: jika tajuk menyebut HS256, tanda tangani dengan materi kunci publik (kunci publik RS256 sebagai rahasia HMAC) — jwt_tool mengotomasi: `java -jar jwt_tool.jar <token> -X k`.',
          'Uji validasi klaim: ubah `exp` ke masa lalu, `sub` ke ID pengguna lain, dan rahasia lemah dengan percobaan pembongkaran: `hashcat -a 0 -m 16500 token.txt wordlist.txt`.',
          'Pastikan peladen benar-benar menolak token yang diubah dan tidak pernah menerima `alg` dari token itu sendiri.'
        ],
        s: [
          'Ambil token JWT-nya (biasanya di header `Authorization: Bearer ...`), terus decode: `echo "HEADER.PAYLOAD" | base64 -d 2>/dev/null`. Isinya bisa kita baca lho.',
          'Serangan klasik: ganti algoritma jadi `"alg":"none"`, ubah klaim jadi `"role":"admin"`, hapus signature, kirim. Kalau diterima, tamat.',
          'Serangan pintar: kalau server pakai RSA, coba tanda tangani ulang pakai kunci publiknya sebagai HMAC secret: `java -jar jwt_tool.jar <token> -X k`.',
          'Tebak secret lemahnya: `hashcat -a 0 -m 16500 token.txt wordlist.txt` — password "secret" masih sering kepakai.',
          'Ubah `exp` (waktu habis) dan `sub` (user ID) — server harus menolak semuanya. Kalau ada yang lolos, itulah celahnya.'
        ]
      },
      tools: ['jwt_tool', 'jwt.io', 'hashcat', 'Burp Suite', 'curl'],
      remediation: {
        en: 'Pin the allowed algorithms server-side (never trust the header alg), reject alg=none and expired tokens, use long random secrets, and keep tokens short-lived with refresh rotation.',
        t: 'Kunci algoritma yang diizinkan di sisi server (jangan pernah percaya alg dari header), tolak alg=none dan token kedaluwarsa, gunakan secret acak yang panjang, dan buat token berumur pendek dengan rotasi refresh.',
        b: 'Batasi algoritma yang diizinkan dari sisi peladen, dan jangan pernah mempercayai alg yang datang dari tajuk. Tolak alg=none beserta token yang kedaluwarsa, gunakan rahasia acak yang panjang, serta terbitkan token berumur pendek yang diperbarui lewat rotasi.',
        s: 'Server yang mutusin algoritma, bukan token. Tolak `alg=none`, cek masa berlaku, pakai secret panjang dan acak, dan bikin token umurnya sebentar saja.'
      }
    },

    {
      name_en: 'Testing for Concurrent Sessions',
      name_id: { t: 'Pengujian Concurrent Sessions', b: 'Pengujian Sesi Bersamaan', s: 'Uji Login Barengan dari Banyak Tempat' },
      summary: {
        en: 'If one user can hold many simultaneous live sessions, stolen credentials and shared accounts go undetected. Check whether the app limits, alerts on, or kills parallel sessions.',
        t: 'Jika satu user bisa memegang banyak sesi simultan yang hidup, kredensial curian dan akun bersama tidak terdeteksi. Periksa apakah aplikasi membatasi, memberi peringatan, atau mematikan sesi paralel.',
        b: 'Apabila satu pengguna dibiarkan memegang banyak sesi hidup secara serentak, kredensial hasil curian maupun pemakaian akun bersama akan sulit terdeteksi. Periksa apakah aplikasi membatasi, memperingatkan, atau justru mematikan sesi paralel seperti itu.',
        s: 'Kalau satu akun bisa login di 10 tempat sekaligus tanpa ada yang curiga, akun curian bisa dipakai berlama-lama tanpa ketahuan. Kita tes: boleh berapa sesi hidup bersamaan?'
      },
      howto: {
        en: [
          'Log in as the same user from two browsers/devices and confirm both sessions stay alive simultaneously.',
          'Scale up: open a third, fourth, fifth session — note whether any cap exists.',
          'Check for user-visible signals: does the app notify "logged in from a new device" or show an active-sessions list?',
          'Test logout scope: does logging out in one place kill all sessions or only its own?',
          'Assess detection: perform password change — do all concurrent sessions die (they should)?'
        ],
        t: [
          'Login sebagai user yang sama dari dua browser/device dan pastikan kedua sesi tetap hidup bersamaan.',
          'Perbesar skala: buka sesi ketiga, keempat, kelima — catat apakah ada batas.',
          'Periksa sinyal yang terlihat user: apakah aplikasi memberi tahu "login dari device baru" atau menampilkan daftar sesi aktif?',
          'Uji cakupan logout: apakah logout di satu tempat mematikan semua sesi atau hanya miliknya sendiri?',
          'Nilai deteksi: lakukan perubahan password — apakah semua sesi concurrent mati (seharusnya begitu)?'
        ],
        b: [
          'Masuk sebagai pengguna yang sama dari dua peramban/peranti dan pastikan kedua sesi tetap hidup serentak.',
          'Perbesar skala: buka sesi ketiga, keempat, kelima — catat apakah ada batas.',
          'Periksa sinyal yang terlihat pengguna: apakah aplikasi memberi tahu "masuk dari peranti baru" atau menampilkan daftar sesi aktif?',
          'Uji cakupan keluar: apakah keluar di satu tempat mematikan semua sesi atau hanya miliknya sendiri?',
          'Nilai deteksi: lakukan perubahan kata sandi — apakah semua sesi serentak mati (seharusnya demikian)?'
        ],
        s: [
          'Login akun yang sama di dua browser — refresh keduanya. Masih hidup dua-duanya? Catat itu.',
          'Tambah terus: tiga, empat, lima sesi. Ada batas maksimal atau bebas semua?',
          'Cek notifikasi: kalau ada login dari device baru, apakah user dikasih tahu? Ada daftar "peranti aktif" kayak WhatsApp?',
          'Logout di satu tempat — apakah yang lain ikut mati, atau cuma satu itu?',
          'Ganti password — semua sesi harus mati serentak. Kalau nggak, yang nyuri akun tetap nyaman.'
        ]
      },
      tools: ['browser (multiple profiles)', 'curl', 'Burp Suite'],
      remediation: {
        en: 'Define and enforce a concurrent-session policy (limit or allow with visibility), notify users of new-device logins, expose an active-sessions view with remote logout, and kill every session on password change.',
        t: 'Tetapkan dan tegakkan kebijakan concurrent session (batasi atau izinkan dengan visibilitas), beri tahu user tentang login dari device baru, sediakan tampilan sesi aktif dengan logout jarak jauh, dan matikan semua sesi saat password berubah.',
        b: 'Tetapkan dan tegakkan kebijakan sesi serentak (batasi atau izinkan dengan keterlihatan), beri tahu pengguna tentang masuk dari peranti baru, sediakan tampilan sesi aktif dengan keluar jarak jauh, dan matikan seluruh sesi saat kata sandi berubah.',
        s: 'Putuskan aturannya: berapa sesi yang boleh hidup. Kasih tahu user kalau ada login baru, kasih halaman "peranti aktif" dengan tombol logout jarak jauh, dan saat ganti password — matikan semuanya.'
      }
    }
  ]
});
