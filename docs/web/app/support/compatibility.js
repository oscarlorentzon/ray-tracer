export function createCompatibility() {
    const supportText = 'Your browser does not support web workers using' +
        ' ECMAScript modules. See ';
    const mdnHref = 'https://developer.mozilla.org/en-US/docs/' +
        'Web/API/Worker/Worker#browser_compatibility';
    const compatibilityText = ' for browser compatibility.';
    const support = document.createElement('span');
    support.textContent = supportText;
    const mdn = document.createElement('a');
    mdn.href = mdnHref;
    mdn.target = '_blank';
    mdn.rel = 'noopener noreferrer';
    mdn.textContent = 'MDN Web Docs';
    const compatibility = document.createElement('span');
    compatibility.textContent = compatibilityText;
    const container = document.createElement('div');
    container.append(support, mdn, compatibility);
    container.className = 'ray-tracer-compatibility';
    return container;
}
//# sourceMappingURL=compatibility.js.map