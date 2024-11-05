ALTER TABLE "post" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "content" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;