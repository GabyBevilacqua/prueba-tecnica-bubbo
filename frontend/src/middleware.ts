// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const cookie = req.cookies.get("auth")?.value;

    // TO-DO: VALIDACION DE LA COOKIE
    // Si no hay cookie, redirigir al usuario a la página de inicio
    if (!cookie) {
      console.log("error de cookie");
      return NextResponse.redirect(new URL("/", req.url));
    }
  
    return NextResponse.next();
  }

// Si está la cookie correcta el usuario podrá acceder a esta ruta protegida
export const config = {
  matcher: ["/user"],
};
