// src/middleware.ts
import type { MiddlewareHandler } from 'astro';
import CryptoJS from 'crypto-js';
import { UAParser } from 'ua-parser-js';
import { supabase } from './lib/supabase';

const getClientIp = (request: Request): string => {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const cf = request.headers.get('cf-connecting-ip');
  if (cf) return cf;
  return 'unknown';
};

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { request } = context;
  const url = new URL(request.url);

  const ip = getClientIp(request);
  const hashedIp = CryptoJS.SHA256(ip + Date.now().toString()).toString();
  const userAgent = request.headers.get('user-agent') || '';
  const referrer = request.headers.get('referer') || '';
  const page = url.pathname;
  const collaborator = url.searchParams.get('ref') || null;

  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  const device = result.device.type || 'Desktop';
  const os = result.os.name || 'Unknown';
  const browser = result.browser.name || 'Unknown';

  if (userAgent.toLowerCase().includes('bot') || ip === '127.0.0.1') {
    return next();
  }

  try {
    await supabase.from('visits').insert({
      ip: ip.replace(/\d{1,3}$/, '***'),
      hashed_ip: hashedIp,
      user_agent: userAgent,
      device,
      os,
      browser,
      page,
      referrer,
      collaborator
    });
  } catch (err) {
    console.error('Error en middleware:', err);
  }

  return next();
};