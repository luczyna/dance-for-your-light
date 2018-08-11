import { shallowMount } from '@vue/test-utils';
import Game from '@/views/Game.vue';

describe('Dancing at Game', () => {
  let service;

  beforeEach(() => {
    service = shallowMount(Game);
  });

  it('stores a log of key presses', () => {
    service.vm.log('a');
    service.vm.log('b');
    service.vm.log('c');
    service.vm.log('d');

    expect(service.vm.keylog.length).not.toBe(0);

    expect(service.vm.keylog[0]).toBe('a');
    expect(service.vm.keylog[1]).toBe('b');
    expect(service.vm.keylog[2]).toBe('c');
    expect(service.vm.keylog[3]).toBe('d');
  });

  describe('the SHIMEE move', () => {
    it('detects the move by itself', () => {
      service.vm.log('a');
      service.vm.log('a');
      service.vm.log('b');

      expect(service.vm.detectMove()).toBeDefined();
      expect(service.vm.detectMove().danceMatch).toBe('shimee');
    });

    it('detects the move when preceeded with other moves', () => {
      service.vm.log('d');
      service.vm.log('a');
      service.vm.log('a');
      service.vm.log('a');
      service.vm.log('b');

      expect(service.vm.detectMove()).toBeDefined();
      expect(service.vm.detectMove().danceMatch).toBe('shimee');
    });

    it('ignores mismatches to the SHIMEE', () => {
      service.vm.log('a');
      service.vm.log('a');
      service.vm.log('d');

      expect(service.vm.detectMove()).toBeNull();
    });
  });

  describe('the SHAKE move', () => {
    it('detects the move by itself', () => {
      service.vm.log('c');
      service.vm.log('a');
      service.vm.log('c');

      expect(service.vm.detectMove()).toBeDefined();
      expect(service.vm.detectMove().danceMatch).toBe('shake');
    });

    it('detects the move when preceeded with other moves', () => {
      service.vm.log('d');
      service.vm.log('a');
      service.vm.log('c');
      service.vm.log('a');
      service.vm.log('c');

      expect(service.vm.detectMove()).toBeDefined();
      expect(service.vm.detectMove().danceMatch).toBe('shake');
    });

    it('ignores mismatches to the SHAKE', () => {
      service.vm.log('c');
      service.vm.log('a');
      service.vm.log('d');

      expect(service.vm.detectMove()).toBeNull();
    });
  });

  describe('the YOLO move', () => {
    it('detects the move by itself', () => {
      service.vm.log('d');
      service.vm.log('a');
      service.vm.log('a');
      service.vm.log('c');

      expect(service.vm.detectMove()).toBeDefined();
      expect(service.vm.detectMove().danceMatch).toBe('yolo');
    });

    it('detects the move when preceeded with other moves', () => {
      service.vm.log('d');
      service.vm.log('d');
      service.vm.log('a');
      service.vm.log('a');
      service.vm.log('c');

      expect(service.vm.detectMove()).toBeDefined();
      expect(service.vm.detectMove().danceMatch).toBe('yolo');
    });

    it('ignores mismatches to the YOLO', () => {
      service.vm.log('b');
      service.vm.log('a');
      service.vm.log('a');
      service.vm.log('c');

      expect(service.vm.detectMove()).toBeNull();
    });
  });
});
