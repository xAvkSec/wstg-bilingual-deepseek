/* WSTG Bilingual — 4.2 Configuration and Deployment Management (14 tests)
   Condensed bilingual adaptation, CC BY-SA 4.0. Registers: t=Teknis, b=Baku, s=Sederhana. */
window.WSTG_DATA = window.WSTG_DATA || [];
window.WSTG_DATA.push({
  order: 2, code: 'CONF',
  name_en: 'Configuration and Deployment Management',
  desc_en: 'Server hardening, headers, and deployment hygiene',
  name_id: { t: 'Manajemen Konfigurasi dan Deployment', b: 'Manajemen Konfigurasi dan Penerapan', s: 'Aturan Konfigurasi Server' },
  desc_id: { t: 'Hardening server, header keamanan, dan higiene deployment', b: 'Pengerasan peladen, tajuk keamanan, dan kebersihan penerapan', s: 'Memeriksa setting server dan header keamanannya' },
  tests: [

    {
      name_en: 'Test Network Infrastructure Configuration',
      name_id: { t: 'Uji Konfigurasi Infrastruktur Jaringan', b: 'Pengujian Konfigurasi Infrastruktur Jaringan', s: 'Pindai Jaringannya' },
      summary: {
        en: 'The web app sits on network infrastructure — firewalls, routers, DNS. Misconfigured infrastructure can expose admin interfaces, databases, or internal services directly to the internet.',
        t: 'Aplikasi web berada di atas infrastruktur jaringan — firewall, router, DNS. Infrastruktur yang salah konfigurasi bisa mengekspos antarmuka admin, database, atau layanan internal langsung ke internet.',
        b: 'Aplikasi web bersandar pada infrastruktur jaringan — firewall, router, DNS. Infrastruktur yang salah dikonfigurasi dapat menyingkap antarmuka admin, pangkalan data, atau layanan internal langsung ke internet.',
        s: 'Server nggak berdiri sendirian — ada firewall, router, DNS di sekitarnya. Salah setting di sini bisa buka pintu rahasia ke internet.'
      },
      howto: {
        en: [
          'Run `nmap -sS -p- target.com` for a full port sweep — look for anything beyond 80/443.',
          'Identify services on unexpected ports: databases (3306, 5432), caches (6379), admin panels (8080, 10000).',
          'Check DNS records for internal-sounding names exposed publicly (`vpn.`, `mail.`, `dev.`).',
          'Test whether management interfaces (SSH 22, RDP 3389) are internet-facing.',
          'Look for load balancer/proxy headers that leak internal IPs.'
        ],
        t: [
          'Jalankan `nmap -sS -p- target.com` untuk sapuan port penuh — cari apa pun di luar 80/443.',
          'Identifikasi layanan di port tak terduga: database (3306, 5432), cache (6379), panel admin (8080, 10000).',
          'Periksa record DNS untuk nama yang berbau internal terekspos publik (`vpn.`, `mail.`, `dev.`).',
          'Uji apakah antarmuka manajemen (SSH 22, RDP 3389) menghadap internet.',
          'Cari header load balancer/proxy yang membocorkan IP internal.'
        ],
        b: [
          'Jalankan `nmap -sS -p- target.com` untuk menyapu seluruh porta — cari apa pun di luar 80/443.',
          'Identifikasi layanan pada porta tak terduga: pangkalan data (3306, 5432), singgahan (6379), panel admin (8080, 10000).',
          'Periksa catatan DNS untuk nama beraroma internal yang terbuka publik (`vpn.`, `mail.`, `dev.`).',
          'Uji apakah antarmuka pengelolaan (SSH 22, RDP 3389) menghadap internet.',
          'Cari tajuk penyeimbang beban/proksi yang membocorkan IP internal.'
        ],
        s: [
          'Pindai semua port: `nmap -sS -p- target.com`. Selain 80/443, apa lagi yang terbuka?',
          'Port 3306 itu MySQL, 6379 Redis, 8080 sering panel admin — catat.',
          'Cek DNS — nama seperti `vpn.target.com` atau `dev.target.com` yang bisa diakses publik itu menarik.',
          'Cek apakah SSH (22) atau RDP (3389) terbuka ke internet.',
          'Cari header yang membocorkan IP internal server.'
        ]
      },
      tools: ['nmap', 'masscan', 'dig', 'Shodan'],
      remediation: {
        en: 'Lock down: firewalls should only expose 80/443, management interfaces bound to internal networks or VPN, and no database ports should ever be internet-facing.',
        t: 'Kunci: firewall hanya boleh mengekspos 80/443, antarmuka manajemen diikat ke jaringan internal atau VPN, dan tidak ada port database yang boleh menghadap internet.',
        b: 'Kunci: firewall hanya boleh membuka 80/443, antarmuka pengelolaan terikat pada jaringan internal atau VPN, dan tidak ada porta pangkalan data yang boleh menghadap internet.',
        s: 'Hanya buka porta 80/443 ke internet. Panel admin dan database hanya lewat jaringan internal atau VPN.'
      }
    },

    {
      name_en: 'Test Application Platform Configuration',
      name_id: { t: 'Uji Konfigurasi Platform Aplikasi', b: 'Pengujian Konfigurasi Platform Aplikasi', s: 'Uji Setting Platformnya' },
      summary: {
        en: 'Application platforms (Tomcat, IIS, PHP, ASP.NET) ship with insecure defaults — sample apps, verbose errors, enabled debug consoles. Test for the defaults the vendor forgot to turn off.',
        t: 'Platform aplikasi (Tomcat, IIS, PHP, ASP.NET) datang dengan default yang tidak aman — aplikasi contoh, error verbose, konsol debug aktif. Uji default yang vendor lupa matikan.',
        b: 'Platform aplikasi (Tomcat, IIS, PHP, ASP.NET) hadir dengan bawaan yang tidak aman — aplikasi contoh, galat terperinci, konsol awakutu aktif. Uji bawaan yang vendor lupa mematikan.',
        s: 'Server aplikasi punya setting bawaan yang sering lupa dimatikan — halaman contoh, pesan error detail, konsol debug. Cari yang lupa dimatikan.'
      },
      howto: {
        en: [
          'Request known default paths: `/examples/`, `/manager/html` (Tomcat), `/iisstart.htm`, `/server-status` (Apache).',
          'Test default credentials on management consoles (tomcat/tomcat, admin/admin).',
          'Check PHP settings via info leakage: `/phpinfo.php`, `.php~` backup files.',
          'Review error verbosity — request invalid input and see if full stack traces return.',
          'Verify HTTP methods allowed: `OPTIONS /` — TRACE and PUT should be disabled.'
        ],
        t: [
          'Request path default yang dikenal: `/examples/`, `/manager/html` (Tomcat), `/iisstart.htm`, `/server-status` (Apache).',
          'Uji kredensial default di konsol manajemen (tomcat/tomcat, admin/admin).',
          'Cek setting PHP via kebocoran info: `/phpinfo.php`, file backup `.php~`.',
          'Tinjau verbose error — kirim input tidak valid dan lihat apakah stack trace penuh dikembalikan.',
          'Verifikasi HTTP method yang diizinkan: `OPTIONS /` — TRACE dan PUT harus dimatikan.'
        ],
        b: [
          'Minta jalur bawaan yang dikenal: `/examples/`, `/manager/html` (Tomcat), `/iisstart.htm`, `/server-status` (Apache).',
          'Uji kredensial bawaan pada konsol pengelolaan (tomcat/tomcat, admin/admin).',
          'Periksa pengaturan PHP melalui kebocoran info: `/phpinfo.php`, berkas cadangan `.php~`.',
          'Telaah keterperincian galat — kirim masukan tidak sah dan lihat apakah jejak tumpukan lengkap dikembalikan.',
          'Verifikasi metode HTTP yang diizinkan: `OPTIONS /` — TRACE dan PUT harus dimatikan.'
        ],
        s: [
          'Coba buka alamat bawaan: `/examples/`, `/manager/html`, `/server-status` — kalau kebuka, itu nilainya.',
          'Coba login admin dengan password bawaan (admin/admin, tomcat/tomcat).',
          'Cari `phpinfo.php` — halaman itu menampilkan semua setting server.',
          'Kirim input aneh, lihat pesan errornya — semakin detail, semakin berbahaya.',
          'Kirim `OPTIONS /` — method TRACE dan PUT harusnya dimatikan.'
        ]
      },
      tools: ['curl', 'nmap', 'nikto', 'Burp Suite'],
      remediation: {
        en: 'Harden the platform: remove sample apps, disable management consoles or bind them internally, suppress detailed errors, and allow only required HTTP methods.',
        t: 'Hardening platform: hapus aplikasi contoh, matikan konsol manajemen atau ikat ke internal, tekan error detail, dan izinkan hanya HTTP method yang dibutuhkan.',
        b: 'Keraskan platform: hapus aplikasi contoh, matikan konsol pengelolaan atau ikat ke jaringan internal, cegah galat terperinci, dan izinkan hanya metode HTTP yang diperlukan.',
        s: 'Hapus aplikasi contoh, matikan konsol admin dari internet, singkat pesan error, izinkan hanya metode HTTP yang perlu.'
      }
    },

    {
      name_en: 'Test File Extensions Handling for Sensitive Information',
      name_id: { t: 'Uji Penanganan Ekstensi File untuk Informasi Sensitif', b: 'Uji Penanganan Ekstensi Berkas untuk Informasi Sensitif', s: 'Cek Ekstensi File Berbahaya' },
      summary: {
        en: 'Servers often mishandle extensions: backup files (.bak, .old), editor leftovers (.swp), and source leaks (.inc, .asp.bak) get served as text. Backup and temporary files are the classic jackpot.',
        t: 'Server sering salah menangani ekstensi: file backup (.bak, .old), sisa editor (.swp), dan kebocoran source (.inc, .asp.bak) tersaji sebagai teks. File backup dan sementara adalah jackpot klasik.',
        b: 'Peladen kerap keliru menangani ekstensi: berkas cadangan (.bak, .old), sisa editor (.swp), dan kebocoran sumber (.inc, .asp.bak) disajikan sebagai teks. Berkas cadangan dan berkas sementara adalah temuan klasik yang menggiurkan.',
        s: 'File cadangan (.bak, .old, .swp) kadang malah bisa dibaca seperti teks biasa — isinya source code. Ini sering jadi pintu ke password database.'
      },
      howto: {
        en: [
          'Fuzz for backup variants of known files: `index.php.bak`, `web.config.old`, `.index.php.swp`.',
          'Use `curl -I` to check how unusual extensions are served — MIME type and handler.',
          'Try case variants: `.BAK`, `.Bak` — Windows servers are case-insensitive, handlers may not be.',
          'Look for `.inc`, `.asa`, `.cer`, `.sql` files — often unhandled and served raw.',
          'Force downloads of `.bak` files for known admin/config paths.'
        ],
        t: [
          'Fuzz varian backup dari file yang dikenal: `index.php.bak`, `web.config.old`, `.index.php.swp`.',
          'Gunakan `curl -I` untuk cek bagaimana ekstensi tidak biasa disajikan — MIME type dan handler.',
          'Coba varian kapital: `.BAK`, `.Bak` — server Windows case-insensitive, handler belum tentu.',
          'Cari file `.inc`, `.asa`, `.cer`, `.sql` — sering tidak tertangani dan disajikan mentah.',
          'Paksa download file `.bak` untuk path admin/config yang dikenal.'
        ],
        b: [
          'Kaburkan varian cadangan berkas yang dikenal: `index.php.bak`, `web.config.old`, `.index.php.swp`.',
          'Gunakan `curl -I` untuk memeriksa bagaimana ekstensi tak biasa disajikan — jenis MIME dan penangan.',
          'Coba varian kapital: `.BAK`, `.Bak` — peladen Windows tidak peka kapital, penangan belum tentu.',
          'Cari berkas `.inc`, `.asa`, `.cer`, `.sql` — sering tak tertangani dan disajikan mentah.',
          'Paksa unduhan berkas `.bak` untuk jalur admin/konfigurasi yang dikenal.'
        ],
        s: [
          'Tebak nama file cadangan: `index.php.bak`, `web.config.old` — coba satu-satu.',
          'Gunakan `curl -I` untuk lihat bagaimana server menyajikan ekstensi aneh.',
          'Coba huruf besar: `.BAK` — kadang server bisa dibohongin.',
          'Cari file `.inc`, `.sql`, `.cer` — sering disajikan mentah tanpa eksekusi.',
          'File `.bak` milik file config = password database.'
        ]
      },
      tools: ['curl', 'ffuf', 'Burp Suite', 'dirsearch'],
      remediation: {
        en: 'Never leave backup files in web roots, configure the server to refuse serving unknown extensions, and clean build artifacts before deployment.',
        t: 'Jangan pernah meninggalkan file backup di web root, konfigurasikan server menolak menyajikan ekstensi tidak dikenal, dan bersihkan artefak build sebelum deployment.',
        b: 'Jangan pernah meninggalkan berkas cadangan di akar web, konfigurasikan peladen menolak menyajikan ekstensi yang tak dikenal, dan bersihkan artefak bangunan sebelum penerapan.',
        s: 'Jangan taruh file cadangan di folder web. Setel server biar nolak ekstensi yang nggak dikenal. Bersih-bersih sebelum rilis.'
      }
    },

    {
      name_en: 'Review Old Backup and Unreferenced Files for Sensitive Information',
      name_id: { t: 'Tinjau File Backup Lama dan Tidak Tereferensi untuk Informasi Sensitif', b: 'Telaah Berkas Cadangan Lama dan Tak Tereferensi untuk Informasi Sensitif', s: 'Cari File Lama yang Tertinggal' },
      summary: {
        en: 'Old versions of pages, archived scripts, and forgotten files remain on servers after redesigns. They are unpatched, often still functional, and leak credentials or deprecated logic.',
        t: 'Versi lama halaman, script arsip, dan file terlupakan tetap berada di server setelah redesign. Mereka tidak dipatch, sering masih berfungsi, dan membocorkan kredensial atau logika usang.',
        b: 'Versi lama halaman, skrip arsip, dan berkas terlupakan tetap berada di peladen setelah desain ulang. Mereka tidak ditambal, sering masih berfungsi, dan membocorkan kredensial atau logika usang.',
        s: 'Setelah website didesain ulang, file versi lama sering lupa dihapus. File itu nggak pernah diupdate — kelemahan lama masih ada di sana.'
      },
      howto: {
        en: [
          'Content-discover with wordlists: `ffuf -w paths.txt -u http://target.com/FUZZ`.',
          'Check for `old/`, `backup/`, `2019/`, `beta/`, `test/` directories.',
          'Look for compressed archives: `.tar.gz`, `.zip`, `.7z` of the web root in reachable paths.',
          'Compare archived versions (Wayback) with the current app to find stale endpoints.',
          'Test deprecated endpoints found — they may bypass current security controls.'
        ],
        t: [
          'Content-discovery dengan wordlist: `ffuf -w paths.txt -u http://target.com/FUZZ`.',
          'Cek direktori `old/`, `backup/`, `2019/`, `beta/`, `test/`.',
          'Cari arsip terkompresi: `.tar.gz`, `.zip`, `.7z` dari web root di path yang bisa dijangkau.',
          'Bandingkan versi arsip (Wayback) dengan aplikasi saat ini untuk menemukan endpoint usang.',
          'Uji endpoint usang yang ditemukan — bisa jadi melewati kontrol keamanan saat ini.'
        ],
        b: [
          'Lakukan penemuan konten dengan daftar kata: `ffuf -w paths.txt -u http://target.com/FUZZ`.',
          'Periksa direktori `old/`, `backup/`, `2019/`, `beta/`, `test/`.',
          'Cari arsip terkompresi: `.tar.gz`, `.zip`, `.7z` dari akar web pada jalur yang terjangkau.',
          'Bandingkan versi arsip (Wayback) dengan aplikasi kini untuk menemukan endpoint usang.',
          'Uji endpoint usang yang ditemukan — mungkin melewati kontrol keamanan saat ini.'
        ],
        s: [
          'Gunakan ffuf dengan wordlist — biarkan dia menebak ratusan nama folder dan file.',
          'Coba folder `old/`, `backup/`, `beta/`, `test/` langsung.',
          'Cari file `.zip` atau `.tar.gz` — bisa jadi backup seluruh situs.',
          'Bandingkan dengan versi lama di Wayback Machine — alamat yang hilang dari versi baru itu menarik.',
          'Endpoint lama kadang lolos dari keamanan baru — uji semuanya.'
        ]
      },
      tools: ['ffuf', 'dirsearch', 'Wayback Machine', 'gobuster'],
      remediation: {
        en: 'Purge unreferenced content on every deploy: old versions, archives, test directories. Maintain a clean webroot and audit for stale files after each release.',
        t: 'Bersihkan konten tidak tereferensi di setiap deploy: versi lama, arsip, direktori test. Jaga webroot bersih dan audit file usang setelah tiap rilis.',
        b: 'Bersihkan konten tak tereferensi pada setiap penerapan: versi lama, arsip, direktori uji. Jaga akar web bersih dan audit berkas usang setelah tiap rilis.',
        s: 'Hapus semua file lama setiap kali rilis versi baru. Rutin audit folder web — file yang terlupakan itu jebakan.'
      }
    },

    {
      name_en: 'Enumerate Infrastructure and Application Admin Interfaces',
      name_id: { t: 'Enumerasi Antarmuka Admin Infrastruktur dan Aplikasi', b: 'Cacah Antarmuka Admin Infrastruktur dan Aplikasi', s: 'Cari Halaman Admin' },
      summary: {
        en: 'Admin consoles exist everywhere — application admin panels, server managers, database web UIs. Finding them is half the battle; weak protection on them is a full compromise.',
        t: 'Konsol admin ada di mana-mana — panel admin aplikasi, manajer server, UI web database. Menemukannya adalah separuh perjuangan; proteksi lemah padanya adalah kompromi penuh.',
        b: 'Konsol admin ada di mana-mana — panel admin aplikasi, pengelola peladen, antarmuka web pangkalan data. Menemukannya separuh perjuangan; perlindungan lemah padanya berarti penyusupan total.',
        s: 'Cari halaman admin — panel pengelolaan situs, konsol server, UI database. Ketemu satu yang nggak terkunci, game over.'
      },
      howto: {
        en: [
          'Try common admin paths: `/admin`, `/manager`, `/console`, `/cpanel`, `/phpmyadmin`.',
          'Enumerate subdomains: `admin.`, `panel.`, `manage.` via subdomain brute-forcing.',
          'Check non-standard ports (8080, 8443, 9090) for management UIs.',
          'Test the interfaces found for default credentials and auth bypasses.',
          'Check if admin interfaces enforce HTTPS and IP restrictions.'
        ],
        t: [
          'Coba path admin umum: `/admin`, `/manager`, `/console`, `/cpanel`, `/phpmyadmin`.',
          'Enumerasi subdomain: `admin.`, `panel.`, `manage.` via brute-forcing subdomain.',
          'Cek port non-standar (8080, 8443, 9090) untuk UI manajemen.',
          'Uji antarmuka yang ditemukan untuk kredensial default dan bypass auth.',
          'Cek apakah antarmuka admin menerapkan HTTPS dan restriksi IP.'
        ],
        b: [
          'Coba jalur admin umum: `/admin`, `/manager`, `/console`, `/cpanel`, `/phpmyadmin`.',
          'Cacah subdomain: `admin.`, `panel.`, `manage.` melalui penggasakan subdomain.',
          'Periksa porta tak standar (8080, 8443, 9090) untuk antarmuka pengelolaan.',
          'Uji antarmuka yang ditemukan untuk kredensial bawaan dan pintasan autentikasi.',
          'Periksa apakah antarmuka admin menerapkan HTTPS dan pembatasan IP.'
        ],
        s: [
          'Tebak alamat admin: `/admin`, `/manager`, `/phpmyadmin` — semua standar.',
          'Coba subdomain: `admin.target.com`, `panel.target.com`.',
          'Cek port 8080, 8443, 9090 — konsol suka ngumpet di situ.',
          'Kalau ketemu, coba password bawaan dan cara lewat login.',
          'Cek apakah halaman admin pakai HTTPS dan pembatasan IP.'
        ]
      },
      tools: ['ffuf', 'dirsearch', 'subfinder', 'nmap'],
      remediation: {
        en: 'Move admin interfaces off the public internet: VPN-only access, IP allowlists, strong MFA, and separate hostnames not resolvable publicly.',
        t: 'Pindahkan antarmuka admin dari internet publik: akses khusus VPN, allowlist IP, MFA kuat, dan hostname terpisah yang tidak resolvable publik.',
        b: 'Pindahkan antarmuka admin dari internet publik: akses khusus VPN, daftar-izinkan IP, MFA kuat, dan nama host terpisah yang tak terurai publik.',
        s: 'Halaman admin harusnya cuma bisa diakses lewat VPN atau jaringan internal. Tambahkan MFA. Jangan biarkan alamatnya mudah ditebak.'
      }
    },

    {
      name_en: 'Test HTTP Methods',
      name_id: { t: 'Uji HTTP Methods', b: 'Pengujian Metode HTTP', s: 'Cek Method HTTP yang Aktif' },
      summary: {
        en: 'Beyond GET and POST, servers may enable PUT (write files), DELETE, TRACE (XST reflection), and CONNECT. Extra methods are extra attack surface, and PUT has led directly to web shells.',
        t: 'Di luar GET dan POST, server bisa mengaktifkan PUT (menulis file), DELETE, TRACE (refleksi XST), dan CONNECT. Method ekstra adalah attack surface ekstra, dan PUT pernah langsung berujung web shell.',
        b: 'Di luar GET dan POST, peladen dapat mengaktifkan PUT (menulis berkas), DELETE, TRACE (pantulan XST), dan CONNECT. Metode ekstra adalah permukaan serangan ekstra, dan PUT pernah langsung berujung web shell.',
        s: 'Server kadang mengizinkan metode lain selain GET/POST — PUT bisa nulis file, TRACE bisa mantul. Metode ekstra = pintu ekstra.'
      },
      howto: {
        en: [
          'Send `OPTIONS / HTTP/1.1` with `curl -X OPTIONS -i http://target.com/` and read the `Allow` header.',
          'If TRACE is allowed, verify reflection: it enables Cross-Site Tracing attacks on cookies.',
          'If PUT is allowed, attempt writing a harmless file to a test path — then remove it.',
          'Test verb tampering: some ACLs only check GET, so POST/HEAD may bypass them.',
          'Check API endpoints for undocumented methods (PATCH, DELETE) on resources.'
        ],
        t: [
          'Kirim `OPTIONS / HTTP/1.1` dengan `curl -X OPTIONS -i http://target.com/` dan baca header `Allow`.',
          'Jika TRACE diizinkan, verifikasi refleksinya: memungkinkan serangan Cross-Site Tracing pada cookie.',
          'Jika PUT diizinkan, coba menulis file tidak berbahaya ke path uji — lalu hapus.',
          'Uji verb tampering: beberapa ACL hanya memeriksa GET, jadi POST/HEAD bisa melewatinya.',
          'Cek endpoint API untuk method tidak terdokumentasi (PATCH, DELETE) pada resource.'
        ],
        b: [
          'Kirim `OPTIONS / HTTP/1.1` dengan `curl -X OPTIONS -i http://target.com/` dan baca tajuk `Allow`.',
          'Jika TRACE diizinkan, verifikasi pantulannya: memungkinkan serangan Cross-Site Tracing pada kuki.',
          'Jika PUT diizinkan, coba menulis berkas tak berbahaya ke jalur uji — lalu hapus.',
          'Uji manipulasi kata kerja: beberapa ACL hanya memeriksa GET, jadi POST/HEAD dapat melewatinya.',
          'Periksa endpoint API untuk metode tak terdokumentasi (PATCH, DELETE) pada sumber daya.'
        ],
        s: [
          'Kirim `curl -X OPTIONS -i http://target.com/` — baca header `Allow`, itu daftar metode yang diizinkan.',
          'Kalau TRACE aktif, itu kelemahan — cookie bisa dicuri lewat pantulannya.',
          'Kalau PUT aktif, coba tulis file percobaan — kalau berhasil, ini sangat serius.',
          'Beberapa proteksi cuma blok GET — coba POST atau HEAD untuk lewat.',
          'Di API, coba PATCH dan DELETE pada resource — kadang lupa dilindungi.'
        ]
      },
      tools: ['curl', 'Burp Suite', 'nmap (http-methods script)'],
      remediation: {
        en: 'Disable unneeded methods at the server/WAF level; enforce method-based ACLs on every route, never on the verb alone, and disable TRACE everywhere.',
        t: 'Matikan method yang tidak dibutuhkan di level server/WAF; tegakkan ACL berbasis method di setiap route, jangan hanya pada verb, dan matikan TRACE di mana-mana.',
        b: 'Matikan metode yang tak diperlukan di tingkat peladen/WAF; tegakkan ACL berbasis metode pada setiap rute, bukan hanya pada kata kerjanya, dan matikan TRACE di mana-mana.',
        s: 'Matikan metode yang nggak perlu. Proteksi harus per halaman, bukan per metode. TRACE harus mati total.'
      }
    },

    {
      name_en: 'Test HTTP Strict Transport Security',
      name_id: { t: 'Uji HTTP Strict Transport Security (HSTS)', b: 'Pengujian HTTP Strict Transport Security (HSTS)', s: 'Uji HSTS' },
      summary: {
        en: 'HSTS forces browsers to use HTTPS only, killing downgrade and SSL-strip attacks. Its absence means the first request can be hijacked over plain HTTP.',
        t: 'HSTS memaksa browser hanya menggunakan HTTPS, mematikan serangan downgrade dan SSL-strip. Ketiadaannya berarti request pertama bisa dibajak lewat HTTP polos.',
        b: 'HSTS memaksa peramban hanya menggunakan HTTPS, mematikan serangan penurunan dan SSL-strip. Ketiadaannya berarti permintaan pertama dapat dibajak melalui HTTP polos.',
        s: 'HSTS itu perintah ke browser: "selalu pakai HTTPS". Tanpa ini, serangan bisa maksa turun ke HTTP lalu nyolong sesi.'
      },
      howto: {
        en: [
          'Check responses for `Strict-Transport-Security` header: `curl -sI https://target.com | grep -i strict`.',
          'Verify max-age is long enough (at least 15768000 = 6 months) and includes `includeSubDomains`.',
          'Test HTTP downgrade: request http:// and confirm it redirects — note the redirect itself is still strippable without HSTS.',
          'Confirm HSTS is present on all subdomains if the flag claims so — mismatch creates downgrade holes.',
          'Check for `preload` readiness if the site intends to be on the HSTS preload list.'
        ],
        t: [
          'Periksa response untuk header `Strict-Transport-Security`: `curl -sI https://target.com | grep -i strict`.',
          'Verifikasi max-age cukup lama (minimal 15768000 = 6 bulan) dan menyertakan `includeSubDomains`.',
          'Uji downgrade HTTP: request http:// dan konfirmasi redirectnya — catat bahwa redirect itu sendiri masih bisa di-strip tanpa HSTS.',
          'Konfirmasi HSTS ada di semua subdomain jika flag mengklaim begitu — ketidakcocokan menciptakan lubang downgrade.',
          'Cek kesiapan `preload` jika situs berniat masuk daftar preload HSTS.'
        ],
        b: [
          'Periksa respons untuk tajuk `Strict-Transport-Security`: `curl -sI https://target.com | grep -i strict`.',
          'Verifikasi max-age cukup lama (minimal 15768000 = 6 bulan) dan menyertakan `includeSubDomains`.',
          'Uji penurunan HTTP: minta http:// dan pastikan dialihkan — catat bahwa pengalihan itu sendiri masih dapat dilepas tanpa HSTS.',
          'Pastikan HSTS ada di semua subdomain bila penandanya mengklaim demikian — ketidakcocokan menciptakan lubang penurunan.',
          'Periksa kesiapan `preload` bila situs berniat masuk daftar pramuat HSTS.'
        ],
        s: [
          'Cek headernya: `curl -sI https://target.com | grep -i strict` — harus ada `Strict-Transport-Security`.',
          'Angka max-age minimal 15768000 (6 bulan), plus `includeSubDomains`.',
          'Buka versi http:// — harus dialihkan ke https. Tapi hati-hati: redirect tanpa HSTS tetap bisa dibajak.',
          'Kalau ada `includeSubDomains`, pastikan semua subdomain benar-benar pakai HTTPS.',
          'Cek apakah situs sudah siap masuk daftar preload HSTS browser.'
        ]
      },
      tools: ['curl', 'browser dev tools', 'SSL Labs'],
      remediation: {
        en: 'Serve HSTS on every HTTPS response with a long max-age and includeSubDomains, after confirming all subdomains are HTTPS-ready.',
        t: 'Sajikan HSTS di setiap response HTTPS dengan max-age panjang dan includeSubDomains, setelah memastikan semua subdomain siap HTTPS.',
        b: 'Terapkan HSTS pada setiap respons HTTPS dengan max-age yang panjang disertai includeSubDomains, tetapi pastikan lebih dahulu bahwa seluruh subdomain telah siap melayani HTTPS.',
        s: 'Aktifkan HSTS di semua respons HTTPS, set minimal 6 bulan, dan pastikan semua subdomain sudah siap HTTPS dulu sebelum nyalain includeSubDomains.'
      }
    },

    {
      name_en: 'Test RIA Cross Domain Policy',
      name_id: { t: 'Uji Kebijakan Cross-Domain RIA', b: 'Uji Kebijakan Lintas Domain RIA', s: 'Cek crossdomain.xml' },
      summary: {
        en: 'Rich Internet Applications (Flash, Silverlight) read crossdomain.xml / clientaccesspolicy.xml for permission to talk across domains. An overly permissive policy lets any site read your data.',
        t: 'Rich Internet Applications (Flash, Silverlight) membaca crossdomain.xml / clientaccesspolicy.xml untuk izin berkomunikasi lintas domain. Kebijakan terlalu permissif membiarkan situs mana pun membaca data Anda.',
        b: 'Aplikasi Internet Kaya (Flash, Silverlight) membaca crossdomain.xml / clientaccesspolicy.xml untuk memperoleh izin berkomunikasi lintas domain. Kebijakan yang terlalu longgar membuat situs mana pun leluasa membaca data Anda.',
        s: 'File `crossdomain.xml` mengatur siapa yang boleh akses data lintas situs. Satu baris `allow-access-from domain="*"` artinya semua situs boleh — itu bahaya.'
      },
      howto: {
        en: [
          'Fetch `/crossdomain.xml` and `/clientaccesspolicy.xml` on the target.',
          'If present, check whether `allow-access-from` uses `*` (everything) — critical finding.',
          'Verify whether the policy covers only public content or also authenticated areas.',
          'Test whether the RIA endpoints still exist and honor the permissive policy.',
          'Remember: even with Flash dead, some proxies/tools still parse these policies.'
        ],
        t: [
          'Ambil `/crossdomain.xml` dan `/clientaccesspolicy.xml` di target.',
          'Jika ada, cek apakah `allow-access-from` memakai `*` (semuanya) — temuan kritis.',
          'Verifikasi apakah kebijakan mencakup hanya konten publik atau juga area terautentikasi.',
          'Uji apakah endpoint RIA masih ada dan menghormati kebijakan permissif tersebut.',
          'Ingat: meski Flash sudah mati, beberapa proxy/tool masih mem-parsing kebijakan ini.'
        ],
        b: [
          'Unduh `/crossdomain.xml` dan `/clientaccesspolicy.xml` pada sasaran.',
          'Jika ada, periksa apakah `allow-access-from` memakai `*` (semuanya) — temuan kritis.',
          'Verifikasi apakah kebijakan hanya mencakup konten publik atau juga area terautentikasi.',
          'Uji apakah endpoint RIA masih ada dan menghormati kebijakan longgar tersebut.',
          'Ingat: meski Flash telah mati, beberapa proksi/alat masih mengurai kebijakan ini.'
        ],
        s: [
          'Buka `target.com/crossdomain.xml` — cek apakah ada.',
          'Kalau ada `domain="*"` — semua situs di dunia boleh akses. Itu temuan serius.',
          'Cek apakah kebijakan itu juga mengenai area yang butuh login.',
          'Kalau teknologi Flash/Silverlight sudah dihapus dari situs, hapus juga file ini.',
          'Ingat: walau Flash sudah mati, beberapa proxy/tool masih membaca file ini buat menentukan izin — jadi tetap dicek, jangan dianggap remeh.'
        ]
      },
      tools: ['curl', 'browser'],
      remediation: {
        en: 'Remove cross-domain policy files if RIA technologies are gone; otherwise restrict allow-access-from to specific trusted domains only — never the wildcard.',
        t: 'Hapus file kebijakan cross-domain jika teknologi RIA sudah tidak ada; kalau tidak, batasi allow-access-from hanya ke domain tepercaya tertentu — jangan pernah wildcard.',
        b: 'Hapus berkas kebijakan lintas domain bila teknologi RIA telah tiada; jika tidak, batasi allow-access-from hanya pada domain tepercaya tertentu — jangan pernah wildcard.',
        s: 'Kalau Flash/Silverlight sudah nggak dipakai, hapus file ini. Kalau masih perlu, tulis nama domain tepercaya satu per satu — jangan pakai tanda bintang.'
      }
    },

    {
      name_en: 'Test File Permission',
      name_id: { t: 'Uji Izin File (File Permission)', b: 'Uji Perizinan Berkas', s: 'Cek Izin File' },
      summary: {
        en: 'Wrong file permissions let attackers read or write files they should not. Web servers running as root, world-writable directories, and readable key files are classic misconfigurations.',
        t: 'Izin file yang salah membiarkan penyerang membaca atau menulis file yang seharusnya tidak boleh. Web server berjalan sebagai root, direktori world-writable, dan file kunci yang dapat dibaca adalah misconfiguration klasik.',
        b: 'Perizinan berkas yang salah membiarkan penyerang membaca atau menulis berkas yang seharusnya tidak boleh. Peladen web berjalan sebagai root, direktori yang dapat-ditulis-siapa-saja, dan berkas kunci yang terbaca adalah salah konfigurasi klasik.',
        s: 'Izin file yang salah membuat penyerang bisa baca atau ubah file penting. Server yang jalan sebagai root itu kesalahan klasik.'
      },
      howto: {
        en: [
          'When testing with shell access (gray-box), audit with `find / -perm -o+w -type f 2>/dev/null` for world-writable files.',
          'Check the web server user identity — processes should not run as root.',
          'Look for readable secret files: private keys, `.env`, config files in web-reachable paths.',
          'Test upload directories for execute permission — uploaded files should never execute.',
          'Verify SSH key and credential file permissions on the host.'
        ],
        t: [
          'Saat menguji dengan akses shell (gray-box), audit dengan `find / -perm -o+w -type f 2>/dev/null` untuk file world-writable.',
          'Cek identitas user web server — proses tidak boleh berjalan sebagai root.',
          'Cari file rahasia yang terbaca: private key, `.env`, file config di path yang bisa dijangkau web.',
          'Uji direktori upload untuk izin eksekusi — file upload tidak boleh pernah dieksekusi.',
          'Verifikasi izin file SSH key dan kredensial di host.'
        ],
        b: [
          'Saat menguji dengan akses shell (kotak-abu), audit dengan `find / -perm -o+w -type f 2>/dev/null` untuk berkas yang dapat-ditulis-siapa-saja.',
          'Periksa identitas pengguna peladen web — proses tidak boleh berjalan sebagai root.',
          'Cari berkas rahasia yang terbaca: kunci privat, `.env`, berkas konfigurasi pada jalur terjangkau web.',
          'Uji direktori unggah untuk izin eksekusi — berkas unggahan tidak boleh pernah dieksekusi.',
          'Verifikasi perizinan berkas kunci SSH dan kredensial pada host.'
        ],
        s: [
          'Kalau punya akses shell, jalankan `find / -perm -o+w -type f` — cari file yang bisa ditulis siapa saja.',
          'Cek user yang menjalankan web server — jangan sampai root.',
          'Cari file `.env` dan private key yang bisa dibaca semua orang.',
          'Folder upload tidak boleh mengizinkan eksekusi file.',
          'Cek juga izin folder `.ssh` — hati-hati kalau longgar.'
        ]
      },
      tools: ['shell access', 'find', 'ls -la', 'LinPEAS'],
      remediation: {
        en: 'Run services under dedicated unprivileged accounts, apply least-privilege permissions systematically, and keep secrets out of web-reachable paths.',
        t: 'Jalankan layanan di bawah akun khusus tanpa privilege, terapkan permission least-privilege secara sistematis, dan jauhkan secret dari path yang bisa dijangkau web.',
        b: 'Jalankan layanan dengan akun khusus tanpa hak istimewa, terapkan perizinan hak-minimum secara sistematis, dan jauhkan rahasia dari jalur terjangkau web.',
        s: 'Server jalan pakai akun biasa, bukan root. Izin secukupnya saja. File rahasia jangan taruh di folder web.'
      }
    },

    {
      name_en: 'Test for Subdomain Takeover',
      name_id: { t: 'Uji Subdomain Takeover', b: 'Uji Pengambilalihan Subdomain', s: 'Cek Subdomain Yatim' },
      summary: {
        en: 'When a subdomain CNAMEs to an external service (GitHub Pages, Heroku, S3) that has been deleted, an attacker can claim the service and take over the subdomain — hosting content under your trusted name.',
        t: 'Ketika subdomain di-CNAME ke layanan eksternal (GitHub Pages, Heroku, S3) yang sudah dihapus, penyerang bisa mengklaim layanan tersebut dan mengambil alih subdomain — meng-hosting konten di bawah nama tepercaya Anda.',
        b: 'Bila sebuah subdomain di-CNAME ke layanan eksternal (GitHub Pages, Heroku, S3) yang sudah dihapus, penyerang dapat mengklaim layanan itu dan merebut subdomain tersebut — lalu menayangkan konten dengan memanfaatkan nama tepercaya Anda.',
        s: 'Kalau subdomain nunjuk ke layanan luar yang sudah dihapus akunnya, siapa pun bisa klaim layanan itu — dan tiba-tiba menguasai subdomain Anda.'
      },
      howto: {
        en: [
          'Enumerate all subdomains: `subfinder -d target.com`, then resolve each one.',
          'For each CNAME, identify the target service from the record.',
          'Check whether the target service still exists — error messages like "There isn\'t a GitHub Pages site here" signal claimability.',
          'Verify with takeover-checking tools against known vulnerable service fingerprints.',
          'Confirm ownership claim is possible in a proof-of-concept (claim a dummy service, then release).'
        ],
        t: [
          'Enumerasi semua subdomain: `subfinder -d target.com`, lalu resolve masing-masing.',
          'Untuk setiap CNAME, identifikasi layanan target dari record-nya.',
          'Cek apakah layanan target masih ada — pesan error seperti "There isn\'t a GitHub Pages site here" menandakan bisa diklaim.',
          'Verifikasi dengan tool takeover-checker terhadap fingerprint layanan rentan yang diketahui.',
          'Konfirmasi klaim kepemilikan dalam proof-of-concept (klaim layanan dummy, lalu lepas).'
        ],
        b: [
          'Cacah semua subdomain: `subfinder -d target.com`, lalu selesaikan masing-masing.',
          'Untuk tiap CNAME, identifikasi layanan sasaran dari catatannya.',
          'Periksa apakah layanan sasaran masih ada — pesan galat seperti "There isn\'t a GitHub Pages site here" menandakan dapat diklaim.',
          'Verifikasi dengan alat pemeriksa pengambilalihan terhadap sidik layanan rentan yang diketahui.',
          'Konfirmasi klaim kepemilikan dalam bukti-nyata (klaim layanan dummy, lalu lepaskan).'
        ],
        s: [
          'Kumpulkan semua subdomain dengan `subfinder -d target.com`, lalu cek satu per satu.',
          'Lihat ke mana tiap subdomain menunjuk (record CNAME).',
          'Kalau layanan tujuannya sudah tidak ada (misal halaman GitHub kosong), itu bisa diklaim.',
          'Gunakan tool cek takeover — dia tahu sidik tiap layanan yang rentan.',
          'Buktikan dengan mengklaim layanan percobaan — lalu lepas kembali.'
        ]
      },
      tools: ['subfinder', 'dig', 'can-i-take-over-xyz (GitHub)', 'nuclei'],
      remediation: {
        en: 'Before deleting any external service, remove the DNS record pointing to it. Audit DNS regularly for dangling CNAMEs and claims.',
        t: 'Sebelum menghapus layanan eksternal apa pun, hapus record DNS yang menunjuk ke sana. Audit DNS secara rutin untuk CNAME menggantung.',
        b: 'Catatan DNS yang masih mengarah ke layanan eksternal harus dihapus lebih dahulu sebelum layanan tersebut dipensiunkan. Lakukan pemeriksaan DNS secara berkala untuk menemukan CNAME yang menggantung.',
        s: 'Kalau mau hapus layanan luar, hapus dulu DNS yang nunjuk ke sana. Rutin cek DNS — cari titikan ke layanan yang sudah mati.'
      }
    },

    {
      name_en: 'Test Cloud Storage',
      name_id: { t: 'Uji Cloud Storage', b: 'Uji Penyimpanan Awan', s: 'Cek Bucket Cloud' },
      summary: {
        en: 'Cloud storage buckets (S3, Azure Blob, GCS) are commonly misconfigured public. Read exposure leaks data; write exposure lets attackers plant malware or deface content.',
        t: 'Bucket cloud storage (S3, Azure Blob, GCS) umumnya salah konfigurasi menjadi publik. Eksposur baca membocorkan data; eksposur tulis membiarkan penyerang menanam malware atau merusak konten.',
        b: 'Ember penyimpanan awan (S3, Azure Blob, GCS) umumnya salah konfigurasi sehingga menjadi publik. Paparan baca membocorkan data, sedangkan paparan tulis memungkinkan penyerang menanam malware atau merusak konten.',
        s: 'Penyimpanan cloud (S3, Google, Azure) sering lupa dikunci. Bisa dibaca = bocor data. Bisa ditulis = penyerang bisa pasang malware.'
      },
      howto: {
        en: [
          'Enumerate bucket URLs from the app: check JS/config for `s3.amazonaws.com`, `blob.core.windows.net`, `storage.googleapis.com` references.',
          'Test anonymous read: `curl https://bucket.s3.amazonaws.com/` and try listing (`?list-type=2`).',
          'Test anonymous write: attempt a PUT of a harmless file, then delete it.',
          'Check bucket policy and ACLs if credentials are in scope — look for `AllUsers` grants.',
          'Look for account IDs and temporary credentials leaked in JS or error pages.'
        ],
        t: [
          'Enumerasi URL bucket dari aplikasi: cek JS/config untuk referensi `s3.amazonaws.com`, `blob.core.windows.net`, `storage.googleapis.com`.',
          'Uji baca anonim: `curl https://bucket.s3.amazonaws.com/` dan coba listing (`?list-type=2`).',
          'Uji tulis anonim: coba PUT file tidak berbahaya, lalu hapus.',
          'Cek bucket policy dan ACL jika kredensial dalam cakupan — cari grant `AllUsers`.',
          'Cari account ID dan kredensial sementara yang bocor di JS atau halaman error.'
        ],
        b: [
          'Cacah URL ember dari aplikasi: periksa JS/konfigurasi untuk referensi `s3.amazonaws.com`, `blob.core.windows.net`, `storage.googleapis.com`.',
          'Uji baca anonim: `curl https://bucket.s3.amazonaws.com/` dan coba mendaftar (`?list-type=2`).',
          'Uji tulis anonim: coba PUT berkas tak berbahaya, lalu hapus.',
          'Periksa kebijakan ember dan ACL bila kredensial dalam cakupan — cari pemberian `AllUsers`.',
          'Cari ID akun dan kredensial sementara yang bocor di JS atau halaman galat.'
        ],
        s: [
          'Cari alamat bucket di file JavaScript — `s3.amazonaws.com` dan sejenisnya.',
          'Coba buka bucket langsung di browser — kalau isinya keliatan, itu bocor.',
          'Coba unggah file percobaan — kalau berhasil, sangat serius. Hapus setelah uji.',
          'Kalau punya akses ke pengaturan, cek siapa saja yang diberi izin.',
          'Cari ID akun dan kredensial sementara yang bocor di JavaScript.'
        ]
      },
      tools: ['curl', 'awscli', 'S3Scanner', 'nuclei'],
      remediation: {
        en: 'Enable block-public-access at the account level, enforce least-privilege IAM policies, use pre-signed URLs for object access, and monitor bucket policies with drift detection.',
        t: 'Aktifkan block-public-access di level akun, tegakkan kebijakan IAM least-privilege, gunakan pre-signed URL untuk akses objek, dan pantau bucket policy dengan drift detection.',
        b: 'Aktifkan blokir-akses-publik di tingkat akun, tegakkan kebijakan IAM hak-minimum, gunakan URL pra-tanda untuk akses objek, dan pantau kebijakan ember dengan deteksi penyimpangan.',
        s: 'Matikan akses publik di setelan akun. Kasih izin seperlunya aja per orang. Buat akses file, pakai tautan sementara (pre-signed URL).'
      }
    },

    {
      name_en: 'Test Content Security Policy',
      name_id: { t: 'Uji Content Security Policy (CSP)', b: 'Uji Kebijakan Keamanan Konten (CSP)', s: 'Uji CSP' },
      summary: {
        en: 'CSP is the strongest anti-XSS mitigation available. Test whether it exists, how strict it is, and whether unsafe constructs (unsafe-inline, wildcards, JSONP endpoints) render it useless.',
        t: 'CSP adalah mitigasi anti-XSS terkuat yang tersedia. Uji keberadaannya, seberapa ketat, dan apakah konstruksi tidak aman (unsafe-inline, wildcard, endpoint JSONP) membuatnya tidak berguna.',
        b: 'Kebijakan Keamanan Konten (CSP) merupakan pertahanan anti-XSS paling ampuh yang tersedia. Pengujian perlu menilai ada atau tidaknya kebijakan tersebut, seberapa ketat aturannya, dan apakah konstruksi yang berisiko — seperti unsafe-inline, wildcard, maupun endpoint JSONP — membuatnya sia-sia.',
        s: 'CSP itu tameng terkuat melawan XSS. Cek apa ada, seberapa ketat, dan apakah ada celah yang membuatnya percuma.'
      },
      howto: {
        en: [
          'Fetch the `Content-Security-Policy` header and analyze the directives: default-src, script-src, object-src.',
          'Flag unsafe constructs: `unsafe-inline`, `unsafe-eval`, wildcard origins (`https://`), and missing `default-src`.',
          'Check for script injection surfaces allowed by the policy — e.g. allowed CDNs hosting Angular/JSONP gadgets.',
          'Test XSS payloads against the CSP in a real browser to verify enforcement.',
          'Evaluate report-only mode — policies in report-only do not protect anyone.'
        ],
        t: [
          'Ambil header `Content-Security-Policy` dan analisis direktifnya: default-src, script-src, object-src.',
          'Tandai konstruksi tidak aman: `unsafe-inline`, `unsafe-eval`, origin wildcard (`https://`), dan tidak adanya `default-src`.',
          'Cek surface injeksi script yang diizinkan kebijakan — mis. CDN terpercaya yang meng-hosting gadget Angular/JSONP.',
          'Uji payload XSS terhadap CSP di browser nyata untuk verifikasi penegakan.',
          'Evaluasi mode report-only — kebijakan report-only tidak melindungi siapa pun.'
        ],
        b: [
          'Ambil tajuk `Content-Security-Policy` dan analisis direktifnya: default-src, script-src, object-src.',
          'Tandai konstruksi tak aman: `unsafe-inline`, `unsafe-eval`, asal wildcard (`https://`), dan absennya `default-src`.',
          'Periksa permukaan penyuntikan skrip yang diizinkan kebijakan — mis. CDN tepercaya yang meng-hosting gadget Angular/JSONP.',
          'Uji muatan XSS terhadap CSP di peramban nyata untuk memastikan penegakan.',
          'Evaluasi mode laporan-saja — kebijakan laporan-saja tidak melindungi siapa pun.'
        ],
        s: [
          'Baca header CSP dari respons situs — perhatikan `script-src` dan `default-src`.',
          'Bahaya kalau ada `unsafe-inline` atau `unsafe-eval` — tamengnya jadi berlubang.',
          'Kalau kebijakan mengizinkan CDN besar, gadget di sana bisa disalahgunakan.',
          'Uji payload XSS sungguhan di browser — apakah CSP benar-benar memblokir?',
          'Mode `Content-Security-Policy-Report-Only` itu hanya laporan, bukan perlindungan.'
        ]
      },
      tools: ['curl', 'CSP Evaluator (Google)', 'browser dev tools', 'Burp Suite'],
      remediation: {
        en: 'Deploy a strict CSP: explicit script-src with nonces, no unsafe-inline, tight object-src, and migrate to report-only first before enforcing.',
        t: 'Terapkan CSP ketat: script-src eksplisit dengan nonce, tanpa unsafe-inline, object-src ketat, dan migrasi lewat report-only dulu sebelum menegakkan.',
        b: 'Terapkan CSP ketat: script-src eksplisit dengan nonce, tanpa unsafe-inline, object-src ketat, dan bermigrasi melalui mode laporan-saja dulu sebelum ditegakkan.',
        s: 'Pasang CSP ketat: daftar sumber script jelas, pakai nonce, tanpa `unsafe-inline`. Uji dulu di mode laporan sebelum dinyalakan penuh.'
      }
    },

    {
      name_en: 'Test for Path Confusion',
      name_id: { t: 'Uji Path Confusion', b: 'Uji Kekacauan Jalur', s: 'Uji Kekacauan Alamat' },
      summary: {
        en: 'Path confusion makes the web server and upstream systems (proxies, caches, frameworks) disagree about what a URL path means — often via encoded slashes or backslashes — causing ACL bypass or cache poisoning.',
        t: 'Path confusion membuat web server dan sistem upstream (proxy, cache, framework) berbeda pendapat tentang arti sebuah path URL — sering via slash ter-encode atau backslash — menyebabkan bypass ACL atau cache poisoning.',
        b: 'Kekacauan jalur membuat peladen web dan sistem hulu (proksi, singgahan, kerangka kerja) berbeda pendapat tentang arti sebuah jalur URL — sering lewat garis miring terenkode atau garis miring terbalik — menyebabkan pintasan ACL atau keracunan singgahan.',
        s: 'Server dan sistem di belakangnya kadang beda pendapat soal arti sebuah alamat — pakai trik enkode, proteksi bisa terlewati.'
      },
      howto: {
        en: [
          'Test encoded separators: `%2f` (`/`) and `%5c` (`\\`) within paths against routing rules.',
          'Compare how the app, proxy, and cache each normalize the path — send the same variant twice and observe differences.',
          'Probe ACL boundaries: request an admin path with encoded slashes to see if controls match the decoded version.',
          'Test semicolon path parameters (`/admin;x=1`) — some frameworks treat these as route matches.',
          'Observe cache keys: differing normalization between cache and origin can poison cached responses.'
        ],
        t: [
          'Uji separator ter-encode: `%2f` (`/`) dan `%5c` (`\\`) di dalam path terhadap rule routing.',
          'Bandingkan bagaimana app, proxy, dan cache masing-masing menormalkan path — kirim varian sama dua kali dan amati perbedaannya.',
          'Sondai batas ACL: request path admin dengan slash ter-encode untuk melihat apakah kontrol mencocokkan versi ter-decode.',
          'Uji parameter path semicolon (`/admin;x=1`) — beberapa framework memperlakukannya sebagai kecocokan route.',
          'Amati cache key: perbedaan normalisasi antara cache dan origin bisa meracuni response yang di-cache.'
        ],
        b: [
          'Uji pemisah terenkode: `%2f` (`/`) dan `%5c` (`\\`) di dalam jalur terhadap aturan penghalaan.',
          'Bandingkan bagaimana app, proksi, dan singgahan menormalkan jalur — kirim varian sama dua kali dan amati perbedaannya.',
          'Sondasi batas ACL: minta jalur admin dengan garis miring terenkode untuk melihat apakah kontrol mencocokkan versi tersandi.',
          'Uji parameter jalur titik-koma (`/admin;x=1`) — sebagian kerangka kerja menganggapnya kecocokan rute.',
          'Amati kunci singgahan: perbedaan normalisasi antara singgahan dan asal dapat meracuni respons tersinggah.'
        ],
        s: [
          'Coba `%2f` atau `%5c` di tengah alamat — kadang proteksi bingung, server tidak.',
          'Kirim alamat yang sama berkali-kali — bandingkan respons dari proxy dan cache.',
          'Coba akses halaman admin dengan alamat ter-enkode — apakah masih terblokir?',
          'Coba `/admin;x=1` — trik titik-koma ini menipu beberapa framework.',
          'Kalau cache dan server beda pendapat soal alamat, respons bisa diracuni.'
        ]
      },
      tools: ['curl', 'Burp Suite', 'browser'],
      remediation: {
        en: 'Normalize URLs identically at every layer before matching: decode once, match once. Reject requests with encoded path separators and align proxy/cache/framework normalization rules.',
        t: 'Normalkan URL secara identik di setiap lapisan sebelum pencocokan: decode sekali, cocokkan sekali. Tolak request dengan separator path ter-encode dan selaraskan rule normalisasi proxy/cache/framework.',
        b: 'Normalkan URL secara identik pada setiap lapisan sebelum pencocokan: saksikan sekali, cocokkan sekali. Tolak permintaan dengan pemisah jalur terenkode dan selarankan aturan normalisasi proksi/singgahan/kerangka kerja.',
        s: 'Semua lapisan (proxy, cache, server) harus membaca alamat dengan cara yang sama: decode sekali, cocokkan sekali. Tolak alamat berisi karakter ter-enkode mencurigakan.'
      }
    },

    {
      name_en: 'Test for Other HTTP Security Header Misconfigurations',
      name_id: { t: 'Uji Misconfiguration Header Keamanan HTTP Lainnya', b: 'Uji Salah Konfigurasi Tajuk Keamanan HTTP Lainnya', s: 'Cek Header Keamanan Lain' },
      summary: {
        en: 'Beyond HSTS and CSP, a cluster of headers hardens responses: X-Frame-Options/frame-ancestors (clickjacking), X-Content-Type-Options (MIME sniffing), Referrer-Policy, Permissions-Policy, and cache controls on sensitive responses.',
        t: 'Di luar HSTS dan CSP, ada kelompok header yang mengeraskan response: X-Frame-Options/frame-ancestors (clickjacking), X-Content-Type-Options (MIME sniffing), Referrer-Policy, Permissions-Policy, dan cache control pada response sensitif.',
        b: 'Di luar HSTS dan CSP, ada kumpulan tajuk yang memperkeras respons: X-Frame-Options/frame-ancestors (clickjacking), X-Content-Type-Options (penciuman MIME), Referrer-Policy, Permissions-Policy, dan kendali singgahan pada respons sensitif.',
        s: 'Masih ada header lain yang melindungi: anti-clickjacking, anti-MIME-sniffing, dan aturan cache. Cek satu per satu.'
      },
      howto: {
        en: [
          'Inventory response headers on key pages: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.',
          'Check for missing `X-Content-Type-Options: nosniff` — enables stored XSS via uploaded "text" files.',
          'Test framing: load the page in an iframe — DENY or CSP frame-ancestors should prevent it.',
          'Inspect `Cache-Control` on authenticated responses — user data must not cache on shared caches.',
          'Look for CORS misconfigurations while auditing headers: `Access-Control-Allow-Origin: *` with credentials.'
        ],
        t: [
          'Inventarisasi response header di halaman kunci: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.',
          'Cek tidak adanya `X-Content-Type-Options: nosniff` — memungkinkan stored XSS via file "teks" yang diupload.',
          'Uji framing: muat halaman dalam iframe — DENY atau CSP frame-ancestors harus mencegahnya.',
          'Periksa `Cache-Control` pada response terautentikasi — data user tidak boleh ter-cache di cache bersama.',
          'Cari misconfiguration CORS saat mengaudit header: `Access-Control-Allow-Origin: *` dengan credentials.'
        ],
        b: [
          'Inventarisasi tajuk respons pada halaman utama: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.',
          'Periksa absennya `X-Content-Type-Options: nosniff` — memungkinkan XSS tersimpan lewat berkas "teks" yang diunggah.',
          'Uji pembingkaian: muat halaman dalam iframe — DENY atau frame-ancestors CSP harus mencegahnya.',
          'Periksa `Cache-Control` pada respons terautentikasi — data pengguna tidak boleh tersinggah pada singgahan bersama.',
          'Cari salah konfigurasi CORS saat mengaudit tajuk: `Access-Control-Allow-Origin: *` dengan kredensial.'
        ],
        s: [
          'Baca semua header respons halaman utama — catat yang hilang.',
          'Tanpa `nosniff`, file upload jahat bisa dieksekusi sebagai script.',
          'Coba muat halaman di iframe — kalau bisa, itu celah clickjacking.',
          'Halaman setelah login harus punya `Cache-Control: no-store` — jangan sampai data user tersimpan di warung internet.',
          'Sekalian cek CORS — `Access-Control-Allow-Origin: *` plus credentials itu bahaya.'
        ]
      },
      tools: ['curl', 'securityheaders.com', 'browser dev tools'],
      remediation: {
        en: 'Ship the full header set: nosniff, frame-ancestors (CSP) or X-Frame-Options, Referrer-Policy, Permissions-Policy, and Cache-Control no-store on all authenticated responses.',
        t: 'Kirim set header lengkap: nosniff, frame-ancestors (CSP) atau X-Frame-Options, Referrer-Policy, Permissions-Policy, dan Cache-Control no-store di semua response terautentikasi.',
        b: 'Sertakan kumpulan tajuk yang lengkap: nosniff, frame-ancestors (CSP) atau X-Frame-Options, Referrer-Policy, Permissions-Policy, dan Cache-Control no-store pada setiap respons terautentikasi.',
        s: 'Lengkapi semua header: nosniff, anti-iframe, Referrer-Policy, Permissions-Policy, dan larangan cache untuk halaman setelah login.'
      }
    }
  ]
});
