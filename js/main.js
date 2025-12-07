/* js/main.js – Sora Studio – نسخة لا تتوقف عند الخطأ */

/* ===========================
   0. Safe Element Selector
   =========================== */
const safeQuery = (selector, context = document) => {
  try { return context.querySelector(selector); } catch { return null; }
};
const safeQueryAll = (selector, context = document) => {
  try { return Array.from(context.querySelectorAll(selector)); } catch { return []; }
};

/* ===========================
   1. إخفاء Loader مباشرة
   =========================== */
function hideLoader() {
  const loader = safeQuery('#loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 500);
  }
}
window.addEventListener('load', hideLoader);

/* ===========================
   2. Smooth Scrolling
   =========================== */
safeQueryAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = safeQuery(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ===========================
   3. Navbar Scroll Effect
   =========================== */
const navbar = safeQuery('#navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.style.background = window.scrollY > 50
      ? 'rgba(255, 255, 255, 0.98)'
      : 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = window.scrollY > 50
      ? '0 4px 20px rgba(0, 0, 0, 0.1)'
      : 'none';
  });
}

/* ===========================
   4. Scroll Animations
   =========================== */
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, observerOptions);

safeQueryAll('.scroll-fade-in').forEach(el => observer.observe(el));

/* ===========================
   5. Portfolio (only if exists)
   =========================== */
const portfolioGrid = safeQuery('#portfolioGrid');
if (portfolioGrid) {
  const projects = [
    { id: 1, title: 'حملة تصويرية - علامة تجارية فاخرة', category: 'photo', description: 'تصوير منتجات فاخرة بأسلوب حديث مع إضاءة احترافية', tags: ['تصوير', 'منتجات'] },
    { id: 2, title: 'فيديو ترويجي - شركة تقنية', category: 'video', description: 'فيديو ترويجي بأسلوب سينمائي مع رسومات حركية', tags: ['فيديو', 'موشن'] },
    { id: 3, title: 'إعادة تصميم هوية بصرية', category: 'brand', description: 'تصميم هوية بصرية متكاملة لشركة ناشئة', tags: ['تصميم', 'هوية'] },
    { id: 4, title: 'جلسة تصوير منتجات', category: 'photo', description: 'إضاءة احترافية لمنتجات العملاء بأسلوب minimal', tags: ['تصوير', 'منتجات'] },
    { id: 5, title: 'فيديو موشن جرافيك', category: 'video', description: 'موشن جرافيك لشركة ناشئة لشرح المنتج', tags: ['فيديو', 'موشن'] },
    { id: 6, title: 'شعار وتغليف منتج', category: 'brand', description: 'تصميم شعار وتغليف منتج بأسلوب عصري', tags: ['تصميم', 'تغليف'] }
  ];

  function renderPortfolio(filter = 'all') {
    portfolioGrid.innerHTML = '';
    const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
    filtered.forEach((project, index) => {
      const item = document.createElement('div');
      item.className = 'portfolio-item scroll-fade-in';
      item.style.animationDelay = `${index * 0.1}s`;
      item.innerHTML = `
        <div class="portfolio-image"></div>
        <div class="portfolio-content">
          <h3 class="portfolio-title">${project.title}</h3>
          <p class="portfolio-description">${project.description}</p>
          <div class="portfolio-tags">
            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        </div>
      `;
      portfolioGrid.appendChild(item);
    });
  }

  // Filter buttons
  safeQueryAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      safeQueryAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPortfolio(btn.dataset.filter);
    });
  });

  renderPortfolio(); // Render initially
}

/* ===========================
   6. Team (only if exists)
   =========================== */
const teamGrid = safeQuery('#teamGrid');
if (teamGrid) {
  const team = [
    { name: 'أحمد محمد', role: 'مدير إبداعي', bio: 'أكثر من 10 سنوات خبرة في الإدارة الإبداعية', initial: 'أ' },
    { name: 'سارة أحمد', role: 'مصممة جرافيك', bio: 'متخصصة في تصميم الهويات البصرية', initial: 'س' },
    { name: 'خالد حسن', role: 'مصور فوتوغرافي', bio: 'خبير في تصوير المنتجات والبورتريه', initial: 'خ' },
    { name: 'ليلى مصطفى', role: 'منتجة فيديو', bio: 'متخصصة في إنتاج الفيديوهات التجارية', initial: 'ل' }
  ];

  team.forEach((member, index) => {
    const memberEl = document.createElement('div');
    memberEl.className = 'team-member scroll-fade-in';
    memberEl.style.animationDelay = `${index * 0.1}s`;
    memberEl.innerHTML = `
      <div class="member-avatar">${member.initial}</div>
      <h3 class="member-name">${member.name}</h3>
      <p class="member-role">${member.role}</p>
      <p class="member-bio">${member.bio}</p>
    `;
    teamGrid.appendChild(memberEl);
  });
}

/* ===========================
   7. Parallax Effect
   =========================== */
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroBg = safeQuery('.hero-bg');
  if (heroBg) {
    heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

/* ===========================
   8. Hover Effects (safe)
   =========================== */
document.addEventListener('mouseover', e => {
  if (e.target.closest('.portfolio-item')) {
    const item = e.target.closest('.portfolio-item');
    item.style.transform = 'translateY(-8px) scale(1.02)';
  }
  if (e.target.closest('.team-member')) {
    const member = e.target.closest('.team-member');
    member.style.transform = 'translateY(-8px) scale(1.02)';
  }
});

document.addEventListener('mouseout', e => {
  if (e.target.closest('.portfolio-item')) {
    e.target.closest('.portfolio-item').style.transform = 'translateY(0) scale(1)';
  }
  if (e.target.closest('.team-member')) {
    e.target.closest('.team-member').style.transform = 'translateY(0) scale(1)';
  }
});

/* ===========================
   9. Mobile Menu Toggle
   =========================== */
const mobileMenuBtn = safeQuery('#mobileMenuBtn');
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    // يمكنك إضافة منطق القائمة الجوالة هنا لاحقاً
  });
}

/* ===========================
   10. إخفاء عناصر الـ Loader إضافياً
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
  // تأكد أن الـ loader يُخفى حتى لو لم يعمل الـ JavaScript
  setTimeout(() => {
    const loader = safeQuery('#loader');
    if (loader && !loader.classList.contains('hidden')) {
      loader.classList.add('hidden');
    }
  }, 2000); // كحد أقصى 2 ثانية
});
