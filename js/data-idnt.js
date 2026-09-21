/* WSTG Bilingual — 4.3 Identity Management (5 tests)
   Condensed bilingual adaptation, CC BY-SA 4.0. Registers: t=Teknis, b=Baku, s=Sederhana. */
window.WSTG_DATA = window.WSTG_DATA || [];
window.WSTG_DATA.push({
  order: 3, code: 'IDNT',
  name_en: 'Identity Management',
  desc_en: 'Registration, provisioning & account policy',
  name_id: { t: 'Manajemen Identitas', b: 'Manajemen Identitas', s: 'Pengelolaan Identitas' },
  desc_id: { t: 'Registrasi, provisioning & kebijakan akun', b: 'Pendaftaran, penyediaan akun & kebijakan akun', s: 'Cara situs mengelola akun user' },
  tests: [

    {
      name_en: 'Test Role Definitions',
      name_id: { t: 'Uji Definisi Peran (Role)', b: 'Uji Definisi Peran', s: 'Pahami Peran-Perannya' },
      summary: {
        en: 'Understand what roles exist (user, admin, support, auditor) and what each can do. Overlapping or over-powerful roles become privilege-escalation paths.',
        t: 'Pahami peran apa saja yang ada (user, admin, support, auditor) dan apa yang masing-masing bisa lakukan. Peran yang tumpang tindih atau terlalu kuat menjadi jalur privilege escalation.',
        b: 'Pahami peran apa saja yang ada (pengguna, admin, dukungan, auditor) dan apa yang masing-masing dapat lakukan. Peran yang tumpang tindih atau terlalu kuat menjadi jalur kenaikan hak.',
        s: 'Kenali peran-peran user — biasa, admin, dukungan. Peran yang terlalu kuat bisa disalahgunakan untuk naik jabatan.'
      },
      howto: {
        en: [
          'Register multiple accounts and identify every role the app exposes.',
          'Document each role\'s reachable functions from its own session.',
          'Compare role permissions for overlaps — can two roles reach the same admin function?',
          'Probe for hidden roles: try `role=admin`, `isAdmin=true`, `roleid=0` in profile parameters.',
          'Map which roles can modify other roles — that is the escalation crown.'
        ],
        t: [
          'Registrasikan beberapa akun dan identifikasi setiap peran yang terekspos aplikasi.',
          'Dokumentasikan fungsi yang dapat dijangkau tiap peran dari sesinya sendiri.',
          'Bandingkan permission antar peran untuk tumpang tindih — bisakah dua peran mencapai fungsi admin yang sama?',
          'Sondai peran tersembunyi: coba `role=admin`, `isAdmin=true`, `roleid=0` di parameter profil.',
          'Petakan peran mana yang bisa mengubah peran lain — itu mahkota escalation.'
        ],
        b: [
          'Daftarkan beberapa akun dan identifikasi setiap peran yang terbuka pada aplikasi.',
          'Dokumentasikan fungsi yang terjangkau tiap peran dari sesinya sendiri.',
          'Bandingkan kewenangan antar peran untuk tumpang tindih — dapatkah dua peran mencapai fungsi admin yang sama?',
          'Sondasi peran tersembunyi: coba `role=admin`, `isAdmin=true`, `roleid=0` pada parameter profil.',
          'Petakan peran mana yang dapat mengubah peran lain — itulah mahkota kenaikan hak.'
        ],
        s: [
          'Daftar beberapa akun — lihat jenis user apa saja yang ditawarkan.',
          'Catat menu dan fitur yang bisa diakses tiap jenis user.',
          'Bandingkan — ada fitur admin yang bisa diakses user biasa?',
          'Coba ubah parameter seperti `role=admin` atau `isAdmin=true` di request profil.',
          'Kalau ada role yang bisa mengubah role orang lain — itu temuan utama.'
        ]
      },
      tools: ['Burp Suite', 'multiple test accounts'],
      remediation: {
        en: 'Define roles by deny-by-default, audit role permission matrices regularly, and never let a non-admin role modify role assignments.',
        t: 'Definisikan peran dengan deny-by-default, audit matriks permission peran secara rutin, dan jangan pernah biarkan peran non-admin mengubah penetapan peran.',
        b: 'Definisikan peran dengan tolak-secara-bawaan, audit matriks kewenangan peran secara rutin, dan jangan biarkan peran non-admin mengubah penetapan peran.',
        s: 'Buat aturan peran yang ketat: semua ditolak kecuali yang diizinkan. Hanya admin yang boleh mengubah peran orang.'
      }
    },

    {
      name_en: 'Test User Registration Process',
      name_id: { t: 'Uji Proses Registrasi User', b: 'Uji Proses Pendaftaran Pengguna', s: 'Uji Pendaftaran Akun' },
      summary: {
        en: 'Registration is the front door of identity: test account enumeration, weak password policy, email verification bypasses, and mass registration (for spam or free-trial abuse).',
        t: 'Registrasi adalah pintu depan identitas: uji enumerasi akun, kebijakan password lemah, bypass verifikasi email, dan registrasi massal (untuk spam atau penyalahgunaan free-trial).',
        b: 'Pendaftaran adalah pintu depan identitas: uji pencacahan akun, kebijakan sandi lemah, pintasan verifikasi surel, dan pendaftaran massal (untuk spam atau penyalahgunaan uji-coba gratis).',
        s: 'Halaman daftar itu pintu depan — uji apakah bisa ditebak akun yang sudah ada, passwordnya diterima walau lemah, atau verifikasi emailnya bisa dilewati.'
      },
      howto: {
        en: [
          'Register with an existing username/email — distinct error vs. "email sent" reveals account existence.',
          'Test password policy: register with `123456` and `password` — rejected or accepted?',
          'Try verification bypass: request a token for your account, then tamper the token\'s user ID/email in the activation link.',
          'Test disposable-email blocking: use temporary mail domains and see if registration filters them.',
          'Rate-limit the registration endpoint — unlimited registrations enable mass account farming.'
        ],
        t: [
          'Registrasi dengan username/email yang sudah ada — error berbeda vs. "email terkirim" membocorkan keberadaan akun.',
          'Uji kebijakan password: registrasi dengan `123456` dan `password` — ditolak atau diterima?',
          'Coba bypass verifikasi: minta token untuk akun Anda, lalu ubah user ID/email dalam token pada link aktivasi.',
          'Uji pemblokiran email sekali-pakai: gunakan domain mail sementara dan lihat apakah registrasi menyaringnya.',
          'Rate-limit endpoint registrasi — registrasi tanpa batas memungkinkan farming akun massal.'
        ],
        b: [
          'Daftar dengan nama pengguna/surel yang telah ada — galat berbeda vs. "surel terkirim" membocorkan keberadaan akun.',
          'Uji kebijakan sandi: daftar dengan `123456` dan `password` — ditolak atau diterima?',
          'Coba pintasan verifikasi: minta token untuk akun Anda, lalu ubah ID pengguna/surel dalam token pada tautan aktivasi.',
          'Uji pemblokiran surel sekali-pakai: gunakan domain pos sementara dan lihat apakah pendaftaran menyaringnya.',
          'Batasi laju endpoint pendaftaran — pendaftaran tanpa batas memungkinkan pembuatan akun massal.'
        ],
        s: [
          'Daftar pakai email yang sudah terdaftar — kalau pesannya beda-beda, kita tahu akun itu ada.',
          'Coba password `123456` — diterima? Kebijakan passwordnya lemah.',
          'Saat verifikasi email, coba ubah bagian token di link — kadang verifikasi akun lain bisa dikunci.',
          'Coba email sementara (mailinator dan sejenisnya) — diterima? Bisa dipakai bikin akun spam.',
          'Cek apakah pendaftaran dibatasi jumlahnya — kalau tidak, akun bisa dibuat massal.'
        ]
      },
      tools: ['Burp Suite', 'temporary email services'],
      remediation: {
        en: 'Use uniform registration responses, enforce strong password rules, cryptographically bind verification tokens to accounts, and rate-limit registration.',
        t: 'Gunakan respons registrasi yang seragam, tegakkan aturan password kuat, ikat token verifikasi secara kriptografis ke akun, dan rate-limit registrasi.',
        b: 'Gunakan respons pendaftaran yang seragam, tegakkan aturan sandi kuat, kaitkan token verifikasi secara kriptografis ke akun, dan batasi laju pendaftaran.',
        s: 'Buat pesan pendaftaran seragam untuk semua kasus. Wajibkan password kuat. Kunci token verifikasi ke akun pemiliknya. Batasi jumlah pendaftaran per waktu.'
      }
    },

    {
      name_en: 'Test Account Provisioning Process',
      name_id: { t: 'Uji Proses Provisioning Akun', b: 'Uji Proses Penyediaan Akun', s: 'Uji Pembuatan Akun Internal' },
      summary: {
        en: 'How accounts get created and changed — admin-creates-user flows, bulk imports, invitation tokens. Broken provisioning can create admin accounts or bypass verification.',
        t: 'Bagaimana akun dibuat dan diubah — alur admin-membuat-user, impor massal, token undangan. Provisioning yang rusak bisa membuat akun admin atau melewati verifikasi.',
        b: 'Perhatikan bagaimana akun dibentuk dan diubah — alur admin-membuat-pengguna, impor massal, maupun token undangan. Penyediaan akun yang cacat dapat melahirkan akun admin atau meloloskan verifikasi.',
        s: 'Cara akun dibuat oleh admin atau lewat undangan — kalau prosesnya cacat, akun admin palsu bisa muncul.'
      },
      howto: {
        en: [
          'Test the admin "create user" flow: can you set roles, email-verified status, or permissions at creation?',
          'Intercept the creation request and inject extra fields: `role`, `active`, `email_verified`.',
          'Test invitation tokens: are they bound to one email, or redeemable by anyone?',
          'Bulk import: submit a crafted CSV/JSON with elevated role fields — watch for mass assignment.',
          'Check whether provisioned accounts are forced through verification or arrive pre-verified.'
        ],
        t: [
          'Uji alur admin "buat user": bisakah Anda menetapkan peran, status terverifikasi, atau permission saat pembuatan?',
          'Intersep request pembuatan dan injeksikan field ekstra: `role`, `active`, `email_verified`.',
          'Uji token undangan: apakah terikat ke satu email, atau bisa ditebus siapa saja?',
          'Impor massal: kirim CSV/JSON yang dimodifikasi dengan field peran lebih tinggi — perhatikan mass assignment.',
          'Cek apakah akun hasil provisioning dipaksa melewati verifikasi atau langsung terverifikasi.'
        ],
        b: [
          'Uji alur admin "buat pengguna": dapatkah Anda menetapkan peran, status terverifikasi, atau kewenangan saat pembuatan?',
          'Sadap permintaan pembuatan dan suntikkan bidang ekstra: `role`, `active`, `email_verified`.',
          'Uji token undangan: apakah terikat pada satu surel, atau dapat ditebus siapa pun?',
          'Impor massal: kirim CSV/JSON yang dimodifikasi dengan bidang peran lebih tinggi — perhatikan penyerapan massal.',
          'Periksa apakah akun hasil penyediaan dipaksa melalui verifikasi atau langsung terverifikasi.'
        ],
        s: [
          'Kalau admin bisa bikin akun, cek apa saja yang bisa disetel saat itu — bisa langsung pilih peran?',
          'Sadap request-nya, sisipkan field tambahan seperti `role` atau `email_verified`.',
          'Token undangan — untuk satu email khusus atau siapa saja yang punya link?',
          'Kalau ada impor massal, coba selipkan kolom `role=admin` di CSV-nya.',
          'Akun buatan admin — harus verifikasi email juga, atau langsung aktif?'
        ]
      },
      tools: ['Burp Suite', 'admin access (if in scope)'],
      remediation: {
        en: 'Whitelist fields the admin can set at provisioning, force verification for all new accounts, and bind invitation tokens to the invited identity.',
        t: 'Whitelist field yang bisa disetel admin saat provisioning, paksa verifikasi untuk semua akun baru, dan ikat token undangan ke identitas yang diundang.',
        b: 'Daftar-putihkan bidang yang dapat disetel admin saat penyediaan, paksa verifikasi untuk semua akun baru, dan kaitkan token undangan ke identitas yang diundang.',
        s: 'Batasi field yang bisa diisi admin saat membuat akun. Semua akun baru wajib verifikasi. Tautan undangan hanya berlaku untuk email yang diundang.'
      }
    },

    {
      name_en: 'Test for Account Enumeration and Guessable User Account',
      name_id: { t: 'Uji Enumerasi Akun dan Akun yang Bisa Ditebak', b: 'Uji Pencacahan Akun dan Akun yang Dapat Ditebak', s: 'Cek Akun yang Bisa Ditebak' },
      summary: {
        en: 'Different responses for "user exists" vs. "user not found" let attackers harvest valid usernames. Predictable usernames (employee ID sequence) make harvesting mechanical.',
        t: 'Respons berbeda untuk "user ada" vs. "user tidak ditemukan" membiarkan penyerang memanen username valid. Username yang bisa diprediksi (urutan ID karyawan) membuat pemanenan mekanis.',
        b: 'Respons berbeda untuk "pengguna ada" vs. "tidak ditemukan" memungkinkan penyerang memanen nama pengguna sah. Nama yang dapat diramal (urutan ID karyawan) membuat pemanenan menjadi mekanis.',
        s: 'Kalau pesan error untuk akun ada dan tidak ada itu beda, penyerang bisa mengumpulkan daftar username valid — bekal untuk serangan password.'
      },
      howto: {
        en: [
          'Submit login/forgot-password with a valid and an invalid username; diff the responses (status, timing, body).',
          'Check registration with existing usernames — does it confirm existence?',
          'Test predictable usernames: `user001`, `user002`… `jdoe`, `jsmith` patterns.',
          'Measure response timing — enumeration sometimes leaks only through timing.',
          'Check public profiles, review usernames, and API responses for user lists.'
        ],
        t: [
          'Kirim login/lupa-password dengan username valid dan tidak valid; bedakan responsnya (status, timing, body).',
          'Cek registrasi dengan username yang sudah ada — apakah mengonfirmasi keberadaannya?',
          'Uji username yang bisa diprediksi: pola `user001`, `user002`… `jdoe`, `jsmith`.',
          'Ukur timing respons — enumerasi kadang hanya bocor lewat timing.',
          'Cek profil publik, username di review, dan respons API untuk daftar user.'
        ],
        b: [
          'Kirim login/lupa-sandi dengan nama pengguna sah dan tidak sah; bedakan responsnya (status, waktu, isi).',
          'Periksa pendaftaran dengan nama yang telah ada — apakah mengonfirmasi keberadaannya?',
          'Uji nama yang dapat diramal: pola `user001`, `user002`… `jdoe`, `jsmith`.',
          'Ukur waktu respons — pencacahan kadang hanya bocor lewat waktu.',
          'Periksa profil publik, nama pengguna dalam ulasan, dan respons API untuk daftar pengguna.'
        ],
        s: [
          'Coba login dengan nama yang ada dan tidak ada — bandingkan pesannya huruf per huruf.',
          'Halaman lupa password sering membuka rahasia: "akun tidak ditemukan" vs. "email terkirim".',
          'Coba pola nama: `user001`, `user002` — kalau diterima, nama bisa ditebak.',
          'Ukur juga waktu responsnya — kadang lebih lambat karena akunnya ada.',
          'Profil publik dan API kadang langsung membocorkan daftar user.'
        ]
      },
      tools: ['Burp Suite', 'curl', 'ffuf (for timing analysis)'],
      remediation: {
        en: 'Return identical generic responses regardless of account existence, generate non-sequential identifiers, and cap enumeration attempts with rate limiting.',
        t: 'Kembalikan respons generik identik terlepas dari keberadaan akun, hasilkan identifier non-sequensial, dan batasi percobaan enumerasi dengan rate limiting.',
        b: 'Kembalikan respons generik identik apa pun keberadaan akunnya, hasilkan pengenal tak berurutan, dan batasi percobaan pencacahan dengan pembatasan laju.',
        s: 'Pesan error harus sama persis untuk semua kasus. ID akun jangan pakai urutan angka langsung. Batasi percobaan login/lupa password.'
      }
    },

    {
      name_en: 'Test for Weak or Unenforced Username Policy',
      name_id: { t: 'Uji Kebijakan Username yang Lemah atau Tidak Ditegakkan', b: 'Uji Kebijakan Nama Pengguna yang Lemah atau Tak Ditegakkan', s: 'Cek Aturan Nama User' },
      summary: {
        en: 'If usernames can be emails, sequential IDs, or reused across services, password spraying and credential-stuffing become practical. Weak policy also enables impersonation via lookalike names.',
        t: 'Jika username bisa berupa email, ID sekuensial, atau dipakai ulang lintas layanan, password spraying dan credential-stuffing menjadi praktis. Kebijakan lemah juga memungkinkan impersonasi via nama mirip.',
        b: 'Jika nama pengguna dapat berupa surel, ID berurutan, atau digunakan ulang lintas layanan, penyemprotan sandi dan penyerapan kredensial menjadi praktis. Kebijakan lemah juga memungkinkan peniruan identitas lewat nama serupa.',
        s: 'Aturan nama user yang lemah — email, angka urut, nama ganda — membuat penyerang gampang menebak dan meniru akun.'
      },
      howto: {
        en: [
          'Determine the username format from public profiles or registration rules.',
          'Test collisions: register names differing only in case, dots, or Unicode lookalikes (`admin` vs `аdmin` with Cyrillic а).',
          'Check whether emails serve as usernames — enables cross-site credential stuffing.',
          'Test whether usernames are recycled after account deletion.',
          'Observe whether homoglyph/lookalike names are blocked at registration.'
        ],
        t: [
          'Tentukan format username dari profil publik atau aturan registrasi.',
          'Uji tabrakan: registrasi nama yang hanya beda kapital, titik, atau lookalike Unicode (`admin` vs `аdmin` dengan а Kirilik).',
          'Cek apakah email menjadi username — memungkinkan credential stuffing lintas situs.',
          'Uji apakah username didaur ulang setelah akun dihapus.',
          'Amati apakah nama homoglyph/lookalike diblokir saat registrasi.'
        ],
        b: [
          'Tentukan format nama pengguna dari profil publik atau aturan pendaftaran.',
          'Uji tabrakan: daftarkan nama yang hanya beda kapital, titik, atau kemiripan Unicode (`admin` vs `аdmin` dengan а Kirilik).',
          'Periksa apakah surel menjadi nama pengguna — memungkinkan penyerapan kredensial lintas situs.',
          'Uji apakah nama pengguna didaur ulang setelah akun dihapus.',
          'Amati apakah nama kembar-visual diblokir saat pendaftaran.'
        ],
        s: [
          'Lihat format nama user di situs — email? nama depan? angka?',
          'Coba daftar nama yang mirip — beda kapital saja, atau huruf asing yang kelihatan sama.',
          'Kalau username = email, akun orang bisa ditebak dari kebocoran situs lain.',
          'Cek apakah nama akun yang dihapus bisa dipakai ulang — bahaya kalau bisa.',
          'Nama yang mirip `admin` itu trik klasik menipu korban.'
        ]
      },
      tools: ['Burp Suite', 'browser'],
      remediation: {
        en: 'Enforce a strict username policy: unique, non-recycled, homoglyph-rejected, and not equal to the account email where possible.',
        t: 'Tegakkan kebijakan username ketat: unik, tidak didaur ulang, homoglyph ditolak, dan tidak sama dengan email akun jika memungkinkan.',
        b: 'Tegakkan kebijakan nama pengguna ketat: unik, tidak didaur ulang, kembar-visual ditolak, dan tidak sama dengan surel akun bila memungkinkan.',
        s: 'Nama user harus unik, tidak boleh dipakai ulang setelah dihapus, dan sistem harus menolak huruf kembar-visual yang menipu.'
      }
    }
  ]
});
