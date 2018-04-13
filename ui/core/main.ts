import { Aurelia, PLATFORM } from 'aurelia-framework';

export function configure(aurelia: Aurelia) {
	aurelia.use.standardConfiguration();
	aurelia.use.developmentLogging();
	aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('core/app')));
}