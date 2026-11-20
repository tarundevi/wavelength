const pairs = [
  ['Hot','Cold'],['Underrated','Overrated'],['Fancy','Casual'],['Loud','Quiet'],['Ancient','Modern'],
  ['Dangerous','Safe'],['Useful','Useless'],['Serious','Silly'],['Expensive','Cheap'],['Easy','Hard'],
  ['Popular','Niche'],['Beautiful','Ugly'],['Fast','Slow'],['Sweet','Sour'],['Brave','Cowardly'],
  ['Healthy','Unhealthy'],['Realistic','Fantastical'],['Comfortable','Uncomfortable'],['High energy','Low energy'],['Timeless','Trendy']
];
const $ = id => document.getElementById(id);
let round = 1, total = 0, target = 50, guess = 50, pairIndex = -1, phase = 'clue';
const category = $('category');
pairs.forEach(([left,right],index)=>{const option=document.createElement('option');option.value=index;option.textContent=`${left} / ${right}`;category.append(option)});
function showPair(left,right){$('left-label').textContent=left;$('right-label').textContent=right;$('custom-left').value=left;$('custom-right').value=right;}
category.addEventListener('change',()=>{const [left,right]=pairs[Number(category.value)];showPair(left,right)});
function customPair(){
  const left=$('custom-left').value.trim(),right=$('custom-right').value.trim();
  $('left-label').textContent=left||'Left end';$('right-label').textContent=right||'Right end';
}
$('custom-left').addEventListener('input',customPair);
$('custom-right').addEventListener('input',customPair);
function angle(value){ return (value - 50) * 1.8; }
function pointsForDistance(distance){ return distance<=1?4:distance<=3?3:distance<=5?2:distance<=8?1:0; }
function setNeedle(value){ $('needle').style.transform = `rotate(${angle(value)}deg)`; }
function setTarget(value){ $('target').style.transform = `rotate(${angle(value)}deg)`; }
function setPhase(next){
  phase = next;
  $('clue-panel').classList.toggle('hidden',next !== 'clue');
  $('guess-panel').classList.toggle('hidden',next !== 'guess');
  $('result-panel').classList.toggle('hidden',next !== 'result');
  $('target').classList.toggle('hidden-target',next === 'guess');
  if(next === 'clue'){$('phase-label').textContent="The clue giver's turn";$('headline').textContent='Think of a clue.';$('instruction').textContent='Look at the hidden target, then say a clue that lands at that spot between the two ideas.';$('dial').setAttribute('aria-label','Spectrum dial with a visible target');}
  if(next === 'guess'){$('phase-label').textContent="The guesser's turn";$('headline').textContent='Find the wavelength.';$('instruction').textContent='Move the needle to where you think the clue belongs.';$('dial').setAttribute('aria-label','Spectrum dial with hidden target');}
  if(next === 'result'){$('phase-label').textContent='The reveal';$('headline').textContent='How close were you?';$('instruction').textContent='The colorful band shows the secret target.';$('dial').setAttribute('aria-label','Spectrum dial showing target and guess');}
}
function nextRound(){
  const options = pairs.map((_,i)=>i).filter(i=>i!==pairIndex);
  pairIndex = options[Math.floor(Math.random()*options.length)];
  category.value=String(pairIndex);
  showPair(...pairs[pairIndex]);
  target = 15 + Math.floor(Math.random()*71); guess = 50;
  $('round').textContent = round;$('score').textContent = total;$('clue').value='';$('guess-slider').value='50';
  setTarget(target);setNeedle(50);setPhase('clue');
}
$('pass-btn').addEventListener('click',()=>{
  const clue = $('clue').value.trim();
  if(!$('custom-left').value.trim()||!$('custom-right').value.trim()){
    (!$('custom-left').value.trim() ? $('custom-left') : $('custom-right')).focus();return;
  }
  if(!clue){$('clue').focus();return;}
  $('shown-clue').textContent=clue;setPhase('guess');
});
$('clue').addEventListener('keydown',e=>{if(e.key==='Enter')$('pass-btn').click()});
$('guess-slider').addEventListener('input',e=>{guess=Number(e.target.value);setNeedle(guess)});
$('reveal-btn').addEventListener('click',()=>{
  const distance=Math.abs(guess-target);
  const points=pointsForDistance(distance);
  total+=points;$('score').textContent=total;$('points-earned').textContent=points;
  $('result-message').textContent=points===4?'Perfect wavelength!':points>=2?'You were close!':points===1?'In the neighborhood.':'A little off the mark.';
  setPhase('result');
});
$('next-btn').addEventListener('click',()=>{round++;nextRound()});
$('how-btn').addEventListener('click',()=>$('how-dialog').showModal());
$('close-dialog').addEventListener('click',()=>$('how-dialog').close());
$('how-dialog').addEventListener('click',e=>{if(e.target===$('how-dialog'))e.target.close()});
nextRound();
