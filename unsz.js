function unfuckElement(o){
    return `<pre>${JSON.stringify(o,null,4)}</pre>`;
}

function unfuckAll(os){
    document.querySelectorAll('style,link[rel="stylesheet"]').forEach(item => item.remove());
    document.body.innerHTML=
        `<link rel="stylesheet" href="https://das-ulicorn.github.io/unrnd/unsz.css" />
        ${Array.from(os.map(unfuckElement)).join("\n")}
        `
}

unfuckAll(document.querySelectorAll("[data-hydration-props-component-name]")
	  .values().map( o => JSON.parse(decodeURIComponent(o.innerText))));
