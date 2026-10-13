
const sections = {
  cyber: {
    title: "Kiberxavfsizlik",
    description: "Axborot tizimlari xavfsizligi, tarmoqlar va himoya vositalarini o‘rganish uchun resurslar.",
    resources: [
      {
        title: "Cisco Networking Academy",
        description: "Tarmoqlar va kiberxavfsizlik bo‘yicha kurslar.",
        url: "https://www.netacad.com/",
        type: "Kurslar"
      },
      {
        title: "TryHackMe",
        description: "Amaliy kiberxavfsizlik laboratoriyalari.",
        url: "https://tryhackme.com/",
        type: "Amaliyot"
      },
      {
        title: "OWASP",
        description: "Web ilovalar xavfsizligi bo‘yicha qo‘llanmalar.",
        url: "https://owasp.org/",
        type: "Qo‘llanma"
      },
      {
        title: "PortSwigger Web Security",
        description: "Web xavfsizligini qonuniy laboratoriyalarda o‘rganing.",
        url: "https://portswigger.net/web-security",
        type: "Amaliyot"
      }
    ]
  },

  coding: {
    title: "Dasturlash",
    description: "Noldan dasturlashni o‘rganing va o‘z mahoratingizni rivojlantiring.",
    resources: [
      {
        title: "W3Schools",
        description: "HTML, CSS, JavaScript va Python darslari.",
        url: "https://www.w3schools.com/",
        type: "Darslar"
      },
      {
        title: "MDN Web Docs",
        description: "Web dasturlash bo‘yicha batafsil hujjatlar.",
        url: "https://developer.mozilla.org/",
        type: "Hujjatlar"
      },
      {
        title: "freeCodeCamp",
        description: "Bepul interaktiv dasturlash mashg‘ulotlari.",
        url: "https://www.freecodecamp.org/",
        type: "Amaliyot"
      },
      {
        title: "Python",
        description: "Python tilining rasmiy sayti va qo‘llanmalari.",
        url: "https://www.python.org/",
        type: "Python"
      },
      {
        title: "JavaScript.info",
        description: "JavaScript tilini bosqichma-bosqich o‘rganing.",
        url: "https://javascript.info/",
        type: "JavaScript"
      }
    ]
  },

  projects: {
    title: "Dasturlash loyihalari",
    description: "Amaliy g‘oyalar, ochiq kodli loyihalar va portfolio yaratish uchun manbalar.",
    resources: [
      {
        title: "GitHub",
        description: "Kodlaringizni saqlang va loyihalar yarating.",
        url: "https://github.com/",
        type: "Platforma"
      },
      {
        title: "Frontend Mentor",
        description: "Web dizaynlarni kod orqali yaratib mashq qiling.",
        url: "https://www.frontendmentor.io/",
        type: "Loyihalar"
      },
      {
        title: "CodePen",
        description: "HTML, CSS va JavaScript tajribalarini bajaring.",
        url: "https://codepen.io/",
        type: "Amaliyot"
      },
      {
        title: "Devpost",
        description: "Dasturlash loyihalari va hackathon g‘oyalari.",
        url: "https://devpost.com/",
        type: "G‘oyalar"
      }
    ]
  }
};

let currentSection = null;

function openSection(key) {
  const section = sections[key];
  if (!section) return;

  currentSection = key;

  document.getElementById("home").classList.add("hidden");
  document.querySelector(".sections").classList.add("hidden");
  document.querySelector(".community").classList.add("hidden");
  document.getElementById("details").classList.remove("hidden");

  document.getElementById("detailTitle").textContent = section.title;
  document.getElementById("detailDescription").textContent = section.description;
  document.getElementById("searchInput").value = "";

  renderResources(section.resources);
  document.getElementById("details").scrollIntoView({ behavior: "smooth" });
  document.getElementById("navLinks").classList.remove("open");
}

function renderResources(resources) {
  const list = document.getElementById("resourceList");
  list.innerHTML = "";

  if (resources.length === 0) {
    list.innerHTML = "<p>Hech qanday resurs topilmadi.</p>";
    return;
  }

  resources.forEach(item => {
    const link = document.createElement("a");
    link.className = "resource";
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    const title = document.createElement("h3");
    title.textContent = item.title;

    const description = document.createElement("p");
    description.textContent = item.description;

    const type = document.createElement("span");
    type.textContent = item.type + " ↗";

    link.append(title, description, type);
    list.appendChild(link);
  });
}

function filterResources() {
  if (!currentSection) return;

  const query = document.getElementById("searchInput")
    .value.toLowerCase().trim();

  const resources = sections[currentSection].resources.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query) ||
    item.type.toLowerCase().includes(query)
  );

  renderResources(resources);
}

function showHome() {
  document.getElementById("home").classList.remove("hidden");
  document.querySelector(".sections").classList.remove("hidden");
  document.querySelector(".community").classList.remove("hidden");
  document.getElementById("details").classList.add("hidden");

  currentSection = null;
  document.getElementById("navLinks").classList.remove("open");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("open");
}

// Matrix fon animatsiyasi
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

let columns = 0;
let drops = [];

function resizeMatrix() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  columns = Math.floor(canvas.width / 18);
  drops = Array(columns).fill(1);
}

function drawMatrix() {
  ctx.fillStyle = "rgba(5, 8, 7, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff9c";
  ctx.font = "14px monospace";

  const chars = "01アイウエオカキクケコ";

  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(char, i * 18, drops[i] * 18);

    if (drops[i] * 18 > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }

  requestAnimationFrame(drawMatrix);
}

window.addEventListener("resize", resizeMatrix);

resizeMatrix();
drawMatrix();
