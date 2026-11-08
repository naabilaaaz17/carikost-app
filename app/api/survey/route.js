import { addSurvey } from "../../../lib/survey-store";
import { validateSurvey } from "../../../lib/validation";

// POST /api/survey
//  201 -> pengajuan tersimpan
//  400 -> JSON rusak / data tidak valid ({ error, fields })
//  409 -> nomor HP sudah pernah mengajukan
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Body harus berupa JSON yang valid.", fields: {} }, { status: 400 });
  }

  const result = validateSurvey(body);
  if (!result.ok) {
    return Response.json({ error: result.message, fields: result.errors }, { status: 400 });
  }

  const saved = addSurvey(result.data);
  if (saved.duplicate) {
    return Response.json(
      { error: "Nomor HP ini sudah mengajukan survei. Tim kami akan segera menghubungimu." },
      { status: 409 },
    );
  }

  return Response.json({ message: "Pengajuan survei diterima.", data: saved.record }, { status: 201 });
}