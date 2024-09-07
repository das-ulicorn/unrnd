function unfuck(o){
    document.querySelectorAll('style,link[rel="stylesheet"]').forEach(item => item.remove());
    document.body.innerHTML=`<h1>${o.headline}</h1><p><b>${o.subHeadline}</b></p>`;
    o.elements.forEach((x) => {
	switch (x.type){
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
	}
    });
}
unfuck(Fusion.globalContent);
