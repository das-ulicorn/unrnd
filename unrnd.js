function unfuckElement(x){
    switch (x.type){
    case 'ad':
    case 'piano':
	return '';

    case 'header':
	return `<h2>${x.text}</h2>`;

    case 'text':
	return `<p>${x.text}</p>`;

    case 'rawHtml':
	return `<p>${x.html}</p>`;

    case 'image':
	return `<figure><img src="${x.imageInfo.src}" /><figcaption>${x.imageInfo.caption}</figcaption></figure>`;

    case 'list':
	var tag = (x.list.isOrdered? 'ol':'ul'),
	    mkli = a => `<li>${a.text}</li>`;
	return `<${tag}>${x.list.items.map(mkli).join('')}</${tag}>`;

    case 'video':
	var mksrc = s => `<source src="${s.url}" />`;
	return `<video controls  poster="${x.videoInfo.promoImage.src}" preload="metadata">
                 <img src="${x.videoInfo.promoImage.src}" />
                 ${x.videoInfo.streams.reverse().map(mksrc).join('')}</video>`;

    default:
	return `<details><summary>Unknown type <code>${x.type}</code></summary><pre>${JSON.stringify(x,null,4)}</pre></details>`;

    }
};


function unfuckAll(o){
    document.querySelectorAll('style,link[rel="stylesheet"]').forEach(item => item.remove());
    document.body.innerHTML=
	`<link rel="stylesheet" href="https://das-ulicorn.github.io/unrnd/unrnd.css" />
         <h1>${o.headline}</h1>
         <p><b>${o.subHeadline}</b></p>
         <figure><img src="${o.promoImage.src}" /><figcaption>${o.promoImage.caption}</figcaption></figure>
         ${o.elements.map(unfuckElement).join("\n")}`;
}

eval(document.getElementById('fusion-metadata').innerHTML);
unfuckAll(Fusion.globalContent);
