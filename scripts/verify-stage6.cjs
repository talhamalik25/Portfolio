const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const expected = ['top', 'work', 'experience', 'services', 'about', 'education', 'process', 'stack', 'github', 'journey', 'faq', 'cta', 'contact'];
  const results = [];
  fs.mkdirSync('artifacts/stage6', { recursive: true });
  try {
    for (const width of [375, 768, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://localhost:3100', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2500);
      assert.deepEqual(await page.locator('main > section').evaluateAll(items => items.map(item => item.id)), expected);
      assert.equal(await page.locator('#testimonials').count(), 0);
      assert.equal(await page.locator('#github article').count(), 5);
      for (const id of ['experience', 'education', 'process', 'github', 'faq', 'cta']) {
        const section = page.locator('#' + id);
        await section.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        assert.equal(await section.evaluate(el => el.scrollWidth > el.clientWidth), false, id + ' overflow');
        await section.screenshot({ path: `artifacts/stage6/${id}-${width}.png` });
      }
      const summaries = page.locator('#faq summary');
      await summaries.nth(0).focus();
      await page.keyboard.press('Enter');
      assert.equal(await page.locator('#faq details').nth(0).getAttribute('open'), '');
      await summaries.nth(1).focus();
      await page.keyboard.press('Space');
      assert.equal(await page.locator('#faq details[open]').count(), 1);
      assert.equal(await page.locator('#faq details').nth(1).getAttribute('open'), '');
      if (width < 1024) {
        await page.getByRole('button', { name: 'Open menu' }).click();
        const menu = page.getByRole('navigation', { name: 'Mobile menu' });
        assert.equal(await menu.getByRole('link').count(), 7);
        await menu.getByRole('link', { name: 'Experience' }).click();
        assert.equal(await page.getByRole('button', { name: 'Open menu' }).getAttribute('aria-expanded'), 'false');
        assert.equal(await page.evaluate(() => location.hash), '#experience');
      }
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForTimeout(200);
      for (const id of ['experience', 'education', 'process', 'github', 'faq', 'cta']) {
        const opacity = await page.locator('#' + id + ' [data-reveal]').first().evaluate(el => getComputedStyle(el).opacity);
        assert.equal(opacity, '1', id + ' reduced-motion visibility');
      }
      assert.equal(await page.locator('[data-process-line]').evaluate(el => getComputedStyle(el).transform), 'none');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      assert.deepEqual(errors, []);
      results.push({ width, sectionOrder: 'pass', overflow: false, faqKeyboard: 'pass', reducedMotion: 'pass', errors });
      await page.close();
    }
    fs.writeFileSync('artifacts/stage6/results.json', JSON.stringify(results, null, 2));
    console.log(JSON.stringify(results, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
