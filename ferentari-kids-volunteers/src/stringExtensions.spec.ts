import "./stringExtensions"

describe('startsWithCaseInsensitiveAccentInsensitive', () => {
    it('should be case insensitive: A = a', () => {
        var result = 'Alex'.startsWithAccentInsensitiveCaseInsensitive('a')
        expect(result).toBe(true);
    });
  
    it('should be case insensitive: b = B', () => {
        var result = 'barbu'.startsWithAccentInsensitiveCaseInsensitive('B')
        expect(result).toBe(true);
    });
    
    it('should be accent insensitive: ă = a', () => {
        var result = 'ăsta'.startsWithAccentInsensitiveCaseInsensitive('a')
        expect(result).toBe(true);
    });

    it('should be accent insensitive: a = ă', () => {
        var result = 'asta'.startsWithAccentInsensitiveCaseInsensitive('ă')
        expect(result).toBe(true);
    });

    it('should return true for equal strings', () => {
        var result = 'asta'.startsWithAccentInsensitiveCaseInsensitive('asta')
        expect(result).toBe(true);
    });

    it('should return false when "this" string is contained in paramter', () => {
        var result = 'alex'.startsWithAccentInsensitiveCaseInsensitive('alexandru')
        expect(result).toBe(false);
    });

    it('should return true when parameter is contained in "this" string', () => {
        var result = 'alexandru'.startsWithAccentInsensitiveCaseInsensitive('alex')
        expect(result).toBe(true);
    });

    it('should return true when parameter is empty', () => {
        var result = 'any text here'.startsWithAccentInsensitiveCaseInsensitive('')
        expect(result).toBe(true);
        result = ''.startsWithAccentInsensitiveCaseInsensitive('')
        expect(result).toBe(true);
    });

    it('should return false when parameter is null', () => {
        var result = 'any text here'.startsWithAccentInsensitiveCaseInsensitive(null)
        expect(result).toBe(false);
        result = ''.startsWithAccentInsensitiveCaseInsensitive(null)
        expect(result).toBe(false);
    });
    

    it('should return false when "this" string does not start with the parameter string', () => {
        var result = 'Zack'.startsWithAccentInsensitiveCaseInsensitive('A')
        expect(result).toBe(false);
    });
  
  });
  