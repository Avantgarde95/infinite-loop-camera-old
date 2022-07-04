export function isBrowser() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

export function isInApp() {
  if (!isBrowser()) {
    return false;
  }

  const userAgent: string =
    navigator.userAgent || navigator.vendor || (window as any).opera;

  return (
    // KakaoTalk.
    userAgent.indexOf("KAKAO") >= 0 ||
    // Facebook.
    userAgent.indexOf("[FB") >= 0 ||
    // Instagram.
    userAgent.indexOf("Instagram") >= 0 ||
    // TikTok.
    userAgent.indexOf("trill") >= 0
  );
}
