import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

describe('Dancing at Home', () => {
  it('stores a log of key presses', () => {
    const service = shallowMount(Home);
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
});
