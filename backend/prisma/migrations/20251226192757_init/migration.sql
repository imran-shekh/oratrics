/*
  Warnings:

  - You are about to drop the column `lead_id` on the `Demo` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Lead` table. All the data in the column will be lost.
  - Added the required column `leadId` to the `Demo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Demo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "scheduled_datetime" DATETIME NOT NULL,
    "teacher_name" TEXT NOT NULL,
    "outcome" TEXT,
    "leadId" INTEGER NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Demo_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Demo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Demo" ("id", "outcome", "scheduled_datetime", "teacher_name") SELECT "id", "outcome", "scheduled_datetime", "teacher_name" FROM "Demo";
DROP TABLE "Demo";
ALTER TABLE "new_Demo" RENAME TO "Demo";
CREATE TABLE "new_Lead" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "parent_name" TEXT NOT NULL,
    "child_grade" TEXT NOT NULL,
    "program_interest" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NEW'
);
INSERT INTO "new_Lead" ("child_grade", "id", "parent_name", "program_interest", "status") SELECT "child_grade", "id", "parent_name", "program_interest", "status" FROM "Lead";
DROP TABLE "Lead";
ALTER TABLE "new_Lead" RENAME TO "Lead";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
