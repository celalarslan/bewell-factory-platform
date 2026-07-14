CREATE TYPE "public"."analysis_language" AS ENUM('tr', 'en', 'ar');--> statement-breakpoint
CREATE TYPE "public"."analysis_mode" AS ENUM('single', 'review_panel');--> statement-breakpoint
CREATE TYPE "public"."analysis_status" AS ENUM('pending', 'running', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."audit_actor_type" AS ENUM('user', 'specialist', 'system');--> statement-breakpoint
CREATE TYPE "public"."evidence_priority" AS ENUM('low', 'medium', 'high', 'critical');--> statement-breakpoint
CREATE TYPE "public"."evidence_status" AS ENUM('open', 'requested', 'received', 'verified', 'rejected', 'closed');--> statement-breakpoint
CREATE TYPE "public"."executive_decision" AS ENUM('pending', 'approved', 'evidence_requested', 'rejected', 'deferred');--> statement-breakpoint
CREATE TYPE "public"."project_assumption_status" AS ENUM('active', 'verified', 'rejected', 'replaced');--> statement-breakpoint
CREATE TYPE "public"."project_fact_status" AS ENUM('proposed', 'approved', 'disputed', 'superseded');--> statement-breakpoint
CREATE TYPE "public"."project_risk_level" AS ENUM('low', 'medium', 'high', 'critical');--> statement-breakpoint
CREATE TYPE "public"."project_risk_status" AS ENUM('open', 'monitoring', 'mitigated', 'accepted', 'closed');--> statement-breakpoint
CREATE TYPE "public"."project_status" AS ENUM('draft', 'qualification', 'feasibility', 'structuring', 'approved', 'implementation', 'operational', 'on_hold', 'archived');--> statement-breakpoint
CREATE TABLE "analysis_runs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid,
	"specialist_id" text NOT NULL,
	"mode" "analysis_mode" NOT NULL,
	"language" "analysis_language" NOT NULL,
	"task" text NOT NULL,
	"project_context" text NOT NULL,
	"status" "analysis_status" DEFAULT 'pending' NOT NULL,
	"summary" text,
	"result_json" jsonb,
	"error_code" text,
	"duration_ms" integer,
	"model" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "audit_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid,
	"event_type" text NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" uuid,
	"actor_type" "audit_actor_type" NOT NULL,
	"actor_id" text,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "evidence_requirements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"category" text,
	"priority" "evidence_priority" DEFAULT 'medium' NOT NULL,
	"status" "evidence_status" DEFAULT 'open' NOT NULL,
	"responsible_party" text,
	"due_date" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"resolved_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "executive_decisions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"decision" "executive_decision" DEFAULT 'pending' NOT NULL,
	"rationale" text,
	"decided_by" text,
	"decided_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project_assumptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"statement" text NOT NULL,
	"status" "project_assumption_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"resolved_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "project_facts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"category" text NOT NULL,
	"key" text NOT NULL,
	"value" text NOT NULL,
	"unit" text,
	"status" "project_fact_status" DEFAULT 'proposed' NOT NULL,
	"source" text,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project_risks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"category" text,
	"level" "project_risk_level" DEFAULT 'medium' NOT NULL,
	"probability" integer,
	"impact" integer,
	"mitigation" text,
	"owner" text,
	"status" "project_risk_status" DEFAULT 'open' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"closed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text,
	"name" text NOT NULL,
	"country" text,
	"sector" text,
	"client_organization" text,
	"description" text,
	"status" "project_status" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"archived_at" timestamp with time zone,
	CONSTRAINT "projects_code_unique" UNIQUE("code")
);
--> statement-breakpoint
ALTER TABLE "analysis_runs" ADD CONSTRAINT "analysis_runs_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_events" ADD CONSTRAINT "audit_events_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evidence_requirements" ADD CONSTRAINT "evidence_requirements_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "executive_decisions" ADD CONSTRAINT "executive_decisions_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_assumptions" ADD CONSTRAINT "project_assumptions_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_facts" ADD CONSTRAINT "project_facts_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_risks" ADD CONSTRAINT "project_risks_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "analysis_runs_project_idx" ON "analysis_runs" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "audit_events_project_idx" ON "audit_events" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "evidence_requirements_project_idx" ON "evidence_requirements" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "executive_decisions_project_idx" ON "executive_decisions" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "project_assumptions_project_idx" ON "project_assumptions" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "project_facts_project_key_idx" ON "project_facts" USING btree ("project_id","key");--> statement-breakpoint
CREATE INDEX "project_risks_project_idx" ON "project_risks" USING btree ("project_id");