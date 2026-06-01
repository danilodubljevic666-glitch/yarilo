import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const COOKIE_NAME = "admin_access";
const SECRET_KEY  = process.env.ADMIN_SECRET_KEY ?? "";

export async function updateSession(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // ── Secret key gate ────────────────────────────────────────────────────────
  // Anyone hitting /admin/* must either:
  //   (a) have the admin_access cookie (already unlocked), OR
  //   (b) be visiting /admin/login?k=SECRET  (to set the cookie)
  // Everyone else gets a 404.

  const hasCookie = request.cookies.get(COOKIE_NAME)?.value === SECRET_KEY;
  const providedKey = searchParams.get("k");
  const isLoginPage = pathname === "/admin/login";

  if (!hasCookie) {
    if (isLoginPage && providedKey === SECRET_KEY) {
      // Valid secret key — set the cookie and continue to login page
      const response = NextResponse.next({ request });
      response.cookies.set(COOKIE_NAME, SECRET_KEY, {
        httpOnly: true,
        sameSite: "lax",
        path: "/admin",
        // No maxAge = session cookie (gone when browser closes)
      });
      return response;
    }

    // No cookie, no valid key → 404 (looks like the page doesn't exist)
    return new NextResponse(null, { status: 404 });
  }

  // ── Supabase session check ─────────────────────────────────────────────────

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Protect all /admin routes except /admin/login
  if (!isLoginPage && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // Redirect logged-in users away from login page
  if (isLoginPage && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
