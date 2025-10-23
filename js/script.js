document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const nameError = document.getElementById("nameError");
  const phoneError = document.getElementById("phoneError");
  const countryCodeEl = document.getElementById("selectedCountryCode");
  const dropdown = document.getElementById("countryDropdown");
  const dropdownIcon = document.getElementById("dropdownIcon");
  const unlockBtn = document.getElementById("unlockBtn");
  const timerElement = document.getElementById("timer");

  let totalSeconds = 1800;
  const pad = (n) => String(n).padStart(2, "0");
  const setTime = (s) => {
    const m = pad(Math.floor(s / 60));
    const sec = pad(s % 60);
    timerElement.textContent = `${m}:${sec}`;
    if (unlockBtn) unlockBtn.textContent = `Ro'yxatdan o'tish (${m}:${sec})`;
  };

  if (form) form.style.display = "none";
  if (unlockBtn) {
    unlockBtn.disabled = true;
    unlockBtn.setAttribute("aria-disabled", "true");
    setTime(totalSeconds);
  }

  const countdown = setInterval(() => {
    totalSeconds--;
    if (totalSeconds <= 0) {
      clearInterval(countdown);
      if (unlockBtn) {
        unlockBtn.disabled = false;
        unlockBtn.removeAttribute("aria-disabled");
        unlockBtn.textContent = "Ro'yxatdan o'tish";
      }
      timerElement.textContent = "00:00";
      return;
    }
    setTime(totalSeconds);
  }, 1000);

  if (unlockBtn) {
    unlockBtn.addEventListener("click", () => {
      if (unlockBtn.disabled) return;
      unlockBtn.style.display = "none";
      if (form) {
        form.style.display = "block";
        setTimeout(() => nameInput && nameInput.focus(), 0);
      }
    });
  }

  const countries = [
    { name: "Uzbekistan", code: "+998" },
    { name: "AQSH", code: "+1" },
    { name: "Janubiy Koreya", code: "+82" },
    { name: "Qirg'iziston", code: "+996" },
    { name: "Qozog'iston", code: "+7" },
    { name: "Tojikiston", code: "+992" },
    { name: "Turkmaniston", code: "+993" },
    { name: "Polsha", code: "+48" },
  ];

  const formats = {
    "+998": {
      ph: "88 888 88 88",
      re: /^\d{2} \d{3} \d{2} \d{2}$/,
      cut: 9,
      max: 12,
    },
    "+1": { ph: "555 123 4567", re: /^\d{3} \d{3} \d{4}$/, cut: 10, max: 12 },
    "+82": { ph: "10 1234 5678", re: /^\d{2} \d{4} \d{4}$/, cut: 10, max: 12 },
    "+996": { ph: "555 123 456", re: /^\d{3} \d{3} \d{3}$/, cut: 9, max: 11 },
    "+7": { ph: "700 123 4567", re: /^\d{3} \d{3} \d{4}$/, cut: 10, max: 12 },
    "+992": { ph: "55 555 5555", re: /^\d{2} \d{3} \d{4}$/, cut: 9, max: 11 },
    "+993": { ph: "6 123 4567", re: /^\d{1} \d{3} \d{4}$/, cut: 8, max: 10 },
    "+48": { ph: "123 456 789", re: /^\d{3} \d{3} \d{3}$/, cut: 9, max: 11 },
  };

  let selectedCode = "+998";
  phoneInput.placeholder = formats[selectedCode].ph;
  phoneInput.maxLength = formats[selectedCode].max;

  countryCodeEl.addEventListener("click", () => {
    const open = dropdown.style.display === "block";
    dropdown.style.display = open ? "none" : "block";
    dropdownIcon.innerHTML = open
      ? '<polyline points="6 9 12 15 18 9"></polyline>'
      : '<polyline points="18 15 12 9 6 15"></polyline>';

    if (!open) {
      dropdown.innerHTML = "";
      countries.forEach((c) => {
        const div = document.createElement("div");
        div.className = "country-option";
        div.innerHTML = `<span>${c.name}</span><span class="country-code">${c.code}</span>`;
        div.onclick = () => {
          selectedCode = c.code;
          countryCodeEl.textContent = c.code;
          dropdown.style.display = "none";
          phoneInput.placeholder = formats[c.code].ph;
          phoneInput.maxLength = formats[c.code].max;
          phoneInput.value = "";
          phoneError.style.display = "none";
          dropdownIcon.innerHTML =
            '<polyline points="6 9 12 15 18 9"></polyline>';
        };
        dropdown.appendChild(div);
      });
    }
  });

  document.addEventListener("click", (e) => {
    if (!countryCodeEl.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = "none";
      dropdownIcon.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';
    }
  });

  phoneInput.addEventListener("input", (e) => {
    const onlyNums = e.target.value
      .replace(/\D/g, "")
      .slice(0, formats[selectedCode].cut);
    let v = onlyNums;

    if (selectedCode === "+998") {
      if (v.length > 2 && v.length <= 5) {
        v = v.replace(/(\d{2})(\d{0,3})/, (_, a, b) => `${a} ${b}`);
      } else if (v.length > 5 && v.length <= 7) {
        v = v.replace(
          /(\d{2})(\d{3})(\d{0,2})/,
          (_, a, b, c) => `${a} ${b} ${c}`
        );
      } else if (v.length > 7) {
        v = v.replace(
          /(\d{2})(\d{3})(\d{2})(\d{0,2})/,
          (_, a, b, c, d) => `${a} ${b} ${c} ${d}`
        );
      }
    }
    e.target.value = v;
    phoneError.style.display = "none";
  });

  nameInput.addEventListener("input", () => (nameError.style.display = "none"));

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!nameInput.value.trim()) {
      nameError.style.display = "block";
      return;
    }
    if (!formats[selectedCode].re.test(phoneInput.value)) {
      phoneError.style.display = "block";
      return;
    }

    const data = {
      name: nameInput.value.trim(),
      phone: `${selectedCode} ${phoneInput.value}`,
      time: new Date().toLocaleString("uz-UZ"),
      uid: Date.now().toString(),
    };

    localStorage.setItem("FormData", JSON.stringify(data));

    form.querySelector("button").disabled = true;
    window.location.href = "/thankYou.html";
  });
});
