import { NextRequest } from "next/server";
import { createDossierItem, listDossierItems } from "@/lib/projects/dossier-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
type Context = { params: Promise<{ id: string }> };
export function GET(request: NextRequest, context: Context) { return listDossierItems(request, context, "risks"); }
export function POST(request: NextRequest, context: Context) { return createDossierItem(request, context, "risks"); }
