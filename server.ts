import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
} else {
  console.warn("⚠️ GEMINI_API_KEY is not defined. AI functionality will be mocked.");
}

// REST API for TolakHalus Generation
app.post("/api/generate", async (req, res) => {
  try {
    const { inputContext, relation, excuseLevel } = req.body;

    if (!inputContext || !inputContext.trim()) {
      return res.status(400).json({ error: "Input teks / situasimu tidak boleh kosong." });
    }

    const levelDescriptions = {
      1: "Jujur Tapi Sopan (Alasan realistis & apa adanya, jujur namun lembut)",
      2: "Alasan Logistik (Kendala teknis, bentrok jadwal, kesibukan mendesak, atau kendala geografis)",
      3: "Skenario Darurat Halus (Urgensi aman yang mendesak, sulit dibantah, darurat keluarga, atau komitmen pribadi yang tidak bisa dihindari)",
    };

    const targetLevel = levelDescriptions[excuseLevel as 1 | 2 | 3] || levelDescriptions[1];

    if (!ai) {
      // Return beautiful fallback mock data if Gemini API is missing
      console.log("Using falling back mock data");
      return res.json({
        variants: [
          {
            variantName: "Varian A",
            toneBadge: "Formal",
            generatedText: `Selamat siang. Terima kasih banyak atas tawarannya terkhusus untuk ${relation}. Terkait kegiatan tersebut, maaf sekali saya sedang tidak bisa berpartisipasi karena ${targetLevel.toLowerCase()}. Semoga acaranya berjalan seru dan sukses ya.`,
            counterOffer: "Bagaimana jika kita bicarakan lagi kemungkinan ini di awal minggu depan?"
          },
          {
            variantName: "Varian B",
            toneBadge: "Hangat",
            generatedText: `Wah, terima kasih banyak ya sudah bersedia mengajakku! Maaf banget, untuk saat ini aku belum bisa join/ikut dulu berhubung sedang fokus menyelesaikan ${targetLevel.toLowerCase()}. Semoga nanti ada kesempatan lain ya, sukses terus!`,
            counterOffer: "Kalau ada waktu senggang akhir pekan nanti, aku kabari lagi ya."
          },
          {
            variantName: "Varian C",
            toneBadge: "Tegas Santun",
            generatedText: `Halo, terima kasih banyak atas kesempatannya. Setelah saya pertimbangkan, dengan sangat menyesal saya harus menolak ajakan ini karena saat ini ada kendala di ${targetLevel.toLowerCase()}. Saya ingin menetapkan batasan waktu saya terlebih dahulu agar hasil pekerjaan lain tetap optimal. Terima kasih atas pengertiannya.`,
            counterOffer: "Mungkin di kesempatan berikutnya saya dapat berkontribusi penuh."
          }
        ]
      });
    }

    const systemInstruction = `Anda adalah asisten AI bahasa komunikasi profesional bernama TolakHalus.ai. 
Tugas Anda adalah memformulasikan 3 variasi pesan penolakan yang natural, sopan, elegan, tegas, dan menjaga hubungan baik dalam Bahasa Indonesia.
Hilangkan kesan kaku robotik seperti template umum "Saya menolak ajakan Anda". Berikan respons yang terasa sangat ramah, hangat, tapi solid (terutama sesuai level kealasan yang dipilih).

Gunakan kriteria berikut untuk generate output:
1. Input Situasi Pengguna: \`"${inputContext}"\` (Ini adalah pesan, ajakan, tawaran meeting, pinjaman uang, atau situasi sosial yang ingin ditolak)
2. Hubungan Hubungan dengan lawan bicara: \`"${relation}"\` (Sesuaikan sapaan dan tingkat keformalan: 'Profesional / Atasan' harus sangat sopan, takzim, mengagungkan lawan bicara; 'Teman / Kerabat' harus santai, akrab, memakai sapaan seperti 'Kamu', 'Aku', atau slang sopan; 'Keluarga / Orang Tua' harus sangat takzim, hangat, berbakti)
3. Skala Kealasan (Excuse level): \`"${targetLevel}"\` (Membimbing jenis alasan penolakan yang diberikan)

Harap kembalikan respon berupa JSON sesuai schema yang didefinisikan dengan total 3 variasi alternatif (Variant A, Variant B, Variant C) bernuansa natural dan manusiawi.
Setiap variasi harus memiliki:
- variantName: "Varian A", "Varian B", atau "Varian C"
- toneBadge: Tentukan nada penolakan ("Formal", "Hangat", atau "Tegas Santun")
- generatedText: Pesan penolakan utuh dalam Bahasa Indonesia yang siap disalin oleh user
- counterOffer: Opsi penawaran alternatif atau follow up halus yang ditambahkan di akhir agar menjaga hubungan tetap baik (misal: menjadwalkan ulang, opsi kolaborasi masa depan, dsb).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Gambarkan 3 penolakan elegan berdasarkan masukan tersebut.`,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            variants: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  variantName: {
                    type: Type.STRING,
                    description: "Nama variasi (Varian A, Varian B, Varian C)",
                  },
                  toneBadge: {
                    type: Type.STRING,
                    description: "Nada variasi, contoh: Formal, Hangat, Tegas Santun",
                  },
                  generatedText: {
                    type: Type.STRING,
                    description: "Teks lengkap dalam bahasa Indonesia yang sangat natural, ramah, sopan, dan manusiawi",
                  },
                  counterOffer: {
                    type: Type.STRING,
                    description: "Saran tawaran solusi alternatif yang elegan untuk menjaga relasi sosial tetap aman",
                  },
                },
                required: ["variantName", "toneBadge", "generatedText", "counterOffer"],
              },
            },
          },
          required: ["variants"],
        },
      },
    });

    const outputText = response.text || "{}";
    const result = JSON.parse(outputText.trim());
    res.json(result);
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Gagal membuat pesan penolakan halus via AI." });
  }
});

// Configure Vite integration or static file serving
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static files server mounted.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server TolakHalus.ai running at http://localhost:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
