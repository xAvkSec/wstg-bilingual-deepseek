/* OWASP API Security Top 10 (2023) — condensed bilingual adaptation, CC BY-SA 4.0. */
window.WSTG_GUIDE_DATA = window.WSTG_GUIDE_DATA || {};
window.WSTG_GUIDE_DATA.apisec = [
  {
    order: 1,
    code: 'API',
    name_en: 'API Security Top 10 (2023)',
    desc_en: 'The ten most critical API security risks',
    name_id: {
      t: 'OWASP API Security Top 10 (2023)',
      b: 'Sepuluh Risiko Keamanan API Teratas OWASP (2023)',
      s: 'OWASP API Security Top 10 2023 — versi santai'
    },
    desc_id: {
      t: 'Sepuluh risiko keamanan API paling kritis',
      b: 'Sepuluh risiko keamanan API yang paling kritis',
      s: 'Daftar 10 bahaya API yang paling sering bikin aplikasi jebol'
    },
    tests: [
      {
        name_en: 'API1:2023 Broken Object Level Authorization',
        name_id: {
          t: 'API1:2023 Broken Object Level Authorization (BOLA)',
          b: 'API1:2023 Otorisasi Tingkat Objek yang Rusak (BOLA)',
          s: 'API1: Otorisasi Objek Bocor (BOLA)'
        },
        summary: {
          en: 'BOLA is the number-one API risk: the endpoint authenticates who is calling but never verifies that the requested object actually belongs to that caller. Any user can read or modify another user\'s records simply by swapping an object identifier.',
          t: 'BOLA adalah risiko API nomor satu: endpoint memverifikasi siapa yang memanggil tetapi tidak pernah memastikan objek yang diminta benar-benar milik pemanggil tersebut. Setiap user dapat membaca atau mengubah record user lain hanya dengan menukar identifier objek.',
          b: 'BOLA merupakan risiko API peringkat pertama: titik akhir (endpoint) memverifikasi siapa pemanggilnya, namun tidak pernah memastikan bahwa objek yang diminta memang milik pemanggil tersebut. Setiap pengguna dapat membaca atau mengubah data pengguna lain hanya dengan menukar pengenal (identifier) objek.',
          s: 'Ini dosa API paling umum sedunia. Server sudah cek "kamu siapa", tapi lupa cek "data ini punyamu atau bukan". Ganti angka ID di URL, keluar deh tagihan atau pesan orang lain.'
        },
        howto: {
          en: [
            'Log in as two accounts and capture a legitimate request: `curl -s -H "Authorization: Bearer $TA" https://api.target/v1/orders/123`.',
            'Replay it with account B\'s token but account A\'s object ID: `curl -s -H "Authorization: Bearer $TB" https://api.target/v1/orders/123`.',
            'If B receives A\'s order, BOLA is confirmed. Fuzz sequential and UUID identifiers in Burp Intruder to map the full exposure.'
          ],
          t: [
            'Login sebagai dua akun uji dan tangkap request yang sah: `curl -s -H "Authorization: Bearer $TA" https://api.target/v1/orders/123`.',
            'Ulangi dengan token akun B tetapi ID objek milik akun A: `curl -s -H "Authorization: Bearer $TB" https://api.target/v1/orders/123`.',
            'Jika B menerima order milik A, BOLA terkonfirmasi. Fuzz identifier sekuensial dan UUID di Burp Intruder untuk memetakan cakupan kebocoran.'
          ],
          b: [
            'Masuk sebagai dua akun uji lalu rekam permintaan yang sah: `curl -s -H "Authorization: Bearer $TA" https://api.target/v1/orders/123`.',
            'Kirim ulang memakai token akun B namun dengan pengenal objek milik akun A: `curl -s -H "Authorization: Bearer $TB" https://api.target/v1/orders/123`.',
            'Apabila B menerima pesanan milik A, BOLA terbukti. Lakukan uji masif atas pengenal berurutan dan UUID pada Burp Intruder guna memetakan luas kebocoran.'
          ],
          s: [
            'Bikin dua akun, A dan B. Rekam permintaan normal pakai akun A: `curl -s -H "Authorization: Bearer $TA" https://api.target/v1/orders/123`.',
            'Sekarang pakai token B tapi ID-nya biarkan 123: `curl -s -H "Authorization: Bearer $TB" https://api.target/v1/orders/123`.',
            'Kalau B malah kebagian data A, berarti bocor. Coba ID lain berurutan pakai Burp Intruder, biasanya sekali tarikan langsung kelihatan semua.'
          ]
        },
        tools: ['curl', 'Burp Suite', 'Autorize', 'Postman'],
        remediation: {
          en: 'Enforce object-level authorization on every request using the identity in the session, never a client-supplied ID; prefer unguessable UUIDs and add regression tests that swap identifiers between accounts.',
          t: 'Terapkan object-level authorization di setiap request berbasis identitas pada sesi, bukan ID yang dikirim client; gunakan UUID yang sulit ditebak dan tambahkan regression test yang menukar identifier antar akun.',
          b: 'Tegakkan otorisasi tingkat objek pada setiap permintaan dengan bersandar pada identitas di dalam sesi, bukan pengenal yang dikirim klien; utamakan UUID yang sukar diduga dan tambahkan uji regresi yang saling menukar pengenal antar akun.',
          s: 'Jangan percaya ID dari klien. Cek selalu: objek ini punya siapa? Kalau bukan milik yang login, tolak. Pakai ID acak (UUID) biar nggak gampang ditembak.'
        }
      },
      {
        name_en: 'API2:2023 Broken Authentication',
        name_id: {
          t: 'API2:2023 Broken Authentication',
          b: 'API2:2023 Autentikasi yang Rusak',
          s: 'API2: Login-nya Gampang Dibobol'
        },
        summary: {
          en: 'Authentication is broken when the login, token, or account-recovery flow can be defeated: weak credentials with no lockout, JWTs signed with a guessable secret or `alg:none`, OTPs that never expire, and reset tokens that leak the account.',
          t: 'Authentication rusak ketika alur login, token, atau pemulihan akun bisa ditumbangkan: kredensial lemah tanpa lockout, JWT dengan secret yang bisa ditebak atau `alg:none`, OTP tanpa kedaluwarsa, dan reset token yang membocorkan akun.',
          b: 'Autentikasi dinyatakan rusak tatkala alur masuk, token, atau pemulihan akun dapat dijatuhkan: kredensial lemah tanpa pembatasan, JWT bertanda tangan rahasia yang mudah diduga atau `alg:none`, OTP yang tak kunjung kedaluwarsa, serta token pemulihan yang membocorkan akun.',
          s: 'Ini soal pintu masuk. Kalau login bisa dibejek, tokennya lemah, atau OTP-nya nggak pernah mati, penyerang tinggal jalan masuk tanpa kunci.'
        },
        howto: {
          en: [
            'Capture the login/token response and decode the JWT; check the algorithm, expiry, and whether a trivial secret validates it.',
            'Test credential stuffing without lockout: `ffuf -u https://api.target/v1/login -X POST -d "user=admin&pass=FUZZ" -w rockyou.txt -mc 200`.',
            'Probe password reset, OTP, and MFA for reusable tokens, user enumeration, and missing rate limits.'
          ],
          t: [
            'Tangkap respons login/token lalu decode JWT; periksa algoritma, expiry, dan apakah secret sepele bisa memvalidasinya.',
            'Uji credential stuffing tanpa lockout: `ffuf -u https://api.target/v1/login -X POST -d "user=admin&pass=FUZZ" -w rockyou.txt -mc 200`.',
            'Uji alur password reset, OTP, dan MFA terhadap token yang dapat dipakai ulang, user enumeration, dan rate limit yang absen.'
          ],
          b: [
            'Rekam tanggapan masuk/token lalu urai JWT; periksa algoritme, masa kedaluwarsa, dan apakah rahasia sepele sanggup memvalidasinya.',
            'Uji pengisian kredensial tanpa pembatasan: `ffuf -u https://api.target/v1/login -X POST -d "user=admin&pass=FUZZ" -w rockyou.txt -mc 200`.',
            'Uji alur penyetelan ulang kata sandi, OTP, dan MFA terhadap token yang dapat dipakai berulang, pencacahan pengguna, serta ketiadaan pembatasan laju.'
          ],
          s: [
            'Lihat balasan login dan intip tokennya (JWT) di jwt.io; cek algoritmanya, kapan kadaluarsa, dan apakah kuncinya lemah.',
            'Coba tebak password tanpa henti: `ffuf -u https://api.target/v1/login -X POST -d "user=admin&pass=FUZZ" -w rockyou.txt -mc 200`.',
            'Jangan lupa alur lupa-password, OTP, dan MFA. Sering di situ token bisa dipakai dua kali atau malah ngasih tahu email mana yang terdaftar.'
          ]
        },
        tools: ['ffuf', 'curl', 'hashcat', 'jwt_tool', 'Burp Suite'],
        remediation: {
          en: 'Require strong credentials with MFA, rate-limit and lock out repeated failures, sign tokens with a long random secret and a strict algorithm, and make reset/OTP tokens single-use and short-lived.',
          t: 'Wajibkan kredensial kuat dengan MFA, terapkan rate limit serta lockout pada kegagalan berulang, tanda tangani token dengan secret acak panjang dan algoritma ketat, serta buat reset token/OTP sekali pakai dan berumur pendek.',
          b: 'Wajibkan kredensial yang kuat disertai MFA, terapkan pembatasan laju dan penguncian atas kegagalan berulang, tanda tangani token dengan rahasia acak yang panjang dan algoritme ketat, serta jadikan token pemulihan/OTP sekali pakai dan berumur pendek.',
          s: 'Pakai MFA, batasi percobaan login, dan pakai kunci token yang panjang dan acak. Token reset dan OTP harus sekali pakai dan cepat mati.'
        }
      },
      {
        name_en: 'API3:2023 Broken Object Property Level Authorization',
        name_id: {
          t: 'API3:2023 Broken Object Property Level Authorization',
          b: 'API3:2023 Otorisasi Tingkat Properti Objek yang Rusak',
          s: 'API3: Data Berlebih & Mass Assignment'
        },
        summary: {
          en: 'This combines mass assignment and excessive data exposure: the API returns properties the caller should not see, or it blindly binds request fields to the object and lets clients set protected properties like `role`, `balance`, or `isVerified`.',
          t: 'Ini menggabungkan mass assignment dan excessive data exposure: API mengembalikan properti yang seharusnya tidak dilihat pemanggil, atau membiarkan field request terikat langsung ke objek sehingga client bisa mengeset properti terlindungi seperti `role`, `balance`, atau `isVerified`.',
          b: 'Ini memadukan mass assignment dan pemaparan data berlebihan: API menyodorkan properti yang semestinya tak boleh disimak pemanggil, atau membiarkan medan permintaan terikat begitu saja pada objek sehingga klien dapat menetapkan properti terlindungi seperti `role`, `balance`, atau `isVerified`.',
          s: 'Dua masalah sekaligus: respons API kebanyakan ngasih data yang nggak perlu (password hash, saldo), dan input-nya ditelan mentah-mentah, jadi kita bisa ikut nyisipkan `"role":"admin"` lalu berubah jadi admin.'
        },
        howto: {
          en: [
            'Dump a response and list every field the API returns: `curl -s -H "Authorization: Bearer $T" https://api.target/v1/users/me | jq`.',
            'PATCH extra privileged properties and see if they stick: `curl -s -X PATCH -H "Authorization: Bearer $T" -H "Content-Type: application/json" -d "{\"role\":\"admin\",\"isVerified\":true}" https://api.target/v1/users/me`.',
            'Repeat with hidden fields from other endpoints (balance, ownerId, internal flags) and re-read the object to confirm persistence.'
          ],
          t: [
            'Dump respons dan daftar semua field yang dikembalikan API: `curl -s -H "Authorization: Bearer $T" https://api.target/v1/users/me | jq`.',
            'PATCH properti privileged tambahan dan cek apakah tersimpan: `curl -s -X PATCH -H "Authorization: Bearer $T" -H "Content-Type: application/json" -d "{\"role\":\"admin\",\"isVerified\":true}" https://api.target/v1/users/me`.',
            'Ulangi dengan field tersembunyi dari endpoint lain (balance, ownerId, flag internal), lalu baca ulang objek untuk memastikan persistensi.'
          ],
          b: [
            'Tampilkan tanggapan lalu daftar seluruh medan yang dikembalikan API: `curl -s -H "Authorization: Bearer $T" https://api.target/v1/users/me | jq`.',
            'Kirim PATCH berisi properti berhak istimewa tambahan dan periksa apakah tersimpan: `curl -s -X PATCH -H "Authorization: Bearer $T" -H "Content-Type: application/json" -d "{\"role\":\"admin\",\"isVerified\":true}" https://api.target/v1/users/me`.',
            'Ulangi dengan medan tersembunyi dari titik akhir lain (balance, ownerId, penanda internal), lalu baca kembali objek untuk memastikan datanya melekat.'
          ],
          s: [
            'Intip responsnya, catat semua field yang dikasih: `curl -s -H "Authorization: Bearer $T" https://api.target/v1/users/me | jq`.',
            'Coba selundupkan properti rahasia: `curl -s -X PATCH -H "Authorization: Bearer $T" -H "Content-Type: application/json" -d "{\"role\":\"admin\",\"isVerified\":true}" https://api.target/v1/users/me`.',
            'Kalau berhasil, coba field lain yang kamu lihat di endpoint lain (saldo, pemilik, flag internal), lalu buka lagi datanya. Kalau nyangkut, berarti bolong.'
          ]
        },
        tools: ['curl', 'Burp Suite', 'Postman', 'jq'],
        remediation: {
          en: 'Return only the properties each role needs with response schemas, and whitelist bindable input fields explicitly instead of mass-assigning the whole payload.',
          t: 'Kembalikan hanya properti yang dibutuhkan tiap role lewat response schema, dan whitelist field input yang boleh di-bind secara eksplisit alih-alih mass-assign seluruh payload.',
          b: 'Kembalikan hanya properti yang diperlukan setiap peran melalui skema tanggapan, dan daftarkan secara eksplisit medan masukan yang boleh terikat, bukannya menelan seluruh muatan mentah-mentah.',
          s: 'Kirim cuma field yang memang perlu. Untuk input, tentukan daftar field yang boleh diubah, sisanya tolak. Jangan biarkan semua kolom bisa diset dari luar.'
        }
      },
      {
        name_en: 'API4:2023 Unrestricted Resource Consumption',
        name_id: {
          t: 'API4:2023 Unrestricted Resource Consumption',
          b: 'API4:2023 Konsumsi Sumber Daya yang Tak Terbatas',
          s: 'API4: Borong Server Sampai Tumbang'
        },
        summary: {
          en: 'The API accepts requests that consume far more CPU, memory, bandwidth, or money than intended: unbounded pagination, huge payloads, expensive queries, no rate limits, and third-party calls billed per use.',
          t: 'API menerima request yang mengonsumsi CPU, memori, bandwidth, atau biaya jauh melebihi batas: pagination tanpa batas, payload raksasa, query mahal, tanpa rate limit, dan panggilan pihak ketiga yang ditagih per penggunaan.',
          b: 'API menerima permintaan yang mengonsumsi CPU, memori, lebar pita, atau biaya jauh melampaui batas: penomoran halaman tanpa batas, muatan raksasa, kueri mahal, ketiadaan pembatasan laju, dan panggilan pihak ketiga yang ditagih per pemakaian.',
          s: 'API-nya kalau diminta 1 juta data ya dikasih 1 juta data. Kita bisa bikin server target ngos-ngosan, atau bikin tagihan cloud mereka membengkak, cuma dengan beberapa permintaan nakal.'
        },
        howto: {
          en: [
            'Ask for an absurd page size and watch memory and latency: `curl -s -H "Authorization: Bearer $T" "https://api.target/v1/items?limit=1000000"`.',
            'Flood an expensive endpoint in parallel: `seq 1 200 | xargs -P50 -I{} curl -s -o /dev/null -H "Authorization: Bearer $T" "https://api.target/v1/search?q=a"`.',
            'Try oversized JSON, deeply nested inputs, and costly regex or GraphQL batch queries to see which quotas are missing.'
          ],
          t: [
            'Minta page size ekstrem dan pantau memori serta latensi: `curl -s -H "Authorization: Bearer $T" "https://api.target/v1/items?limit=1000000"`.',
            'Banjiri endpoint mahal secara paralel: `seq 1 200 | xargs -P50 -I{} curl -s -o /dev/null -H "Authorization: Bearer $T" "https://api.target/v1/search?q=a"`.',
            'Uji JSON berukuran raksasa, input sangat bersarang, serta regex mahal atau batch query GraphQL untuk melihat kuota mana yang absen.'
          ],
          b: [
            'Minta ukuran halaman yang keterlaluan dan amati memori serta kelambanan: `curl -s -H "Authorization: Bearer $T" "https://api.target/v1/items?limit=1000000"`.',
            'Banjiri titik akhir mahal secara serentak: `seq 1 200 | xargs -P50 -I{} curl -s -o /dev/null -H "Authorization: Bearer $T" "https://api.target/v1/search?q=a"`.',
            'Cobalah JSON berukuran raksasa, masukan bersarang dalam, serta regex mahal atau kueri batch GraphQL untuk melihat kuota mana yang belum ada.'
          ],
          s: [
            'Minta data sebanyak mungkin: `curl -s -H "Authorization: Bearer $T" "https://api.target/v1/items?limit=1000000"`. Kalau lancar, server mereka nggak punya batas.',
            'Lalu tembak barengan: `seq 1 200 | xargs -P50 -I{} curl -s -o /dev/null -H "Authorization: Bearer $T" "https://api.target/v1/search?q=a"`.',
            'Terakhir coba input gede atau query mahal (regex berat, batch GraphQL). Kita mau lihat mana yang nggak ada remnya.'
          ]
        },
        tools: ['curl', 'ffuf', 'hey', 'Burp Suite'],
        remediation: {
          en: 'Cap page sizes and payloads, add per-user rate limits and timeouts, use cost budgets for third parties, and constrain expensive queries before execution.',
          t: 'Batasi page size dan payload, tambahkan rate limit per user serta timeout, terapkan cost budget untuk pihak ketiga, dan batasi query mahal sebelum dieksekusi.',
          b: 'Batasi ukuran halaman dan muatan, tambahkan pembatasan laju per pengguna beserta tenggat waktu, terapkan anggaran biaya bagi pihak ketiga, dan kendalikan kueri mahal sebelum dijalankan.',
          s: 'Kasih batas: maksimal berapa data per halaman, maksimal berapa permintaan per menit, dan timeout. Query berat dicek dulu sebelum jalan.'
        }
      },
      {
        name_en: 'API5:2023 Broken Function Level Authorization',
        name_id: {
          t: 'API5:2023 Broken Function Level Authorization',
          b: 'API5:2023 Otorisasi Tingkat Fungsi yang Rusak',
          s: 'API5: Endpoint Admin Kebuka Bebas'
        },
        summary: {
          en: 'BFLA means an ordinary user can invoke administrative or privileged functions. The gateway hides the admin UI but the API route still accepts low-privilege tokens, wrong HTTP methods, or forged role headers.',
          t: 'BFLA berarti user biasa bisa memanggil fungsi administratif atau privileged. Gateway menyembunyikan UI admin tetapi route API tetap menerima token low-privilege, HTTP method yang salah, atau header role palsu.',
          b: 'BFLA bermakna pengguna biasa sanggup memanggil fungsi administratif atau berhak istimewa. Gerbang (gateway) memang menyembunyikan antarmuka admin, namun rute API tetap menerima token berhak rendah, metode HTTP yang keliru, atau tajuk peran palsu.',
          s: 'Tampilan admin disembunyikan, tapi alamat API-nya masih hidup. Kita tinggal panggil pakai akun biasa, kadang malah berhasil. Ini namanya BFLA, sepupu BOLA tapi soal fungsi, bukan data.'
        },
        howto: {
          en: [
            'Enumerate privileged routes with a low-privilege token: `/v1/admin/users`, `/v1/internal/metrics`, `/v1/users/123/role`.',
            'Swap the HTTP method, since a blocked GET may hide an open DELETE: `curl -s -X DELETE -H "Authorization: Bearer $TU" https://api.target/v1/admin/users/9`.',
            'Try role headers and path tricks (`X-User-Role: admin`, `/admin/`, `/..;/admin`, `X-Original-URL`) to slip past gateway rules.'
          ],
          t: [
            'Enumerasi route privileged dengan token low-privilege: `/v1/admin/users`, `/v1/internal/metrics`, `/v1/users/123/role`.',
            'Tukar HTTP method, karena GET yang diblokir bisa menyembunyikan DELETE yang terbuka: `curl -s -X DELETE -H "Authorization: Bearer $TU" https://api.target/v1/admin/users/9`.',
            'Coba header role dan trik path (`X-User-Role: admin`, `/admin/`, `/..;/admin`, `X-Original-URL`) untuk melewati aturan gateway.'
          ],
          b: [
            'Cacah rute berhak istimewa memakai token berhak rendah: `/v1/admin/users`, `/v1/internal/metrics`, `/v1/users/123/role`.',
            'Tukar metode HTTP, sebab GET yang terblokir bisa menyembunyikan DELETE yang terbuka: `curl -s -X DELETE -H "Authorization: Bearer $TU" https://api.target/v1/admin/users/9`.',
            'Cobalah tajuk peran dan tipu daya jalur (`X-User-Role: admin`, `/admin/`, `/..;/admin`, `X-Original-URL`) untuk menyusup melewati aturan gerbang.'
          ],
          s: [
            'Coba alamat khusus admin pakai akun biasa: `/v1/admin/users`, `/v1/internal/metrics`, `/v1/users/123/role`.',
            'Kadang GET diblokir tapi method lain lolos: `curl -s -X DELETE -H "Authorization: Bearer $TU" https://api.target/v1/admin/users/9`.',
            'Kalau masih ditolak, akali lewat header atau alamat aneh (`X-User-Role: admin`, `/admin/`, `/..;/admin`). Gateway kadang ketipu.'
          ]
        },
        tools: ['curl', 'Burp Suite', 'ffuf', 'Autorize'],
        remediation: {
          en: 'Deny by default and check function-level permissions on the server for every route and HTTP method, not in the UI or at the gateway alone; centralize role checks so new endpoints inherit them.',
          t: 'Terapkan deny by default dan periksa permission function-level di server untuk setiap route dan HTTP method, bukan hanya di UI atau gateway; sentralisasi pengecekan role agar endpoint baru otomatis mewarisinya.',
          b: 'Terapkan tolak secara bawaan (deny by default) dan periksa izin tingkat fungsi di peladen untuk setiap rute dan metode HTTP, bukan sekadar di antarmuka atau gerbang; pusatkan pemeriksaan peran agar titik akhir baru otomatis mewarisinya.',
          s: 'Aturan default: tolak. Cek izin di server untuk tiap alamat dan tiap method. Jangan cuma sembunyikan tombol admin di tampilan. Simpan logika perizinan di satu tempat.'
        }
      },
      {
        name_en: 'API6:2023 Unrestricted Access to Sensitive Business Flows',
        name_id: {
          t: 'API6:2023 Unrestricted Access to Sensitive Business Flows',
          b: 'API6:2023 Akses Tak Terbatas pada Alur Bisnis Sensitif',
          s: 'API6: Alur Bisnis Disalahgunakan Bot'
        },
        summary: {
          en: 'Some endpoints are not technically broken but harm the business when automated: scalping limited stock, mass-creating accounts, spamming comments, or repeatedly claiming a one-time promo. The flaw is the absence of anti-automation.',
          t: 'Sebagian endpoint secara teknis tidak rusak tetapi merugikan bisnis saat diotomatisasi: memborong stok terbatas, membuat akun massal, spam komentar, atau mengklaim promo sekali pakai berulang kali. Celahnya adalah absennya anti-automation.',
          b: 'Sebagian titik akhir secara teknis tidaklah cacat, tetapi merugikan usaha tatkala diotomatiskan: memborong stok terbatas, membuat akun secara massal, menyemprotkan komentar, atau mengklaim promo sekali pakai berulang-ulang. Cela terletak pada ketiadaan penangkal otomatisasi.',
          s: 'API-nya jalan normal, tapi dipakai bot jadi masalah. Contoh: bot beli semua tiket konser, spam komentar, atau klaim kupon sekali pakai sampai ratusan kali. Bukan bug kode, tapi bug kontrol.'
        },
        howto: {
          en: [
            'Map business-critical flows (checkout, booking, promo redemption, referral) and capture each request exactly.',
            'Automate the flow far beyond human speed and watch for abuse controls: `for i in $(seq 1 100); do curl -s -X POST -H "Authorization: Bearer $T" -d "coupon=WELCOME10" https://api.target/v1/coupons/redeem; done`.',
            'Check for missing CAPTCHA, device fingerprinting, per-user/per-IP quotas, and velocity checks on the sensitive step.'
          ],
          t: [
            'Petakan alur bisnis kritis (checkout, booking, penukaran promo, referral) dan tangkap setiap request secara persis.',
            'Otomatiskan alur jauh melampaui kecepatan manusia dan amati kontrol penyalahgunaan: `for i in $(seq 1 100); do curl -s -X POST -H "Authorization: Bearer $T" -d "coupon=WELCOME10" https://api.target/v1/coupons/redeem; done`.',
            'Periksa absennya CAPTCHA, device fingerprinting, kuota per user/per IP, dan velocity check pada langkah sensitif tersebut.'
          ],
          b: [
            'Petakan alur usaha yang kritis (kasir, pemesanan, penukaran promo, rujukan) dan rekam tiap permintaan secara persis.',
            'Otomatiskan alur itu jauh melampaui kecepatan manusia dan amati kendali penyalahgunaannya: `for i in $(seq 1 100); do curl -s -X POST -H "Authorization: Bearer $T" -d "coupon=WELCOME10" https://api.target/v1/coupons/redeem; done`.',
            'Periksa ketiadaan CAPTCHA, sidik jari perangkat, kuota per pengguna/per IP, serta pemeriksaan kecepatan pada langkah sensitif tersebut.'
          ],
          s: [
            'Cari alur yang penting buat bisnis: bayar, pesan tiket, klaim kupon, undang teman. Rekam tiap langkahnya.',
            'Lalu jalankan pakai script secepat mungkin, jauh lebih cepat dari manusia: `for i in $(seq 1 100); do curl -s -X POST -H "Authorization: Bearer $T" -d "coupon=WELCOME10" https://api.target/v1/coupons/redeem; done`.',
            'Kalau nggak ada CAPTCHA, batas per akun, atau batas per IP, berarti bot bisa semaunya. Bot itu musuh alur bisnis.'
          ]
        },
        tools: ['curl', 'Burp Suite', 'ffuf', 'Python requests'],
        remediation: {
          en: 'Add business-aware controls: anti-automation such as CAPTCHA or device proof, per-account and per-device quotas, velocity and anomaly detection, and friction on high-risk steps.',
          t: 'Tambahkan kontrol yang sadar bisnis: anti-automation seperti CAPTCHA atau device proof, kuota per akun dan per perangkat, deteksi velocity dan anomali, serta friksi pada langkah berisiko tinggi.',
          b: 'Tambahkan kendali yang memahami konteks usaha: penangkal otomatisasi semacam CAPTCHA atau bukti perangkat, kuota per akun dan per perangkat, deteksi kecepatan serta anomali, dan gesekan pada langkah berisiko tinggi.',
          s: 'Pasang penghalang buat bot: CAPTCHA, batas per akun dan per perangkat, deteksi gerak-gerik aneh, dan langkah tambahan (misal konfirmasi) di momen paling rawan.'
        }
      },
      {
        name_en: 'API7:2023 Server Side Request Forgery',
        name_id: {
          t: 'API7:2023 Server Side Request Forgery (SSRF)',
          b: 'API7:2023 Pemalsuan Permintaan Sisi Peladen (SSRF)',
          s: 'API7: Server Disuruh Nembak Dirinya Sendiri'
        },
        summary: {
          en: 'SSRF happens when the API fetches a URL supplied by the client without validating the destination, letting an attacker reach internal services, cloud metadata, or firewalls from inside the trusted network.',
          t: 'SSRF terjadi ketika API mengambil URL yang diberikan client tanpa memvalidasi tujuannya, sehingga penyerang dapat menjangkau layanan internal, metadata cloud, atau firewall dari dalam jaringan tepercaya.',
          b: 'SSRF terjadi tatkala API mengambil URL yang disodorkan klien tanpa memvalidasi tujuannya, sehingga penyerang mampu menjangkau layanan internal, metadata awan, atau tembok api dari dalam jaringan tepercaya.',
          s: 'Bayangkan server kita kita suruh "ambilkan gambar dari alamat ini". Kalau alamatnya kita isi `169.254.169.254`, server malah ngambil data rahasia milik dirinya sendiri. Kita jadi bisa intip dapur dari dalam.'
        },
        howto: {
          en: [
            'Find parameters that fetch remote content: webhook URLs, avatar-from-URL, image importers, and PDF generators.',
            'Point them at internal targets and cloud metadata: `curl -s -X POST -H "Content-Type: application/json" -d "{\"url\":\"http://169.254.169.254/latest/meta-data/\"}" https://api.target/v1/webhooks`.',
            'Bypass naive allowlists with decimal/octal IPs, `@` tricks, redirects, and DNS rebinding; confirm blind SSRF with an out-of-band listener.'
          ],
          t: [
            'Temukan parameter yang mengambil konten remote: URL webhook, avatar-from-URL, image importer, dan PDF generator.',
            'Arahkan ke target internal dan metadata cloud: `curl -s -X POST -H "Content-Type: application/json" -d "{\"url\":\"http://169.254.169.254/latest/meta-data/\"}" https://api.target/v1/webhooks`.',
            'Bypass allowlist naif dengan IP desimal/oktal, trik `@`, redirect, dan DNS rebinding; konfirmasi blind SSRF dengan listener out-of-band.'
          ],
          b: [
            'Temukan parameter yang mengambil isi dari jarak jauh: URL webhook, avatar-dari-URL, pengimpor gambar, dan pembuat PDF.',
            'Arahkan ke sasaran internal dan metadata awan: `curl -s -X POST -H "Content-Type: application/json" -d "{\"url\":\"http://169.254.169.254/latest/meta-data/\"}" https://api.target/v1/webhooks`.',
            'Lampaui daftar izin yang naif dengan IP desimal/oktal, akal-akalan `@`, pengalihan, dan DNS rebinding; pastikan blind SSRF lewat penyimak luar jaringan.'
          ],
          s: [
            'Cari kolom yang isinya alamat buat diambil server: URL webhook, avatar dari URL, impor gambar, atau pembuat PDF.',
            'Isi dengan alamat dalam: `curl -s -X POST -H "Content-Type: application/json" -d "{\"url\":\"http://169.254.169.254/latest/meta-data/\"}" https://api.target/v1/webhooks`. Kalau balik data, kita tembus.',
            'Kalau diblokir, akali: IP desimal, trik `@`, redirect, atau DNS rebinding. Untuk kasus buta, pasang listener (interactsh) biar kelihatan.'
          ]
        },
        tools: ['Burp Suite', 'curl', 'interactsh', 'SSRFmap'],
        remediation: {
          en: 'Treat client URLs as untrusted: enforce an allowlist of destinations, resolve and validate the IP, block link-local and metadata ranges, disable redirects, and route outbound fetches through a hardened proxy.',
          t: 'Perlakukan URL dari client sebagai tidak tepercaya: terapkan allowlist tujuan, resolusi dan validasi IP, blokir link-local serta rentang metadata, nonaktifkan redirect, dan lewatkan fetch keluar via proxy yang diperketat.',
          b: 'Perlakukan URL dari klien sebagai tidak tepercaya: terapkan daftar izin tujuan, resolusi dan validasi IP, blokir rentang link-local dan metadata, matikan pengalihan, serta salurkan pengambilan keluar melalui proksi yang diperketat.',
          s: 'Jangan langsung percaya URL dari pengguna. Batasi hanya alamat tertentu, cek IP-nya, tutup akses ke `169.254.169.254` dan jaringan internal, dan matikan redirect.'
        }
      },
      {
        name_en: 'API8:2023 Security Misconfiguration',
        name_id: {
          t: 'API8:2023 Security Misconfiguration',
          b: 'API8:2023 Salah Konfigurasi Keamanan',
          s: 'API8: Setup-nya Salah Setelan'
        },
        summary: {
          en: 'Misconfiguration covers missing security headers, permissive CORS, verbose stack traces, default credentials, exposed debug endpoints, weak TLS, and unpatched components. None of it is a clever exploit; all of it is a door left open.',
          t: 'Misconfiguration mencakup header keamanan yang absen, CORS permisif, stack trace verbose, kredensial default, endpoint debug yang terekspos, TLS lemah, dan komponen tanpa patch. Tidak ada eksploit cerdas, hanya pintu yang dibiarkan terbuka.',
          b: 'Salah konfigurasi mencakup ketiadaan tajuk keamanan, CORS yang permisif, jejak tumpukan yang berlebihan, kredensial bawaan, titik akhir debug yang terpapar, TLS lemah, dan komponen tanpa pemutakhiran. Tiada eksploitasi cerdik di sini, semata pintu yang dibiarkan terbuka.',
          s: 'Ini soal setelan yang lupa dirapikan. Header keamanan nggak dipasang, CORS terlalu bebas, error nampilin isi kode, akun default masih aktif. Bukan retas pintar, cuma pintunya nggak dikunci.'
        },
        howto: {
          en: [
            'Inspect headers and CORS with an attacker origin: `curl -sI -H "Origin: https://evil.test" https://api.target/v1/` and read `Access-Control-Allow-Origin` and `-Credentials`.',
            'Trigger errors to harvest stack traces and framework details, then probe common leftovers: `/.env`, `/debug`, `/actuator`, `/swagger`.',
            'Run configuration scanners: `nuclei -t misconfiguration/ -u https://api.target` and `testssl.sh https://api.target`.'
          ],
          t: [
            'Periksa header dan CORS dengan origin penyerang: `curl -sI -H "Origin: https://evil.test" https://api.target/v1/` lalu baca `Access-Control-Allow-Origin` dan `-Credentials`.',
            'Picu error untuk memanen stack trace dan detail framework, lalu uji sisa-sisa umum: `/.env`, `/debug`, `/actuator`, `/swagger`.',
            'Jalankan pemindai konfigurasi: `nuclei -t misconfiguration/ -u https://api.target` dan `testssl.sh https://api.target`.'
          ],
          b: [
            'Tilik tajuk dan CORS dengan asal penyerang: `curl -sI -H "Origin: https://evil.test" https://api.target/v1/` lalu baca `Access-Control-Allow-Origin` beserta `-Credentials`.',
            'Picu galat untuk memanen jejak tumpukan dan rincian kerangka kerja, lalu uji sisa-sisa lazim: `/.env`, `/debug`, `/actuator`, `/swagger`.',
            'Jalankan pemindai konfigurasi: `nuclei -t misconfiguration/ -u https://api.target` dan `testssl.sh https://api.target`.'
          ],
          s: [
            'Cek header dan CORS pakai asal jahat: `curl -sI -H "Origin: https://evil.test" https://api.target/v1/`. Kalau `Access-Control-Allow-Origin` balas domain itu, bahaya.',
            'Bikin error muncul, biasanya bocor nama framework dan isi kode. Lalu coba alamat sisa: `/.env`, `/debug`, `/actuator`, `/swagger`.',
            'Terakhir scan otomatis: `nuclei -t misconfiguration/ -u https://api.target` dan `testssl.sh https://api.target`. Ribet? Nggak, tinggal jalanin.'
          ]
        },
        tools: ['nuclei', 'curl', 'testssl.sh', 'ffuf', 'Burp Suite'],
        remediation: {
          en: 'Harden on a repeatable baseline: set strict security headers and CORS, turn off debug and directory listing in production, rotate default credentials, keep software patched, and scan configuration in CI.',
          t: 'Perketat dengan baseline yang dapat diulang: set security header dan CORS secara ketat, matikan debug serta directory listing di production, putar kredensial default, jaga patch software, dan pindai konfigurasi di CI.',
          b: 'Perketat dengan acuan yang dapat diulang: tetapkan tajuk keamanan dan CORS secara ketat, matikan debug serta penampilan daftar direktori di produksi, ganti kredensial bawaan, jaga pemutakhiran perangkat lunak, dan pindai konfigurasi pada CI.',
          s: 'Rapikan setelan sekali, lalu pakai acuan yang sama tiap deploy: header wajib, CORS ketat, debug dimatikan, akun default diganti, dan software selalu di-update.'
        }
      },
      {
        name_en: 'API9:2023 Improper Inventory Management',
        name_id: {
          t: 'API9:2023 Improper Inventory Management',
          b: 'API9:2023 Pengelolaan Inventaris yang Tidak Tepat',
          s: 'API9: Versi Lama & Endpoint Terlantar'
        },
        summary: {
          en: 'Old, shadow, and zombie API versions keep running long after the docs moved on: `/v1` still accepts tokens that `/v3` rejects, staging hosts share production data, and undocumented endpoints have no owner and no patch.',
          t: 'Versi API lama, shadow, dan zombie tetap hidup jauh setelah dokumentasi berpindah: `/v1` masih menerima token yang ditolak `/v3`, host staging berbagi data produksi, dan endpoint tak terdokumentasi tidak punya pemilik maupun patch.',
          b: 'Versi API lama, bayangan, dan zombi tetap berjalan lama sesudah dokumentasi berpindah: `/v1` masih menerima token yang ditolak `/v3`, host staging berbagi data produksi, dan titik akhir tak terdokumentasi tak berpemilik sekaligus tak terpulihkan.',
          s: 'API itu kayak gudang: versi lama nggak pernah dibuang. `/v2` sudah pensiun tapi masih nyala, alamat staging masih nyambung ke data asli. Ini pintu belakang yang semua orang lupa.'
        },
        howto: {
          en: [
            'Enumerate versions and hosts: `/v1/`, `/v2/`, `/v3/`, plus `api-internal.target` and `staging-api.target`.',
            'Diff the documented surface against the live one: parse `openapi.json` and fuzz the paths with `ffuf -w endpoints.txt -u https://api.target/FUZZ`.',
            'Compare auth and patches across versions: `curl -s https://api.target/v1/users/123` versus the same call on `/v3/`.'
          ],
          t: [
            'Enumerasi versi dan host: `/v1/`, `/v2/`, `/v3/`, ditambah `api-internal.target` dan `staging-api.target`.',
            'Bandingkan surface terdokumentasi dengan yang live: parse `openapi.json` dan fuzz path dengan `ffuf -w endpoints.txt -u https://api.target/FUZZ`.',
            'Bandingkan autentikasi dan patch antar versi: `curl -s https://api.target/v1/users/123` versus panggilan sama di `/v3/`.'
          ],
          b: [
            'Cacah versi dan host: `/v1/`, `/v2/`, `/v3/`, ditambah `api-internal.target` dan `staging-api.target`.',
            'Bandingkan permukaan terdokumentasi dengan yang hidup: uraikan `openapi.json` lalu fuzz jalurnya dengan `ffuf -w endpoints.txt -u https://api.target/FUZZ`.',
            'Bandingkan autentikasi dan pemutakhiran antar versi: `curl -s https://api.target/v1/users/123` dengan panggilan serupa di `/v3/`.'
          ],
          s: [
            'Coba semua versi dan nama host: `/v1/`, `/v2/`, `/v3/`, `api-internal.target`, `staging-api.target`.',
            'Bandingkan yang ada di dokumentasi dengan yang benar-benar nyala: urai `openapi.json`, lalu tembak jalur tersembunyi pakai `ffuf -w endpoints.txt -u https://api.target/FUZZ`.',
            'Tes apakah versi lama masih percaya token lama: `curl -s https://api.target/v1/users/123`. Kalau v1 masih hidup, itu pintu lama yang lupa ditutup.'
          ]
        },
        tools: ['ffuf', 'Burp Suite', 'openapi-diff', 'nuclei'],
        remediation: {
          en: 'Maintain a live inventory of every API version and host, retire deprecated versions with a formal lifecycle, separate environments and data, and require documentation and an owner before anything ships.',
          t: 'Pelajari inventaris hidup untuk setiap versi dan host API, pensiunkan versi deprecated dengan life cycle formal, pisahkan environment dan data, serta wajibkan dokumentasi dan owner sebelum apa pun dirilis.',
          b: 'Pelihara inventaris hidup atas setiap versi dan host API, pensiunkan versi usang melalui daur hidup yang formal, pisahkan lingkungan dan datanya, serta wajibkan dokumentasi dan penanggung jawab sebelum apa pun dirilis.',
          s: 'Catat semua API yang hidup, pensiunkan versi lama dengan rapi, pisahkan data uji dan data asli, dan jangan rilis apa pun tanpa ada yang bertanggung jawab.'
        }
      },
      {
        name_en: 'API10:2023 Unsafe Consumption of APIs',
        name_id: {
          t: 'API10:2023 Unsafe Consumption of APIs',
          b: 'API10:2023 Konsumsi API yang Tidak Aman',
          s: 'API10: Jangan Telan Mentah API Orang Lain'
        },
        summary: {
          en: 'Developers trust third-party APIs more than user input, yet upstream responses are attacker-influenced too. Blindly deserializing, redirecting to, or querying with upstream data opens the door to injection and SSRF by proxy.',
          t: 'Developer lebih memercayai API pihak ketiga daripada input user, padahal respons upstream juga bisa dipengaruhi penyerang. Deserialisasi buta, redirect ke upstream, atau query dengan data upstream membuka jalan injection dan SSRF lewat perantara.',
          b: 'Pengembang lebih memercayai API pihak ketiga ketimbang masukan pengguna, padahal tanggapan hulu pun dapat dipengaruhi penyerang. Deserialisasi membabi buta, pengalihan ke hulu, atau kueri memakai data hulu membuka jalan injeksi dan SSRF melalui perantara.',
          s: 'Kita sering nggak curiga sama API orang lain. Padahal balasannya bisa saja kita telan mentah, misalnya langsung dimasukkan ke database. Kalau itu jahat, kita yang kena batunya.'
        },
        howto: {
          en: [
            'Identify every outbound third-party call (payment, geocoding, social login) and the data it later consumes.',
            'Poison the upstream response through an endpoint you control and see whether the app deserializes or trusts it blindly.',
            'Test TLS validation, timeouts, redirect following, and injection into downstream queries using third-party fields.'
          ],
          t: [
            'Identifikasi setiap panggilan pihak ketiga keluar (payment, geocoding, social login) dan data yang kemudian dikonsumsinya.',
            'Racuni respons upstream melalui endpoint yang Anda kendalikan dan lihat apakah aplikasi melakukan deserialisasi atau memercayainya mentah-mentah.',
            'Uji validasi TLS, timeout, pengikutan redirect, dan injection ke query downstream memakai field dari pihak ketiga.'
          ],
          b: [
            'Kenali setiap panggilan pihak ketiga ke luar (pembayaran, geokode, masuk sosial) beserta data yang kelak dikonsumsinya.',
            'Cemari tanggapan hulu melalui titik akhir yang Anda kendalikan dan periksa apakah aplikasi melakukan deserialisasi atau mempercayainya membabi buta.',
            'Uji validasi TLS, tenggat waktu, pengikutan pengalihan, dan injeksi ke kueri hilir memakai medan dari pihak ketiga.'
          ],
          s: [
            'Daftar semua API luar yang dipanggil aplikasi (bayar, peta, login sosial), lalu lihat datanya dipakai buat apa.',
            'Balas dengan data jelek dari server yang kita kontrol. Kalau aplikasi nelen mentah, berarti bahaya.',
            'Terakhir cek TLS, timeout, dan redirect-nya. Jangan sampai data dari luar langsung masuk ke query database tanpa disaring.'
          ]
        },
        tools: ['Burp Suite', 'mitmproxy', 'curl', 'interactsh'],
        remediation: {
          en: 'Apply the same rigor to upstream data as to user input: validate and sanitize responses, verify TLS, set timeouts and size limits, avoid following redirects blindly, and never deserialize untrusted payloads.',
          t: 'Terapkan ketelitian yang sama pada data upstream seperti pada input user: validasi dan sanitasi respons, verifikasi TLS, set timeout dan size limit, hindari mengikuti redirect secara buta, dan jangan pernah deserialisasi payload tak tepercaya.',
          b: 'Terapkan ketelitian serupa atas data hulu sebagaimana atas masukan pengguna: validasi dan bersihkan tanggapan, verifikasi TLS, tetapkan tenggat waktu dan batas ukuran, hindari mengikuti pengalihan membabi buta, serta jangan pernah mendeserialisasi muatan tak tepercaya.',
          s: 'Perlakukan API orang lain sama curiganya seperti input pengguna: saring balasannya, pasang TLS dan timeout, dan jangan telan data mentah-mentah ke sistem kita.'
        }
      }
    ]
  }
];
