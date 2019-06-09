declare interface String {
    startsWithAccentInsensitiveCaseInsensitive(start: string) : boolean;
}

String.prototype.startsWithAccentInsensitiveCaseInsensitive = function(this:string, start: string) {
    return start!= null && 
           this.length >= start.length && 
           this.substring(0, start.length).localeCompare(start, 'en', { sensitivity: 'base' }) === 0
}