// JavaScript Class
var Person = /** @class */ (function () {
    function Person(payload) {
        this.firstName = payload.firstName;
        this.lastName = payload.lastName;
        this.date = payload.date;
    }
    Person.prototype.getFullName = function () {
        return this.firstName + ' ' + this.lastName;
    };
    Person.prototype.getAge = function () {
        var age = 0;
        var birthYear = this.date.getFullYear();
        var currentYear = new Date().getFullYear();
        age = currentYear - birthYear;
        return age;
    };
    return Person;
}());
var person1 = new Person({ firstName: 'Salim', lastName: 'Rana', date: new Date(1989, 3, 28, 12) });
var person2 = new Person({ firstName: 'Wasim', lastName: 'Hasan', date: new Date(1992, 11, 7, 12) });
var person3 = new Person({ firstName: 'Rubel', lastName: 'Hosen', date: new Date(1989, 0, 5, 12) });
// console.log(person1.getAge(), person2.getAge(), person3.getAge(), person1.getFullName(), person2.getFullName(), person3.getFullName());
// Understand complex class
var Vue = /** @class */ (function () {
    function Vue(payload) {
        for (var key in payload.data) {
            this[key] = payload.data[key];
        }
        for (var key in payload.computed) {
            this[key] = payload.computed[key];
        }
        this.methods = payload.methods;
        this.html = payload.html;
    }
    Vue.prototype.mount = function (div) {
        var _this = this;
        this.rootDiv = document.getElementById(div);
        this.render();
        var _loop_1 = function (key) {
            var elm = document.getElementById(this_1["".concat(key, "Id")]);
            elm.addEventListener("".concat(this_1["".concat(key, "Id")].split('-')[1]), function (e) {
                _this.methods[key].apply(_this, [e]);
                _this.render();
            });
        };
        var this_1 = this;
        // Perform actions from methods
        for (var key in this.methods) {
            _loop_1(key);
        }
        var win = window;
        win.$app = this;
    };
    Vue.prototype.generateActualHtml = function () {
        if (this.html) {
            var result = this.html.match(/[^{}]*(?=\})/g);
            if (result) {
                result = result.filter(function (item) {
                    if (item) {
                        return item;
                    }
                });
                result = result.map(function (item) {
                    return item.trim();
                });
                console.log(result);
                var html = this.html;
                // Replace placeholders with dynamic data
                for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                    var item = result_1[_i];
                    var regEx = new RegExp("{".concat(item, "}"), 'ig');
                    var val = typeof this[item] === 'function' ? this[item]() : this[item];
                    html = html.replace(regEx, val);
                }
                this.renderedHtml = html;
                console.log(html);
            }
        }
    };
    Vue.prototype.render = function () {
        if (this.html) {
            this.generateActualHtml();
            this.rootDiv.innerHTML = this.renderedHtml;
        }
    };
    return Vue;
}());
var app = new Vue({
    data: {
        firstName: 'Salim',
        lastName: 'Rana',
        date: new Date(1989, 3, 28, 12),
        sampleText: 'sss',
        onChangeAgeId: 'age-click',
        onInputId: 'type-input'
    },
    methods: {
        onChangeAge: function () {
            var input = document.getElementById('date');
            if (input.value) {
                this.date = new Date(input.value);
            }
        },
        onInput: function (e) {
            var input = e.target;
            this.sampleText = input.value;
        }
    },
    computed: {
        getFullName: function () {
            return this.firstName + ' ' + this.lastName;
        },
        getAge: function () {
            var age = 0;
            var birthYear = this.date.getFullYear();
            var currentYear = new Date().getFullYear();
            age = currentYear - birthYear;
            return age;
        }
    },
    html: "<div>\n    <p>My name is {getFullName}</p>\n    <p>My age is {getAge}</p>\n    <p>{sampleText}</p>\n  </div>\n  "
}).mount('root');
//# sourceMappingURL=app.js.map