import { eventWithTime } from '@rrweb/types';
import { playerConfig } from '@rrweb/replay';
import { SvelteComponentTyped } from 'svelte';

declare class Player extends SvelteComponentTyped {
    constructor(options: {
        data?: RRwebPlayerOptions['props'];
    } & RRwebPlayerOptions);
}
export { Player }
export default Player;

declare type RRwebPlayerOptions = {
    target: HTMLElement;
    props: {
        events: eventWithTime[];
        width?: number;
        height?: number;
        maxScale?: number;
        autoPlay?: boolean;
        speed?: number;
        speedOption?: number[];
        showController?: boolean;
        tags?: Record<string, string>;
        inactiveColor?: string;
    } & Partial<playerConfig>;
};

export { }

declare global {
    interface Document {
        mozExitFullscreen: Document['exitFullscreen'];
        webkitExitFullscreen: Document['exitFullscreen'];
        msExitFullscreen: Document['exitFullscreen'];
        webkitIsFullScreen: Document['fullscreen'];
        mozFullScreen: Document['fullscreen'];
        msFullscreenElement: Document['fullscreen'];
    }
    interface HTMLElement {
        mozRequestFullScreen: Element['requestFullscreen'];
        webkitRequestFullscreen: Element['requestFullscreen'];
        msRequestFullscreen: Element['requestFullscreen'];
    }
}

