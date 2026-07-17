const SHEET_URL = "https://docs.google.com/spreadsheets/d/13IQo9cfL1mwZ8aLp3Xwy9Hm3DZaZ1psJvu-chlwDQK8/gviz/tq?tqx=out:csv&sheet=horse_list_updated";

const GROWTH_MULTIPLIER = {
  prodigy: 1.0215,
  early: 1.0056,
  normal: 1.0014,
  late: 0.9711
};

const GROWTH_LABEL_JP = {
  prodigy: "天才",
  early: "早熟",
  normal: "普通",
  late: "晩成"
};

const RUNNING_STYLE_LABELS = ["逃げ", "先行", "差し", "追込"];

const COLOR_LABEL_JP = {
  "0": "鹿毛",
  "1": "黒鹿毛",
  "2": "青鹿毛",
  "3": "青毛",
  "4": "栗毛",
  "5": "栃栗毛",
  "6": "尾花栗毛",
  "7": "芦毛",
  "8": "白毛"
};

const STAT_AXES = [
  { key: "acceleration", label: "加速力" },
  { key: "start_score", label: "スタート" },
  { key: "cornering_score", label: "コーナリング" },
  { key: "hill_score", label: "坂" },
  { key: "heavy_track_score", label: "重馬場" },
  { key: "fighting_spirit", label: "闘争心" },
  { key: "consistency", label: "安定感" },
  { key: "health", label: "健康" }
];

let horses = [];
let historyData = {};
let datasetMaxRating = 80;
let currentResults = [];
let currentCriteria = null;

// ---- CSV parsing (handles quoted fields) ----
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else {
      if (c === '"') {
        inQuotes = true;
      } else if (c === ',') {
        row.push(field);
        field = "";
      } else if (c === '\n') {
        row.push(field);
        rows.push(row);
        row = [];
        field = "";
      } else if (c === '\r') {
        // skip
      } else {
        field += c;
      }
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function rowsToObjects(rows) {
  const header = rows[0];
  const objs = [];
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    if (r.length === 1 && r[0] === "") continue;
    const obj = {};
    for (let j = 0; j < header.length; j++) {
      obj[header[j]] = r[j] !== undefined ? r[j] : "";
    }
    objs.push(obj);
  }
  return objs;
}

// ---- Price estimation ----
function estimatePrice(turfRating, dirtRating, growthCurve) {
  const r = Math.max(turfRating, dirtRating);
  const base = 1.766 * Math.pow(1.0817, r);
  const mult = GROWTH_MULTIPLIER[growthCurve] || 1.0;
  return base * mult;
}

function roundToTen(n) {
  return Math.round(n / 10) * 10;
}

function priceRangeText(estimated) {
  const low = roundToTen(estimated * 0.98);
  const high = roundToTen(estimated * 1.08);
  return `${low}〜${high}`;
}

// ---- Peak season formatting ----
function formatPeakSeason(peakAge) {
  const years = Math.floor(peakAge);
  const monthFrac = peakAge - years;
  const monthIndex = Math.round(monthFrac * 12) % 12; // 0=1月, 11=12月
  let season;
  if (monthIndex >= 2 && monthIndex <= 4) season = "春";
  else if (monthIndex >= 5 && monthIndex <= 7) season = "夏";
  else if (monthIndex >= 8 && monthIndex <= 10) season = "秋";
  else season = "冬";
  return `${years}歳${season}頃`;
}

// ---- Data loading ----
async function loadHorses() {
  const res = await fetch(SHEET_URL);
  if (!res.ok) {
    throw new Error("シート取得失敗: HTTP " + res.status);
  }
  const text = await res.text();
  const rows = parseCSV(text);
  const objs = rowsToObjects(rows);

  horses = objs.map(o => {
    const turf = parseFloat(o.turf_rating);
    const dirt = parseFloat(o.dirt_rating);
    const growth = (o.growth_curve || "").trim();
    const horseColor = (o.horse_color || "").trim();
    const estimated = estimatePrice(turf, dirt, growth);
    const styleParts = (o.running_style || "0/0/0/0").split("/").map(v => parseFloat(v));
    return {
      name_jp: o.name_jp,
      name_en: o.name_en,
      gender: o.gender,
      turf_rating: turf,
      dirt_rating: dirt,
      min_distance: parseFloat(o.min_distance),
      max_distance: parseFloat(o.max_distance),
      optimal_distance: parseFloat(o.optimal_distance),
      acceleration: parseFloat(o.acceleration),
      start_score: parseFloat(o.start_score),
      cornering_score: parseFloat(o.cornering_score),
      hill_score: parseFloat(o.hill_score),
      heavy_track_score: parseFloat(o.heavy_track_score),
      fighting_spirit: parseFloat(o.fighting_spirit),
      consistency: parseFloat(o.consistency),
      health: parseFloat(o.health),
      running_style: styleParts,
      growth_curve: growth,
      horse_color: horseColor,
      estimated_price: estimated,
      peak_age: parseFloat(o.peak_age),
      birth_year: parseFloat(o.birth_year)
    };
  }).filter(h => h.name_jp && !isNaN(h.turf_rating) && !isNaN(h.dirt_rating));

  // ---- データロード時に一度だけ算出するキャッシュ値 ----
  datasetMaxRating = 80;
  horses.forEach(h => {
    if (h.turf_rating > datasetMaxRating) datasetMaxRating = h.turf_rating;
    if (h.dirt_rating > datasetMaxRating) datasetMaxRating = h.dirt_rating;
  });

}

async function loadHistory() {
  try {
    const res = await fetch("data/horse_history.json");
    if (res.ok) {
      historyData = await res.json();
    }
  } catch (e) {
    historyData = {};
  }
}

async function loadChangelog() {
  try {
    const res = await fetch("data/changelog.json");
    if (!res.ok) return;
    const entries = await res.json();
    const list = document.getElementById("changelog-list");
    list.innerHTML = entries
      .map(e => `<li><span class="mono" style="color:var(--muted);">${e.date}</span> ${e.text}</li>`)
      .join("");
  } catch (e) {
    // 更新履歴が読めなくても致命的ではないため無視
  }
}

// ---- Stat grid UI ----
function buildStatGrid() {
  const grid = document.getElementById("stat-grid");
  grid.innerHTML = "";
  STAT_AXES.forEach(axis => {
    const row = document.createElement("div");
    row.className = "stat-row";
    const label = document.createElement("label");
    label.textContent = axis.label;
    label.setAttribute("for", `stat-${axis.key}`);
    const select = document.createElement("select");
    select.id = `stat-${axis.key}`;
    select.innerHTML = `
      <option value="">指定しない</option>
      <option value="1">1以上</option>
      <option value="2">2以上</option>
      <option value="3">3以上</option>
      <option value="4">4以上</option>
      <option value="5">5以上（0.8以上）</option>
    `;
    row.appendChild(label);
    row.appendChild(select);
    grid.appendChild(row);
  });
}

// 5段階の下限値（生値）を返す
function tierLowerBound(tier) {
  // tier 1 => 0, 2 => 0.2, 3 => 0.4, 4 => 0.6, 5 => 0.8
  // 浮動小数点誤差対策のため小数第4位で丸める
  return Math.round((tier - 1) * 0.2 * 10000) / 10000;
}

// ---- おすすめ度スコア ----
function computeMatchStrength(h, criteria) {
  const strengths = [];

  if (criteria.styleVal !== "") {
    const idx = parseInt(criteria.styleVal, 10);
    strengths.push(h.running_style[idx]);
  }

  if (criteria.distance !== null) {
    const range = h.max_distance - h.min_distance;
    let s;
    if (range === 0) {
      s = 1;
    } else {
      s = 1 - Math.abs(criteria.distance - h.optimal_distance) / range;
      s = Math.max(0, Math.min(1, s));
    }
    strengths.push(s);
  }

  if (criteria.surface === "turf" || criteria.surface === "dirt") {
    const rating = criteria.surface === "turf" ? h.turf_rating : h.dirt_rating;
    const denom = datasetMaxRating - 80;
    let s;
    if (denom === 0) {
      s = 1;
    } else {
      s = (rating - 80) / denom;
      s = Math.max(0, Math.min(1, s));
    }
    strengths.push(s);
  }

  criteria.statFilters.forEach(f => {
    strengths.push(h[f.key]);
  });

  if (strengths.length === 0) return 1;
  const sum = strengths.reduce((a, b) => a + b, 0);
  return sum / strengths.length;
}

function computeScore(h, criteria) {
  const f = computeMatchStrength(h, criteria);
  const stars = Math.max(1, Math.min(10, Math.round(f * 10)));
  return { score: f, stars };
}

// ---- Filtering ----
function runSearch() {
  const budgetInput = document.getElementById("budget").value;
  const budget = budgetInput === "" ? null : parseFloat(budgetInput);

  if (budget === null || isNaN(budget)) {
    alert("予算上限を入力してください");
    return;
  }

  const styleVal = document.getElementById("running-style-chips").dataset.value;
  const distanceInput = document.getElementById("distance").value;
  const distance = distanceInput === "" ? null : parseFloat(distanceInput);
  const surface = document.getElementById("surface").value;
  const colorVal = document.getElementById("horse-color").value;

  const growthChecked = Array.from(document.querySelectorAll('#growth-chips .chip.active')).map(el => el.dataset.value);

  const statFilters = STAT_AXES.map(axis => {
    const v = document.getElementById(`stat-${axis.key}`).value;
    return { key: axis.key, tier: v === "" ? null : parseInt(v, 10) };
  }).filter(f => f.tier !== null);

  const results = horses.filter(h => {
    if (h.estimated_price > budget) return false;

    if (styleVal !== "") {
      const idx = parseInt(styleVal, 10);
      if (dominantStyleLabel(h.running_style) !== RUNNING_STYLE_LABELS[idx]) return false;
    }

    if (distance !== null) {
      if (!(h.min_distance <= distance && distance <= h.max_distance)) return false;
    }

    if (surface === "turf") {
      if (!(h.turf_rating > 80)) return false;
    } else if (surface === "dirt") {
      if (!(h.dirt_rating > 80)) return false;
    }

    if (growthChecked.length > 0) {
      if (!growthChecked.includes(h.growth_curve)) return false;
    }

    if (colorVal !== "") {
      if (h.horse_color !== colorVal) return false;
    }

    for (const f of statFilters) {
      const val = h[f.key];
      const lowerBound = tierLowerBound(f.tier);
      if (!(val >= lowerBound)) return false;
    }

    return true;
  });

  const criteria = { styleVal, distance, surface, statFilters };
  currentResults = results;
  currentCriteria = criteria;
  renderResults(currentResults, currentCriteria);
}

// ---- Sorting ----
function sortResults(results, criteria, sortKey) {
  const sorted = results.slice();
  switch (sortKey) {
    case "rating_desc":
      sorted.sort((a, b) => Math.max(b.turf_rating, b.dirt_rating) - Math.max(a.turf_rating, a.dirt_rating));
      break;
    case "rating_asc":
      sorted.sort((a, b) => Math.max(a.turf_rating, a.dirt_rating) - Math.max(b.turf_rating, b.dirt_rating));
      break;
    case "name_asc":
      sorted.sort((a, b) => a.name_jp.localeCompare(b.name_jp, "ja"));
      break;
    case "name_desc":
      sorted.sort((a, b) => b.name_jp.localeCompare(a.name_jp, "ja"));
      break;
    case "birth_desc":
      sorted.sort((a, b) => b.birth_year - a.birth_year);
      break;
    case "birth_asc":
      sorted.sort((a, b) => a.birth_year - b.birth_year);
      break;
    case "score_desc":
    default: {
      const scored = sorted.map(h => ({ h, score: computeScore(h, criteria).score }));
      scored.sort((a, b) => b.score - a.score);
      return scored.map(s => s.h);
    }
  }
  return sorted;
}

function dominantStyleLabel(styleArr) {
  let maxIdx = 0;
  let maxVal = -Infinity;
  styleArr.forEach((v, i) => {
    if (v > maxVal) {
      maxVal = v;
      maxIdx = i;
    }
  });
  return RUNNING_STYLE_LABELS[maxIdx] || "-";
}

// 2番目に高い脚質適性(非ゼロの場合のみ)を返す。単一適性の馬はnull
function subStyleLabel(styleArr) {
  const indexed = styleArr.map((v, i) => [v, i]);
  indexed.sort((a, b) => b[0] - a[0]);
  if (indexed.length > 1 && indexed[1][0] > 0) {
    return RUNNING_STYLE_LABELS[indexed[1][1]];
  }
  return null;
}

function starsText(stars) {
  return "🥕".repeat(stars) + ` (${stars}/10)`;
}

function renderResults(results, criteria) {
  const container = document.getElementById("results");
  const countEl = document.getElementById("result-count");
  countEl.textContent = `${results.length}件`;
  container.innerHTML = "";

  if (results.length === 0) {
    container.innerHTML = '<div class="no-results">条件に合致する馬が見つかりませんでした。</div>';
    return;
  }

  const sortKey = document.getElementById("sort-select").value;
  const sorted = sortResults(results, criteria, sortKey);

  sorted.forEach((h, idx) => {
    const { stars } = computeScore(h, criteria);
    const stubClass = "stub-" + ((idx % 4) + 1);
    const peakText = isNaN(h.peak_age) ? "-" : formatPeakSeason(h.peak_age);
    const sub = subStyleLabel(h.running_style);
    const card = document.createElement("div");
    card.className = "horse-card";
    card.innerHTML = `
      <div class="stub ${stubClass}">
        <span class="no-label">NO.</span>
        <span class="num">${idx + 1}</span>
      </div>
      <div class="card-body">
        <h3>${h.name_jp}</h3>
        <div class="card-tags">
          <span class="tag">${dominantStyleLabel(h.running_style)}</span>
          ${sub ? `<span class="tag sub-tag">サブ:${sub}</span>` : ""}
          <span class="tag">${COLOR_LABEL_JP[h.horse_color] || h.horse_color}</span>
          <span class="tag">${GROWTH_LABEL_JP[h.growth_curve] || h.growth_curve}</span>
        </div>
        <div class="data-grid mono">
          <span class="k">推定価格</span><span class="v">${priceRangeText(h.estimated_price)} pt</span>
          <span class="k">芝 / ダート</span><span class="v">${h.turf_rating} / ${h.dirt_rating}</span>
          <span class="k">距離適性</span><span class="v">${h.min_distance}〜${h.max_distance}m</span>
          <span class="k">本格化</span><span class="v">${peakText}</span>
          <span class="k">生まれ年</span><span class="v">${isNaN(h.birth_year) ? "-" : h.birth_year + "年"}</span>
        </div>
        <div class="carrot-row">${starsText(stars)}</div>
      </div>
    `;
    card.addEventListener("click", () => showDetail(h));
    container.appendChild(card);
  });
}

function showDetail(horse) {
  const modal = document.getElementById("detail-modal");
  const body = document.getElementById("modal-body");
  const hist = historyData[horse.name_jp];

  let historyHtml;
  if (hist) {
    const sourcesHtml = (hist.sources || [])
      .map(url => `<a href="${url}" target="_blank" rel="noopener">${url}</a>`)
      .join("<br>");
    historyHtml = `
      <h4>現役時代の主な戦績</h4>
      <p>${hist.achievements || ""}</p>
      <h4>ミニコラム</h4>
      <p>${hist.column || ""}</p>
      <p class="source-link">出典:<br>${sourcesHtml}</p>
    `;
  } else {
    historyHtml = `<p>史実紹介は準備中です。</p>`;
  }

  const peakText = isNaN(horse.peak_age) ? "-" : formatPeakSeason(horse.peak_age);
  const sub = subStyleLabel(horse.running_style);

  body.innerHTML = `
    <h3>${horse.name_jp}（${horse.name_en}）</h3>
    <p class="price-line mono">推定価格帯: ${priceRangeText(horse.estimated_price)} pt</p>
    <p>脚質: ${dominantStyleLabel(horse.running_style)}${sub ? `（サブ: ${sub}）` : ""} / 成長タイプ: ${GROWTH_LABEL_JP[horse.growth_curve] || horse.growth_curve}</p>
    <p>毛色: ${COLOR_LABEL_JP[horse.horse_color] || horse.horse_color}</p>
    <p>芝適性: ${horse.turf_rating} / ダート適性: ${horse.dirt_rating}</p>
    <p>距離適性: ${horse.min_distance}〜${horse.max_distance}m（最適 ${horse.optimal_distance}m）</p>
    <p>本格化: ${peakText} ／ 生まれ年: ${isNaN(horse.birth_year) ? "-" : horse.birth_year + "年"}</p>
    ${historyHtml}
  `;
  modal.classList.remove("hidden");
}

function hideModal() {
  document.getElementById("detail-modal").classList.add("hidden");
}

// ---- Chip interactions ----
function setupStyleChips() {
  const container = document.getElementById("running-style-chips");
  container.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const val = chip.dataset.value;
      const current = container.dataset.value;
      const next = (current === val && val !== "") ? "" : val;
      container.dataset.value = next;
      container.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
      const activeChip = container.querySelector(`.chip[data-value="${next}"]`);
      if (activeChip) activeChip.classList.add("active");
    });
  });
}

function setupGrowthChips() {
  const container = document.getElementById("growth-chips");
  container.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      chip.classList.toggle("active");
    });
  });
}

// ---- Theme toggle ----
function setupThemeToggle() {
  const root = document.documentElement;
  const btn = document.getElementById("theme-toggle");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  function effectiveTheme() {
    const forced = root.getAttribute("data-theme");
    if (forced) return forced;
    return systemDark ? "dark" : "light";
  }

  function updateIcon() {
    btn.textContent = effectiveTheme() === "dark" ? "🌙" : "☀️";
  }

  btn.addEventListener("click", () => {
    const next = effectiveTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    updateIcon();
  });

  updateIcon();
}

// ---- Init ----
async function init() {
  const versionMeta = document.querySelector('meta[name="app-version"]');
  if (versionMeta) {
    document.getElementById("app-version-badge").textContent = "v" + versionMeta.content;
  }
  buildStatGrid();
  setupStyleChips();
  setupGrowthChips();
  setupThemeToggle();
  document.getElementById("search-btn").addEventListener("click", runSearch);
  document.getElementById("sort-select").addEventListener("change", () => {
    if (currentCriteria !== null) {
      renderResults(currentResults, currentCriteria);
    }
  });
  document.getElementById("modal-close").addEventListener("click", hideModal);
  document.getElementById("detail-modal").addEventListener("click", (e) => {
    if (e.target.id === "detail-modal") hideModal();
  });

  const resultsPanel = document.getElementById("results");
  resultsPanel.innerHTML = '<div class="no-results">馬データを読み込み中...</div>';

  try {
    await Promise.all([loadHorses(), loadHistory(), loadChangelog()]);
    resultsPanel.innerHTML = '<div class="no-results">検索条件を入力して「検索する」を押してください。</div>';
  } catch (e) {
    resultsPanel.innerHTML = `<div class="no-results">馬データの読み込みに失敗しました: ${e.message}</div>`;
  }
}

document.addEventListener("DOMContentLoaded", init);
