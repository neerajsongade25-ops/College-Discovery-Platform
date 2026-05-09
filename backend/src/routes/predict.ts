import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// POST /api/predict — body: { exam, rank, category }
router.post('/', async (req: Request, res: Response) => {
  try {
    const { exam, rank, category = 'General' } = req.body as {
      exam: string;
      rank: number;
      category: string;
    };

    if (!exam || !rank) {
      return res.status(400).json({ error: 'exam and rank are required' });
    }

    const rankNum = parseInt(String(rank));
    if (isNaN(rankNum) || rankNum < 1) {
      return res.status(400).json({ error: 'rank must be a positive integer' });
    }

    // Find matching rules
    const rules = await prisma.predictorRule.findMany({
      where: {
        exam: { equals: exam, mode: 'insensitive' },
        category: { equals: category, mode: 'insensitive' },
        rankMin: { lte: rankNum },
        rankMax: { gte: rankNum },
      },
      include: {
        college: {
          select: {
            id: true,
            name: true,
            slug: true,
            location: true,
            city: true,
            state: true,
            type: true,
            rating: true,
            totalFeesMin: true,
            totalFeesMax: true,
            imageUrl: true,
            naacGrade: true,
            rankNirf: true,
            placements: {
              orderBy: { year: 'desc' },
              take: 1,
              select: { avgPackage: true, placementRate: true },
            },
          },
        },
        course: {
          select: {
            id: true,
            name: true,
            level: true,
            duration: true,
            feesPerYear: true,
            seats: true,
          },
        },
      },
      orderBy: [
        { college: { rankNirf: 'asc' } },
      ],
    });

    if (rules.length === 0) {
      return res.json({
        results: [],
        message: 'No colleges found for this rank. Try a higher rank or different category.',
      });
    }

    // Classify each result as Safe / Moderate / Reach
    // Safe: rank well within range (bottom 30% of the range)
    // Moderate: rank in middle 30-70%
    // Reach: rank near top of range (top 30%)
    const results = rules.map(rule => {
      const rangeSize = rule.rankMax - rule.rankMin;
      const positionInRange = rangeSize > 0
        ? (rankNum - rule.rankMin) / rangeSize
        : 0.5;

      let chance: 'Safe' | 'Moderate' | 'Reach';
      if (positionInRange <= 0.35) {
        chance = 'Safe';
      } else if (positionInRange <= 0.70) {
        chance = 'Moderate';
      } else {
        chance = 'Reach';
      }

      return {
        college: rule.college,
        course: rule.course,
        chance,
        rankRange: { min: rule.rankMin, max: rule.rankMax },
      };
    });

    // Deduplicate by college+course pair, keep best chance
    const seen = new Set<string>();
    const deduped = results.filter(r => {
      const key = `${r.college.id}-${r.course.id}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    res.json({
      results: deduped,
      exam,
      rank: rankNum,
      category,
      total: deduped.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Prediction failed' });
  }
});

// GET /api/predict/exams — list supported exams
router.get('/exams', async (_req: Request, res: Response) => {
  try {
    const exams = await prisma.predictorRule.findMany({
      distinct: ['exam'],
      select: { exam: true },
    });

    const categories = await prisma.predictorRule.findMany({
      distinct: ['category'],
      select: { category: true },
    });

    res.json({
      exams: exams.map(e => e.exam),
      categories: categories.map(c => c.category),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch exam list' });
  }
});

export default router;
