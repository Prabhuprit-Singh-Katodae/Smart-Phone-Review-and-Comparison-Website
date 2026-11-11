/* Smart-Phone Review & Comparison: FRONT-END DEMO ONLY.
   localStorage = browser storage on your own device, NOT a database. Login is a demonstration, NOT real security. */
const NV = "Needs verification", CHECKED = "11 Nov 2026";
const $ = s => document.querySelector(s);
const get = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch (e) { return d } };
const set = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch (e) { } };
const rs = n => n == null ? `<span class="nv">${NV}</span>` : "₹" + n.toLocaleString("en-IN");
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const val = v => v == null ? `<span class="nv">${NV}</span>` : esc(v);
const BANDS = [[0, 15e3, "Under ₹15,000"], [15e3, 2e4, "₹15,000–₹20,000"], [2e4, 3e4, "₹20,000–₹30,000"], [3e4, 4e4, "₹30,000–₹40,000"], [4e4, 5e4, "₹40,000–₹50,000"], [5e4, 75e3, "₹50,000–₹75,000"], [75e3, 1e9, "Over ₹75,000"]];

/* ---- 2026 India catalogue. null = not verified (shown as "Needs verification"). No ratings are invented:
   ratings come only from reviews submitted and approved in this demo. lp = launch price, price = current listed price. ---- */
const M = (id, name, brand, launch, lp, price, cpu, disp, cam, bat, src, note) => ({ id, name, brand, os: brand === "Apple" ? "iOS" : "Android", launch, lp, price, cpu, disp, cam, bat, src, note: note || "" });
const P = [
  M("nothing-4a", "Nothing Phone 4a", "Nothing", "5 Mar 2026", 31999, 34999, null, null, "50MP + 8MP rear, 16MP front", "6000 mAh", "https://www.bajajfinserv.in/nothing-phone-4a-price-in-india", "Launch price is the starting 8GB variant; current price from a retailer listing."),
  M("nothing-4a-pro", "Nothing Phone 4a Pro", "Nothing", "Mar 2026", null, 49999, "Snapdragon 7 Gen 4", "6.83 in", "50MP + 50MP + 8MP rear, 32MP front", "5400 mAh", "https://www.91mobiles.com/nothing-phone-4a-price-in-india?ty=prices", "Current price: base variant per a June 2026 report."),
  M("nord-6", "OnePlus Nord 6", "OnePlus", "2026 (date needs verification)", null, 47999, null, "AMOLED, 165Hz", "50MP main with OIS + 8MP ultrawide, 32MP front", null, "https://www.latestly.com/technology/oneplus-nord-6-launch-today-check-time-expected-price-specifications-7383289.html"),
  M("poco-x8-pro-max", "POCO X8 Pro Max", "POCO", "2026 (date needs verification)", null, 44999, null, null, null, null, "https://www.findprix.com/mobiles/vivo-v70-fe-8gb-ram-256gb-4173"),
  M("poco-x8-pro", "POCO X8 Pro", "POCO", "2026 (date needs verification)", null, 34999, null, null, "50MP main with OIS + 8MP ultrawide, 20MP front", "6500 mAh, 80W", "https://www.findprix.com/mobiles/vivo-v70-fe-8gb-ram-256gb-4173"),
  M("edge-70-pro-plus", "Motorola Edge 70 Pro+", "Motorola", "June 2026 (sale from 11 Jun)", null, null, null, null, "50MP periscope telephoto, 3.5x zoom", null, "https://marvelof.com/gadgets/motorola-edge-70-pro-launched-in-india-price-specs-is-it-worth-buying", "Has 15W wireless charging."),
  M("edge-70-fusion", "Motorola Edge 70 Fusion", "Motorola", "2026 (date needs verification)", null, 27199, null, null, null, null, "https://www.91mobiles.com/nothing-phone-4a-price-in-india?ty=prices", "Price from one variant listing; other listings are higher."),
  M("vivo-t5-pro", "vivo T5 Pro", "vivo", "2026 (date needs verification)", null, 33999, null, null, null, null, "https://www.findprix.com/mobiles/vivo-v70-fe-8gb-ram-256gb-4173"),
  M("galaxy-a37", "Samsung Galaxy A37 5G", "Samsung", "Q1 2026", null, 36990, null, null, null, null, "https://counterpointresearch.com/cn/reports/India-Smartphone-Launches-Q1-2026-OEMs-Re-calibrate-Portfolios-Amid-Rising-BOM-Costs"),
  M("iqoo-z11", "iQOO Z11 5G", "iQOO", "Aug 2026 (sale 25 Aug)", 34999, null, null, null, "50MP rear", "7000 mAh", "https://telecomtalk.info/iqoo-z11-5g-launched-in-india/1010993/", "Launch price is the 6GB+128GB variant."),
  M("poco-m8x", "POCO M8x 5G", "POCO", "Aug 2026", 20999, null, "Snapdragon 4 Gen 5", null, null, "7900 mAh, 45W", "https://techmitra.in/smartphones-launched-in-india-in-august-2026/"),
  M("redmi-note-17", "Redmi Note 17 5G", "Redmi", "6 Aug 2026", 27999, null, null, "AMOLED", null, "8000 mAh", "https://techmitra.in/smartphones-launched-in-india-in-august-2026/", "Launch price is approximate (\"around\") in the source."),
  M("realme-p4s", "realme P4s 5G", "realme", "26 Aug 2026", null, null, "Dimensity 7400 Ultra", null, null, "8000 mAh, 80W", "https://techmitra.in/smartphones-launched-in-india-in-august-2026/"),
  M("oneplus-n6x", "OnePlus N6x", "OnePlus", "Aug 2026", 18999, null, "Dimensity 6360 Apex", "6.8 in, 120Hz", null, "7000 mAh", "https://techstoriesindia.com/?term_id=3809", "Launch price is the 4GB+64GB variant."),
  M("galaxy-a08", "Samsung Galaxy A08 LTE", "Samsung", "1 Oct 2026", 18499, 18499, null, null, null, null, "https://techstoriesindia.com/?term_id=3809", "Price is the Amazon listing at launch."),
  M("galaxy-s26-fe", "Samsung Galaxy S26 FE", "Samsung", "Announced 27 Aug 2026 (India sale 18 Sep)", null, null, "Exynos 2500", null, null, "4900 mAh, 45W", "https://techmitra.in/?p=24256", "India price was still to be announced in the source."),
  M("pixel-11", "Google Pixel 11 series", "Google", "12 Aug 2026", null, null, null, null, null, null, "https://techmitra.in/smartphones-launched-in-india-in-august-2026/"),
  M("iphone-18-pro", "Apple iPhone 18 Pro / Pro Max", "Apple", "9 Sep 2026", null, null, null, null, null, null, "https://techmitra.in/smartphones-launched-in-september-2026-in-india/")
];
/* Product photos are hosted by the manufacturer, retailer, or publication listed in credit.
   They are remote images, so the site needs an internet connection to display them. */
const PHOTOS = {
  "nothing-4a": ["https://cdn.beebom.com/mobile/nothing-phone-4a-white-front-and-back-3.png", "https://gadgets.beebom.com/mobile/nothing-phone-4a", "Beebom"],
  "nothing-4a-pro": ["https://assets.gadgets360cdn.com/pricee/assets/product/1772795813_-original-imahh7x7yudvrtds.jpeg", "https://www.gadgets360.com/nothing-phone-4a-pro-price-in-india-135856", "Gadgets 360"],
  "nord-6": ["https://media-ik.croma.com/Croma%20Assets/Communication/Mobiles/Images/322988_0_sDu3ReI4-.png?updatedAt=1777881467742", "https://www.croma.com/oneplus-nord-6-5g-8gb-ram-256gb-pitch-black-/p/322988", "Croma"],
  "poco-x8-pro-max": ["https://i05.appmifile.com/968_item_it/12/03/2026/ecbfe2e5b00446fd613071d6ecabe44f.png?q=85&thumb=1", "https://www.mi.com/it/product/poco-x8-pro-max/buy/", "Xiaomi"],
  "poco-x8-pro": ["https://i02.appmifile.com/334_item_au/25/03/2026/5509f5f1c1f16f16f943a892b2ae22e8.png?q=85&thumb=1", "https://www.mi.com/au/product/poco-x8-pro/buy/", "Xiaomi"],
  "edge-70-pro-plus": ["https://www.motorola.com/in/blogs/assets/images/Blog%205-motorola%20edge%2070%20pro%2B.webp", "https://www.motorola.com/in/blogs/press-news/moto-edge-70-pro-plus", "Motorola"],
  "edge-70-fusion": ["https://genk.mediacdn.vn/139269124445442048/2026/3/6/f12e5f433c1f4d69abb69f949c4f1ef7-17727804732609550-1772795614761-17727956148941579040580.png", "https://genk.vn/motorola-edge-70-fusion-ra-mat-man-hinh-144hz-sang-5200-nit-camera-sony-50-mp-pin-7000mah-gia-tu-khoang-77-trieu-dong-165260603143457997.chn", "GenK"],
  "vivo-t5-pro": ["https://www.91-img.com/pictures/173689-v6-vivo-t5-pro-mobile-phone-hres-1.jpg", "https://www.91mobiles.com/vivo-t5-pro-price-in-india", "91mobiles"],
  "galaxy-a37": ["https://app-area.riointernational.com.bd/productImages/1774696778YlXtg.png", "https://riointernational.com.bd/product/samsung-galaxy-a37-5g", "Rio International"],
  "iqoo-z11": ["https://images.hindustantimes.com/tech/htmobile4/iqoo_z11_5g/heroimage/z11-5g-z11-5g-iqoo-original-imahqhp44xg6sghz-BLUE-H.webp", "https://tech.hindustantimes.com/iqoo-z11-5g-price-in-india-P8265801", "HT Tech"],
  "poco-m8x": ["https://cdn.beebom.com/mobile/poco-m8x-5g-front-back.png", "https://gadgets.beebom.com/mobile/poco-m8x-5g", "Beebom"],
  "redmi-note-17": ["https://royalstar.co.in/cdn/shop/articles/Custom_dimensions_1400x500_px.jpg?v=1786474912", "https://royalstar.co.in/blogs/news/redmi-note-17-5g-launched-in-india", "Royal Star"],
  "realme-p4s": ["https://images.hindustantimes.com/tech/htmobile4/realme_p4s_5g/heroimage/-original-imahqh7n4vdzgmn3-WHITE-H.webp", "https://tech.hindustantimes.com/realme-p4s-5g-price-in-india-P7436279", "HT Tech"],
  "oneplus-n6x": ["https://cdn.beebom.com/mobile/oneplus-n6x-front-back.png", "https://gadgets.beebom.com/mobile/oneplus-n6x", "Beebom"],
  "galaxy-a08": ["https://cdn.beebom.com/mobile/samsung-galaxy-a08-front-back.png", "https://gadgets.beebom.com/mobile-list/samsung-galaxy-a-series-phones", "Beebom"],
  "galaxy-s26-fe": ["https://www.91-img.com/pictures/174138-v9-samsung-galaxy-s26-fe-mobile-phone-hres-1.jpg?tr=q-70%2Ctr%3At-5", "https://www.91mobiles.com/reviews/samsung-galaxy-s26-fe-review/", "91mobiles"],
  "pixel-11": ["https://cdn.beebom.com/mobile/google-pixel-11-front-back-3.png", "https://gadgets.beebom.com/mobile/google-pixel-11", "Beebom"],
  "iphone-18-pro": ["https://www.apple.com/v/iphone-18-pro/d/images/overview/upgrader/main_camera__dcm72wfqflm6_large.jpg", "https://www.apple.com/in/iphone-18-pro/", "Apple"]
};
const phonePhoto = (p, big = false) => {
  const photo = PHOTOS[p.id];
  return photo
    ? `<div class="ph${big ? " big" : ""}"><img src="${photo[0]}" alt="${esc(p.name)} product photo" loading="lazy" onerror="this.remove();this.parentElement.classList.add('no-photo');this.parentElement.textContent='Photo unavailable'"></div>`
    : `<div class="ph${big ? " big" : ""}" role="img" aria-label="${esc(p.name)} photo unavailable">${esc(p.brand[0])}</div>`;
};
const byId = id => P.find(p => p.id === id);
const priceOf = p => p.price ?? p.lp;
const bandOf = p => { const x = priceOf(p); const b = BANDS.find(b => x >= b[0] && x < b[1]); return x == null ? "Price needs verification" : b[2] };

/* ---- demo state in localStorage ---- */
const SEED_R = [
  { id: "r1", user: "Alex", email: "alex@example.com", pid: "A", pname: "Phone A", stars: 5, title: "Great phone!", text: "Performance is smooth and camera quality is excellent.", status: "Pending" },
  { id: "r2", user: "Sam", email: "sam@example.com", pid: "B", pname: "Phone B", stars: 3, title: "Average battery", text: "Good display, but battery could be better.", status: "Pending" }];
const SEED_PH = [{ id: "A", name: "Phone A", brand: "Brand X", price: 59999, rating: 4.4, status: "Active" }, { id: "B", name: "Phone B", brand: "Brand Y", price: 74999, rating: 4.7, status: "Active" }, { id: "C", name: "Phone C", brand: "Brand Z", price: 49999, rating: 4.5, status: "Draft" }];
const SEED_U = [{ name: "Alex", email: "alex@example.com", reviews: 14, joined: "12 Jan 2026", status: "Active" }, { name: "Sam", email: "sam@example.com", reviews: 7, joined: "03 Feb 2026", status: "Active" }, { name: "Jordan", email: "jordan@example.com", reviews: 22, joined: "18 Mar 2026", status: "Suspended" }];
const reviews = () => get("sp_reviews", SEED_R);
const rating = id => { const r = reviews().filter(x => x.pid === id && x.status === "Approved"); return r.length ? r.reduce((a, x) => a + x.stars, 0) / r.length : null };
const stars = r => r == null ? "Not yet rated" : "★ " + r.toFixed(1);
const cmp = () => get("sp_cmp", []);
const session = () => get("sp_session", null);
const DEMO = { user: { email: "user@demo.in", pw: "User@123" }, admin: { email: "admin@demo.in", pw: "Admin@123" } };

let redraw = () => { };
function toast(m) { const t = $("#toast"); t.textContent = m; t.style.display = "block"; clearTimeout(toast.t); toast.t = setTimeout(() => t.style.display = "none", 2500) }
function navCount() { const c = $("#cc"); if (c) c.textContent = cmp().length }

/* ---- page shells ---- */
function shell(inner, admin) {
  const S = session(), page = document.body.dataset.page;
  if (admin) {
    const L = [["admin-dashboard", "Dashboard"], ["admin-phones", "Manage phones"], ["admin-reviews", "Reviews"], ["admin-users", "Users"], ["admin-reports", "Reports"]];
    $("#app").innerHTML = `<div class="adm"><aside><h2>Admin</h2><span class="tag">Front-end demo</span>${L.map(l => `<a href="${l[0]}.html" class="${location.pathname.includes(l[0]) ? "on" : ""}">${l[1]}</a>`).join("")}<a href="index.html">View public site</a><button data-act="logout">Log out</button></aside><main>${inner}</main></div>`;
    return;
  }
  const acct = S?.role === "user" ? `<a href="user-dashboard.html">My area</a>` : S?.role === "admin" ? `<a href="admin-dashboard.html">Admin dashboard</a>` : `<a href="account.html">Account</a>`;
  $("#app").innerHTML = `${S?.role === "user" ? `<div class="ribbon">User area: signed in as ${esc(S.email)}. <a href="#" data-act="logout">Log out</a></div>` : ""}<header class="top"><a class="brand" href="index.html">Smart-Phone Review &amp; Comparison</a><nav><a href="phones.html">Phones</a><a href="compare.html">Compare (<span id="cc">0</span>)</a>${acct}<a href="admin-login.html">Admin</a></nav></header><main class="wrap">${inner}</main><footer>Independent demo site, not affiliated with any phone maker. Check specs and prices with the linked source before buying. Prices last checked ${CHECKED}.</footer>`;
  navCount();
}
const card = p => { const r = rating(p.id), inC = cmp().includes(p.id); return `<article class="card">${phonePhoto(p)}<div class="cb"><small>${esc(p.brand)} / ${esc(p.os)}</small><h3><a href="phone-detail.html?id=${p.id}">${esc(p.name)}</a></h3><span class="price">${rs(priceOf(p))}</span><small>${p.price != null ? "Current price" : p.lp != null ? "Launch price" : ""} · ${stars(r)}</small><div class="row"><a class="btn sm ghost" href="phone-detail.html?id=${p.id}">Details</a><button class="sm ${inC ? "" : "ghost"}" data-act="cmp" data-id="${p.id}">${inC ? "Remove from compare" : "Add to compare"}</button></div></div></article>` };

/* ---- validation helpers ---- */
const R = { req: v => v ? "" : "This field is required.", email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email like name@example.com.", pw: v => /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(v) ? "" : "Use at least 8 characters with a letter and a number." };
const fld = (n, l, t = "text") => `<label>${l}<input name="${n}" type="${t}" autocomplete="off"></label><span class="err" data-e="${n}"></span>`;
function check(f, rules) { let ok = true; for (const n in rules) { const m = rules[n](f[n].value.trim(), f); f.querySelector(`[data-e="${n}"]`).textContent = m; if (m) ok = false } return ok }
const need = (...fs) => v => fs.map(x => x(v)).find(Boolean) || "";

/* ---- public pages ---- */
const PAGES = {
  home() {
    shell(`<section class="hero"><h1>Smart-Phone Review &amp; Comparison</h1><p>Find the right smartphone using reviews, ratings and side-by-side comparisons.</p><a class="btn amb" href="phones.html">Explore Phones</a></section><h2>Popular phones</h2><div class="grid" id="pop"></div>`);
    redraw = () => $("#pop").innerHTML = ["nothing-4a", "nothing-4a-pro", "nord-6", "poco-x8-pro-max", "iqoo-z11", "galaxy-a37"].map(id => card(byId(id))).join(""); redraw();
  },
  phones() {
    const brands = [...new Set(P.map(p => p.brand))].sort();
    shell(`<h1>Browse smartphones</h1><p class="mut">${P.length} phones launched in India in 2026. Ratings appear only after reviews are approved.</p><div class="filters"><input id="q" placeholder="Search name or brand" aria-label="Search"><select id="sort" aria-label="Sort"><option value="">Sort: Newest listed</option><option value="lo">Price: low to high</option><option value="hi">Price: high to low</option><option value="az">Name A–Z</option></select><select id="b" aria-label="Brand"><option value="">All brands</option>${brands.map(b => `<option>${b}</option>`).join("")}</select><select id="band" aria-label="Price range"><option value="">All prices</option>${BANDS.map((b, i) => `<option value="${i}">${b[2]}</option>`).join("")}</select><select id="mr" aria-label="Rating"><option value="">Any rating</option><option value="4">4★ and up</option><option value="3">3★ and up</option></select><select id="os" aria-label="Operating system"><option value="">Any OS</option><option>Android</option><option>iOS</option></select></div><p class="mut" id="n"></p><div class="grid" id="list"></div>`);
    redraw = () => {
      const q = $("#q").value.toLowerCase(), b = $("#b").value, os = $("#os").value, bd = $("#band").value, mr = +$("#mr").value, s = $("#sort").value;
      let L = P.filter(p => { const pr = priceOf(p), r = rating(p.id); return (!q || (p.name + p.brand).toLowerCase().includes(q)) && (!b || p.brand === b) && (!os || p.os === os) && (bd === "" || (pr != null && pr >= BANDS[bd][0] && pr < BANDS[bd][1])) && (!mr || (r != null && r >= mr)) });
      if (s === "az") L.sort((a, c) => a.name.localeCompare(c.name));
      if (s === "lo" || s === "hi") L.sort((a, c) => ((priceOf(a) ?? (s === "lo" ? 1e12 : -1)) - (priceOf(c) ?? (s === "lo" ? 1e12 : -1))) * (s === "lo" ? 1 : -1));
      $("#n").textContent = L.length + " phone(s) shown"; $("#list").innerHTML = L.map(card).join("") || "<p>No phones match. Clear a filter and try again.</p>"; navCount();
    };
    document.querySelectorAll(".filters input,.filters select").forEach(e => e.addEventListener("input", redraw)); redraw();
  },
  detail() {
    const p = byId(new URLSearchParams(location.search).get("id"));
    if (!p) return shell(`<h1>Phone not found</h1><a class="btn" href="phones.html">Back to phones</a>`);
    const S = session(); document.title = p.name + " | Smart-Phone Review & Comparison";
    const photo = PHOTOS[p.id];
    shell(`<div class="cols"><div>${phonePhoto(p, true)}${photo ? `<small class="photo-credit">Photo: <a href="${photo[1]}" target="_blank" rel="noopener">${esc(photo[2])}</a></small>` : ""}</div><div><small>${esc(p.brand)}</small><h1>${esc(p.name)}</h1><p><b>${stars(rating(p.id))}</b> <span class="tag">${bandOf(p)}</span></p><div id="act"></div><p class="mut">${esc(p.note)}</p><p><a href="${p.src}" target="_blank" rel="noopener">Source</a> / Price last checked: ${CHECKED}</p></div></div>
    <div class="scroll"><table><tbody>${[["Launch date (India)", val(p.launch)], ["Launch price", rs(p.lp)], ["Current listed price", rs(p.price)], ["Display", val(p.disp)], ["Processor", val(p.cpu)], ["Camera", val(p.cam)], ["Battery", val(p.bat)], ["Operating system", p.os]].map(r => `<tr><th>${r[0]}</th><td>${r[1]}</td></tr>`).join("")}</tbody></table></div>
    <h2>Reviews</h2><div id="revs"></div><div class="box"><h3>Write a review</h3>${S?.role === "user" ? `<form id="rv" novalidate><label>Stars<select name="stars"><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select></label>${fld("title", "Title")}<label>Review<textarea name="text" rows="3"></textarea></label><span class="err" data-e="text"></span><button>Submit review</button> <span class="ok" id="rok"></span></form>` : `<p>Log in as a user to write a review. <a href="account.html">Log in or create an account</a></p>`}</div>`);
    redraw = () => { const inC = cmp().includes(p.id); $("#act").innerHTML = `<button data-act="cmp" data-id="${p.id}">${inC ? "Remove from compare" : "Add to compare"}</button>`; const rv = reviews().filter(x => x.pid === p.id && x.status === "Approved"); $("#revs").innerHTML = rv.map(x => `<div class="box"><b>${esc(x.title)}</b> ★${x.stars}<br>${esc(x.text)}<br><small>${esc(x.user)}</small></div>`).join("") || "<p class='mut'>No approved reviews yet.</p>"; navCount() }; redraw();
  },
  compare() {
    shell(`<h1>Compare smartphones</h1><div id="c"></div>`);
    redraw = () => {
      const L = cmp().map(byId).filter(Boolean), S = session();
      if (!L.length) $("#c").innerHTML = `<p>Nothing to compare yet. <a href="phones.html">Pick up to three phones</a>.</p>`;
      else $("#c").innerHTML = `<div class="scroll"><table><thead><tr><th></th>${L.map(p => `<th>${esc(p.name)}<br><button class="sm ghost" data-act="cmp" data-id="${p.id}">Remove</button></th>`).join("")}</tr></thead><tbody>${[["Price", p => rs(priceOf(p))], ["Display", p => val(p.disp)], ["Processor", p => val(p.cpu)], ["Camera", p => val(p.cam)], ["Battery", p => val(p.bat)], ["Operating system", p => p.os], ["Rating", p => stars(rating(p.id))]].map(r => `<tr><th>${r[0]}</th>${L.map(p => `<td>${r[1](p)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><p>${S?.role === "user" ? `<button data-act="save">Save this comparison</button>` : `<a href="account.html">Log in</a> to save comparisons.`}</p>`; navCount();
    }; redraw();
  },
  account() {
    shell(`<h1>Account</h1><div class="cols"><form id="login" class="box" novalidate><h2>Log in</h2><label>Role<select name="role"><option value="user">User</option><option value="admin">Admin (goes to admin login)</option></select></label>${fld("email", "Email", "email")}${fld("password", "Password", "password")}<span class="err" data-e="form"></span><button>Log in</button><p class="mut">Demo user: user@demo.in / User@123. Demo only, not real security.</p></form>
    <form id="reg" class="box" novalidate><h2>Create account</h2>${fld("name", "Name")}${fld("email", "Email", "email")}${fld("password", "Password", "password")}${fld("confirm", "Confirm password", "password")}<button>Create account</button> <span class="ok" id="regok"></span><p class="mut">Saved in this browser only (not a database). Do not use a real password.</p></form></div>`);
  },
  udash() {
    const S = session(); shell(`<h1>Your dashboard</h1><div class="cols"><div class="box"><h2>Saved comparisons</h2><div id="sv"></div></div><div class="box"><h2>Your reviews</h2><div id="mr"></div></div></div><a class="btn" href="phones.html">Browse phones</a>`);
    redraw = () => { const sv = get("sp_saved_" + S.email, []); $("#sv").innerHTML = sv.map((s, i) => `<p>${s.map(id => esc(byId(id)?.name)).join(" vs ")} <button class="sm ghost" data-act="delsaved" data-id="${i}">Delete</button></p>`).join("") || "<p class='mut'>None yet. Save one from the Compare page.</p>"; $("#mr").innerHTML = reviews().filter(r => r.email === S.email).map(r => `<p><b>${esc(r.pname)}</b> ★${r.stars} ${esc(r.title)} <span class="tag">${r.status}</span></p>`).join("") || "<p class='mut'>No reviews yet.</p>" }; redraw();
  },
  alogin() {
    if (session()?.role === "admin") return location.replace("admin-dashboard.html");
    shell(`<h1>Admin login</h1><form id="alog" class="box" novalidate>${fld("email", "Admin email", "email")}${fld("password", "Password", "password")}<span class="err" data-e="form"></span><button>Log in as admin</button><p><b>Front-end demonstration only; this is not real security.</b> Demo admin: admin@demo.in / Admin@123</p></form>`);
  },
  /* ---- admin pages ---- */
  adash() {
    shell(`<h1>Admin dashboard</h1><div class="stats">${[["128", "Phones"], ["2,846", "Reviews"], ["8,920", "Users"], ["34", "Reports"]].map(s => `<div class="stat"><b>${s[0]}</b>${s[1]}</div>`).join("")}</div><div class="box"><h2>Activity overview</h2>${chart([["Jan", 40], ["Feb", 55], ["Mar", 48], ["Apr", 70], ["May", 66], ["Jun", 90]])}<small>Illustrative data, not real analytics.</small></div>`, 1);
  },
  aphones() {
    shell(`<h1>Manage phones</h1><p class="mut">Rows A/B/C are original wireframe samples, not real 2026 phone listings. Changes live in this browser only.</p><form id="pf" class="box" novalidate><input type="hidden" name="id"><div class="cols"><div>${fld("name", "Name")}</div><div>${fld("brand", "Brand")}</div><div>${fld("price", "Price (₹)", "number")}</div><div>${fld("rating", "Rating (0-5)", "number")}</div></div><button>Save phone</button> <button type="reset" class="ghost" data-act="resetf">Clear</button></form><div class="scroll"><table><thead><tr><th>Phone</th><th>Brand</th><th>Price</th><th>Rating</th><th>Status</th><th>Actions</th></tr></thead><tbody id="tb"></tbody></table></div>`, 1);
    redraw = () => $("#tb").innerHTML = get("sp_aphones", SEED_PH).map(p => `<tr><td>${esc(p.name)}</td><td>${esc(p.brand)}</td><td>${rs(p.price)}</td><td>${p.rating}</td><td>${p.status}</td><td><button class="sm ghost" data-act="editph" data-id="${p.id}">Edit</button> <button class="sm ghost" data-act="pubph" data-id="${p.id}">${p.status === "Active" ? "Unpublish" : "Publish"}</button> <button class="sm" data-act="delph" data-id="${p.id}">Delete</button></td></tr>`).join(""); redraw();
  },
  areviews() {
    shell(`<h1>Review moderation</h1><p class="mut">Approved reviews of catalogue phones feed their public rating.</p><div class="scroll"><table><thead><tr><th>User</th><th>Phone</th><th>Stars</th><th>Review</th><th>Status</th><th>Actions</th></tr></thead><tbody id="tb"></tbody></table></div>`, 1);
    redraw = () => $("#tb").innerHTML = reviews().map(r => `<tr><td>${esc(r.user)}</td><td>${esc(r.pname)}</td><td>${r.stars}★</td><td><b>${esc(r.title)}</b><br>${esc(r.text)}</td><td>${r.status}</td><td><button class="sm" data-act="approve" data-id="${r.id}">Approve</button> <button class="sm ghost" data-act="reject" data-id="${r.id}">Reject</button></td></tr>`).join(""); redraw();
  },
  ausers() {
    shell(`<h1>Manage users</h1><div class="scroll"><table><thead><tr><th>Name</th><th>Email</th><th>Reviews</th><th>Joined</th><th>Status</th><th>Action</th></tr></thead><tbody id="tb"></tbody></table></div>`, 1);
    redraw = () => $("#tb").innerHTML = get("sp_users", SEED_U).map((u, i) => `<tr><td>${u.name}</td><td>${u.email}</td><td>${u.reviews}</td><td>${u.joined}</td><td>${u.status}</td><td><button class="sm ghost" data-act="susp" data-id="${i}">${u.status === "Active" ? "Suspend" : "Restore"}</button></td></tr>`).join(""); redraw();
  },
  areports() {
    shell(`<h1>Reports &amp; analytics</h1><div class="stats">${[["Brand X", "Top brand"], ["Phone A", "Top phone"], ["4.5", "Average rating"], ["1,248", "New users"]].map(s => `<div class="stat"><b>${s[0]}</b>${s[1]}</div>`).join("")}</div><div class="box"><h2>Reviews per week</h2>${chart([["W1", 30], ["W2", 44], ["W3", 38], ["W4", 61], ["W5", 52]])}<small>Illustrative data. Metrics above are wireframe samples.</small></div>`, 1);
  }
};
const chart = d => { const m = Math.max(...d.map(x => x[1])); return `<svg viewBox="0 0 ${d.length * 60} 150" class="chart" role="img" aria-label="Illustrative bar chart">${d.map((x, i) => { const h = x[1] / m * 100; return `<rect x="${i * 60 + 12}" y="${120 - h}" width="36" height="${h}" fill="#c98a1b"/><text x="${i * 60 + 30}" y="140" text-anchor="middle" font-size="11">${x[0]}</text>` }).join("")}</svg>` };

/* ---- click actions ---- */
const A = {
  cmp(id) { let c = cmp(); if (c.includes(id)) c = c.filter(x => x !== id); else if (c.length >= 3) return toast("You can compare up to 3 phones. Remove one first."); else c.push(id); set("sp_cmp", c); redraw() },
  logout() { set("sp_session", null); location.href = "index.html" },
  save() { const k = "sp_saved_" + session().email; set(k, [...get(k, []), cmp()]); toast("Comparison saved to your dashboard") },
  delsaved(i) { const k = "sp_saved_" + session().email, s = get(k, []); s.splice(i, 1); set(k, s); redraw() },
  approve(id) { set("sp_reviews", reviews().map(r => r.id === id ? { ...r, status: "Approved" } : r)); redraw() },
  reject(id) { set("sp_reviews", reviews().map(r => r.id === id ? { ...r, status: "Rejected" } : r)); redraw() },
  susp(i) { const u = get("sp_users", SEED_U); u[i].status = u[i].status === "Active" ? "Suspended" : "Active"; set("sp_users", u); redraw() },
  pubph(id) { set("sp_aphones", get("sp_aphones", SEED_PH).map(p => p.id === id ? { ...p, status: p.status === "Active" ? "Draft" : "Active" } : p)); redraw() },
  delph(id) { if (confirm("Delete this demo phone?")) { set("sp_aphones", get("sp_aphones", SEED_PH).filter(p => p.id !== id)); redraw() } },
  editph(id) { const p = get("sp_aphones", SEED_PH).find(x => x.id === id), f = $("#pf"); for (const k of ["id", "name", "brand", "price", "rating"]) f[k].value = p[k]; f.name.focus() },
  resetf() { $("#pf").id.value = "" }
};
document.addEventListener("click", e => { const b = e.target.closest("[data-act]"); if (b) { if (b.tagName === "A") e.preventDefault(); A[b.dataset.act]?.(b.dataset.id) } });

/* ---- form submits ---- */
const SUB = {
  login(f) {
    if (f.role.value === "admin") return location.href = "admin-login.html";
    if (!check(f, { email: need(R.req, R.email), password: need(R.req) })) return;
    const e = f.email.value.trim().toLowerCase(), pw = f.password.value;
    const acc = get("sp_accounts", []).find(a => a.email === e && a.pw === pw), demo = e === DEMO.user.email && pw === DEMO.user.pw;
    if (!acc && !demo) return f.querySelector('[data-e="form"]').textContent = "Email or password is incorrect.";
    set("sp_session", { role: "user", email: e, name: acc?.name || "Demo user" }); location.href = "user-dashboard.html";
  },
  reg(f) {
    if (!check(f, { name: R.req, email: need(R.req, R.email), password: need(R.req, R.pw), confirm: (v, f) => v !== f.password.value.trim() ? "Passwords do not match." : "" })) return $("#regok").textContent = "";
    const a = get("sp_accounts", []), e = f.email.value.trim().toLowerCase();
    if (a.some(x => x.email === e)) return f.querySelector('[data-e="email"]').textContent = "This email is already registered.";
    a.push({ name: f.name.value.trim(), email: e, pw: f.password.value }); set("sp_accounts", a); f.reset(); $("#regok").textContent = "Account created. You can now log in.";
  },
  alog(f) {
    if (!check(f, { email: need(R.req, R.email), password: R.req })) return;
    if (f.email.value.trim().toLowerCase() !== DEMO.admin.email || f.password.value !== DEMO.admin.pw) return f.querySelector('[data-e="form"]').textContent = "Admin email or password is incorrect.";
    set("sp_session", { role: "admin", email: DEMO.admin.email }); location.href = "admin-dashboard.html";
  },
  rv(f) {
    if (!check(f, { title: R.req, text: R.req })) return;
    const S = session(), pid = new URLSearchParams(location.search).get("id");
    set("sp_reviews", [...reviews(), { id: "r" + Date.now(), user: S.name || S.email, email: S.email, pid, pname: byId(pid).name, stars: +f.stars.value, title: f.title.value.trim(), text: f.text.value.trim(), status: "Pending" }]);
    f.reset(); $("#rok").textContent = "Thanks! Your review is waiting for admin approval.";
  },
  pf(f) {
    if (!check(f, { name: R.req, brand: R.req, price: v => v > 0 ? "" : "Enter a price above 0.", rating: v => v >= 0 && v <= 5 && v !== "" ? "" : "Enter a rating from 0 to 5." })) return;
    const L = get("sp_aphones", SEED_PH), o = { id: f.id.value || "P" + Date.now(), name: f.name.value.trim(), brand: f.brand.value.trim(), price: +f.price.value, rating: +f.rating.value, status: "Draft" }, i = L.findIndex(x => x.id === o.id);
    if (i > -1) { o.status = L[i].status; L[i] = o } else L.push(o);
    set("sp_aphones", L); f.reset(); f.id.value = ""; redraw(); toast("Phone saved");
  }
};
document.addEventListener("submit", e => { e.preventDefault(); SUB[e.target.id]?.(e.target) });

/* ---- start: role guard, then build the page ---- */
const S0 = session(), needRole = document.body.dataset.need;
if (needRole && S0?.role !== needRole) location.replace(needRole === "admin" ? "admin-login.html" : "account.html");
else PAGES[document.body.dataset.page]();
