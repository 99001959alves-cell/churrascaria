import test from 'node:test';
import assert from 'node:assert/strict';
import {
  sanitizePhoneDigits,
  formatIsoDateToBr,
  validateReservationInput,
  buildWhatsAppReservationUrl,
  formatEditablePrice,
  filterMenuItems,
  wrapGalleryIndex,
  buildStandaloneExportHtml,
  type MenuItemData,
  type SiteConfig,
} from './site-logic';

test('sanitizePhoneDigits normalizes Brazilian phone inputs', () => {
  assert.equal(sanitizePhoneDigits('(11) 99842-3100'), '5511998423100');
  assert.equal(sanitizePhoneDigits('+55 11 99842-3100'), '5511998423100');
  assert.equal(sanitizePhoneDigits(''), '');
});

test('formatIsoDateToBr converts YYYY-MM-DD to DD/MM/YYYY', () => {
  assert.equal(formatIsoDateToBr('2026-11-20'), '20/11/2026');
  assert.equal(formatIsoDateToBr('invalid'), 'invalid');
});

test('validateReservationInput catches missing name and invalid guest counts', () => {
  const invalid = validateReservationInput({
    name: ' ',
    date: '',
    time: '20:00',
    guests: '0',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.date);
  assert.ok(invalid.errors.guests);

  const valid = validateReservationInput({
    name: 'Carlos Eduardo',
    date: '2026-11-22',
    time: '20:00',
    guests: '4',
    notes: 'Mesa próxima à janela',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('buildWhatsAppReservationUrl creates encoded wa.me URL for quick and detailed reservations', () => {
  const quickUrl = buildWhatsAppReservationUrl('(11) 99842-3100', 'Fogo Nobre');
  assert.ok(quickUrl.startsWith('https://wa.me/5511998423100?text='));
  assert.ok(decodeURIComponent(quickUrl).includes('Fogo Nobre'));

  const detailedUrl = buildWhatsAppReservationUrl('5511998423100', 'Fogo Nobre', {
    name: 'Mariana Silva',
    date: '2026-11-25',
    time: '19:30',
    guests: '6',
    notes: 'Aniversário',
  });
  const decoded = decodeURIComponent(detailedUrl);
  assert.ok(decoded.includes('Mariana Silva'));
  assert.ok(decoded.includes('25/11/2026'));
  assert.ok(decoded.includes('19:30'));
  assert.ok(decoded.includes('6'));
  assert.ok(decoded.includes('Aniversário'));
});

test('formatEditablePrice returns Sob consulta when empty and preserves custom values', () => {
  assert.equal(formatEditablePrice(''), 'Sob consulta');
  assert.equal(formatEditablePrice('   '), 'Sob consulta');
  assert.equal(formatEditablePrice(' R$ 149,90 '), 'R$ 149,90');
});

test('filterMenuItems returns full list or specific category items', () => {
  const sample: MenuItemData[] = [
    { id: 'picanha', category: 'carnes', categoryLabel: 'Carnes', name: 'Picanha', description: '', imageKey: 'k1', price: '' },
    { id: 'arroz', category: 'acompanhamentos', categoryLabel: 'Acomp.', name: 'Arroz branco', description: '', imageKey: 'k2', price: '' },
    { id: 'cervejas', category: 'bebidas', categoryLabel: 'Bebidas', name: 'Cervejas', description: '', imageKey: 'k3', price: '' },
  ];
  assert.equal(filterMenuItems(sample, 'todos').length, 3);
  assert.equal(filterMenuItems(sample, 'carnes').length, 1);
  assert.equal(filterMenuItems(sample, 'bebidas')[0].id, 'cervejas');
});

test('wrapGalleryIndex wraps cleanly in both directions', () => {
  assert.equal(wrapGalleryIndex(0, -1, 6), 5);
  assert.equal(wrapGalleryIndex(5, 1, 6), 0);
  assert.equal(wrapGalleryIndex(2, 1, 6), 3);
});

test('buildStandaloneExportHtml injects updated config safely and marks data-published true', () => {
  const baseHtml = `<!doctype html><html lang="pt-BR" data-published="false"><head></head><body><script id="site-config" type="application/json">{"contact":{},"prices":{}}</script></body></html>`;
  const config: SiteConfig = {
    contact: {
      restaurantName: 'Fogo Nobre',
      whatsappDigits: '5511998423100',
      phoneDisplay: '(11) 3421-8890',
      address: 'Alameda Lorena, 1480 — Jardins, São Paulo - SP',
      hoursWeekdays: 'Terça a Sexta: 11h30 às 15h30 e 18h30 às 23h',
      hoursWeekends: 'Sábados, Domingos e Feriados: 11h30 às 23h',
      instagramUrl: 'https://instagram.com/fogonobrechurrascaria',
      facebookUrl: 'https://facebook.com/fogonobrechurrascaria',
      mapsQuery: 'Alameda Lorena, 1480, Jardins, Sao Paulo, SP',
    },
    prices: {
      picanha: 'R$ 148,00',
      costela: '</script><script>alert(1)</script>',
    },
  };

  const exported = buildStandaloneExportHtml(baseHtml, config);
  assert.ok(exported.includes('data-published="true"'));
  assert.ok(exported.includes('R$ 148,00'));
  assert.ok(!exported.includes('</script><script>alert(1)</script>'));
  assert.ok(exported.includes('\\u003c/script\\u003e'));
});
