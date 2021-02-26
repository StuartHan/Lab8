const formatVolumeIconPath = require('../assets/scripts/main');

describe('Test formatVolumeIconPath() in /assets/scripts/main.js', () => {
    // Volume 0 -> Icon 0
    test('Volume = 0, then displays volume-level-0', () => {
        expect(formatVolumeIconPath(0)).toMatch('volume-level-0');
    });

    // Volume 1 -> Icon 1
    test('Volume = 1, then displays volume-level-1', () => {
        expect(formatVolumeIconPath(1)).toMatch('volume-level-1');
    });

    // Volume 33 -> Icon 1
    test('Volume = 33, then displays volume-level-1', () => {
        expect(formatVolumeIconPath(33)).toMatch('volume-level-1');
    });

    // Volume 34 -> Icon 2
    test('Volume = 34, then displays volume-level-2', () => {
        expect(formatVolumeIconPath(34)).toMatch('volume-level-2');
    });

    // Volume 66 -> Icon 2
    test('Volume = 66, then displays volume-level-2', () => {
        expect(formatVolumeIconPath(66)).toMatch('volume-level-2');
    });

    // Volume 67 -> Icon 3
    test('Volume = 67, then displays volume-level-3', () => {
        expect(formatVolumeIconPath(67)).toMatch('volume-level-3');
    });

    // Volume 100 -> Icon 3
    test('Volume = 100, then displays volume-level-3', () => {
        expect(formatVolumeIconPath(100)).toMatch('volume-level-3');
    });
});