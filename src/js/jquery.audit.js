/*** 
 * Copyright (c) 2014 
 * Licensed under the MIT License.
 *
 * Author: Michael Eisenbraun
 * Version: 0.1.0
 * Requires: jQuery 1.7.2+
 * Documentation: http://eisenbraun.github.io/audit
 */

if (!window.console) {
    var console = {
        log: function() { }
    };
}


;(function ($, window, document, undefined) {

    function Audit( element, options ) {
        this.$el = $(element);

        if (options) {
            $.extend(this, options);
        }
        
        /** AUDIT CONSTANTS */
        this.VERSION = '0.1.0';


        /** AUDIT METHODS */

        /** check browser capabilities */

        
        this.init();
    }

    Audit.prototype.update = function(action) {
      if(this.$el === 'undefined') {
        var that = $.data(this, 'audit');
      } else {
        var that = this;
      }
      
      console.log(this.$el);

      that.form = that.$el.children().detach();
      that.inputs = {};

      $.each($(':input', that.form), function() {
          var name = ($(this).attr('name') ? $(this).attr('name') : $(this).attr('id'));

          $(this).addClass('input'); 

          if(name) {
              that.inputs[name] = {
                  value: $(this).val(), 
                  type: $(this).attr('type'),
                  tag: $(this)[0].tagName,
                  valid: $(this)[0].validity.valid,
                  message: $(this)[0].validationMessage
              }
          }
          if(typeof action === 'function') {
            action($(this), that.inputs[name]);
          }
      });

      that.$el.append(this.form);

    }

    Audit.prototype.init = function () {
        var that = this;

        //that.$el.attr('novalidate', 'novalidate');

        that.update();

        that.$el.on('submit', function() {
          that.update(function(input, status) {
            if(typeof status !== 'undefined') {
              if(status.valid) {
                input.removeClass('invalid');
              } else {
                input.addClass('invalid');
              }
            }
          });

          return false;
        }); 

        that.$el.on('blur', ':input', function() { 
            if($(this)[0].validity.valid) { 
                $(this).removeClass('invalid');
            } else { 
                $(this).addClass('invalid');

                if($(this)[0].validity.valueMissing) { 
                    console.log('This input can not be left blank.');
                }

                if($(this)[0].validity.patternMismatch) { 
                    console.log('This input is invalid.'); 
                }
            }
        }); 

        /* 
         * Pull the entire form from the DOM and detach it.
         * Store this data as a jQuery object.
         * 
         * Can I pull the entire form and rebuild it to include all the 
         * input, group, counter, and regular expression information, 
         * and write it all back to the DOM in one instance?
         * 
         * Advantages: 
         * Speed - only write to the DOM once
         * Alternative form creation - the ability to create the form
         *  dynamically from a json object. 
         *
         * Disadvantages: 
         * Potential issues with forms that add dynamic inputs 
         */ 

        /* 
         * Create an object of all the input (inputs) from the form object, storing 
         * them as jQuery objects.  
         *
         * Gather group information
         * Create a object of all groups (groups)
         *
         * Gather Counter Information
         *
         * Gather Regular Expression Information
         */

         /* 
          * Create Event Listeners: 
          * Blur and Change Events
          * Keyup (counter) Events
          * Submit Event
          * 
          * Can I create my own event, like a validating event? 
          *
          */

          /*
           * Add hooks, extend and override functions
           *
           */

          that.$el.addClass('ready');
    };

    /*
    ## Input Types: 
    - Text
    - Hidden
    - Phone
    - Number
    - Email
    - File
    - Radio
    - Checkbox
    - Select
    - Textarea

    ## Validation Types:
    - alpha
    - alnum
    - number
    - currency
    - zip
    - year
    - phone
    - email
    - url
    - date

    ## API 
    - addPattern
    - addInputType
    - addGroup
    - getInvalid
    - getValid
    - getInputs


    ## Can I build the form from a JSON string 
    [
      {
        "name"
        "type"
        "value"
        "required"
        
      }  
    ]
    
    */

    $.fn.audit = function(options) {
        var val = [];
        var args = Array.prototype.slice.call(arguments, 1);
    
        if (typeof options === 'string') {
            this.each(function() {
            
                var instance = $.data(this, 'audit');
                if (typeof instance !== 'undefined' && $.isFunction(instance[options])) {
                    var methodVal = instance[options].apply(instance, args);
                    if (methodVal !== undefined && methodVal !== instance) {
                        val.push(methodVal);
                    }
                } else {
                    return $.error('No such method "' + options + '" for audit');
                }
            });
                
        } else {
            this.each(function() {
                if (!$.data(this, 'audit')) {
                    $.data(this, 'audit', new Audit(this, options));
                }
            });
        }
    
        if (val.length === 0) {
            return this.data('audit');
        } else if (val.length === 1) {
            return val[0];
        } else {
            return val;
        }
    }

})( jQuery, window, document );