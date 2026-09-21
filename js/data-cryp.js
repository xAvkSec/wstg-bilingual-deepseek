/* WSTG Bilingual — 4.5 Weak Cryptography (4 tests)
   Condensed bilingual adaptation, CC BY-SA 4.0. Registers: t=Teknis, b=Baku, s=Sederhana. */
window.WSTG_DATA = window.WSTG_DATA || [];
window.WSTG_DATA.push({
  order: 9, code: 'CRYP',
  name_en: 'Weak Cryptography',
  desc_en: 'TLS, padding oracle & weak primitives',
  name_id: { t: 'Weak Cryptography', b: 'Kriptografi Lemah', s: 'Enkripsi Yang Bocor' },
  desc_id: { t: 'TLS yang lemah, padding oracle & primitive kriptografi usang', b: 'TLS lemah, oracle pengganjalan & primitif kriptografi usang', s: 'Kunci lemah, protokol tua, dan enkripsi yang gampang dipecahkan' },
  tests: [

    {
      name_en: 'Testing for Weak Transport Layer Security',
      name_id: { t: 'Pengujian TLS yang Lemah', b: 'Pengujian Keamanan Lapisan Transport yang Lemah', s: 'Cek Kualitas HTTPS-nya' },
      summary: {
        en: 'Weak TLS configurations — outdated protocols, NULL ciphers, invalid certificates, shared-key setups — expose sessions to decryption or interception. Map exactly which protocols and cipher suites the server accepts.',
        t: 'Konfigurasi TLS yang lemah — protokol usang, cipher NULL, sertifikat tidak valid, setup shared-key — membuat sesi rentan dekripsi atau intersepsi. Petakan protokol dan cipher suite apa saja yang diterima server.',
        b: 'Konfigurasi TLS yang lemah — protokol usang, sandi kosong, sertifikat tidak sah, pengaturan kunci bersama — membuat sesi rentan terhadap dekripsi atau penyadapan. Petakan protokol dan rangkaian sandi apa saja yang diterima peladen.',
        s: 'HTTPS-nya kelihatan aman, tapi setting-nya sering tua dan bocor. Kita cek protokol dan jenis enkripsi apa saja yang masih diterima server — yang tua itu gampang dipecah.'
      },
      howto: {
        en: [
          'Enumerate supported protocols: `openssl s_client -connect target.com:443 -tls1` (repeat with `-tls1_1`, `-tls1_2`) to see which legacy versions still negotiate.',
          'Run a full audit: `testssl.sh target.com` grades protocols, ciphers, vulnerabilities (Heartbleed, ROBOT, CRIME) in one pass.',
          'Check certificate validity with `openssl s_client -connect target.com:443 | openssl x509 -noout -dates -issuer` — expired or self-signed certs betray weak PKI hygiene.',
          'Scan TLS flaws via NSE: `nmap --script ssl-enum-ciphers,ssl-cert-integrity -p 443 target.com`.',
          'Submit the host to SSL Labs (`ssllabs.com/ssltest`) for an external grade and renegotiation/HSTS findings.'
        ],
        t: [
          'Enumerasi protokol yang didukung: `openssl s_client -connect target.com:443 -tls1` (ulangi dengan `-tls1_1`, `-tls1_2`) untuk melihat versi legacy mana yang masih dinegosiasikan.',
          'Jalankan audit lengkap: `testssl.sh target.com` menilai protokol, cipher, dan vulnerability (Heartbleed, ROBOT, CRIME) dalam satu pass.',
          'Cek validitas sertifikat dengan `openssl s_client -connect target.com:443 | openssl x509 -noout -dates -issuer` — sertifikat kedaluwarsa atau self-signed mengkhianati higiene PKI yang lemah.',
          'Pindai flaw TLS via NSE: `nmap --script ssl-enum-ciphers,ssl-cert-integrity -p 443 target.com`.',
          'Kirim host ke SSL Labs (`ssllabs.com/ssltest`) untuk grade eksternal dan temuan renegotiation/HSTS.'
        ],
        b: [
          'Cacah protokol yang didukung: `openssl s_client -connect target.com:443 -tls1` (ulangi dengan `-tls1_1`, `-tls1_2`) untuk melihat versi usang mana yang masih dinegosiasikan.',
          'Jalankan audit lengkap: `testssl.sh target.com` menilai protokol, sandi, dan kerentanan (Heartbleed, ROBOT, CRIME) dalam sekali jalan.',
          'Periksa keabsahan sertifikat dengan `openssl s_client -connect target.com:443 | openssl x509 -noout -dates -issuer` — sertifikat kedaluwarsa atau bertanda tangan sendiri menandakan higiene PKI yang lemah.',
          'Pindai cacat TLS via NSE: `nmap --script ssl-enum-ciphers,ssl-cert-integrity -p 443 target.com`.',
          'Kirim host ke SSL Labs (`ssllabs.com/ssltest`) demi penilaian eksternal dan temuan renegosiasi/HSTS.'
        ],
        s: [
          'Tes protokol tuanya: `openssl s_client -connect target.com:443 -tls1` — kalau masih nyambung, servernya masih nerima versi lama yang bahaya.',
          'Jalankan `testssl.sh target.com` — satu perintah, semua masalah TLS kelihatan: cipher jelek, Heartbleed, semua.',
          'Cek sertifikatnya: `openssl s_client -connect target.com:443 | openssl x509 -noout -dates` — kadang sudah kedaluwarsa dan nggak ada yang sadar.',
          'Pindai pakai `nmap --script ssl-enum-ciphers -p 443 target.com` buat daftar lengkap enkripsi yang diterima.',
          'Masukin alamatnya ke SSL Labs — website itu kasih nilai raport lengkap gratis.'
        ]
      },
      tools: ['openssl', 'testssl.sh', 'nmap', 'SSL Labs', 'sslyze'],
      remediation: {
        en: 'Support only TLS 1.2+ with modern AEAD cipher suites, disable compression and renegotiation, use strong certificates, and enable HSTS with preload.',
        t: 'Dukung hanya TLS 1.2+ dengan cipher suite AEAD modern, matikan kompresi dan renegotiation, gunakan sertifikat yang kuat, dan aktifkan HSTS dengan preload.',
        b: 'Dukung hanya TLS 1.2 ke atas dengan rangkaian sandi AEAD modern, matikan kompresi dan renegosiasi, gunakan sertifikat yang kuat, serta aktifkan HSTS dengan pramuat.',
        s: 'Hanya izinkan TLS versi baru (1.2 ke atas), pakai enkripsi modern, matikan fitur kompresi, dan nyalakan HSTS. Protokol tua kayak SSLv3 dan TLS 1.0 wajib dimatikan.'
      }
    },

    {
      name_en: 'Testing for Padding Oracle',
      name_id: { t: 'Pengujian Padding Oracle', b: 'Pengujian Oracle Pengganjalan', s: 'Cari Celah Padding Oracle' },
      summary: {
        en: 'A padding oracle leaks whether decrypted ciphertext has valid padding — enough to decrypt any ciphertext and forge new one without the key. CBC-mode endpoints with distinguishable error responses are the classic prey.',
        t: 'Padding oracle membocorkan apakah ciphertext yang didekripsi punya padding valid — cukup untuk mendekripsi ciphertext apa pun dan memalsukan yang baru tanpa kunci. Endpoint mode CBC dengan response error yang bisa dibedakan adalah mangsa klasiknya.',
        b: 'Oracle pengganjalan membocorkan apakah teks tersandi yang didekripsi memiliki pengganjalan yang sah — cukup untuk mendekripsi teks tersandi apa pun dan memalsukan yang baru tanpa kunci. Endpoint mode CBC dengan respons galat yang dapat dibedakan adalah mangsa klasiknya.',
        s: 'Kalau server bisa dibedain responsnya antara padding benar dan salah, dia jadi "ramal-ramalan" yang bisa kita pancing terus sampai seluruh enkripsi terbuka — tanpa perlu kunci sama sekali.'
      },
      howto: {
        en: [
          'Identify encrypted parameters that look block-aligned (multiples of 8 or 16 bytes, base64 or hex) — cookies, tokens, `id=` values.',
          'Flip the last byte of an encrypted block and resend; if the response differs between padding-valid and padding-invalid outcomes, an oracle exists.',
          'Confirm CBC mode by corrupting a byte mid-ciphertext — garbled plaintext one block later proves block chaining.',
          'Use `padbuster` for automated decryption once the oracle is confirmed: `padbuster http://target.com/endpoint <encrypted-value> 16 <cookie-param>`.',
          'If only an offline hash crack is possible, demonstrate with `hashcat -m 1400 hash.txt wordlist.txt` that weak protection elsewhere fails fast too.'
        ],
        t: [
          'Identifikasi parameter terenkripsi yang tampak block-aligned (kelipatan 8 atau 16 byte, base64 atau hex) — cookie, token, nilai `id=`.',
          'Flip byte terakhir block terenkripsi dan kirim ulang; jika response berbeda antara padding-valid dan padding-invalid, oracle ada.',
          'Konfirmasi mode CBC dengan merusak satu byte di tengah ciphertext — plaintext yang rusak satu block kemudian membuktikan block chaining.',
          'Gunakan `padbuster` untuk dekripsi otomatis begitu oracle terkonfirmasi: `padbuster http://target.com/endpoint <encrypted-value> 16 <cookie-param>`.',
          'Jika hanya crack hash offline yang memungkinkan, tunjukkan dengan `hashcat -m 1400 hash.txt wordlist.txt` bahwa perlindungan lemah di tempat lain juga cepat tumbang.'
        ],
        b: [
          'Identifikasi parameter terenkripsi yang tampak sejajar blok (kelipatan 8 atau 16 bita, base64 atau heksadesimal) — kuki, token, nilai `id=`.',
          'Balik bita terakhir blok tersandi dan kirim ulang; jika respons berbeda antara pengganjalan sah dan tidak sah, oracle ada.',
          'Pastikan mode CBC dengan merusak satu bita di tengah teks tersandi — teks biasa yang rusak satu blok kemudian membuktikan rantai blok.',
          'Gunakan `padbuster` untuk dekripsi otomatis begitu oracle terpasti: `padbuster http://target.com/endpoint <encrypted-value> 16 <cookie-param>`.',
          'Jika hanya pemecahan hash luring yang mungkin, tunjukkan dengan `hashcat -m 1400 hash.txt wordlist.txt` bahwa perlindungan lemah di tempat lain juga cepat tumbang.'
        ],
        s: [
          'Cari parameter yang isinya teks acak panjang dan panjangnya selalu 16 atau 32 karakter — biasanya itu terenkripsi.',
          'Ubah satu karakter terakhir dari nilai terenkripsi itu, kirim ulang. Kalau pesan error-nya beda dengan sebelumnya, ada harapan.',
          'Rusak satu karakter di tengah — kalau isi yang tampil ikut rusak, hampir pasti ini mode CBC (jenis enkripsi yang rentan).',
          'Kalau oracle udah ketemu, pakai `padbuster` — dia yang kerja keras, kita tinggal tunggu hasil dekripsinya.',
          'Buat latihan di rumah: `hashcat -m 1400 hash.txt wordlist.txt` nunjukin secepat apa hash lemah jebol.'
        ]
      },
      tools: ['Burp Suite', 'padbuster', 'hashcat', 'curl', 'padre'],
      remediation: {
        en: 'Switch to authenticated encryption (AES-GCM, ChaCha20-Poly1305) so tampering fails as a unit, and never let error responses distinguish padding failures from other decryption errors.',
        t: 'Beralih ke authenticated encryption (AES-GCM, ChaCha20-Poly1305) agar perusakan gagal sebagai satu kesatuan, dan jangan biarkan response error membedakan kegagalan padding dari error dekripsi lain.',
        b: 'Beralihlah ke enkripsi terautentikasi (AES-GCM, ChaCha20-Poly1305) agar perusakan data gagal secara utuh, dan jangan biarkan respons galat membedakan kegagalan pengganjalan dari galat dekripsi lainnya.',
        s: 'Pakai enkripsi modern kayak AES-GCM yang otomatis ngedeteksi kalau datanya dimanipulasi, dan pastikan semua pesan error dekripsi kelihatan sama persis — jangan kasih petunjuk apa pun.'
      }
    },

    {
      name_en: 'Testing for Sensitive Information Sent via Unencrypted Channels',
      name_id: { t: 'Pengujian Informasi Sensitif via Channel Tak Terenkripsi', b: 'Pengujian Informasi Sensitif yang Dikirim melalui Saluran Tanpa Enkripsi', s: 'Cari Data Penting yang Dikirim Tanpa Enkripsi' },
      summary: {
        en: 'Credentials, tokens, and personal data crossing the wire in cleartext — plain HTTP, unencrypted internal calls, SMTP without TLS — can be read by anyone on the path. Watch the traffic, not just the login page.',
        t: 'Kredensial, token, dan data pribadi yang melintasi jaringan dalam cleartext — HTTP polos, panggilan internal tanpa enkripsi, SMTP tanpa TLS — bisa dibaca siapa pun di jalurnya. Amati trafiknya, bukan hanya halaman login.',
        b: 'Kredensial, token, dan data pribadi yang melintas di jaringan tanpa enkripsi — termasuk HTTP biasa, panggilan layanan internal, serta SMTP tanpa TLS — dapat disadap oleh siapa pun yang berada di jalur tersebut. Pengamatan harus mencakup seluruh trafik, tidak cukup hanya halaman masuk.',
        s: 'Password dan data penting yang dikirim tanpa enkripsi bisa dibaca siapa aja yang nongkrong di jalur jaringannya — kayak ngirim kartu ATM lewat poscard. Kita tangkap trafiknya dan lihat isinya.'
      },
      howto: {
        en: [
          'Load the app through an HTTP proxy and inspect every request — grep for credentials, tokens, and PII leaving over plain `http://`.',
          'Check whether the login form actually posts to HTTPS: `curl -s http://target.com/login | grep -iE "action=\"http:" method=\"post\""`.',
          'Sniff while browsing: `tcpdump -A -s 0 port 80` reveals cleartext payloads crossing the network.',
          'Test internal and third-party calls — APIs, webhooks, SMTP — which often skip TLS entirely: `nmap --script smtp-commands -p 25,587 target.com`.',
          'Verify mail transport security: `openssl s_client -connect target.com:587 -starttls smtp` — a refused handshake means credentials travel in cleartext.'
        ],
        t: [
          'Muat aplikasi melalui proxy HTTP dan periksa setiap request — grep kredensial, token, dan PII yang keluar via `http://` polos.',
          'Cek apakah form login benar-benar posting ke HTTPS: `curl -s http://target.com/login | grep -iE "action=\"http:" method=\"post\""`.',
          'Sniff saat browsing: `tcpdump -A -s 0 port 80` memperlihatkan payload cleartext yang melintasi jaringan.',
          'Uji panggilan internal dan pihak ketiga — API, webhook, SMTP — yang sering melewatkan TLS sepenuhnya: `nmap --script smtp-commands -p 25,587 target.com`.',
          'Verifikasi keamanan transport email: `openssl s_client -connect target.com:587 -starttls smtp` — handshake ditolak berarti kredensial berjalan dalam cleartext.'
        ],
        b: [
          'Muat aplikasi melalui proksi HTTP dan periksa setiap permintaan — telusuri kredensial, token, dan data pribadi yang keluar melalui `http://` polos.',
          'Periksa apakah formulir login benar-benar mengirim ke HTTPS: `curl -s http://target.com/login | grep -iE "action=\"http:" method=\"post\""`.',
          'Sadap sambungan saat menelusuri: `tcpdump -A -s 0 port 80` memperlihatkan muatan teks polos yang melintasi jaringan.',
          'Uji panggilan internal dan pihak ketiga — API, webhook, SMTP — yang sering membiarkan TLS sepenuhnya: `nmap --script smtp-commands -p 25,587 target.com`.',
          'Pastikan keamanan pengangkutan surel: `openssl s_client -connect target.com:587 -starttls smtp` — jabat tangan yang ditolak berarti kredensial berjalan dalam teks polos.'
        ],
        s: [
          'Buka Burp, matikan sementara intercept HTTPS-nya, terus jelajahi situs — semua yang lewat `http://` (bukan `https://`) itu teks polos yang bisa dibaca orang.',
          'Cek form login di halaman HTTP — kadang halamannya aman tapi password-nya dikirim ke alamat yang nggak dienkripsi.',
          'Jaringan publik? `tcpdump -A port 80` bakal nangkep teks polos yang lewat — password, cookie, semuanya kelihatan.',
          'Jangan lupa urusan di belakang layar: email, webhook, dan panggilan server-ke-server — sering banget lupa dienkripsi.',
          'Tes email servernya: `openssl s_client -connect target.com:587 -starttls smtp` — kalau gagal, password email ngalir polos.'
        ]
      },
      tools: ['Burp Suite', 'Wireshark', 'tcpdump', 'openssl', 'nmap'],
      remediation: {
        en: 'Force TLS on every channel — external and internal — with HTTP redirected to HTTPS, HSTS enabled, and secure flags on all cookies carrying anything sensitive.',
        t: 'Wajibkan TLS di setiap channel — eksternal dan internal — dengan HTTP dialihkan ke HTTPS, HSTS aktif, dan secure flag di semua cookie yang membawa data sensitif.',
        b: 'Wajibkan TLS pada setiap saluran — eksternal dan internal — dengan HTTP dialihkan ke HTTPS, HSTS aktif, dan penanda aman pada semua kuki yang membawa data sensitif.',
        s: 'Semua koneksi wajib HTTPS, nggak ada pengecualian — termasuk server-ke-server dan email. Cookie penting juga harus dikasih tanda secure biar nggak pernah ngirim lewat HTTP.'
      }
    },

    {
      name_en: 'Testing for Weak Cryptographic Primitives',
      name_id: { t: 'Pengujian Primitive Kriptografi yang Lemah', b: 'Pengujian Primitif Kriptografi yang Lemah', s: 'Cari Enkripsi Kuno yang Masih Dipakai' },
      summary: {
        en: 'MD5, SHA-1, DES, ECB mode, hardcoded keys, and predictable randomness are still everywhere. Identify which primitives the application actually uses, then show how fast the weak ones fall.',
        t: 'MD5, SHA-1, DES, mode ECB, key yang di-hardcode, dan randomness yang bisa diprediksi masih ada di mana-mana. Identifikasi primitive apa yang benar-benar dipakai aplikasi, lalu tunjukkan seberapa cepat yang lemah tumbang.',
        b: 'MD5, SHA-1, DES, mode ECB, kunci yang tertanam, dan keacakan yang dapat diprediksi masih dijumpai di mana-mana. Kenali primitif yang benar-benar dipakai aplikasi, lalu perlihatkan betapa cepat yang lemah dapat ditumbangkan.',
        s: 'Ada enkripsi yang jaman baheula — kayak MD5 dan DES — yang sekarang udah gampang dijebol tapi masih aja dipakai. Kita cari tahu aplikasi pakai yang mana, terus buktiin lemahnya.'
      },
      howto: {
        en: [
          'Inspect source where available for calls to `MD5`, `SHA1`, `DES`, `ECB`, or hard-coded keys; grep the bundle: `grep -rniE "md5|sha1|des_ecb|encrypt" ./src`.',
          'Test password hashing strength offline: `hashcat -m 0 hashes.txt wordlist.txt` (MD5) and `-m 100` (SHA1) fall within minutes on a modest GPU.',
          'Identify JWT signing algorithms by decoding a token header at jwt.io — `alg: none` or `HS256` with a weak key is an immediate finding.',
          'Check randomness: register accounts twice in the same second and compare generated tokens — sequential or timestamp-based values are predictable.',
          'Detect ECB mode by encrypting a long repeated plaintext (`AAAA...`) — identical ciphertext blocks confirm the deterministic mode.'
        ],
        t: [
          'Periksa source bila tersedia untuk pemanggilan `MD5`, `SHA1`, `DES`, `ECB`, atau key hard-coded; grep bundelnya: `grep -rniE "md5|sha1|des_ecb|encrypt" ./src`.',
          'Uji kekuatan password hashing secara offline: `hashcat -m 0 hashes.txt wordlist.txt` (MD5) dan `-m 100` (SHA1) tumbang dalam hitungan menit di GPU standar.',
          'Identifikasi algoritma penandatanganan JWT dengan mendekode header token di jwt.io — `alg: none` atau `HS256` dengan key lemah adalah temuan langsung.',
          'Uji randomness: daftarkan dua akun dalam detik yang sama dan bandingkan token yang dihasilkan — nilai sekuensial atau berbasis timestamp itu predictable.',
          'Deteksi mode ECB dengan mengenkripsi plaintext panjang yang berulang (`AAAA...`) — block ciphertext identik mengonfirmasi mode deterministik tersebut.'
        ],
        b: [
          'Periksa sumber kode bila tersedia untuk pemanggilan `MD5`, `SHA1`, `DES`, `ECB`, atau kunci yang tertanam; telusuri berkasnya: `grep -rniE "md5|sha1|des_ecb|encrypt" ./src`.',
          'Uji kekuatan pengacakan kata sandi secara luring: `hashcat -m 0 hashes.txt wordlist.txt` (MD5) dan `-m 100` (SHA1) tumbang dalam hitungan menit pada GPU standar.',
          'Identifikasi algoritma penandatanganan JWT dengan mendekode tajuk token di jwt.io — `alg: none` atau `HS256` dengan kunci lemah adalah temuan langsung.',
          'Uji keacakan: daftarkan dua akun pada detik yang sama dan bandingkan token yang dihasilkan — nilai berurutan atau berbasis waktu itu dapat diprediksi.',
          'Deteksi mode ECB dengan mengenkripsi teks biasa panjang yang berulang (`AAAA...`) — blok teks tersandi identik mengonfirmasi mode deterministik tersebut.'
        ],
        s: [
          'Kalau ada source code-nya, cari kata `md5`, `sha1`, atau `des` — sederhana tapi sering langsung ketemu.',
          'Punya hash password? Coba jebol sendiri: `hashcat -m 0 hashes.txt wordlist.txt` — kalau jebol cepet, itu bukti enkripsinya lemah.',
          'Buka token JWT di jwt.io — kalau tertulis `alg: none`, itu serius banget: token bisa dipalsuin bebas.',
          'Bikin dua akun hampir bersamaan, bandingin token-nya. Mirip atau berurutan? Berarti "acak"-nya nggak acak.',
          'Isi data yang sama panjang berkali-kali — kalau hasil enkripsinya selalu identik di bagian tertentu, itu mode ECB yang berbahaya.'
        ]
      },
      tools: ['hashcat', 'jwt.io', 'grep', 'Burp Suite', 'CyberChef'],
      remediation: {
        en: 'Adopt modern primitives only — SHA-256+, AES-GCM, Argon2/bcrypt for passwords — reject legacy algorithms, and generate all randomness from a CSPRNG.',
        t: 'Adopsi hanya primitive modern — SHA-256+, AES-GCM, Argon2/bcrypt untuk password — tolak algoritma legacy, dan hasilkan semua randomness dari CSPRNG.',
        b: 'Adopsi hanya primitif modern — SHA-256+, AES-GCM, Argon2/bcrypt untuk kata sandi — tolak algoritma usang, dan hasilkan seluruh keacakan dari CSPRNG.',
        s: 'Hanya pakai yang modern: SHA-256 ke atas untuk hash, Argon2 atau bcrypt untuk password, dan angka acak dari generator yang aman. MD5 dan SHA-1 harus pensiun total.'
      }
    }
  ]
});
