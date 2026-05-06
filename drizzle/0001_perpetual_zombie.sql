CREATE TABLE "exercise" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "exercise_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"public_id" varchar(12) NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" text NOT NULL,
	CONSTRAINT "exercise_public_id_unique" UNIQUE("public_id")
);
--> statement-breakpoint
CREATE TABLE "set" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "set_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"public_id" varchar(12) NOT NULL,
	"reps" integer NOT NULL,
	"weight" integer NOT NULL,
	"order" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"workout_exercise_id" bigint NOT NULL,
	CONSTRAINT "set_public_id_unique" UNIQUE("public_id")
);
--> statement-breakpoint
CREATE TABLE "workout" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "workout_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"public_id" varchar(12) NOT NULL,
	"title" varchar(255) NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"finished_at" timestamp with time zone,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" text NOT NULL,
	CONSTRAINT "workout_public_id_unique" UNIQUE("public_id")
);
--> statement-breakpoint
CREATE TABLE "workout_exercise" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "workout_exercise_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"public_id" varchar(12) NOT NULL,
	"order" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"workout_id" bigint NOT NULL,
	"exercise_id" bigint NOT NULL,
	CONSTRAINT "workout_exercise_public_id_unique" UNIQUE("public_id")
);
--> statement-breakpoint
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "set" ADD CONSTRAINT "set_workout_exercise_id_workout_exercise_id_fk" FOREIGN KEY ("workout_exercise_id") REFERENCES "public"."workout_exercise"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workout" ADD CONSTRAINT "workout_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workout_exercise" ADD CONSTRAINT "workout_exercise_workout_id_workout_id_fk" FOREIGN KEY ("workout_id") REFERENCES "public"."workout"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workout_exercise" ADD CONSTRAINT "workout_exercise_exercise_id_exercise_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercise"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "exercise_user_name_idx" ON "exercise" USING btree ("user_id","name");--> statement-breakpoint
CREATE INDEX "set_workout_exercise_id_idx" ON "set" USING btree ("workout_exercise_id");--> statement-breakpoint
CREATE UNIQUE INDEX "set_workout_exercise_id_order_uniq" ON "set" USING btree ("workout_exercise_id","order");--> statement-breakpoint
CREATE INDEX "workout_user_id_idx" ON "workout" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "workout_exercise_workout_id_order_uniq" ON "workout_exercise" USING btree ("workout_id","order");--> statement-breakpoint
CREATE INDEX "workout_exercise_exercise_id_idx" ON "workout_exercise" USING btree ("exercise_id");