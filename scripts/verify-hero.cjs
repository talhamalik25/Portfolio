const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  fs.mkdirSync('artifacts/hero', { recursive: true });

  try {
    for (const width of [375, 768, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));

      await page.goto('http://localhost:3100', { waitUntil: 'networkidle' });

      // Check no page errors
      assert.deepEqual(errors, [], `Unexpected page errors at width ${width}: ${errors.join(', ')}`);

      // Check no horizontal overflow
      const overflow = await page.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
        };
      });
      assert.equal(overflow.hasOverflow, false, `Horizontal overflow detected at ${width}px: scrollWidth ${overflow.scrollWidth} > clientWidth ${overflow.clientWidth}`);

      // Verify Hero section landmark & semantic structure
      const hero = page.locator('section#top[aria-label="Introduction"]');
      await hero.waitFor({ state: 'visible' });

      // Verify kicker
      const kicker = hero.locator('header');
      await kicker.waitFor({ state: 'visible' });
      const kickerText = (await kicker.innerText()).toLowerCase();
      assert.ok(kickerText.includes('introduction'), 'Missing introduction in kicker');

      // Verify Primary Identity: TALHA MALIK
      const title = hero.locator('[data-hero-title]');
      await title.waitFor({ state: 'visible' });
      assert.equal((await title.innerText()).trim(), 'TALHA MALIK');

      // Verify Supporting Title: Full-Stack Developer & Creative Engineer
      const subtitle = hero.locator('[data-hero-subtitle]');
      await subtitle.waitFor({ state: 'visible' });
      const subtitleText = (await subtitle.innerText()).toLowerCase();
      assert.ok(subtitleText.includes('full-stack developer'), 'Missing full-stack developer in subtitle');
      assert.ok(subtitleText.includes('creative engineer'), 'Missing creative engineer in subtitle');

      // Verify Supporting Statement: "I design and engineer digital products for the real world."
      const statement = hero.locator('[data-hero-statement]');
      await statement.waitFor({ state: 'visible' });
      const statementText = (await statement.innerText()).toLowerCase();
      assert.ok(statementText.includes('i design and engineer digital products for the real world'), 'Missing statement');

      // Verify 3D Laptop Workspace stage exists
      const workspace = hero.locator('[data-hero-workspace]');
      await workspace.waitFor({ state: 'visible' });

      // Wait 1.5 seconds for WebGL scene and texture to stabilize
      await page.waitForTimeout(1500);

      // Verify CTAs
      const contactBtn = hero.locator('a[href="#contact"]');
      const workBtn = hero.locator('a[href="#work"]');
      await contactBtn.waitFor({ state: 'visible' });
      await workBtn.waitFor({ state: 'visible' });
      assert.ok((await contactBtn.innerText()).toLowerCase().includes('contact me'));
      assert.ok((await workBtn.innerText()).toLowerCase().includes('view work'));

      // Verify Scroll link
      const scrollLink = hero.locator('a[href="#about"]');
      await scrollLink.waitFor({ state: 'visible' });

      // Pointer test on desktop
      if (width === 1440) {
        await page.mouse.move(300, 400);
        await page.waitForTimeout(200);
        await page.mouse.move(900, 450);
        await page.waitForTimeout(200);
        await workBtn.hover();
        await page.waitForTimeout(200);
      }

      // Capture screenshot
      await hero.screenshot({ path: `artifacts/hero/laptop-hero-${width}.png` });
      console.log(`PASS: Verified 3D Laptop Hero at ${width}px — saved to artifacts/hero/laptop-hero-${width}.png`);

      await page.close();
    }

    // Verify reduced motion mode
    {
      const reducedMotionPage = await browser.newPage({
        viewport: { width: 1440, height: 900 },
        reducedMotion: 'reduce',
      });
      await reducedMotionPage.goto('http://localhost:3100', { waitUntil: 'networkidle' });
      const hero = reducedMotionPage.locator('section#top');
      await hero.waitFor({ state: 'visible' });

      // In reduced motion, 3D Canvas should NOT be rendered
      const canvasCount = await hero.locator('canvas').count();
      assert.equal(canvasCount, 0, 'Canvas must not be rendered when reduced motion is preferred');

      // Content must still be fully visible
      const statement = hero.locator('[data-hero-statement]');
      assert.equal(await statement.isVisible(), true);

      await hero.screenshot({ path: 'artifacts/hero/laptop-hero-reduced-motion.png' });
      console.log('PASS: Verified reduced motion behavior — canvas omitted, fallback preview accessible.');
      await reducedMotionPage.close();
    }

    console.log('\nALL 3D LAPTOP WORKSPACE HERO TESTS PASSED PERFECTLY!');
  } finally {
    await browser.close();
  }
})().catch(err => {
  console.error(err);
  process.exit(1);
});
