import {takeoff,toCSV} from './takeoff.js';
const $ = id => document.getElementById(id);
const form = $('project');
let current;
function read() {
  const data = Object.fromEntries(new FormData(form));
  for (const key of Object.keys(data)) if (key !== 'name') data[key] = Number(data[key]);
  return data;
}
function calculate() {
  current = undefined; $('export').disabled = true;
  try {
    if (!form.reportValidity()) return;
    const data = read(); const result = takeoff(data);
    $('project-title').textContent = data.name;
    $('area').textContent = `${result.area} SQ FT`;
    $('items').replaceChildren(...result.items.map(item => {
      const tr = document.createElement('tr');
      for (const value of [item.name,`${item.quantity} ${item.unit}`,item.basis]) { const td = document.createElement('td'); td.textContent = value; tr.append(td); }
      return tr;
    }));
    $('missing').replaceChildren(...result.missing.map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
    current = result; $('export').disabled = false; $('message').textContent = 'Partial takeoff generated. Review unresolved items.';
  } catch (error) { $('message').textContent = error.message; }
}
form.addEventListener('submit',event => { event.preventDefault(); calculate(); });
form.addEventListener('input',() => {current = undefined; $('export').disabled = true; $('message').textContent = 'Dimensions changed. Generate again to update quantities.';});
$('save').addEventListener('click',() => {
  try { if (!form.reportValidity()) return; const data = read(); takeoff(data); localStorage.setItem('deckjump.project.v1',JSON.stringify(data)); $('message').textContent = 'Project saved on this device.'; }
  catch { $('message').textContent = 'Could not save. Check inputs and browser storage availability.'; }
});
$('export').addEventListener('click',() => {
  if (!current) return;
  const url = URL.createObjectURL(new Blob([toCSV(current)],{type:'text/csv;charset=utf-8'}));
  const a = document.createElement('a'); a.href = url; a.download = 'deckjump-partial-takeoff.csv'; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000);
});
try {
  const saved = JSON.parse(localStorage.getItem('deckjump.project.v1') || 'null');
  if (saved) { takeoff(saved); for (const key of ['name','width','depth','spacing','boardWidth','gap','waste']) if (saved[key] !== undefined) form.elements.namedItem(key).value = saved[key]; }
} catch { $('message').textContent = 'Saved draft unavailable. Default dimensions loaded.'; }
calculate();
