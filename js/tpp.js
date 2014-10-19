/**
*
*  Tiny placeholder polyfill
*
*
*
*/

            (function(a, b) {
                a.tpp = function(elem) {
                    if (document.createElement('input').placeholder != undefined) return;
                    var addEvent = function addEvent(obj, type, fn) {
                        if (obj.attachEvent) {
                            obj['e' + type + fn] = fn;
                            obj[type + fn] = function() {
                                obj['e' + type + fn](window.event);
                            }
                            obj.attachEvent('on' + type, obj[type + fn]);
                        } else
                            obj.addEventListener(type, fn, false);
                    };
                    var register = {
                        typed: false
                    };
                    elem.value = elem.getAttribute('placeholder');

                    addEvent(elem, 'keyup', function() {
                        register.typed = true;
                    });

                    addEvent(elem, 'focus', function() {
                        if (register.typed === false || elem.value === elem.getAttribute('placeholder')) {
                            elem.value = ''
                        }

                    });
                    addEvent(elem, 'blur', function() {
                        if (register.typed === false || elem.value === '') {
                            elem.value = elem.getAttribute('placeholder')
                        }
                    });


                }

                if (typeof(b) != 'undefined') {
                    b.fn.tpp = function() {
                        a.tpp(this.get(0));
                        return this;
                    }
                    b(function() {
                        b('input,textarea').tpp();
                    });

                }


            })(window, jQuery);