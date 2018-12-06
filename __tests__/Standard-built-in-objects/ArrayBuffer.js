it(`The ArrayBuffer object is used to represent a generic, fixed-length raw binary data buffer. `, () => {
    const buffer = new ArrayBuffer(8)
    expect(buffer.byteLength).toBe(8)
    const buffer1 = new ArrayBuffer(8);
    const view = new Int32Array(buffer1);
    expect(view).toEqual(new Int32Array([0, 0]))
});