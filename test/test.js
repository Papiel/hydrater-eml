'use strict';

require('should');

var eml = require('../lib/');


describe('Test EML', function() {
  it('returns basic datas', function(done) {
    var document = {
      datas: {},
      metadatas: {},
    };

    eml(__dirname + "/samples/sample.eml", document, function(err, document) {
      if(err) {
        throw err;
      }

      document.should.have.property('document_type', "email");
      document.should.have.property('metadatas');
      document.metadatas.should.have.property('to').and.eql([ { address: 'hugoduroux@free.fr', name: '' } ]);
      document.metadatas.should.have.property('cc').and.eql([]);
      document.metadatas.should.have.property('bcc').and.eql([ { address: 'moby69@hotmail.fr', name: '' }, { address: 'hugoduroux@gmail.com', name: 'Hugo DUROUX' } ]);
      document.metadatas.should.have.property('from').and.eql([ { address: 'hugo.duroux@gmail.com', name: 'Hugo DUROUX' } ]);
      document.metadatas.should.have.property('subject', 'sample');
      document.metadatas.should.have.property('text', 'Hello there!\n');

      done();
    });
  });

  it('returns text and html for multipart text / html', function(done) {
    var document = {
      datas: {},
      metadatas: {},
    };

    eml(__dirname + "/samples/html-text.eml", document, function(err, document) {
      if(err) {
        throw err;
      }

      document.should.have.property('metadatas').with.property('text', 'Hello there!\n');
      document.should.have.property('datas').with.property('html', '<div dir="ltr">Hello there! In html.<br></div>\n');

      done();
    });
  });

  it('returns datas for html only version', function(done) {
    var document = {
      datas: {},
      metadatas: {},
    };
    eml(__dirname + "/samples/html-only.eml", document, function(err, document) {
      if(err) {
        throw err;
      }

      document.should.have.property('metadatas').with.property('text', " Vu qu'elles sont supprimées même si elles servent à plusieurs personnes \n Bonjour Ca va ? \n");
      document.should.have.property('datas').with.property('html', "<p>Vu qu'elles sont supprimées même si elles servent à plusieurs personnes</p>\n<p>Bonjour</p><p>Ca va ?</p>\n");

      done();
    });
  });
});
