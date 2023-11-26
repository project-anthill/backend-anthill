-- AlterTable
ALTER TABLE "userConnections" ADD COLUMN     "requestSent" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "isConnected" SET DEFAULT false;
