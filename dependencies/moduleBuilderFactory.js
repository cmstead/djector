(function (loader) {

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = loader;
    } else {
        window.djectLoaders.moduleBuilderFactoryLoader = loader;
    }

})(function (container) {
    'use strict';

    function moduleBuilderFactoryBuilder() {
        return function (coreContainer, registry) {

            function loadModuleIfMissing(moduleName) {
                if(!coreContainer.isRegistered(moduleName)){
                    registry.loadModule(moduleName);
                }
            }

            function loadDependencies(moduleName) {
                var dependencies = coreContainer.getDependencies(moduleName);

                dependencies.forEach(function (moduleName) {
                    loadModuleIfMissing(moduleName);
                    loadDependencies(moduleName);
                });
            }

            function buildModule(moduleName) {
                loadModuleIfMissing(moduleName);
                loadDependencies(moduleName);
                return coreContainer.build(moduleName);
            }

            function build(moduleName) {
                try{
                    return buildModule(moduleName);
                } catch (e) {
                    var message = 'Dependency chain is either circular or too deep to process: ' + e.message;
                    throw new Error(message);
                }
            }

            return {
                build: build
            };
        }
    }

    container.register('moduleBuilderFactory', moduleBuilderFactoryBuilder, []);

});