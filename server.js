import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Telegram OTP Bot Server is running!");
});

app.post("/webhook", async (req, res) => {
  try {
    const message = req.body.message;
    if (!message || !message.text) return res.sendStatus(200);

    const chatId = message.chat.id;
    const text = message.text.trim();
    const firstName = message.from?.first_name || "User";

    if (text.startsWith("/otp") || text.startsWith("/start")) {
      const otp = Math.floor(100000 + Math.random() * 900000);

      const replyText =
        `👋 *স্বাগতম / Welcome / أهلاً / स्वागत है, ${firstName}!*\n` +
        `🔐 *আপনার OTP কোড | Your OTP Code | رمز OTP الخاص بك | आपका OTP कोड*\n` +
        `━━━━━━━━━━━━━━━━━━\n\n` +
        `🔢 *OTP Code:* \`${otp}\`\n` +
        `⏳ *মেয়াদ:* ৫ মিনিট (5 Minutes | 5 دقائق | 5 मिनट)\n\n` +
        `🛡️ *বাংলা (Security Notice):*\n` +
        `• এই কোডটি কারো সাথে শেয়ার করবেন না।\n` +
        `• আপনি নিজে রিকোয়েস্ট না করে থাকলে এটি এড়িয়ে যান।\n\n` +
        `🔒 *English:*\n` +
        `• Never share this OTP with anyone.\n` +
        `• Ignore this if you did not request it.\n\n` +
        `🕌 *العربية (تنبيه أمني):*\n` +
        `• لا تشارك هذا الرمز مع أي شخص.\n` +
        `• تجاهل هذه الرسالة إذا لم تطلبها.\n\n` +
        `🇮🇳 *हिन्दी (सुरक्षा सूचना):*\n` +
        `• यह कोड किसी के साथ साझा न करें।\n` +
        `• यदि आपने इसका अनुरोध नहीं किया है, तो इसे अनदेखा करें।\n\n` +
        `━━━━━━━━━━━━━━━━━━`;

      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: replyText,
          parse_mode: "Markdown"
        }),
      });
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("Webhook error:", err);
    res.sendStatus(200);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
