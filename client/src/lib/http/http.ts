import { envConfig } from "@/config/envConfig";
import { HttpError } from "@/lib/http/errors";
import { getAccessToken } from "@/lib/http/getAccessToken";
import { redirect } from "next/navigation";

type Options = {
    headers?: HeadersInit;
    cache?: RequestCache;
    next?: NextFetchRequestConfig;
    base?: "backend" | "next";
};

const baseURL = envConfig.apiUrl;

async function request<T>(
    url: string,
    config: RequestInit & Options,
): Promise<T> {
    const { base = "backend" } = config;

    let fullUrl = url;

    if (!url.startsWith("http")) {
        fullUrl = base === "backend" ? `${baseURL}${url}` : url;
    }

    // ! Lấy token
    const token = await getAccessToken();

    const isFormData = config.body instanceof FormData;

    const res = await fetch(fullUrl, {
        ...config,
        credentials: "include",
        headers: {
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
            ...(token && {
                Authorization: `Bearer ${token}`,
            }),
            ...config.headers,
        },
    });

    const contentType = res.headers.get("content-type");

    let data: unknown = null;

    if (contentType?.includes("application/json")) {
        data = await res.json();
    } else {
        data = await res.text();
    }

    if (!res.ok) {
        if (res.status === 401) {
            if (data?.data?.code === "UNAUTHORIZED") {
                if (typeof window !== "undefined") {
                    window.location.href = "/logout";
                } else {
                    redirect("/logout" as any);
                }
            }
        }

        throw new HttpError(
            data?.data?.message ||
                data?.message ||
                res.statusText ||
                "Request failed",
            res.status,
            data,
        );
    }

    return data as T;
}

export const http = {
    get: <T>(url: string, options?: Options) =>
        request<T>(url, {
            method: "GET",
            cache: options?.cache ?? "no-store",
            ...options,
        }),

    post: <T>(url: string, body?: unknown, options?: Options) =>
        request<T>(url, {
            method: "POST",
            body:
                body instanceof FormData
                    ? body
                    : body
                      ? JSON.stringify(body)
                      : undefined,
            cache: options?.cache ?? "no-store",
            ...options,
        }),

    put: <T>(url: string, body?: unknown, options?: Options) =>
        request<T>(url, {
            method: "PUT",
            body: body ? JSON.stringify(body) : undefined,
            cache: options?.cache ?? "no-store",
            ...options,
        }),

    patch: <T>(url: string, body?: unknown, options?: Options) =>
        request<T>(url, {
            method: "PATCH",
            body: body ? JSON.stringify(body) : undefined,
            cache: options?.cache ?? "no-store",
            ...options,
        }),

    delete: <T>(url: string, body?: unknown, options?: Options) =>
        request<T>(url, {
            method: "DELETE",
            body: body ? JSON.stringify(body) : undefined,
            cache: options?.cache ?? "no-store",
            ...options,
        }),
};
