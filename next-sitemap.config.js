/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://oryaatelier.com',
    generateRobotsTxt: true,
    changefreq: 'daily',
    priority: 0.7,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: [
                    '/',
                    '/categories/*',
                    '/collections/*',
                    '/product/*',
                    '/line/*',
                    '/contact',
                    '/about',
                    '/privacy',
                    '/products',
                    '/cuidados-e-garantia',
                    '/faq',
                    '/tamanhos',
                    '/troca-e-devolucao'
                ],
                disallow: [
                    '/auth',
                    '/construcao',
                    '/me',
                    '/api'
                ]
            }
        ],
    },
    transform: async (config, path) => {
        if (path.startsWith('/auth') ||
            path.startsWith('/construcao') ||
            path.startsWith('/me') ||
            path.startsWith('/api')
        ) return null
        let priority = config.priority

        if (path === '/') {
            priority = 1.0
        }
        if (path === '/products') {
            priority = 0.9
        }
        if (path === '/about') {
            priority = 0.8
        }

        return {
            loc: path,
            changefreq: config.changefreq,
            priority,
            lastmod: new Date().toISOString()
        }
    }
};
