import Cap from "cap-widget";
import { CAP_SITE, CAP_URL } from "astro:env/client";

const cap = new Cap({
  apiEndpoint: `${CAP_URL}/${CAP_SITE}`,
});

export class CaptchaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CaptchaError";
  }
}

export async function solveCaptcha() {
  try {
    const solution = await cap.solve();

    if (!solution.success) {
      throw new CaptchaError("Challenge failed");
    }

    return solution;
  } catch (error) {
    if (error instanceof Error) {
      throw new CaptchaError(error.message);
    }

    throw new CaptchaError("Unknown captcha error");
  }
}

export function resetCaptcha() {
  cap.reset();
}