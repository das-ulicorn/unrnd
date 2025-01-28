function unfuckComponent(o){
    switch (o.component.substring(0,8)){

    case "articleH":
	return `${o.content.overline}<br />
<h1>${o.content.title}</h1>
<p>${o.content.teaserText}</p>
${unfuckComponent(o.content.topAsset)}
`;
	break;

    case "paragrap":
	return `<p>${o.content.html}</p>`;
	break;

    case "subheadi":
	return `<h2>${o.content.text}</h2>`;
	break;

    case "image":
	return `<figure><img src="${o.content.image.url}"/>
        <figcaption>${o.content.caption.html}</figcaption></figure>`;
	break;
	
    case "youtube":
	return `<figure><iframe src="${o.content.url.replace('watch?v=','embed/')}"></iframe></figure>`
	//return o.content.html;
	break;
	
    case "iqadtile":
    case "articleT":
    case "newslett":
	return "";
	
    default:
	return `<details><summary>Unknown type <code>${o.component}</code></summary><pre>${JSON.stringify(o,null,4)}</pre></details>`;
    }
    
}

function unfuckElement(o){
    if (!o['uiArticleContent']) return;
    return o['uiArticleContent'].map(unfuckComponent).join("\n");
    
}

function unfuckAll(os){
    document.querySelectorAll('style,link[rel="stylesheet"]').forEach(item => item.remove());
    document.body.innerHTML=
        `<link rel="stylesheet" href="https://das-ulicorn.github.io/unrnd/unsz.css" />
        ${Array.from(os.map(unfuckElement)).join("\n")}`;
}

unfuckAll(document.querySelectorAll("[data-hydration-props-component-name]")
	  .values().map( o => JSON.parse(decodeURIComponent(o.innerText))));
