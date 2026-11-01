const {chromium}=require('playwright');const fs=require('fs');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});const results=[];fs.mkdirSync('artifacts/qa',{recursive:true});
 for(const width of [375,768,1440]){
  const page=await browser.newPage({viewport:{width,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:3100',{waitUntil:'networkidle'});await page.waitForTimeout(2500);
  for(const section of await page.locator('main > section').all()){await section.scrollIntoViewIfNeeded();await page.waitForTimeout(500);}
  await page.screenshot({path:`artifacts/qa/home-${width}.png`,fullPage:true});
  results.push({width,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),todo:await page.locator('body').innerText().then(t=>t.includes('TODO')),errors});
  await page.getByRole('button',{name:'Send message',exact:true}).click();
  results.push({width,emptyValidation:await page.locator('#contact-name-error').isVisible()});
  await page.locator('#contact-name').fill('Test');await page.locator('#contact-email').fill('test@example.com');await page.locator('#contact-message').fill('Validation test');await page.getByRole('button',{name:'Send message',exact:true}).click();await page.waitForTimeout(500);
  results.push({width,unconfiguredError:await page.getByRole('alert').filter({hasText:'could not be sent'}).isVisible()});
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(300);
  results.push({width,reducedCanvas:await page.locator('canvas').count(),aboutReadable:await page.locator('#about').innerText().then(t=>t.includes('AKTech'))});
  await page.close();
 }
 const page=await browser.newPage({viewport:{width:375,height:900},reducedMotion:'reduce'});
 for(const slug of ['sooti-mehal','malik-enterprices','jewellery-store','aktech-product-work','missing']) {const response=await page.goto('http://localhost:3100/work/'+slug);results.push({slug,status:response.status(),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});}
 for(const [body,expected] of [[{},400],[{name:'A',email:'bad',message:'Hello'},400],[{name:'A',email:'a@b.com',message:'x'.repeat(5001)},400]]) {const response=await page.request.post('http://localhost:3100/api/contact',{data:body});results.push({apiStatus:response.status(),expected});}
 for (const row of results) { if (row.overflow || row.todo || row.errors?.length || row.emptyValidation === false || row.unconfiguredError === false || row.reducedCanvas > 0 || row.aboutReadable === false || (row.expected && row.expected !== row.apiStatus)) throw new Error(JSON.stringify(row)); }
 fs.writeFileSync('artifacts/qa/results.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
