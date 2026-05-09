import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// GET /api/colleges — list with search, filter, pagination
router.get('/', async (req: Request, res: Response) => {
  try {
    const {
      search = '',
      state = '',
      fees_max = '',
      course = '',
      type = '',
      page = '1',
      limit = '12',
    } = req.query as Record<string, string>;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (state) {
      where.state = { contains: state, mode: 'insensitive' };
    }
    if (type) {
      where.type = type;
    }
    if (fees_max) {
      where.totalFeesMin = { lte: parseInt(fees_max) };
    }
    if (course) {
      where.courses = {
        some: {
          name: { contains: course, mode: 'insensitive' },
        },
      };
    }

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: [{ rankNirf: 'asc' }, { rating: 'desc' }],
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
          established: true,
          approved: true,
          _count: { select: { courses: true } },
          placements: {
            orderBy: { year: 'desc' },
            take: 1,
            select: { avgPackage: true, placementRate: true },
          },
        },
      }),
      prisma.college.count({ where }),
    ]);

    res.json({
      colleges,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        hasNext: pageNum < Math.ceil(total / limitNum),
        hasPrev: pageNum > 1,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch colleges' });
  }
});

// GET /api/colleges/filters — distinct filter options
router.get('/filters', async (_req: Request, res: Response) => {
  try {
    const [states, types] = await Promise.all([
      prisma.college.findMany({
        distinct: ['state'],
        select: { state: true },
        orderBy: { state: 'asc' },
      }),
      prisma.college.findMany({
        distinct: ['type'],
        select: { type: true },
      }),
    ]);

    const courses = await prisma.course.findMany({
      distinct: ['name'],
      select: { name: true },
      orderBy: { name: 'asc' },
    });

    res.json({
      states: states.map(s => s.state),
      types: types.map(t => t.type),
      courses: courses.map(c => c.name),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch filters' });
  }
});

// GET /api/colleges/:id — full college detail
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const college = await prisma.college.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        courses: {
          orderBy: { feesPerYear: 'asc' },
        },
        placements: {
          orderBy: { year: 'desc' },
          take: 3,
        },
        reviews: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }

    res.json(college);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch college' });
  }
});

export default router;

