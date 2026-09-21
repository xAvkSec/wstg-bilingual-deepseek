/* WSTG Bilingual — 4.4 Authentication (11 tests)
   Condensed bilingual adaptation, CC BY-SA 4.0. Registers: t=Teknis, b=Baku, s=Sederhana. */
window.WSTG_DATA = window.WSTG_DATA || [];
window.WSTG_DATA.push({
  order: 4, code: 'ATHN',
  name_en: 'Authentication',
  desc_en: 'Credentials, lockout, MFA & session entry',
  name_id: { t: 'Autentikasi', b: 'Autentikasi', s: 'Pembuktian Identitas' },
  desc_id: { t: 'Kredensial, lockout, MFA & pintu masuk sesi', b: 'Kredensial, penguncian, MFA & pintu masuk sesi', s: 'Cara login dan pembuktian diri' },
  tests: [

    {
      name_en: 'Test Credentials Transported over an Encrypted Channel',
      name_id: { t: 'Uji Kredensial yang Diangkut melalui Kanal Terenkripsi', b: 'Uji Kredensial yang Diangkut melalui Kanal Tersandi', s: 'Cek Login Lewat HTTPS' },
      summary: {
        en: 'Credentials must travel over TLS, always. Test the login endpoint for HTTP availability, forced redirects, and whether any credential material (tokens, cookies) leaks over plain HTTP.',
        t: 'Kredensial harus melaju di atas TLS, selalu. Uji endpoint login untuk ketersediaan HTTP, redirect paksa, dan apakah material kredensial (token, cookie) bocor lewat HTTP polos.',
        b: 'Kredensial wajib dikirim melalui TLS tanpa kecuali. Pengujian terhadap endpoint masuk mencakup ada tidaknya akses HTTP, ada tidaknya pengalihan paksa, serta kemungkinan bahan kredensial — token maupun kuki — ikut terkirim melalui HTTP biasa.',
        s: 'Password dan token harus lewat jalur terenkripsi (HTTPS). Kalau masih ada yang lewat HTTP, penyerang di jaringan yang sama bisa mencuri.'
      },
      howto: {
        en: [
          'Request the login page over plain HTTP — does it load, or force-redirect to HTTPS?',
          'Capture the actual POST: confirm the form action URL is HTTPS, not just the page.',
          'Check every endpoint that receives credentials: login, password reset, API auth, mobile backends.',
          'Inspect cookies set at login — do they carry the Secure flag?',
          'Test TLS quality on those endpoints (SSL Labs) — weak ciphers are a finding too.'
        ],
        t: [
          'Request halaman login lewat HTTP polos — apakah dimuat, atau dipaksa redirect ke HTTPS?',
          'Tangkap POST sebenarnya: pastikan URL action form adalah HTTPS, bukan hanya halamannya.',
          'Cek setiap endpoint yang menerima kredensial: login, reset password, auth API, backend mobile.',
          'Periksa cookie yang di-set saat login — apakah membawa flag Secure?',
          'Uji kualitas TLS di endpoint tersebut (SSL Labs) — cipher lemah juga temuan.'
        ],
        b: [
          'Minta halaman login melalui HTTP polos — apakah dimuat, atau dipaksa beralih ke HTTPS?',
          'Tangkap POST sebenarnya: pastikan URL aksi formulir adalah HTTPS, bukan hanya halamannya.',
          'Periksa setiap endpoint yang menerima kredensial: login, setel ulang sandi, autentikasi API, backend seluler.',
          'Periksa kuki yang dipasang saat login — apakah membawa penanda Secure?',
          'Uji mutu TLS pada endpoint tersebut (SSL Labs) — sandi lemah juga temuan.'
        ],
        s: [
          'Buka `http://target.com/login` — kalau muncul tanpa dialihkan ke HTTPS, itu masalah.',
          'Lihat ke mana form login mengirim data — harus ke alamat `https://`.',
          'Cek juga halaman reset password dan login API — semua harus terenkripsi.',
          'Cookie login harus punya penanda `Secure`.',
          'Uji kualitas enkripsi di SSL Labs — nilai buruk itu temuan.'
        ]
      },
      tools: ['curl', 'Burp Suite', 'SSL Labs', 'Wireshark'],
      remediation: {
        en: 'Force HTTPS everywhere with redirects and HSTS, mark all auth cookies Secure+HttpOnly, and disable weak TLS versions server-wide.',
        t: 'Paksa HTTPS di mana-mana dengan redirect dan HSTS, tandai semua cookie auth Secure+HttpOnly, dan matikan versi TLS lemah di seluruh server.',
        b: 'Paksa HTTPS di seluruh bagian dengan pengalihan dan HSTS, tandai semua kuki autentikasi sebagai Secure+HttpOnly, dan matikan versi TLS yang lemah pada seluruh peladen.',
        s: 'Semua halaman wajib HTTPS, cookie login diberi penanda Secure, matikan enkripsi versi lama.'
      }
    },

    {
      name_en: 'Test for Default Credentials',
      name_id: { t: 'Uji Kredensial Default', b: 'Uji Kredensial Bawaan', s: 'Coba Password Bawaan' },
      summary: {
        en: 'Devices, frameworks, and packaged apps ship with default logins (admin/admin, admin/password). If never changed, they are instant full access — still one of the most common real-world breaches.',
        t: 'Perangkat, framework, dan aplikasi paket datang dengan login default (admin/admin, admin/password). Kalau tidak pernah diganti, itu akses penuh instan — masih menjadi salah satu pelanggaran nyata paling umum.',
        b: 'Perangkat, kerangka kerja, dan aplikasi paket hadir dengan login bawaan (admin/admin, admin/password). Jika tak pernah diganti, itu akses penuh seketika — masih menjadi salah satu peristiwa nyata paling umum.',
        s: 'Banyak sistem punya password bawaan pabrik — admin/admin dan sejenisnya. Kalau lupa diganti, siapa pun bisa masuk.'
      },
      howto: {
        en: [
          'Identify the platform/CMS first (see INFO tests), then look up its default credential list.',
          'Try the defaults on all login surfaces: web admin, manager consoles, database UIs, API.',
          'Test common pairs from default-credential dictionaries with tools like hydra or Burp intruder.',
          'Check for hardcoded vendor accounts documented in manuals.',
          'If default works, document severity as critical — it is a full compromise.'
        ],
        t: [
          'Identifikasi platform/CMS dulu (lihat tes INFO), lalu cari daftar kredensial defaultnya.',
          'Coba default di semua permukaan login: admin web, konsol manajer, UI database, API.',
          'Uji pasangan umum dari kamus default-credentials dengan tool seperti hydra atau Burp intruder.',
          'Cek akun vendor hardcoded yang terdokumentasi di manual.',
          'Jika default berhasil, dokumentasikan severity sebagai critical — itu kompromi penuh.'
        ],
        b: [
          'Identifikasi platform/CMS dahulu (lihat uji INFO), lalu cari daftar kredensial bawaannya.',
          'Coba bawaan pada semua permukaan login: admin web, konsol pengelola, UI pangkalan data, API.',
          'Uji pasangan umum dari kamus kredensial-bawaan dengan alat seperti hydra atau Burp intruder.',
          'Periksa akun vendor tertanam yang terdokumentasi dalam manual.',
          'Jika bawaan berhasil, catat keparahan sebagai kritis — itu penyusupan total.'
        ],
        s: [
          'Kenali dulu aplikasinya — WordPress? Tomcat? Router? Tiap vendor punya daftar password bawaan.',
          'Coba password bawaan di semua halaman login yang ketemu.',
          'Gunakan daftar password umum dengan hydra atau Burp Intruder.',
          'Baca manual produk — sering mencantumkan akun khusus.',
          'Kalau berhasil masuk, catat sebagai temuan kritis.'
        ]
      },
      tools: ['hydra', 'Burp Suite', 'default credential lists'],
      remediation: {
        en: 'Force a password change on first login, never document production credentials in shipped manuals, and scan deployments for vendor defaults before go-live.',
        t: 'Paksa perubahan password saat login pertama, jangan pernah mendokumentasikan kredensial production di manual yang dikirim, dan pindai deployment untuk default vendor sebelum go-live.',
        b: 'Paksa penggantian sandi saat login pertama, jangan mendokumentasikan kredensial produksi dalam manual yang dikirim, dan pindai penerapan untuk bawaan vendor sebelum tayang.',
        s: 'Wajibkan ganti password saat login pertama. Jangan tulis password asli di buku manual. Periksa default sebelum sistem tayang.'
      }
    },

    {
      name_en: 'Test for Weak Lock Out Mechanism',
      name_id: { t: 'Uji Mekanisme Lock Out yang Lemah', b: 'Uji Mekanisme Penguncian yang Lemah', s: 'Cek Pemblokiran Login Gagal' },
      summary: {
        en: 'Without lockout, attackers brute-force passwords indefinitely. Test the thresholds, lockout duration, and — critically — whether lockout applies to password guessing without enabling account-DoS.',
        t: 'Tanpa lockout, penyerang bisa brute-force password tanpa batas. Uji ambang batas, durasi lockout, dan — yang krusial — apakah lockout berlaku untuk password guessing tanpa memungkinkan account-DoS.',
        b: 'Tanpa penguncian, penyerang dapat menebak sandi tanpa batas. Uji ambangnya, durasi penguncian, dan — yang krusial — apakah penguncian berlaku untuk penebakan sandi tanpa membuka pintu penyangkalan-akun.',
        s: 'Kalau login gagal berulang tidak diblokir, password bisa dicoba sampai ketemu. Uji berapa kali salah sebelum terkunci dan berapa lama.'
      },
      howto: {
        en: [
          'Send 10+ failed logins for one account; note when/if lockout triggers and its duration.',
          'Test lockout counters across endpoints: does failing on the API also lock the web login?',
          'Check whether correct password still works during lockout (lockout not enforced) — some only block after success.',
          'Test if lockout resets on successful login or by simply waiting; measure the reset window.',
          'Check lockout granularity: per-account? per-IP? Can it be abused to lock out other users (DoS)?'
        ],
        t: [
          'Kirim 10+ login gagal untuk satu akun; catat kapan lockout memicu dan durasinya.',
          'Uji penghitung lockout lintas endpoint: apakah gagal di API juga mengunci login web?',
          'Cek apakah password benar tetap berfungsi selama lockout (lockout tidak ditegakkan) — sebagian hanya memblokir setelah sukses.',
          'Uji apakah lockout di-reset saat login sukses atau hanya dengan menunggu; ukur jendela resetnya.',
          'Cek granularitas lockout: per-akun? per-IP? Bisakah disalahgunakan untuk mengunci user lain (DoS)?'
        ],
        b: [
          'Kirim 10+ upaya login gagal untuk satu akun; catat kapan penguncian memicu dan durasinya.',
          'Uji penghitung penguncian lintas endpoint: apakah gagal di API juga mengunci login web?',
          'Periksa apakah sandi benar tetap berfungsi selama penguncian (penguncian tak ditegakkan) — sebagian hanya memblokir setelah sukses.',
          'Uji apakah penguncian direset saat login sukses atau hanya dengan menunggu; ukur jendela resetnya.',
          'Periksa granularitas penguncian: per-akun? per-IP? Dapatkah disalahgunakan untuk mengunci pengguna lain (DoS)?'
        ],
        s: [
          'Coba login gagal 10 kali — kena blokir di percobaan keberapa? Berapa lama?',
          'Cek apakah gagal login di aplikasi mobile juga terhitung di web.',
          'Selama terkunci, coba password yang benar — masih ditolak atau tidak?',
          'Tunggu sebentar lalu coba lagi — kapan blokirnya hilang? Catat waktunya.',
          'Hati-hati: blokir yang terlalu sensitif bisa disalahgunakan untuk mengunci akun orang lain.'
        ]
      },
      tools: ['Burp Suite', 'hydra', 'curl'],
      remediation: {
        en: 'Implement progressive delays plus temporary lockout (e.g., exponential backoff), notify the account owner, and use IP+account combined throttling to avoid trivial lockout-DoS.',
        t: 'Terapkan delay progresif plus lockout sementara (mis. exponential backoff), notifikasi pemilik akun, dan gunakan throttling gabungan IP+akun agar lockout-DoS tidak mudah.',
        b: 'Terapkan jeda progresif plus penguncian sementara (mis. mundur eksponensial), beri tahu pemilik akun, dan gunakan pembatasan gabungan IP+akun agar penyangkalan-akun tak mudah.',
        s: 'Salah terus? Tunda makin lama tiap percobaan. Beri tahu pemilik akun. Blokir berdasarkan IP dan akun sekaligus — jangan cuma akun.'
      }
    },

    {
      name_en: 'Test for Bypassing Authentication Schema',
      name_id: { t: 'Uji Bypass Skema Autentikasi', b: 'Uji Pintasan Skema Autentikasi', s: 'Cari Cara Lewat Login' },
      summary: {
        en: 'Auth bypasses range from predictable tokens, to forced browsing past the login, to parameter manipulation (`admin=true`), to SQL injection in the login query itself.',
        t: 'Bypass autentikasi beragam: dari token yang bisa diprediksi, forced browsing melewati login, manipulasi parameter (`admin=true`), hingga SQL injection di query login itu sendiri.',
        b: 'Pintasan autentikasi beragam: dari token yang dapat diramal, menjelajah paksa melewati login, manipulasi parameter (`admin=true`), hingga penyuntikan SQL pada kueri login itu sendiri.',
        s: 'Cari jalan tikus ke balik halaman login — token mudah ditebak, parameter curang, atau trik injeksi.'
      },
      howto: {
        en: [
          'After login, note how identity is carried (cookie, token, parameter) — then tamper it in later requests.',
          'Try forced browsing: request an authenticated page directly without logging in.',
          'Inject auth parameters: `admin=true`, `debug=1`, `user=victim` in login/profile requests.',
          'Test SQL injection in the login form (`admin\'--`) — classic single-query bypass.',
          'Test predictable remember-me tokens and session ID generation at boundary conditions.'
        ],
        t: [
          'Setelah login, catat bagaimana identitas dibawa (cookie, token, parameter) — lalu ubah di request berikutnya.',
          'Coba forced browsing: minta halaman terautentikasi langsung tanpa login.',
          'Injeksikan parameter auth: `admin=true`, `debug=1`, `user=victim` di request login/profil.',
          'Uji SQL injection di form login (`admin\'--`) — bypass klasik satu query.',
          'Uji token remember-me yang bisa diprediksi dan generasi session ID di kondisi batas.'
        ],
        b: [
          'Setelah login, catat bagaimana identitas dibawa (kuki, token, parameter) — lalu ubah pada permintaan berikutnya.',
          'Coba menjelajah paksa: minta halaman terautentikasi langsung tanpa login.',
          'Suntikkan parameter autentikasi: `admin=true`, `debug=1`, `user=victim` pada permintaan login/profil.',
          'Uji penyuntikan SQL pada formulir login (`admin\'--`) — pintasan klasik satu kueri.',
          'Uji token ingat-saya yang dapat diramal dan pembuatan ID sesi pada kondisi batas.'
        ],
        s: [
          'Setelah login, lihat apa yang jadi "kartu identitas" kita — cookie? token? Coba ubah isinya.',
          'Coba buka halaman dalam langsung tanpa login — kadang pagar cuma di menu, bukan di pintu.',
          'Sisipkan `admin=true` di request — kadang situs memercayainya.',
          'Coba `admin\'--` di kolom username — trik SQL klasik untuk lolos.',
          'Token "ingat saya" yang mudah ditebak itu pintu masuk lain.'
        ]
      },
      tools: ['Burp Suite', 'curl', 'sqlmap'],
      remediation: {
        en: 'Enforce server-side session validation on every request, generate session tokens with strong randomness, and never trust client-side identity parameters.',
        t: 'Tegakkan validasi sesi server-side di setiap request, hasilkan token sesi dengan randomisasi kuat, dan jangan pernah percaya parameter identitas client-side.',
        b: 'Tegakkan validasi sesi sisi-peladen pada setiap permintaan, hasilkan token sesi dengan keacakan kuat, dan jangan percaya parameter identitas sisi-klien.',
        s: 'Server harus memeriksa sesi di setiap permintaan. Token harus acak kuat. Jangan percaya identitas dari browser.'
      }
    },

    {
      name_en: 'Test for Vulnerable Remember Password',
      name_id: { t: 'Uji Fitur Remember Me yang Rentan', b: 'Uji Fitur Ingat Sandi yang Rentan', s: 'Cek Fitur Ingat Saya' },
      summary: {
        en: 'Remember-me cookies that store credentials or predictable tokens allow account theft from the cookie alone. Auto-complete on password fields leaks through shared machines.',
        t: 'Cookie remember-me yang menyimpan kredensial atau token yang bisa diprediksi memungkinkan pencurian akun dari cookie-nya saja. Auto-complete pada field password bocor lewat komputer bersama.',
        b: 'Kuki ingat-saya yang menyimpan kredensial atau token yang dapat diramal memungkinkan pencurian akun dari kuki saja. Isi-otomatis pada bidang sandi bocor lewat komputer bersama.',
        s: 'Fitur "ingat saya" kadang menyimpan password atau token lemah — siapa yang dapat cookienya dapat akunnya.'
      },
      howto: {
        en: [
          'Login with remember-me enabled; inspect the cookie set — decode it (base64), analyze its structure.',
          'Determine what the token derives from: user ID? timestamp? password? predictable sequence?',
          'Try altering the cookie\'s user identifier and replaying — token reuse across accounts.',
          'Check cookie flags: Secure, HttpOnly, domain scope, and expiry length.',
          'Test whether the cookie survives password changes — long-lived tokens must invalidate.'
        ],
        t: [
          'Login dengan remember-me aktif; periksa cookie yang di-set — decode (base64), analisis strukturnya.',
          'Tentukan asal token: user ID? timestamp? password? sekuens yang bisa diprediksi?',
          'Coba ubah identifier user dalam cookie dan putar ulang — token reuse lintas akun.',
          'Cek flag cookie: Secure, HttpOnly, cakupan domain, dan panjang kedaluwarsa.',
          'Uji apakah cookie bertahan setelah perubahan password — token berumur panjang harus di-invalidasi.'
        ],
        b: [
          'Login dengan ingat-saya aktif; periksa kuki yang dipasang — saksikan (base64), analisis strukturnya.',
          'Tentukan asal token: ID pengguna? penanda waktu? sandi? urutan yang dapat diramal?',
          'Coba ubah pengenal pengguna dalam kuki dan putar ulang — pemakaian token lintas akun.',
          'Periksa penanda kuki: Secure, HttpOnly, cakupan domain, dan panjang kedaluwarsa.',
          'Uji apakah kuki bertahan setelah penggantian sandi — token berumur panjang harus dibatalkan.'
        ],
        s: [
          'Login dengan centang "ingat saya", lalu lihat cookie yang tersimpan — decode isinya.',
          'Tanya: asal token ini apa? ID user? waktu? kalau polanya kelihatan, itu lemah.',
          'Ubah bagian ID user di cookie, kirim ulang — bisa jadi jadi orang lain?',
          'Cek penanda keamanan cookie: Secure, HttpOnly, kapan kedaluwarsa.',
          'Setelah ganti password, cookie lama harus mati — kalau masih hidup, itu celah.'
        ]
      },
      tools: ['Burp Suite', 'browser dev tools'],
      remediation: {
        en: 'Store only a server-side random token in the cookie, rotate it on privilege changes, invalidate all remember-me tokens on password change, and set tight expiry.',
        t: 'Simpan hanya token acak server-side dalam cookie, rotasi saat perubahan privilege, invalidasi semua token remember-me saat password berubah, dan set kedaluwarsa ketat.',
        b: 'Simpan hanya token acak sisi-peladen dalam kuki, rotasi saat perubahan hak, batalkan semua token ingat-saya saat sandi berubah, dan tetapkan kedaluwarsa ketat.',
        s: 'Cookie hanya boleh berisi token acak dari server. Ganti password = matikan semua sesi ingat-saya. Beri batas waktu.'
      }
    },

    {
      name_en: 'Test for Browser Cache Weaknesses',
      name_id: { t: 'Uji Kelemahan Cache Browser', b: 'Uji Kelemahan Singgahan Peramban', s: 'Cek Jejak di Cache Browser' },
      summary: {
        en: 'Browsers cache authenticated pages unless told otherwise. On shared computers, the next user presses Back and reads your banking page — sensitive data left on disk.',
        t: 'Browser me-cache halaman terautentikasi kecuali dilarang. Di komputer bersama, user berikutnya menekan Back dan membaca halaman perbankan Anda — data sensitif tertinggal di disk.',
        b: 'Peramban menyinggahkan halaman terautentikasi kecuali dilarang. Pada komputer bersama, pengguna berikutnya menekan Mundur dan membaca halaman perbankan Anda — data sensitif tertinggal di diska.',
        s: 'Browser menyimpan salinan halaman. Di komputer warnet, user berikutnya bisa tekan Back dan baca data kita — kalau cache tidak dibersihkan.'
      },
      howto: {
        en: [
          'Login, browse sensitive pages, then log out. Press Back — do the authenticated pages render?',
          'Inspect response headers on authenticated pages: look for `Cache-Control: no-store/no-cache`.',
          'Check for `Pragma: no-cache` on legacy paths and meta-cache headers in the HTML.',
          'Test the browser disk cache for copies of authenticated responses (dev tools → cache).',
          'Verify logout clears cached pages — many apps never do.'
        ],
        t: [
          'Login, jelajahi halaman sensitif, lalu logout. Tekan Back — apakah halaman terautentikasi masih tampil?',
          'Periksa header respons di halaman terautentikasi: cari `Cache-Control: no-store/no-cache`.',
          'Cek `Pragma: no-cache` pada path lama dan header meta-cache di HTML.',
          'Uji disk cache browser untuk salinan respons terautentikasi (dev tools → cache).',
          'Verifikasi logout membersihkan halaman ter-cache — banyak aplikasi tidak pernah.'
        ],
        b: [
          'Login, jelajahi halaman sensitif, lalu keluar. Tekan Mundur — apakah halaman terautentikasi masih tampil?',
          'Periksa tajuk respons pada halaman terautentikasi: cari `Cache-Control: no-store/no-cache`.',
          'Periksa `Pragma: no-cache` pada jalur lama dan tajuk meta-singgahan dalam HTML.',
          'Uji singgahan diska peramban untuk salinan respons terautentikasi (alat dev → singgahan).',
          'Pastikan keluar membersihkan halaman tersinggah — banyak aplikasi tidak pernah.'
        ],
        s: [
          'Login, buka halaman sensitif, logout, lalu tekan Back — masih kelihatan isinya?',
          'Di alat pengembang, periksa header `Cache-Control` — harus `no-store` untuk halaman rahasia.',
          'Halaman lama kadang pakai `Pragma` — cek juga itu.',
          'Lihat isi cache browser — ada salinan halaman setelah login?',
          'Logout harus ikut membersihkan jejak — uji itu.'
        ]
      },
      tools: ['browser dev tools', 'Burp Suite'],
      remediation: {
        en: 'Send Cache-Control: no-store on every authenticated response, avoid sensitive data in URLs, and clear application caches on logout.',
        t: 'Kirim Cache-Control: no-store di setiap respons terautentikasi, hindari data sensitif di URL, dan bersihkan cache aplikasi saat logout.',
        b: 'Sertakan Cache-Control: no-store pada setiap respons terautentikasi, hindari penempatan data sensitif di dalam URL, dan bersihkan singgahan aplikasi begitu pengguna keluar.',
        s: 'Halaman setelah login harus memerintahkan browser untuk tidak menyimpan. Jangan taruh data rahasia di alamat. Logout = bersihkan jejak.'
      }
    },

    {
      name_en: 'Test for Weak Password Policy or Implementation',
      name_id: { t: 'Uji Kebijakan Password yang Lemah', b: 'Uji Kebijakan Sandi yang Lemah', s: 'Cek Aturan Password' },
      summary: {
        en: 'Weak policies accept `password1`; weak implementations truncate silently, hash with MD5, or store in recoverable form. Test both the rules and the machinery.',
        t: 'Kebijakan lemah menerima `password1`; implementasi lemah memotong diam-diam, hash dengan MD5, atau menyimpan dalam bentuk yang bisa dipulihkan. Uji aturan dan mesinnya.',
        b: 'Kebijakan yang lemah membiarkan sandi seperti `password1` diterima; implementasinya pun dapat cacat, misalnya memotong sandi secara diam-diam, menyandikannya dengan MD5, atau menyimpannya dalam bentuk yang masih dapat dipulihkan. Yang diuji bukan hanya aturannya, tetapi juga mesin di baliknya.',
        s: 'Uji dua hal: aturan passwordnya ketat tidak, dan cara penyimpanannya aman tidak. Bisa saja aturannya bagus tapi penyimpanannya jelek.'
      },
      howto: {
        en: [
          'Register/change password with weak values: `123456`, `aaaa`, `password1` — note what passes.',
          'Test policy dimensions: minimum length, complexity, blacklist, change-on-first-login.',
          'Test length truncation: set a 100-char password, then try logging in with only its first N chars.',
          'Probe password change: does it require the current password? Can you skip notice to old email?',
          'Hash/storage assessment: leaked hashes (if in scope) reveal algorithm strength — MD5/SHA1 are findings.'
        ],
        t: [
          'Registrasi/ubah password dengan nilai lemah: `123456`, `aaaa`, `password1` — catat apa yang lolos.',
          'Uji dimensi kebijakan: panjang minimum, kompleksitas, blacklist, wajib ganti saat login pertama.',
          'Uji truncation panjang: set password 100 karakter, lalu coba login hanya dengan N karakter pertamanya.',
          'Sondai perubahan password: apakah memerlukan password saat ini? Bisakah melewati notifikasi ke email lama?',
          'Asesmen hash/penyimpanan: hash yang bocor (jika dalam cakupan) membuka kekuatan algoritma — MD5/SHA1 adalah temuan.'
        ],
        b: [
          'Daftar/ubah sandi dengan nilai lemah: `123456`, `aaaa`, `password1` — catat apa yang lolos.',
          'Uji dimensi kebijakan: panjang minimum, kompleksitas, daftar-hitam, wajib-ganti-saat-login-pertama.',
          'Uji pemotongan panjang: pasang sandi 100 karakter, lalu coba login hanya dengan N karakter pertamanya.',
          'Sondasi penggantian sandi: apakah memerlukan sandi saat ini? Dapatkah melewati pemberitahuan ke surel lama?',
          'Asesmen penyandian/penyimpanan: sandi-sisi yang bocor (bila dalam cakupan) membuka kekuatan algoritma — MD5/SHA1 adalah temuan.'
        ],
        s: [
          'Coba daftar dengan password `123456` atau `password1` — diterima? Itu lemah.',
          'Cek panjang minimum, syarat huruf/angka, dan apakah password umum ditolak.',
          'Trik bagus: buat password super panjang, lalu login hanya dengan sebagian awalnya — kalau berhasil, ada pemotongan diam-diam.',
          'Ganti password — apakah harus tahu password lama dulu?',
          'Kalau ada bocoran hash, lihat jenisnya — MD5 itu jadul dan berbahaya.'
        ]
      },
      tools: ['Burp Suite', 'hashcat (if hashes in scope)'],
      remediation: {
        en: 'Enforce length ≥ 12 with a breached-password blacklist, hash with Argon2id/bcrypt, and truncate-check at validation rather than silently cutting.',
        t: 'Tegakkan panjang ≥ 12 dengan blacklist password bocor, hash dengan Argon2id/bcrypt, dan periksa truncation saat validasi alih-alih memotong diam-diam.',
        b: 'Tegakkan panjang ≥ 12 dengan daftar-hitam sandi bocor, sandi-sisi dengan Argon2id/bcrypt, dan periksa pemotongan saat validasi alih-alih memotong diam-diam.',
        s: 'Password minimal 12 karakter, tolak password yang pernah bocor, simpan dengan algoritma modern (bcrypt/Argon2).'
      }
    },

    {
      name_en: 'Test for Weak Security Question Answer',
      name_id: { t: 'Uji Jawaban Pertanyaan Keamanan yang Lemah', b: 'Pengujian Jawaban Pertanyaan Keamanan yang Lemah', s: 'Cek Pertanyaan Pemulihan' },
      summary: {
        en: 'Security questions reset passwords, but their answers are public knowledge — mother\'s maiden name from social media. They act as a weak backup password guarding the strong one.',
        t: 'Pertanyaan keamanan me-reset password, tetapi jawabannya pengetahuan publik — nama gadis ibu dari media sosial. Ia berperan sebagai password cadangan lemah yang menjaga yang kuat.',
        b: 'Pertanyaan keamanan menyetel ulang sandi, namun jawabannya pengetahuan umum — nama gadis ibu dari media sosial. Ia berperan sebagai sandi cadangan lemah yang menjaga yang kuat.',
        s: 'Pertanyaan pemulihan ("nama ibu?", "warna favorit?") sering bisa dijawab dari media sosial korban — padahal dia yang pegang kunci password.'
      },
      howto: {
        en: [
          'Enumerate the security questions offered at password recovery.',
          'Assess answer guessability: breed of first pet, city of birth — all researchable on social media.',
          'Test answer case-sensitivity and spacing — is "fluffy" equal to "Fluffy "?',
          'Check whether multiple recovery attempts are rate-limited.',
          'Test whether the question set can be changed without verifying the old ones.'
        ],
        t: [
          'Enumerasi pertanyaan keamanan yang ditawarkan saat pemulihan password.',
          'Ases kemudahan menebak jawaban: ras peliharaan pertama, kota lahir — semua bisa diteliti di media sosial.',
          'Uji sensitivitas kapital dan spasi jawaban — apakah "fluffy" sama dengan "Fluffy "?',
          'Cek apakah percobaan pemulihan berulang dibatasi rate-limitnya.',
          'Uji apakah set pertanyaan bisa diganti tanpa verifikasi yang lama.'
        ],
        b: [
          'Cacah pertanyaan keamanan yang ditawarkan saat pemulihan sandi.',
          'Ases kemudahan menebak jawaban: ras peliharaan pertama, kota lahir — semua dapat ditelusuri di media sosial.',
          'Uji kepekaan kapital dan spasi jawaban — apakah "fluffy" sama dengan "Fluffy "?',
          'Periksa apakah percobaan pemulihan berulang dibatasi latanya.',
          'Uji apakah set pertanyaan dapat diganti tanpa memverifikasi yang lama.'
        ],
        s: [
          'Lihat daftar pertanyaan pemulihan yang ditawarkan.',
          'Tanya diri: bisakah jawabannya ditemukan di media sosial korban? Kalau bisa, lemah.',
          'Coba beda kapital atau spasi di jawaban — kadang sistemnya terlalu pemaaf.',
          'Coba jawab berkali-kali — ada batas percobaan?',
          'Bisa ganti pertanyaan tanpa verifikasi? Itu celah.'
        ]
      },
      tools: ['Burp Suite', 'browser', 'OSINT'],
      remediation: {
        en: 'Replace security questions with MFA or emailed reset links; if kept, rate-limit attempts and let users write their own questions and case-sensitive answers.',
        t: 'Ganti pertanyaan keamanan dengan MFA atau link reset via email; jika tetap dipakai, rate-limit percobaan dan biarkan user menulis pertanyaan sendiri dengan jawaban case-sensitive.',
        b: 'Ganti pertanyaan keamanan dengan MFA atau tautan setel-ulang surel; jika tetap dipakai, batasi laju percobaan dan biarkan pengguna menulis pertanyaan sendiri dengan jawaban peka-kapital.',
        s: 'Lebih baik pakai MFA atau tautan surel. Kalau masih pakai pertanyaan, batasi percobaan dan biarkan jawabannya peka huruf besar-kecil.'
      }
    },

    {
      name_en: 'Test for Weak Password Change or Reset Functionalities',
      name_id: { t: 'Uji Fitur Perubahan/Reset Password yang Lemah', b: 'Uji Fitur Penggantian/Penyetelan-Ulang Sandi yang Lemah', s: 'Cek Proses Reset Password' },
      summary: {
        en: 'Password reset is the crown-jewel attack surface: predictable reset tokens, unexpired links, user-controlled reset parameters, and reset responses that confirm account existence.',
        t: 'Reset password adalah attack surface mahkota: token reset yang bisa diprediksi, link tidak kedaluwarsa, parameter reset yang dikontrol user, dan respons reset yang mengonfirmasi keberadaan akun.',
        b: 'Penyetelan ulang sandi adalah permukaan serangan mahkota: token yang dapat diramal, tautan tak kedaluwarsa, parameter yang dikendalikan pengguna, dan respons yang mengonfirmasi keberadaan akun.',
        s: 'Fitur lupa password itu incaran utama: token mudah ditebak, link tak kedaluwarsa, atau bisa reset akun orang lain.'
      },
      howto: {
        en: [
          'Request a reset for your account; examine the token: length, charset, entropy, and whether it embeds the user ID or timestamp.',
          'Test token expiry and single-use — replay an old token; then request two tokens and see if the first still works.',
          'Tamper the reset request: change the email/username the reset applies to (host-header poisoning of reset links too).',
          'Check reset responses for account enumeration differences.',
          'Test whether the old password is required for in-app password change.'
        ],
        t: [
          'Minta reset untuk akun Anda; periksa token: panjang, charset, entropi, dan apakah menyematkan user ID atau timestamp.',
          'Uji kedaluwarsa dan pemakaian tunggal token — putar ulang token lama; lalu minta dua token dan lihat apakah yang pertama masih berfungsi.',
          'Ubah request reset: ganti email/username yang dikenai reset (termasuk host-header poisoning pada link reset).',
          'Cek respons reset untuk perbedaan enumerasi akun.',
          'Uji apakah password lama disyaratkan untuk perubahan password dalam aplikasi.'
        ],
        b: [
          'Minta setel-ulang untuk akun Anda; periksa token: panjang, set-karakter, entropi, dan apakah menyematkan ID pengguna atau penanda waktu.',
          'Uji kedaluwarsa dan pemakaian-sekali token — putar ulang token lama; lalu minta dua token dan lihat apakah yang pertama masih berfungsi.',
          'Ubah permintaan setel-ulang: ganti surel/nama pengguna yang dikenai (termasuk racun tajuk-host pada tautan setel-ulang).',
          'Periksa respons setel-ulang untuk perbedaan pencacahan akun.',
          'Uji apakah sandi lama disyaratkan untuk penggantian sandi dalam aplikasi.'
        ],
        s: [
          'Minta reset password, lalu bedah tokennya: pendek? polanya kelihatan? memuat ID user?',
          'Coba pakai token lama — masih hidup? Token harus sekali pakai dan berbatas waktu.',
          'Ubah email di request reset — bisa jadi reset akun orang lain.',
          'Perhatikan pesan responsnya — beda-beda untuk akun ada/tidak?',
          'Ganti password di dalam aplikasi — harus minta password lama dulu.'
        ]
      },
      tools: ['Burp Suite', 'curl', 'temp-mail'],
      remediation: {
        en: 'Generate high-entropy single-use tokens with short expiry, bind them to the account, require old password for changes, and send uniform responses.',
        t: 'Hasilkan token single-use entropi tinggi dengan kedaluwarsa pendek, ikat ke akun, wajibkan password lama untuk perubahan, dan kirim respons seragam.',
        b: 'Hasilkan token sekali-pakai berentropi tinggi dengan kedaluwarsa pendek, kaitkan ke akun, wajibkan sandi lama untuk perubahan, dan kirim respons seragam.',
        s: 'Token reset harus acak kuat, sekali pakai, berbatas waktu, terkunci pada satu akun. Ganti password wajib tahu password lama.'
      }
    },

    {
      name_en: 'Test for Weaker Authentication in Alternative Channel',
      name_id: { t: 'Uji Autentikasi yang Lebih Lemah di Kanal Alternatif', b: 'Uji Autentikasi yang Lebih Lemah pada Jalur Alternatif', s: 'Cek Kanal Masuk Lain' },
      summary: {
        en: 'The main site may be hardened, but the mobile API, legacy portal, or SSO endpoint may still accept old protocols. Attackers always target the weakest channel that grants the same identity.',
        t: 'Situs utama mungkin sudah dikeraskan, tetapi API mobile, portal legacy, atau endpoint SSO mungkin masih menerima protokol lama. Penyerang selalu menargetkan kanal terlemah yang memberi identitas yang sama.',
        b: 'Situs utama mungkin telah diperkuat, namun API seluler, portal warisan, atau endpoint SSO bisa jadi masih menerima protokol lama. Penyerang selalu membidik jalur terlemah yang tetap memberikan identitas yang sama.',
        s: 'Situs utama sudah aman, tapi aplikasi mobile, portal lama, atau jalur login lain mungkin masih lemah — penyerang masuk lewat sana.'
      },
      howto: {
        en: [
          'Map all authentication channels: web, mobile API, SSO, desktop apps, third-party integrations.',
          'Compare policies between channels: password rules, lockout, MFA enforcement on each.',
          'Test legacy endpoints for older/weaker flows (basic auth, no lockout, no rate limiting).',
          'Check whether a session/token from one channel is accepted by another.',
          'Test authentication on APIs supporting both interactive and machine clients — machine flows often skip MFA.'
        ],
        t: [
          'Petakan semua kanal autentikasi: web, API mobile, SSO, aplikasi desktop, integrasi pihak ketiga.',
          'Bandingkan kebijakan antar kanal: aturan password, lockout, penegakan MFA di masing-masing.',
          'Uji endpoint legacy untuk alur lebih tua/lemah (basic auth, tanpa lockout, tanpa rate limiting).',
          'Cek apakah sesi/token dari satu kanal diterima kanal lain.',
          'Uji autentikasi di API yang mendukung klien interaktif dan machine — alur machine sering melewati MFA.'
        ],
        b: [
          'Petakan semua jalur autentikasi: web, API seluler, SSO, aplikasi desktop, integrasi pihak ketiga.',
          'Bandingkan kebijakan antar jalur: aturan sandi, penguncian, penegakan MFA pada masing-masing.',
          'Uji endpoint warisan untuk alur lebih tua/lemah (autentikasi dasar, tanpa penguncian, tanpa pembatas laju).',
          'Periksa apakah sesi/token dari satu jalur diterima jalur lain.',
          'Uji autentikasi pada API yang mendukung klien interaktif dan mesin — alur mesin sering melewati MFA.'
        ],
        s: [
          'Daftar semua jalan masuk: web, aplikasi HP, SSO, aplikasi desktop.',
          'Bandingkan aturannya — yang mana paling lemah?',
          'Endpoint lama sering pakai autentikasi kuno dan tanpa pembatasan.',
          'Coba token dari aplikasi HP dipakai di web — diterima?',
          'Login lewat jalur otomatis (API key) sering lolos dari MFA.'
        ]
      },
      tools: ['Burp Suite', 'mobile proxy setup', 'API testing tools'],
      remediation: {
        en: 'Centralize authentication logic, enforce identical policies across every channel, and retire legacy endpoints that cannot support modern controls.',
        t: 'Pusatkan logika autentikasi, tegakkan kebijakan identik di setiap kanal, dan pensiunkan endpoint legacy yang tidak bisa mendukung kontrol modern.',
        b: 'Pusatkan logika autentikasi, tegakkan kebijakan identik pada setiap jalur, dan pensiunkan endpoint warisan yang tak mampu mendukung kontrol modern.',
        s: 'Satu mesin autentikasi untuk semua jalur. Aturan sama ketatnya di web, HP, dan API. Hapus jalur lama yang tak bisa dikeraskan.'
      }
    },

    {
      name_en: 'Test for Multi-Factor Authentication',
      name_id: { t: 'Uji Autentikasi Multi-Faktor (MFA)', b: 'Pengujian Autentikasi Multi-Faktor (MFA)', s: 'Uji Kode Verifikasi 2 Langkah' },
      summary: {
        en: 'MFA is the strongest login control — when done right. Test for brute-forceable codes, missing rate limits, no replay protection, MFA bypass via "remember device", and race conditions on code validation.',
        t: 'MFA adalah kontrol login terkuat — kalau dikerjakan benar. Uji kode yang bisa di-brute-force, rate limit yang absen, tanpa proteksi replay, bypass MFA via "ingat perangkat", dan race condition pada validasi kode.',
        b: 'MFA adalah kontrol login terkuat — bila dikerjakan benar. Uji kode yang dapat ditebak, pembatas laju yang absen, tanpa perlindungan putar-ulang, pintasan MFA lewat "ingat perangkat", dan kondisi pacu pada validasi kode.',
        s: 'Verifikasi dua langkah itu kuat — kalau benar. Cek apakah kodenya bisa dicoba-coba, bisa dipakai ulang, atau dilewati.'
      },
      howto: {
        en: [
          'Trigger MFA prompts and test code length/lifetime: 4-digit codes without rate limit fall in ~10k tries.',
          'Test replay: reuse a consumed code; then request two codes and try the first.',
          'Test the "remember this device" flag: can it be forged or extended indefinitely?',
          'Check MFA enforcement paths: reset-password flow, SMS-email fallback, OAuth links — often MFA-free.',
          'Probe race conditions: fire simultaneous code submissions to see if one slips past the counter.'
        ],
        t: [
          'Picu prompt MFA dan uji panjang/masa berlaku kode: kode 4 digit tanpa rate limit jatuh dalam ~10 ribu percobaan.',
          'Uji replay: pakai ulang kode yang sudah terpakai; lalu minta dua kode dan coba yang pertama.',
          'Uji flag "ingat perangkat ini": bisakah dipalsukan atau diperpanjang tanpa batas?',
          'Cek jalur penegakan MFA: alur reset password, fallback SMS-email, tautan OAuth — sering tanpa MFA.',
          'Sondai race condition: tembak pengiriman kode simultan untuk melihat ada yang lolos dari penghitung.'
        ],
        b: [
          'Picu perintah MFA dan uji panjang/masa-berlaku kode: kode 4 digit tanpa pembatas jatuh dalam ~10 ribu percobaan.',
          'Uji putar-ulang: pakai ulang kode yang telah terpakai; lalu minta dua kode dan coba yang pertama.',
          'Uji penanda "ingat perangkat ini": dapatkah dipalsukan atau diperpanjang tanpa batas?',
          'Periksa jalur penegakan MFA: alur setel-ulang sandi, cadangan SMS-surel, tautan OAuth — sering tanpa MFA.',
          'Sondasi kondisi pacu: tembak pengiriman kode serentak untuk melihat ada yang lolos dari penghitung.'
        ],
        s: [
          'Lihat berapa digit kode verifikasinya dan berapa lama berlaku — 4 digit tanpa pembatas itu gampang dipecahkan.',
          'Coba pakai kode yang sudah dipakai — harus ditolak.',
          'Fitur "ingat perangkat ini" — bisanya dipalsukan?',
          'Cek jalur lain: reset password atau login lewat Google — masih minta MFA atau tidak?',
          'Kirim banyak kode bersamaan — kadang penghitungnya kecolongan.'
        ]
      },
      tools: ['Burp Suite', 'mobile authenticator app', 'turbo intruder (race tests)'],
      remediation: {
        en: 'Use 6+ digit codes with 30-60s lifetime, strict rate limits, single-use enforcement, MFA on every channel including recovery, and TOTP/authenticator apps over SMS.',
        t: 'Gunakan kode 6+ digit dengan masa hidup 30-60 detik, rate limit ketat, penegakan sekali pakai, MFA di setiap kanal termasuk pemulihan, dan aplikasi authenticator TOTP alih-alih SMS.',
        b: 'Gunakan kode 6 digit atau lebih dengan masa hidup 30-60 detik, pembatas laju yang ketat, penegakan sekali pakai, MFA pada setiap jalur termasuk pemulihan, serta aplikasi autentikator TOTP alih-alih SMS.',
        s: 'Kode minimal 6 digit, berlaku 30-60 detik, sekali pakai, ada pembatas percobaan. MFA wajib di semua jalur termasuk pemulihan. Pakai aplikasi authenticator, bukan SMS.'
      }
    }
  ]
});
