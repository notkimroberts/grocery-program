ALTER TABLE "delivery_routes" RENAME TO "deliveryRoutes";--> statement-breakpoint
ALTER TABLE "deliveryRoutes" DROP CONSTRAINT "delivery_routes_route_number_unique";--> statement-breakpoint
ALTER TABLE "neighborRoutes" DROP CONSTRAINT "neighborRoutes_route_id_delivery_routes_id_fk";
--> statement-breakpoint
ALTER TABLE "neighborRoutes" ADD CONSTRAINT "neighborRoutes_route_id_deliveryRoutes_id_fk" FOREIGN KEY ("route_id") REFERENCES "public"."deliveryRoutes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deliveryRoutes" ADD CONSTRAINT "deliveryRoutes_route_number_unique" UNIQUE("route_number");