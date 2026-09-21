/* WSTG Bilingual — 4.1 Information Gathering (10 tests)
   Condensed bilingual adaptation, CC BY-SA 4.0. Registers: t=Teknis, b=Baku, s=Sederhana. */
window.WSTG_DATA = window.WSTG_DATA || [];
window.WSTG_DATA.push({
  order: 1, code: 'INFO',
  name_en: 'Information Gathering',
  desc_en: 'Reconnaissance, fingerprinting & attack surface mapping',
  name_id: { t: 'Pengumpulan Informasi (Information Gathering)', b: 'Pengumpulan Informasi', s: 'Mengumpulkan Info' },
  desc_id: { t: 'Reconnaissance, fingerprinting & pemetaan attack surface', b: 'Reconnaissance, identifikasi sidik & pemetaan permukaan serangan', s: 'Ngintip dulu: apa situsnya, pakai apa, di mana buka celahnya' },
  tests: [

    {
      name_en: 'Conduct Search Engine Reconnaissance for Information Leakage',
      name_id: { t: 'Lakukan Reconnaissance Mesin Pencari untuk Kebocoran Informasi', b: 'Lakukan Pengintaian melalui Mesin Pencari untuk Kebocoran Informasi', s: 'Cari bocoran lewat Google' },
      summary: {
        en: 'Search engines index far more of a target than developers realize — old backups, admin panels, error pages, and documents leak into results. Use search engine recon to harvest this leakage before touching the target directly.',
        t: 'Mesin pencari mengindeks jauh lebih banyak dari yang disadari pengembang — backup lama, panel admin, halaman error, dan dokumen bisa bocor ke hasil pencarian. Gunakan recon mesin pencari untuk memanen kebocoran ini sebelum menyentuh target secara langsung.',
        b: 'Mesin pencari mengindeks jauh lebih banyak halaman daripada yang disadari pengembang — cadangan lama, panel admin, halaman galat, dan dokumen dapat terbocorkan ke hasil pencarian. Gunakan penelusuran melalui mesin pencari untuk mengumpulkan kebocoran tersebut sebelum menghubungi sasaran secara langsung.',
        s: 'Google sering nyimpen halaman yang seharusnya nggak buat publik — file lama, halaman admin, dokumen internal. Kita manfaatkan itu dulu, gratis dan tanpa menyentuh server target.'
      },
      howto: {
        en: [
          'Query the target domain on Google/Bing with operators like `site:target.com`, `site:target.com filetype:pdf`, `site:target.com inurl:admin`.',
          'Check cached and archived copies (Wayback Machine) for pages that were removed but still indexed.',
          'Look for indexed backup files (`.bak`, `.old`, `.sql`), directory listings, and log files.',
          'Search for exposed documents containing credentials, internal hostnames, or emails: `site:target.com password`, `site:target.com confidential`.',
          'Review metapath files — `robots.txt`, `sitemap.xml` — for hidden paths that reveal structure.'
        ],
        t: [
          'Query domain target di Google/Bing dengan operator seperti `site:target.com`, `site:target.com filetype:pdf`, `site:target.com inurl:admin`.',
          'Periksa salinan cache dan arsip (Wayback Machine) untuk halaman yang sudah dihapus tapi masih terindeks.',
          'Cari file backup yang terindeks (`.bak`, `.old`, `.sql`), directory listing, dan file log.',
          'Cari dokumen terekspos berisi kredensial, hostname internal, atau email: `site:target.com password`, `site:target.com confidential`.',
          'Tinjau metapath file — `robots.txt`, `sitemap.xml` — untuk path tersembunyi yang membocorkan struktur.'
        ],
        b: [
          'Kueri domain sasaran pada Google/Bing dengan operator seperti `site:target.com`, `site:target.com filetype:pdf`, `site:target.com inurl:admin`.',
          'Periksa salinan singgahan dan arsip (Wayback Machine) untuk halaman yang telah dihapus namun masih terindeks.',
          'Cari berkas cadangan yang terindeks (`.bak`, `.old`, `.sql`), daftar direktori, dan berkas log.',
          'Cari dokumen yang terbuka berisi kredensial, nama host internal, atau surel: `site:target.com password`, `site:target.com confidential`.',
          'Telaah berkas metajalur — `robots.txt`, `sitemap.xml` — untuk jalur tersembunyi yang membocorkan struktur.'
        ],
        s: [
          'Ketik di Google: `site:target.com` — lihat semua halaman milik target yang keindeks. Tambahkan `filetype:pdf` atau `inurl:admin` buat hasil lebih tajam.',
          'Buka Wayback Machine — kadang halaman yang sudah dihapus dari situs masih tersimpan di arsip.',
          'Cari file bekas seperti `.bak`, `.old`, `.sql` — ini emas kalau ketemu.',
          'Coba juga `site:target.com password` atau `confidential` — dokumen internal sering nyangkut.',
          'Baca `robots.txt` dan `sitemap.xml` — di situ sering ada daftar halaman rahasia.'
        ]
      },
      tools: ['Google', 'Bing', 'Wayback Machine', 'Shodan', 'theHarvester'],
      remediation: {
        en: 'Keep crawlers away from sensitive paths via robots/meta controls, but never rely on robots.txt for secrecy — enforce access control. Remove stale files, and monitor what search engines index about your domain.',
        t: 'Kendalikan crawler dari path sensitif via robots/meta, tetapi jangan pernah mengandalkan robots.txt untuk kerahasiaan — terapkan access control. Hapus file usang, dan pantau apa yang diindeks mesin pencari tentang domain Anda.',
        b: 'Kendalikan perayap dari jalur sensitif melalui robots/meta, namun jangan pernah mengandalkan robots.txt demi kerahasiaan — terapkan kontrol akses. Hapus berkas usang, dan pantau apa yang diindeks mesin pencari mengenai domain Anda.',
        s: 'Jangan pernah percaya robots.txt bisa nyembunyiin halaman — kunci halaman sensitifnya dengan login. Hapus file lama yang nggak kepake, dan sesekali Google-kan domain sendiri buat lihat apa yang bocor.'
      }
    },

    {
      name_en: 'Fingerprint Web Server',
      name_id: { t: 'Fingerprinting Web Server', b: 'Identifikasi Perangkat Lunak Peladen Web', s: 'Kenali Server Webnya' },
      summary: {
        en: 'The first active step: determine what web server software runs on the target. Server banners, error pages, and header behavior reveal version and OS, which map directly to known CVEs.',
        t: 'Langkah aktif pertama: tentukan software web server apa yang berjalan di target. Banner server, halaman error, dan perilaku header membocorkan versi dan OS — yang langsung dipetakan ke CVE yang diketahui.',
        b: 'Langkah aktif pertama: tentukan perangkat lunak peladen web apa yang berjalan pada sasaran. Spanduk peladen, halaman galat, dan perilaku tajuk membocorkan versi dan sistem operasi — yang langsung dipetakan ke CVE yang telah diketahui.',
        s: 'Sebelum nyerang, kenalan dulu: servernya pakai Apache, Nginx, atau IIS? Versi berapa? Kalau tahu, kita langsung bisa cari celah yang udah diketahui orang.'
      },
      howto: {
        en: [
          'Send a simple request with `curl -I http://target.com` and read the `Server` header.',
          'Trigger error pages (request a nonexistent path) — default error pages often name the server and version.',
          'Inspect HTTP headers ordering and unusual headers; each server has a fingerprintable signature.',
          'Use automated tools like `whatweb` or `nmap -sV -p 80,443 target.com` to confirm.',
          'Compare against known CVE databases for the exact version found.'
        ],
        t: [
          'Kirim request sederhana dengan `curl -I http://target.com` dan baca header `Server`.',
          'Picu halaman error (request path yang tidak ada) — halaman error default sering menampilkan nama dan versi server.',
          'Periksa urutan header HTTP dan header tidak biasa; setiap server punya signature yang bisa di-fingerprint.',
          'Gunakan tool otomatis seperti `whatweb` atau `nmap -sV -p 80,443 target.com` untuk konfirmasi.',
          'Bandingkan dengan database CVE yang diketahui untuk versi persis yang ditemukan.'
        ],
        b: [
          'Kirim permintaan sederhana dengan `curl -I http://target.com` dan baca tajuk `Server`.',
          'Picu halaman galat (minta jalur yang tidak ada) — halaman galat bawaan sering menampilkan nama dan versi peladen.',
          'Periksa urutan tajuk HTTP dan tajuk yang tidak biasa; setiap peladen memiliki tanda yang dapat diidentifikasi.',
          'Gunakan alat otomatis seperti `whatweb` atau `nmap -sV -p 80,443 target.com` untuk memastikan.',
          'Bandingkan dengan pangkalan data CVE yang diketahui untuk versi tepat yang ditemukan.'
        ],
        s: [
          'Jalankan `curl -I http://target.com` — lihat header `Server`, biasanya langsung kelihatan namanya.',
          'Coba buka halaman yang nggak ada (misal `/xyz`) — halaman error bawaan sering menampilkan versi lengkap.',
          'Perhatikan urutan dan jenis header — tiap server punya "wajah" khas.',
          'Konfirmasi pakai `whatweb` atau `nmap -sV -p 80,443 target.com`.',
          'Kalau versinya ketemu, cari CVE-nya di internet — di sanalah celahnya.'
        ]
      },
      tools: ['curl', 'whatweb', 'nmap', 'Netcat', 'httprint'],
      remediation: {
        en: 'Strip or generalize server banners, use custom error pages, and keep server software patched. Obscurity is not a fix — it just buys time.',
        t: 'Hapus atau generalisasi banner server, gunakan halaman error kustom, dan patch software server secara rutin. Obscurity bukan perbaikan — hanya membeli waktu.',
        b: 'Hapus atau samarkan spanduk peladen, gunakan halaman galat kustom, dan perbarui perangkat lunak peladen secara rutin. Pengaburan bukan perbaikan — hanya menunda.',
        s: 'Sembunyikan versi server di header, ganti halaman error bawaan, dan rajin update. Ini bukan penyembuhan — cuma nambah waktu.'
      }
    },

    {
      name_en: 'Review Webserver Metafiles for Information Leakage',
      name_id: { t: 'Tinjau Metafile Web Server untuk Kebocoran Informasi', b: 'Telaah Berkas Meta Peladen Web untuk Kebocoran Informasi', s: 'Periksa File robots.txt & sitemap' },
      summary: {
        en: 'robots.txt, sitemap.xml, and other metafiles reveal application structure and hidden paths. Attackers read them as a free map of the target.',
        t: 'robots.txt, sitemap.xml, dan metafile lainnya membocorkan struktur aplikasi dan path tersembunyi. Penyerang membacanya sebagai peta gratis target.',
        b: 'robots.txt, sitemap.xml, dan berkas meta lainnya membocorkan struktur aplikasi beserta jalur tersembunyi. Penyerang membacanya sebagai peta gratis menuju sasaran.',
        s: 'robots.txt itu macam daftar isi rahasia — sering malah nunjukin halaman yang nggak mau dilihat orang. Kita baca dulu.'
      },
      howto: {
        en: [
          'Fetch `http://target.com/robots.txt` and list every `Disallow` path.',
          'Fetch `/sitemap.xml` and inventory all listed URLs.',
          'Look for metafiles in hidden locations: `.well-known/`, `humans.txt`, `security.txt`, DSD metafiles.',
          'Compare discovered paths against the sitemap to find deliberately-hidden areas.',
          'Probe each interesting path for accessibility — disallowed in robots does not mean protected.'
        ],
        t: [
          'Ambil `http://target.com/robots.txt` dan daftarkan setiap path `Disallow`.',
          'Ambil `/sitemap.xml` dan inventarisasi semua URL yang tercantum.',
          'Cari metafile di lokasi tersembunyi: `.well-known/`, `humans.txt`, `security.txt`, DSD metafile.',
          'Bandingkan path yang ditemukan dengan sitemap untuk menemukan area yang sengaja disembunyikan.',
          'Uji setiap path menarik untuk aksesibilitasnya — Disallow di robots tidak berarti terlindungi.'
        ],
        b: [
          'Unduh `http://target.com/robots.txt` dan catat setiap jalur `Disallow`.',
          'Unduh `/sitemap.xml` dan inventarisasi semua URL yang tercantum.',
          'Cari berkas meta di lokasi tersembunyi: `.well-known/`, `humans.txt`, `security.txt`, berkas meta DSD.',
          'Bandingkan jalur yang ditemukan dengan peta situs untuk menemukan area yang sengaja disembunyikan.',
          'Uji setiap jalur menarik untuk aksesibilitasnya — dilarang di robots tidak berarti terlindungi.'
        ],
        s: [
          'Buka `target.com/robots.txt` — catat semua path yang dilarang. Justru itu yang menarik.',
          'Buka juga `sitemap.xml` — daftar halaman resminya.',
          'Cek lokasi tersembunyi: `.well-known/`, `humans.txt`, `security.txt`.',
          'Bandingkan dua daftar itu — yang ada di robots tapi nggak di sitemap biasanya rahasia.',
          'Coba akses path yang dilarang — "dilarang dijelajah" bukan berarti "terkunci".'
        ]
      },
      tools: ['curl', 'browser', 'Wayback Machine'],
      remediation: {
        en: 'Never list secret paths in robots.txt. Remove sitemap entries for sensitive areas, and protect anything sensitive with authentication rather than obscurity.',
        t: 'Jangan pernah mencantumkan path rahasia di robots.txt. Hapus entri sitemap untuk area sensitif, dan lindungi yang sensitif dengan authentication, bukan obscurity.',
        b: 'Jangan pernah mencantumkan jalur rahasia di robots.txt. Hapus entri peta situs untuk area sensitif, dan lindungi area sensitif dengan autentikasi, bukan dengan pengaburan.',
        s: 'Jangan nulis halaman rahasia di robots.txt — itu sama aja ngasih tahu penyerang. Kuncinya dengan login, bukan disembunyiin.'
      }
    },

    {
      name_en: 'Attack Surface Identification',
      name_id: { t: 'Identifikasi Attack Surface', b: 'Identifikasi Permukaan Serangan', s: 'Petakan Semua Pintu Masuk' },
      summary: {
        en: 'Map every entry point the application exposes: endpoints, parameters, file uploads, forms, APIs, and network services. A complete inventory is the foundation of every later test.',
        t: 'Petakan setiap entry point yang terekspos aplikasi: endpoint, parameter, file upload, form, API, dan layanan jaringan. Inventaris lengkap adalah fondasi semua pengujian selanjutnya.',
        b: 'Petakan setiap titik masuk yang terbuka pada aplikasi: endpoint, parameter, unggah berkas, formulir, API, dan layanan jaringan. Inventaris lengkap adalah fondasi seluruh pengujian berikutnya.',
        s: 'Hitung semua pintu yang bisa dimasuki: halaman form, upload file, API, parameter URL. Daftar lengkap ini peta kita selanjutnya.'
      },
      howto: {
        en: [
          'Crawl the application with a spider (Burp/ZAP) to enumerate all endpoints, parameters, and forms.',
          'Review JavaScript files for API routes and hidden endpoints not linked in the UI.',
          'Inventory file upload fields, download endpoints, and redirect parameters.',
          'Enumerate network services beyond HTTP: `nmap -sV target.com`.',
          'Check for old/legacy versions of the app on subdomains or staging hosts.',
          'Document everything in an attack-surface matrix: entry point, method, parameters, auth required.'
        ],
        t: [
          'Crawl aplikasi dengan spider (Burp/ZAP) untuk mengenumerasi semua endpoint, parameter, dan form.',
          'Tinjau file JavaScript untuk route API dan endpoint tersembunyi yang tidak terlink di UI.',
          'Inventarisasi field upload file, endpoint download, dan parameter redirect.',
          'Enumerasi layanan jaringan di luar HTTP: `nmap -sV target.com`.',
          'Periksa versi lama/legacy aplikasi di subdomain atau host staging.',
          'Dokumentasikan semuanya dalam matriks attack surface: entry point, method, parameter, auth yang dibutuhkan.'
        ],
        b: [
          'Jelajahi aplikasi dengan perayap (Burp/ZAP) untuk mencacah semua endpoint, parameter, dan formulir.',
          'Telaah berkas JavaScript untuk rute API dan endpoint tersembunyi yang tidak tertaut di antarmuka.',
          'Inventarisasi bidang unggah berkas, endpoint unduhan, dan parameter pengalihan.',
          'Cacah layanan jaringan di luar HTTP: `nmap -sV target.com`.',
          'Periksa versi lama aplikasi pada subdomain atau host staging.',
          'Dokumentasikan semuanya dalam matriks permukaan serangan: titik masuk, metode, parameter, autentikasi yang disyaratkan.'
        ],
        s: [
          'Jalankan spider Burp atau ZAP — biarkan dia merayap dan mencatat semua halaman, form, dan parameter.',
          'Buka file JavaScript situsnya — di dalamnya sering ada alamat API yang nggak nampak di menu.',
          'Catat semua tempat upload file, link download, dan parameter redirect.',
          'Pindai port juga: `nmap -sV target.com` — kadang ada layanan lain yang jalan.',
          'Cek subdomain — versi lama aplikasi sering nyangkut di tempat itu.',
          'Buat tabel: pintu masuk, metode, parameter, perlu login atau nggak.'
        ]
      },
      tools: ['Burp Suite', 'OWASP ZAP', 'nmap', 'ffuf', 'gobuster', 'subfinder'],
      remediation: {
        en: 'Minimize exposed surface: remove legacy endpoints, disable unused services, require auth on all sensitive routes, and keep an inventory of your own attack surface.',
        t: 'Minimalkan surface yang terekspos: hapus endpoint legacy, matikan layanan yang tidak dipakai, wajibkan auth di semua route sensitif, dan kelola inventaris attack surface Anda sendiri.',
        b: 'Perkecil permukaan yang terbuka: hapus endpoint usang, matikan layanan yang tak terpakai, wajibkan autentikasi pada semua rute sensitif, dan kelola inventaris permukaan serangan Anda sendiri.',
        s: 'Perkecil jumlah pintu: hapus fitur lama, matikan layanan nggak kepake, kunci semua halaman sensitif dengan login. Tahu punya pintu berapa aja itu setengah kemenangan.'
      }
    },

    {
      name_en: 'Review Web Page Content for Information Leakage',
      name_id: { t: 'Tinjau Konten Halaman Web untuk Kebocoran Informasi', b: 'Telaah Isi Halaman Web untuk Kebocoran Informasi', s: 'Bongkar Isi Kode Halaman' },
      summary: {
        en: 'Page source, comments, and hidden fields frequently leak internal IPs, emails, framework hints, debug tokens, and TODO notes. Read what the developers left behind.',
        t: 'Source halaman, komentar, dan hidden field sering membocorkan IP internal, email, petunjuk framework, token debug, dan catatan TODO. Baca apa yang ditinggalkan pengembang.',
        b: 'Sumber halaman, komentar, dan bidang tersembunyi sering membocorkan IP internal, surel, petunjuk kerangka kerja, token awakutu, dan catatan TODO. Baca apa yang ditinggalkan pengembang.',
        s: 'Buka "View Page Source" — komentar HTML dan field tersembunyi sering nyimpen alamat IP internal, email, atau catatan pengembang yang lupa dihapus.'
      },
      howto: {
        en: [
          'View source on key pages; grep for comments containing `TODO`, `FIXME`, internal IPs, emails, and paths.',
          'Inspect hidden form fields for values like debug flags, internal IDs, or prices.',
          'Review JavaScript for hardcoded secrets, API keys, and internal endpoint URLs.',
          'Check image metadata (EXIF) for author names, software, and GPS coordinates.',
          'Examine HTTP response bodies for stack traces or debug output left in production.'
        ],
        t: [
          'View source di halaman kunci; grep komentar yang berisi `TODO`, `FIXME`, IP internal, email, dan path.',
          'Periksa hidden form field untuk nilai seperti flag debug, ID internal, atau harga.',
          'Tinjau JavaScript untuk secret yang di-hardcode, API key, dan URL endpoint internal.',
          'Periksa metadata gambar (EXIF) untuk nama penulis, software, dan koordinat GPS.',
          'Periksa body response HTTP untuk stack trace atau output debug yang tertinggal di production.'
        ],
        b: [
          'Lihat sumber halaman utama; telusuri komentar berisi `TODO`, `FIXME`, IP internal, surel, dan jalur.',
          'Periksa bidang formulir tersembunyi untuk nilai seperti penanda awakutu, ID internal, atau harga.',
          'Telaah JavaScript untuk kunci rahasia yang tertanam, kunci API, dan URL endpoint internal.',
          'Periksa metadata gambar (EXIF) untuk nama penulis, perangkat lunak, dan koordinat GPS.',
          'Periksa isi respons HTTP untuk jejak tumpukan atau keluaran awakutu yang tertinggal di produksi.'
        ],
        s: [
          'Klik kanan → View Page Source. Ctrl+F cari kata `TODO`, `FIXME`, angka IP, email — komentar pengembang sering lupa dihapus.',
          'Lihat form yang punya field `type="hidden"` — kadang isinya ID internal atau harga yang bisa dimanipulasi.',
          'Baca file JavaScript-nya — cari API key atau alamat internal yang tertulis langsung.',
          'Unduh gambar situsnya, cek metadata EXIF-nya — kadang ada nama orang dan lokasi GPS.',
          'Perhatikan response error — stack trace yang bocor itu banyak cerita.'
        ]
      },
      tools: ['browser dev tools', 'curl', 'exiftool', 'grep'],
      remediation: {
        en: 'Strip development comments from production builds, remove hidden fields that trust client data, externalize secrets, and scrub EXIF metadata from published images.',
        t: 'Hapus komentar development dari build production, hilangkan hidden field yang mempercayai data client, pisahkan secret keluar, dan bersihkan metadata EXIF dari gambar yang dipublikasikan.',
        b: 'Hapus komentar pengembangan dari build produksi, singkirkan bidang tersembunyi yang mempercayai data klien, pisahkan kunci rahasia, dan bersihkan metadata EXIF dari gambar yang dipublikasikan.',
        s: 'Hapus komentar coding sebelum rilis, jangan percaya data dari browser, simpan API key di server bukan di JavaScript, dan bersihkan metadata gambar.'
      }
    },

    {
      name_en: 'Identify Application Entry Points',
      name_id: { t: 'Identifikasi Entry Point Aplikasi', b: 'Identifikasi Titik Masuk Aplikasi', s: 'Temukan di Mana Data Masuk' },
      summary: {
        en: 'Entry points are where user-controlled data enters: URLs, parameters, headers, cookies, form bodies, and API calls. Every entry point is a potential injection channel.',
        t: 'Entry point adalah tempat masuk data yang dikontrol user: URL, parameter, header, cookie, body form, dan panggilan API. Setiap entry point adalah channel injection potensial.',
        b: 'Titik masuk adalah tempat masuknya data yang dikendalikan pengguna: URL, parameter, tajuk, kuki, isi formulir, dan panggilan API. Setiap titik masuk adalah jalur penyuntikan potensial.',
        s: 'Semua tempat yang nerima input dari user — URL, form, header, cookie — itu jalur masuk data. Nanti semua diuji dari sini.'
      },
      howto: {
        en: [
          'Proxy all traffic through Burp and browse every function of the app.',
          'Catalog each request: method, path, parameters (query/body), headers, and cookies.',
          'Note which endpoints accept file uploads, JSON/XML bodies, or unusual content types.',
          'Identify API endpoints from JS/network tab, including undocumented ones.',
          'Mark entry points that reflect input back — they are prime XSS/injection candidates.'
        ],
        t: [
          'Proxy semua trafik melalui Burp dan jelajahi setiap fungsi aplikasi.',
          'Katalogkan setiap request: method, path, parameter (query/body), header, dan cookie.',
          'Catat endpoint yang menerima file upload, body JSON/XML, atau content type tidak biasa.',
          'Identifikasi endpoint API dari tab JS/network, termasuk yang tidak terdokumentasi.',
          'Tandai entry point yang memantulkan input kembali — kandidat utama XSS/injection.'
        ],
        b: [
          'Proksi seluruh trafik melalui Burp dan jelajahi setiap fungsi aplikasi.',
          'Katalogkan setiap permintaan: metode, jalur, parameter (kueri/isi), tajuk, dan kuki.',
          'Catat endpoint yang menerima unggah berkas, isi JSON/XML, atau jenis konten yang tidak biasa.',
          'Identifikasi endpoint API dari tab JS/jaringan, termasuk yang tidak terdokumentasi.',
          'Tandai titik masuk yang memantulkan masukan kembali — kandidat utama XSS/penyuntikan.'
        ],
        s: [
          'Set browser lewat Burp, lalu pakai seluruh fitur situsnya — semua request kecatat.',
          'Buat daftar: alamat, metode, parameter, header, cookie — per halaman.',
          'Tandai yang nerima upload file atau JSON.',
          'Lihat tab Network — endpoint API yang nggak ada di menu sering kelihatan di sini.',
          'Beri tanda khusus di mana input kita muncul balik di response — itu kandidat serang utama.'
        ]
      },
      tools: ['Burp Suite', 'browser dev tools'],
      remediation: {
        en: 'Validate and constrain input at every entry point, remove undocumented endpoints from production, and centralize input handling so no route bypasses validation.',
        t: 'Validasi dan batasi input di setiap entry point, hapus endpoint tidak terdokumentasi dari production, dan pusatkan penanganan input agar tidak ada route yang melewati validasi.',
        b: 'Validasi dan batasi masukan pada setiap titik masuk, hapus endpoint yang tidak terdokumentasi dari produksi, dan pusatkan penanganan masukan agar tidak ada rute yang menghindari validasi.',
        s: 'Periksa semua input di semua pintu, hapus endpoint yang nggak resmi, dan jangan biarkan ada halaman yang lolos dari pemeriksaan input.'
      }
    },

    {
      name_en: 'Map Execution Paths Through Application',
      name_id: { t: 'Petakan Jalur Eksekusi Melalui Aplikasi', b: 'Petakan Lintasan Eksekusi dalam Aplikasi', s: 'Pahami Alur Aplikasinya' },
      summary: {
        en: 'Understand how the application flows from entry to sensitive action — registration → login → profile → payment. Knowing the intended path reveals where it can be shortcut or abused.',
        t: 'Pahami bagaimana aplikasi mengalir dari entry ke aksi sensitif — registrasi → login → profil → pembayaran. Mengetahui jalur yang dimaksud membocorkan di mana bisa dipersingkat atau disalahgunakan.',
        b: 'Pahami bagaimana aplikasi mengalir dari masukan ke tindakan sensitif — registrasi → login → profil → pembayaran. Mengetahui lintasan yang dimaksud mengungkap di mana ia dapat dipersingkat atau disalahgunakan.',
        s: 'Ikuti alur normal aplikasi dari daftar sampai bayar. Begitu tahu urutan yang benar, kita bisa cari tahu cara loncat-langkah.'
      },
      howto: {
        en: [
          'Walk through every user journey: register, verify, login, browse, buy, download, contact support.',
          'Record the request chain each journey produces (Burp logger keeps the sequence).',
          'Identify state-changing requests and what the app requires before allowing them.',
          'Test whether later steps are reachable directly without earlier ones (e.g., checkout without cart).',
          'Diagram the flows; mark where business rules seem to be enforced client-side only.'
        ],
        t: [
          'Jalani setiap user journey: register, verifikasi, login, browse, beli, download, hubungi support.',
          'Rekam rantai request yang dihasilkan tiap journey (Burp logger menyimpan sekuensnya).',
          'Identifikasi request yang mengubah state dan apa yang disyaratkan aplikasi sebelum mengizinkannya.',
          'Uji apakah langkah selanjutnya bisa dicapai langsung tanpa langkah sebelumnya (mis. checkout tanpa cart).',
          'Gambar diagram alurnya; tandai di mana business rule tampak hanya ditegakkan di sisi client.'
        ],
        b: [
          'Jalani setiap perjalanan pengguna: daftar, verifikasi, login, menelusuri, membeli, mengunduh, menghubungi dukungan.',
          'Rekam rantai permintaan yang dihasilkan tiap perjalanan (pencatat Burp menyimpan urutannya).',
          'Identifikasi permintaan yang mengubah keadaan dan apa yang disyaratkan aplikasi sebelum mengizinkannya.',
          'Uji apakah langkah berikutnya dapat dicapai langsung tanpa langkah sebelumnya (mis. checkout tanpa keranjang).',
          'Gambar diagram alurnya; tandai di mana aturan bisnis tampak hanya ditegakkan di sisi klien.'
        ],
        s: [
          'Jalanin semua fitur dari awal: daftar akun, verifikasi, login, belanja, download — semuanya.',
          'Di Burp, lihat urutan request-nya — itu jejak alurnya.',
          'Tandai request yang mengubah sesuatu (beli, ubah profil) dan syaratnya apa.',
          'Coba akses langkah akhir langsung tanpa lewat langkah awal — misal buka checkout tanpa isi keranjang.',
          'Gambar diagramnya; catat aturan yang cuma diperiksa di browser, bukan server.'
        ]
      },
      tools: ['Burp Suite', 'browser dev tools', 'draw.io / diagrams'],
      remediation: {
        en: 'Enforce workflow rules server-side: every state-changing request must verify the user is entitled to that step at that point in the flow.',
        t: 'Tegakkan rule workflow di sisi server: setiap request yang mengubah state harus memverifikasi bahwa user berhak pada langkah tersebut di titik itu dalam alur.',
        b: 'Tegakkan aturan alur kerja di sisi peladen: setiap permintaan yang mengubah keadaan harus memverifikasi bahwa pengguna berhak pada langkah tersebut pada titik itu dalam alur.',
        s: 'Semua aturan alur harus diperiksa di server. Browser bisa dimanipulasi — server tidak.'
      }
    },

    {
      name_en: 'Fingerprint Web Application Framework',
      name_id: { t: 'Fingerprinting Web Application Framework', b: 'Identifikasi Kerangka Kerja Aplikasi Web', s: 'Kenali Frameworknya' },
      summary: {
        en: 'Knowing the framework (Laravel, Django, Rails, Spring) tells you its default routes, known CVEs, and common misconfigurations. Frameworks leave fingerprints in headers, cookies, error pages, and file extensions.',
        t: 'Mengetahui framework (Laravel, Django, Rails, Spring) memberi tahu route default, CVE yang diketahui, dan misconfiguration umumnya. Framework meninggalkan jejak di header, cookie, halaman error, dan ekstensi file.',
        b: 'Mengetahui kerangka kerja (Laravel, Django, Rails, Spring) memberi tahu rute bawaan, CVE yang diketahui, dan salah konfigurasi umumnya. Kerangka kerja meninggalkan jejak pada tajuk, kuki, halaman galat, dan ekstensi berkas.',
        s: 'Tiap framework punya ciri khas — cookie, header, halaman error. Kalau kenal frameworknya, kita langsung tahu kelemahan umumnya.'
      },
      howto: {
        en: [
          'Inspect cookies and headers for framework signatures: `X-Powered-By`, `X-AspNet-Version`, Laravel session cookie names, Rails CSRF cookie.',
          'Check default file paths: `/wp-login.php` (WordPress), `/administrator` (Joomla), `/favicon.ico` hash comparison.',
          'Trigger errors — framework debug pages (Laravel Whoops, Django debug) are unmistakable.',
          'Use `whatweb` for automated framework detection.',
          'Match framework version against known CVEs.'
        ],
        t: [
          'Periksa cookie dan header untuk signature framework: `X-Powered-By`, `X-AspNet-Version`, nama session cookie Laravel, cookie CSRF Rails.',
          'Cek path file default: `/wp-login.php` (WordPress), `/administrator` (Joomla), perbandingan hash `/favicon.ico`.',
          'Picu error — halaman debug framework (Laravel Whoops, Django debug) sangat khas.',
          'Gunakan `whatweb` untuk deteksi framework otomatis.',
          'Cocokkan versi framework dengan CVE yang diketahui.'
        ],
        b: [
          'Periksa kuki dan tajuk untuk tanda kerangka kerja: `X-Powered-By`, `X-AspNet-Version`, nama kuki sesi Laravel, kuki CSRF Rails.',
          'Periksa jalur berkas bawaan: `/wp-login.php` (WordPress), `/administrator` (Joomla), perbandingan hash `/favicon.ico`.',
          'Picu galat — halaman awakutu kerangka kerja (Whoops Laravel, debug Django) sangat khas.',
          'Gunakan `whatweb` untuk deteksi otomatis.',
          'Cocokkan versi kerangka kerja dengan CVE yang diketahui.'
        ],
        s: [
          'Lihat cookie dan header — `X-Powered-By` atau nama cookie Laravel/ Rails langsung membuka identitasnya.',
          'Coba alamat khas: `/wp-login.php` itu WordPress, `/administrator` itu Joomla.',
          'Bikin error — halaman debug framework itu seperti kartu nama.',
          '`whatweb` bisa deteksi otomatis.',
          'Cari CVE framework + versinya di internet.'
        ]
      },
      tools: ['whatweb', 'Wappalyzer', 'curl', 'Burp Suite'],
      remediation: {
        en: 'Remove framework banners and version headers, disable debug mode in production, patch framework dependencies, and hide default administrative paths.',
        t: 'Hapus banner framework dan header versi, matikan debug mode di production, patch dependency framework, dan sembunyikan path administratif default.',
        b: 'Hapus spanduk kerangka kerja dan tajuk versi, matikan mode awakutu di produksi, tambal dependensi kerangka kerja, dan sembunyikan jalur administratif bawaan.',
        s: 'Hapus tanda framework di header, matikan mode debug saat produksi, rajin update, ganti alamat admin bawaan.'
      }
    },

    {
      name_en: 'Fingerprint Web Application',
      name_id: { t: 'Fingerprinting Web Application', b: 'Identifikasi Aplikasi Web', s: 'Kenali Aplikasinya' },
      summary: {
        en: 'Beyond the framework, identify the application itself — a CMS like WordPress, an e-commerce platform like Magento, or a custom app. Known applications have known plugin vulnerabilities and documented attacks.',
        t: 'Di luar framework, identifikasi aplikasinya sendiri — CMS seperti WordPress, platform e-commerce seperti Magento, atau aplikasi kustom. Aplikasi yang dikenal punya vulnerability plugin yang dikenal dan serangan yang terdokumentasi.',
        b: 'Di luar kerangka kerja, identifikasi aplikasinya sendiri — CMS seperti WordPress, platform perdagangan elektronik seperti Magento, atau aplikasi buatan sendiri. Aplikasi yang dikenal memiliki kerentanan plugin yang dikenal dan serangan yang terdokumentasi.',
        s: 'Setelah tahu server dan framework, kenali aplikasinya: WordPress? Magento? Aplikasi buatan sendiri? Tiap aplikasi terkenal punya daftar kelemahan plugin yang udah banyak didokumentasikan.'
      },
      howto: {
        en: [
          'Look for application-specific paths: `/wp-content/`, `/skin/frontend/`, `/sites/default/` (Drupal).',
          'Compare favicon hashes against known application databases.',
          'Inspect HTML source for generator meta tags and application-specific markup.',
          'Enumerate installed plugins/modules via known paths and version feeds.',
          'Search for known plugin/component CVEs matching what you found.'
        ],
        t: [
          'Cari path khas aplikasi: `/wp-content/`, `/skin/frontend/`, `/sites/default/` (Drupal).',
          'Bandingkan hash favicon dengan database aplikasi yang dikenal.',
          'Periksa source HTML untuk meta tag generator dan markup khas aplikasi.',
          'Enumerasi plugin/modul yang terinstal via path yang dikenal dan feed versi.',
          'Cari CVE plugin/komponen yang diketahui yang cocok dengan temuan Anda.'
        ],
        b: [
          'Cari jalur khas aplikasi: `/wp-content/`, `/skin/frontend/`, `/sites/default/` (Drupal).',
          'Bandingkan hash favicon dengan pangkalan data aplikasi yang dikenal.',
          'Periksa sumber HTML untuk meta tag generator dan markup khas aplikasi.',
          'Cacah plugin/modul yang terpasang melalui jalur yang dikenal dan umpan versi.',
          'Cari CVE plugin/komponen yang diketahui yang cocok dengan temuan Anda.'
        ],
        s: [
          'Cek folder khas: `/wp-content/` itu WordPress, `/sites/default/` itu Drupal.',
          'Favicon situs bisa dibandingkan dengan database — tiap aplikasi beda ikonnya.',
          'Di source HTML, cari `<meta name="generator">` — sering menulis nama dan versi aplikasi.',
          'Cari plugin terpasang — biasanya kelihatan dari path-nya.',
          'Google nama plugin + "CVE" — siapkan daftar serangan.'
        ]
      },
      tools: ['whatweb', 'Wappalyzer', 'WPScan', 'droopescan'],
      remediation: {
        en: 'Remove generator meta tags, keep CMS core and plugins patched, remove unused plugins entirely, and restrict access to version information feeds.',
        t: 'Hapus meta tag generator, patch core CMS dan plugin secara rutin, hapus plugin yang tidak dipakai sepenuhnya, dan batasi akses ke feed informasi versi.',
        b: 'Hapus meta tag generator, tambal inti CMS dan plugin secara rutin, singkirkan plugin yang tidak terpakai, dan batasi akses ke umpan informasi versi.',
        s: 'Hapus tag generator dari HTML, update CMS dan plugin, hapus plugin nggak kepake — plugin tua itu pintu masuk favorit.'
      }
    },

    {
      name_en: 'Map Application Architecture',
      name_id: { t: 'Petakan Arsitektur Aplikasi', b: 'Pemetaan Arsitektur Aplikasi', s: 'Petakan Arsitektur di Baliknya' },
      summary: {
        en: 'Determine how the application is built behind the front door: load balancers, reverse proxies, caches, application servers, databases, external APIs, and cloud services. Architecture tells you where to attack and where blast radius lives.',
        t: 'Tentukan bagaimana aplikasi dibangun di balik pintu depan: load balancer, reverse proxy, cache, application server, database, API eksternal, dan layanan cloud. Arsitektur memberi tahu di mana menyerang dan di mana blast radius berada.',
        b: 'Tentukan bagaimana aplikasi dibangun di balik pintu depan: penyeimbang beban, proksi balik, singgahan, peladen aplikasi, pangkalan data, API eksternal, dan layanan awan. Arsitektur memberi tahu di mana menyerang dan di mana dampaknya meluas.',
        s: 'Di balik situs ada banyak lapisan — load balancer, proxy, cache, database, layanan cloud. Mengenali lapisannya membantu kita tahu mana yang bisa diserang.'
      },
      howto: {
        en: [
          'Identify load balancers and CDNs via response headers (`Via`, `X-Cache`, `CF-Ray` for Cloudflare).',
          'Detect separate app tiers: different subdomains often mean API servers, auth services, static assets.',
          'Observe error sources — errors leaking from a Java backend behind an Nginx front reveal the stack.',
          'Check for cache layers via timing and header differences on repeated requests.',
          'Map external dependencies: analytics, payment gateways, third-party scripts.',
          'Document the inferred architecture diagram for later attack planning.'
        ],
        t: [
          'Identifikasi load balancer dan CDN via response header (`Via`, `X-Cache`, `CF-Ray` untuk Cloudflare).',
          'Deteksi tier aplikasi terpisah: subdomain berbeda sering berarti API server, layanan auth, aset statis.',
          'Amati sumber error — error yang bocor dari backend Java di balik front Nginx membocorkan stack-nya.',
          'Cek lapisan cache via timing dan perbedaan header pada request berulang.',
          'Petakan dependency eksternal: analitik, payment gateway, script pihak ketiga.',
          'Dokumentasikan diagram arsitektur hasil inferensi untuk perencanaan serangan selanjutnya.'
        ],
        b: [
          'Identifikasi penyeimbang beban dan CDN melalui tajuk respons (`Via`, `X-Cache`, `CF-Ray` untuk Cloudflare).',
          'Deteksi tingkat aplikasi terpisah: subdomain berbeda sering berarti peladen API, layanan autentikasi, aset statis.',
          'Amati sumber galat — galat yang bocor dari backend Java di balik front Nginx membocorkan tumpukannya.',
          'Periksa lapisan singgahan melalui pengukuran waktu dan perbedaan tajuk pada permintaan berulang.',
          'Petakan ketergantungan eksternal: analitik, gerbang pembayaran, skrip pihak ketiga.',
          'Dokumentasikan diagram arsitektur hasil inferensi untuk perencanaan serangan berikutnya.'
        ],
        s: [
          'Baca header respons — `Via`, `X-Cache`, `CF-Ray` menandakan proxy atau CDN.',
          'Subdomain berbeda itu layanan berbeda — catat semuanya.',
          'Perhatikan error — jejak Java di balik Nginx itu petunjuk stack lengkap.',
          'Request yang sama berkali-kali dengan waktu respons beda = ada cache.',
          'Catat layanan luar: analitik, pembayaran, script pihak ketiga.',
          'Gambar arsitektur yang ditebak — jadi peta serangan.'
        ]
      },
      tools: ['curl', 'dig', 'nmap', 'Burp Suite', 'Shodan'],
      remediation: {
        en: 'Hide internal architecture details: uniform error handling, no internal hostnames in headers, and segment tiers so compromise of one layer does not cascade.',
        t: 'Sembunyikan detail arsitektur internal: error handling yang seragam, tanpa hostname internal di header, dan segmentasi tier agar kompromi satu lapisan tidak menjalar.',
        b: 'Sembunyikan detail arsitektur internal: penanganan galat yang seragam, tanpa nama host internal pada tajuk, dan segmentasi tingkatan agar penyusupan satu lapisan tidak merambat.',
        s: 'Jaga kerahasiaan arsitektur: samakan semua pesan error, hapus nama server internal dari header, dan pisahkan lapisan-lapisannya supaya satu bocor nggak merusak semua.'
      }
    }
  ]
});
