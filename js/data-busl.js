/* WSTG Bilingual — 4.10 Business Logic (10 tests)
   Condensed bilingual adaptation, CC BY-SA 4.0. Registers: t=Teknis, b=Baku, s=Sederhana. */
window.WSTG_DATA = window.WSTG_DATA || [];
window.WSTG_DATA.push({
  order: 10, code: 'BUSL',
  name_en: 'Business Logic',
  desc_en: 'Workflow circumvention, upload attacks & payment abuse',
  name_id: { t: 'Logika Bisnis (Business Logic)', b: 'Logika Bisnis', s: 'Nyerang Aturan Bisnisnya' },
  desc_id: { t: 'Circumvention workflow, serangan upload & penyalahgunaan pembayaran', b: 'Penyamarbungan alur kerja, serangan unggah berkas & penyalahgunaan fungsi pembayaran', s: 'Bypass aturan alur, main-main dengan upload file, dan nakalin sistem bayar' },
  tests: [

    {
      name_en: 'Test Business Logic Data Validation',
      name_id: { t: 'Uji Validasi Data Logika Bisnis (Business Logic Data Validation)', b: 'Uji Validasi Data Logika Bisnis', s: 'Uji Validasi Data Bisnisnya' },
      summary: {
        en: 'The application assumes any request that reaches it was produced by its own trusted UI — but attackers craft requests directly. Test whether the server re-validates business rules (quantities, prices, totals) or blindly trusts what the client sends.',
        t: 'Aplikasi mengasumsikan setiap request yang sampai dihasilkan oleh UI-nya sendiri yang tepercaya — padahal penyerang membuat request secara langsung. Uji apakah server memvalidasi ulang business rule (kuantitas, harga, total) atau mempercayai begitu saja apa yang dikirim client.',
        b: 'Aplikasi mengasumsikan setiap permintaan yang tiba dihasilkan oleh antarmukanya sendiri yang tepercaya — padahal penyerang menyusun permintaan secara langsung. Uji apakah peladen memvalidasi kembali aturan bisnis (jumlah, harga, total) atau mempercayai begitu saja apa yang dikirim klien.',
        s: 'Server sering percaya apa adanya data yang dikirim browser — harga, jumlah barang, total belanja. Padahal kita bisa ubah semuanya di Burp sebelum sampai. Kita cek: masih diperiksa ulang di server, atau nggak?'
      },
      howto: {
        en: [
          'Proxy the app through Burp and complete a normal purchase; note where `price`, `quantity`, and `total` travel in requests.',
          'Replay the order with a negative quantity like `quantity=-5` — see if the total drops or goes negative.',
          'Tamper the unit price directly: change `"price": 2000` to `"price": 1` and observe whether the server recalculates server-side or trusts the submitted value.',
          'Test floating-point tricks: `quantity=0.001`, or prices like `0.01` — rounding bugs can produce a near-zero total.',
          'Try duplicate fields (`price=100&price=1`), extra fields, and arrays (`quantity[]=1&quantity[]=2`) to confuse parsers.'
        ],
        t: [
          'Proxy aplikasi melalui Burp dan selesaikan pembelian normal; catat di mana `price`, `quantity`, dan `total` berpindah dalam request.',
          'Replay order dengan kuantitas negatif seperti `quantity=-5` — lihat apakah totalnya turun atau menjadi negatif.',
          'Tamper harga satuan langsung: ubah `"price": 2000` menjadi `"price": 1` dan amati apakah server menghitung ulang di sisi server atau mempercayai nilai yang dikirim.',
          'Uji trik floating-point: `quantity=0.001`, atau harga seperti `0.01` — bug pembulatan bisa menghasilkan total mendekati nol.',
          'Coba field duplikat (`price=100&price=1`), field ekstra, dan array (`quantity[]=1&quantity[]=2`) untuk membingungkan parser.'
        ],
        b: [
          'Proksi aplikasi melalui Burp dan selesaikan pembelian normal; catat di mana `price`, `quantity`, dan `total` berpindah dalam permintaan.',
          'Kirim ulang pesanan dengan jumlah negatif seperti `quantity=-5` — lihat apakah totalnya turun atau menjadi negatif.',
          'Ubah harga satuan secara langsung: ganti `"price": 2000` menjadi `"price": 1` dan amati apakah peladen menghitung ulang di sisinya atau mempercayai nilai yang dikirim.',
          'Uji trik bilangan pecahan: `quantity=0.001`, atau harga seperti `0.01` — kelemahan pembulatan dapat menghasilkan total mendekati nol.',
          'Coba bidang ganda (`price=100&price=1`), bidang ekstra, dan larik (`quantity[]=1&quantity[]=2`) untuk membingungkan pengurai.'
        ],
        s: [
          'Jalankan situs lewat Burp, belanja biasa sekali, lalu perhatikan request-nya — di situ ada nilai `price`, `quantity`, `total`.',
          'Ganti jumlahnya jadi minus, misal `quantity=-5`. Kalau totalnya ikut turun — ketahuan, nggak ada pemeriksaan.',
          'Ubah harganya langsung: `"price": 2000` jadi `"price": 1`. Server yang benar nggak akan percaya angka dari browser.',
          'Coba angka aneh: `quantity=0.001` atau harga `0.01` — bug pembulatan kadang bikin total jadi nyaris nol.',
          'Kirim juga field ganda kayak `price=100&price=1` — kadang parser-nya kebingungan sendiri.'
        ]
      },
      tools: ['Burp Suite', 'curl', 'Postman', 'OWASP ZAP'],
      remediation: {
        en: 'Never trust client-submitted prices or totals — recompute every value server-side from the database, validate quantity as a positive integer within sane bounds, and reject malformed or duplicated fields outright.',
        t: 'Jangan pernah mempercayai harga atau total yang dikirim client — hitung ulang semua nilai di sisi server dari database, validasi kuantitas sebagai integer positif dalam batas wajar, dan tolak field malformed atau duplikat secara langsung.',
        b: 'Jangan pernah mempercayai harga atau total yang dikirim klien — hitung ulang semua nilai di sisi peladen dari pangkalan data, validasi jumlah sebagai bilangan bulat positif dalam batas wajar, dan tolak bidang cacat atau ganda secara langsung.',
        s: 'Harga dan total harus dihitung ulang di server, ambil dari database — bukan dari browser. Jumlah barang wajib angka bulat positif dengan batas wajar, dan input aneh langsung ditolak.'
      }
    },

    {
      name_en: 'Test Ability to Forge Requests',
      name_id: { t: 'Uji Kemampuan Forge Request (Request Forgery)', b: 'Uji Kemampuan Pemalsuan Permintaan', s: 'Uji Bikin Request Palsu Sendiri' },
      summary: {
        en: 'If the app only enforces rules in JavaScript, attackers skip the UI entirely and speak raw HTTP to the server. Forge requests by hand to see which client-side protections are the only line of defense.',
        t: 'Jika aplikasi hanya menegakkan rule di JavaScript, penyerang melewati UI sama sekali dan bicara HTTP mentah ke server. Forge request secara manual untuk melihat proteksi sisi client mana yang menjadi pertahanan satu-satunya.',
        b: 'Jika aplikasi hanya menegakkan aturan pada JavaScript, penyerang melewati antarmuka sama sekali dan berbicara HTTP mentah kepada peladen. Palsukan permintaan secara manual untuk melihat perlindungan sisi klien mana yang menjadi pertahanan satu-satunya.',
        s: 'Kalau aturannya cuma dicek di browser, itu sama saja periksa tiket di pintu masuk tapi biarkan penonton pindah kursi sendiri. Kita bikin request pakai tangan, tanpa browser — lihat mana aturan yang cuma hidup di JavaScript.'
      },
      howto: {
        en: [
          'Browse the target fully through Burp; save the raw HTTP requests for key actions (add to cart, apply coupon, transfer funds).',
          'Craft the same request in Burp Repeater without ever loading the page — e.g. `POST /api/cart/coupon` with `{"code":"WELCOME10"}` applied 50 times.',
          'Test calling an admin-style endpoint as a normal user: `POST /api/user/promote` with another user\'s `user_id`.',
          'Alter parameter order, remove cookies, change the `Referer` and `Origin` headers — some apps trust header checks as authorization.',
          'Compare responses: any action that succeeds without the UI means client-side checks are the only guard.'
        ],
        t: [
          'Jelajahi target sepenuhnya melalui Burp; simpan raw HTTP request untuk aksi kunci (add to cart, apply coupon, transfer dana).',
          'Buat request yang sama di Burp Repeater tanpa pernah memuat halaman — mis. `POST /api/cart/coupon` dengan `{"code":"WELCOME10"}` yang diaplikasikan 50 kali.',
          'Uji memanggil endpoint gaya admin sebagai user biasa: `POST /api/user/promote` dengan `user_id` milik orang lain.',
          'Ubah urutan parameter, hapus cookie, ganti header `Referer` dan `Origin` — sebagian aplikasi mempercayai pemeriksaan header sebagai otorisasi.',
          'Bandingkan response: aksi apa pun yang berhasil tanpa UI berarti pemeriksaan sisi client adalah penjaga satu-satunya.'
        ],
        b: [
          'Jelajahi sasaran sepenuhnya melalui Burp; simpan permintaan HTTP mentah untuk tindakan kunci (tambah ke keranjang, pakai kupon, transfer dana).',
          'Susun permintaan yang sama pada Burp Repeater tanpa pernah memuat halaman — mis. `POST /api/cart/coupon` dengan `{"code":"WELCOME10"}` yang diterapkan 50 kali.',
          'Uji memanggil endpoint bergaya administrator sebagai pengguna biasa: `POST /api/user/promote` dengan `user_id` milik orang lain.',
          'Ubah urutan parameter, hapus kuki, ganti tajuk `Referer` dan `Origin` — sebagian aplikasi mempercayai pemeriksaan tajuk sebagai otorisasi.',
          'Bandingkan respons: tindakan apa pun yang berhasil tanpa antarmuka berarti pemeriksaan sisi klien adalah penjaga satu-satunya.'
        ],
        s: [
          'Lakukan semua aksi penting lewat Burp — klik "add to cart", pakai kupon — lalu simpan request mentahnya.',
          'Buka Burp Repeater, kirim request itu lagi tanpa buka halaman. Misal `POST /api/cart/coupon` — kuponnya bisa dipakai 50 kali?',
          'Coba panggil endpoint admin sebagai user biasa, kayak `POST /api/user/promote` bawa `user_id` orang lain.',
          'Hapus cookie atau ganti header `Referer` — aplikasi yang percaya header doang gampang dibohongin.',
          'Yang berhasil tanpa lewat UI = pertahanannya cuma di browser. Itu temuan.'
        ]
      },
      tools: ['Burp Suite', 'curl', 'Postman', 'browser dev tools'],
      remediation: {
        en: 'Enforce every rule server-side and treat the UI as pure convenience — remove hidden parameters carrying authorization decisions, and validate session entitlements on each request independently of headers.',
        t: 'Tegakkan setiap rule di sisi server dan perlakukan UI sebagai kenyamanan semata — hapus parameter tersembunyi yang membawa keputusan otorisasi, dan validasi hak session pada setiap request secara independen dari header.',
        b: 'Tegakkan setiap aturan di sisi peladen dan perlakukan antarmuka sebagai kenyamanan semata — hapus parameter tersembunyi yang membawa keputusan otorisasi, dan validasi hak sesi pada setiap permintaan secara independen dari tajuk.',
        s: 'Semua aturan harus diperiksa di server, browser itu cuma kenyamanan. Jangan pernah simpan keputusan penting di parameter tersembunyi, dan jangan percaya header dari luar.'
      }
    },

    {
      name_en: 'Test for Integrity Checks',
      name_id: { t: 'Uji Pemeriksaan Integrity (Integrity Checks)', b: 'Uji Pemeriksaan Integritas Data', s: 'Uji Apakah Data Bisa Diubah Diam-diam' },
      summary: {
        en: 'Values that travel to the client and back — hidden totals, account numbers, discount tokens — must be integrity-protected. Test whether you can tamper with them in transit and have the server accept the modified value.',
        t: 'Nilai yang berpindah ke client dan kembali — total tersembunyi, nomor rekening, token diskon — harus dilindungi integrity-nya. Uji apakah Anda bisa men-tamper nilainya saat transit dan server tetap menerima nilai yang dimodifikasi.',
        b: 'Nilai yang berpindah ke klien lalu kembali — total tersembunyi, nomor rekening, token diskon — harus terlindungi integritasnya. Uji apakah nilainya dapat diubah saat transit sementara peladen tetap menerima nilai yang telah dimodifikasi.',
        s: 'Ada data yang "bolak-balik" dari server ke browser lalu kembali — total harga, nomor rekening, kode diskon. Kalau nggak ada segel digital, kita bisa ubah di tengah jalan dan server terima saja. Kita buktikan.'
      },
      howto: {
        en: [
          'Find hidden form fields and cookies carrying state: `<input type="hidden" name="amount" value="150000">` or a cookie like `cart_total=150000`.',
          'Replay requests with the value modified — change `amount` to `1` or `account=123456` to `account=999999` — and observe the response.',
          'If the value is hashed (e.g. `amount=150000&sig=a1b2c3`), try tampering both and check whether the server actually verifies the signature.',
          'Test hash-stripping: remove the signature parameter entirely — some apps only validate when the field is present.',
          'Try hash collisions on weak schemes (plain MD5 without secret) by recalculating the digest of your forged value.'
        ],
        t: [
          'Cari hidden form field dan cookie yang membawa state: `<input type="hidden" name="amount" value="150000">` atau cookie seperti `cart_total=150000`.',
          'Replay request dengan nilai yang dimodifikasi — ubah `amount` menjadi `1` atau `account=123456` menjadi `account=999999` — dan amati response-nya.',
          'Jika nilainya di-hash (mis. `amount=150000&sig=a1b2c3`), coba tamper keduanya dan periksa apakah server benar-benar memverifikasi signature-nya.',
          'Uji hash-stripping: hapus parameter signature sepenuhnya — sebagian aplikasi hanya memvalidasi saat field itu ada.',
          'Coba hash collision pada skema lemah (MD5 polos tanpa secret) dengan menghitung ulang digest dari nilai forge Anda.'
        ],
        b: [
          'Cari bidang formulir tersembunyi dan kuki yang membawa keadaan: `<input type="hidden" name="amount" value="150000">` atau kuki seperti `cart_total=150000`.',
          'Kirim ulang permintaan dengan nilai yang diubah — ganti `amount` menjadi `1` atau `account=123456` menjadi `account=999999` — dan amati responsnya.',
          'Jika nilainya di-hash (mis. `amount=150000&sig=a1b2c3`), ubah keduanya dan periksa apakah peladen benar-benar memverifikasi tanda tangannya.',
          'Uji penghapusan tanda: hilangkan parameter tanda tangan sepenuhnya — sebagian aplikasi hanya memvalidasi saat bidang itu ada.',
          'Coba tabrakan hash pada skema lemah (MD5 polos tanpa kunci rahasia) dengan menghitung ulang sari nilai palsuan Anda.'
        ],
        s: [
          'Cari field tersembunyi di form atau cookie: `<input type="hidden" name="amount" value="150000">` — itu nilai yang bolak-balik.',
          'Ubah isinya — `amount` jadi `1` — kirim ulang. Kalau diterima, nggak ada pemeriksaan integritas sama sekali.',
          'Kalau ada tanda tangan digital kayak `sig=a1b2c3`, coba ubah nilainya juga — kadang tanda itu nggak benar-benar dicek.',
          'Hapus parameter tanda tangannya sekalian — beberapa aplikasi cuma validasi kalau parameternya ada.',
          'Kalau tandanya MD5 polos tanpa kunci, kita bisa hitung ulang tanda tangan untuk nilai palsu kita sendiri.'
        ]
      },
      tools: ['Burp Suite', 'curl', 'hashcat', 'CyberChef'],
      remediation: {
        en: 'Sign state that must round-trip with HMAC using a server-side secret, prefer server-side storage over client-carried values entirely, and verify signatures on every request — treating a missing signature as a failure.',
        t: 'Tandatangani state yang harus bolak-balik dengan HMAC memakai secret di sisi server, utamakan penyimpanan sisi server dibanding nilai yang dibawa client sepenuhnya, dan verifikasi signature di setiap request — perlakukan signature yang hilang sebagai kegagalan.',
        b: 'Tanda tangani keadaan yang harus bolak-balik dengan HMAC memakai kunci rahasia di sisi peladen, utamakan penyimpanan di peladen dibanding nilai yang dibawa klien, dan verifikasi tanda tangan pada setiap permintaan — perlakukan tanda tangan yang hilang sebagai kegagalan.',
        s: 'Data penting sebaiknya disimpan di server, bukan dikirim ke browser. Kalau terpaksa bolak-balik, kasih segel HMAC dengan kunci rahasia — dan segel yang hilang berarti gagal, bukan lolos.'
      }
    },

    {
      name_en: 'Test for Process Timing',
      name_id: { t: 'Uji Timing Proses (Process Timing)', b: 'Uji Waktu Proses', s: 'Uji Kecepatan Prosesnya' },
      summary: {
        en: 'Some protections are time-based: coupons valid once per second, OTP windows, or race-dependent discounts. Fire requests in parallel to see whether checks that pass individually break when executed simultaneously.',
        t: 'Sebagian proteksi berbasis waktu: kupon yang sah sekali per detik, jendela OTP, atau diskon yang bergantung pada race condition. Tembakkan request secara paralel untuk melihat pemeriksaan yang lolos secara individual namun rusak saat dieksekusi bersamaan.',
        b: 'Sebagian perlindungan berbasis waktu: kupon yang berlaku sekali per detik, jendela OTP, atau diskon yang bergantung pada kondisi pacu. Kirim permintaan secara paralel untuk melihat pemeriksaan yang lolos secara individual namun gagal saat dieksekusi bersamaan.',
        s: 'Beberapa aturan ngandelin waktu — kupon cuma boleh sekali, OTP punya jendela. Kalau kita kirim banyak request di saat yang sama persis, penjaganya kehabisan napas. Itu yang kita uji.'
      },
      howto: {
        en: [
          'Identify actions with a "one-time" or "cool-down" rule: coupon redemption, OTP verification, withdrawal, voting.',
          'Send the same request with Turbo Intruder using a race-condition preset: 20-30 parallel connections aiming for a single synchronized moment — `engine=Engine.BURP2` with the last-byte synchronization.',
          'Observe outcomes: two coupon redemptions landing in the same millisecond often both apply — `{"discount":"-50000"}` stacking twice.',
          'Test retry windows: resubmit an OTP or reset token both immediately and after delays to map the acceptance window.',
          'Check long-running operations (fund transfers, status changes) for TOCTOU — the balance is read before the write, so parallel transfers can both clear.'
        ],
        t: [
          'Identifikasi aksi dengan rule "sekali saja" atau "cool-down": penebusan kupon, verifikasi OTP, penarikan dana, voting.',
          'Kirim request yang sama dengan Turbo Intruder memakai preset race condition: 20-30 koneksi paralel yang menyasar satu momen tersinkronisasi — `engine=Engine.BURP2` dengan sinkronisasi byte terakhir.',
          'Amati hasilnya: dua penebusan kupon yang mendarat di milidetik yang sama sering keduanya diterapkan — `{"discount":"-50000"}` menumpuk dua kali.',
          'Uji jendela retry: kirim ulang token OTP atau reset baik seketika maupun setelah jeda untuk memetakan jendela penerimaan.',
          'Periksa operasi berdurasi panjang (transfer dana, perubahan status) terhadap TOCTOU — saldo dibaca sebelum penulisan, jadi transfer paralel bisa keduanya berhasil.'
        ],
        b: [
          'Identifikasi tindakan dengan aturan "sekali saja" atau "masa tunggu": penebusan kupon, verifikasi OTP, penarikan dana, pemungutan suara.',
          'Kirim permintaan yang sama dengan Turbo Intruder memakai prasetel kondisi pacu: 20-30 sambungan paralel yang menyasar satu momen tersinkronisasi — `engine=Engine.BURP2` dengan sinkronisasi bita terakhir.',
          'Amati hasilnya: dua penebusan kupon yang mendarat pada milidetik yang sama sering keduanya diterapkan — `{"discount":"-50000"}` bertumpuk dua kali.',
          'Uji jendela percobaan ulang: kirim ulang token OTP atau reset baik seketika maupun setelah jeda untuk memetakan jendela penerimaan.',
          'Periksa operasi berdurasi panjang (transfer dana, perubahan status) terhadap TOCTOU — saldo dibaca sebelum penulisan, sehingga transfer paralel dapat keduanya berhasil.'
        ],
        s: [
          'Cari fitur yang dibatasi sekali pakai — kupon, OTP, vote, tarik dana.',
          'Pakai Turbo Intruder di Burp: 20-30 koneksi sekaligus, semuanya nembak di saat yang sama persis.',
          'Kalau dua kupon "sekali pakai" masuk bareng dan keduanya kehitung — race condition kena.',
          'Coba kirim ulang OTP dengan jeda berbeda-beda — dari nol detik sampai agak lama — supaya tahu jendela waktunya.',
          'Transfer dana juga kandidat: saldo dicek dulu baru dipotong — kalau paralel, keduanya lolos.'
        ]
      },
      tools: ['Burp Suite Turbo Intruder', 'ffuf -threads', 'wfuzz', 'custom Python scripts'],
      remediation: {
        en: 'Use database-level atomic operations (unique constraints, transactions with row locks) so a rule is enforced once regardless of request arrival order, and add server-side serialization for one-time actions.',
        t: 'Gunakan operasi atomik di level database (unique constraint, transaksi dengan row lock) sehingga rule ditegakkan sekali terlepas dari urutan kedatangan request, dan tambahkan serialisasi sisi server untuk aksi sekali-jalan.',
        b: 'Gunakan operasi atomik pada tingkat pangkalan data (pembatas unik, transaksi dengan kunci baris) sehingga aturan ditegakkan sekali terlepas dari urutan kedatangan permintaan, dan tambahkan serialisasi sisi peladen untuk tindakan sekali-jalan.',
        s: 'Aturan "sekali saja" harus dikunci di database — transaksi dan kunci baris — bukan sekadar di-if di kode. Kalau banyak request datang bareng, database-nya sendiri yang mesti menolak.'
      }
    },

    {
      name_en: 'Test Number of Times a Function Can Be Used Limits',
      name_id: { t: 'Uji Batas Jumlah Penggunaan Fungsi (Function Usage Limits)', b: 'Uji Batas Jumlah Penggunaan Suatu Fungsi', s: 'Uji Berapa Kali Boleh Dipakai Berkali-kali' },
      summary: {
        en: 'Business functions often have unstated usage limits — one vote per person, one welcome bonus per account, one withdrawal per day. Test what happens when those limits are exceeded, bypassed, or reset.',
        t: 'Fungsi bisnis sering punya batas penggunaan yang tidak tertulis — satu suara per orang, satu bonus welcome per akun, satu penarikan per hari. Uji apa yang terjadi ketika batas itu dilewati, di-bypass, atau direset.',
        b: 'Fungsi bisnis kerap menyimpan batas pemakaian yang tidak tertulis — satu suara per orang, satu bonus sambutan per akun, satu penarikan per hari. Ujilah apa yang terjadi ketika batas tersebut dilanggar, dikelabui, atau direset.',
        s: 'Banyak fitur punya aturan "sekali aja" yang nggak diketik di mana-mana — satu vote, satu bonus, satu tarik dana per hari. Kita cek: benar cuma sekali, atau bisa diulang?'
      },
      howto: {
        en: [
          'Map every function with an implied limit: voting, referral bonus, free trial, password reset, withdrawal.',
          'Exceed the limit and watch responses — the 11th vote, the second `POST /api/bonus/claim` — does the app reject, ignore, or happily grant it?',
          'Reset the counter client-side: delete the local storage key like `hasVoted=true`, clear cookies, or change `user_id` in the request to see if the limit is per-account or per-identifier.',
          'Create parallel accounts (where permitted in scope) and test cross-account limits such as per-IP or per-device caps.',
          'Test the limits under race conditions — 20 simultaneous `POST /api/vote` calls can beat a check-then-act implementation.'
        ],
        t: [
          'Petakan setiap fungsi dengan batas tersirat: voting, bonus referral, free trial, reset password, penarikan dana.',
          'Lampaui batas dan amati response — vote ke-11, `POST /api/bonus/claim` kedua — apakah aplikasi menolak, mengabaikan, atau justru memberikannya?',
          'Reset penghitung di sisi client: hapus key local storage seperti `hasVoted=true`, bersihkan cookie, atau ubah `user_id` dalam request untuk melihat apakah batasnya per-akun atau per-identifier.',
          'Buat akun paralel (sejauh diizinkan scope) dan uji batas lintas akun seperti cap per-IP atau per-device.',
          'Uji batas dalam kondisi race — 20 panggilan `POST /api/vote` simultan bisa mengalahkan implementasi check-then-act.'
        ],
        b: [
          'Petakan setiap fungsi dengan batas tersirat: pemungutan suara, bonus rujukan, uji coba gratis, pengaturan ulang kata sandi, penarikan dana.',
          'Lampaui batas dan amati respons — suara kesebelas, `POST /api/bonus/claim` kedua — apakah aplikasi menolak, mengabaikan, atau justru memberikannya?',
          'Atur ulang penghitung di sisi klien: hapus kunci penyimpanan lokal seperti `hasVoted=true`, bersihkan kuki, atau ubah `user_id` dalam permintaan untuk melihat apakah batasnya per akun atau per pengenal.',
          'Buat akun paralel (sejauh diizinkan lingkup uji) dan uji batas lintas akun seperti batas per IP atau per perangkat.',
          'Uji batas dalam kondisi pacu — 20 panggilan `POST /api/vote` serentak dapat mengalahkan implementasi periksa-lalu-eksekusi.'
        ],
        s: [
          'Catat semua fitur yang rasanya "sekali aja": vote, bonus referral, free trial, reset password.',
          'Pakai berkali-kali lewat batasnya. Vote ke-11 masih kehitung nggak? Bonus kedua masih masuk?',
          'Hapus jejak di browser — key `hasVoted=true` di local storage atau cookie-nya — lalu coba lagi. Kalau bisa, batasnya cuma di browser.',
          'Coba pakai akun lain atau ganti `user_id` — batasnya per akun, per IP, atau per alat?',
          'Tembak 20 vote bersamaan pakai Intruder — pemeriksaan "cek dulu baru eksekusi" sering kalah.'
        ]
      },
      tools: ['Burp Suite Intruder', 'Turbo Intruder', 'browser dev tools', 'multiple test accounts'],
      remediation: {
        en: 'Track usage limits server-side per account with immutable audit records, bind one-time grants to a unique database constraint, and rate-limit by multiple identifiers where the business rule demands it.',
        t: 'Lacak batas penggunaan di sisi server per akun dengan catatan audit yang tidak dapat diubah, kaitkan grant sekali-jalan ke unique constraint database, dan rate-limit dengan beberapa identifier sesuai tuntutan business rule.',
        b: 'Lacak batas penggunaan di sisi peladen per akun dengan catatan audit yang tidak dapat diubah, kaitkan pemberian sekali-jalan ke pembatas unik pangkalan data, dan batasi laju dengan beberapa pengenal sesuai tuntutan aturan bisnis.',
        s: 'Hitungan "berapa kali sudah dipakai" mesti disimpan di server, dibikin nggak bisa diubah dari luar. Bonus sekali-jalan dikunci di database — begitu tercatat, nggak bisa dobel.'
      }
    },

    {
      name_en: 'Testing for Circumvention of Work Flows',
      name_id: { t: 'Menguji Circumvention Workflow (Workflow Circumvention)', b: 'Menguji Penyamarbungan Alur Kerja', s: 'Uji Loncat-Loncat Langkah Alur' },
      summary: {
        en: 'Applications expect users to follow the intended sequence — browse, cart, checkout, pay. Test whether skipping, repeating, or reordering steps breaks the business logic and lets you reach the end state without paying.',
        t: 'Aplikasi mengharapkan user mengikuti sekuens yang dimaksudkan — browse, cart, checkout, bayar. Uji apakah melewati, mengulang, atau menyusun ulang langkah merusak business logic dan memungkinkan Anda mencapai state akhir tanpa membayar.',
        b: 'Aplikasi mengharapkan pengguna mengikuti urutan yang dimaksudkan — menelusuri, keranjang, pembayaran, membayar. Uji apakah melewati, mengulang, atau menyusun ulang langkah merusak logika bisnis dan memungkinkan Anda mencapai keadaan akhir tanpa membayar.',
        s: 'Aplikasi kasih tahu kita urutannya: lihat barang, isi keranjang, bayar. Tapi nggak semua aplikasi ngecek urutannya. Kita coba loncat ke langkah terakhir langsung, atau ulang-ulang langkah tengah — siapa tahu barang datang tanpa bayar.'
      },
      howto: {
        en: [
          'Map the full workflow first: register → verify → login → add to cart → enter address → pay → download.',
          'Call the final step directly: `POST /api/order/complete` with a fresh `order_id` but no payment transaction — does the order complete?',
          'Skip verification: register then jump straight to `GET /dashboard` — some apps leak the flow state in the URL like `?step=3`, so change it to `?step=6`.',
          'Repeat a favorable step out of sequence — re-apply a one-time discount after checkout, or re-trigger the download link twice.',
          'Replay old requests after the flow finished: resubmit a paid order request and see if stock, license, or coins are granted again.'
        ],
        t: [
          'Petakan workflow lengkap terlebih dahulu: register → verify → login → add to cart → masukkan alamat → bayar → download.',
          'Panggil langkah terakhir secara langsung: `POST /api/order/complete` dengan `order_id` baru tetapi tanpa transaksi pembayaran — apakah order tetap selesai?',
          'Lewati verifikasi: register lalu langsung ke `GET /dashboard` — sebagian aplikasi membocorkan state alur di URL seperti `?step=3`, jadi ubah menjadi `?step=6`.',
          'Ulangi langkah yang menguntungkan di luar sekuens — terapkan ulang diskon sekali-jalan setelah checkout, atau picu ulang link download dua kali.',
          'Replay request lama setelah alur selesai: kirim ulang request order yang sudah dibayar dan lihat apakah stok, lisensi, atau koin diberikan lagi.'
        ],
        b: [
          'Petakan alur kerja lengkap terlebih dahulu: daftar → verifikasi → login → tambah ke keranjang → masukkan alamat → bayar → unduh.',
          'Panggil langkah terakhir secara langsung: `POST /api/order/complete` dengan `order_id` baru namun tanpa transaksi pembayaran — apakah pesanan tetap selesai?',
          'Lewati verifikasi: daftar lalu langsung ke `GET /dashboard` — sebagian aplikasi membocorkan keadaan alur pada URL seperti `?step=3`, maka ubah menjadi `?step=6`.',
          'Ulangi langkah yang menguntungkan di luar urutan — terapkan ulang diskon sekali-jalan setelah pembayaran, atau picu ulang tautan unduh dua kali.',
          'Kirim ulang permintaan lama setelah alur selesai: sampaikan kembali permintaan pesanan yang telah dibayar dan lihat apakah stok, lisensi, atau koin diberikan lagi.'
        ],
        s: [
          'Gambar dulu alurnya dari awal: daftar, verifikasi, login, isi keranjang, alamat, bayar, download.',
          'Lompat ke langkah akhir langsung — `POST /api/order/complete` tanpa transaksi bayar. Kalau ordernya jadi, berabe.',
          'Coba loncat verifikasi. Kadang alurnya kelihatan di URL, kayak `?step=3` — ganti aja jadi `?step=6`.',
          'Ulangi langkah yang menguntungkan: pakai diskon sekali-jalan dua kali, atau klik link download lagi setelah selesai.',
          'Kirim ulang request lama setelah semua selesai — kadang barang atau lisensi dikasih dua kali.'
        ]
      },
      tools: ['Burp Suite', 'curl', 'browser', 'Postman'],
      remediation: {
        en: 'Maintain a server-side state machine for each workflow — every request must prove the order is at that exact step, with payment confirmation gated in the database before fulfillment.',
        t: 'Pertahankan state machine di sisi server untuk setiap workflow — setiap request harus membuktikan bahwa order berada di langkah tepat itu, dengan konfirmasi pembayaran digerbangi di database sebelum fulfillment.',
        b: 'Pertahankan mesin keadaan di sisi peladen untuk setiap alur kerja — setiap permintaan harus membuktikan bahwa pesanan berada pada langkah tepat itu, dengan konfirmasi pembayaran digerbangi di pangkalan data sebelum pemenuhan.',
        s: 'Server harus mencatat posisi alur setiap order — langkah berapa sekarang. Barang dikirim hanya kalau pembayaran benar-benar sudah tercatat, bukan cuma karena langkah terakhir dipanggil.'
      }
    },

    {
      name_en: 'Test Defenses Against Application Misuse',
      name_id: { t: 'Uji Pertahanan terhadap Penyalahgunaan Aplikasi (Application Misuse)', b: 'Uji Pertahanan terhadap Penyalahgunaan Aplikasi', s: 'Uji Pertahanan dari Kegunaan Nakal' },
      summary: {
        en: 'Applications should detect and respond to misuse — repeated failed payments, bulk coupon abuse, abnormal order patterns. Probe how the app reacts to deliberate misuse and whether defenses can be disabled or evaded.',
        t: 'Aplikasi seharusnya mendeteksi dan merespons penyalahgunaan — pembayaran gagal berulang, abuse kupon massal, pola order abnormal. Selidiki bagaimana aplikasi bereaksi terhadap penyalahgunaan yang disengaja dan apakah pertahanannya bisa dinonaktifkan atau dielakkan.',
        b: 'Aplikasi semestinya mengenali dan menanggapi penyalahgunaan — pembayaran yang gagal berulang, pemakaian kupon massal, atau pola pesanan yang menyimpang. Selidiki reaksi aplikasi terhadap penyalahgunaan yang sengaja dilakukan, dan apakah pertahanannya dapat dimatikan atau dielakkan.',
        s: 'Aplikasi yang baik harusnya nyadar kalau dipakai nakal — bayar gagal terus, spam kupon, order aneh-aneh. Kits uji: dia sadar nggak? Kalau sadar, tanggapannya bisa dilewati nggak?'
      },
      howto: {
        en: [
          'Trigger abuse patterns deliberately in scope: 10 failed coupon codes in a row, rapid cart mutations, abandoned checkouts.',
          'Observe responses: HTTP `429` rate limits, CAPTCHA challenges, account locks, or silent logging — map which defenses exist and when they kick in.',
          'Test evasion: change IP (if permitted), rotate `User-Agent`, lowercase/uppercase the coupon code, or add whitespace — does the abuse counter reset?',
          'Check whether defenses are client-side only: a lockout message rendered by JavaScript but the API still accepting requests.',
          'Look for undocumented abuse responses: check `Retry-After` headers, silent flagging in responses like `{"flagged":true}`, and null-byte or encoding tricks that reset counters.'
        ],
        t: [
          'Picu pola abuse secara sengaja dalam scope: 10 kode kupon gagal berturut-turut, mutasi cart cepat, checkout yang ditinggalkan.',
          'Amati response: rate limit HTTP `429`, CAPTCHA challenge, penguncian akun, atau logging diam-diam — petakan pertahanan apa yang ada dan kapan diaktifkan.',
          'Uji evasion: ganti IP (jika diizinkan), rotasi `User-Agent`, ubah huruf besar/kecil kode kupon, atau tambah whitespace — apakah penghitung abuse direset?',
          'Periksa apakah pertahanan hanya di sisi client: pesan lockout yang dirender JavaScript tetapi API masih menerima request.',
          'Cari response abuse yang tidak terdokumentasi: periksa header `Retry-After`, penandaan diam-diam dalam response seperti `{"flagged":true}`, dan trik null-byte atau encoding yang mereset penghitung.'
        ],
        b: [
          'Picu pola penyalahgunaan secara sengaja dalam lingkup uji: 10 kode kupon gagal berturut-turut, perubahan keranjang cepat, pembayaran yang ditinggalkan.',
          'Amati respons: pembatasan laju HTTP `429`, tantangan CAPTCHA, penguncian akun, atau pencatatan diam-diam — petakan perlindungan apa yang ada dan kapan diaktifkan.',
          'Uji pengelabuan: ganti IP (jika diizinkan), putar `User-Agent`, ubah huruf besar/kecil kode kupon, atau tambah spasi kosong — apakah penghitung penyalahgunaan diatur ulang?',
          'Periksa apakah perlindungan hanya di sisi klien: pesan penguncian yang ditampilkan JavaScript namun API masih menerima permintaan.',
          'Cari respons penyalahgunaan yang tidak terdokumentasi: periksa tajuk `Retry-After`, penandaan diam-diam dalam respons seperti `{"flagged":true}`, dan trik bita-nol atau pengodean yang mengatur ulang penghitung.'
        ],
        s: [
          'Lakukan pola nakal dalam izin uji: salahin kode kupon 10 kali, ubah-ubah keranjang cepat-cepat.',
          'Lihat reaksinya: muncul `429`, CAPTCHA, akun dikunci? Catat kapan penjaganya bangun.',
          'Coba dielakkan: ganti `User-Agent`, ganti besar-kecil huruf kupon, tambah spasi — kadang hitungannya reset.',
          'Kadang pesan "akun dikunci" cuma tampilan JavaScript — API-nya sendiri masih nerima request. Cek.',
          'Perhatikan hal kecil: header `Retry-After`, atau response kayak `{"flagged":true}` — kita tandai, tanpa diketahui aplikasinya.'
        ]
      },
      tools: ['Burp Suite Intruder', 'curl', 'custom scripts', 'multiple test accounts'],
      remediation: {
        en: 'Implement server-side abuse detection with graduated responses (warn, throttle, lock), monitor abuse counters centrally, and ensure lockouts are enforced at the API layer — not by hiding buttons in the client.',
        t: 'Terapkan deteksi abuse di sisi server dengan respons bertahap (peringatkan, throttle, kunci), pantau penghitung abuse secara terpusat, dan pastikan lockout ditegakkan di layer API — bukan dengan menyembunyikan tombol di client.',
        b: 'Terapkan deteksi penyalahgunaan di sisi peladen dengan respons bertahap (peringatkan, batasi, kunci), pantau penghitung penyalahgunaan secara terpusat, dan pastikan penguncian ditegakkan pada lapisan API — bukan dengan menyembunyikan tombol pada klien.',
        s: 'Deteksi pemakaian nakal harus jalan di server, lengkapi tangga tanggapan: peringatan, pelambatan, penguncian. Sembunyikan tombol di browser itu cuma kosmetik — API-nya tetap harus minta putus.'
      }
    },

    {
      name_en: 'Test Upload of Unexpected File Types',
      name_id: { t: 'Uji Upload Jenis File yang Tak Terduga (Unexpected File Types)', b: 'Uji Unggah Jenis Berkas yang Tak Terduga', s: 'Uji Upload Jenis File Aneh' },
      summary: {
        en: 'Upload filters that only check extensions or client-side MIME types accept far more than developers intend. Test which file types actually reach storage and get served back to users.',
        t: 'Filter upload yang hanya memeriksa ekstensi atau MIME type sisi client menerima jauh lebih banyak dari yang dimaksudkan pengembang. Uji jenis file apa yang benar-benar sampai ke storage dan disajikan kembali ke user.',
        b: 'Saringan unggah yang hanya memeriksa ekstensi atau jenis MIME sisi klien menerima jauh lebih banyak daripada yang dimaksudkan pengembang. Uji jenis berkas apa yang benar-benar sampai ke penyimpanan dan disajikan kembali kepada pengguna.',
        s: 'Batasan upload yang cuma ngeliat ekstensi atau tipe file dari browser itu gampang dibohongin. Kita kirim file dengan topeng beda-beda — ekstensi palsu, tipe palsu — lihat mana yang lolos.'
      },
      howto: {
        en: [
          'Locate the upload endpoint and its stated rules — e.g. "images only, 2MB max" — then proxy an upload through Burp.',
          'Rename disallowed types with an accepted extension: `shell.php` becomes `shell.php.jpg`, `malware.exe` becomes `malware.exe.png` — watch what the server stores.',
          'Forge the `Content-Type` header to `image/jpeg` while keeping a `.php` or `.html` payload in the body.',
          'Try double extensions (`report.pdf.php`), trailing dots/spaces (`shell.php.`, `shell.php `), and null bytes (`shell.php%00.jpg`) where the filesystem truncates.',
          'Verify what is served back: upload `test.html` disguised as an image and check whether the response `Content-Type` reflects the stored extension — stored HTML/Flash/SVG means stored XSS is possible.'
        ],
        t: [
          'Temukan endpoint upload dan rule-nya — mis. "hanya gambar, maksimal 2MB" — lalu proxy satu upload melalui Burp.',
          'Ganti nama jenis yang dilarang dengan ekstensi yang diterima: `shell.php` menjadi `shell.php.jpg`, `malware.exe` menjadi `malware.exe.png` — lihat apa yang disimpan server.',
          'Forge header `Content-Type` menjadi `image/jpeg` sambil tetap menyimpan payload `.php` atau `.html` di body.',
          'Coba ekstensi ganda (`report.pdf.php`), titik/spasi di akhir (`shell.php.`, `shell.php `), dan null byte (`shell.php%00.jpg`) di mana filesystem memotong nama.',
          'Verifikasi apa yang disajikan kembali: upload `test.html` menyamar sebagai gambar dan periksa apakah `Content-Type` respons mencerminkan ekstensi tersimpan — HTML/Flash/SVG yang tersimpan berarti stored XSS dimungkinkan.'
        ],
        b: [
          'Temukan endpoint unggah dan aturannya — mis. "hanya gambar, maksimal 2MB" — lalu proksi satu unggahan melalui Burp.',
          'Ganti nama jenis yang dilarang dengan ekstensi yang diterima: `shell.php` menjadi `shell.php.jpg`, `malware.exe` menjadi `malware.exe.png` — lihat apa yang disimpan peladen.',
          'Palsukan tajuk `Content-Type` menjadi `image/jpeg` sambil tetap menyimpan muatan `.php` atau `.html` pada isi permintaan.',
          'Coba ekstensi ganda (`report.pdf.php`), titik/spasi di akhir (`shell.php.`, `shell.php `), dan bita-nol (`shell.php%00.jpg`) pada sistem berkas yang memotong nama.',
          'Verifikasi apa yang disajikan kembali: unggah `test.html` menyamar sebagai gambar dan periksa apakah `Content-Type` respons mencerminkan ekstensi tersimpan — HTML/Flash/SVG yang tersimpan berarti XSS tersimpan dimungkinkan.'
        ],
        s: [
          'Temukan form upload dan aturannya — "cuma gambar" misalnya. Kirim satu upload lewat Burp.',
          'Ganti nama file jahat pakai ekstensi gambar: `shell.php.jpg`. Kalau lolos, server cuma ngeliat belakang namanya.',
          'Bohongin header `Content-Type` jadi `image/jpeg` padahal isinya `.php` atau `.html`.',
          'Coba trik klasik: `report.pdf.php`, `shell.php.` dengan titik, atau `shell.php%00.jpg`.',
          'Upload `test.html` nyamar gambar — kalau nanti disajikan sebagai HTML, stored XSS pintanya kebuka.'
        ]
      },
      tools: ['Burp Suite', 'curl', 'ExifTool', 'custom scripts'],
      remediation: {
        en: 'Validate uploads by content (magic bytes, re-encoding images server-side), store files outside the webroot with generated names, force download or a neutral Content-Type when serving, and never execute uploaded content.',
        t: 'Validasi upload berdasarkan kontennya (magic byte, re-encode gambar di sisi server), simpan file di luar webroot dengan nama yang digenerate, paksa download atau Content-Type netral saat disajikan, dan jangan pernah mengeksekusi konten yang diupload.',
        b: 'Validasi unggahan berdasarkan isinya (bita ajaib, pengodean ulang gambar di sisi peladen), simpan berkas di luar akar web dengan nama yang dihasilkan sistem, paksa unduhan atau jenis konten netral saat disajikan, dan jangan pernah mengeksekusi isi yang diunggah.',
        s: 'Cek isi file aslinya — magic byte — bukan cuma nama. Simpan di luar folder web dengan nama acak, sajikan sebagai unduhan atau tipe netral, dan jangan pernah izinkan dieksekusi.'
      }
    },

    {
      name_en: 'Test Upload of Malicious Files',
      name_id: { t: 'Uji Upload File Malicious (Malicious Files)', b: 'Uji Unggah Berkas Berbahaya', s: 'Uji Upload File Jahat' },
      summary: {
        en: 'Once a type bypass works, the question becomes what the file does when stored and retrieved. Test payloads that execute, infect, or phish — web shells, polyglots, SVGs with scripts, and macro documents.',
        t: 'Setelah bypass jenis berhasil, pertanyaannya menjadi apa yang dilakukan file itu saat disimpan dan diambil. Uji payload yang mengeksekusi, menginfeksi, atau phishing — web shell, polyglot, SVG berisi script, dan dokumen bermakro.',
        b: 'Setelah pengelabuan jenis berhasil, pertanyaannya menjadi apa yang dilakukan berkas itu saat disimpan dan diambil. Uji muatan yang mengeksekusi, menginfeksi, atau memancing — kelengkapan web, poliglot, SVG berisi skrip, dan dokumen bermakro.',
        s: 'Kalau tipe file bisa dibohongin, tahap berikutnya: apa akibatnya kalau file itu disimpan dan dibuka orang? Web shell, SVG berisi skrip, dokumen ber-makro — semua kita coba dalam izin uji.'
      },
      howto: {
        en: [
          'Upload a minimal web shell masked as an allowed image: `<?php system($_GET["c"]); ?>` inside a `.php.jpg` or polyglot file.',
          'Upload an SVG containing `<script>alert(document.domain)</script>` — SVGs execute script when opened directly in a browser tab.',
          'Upload an HTML file with a fake login form to test stored phishing on the same origin.',
          'Craft polyglots (GIF+PHP, JPEG+HTML) so the file satisfies image sniffers and script parsers at once.',
          'Check where files land and with what URL: guess `/uploads/<filename>`, inspect the response `Content-Type` and `Content-Disposition`, and determine whether execution occurs or the file is forced to download.'
        ],
        t: [
          'Upload web shell minimal yang menyamar sebagai gambar yang diizinkan: `<?php system($_GET["c"]); ?>` di dalam file `.php.jpg` atau polyglot.',
          'Upload SVG berisi `<script>alert(document.domain)</script>` — SVG mengeksekusi script saat dibuka langsung di tab browser.',
          'Upload file HTML berisi form login palsu untuk menguji phishing tersimpan pada origin yang sama.',
          'Buat polyglot (GIF+PHP, JPEG+HTML) agar file memuaskan image sniffer sekaligus parser script.',
          'Periksa ke mana file mendarat dan dengan URL apa: tebak `/uploads/<filename>`, periksa `Content-Type` dan `Content-Disposition` respons, dan tentukan apakah eksekusi terjadi atau file dipaksa untuk diunduh.'
        ],
        b: [
          'Unggah kelengkapan web minimal yang menyamar sebagai gambar yang diizinkan: `<?php system($_GET["c"]); ?>` di dalam berkas `.php.jpg` atau poliglot.',
          'Unggah SVG berisi `<script>alert(document.domain)</script>` — SVG mengeksekusi skrip saat dibuka langsung pada tab peramban.',
          'Unggah berkas HTML berisi formulir masuk palsu untuk menguji pemancingan tersimpan pada asal yang sama.',
          'Buat poliglot (GIF+PHP, JPEG+HTML) agar berkas memuaskan pemeriksa citra sekaligus pengurai skrip.',
          'Periksa ke mana berkas mendarat dan dengan URL apa: duga `/uploads/<filename>`, periksa `Content-Type` dan `Content-Disposition` respons, dan tentukan apakah eksekusi terjadi atau berkas dipaksa untuk diunduh.'
        ],
        s: [
          'Kirim web shell kecil nyamar jadi gambar — isinya `<?php system($_GET["c"]); ?>` dengan nama `.php.jpg`.',
          'Kirim SVG yang ada `<script>alert(document.domain)</script>`-nya — dibuka di tab, skripnya jalan.',
          'Kirim HTML login palsu — kalau disimpan di domain yang sama, itu bahan phishing.',
          'Bikin file "dua wajah" — polyglot — kelihatan gambar buat pen sniff, tapi skrip buat parser.',
          'Cari alamat hasil upload, cek header responsnya: dieksekusi atau cuma diunduh?'
        ]
      },
      tools: ['Burp Suite', 'curl', 'polyglot generators', 'Metasploit (for authorized labs)'],
      remediation: {
        en: 'Store uploads with random names outside the webroot, strip metadata, serve them from a separate sandboxed domain with `Content-Disposition: attachment`, and run antivirus/Content-Disposition scanning on retrieval.',
        t: 'Simpan upload dengan nama acak di luar webroot, bersihkan metadata, sajikan dari domain terpisah yang disandbox dengan `Content-Disposition: attachment`, dan jalankan pemindaian antivirus saat file diambil.',
        b: 'Simpan unggahan dengan nama acak di luar akar web, singkirkan metadata, sajikan dari domain terpisah yang terkotak-kotak dengan `Content-Disposition: attachment`, dan jalankan pemindaian antivirus saat berkas diambil.',
        s: 'File upload disimpan dengan nama acak di luar folder web, dibersihkan dari metadata, disajikan dari domain khusus dan dipaksa unduh — plus pemindaian saat diambil.'
      }
    },

    {
      name_en: 'Test Payment Functionality',
      name_id: { t: 'Uji Fungsionalitas Pembayaran (Payment Functionality)', b: 'Uji Fungsionalitas Pembayaran', s: 'Uji Sistem Bayarnya' },
      summary: {
        en: 'Payment is where business logic hurts most — currency confusion, quantity tampering, discount stacking, and replayed transactions. Test every step of the money flow for logic a real attacker would monetize.',
        t: 'Pembayaran adalah tempat business logic paling menyakitkan — kebingungan currency, tampering kuantitas, penumpukan diskon, dan transaksi yang di-replay. Uji setiap langkah alur uang untuk logika yang akan dimonetisasi penyerang sungguhan.',
        b: 'Pembayaran adalah tempat logika bisnis paling menyakitkan — kebingungan mata uang, perubahan jumlah, penumpukan diskon, dan transaksi yang dikirim ulang. Uji setiap langkah alur uang untuk logika yang akan dimonetisasi penyerang sungguhan.',
        s: 'Tempat paling perih kalau logikanya bocor: pembayaran. Kita main-main dengan harga, diskon, mata uang, dan kirim ulang transaksi — semua yang bisa bikin barang gratis atau balik duit.'
      },
      howto: {
        en: [
          'Complete one normal purchase and record every request in the chain: cart → discount → shipping → payment → confirmation.',
          'Tamper currency codes: submit `currency=IDR` while prices were quoted in USD, or change `currency=USD` to `currency=KRW` and watch for unit confusion (1,000x cheaper).',
          'Stack discounts and gift cards: apply `SAVE50` then `FREESHIP` and a negative `giftcard=-100000` — check if totals can be driven below zero.',
          'Replay the payment confirmation: capture the success callback (e.g. `POST /payment/confirm` with `transaction_id`) and resend it — do coins or credits get granted twice?',
          'Manipulate the amount at the last mile: change `amount=500000` to `amount=1` in the request to the payment gateway and observe which value the app records as paid.'
        ],
        t: [
          'Selesaikan satu pembelian normal dan rekam setiap request dalam rantainya: cart → discount → shipping → payment → confirmation.',
          'Tamper kode currency: kirim `currency=IDR` padahal harga dikutip dalam USD, atau ubah `currency=USD` menjadi `currency=KRW` dan amati kebingungan unit (1.000x lebih murah).',
          'Tumpuk diskon dan gift card: terapkan `SAVE50` lalu `FREESHIP` dan `giftcard=-100000` negatif — periksa apakah total bisa didorong di bawah nol.',
          'Replay konfirmasi pembayaran: tangkap callback sukses (mis. `POST /payment/confirm` dengan `transaction_id`) dan kirim ulang — apakah koin atau kredit diberikan dua kali?',
          'Manipulasi amount di mil terakhir: ubah `amount=500000` menjadi `amount=1` dalam request ke payment gateway dan amati nilai mana yang dicatat aplikasi sebagai lunas.'
        ],
        b: [
          'Selesaikan satu pembelian normal dan rekam setiap permintaan dalam rantainya: keranjang → diskon → pengiriman → pembayaran → konfirmasi.',
          'Ubah kode mata uang: kirim `currency=IDR` padahal harga dikutip dalam USD, atau ganti `currency=USD` menjadi `currency=KRW` dan amati kebingungan satuan (1.000x lebih murah).',
          'Tumpuk diskon dan kartu hadiah: terapkan `SAVE50` lalu `FREESHIP` dan `giftcard=-100000` negatif — periksa apakah total dapat didorong di bawah nol.',
          'Kirim ulang konfirmasi pembayaran: tangkap panggilan balik sukses (mis. `POST /payment/confirm` dengan `transaction_id`) dan sampaikan kembali — apakah koin atau kredit diberikan dua kali?',
          'Manipulasi nilai pada mil terakhir: ubah `amount=500000` menjadi `amount=1` dalam permintaan ke gerbang pembayaran dan amati nilai mana yang dicatat aplikasi sebagai lunas.'
        ],
        s: [
          'Belanja normal sekali, catat semua request dari keranjang sampai konfirmasi.',
          'Ganti kode mata uangnya — `USD` jadi `KRW` misalnya. Kalau satuannya kecampur, harganya bisa 1000x lebih murah.',
          'Tumpuk-tumpuk diskon: `SAVE50`, `FREESHIP`, gift card minus `giftcard=-100000` — bisa dibikin totalnya di bawah nol?',
          'Tangkap request sukses bayar — `POST /payment/confirm` — lalu kirim ulang. Kalau kredit masuk dua kali, itu celah kritis.',
          'Ubah nilai bayar di detik akhir: `amount=500000` jadi `amount=1`. Yang dicatat lunas yang mana?'
        ]
      },
      tools: ['Burp Suite', 'Turbo Intruder', 'test payment sandbox (Stripe/Braintree)', 'curl'],
      remediation: {
        en: 'Compute all amounts server-side, bind currency and amount to the payment gateway session, make totals floor at zero, and store transaction IDs with a unique constraint so replayed confirmations are rejected.',
        t: 'Hitung semua amount di sisi server, kaitkan currency dan amount ke sesi payment gateway, batasi total tidak boleh di bawah nol, dan simpan transaction ID dengan unique constraint agar konfirmasi yang di-replay ditolak.',
        b: 'Hitung semua nilai di sisi peladen, kaitkan mata uang dan nilai ke sesi gerbang pembayaran, batasi total tidak boleh di bawah nol, dan simpan ID transaksi dengan pembatas unik agar konfirmasi yang dikirim ulang ditolak.',
        s: 'Semua hitungan uang di server, dikunci ke sesi pembayaran. Total nggak boleh minus, dan tiap transaksi dicatat sekali — konfirmasi yang dikirim ulang ditolak mentah.'
      }
    }
  ]
});
