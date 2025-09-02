ALTER TABLE "neighbors" ADD COLUMN "firstName" text NOT NULL;--> statement-breakpoint
ALTER TABLE "neighbors" ADD COLUMN "lastName" text;--> statement-breakpoint
ALTER TABLE "neighbors" ADD COLUMN "metadata" jsonb;--> statement-breakpoint
ALTER TABLE "neighbors" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "neighbors" DROP COLUMN "address";--> statement-breakpoint
ALTER TABLE "neighbors" DROP COLUMN "nationality";