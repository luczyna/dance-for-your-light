import { shallowMount } from '@vue/test-utils';
import Game from '@/views/Game.vue';

describe('Energy at Game', () => {
  let service;

  beforeEach(() => {
    service = shallowMount(Game);
  });

  describe('stores important variables', () => {
    it('keeps track of energy levels', () => {
      expect(service.vm.energy).toBeDefined();
    });

    it('keeps a reference to the energy replenishing loop', () => {
      expect(service.vm.energyLoop).toBeDefined();
    });

    it('keeps track of the energy limit', () => {
      expect(service.vm.energyLimit).toBeDefined();
    });

    it('starts the energy out at max', () => {
      expect(service.vm.energy === service.vm.energyLimit).toBe(true);
    });
  });

  describe('#decreaseEnergy', () => {
    it('reduces the energy level by 1, at default', () => {
      service.vm.energy = 5;
      service.vm.decreaseEnergy();
      expect(service.vm.energy).toBe(4);
    });

    it('reduced the energy level by the amount it is provided', () => {
      service.vm.energy = 5;
      service.vm.decreaseEnergy(4);
      expect(service.vm.energy).toBe(1);
    });

    it('keeps the energy at a minimum of 0', () => {
      service.vm.energy = 5;
      service.vm.decreaseEnergy(10);
      expect(service.vm.energy).toBe(0);
    });
  });

  describe('#increaseEnergy', () => {
    it('increases the energy level by 1, at default', () => {
      service.vm.energy = 5;
      service.vm.increaseEnergy();
      expect(service.vm.energy).toBe(6);
    });

    it('increases the energy level by the amount it is provided', () => {
      service.vm.energy = 5;
      service.vm.increaseEnergy(3);
      expect(service.vm.energy).toBe(8);
    });

    it('keeps the energy at a maximum of the energyLimit', () => {
      service.vm.energy = 5;
      service.vm.increaseEnergy(10);
      expect(service.vm.energy).toBe(service.vm.energyLimit);
    });
  });

  describe('#startEnergyLoop', () => {
    it('stores an interval at the energyLoop', () => {
      service.vm.startEnergyLoop();
      expect(service.vm.energyLoop).not.toBeNull();
    });
  });

  describe('#stopEnergyLoop', () => {
    it('stops the interval for the energy replenishment', () => {
      service.vm.startEnergyLoop();
      service.vm.stopEnergyLoop();
      expect(service.vm.energyLoop).toBeNull();
    });
  });

  describe('#calculateEnergyBurn', () => {
    it('determines that the shimee costs 2 energy', () => {
      expect(service.vm.calculateEnergyBurn('shimee')).toBe(2);
    });

    it('determines that the shake costs 2 energy', () => {
      expect(service.vm.calculateEnergyBurn('shake')).toBe(2);
    });

    it('determines that the yolo costs 3 energy', () => {
      expect(service.vm.calculateEnergyBurn('yolo')).toBe(3);
    });

    it('returns no energy to burn if it does not recognise the move', () => {
      expect(service.vm.calculateEnergyBurn('unknown')).toBe(0);
    });
  });
});
