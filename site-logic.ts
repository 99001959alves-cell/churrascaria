export type MenuCategory = 'todos' | 'carnes' | 'acompanhamentos' | 'bebidas';

export interface MenuItemData {
  id: string;
  category: Exclude<MenuCategory, 'todos'>;
  categoryLabel: string;
  name: string;
  description: string;
  imageKey: string;
  price: string;
}

export interface SiteContactConfig {
  restaurantName: string;
  whatsappDigits: string;
  phoneDisplay: string;
  address: string;
  hoursWeekdays: string;
  hoursWeekends: string;
  instagramUrl: string;
  facebookUrl: string;
  mapsQuery: string;
}

export interface SiteConfig {
  contact: SiteContactConfig;
  prices: Record<string, string>;
}

export interface ReservationInput {
  name: string;
  date: string;
  time: string;
  guests: string;
  notes?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ReservationInput, string>>;
}

export function sanitizePhoneDigits(raw: string): string {
  const digits = (raw || '').replace(/\D+/g, '');
  if (!digits) return '';
  if (digits.length === 10 || digits.length === 11) {
    return `55${digits}`;
  }
  return digits;
}

export function formatIsoDateToBr(isoDate: string): string {
  if (!isoDate || !/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return isoDate;
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
}

export function validateReservationInput(input: ReservationInput): ValidationResult {
  const errors: Partial<Record<keyof ReservationInput, string>> = {};
  const trimmedName = (input.name || '').trim();
  if (trimmedName.length < 2) {
    errors.name = 'Informe seu nome completo para agilizar a reserva.';
  }
  if (!input.date || !/^\d{4}-\d{2}-\d{2}$/.test(input.date)) {
    errors.date = 'Selecione uma data válida.';
  }
  if (!input.time || !/^\d{2}:\d{2}$/.test(input.time)) {
    errors.time = 'Selecione um horário disponível.';
  }
  const guestsNum = Number(input.guests);
  if (!Number.isFinite(guestsNum) || guestsNum < 1 || guestsNum > 40) {
    errors.guests = 'Informe entre 1 e 40 pessoas.';
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildWhatsAppReservationUrl(
  whatsappDigits: string,
  restaurantName: string,
  details?: Partial<ReservationInput>
): string {
  const cleanDigits = sanitizePhoneDigits(whatsappDigits) || '5511998423100';
  const name = (details?.name || '').trim();
  const date = details?.date ? formatIsoDateToBr(details.date) : '';
  const time = (details?.time || '').trim();
  const guests = (details?.guests || '').trim();
  const notes = (details?.notes || '').trim();

  let message = `Olá! Gostaria de fazer uma reserva na ${restaurantName}.`;
  if (name || date || time || guests) {
    const lines = [`Olá! Gostaria de solicitar uma reserva na ${restaurantName}:`];
    if (name) lines.push(`• Nome: ${name}`);
    if (date) lines.push(`• Data: ${date}`);
    if (time) lines.push(`• Horário: ${time}`);
    if (guests) lines.push(`• Pessoas: ${guests}`);
    if (notes) lines.push(`• Observações: ${notes}`);
    message = lines.join('\n');
  }
  return `https://wa.me/${cleanDigits}?text=${encodeURIComponent(message)}`;
}

export function formatEditablePrice(raw: string): string {
  const cleaned = (raw || '').trim();
  return cleaned.length > 0 ? cleaned : 'Sob consulta';
}

export function filterMenuItems(
  items: MenuItemData[],
  category: MenuCategory
): MenuItemData[] {
  if (category === 'todos') return items;
  return items.filter((item) => item.category === category);
}

export function wrapGalleryIndex(
  current: number,
  delta: number,
  total: number
): number {
  if (total <= 0) return 0;
  return ((current + delta) % total + total) % total;
}

export function escapeJsonForScriptTag(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

export function buildStandaloneExportHtml(
  sourceHtml: string,
  updatedConfig: SiteConfig
): string {
  const safeJson = escapeJsonForScriptTag(updatedConfig);

  let html = sourceHtml.replace(
    /<script\s+id="site-config"\s+type="application\/json">[\s\S]*?<\/script>/,
    `<script id="site-config" type="application/json">${safeJson}</script>`
  );

  if (/<html([^>]*)data-published="[^"]*"([^>]*)>/.test(html)) {
    html = html.replace(
      /<html([^>]*)data-published="[^"]*"([^>]*)>/,
      '<html$1data-published="true"$2>'
    );
  } else {
    html = html.replace(/<html([^>]*)>/, '<html$1 data-published="true">');
  }

  return html;
}
