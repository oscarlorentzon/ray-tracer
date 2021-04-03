export function containerPosition(event, container) {
    const clientRect = container.getBoundingClientRect();
    const x = event.clientX - clientRect.left - container.clientLeft;
    const y = event.clientY - clientRect.top - container.clientTop;
    return [x, y];
}
//# sourceMappingURL=DOM.js.map