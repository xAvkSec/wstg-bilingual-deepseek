/* WSTG Bilingual — 4.6 Error Handling (2 tests)
   Condensed bilingual adaptation, CC BY-SA 4.0. Registers: t=Teknis, b=Baku, s=Sederhana. */
window.WSTG_DATA = window.WSTG_DATA || [];
window.WSTG_DATA.push({
  order: 8, code: 'ERRH',
  name_en: 'Error Handling',
  desc_en: 'Improper errors & stack traces',
  name_id: { t: 'Error Handling', b: 'Penanganan Galat', s: 'Urusan Pesan Error' },
  desc_id: { t: 'Improper error handling & stack trace yang bocor', b: 'Galat tidak tertangani & jejak tumpukan yang terbocorkan', s: 'Pesan error nggak benar & bocorin isi server' },
  tests: [

    {
      name_en: 'Testing for Improper Error Handling',
      name_id: { t: 'Pengujian Improper Error Handling', b: 'Pengujian Penanganan Galat yang Tidak Semestinya', s: 'Maksa Aplikasi Error, Lihat yang Bocor' },
      summary: {
        en: 'Improper error handling leaks implementation details through verbose messages, unhandled exceptions, and inconsistent failure responses. Probe the application at every boundary to map exactly how it fails and what it reveals.',
        t: 'Improper error handling membocorkan implementation detail melalui pesan yang verbose, exception yang tidak tertangani, dan response kegagalan yang tidak konsisten. Probe aplikasi di setiap boundary untuk memetakan bagaimana ia gagal dan apa yang dibocorkannya.',
        b: 'Penanganan galat yang tidak semestinya membocorkan detail implementasi melalui pesan yang terlalu rinci, pengecualian yang tidak tertangani, dan respons kegagalan yang tidak konsisten. Uji aplikasi pada setiap batas untuk memetakan bagaimana ia gagal dan apa yang terbocorkan.',
        s: 'Cara aplikasi ngerespon pas error itu sering bocorin hal yang nggak seharusnya — nama database, versi framework, sampai alamat server internal. Kita maksa aplikasi error sengaja, terus lihat dia ngomong apa.'
      },
      howto: {
        en: [
          'Break input formats on purpose in Burp Repeater — send empty values, wrong types, negative numbers, oversized strings, and watch each response.',
          'Probe boundary conditions: `page=-1`, `page=999999999`, dates in malformed formats, array indices beyond length.',
          'Trigger each error class separately — 404, 401, 500, timeout, malformed JSON body — and catalog how the responses differ.',
          'Fuzz systematically with Burp Intruder or `ffuf` using error-triggering payloads to find the endpoints that leak the most.',
          'Compare production behavior with what the error pages disclose: stack traces, SQL fragments, internal hostnames, library versions.'
        ],
        t: [
          'Rusak format input dengan sengaja di Burp Repeater — kirim nilai kosong, tipe yang salah, angka negatif, string berukuran besar, lalu amati setiap response.',
          'Probe boundary condition: `page=-1`, `page=999999999`, tanggal dengan format rusak, indeks array di luar panjang.',
          'Picu tiap kelas error secara terpisah — 404, 401, 500, timeout, body JSON rusak — dan katalogkan perbedaan response-nya.',
          'Fuzz secara sistematis dengan Burp Intruder atau `ffuf` memakai payload pemicu error untuk menemukan endpoint yang paling banyak membocorkan.',
          'Bandingkan perilaku production dengan yang diungkap halaman error: stack trace, fragmen SQL, hostname internal, versi library.'
        ],
        b: [
          'Rusak format masukan secara sengaja pada Burp Repeater — kirim nilai kosong, jenis yang salah, bilangan negatif, teks yang terlalu panjang, lalu amati setiap respons.',
          'Uji kondisi batas: `page=-1`, `page=999999999`, tanggal dengan format rusak, indeks larik di luar batas.',
          'Picu setiap kelas galat secara terpisah — 404, 401, 500, kehabisan waktu, isi JSON rusak — dan katalogkan perbedaan responsnya.',
          'Lakukan fuzzing secara sistematis dengan Burp Intruder atau `ffuf` memakai muatan pemicu galat untuk menemukan endpoint yang paling banyak membocorkan.',
          'Bandingkan perilaku produksi dengan yang diungkap halaman galat: jejak tumpukan, fragmen SQL, nama host internal, versi pustaka.'
        ],
        s: [
          'Buka Burp Repeater, kirim input aneh-aneh: kosongin field, isi angka minus, kirim teks sepanjang jalan. Lihat error apa yang keluar.',
          'Coba nilai ekstrem kayak `page=999999999` atau tanggal aneh — aplikasi sering tumbang di titik batas.',
          'Petakan semua jenis error: 404, 401, 500 — bandingin pesannya. Yang satu beda, yang satu bocor.',
          'Pakai `ffuf` buat ngirim ribuan input jelek otomatis — biar ketemu endpoint mana yang paling cerewet.',
          'Catat semua kebocoran yang muncul: nama database, versi framework, path file — itu semua emas buat serangan lanjutan.'
        ]
      },
      tools: ['Burp Suite', 'OWASP ZAP', 'ffuf', 'curl'],
      remediation: {
        en: 'Route all errors through one centralized handler that returns generic messages to clients and logs full details server-side. Test failure paths as rigorously as success paths.',
        t: 'Rutekan semua error melalui satu centralized handler yang mengembalikan pesan generik ke client dan mencatat detail lengkapnya di sisi server. Uji jalur kegagalan serigor jalur keberhasilan.',
        b: 'Arahkan semua galat melalui satu penangan terpusat yang mengembalikan pesan generik kepada klien dan mencatat detail lengkapnya di sisi peladen. Uji jalur kegagalan seketat jalur keberhasilan.',
        s: 'Bikin satu aturan error buat semua halaman: pesan ke user disamakan semua, detailnya dicatat di log server. Jangan biarkan satu halaman aja punya pesan error sendiri.'
      }
    },

    {
      name_en: 'Testing for Stack Traces',
      name_id: { t: 'Pengujian Stack Trace', b: 'Pengujian Jejak Tumpukan', s: 'Maksa Server Keluarin Stack Trace' },
      summary: {
        en: 'A stack trace is a blueprint of the application internals — class names, library versions, file paths, SQL queries. Any code path that can throw an unhandled exception is a chance to pull one out.',
        t: 'Stack trace adalah blueprint internal aplikasi — nama class, versi library, path file, query SQL. Setiap jalur kode yang bisa melempar exception tak tertangani adalah kesempatan menariknya keluar.',
        b: 'Jejak tumpukan adalah cetak biru bagian dalam aplikasi — nama kelas, versi pustaka, jalur berkas, kueri SQL. Setiap jalur kode yang dapat melemparkan pengecualian tanpa tertangani adalah kesempatan untuk mengeluarkannya.',
        s: 'Stack trace itu kayak sinar rontgen buat aplikasi — kelihatan semua isinya: nama file, versi library, sampai query SQL. Kita tinggal maksa dia error sampai hasil rontgennya keluar.'
      },
      howto: {
        en: [
          'Request malformed or nonexistent resources and grep responses for signatures: `java.lang.NullPointerException`, `Traceback (most recent call last):`, `Warning: mysql_fetch`, ASP.NET Yellow Screen of Death.',
          'Tamper with cookies, headers, and session tokens — serialization code often throws on malformed input that passes normal validation.',
          'Sweep endpoints fast: `curl -s https://target.com/api/nonexistent | grep -iE "exception|traceback|at org|fatal"`.',
          'Trigger framework debug pages — Django yellow page, Laravel Whoops, Spring Whitelabel — by feeding each framework its known poison input.',
          'Harvest version numbers and file paths from any trace and match them against known CVEs.'
        ],
        t: [
          'Request resource rusak atau tidak ada lalu grep response untuk signature-nya: `java.lang.NullPointerException`, `Traceback (most recent call last):`, `Warning: mysql_fetch`, ASP.NET Yellow Screen of Death.',
          'Tamper cookie, header, dan session token — kode serialisasi sering melempar exception pada input rusak yang lolos validasi normal.',
          'Sweep endpoint dengan cepat: `curl -s https://target.com/api/nonexistent | grep -iE "exception|traceback|at org|fatal"`.',
          'Picu halaman debug framework — halaman kuning Django, Whoops Laravel, Whitelabel Spring — dengan memberi tiap framework input racun khasnya.',
          'Panen nomor versi dan path file dari trace yang didapat, cocokkan dengan CVE yang diketahui.'
        ],
        b: [
          'Minta sumber daya yang rusak atau tidak ada, lalu telusuri respons untuk tanda khasnya: `java.lang.NullPointerException`, `Traceback (most recent call last):`, `Warning: mysql_fetch`, layar kuning ASP.NET.',
          'Uji kuki, tajuk, dan token sesi yang dimanipulasi — kode serialisasi sering melemparkan pengecualian pada masukan rusak yang lolos validasi normal.',
          'Sapu endpoint dengan cepat: `curl -s https://target.com/api/nonexistent | grep -iE "exception|traceback|at org|fatal"`.',
          'Picu halaman awakutu kerangka kerja — halaman kuning Django, Whoops Laravel, Whitelabel Spring — dengan memberi tiap kerangka kerja masukan perusak khasnya.',
          'Petik nomor versi dan jalur berkas dari jejak yang didapat, cocokkan dengan CVE yang diketahui.'
        ],
        s: [
          'Kirim request ke halaman yang nggak ada atau input rusak, terus cari teks khas kayak `NullPointerException` (Java) atau `Traceback` (Python) — itu tanda stack trace bocor.',
          'Rusak-rusakin cookie dan header juga — kode yang ngolah session sering tumbang di situ.',
          'Biar cepat pakai `curl -s https://target.com/api/xyz | grep -iE "exception|traceback"` — nggak perlu baca satu-satu.',
          'Tiap framework punya halaman debug khas — Django kelihatan kuning, Laravel pakai Whoops. Kenalin wujudnya, gampang nyarinya.',
          'Kalau dapet versi library dari trace-nya, langsung cari CVE-nya — satu stack trace bisa buka pintu besar.'
        ]
      },
      tools: ['curl', 'Burp Suite', 'grep', 'browser dev tools'],
      remediation: {
        en: 'Disable debug mode in production, return generic 500 pages with no framework output, and log full traces server-side behind monitoring — never to the client.',
        t: 'Matikan debug mode di production, kembalikan halaman 500 generik tanpa output framework, dan catat trace lengkap di sisi server dengan monitoring — jangan pernah ke client.',
        b: 'Matikan mode awakutu di produksi, kembalikan halaman 500 generik tanpa keluaran kerangka kerja, dan catat jejak lengkap di sisi peladen dengan pemantauan — jangan pernah ke klien.',
        s: 'Matikan mode debug waktu udah produksi, terus kasih halaman error polos buat user. Detail lengkapnya boleh, tapi simpan di log server — jangan dikirim ke browser.'
      }
    }
  ]
});
