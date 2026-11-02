const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const results = [];
  fs.mkdirSync('artifacts/stage7-part4', { recursive: true });
  try {
    for (const width of [375, 768, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://localhost:3100', { waitUntil: 'networkidle' });
      const form = page.getByRole('form', { name: 'Project brief' });
      const button = name => form.getByRole('button', { name, exact: true });
      await button('Continue').click();
      assert.equal(await page.locator(':focus').getAttribute('name'), 'name');
      await form.getByLabel('Name (required)').fill('Browser Test');
      await form.getByLabel('Email (required)').fill('invalid');
      await button('Continue').click();
      assert.equal(await page.locator(':focus').getAttribute('name'), 'email');
      await form.getByLabel('Email (required)').fill('test@example.com');
      await button('Continue').click();
      await button('Continue').click();
      assert.equal(await page.locator(':focus').getAttribute('name'), 'projectType');
      await form.getByLabel('Project type (required)').selectOption('Web experience');
      await form.getByLabel('Budget range (optional)').fill('Discuss after scope');
      await button('Back').click();
      assert.equal(await form.getByLabel('Name (required)').inputValue(), 'Browser Test');
      await button('Continue').click();
      assert.equal(await form.getByLabel('Budget range (optional)').inputValue(), 'Discuss after scope');
      await button('Continue').click();
      await button('Send brief').click();
      assert.equal(await page.locator(':focus').getAttribute('name'), 'message');
      await form.getByLabel('Message (required)').fill('Test brief: a small project interface.');
      const responsePromise = page.waitForResponse(response => response.url().endsWith('/api/contact'));
      await button('Send brief').click();
      assert.equal((await responsePromise).status(), 503);
      await form.getByRole('alert').waitFor();
      assert.ok((await form.innerText()).includes('Your brief could not be sent'));
      assert.equal(await form.getByLabel('Message (required)').inputValue(), 'Test brief: a small project interface.');
      await form.screenshot({ path: 'artifacts/stage7-part4/brief-' + width + '.png' });
      let payload, count = 0;
      await page.route('**/api/contact', async route => {
        count++; payload = route.request().postDataJSON();
        await new Promise(resolve => setTimeout(resolve, 400));
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) });
      });
      await button('Send brief').click();
      assert.equal(await button('Sending…').isDisabled(), true);
      await form.getByText('Your message has been sent.', { exact: true }).waitFor();
      assert.equal(count, 1);
      assert.equal(payload.projectType, 'Web experience');
      assert.equal(payload.budget, 'Discuss after scope');
      await button('Start another brief').click();
      assert.equal(await form.getByLabel('Name (required)').inputValue(), '');
      const footer = page.locator('footer');
      assert.ok((await footer.textContent()).includes('Available for select projects'));
      assert.ok((await footer.innerText()).includes('Karachi'));
      assert.equal((await page.locator('body').innerText()).includes('[FILL'), false);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      await footer.screenshot({ path: 'artifacts/stage7-part4/footer-' + width + '.png' });
      assert.deepEqual(errors, []);
      results.push({ width, validation: 'passed', retainedValues: true, realDelivery: '503: intentionally unconfigured', simulatedSuccess: 'passed', overflow: false, errors });
      await page.close();
    }
    const context = await browser.newContext();
    const request = context.request;
    for (const data of [null, {}, { name: 'Test', email: 'bad', message: 'Test', projectType: 'Other' }, { name: 'Test', email: 'test@example.com', message: 'Test', projectType: 'Fake' }, { name: 'Test', email: 'test@example.com', message: 'Test', projectType: 'Other', budget: {} }]) {
      const response = await request.post('http://localhost:3100/api/contact', { headers: { 'Content-Type': 'application/json' }, data: JSON.stringify(data) });
      assert.equal(response.status(), 400);
    }
    await context.close();
    fs.writeFileSync('artifacts/stage7-part4/results.json', JSON.stringify(results, null, 2));
    console.log(JSON.stringify(results, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
