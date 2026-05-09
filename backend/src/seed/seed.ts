import { PrismaClient } from '@prisma/client';
import { colleges } from './data/colleges';
import { seedCourses } from './data/courses';
import { seedPlacements } from './data/placements';
import { seedReviews } from './data/reviews';
import { seedPredictorRules } from './data/predictor';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data
  await prisma.predictorRule.deleteMany();
  await prisma.review.deleteMany();
  await prisma.placement.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();

  console.log('🗑️  Cleared existing data');

  // Insert colleges
  for (const college of colleges) {
    await prisma.college.create({ data: college });
  }
  console.log(`✅ Seeded ${colleges.length} colleges`);

  // Insert courses
  const allColleges = await prisma.college.findMany({ select: { id: true, slug: true } });
  const slugToId = Object.fromEntries(allColleges.map(c => [c.slug, c.id]));

  const courses = seedCourses(slugToId);
  for (const course of courses) {
    await prisma.course.create({ data: course });
  }
  console.log(`✅ Seeded ${courses.length} courses`);

  // Insert placements
  const placements = seedPlacements(slugToId);
  for (const p of placements) {
    await prisma.placement.create({ data: p });
  }
  console.log(`✅ Seeded ${placements.length} placements`);

  // Insert reviews
  const reviews = seedReviews(slugToId);
  for (const r of reviews) {
    await prisma.review.create({ data: r });
  }
  console.log(`✅ Seeded ${reviews.length} reviews`);

  // Insert predictor rules
  const allCourses = await prisma.course.findMany({ select: { id: true, collegeId: true, name: true } });
  const rules = seedPredictorRules(slugToId, allCourses);
  for (const rule of rules) {
    await prisma.predictorRule.create({ data: rule });
  }
  console.log(`✅ Seeded ${rules.length} predictor rules`);

  console.log('🎉 Seed complete!');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
