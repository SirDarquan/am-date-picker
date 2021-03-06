'use strict'

var moment = require('../../bower_components/moment/min/moment-with-locales.min.js');

var hasClass = function (element, cls) {
    return element.getAttribute('class').then(function (classes) {
        return classes.split(' ').indexOf(cls) !== -1;
    });
};

describe('am.date-picker e2e test. (Linked Datepickers)', function() {
    moment.locale('en');
    var firstDate = moment({year: 2014, month: 0, date: 10}),
        secondDate = moment({year: 2014, month: 0, date: 20});
    var firstContainer = element.all(by.tagName("md-input-container")).first(),
        firstInput = firstContainer.element(by.tagName('label')),
        firstInput = firstContainer.element(by.tagName('input')),
        secondContainer = element.all(by.tagName("md-input-container")).last(),
        secondInput = secondContainer.element(by.tagName('label')),
        secondInput = secondContainer.element(by.tagName('input'));


    beforeEach(function() {
        browser.get('/test/e2e/html/linked-datepickers.html');
    });


    it('first picker should have disabled date starting with the date selected in the second one',
        function() {
            firstInput.click();
            var days = $$('.am-date-picker__day'),
                disabledDays = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 ,31],
                bool;
            days.each(function(e, i) {
                bool = (disabledDays.indexOf(i) != -1);
                expect(hasClass(e, 'am-date-picker__day--is-disabled')).toBe(bool);
            })
        });


    it('second picker should have disabled date ending with the date selected in the first one',
        function() {
            secondInput.click();
            var days = $$('.am-date-picker__day'),
                disabledDays = [0, 1, 2, 3, 4, 5, 6, 7, 8],
                bool;
            days.each(function(e, i) {
                bool = (disabledDays.indexOf(i) != -1);
                expect(hasClass(e, 'am-date-picker__day--is-disabled')).toBe(bool);
            })
        });


    it('changes date in first picker and disabled days in second one should change respectively',
        function() {
            firstInput.click();
            var days = $$('.am-date-picker__day'),
                buttons = $$('md-dialog-actions button');
            days.get(14).click();
            buttons.get(0).click();

            secondInput.click();
            days = $$('.am-date-picker__day');
            var disabledDays = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                bool;
            days.each(function(e, i) {
                bool = (disabledDays.indexOf(i) != -1);
                expect(hasClass(e, 'am-date-picker__day--is-disabled')).toBe(bool);
            });

        });


    it('changes date in second picker and disabled days in first one should change respectively',
        function() {
            secondInput.click();
            var days = $$('.am-date-picker__day'),
                buttons = $$('md-dialog-actions button');
            days.get(14).click();
            buttons.get(0).click();

            firstInput.click();
            days = $$('.am-date-picker__day');
            var disabledDays = [15, 16, 17, 18, 19, 20, 21, 22,
                                23, 24, 25, 26, 27, 28, 29, 30 ,31],
                bool;
            days.each(function(e, i) {
                bool = (disabledDays.indexOf(i) != -1);
                expect(hasClass(e, 'am-date-picker__day--is-disabled')).toBe(bool);
            });

        });

})
