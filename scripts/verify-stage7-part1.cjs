const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  fs.mkdirSync('artifacts/stage7-part1', { recursive: true });
  const results = [];
  try {
    for (const width of [375, 768, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://localhost:3100', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2500);
      assert.deepEqual((await page.locator('main > section').evaluateAll(nodes => nodes.map(node => node.id))).slice(0,5), ['top', 'work', 'about', 'experience', 'services']);
      assert.equal(await page.locator('[data-about-part]').count(), 4);
      assert.equal(await page.locator('[data-about-part="work"] li').count(), 3);
      assert.equal(await page.locator('[data-about-part="learning"] li').count(), 4);
      assert.equal(await page.locator('[data-about-part="principles"] li').count(), 3);
      assert.equal(await page.locator('[data-timeline-entry]').count(), 2);
      assert.equal(await page.locator('#education').count(), 1);
      const paragraphs = page.locator('#about [data-line-reveal]');
      assert.equal(await paragraphs.count(), 11);
      for (const paragraph of await paragraphs.all()) {
        await paragraph.scrollIntoViewIfNeeded();
        await page.waitForTimeout(150);
        assert.ok(await paragraph.locator('.about-line').count());
        assert.ok(await paragraph.locator('.reveal-overlay').count());
      }
      for (const card of await page.locator('[data-timeline-entry]').all()) {
        await card.scrollIntoViewIfNeeded();
        await page.waitForTimeout(700);
      }
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForTimeout(200);
      assert.equal(await page.locator('#about .reveal-overlay').count(), 0);
      for (const paragraph of await paragraphs.all()) assert.equal(await paragraph.evaluate(el => getComputedStyle(el).color), 'rgb(235, 80, 2)');
      await page.locator('#about').screenshot({ path: `artifacts/stage7-part1/about-${width}.png` });
      await page.locator('#experience').screenshot({ path: `artifacts/stage7-part1/timeline-${width}.png` });
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.waitForTimeout(300);
      assert.equal(await page.locator('#about .reveal-overlay .reveal-overlay').count(), 0);
      assert.ok(await page.locator('#about .reveal-overlay').count());
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      if (width === 1440) {
        await page.setViewportSize({ width: 375, height: 900 });
        await page.waitForTimeout(600);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        assert.equal(await page.locator('#about .about-line .about-line').count(), 0);
      }
      assert.deepEqual(errors, []);
      results.push({ width, sectionOrder: 'pass', aboutParts: 4, revealParagraphs: 11, timelineEntries: 2, reducedMotion: 'pass', overflow: false, errors });
      await page.close();
    }
    fs.writeFileSync('artifacts/stage7-part1/results.json', JSON.stringify(results, null, 2));
    console.log(JSON.stringify(results, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
