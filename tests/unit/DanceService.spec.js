import { shallowMount } from '@vue/test-utils';
import Game from '@/views/Game.vue';

describe('Dancing at Game', () => {
  let service;

  beforeEach(() => {
    service = shallowMount(Game);
  });

  it('stores a log of key presses', () => {
    service.vm.logMove('a');
    service.vm.logMove('b');
    service.vm.logMove('c');
    service.vm.logMove('d');

    expect(service.vm.keylog.length).not.toBe(0);

    expect(service.vm.keylog[0]).toBe('a');
    expect(service.vm.keylog[1]).toBe('b');
    expect(service.vm.keylog[2]).toBe('c');
    expect(service.vm.keylog[3]).toBe('d');
  });

  describe('the SHIMEE move', () => {
    it('detects the move by itself', () => {
      service.vm.logMove('a');
      service.vm.logMove('a');
      service.vm.logMove('b');

      expect(service.vm.detectMove()).toBeDefined();
      expect(service.vm.detectMove().match.name).toBe('shimee');
    });

    it('detects the move when preceeded with other moves', () => {
      service.vm.logMove('d');
      service.vm.logMove('a');
      service.vm.logMove('a');
      service.vm.logMove('a');
      service.vm.logMove('b');

      expect(service.vm.detectMove()).toBeDefined();
      expect(service.vm.detectMove().match.name).toBe('shimee');
    });

    it('ignores mismatches to the SHIMEE', () => {
      service.vm.logMove('a');
      service.vm.logMove('a');
      service.vm.logMove('d');

      expect(service.vm.detectMove().match).toBeNull();
    });
  });

  describe('the SHAKE move', () => {
    it('detects the move by itself', () => {
      service.vm.logMove('c');
      service.vm.logMove('a');
      service.vm.logMove('c');

      expect(service.vm.detectMove()).toBeDefined();
      expect(service.vm.detectMove().match.name).toBe('shake');
    });

    it('detects the move when preceeded with other moves', () => {
      service.vm.logMove('d');
      service.vm.logMove('a');
      service.vm.logMove('c');
      service.vm.logMove('a');
      service.vm.logMove('c');

      expect(service.vm.detectMove()).toBeDefined();
      expect(service.vm.detectMove().match.name).toBe('shake');
    });

    it('ignores mismatches to the SHAKE', () => {
      service.vm.logMove('c');
      service.vm.logMove('a');
      service.vm.logMove('d');

      expect(service.vm.detectMove().match).toBeNull();
    });
  });

  describe('the YOLO move', () => {
    it('detects the move by itself', () => {
      service.vm.logMove('d');
      service.vm.logMove('a');
      service.vm.logMove('a');
      service.vm.logMove('c');

      expect(service.vm.detectMove()).toBeDefined();
      expect(service.vm.detectMove().match.name).toBe('yolo');
    });

    it('detects the move when preceeded with other moves', () => {
      service.vm.logMove('d');
      service.vm.logMove('d');
      service.vm.logMove('a');
      service.vm.logMove('a');
      service.vm.logMove('c');

      expect(service.vm.detectMove()).toBeDefined();
      expect(service.vm.detectMove().match.name).toBe('yolo');
    });

    it('ignores mismatches to the YOLO', () => {
      service.vm.logMove('b');
      service.vm.logMove('a');
      service.vm.logMove('a');
      service.vm.logMove('c');

      expect(service.vm.detectMove().match).toBeNull();
    });
  });

  describe('diminishing returns', () => {
    it('punishes players for spamming a dance', () => {
      // play the SHIMEE move
      service.vm.logMove('c');
      service.vm.logMove('a');
      service.vm.logMove('c');
      service.vm.detectMove();

      // now SPAM the SHIMEE move
      service.vm.logMove('c');
      service.vm.logMove('a');
      service.vm.logMove('c');
      const result = service.vm.detectMove();
      expect(result.useful).toBe(false);
    });
  });
});
