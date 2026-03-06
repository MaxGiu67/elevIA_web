import { NextRequest, NextResponse } from 'next/server'

/**
 * Malicious bot user-agents to block.
 * These are scraping tools, headless browsers, and known bad actors.
 * Legitimate bots (Googlebot, Bingbot, social crawlers) are whitelisted below.
 */
const BLOCKED_UA = [
  'scrapy', 'puppeteer', 'headlesschrome', 'phantomjs', 'selenium',
  'python-requests', 'python-urllib', 'httpx', 'aiohttp',
  'node-fetch', 'undici', 'got/',
  'wget', 'curl/',
  'httrack', 'webcopier', 'teleport', 'website-quester',
  'java/', 'libwww-perl', 'mechanize',
  'bytespider', 'megaindex', 'semrushbot', 'ahrefsbot', 'dotbot',
  'mj12bot', 'blexbot', 'seekport', 'zoominfobot',
  'dataforseo', 'webzio', 'fidget-spinner-bot',
]

/**
 * Legitimate bots that must always pass through (SEO + social sharing).
 * Checked BEFORE the block list to avoid false positives.
 */
const ALLOWED_UA = [
  'googlebot', 'google-inspectiontool', 'google-extended',
  'bingbot', 'msnbot', 'bingpreview',
  'facebookexternalhit', 'facebookcatalog',
  'twitterbot',
  'linkedinbot',
  'applebot',
  'slackbot', 'whatsapp', 'telegrambot', 'discordbot',
  'pinterestbot',
  'gptbot', 'chatgpt-user',
  'claudebot', 'claude-web', 'anthropic-ai',
  'perplexitybot',
]

/**
 * In-memory rate limiting (suitable for Railway single-instance).
 * Map<IP, { count, windowStart }>
 */
const rateLimitMap = new Map<string, { count: number; windowStart: number }>()
const WINDOW_MS = 60_000    // 1 minute
const MAX_REQUESTS = 30     // per window per IP
const MAP_CLEANUP = 10_000  // cleanup when map exceeds this size

function checkRateLimit(ip: string, now: number): boolean {
  const record = rateLimitMap.get(ip)

  if (!record || now - record.windowStart > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now })
    return true
  }

  record.count++
  return record.count <= MAX_REQUESTS
}

function cleanupIfNeeded(now: number) {
  if (rateLimitMap.size > MAP_CLEANUP) {
    const cutoff = now - WINDOW_MS
    rateLimitMap.forEach((val, key) => {
      if (val.windowStart < cutoff) rateLimitMap.delete(key)
    })
  }
}

export function middleware(request: NextRequest) {
  const ua = (request.headers.get('user-agent') || '').toLowerCase()
  const now = Date.now()

  // 1. Always allow legitimate bots (SEO, social, AI search)
  if (ua && ALLOWED_UA.some((bot) => ua.includes(bot))) {
    return NextResponse.next()
  }

  // 2. Block known malicious user-agents
  if (ua && BLOCKED_UA.some((bot) => ua.includes(bot))) {
    return new NextResponse(null, { status: 403 })
  }

  // 3. Rate limit by IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown'

  if (!checkRateLimit(ip, now)) {
    return new NextResponse(null, {
      status: 429,
      headers: { 'Retry-After': '60' },
    })
  }

  cleanupIfNeeded(now)

  return NextResponse.next()
}

/**
 * Apply to all routes except static assets and Next.js internals.
 */
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|icon\\.svg|.*\\.png$|.*\\.webp$|.*\\.txt$|.*\\.json$|.*\\.xml$|.*\\.webmanifest$).*)'],
}
