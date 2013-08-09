(function( $ ) {
    $.fn.pimpMyInput = function(regExpFilter) {
        this.each(function() {
            if ($(this).is('input')) {
                if($(this).parent('.pimpMyInput_container').length == 1) {
                    if (!$(this).hasClass('pimpMyInput_textZone')) {
                        var regExp = new RegExp(regExpFilter);
                        var textZone = $(this);
                        textZone.addClass('pimpMyInput_textZone');
                        var buttonZone = $('<div class="pimpMyInput_buttonZone"/>');
                        buttonZone.css('font-size', parseInt(textZone.css('font-size'),10) -2);
                        buttonZone.css('font-family', textZone.css('font-family'));
                        buttonZone.css('margin-left', parseInt(textZone.css('margin-left'),10) + parseInt(textZone.parent('.pimpMyInput_container').css('padding-left')),10);
                        buttonZone.css('margin-top', parseInt(textZone.css('margin-top'),10) + parseInt(textZone.parent('.pimpMyInput_container').css('padding-top')),10);
                        buttonZone.height(textZone.outerHeight());
                        buttonZone.css('top', textZone.height()*5/100);
                        textZone.after(buttonZone);
                        $(this).keydown(function(e) {
                            switch(e.keyCode) {
                                case 32 : // Space bar
                                    var text = textZone.val();
                                    var match = regExp.exec(text);
                                    if (match) {
                                        textZone.addPimpMyInputElement(match[1]);
                                    }
                                    break;
                                case 8 : // Del
                                    var selectedButton = buttonZone.find('.pimpMyInput_buttonSelected');
                                    if (selectedButton.length > 0) {
                                        var oldPaddingLeft = buttonZone.width();
                                        var oldInputOuterWidth = textZone.outerWidth();
                                        selectedButton.remove();
                                        var paddingLeft = buttonZone.width();
                                        //textZone.width(textZone.width() - paddingLeft + oldPaddingLeft);
                                        textZone.css('padding-left', (paddingLeft==0)? '' : paddingLeft);
                                        textZone.width(textZone.width() + oldInputOuterWidth - textZone.outerWidth());
                                        textZone.val('');
                                        textZone.focus();
                                    } else if (textZone.val().length == 0) {
                                        buttonZone.children().last().addClass('pimpMyInput_buttonSelected');
                                    }
                                    break;
                                case 46 : // Suppr
                                    var selectedButton = buttonZone.find('.pimpMyInput_buttonSelected');
                                    if (selectedButton.length > 0) {
                                        selectedButton.remove();
                                        var paddingLeft = buttonZone.width();
                                        textZone.css('padding-left', (paddingLeft==0)? '' : paddingLeft);
                                        textZone.val('');
                                        textZone.focus();
                                    }
                                    break;
                                case 37 : // Left arrow
                                    var selectedButton = buttonZone.find('.pimpMyInput_buttonSelected');
                                    if (selectedButton.length == 0 && textZone.caret() <= 1) {
                                        buttonZone.children().last().addClass('pimpMyInput_buttonSelected');
                                    } else {
                                        selectedButton.removeClass('pimpMyInput_buttonSelected');
                                        if (selectedButton.is(buttonZone.children().first())) {
                                            buttonZone.children().first().addClass('pimpMyInput_buttonSelected');
                                        } else {
                                            selectedButton.prev().addClass('pimpMyInput_buttonSelected');
                                        }
                                    }
                                    break;
                                case 39 : // Right Arrow
                                    var selectedButton = buttonZone.find('.pimpMyInput_buttonSelected');
                                    selectedButton.removeClass('pimpMyInput_buttonSelected');
                                    selectedButton.next().addClass('pimpMyInput_buttonSelected');
                                    break;
                                default :
                                    buttonZone.find('.pimpMyInput_button').removeClass('pimpMyInput_buttonSelected');
                                    break;
                            }
                        });
                        return this;
                    }
                } else {
                    var id = $(this).attr('id');
                    console.error('Your input' + (id? (' with id "' + id + '"') : '') +' must me wrapped in a container with class "pimpMyInput_container"');
                }
            } else {
                console.error('pimpMyInput function must be used on an input element"');
            }
        });

        $(document).off('click', documentClickHandler);
        $(document).click(function(e) {
            documentClickHandler(e);
        });

        var documentClickHandler = function (e) {
            $('.pimpMyInput_buttonZone').find('.pimpMyInput_buttonSelected').removeClass('pimpMyInput_buttonSelected');
            var button = null;
            if ($(e.target).hasClass('pimpMyInput_button')) {
                button = $(e.target);
            } else if ($(e.target).hasClass('pimpMyInput_buttonText')) {
                button = $(e.target).parent('.pimpMyInput_button');
            }
            if (button) {
                var buttonZone = button.parent('.pimpMyInput_buttonZone');
                var textZone = buttonZone.siblings('.pimpMyInput_textZone');
                button.addClass('pimpMyInput_buttonSelected');
                textZone.focus();
            }
            if ($(e.target).hasClass('pimpMyInput_itemDelete')) {
                var buttonZone = $(e.target).parent('.pimpMyInput_button').parent('pimpMyInput_buttonZone');
                var textZone = buttonZone.siblings('.pimpMyInput_textZone');
                var oldPaddingLeft = buttonZone.width();
                $(e.target).parent('.pimpMyInput_button').remove();
                var paddingLeft = buttonZone.width();
                textZone.width(textZone.width() - paddingLeft + oldPaddingLeft);
                textZone.css('padding-left', (paddingLeft===0)? '' : paddingLeft);
                textZone.val('');
                textZone.focus();
            }
        };

        var flashElement = function(elem) {
            var bkgC = elem.css('background-color');
            elem.stop().css('background-color', '#FFFF9C')
                .animate({ backgroundColor: bkgC}, 500);
        };

    }
    
    $.fn.addPimpMyInputElement = function(myText) {
        if ($(this).hasClass('pimpMyInput_textZone')) {
            var textZone = $(this);
            var buttonZone = textZone.siblings('.pimpMyInput_buttonZone');
            var newItem = $(
                '<div class="pimpMyInput_button">' +
                    '<span class="pimpMyInput_buttonText">' + myText + '</span>' +
                    '<span class="pimpMyInput_itemDelete">&times;</span>' +
                '</div>');
            var oldPaddingLeft = buttonZone.width();
            var oldInputOuterWidth = textZone.outerWidth();
            buttonZone.append(newItem);
            var textZoneRealWidth = textZone.width() + parseInt(textZone.css('padding-left'),10);
            var prevItem = newItem.prev();
            if (buttonZone.width() > textZoneRealWidth || (prevItem.length > 0 && newItem.position().left < prevItem.position().left)) {
                newItem.remove();
                flashElement(textZone);
            } else {
                var paddingLeft = buttonZone.width();
                textZone.css('padding-left', (paddingLeft==0)? '' : paddingLeft);
                textZone.width(textZone.width() + oldInputOuterWidth - textZone.outerWidth());
                var marginTop = (textZone.outerHeight() - newItem.outerHeight())/2;
                //newItem.css('margin-top', marginTop);
                textZone.val('');
            }
        } else {
            console.error('You must call "pimpMyInput()" function before using "addPimpMyInputElement"');
        }
    }
}( jQuery ));