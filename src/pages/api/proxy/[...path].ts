import type { NextApiRequest, NextApiResponse } from "next";

const TARGET = "https://1437931.commercesuite.com.br";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { path = [] } = req.query;

    const fullPath = Array.isArray(path) ? path.join("/") : path;
    const targetUrl = new URL(`${TARGET}/${fullPath}`);

    // Copia todos os query params
    for (const [key, value] of Object.entries(req.query)) {
        if (key !== "path") {
            targetUrl.searchParams.set(key, String(value));
        }
    }

    // Copia headers ORIGINALMENTE enviados pelo cliente
    const headers: Record<string, string> = {};
    for (const [key, value] of Object.entries(req.headers)) {
        if (typeof value === "string" && key !== "host") {
            headers[key] = value;
        }
    }

    // Body
    const body = req.method === "POST" ? Buffer.from(req.body ? JSON.stringify(req.body) : "") : undefined;

    // Faz a requisição, sem seguir redirects automaticamente
    const upstream = await fetch(targetUrl.toString(), {
        method: req.method,
        headers,
        body,
        redirect: "manual",
    });

    // 1. Redirecionamentos da Tray → repassados ao cliente
    const location = upstream.headers.get("location");
    if (location && upstream.status >= 300 && upstream.status < 400) {
        res.setHeader("Location", location.replace(TARGET, "/api/proxy"));
        return res.status(upstream.status).end();
    }

    // 2. Cookies → repassados como recebidos
    const setCookie = upstream.headers.get("set-cookie");
    if (setCookie) {
        res.setHeader("set-cookie", setCookie);
    }

    // 3. Repassa todos os headers da resposta original (exceto alguns)
    upstream.headers.forEach((value, key) => {
        if (!["content-encoding", "transfer-encoding"].includes(key)) {
            res.setHeader(key, value);
        }
    });

    // 4. Se for HTML → envia como texto puro (sem alterar nada)
    const contentType = upstream.headers.get("content-type") ?? "";
    if (contentType.includes("text/html")) {
        const html = await upstream.text();
        return res.status(upstream.status).send(html);
    }

    // 5. Outros tipos → envia buffer puro (js, css, imagens, api etc.)
    const arrayBuffer = await upstream.arrayBuffer();
    return res.status(upstream.status).send(Buffer.from(arrayBuffer));
}
