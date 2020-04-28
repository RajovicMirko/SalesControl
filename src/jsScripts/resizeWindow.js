export const responsiveControl = function(vuePrototype){
    let responsiveFunctions = [];
    const self = vuePrototype;
    
    function resize(){
        self.$winSize = window.innerWidth > 719 ? 'big' : 'small';
        if (responsiveFunctions.length) responsiveFunctions.forEach(fn => fn());
    }

    function start(){
        window.addEventListener('resize', resize, true);
    }

    function addFunctions(...fns){
        fns.forEach(fn => responsiveFunctions.push(fn));
        resize();
    }

    function stop(){
        responsiveFunctions.length = 0;
        window.removeEventListener('resize', resize, true);
    }

    return {
        start,
        addFunctions,
        stop
    }
};