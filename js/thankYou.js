const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbz9NUNV21TBCk9piRgr8XXxryh6cEG_KxINhIfjjiAAUSjDfTagR1Qnx0T8LEFLKlrriA/exec";

async function sendFormData() {
  const o = localStorage.getItem("FormData");
  if (!o) return void console.log("Ma'lumotlar yo‘q");

  const t = JSON.parse(o);

  // Google Sheet uchun FormData
  const a = new FormData();
  a.append("Ism", t.name);
  a.append("Telefon raqam", t.phone);
  a.append("Royhatdan o'tgan vaqti", t.time);
  a.append("sheetName", "Lead");

  try {
    // Ikkalasi parallel yuboriladi
    const [sheetRes] = await Promise.all([
      fetch(SHEET_URL, { method: "POST", body: a }),
    ]);

    // Har ikkala so‘rov ham muvaffaqiyatli bo‘lishini tekshiramiz
    if (!sheetRes.ok) throw new Error("Google Sheet API response was not ok");

    // Muvaffaqiyatli bo‘lsa → localStorage tozalanadi
    console.log("Ma'lumotlar muvaffaqiyatli yuborildi ✅");
  } catch (err) {
    console.error("Form yuborishda xatolik:", err);
    document.getElementById("errorMessage").style.display = "block";
  }
}
sendFormData();
