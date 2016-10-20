(function(w,d,$, p){

/**
 * If browser supports placeholder natively,
 * no need to do anything
 */
if (d.createElement('input')[p] != undefined) 
    return;


/**
 * addEventListener-attachEvent
 * abstraction
 */
var addEvent = function(obj, type, fn) {
    if (obj.attachEvent) {
        obj['e' + type + fn] = fn;
        obj[type + fn] = function() {
            obj['e' + type + fn](window.event);
        }
        obj.attachEvent('on' + type, obj[type + fn]);
    } else
        obj.addEventListener(type, fn, false);
},
/**
 * Simple array iterator
 */
_a = function(array,method){
      var templ=array.length;
      for(var i=0;i<templ;i++){
        method.call(this, i, array[i] );
      }
},
/**
 * Smallest DOM Ready ever enhanced
 * https://gist.github.com/milosdjakonovic/9814b725b86b0e862e8201124844d791
 */
r = function(f){
        /in/.test(d.readyState)?setTimeout(function(){r(f)},9):f()    
},

/**
 * Tiny placeholder polyfill
 * @param el - HTMLElement -> input or textarea
 * @return el 
 * 
 */
tpp = function(el){
    var register = {typed:true};
    el.value = el.getAttribute(p);

    // avoid if it's already done 
    if(el.getAttribute('data-tpp-done'))
        return;

    addEvent(el, 'keyup', function() {
        register.typed = true
    });

    // empty value on focus, when needed
    addEvent(el, 'focus', function() {
        if (register.typed === false || el.value === el.getAttribute(p)) {
            el.value = ''
        }
    });
    // restore placeholder attr to value,
    // when needed
    addEvent(el, 'blur', function() {
        if (register.typed === false || el.value === '' ) {
            el.value = el.getAttribute(p)
        }
    });

    //mark as done for this el
    el.setAttribute('data-tpp-done', '1');

    return el;
},

all = function(){
    var inputs = d.getElementsByTagName('input'   ),
        tareas = d.getElementsByTagName('textarea');
    _a(inputs, function(i,ele){
        tpp(ele);
    });
    _a(tareas, function(i,ele){
        tpp(ele);
    });        
};

tpp.all = all; 

r(all);

w.Tpp = tpp;

})(window,document,window.jQuery, 'placeholder');