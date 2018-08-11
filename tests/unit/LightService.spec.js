import { shallowMount } from '@vue/test-utils';
import Game from '@/views/Game.vue';

describe('Light at Game', () => {
  let service;

  beforeEach(() => {
    service = shallowMount(Game);
  });

  describe('stores important variables', () => {
    it('keeps track of light levels', () => {
      expect(service.vm.light).toBeDefined();
    });

    it('keeps a reference to the light replenishing loop', () => {
      expect(service.vm.lightLoop).toBeDefined();
    });

    it('keeps track of the light limit', () => {
      expect(service.vm.lightLimit).toBeDefined();
    });

    it('starts the light out at max', () => {
      expect(service.vm.light === service.vm.lightLimit).toBe(true);
    });
  });

  describe('#decreaseLight', () => {
    it('reduces the light level by 1, at default', () => {
      service.vm.light = 5;
      service.vm.decreaseLight();
      expect(service.vm.light).toBe(4);
    });

    it('reduced the light level by the amount it is provided', () => {
      service.vm.light = 5;
      service.vm.decreaseLight(4);
      expect(service.vm.light).toBe(1);
    });

    it('keeps the light at a minimum of 0', () => {
      service.vm.light = 5;
      service.vm.decreaseLight(10);
      expect(service.vm.light).toBe(0);
    });
  });

  describe('#increaseLight', () => {
    it('increases the light level by 1, at default', () => {
      service.vm.light = 5;
      service.vm.increaseLight();
      expect(service.vm.light).toBe(6);
    });

    it('increases the light level by the amount it is provided', () => {
      service.vm.light = 3;
      service.vm.increaseLight(3);
      expect(service.vm.light).toBe(6);
    });

    it('keeps the light at a maximum of the lightLimit', () => {
      service.vm.light = 5;
      service.vm.increaseLight(10);
      expect(service.vm.light).toBe(service.vm.lightLimit);
    });
  });

  describe('#startLightLoop', () => {
    it('stores an interval at the lightLoop', () => {
      service.vm.startLightLoop();
      expect(service.vm.lightLoop).not.toBeNull();
    });
  });

  describe('#stopLightLoop', () => {
    it('stops the interval for the light replenishment', () => {
      service.vm.startLightLoop();
      service.vm.stopLightLoop();
      expect(service.vm.lightLoop).toBeNull();
    });
  });

  describe('#judgeDance', () => {
    it('determines that the shimee brings back 1 light', () => {
      service.vm.light = 3;
      service.vm.judgeDance('shimee');
      expect(service.vm.light).toBe(4);
    });

    it('determines that the shake brings back 1 light', () => {
      service.vm.light = 3;
      service.vm.judgeDance('shake');
      expect(service.vm.light).toBe(4);
    });

    it('determines that the yolo brings back 2 light', () => {
      service.vm.light = 3;
      service.vm.judgeDance('yolo');
      expect(service.vm.light).toBe(5);
    });

    it('no light is gained if it does not recognise the move', () => {
      service.vm.light = 3;
      service.vm.judgeDance('unknown');
      expect(service.vm.light).toBe(3);
    });
  });
});
