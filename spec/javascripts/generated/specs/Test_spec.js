(function() {
  describe("MyTest", function() {
    it('should be true', function() {
      return expect(true).toEqual(true);
    });
    return it('should be false', function() {
      return expect(false).toEqual(false);
    });
  });
}).call(this);
