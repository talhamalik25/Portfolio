const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require("playwright");

const projects = [
  { slug: "sooti-mehal", liveUrl: "https://sootimehal.com" },
  { slug: "malik-enterprices", liveUrl: "https://malikenterprices.com" },
  // TODO: Add project 3 with its slug and liveUrl when it is ready.
  // TODO: Add project 4 with its slug and liveUrl when it is ready.
];

const rootDirectory = path.resolve(__dirname, "..");
const screenshotDirectory = path.join(rootDirectory, "public", "images", "projects");
const contentDirectory = path.join(__dirname, "site-content");
const popupKeyword = /cookie|consent|privacy|chat|intercom|crisp|tawk|zendesk/i;

async function waitForRenderedPage(page) {
  try {
    await page.waitForLoadState("networkidle", { timeout: 30000 });
  } catch (error) {
    if (error.name !== "TimeoutError") throw error;
    console.warn(`Network idle timed out for ${page.url()}; continuing after the timeout.`);
  }

  await page.waitForTimeout(2000);
}

async function hideCookieAndChatPopups(page) {
  await page.evaluate((keywordSource) => {
    const keyword = new RegExp(keywordSource, "i");
    const selectors = [
      "[id]",
      "[class]",
      "[aria-label]",
      "[title]",
      '[role="dialog"]',
      "iframe",
    ];

    document.querySelectorAll(selectors.join(",")).forEach((element) => {
      const label = [
        element.id,
        typeof element.className === "string" ? element.className : "",
        element.getAttribute("aria-label"),
        element.getAttribute("title"),
        element.getAttribute("src"),
      ]
        .filter(Boolean)
        .join(" ");

      if (!keyword.test(label)) return;

      const style = window.getComputedStyle(element);
      const isOverlay =
        element.matches("iframe, [role='dialog']") ||
        style.position === "fixed" ||
        style.position === "sticky";

      if (isOverlay) element.style.setProperty("display", "none", "important");
    });
  }, popupKeyword.source);
}

async function scrollDownAndBack(page) {
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
  await page.waitForTimeout(800);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(500);
}

async function extractVisibleContent(page) {
  return page.evaluate(() => {
    const visibleText = (element) => {
      const style = window.getComputedStyle(element);
      if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") {
        return "";
      }
      return (element.innerText || element.textContent || "").replace(/\s+/g, " ").trim();
    };

    const unique = (values) => [...new Set(values.filter(Boolean))];
    const navLinks = [...document.querySelectorAll("nav a")].map(visibleText);
    const headings = [...document.querySelectorAll("h1, h2, h3")].map((element) => ({
      level: element.tagName.toLowerCase(),
      text: visibleText(element),
    }));
    const ctas = [...document.querySelectorAll(
      "button, [role='button'], input[type='submit'], a[class*='btn' i], a[class*='button' i], a[class*='cta' i]",
    )].map((element) => {
      if (element instanceof HTMLInputElement) return element.value.trim();
      return visibleText(element) || element.getAttribute("aria-label")?.trim() || "";
    });
    const words = (document.body.innerText || "")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .filter(Boolean)
      .slice(0, 400);

    return {
      title: document.title.trim(),
      metaDescription:
        document.querySelector('meta[name="description"]')?.content?.trim() || "",
      navLinkTexts: unique(navLinks),
      headings: headings.filter((heading) => heading.text),
      buttonAndCtaTexts: unique(ctas),
      visibleBodyTextFirst400Words: words.join(" "),
    };
  });
}

async function captureProject(browser, project) {
  if (!project.liveUrl) {
    console.log(`Skipping ${project.slug}: no liveUrl configured.`);
    return;
  }

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  try {
    const response = await page.goto(project.liveUrl, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });

    if (response && response.status() >= 400) {
      throw new Error(`HTTP ${response.status()} ${response.statusText()}`);
    }

    await waitForRenderedPage(page);
    await hideCookieAndChatPopups(page);
    await scrollDownAndBack(page);
    await hideCookieAndChatPopups(page);

    const content = await extractVisibleContent(page);
    await fs.mkdir(screenshotDirectory, { recursive: true });
    await fs.mkdir(contentDirectory, { recursive: true });
    await page.screenshot({
      path: path.join(screenshotDirectory, `${project.slug}.jpg`),
      type: "jpeg",
      quality: 85,
      fullPage: false,
      animations: "disabled",
    });
    await fs.writeFile(
      path.join(contentDirectory, `${project.slug}.json`),
      `${JSON.stringify({ url: project.liveUrl, ...content }, null, 2)}\n`,
      "utf8",
    );

    await page.setViewportSize({ width: 390, height: 844 });
    await waitForRenderedPage(page);
    await hideCookieAndChatPopups(page);
    await scrollDownAndBack(page);
    await hideCookieAndChatPopups(page);
    await page.screenshot({
      path: path.join(screenshotDirectory, `${project.slug}-mobile.jpg`),
      type: "jpeg",
      quality: 85,
      fullPage: false,
      animations: "disabled",
    });

    console.log(`Captured ${project.liveUrl}`);
  } catch (error) {
    console.error(`Failed to capture ${project.liveUrl}: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await context.close();
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true, channel: "chromium" });

  try {
    for (const project of projects) {
      await captureProject(browser, project);
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(`Screenshot runner failed: ${error.message}`);
  process.exitCode = 1;
});
