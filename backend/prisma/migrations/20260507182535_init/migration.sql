-- CreateEnum
CREATE TYPE "CollegeType" AS ENUM ('Government', 'Private', 'Deemed', 'Autonomous');

-- CreateEnum
CREATE TYPE "CourseLevel" AS ENUM ('UG', 'PG', 'Diploma', 'PhD');

-- CreateTable
CREATE TABLE "colleges" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "type" "CollegeType" NOT NULL,
    "established" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "total_fees_min" INTEGER NOT NULL,
    "total_fees_max" INTEGER NOT NULL,
    "image_url" TEXT,
    "description" TEXT NOT NULL,
    "website" TEXT,
    "naac_grade" TEXT,
    "rank_nirf" INTEGER,
    "total_students" INTEGER,
    "campus_area" TEXT,
    "approved" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "colleges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "college_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" "CourseLevel" NOT NULL,
    "duration" TEXT NOT NULL,
    "fees_per_year" INTEGER NOT NULL,
    "total_fees" INTEGER NOT NULL,
    "seats" INTEGER NOT NULL,
    "exam_accepted" TEXT[],
    "eligibility" TEXT,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "placements" (
    "id" TEXT NOT NULL,
    "college_id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "avg_package" DOUBLE PRECISION NOT NULL,
    "highest_package" DOUBLE PRECISION NOT NULL,
    "placement_rate" DOUBLE PRECISION NOT NULL,
    "median_package" DOUBLE PRECISION,
    "top_recruiters" TEXT[],

    CONSTRAINT "placements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "college_id" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,
    "batch_year" INTEGER NOT NULL,
    "course" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "pros" TEXT,
    "cons" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "predictor_rules" (
    "id" TEXT NOT NULL,
    "college_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "exam" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "rank_min" INTEGER NOT NULL,
    "rank_max" INTEGER NOT NULL,

    CONSTRAINT "predictor_rules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "colleges_slug_key" ON "colleges"("slug");

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "colleges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placements" ADD CONSTRAINT "placements_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "colleges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "colleges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "predictor_rules" ADD CONSTRAINT "predictor_rules_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "colleges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "predictor_rules" ADD CONSTRAINT "predictor_rules_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
