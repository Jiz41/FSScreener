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
const RUNNING_STYLE_LABELS_EN = ["Front-runner", "Stalker", "Closer", "Deep Closer"];

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

const COLOR_LABEL_EN = {
  "0": "Bay",
  "1": "Dark Bay",
  "2": "Brown",
  "3": "Black",
  "4": "Chestnut",
  "5": "Liver Chestnut",
  "6": "Flaxen Chestnut",
  "7": "Gray",
  "8": "White"
};

const GROWTH_LABEL_EN = {
  prodigy: "Prodigy",
  early: "Early Bloomer",
  normal: "Normal",
  late: "Late Bloomer"
};

const STAT_AXES = [
  { key: "acceleration", label: "加速力", label_en: "Acceleration" },
  { key: "start_score", label: "スタート", label_en: "Start" },
  { key: "cornering_score", label: "コーナリング", label_en: "Cornering" },
  { key: "hill_score", label: "坂", label_en: "Hill" },
  { key: "heavy_track_score", label: "重馬場", label_en: "Heavy Track" },
  { key: "fighting_spirit", label: "闘争心", label_en: "Fighting Spirit" },
  { key: "consistency", label: "安定感", label_en: "Consistency" },
  { key: "health", label: "健康", label_en: "Health" }
];

// ---- i18n ----
const I18N = {
  ja: {
    subtitle: "Full Stride 馬情報検索ツール",
    howto_summary: "使い方",
    howto_1: "予算上限を入力します（必須）",
    howto_2: "脚質・距離・芝ダート・毛色・成長タイプ・8軸ステータスは、気になる項目だけ任意で絞り込めます",
    howto_3: "「検索する」を押すと、条件に合う候補馬が一覧で出てきます",
    howto_4: "気になる馬をタップすると、現実の競走馬としての戦績やエピソードが見られます",
    eng_note: "",
    search_conditions: "検索条件",
    budget_label: "予算上限（pt）",
    required: "必須",
    distance_label: "希望距離（m）",
    style_label: "脚質",
    no_pref: "指定しない",
    style_0: "逃げ",
    style_1: "先行",
    style_2: "差し",
    style_3: "追込",
    surface_label: "芝・ダート",
    surface_any: "どちらでも",
    surface_turf: "芝",
    surface_dirt: "ダート",
    color_label: "毛色",
    color_0: "鹿毛",
    color_1: "黒鹿毛",
    color_2: "青鹿毛",
    color_3: "青毛",
    color_4: "栗毛",
    color_5: "栃栗毛",
    color_6: "尾花栗毛",
    color_7: "芦毛",
    color_8: "白毛",
    growth_label: "成長タイプ（複数選択可）",
    growth_prodigy: "天才",
    growth_early: "早熟",
    growth_normal: "普通",
    growth_late: "晩成",
    stat_section_title: "8軸ステータス（任意・N以上で抽出）",
    search_btn: "検索する",
    results_title: "検索結果",
    hint: "おすすめ度は、選択した検索条件にどれだけ強く合致しているかを示す指標です。",
    sort_label: "並び替え",
    sort_score_desc: "おすすめ度順（高い→低い）",
    sort_rating_desc: "レーティング高い順",
    sort_rating_asc: "レーティング低い順",
    sort_name_asc: "あいうえお順",
    sort_name_desc: "あいうえお逆順",
    sort_birth_desc: "生まれ年が新しい順",
    sort_birth_asc: "生まれ年が古い順",
    result_unit: "件",
    estimated_price: "推定価格",
    distance_aptitude: "距離適性",
    peak_season: "本格化",
    birth_year: "生まれ年",
    detail_preview: "詳細プレビュー",
    achievements_title: "現役時代の主な戦績",
    column_title: "ミニコラム",
    history_pending: "史実紹介は準備中です。",
    sources_label: "出典:",
    price_range_label: "推定価格帯:",
    style_colon: "脚質:",
    sub_prefix: "サブ:",
    growth_colon: "成長タイプ:",
    color_colon: "毛色:",
    turf_dirt_aptitude: "芝適性 / ダート適性",
    optimal: "最適",
    footer_unofficial: "本ツールはファンによる非公式検索ツールです。",
    footer_trademark_pre: "『FULL STRIDE』の名称は、",
    footer_trademark_post: "の商標または登録商標です。",
    changelog_summary: "更新履歴",
    no_results: "条件に合致する馬が見つかりませんでした。",
    loading: "馬データを読み込み中...",
    prompt_search: "検索条件を入力して「検索する」を押してください。",
    load_failed: "馬データの読み込みに失敗しました: "
  },
  en: {
    subtitle: "Full Stride Horse Search Tool",
    howto_summary: "How to Use",
    howto_1: "Enter your budget limit (required)",
    howto_2: "Running style, distance, turf/dirt, coat color, growth type, and the 8-axis stats are all optional — narrow down by whichever ones you care about",
    howto_3: "Press \"Search\" to get a list of matching horses",
    howto_4: "Tap a horse you like to see its real-world racing history and story",
    eng_note: "Heads up — translating every single horse profile into English would take forever, so we didn't. Please just hit Google Translate or DeepL on this page. Sorry about that! Peace! ✌️",
    search_conditions: "Search Conditions",
    budget_label: "Budget Limit (pt)",
    required: "Required",
    distance_label: "Preferred Distance (m)",
    style_label: "Running Style",
    no_pref: "No Preference",
    style_0: "Front-runner",
    style_1: "Stalker",
    style_2: "Closer",
    style_3: "Deep Closer",
    surface_label: "Turf / Dirt",
    surface_any: "Either",
    surface_turf: "Turf",
    surface_dirt: "Dirt",
    color_label: "Coat Color",
    color_0: "Bay",
    color_1: "Dark Bay",
    color_2: "Brown",
    color_3: "Black",
    color_4: "Chestnut",
    color_5: "Liver Chestnut",
    color_6: "Flaxen Chestnut",
    color_7: "Gray",
    color_8: "White",
    growth_label: "Growth Type (multiple OK)",
    growth_prodigy: "Prodigy",
    growth_early: "Early Bloomer",
    growth_normal: "Normal",
    growth_late: "Late Bloomer",
    stat_section_title: "8-Axis Stats (optional, filter by \"N or above\")",
    search_btn: "Search",
    results_title: "Search Results",
    hint: "\"Recommend Score\" shows how strongly a horse matches your selected search conditions.",
    sort_label: "Sort by",
    sort_score_desc: "Recommend Score (High to Low)",
    sort_rating_desc: "Rating (High to Low)",
    sort_rating_asc: "Rating (Low to High)",
    sort_name_asc: "Name (A→Z)",
    sort_name_desc: "Name (Z→A)",
    sort_birth_desc: "Birth Year (Newest First)",
    sort_birth_asc: "Birth Year (Oldest First)",
    result_unit: "results",
    estimated_price: "Estimated Price",
    distance_aptitude: "Distance Aptitude",
    peak_season: "Peak Season",
    birth_year: "Birth Year",
    detail_preview: "Horse Details",
    achievements_title: "Major Career Achievements",
    column_title: "Mini Column",
    history_pending: "Real-world profile coming soon.",
    sources_label: "Sources:",
    price_range_label: "Estimated Price Range:",
    style_colon: "Running Style:",
    sub_prefix: "Sub:",
    growth_colon: "Growth Type:",
    color_colon: "Coat Color:",
    turf_dirt_aptitude: "Turf Aptitude / Dirt Aptitude",
    optimal: "optimal",
    footer_unofficial: "This is an unofficial, fan-made search tool.",
    footer_trademark_pre: "\"FULL STRIDE\" is a trademark or registered trademark of ",
    footer_trademark_post: ".",
    changelog_summary: "Update Log",
    no_results: "No horses matched your search conditions.",
    loading: "Loading horse data...",
    prompt_search: "Enter your search conditions and press \"Search\".",
    load_failed: "Failed to load horse data: "
  }
};

function currentLang() {
  return document.documentElement.getAttribute("data-lang") || "ja";
}

function t(key) {
  const lang = currentLang();
  return (I18N[lang] && I18N[lang][key] !== undefined) ? I18N[lang][key] : (I18N.ja[key] || "");
}

function styleLabelFor(idx) {
  const lang = currentLang();
  return (lang === "en" ? RUNNING_STYLE_LABELS_EN : RUNNING_STYLE_LABELS)[idx] || "-";
}

function colorLabelFor(colorKey) {
  const lang = currentLang();
  const dict = lang === "en" ? COLOR_LABEL_EN : COLOR_LABEL_JP;
  return dict[colorKey] || colorKey;
}

// 一覧カード等、一つだけ表示する場面用（英語モードはname_en優先、無ければname_jpにフォールバック）
function displayName(horse) {
  const lang = currentLang();
  if (lang === "en") {
    return horse.name_en && horse.name_en.trim() ? horse.name_en : horse.name_jp;
  }
  return horse.name_jp;
}

function growthLabelFor(growthKey) {
  const lang = currentLang();
  const dict = lang === "en" ? GROWTH_LABEL_EN : GROWTH_LABEL_JP;
  return dict[growthKey] || growthKey;
}

function statAxisLabel(axis) {
  const lang = currentLang();
  return lang === "en" ? axis.label_en : axis.label;
}

function tierOptionLabel(tier) {
  const lang = currentLang();
  if (lang === "en") {
    return tier === 5 ? "5 or above (0.8+)" : `${tier} or above`;
  }
  return tier === 5 ? "5以上（0.8以上）" : `${tier}以上`;
}

function applyLanguage(lang) {
  document.documentElement.setAttribute("data-lang", lang);
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const val = t(key);
    el.textContent = val;
  });
  const engNote = document.getElementById("eng-note");
  if (engNote) {
    engNote.style.display = lang === "en" ? "" : "none";
  }
  buildStatGrid();
  if (currentCriteria !== null) {
    renderResults(currentResults, currentCriteria);
  } else {
    renderResultsPlaceholder();
  }
  const modal = document.getElementById("detail-modal");
  if (modal && !modal.classList.contains("hidden") && window.__currentDetailHorse) {
    showDetail(window.__currentDetailHorse);
  }
}

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
  const lang = currentLang();
  const seasons = lang === "en"
    ? { spring: "spring", summer: "summer", autumn: "autumn", winter: "winter" }
    : { spring: "春", summer: "夏", autumn: "秋", winter: "冬" };
  let season;
  if (monthIndex >= 2 && monthIndex <= 4) season = seasons.spring;
  else if (monthIndex >= 5 && monthIndex <= 7) season = seasons.summer;
  else if (monthIndex >= 8 && monthIndex <= 10) season = seasons.autumn;
  else season = seasons.winter;
  return lang === "en" ? `Age ${years}, ${season}` : `${years}歳${season}頃`;
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
  const prevValues = {};
  STAT_AXES.forEach(axis => {
    const existing = document.getElementById(`stat-${axis.key}`);
    if (existing) prevValues[axis.key] = existing.value;
  });
  grid.innerHTML = "";
  STAT_AXES.forEach(axis => {
    const row = document.createElement("div");
    row.className = "stat-row";
    const label = document.createElement("label");
    label.textContent = statAxisLabel(axis);
    label.setAttribute("for", `stat-${axis.key}`);
    const select = document.createElement("select");
    select.id = `stat-${axis.key}`;
    select.innerHTML = `
      <option value="">${t("no_pref")}</option>
      <option value="1">${tierOptionLabel(1)}</option>
      <option value="2">${tierOptionLabel(2)}</option>
      <option value="3">${tierOptionLabel(3)}</option>
      <option value="4">${tierOptionLabel(4)}</option>
      <option value="5">${tierOptionLabel(5)}</option>
    `;
    if (prevValues[axis.key] !== undefined) select.value = prevValues[axis.key];
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
      if (dominantStyleIndex(h.running_style) !== idx) return false;
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

function dominantStyleIndex(styleArr) {
  let maxIdx = 0;
  let maxVal = -Infinity;
  styleArr.forEach((v, i) => {
    if (v > maxVal) {
      maxVal = v;
      maxIdx = i;
    }
  });
  return maxIdx;
}

function dominantStyleLabel(styleArr) {
  return styleLabelFor(dominantStyleIndex(styleArr));
}

// 2番目に高い脚質適性(非ゼロの場合のみ)を返す。単一適性の馬はnull
function subStyleLabel(styleArr) {
  const indexed = styleArr.map((v, i) => [v, i]);
  indexed.sort((a, b) => b[0] - a[0]);
  if (indexed.length > 1 && indexed[1][0] > 0) {
    return styleLabelFor(indexed[1][1]);
  }
  return null;
}

function starsText(stars) {
  return "🥕".repeat(stars) + ` (${stars}/10)`;
}

function renderResults(results, criteria) {
  const container = document.getElementById("results");
  const countEl = document.getElementById("result-count");
  const lang = currentLang();
  countEl.textContent = lang === "en" ? `${results.length} ${t("result_unit")}` : `${results.length}${t("result_unit")}`;
  container.innerHTML = "";

  if (results.length === 0) {
    container.innerHTML = `<div class="no-results">${t("no_results")}</div>`;
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
        <h3>${displayName(h)}</h3>
        <div class="card-tags">
          <span class="tag">${dominantStyleLabel(h.running_style)}</span>
          ${sub ? `<span class="tag sub-tag">${t("sub_prefix")}${sub}</span>` : ""}
          <span class="tag">${colorLabelFor(h.horse_color)}</span>
          <span class="tag">${growthLabelFor(h.growth_curve)}</span>
        </div>
        <div class="data-grid mono">
          <span class="k">${t("estimated_price")}</span><span class="v">${priceRangeText(h.estimated_price)} pt</span>
          <span class="k">${t("surface_turf")} / ${t("surface_dirt")}</span><span class="v">${h.turf_rating} / ${h.dirt_rating}</span>
          <span class="k">${t("distance_aptitude")}</span><span class="v">${h.min_distance}〜${h.max_distance}m</span>
          <span class="k">${t("peak_season")}</span><span class="v">${peakText}</span>
          <span class="k">${t("birth_year")}</span><span class="v">${isNaN(h.birth_year) ? "-" : (currentLang() === "en" ? h.birth_year : h.birth_year + "年")}</span>
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
      <h4>${t("achievements_title")}</h4>
      <p>${hist.achievements || ""}</p>
      <h4>${t("column_title")}</h4>
      <p>${hist.column || ""}</p>
      <p class="source-link">${t("sources_label")}<br>${sourcesHtml}</p>
    `;
  } else {
    historyHtml = `<p>${t("history_pending")}</p>`;
  }

  const peakText = isNaN(horse.peak_age) ? "-" : formatPeakSeason(horse.peak_age);
  const sub = subStyleLabel(horse.running_style);
  const lang = currentLang();
  const birthText = isNaN(horse.birth_year) ? "-" : (lang === "en" ? horse.birth_year : horse.birth_year + "年");

  window.__currentDetailHorse = horse;

  body.innerHTML = `
    <h3>${lang === "en" ? `${displayName(horse)}（${horse.name_jp}）` : `${horse.name_jp}（${horse.name_en}）`}</h3>
    <p class="price-line mono">${t("price_range_label")} ${priceRangeText(horse.estimated_price)} pt</p>
    <p>${t("style_colon")} ${dominantStyleLabel(horse.running_style)}${sub ? `（${t("sub_prefix")} ${sub}）` : ""} / ${t("growth_colon")} ${growthLabelFor(horse.growth_curve)}</p>
    <p>${t("color_colon")} ${colorLabelFor(horse.horse_color)}</p>
    <p>${t("surface_turf")}${lang === "en" ? " Aptitude" : "適性"}: ${horse.turf_rating} / ${t("surface_dirt")}${lang === "en" ? " Aptitude" : "適性"}: ${horse.dirt_rating}</p>
    <p>${t("distance_aptitude")}: ${horse.min_distance}〜${horse.max_distance}m（${t("optimal")} ${horse.optimal_distance}m）</p>
    <p>${t("peak_season")}: ${peakText} ／ ${t("birth_year")}: ${birthText}</p>
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

// ---- Lang toggle ----
let resultsPlaceholderState = null; // { type: "loading" | "prompt" | "error", message: "" }

function renderResultsPlaceholder() {
  if (!currentCriteria && resultsPlaceholderState) {
    const resultsPanel = document.getElementById("results");
    if (resultsPlaceholderState.type === "loading") {
      resultsPanel.innerHTML = `<div class="no-results">${t("loading")}</div>`;
    } else if (resultsPlaceholderState.type === "prompt") {
      resultsPanel.innerHTML = `<div class="no-results">${t("prompt_search")}</div>`;
    } else if (resultsPlaceholderState.type === "error") {
      resultsPanel.innerHTML = `<div class="no-results">${t("load_failed")}${resultsPlaceholderState.message}</div>`;
    }
  }
}

function setupLangToggle() {
  const root = document.documentElement;
  const btn = document.getElementById("lang-toggle");

  function updateLabel() {
    const lang = root.getAttribute("data-lang") || "ja";
    btn.textContent = lang === "ja" ? "ENG" : "JPN";
  }

  btn.addEventListener("click", () => {
    const current = root.getAttribute("data-lang") || "ja";
    const next = current === "ja" ? "en" : "ja";
    applyLanguage(next);
    updateLabel();
    renderResultsPlaceholder();
  });

  updateLabel();
}

// ---- Init ----
async function init() {
  const versionMeta = document.querySelector('meta[name="app-version"]');
  if (versionMeta) {
    document.getElementById("app-version-badge").textContent = "v" + versionMeta.content;
  }
  applyLanguage("ja");
  setupStyleChips();
  setupGrowthChips();
  setupThemeToggle();
  setupLangToggle();
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
  resultsPlaceholderState = { type: "loading" };
  resultsPanel.innerHTML = `<div class="no-results">${t("loading")}</div>`;

  try {
    await Promise.all([loadHorses(), loadHistory(), loadChangelog()]);
    resultsPlaceholderState = { type: "prompt" };
    resultsPanel.innerHTML = `<div class="no-results">${t("prompt_search")}</div>`;
  } catch (e) {
    resultsPlaceholderState = { type: "error", message: e.message };
    resultsPanel.innerHTML = `<div class="no-results">${t("load_failed")}${e.message}</div>`;
  }
}

document.addEventListener("DOMContentLoaded", init);
