-- CreateTable
CREATE TABLE "email_accounts" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "email_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EmailAccountToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "email_accounts_email_key" ON "email_accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_EmailAccountToUser_AB_unique" ON "_EmailAccountToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_EmailAccountToUser_B_index" ON "_EmailAccountToUser"("B");

-- AddForeignKey
ALTER TABLE "_EmailAccountToUser" ADD CONSTRAINT "_EmailAccountToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "email_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmailAccountToUser" ADD CONSTRAINT "_EmailAccountToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
