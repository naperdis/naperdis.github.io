/* TELAME — логика прототипа: товары, корзина, избранное, фильтры, формы, анимации появления. */
(() => {
const IMG = 'assets/img/';
const CATS = {best:'Бестселлеры',sets:'Сеты',mats:'Коврики',massage:'Массажные мячи',rolls:'Роллы',bands:'Эспандеры',weights:'Гири и гантели',blocks:'Блоки и ремни',hemi:'Полусферы',pilates:'Мячи для пилатеса',socks:'Носочки'};
const COLORS = {grey:['#8c8c8c','серый'],sand:['#dccbb5','песочный'],powder:['#edc2cc','пудровый'],olive:['#b0bc68','олива'],choco:['#4a3529','шоколад'],milk:['#efe8dc','молочный']};
const P = [
 {id:'massage-balls',name:'Массажные мячи с шипами, 2 шт',v:'Серый · Ø 9 см',price:1290,old:1590,cats:['massage','best'],img:'massage-balls',gal:['massage-balls','pose','band'],badge:'хит',colors:['grey','sand','powder','olive'],opts:['Ø 7 см','Ø 9 см'],opt:1,
  desc:'Плотные мячи с мягкими шипами для самомассажа стоп, спины и шеи. Разминают мышцы после тренировки и снимают напряжение за 5–10 минут. Удобно брать с собой на пилатес и в поездки.'},
 {id:'dumbbells-1',name:'Гантели неопреновые, 2 × 1 кг',v:'Песочный',price:2490,cats:['weights','best'],img:'dumbbell',gal:['dumbbell','pose'],colors:['sand','grey','powder'],opts:['1 кг','1,5 кг','2 кг'],opt:0,
  desc:'Мягкое неопреновое покрытие не скользит во влажной ладони и не царапает пол. Подходят для пилатеса, барре и домашних тренировок.'},
 {id:'socks-choco',name:'Носочки для пилатеса',v:'Шоколад · 36–39',price:890,cats:['socks','best'],img:'socks',gal:['socks','mat'],badge:'новинка',colors:['choco','milk','olive'],opts:['36–39','40–42'],opt:0,
  desc:'Нескользящие силиконовые точки на стопе и мягкие резинки на подъёме. Держат стопу на реформере и коврике, не сползают.'},
 {id:'pilates-ball',name:'Мяч для пилатеса',v:'Пудровый · Ø 25 см',price:990,cats:['pilates','best'],img:'pilates-ball',gal:['pilates-ball','pose'],colors:['powder','grey','olive'],opts:['Ø 20 см','Ø 25 см'],opt:1,
  desc:'Мягкий мини-мяч для упражнений на мышцы кора, ног и тазового дна. Накачивается трубочкой из комплекта.'},
 {id:'yoga-blocks',name:'Блоки для йоги, 2 шт',v:'Латте · EVA',price:1590,cats:['blocks'],img:'blocks',gal:['blocks','mat'],colors:['sand','grey'],opts:['EVA','Пробка'],opt:0,
  desc:'Лёгкие и устойчивые блоки помогают безопасно выстроить позу и углубить растяжку. Скошенные края удобно ложатся в ладонь.'},
 {id:'yoga-mat',name:'Коврик для йоги 6 мм',v:'Молочный · 183 × 61',price:3990,cats:['mats','best'],img:'mat',gal:['mat','blocks'],badge:'хит',colors:['milk','olive','sand'],opts:['4 мм','6 мм'],opt:1,
  desc:'Плотный коврик с хорошим сцеплением: не скользит в планке и мягко поддерживает колени. Сворачивается без заломов.'},
 {id:'fabric-band',name:'Фитнес-резинка тканевая',v:'Олива · средняя',price:790,cats:['bands'],img:'band',gal:['band','socks'],colors:['olive','powder','grey'],opts:['Лёгкая','Средняя','Сильная'],opt:1,
  desc:'Тканевая резинка не скручивается и не впивается в кожу. Для ягодиц, ног и растяжки.'},
 {id:'set-home',name:'Сет «Пилатес дома»',v:'Мяч, массажные мячи, носочки',price:5490,old:6170,cats:['sets','best'],img:'pose',gal:['pose','massage-balls','socks','pilates-ball'],badge:'сет',colors:['powder','grey'],opts:['Базовый','С ковриком'],opt:0,
  desc:'Всё для первых тренировок дома в одной гамме: мяч для пилатеса, пара массажных мячей и нескользящие носочки. В сете выгоднее, чем по отдельности.'},
 {id:'massage-ball',name:'Массажный мяч одиночный',v:'Серый · Ø 7 см',price:590,cats:['massage'],img:'massage-balls',gal:['massage-balls'],colors:['grey','sand'],opts:['Ø 7 см','Ø 9 см'],opt:0,desc:'Один мяч с шипами для точечного самомассажа.'},
 {id:'dumbbells-2',name:'Гантели неопреновые, 2 × 2 кг',v:'Песочный',price:2990,cats:['weights'],img:'dumbbell',gal:['dumbbell'],colors:['sand','grey'],opts:['2 кг'],opt:0,desc:'Те же мягкие гантели, но потяжелее — для силовых блоков.'},
 {id:'yoga-strap',name:'Ремень для йоги',v:'Латте · 250 см',price:690,cats:['blocks'],img:'blocks',gal:['blocks'],colors:['sand','olive'],opts:['250 см'],opt:0,desc:'Хлопковый ремень с металлической пряжкой помогает дотянуться и удержать позу.'},
 {id:'socks-olive',name:'Носочки с перекрёстом',v:'Олива · 36–39',price:890,cats:['socks'],img:'pilates-ball',gal:['pilates-ball','socks'],colors:['olive','milk'],opts:['36–39','40–42'],opt:0,desc:'Открытый подъём с перекрёстными резинками и нескользящая стопа.'}
];
const byId = id => P.find(p => p.id === id);
const rub = n => n.toLocaleString('ru-RU') + ' ₽';
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const store = { get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} } };
const ICON = {
  plus:'<path d="M12 5v14M5 12h14"/>', minus:'<path d="M5 12h14"/>', heart:'<path d="M12 19s-7-4.3-7-9.2A3.8 3.8 0 0 1 12 7.6a3.8 3.8 0 0 1 7 2.2C19 14.7 12 19 12 19z"/>',
  close:'<path d="M6 6l12 12M18 6L6 18"/>', arrow:'<path d="M5 12h14M14 7l5 5-5 5"/>'
};
const ico = (k, cls = '') => `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICON[k]}</svg>`;
const flower = () => '<svg class="flower" viewBox="0 0 200 200" aria-hidden="true"><use href="#flower"/></svg>';

/* ---------- карточка товара ---------- */
let favs = new Set(store.get('telame-fav', []));
function card(p) {
  return `<article class="card" data-cats="${p.cats.join(' ')}" data-price="${p.price}">
    <div class="media"><a class="pic" href="product.html?id=${p.id}" aria-label="${p.name}">
      ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
      <img src="${IMG + p.img}.webp" alt="${p.name}" loading="lazy" width="324" height="400">
    </a><button class="fav ${favs.has(p.id) ? 'on' : ''}" data-fav="${p.id}" aria-label="В избранное">${ico('heart')}</button></div>
    <div class="card-info"><a href="product.html?id=${p.id}">${p.name}</a><span class="muted">${p.v}</span></div>
    <div class="card-row"><span class="price">${rub(p.price)}</span><button class="add" data-add="${p.id}" aria-label="В корзину: ${p.name}">${ico('plus')}<span>В корзину</span></button></div>
  </article>`;
}
function mountCards(el, list) {
  el.innerHTML = list.map(card).join('');
  observe(el);
}

/* ---------- корзина ---------- */
let cart = store.get('telame-cart', null);
if (!Array.isArray(cart)) cart = [];
const save = () => { store.set('telame-cart', cart); renderCart(); };
const count = () => cart.reduce((s, i) => s + i.q, 0);
const sum = () => cart.reduce((s, i) => s + (byId(i.id)?.price || 0) * i.q, 0);
function addToCart(id, q = 1, btn) {
  const it = cart.find(i => i.id === id); if (it) it.q += q; else cart.push({ id, q });
  save(); $$('.cart-count').forEach(c => { c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); });
  toast(`«${byId(id).name}» в корзине`);
  if (btn) { btn.classList.add('done'); setTimeout(() => btn.classList.remove('done'), 1200); }
}
function renderCart() {
  const n = count();
  $$('.cart-count').forEach(c => { c.textContent = n; c.dataset.n = n; });
  const d = $('.drawer'); if (!d) return;
  d.classList.toggle('empty', !n);
  $('.drawer-title', d).innerHTML = `Корзина <span class="acc">${n || ''}</span>`;
  $('.drawer-list', d).innerHTML = cart.map(i => { const p = byId(i.id); return `<div class="citem">
     <a class="pic" href="product.html?id=${p.id}"><img src="${IMG + p.img}-sm.webp" alt=""></a>
     <div class="citem-body"><div class="citem-top"><div><a href="product.html?id=${p.id}">${p.name}</a><div class="small muted">${p.v}</div></div>
       <button data-del="${p.id}" aria-label="Удалить">${ico('close')}</button></div>
     <div class="citem-bot"><div class="step"><button data-dec="${p.id}" aria-label="Меньше">${ico('minus')}</button><span>${i.q}</span><button data-inc="${p.id}" aria-label="Больше">${ico('plus')}</button></div><b class="price">${rub(p.price * i.q)}</b></div></div></div>`; }).join('');
  $('.d-goods', d).textContent = `Товары, ${n} шт`; $('.d-sum', d).textContent = rub(sum()); $('.d-total', d).textContent = rub(sum());
  if (window.onCartChange) window.onCartChange();
}
function openCart(open = true) { $('.drawer')?.classList.toggle('open', open); $('.overlay')?.classList.toggle('open', open); document.documentElement.style.overflow = open ? 'hidden' : ''; if (open) setTimeout(() => $('.drawer .close-cart')?.focus(), 300); }
let tt; function toast(t) { const el = $('.toast'); if (!el) return; $('span:not(.fl)', el).textContent = t; el.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => el.classList.remove('show'), 2400); }

/* ---------- появление при прокрутке ---------- */
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
let io;
function observe(root = document) {
  const els = $$('.rv,.bloom,.pic,.lines,.sticker', root);
  if (still || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('seen')); return; }
  io = io || new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('seen'); io.unobserve(x.target); } }), { rootMargin: '0px 0px -8% 0px' });
  els.forEach(e => { if (!e.classList.contains('seen')) io.observe(e); });
}
// страховка: всё, что уже на экране или выше, показываем даже если наблюдатель не сработал
let sweepT; function sweep() { const h = innerHeight; $$('.rv:not(.seen),.bloom:not(.seen),.pic:not(.seen),.lines:not(.seen),.sticker:not(.seen)').forEach(e => { if (e.getBoundingClientRect().top < h) e.classList.add('seen'); }); }
addEventListener('scroll', () => { clearTimeout(sweepT); sweepT = setTimeout(sweep, 250); }, { passive: true });
addEventListener('hashchange', () => setTimeout(sweep, 100));
function stagger() { $$('[data-stagger]').forEach(g => [...g.children].forEach((c, i) => { c.classList.add(g.dataset.stagger || 'rv'); c.style.setProperty('--d', i * 90 + 'ms'); })); }

/* ---------- общие взаимодействия ---------- */
document.addEventListener('click', e => {
  const t = e.target.closest('[data-add],[data-fav],[data-del],[data-inc],[data-dec],.open-cart,.close-cart,.overlay,.burger,.mclose,.acc-btn,.proto button,.apply-promo');
  if (!t) return;
  if (t.classList.contains('apply-promo')) { const v = t.parentElement.querySelector('.promo-in')?.value.trim(); toast(v ? 'Такого промокода нет — проверьте написание' : 'Введите промокод'); }
  else if (t.dataset.add) { e.preventDefault(); addToCart(t.dataset.add, 1, t); }
  else if (t.dataset.fav) { e.preventDefault(); const id = t.dataset.fav; favs.has(id) ? favs.delete(id) : favs.add(id); store.set('telame-fav', [...favs]); $$(`[data-fav="${id}"]`).forEach(b => b.classList.toggle('on', favs.has(id))); favCount(); window.onFavChange?.(); if (favs.has(id)) toast('Добавили в избранное'); }
  else if (t.dataset.del) { cart = cart.filter(i => i.id !== t.dataset.del); save(); }
  else if (t.dataset.inc) { cart.find(i => i.id === t.dataset.inc).q++; save(); }
  else if (t.dataset.dec) { const it = cart.find(i => i.id === t.dataset.dec); it.q > 1 ? it.q-- : cart.splice(cart.indexOf(it), 1); save(); }
  else if (t.classList.contains('open-cart')) { e.preventDefault(); openCart(true); }
  else if (t.classList.contains('close-cart') || t.classList.contains('overlay')) openCart(false);
  else if (t.classList.contains('burger')) { $('.mmenu').classList.add('open'); document.documentElement.style.overflow = 'hidden'; setTimeout(() => $('.mmenu nav a')?.focus(), 300); }
  else if (t.classList.contains('mclose')) { $('.mmenu').classList.remove('open'); document.documentElement.style.overflow = ''; $('.burger')?.focus(); }
  else if (t.classList.contains('acc-btn')) { const it = t.closest('.acc-item'); it.classList.toggle('open'); t.setAttribute('aria-expanded', it.classList.contains('open')); }
  else if (t.closest('.proto')) { t.closest('.proto').remove(); store.set('telame-proto', 1); }
});
addEventListener('keydown', e => {
  const mm = $('.mmenu');
  if (e.key === 'Escape') { const wasOpen = mm?.classList.contains('open'); openCart(false); mm?.classList.remove('open'); document.documentElement.style.overflow = ''; if (wasOpen) $('.burger')?.focus(); }
  if (e.key === 'Tab' && mm?.classList.contains('open')) { const f = $$('a,button', mm); const i = f.indexOf(document.activeElement); if (e.shiftKey && i <= 0) { e.preventDefault(); f.at(-1).focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); } }
});
const hdr = $('.header'); addEventListener('scroll', () => hdr?.classList.toggle('scrolled', scrollY > 8), { passive: true });
const page = document.body.dataset.page; $$(`.nav a[data-nav="${page}"]`).forEach(a => a.classList.add('active'));
if (store.get('telame-proto', 0)) $('.proto')?.remove();
else setTimeout(() => $('.proto')?.classList.add('gone'), 7000);

/* ---------- страницы ---------- */
const params = new URLSearchParams(location.search);
// главная
const best = $('#best'); if (best) mountCards(best, P.filter(p => p.cats.includes('best')).slice(0, 4));
// каталог
const grid = $('#catalog');
if (grid) {
  let cat = params.get('cat') || 'all', sort = 'pop', shown = 8, q = '', onlyFav = params.get('fav') === '1';
  const qi = $('#q'); if (params.get('search')) setTimeout(() => qi.focus(), 400);
  qi.addEventListener('input', () => { q = qi.value.trim().toLowerCase(); shown = 8; draw(true); });
  const chips = $('#chips'); chips.innerHTML = `<button class="chip" data-cat="all">Все товары</button>` + Object.entries(CATS).map(([k, v]) => `<button class="chip" data-cat="${k}">${v}</button>`).join('');
  const draw = (anim) => {
    window.onFavChange = () => { if (onlyFav) draw(true); };
    let list = P.filter(p => (cat === 'all' || p.cats.includes(cat)) && (!q || p.name.toLowerCase().includes(q)) && (!onlyFav || favs.has(p.id)));
    if (sort === 'asc') list = [...list].sort((a, b) => a.price - b.price); if (sort === 'desc') list = [...list].sort((a, b) => b.price - a.price);
    $$('.chip', chips).forEach(c => c.classList.toggle('on', c.dataset.cat === cat));
    const vis = list.slice(0, shown); mountCards(grid, vis);
    if (anim) $$('.card', grid).forEach((c, i) => { c.classList.add('in'); c.style.animationDelay = i * 50 + 'ms'; $$('.pic', c).forEach(p => p.classList.add('seen')); });
    $('#count').textContent = `${list.length} ${list.length % 10 === 1 && list.length !== 11 ? 'товар' : list.length % 10 >= 2 && list.length % 10 <= 4 && (list.length < 10 || list.length > 20) ? 'товара' : 'товаров'}`;
    $('#more').hidden = list.length <= shown; $('#shown').textContent = list.length ? `Показано ${vis.length} из ${list.length}` : 'В этой категории товары скоро появятся';
    $('#cat-title').textContent = onlyFav ? 'Избранное' : cat === 'all' ? 'Каталог' : CATS[cat]; $('#cat-acc').hidden = cat !== 'all' || onlyFav;
    if (!list.length) $('#shown').textContent = onlyFav ? 'Пока пусто — отмечайте товары сердечком' : q ? 'Ничего не нашли — попробуйте другое слово' : 'В этой категории товары скоро появятся';
  };
  chips.addEventListener('click', e => { const c = e.target.closest('.chip'); if (!c) return; cat = c.dataset.cat; shown = 8; onlyFav = false; history.replaceState(null, '', cat === 'all' ? 'catalog.html' : `catalog.html?cat=${cat}`); draw(true); });
  $('#sort').addEventListener('change', e => { sort = e.target.value; draw(true); });
  $('#more').addEventListener('click', () => { shown += 8; draw(true); });
  draw(false);
}
// товар
const pd = $('#product');
if (pd) {
  const p = byId(params.get('id')) || P[0];
  document.title = `${p.name} — TELAME`;
  const cut = (n => { for (const s of [', ', ' «', ' с ', ' для ']) { const i = n.indexOf(s); if (i > 0) return [n.slice(0, i + (s === ', ' ? 1 : 0)), n.slice(i + (s === ', ' ? 2 : 1))]; } return [n]; })(p.name);
  const [first, ...rest] = cut;
  $('#p-crumb').innerHTML = `<a href="index.html">Главная</a>  /  <a href="catalog.html">Каталог</a>  /  <a href="catalog.html?cat=${p.cats[0]}">${CATS[p.cats[0]]}</a>  /  ${p.name}`;
  $('#p-name').innerHTML = rest.length ? `${first}<br><span class="acc">${rest.join(' ')}</span>` : p.name;
  $('#p-tags').innerHTML = (p.badge ? `<span class="tag">${p.badge}</span>` : '') + '<span class="tag ok">в наличии</span>';
  $('#p-price').innerHTML = `<b>${rub(p.price)}</b>${p.old ? `<s>${rub(p.old)}</s>` : ''}`; $$('.bb-price').forEach(e => e.textContent = rub(p.price));
  $('#p-desc').textContent = p.desc;
  let ci = 0, oi = p.opt, q = 1;
  const colors = $('#p-colors'), opts = $('#p-opts'), clabel = $('#p-clabel');
  colors.innerHTML = p.colors.map((c, i) => `<button class="swatch ${i ? '' : 'on'}" style="background:${COLORS[c][0]}" aria-label="${COLORS[c][1]}" data-i="${i}"></button>`).join('');
  clabel.textContent = `Цвет: ${COLORS[p.colors[0]][1]}`;
  colors.addEventListener('click', e => { const b = e.target.closest('.swatch'); if (!b) return; ci = +b.dataset.i; $$('.swatch', colors).forEach(s => s.classList.toggle('on', s === b)); clabel.textContent = `Цвет: ${COLORS[p.colors[ci]][1]}`; });
  opts.innerHTML = p.opts.map((o, i) => `<button class="opt ${i === oi ? 'on' : ''}" data-i="${i}">${o}</button>`).join('');
  opts.addEventListener('click', e => { const b = e.target.closest('.opt'); if (!b) return; oi = +b.dataset.i; $$('.opt', opts).forEach(s => s.classList.toggle('on', s === b)); $$('.bb-opt').forEach(x => x.textContent = p.opts[oi]); });
  $$('.bb-opt').forEach(x => x.textContent = p.opts[oi]);
  const qv = $('#p-q'); $('#p-dec').onclick = () => { q = Math.max(1, q - 1); qv.textContent = q; }; $('#p-inc').onclick = () => { q++; qv.textContent = q; };
  $$('.p-add').forEach(b => b.onclick = () => addToCart(p.id, q, b));
  $$('.favbig').forEach(b => { b.dataset.fav = p.id; b.classList.toggle('on', favs.has(p.id)); });
  const main = $('#p-main img'), th = $('#p-thumbs');
  main.src = IMG + p.gal[0] + '.webp'; main.alt = p.name;
  th.innerHTML = p.gal.map((g, i) => `<button class="${i ? '' : 'on'}" data-g="${g}" aria-label="Фото ${i + 1}"><img src="${IMG + g}-sm.webp" alt=""></button>`).join('');
  th.addEventListener('click', e => { const b = e.target.closest('button'); if (!b || b.classList.contains('on')) return; $$('button', th).forEach(x => x.classList.toggle('on', x === b)); main.classList.add('fade'); setTimeout(() => { main.src = IMG + b.dataset.g + '.webp'; main.onload = () => main.classList.remove('fade'); }, 300); });
  mountCards($('#related'), P.filter(x => x.id !== p.id && !x.cats.some(c => p.cats.includes(c))).slice(0, 4));
}
// оформление
const co = $('#checkout');
if (co) {
  const deliv = () => +($('input[name=deliv]:checked', co)?.dataset.price || 0);
  window.onCartChange = () => {
    $('#s-list').innerHTML = cart.map(i => { const p = byId(i.id); return `<div class="sline"><span class="pic"><img src="${IMG + p.img}-sm.webp" alt=""></span><div>${p.name}<div class="muted">${i.q} шт · ${p.v}</div></div><b>${rub(p.price * i.q)}</b></div>`; }).join('') || '<p class="muted">Корзина пуста — <a href="catalog.html" style="text-decoration:underline">в каталог</a></p>';
    $('#s-goods').textContent = `Товары, ${count()} шт`; $('#s-sum').textContent = rub(sum());
    const d = deliv(); $('#s-deliv').textContent = d ? rub(d) : ($('input[name=deliv]:checked', co)?.dataset.text || 'бесплатно'); $('#s-total').textContent = rub(sum() + d);
  };
  co.addEventListener('change', window.onCartChange);
  co.addEventListener('submit', e => { e.preventDefault(); if (!count()) { toast('Корзина пуста'); return; } document.body.classList.add('is-done'); cart = []; save(); scrollTo({ top: 0, behavior: 'smooth' }); });
}
// сертификат
const cf = $('#cert-form');
if (cf) {
  const upd = () => { const n = $('.chip.on', cf)?.dataset.v; const own = $('#own'); const v = n === 'own' ? (+own.value || 0) : +n; own.closest('.field').hidden = n !== 'own'; $('#c-sum').textContent = rub(v); $$('.cv b').forEach(b => b.textContent = rub(v)); $('#c-format').textContent = $('input[name=fmt]:checked', cf).dataset.t; };
  cf.addEventListener('click', e => { const c = e.target.closest('.chip'); if (!c) return; e.preventDefault(); $$('.chip', cf).forEach(x => x.classList.toggle('on', x === c)); upd(); });
  cf.addEventListener('input', upd); cf.addEventListener('change', upd);
  cf.addEventListener('submit', e => { e.preventDefault(); cf.classList.add('sent'); toast('Сертификат оформлен — проверьте почту'); });
  upd();
}
// студии
$$('form.lead-form').forEach(f => f.addEventListener('submit', e => { e.preventDefault(); f.classList.add('sent'); toast('Заявка отправлена — ответим в течение дня'); }));
// инфо: подсветка вкладок
const tabs = $('#info-tabs');
if (tabs) {
  const chips = $$('.chip', tabs), secs = chips.map(c => document.getElementById(c.getAttribute('href').slice(1)));
  let lock = 0; tabs.addEventListener('click', e => { const c = e.target.closest('.chip'); if (!c) return; chips.forEach(x => x.classList.toggle('on', x === c)); lock = Date.now() + 1500; });
  const upd = () => { if (Date.now() < lock) return; let a = 0; secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top < innerHeight * .4) a = i; }); if (innerHeight + scrollY >= document.body.scrollHeight - 4) a = secs.length - 1; chips.forEach((c, i) => c.classList.toggle('on', i === a)); };
  addEventListener('scroll', upd, { passive: true }); upd();
}

function favCount() { $$('.fav-count').forEach(c => { c.textContent = favs.size; c.dataset.n = favs.size; }); }
if ($('.buy-bar')) document.body.classList.add('has-buybar');
stagger(); renderCart(); favCount();
const go = () => { document.documentElement.classList.add('loaded'); observe(); setTimeout(sweep, 400); setTimeout(sweep, 1800); };
(document.fonts?.ready || Promise.resolve()).then(go); setTimeout(go, 900);
})();
