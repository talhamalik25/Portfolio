const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  fs.mkdirSync('artifacts/hero', { recursive: true });

  try {
    const viewports = [
      { name: 'desktop-1920', width: 1920, height: 1080 },
      { name: 'desktop-1440', width: 1440, height: 900 },
      { name: 'tablet-768', width: 768, height: 1024 },
      { name: 'mobile-375', width: 375, height: 812 },
    ];

    for (const vp of viewports) {
      const page = await browser.newPage({
        viewport: { width: vp.width, height: vp.height },
        hasTouch: vp.width <= 768,
      });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));

      await page.goto('http://localhost:3100', { waitUntil: 'networkidle' });

      // Verify no JavaScript errors
      assert.deepEqual(errors, [], `Unexpected page errors at ${vp.name}: ${errors.join(', ')}`);

      // Verify no horizontal overflow
      const overflow = await page.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
        };
      });
      assert.equal(overflow.hasOverflow, false, `Horizontal overflow at ${vp.name}: scrollWidth ${overflow.scrollWidth} > clientWidth ${overflow.clientWidth}`);

      // Verify Hero section landmark & semantic structure
      const hero = page.locator('section#top[aria-label="Introduction"]');
      await hero.waitFor({ state: 'visible' });

      // Verify Kicker
      const kicker = hero.locator('header');
      await kicker.waitFor({ state: 'visible' });
      assert.ok((await kicker.innerText()).toLowerCase().includes('introduction'));

      // Verify Primary Identity: TALHA MALIK
      const title = hero.locator('[data-hero-title]');
      await title.waitFor({ state: 'visible' });
      assert.equal((await title.innerText()).trim(), 'TALHA MALIK');

      // Verify Professional Title
      const subtitle = hero.locator('[data-hero-subtitle]');
      await subtitle.waitFor({ state: 'visible' });
      const subtitleText = (await subtitle.innerText()).toLowerCase();
      assert.ok(subtitleText.includes('full-stack developer') && subtitleText.includes('creative engineer'));

      // Verify Supporting Statement
      const statement = hero.locator('[data-hero-statement]');
      await statement.waitFor({ state: 'visible' });
      assert.ok((await statement.innerText()).toLowerCase().includes('i design and engineer digital products for the real world'));

      // Verify CTAs
      const workBtn = hero.locator('a[href="#work"]', { hasText: 'View Selected Work' });
      const contactBtn = hero.locator('a[href="#contact"]', { hasText: "Let's Talk" });
      await workBtn.waitFor({ state: 'visible' });
      await contactBtn.waitFor({ state: 'visible' });

      // Verify 3D Laptop Workspace Canvas
      const canvas = hero.locator('canvas');
      await canvas.waitFor({ state: 'visible' });

      // Verify Project Selector Tabs
      const selector = hero.locator('[data-hero-selector]');
      await selector.waitFor({ state: 'visible' });
      const dentoraTab = selector.locator('button', { hasText: 'Dentora' });
      const jewelleryTab = selector.locator('button', { hasText: 'Jewellery Store' });
      const malikTab = selector.locator('button', { hasText: 'Malik Enterprises' });
      assert.equal(await dentoraTab.getAttribute('aria-selected'), 'true');

      // Allow 3D canvas and textures to render cleanly
      await page.waitForTimeout(1600);

      // Test drag interaction on desktop
      if (vp.width >= 1024) {
        const box = await canvas.boundingBox();
        if (box) {
          const startX = box.x + box.width / 2;
          const startY = box.y + box.height / 2;
          await page.mouse.move(startX, startY);
          await page.mouse.down();
          await page.mouse.move(startX + 120, startY - 20, { steps: 8 });
          await page.mouse.up();
          await page.waitForTimeout(300);
        }
      }

      // Test touch drag on mobile
      if (vp.width === 375) {
        const box = await canvas.boundingBox();
        if (box) {
          await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
          await page.waitForTimeout(200);
        }
      }

      // Capture screenshot at this viewport
      await hero.screenshot({ path: `artifacts/hero/hero-${vp.name}.png` });
      console.log(`PASS: Verified ${vp.name} (${vp.width}px) — screenshot saved to artifacts/hero/hero-${vp.name}.png`);

      // Test Project Switching on 1440px desktop
      if (vp.name === 'desktop-1440') {
        // Switch to Jewellery Store
        await jewelleryTab.click();
        await page.waitForTimeout(500);
        assert.equal(await jewelleryTab.getAttribute('aria-selected'), 'true');
        assert.equal(await dentoraTab.getAttribute('aria-selected'), 'false');
        assert.ok((await selector.innerText()).toLowerCase().includes('luxury e-commerce'));
        await hero.screenshot({ path: 'artifacts/hero/hero-project-jewellery.png' });
        console.log('PASS: Verified project switch to Jewellery Store — saved screenshot.');

        // Switch to Malik Enterprises
        await malikTab.click();
        await page.waitForTimeout(500);
        assert.equal(await malikTab.getAttribute('aria-selected'), 'true');
        assert.ok((await selector.innerText()).toLowerCase().includes('industrial b2b'));
        await hero.screenshot({ path: 'artifacts/hero/hero-project-malik.png' });
        console.log('PASS: Verified project switch to Malik Enterprises — saved screenshot.');

        // Switch back to Dentora
        await dentoraTab.click();
        await page.waitForTimeout(400);
        assert.equal(await dentoraTab.getAttribute('aria-selected'), 'true');
      }

      await page.close();
    }

    // Verify reduced motion accessibility
    {
      const reducedMotionPage = await browser.newPage({
        viewport: { width: 1440, height: 900 },
        reducedMotion: 'reduce',
      });
      await reducedMotionPage.goto('http://localhost:3100', { waitUntil: 'networkidle' });
      const hero = reducedMotionPage.locator('section#top');
      await hero.waitFor({ state: 'visible' });

      // In reduced motion, 3D Canvas must not be rendered
      const canvasCount = await hero.locator('canvas').count();
      assert.equal(canvasCount, 0, 'Canvas must not be rendered when reduced motion is preferred');

      // Static accessible image must be visible
      const fallbackImg = hero.locator('img[alt*="project screenshot"]');
      await fallbackImg.waitFor({ state: 'visible' });
      assert.ok(await fallbackImg.getAttribute('src'), 'dentora.png');

      await hero.screenshot({ path: 'artifacts/hero/hero-reduced-motion.png' });
      console.log('PASS: Verified reduced motion behavior — canvas omitted, static high-res preview rendered.');
      await reducedMotionPage.close();
    }

    console.log('\n========================================');
    console.log('ALL VERIFICATION TESTS PASSED PERFECTLY!');
    console.log('========================================');
  } finally {
    await browser.close();
  }
})().catch(err => {
  console.error(err);
  process.exit(1);
});
