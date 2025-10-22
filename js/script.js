document.addEventListener("DOMContentLoaded", function () {
  const e = document.getElementById("registrationForm"),
    t = document.getElementById("name"),
    n = document.getElementById("phone"),
    l = document.getElementById("nameError"),
    a = document.getElementById("phoneError"),
    o = document.getElementById("selectedCountryCode"),
    i = document.getElementById("countryDropdown"),
    d = document.getElementById("dropdownIcon"),
    s = [
      {
        name: "Uzbekistan",
        code: "+998",
      },
      {
        name: "AQSH",
        code: "+1",
      },
      {
        name: "Janubiy Koreya",
        code: "+82",
      },
      {
        name: "Qirg’iziston",
        code: "+996",
      },
      {
        name: "Qozog’iston",
        code: "+7",
      },
      {
        name: "Tojikiston",
        code: "+992",
      },
      {
        name: "Turkmaniston",
        code: "+993",
      },
      {
        name: "Polsha",
        code: "+48",
      },
    ],
    r = {
      "+998": {
        placeholder: "88 888 88 88",
        format: (e) => {
          let t = "";
          return (
            e.length >= 1 && (t += e.slice(0, 2)),
            e.length >= 3 && (t += " " + e.slice(2, 5)),
            e.length >= 6 && (t += " " + e.slice(5, 7)),
            e.length >= 8 && (t += " " + e.slice(7, 9)),
            t
          );
        },
        validate: (e) => /^\d{2} \d{3} \d{2} \d{2}$/.test(e),
        maxDigits: 9,
        maxLength: 12,
      },
      "+1": {
        placeholder: "555 123 4567",
        format: (e) => {
          let t = "";
          return (
            e.length >= 1 && (t += e.slice(0, 3)),
            e.length >= 4 && (t += " " + e.slice(3, 6)),
            e.length >= 7 && (t += " " + e.slice(6, 10)),
            t
          );
        },
        validate: (e) => /^\d{3} \d{3} \d{4}$/.test(e),
        maxDigits: 10,
        maxLength: 12,
      },
      "+82": {
        placeholder: "10 1234 5678",
        format: (e) => {
          let t = "";
          return (
            e.length >= 1 && (t += e.slice(0, 2)),
            e.length >= 3 && (t += " " + e.slice(2, 6)),
            e.length >= 7 && (t += " " + e.slice(6, 10)),
            t
          );
        },
        validate: (e) => /^\d{2} \d{4} \d{4}$/.test(e),
        maxDigits: 10,
        maxLength: 12,
      },
      "+996": {
        placeholder: "555 123 456",
        format: (e) => {
          let t = "";
          return (
            e.length >= 1 && (t += e.slice(0, 3)),
            e.length >= 4 && (t += " " + e.slice(3, 6)),
            e.length >= 7 && (t += " " + e.slice(6, 9)),
            t
          );
        },
        validate: (e) => /^\d{3} \d{3} \d{3}$/.test(e),
        maxDigits: 9,
        maxLength: 11,
      },
      "+7": {
        placeholder: "700 123 4567",
        format: (e) => {
          let t = "";
          return (
            e.length >= 1 && (t += e.slice(0, 3)),
            e.length >= 4 && (t += " " + e.slice(3, 6)),
            e.length >= 7 && (t += " " + e.slice(6, 10)),
            t
          );
        },
        validate: (e) => /^\d{3} \d{3} \d{4}$/.test(e),
        maxDigits: 10,
        maxLength: 12,
      },
      "+992": {
        placeholder: "55 555 5555",
        format: (e) => {
          let t = "";
          return (
            e.length >= 1 && (t += e.slice(0, 2)),
            e.length >= 3 && (t += " " + e.slice(2, 5)),
            e.length >= 6 && (t += " " + e.slice(5, 9)),
            t
          );
        },
        validate: (e) => /^\d{2} \d{3} \d{4}$/.test(e),
        maxDigits: 9,
        maxLength: 11,
      },
      "+993": {
        placeholder: "6 123 4567",
        format: (e) => {
          let t = "";
          return (
            e.length >= 1 && (t += e.slice(0, 1)),
            e.length >= 2 && (t += " " + e.slice(1, 4)),
            e.length >= 5 && (t += " " + e.slice(4, 8)),
            t
          );
        },
        validate: (e) => /^\d{1} \d{3} \d{4}$/.test(e),
        maxDigits: 8,
        maxLength: 10,
      },
      "+48": {
        placeholder: "123 456 789",
        format: (e) => {
          let t = "";
          return (
            e.length >= 1 && (t += e.slice(0, 3)),
            e.length >= 4 && (t += " " + e.slice(3, 6)),
            e.length >= 7 && (t += " " + e.slice(6, 9)),
            t
          );
        },
        validate: (e) => /^\d{3} \d{3} \d{3}$/.test(e),
        maxDigits: 9,
        maxLength: 11,
      },
    };
  let c = "+998";
  function m() {
    const e = new Date();
    return `${String(e.getDate()).padStart(
      2,
      "0"
    )}-${String(e.getMonth() + 1).padStart(2, "0")}-${e.getFullYear()}`;
  }
  function g() {
    return new Date().toLocaleTimeString("uz-UZ");
  }
  n.setAttribute("maxlength", r[c].maxLength),
    o.addEventListener("click", () => {
      const e = "block" === i.style.display;
      (i.style.display = e ? "none" : "block"),
        (d.innerHTML = e
          ? '<polyline points="6 9 12 15 18 9"></polyline>'
          : '<polyline points="18 15 12 9 6 15"></polyline>'),
        e ||
          ((i.innerHTML = ""),
          s.forEach((e) => {
            const t = document.createElement("div");
            (t.className = "country-option"),
              (t.innerHTML = `<span>${e.name}</span><span class="country-code">${e.code}</span>`),
              t.addEventListener("click", () => {
                (c = e.code),
                  (o.textContent = e.code),
                  (i.style.display = "none"),
                  (n.placeholder = r[e.code].placeholder),
                  n.setAttribute("maxlength", r[e.code].maxLength),
                  (n.value = ""),
                  (a.style.display = "none"),
                  (d.innerHTML =
                    '<polyline points="6 9 12 15 18 9"></polyline>');
              }),
              i.appendChild(t);
          }));
    }),
    document.addEventListener("click", (e) => {
      o.contains(e.target) ||
        i.contains(e.target) ||
        ((i.style.display = "none"),
        (d.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>'));
    }),
    n.addEventListener("input", (e) => {
      (n.value = (function (e, t) {
        const n = e.replace(/\D/g, ""),
          l = r[t] || r["+998"],
          a = n.slice(0, l.maxDigits);
        return l.format(a);
      })(e.target.value, c)),
        (a.style.display = "none");
    }),
    t.addEventListener("input", () => {
      l.style.display = "none";
    }),
    e.addEventListener("submit", async function (e) {
      if ((e.preventDefault(), !t.value.trim()))
        return (l.style.display = "block"), void (a.style.display = "none");
      if (!r[c].validate(n.value))
        return (a.style.display = "block"), void (l.style.display = "none");
      (l.style.display = "none"), (a.style.display = "none");
      const o = new URLSearchParams();
      o.append("Ism", t.value.trim()),
        o.append("Telefon raqam", `${c} ${n.value}`),
        o.append("Royhatdan o'tgan vaqti", `${m()}-${g()}`);
      const i = {
        name: t.value.trim(),
        phone: `${c} ${n.value}`,
        time: `${m()}-${g()}`,
      };
      localStorage.setItem("FormData", JSON.stringify(i)),
        (window.location.href = "/thankYou.html");
    });
});
let totalSeconds = 540;
const timerElement = document.getElementById("timer"),
  countdown = setInterval(() => {
    if (totalSeconds <= 0) return clearInterval(countdown);
    totalSeconds--;
    let e = Math.floor(totalSeconds / 60),
      t = totalSeconds % 60,
      n = e.toString().padStart(1, "0"),
      l = t.toString().padStart(2, "0");
    timerElement.textContent = `0${n}:${l}`;
  }, 1e3);
