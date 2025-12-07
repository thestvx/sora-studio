/* js/main.js */
// بيانات وهمية (استبدلها بملف JSON خارجي لاحقًا)
const projects = [
  {id: 1, title: 'حملة تصويرية - علامة تجارية فاخرة', cat: 'photo', img: 'images/projects/p1.jpg', desc: 'تصوير منتجات فاخرة بأسلوب حديث'},
  {id: 2, title: 'فيديو ترويجي - شركة تقنية', cat: 'video', img: 'images/projects/p2.jpg', desc: 'فيديو ترويجي بأسلوب سينمائي'},
  {id: 3, title: 'إعادة تصميم هوية بصرية', cat: 'brand', img: 'images/projects/p3.jpg', desc: 'تصميم هوية بصرية متكاملة'},
  {id: 4, title: 'جلسة تصوير منتجات', cat: 'photo', img: 'images/projects/p4.jpg', desc: 'إضاءة احترافية لمنتجات العملاء'},
  {id: 5, title: 'فيديو موشن جرافيك', cat: 'video', img: 'images/projects/p5.jpg', desc: 'موشن جرافيك لشركة ناشئة'},
  {id: 6, title: 'شعار وتغليف', cat: 'brand', img: 'images/projects/p6.jpg', desc: 'تصميم شعار وتغليف منتج'},
];

const team = [
  {name: 'أحمد محمد', role: 'مدير إبداعي', img: 'images/team/t1.jpg', bio: 'أكثر من 10 سنوات خبرة في الإدارة الإبداعية'},
  {name: 'سارة أحمد', role: 'مصممة جرافيك', img: 'images/team/t2.jpg', bio: 'متخصصة في تصميم الهويات البصرية'},
  {name: 'خالد حسن', role: 'مصور فوتوغرافي', img: 'images/team/t3.jpg', bio: 'خبير في تصوير المنتجات والبورتريه'},
  {name: 'ليلى مصطفى', role: 'منتجة فيديو', img: 'images/team/t4.jpg', bio: 'متخصصة في إنتاج الفيديوهات التجارية'},
];

// ملء Portfolio
const portfolioGrid = document.getElementById('portfolio-grid');
if (portfolioGrid) {
  projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-cat', p.cat);
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <div class="card-body">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
      </div>
    `;
    portfolioGrid.appendChild(card);
  });

  // فلترة بسيطة
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      document.querySelectorAll('.card').forEach(c => {
        c.style.display = (cat === 'all' || c.getAttribute('data-cat') === cat) ? 'block' : 'none';
      });
    });
  });
}

// ملء الفريق
function fillTeam(wrapperId) {
  const wrap = document.getElementById(wrapperId);
  if (!wrap) return;
  team.forEach(m => {
    const member = document.createElement('div');
    member.className = 'member';
    member.innerHTML = `
      <img src="${m.img}" alt="${m.name}">
      <h3>${m.name}</h3>
      <p class="role">${m.role}</p>
      <p class="bio">${m.bio}</p>
    `;
    wrap.appendChild(member);
  });
}
fillTeam('team-grid');
fillTeam('team-page-grid');

// شريط التنقل الشفاف → شفاف عند الهبوط
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});
