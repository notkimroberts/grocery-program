CREATE TABLE "deliveries" (
	"id" bigint PRIMARY KEY NOT NULL,
	"neighbor_id" bigint,
	"programDate" date NOT NULL,
	"received" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "delivery_routes" (
	"id" bigint PRIMARY KEY NOT NULL,
	"route_number" integer NOT NULL,
	CONSTRAINT "delivery_routes_route_number_unique" UNIQUE("route_number")
);
--> statement-breakpoint
CREATE TABLE "neighborRoutes" (
	"id" bigint PRIMARY KEY NOT NULL,
	"neighbor_id" bigint,
	"route_id" bigint
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
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_neighbor_id_neighbors_id_fk" FOREIGN KEY ("neighbor_id") REFERENCES "public"."neighbors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "neighborRoutes" ADD CONSTRAINT "neighborRoutes_neighbor_id_neighbors_id_fk" FOREIGN KEY ("neighbor_id") REFERENCES "public"."neighbors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "neighborRoutes" ADD CONSTRAINT "neighborRoutes_route_id_delivery_routes_id_fk" FOREIGN KEY ("route_id") REFERENCES "public"."delivery_routes"("id") ON DELETE no action ON UPDATE no action;