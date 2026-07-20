const db={
fresh:["Prada L'Homme","Clean, refined and quietly luxurious."],
woody:["Terre d'Hermès EDT","Earthy sophistication with mature confidence."],
office:["Prada L'Homme","Perfect for polished professional settings."],
creative:["Dior Homme Original","Distinctive artistic iris signature."],
versatile:["Bleu de Chanel EDT","Elegant all-round companion."],
"hotel lobby":["Prada L'Homme","Clean linen and refined luxury ambience."]
};
function ask(){
let q=document.getElementById('q').value.toLowerCase();
let found=null;
for (let k in db){if(q.includes(k)){found=db[k];break;}}
let o=document.getElementById('out');
if(found){o.innerHTML=`<h3>I'd style you with <b>${found[0]}</b></h3><p>${found[1]}</p>`;}
else{o.innerHTML="<h3>I'm still learning.</h3><p>Try: fresh, woody, office, creative, versatile, hotel lobby.</p>";}
}