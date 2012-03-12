# http://stackoverflow.com/questions/1026069/capitalize-the-first-letter-of-string-in-javascript
String.prototype.capitalze = () ->
  return this.charAt(0).toUpperCase() + this.slice(1)