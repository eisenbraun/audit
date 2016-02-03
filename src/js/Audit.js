function Audit() {
    this.loaded = false;
    this.form = false;
    this.inputs = false;
}

Audit.prototype.getForm = function(id) {
    return document.forms[id];
}

Audit.prototype.isForm = function(id) {
    var form = this.getForm(id);
    if(typeof form !== 'undefined') {
        return form;
    }
    return false;
}

Audit.prototype.isInput = function(id) {
    var input = document.getElementById(id);
    
    if (input.validity) {
        return input;
    }

    return false;
}

Audit.prototype.isRequired = function(id) {
    return document.getElementById(id).required;
}

Audit.prototype.isValid = function(id) {
    var form = this.isForm(id),
        input = this.isInput(id);
    
    if (form) {
        return form.checkValidity();
    } else if(input) {
        return input.validity.valid;
    }
}


//getErrorMessage

//setErrorMessage - setCustomValidity(error)

//willValidate 

Audit.prototype.load = function(id) {
    this.form = this.getForm(id);

    if (typeof this.form === 'undefined') {
        throw new Error('Form "'+id+'" does not exist.');
    } 

    if (this.form.length === 0) {
        throw new Error("Form is empty.");
    }

    this.inputs = this.getForm(id).elements;
    this.loaded = true;
}

//setPattern
Audit.prototype.setPattern = function(id) {
    var input = document.getElementById(id);

    if(input.type != 'email' && input.type != 'url') {
        input.setAttribute('pattern', '(\\w+)');
    }

    return false;
}
