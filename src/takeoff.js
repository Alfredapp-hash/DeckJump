/** Preliminary rectangular deck geometry, not structural design or a purchase order. */
export function takeoff(input) {
  const limits = {width:[1,100],depth:[1,100],spacing:[8,24],boardWidth:[2,12],gap:[0,0.5],waste:[0,30]};
  for (const [key,[min,max]] of Object.entries(limits)) {
    if (typeof input[key] !== 'number' || !Number.isFinite(input[key]) || input[key]<min || input[key]>max) throw new Error(`${key} must be between ${min} and ${max}.`);
  }
  const {width,depth,spacing,boardWidth,gap,waste} = input;
  // Boards run along width; joists run along depth. Both edge joists included.
  const rows = Math.ceil((depth*12+gap)/(boardWidth+gap));
  const joists = Math.ceil(width*12/spacing)+1;
  const round = value => Math.ceil(Number((value*100).toFixed(8)))/100;
  return {version:'0.1',status:'partial',area:round(width*depth),items:[
    {name:'Decking',quantity:round(rows*width*(1+waste/100)),unit:'linear ft',basis:`${rows} rows × ${width} ft, plus ${waste}% allowance; stock lengths unresolved`},
    {name:'Joist positions (includes two edge joists)',quantity:joists,unit:'positions',basis:`Across ${width} ft at maximum ${spacing} in spacing; ${depth} ft nominal run, sizes/supports unresolved`},
    {name:'Rim / ledger boundary allowance',quantity:round(2*width),unit:'linear ft',basis:'Two boundaries perpendicular to joists; connection and attachment design unresolved'}
  ],missing:['Beam layout, sizes and plies','Post layout and heights','Footing design and concrete','Ledger attachment, flashing and connectors','Blocking and framing fasteners','Stairs and railings','Fascia and finish details','Stock lengths, cut optimization and supplier pricing']};
}
export function toCSV(result) {
  const cell = value => '"'+String(value).replaceAll('"','""')+'"';
  const rows = [['Status','PARTIAL TAKEOFF — NOT A PURCHASE ORDER'],['Material','Quantity','Unit','Basis'],...result.items.map(i=>[i.name,i.quantity,i.unit,i.basis]),['Unresolved items'],...result.missing.map(x=>[x])];
  return rows.map(row=>row.map(cell).join(',')).join('\r\n');
}
