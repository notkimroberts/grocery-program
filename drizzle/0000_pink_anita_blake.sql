CREATE TABLE "deliveries" (
	"id" bigint PRIMARY KEY NOT NULL,
	"neighborId" bigint,
	"programDate" date NOT NULL,
	"received" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "deliveryRoutes" (
	"id" bigint PRIMARY KEY NOT NULL,
	"routeNumber" integer NOT NULL,
	CONSTRAINT "deliveryRoutes_routeNumber_unique" UNIQUE("routeNumber")
);
--> statement-breakpoint
CREATE TABLE "neighborRoutes" (
	"id" bigint PRIMARY KEY NOT NULL,
	"neighborId" bigint,
	"routeId" bigint
);
--> statement-breakpoint
CREATE TABLE "neighbors" (
	"id" bigint PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"phone" text,
	"address" text,
	"nationality" text,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expiresAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"passwordHash" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_neighborId_neighbors_id_fk" FOREIGN KEY ("neighborId") REFERENCES "public"."neighbors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "neighborRoutes" ADD CONSTRAINT "neighborRoutes_neighborId_neighbors_id_fk" FOREIGN KEY ("neighborId") REFERENCES "public"."neighbors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "neighborRoutes" ADD CONSTRAINT "neighborRoutes_routeId_deliveryRoutes_id_fk" FOREIGN KEY ("routeId") REFERENCES "public"."deliveryRoutes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;