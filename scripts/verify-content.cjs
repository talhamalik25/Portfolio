const fs = require('node:fs');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
(async () => {
 const source = fs.readFileSync('src/lib/content.js', 'utf8');
 const { hasPlaceholder, readyEntries, readyText } = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));
 const values = [{ title: 'Keep', tags: ['Next.js'] }, { title: 'Skip', details: ['[FILL: details]'] }];
 const original = JSON.stringify(values);
 const oldEnv = process.env.NODE_ENV;
 const oldWarn = console.warn;
 const warnings = [];
 console.warn = (...args) => warnings.push(args.join(' '));
 try {
   process.env.NODE_ENV = 'production';
   assert.equal(hasPlaceholder(values[1]), true);
   assert.deepEqual(readyEntries(["", "  ", "[FILL: pending]", "Complete"]), ["Complete"]);
   assert.equal(readyEntries(values, 'Unit test').length, 1);
   assert.equal(readyText('[FILL: secret]'), '');
   assert.equal(warnings.length, 0);
   process.env.NODE_ENV = 'development';
   readyEntries(values, 'Unit test'); readyEntries(values, 'Unit test');
   assert.equal(warnings.length, 1); assert.match(warnings[0], /Skip/);
   assert.equal(JSON.stringify(values), original);
 } finally { process.env.NODE_ENV = oldEnv; console.warn = oldWarn; }
 const previous = execFileSync('git', ['show','HEAD:data/projects.js'], { encoding: 'utf8' });
 const current = fs.readFileSync('data/projects.js', 'utf8');
 for (const placeholder of previous.match(/\[FILL[^\]]*\]/g) || []) assert.ok(current.includes(placeholder), 'Missing original value: ' + placeholder);
 const fanHash = crypto.createHash('sha256').update(fs.readFileSync('src/components/sections/WorkStageCanvas.jsx')).digest('hex');
 assert.equal(fanHash, fs.readFileSync('artifacts/stage7-part2/fan-before.sha256','utf8'));
 console.log('PASS: recursive filtering, production silence, deduplicated dev warnings, immutable data, preserved placeholders, untouched 3D source');
})().catch(error => { console.error(error); process.exit(1); });
