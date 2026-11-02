const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
(async () => {
  fs.mkdirSync('artifacts/stage7-part3', { recursive: true });
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const results = [];
  try {
    for (const width of [375, 768, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://localhost:3100', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2500);
      const section = page.locator('#process');
      const panels = section.locator('[data-process-phase]');
      const phases = ['understand', 'design', 'build', 'launch'];
      assert.equal(await panels.count(), 4);
      for (const panel of await panels.all()) assert.equal(await panel.locator('ul > li').count(), 3);
      const ids = await page.locator('main > section').evaluateAll(nodes => nodes.map(node => node.id));
      assert.equal(ids.indexOf('process'), ids.indexOf('stack') + 1);
      if (width === 1440) {
        assert.equal(await section.locator('[data-process-pinned]').count(), 1);
        assert.equal(await section.locator('.pin-spacer').count(), 1);
        for (const phase of phases) {
          const title = phase[0].toUpperCase() + phase.slice(1);
          const button = section.getByRole('button', { name: title, exact: true });
          await button.focus(); await page.keyboard.press('Enter'); await page.waitForTimeout(850);
          assert.equal(await button.getAttribute('aria-current'), 'step');
          const panel = section.locator('[data-process-phase="' + phase + '"]');
          assert.equal(await panel.evaluate(el => getComputedStyle(el).visibility), 'visible');
          assert.equal(await panel.evaluate(el => getComputedStyle(el).opacity), '1');
          const bounds = await section.locator('[data-process-pinned]').boundingBox();
          assert.ok(bounds.y >= 105 && bounds.y <= 115, JSON.stringify(bounds));
          assert.ok(bounds.y + bounds.height <= 900);
          await page.screenshot({ path: 'artifacts/stage7-part3/' + phase + '-1440.png' });
        }
        await section.getByRole('button', { name: 'Understand', exact: true }).click();
        await page.waitForTimeout(850);
        assert.equal(await section.locator('[data-process-phase="understand"]').evaluate(el => getComputedStyle(el).opacity), '1');
        await page.emulateMedia({ reducedMotion: 'reduce' }); await page.waitForTimeout(300);
        assert.equal(await section.locator('.pin-spacer').count(), 0);
        assert.equal(await section.locator('[data-process-pinned]').count(), 0);
        assert.equal(await section.locator('[data-process-panels]').getAttribute('aria-hidden'), null);
        for (const panel of await panels.all()) assert.equal(await panel.evaluate(el => getComputedStyle(el).visibility), 'visible');
        await page.emulateMedia({ reducedMotion: 'no-preference' }); await page.waitForTimeout(500);
        assert.equal(await section.locator('.pin-spacer').count(), 1);
        await page.setViewportSize({ width: 375, height: 900 }); await page.waitForTimeout(500);
        assert.equal(await section.locator('.pin-spacer').count(), 0);
        for (const panel of await panels.all()) assert.equal(await panel.evaluate(el => getComputedStyle(el).opacity), '1');
        await page.setViewportSize({ width: 1440, height: 650 }); await page.waitForTimeout(300);
        assert.equal(await section.locator('.pin-spacer').count(), 0);
      } else {
        assert.equal(await section.locator('.pin-spacer').count(), 0);
        for (const panel of await panels.all()) {
          await panel.scrollIntoViewIfNeeded();
          assert.equal(await panel.evaluate(el => getComputedStyle(el).opacity), '1');
        }
        await section.screenshot({ path: 'artifacts/stage7-part3/stacked-' + width + '.png' });
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      assert.equal((await section.innerText()).includes('[FILL'), false);
      assert.deepEqual(errors, []);
      results.push({ width, pin: width === 1440 ? 'pass: four phases, reverse, keyboard and teardown' : 'static flow', tags: '3 per phase', overflow: false, errors });
      await page.close();
    }
    fs.writeFileSync('artifacts/stage7-part3/results.json', JSON.stringify(results, null, 2));
    console.log(JSON.stringify(results, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
