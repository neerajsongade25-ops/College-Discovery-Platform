export function seedPredictorRules(
  slugToId: Record<string, string>,
  courses: { id: string; collegeId: string; name: string }[]
) {
  const c = (slug: string) => slugToId[slug];
  const course = (slug: string, courseName: string) =>
    courses.find(cr => cr.collegeId === c(slug) && cr.name.toLowerCase().includes(courseName.toLowerCase()))?.id;

  const rules: any[] = [];

  // ── JEE Advanced rules (IITs) ──
  const jeeAdvancedRules = [
    // IIT Bombay CS — rank 1-200 (General)
    { slug: 'iit-bombay', courseName: 'B.Tech Computer Science', exam: 'JEE Advanced', category: 'General', rankMin: 1, rankMax: 200 },
    { slug: 'iit-bombay', courseName: 'B.Tech Computer Science', exam: 'JEE Advanced', category: 'OBC', rankMin: 1, rankMax: 120 },
    { slug: 'iit-bombay', courseName: 'B.Tech Computer Science', exam: 'JEE Advanced', category: 'SC', rankMin: 1, rankMax: 60 },
    { slug: 'iit-bombay', courseName: 'B.Tech Electrical Engineering', exam: 'JEE Advanced', category: 'General', rankMin: 150, rankMax: 500 },
    { slug: 'iit-bombay', courseName: 'B.Tech Electrical Engineering', exam: 'JEE Advanced', category: 'OBC', rankMin: 80, rankMax: 280 },
    // IIT Delhi CS
    { slug: 'iit-delhi', courseName: 'B.Tech Computer Science', exam: 'JEE Advanced', category: 'General', rankMin: 1, rankMax: 150 },
    { slug: 'iit-delhi', courseName: 'B.Tech Computer Science', exam: 'JEE Advanced', category: 'OBC', rankMin: 1, rankMax: 90 },
    { slug: 'iit-delhi', courseName: 'B.Tech Computer Science', exam: 'JEE Advanced', category: 'SC', rankMin: 1, rankMax: 45 },
    { slug: 'iit-delhi', courseName: 'B.Tech Mechanical Engineering', exam: 'JEE Advanced', category: 'General', rankMin: 500, rankMax: 1200 },
    { slug: 'iit-delhi', courseName: 'B.Tech Mechanical Engineering', exam: 'JEE Advanced', category: 'OBC', rankMin: 250, rankMax: 650 },
    // IIT Madras
    { slug: 'iit-madras', courseName: 'B.Tech Computer Science', exam: 'JEE Advanced', category: 'General', rankMin: 1, rankMax: 100 },
    { slug: 'iit-madras', courseName: 'B.Tech Computer Science', exam: 'JEE Advanced', category: 'OBC', rankMin: 1, rankMax: 65 },
    { slug: 'iit-madras', courseName: 'B.Tech Aerospace Engineering', exam: 'JEE Advanced', category: 'General', rankMin: 400, rankMax: 900 },
    { slug: 'iit-madras', courseName: 'B.Tech Aerospace Engineering', exam: 'JEE Advanced', category: 'OBC', rankMin: 200, rankMax: 500 },
    // IIT Kanpur
    { slug: 'iit-kanpur', courseName: 'B.Tech Computer Science', exam: 'JEE Advanced', category: 'General', rankMin: 50, rankMax: 350 },
    { slug: 'iit-kanpur', courseName: 'B.Tech Computer Science', exam: 'JEE Advanced', category: 'OBC', rankMin: 25, rankMax: 180 },
    { slug: 'iit-kanpur', courseName: 'B.Tech Electrical Engineering', exam: 'JEE Advanced', category: 'General', rankMin: 300, rankMax: 800 },
    // IIT Kharagpur
    { slug: 'iit-kharagpur', courseName: 'B.Tech Computer Science', exam: 'JEE Advanced', category: 'General', rankMin: 100, rankMax: 600 },
    { slug: 'iit-kharagpur', courseName: 'B.Tech Computer Science', exam: 'JEE Advanced', category: 'OBC', rankMin: 50, rankMax: 320 },
    { slug: 'iit-kharagpur', courseName: 'B.Tech Civil Engineering', exam: 'JEE Advanced', category: 'General', rankMin: 2000, rankMax: 5000 },
    // IIT Roorkee
    { slug: 'iit-roorkee', courseName: 'B.Tech Computer Science', exam: 'JEE Advanced', category: 'General', rankMin: 800, rankMax: 2000 },
    { slug: 'iit-roorkee', courseName: 'B.Tech Computer Science', exam: 'JEE Advanced', category: 'OBC', rankMin: 400, rankMax: 1100 },
    { slug: 'iit-roorkee', courseName: 'B.Tech Civil Engineering', exam: 'JEE Advanced', category: 'General', rankMin: 4000, rankMax: 9000 },
    // IIT Hyderabad
    { slug: 'iit-hyderabad', courseName: 'B.Tech Computer Science', exam: 'JEE Advanced', category: 'General', rankMin: 1500, rankMax: 4000 },
    { slug: 'iit-hyderabad', courseName: 'B.Tech Computer Science', exam: 'JEE Advanced', category: 'OBC', rankMin: 800, rankMax: 2200 },
    { slug: 'iit-hyderabad', courseName: 'B.Tech AI & Machine Learning', exam: 'JEE Advanced', category: 'General', rankMin: 1200, rankMax: 3500 },
  ];

  // ── JEE Main rules (NITs + DTU + others) ──
  const jeeMainRules = [
    // NIT Trichy CS
    { slug: 'nit-trichy', courseName: 'B.Tech Computer Science', exam: 'JEE Main', category: 'General', rankMin: 1000, rankMax: 5000 },
    { slug: 'nit-trichy', courseName: 'B.Tech Computer Science', exam: 'JEE Main', category: 'OBC', rankMin: 500, rankMax: 2800 },
    { slug: 'nit-trichy', courseName: 'B.Tech Computer Science', exam: 'JEE Main', category: 'SC', rankMin: 200, rankMax: 1200 },
    { slug: 'nit-trichy', courseName: 'B.Tech Mechanical Engineering', exam: 'JEE Main', category: 'General', rankMin: 5000, rankMax: 15000 },
    { slug: 'nit-trichy', courseName: 'B.Tech Mechanical Engineering', exam: 'JEE Main', category: 'OBC', rankMin: 2500, rankMax: 8000 },
    // NIT Warangal
    { slug: 'nit-warangal', courseName: 'B.Tech Computer Science', exam: 'JEE Main', category: 'General', rankMin: 2000, rankMax: 7000 },
    { slug: 'nit-warangal', courseName: 'B.Tech Computer Science', exam: 'JEE Main', category: 'OBC', rankMin: 1000, rankMax: 4000 },
    { slug: 'nit-warangal', courseName: 'B.Tech Electronics & Communication', exam: 'JEE Main', category: 'General', rankMin: 5000, rankMax: 14000 },
    // NIT Surathkal
    { slug: 'nit-surathkal', courseName: 'B.Tech Computer Science', exam: 'JEE Main', category: 'General', rankMin: 3000, rankMax: 9000 },
    { slug: 'nit-surathkal', courseName: 'B.Tech Computer Science', exam: 'JEE Main', category: 'OBC', rankMin: 1500, rankMax: 5000 },
    { slug: 'nit-surathkal', courseName: 'B.Tech Information Technology', exam: 'JEE Main', category: 'General', rankMin: 7000, rankMax: 18000 },
    // DTU
    { slug: 'dtu-delhi', courseName: 'B.Tech Computer Science', exam: 'JEE Main', category: 'General', rankMin: 5000, rankMax: 20000 },
    { slug: 'dtu-delhi', courseName: 'B.Tech Computer Science', exam: 'JEE Main', category: 'OBC', rankMin: 2500, rankMax: 11000 },
    { slug: 'dtu-delhi', courseName: 'B.Tech Software Engineering', exam: 'JEE Main', category: 'General', rankMin: 8000, rankMax: 25000 },
    // Thapar
    { slug: 'thapar-patiala', courseName: 'B.E. Computer Science', exam: 'JEE Main', category: 'General', rankMin: 15000, rankMax: 60000 },
    { slug: 'thapar-patiala', courseName: 'B.E. Computer Science', exam: 'JEE Main', category: 'OBC', rankMin: 8000, rankMax: 35000 },
    { slug: 'thapar-patiala', courseName: 'B.E. Electronics & Communication', exam: 'JEE Main', category: 'General', rankMin: 30000, rankMax: 100000 },
    // VIT (VITEEE approximated to JEE Main range for predictor)
    { slug: 'vit-vellore', courseName: 'B.Tech Computer Science', exam: 'JEE Main', category: 'General', rankMin: 20000, rankMax: 150000 },
    { slug: 'vit-vellore', courseName: 'B.Tech Computer Science', exam: 'JEE Main', category: 'OBC', rankMin: 10000, rankMax: 100000 },
    { slug: 'vit-vellore', courseName: 'B.Tech Mechanical Engineering', exam: 'JEE Main', category: 'General', rankMin: 50000, rankMax: 300000 },
    // SRM
    { slug: 'srm-kattankulathur', courseName: 'B.Tech Computer Science', exam: 'JEE Main', category: 'General', rankMin: 50000, rankMax: 500000 },
    { slug: 'srm-kattankulathur', courseName: 'B.Tech Artificial Intelligence', exam: 'JEE Main', category: 'General', rankMin: 30000, rankMax: 350000 },
    // Amity
    { slug: 'amity-noida', courseName: 'B.Tech Computer Science', exam: 'JEE Main', category: 'General', rankMin: 100000, rankMax: 800000 },
    // BIT Mesra
    { slug: 'bit-mesra', courseName: 'B.E. Computer Science', exam: 'JEE Main', category: 'General', rankMin: 30000, rankMax: 120000 },
    { slug: 'bit-mesra', courseName: 'B.E. Computer Science', exam: 'JEE Main', category: 'OBC', rankMin: 15000, rankMax: 70000 },
  ];

  // ── CAT rules (IIMs) ──
  const catRules = [
    { slug: 'iim-ahmedabad', courseName: 'PGP (MBA)', exam: 'CAT', category: 'General', rankMin: 1, rankMax: 200 },
    { slug: 'iim-ahmedabad', courseName: 'PGP (MBA)', exam: 'CAT', category: 'OBC', rankMin: 1, rankMax: 120 },
    { slug: 'iim-ahmedabad', courseName: 'PGP (MBA)', exam: 'CAT', category: 'SC', rankMin: 1, rankMax: 80 },
    { slug: 'iim-bangalore', courseName: 'PGP (MBA)', exam: 'CAT', category: 'General', rankMin: 1, rankMax: 300 },
    { slug: 'iim-bangalore', courseName: 'PGP (MBA)', exam: 'CAT', category: 'OBC', rankMin: 1, rankMax: 180 },
    { slug: 'iim-bangalore', courseName: 'PGP (MBA)', exam: 'CAT', category: 'SC', rankMin: 1, rankMax: 100 },
    { slug: 'iit-delhi', courseName: 'MBA', exam: 'CAT', category: 'General', rankMin: 50, rankMax: 400 },
    { slug: 'vit-vellore', courseName: 'MBA', exam: 'CAT', category: 'General', rankMin: 200, rankMax: 2000 },
  ];

  // ── WBJEE rules (West Bengal colleges) ──
  const wbjeeRules = [
    // Jadavpur University — top WBJEE college
    { slug: 'jadavpur-university', courseName: 'B.E. Computer Science', exam: 'WBJEE', category: 'General', rankMin: 1, rankMax: 2000 },
    { slug: 'jadavpur-university', courseName: 'B.E. Computer Science', exam: 'WBJEE', category: 'OBC', rankMin: 1, rankMax: 1200 },
    { slug: 'jadavpur-university', courseName: 'B.E. Computer Science', exam: 'WBJEE', category: 'SC', rankMin: 1, rankMax: 700 },
    { slug: 'jadavpur-university', courseName: 'B.E. Electronics', exam: 'WBJEE', category: 'General', rankMin: 1500, rankMax: 6000 },
    { slug: 'jadavpur-university', courseName: 'B.E. Electronics', exam: 'WBJEE', category: 'OBC', rankMin: 800, rankMax: 3500 },
    { slug: 'jadavpur-university', courseName: 'B.E. Mechanical Engineering', exam: 'WBJEE', category: 'General', rankMin: 5000, rankMax: 15000 },
    { slug: 'jadavpur-university', courseName: 'B.E. Mechanical Engineering', exam: 'WBJEE', category: 'OBC', rankMin: 2500, rankMax: 9000 },
    // BIT Mesra — accepts WBJEE
    { slug: 'bit-mesra', courseName: 'B.E. Computer Science', exam: 'WBJEE', category: 'General', rankMin: 5000, rankMax: 30000 },
    { slug: 'bit-mesra', courseName: 'B.E. Computer Science', exam: 'WBJEE', category: 'OBC', rankMin: 2500, rankMax: 18000 },
    // Thapar — accepts WBJEE via lateral/direct
    { slug: 'thapar-patiala', courseName: 'B.E. Computer Science', exam: 'WBJEE', category: 'General', rankMin: 8000, rankMax: 50000 },
  ];

  const allRules = [...jeeAdvancedRules, ...jeeMainRules, ...catRules, ...wbjeeRules];


  for (const rule of allRules) {
    const collegeId = c(rule.slug);
    const courseId = course(rule.slug, rule.courseName);
    if (!collegeId || !courseId) continue;
    rules.push({ collegeId, courseId, exam: rule.exam, category: rule.category, rankMin: rule.rankMin, rankMax: rule.rankMax });
  }

  return rules;
}
