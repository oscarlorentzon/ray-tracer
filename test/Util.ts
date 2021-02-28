export function expectMatrixToBe(
    recieved: Array<number>,
    expected: Array<number>): void {
    expect(recieved.length).toBe(16);
    for (let i = 0; i < recieved.length; ++i) {
        expect(recieved[i]).toBe(expected[i]);
    }
}

export function expectMatrixToBeCloseTo(
    recieved: Array<number>,
    expected: Array<number>,
    numDigits: number): void {
    expect(recieved.length).toBe(16);
    for (let i = 0; i < recieved.length; ++i) {
        expect(recieved[i]).toBeCloseTo(expected[i], numDigits);
    }
}
