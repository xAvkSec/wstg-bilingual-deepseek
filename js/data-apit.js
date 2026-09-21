/* WSTG Bilingual — 4.12 API Testing (5 tests)
   Condensed bilingual adaptation, CC BY-SA 4.0. Registers: t=Teknis, b=Baku, s=Sederhana. */
window.WSTG_DATA = window.WSTG_DATA || [];
window.WSTG_DATA.push({
  order: 12, code: 'APIT',
  name_en: 'API Testing',
  desc_en: 'BOLA, BFLA, data exposure & GraphQL',
  name_id: { t: 'Pengujian API', b: 'Pengujian API', s: 'Uji API-nya' },
  desc_id: { t: 'BOLA, BFLA, data exposure & GraphQL', b: 'BOLA, BFLA, paparan data & GraphQL', s: 'Cek pintu belakang aplikasi: API' },
  tests: [

    {
      name_en: 'API Reconnaissance',
      name_id: { t: 'API Reconnaissance', b: 'Pengintaian API', s: 'Peta Dulu API-nya' },
      summary: {
        en: 'Modern apps live on APIs — find the documentation, enumerate endpoints, and decode the tokens before testing anything. Discovering the full API surface (REST, SOAP, GraphQL) is the foundation for every BOLA, BFLA, and data exposure test that follows.',
        t: 'Aplikasi modern dibangun di atas API — temukan dokumentasinya, enumerasi endpoint, dan decode token sebelum menguji apa pun. Memetakan surface API lengkap (REST, SOAP, GraphQL) adalah fondasi untuk semua pengujian BOLA, BFLA, dan data exposure selanjutnya.',
        b: 'Aplikasi modern berdiri di atas API — temukan dokumentasinya, cacah endpoint, dan urai token sebelum menguji apa pun. Pemetaan permukaan API yang lengkap (REST, SOAP, GraphQL) menjadi landasan bagi seluruh pengujian BOLA, BFLA, dan paparan data selanjutnya.',
        s: 'API itu pintu belakang aplikasi — aplikasi mobile dan web sama-sama ngomong ke situ. Tugas kita dulu: nemuin semua alamat API-nya, baca menunya, baru mulai ngetes.'
      },
      howto: {
        en: [
          'Look for Swagger/OpenAPI documentation at common paths: `/swagger.json`, `/openapi.json`, `/api-docs`, `/swagger/`, `/graphql`.',
          'Crawl JavaScript bundles and mobile traffic for undocumented endpoints — `grep -o "api[^\"]*" app.js` reveals hidden routes.',
          'Decode JWT tokens from the Authorization header on jwt.io to inspect claims, roles, and expiry.',
          'Fuzz API versioning and naming patterns: `/api/v1/`, `/api/v2/`, `/api/internal/`, `/api/admin/`.',
          'Use mitmproxy on a mobile app to capture the full API conversation the UI never shows.'
        ],
        t: [
          'Cari dokumentasi Swagger/OpenAPI di path umum: `/swagger.json`, `/openapi.json`, `/api-docs`, `/swagger/`, `/graphql`.',
          'Crawl bundle JavaScript dan trafik mobile untuk endpoint tidak terdokumentasi — `grep -o "api[^\"]*" app.js` membuka route tersembunyi.',
          'Decode JWT dari header Authorization di jwt.io untuk memeriksa claim, role, dan expiry.',
          'Fuzz pola versioning dan penamaan API: `/api/v1/`, `/api/v2/`, `/api/internal/`, `/api/admin/`.',
          'Gunakan mitmproxy pada aplikasi mobile untuk menangkap percakapan API lengkap yang tidak pernah tampil di UI.'
        ],
        b: [
          'Cari dokumentasi Swagger/OpenAPI pada jalur umum: `/swagger.json`, `/openapi.json`, `/api-docs`, `/swagger/`, `/graphql`.',
          'Jelajahi bundel JavaScript dan trafik seluler untuk endpoint yang tidak terdokumentasi — `grep -o "api[^\"]*" app.js` membuka rute tersembunyi.',
          'Urai token JWT dari tajuk Authorization di jwt.io untuk memeriksa klaim, peran, dan kedaluwarsa.',
          'Uji coba pola penversionan dan penamaan API: `/api/v1/`, `/api/v2/`, `/api/internal/`, `/api/admin/`.',
          'Gunakan mitmproxy pada aplikasi seluler untuk menangkap percakapan API lengkap yang tidak pernah tampil di antarmuka.'
        ],
        s: [
          'Coba alamat umum dokumentasi: `target.com/swagger.json`, `/openapi.json`, `/api-docs` — kalau ketemu, itu menu lengkap semua fungsi API.',
          'Kalau nggak ada, bedah file JavaScript-nya: `grep -o "api[^\"]*" app.js` — alamat API tersembunyi sering nyangkut di situ.',
          'Ambil token login (teks panjang di header Authorization), tempel di jwt.io — kita bisa lihat isinya: ID kita, role, kapan kadaluarsa.',
          'Coba-coba variasi alamat: `/api/v1/`, `/api/v2/`, `/api/admin/` — versi lama atau khusus admin sering masih hidup.',
          'Kalau targetnya aplikasi HP, pasang mitmproxy — semua percakapan API-nya kecatat, termasuk yang nggak kelihatan di layar.'
        ]
      },
      tools: ['Burp Suite', 'mitmproxy', 'Postman', 'jwt.io', 'jq'],
      remediation: {
        en: 'Remove or protect API documentation in production, deploy a current inventory of endpoints, and gate undocumented and internal APIs behind authentication.',
        t: 'Hapus atau lindungi dokumentasi API di production, kelola inventaris endpoint yang mutakhir, dan kunci API yang tidak terdokumentasi serta internal di belakang authentication.',
        b: 'Dokumentasi API pada lingkungan produksi mesti dihapus atau dilindungi, inventaris endpoint harus dipelihara secara mutakhir, dan API yang tidak terdokumentasi maupun bersifat internal wajib dikunci di balik autentikasi.',
        s: 'Matikan halaman dokumentasi API saat produksi, dan jangan biarkan endpoint internal bisa diakses tanpa login.'
      }
    },

    {
      name_en: 'Testing for Broken Object Level Authorization (BOLA)',
      name_id: { t: 'Pengujian Broken Object Level Authorization (BOLA)', b: 'Pengujian Otorisasi Objek yang Rusak (BOLA)', s: 'Curi Data via Tukar ID' },
      summary: {
        en: 'BOLA is IDOR for APIs (OWASP API Top 10 API1): the server checks who you are but forgets to check that the object in the request actually belongs to you. Swapping an ID in the request returns another user\'s data.',
        t: 'BOLA adalah IDOR versi API (OWASP API Top 10 API1): server memeriksa siapa Anda tetapi lupa memeriksa apakah objek dalam request benar-benar milik Anda. Menukar ID dalam request akan mengembalikan data user lain.',
        b: 'BOLA adalah wujud IDOR pada API (OWASP API Top 10 API1): peladen memastikan siapa penggunanya, tetapi luput memeriksa apakah objek di dalam permintaan benar-benar milik pengguna tersebut. Mengganti ID pada permintaan akan menyodorkan data milik pengguna lain.',
        s: 'BOLA itu IDOR di dunia API. Server tahu siapa kita, tapi lupa ngecek: "data yang kamu minta ini memang punyamu?" Ganti angka ID-nya — eh, keluar data orang lain. Ini bug API paling umum sedunia.'
      },
      howto: {
        en: [
          'Create two test accounts (userA, userB) and capture a normal request: `GET /api/v1/user/123/orders`.',
          'Swap the object ID to userB\'s: `GET /api/v1/user/124/orders` with userA\'s token — if userB\'s data returns, BOLA confirmed.',
          'Test every object reference: order IDs, invoice numbers, message IDs, document UUIDs — `GET /api/v1/invoices/9876`.',
          'Automate ID swapping in Burp Intruder with a payload list of sequential/guessed IDs and flag responses with different content lengths.',
          'Test write operations too: `PUT /api/v1/orders/9876` changing another user\'s address or `DELETE /api/v1/messages/555`.'
        ],
        t: [
          'Buat dua akun uji (userA, userB) dan tangkap request normal: `GET /api/v1/user/123/orders`.',
          'Tukar ID objek ke milik userB: `GET /api/v1/user/124/orders` dengan token userA — jika data userB kembali, BOLA terkonfirmasi.',
          'Uji setiap referensi objek: ID order, nomor invoice, ID pesan, UUID dokumen — `GET /api/v1/invoices/9876`.',
          'Otomatiskan penukaran ID di Burp Intruder dengan payload list ID sekuensial/tertebak dan tandai respons dengan panjang konten berbeda.',
          'Uji juga operasi tulis: `PUT /api/v1/orders/9876` mengubah alamat user lain, atau `DELETE /api/v1/messages/555`.'
        ],
        b: [
          'Buat dua akun uji (userA, userB) dan tangkap permintaan normal: `GET /api/v1/user/123/orders`.',
          'Tukar ID objek milik userB: `GET /api/v1/user/124/orders` dengan token userA — jika data userB kembali, BOLA terkonfirmasi.',
          'Uji setiap referensi objek: ID pesanan, nomor faktur, ID pesan, UUID dokumen — `GET /api/v1/invoices/9876`.',
          'Otomatiskan penukaran ID pada Burp Intruder dengan daftar muatan ID berurutan/tertebak dan tandai respons dengan panjang isi berbeda.',
          'Uji juga operasi tulis: `PUT /api/v1/orders/9876` mengubah alamat pengguna lain, atau `DELETE /api/v1/messages/555`.'
        ],
        s: [
          'Bikin dua akun: A dan B. Login sebagai A, buka fitur apa saja (misal daftar pesanan), catat alamat request-nya: `GET /api/v1/user/123/orders`.',
          'Nah, sekarang ganti angkanya: `123` jadi `124` (itu ID milik B) — masih pakai token A. Kalau data B muncul, jackpot: BOLA.',
          'Jangan berhenti di satu tempat — coba semua: nomor invoice, ID pesan, UUID dokumen. Tiap angka di alamat itu kandidat.',
          'Biarkan Burp Intruder kerja keras: kasih daftar angka 1-1000, lihat respons mana yang beda panjang — beda = data orang lain.',
          'Coba juga yang bahaya: `PUT` atau `DELETE` ke data orang lain — kalau bisa ubah/hapus, itu kelas boss level.'
        ]
      },
      tools: ['Burp Suite', 'Postman', 'curl', 'jq', 'Burp Intruder'],
      remediation: {
        en: 'Enforce object-level authorization on every endpoint server-side: verify the authenticated user owns the requested object before returning or modifying it, and prefer non-guessable UUIDs over sequential IDs.',
        t: 'Tegakkan object-level authorization di sisi server pada setiap endpoint: verifikasi bahwa user terautentikasi memiliki objek yang diminta sebelum mengembalikan atau mengubahnya, dan utamakan UUID yang tidak mudah ditebak dibanding ID sekuensial.',
        b: 'Tegakkan otorisasi tingkat objek di sisi peladen pada setiap endpoint: verifikasi bahwa pengguna terautentikasi memiliki objek yang diminta sebelum mengembalikan atau mengubahnya, dan utamakan UUID yang sulit ditebak dibanding ID berurutan.',
        s: 'Server wajib ngecek di setiap permintaan: "objek ini punya user ini nggak?" — bukan cuma ngecek login. Dan pakai ID acak yang panjang, bukan angka berurutan.'
      }
    },

    {
      name_en: 'Testing for Excessive Data Exposure',
      name_id: { t: 'Pengujian Excessive Data Exposure', b: 'Pengujian Paparan Data Berlebihan', s: 'Cek Data Bonus yang Terkirim' },
      summary: {
        en: 'APIs often trust the client to filter data and return full database objects (OWASP API Top 10 API3) — passwords hashes, internal flags, other users\' PII. Inspect responses for fields the UI never displays.',
        t: 'API sering mempercayai client untuk memfilter data dan mengembalikan objek database secara penuh (OWASP API Top 10 API3) — hash password, flag internal, PII user lain. Periksa respons untuk field yang tidak pernah ditampilkan UI.',
        b: 'API sering mempercayai klien untuk menyaring data dan mengembalikan objek pangkalan data secara utuh (OWASP API Top 10 API3) — hash kata sandi, penanda internal, PII pengguna lain. Periksa respons untuk bidang yang tidak pernah ditampilkan antarmuka.',
        s: 'API itu rajin ngasih bonus: yang diminta satu field, yang dikirim SEMUA — termasuk hash password, data internal, atau info pribadi. Layar cuma menampilkan sebagian; buka respons mentahnya dan lihat apa lagi yang ikut terkirim.'
      },
      howto: {
        en: [
          'Capture API responses in Burp and compare against what the UI displays: `GET /api/v1/users/me` returning `{"id":1,"name":"...","email":"...","ssn":"...","is_admin":false,"password_hash":"..."}`.',
          'Pipe responses through jq to expose all fields: `curl -s http://target.com/api/v1/users | jq .` — enumerate every field returned.',
          'Test list endpoints: `/api/v1/users?page=1` — check whether other users\' objects leak the same excessive fields.',
          'Look for sensitive fields: `password`, `ssn`, `credit_card`, `internal_id`, `debug`, `token`, `is_admin` in every response.',
          'Check verbose error responses and debug parameters: `?debug=1` — stack traces and SQL may leak object schemas.'
        ],
        t: [
          'Tangkap respons API di Burp dan bandingkan dengan yang ditampilkan UI: `GET /api/v1/users/me` mengembalikan `{"id":1,"name":"...","ssn":"...","is_admin":false,"password_hash":"..."}`.',
          'Salurkan respons melalui jq untuk membuka semua field: `curl -s http://target.com/api/v1/users | jq .` — enumerasi setiap field yang dikembalikan.',
          'Uji endpoint list: `/api/v1/users?page=1` — periksa apakah objek user lain membocorkan field berlebih yang sama.',
          'Cari field sensitif: `password`, `ssn`, `credit_card`, `internal_id`, `debug`, `token`, `is_admin` di setiap respons.',
          'Periksa respons error verbose dan parameter debug: `?debug=1` — stack trace dan SQL bisa membocorkan skema objek.'
        ],
        b: [
          'Tangkap respons API pada Burp dan bandingkan dengan yang ditampilkan antarmuka: `GET /api/v1/users/me` mengembalikan `{"id":1,"name":"...","ssn":"...","is_admin":false,"password_hash":"..."}`.',
          'Salurkan respons melalui jq untuk membuka semua bidang: `curl -s http://target.com/api/v1/users | jq .` — cacah setiap bidang yang dikembalikan.',
          'Uji endpoint daftar: `/api/v1/users?page=1` — periksa apakah objek pengguna lain membocorkan bidang berlebih yang sama.',
          'Cari bidang sensitif: `password`, `ssn`, `credit_card`, `internal_id`, `debug`, `token`, `is_admin` pada setiap respons.',
          'Periksa respons galat terperinci dan parameter awakutu: `?debug=1` — jejak tumpukan dan SQL dapat membocorkan skema objek.'
        ],
        s: [
          'Buka Burp, jalani fitur normal aplikasi, lalu baca respons mentah API-nya — jangan percaya layar, layar bisa nyembunyiin field.',
          'Kalau bingung, pakai `curl -s http://target.com/api/v1/users | jq .` — jq merapikan JSON, semua field jadi kelihatan jelas.',
          'Bandingkan: layar cuma menampilkan nama dan email, tapi respons ada `ssn`, `password_hash`, `is_admin`? Itu bocoran.',
          'Uji juga halaman daftar: `/api/v1/users?page=1` — kadang data SEMUA user ikut kekirim dengan field lengkap.',
          'Coba tambahkan `?debug=1` — kadang server ngocol dan numpahin struktur database-nya.'
        ]
      },
      tools: ['Burp Suite', 'curl', 'jq', 'Postman', 'mitmproxy'],
      remediation: {
        en: 'Return only the fields each endpoint needs — never serialize raw database objects. Maintain a response allowlist per endpoint and audit new fields before they ship.',
        t: 'Kembalikan hanya field yang dibutuhkan tiap endpoint — jangan pernah men-serialize objek database mentah. Kelola allowlist respons per endpoint dan audit field baru sebelum dirilis.',
        b: 'Kembalikan hanya bidang yang diperlukan tiap endpoint — jangan pernah men-serialisasi objek pangkalan data mentah. Kelola daftar izin respons per endpoint dan audit bidang baru sebelum dirilis.',
        s: 'Server harus ngirim field yang cuma perlu — bukan seluruh isi database. Daftar field yang boleh dikirim per endpoint, dan periksa tiap field baru sebelum rilis.'
      }
    },

    {
      name_en: 'Testing for Broken Function Level Authorization (BFLA)',
      name_id: { t: 'Pengujian Broken Function Level Authorization (BFLA)', b: 'Pengujian Otorisasi Fungsi yang Rusak (BFLA)', s: 'Coba Fungsi Admin Tanpa Jadi Admin' },
      summary: {
        en: 'BFLA is privilege escalation for APIs (OWASP API Top 10 API5): administrative functions exist in the API but the role check is missing or only enforced in the UI. A normal user calls the admin endpoint directly and it works.',
        t: 'BFLA adalah privilege escalation versi API (OWASP API Top 10 API5): fungsi administratif ada di API tetapi pemeriksaan role hilang atau hanya ditegakkan di UI. User biasa memanggil endpoint admin secara langsung dan berhasil.',
        b: 'BFLA adalah bentuk kenaikan hak pada API (OWASP API Top 10 API5): fungsi administratif tersedia di API, tetapi pemeriksaan peran hilang atau hanya ditegakkan di antarmuka. Pengguna biasa pun dapat memanggil endpoint admin secara langsung dan berhasil.',
        s: 'BFLA itu naik pangkat tanpa izin. Ada fungsi khusus admin di API — hapus user, lihat semua transaksi — tapi pemeriksaan "kamu admin nggak?"-nya lupa dipasang. User biasa panggil langsung, diterima.'
      },
      howto: {
        en: [
          'From recon, list admin-looking endpoints: `/api/v1/admin/users`, `/api/v1/users/delete`, `/api/v1/admin/export`.',
          'Authenticate as a low-privilege user and call each admin endpoint directly: `DELETE /api/v1/admin/users/456` with the normal user\'s token.',
          'Test HTTP verb swaps: `GET /api/v1/admin/config` may be protected while `POST /api/v1/admin/config` is not.',
          'Try mass assignment on role fields: `PUT /api/v1/users/me` with body `{"email":"a@b.com","role":"admin"}` — see if role changes.',
          'Check function groups: if user management works, test reports, exports, and config endpoints — BFLA rarely lives on just one route.'
        ],
        t: [
          'Dari recon, daftarkan endpoint berbau admin: `/api/v1/admin/users`, `/api/v1/users/delete`, `/api/v1/admin/export`.',
          'Autentikasi sebagai user berprivilege rendah dan panggil tiap endpoint admin langsung: `DELETE /api/v1/admin/users/456` dengan token user biasa.',
          'Uji penukaran verb HTTP: `GET /api/v1/admin/config` mungkin terlindungi sementara `POST /api/v1/admin/config` tidak.',
          'Coba mass assignment pada field role: `PUT /api/v1/users/me` dengan body `{"email":"a@b.com","role":"admin"}` — lihat apakah role berubah.',
          'Periksa kelompok fungsi: jika manajemen user berhasil, uji endpoint laporan, ekspor, dan konfigurasi — BFLA jarang hanya di satu route.'
        ],
        b: [
          'Dari pengintaian, daftarkan endpoint bernuansa admin: `/api/v1/admin/users`, `/api/v1/users/delete`, `/api/v1/admin/export`.',
          'Autentikasi sebagai pengguna berhak rendah dan panggil tiap endpoint admin langsung: `DELETE /api/v1/admin/users/456` dengan token pengguna biasa.',
          'Uji penukaran kata kerja HTTP: `GET /api/v1/admin/config` mungkin terlindungi sementara `POST /api/v1/admin/config` tidak.',
          'Coba penugasan massal pada bidang peran: `PUT /api/v1/users/me` dengan isi `{"email":"a@b.com","role":"admin"}` — lihat apakah peran berubah.',
          'Periksa kelompok fungsi: jika manajemen pengguna berhasil, uji endpoint laporan, ekspor, dan konfigurasi — BFLA jarang hanya pada satu rute.'
        ],
        s: [
          'Dari hasil kepo tadi, kumpulkan alamat yang baunya fungsi admin: `/api/v1/admin/users`, `/api/v1/users/delete`, `/api/v1/admin/export`.',
          'Login sebagai user biasa (bukan admin), lalu panggil langsung alamat admin itu: `DELETE /api/v1/admin/users/456` pakai token user biasa. Kalau diterima — BFLA.',
          'Kadang pintu depan dikunci tapi pintu samping tidak: `GET /api/v1/admin/config` ditolak, tapi `POST`-nya lolos. Coba semua kata kerja.',
          'Trik nih: kirim `PUT /api/v1/users/me` dengan body `{"email":"a@b.com","role":"admin"}` — kalau server nerima field `role` itu, kita jadi admin.',
          'Kalau satu fungsi admin bocor, cek yang lain juga — laporan, ekspor, pengaturan. Jarang cuma satu yang lupa dikunci.'
        ]
      },
      tools: ['Burp Suite', 'Postman', 'curl', 'mitmproxy'],
      remediation: {
        en: 'Deny by default: enforce role checks in a central middleware on every administrative endpoint, never rely on the UI hiding functions, and validate all accepted fields to block mass assignment of role parameters.',
        t: 'Tolak secara default: tegakkan pemeriksaan role di middleware terpusat pada setiap endpoint administratif, jangan pernah mengandalkan UI menyembunyikan fungsi, dan validasi semua field yang diterima untuk memblokir mass assignment parameter role.',
        b: 'Tolak secara bawaan: tegakkan pemeriksaan peran pada middleware terpusat di setiap endpoint administratif, jangan mengandalkan antarmuka yang menyembunyikan fungsi, dan validasi semua bidang yang diterima untuk memblokir penugasan massal parameter peran.',
        s: 'Kunci semua fungsi admin di server — satu pemeriksaan terpusat, bukan per-halaman. Menyembunyikan tombol di layar bukan pengaman, dan tolak field `role` dari input user.'
      }
    },

    {
      name_en: 'Testing for GraphQL',
      name_id: { t: 'Pengujian GraphQL', b: 'Pengujian Kueri GraphQL', s: 'Uji Endpoint GraphQL-nya' },
      summary: {
        en: 'GraphQL exposes a single endpoint with a full query language — and often an enabled introspection system that hands you the entire schema. Test for open introspection, authorization gaps on fields, and mass assignment through mutations.',
        t: 'GraphQL mengekspos satu endpoint dengan bahasa query lengkap — dan sering sistem introspection yang aktif yang menyerahkan seluruh schema. Uji introspection terbuka, celah otorisasi pada field, dan mass assignment melalui mutation.',
        b: 'GraphQL mengekspos satu endpoint dengan bahasa kueri lengkap — dan sering sistem introspeksi yang aktif yang menyerahkan seluruh skema. Uji introspeksi terbuka, celah otorisasi pada bidang, dan penugasan massal melalui mutasi.',
        s: 'GraphQL itu satu pintu untuk semua data — kita yang menulis "menunya". Kalau introspection-nya nggak dimatiin, kita bisa minta peta lengkap semua data dan fungsi yang ada. Dari situ: minta data orang lain, coba fungsi admin.'
      },
      howto: {
        en: [
          'Find the endpoint (often `/graphql`) and test introspection: `{ __schema { types { name fields { name } } } }` — if it returns the full schema, map every type and field.',
          'Visualize the schema with GraphQL Voyager or graphiql to understand the data graph.',
          'Test field-level BOLA: query another user\'s object: `{ user(id: 124) { email ssn orders { total } } }` — fields the UI never requests.',
          'Test mutations for mass assignment: `mutation { updateUser(id: 124, input: { role: "admin" }) { role } }` — injecting role/permission fields.',
          'Probe for denial of service: deeply nested queries and batched queries like `[{ user(id:1){email} }, { user(id:2){email} }, ...]` in one request.'
        ],
        t: [
          'Temukan endpoint (sering `/graphql`) dan uji introspection: `{ __schema { types { name fields { name } } } }` — jika mengembalikan schema lengkap, petakan setiap type dan field.',
          'Visualisasikan schema dengan GraphQL Voyager atau graphiql untuk memahami graph datanya.',
          'Uji BOLA level field: query objek user lain: `{ user(id: 124) { email ssn orders { total } } }` — field yang tidak pernah diminta UI.',
          'Uji mutation untuk mass assignment: `mutation { updateUser(id: 124, input: { role: "admin" }) { role } }` — menyuntik field role/permission.',
          'Selidiki denial of service: query bersarang dalam dan query batch seperti `[{ user(id:1){email} }, { user(id:2){email} }, ...]` dalam satu request.'
        ],
        b: [
          'Temukan endpoint (sering `/graphql`) dan uji introspeksi: `{ __schema { types { name fields { name } } } }` — jika mengembalikan skema lengkap, petakan setiap tipe dan bidang.',
          'Visualisasikan skema dengan GraphQL Voyager atau graphiql untuk memahami graf datanya.',
          'Uji BOLA tingkat bidang: kueri objek pengguna lain: `{ user(id: 124) { email ssn orders { total } } }` — bidang yang tidak pernah diminta antarmuka.',
          'Uji mutasi untuk penugasan massal: `mutation { updateUser(id: 124, input: { role: "admin" }) { role } }` — menyuntikkan bidang peran/izin.',
          'Selidiki penyangkalan layanan: kueri bersarang dalam dan kueri tumpuk seperti `[{ user(id:1){email} }, { user(id:2){email} }, ...]` dalam satu permintaan.'
        ],
        s: [
          'Cari endpoint `/graphql` (kadang `/api/graphql`). Kirim query introspection: `{ __schema { types { name fields { name } } } }` — kalau server jawab, kita dapat peta lengkap semua data.',
          'Peta itu terlalu ribet dibaca mentah-mentah? Tempel di GraphQL Voyager — jadi diagram, kelihatan semua hubungan datanya.',
          'Sekarang minta data orang lain: `{ user(id: 124) { email ssn orders { total } } }` — minta field-field yang nggak pernah diminta aplikasi. Kalau keluar, itu BOLA.',
          'Coba mutation mass assignment: `mutation { updateUser(id: 124, input: { role: \"admin\" }) { role } }` — kalau field `role` diterima, kita naik jadi admin.',
          'Terakhir, uji ketahanan: query yang bersarang dalam-dalam atau banyak query digabung dalam satu request — kalau server tersendat, itu celah DoS.'
        ]
      },
      tools: ['Burp Suite', 'Postman', 'graphiql', 'GraphQL Voyager', 'jq'],
      remediation: {
        en: 'Disable introspection in production, enforce authorization per resolver/field (not just per query), validate mutation inputs against a strict allowlist, and apply query depth/complexity limits with rate limiting.',
        t: 'Matikan introspection di production, tegakkan otorisasi per resolver/field (bukan hanya per query), validasi input mutation terhadap allowlist yang ketat, dan terapkan batas depth/complexity query dengan rate limiting.',
        b: 'Matikan introspeksi di produksi, tegakkan otorisasi per penyelesai/bidang (bukan hanya per kueri), validasi masukan mutasi terhadap daftar-izinkan yang ketat, dan terapkan batas kedalaman/kompleksitas kueri dengan pembatasan laju.',
        s: 'Matikan introspection saat produksi, periksa izin di setiap field (bukan cuma sekali per query), dan pasang batas query terlalu dalam/terlalu besar biar server nggak kewalahan.'
      }
    }
  ]
});
