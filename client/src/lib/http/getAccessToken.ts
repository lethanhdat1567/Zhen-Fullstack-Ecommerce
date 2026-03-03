export async function getAccessToken(): Promise<string | null> {
    // CLIENT SIDE
    if (typeof window !== "undefined") {
        const raw = localStorage.getItem("auth-storage");

        if (!raw) return null;

        try {
            const parsed = JSON.parse(raw);
            return parsed?.state?.accessToken ?? null;
        } catch {
            return null;
        }
    }

    // SERVER SIDE
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("access_token")?.value;

    return accessToken || null;
}
