import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// POST /api/compare — body: { collegeIds: string[] }
router.post('/', async (req: Request, res: Response) => {
  try {
    const { collegeIds } = req.body as { collegeIds: string[] };

    if (!collegeIds || !Array.isArray(collegeIds) || collegeIds.length < 2) {
      return res.status(400).json({ error: 'Provide 2 to 3 college IDs' });
    }

    if (collegeIds.length > 3) {
      return res.status(400).json({ error: 'Cannot compare more than 3 colleges at once' });
    }

    const colleges = await prisma.college.findMany({
      where: { id: { in: collegeIds } },
      include: {
        courses: { orderBy: { feesPerYear: 'asc' } },
        placements: {
          orderBy: { year: 'desc' },
          take: 1,
        },
        _count: { select: { courses: true, reviews: true } },
      },
    });

    if (colleges.length < 2) {
      return res.status(404).json({ error: 'One or more colleges not found' });
    }

    // Preserve the requested order
    const ordered = collegeIds
      .map(id => colleges.find(c => c.id === id))
      .filter(Boolean);

    // Calculate "best in category" for each metric
    const latestPlacements = ordered.map(c => c!.placements[0] || null);

    const bestNirf = Math.min(...ordered.map(c => c!.rankNirf ?? 9999));
    const bestRating = Math.max(...ordered.map(c => c!.rating));
    const bestFees = Math.min(...ordered.map(c => c!.totalFeesMin));
    const bestAvgPackage = Math.max(...latestPlacements.map(p => p?.avgPackage ?? 0));
    const bestHighestPackage = Math.max(...latestPlacements.map(p => p?.highestPackage ?? 0));
    const bestPlacementRate = Math.max(...latestPlacements.map(p => p?.placementRate ?? 0));

    const result = ordered.map(college => {
      const placement = college!.placements[0] || null;
      return {
        ...college,
        best: {
          nirf: college!.rankNirf === bestNirf,
          rating: college!.rating === bestRating,
          fees: college!.totalFeesMin === bestFees,
          avgPackage: placement?.avgPackage === bestAvgPackage,
          highestPackage: placement?.highestPackage === bestHighestPackage,
          placementRate: placement?.placementRate === bestPlacementRate,
        },
      };
    });

    res.json({ colleges: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to compare colleges' });
  }
});

// GET /api/compare?ids=id1,id2 — shareable URL support
router.get('/', async (req: Request, res: Response) => {
  const { ids } = req.query as { ids: string };
  if (!ids) return res.status(400).json({ error: 'ids query param required' });

  const collegeIds = ids.split(',').filter(Boolean);
  req.body = { collegeIds };

  // delegate to POST handler logic inline
  try {
    if (collegeIds.length < 2 || collegeIds.length > 3) {
      return res.status(400).json({ error: 'Provide 2 to 3 college IDs' });
    }

    const colleges = await prisma.college.findMany({
      where: { id: { in: collegeIds } },
      include: {
        courses: { orderBy: { feesPerYear: 'asc' } },
        placements: { orderBy: { year: 'desc' }, take: 1 },
        _count: { select: { courses: true, reviews: true } },
      },
    });

    const ordered = collegeIds
      .map(id => colleges.find(c => c.id === id))
      .filter(Boolean);

    const latestPlacements = ordered.map(c => c!.placements[0] || null);
    const bestNirf = Math.min(...ordered.map(c => c!.rankNirf ?? 9999));
    const bestRating = Math.max(...ordered.map(c => c!.rating));
    const bestFees = Math.min(...ordered.map(c => c!.totalFeesMin));
    const bestAvgPackage = Math.max(...latestPlacements.map(p => p?.avgPackage ?? 0));
    const bestHighestPackage = Math.max(...latestPlacements.map(p => p?.highestPackage ?? 0));
    const bestPlacementRate = Math.max(...latestPlacements.map(p => p?.placementRate ?? 0));

    const result = ordered.map(college => {
      const placement = college!.placements[0] || null;
      return {
        ...college,
        best: {
          nirf: college!.rankNirf === bestNirf,
          rating: college!.rating === bestRating,
          fees: college!.totalFeesMin === bestFees,
          avgPackage: placement?.avgPackage === bestAvgPackage,
          highestPackage: placement?.highestPackage === bestHighestPackage,
          placementRate: placement?.placementRate === bestPlacementRate,
        },
      };
    });

    res.json({ colleges: result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to compare colleges' });
  }
});

export default router;
