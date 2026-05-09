-- CreateIndex
CREATE INDEX "colleges_rank_nirf_idx" ON "colleges"("rank_nirf");

-- CreateIndex
CREATE INDEX "colleges_state_idx" ON "colleges"("state");

-- CreateIndex
CREATE INDEX "colleges_type_idx" ON "colleges"("type");

-- CreateIndex
CREATE INDEX "colleges_rating_idx" ON "colleges"("rating");

-- CreateIndex
CREATE INDEX "predictor_rules_exam_category_idx" ON "predictor_rules"("exam", "category");

-- CreateIndex
CREATE INDEX "predictor_rules_rank_min_rank_max_idx" ON "predictor_rules"("rank_min", "rank_max");
