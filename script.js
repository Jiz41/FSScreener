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
    howto_2: "脚質・距離・芝ダート・性別・毛色・成長タイプ・8軸ステータスは、気になる項目だけ任意で絞り込めます",
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
    surface_turf: "芝",
    surface_dirt: "ダート",
    gender_label: "性別",
    gender_0: "牡",
    gender_1: "牝",
    gender_2: "せん馬",
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
    stat_hint: "グラフをタップ／ドラッグして下限値（1〜5）を指定できます。中心まで戻すと指定なしになります。",
    stat_reset: "リセット",
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
    howto_2: "Running style, distance, turf/dirt, sex, coat color, growth type, and the 8-axis stats are all optional — narrow down by whichever ones you care about",
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
    surface_turf: "Turf",
    surface_dirt: "Dirt",
    gender_label: "Sex",
    gender_0: "Colt / Stallion",
    gender_1: "Filly / Mare",
    gender_2: "Gelding",
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
    stat_hint: "Tap or drag on the chart to set a minimum value (1-5). Drag back to the center to clear.",
    stat_reset: "Reset",
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
  renderChangelog();
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

let changelogEntries = [];

async function loadChangelog() {
  try {
    const res = await fetch("data/changelog.json");
    if (!res.ok) return;
    changelogEntries = await res.json();
    renderChangelog();
  } catch (e) {
    // 更新履歴が読めなくても致命的ではないため無視
  }
}

function renderChangelog() {
  const list = document.getElementById("changelog-list");
  if (!list) return;
  const lang = currentLang();
  list.innerHTML = changelogEntries
    .map(e => {
      const text = lang === "en" ? (e.text_en || e.text) : e.text;
      return `<li><span class="mono" style="color:var(--muted);">${e.date}</span> ${text}</li>`;
    })
    .join("");
}

// ---- Stat radar chart UI ----
// ゲーム内表示と同じ軸順（上から時計回り）
const RADAR_AXIS_ORDER = [
  "acceleration", "start_score", "hill_score", "heavy_track_score",
  "health", "consistency", "fighting_spirit", "cornering_score"
];
// 各軸の下限tier（0 = 指定なし）。言語切替で再構築しても保持される
const statTierState = {};
STAT_AXES.forEach(axis => { statTierState[axis.key] = 0; });

const RADAR_SIZE = 360;
const RADAR_CX = RADAR_SIZE / 2;
const RADAR_CY = RADAR_SIZE / 2;
const RADAR_R = 105;

function radarAxes() {
  return RADAR_AXIS_ORDER.map(key => STAT_AXES.find(a => a.key === key));
}

function radarPoint(axisIndex, ratio) {
  const angle = -Math.PI / 2 + axisIndex * (Math.PI / 4);
  return {
    x: RADAR_CX + RADAR_R * ratio * Math.cos(angle),
    y: RADAR_CY + RADAR_R * ratio * Math.sin(angle)
  };
}

function radarPolygonPoints(ratioFn) {
  return radarAxes()
    .map((axis, i) => {
      const p = radarPoint(i, ratioFn(axis, i));
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    })
    .join(" ");
}

function buildStatGrid() {
  const grid = document.getElementById("stat-grid");
  grid.innerHTML = "";

  const wrap = document.createElement("div");
  wrap.className = "stat-radar-wrap";

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${RADAR_SIZE} ${RADAR_SIZE}`);
  svg.classList.add("stat-radar");
  svg.id = "stat-radar";

  // 下地の8角形と目盛りリング（1〜5）
  let staticLayer = `<polygon class="radar-base" points="${radarPolygonPoints(() => 1)}"/>`;
  for (let tier = 1; tier <= 4; tier++) {
    staticLayer += `<polygon class="radar-ring" points="${radarPolygonPoints(() => tier / 5)}"/>`;
  }
  // 軸のスポーク
  radarAxes().forEach((axis, i) => {
    const p = radarPoint(i, 1);
    staticLayer += `<line class="radar-spoke" x1="${RADAR_CX}" y1="${RADAR_CY}" x2="${p.x.toFixed(1)}" y2="${p.y.toFixed(1)}"/>`;
  });
  svg.innerHTML = staticLayer
    + `<polygon class="radar-value" id="radar-value-poly" points=""/>`
    + `<g id="radar-handles"></g>`
    + `<g id="radar-labels"></g>`;

  wrap.appendChild(svg);

  const hint = document.createElement("p");
  hint.className = "stat-radar-hint";
  hint.textContent = t("stat_hint");
  wrap.appendChild(hint);

  const resetBtn = document.createElement("button");
  resetBtn.type = "button";
  resetBtn.className = "stat-radar-reset";
  resetBtn.textContent = t("stat_reset");
  resetBtn.addEventListener("click", () => {
    STAT_AXES.forEach(axis => { statTierState[axis.key] = 0; });
    updateRadarDynamic();
  });
  wrap.appendChild(resetBtn);

  grid.appendChild(wrap);

  attachRadarPointerHandlers(svg);
  updateRadarDynamic();
}

function updateRadarDynamic() {
  const poly = document.getElementById("radar-value-poly");
  const handles = document.getElementById("radar-handles");
  const labels = document.getElementById("radar-labels");
  if (!poly || !handles || !labels) return;

  const anySet = STAT_AXES.some(axis => statTierState[axis.key] > 0);
  poly.setAttribute("points", radarPolygonPoints(axis => statTierState[axis.key] / 5));
  poly.style.display = anySet ? "" : "none";

  let handleHtml = "";
  let labelHtml = "";
  radarAxes().forEach((axis, i) => {
    const tier = statTierState[axis.key];
    if (tier > 0) {
      const p = radarPoint(i, tier / 5);
      handleHtml += `<circle class="radar-handle" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="6"/>`;
    }
    const lp = radarPoint(i, 1);
    // ラベルは頂点の外側へ押し出す
    const lx = RADAR_CX + (lp.x - RADAR_CX) * 1.22;
    const ly = RADAR_CY + (lp.y - RADAR_CY) * 1.22;
    let anchor = "middle";
    if (lx < RADAR_CX - 10) anchor = "end";
    else if (lx > RADAR_CX + 10) anchor = "start";
    const dy = ly < RADAR_CY - 10 ? -2 : (ly > RADAR_CY + 10 ? 12 : 5);
    const tierText = tier > 0 ? ` <tspan class="radar-label-tier">${tier}</tspan>` : "";
    labelHtml += `<text class="radar-label${tier > 0 ? " is-set" : ""}" x="${lx.toFixed(1)}" y="${(ly + dy).toFixed(1)}" text-anchor="${anchor}">${statAxisLabel(axis)}${tierText}</text>`;
  });
  handles.innerHTML = handleHtml;
  labels.innerHTML = labelHtml;
}

function attachRadarPointerHandlers(svg) {
  let dragging = false;

  function applyPointer(evt) {
    const rect = svg.getBoundingClientRect();
    // viewBox座標へ変換（正方形前提）
    const scale = RADAR_SIZE / rect.width;
    const x = (evt.clientX - rect.left) * scale;
    const y = (evt.clientY - rect.top) * scale;
    const dx = x - RADAR_CX;
    const dy = y - RADAR_CY;
    // 最寄りの軸（上=0から時計回り45度刻み）
    let deg = Math.atan2(dy, dx) * 180 / Math.PI + 90;
    if (deg < 0) deg += 360;
    const axisIndex = Math.round(deg / 45) % 8;
    const dist = Math.sqrt(dx * dx + dy * dy);
    // チャートの外側すぎるタップは無視（ラベル部分の誤操作防止）
    if (dist > RADAR_R * 1.35) return;
    const tier = Math.max(0, Math.min(5, Math.round((dist / RADAR_R) * 5)));
    const key = RADAR_AXIS_ORDER[axisIndex];
    if (statTierState[key] !== tier) {
      statTierState[key] = tier;
      updateRadarDynamic();
    }
  }

  svg.addEventListener("pointerdown", evt => {
    dragging = true;
    svg.setPointerCapture(evt.pointerId);
    applyPointer(evt);
    evt.preventDefault();
  });
  svg.addEventListener("pointermove", evt => {
    if (dragging) applyPointer(evt);
  });
  const stop = () => { dragging = false; };
  svg.addEventListener("pointerup", stop);
  svg.addEventListener("pointercancel", stop);
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
  const genderVal = document.getElementById("horse-gender").value;

  const growthChecked = Array.from(document.querySelectorAll('#growth-chips .chip.active')).map(el => el.dataset.value);

  const statFilters = STAT_AXES
    .map(axis => ({ key: axis.key, tier: statTierState[axis.key] }))
    .filter(f => f.tier > 0);

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

    if (genderVal !== "") {
      if (h.gender !== genderVal) return false;
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
    const achievementLines = (hist.achievements || "")
      .split(/(?<!・)(?=\d{4}(?:・\d{4})?年)/)
      .map(s => s.replace(/、\s*$/, "").trim())
      .filter(Boolean);
    const MAX_ACHIEVEMENT_LINES = 3;
    const isTopGradeLine = line => /GI(?!I)|G1(?!\d)|JpnI(?!I)/.test(line);
    let displayLines = achievementLines;
    let achievementsTruncated = false;
    if (achievementLines.length > MAX_ACHIEVEMENT_LINES) {
      const giCount = achievementLines.filter(isTopGradeLine).length;
      const otherBudget = Math.max(0, MAX_ACHIEVEMENT_LINES - giCount);
      let otherUsed = 0;
      const kept = [];
      for (const line of achievementLines) {
        if (isTopGradeLine(line)) {
          kept.push(line);
        } else if (otherUsed < otherBudget) {
          kept.push(line);
          otherUsed++;
        } else {
          achievementsTruncated = true;
        }
      }
      displayLines = kept;
    }
    const achievementsHtml = displayLines.length
      ? displayLines.map((line, i) => {
          const text = (achievementsTruncated && i === displayLines.length - 1) ? `${line}など` : line;
          return `<p class="achievement-line">${text}</p>`;
        }).join("")
      : `<p>${hist.achievements || ""}</p>`;
    historyHtml = `
      <div class="detail-block">
        <h4>${t("achievements_title")}</h4>
        ${achievementsHtml}
      </div>
      <div class="detail-block">
        <h4>${t("column_title")}</h4>
        <p>${hist.column || ""}</p>
      </div>
      <div class="detail-block">
        <p class="source-link">${t("sources_label")}<br>${sourcesHtml}</p>
      </div>
    `;
  } else {
    historyHtml = `<div class="detail-block"><p>${t("history_pending")}</p></div>`;
  }

  const peakText = isNaN(horse.peak_age) ? "-" : formatPeakSeason(horse.peak_age);
  const sub = subStyleLabel(horse.running_style);
  const lang = currentLang();
  const birthText = isNaN(horse.birth_year) ? "-" : (lang === "en" ? horse.birth_year : horse.birth_year + "年");

  window.__currentDetailHorse = horse;

  body.innerHTML = `
    <h3>${lang === "en" ? `${displayName(horse)}（${horse.name_jp}）` : `${horse.name_jp}（${horse.name_en}）`}</h3>
    <p class="price-line mono">${t("price_range_label")} ${priceRangeText(horse.estimated_price)} pt</p>
    <div class="detail-stats">
      <p>${t("style_colon")} ${dominantStyleLabel(horse.running_style)}${sub ? `（${t("sub_prefix")} ${sub}）` : ""} / ${t("growth_colon")} ${growthLabelFor(horse.growth_curve)}</p>
      <p>${t("color_colon")} ${colorLabelFor(horse.horse_color)}</p>
      <p>${t("surface_turf")}${lang === "en" ? " Aptitude" : "適性"}: ${horse.turf_rating} / ${t("surface_dirt")}${lang === "en" ? " Aptitude" : "適性"}: ${horse.dirt_rating}</p>
      <p>${t("distance_aptitude")}: ${horse.min_distance}〜${horse.max_distance}m（${t("optimal")} ${horse.optimal_distance}m）</p>
      <p>${t("peak_season")}: ${peakText} ／ ${t("birth_year")}: ${birthText}</p>
    </div>
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

// ---- 背景の光粒子エフェクト ----
function initParticles() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.id = "fx-particles";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  let width = 0, height = 0, dpr = 1;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  // テーマのアクセント色（--radar-accent）に追従
  let accent = { r: 239, g: 138, b: 147 };
  function readAccent() {
    const v = getComputedStyle(document.documentElement).getPropertyValue("--radar-accent").trim();
    const m = v.match(/^#([0-9a-f]{6})$/i);
    if (m) {
      accent = {
        r: parseInt(m[1].slice(0, 2), 16),
        g: parseInt(m[1].slice(2, 4), 16),
        b: parseInt(m[1].slice(4, 6), 16)
      };
    }
  }
  readAccent();
  new MutationObserver(readAccent).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"]
  });

  const COUNT = Math.max(18, Math.min(42, Math.round(window.innerWidth * window.innerHeight / 28000)));
  function makeParticle(anywhere) {
    return {
      x: Math.random() * width,
      y: anywhere ? Math.random() * height : height + 10,
      r: 1 + Math.random() * 2.2,
      speed: 0.12 + Math.random() * 0.3,          // 上昇速度(px/frame)
      swayAmp: 8 + Math.random() * 22,             // 横ゆらぎの幅
      swayFreq: 0.002 + Math.random() * 0.004,
      phase: Math.random() * Math.PI * 2,
      baseAlpha: 0.25 + Math.random() * 0.4,
      twinkleFreq: 0.008 + Math.random() * 0.02
    };
  }
  const particles = [];
  for (let i = 0; i < COUNT; i++) particles.push(makeParticle(true));

  let tick = 0;
  let running = true;
  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running) requestAnimationFrame(frame);
  });

  function frame() {
    if (!running) return;
    tick++;
    ctx.clearRect(0, 0, width, height);
    const { r: cr, g: cg, b: cb } = accent;
    for (const p of particles) {
      p.y -= p.speed;
      const x = p.x + Math.sin(tick * p.swayFreq + p.phase) * p.swayAmp;
      const alpha = p.baseAlpha * (0.55 + 0.45 * Math.sin(tick * p.twinkleFreq + p.phase));
      if (p.y < -12) {
        Object.assign(p, makeParticle(false));
        continue;
      }
      const glow = ctx.createRadialGradient(x, p.y, 0, x, p.y, p.r * 4);
      glow.addColorStop(0, `rgba(${cr},${cg},${cb},${alpha.toFixed(3)})`);
      glow.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, p.y, p.r * 4, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// ---- Init ----
async function init() {
  const versionMeta = document.querySelector('meta[name="app-version"]');
  if (versionMeta) {
    document.getElementById("app-version-badge").textContent = "v" + versionMeta.content;
  }
  applyLanguage("ja");
  initParticles();
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
