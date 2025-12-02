import { getRecentMajorOrMinorRelease } from "@/lib/github";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");

  if (!owner || !repo) {
    return NextResponse.json({ error: "Missing owner or repo parameter" }, { status: 400 });
  }

  try {
    const releaseInfo = await getRecentMajorOrMinorRelease(owner, repo);
    return NextResponse.json(releaseInfo);
  } catch (error) {
    console.error(`Failed to fetch release info for ${owner}/${repo}:`, error);
    return NextResponse.json({ error: "Failed to fetch release info" }, { status: 500 });
  }
}

