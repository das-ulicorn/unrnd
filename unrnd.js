function unfuck(o){
    document.querySelectorAll('style,link[rel="stylesheet"]').forEach(item => item.remove());
    document.body.innerHTML=`<link rel="stylesheet" href="https://das-ulicorn.github.io/unrnd/unrnd.css" /><h1>${o.headline}</h1><p><b>${o.subHeadline}</b></p><figure><img src="${o.promoImage.src}" /><figcaption>${o.promoImage.caption}</figcaption></figure>`;
    o.elements.forEach((x) => {
	switch (x.type){
	case 'ad':
	case 'piano':
	    break;
	case 'header':
	    document.body.innerHTML+=`<h2>${x.text}</h2>`;
	    break;
	case 'text':
	    document.body.innerHTML+=`<p>${x.text}</p>`;
	    break;
	case 'rawHtml':
	    document.body.innerHTML+=`<p>${x.html}</p>`;
	    break;
	case 'image':
	    document.body.innerHTML+=`<figure><img src="${x.imageInfo.src}" /><figcaption>${x.imageInfo.caption}</figcaption></figure>`;
	    break;
	case 'list':
	    document.body.innerHTML+= (x.list.isOrdered? '<ol>':'<ul>');
	    x.list.items.forEach((a) => {
		document.body.innerHTML += `<li>${a.text}</li>`;
	    });
	    document.body.innerHTML += (x.list.isOrdered? '</ol>':'</ul>');
	    break;
	default:
	    document.body.innerHTML += `<details><summary>Unknown type ${x.type}</summary><pre>${JSON.stringify(x,null,4)}</pre></details>`;
	}
    });
}

eval(document.getElementById('fusion-metadata').innerHTML);
unfuck(Fusion.globalContent);
