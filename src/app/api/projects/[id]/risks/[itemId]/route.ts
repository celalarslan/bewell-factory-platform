import { NextRequest } from "next/server";
import { archiveDossierItem, updateDossierItem } from "@/lib/projects/dossier-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
type Context = { params: Promise<{ id: string; itemId: string }> };
export function PATCH(request: NextRequest, context: Context) { return updateDossierItem(request, context, "risks"); }
export function DELETE(request: NextRequest, context: Context) { return archiveDossierItem(request, context, "risks"); }
