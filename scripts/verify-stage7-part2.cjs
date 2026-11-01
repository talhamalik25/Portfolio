const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
(async () => {
 const browser = await chromium.launch({ channel: 'msedge', headless: true });
 const results=[];
 const slugs=['sooti-mehal','malik-enterprices','jewellery-store','gym-crm'];
 const clean=async(page)=>{
   assert.equal((await page.locator('body').innerText()).includes('[FILL'),false,'Visible placeholder');
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Horizontal overflow');
 };
 try {
  for(const width of [375,768,1440]) {
   const page=await browser.newPage({viewport:{width,height:900}});
   const errors=[],warnings=[];
   page.on('pageerror',e=>errors.push(e.message));
   page.on('console',message=>{if(message.type()==='warning'&&message.text().includes('[content]'))warnings.push(message.text());});
   await page.goto('http://localhost:3100',{waitUntil:'networkidle'});await page.waitForTimeout(2500);
   await clean(page);
   assert.equal(await page.locator('#work [data-project-card]').count(),4);
   assert.equal(await page.locator('[data-about-part="learning"]').count(),0);
   assert.equal(await page.locator('#experience').count(),0);
   assert.equal(await page.locator('#github').count(),0);
   assert.equal(await page.locator('#faq details').count(),2);
   await page.getByRole('link',{name:'View all works'}).click();
   await page.waitForURL('**/work');await page.waitForTimeout(1000);
   assert.equal(await page.locator('[data-project-card]').count(),4);
   for(const [category,count] of [['Website',2],['E-commerce',1],['CRM',1],['All',4]]) {
    const button=page.getByRole('button',{name:category,exact:true});await button.focus();await page.keyboard.press('Enter');await page.waitForTimeout(650);
    assert.equal(await button.getAttribute('aria-pressed'),'true');assert.equal(await page.locator('[data-project-card]').count(),count);await clean(page);
   }
   assert.ok(await page.locator('meta[property="og:description"]').getAttribute('content'));
   if(width===1440)assert.equal(await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Work',exact:true}).getAttribute('aria-current'),'page');
   else {await page.getByRole('button',{name:'Open menu'}).click();const menu=page.getByRole('navigation',{name:'Mobile menu'});assert.ok(await menu.getByRole('link').count()<=7);assert.equal(await menu.getByRole('link',{name:'Work',exact:true}).getAttribute('href'),'/#work');assert.equal(await menu.getByRole('link',{name:'Work',exact:true}).getAttribute('aria-current'),'page');await page.keyboard.press('Escape');}
   await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(200);
   for(const card of await page.locator('[data-project-card]').all())assert.equal(await card.evaluate(el=>getComputedStyle(el).opacity),'1');
   await page.screenshot({path:`artifacts/stage7-part2/work-${width}.png`,fullPage:true,style:'header.fixed, .skip-link { visibility: hidden !important; }'});
   for(const [index,slug] of slugs.entries()) {
    const response=await page.goto('http://localhost:3100/work/'+slug);assert.equal(response.status(),200);await page.waitForTimeout(150);await clean(page);
    assert.equal(await page.locator('h1').count(),1);
    assert.ok((await page.title()).includes('Talha Malik'));
    assert.equal((await page.locator('meta[name="description"]').getAttribute('content')).includes('[FILL'),false);
    assert.ok((await page.locator('meta[property="og:url"]').getAttribute('content')).endsWith('/work/'+slug));
    assert.equal(await page.getByRole('link',{name:/Next project:/}).getAttribute('href'),'/work/'+slugs[(index+1)%slugs.length]);
    if(slug==='gym-crm'){assert.equal(await page.getByText('In progress',{exact:true}).count(),1);assert.equal(await page.getByRole('link',{name:'Live ↗',exact:true}).count(),0);}
    if(index===0||slug==='gym-crm') await page.screenshot({path:`artifacts/stage7-part2/${slug}-${width}.png`,fullPage:true,style:'header.fixed, .skip-link { visibility: hidden !important; }'});
   }
   for(const slug of ['missing','aktech-product-work']){const response=await page.goto('http://localhost:3100/work/'+slug);assert.equal(response.status(),404);assert.ok(await page.getByRole('heading',{name:'Project not found.'}).isVisible());}
   assert.deepEqual(errors,[]);assert.deepEqual(warnings,[]);
   results.push({width,placeholdersVisible:false,overflow:false,filters:'pass',routes:'pass',metadata:'pass',reducedMotion:'pass',productionWarnings:0,errors});await page.close();
  }
  fs.writeFileSync('artifacts/stage7-part2/results.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
