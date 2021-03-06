import { ConstantsService } from 'jslib/services/constants.service';

import { StorageService } from 'jslib/abstractions/storage.service';

export class StateService {
    private state: any = {};

    constructor(private storageService: StorageService, private constantsService: ConstantsService) {
    }

    async init() {
        const iconsDisabled = await this.storageService.get<boolean>(this.constantsService.disableFaviconKey);
        this.saveState('faviconEnabled', !iconsDisabled);
    }

    saveState(key: string, data: any) {
        this.state[key] = data;
    }

    getState(key: string): any {
        if (key in this.state) {
            return this.state[key];
        }

        return null;
    }

    removeState(key: string) {
        delete this.state[key];
    }

    purgeState() {
        this.state = {};
    }
}

StateService.$inject = ['storageService', 'constantsService'];
