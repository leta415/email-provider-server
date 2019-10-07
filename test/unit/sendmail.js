var expect  = require('chai').expect;

var sendemail = require('../../src/sendemail');

describe('Input Validations for /sendemail', function() {
    describe('validateTo()', function() {
        it('should return true for a valid email address', function() {
            expect(sendemail.validateTo('abcd1234@a123bcdefg.com')).to.be.true;
        });
        it('should return false for an email address that is missing "@"', function() {
            expect(sendemail.validateTo('abcd1234.com')).to.be.false;
        });
        it('should return false for an email address that is missing "."', function() {
            expect(sendemail.validateTo('abcd1234@a123bcdefgcom')).to.be.false;
        });
        it('should return false for an empty email address', function() {
            expect(sendemail.validateTo('')).to.be.false;
        });
        it('should return false for a null email address', function() {
            expect(sendemail.validateTo(null)).to.be.false;
        });
    });

    describe('validateToName()', function() {  
        it('should return true for a valid name', function() {
            expect(sendemail.validateToName('Sally Parker')).to.be.true;
        });
        it('should return true for a valid name without spaces', function() {
            expect(sendemail.validateToName('Sally')).to.be.true;
        });
        it('should return false for an empty name', function() {
            expect(sendemail.validateToName('')).to.be.false;
        });
        it('should return false for a null name', function() {
            expect(sendemail.validateToName(null)).to.be.false;
        });
    });

    describe('validateFrom()', function() {
        it('should return true for a valid email address', function() {
            expect(sendemail.validateFrom('abcd1234@a123bcdefg.com')).to.be.true;
        });
        it('should return false for an email address that is missing "@"', function() {
            expect(sendemail.validateFrom('abcd1234.com')).to.be.false;
        });
        it('should return false for an email address that is missing "."', function() {
            expect(sendemail.validateFrom('abcd1234@a123bcdefgcom')).to.be.false;
        });
        it('should return false for an empty email address', function() {
            expect(sendemail.validateFrom('')).to.be.false;
        });
        it('should return false for a null email address', function() {
            expect(sendemail.validateFrom(null)).to.be.false;
        });
    });

    describe('validateFromName()', function() {  
        it('should return true for a valid name', function() {
            expect(sendemail.validateFromName('Sally Parker')).to.be.true;
        });
        it('should return true for a valid name without spaces', function() {
            expect(sendemail.validateFromName('Sally')).to.be.true;
        });
        it('should return false for an empty name', function() {
            expect(sendemail.validateFromName('')).to.be.false;
        });
        it('should return false for a null name', function() {
            expect(sendemail.validateFromName(null)).to.be.false;
        });
    });

    describe('validateSubject()', function() {  
        it('should return true for a valid subject', function() {
            expect(sendemail.validateSubject('Hello from Joe')).to.be.true;
        });
        it('should return false for an empty subject', function() {
            expect(sendemail.validateSubject('')).to.be.false;
        });
        it('should return false for a null subject', function() {
            expect(sendemail.validateSubject(null)).to.be.false;
        });
    });    

    describe('validateBody()', function() {  
        it('should return true for a valid body', function() {
            expect(sendemail.validateBody('Dear Rini, Hi how are you?')).to.be.true;
        });
        it('should return false for an empty body', function() {
            expect(sendemail.validateBody('')).to.be.false;
        });
        it('should return false for a null body', function() {
            expect(sendemail.validateBody(null)).to.be.false;
        });
    });  

    describe('isStringNullOrEmpty()', function() {  
        it('should return true for a valid body', function() {
            expect(sendemail.isStringNullOrEmpty('This is a nonempty string.')).to.be.false;
        });
        it('should return false for an empty body', function() {
            expect(sendemail.isStringNullOrEmpty('')).to.be.true;
        });
        it('should return false for a null body', function() {
            expect(sendemail.isStringNullOrEmpty(null)).to.be.true;
        });
    });  

    describe('validateInput()', function() {
        it('should return true for a valid input', function() {
            expect(sendemail.validateInput({
                to: 'sallyparker@hotmail.com',
                to_name: 'Sally Parker',
                from: 'joeshmoe@gdawg.co',
                from_name: 'Joe Shmoe',
                subject: 'Hello from Joe',
                body: '<strong>Hey what\'s up Sally?</strong>'
            })).to.be.true;
        });
        it('should return false for an invalid to email', function() {
            expect(sendemail.validateInput({
                to: 'sallyparkerhotmailcom',
                to_name: 'Sally Parker',
                from: 'joeshmoe@gdawg.co',
                from_name: 'Joe Shmoe',
                subject: 'Hello from Joe',
                body: '<strong>Hey what\'s up Sally?</strong>'
            })).to.be.false;
        });
        it('should return false for an invalid to name', function() {
            expect(sendemail.validateInput({
                to: 'sallyparker@hotmail.com',
                to_name: '',
                from: 'joeshmoe@gdawg.co',
                from_name: 'Joe Shmoe',
                subject: 'Hello from Joe',
                body: '<strong>Hey what\'s up Sally?</strong>'
            })).to.be.false;
        });
        it('should return false for an invalid from email', function() {
            expect(sendemail.validateInput({
                to: 'sallyparker@hotmail.com',
                to_name: 'Sally Parker',
                from: 'joeshmoe',
                from_name: 'Joe Shmoe',
                subject: 'Hello from Joe',
                body: '<strong>Hey what\'s up Sally?</strong>'
            })).to.be.false;
        });
        it('should return false for an invalid from name', function() {
            expect(sendemail.validateInput({
                to: 'sallyparker@hotmail.com',
                to_name: 'Sally Parker',
                from: 'joeshmoe@gdawg.co',
                from_name: null,
                subject: 'Hello from Joe',
                body: '<strong>Hey what\'s up Sally?</strong>'
            })).to.be.false;
        });
        it('should return false for a invalid subject', function() {
            expect(sendemail.validateInput({
                to: 'sallyparker@hotmail.com',
                to_name: 'Sally Parker',
                from: 'joeshmoe@gdawg.co',
                from_name: 'Joe Shmoe',
                subject: '',
                body: '<strong>Hey what\'s up Sally?</strong>'
            })).to.be.false;
        });
        it('should return false for a invalid body', function() {
            expect(sendemail.validateInput({
                to: 'sallyparker@hotmail.com',
                to_name: 'Sally Parker',
                from: 'joeshmoe@gdawg.co',
                from_name: 'Joe Shmoe',
                subject: 'Hello from Joe',
                body: ''
            })).to.be.false;
        });
    });   
});