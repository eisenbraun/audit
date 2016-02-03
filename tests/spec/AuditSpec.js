describe("When initializing Audit, Audit", function() {
    var audit;

    beforeEach(function() {
        audit = new Audit();
        audit.load('form');
    });

    it('should throw an exception if id is not a form or does not exist.', function() {
        expect(function() {
            audit.load('notAForm');
        }).toThrowError('Form "notAForm" does not exist.');
    });

    it('should throw an exception if form is empty', function() {
        expect(function() {
            audit.load('empty');
        }).toThrowError("Form is empty.");
    });
    
    it('should load all inputs from the form.', function() {
        expect(audit.inputs.length).toBe(3);  
    });

    it('should be able to set the pattern for an input.', function() {
        expect(audit.setPattern('name'));
        document.getElementById('name').pattern.toBeTruthy();
        
        expect(audit.setPattern('email')).toBeFalsey();
    });
});

describe("When checking validity, Audit", function() {
    var audit;

    beforeEach(function() {
        audit = new Audit();
        audit.load('form');
    });

    it('should be able to tell if id is from a form.', function() {
        expect(audit.isForm('form')).toBeTruthy();
        expect(audit.isForm('notAForm')).toBe(false);
    });

    it('should be able to check the validity of the form.', function() {
        expect(audit.isValid('form')).toBe(false);
    });

    it('should be able to check if an input is required.', function() {
        expect(audit.isRequired('name')).toBe(true);
        expect(audit.isRequired('postalcode')).toBe(false);
    });

    
    it('should be able to check validity of an input.', function() {
        expect(audit.isValid('name')).toBe(true);
        expect(audit.isValid('email')).toBe(false);
        expect(audit.isValid('postalcode')).toBe(true);
    });

    it('should be able to check if an input has a validation message', function() {
        expect(audit.getMessage('name')).toBeTruthy();
        expect(audit.getMessage('email')).toBeTruthy();
        expect(audit.getMessage('postalcode')).toBe(false);
    });


});