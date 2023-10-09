-- CreateTable
CREATE TABLE "insightlab_db" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(64) NOT NULL,
    "password" VARCHAR(30) NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "insightlab_db_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "insightlab_db_username_key" ON "insightlab_db"("username");

-- CreateIndex
CREATE INDEX "insightlab_db_username_idx" ON "insightlab_db" USING HASH ("username");
