const LESSONS={
  human:{eyebrow:"บทที่ 01",title:"Basic Human Values",description:"คุณค่าพื้นฐานของมนุษย์",facts:["สิ่งที่คนให้ความสำคัญในชีวิต แบ่งเป็น 10 แบบ เป็นเกณฑ์ที่เราใช้เวลาเลือกหรือตัดสินใจ","Shalom H. Schwartz นักจิตวิทยา คิดขึ้นในปี 1992 และทดสอบกับคนมากกว่า 80 ประเทศ","ช่วยให้รู้ว่าลูกค้าแคร์อะไรจริง ๆ แบรนด์จะได้พูดเรื่องที่เขาสนใจ"]},
  benefits:{eyebrow:"บทที่ 02",title:"Elements of Value",description:"องค์ประกอบของคุณค่า",facts:["ประโยชน์ 30 อย่างที่สินค้าหรือบริการให้ลูกค้าได้ เริ่มจากเรื่องใช้งาน ไล่ขึ้นไปถึงความรู้สึกและชีวิต","บริษัทที่ปรึกษา Bain & Company เผยแพร่ในปี 2016 ต่อยอดจากพีระมิดความต้องการของ Maslow","ช่วยดูว่าแบรนด์ให้อะไรลูกค้าได้บ้างนอกจากราคาและฟีเจอร์ แล้วเลือกเรื่องที่ทำได้ดีกว่าคู่แข่ง"]},
  quiz:{eyebrow:"Quiz ท้ายบท",title:"ทบทวนและลองใช้สิ่งที่เรียน",description:"เลือกกิจกรรม แล้วให้ผู้เรียนสแกน QR เข้าห้อง"}
};
const QUIZZES={value:{title:"Value Lab",description:"ทบทวน Human Values 7 ข้อ ผู้เรียนตอบพร้อมกันผ่านมือถือ"},pyramid:{title:"Pyramid Lab",description:"เลือก Elements of Value เขียน VP แล้วโหวตกันในห้อง"}};
const HUMAN=[
  {th:"อิสระในการคิดและเลือก",short:"อิสระ",subs:[["Thought", "คิดเอง", "อยากมีความคิดและไอเดียเป็นของตัวเอง", "แบรนด์เปิดให้ลูกค้าคิดหรือสร้างอะไรเองได้บ้าง?", "Canva: ออกแบบงานเองได้ แม้ไม่ใช่นักออกแบบ"], ["Action", "ทำเอง", "อยากเลือกและตัดสินใจเรื่องของตัวเอง", "ลูกค้าอยากคุมเองตรงไหน ที่ตอนนี้ยังถูกบังคับอยู่?", "Airbnb: เลือกที่พักและวิธีเที่ยวเอง ไม่ต้องตามทัวร์"]],description:"อยากตัดสินใจด้วยตัวเอง ลองคิดวิธีใหม่ และใช้ชีวิตในแบบที่เป็นเรา",brand:"IKEA",example:"เฟอร์นิเจอร์ที่เลือกผสมและจัดวางเองได้ อาจเชื่อมกับความอยากออกแบบบ้านให้เป็นตัวเอง",question:"ลูกค้ามีเรื่องไหนที่อยากเป็นคนเลือกเอง?"},
  {th:"ความแปลกใหม่และท้าทาย",short:"แปลกใหม่",description:"อยากพบประสบการณ์ที่ต่างจากเดิม มีเรื่องให้ตื่นเต้น และได้ลองสิ่งที่ยังไม่เคยทำ",brand:"GoPro",example:"การบันทึกกิจกรรมผจญภัย อาจเชื่อมกับความอยากออกไปลองประสบการณ์ใหม่",question:"มีประสบการณ์ใหม่อะไรที่ลูกค้าอยากลอง แต่ยังไม่ได้ลอง?"},
  {th:"ความสุขและความเพลิดเพลิน",short:"ความสุข",description:"ให้ความสำคัญกับความอร่อย ความสนุก และช่วงเวลาที่ทำให้ตัวเองมีความสุข",brand:"Magnum",example:"ไอศกรีมอาจเป็นรางวัลเล็ก ๆ ที่ลูกค้าเลือกให้ตัวเองหลังวันที่เหนื่อย",question:"ลูกค้าอยากให้รางวัลตัวเองในช่วงเวลาไหน?"},
  {th:"ความสำเร็จและความสามารถ",short:"ความสำเร็จ",description:"อยากทำสิ่งต่าง ๆ ให้ดีขึ้น พิสูจน์ความสามารถ และได้รับการยอมรับจากผลงาน",brand:"Nike",example:"อุปกรณ์กีฬาและเรื่องเล่าของการฝึกฝน อาจเชื่อมกับความอยากพัฒนาฝีมือและไปถึงเป้าหมาย",question:"ลูกค้าอยากเก่งขึ้นหรือทำอะไรให้สำเร็จ?"},
  {th:"สถานะและอิทธิพล",short:"สถานะ",subs:[["Dominance", "คุมคนอื่น", "อยากมีอำนาจตัดสินใจแทนคนอื่น", "ลูกค้าอยากเป็นคนนำในสถานการณ์ไหน?", "คอร์สภาวะผู้นำ: ขายภาพการเป็นคนคุมทีมและตัดสินใจ"], ["Resources", "มีทรัพย์สิน", "อยากมีเงินและของที่แสดงฐานะ", "สินค้าทำให้ลูกค้ารู้สึกว่ามีมากขึ้นอย่างไร?", "Louis Vuitton: กระเป๋าที่คนดูออกว่ามีราคา"], ["Face", "รักษาหน้า", "ไม่อยากเสียหน้า อยากให้คนอื่นมองดี", "ลูกค้ากลัวขายหน้าตรงไหน แบรนด์ช่วยกันได้ไหม?", "Ferrero Rocher: ของฝากที่ดูดีพอ ผู้ให้ไม่เสียหน้า", "อยู่ระหว่าง Power กับ Security"]],description:"อยากมีทรัพยากร มีอำนาจตัดสินใจ หรือมีสถานะที่คนอื่นยอมรับ",brand:"Rolex",example:"นาฬิกาอาจถูกใช้เป็นสัญลักษณ์ของสถานะและการได้รับการยอมรับในสังคม",question:"ลูกค้าอยากให้คนอื่นมองสถานะของเขาอย่างไร?"},
  {th:"ความปลอดภัยและมั่นคง",short:"ความมั่นคง",subs:[["Personal", "ปลอดภัยส่วนตัว", "อยากให้ตัวเองและครอบครัวปลอดภัย", "ลูกค้ากังวลเรื่องอะไรกับคนในบ้าน?", "Safe-T-Cut: เครื่องตัดไฟ กันไฟดูดคนในบ้าน"], ["Societal", "สังคมมั่นคง", "อยากให้บ้านเมืองสงบและมีระเบียบ", "แบรนด์ช่วยให้ชุมชนหรือสังคมมั่นคงขึ้นได้ไหม?", "Traffy Fondue: แจ้งปัญหาในเมืองให้แก้ ชุมชนเรียบร้อยขึ้น"]],description:"อยากให้ตัวเอง คนใกล้ชิด และสังคมปลอดภัย มีความแน่นอนและพึ่งพาได้",brand:"Volvo",example:"การให้ความสำคัญกับความปลอดภัยของรถ อาจเชื่อมกับความอยากปกป้องคนในครอบครัว",question:"ลูกค้ากังวลว่าจะสูญเสียอะไร และอยากปกป้องใคร?"},
  {th:"การอยู่ร่วมกันตามกติกา",short:"กติกา",subs:[["Rules", "ทำตามกฎ", "ทำตามกฎหมายและข้อตกลง", "ลูกค้าอยากมั่นใจว่าทำถูกต้องเรื่องอะไร?", "iTax: ช่วยยื่นภาษีให้ถูกต้องครบถ้วน"], ["Interpersonal", "เกรงใจ", "ระวังไม่ให้คนอื่นเดือดร้อนหรือไม่พอใจ", "ลูกค้าเกรงใจใครเวลาใช้สินค้านี้?", "Listerine: มั่นใจว่าไม่ทำให้คนที่คุยด้วยอึดอัด"], ["Humility", "ถ่อมตัว", "รู้ว่าตัวเองเป็นส่วนเล็ก ๆ ไม่อวด", "ลูกค้าอยากได้ของดีโดยไม่ดูโอ้อวดได้ไหม?", "Uniqlo: เสื้อผ้าเรียบ ๆ ใส่ได้ทุกวัน ไม่เน้นโลโก้", "อยู่ระหว่าง Conformity กับ Benevolence"]],description:"อยากควบคุมการกระทำของตัวเอง เคารพกติกา และไม่ทำให้คนอื่นเดือดร้อน",brand:"Toyota",example:"ในโจทย์สื่อสารเรื่องขับรถอย่างรับผิดชอบ อาจเชื่อมแบรนด์กับการเคารพกฎและคำนึงถึงผู้ร่วมทาง",question:"ลูกค้าพยายามทำสิ่งใดให้เหมาะสม เพื่อไม่กระทบคนอื่น?"},
  {th:"การรักษาธรรมเนียม",short:"ธรรมเนียม",description:"ให้ความสำคัญกับประเพณี ความเชื่อ และวิถีปฏิบัติที่สืบต่อกันมา",brand:"แม่ประนอม",example:"อาหารรสคุ้นเคยอาจเชื่อมกับการรักษาวิธีทำอาหารหรือธรรมเนียมของครอบครัว",question:"มีธรรมเนียมหรือวิถีเดิมอะไรที่ลูกค้าอยากรักษาไว้?"},
  {th:"การดูแลคนใกล้ตัว",short:"คนใกล้ตัว",subs:[["Caring", "ดูแลคนใกล้ตัว", "อยากให้คนที่รักมีชีวิตที่ดี", "ลูกค้าซื้อเพื่อดูแลใครอยู่บ้าง?", "แบรนด์ซุปไก่สกัด: ซื้อไปดูแลพ่อแม่"], ["Dependability", "เป็นที่พึ่งได้", "อยากเป็นคนที่คนอื่นไว้ใจและพึ่งพาได้", "แบรนด์ช่วยให้ลูกค้าเป็นที่พึ่งของคนอื่นได้อย่างไร?", "KEX Express: ส่งตรงเวลา แม่ค้าออนไลน์รักษาคำพูดกับลูกค้าได้"]],description:"อยากให้คนที่เรารู้จักและผูกพันมีชีวิตที่ดี พร้อมช่วยเหลือและดูแลกัน",brand:"Kodomo",example:"การเลือกของใช้ให้ลูก อาจสะท้อนความอยากดูแลความเป็นอยู่ของคนสำคัญในบ้าน",question:"ใครคือคนที่ลูกค้าอยากดูแลให้ดีที่สุด?"},
  {th:"ความเท่าเทียมและโลกส่วนรวม",short:"โลกส่วนรวม",subs:[["Concern", "ความยุติธรรม", "อยากให้ทุกคนได้โอกาสเท่ากัน", "แบรนด์ช่วยให้ใครเข้าถึงสิ่งที่เคยเข้าไม่ถึง?", "TOMS: ซื้อหนึ่งคู่ ช่วยอีกหนึ่งคน"], ["Nature", "รักษาธรรมชาติ", "อยากให้สิ่งแวดล้อมอยู่ได้ยาว", "ลูกค้าลดผลกระทบได้ตรงไหนตอนใช้สินค้า?", "Grab: ตัวเลือกไม่รับช้อนส้อมพลาสติก"], ["Tolerance", "ยอมรับความต่าง", "เปิดรับคนที่คิดหรือใช้ชีวิตต่างจากเรา", "แบรนด์ทำให้คนแบบไหนรู้สึกว่ามีที่ยืน?", "Dove: โฆษณาที่แสดงความสวยหลายแบบ"]],description:"อยากให้ทุกคนได้รับการปฏิบัติอย่างเป็นธรรม ยอมรับความแตกต่าง และดูแลธรรมชาติ",brand:"Patagonia",example:"การซ่อมและใช้เสื้อผ้าต่อ อาจเชื่อมกับความห่วงใยสิ่งแวดล้อมและผลกระทบต่อคนส่วนรวม",question:"ลูกค้าอยากให้โลกหรือสังคมดีขึ้นในเรื่องใด?"}
];
let course="human",stage=null,humanIndex=0;
// Each menu has its own URL hash: #/human, #/benefits, #/quiz, #/quiz/value, #/quiz/pyramid
function courseTo(nextCourse,nextStage,replace){
  course=Object.hasOwn(LESSONS,nextCourse)?nextCourse:"human";stage=course==="quiz"&&Object.hasOwn(QUIZZES,nextStage)?nextStage:null;
  const lesson=stage?{eyebrow:LESSONS.quiz.eyebrow,...QUIZZES[stage]}:LESSONS[course];
  $("course-eyebrow").textContent=lesson.eyebrow;$("course-title").textContent=lesson.title;$("course-description").textContent=lesson.description;
  $("course-facts").hidden=!lesson.facts;if(lesson.facts)$("course-facts").innerHTML=["คืออะไร","ใครคิด","ใช้ทำอะไร"].map((h,i)=>`<div class="course-fact"><h2>${h}</h2><p>${esc(lesson.facts[i])}</p></div>`).join("");
  document.querySelectorAll(".module-tab").forEach(b=>b.setAttribute("aria-pressed",b.dataset.course===course));
  const view=stage?"live":course==="quiz"?"quiz-pick":course==="human"?"human-lesson":"elements";
  ["play","examples","elements","live","human-lesson","quiz-pick"].forEach(id=>$(id).hidden=id!==view);
  window.liveTab=stage==="pyramid"?"pyr":"live";
  if(view==="human-lesson")renderHuman();
  if(view==="elements")renderEl();
  if(view==="live")renderLive();
  if(view==="quiz-pick")document.querySelectorAll("[data-quiz]").forEach(b=>{const open=L&&L.code&&(L.mode==="pyr")===(b.dataset.quiz==="pyramid");b.textContent=open?"กลับไปที่ห้อง "+L.code+" →":"เปิดห้อง →"});
  $("lesson-bottom").hidden=course==="quiz";
  const h="#/"+course+(stage?"/"+stage:"");if(location.hash!==h)history[replace?"replaceState":"pushState"](null,"",h);
  if(course==="quiz"){closeMenu();return}
  $("lesson-source").innerHTML=course==="human"?'อ้างอิง Schwartz (2012) · คำอธิบายเรียบเรียงเพื่อการเรียนรู้':'อ้างอิง Bain & Company · คำอธิบายเรียบเรียงเพื่อการเรียนรู้';
  closeMenu();
}
// Logos downloaded from each brand's official website; names not listed (product types) show a neutral mark.
const LOGOS={IKEA:"ikea.svg",GoPro:"gopro.svg",Magnum:"magnum.png",Nike:"nike.svg",Rolex:"rolex.svg",Volvo:"volvo.svg",Toyota:"toyota.svg","แม่ประนอม":"maepranom.png",Kodomo:"kodomo.svg",Patagonia:"patagonia.svg",Canva:"canva.png",Airbnb:"airbnb.svg","Louis Vuitton":"louisvuitton.svg","Ferrero Rocher":"ferrerorocher.png","Safe-T-Cut":"safetcut.png","Traffy Fondue":"traffy.png",iTax:"itax.svg",Listerine:"listerine.svg","KEX Express":"kex.svg",TOMS:"toms.png",Grab:"grab.png",Dove:"dove.svg",Uniqlo:"uniqlo.svg",Coursera:"coursera.svg",Duolingo:"duolingo.png","Harley-Davidson":"harleydavidson.svg","After You":"afteryou.png",LEGO:"lego.svg",SMEG:"smeg.svg",Freitag:"freitag.png",Calm:"calm.svg",Netflix:"netflix.svg","Shopee ฝั่งร้านค้า":"shopee.svg","Google Calendar":"googlecalendar.svg",LINE:"line.png",Makro:"makro.png","Lay’s":"lays.svg","Google Maps":"googlemaps.png"};
const DARK_LOGOS=new Set(["Magnum","Rolex"]); // white or pale logos need a dark tile
const logoHTML=name=>`<span class="brand-logo${DARK_LOGOS.has(name)?" dark":""}">${LOGOS[name]?`<img src="logos/${LOGOS[name]}" alt="" loading="lazy">`:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1.2 12H6.2zM9 8a3 3 0 0 1 6 0"/></svg>'}</span>`;
// Schwartz's 4 higher-order groups (angles in degrees); Hedonism (54-90) straddles open/self.
const VALUE_GROUPS=[{th:"เปิดรับสิ่งใหม่",cls:"g-open",a0:-18,a1:72},{th:"เน้นตัวเอง",cls:"g-self",a0:72,a1:162},{th:"รักษาสิ่งเดิม",cls:"g-keep",a0:162,a1:270},{th:"เพื่อคนอื่น",cls:"g-others",a0:270,a1:342}];
const groupOf=i=>VALUE_GROUPS.find(g=>i*36>=g.a0&&i*36<g.a1).cls;
const band=(r0,r1,a0,a1)=>{const[x0,y0]=pt(r1,a0),[x1,y1]=pt(r1,a1),[x2,y2]=pt(r0,a1),[x3,y3]=pt(r0,a0),lg=a1-a0>180?1:0;return`M${x3},${y3} L${x0},${y0} A${r1},${r1} 0 ${lg} 1 ${x1},${y1} L${x2},${y2} A${r0},${r0} 0 ${lg} 0 ${x3},${y3} Z`};
function renderHuman(){
  const d=HUMAN[humanIndex];
  let sectors="";
  for(let i=0;i<10;i++){
    const [x0,y0]=pt(272,i*36-18),[x1,y1]=pt(272,i*36+18),[lx,ly]=pt(203,i*36);
    const lines=V[i].en==="Self-direction"?["Self-","direction"]:[V[i].en];
    sectors+=`<g role="button" tabindex="0" aria-label="${esc(V[i].en)} · ${esc(HUMAN[i].th)}" aria-pressed="${i===humanIndex}" data-value="${i}"><path class="human-sector ${groupOf(i)}${i===humanIndex?" selected":""}" d="M300,300 L${x0},${y0} A272,272 0 0 1 ${x1},${y1} Z"/>${V[i].en==="Hedonism"?`<path class="human-sector human-half g-open${i===humanIndex?" selected":""}" d="M300,300 L${pt(272,54).join(",")} A272,272 0 0 1 ${pt(272,72).join(",")} Z"/>`:""}<text text-anchor="middle" x="${lx}" y="${ly-lines.length*12+6}" class="human-label">${lines.map((line,j)=>`<tspan x="${lx}" dy="${j?24:0}">${esc(line)}</tspan>`).join("")}<tspan x="${lx}" dy="24" class="human-th">${esc(HUMAN[i].short)}</tspan></text></g>`;
  }
  const ring=VALUE_GROUPS.map((g,k)=>{const flip=(g.a0+g.a1)/2>90&&(g.a0+g.a1)/2<270,[sx,sy]=pt(296,flip?g.a1-3:g.a0+3),[ex,ey]=pt(296,flip?g.a0+3:g.a1-3);return`<path class="group-ring ${g.cls}" d="${band(278,314,g.a0,g.a1)}"/><path id="grp-arc-${k}" d="M${sx},${sy} A296,296 0 0 ${flip?0:1} ${ex},${ey}" fill="none"/><text class="group-label" dy="6"><textPath href="#grp-arc-${k}" startOffset="50%" text-anchor="middle">${g.th}</textPath></text>`}).join("");
  $("human-map").innerHTML=ring+sectors+'<circle cx="300" cy="300" r="82" fill="var(--panel)"/><text text-anchor="middle" x="300" y="292" class="human-label">Human<tspan x="300" dy="24">Values</tspan></text>';
  const select=i=>{humanIndex=i;renderHuman()};
  $("human-map").querySelectorAll("[data-value]").forEach(b=>{b.onclick=()=>select(+b.dataset.value);b.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();select(+b.dataset.value);$("human-map").querySelector(`[data-value="${humanIndex}"]`).focus()}}});
  $("human-detail").innerHTML=`<p class="detail-eyebrow">คุณค่าพื้นฐาน · ${humanIndex+1} / 10</p><h2>${esc(V[humanIndex].en)}</h2><h3>${esc(d.th)}</h3><p class="detail-description">${esc(d.description)}</p><div class="brand-interpretation"><p class="detail-eyebrow">ตัวอย่างการตีความแบรนด์</p><h4 class="brand-row">${logoHTML(d.brand)}${esc(d.brand)}</h4><p>${esc(d.example)}</p></div><p class="sub-q"><span class="q-pill">ชวนคิด</span><span>${esc(d.question)}</span></p>`;
  // Sub-values from Schwartz et al. (2012) refined theory; 4 values have none.
  $("human-subs").hidden=!d.subs;
  if(d.subs)$("human-subs").innerHTML=`<div class="human-subs-head"><h2>คุณค่าย่อยของ ${esc(V[humanIndex].en)} · ${d.subs.length} ข้อ</h2><span>แตกย่อยตาม Schwartz (2012)</span></div><div class="sub-cards">${d.subs.map(x=>`<article class="sub-card"><h3 lang="en">${esc(x[0])}${x[5]?`<span class="sub-between" lang="th">${esc(x[5])}</span>`:""}</h3><p class="sub-th">${esc(x[1])}</p><p>${esc(x[2])}</p><div class="sub-brand"><b>ตัวอย่างการตีความ</b><p class="brand-row">${logoHTML(x[4].split(":")[0])}<span><strong>${esc(x[4].split(":")[0])}</strong>${esc(x[4].slice(x[4].indexOf(":")))}</span></p></div><p class="sub-q"><span class="q-pill">ชวนคิด</span><span>${esc(x[3])}</span></p></article>`).join("")}</div>`;
}
// Click opens a native modal dialog; the pyramid stays in place.
elI=null;
const benefitDialog=$("benefit-dialog");
let benefitTrigger=null;
function closeBenefit(){benefitDialog.close()}
$("benefit-dialog-close").onclick=closeBenefit;
benefitDialog.addEventListener("click",e=>{if(e.target===benefitDialog){const r=benefitDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeBenefit()}});
benefitDialog.addEventListener("close",()=>{
  document.documentElement.classList.remove("benefit-modal-open");
  if(benefitTrigger&&benefitTrigger.isConnected)benefitTrigger.focus({preventScroll:true});
});
// Learning interpretations, not claims that these brands own a single benefit.
const BENEFIT_NOTES=[
 ["การซื้อหรือใช้ทำให้คนรู้สึกว่าตัวเองมีส่วนช่วยสิ่งที่ใหญ่กว่าประโยชน์ส่วนตัว เช่น ชุมชน สังคม หรือธรรมชาติ","Patagonia: ลองอ่านการซ่อมและใช้เสื้อผ้าต่อในมุมที่ผู้ใช้ได้มีส่วนลดการทิ้งของ","แสดงให้เห็นว่าการเลือกของลูกค้าเชื่อมกับผลต่อส่วนรวมอย่างไร","ต่างจากความรู้สึกเป็นสมาชิกกลุ่ม เพราะแกนหลักคือการช่วยสิ่งที่อยู่นอกตัวเอง"],
 ["ช่วยให้มองเห็นว่าอนาคตที่ต้องการยังเป็นไปได้ โดยมีเส้นทางหรือโอกาสให้เดินต่อ","คอร์สติวสอบ: เปลี่ยนจากความรู้สึกว่าไม่มีทางสอบผ่าน ให้เห็นแผนฝึกและพัฒนาการที่ทำได้","ทำให้เห็นก้าวถัดไปที่เป็นจริง พร้อมหลักฐานความคืบหน้า","ต่างจาก Motivation ที่เน้นลงมือทำ ส่วน Hope เน้นเชื่อว่าสิ่งที่ดีขึ้นเป็นไปได้"],
 ["ช่วยให้พัฒนาศักยภาพและใช้ชีวิตใกล้กับคนที่อยากเป็น ไม่ใช่เพียงทำงานหนึ่งให้เสร็จ","Coursera: การเรียนอาจเป็นส่วนหนึ่งของการพัฒนาตัวเองไปสู่อาชีพที่อยากทำ","เชื่อมความสามารถที่เพิ่มขึ้นกับภาพตัวเองที่ลูกค้าอยากไปถึง","ต่างจาก Badge value ซึ่งเน้นภาพที่สื่อออกไปให้คนอื่นเห็น"],
 ["ช่วยให้เริ่มลงมือ มีแรงทำต่อ และกลับมาทำซ้ำเมื่อความตั้งใจเริ่มลดลง","Duolingo: เป้าหมายเล็กและการเห็นความต่อเนื่องอาจช่วยให้กลับมาฝึกภาษา","ลดกำแพงการเริ่มต้นและให้ feedback ที่ช่วยรักษาความตั้งใจ","อย่าวัดเพียงการเปิดแอป ควรดูว่าผู้ใช้ทำพฤติกรรมที่ตั้งใจได้จริงหรือไม่"],
 ["คุณค่าไม่ได้จบที่เจ้าของคนปัจจุบัน แต่มีความหมายหรือประโยชน์ให้คนรุ่นถัดไป","ทองคำ: อาจถูกมองเป็นมรดกที่เก็บความทรงจำและส่งต่อในครอบครัว","อธิบายทั้งความทนทาน ความหมาย และวิธีดูแลเพื่อส่งต่อ","ความแพงเพียงอย่างเดียวไม่ได้แปลว่ามีคุณค่าต่อการส่งต่อ"],
 ["ทำให้รู้สึกว่าได้รับการยอมรับ มีคนที่เข้าใจ และเป็นส่วนหนึ่งของกลุ่มที่มีความหมาย","Harley-Davidson: ลองมองประสบการณ์การขี่ร่วมกันว่าเป็นพื้นที่ให้คนสร้างความสัมพันธ์","สร้างโอกาสให้สมาชิกมีปฏิสัมพันธ์และช่วยเหลือกันจริง","ต่างจาก Connects ที่ช่วยให้ติดต่อกันได้ แต่ยังไม่จำเป็นต้องรู้สึกเป็นพวกเดียวกัน"],
 ["ช่วยให้ใจสงบขึ้นเมื่อมีเรื่องไม่แน่นอน แม้ความเสี่ยงจริงอาจยังไม่ได้หายไปทั้งหมด","ประกันเดินทาง: การเข้าใจขั้นตอนขอความช่วยเหลืออาจทำให้ผู้เดินทางอุ่นใจขึ้น","บอกให้ชัดว่าเมื่อเกิดปัญหาจะได้รับความช่วยเหลืออะไรและอย่างไร","ต่างจาก Reduces risk ที่ต้องลดโอกาสหรือขนาดความเสียหายได้จริง"],
 ["ทำให้รู้สึกว่าได้รับสิ่งตอบแทนที่สมควรได้ อาจเป็นความสุขเล็ก ๆ หรือสิทธิประโยชน์จากการใช้ต่อเนื่อง","After You: ขนมอาจเป็นรางวัลหลังผ่านวันที่เหนื่อย มากกว่าแค่แก้หิว","หาโอกาสที่ลูกค้าอยากตอบแทนตัวเอง และทำให้ช่วงเวลานั้นพิเศษ","รางวัลไม่จำเป็นต้องเป็นส่วนลดหรือคะแนนเสมอไป"],
 ["ดึงความทรงจำที่มีความหมายกลับมา ทำให้ประสบการณ์ปัจจุบันเชื่อมกับช่วงเวลาดีในอดีต","LEGO: การกลับมาต่อของเล่นอาจชวนให้นึกถึงช่วงวัยเด็กหรือเวลาที่เล่นกับครอบครัว","เลือกสัญญาณความทรงจำที่ตรงกับคนกลุ่มนั้น เช่น กลิ่น เสียง หรือวิธีเล่น","ภาพย้อนยุคจะมีคุณค่านี้เมื่อเชื่อมกับความทรงจำของคนจริง ๆ"],
 ["ความงามและการออกแบบทำให้รู้สึกพอใจกับการเห็นหรือครอบครอง และอยากอยู่ร่วมกับสิ่งนั้น","SMEG: ตู้เย็นสีสวยทรงย้อนยุค อาจถูกซื้อมาเป็นของแต่งบ้าน ไม่ใช่แค่ไว้แช่ของ","อธิบายว่ารูปทรง วัสดุ และรายละเอียดช่วยสร้างประสบการณ์แบบใด","ต่างจาก Quality ซึ่งต้องพิสูจน์คุณภาพการใช้งาน ไม่ใช่ดูดีอย่างเดียว"],
 ["สินค้าเป็นสัญญาณที่ใช้สื่อรสนิยม สถานะ หรือกลุ่มที่อยากให้คนอื่นเชื่อมโยงกับตัวเอง","Freitag: กระเป๋าอาจสื่อรสนิยมด้านดีไซน์และความชอบสิ่งของที่มีเอกลักษณ์","ถามว่าการใช้แบรนด์นี้ทำให้คนอื่นอ่านตัวตนผู้ใช้อย่างไร","ต่างจาก Attractiveness ที่เน้นทำให้ตัวผู้ใช้ดูดีขึ้น"],
 ["ช่วยให้ดูแลสุขภาวะทางกายหรือใจในชีวิตประจำวัน โดยต้องเชื่อมกับผลที่เหมาะสมและมีหลักฐาน","Fitbit: การเห็นข้อมูลกิจกรรมอาจช่วยให้ผู้ใช้วางแผนดูแลตัวเองและติดตามพฤติกรรม","ระบุพฤติกรรมหรือผลด้านสุขภาวะที่สินค้าไปช่วยอย่างชัดเจน","อย่าแปลว่ามีข้อมูลสุขภาพแล้วจะทำให้สุขภาพดีโดยอัตโนมัติ"],
 ["ช่วยบรรเทาความตึงเครียดหรือความไม่สบาย ให้เกิดความรู้สึกผ่อนคลายและได้พักฟื้น","Calm: ช่วงเวลาฟังเสียงหรือฝึกหายใจอาจเป็นกิจวัตรที่ช่วยให้หยุดพักจากความวุ่นวาย","ออกแบบช่วงเวลาที่คนได้พักจริง และลดสิ่งรบกวนในประสบการณ์","ในที่นี้เป็นคุณค่าด้านประสบการณ์ ไม่ใช่ข้อสรุปว่าสินค้ารักษาโรคได้"],
 ["เติมความเพลิดเพลินให้ช่วงเวลาหนึ่ง ทำให้คนอยากใช้เวลากับประสบการณ์นั้น","Netflix: การเลือกเรื่องที่อยากดูอาจเปลี่ยนเวลาว่างให้เป็นช่วงพักที่สนุก","หาว่าสนุกแบบไหน สำหรับใคร และในสถานการณ์ใด","เวลาที่ใช้มากไม่ได้เท่ากับสนุกหรือพึงพอใจมากเสมอไป"],
 ["ช่วยให้ผู้ใช้รู้สึกว่ารูปลักษณ์ของตัวเองน่ามองหรือมั่นใจขึ้นในบริบทที่สำคัญ","เครื่องสำอาง: อาจช่วยให้คนเตรียมลุคที่อยากใช้ในวันทำงานหรือโอกาสพิเศษ","เริ่มจากภาพลักษณ์ที่ผู้ใช้อยากเลือกเอง และผลที่ผลิตภัณฑ์ทำได้จริง","ต่างจาก Design/aesthetics ที่ความสวยอยู่ที่ตัวสินค้า"],
 ["ทำให้เข้าถึงสถานที่ บริการ ประสบการณ์ หรือทรัพยากรที่เดิมเข้าถึงได้ยาก","บัตรสมาชิกที่มีสิทธิ์จองก่อน: คุณค่าอยู่ที่การได้โอกาสเข้าถึงสิ่งที่ต้องการ","ระบุให้ชัดว่าเข้าถึงอะไร เงื่อนไขคืออะไร และสำคัญต่อใคร","ความพิเศษต้องมีประโยชน์ต่อผู้ใช้ ไม่ใช่เพียงติดคำว่า exclusive"],
 ["ลดเวลารอหรือเวลาที่ต้องใช้กับงานเดิม ทำให้มีเวลาไปทำเรื่องอื่นที่สำคัญกว่า","Grab: การเรียกรถจากจุดที่อยู่ อาจลดเวลาที่ต้องออกไปหาและรอรถในบางสถานการณ์","เทียบขั้นตอนเดิมกับใหม่ แล้วชี้ว่าประหยัดเวลาตรงไหน","ต่างจาก Reduces effort เพราะเร็วขึ้นไม่ได้หมายความว่าออกแรงน้อยลงเสมอไป"],
 ["ลดความซับซ้อนและจำนวนสิ่งที่ต้องคิด ทำให้เข้าใจและทำงานหนึ่งให้เสร็จได้ง่ายขึ้น","พร้อมเพย์: การจ่ายด้วยการสแกนอาจช่วยลดความยุ่งยากของการกรอกข้อมูลผู้รับ","ลดการตัดสินใจที่ไม่จำเป็น ใช้คำชัด และทำให้ขั้นตอนต่อไปเดาได้","ต่างจาก Integrates เพราะรวมทุกอย่างไว้ด้วยกันก็ยังใช้งานยากได้"],
 ["ช่วยเพิ่มโอกาสสร้างรายได้หรือผลตอบแทนให้ผู้ใช้ โดยต้องคิดถึงต้นทุนที่เกี่ยวข้องด้วย","Shopee ฝั่งร้านค้า: ช่องทางขายอาจช่วยให้เข้าถึงลูกค้าและสร้างยอดขายเพิ่ม","อธิบายว่ารายได้มาจากไหน และมีต้นทุนหรือเงื่อนไขอะไร","ยอดขายเพิ่มไม่จำเป็นต้องแปลว่ากำไรเพิ่ม ควรแยกให้ชัด"],
 ["ลดโอกาสเกิดความเสียหาย หรือจำกัดผลเสียหากเกิดเหตุที่ไม่ต้องการ","ประกันรถ: บางความคุ้มครองช่วยจำกัดภาระค่าใช้จ่ายเมื่อเกิดเหตุ ตามเงื่อนไขกรมธรรม์","ระบุความเสียหายที่ช่วยลด พร้อมขอบเขตและข้อยกเว้น","ต่างจาก Reduces anxiety ซึ่งเน้นความอุ่นใจที่ผู้ใช้รับรู้"],
 ["ช่วยจัดหมวดหมู่ วางแผน หรือค้นคืนสิ่งต่าง ๆ ได้ ทำให้จัดการชีวิตและงานได้เป็นระบบ","Google Calendar: การเห็นนัดหมายรวมกันอาจช่วยจัดเวลาและลดการลืมนัด","แสดงให้เห็นว่าจากข้อมูลหรือสิ่งของที่กระจัดกระจาย กลายเป็นระบบที่ใช้ต่อได้อย่างไร","จัดให้สวยอย่างเดียวไม่พอ ต้องหาเจอและนำไปใช้ได้ง่ายด้วย"],
 ["เชื่อมสิ่งที่แยกกันให้ทำงานร่วมกัน ลดภาระการสลับระบบหรือส่งข้อมูลซ้ำ","LINE: ลองดูการใช้ฟังก์ชันหลายอย่างต่อเนื่องในพื้นที่เดียว ว่าช่วยลดการสลับไปมาอย่างไร","เน้นความต่อเนื่องของงานและข้อมูล มากกว่าจำนวนฟีเจอร์","ต่างจาก Variety ซึ่งเน้นมีทางเลือก ไม่ใช่ทำให้หลายส่วนทำงานร่วมกัน"],
 ["ทำให้คนติดต่อ แลกเปลี่ยน หรือร่วมมือกันได้ แม้อยู่คนละสถานที่","LINE: การส่งข้อความและคุยกลุ่มช่วยให้คนประสานงานหรือติดต่อคนใกล้ตัว","ระบุว่าเชื่อมใครกับใคร และลดอุปสรรคในการติดต่ออะไร","การติดต่อได้ไม่เท่ากับรู้สึกเป็นส่วนหนึ่งเสมอไป จึงต่างจาก Belonging"],
 ["ลดแรงกายหรือภาระที่ต้องลงมือทำด้วยตัวเอง แม้งานนั้นอาจยังใช้เวลาเท่าเดิม","หุ่นยนต์ดูดฝุ่น: คุณค่าอาจอยู่ที่ไม่ต้องลงมือทำความสะอาดพื้นเองทุกครั้ง","ดูภาระทั้งหมด รวมการตั้งค่า ดูแล และแก้ปัญหาหลังใช้","ต่างจาก Saves time เพราะผู้ใช้อาจไม่ต้องออกแรง แต่ยังต้องรอให้งานเสร็จ"],
 ["ช่วยเลี่ยงปัญหาจุกจิก การตามเรื่อง หรือความยุ่งยากที่ทำให้การใช้บริการน่าปวดหัว","บริการรับคืนสินค้าถึงบ้าน: อาจลดภาระเดินทางและประสานงานเมื่อของไม่ตรงใจ","หาจุดที่คนต้องตามงานหรือแก้ปัญหาซ้ำ แล้วทำให้จบง่าย","ต่างจาก Simplifies ที่เน้นงานหลักเข้าใจง่าย ส่วนนี้เน้นเรื่องติดขัดรอบประสบการณ์"],
 ["ช่วยให้ใช้เงินน้อยลงสำหรับผลลัพธ์ที่ต้องการ โดยควรคิดค่าใช้จ่ายตลอดการใช้งาน","Makro: การซื้อขนาดหรือจำนวนที่เหมาะสมอาจช่วยลดต้นทุนต่อหน่วยของผู้ซื้อบางกลุ่ม","เทียบต้นทุนรวมกับทางเลือกจริง รวมค่าส่ง การเก็บ และของที่อาจเหลือทิ้ง","ราคาต่อชิ้นต่ำไม่จำเป็นต้องประหยัด หากต้องซื้อเกินความต้องการ"],
 ["ทำหน้าที่ได้ดีและสม่ำเสมอตามที่คาดหวัง จนผู้ใช้เชื่อถือผลลัพธ์ได้","Toyota: ลองหาหลักฐานเรื่องความสม่ำเสมอในการใช้งานและการดูแล เพื่ออธิบายคุณภาพ","เปลี่ยนคำว่าดีให้เป็นเกณฑ์ที่ตรวจได้ เช่น ความทนทานหรือความแม่นยำ","ราคาแพงหรือภาพลักษณ์พรีเมียมเป็นเพียงสัญญาณ ยังไม่ใช่หลักฐานคุณภาพ"],
 ["มีตัวเลือกครอบคลุมความต้องการที่ต่างกัน ทำให้มีโอกาสเจอสิ่งที่เหมาะกับตัวเอง","Netflix: ความหลากหลายของเรื่องและประเภทอาจช่วยให้คนเลือกตามอารมณ์หรือความชอบ","จัดหมวดและช่วยคัดเลือก เพื่อให้ความหลากหลายกลายเป็นประโยชน์","ตัวเลือกมากเกินไปโดยไม่มีตัวช่วย อาจทำให้เลือกยากขึ้น"],
 ["สร้างความพึงพอใจผ่านรส กลิ่น เสียง สัมผัส หรือสิ่งที่เห็นระหว่างใช้สินค้า","Lay’s: ความกรอบและเสียงขณะเคี้ยวอาจเป็นส่วนหนึ่งของความอร่อยที่คนรับรู้","หาสัมผัสที่มีผลต่อประสบการณ์จริง และทำให้เกิดอย่างสม่ำเสมอ","ต่างจาก Design/aesthetics ที่เน้นความงาม ส่วนนี้รวมประสาทสัมผัสหลายด้าน"],
 ["ให้ข้อมูลที่ช่วยลดสิ่งที่ไม่รู้ ทำให้ประเมินทางเลือกและตัดสินใจได้ดีขึ้น","Google Maps: ข้อมูลเส้นทางและสถานที่อาจช่วยวางแผนก่อนออกเดินทาง","ให้ข้อมูลที่ตรงกับการตัดสินใจ ณ เวลานั้น พร้อมความชัดเจนเรื่องแหล่งที่มา","ข้อมูลมากไม่เท่ากับมีประโยชน์ ต้องอ่านเข้าใจและใช้ตัดสินใจได้ด้วย"]
];
// Ladder from benefit to Human Value (index into HUMAN), for the 16 non-functional elements. Interpretations for teaching.
const BENEFIT_LADDER=[
 ["Patagonia รับซ่อมเสื้อผ้า","ได้มีส่วนช่วยลดการทิ้งของ",9],["คอร์สติววางแผนฝึกให้","เห็นว่าสอบผ่านได้จริง",3],["Coursera คอร์สสู่อาชีพใหม่","ได้เป็นคนที่อยากเป็น",0],["Duolingo เป้าหมายเล็ก ๆ ทุกวัน","มีแรงทำต่อ",3],["ทองคำที่ส่งต่อในครอบครัว","เก็บความทรงจำให้รุ่นถัดไป",7],["Harley-Davidson ทริปขี่ด้วยกัน","ได้เพื่อนที่รักสิ่งเดียวกัน",8],
 ["ประกันเดินทาง ขั้นตอนชัด","อุ่นใจระหว่างทาง",5],["After You ขนมหลังวันเหนื่อย","ได้ให้รางวัลตัวเอง",2],["LEGO ของเล่นที่คุ้นมือ","นึกถึงวัยเด็กกับครอบครัว",8],["SMEG ตู้เย็นสีสวยทรงย้อนยุค","บ้านดูสวยขึ้น",2],["Freitag กระเป๋ามีเอกลักษณ์","บอกรสนิยมของตัวเอง",0],
 ["Fitbit แสดงข้อมูลกิจกรรม","ดูแลสุขภาพได้ต่อเนื่อง",5],["Calm ฝึกหายใจ","ได้หยุดพักจากความวุ่นวาย",2],["Netflix เลือกเรื่องที่อยากดู","เวลาว่างกลายเป็นช่วงสนุก",2],["เครื่องสำอาง","มั่นใจในลุคของตัวเอง",4],["บัตรสมาชิกจองก่อน","ได้สิ่งที่คนอื่นยังไม่ได้",4]
];
const ladderHTML=i=>{const l=BENEFIT_LADDER[i];return l?`<section class="benefit-ladder"><h3>จากแบรนด์ ถึงคุณค่าที่คนแคร์</h3><div class="ladder-steps"><div class="ladder-step"><small>แบรนด์ทำ</small>${esc(l[0])}</div><div class="ladder-step"><small>คนได้ประโยชน์</small>${esc(l[1])}</div><button class="ladder-step ladder-value" id="benefit-ladder-go" data-value="${l[2]}"><small>เพราะเขาแคร์</small>${esc(HUMAN[l[2]].th)}</button></div><p class="ladder-note">แตะช่องสีเหลืองเพื่อเปิดคุณค่านี้ในบทที่ 1 · แบรนด์หนึ่งอาจเชื่อมได้หลายคุณค่า</p></section>`:""};
function showBenefit(i){
  elI=i;benefitTrigger=document.activeElement;
  $("el-pyr").querySelectorAll(".benefit-trigger").forEach(b=>b.setAttribute("aria-pressed",+b.dataset.i===i));
  const e=EOV[i],d=EOVD[i],note=BENEFIT_NOTES[i];
  $("benefit-dialog-tier").innerHTML=`${esc(EOVL[e[0]])} <span lang="en">· ${esc(EOVLE[e[0]])}</span>`;
  $("benefit-dialog-en").innerHTML=esc(e[2]).replace(/\//g,"/<wbr>");
  $("benefit-dialog-subtitle").textContent="· "+e[1];
  $("benefit-dialog-body").innerHTML=`<p class="benefit-summary">${esc(note[0])}</p><section class="benefit-case"><h3>ตัวอย่างแบรนด์</h3><p class="brand-row">${logoHTML(note[1].split(":")[0])}<span><strong>${esc(note[1].split(":")[0])}</strong>${esc(note[1].slice(note[1].indexOf(":")))}</span></p></section>${ladderHTML(i)}<section class="benefit-apply"><div class="benefit-compact-grid"><div class="benefit-reading"><h3>นำไปใช้</h3><p>${esc(note[2])}</p></div><div class="benefit-distinction"><h3>แยกให้ออก</h3><p>${esc(note[3])}</p></div></div></section><p class="sub-q"><span class="q-pill">ลองคิดต่อ</span><span>${esc(d[2])}?</span></p><footer class="benefit-source">Bain & Company · Elements of Value · ตัวอย่างเป็นการตีความเพื่อเรียนรู้</footer>`;
  const go=$("benefit-ladder-go");
  if(go)go.onclick=()=>{benefitTrigger=null;closeBenefit();humanIndex=+go.dataset.value;courseTo("human","learn");$("course-title").scrollIntoView({block:"start",behavior:reduce?"auto":"smooth"})};
  document.documentElement.classList.add("benefit-modal-open");
  benefitDialog.showModal();
  benefitDialog.scrollTop=0;
}
renderEl=function(){
  $("el-info").hidden=true;
  $("el-pyr").innerHTML='<p class="benefit-hint">คลิกหัวข้อ เพื่ออ่านความหมาย ตัวอย่างแบรนด์ และคำถามชวนคิด</p>'+EOVL.map((title,level)=>{
    const ids=EOV.map((e,i)=>e[0]===level?i:-1).filter(i=>i>=0),per=ids.length>7?Math.ceil(ids.length/2):ids.length;
    let rows="";
    for(let j=0;j<ids.length;j+=per)rows+=`<div class="pyr-r">${ids.slice(j,j+per).map(i=>`<button class="pt benefit-trigger" data-i="${i}" aria-pressed="${i===elI}" aria-haspopup="dialog" aria-controls="benefit-dialog"><span lang="en">${esc(EOV[i][2]).replace(/\//g,"/<wbr>")}</span><small>${esc(EOV[i][1])}</small></button>`).join('')}</div>`;
    return `<section class="benefit-tier"><h2 class="benefit-tier-title">${esc(title)} <small lang="en">${esc(EOVLE[level])}</small></h2>${rows}</section>`;
  }).join('');
  $("el-pyr").querySelectorAll(".benefit-trigger").forEach(b=>{
    b.onclick=()=>showBenefit(+b.dataset.i);
  });
};

showTab=function(view){
  if(view==="play"){["examples","elements","live","human-lesson","quiz-pick"].forEach(id=>$(id).hidden=true);$("play").hidden=false;$("lesson-bottom").hidden=true;closeMenu();render();return}
  courseTo(view==="pyr"||view==="live"?"quiz":view==="elements"?"benefits":"human",view==="pyr"?"pyramid":view==="live"?"value":null);
};
document.querySelectorAll(".module-tab").forEach(b=>b.onclick=()=>courseTo(b.dataset.course));
document.querySelectorAll("[data-quiz]").forEach(b=>b.onclick=()=>courseTo("quiz",b.dataset.quiz));
const routeFromHash=()=>{const[c,q]=location.hash.slice(2).split("/");if(!Object.hasOwn(LESSONS,c))return false;courseTo(c,q,true);return true};
addEventListener("hashchange",routeFromHash);
if(!routeFromHash())courseTo(L&&L.code?"quiz":"human",L&&L.code?(L.mode==="pyr"?"pyramid":"value"):null,true);
