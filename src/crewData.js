// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                     crewData.js — EVA Air Flight Crew Edition               ║
// ║  Initial pilot seed data loaded on first boot if Firestore is empty.        ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

/**
 * INITIAL_CREW — sample EVA Air flight crew (pilot) members.
 *
 * Positions:
 *   Capt  = 機長         (Captain)
 *   SFO   = 資深副機長    (Senior First Officer / Cruise Pilot)
 *   FO    = 副機長        (First Officer)
 *   CP    = 總機長        (Chief Pilot)
 *   IP    = 教師機師      (Instructed Pilot)
 *   Check = 考核機長      (Check Pilot)
 *
 * Aircraft: B777 · B787 · A321 · A330  (A350 & A321neo pending fleet entry)
 */

export const INITIAL_CREW = [
  // ── Captains ──────────────────────────────────────────────────────────────
  {
    id:        "P10001",
    nickname:  "Alex",
    name:      "陳建明",
    seniority: "BR-P088",
    status:    "green",
    tags:      ["#Standard & SOP"],
    notes:     "經驗豐富的機長，B777 資深，CRM 表現優秀。",
  },
  {
    id:        "P10002",
    nickname:  "Richard",
    name:      "林志豪",
    seniority: "BR-P095",
    status:    "yellow",
    tags:      [],
    notes:     "",
  },
  {
    id:        "P10003",
    nickname:  "Tony",
    name:      "王大偉",
    seniority: "BR-P102",
    status:    "green",
    tags:      ["#Standard & SOP"],
    notes:     "A330 機長，briefing 非常詳細，SOP 執行確實。",
  },
  // ── Senior First Officers (SFO / Cruise Pilot) ────────────────────────────
  {
    id:        "P20001",
    nickname:  "Michael",
    name:      "張哲瑋",
    seniority: "BR-P118",
    status:    "green",
    tags:      ["#Standard & SOP"],
    notes:     "資深副機長，巡航機長表現穩定，符合升等資格。",
  },
  {
    id:        "P20002",
    nickname:  "David",
    name:      "吳明仁",
    seniority: "BR-P121",
    status:    null,
    tags:      [],
    notes:     "",
  },
  // ── First Officers (FO) ───────────────────────────────────────────────────
  {
    id:        "P30001",
    nickname:  "Sam",
    name:      "黃承翰",
    seniority: "BR-P135",
    status:    "green",
    tags:      ["#Standard & SOP"],
    notes:     "積極學習，能量管理佳。",
  },
  {
    id:        "P30002",
    nickname:  "Jason",
    name:      "鄭宗翰",
    seniority: "BR-P138",
    status:    "red",
    tags:      [],
    notes:     "SOP 執行需要加強，注意 callout 時機。",
  },
  {
    id:        "P30003",
    nickname:  "Kevin",
    name:      "許家豪",
    seniority: "BR-P142",
    status:    null,
    tags:      [],
    notes:     "",
  },
  // ── Instructed Pilot (IP) ─────────────────────────────────────────────────
  {
    id:        "P40001",
    nickname:  "Eric",
    name:      "劉明達",
    seniority: "BR-P075",
    status:    "green",
    tags:      ["#Standard & SOP"],
    notes:     "教師機師，教學態度積極，講解清晰。",
  },
  // ── Check Pilot ───────────────────────────────────────────────────────────
  {
    id:        "P50001",
    nickname:  "Steven",
    name:      "蔡志遠",
    seniority: "BR-P062",
    status:    "green",
    tags:      ["#Standard & SOP"],
    notes:     "考核機長，標準嚴格但公正，B787 考官。",
  },
];
