// js/main.js – Sora Studio

// 1) Loader – إخفاء شاشة التحميل بعد تحميل الصفحة بالكامل
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.classList.add("hidden");
    // بعد الأنيميشن نخفيه نهائيًا
    setTimeout(() => {
      loader.style.display = "none";
    }, 600);
  }
});

// ننتظر DOM يجهز لباقي الوظائف
document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  setupSmoothScroll();
  setupScrollAnimations();
  setupPortfolio();
  setupTeam();
});

/* ============================
   2) منيو الجوال
   ============================ */
function setupMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.querySelector(".nav-links");

  if (!mobileMenuBtn || !navLinks) return;

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenuBtn.classList.toggle("active");
    navLinks.classList.toggle("open");
  });

  // إغلاق المنيو بعد الضغط على أي رابط
  navLinks.addEventListener("click", (e) => {
    if (e.target.classList.contains("nav-link")) {
      mobileMenuBtn.classList.remove("active");
      navLinks.classList.remove("open");
    }
  });
}

/* ============================
   3) سكرول ناعم للروابط الداخلية
   ============================ */
function setupSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}

/* ============================
   4) أنيميشن الظهور مع السحب (Scroll)
   ============================ */
function setupScrollAnimations() {
  const elements = document.querySelectorAll(".scroll-fade-in");

  if (!("IntersectionObserver" in window)) {
    // متصفح قديم – نظهر كل شيء بدون أنيميشن
    elements.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ============================
   5) بيانات الأعمال (Portfolio)
   ============================ */
const portfolioItemsData = [
  {
    title: "جلسة تصوير منتجات - براند قهوة",
    category: "photo",
    description: "تصوير منتجات احترافي مع إعداد كامل للإضاءة والخلفيات لبراند قهوة محلي.",
    tags: ["تصوير منتجات", "ستوديو", "إضاءة ناعمة"]
  },
  {
    title: "فيديو إعلان لمقهى حديث",
    category: "video",
    description: "إنتاج فيديو دعائي قصير لمقهى بطابع عصري، مخصص للسوشال ميديا.",
    tags: ["فيديو إعلاني", "سوشال ميديا", "ستايل لايف ستايل"]
  },
  {
    title: "هوية بصرية لعلامة أزياء",
    category: "brand",
    description: "تصميم شعار وهوية بصرية كاملة لعلامة أزياء سعودية ناشئة.",
    tags: ["براندنج", "لوغو", "دليل استخدام"]
  },
  {
    title: "تصوير بورتريه لروّاد أعمال",
    category: "photo",
    description: "جلسة تصوير بورتريه رسمية مع لمسة عصرية لرواد أعمال في الرياض.",
    tags: ["بورتريه", "شخصي", "بروفايل مهني"]
  },
  {
    title: "فيديو قصير لإطلاق تطبيق",
    category: "video",
    description: "موشن جرافيك + تصوير لقطات شاشة للتطبيق مع نصوص مخصصة.",
    tags: ["موشن جرافيك", "فيديو منتج", "تطبيقات"]
  },
  {
    title: "تصميم محتوى إنستقرام لعلامة تجارية",
    category: "brand",
    description: "テンبلت جاهزة لمحتوى إنستقرام مع نظام ألوان وهوية متكاملة.",
    tags: ["سوشال ميديا", "テンبلت", "براندنج"]
  }
];

/* ============================
   6) تهيئة الـ Portfolio وعمل الفلترة
   ============================ */
function setupPortfolio() {
  const portfolioGrid = document.getElementById("portfolioGrid");
  const filterButtons = document.querySelectorAll(".filter-btn");

  if (!portfolioGrid) return;

  // دالة لرسم الكروت
  function renderPortfolio(items) {
    portfolioGrid.innerHTML = "";

    if (!items.length) {
      portfolioGrid.innerHTML =
        '<p class="text-center" style="color: var(--gray-500);">لا توجد أعمال تحت هذا التصنيف حاليًا.</p>';
      return;
    }

    items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "portfolio-item scroll-fade-in";
      card.dataset.category = item.category;

      card.innerHTML = `
        <div class="portfolio-image"></div>
        <div class="portfolio-content">
          <h3 class="portfolio-title">${item.title}</h3>
          <p class="portfolio-description">${item.description}</p>
          <div class="portfolio-tags">
            ${item.tags
              .map((tag) => `<span class="tag">${tag}</span>`)
              .join("")}
          </div>
        </div>
      `;

      portfolioGrid.appendChild(card);
    });

    // إعادة تفعيل أنيميشن السك롤 للعناصر الجديدة
    setupScrollAnimations();
  }

  // أول رسم – الكل
  renderPortfolio(portfolioItemsData);

  // الفلترة حسب الزر
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter || "all";

      // تغيير حالة الزر النشط
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      if (filter === "all") {
        renderPortfolio(portfolioItemsData);
      } else {
        const filtered = portfolioItemsData.filter(
          (item) => item.category === filter
        );
        renderPortfolio(filtered);
      }
    });
  });
}

/* ============================
   7) بيانات الفريق
   ============================ */
const teamMembersData = [
  {
    name: "محمد العتيبي",
    role: "مصور رئيسي",
    initials: "م",
    bio: "متخصص في تصوير المنتجات والبورتريه مع خبرة تتجاوز ٦ سنوات في مجال الاستوديوهات التجارية."
  },
  {
    name: "سارة القحطاني",
    role: "مديرة إبداعية",
    initials: "س",
    bio: "تقود عملية تحويل أفكار العملاء إلى حملات بصرية متكاملة، من الفكرة حتى التنفيذ النهائي."
  },
  {
    name: "عبدالله الشهري",
    role: "مونتير وفيديوغرافر",
    initials: "ع",
    bio: "مسؤول عن تصوير وإخراج الفيديو وإضافة اللمسة السينمائية على مشاريع العملاء."
  },
  {
    name: "نورة الدوسري",
    role: "مصممة جرافيك",
    initials: "ن",
    bio: "تصميم هويات بصرية، محتوى سوشال ميديا، وقوالب جاهزة تعكس شخصية العلامة التجارية."
  }
];

/* ============================
   8) تهيئة قسم الفريق
   ============================ */
function setupTeam() {
  const teamGrid = document.getElementById("teamGrid");
  if (!teamGrid) return;

  teamGrid.innerHTML = "";

  teamMembersData.forEach((member) => {
    const card = document.createElement("article");
    card.className = "team-member scroll-fade-in";

    card.innerHTML = `
      <div class="member-avatar">
        <span>${member.initials}</span>
      </div>
      <h3 class="member-name">${member.name}</h3>
      <p class="member-role">${member.role}</p>
      <p class="member-bio">${member.bio}</p>
    `;

    teamGrid.appendChild(card);
  });

  // تفعيل أنيميشن السكول
  setupScrollAnimations();
}
