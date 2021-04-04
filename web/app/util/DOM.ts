export function containerPosition(
    event: MouseEvent,
    container: HTMLElement)
    : number[] {
    const clientRect = container.getBoundingClientRect();
    const x = event.clientX - clientRect.left - container.clientLeft;
    const y = event.clientY - clientRect.top - container.clientTop;
    return [x, y];
}
